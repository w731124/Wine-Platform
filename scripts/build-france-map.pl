#!/usr/bin/env perl
# ════════════════════════════════════════════════════════════════
# build-france-map.pl
#
# 一次性本機建圖腳本（非網站執行期程式碼）。抓取法國省份／國界 GeoJSON
# （快取在 scripts/.geo-cache/，不重複下載），對每個大產區的省份分組
# 算凸包（convex hull），把全國輪廓 decimate 成較少點數，最後用同一套
# 投影參數把「全國輪廓／六大產區形狀／data/wine-data.js 裡的產區座標」
# 一起換算成 SVG 座標，結果印到 stdout，供人工核對後貼進 index.html。
#
# 用法：perl scripts/build-france-map.pl
#
# 本機環境沒有 Node.js，python3/python 只是無法執行的 Windows Store 空殼，
# 因此用 Perl 撰寫（內建 JSON::PP 可解析 GeoJSON，不需額外安裝套件）。
# ════════════════════════════════════════════════════════════════
use strict;
use warnings;
use utf8;
use JSON::PP;
binmode(STDOUT, ':utf8');
binmode(STDERR, ':utf8');

# ---------- 設定：大產區 → 省份代碼分組（法國 INSEE department code）----------
# 分組依據見 DECISIONS.md #81（已與使用者逐一確認過，含刻意擴充的省份）
my %REGIONS = (
  bordeaux  => [qw(33)],
  burgundy  => [qw(21 71)],           # Chablis(89) 維持獨立標記，不併入主體形狀
  champagne => [qw(51 10)],           # 10=Aube，AOC真實涵蓋但目前無資料點
  alsace    => [qw(67 68)],
  loire     => [qw(44 49 37 41 18 58)], # 49/41 純視覺連貫用途，目前無資料點
  rhone     => [qw(69 26 84 07 30)],    # 07/30 AOC真實涵蓋但目前無資料點
);

my $DEPT_URL  = 'https://cdn.jsdelivr.net/gh/gregoiredavid/france-geojson@master/departements-version-simplifiee.geojson';
my $METRO_URL = 'https://cdn.jsdelivr.net/gh/gregoiredavid/france-geojson@master/metropole-version-simplifiee.geojson';
my $RIVERS_URL = 'https://cdn.jsdelivr.net/gh/martynafford/natural-earth-geojson@master/50m/physical/ne_50m_rivers_lake_centerlines.json';
my $WINE_DATA_FILE = 'data/wine-data.js';
my $CACHE_DIR = 'scripts/.geo-cache';

my $VBW = 580; my $VBH = 565; my $MARGIN = 30;      # 與現有 index.html #france-svg 一致
my $MAINLAND_TARGET_POINTS = 220;                    # 全國輪廓 decimate 後的目標點數

# ---------- 下載（有快取就不重抓）----------
sub fetch_cached {
  my ($url, $dest) = @_;
  if (-e $dest) { print STDERR "[cache] $dest\n"; return; }
  print STDERR "[fetch] $url -> $dest\n";
  my $rc = system("curl", "-s", "-m", "20", "-o", $dest, $url);
  die "curl failed ($rc) for $url\n" if $rc != 0;
  die "downloaded file is empty: $dest\n" if -z $dest;
}
mkdir $CACHE_DIR unless -d $CACHE_DIR;
my $deptFile   = "$CACHE_DIR/departements-simple.geojson";
my $metroFile  = "$CACHE_DIR/metropole-simple.geojson";
my $riversFile = "$CACHE_DIR/rivers.json";
fetch_cached($DEPT_URL, $deptFile);
fetch_cached($METRO_URL, $metroFile);
fetch_cached($RIVERS_URL, $riversFile);

# ---------- 從 wine-data.js 直接讀取法國產區座標（單一資料來源，不手動抄）----------
sub load_app_coords {
  my $file = shift;
  open(my $fh, '<', $file) or die "cannot open $file: $!";
  local $/;
  my $content = <$fh>;
  close $fh;
  $content =~ /appellations:\s*\[(.*?)\n  \],\n  grapes:/s
    or die "could not locate appellations[] array in $file — file structure may have changed\n";
  my $block = $1;
  my %coords;
  while ($block =~ /id:\s*'([a-z0-9-]+)'.*?coords:\s*\{\s*lat:\s*([\-0-9.]+),\s*lng:\s*([\-0-9.]+)\s*\}/gs) {
    $coords{$1} = [$3 + 0, $2 + 0]; # 存成 [lng,lat]
  }
  return %coords;
}
my %appCoords = load_app_coords($WINE_DATA_FILE);
print STDERR '[info] loaded ' . scalar(keys %appCoords) . " appellation coords from $WINE_DATA_FILE\n";

# ---------- 載入 GeoJSON，取出各省份的邊界點（排除離島小多邊形，只取主體）----------
sub load_json {
  my $f = shift;
  local $/;
  open(my $fh, '<', $f) or die "cannot open $f: $!";
  my $j = <$fh>;
  close $fh;
  return decode_json($j);
}
my $deptData = load_json($deptFile);
my %wantedDepts;
$wantedDepts{$_} = 1 for map { @{$REGIONS{$_}} } keys %REGIONS;

my %deptPoints;
for my $f (@{$deptData->{features}}) {
  my $code = $f->{properties}{code};
  next unless $wantedDepts{$code};
  my $geom = $f->{geometry};
  my @allRings;
  if ($geom->{type} eq 'Polygon') {
    @allRings = @{$geom->{coordinates}};
  } elsif ($geom->{type} eq 'MultiPolygon') {
    push @allRings, @$_ for @{$geom->{coordinates}};
  }
  my ($biggest) = sort { scalar(@$b) <=> scalar(@$a) } @allRings;
  $deptPoints{$code} = $biggest;
}
for my $code (sort keys %wantedDepts) {
  die "missing department $code in $deptFile — geojson source may have changed\n"
    unless exists $deptPoints{$code};
}

# ---------- 凸包（Andrew's monotone chain）----------
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

my %regionHull;
for my $r (keys %REGIONS) {
  my @allPts;
  push @allPts, @{$deptPoints{$_}} for @{$REGIONS{$r}};
  my @hull = convex_hull(@allPts);
  $regionHull{$r} = \@hull;
  print STDERR "[hull] $r depts=[@{$REGIONS{$r}}] totalPts=" . scalar(@allPts) . " hullPts=" . scalar(@hull) . "\n";
}

# ---------- 全國輪廓（本土主體多邊形，decimate 降點數）----------
my $metro = load_json($metroFile);
my @allPolys = $metro->{geometry}{type} eq 'MultiPolygon'
  ? @{$metro->{geometry}{coordinates}}
  : ($metro->{geometry}{coordinates});
my ($mainlandPoly) = sort { scalar(@{$b->[0]}) <=> scalar(@{$a->[0]}) } @allPolys;
my $mainlandRing = $mainlandPoly->[0];

sub decimate {
  my ($pts, $target) = @_;
  my $n = scalar(@$pts);
  return @$pts if $n <= $target;
  my @out;
  for (my $i = 0; $i < $target; $i++) { push @out, $pts->[int($i * $n / $target)]; }
  return @out;
}
my @mainlandDecimated = decimate($mainlandRing, $MAINLAND_TARGET_POINTS);
print STDERR '[outline] raw=' . scalar(@$mainlandRing) . ' decimated=' . scalar(@mainlandDecimated) . "\n";

# ---------- 河流（Natural Earth 1:50m rivers，僅取羅亞爾河/隆河/加隆河三條）----------
# 資料集裡同名河流常拆成多個 LineString/MultiLineString 片段，以下的片段索引是
# 針對這份資料集人工核對過的結果（見 DECISIONS.md 河流任務），非通用邏輯——
# 如果之後 Natural Earth 更新資料集、片段順序改變，這裡需要重新核對。
# 加隆河(Garonne)是波爾多左右岸分界的其中一條河，資料集裡查不到多爾多涅河(Dordogne)，
# 因此無法完整畫出兩河匯流成吉倫特河口(Gironde)的示意，僅以加隆河概略標示分界位置。
my $riversData = load_json($riversFile);
my %riverFeaturesByName;
for my $f (@{$riversData->{features}}) {
  my $name = $f->{properties}{name};
  next unless defined $name;
  push @{$riverFeaturesByName{$name}}, $f;
}

sub multiline_segment {
  my ($name, $segIdx) = @_;
  my ($f) = grep { ($_->{geometry}{type} // '') eq 'MultiLineString' } @{$riverFeaturesByName{$name} || []};
  die "no MultiLineString feature found for river '$name'\n" unless $f;
  return $f->{geometry}{coordinates}[$segIdx];
}
sub single_line {
  my ($name) = @_;
  my ($f) = grep { ($_->{geometry}{type} // '') eq 'LineString' } @{$riverFeaturesByName{$name} || []};
  die "no LineString feature found for river '$name'\n" unless $f;
  return $f->{geometry}{coordinates};
}

my $loireSeg1 = multiline_segment('Loire', 1); # 中段→源頭(南)：與 seg0 共用中段起點，需反轉才能銜接
my $loireSeg0 = multiline_segment('Loire', 0); # 中段→出海口(西，南特)
my %riverLines = (
  loire  => [ reverse(@$loireSeg1), @$loireSeg0 ],                                       # 源頭(南)→中段→出海口(西，南特)
  rhone  => multiline_segment("Rh\x{f4}ne", 1),                                          # 日內瓦湖附近→隆河谷→三角洲
  garonne => single_line('Garonne'),                                                     # 土魯斯附近→波爾多
);
for my $r (sort keys %riverLines) {
  print STDERR "[river] $r points=" . scalar(@{$riverLines{$r}}) . "\n";
}

# ---------- 投影（全國輪廓／六產區形狀／產區座標／河流共用同一套參數）----------
my @allProjPts = (@mainlandDecimated, (map { @{$regionHull{$_}} } keys %regionHull), values %appCoords, (map { @{$riverLines{$_}} } keys %riverLines));
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
for my $r (sort keys %regionHull) {
  print "$r:\nM " . join(' L ', map { join(',', project(@$_)) } @{$regionHull{$r}}) . " Z\n\n";
}

print "=== REGION LABEL CENTROIDS ===\n";
for my $r (sort keys %regionHull) {
  my @pts = @{$regionHull{$r}};
  my ($sx, $sy) = (0, 0);
  $sx += $_->[0], $sy += $_->[1] for @pts;
  print "$r: " . join(',', project($sx / scalar(@pts), $sy / scalar(@pts))) . "\n";
}

print "\n=== APPELLATION MARKERS ===\n";
for my $id (sort keys %appCoords) {
  print "$id: " . join(',', project(@{$appCoords{$id}})) . "\n";
}

print "\n=== RIVERS ===\n";
for my $r (sort keys %riverLines) {
  print "$r:\nM " . join(' L ', map { join(',', project(@$_)) } @{$riverLines{$r}}) . "\n\n";
}
