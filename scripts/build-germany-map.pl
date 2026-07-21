#!/usr/bin/env perl
# ════════════════════════════════════════════════════════════════
# build-germany-map.pl
#
# 一次性本機建圖腳本（非網站執行期程式碼）。與 build-france-map.pl 同一套
# 方法論：德國4個法定產區（Mosel/Rheingau/Pfalz/Baden）是風土概念，不直接
# 對應行政邦（Bundesland）邊界——查證後確認沒有專屬的產區邊界開放資料集
# （GovData 僅有薩克森一邦的產區草案邊界，與這4個產區無關；萊茵蘭-普法爾茲
# 邦官方葡萄園登記簿API只到單一葡萄園層級，且跨3個邦資料來源/格式不一致），
# 因此比照法國模式，用縣級行政區（Kreis）分組湊凸包（convex hull）近似。
# 縣分組依據見 DECISIONS.md（已與使用者逐一確認，含Baden刻意選擇完整9個
# Bereich涵蓋範圍、形狀狹長非疏漏）。標籤避讓演算法比照 build-iberia-map.pl
# （大/小形狀自適應：夠大的用point-in-polygon硬性容器約束，過窄的用位移
# 上限+指示線），因4個產區形狀狹長（尤其Mosel沿河谷延伸），比法國的無避讓
# 更適合。
#
# 用法：perl scripts/build-germany-map.pl
# 本機沒有 Node.js/Python，用 Perl（內建 JSON::PP）撰寫。
# ════════════════════════════════════════════════════════════════
use strict;
use warnings;
use utf8;
use JSON::PP;
binmode(STDOUT, ':utf8');
binmode(STDERR, ':utf8');

# ---------- 設定：4個產區 → 縣（Kreis）分組（NAME_3 於 deutschlandGeoJSON 資料集）----------
my %REGIONS = (
  mosel     => ['Trier-Saarburg', "Bernkastel-Wittlich", 'Cochem-Zell'],
  rheingau  => ['Rheingau-Taunus-Kreis'],
  pfalz     => ["Bad D\x{fc}rkheim", "S\x{fc}dliche Weinstra\x{df}e", "Neustadt St\x{e4}dte", "Landau St\x{e4}dte"],
  # Baden：使用者確認採完整9個Bereich涵蓋（Tauberfranken～Bodensee），形狀狹長是官方真實範圍、非疏漏
  baden     => ['Main-Tauber', 'Rhein-Neckar-Kreis', "Heidelberg St\x{e4}dte", 'Karlsruhe', "Karlsruhe St\x{e4}dte",
                'Rastatt', "Baden-Baden St\x{e4}dte", 'Ortenaukreis', 'Breisgau-Hochschwarzwald', 'Freiburg',
                'Emmendingen', "L\x{f6}rrach", 'Waldshut', 'Konstanz', 'Bodensee'],
);

my $KREISE_URL     = 'https://raw.githubusercontent.com/isellsoap/deutschlandGeoJSON/main/4_kreise/3_mittel.geo.json';
my $COUNTRIES_URL  = 'https://cdn.jsdelivr.net/gh/martynafford/natural-earth-geojson@master/50m/cultural/ne_50m_admin_0_countries.json';
my $RIVERS_URL     = 'https://cdn.jsdelivr.net/gh/martynafford/natural-earth-geojson@master/50m/physical/ne_50m_rivers_lake_centerlines.json';
my $WINE_DATA_FILE = 'data/wine-data.js';
my $CACHE_DIR = 'scripts/.geo-cache';

my $VBW = 460; my $VBH = 590; my $MARGIN = 28;
my $REGION_TARGET_POINTS = 60;
my $OUTLINE_TARGET_POINTS = 200;

# ---------- 下載（有快取就不重抓；countries.geojson／rivers.json 與法/義/伊比利共用同一份快取） ----------
sub fetch_cached {
  my ($url, $dest) = @_;
  if (-e $dest) { print STDERR "[cache] $dest\n"; return; }
  print STDERR "[fetch] $url -> $dest\n";
  my $rc = system("curl", "-sL", "-m", "25", "-A", "wine-platform-build/1.0", "-o", $dest, $url);
  die "curl failed ($rc) for $url\n" if $rc != 0;
  die "downloaded file is empty: $dest\n" if -z $dest;
}
mkdir $CACHE_DIR unless -d $CACHE_DIR;
my $kreiseFile    = "$CACHE_DIR/de_kreise_mittel.geo.json";
my $countriesFile = "$CACHE_DIR/countries.geojson";
my $riversFile    = "$CACHE_DIR/rivers.json";
fetch_cached($KREISE_URL, $kreiseFile);
fetch_cached($COUNTRIES_URL, $countriesFile);
fetch_cached($RIVERS_URL, $riversFile);

sub load_json {
  my $f = shift;
  local $/;
  open(my $fh, '<', $f) or die "cannot open $f: $!";
  my $j = <$fh>;
  close $fh;
  return decode_json($j);
}

# ---------- 從 wine-data.js 讀取德國產區座標 ----------
sub load_app_coords_for_country {
  my ($file, $country) = @_;
  open(my $fh, '<:encoding(UTF-8)', $file) or die "cannot open $file: $!";
  local $/;
  my $content = <$fh>;
  close $fh;
  $content =~ /appellations:\s*\[(.*?)\r?\n  \],\r?\n  grapes:/s
    or die "could not locate appellations[] array in $file\n";
  my $block = $1;
  my %coords;
  my @objs = split /\r?\n    \{\r?\n/, $block;
  for my $obj (@objs) {
    next unless $obj =~ /id:\s*'([a-z0-9-]+)'/;
    my $id = $1;
    next unless $obj =~ /country:\s*'\Q$country\E'/;
    next unless $obj =~ /coords:\s*\{\s*lat:\s*([\-0-9.]+),\s*lng:\s*([\-0-9.]+)\s*\}/;
    $coords{$id} = [$2 + 0, $1 + 0]; # [lng,lat]
  }
  return %coords;
}
my %appCoords = load_app_coords_for_country($WINE_DATA_FILE, "Germany(\x{5fb7}\x{570b})");
print STDERR '[info] loaded ' . scalar(keys %appCoords) . " Germany appellation coords from $WINE_DATA_FILE\n";

sub decimate {
  my ($pts, $target) = @_;
  my $n = scalar(@$pts);
  return @$pts if $n <= $target;
  my @out;
  for (my $i = 0; $i < $target; $i++) { push @out, $pts->[int($i * $n / $target)]; }
  return @out;
}
sub biggest_ring {
  my ($geom) = @_;
  my @rings;
  if ($geom->{type} eq 'Polygon') { @rings = @{$geom->{coordinates}}; }
  elsif ($geom->{type} eq 'MultiPolygon') { for my $p (@{$geom->{coordinates}}) { push @rings, @$p; } }
  my ($biggest) = sort { scalar(@$b) <=> scalar(@$a) } @rings;
  return $biggest;
}

# ---------- 凸包（Andrew's monotone chain） ----------
sub cross_prod {
  my ($o, $a, $b) = @_;
  return ($a->[0] - $o->[0]) * ($b->[1] - $o->[1]) - ($a->[1] - $o->[1]) * ($b->[0] - $o->[0]);
}
sub convex_hull {
  my @pts = @_;
  my %seen;
  @pts = grep { my $k = "$_->[0],$_->[1]"; !$seen{$k}++ } @pts;
  @pts = sort { $a->[0] <=> $b->[0] or $a->[1] <=> $b->[1] } @pts;
  return @pts if @pts < 3;
  my @lower;
  for my $p (@pts) {
    while (@lower >= 2 && cross_prod($lower[-2], $lower[-1], $p) <= 0) { pop @lower; }
    push @lower, $p;
  }
  my @upper;
  for my $p (reverse @pts) {
    while (@upper >= 2 && cross_prod($upper[-2], $upper[-1], $p) <= 0) { pop @upper; }
    push @upper, $p;
  }
  pop @lower; pop @upper;
  return (@lower, @upper);
}

# ---------- 縣資料載入＋各產區湊凸包 ----------
my $kreiseData = load_json($kreiseFile);
my %kreisPolys;
for my $f (@{$kreiseData->{features}}) {
  my $name = $f->{properties}{NAME_3};
  next unless defined $name;
  next unless ($f->{properties}{NAME_1} // '') =~ /Rheinland-Pfalz|Hessen|Baden-W/;
  $kreisPolys{$name} = $f;
}
print STDERR '[info] loaded ' . scalar(keys %kreisPolys) . " candidate Kreise (RLP/Hessen/BW) from $kreiseFile\n";

my %regionShape;
for my $r (keys %REGIONS) {
  my @allPts;
  for my $kreisName (@{$REGIONS{$r}}) {
    my $f = $kreisPolys{$kreisName};
    die "Kreis '$kreisName' not found in $kreiseFile — check NAME_3 spelling\n" unless $f;
    push @allPts, @{biggest_ring($f->{geometry})};
  }
  my @hull = convex_hull(@allPts);
  $regionShape{$r} = \@hull;
  print STDERR "[hull] $r kreise=[" . join(',', @{$REGIONS{$r}}) . "] totalPts=" . scalar(@allPts) . " hullPts=" . scalar(@hull) . "\n";
}

# ---------- 全國輪廓（本土主體多邊形，decimate 降點數） ----------
my $countriesData = load_json($countriesFile);
my ($germanyFeature) = grep { ($_->{properties}{NAME} // '') eq 'Germany' } @{$countriesData->{features}};
die "Germany not found in $countriesFile\n" unless $germanyFeature;
my $mainlandRaw = biggest_ring($germanyFeature->{geometry});
my @mainlandDecimated = decimate($mainlandRaw, $OUTLINE_TARGET_POINTS);
print STDERR '[outline] raw=' . scalar(@$mainlandRaw) . ' decimated=' . scalar(@mainlandDecimated) . "\n";

# ---------- 河流：萊茵河 Rhine（資料集裡有獨立命名為"Rhine"的LineString，涵蓋緯度48.97°~51.82°，
# 即巴登北段經萊茵高、美因茲一路到荷蘭；涵蓋不到巴登最南端近巴塞爾/Bodensee河段，此為資料源限制，
# 比照法國腳本「資料源沒有涵蓋就不強求」的既定做法，不外插補畫） ----------
my $riversData = load_json($riversFile);
my ($rhineFeature) = grep { (($_->{properties}{name} // '') eq 'Rhine') && $_->{geometry}{type} eq 'LineString' } @{$riversData->{features}};
die "Rhine LineString not found in $riversFile\n" unless $rhineFeature;
my @rhinePoints = @{$rhineFeature->{geometry}{coordinates}};
print STDERR '[river] rhine points=' . scalar(@rhinePoints) . "\n";

# ---------- 投影（全國輪廓／4產區形狀／產區座標／河流共用同一套參數） ----------
my @allProjPts = (@mainlandDecimated, (map { @{$regionShape{$_}} } keys %regionShape), values %appCoords, @rhinePoints);
my ($minLng, $maxLng, $minLat, $maxLat);
for my $p (@allProjPts) {
  my ($lng, $lat) = @$p;
  $minLng = $lng if !defined($minLng) || $lng < $minLng;
  $maxLng = $lng if !defined($maxLng) || $lng > $maxLng;
  $minLat = $lat if !defined($minLat) || $lat < $minLat;
  $maxLat = $lat if !defined($maxLat) || $lat > $maxLat;
}
my $midLat  = ($minLat + $maxLat) / 2;
my $cosMid  = cos($midLat * 3.14159265358979 / 180);
my $lngSpan = ($maxLng - $minLng) * $cosMid;
my $latSpan = ($maxLat - $minLat);
my $availW  = $VBW - 2 * $MARGIN;
my $availH  = $VBH - 2 * $MARGIN;
my $scale   = ($availW / $lngSpan < $availH / $latSpan) ? $availW / $lngSpan : $availH / $latSpan;
my $offX    = $MARGIN + ($availW - $lngSpan * $scale) / 2;
my $offY    = $MARGIN + ($availH - $latSpan * $scale) / 2;

sub project {
  my ($lng, $lat) = @_;
  my $x = ($lng - $minLng) * $cosMid * $scale + $offX;
  my $y = ($maxLat - $lat) * $scale + $offY;
  return (sprintf('%.1f', $x), sprintf('%.1f', $y));
}
print STDERR "[projection] minLng=$minLng maxLng=$maxLng minLat=$minLat maxLat=$maxLat cosMid=$cosMid scale=$scale offX=$offX offY=$offY viewBox=${VBW}x${VBH}\n";

# ---------- 輸出 ----------
print "=== NATIONAL OUTLINE PATH ===\n";
print 'M ' . join(' L ', map { join(',', project(@$_)) } @mainlandDecimated) . " Z\n\n";

print "=== REGION HULLS ===\n";
for my $r (sort keys %regionShape) {
  print "$r:\nM " . join(' L ', map { join(',', project(@$_)) } @{$regionShape{$r}}) . " Z\n\n";
}

# ---------- 大區文字標籤避讓（演算法與 build-iberia-map.pl 相同：依「重心到邊界平均距離÷標籤半寬」
# 比值分流，夠大的形狀用point-in-polygon硬性容器約束，過窄過小的形狀改用彈性位移上限＋指示線）----------
my %LABEL_TEXT = (
  mosel    => 'Mosel(摩澤爾)',
  rheingau => 'Rheingau(萊茵高)',
  pfalz    => 'Pfalz(普法爾茲)',
  baden    => 'Baden(巴登)',
);
sub label_halfwidth {
  my $s = shift;
  my $w = 0;
  $w += (ord($_) > 0x2e80) ? 2 : 1 for split //, $s;
  return $w * 3.0 + 2;
}
sub point_in_polygon {
  my ($x, $y, $poly) = @_;
  my $inside = 0;
  my $n = scalar(@$poly);
  for (my $i = 0, my $j = $n - 1; $i < $n; $j = $i++) {
    my ($xi, $yi) = @{$poly->[$i]};
    my ($xj, $yj) = @{$poly->[$j]};
    if ((($yi > $y) != ($yj > $y)) && ($x < ($xj - $xi) * ($y - $yi) / ($yj - $yi) + $xi)) {
      $inside = !$inside;
    }
  }
  return $inside;
}

my %markerProj;
for my $id (keys %appCoords) {
  my ($x, $y) = project(@{$appCoords{$id}});
  $markerProj{$id} = { x => $x + 0, y => $y + 0 };
}
my $MARKER_KEEPOUT = 17;

my %labelPos;
my %labelCentroid;
my %labelPoly;
my %labelRadius;
for my $r (sort keys %regionShape) {
  my @pts = @{$regionShape{$r}};
  my ($sx, $sy) = (0, 0);
  $sx += $_->[0], $sy += $_->[1] for @pts;
  my ($cx, $cy) = project($sx / scalar(@pts), $sy / scalar(@pts));
  $cx += 0; $cy += 0;
  my $halfw = label_halfwidth($LABEL_TEXT{$r} // $r);
  $labelCentroid{$r} = { x => $cx, y => $cy };
  my @polyProj = map { [ map { $_ + 0 } project(@$_) ] } @pts;
  $labelPoly{$r} = \@polyProj;
  my $sum = 0;
  $sum += sqrt(($_->[0] - $cx) ** 2 + ($_->[1] - $cy) ** 2) for @polyProj;
  $labelRadius{$r} = $sum / scalar(@polyProj);

  my ($x, $y) = ($cx, $cy);
  my ($nudgeX, $nudgeY) = (0, 0);
  for my $id (keys %markerProj) {
    my $M = $markerProj{$id};
    my $dx = $x - $M->{x}; my $dy = $y - $M->{y};
    my $dist = sqrt($dx * $dx + $dy * $dy);
    my $minDist = $MARKER_KEEPOUT + $halfw * 0.75;
    if ($dist < $minDist) {
      if ($dist < 0.01) { $dx = 0; $dy = -1; $dist = 1; }
      my $push = $minDist - $dist;
      $nudgeX += ($dx / $dist) * $push;
      $nudgeY += ($dy / $dist) * $push;
    }
  }
  $x += $nudgeX; $y += $nudgeY;
  $labelPos{$r} = { x => $x + 0, y => $y + 0, halfw => $halfw };
  print STDERR "[label-radius] $r = " . sprintf('%.1f', $labelRadius{$r}) . " halfw=$halfw"
    . (($nudgeX || $nudgeY) ? sprintf(" nudge=(%.1f,%.1f)", $nudgeX, $nudgeY) : '') . "\n";
}

my %LARGE_REGION;
for my $r (keys %labelRadius) {
  $LARGE_REGION{$r} = ($labelRadius{$r} / $labelPos{$r}{halfw} >= 1.5) ? 1 : 0;
}
print STDERR '[classification] 大形狀(硬性容器約束)=' . join(',', grep { $LARGE_REGION{$_} } sort keys %LARGE_REGION) . "\n";
print STDERR '[classification] 小形狀(位移上限+指示線)=' . join(',', grep { !$LARGE_REGION{$_} } sort keys %LARGE_REGION) . "\n";

for (my $iter = 0; $iter < 600; $iter++) {
  my $moved = 0;
  for my $r (keys %labelPos) {
    my $L = $labelPos{$r};
    for my $id (keys %markerProj) {
      my $M = $markerProj{$id};
      my $dx = $L->{x} - $M->{x};
      my $dy = $L->{y} - $M->{y};
      my $dist = sqrt($dx * $dx + $dy * $dy);
      my $minDist = $MARKER_KEEPOUT + $L->{halfw} * ($LARGE_REGION{$r} ? 0.55 : 0.75);
      if ($dist < $minDist) {
        $moved = 1;
        if ($dist < 0.01) { $dx = 1; $dy = 0; $dist = 0.01; }
        my $push = ($minDist - $dist);
        $L->{x} += ($dx / $dist) * $push;
        $L->{y} += ($dy / $dist) * $push;
      }
    }
    for my $r2 (keys %labelPos) {
      next if $r2 eq $r;
      my $L2 = $labelPos{$r2};
      my $dx = $L->{x} - $L2->{x};
      my $dy = $L->{y} - $L2->{y};
      my $dist = sqrt($dx * $dx + $dy * $dy);
      my $minDist = ($L->{halfw} + $L2->{halfw}) * 1.3;
      if ($dist < $minDist) {
        $moved = 1;
        if ($dist < 0.01) { $dx = 1; $dy = 0; $dist = 0.01; }
        my $push = ($minDist - $dist) / 2;
        $L->{x} += ($dx / $dist) * $push;
        $L->{y} += ($dy / $dist) * $push;
        $L2->{x} -= ($dx / $dist) * $push;
        $L2->{y} -= ($dy / $dist) * $push;
      }
    }
    my $C = $labelCentroid{$r};
    my $maxDisp = $LARGE_REGION{$r} ? $labelRadius{$r} * 4 : 58;
    my $ddx = $L->{x} - $C->{x};
    my $ddy = $L->{y} - $C->{y};
    my $dd = sqrt($ddx * $ddx + $ddy * $ddy);
    if ($dd > $maxDisp) {
      $L->{x} = $C->{x} + $ddx / $dd * $maxDisp;
      $L->{y} = $C->{y} + $ddy / $dd * $maxDisp;
    }
  }
  last unless $moved;
}
for my $r (keys %labelPos) {
  next unless $LARGE_REGION{$r};
  my $L = $labelPos{$r};
  my $C = $labelCentroid{$r};
  my $poly = $labelPoly{$r};
  next if point_in_polygon($L->{x}, $L->{y}, $poly);
  my $STEPS = 40;
  for my $i (1 .. $STEPS) {
    my $t = $i / $STEPS;
    my $tx = $L->{x} + ($C->{x} - $L->{x}) * $t;
    my $ty = $L->{y} + ($C->{y} - $L->{y}) * $t;
    if (point_in_polygon($tx, $ty, $poly)) {
      $L->{x} = $tx; $L->{y} = $ty;
      last;
    }
  }
}
for my $r (keys %labelPos) {
  my $L = $labelPos{$r};
  my $lo = $MARGIN + $L->{halfw};
  my $hi = $VBW - $MARGIN - $L->{halfw};
  $L->{x} = $lo if $L->{x} < $lo;
  $L->{x} = $hi if $L->{x} > $hi;
  $L->{y} = $MARGIN if $L->{y} < $MARGIN;
  $L->{y} = $VBH - $MARGIN if $L->{y} > $VBH - $MARGIN;
}

print "=== REGION LABEL CENTROIDS (大形狀已保證落在形狀內，小形狀為避讓後最佳位置) ===\n";
for my $r (sort keys %labelPos) {
  printf "%s: %.1f,%.1f\n", $r, $labelPos{$r}{x}, $labelPos{$r}{y};
}

print "\n=== LABEL LEADER LINES (僅小形狀：標籤→大區重心，比照義大利/伊比利指示線) ===\n";
for my $r (sort keys %labelPos) {
  next if $LARGE_REGION{$r};
  my $L = $labelPos{$r};
  my $C = $labelCentroid{$r};
  printf "%s: %.1f,%.1f %.1f,%.1f\n", $r, $L->{x}, $L->{y}, $C->{x}, $C->{y};
}

print "\n=== APPELLATION MARKERS ===\n";
for my $id (sort keys %appCoords) {
  print "$id: " . join(',', project(@{$appCoords{$id}})) . "\n";
}

print "\n=== RIVERS ===\n";
print "rhine:\nM " . join(' L ', map { join(',', project(@$_)) } @rhinePoints) . "\n\n";
