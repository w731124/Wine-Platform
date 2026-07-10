#!/usr/bin/env perl
# ════════════════════════════════════════════════════════════════
# build-iberia-map.pl
#
# 一次性本機建圖腳本（非網站執行期程式碼）。西班牙／葡萄牙兩國方法論並存：
# 西班牙 7 個 region 欄位值直接對應真實自治區（comunidad autónoma），
# 比照義大利模式直接抓真實邊界；葡萄牙 2 個 region（Douro／Vinho Verde）
# 是產區概念，不對應行政區，比照法國模式用省份（distrito）分組湊凸包。
# 邊界資料來源改用 geoBoundaries（義大利用的 openpolis 是義大利專屬，
# 西班牙/葡萄牙無對應資料集），全國輪廓與河流沿用 Natural Earth（與法國/
# 義大利共用快取）。
#
# 用法：perl scripts/build-iberia-map.pl
# 本機沒有 Node.js/Python，用 Perl（內建 JSON::PP）撰寫。
# ════════════════════════════════════════════════════════════════
use strict;
use warnings;
use utf8;
use JSON::PP;
binmode(STDOUT, ':utf8');
binmode(STDERR, ':utf8');

# ---------- 設定：西班牙 region 欄位值 → geoBoundaries shapeName（直接對應）----------
my %SPAIN_REGIONS = (
  'Rioja'              => 'La Rioja',
  "Castilla y Le\x{f3}n" => "Castilla y Le\x{f3}n",
  'Andalusia'          => "Andaluc\x{ed}a",
  'Catalonia'          => "Catalu\x{f1}a/Catalunya",
  'Galicia'            => 'Galicia',
  'Murcia'             => "Regi\x{f3}n de Murcia",
  'Navarra'            => 'Comunidad Foral de Navarra',
);

# ---------- 設定：葡萄牙 region 欄位值 → distrito 分組（見與使用者確認的提案）----------
my %PORTUGAL_REGIONS = (
  'Douro'       => ['VILA REAL', "BRAGAN\x{c3}\x{87}A", 'VISEU'], # 來源檔案該字元為雙重UTF-8編碼(Ç→Ã+U+0087)，比對用實際出現的形式
  'Vinho Verde' => ['VIANA DO CASTELO', 'BRAGA', 'PORTO'],
);

my $ES_ADM1_URL = 'https://media.githubusercontent.com/media/wmgeolab/geoBoundaries/9469f09592ced973a3448cf66b6100b741b64c0d/releaseData/gbOpen/ESP/ADM1/geoBoundaries-ESP-ADM1_simplified.geojson';
my $PT_ADM1_URL = 'https://media.githubusercontent.com/media/wmgeolab/geoBoundaries/9469f09592ced973a3448cf66b6100b741b64c0d/releaseData/gbOpen/PRT/ADM1/geoBoundaries-PRT-ADM1_simplified.geojson';
my $COUNTRIES_URL = 'https://cdn.jsdelivr.net/gh/martynafford/natural-earth-geojson@master/50m/cultural/ne_50m_admin_0_countries.json';
my $RIVERS_URL     = 'https://cdn.jsdelivr.net/gh/martynafford/natural-earth-geojson@master/50m/physical/ne_50m_rivers_lake_centerlines.json';
my $WINE_DATA_FILE = 'data/wine-data.js';
my $CACHE_DIR = 'scripts/.geo-cache';

my $VBW = 520; my $VBH = 460; my $MARGIN = 28;   # 伊比利半島東西寬於南北，比例與法/義不同
my $REGION_TARGET_POINTS = 60;    # 每個大區/分組形狀 decimate 後的目標點數
my $OUTLINE_TARGET_POINTS = 200;  # 全國輪廓（西+葡本土）decimate 後的目標點數

# ---------- 下載（有快取就不重抓；countries.geojson／rivers.json 與法/義共用同一份快取） ----------
sub fetch_cached {
  my ($url, $dest) = @_;
  if (-e $dest) { print STDERR "[cache] $dest\n"; return; }
  print STDERR "[fetch] $url -> $dest\n";
  my $rc = system("curl", "-sL", "-m", "25", "-A", "wine-platform-build/1.0", "-o", $dest, $url);
  die "curl failed ($rc) for $url\n" if $rc != 0;
  die "downloaded file is empty: $dest\n" if -z $dest;
}
mkdir $CACHE_DIR unless -d $CACHE_DIR;
my $esFile        = "$CACHE_DIR/es_adm1.json";
my $ptFile        = "$CACHE_DIR/pt_adm1.json";
my $countriesFile = "$CACHE_DIR/countries.geojson";
my $riversFile    = "$CACHE_DIR/rivers.json";
fetch_cached($ES_ADM1_URL, $esFile);
fetch_cached($PT_ADM1_URL, $ptFile);
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

# ---------- 從 wine-data.js 讀取西班牙／葡萄牙產區座標 ----------
# 明確用 :encoding(UTF-8) 解碼，讓 $content 是與 \x{...} 轉義字元相容的
# decoded Unicode 字串，否則會跟未解碼的原始位元組字串比對失敗（義大利腳本踩過的坑）。
sub load_app_coords_for_country {
  my ($file, $country) = @_;
  open(my $fh, '<:encoding(UTF-8)', $file) or die "cannot open $file: $!";
  local $/;
  my $content = <$fh>;
  close $fh;
  $content =~ /appellations:\s*\[(.*?)\n  \],\n  grapes:/s
    or die "could not locate appellations[] array in $file\n";
  my $block = $1;
  my %coords;
  my @objs = split /\n    \{\n/, $block;
  for my $obj (@objs) {
    next unless $obj =~ /id:\s*'([a-z0-9-]+)'/;
    my $id = $1;
    next unless $obj =~ /country:\s*'\Q$country\E'/;
    next unless $obj =~ /coords:\s*\{\s*lat:\s*([\-0-9.]+),\s*lng:\s*([\-0-9.]+)\s*\}/;
    $coords{$id} = [$2 + 0, $1 + 0]; # [lng,lat]
  }
  return %coords;
}
my %esCoords = load_app_coords_for_country($WINE_DATA_FILE, "Spain(\x{897f}\x{73ed}\x{7259})");
my %ptCoords = load_app_coords_for_country($WINE_DATA_FILE, "Portugal(\x{8461}\x{8404}\x{7259})");
my %appCoords = (%esCoords, %ptCoords);
print STDERR '[info] loaded ' . scalar(keys %esCoords) . " Spain + " . scalar(keys %ptCoords) . " Portugal appellation coords\n";

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

# ---------- 西班牙大區形狀（直接用真實邊界，不需凸包） ----------
my $esData = load_json($esFile);
my %esPolys;
for my $f (@{$esData->{features}}) {
  my $name = $f->{properties}{shapeName};
  next unless defined $name;
  $esPolys{$name} = $f;
}
my %regionShape; # 最終輸出：西班牙7個 + 葡萄牙2個，統一放在同一個 hash
for my $key (keys %SPAIN_REGIONS) {
  my $esName = $SPAIN_REGIONS{$key};
  my $f = $esPolys{$esName};
  die "Spain region '$esName' not found in $esFile\n" unless $f;
  my $biggest = biggest_ring($f->{geometry});
  my @dec = decimate($biggest, $REGION_TARGET_POINTS);
  $regionShape{$key} = \@dec;
  print STDERR "[region:ES] $key ($esName) raw=" . scalar(@$biggest) . " decimated=" . scalar(@dec) . "\n";
}

# ---------- 葡萄牙分組形狀（distrito 湊凸包，比照法國模式） ----------
my $ptData = load_json($ptFile);
my %ptPolys;
for my $f (@{$ptData->{features}}) {
  my $name = $f->{properties}{shapeName};
  next unless defined $name;
  $ptPolys{$name} = $f;
}
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
for my $key (keys %PORTUGAL_REGIONS) {
  my @distritos = @{$PORTUGAL_REGIONS{$key}};
  my @allPts;
  for my $d (@distritos) {
    my $f = $ptPolys{$d};
    die "Portugal distrito '$d' not found in $ptFile\n" unless $f;
    push @allPts, @{biggest_ring($f->{geometry})};
  }
  my @hull = convex_hull(@allPts);
  $regionShape{$key} = \@hull;
  print STDERR "[region:PT] $key distritos=[@distritos] totalPts=" . scalar(@allPts) . " hullPts=" . scalar(@hull) . "\n";
}

# ---------- 全國輪廓（西班牙本土 + 葡萄牙本土，各自抓最大環，排除離島） ----------
my $countriesData = load_json($countriesFile);
my ($esCountry) = grep { ($_->{properties}{NAME} // '') eq 'Spain' } @{$countriesData->{features}};
my ($ptCountry) = grep { ($_->{properties}{NAME} // '') eq 'Portugal' } @{$countriesData->{features}};
die "Spain not found in $countriesFile\n" unless $esCountry;
die "Portugal not found in $countriesFile\n" unless $ptCountry;
my $esMainlandRaw = biggest_ring($esCountry->{geometry});
my $ptMainlandRaw = biggest_ring($ptCountry->{geometry});
my @esMainlandDecimated = decimate($esMainlandRaw, $OUTLINE_TARGET_POINTS);
my @ptMainlandDecimated = decimate($ptMainlandRaw, int($OUTLINE_TARGET_POINTS * 0.6));
print STDERR '[outline] Spain raw=' . scalar(@$esMainlandRaw) . ' decimated=' . scalar(@esMainlandDecimated) . "\n";
print STDERR '[outline] Portugal raw=' . scalar(@$ptMainlandRaw) . ' decimated=' . scalar(@ptMainlandDecimated) . "\n";

# ---------- 河流：Duero/Douro（同一條線橫跨兩國，不需分開處理）＋ Ebro ----------
my $riversData = load_json($riversFile);
sub single_line {
  my ($name) = @_;
  my ($f) = grep { (($_->{properties}{name} // '') eq $name) && $_->{geometry}{type} eq 'LineString' } @{$riversData->{features}};
  die "no LineString feature found for river '$name'\n" unless $f;
  return $f->{geometry}{coordinates};
}
my %riverLines = (
  duero => single_line('Duero'),   # 西班牙境內稱 Duero，入海前於葡萄牙境內即為 Douro，同一條線
  ebro  => single_line('Ebro'),
);
for my $r (sort keys %riverLines) {
  print STDERR "[river] $r points=" . scalar(@{$riverLines{$r}}) . "\n";
}

# ---------- 投影（全國輪廓／9個大區形狀／產區座標／河流共用同一套參數） ----------
my @allProjPts = (@esMainlandDecimated, @ptMainlandDecimated, (map { @{$regionShape{$_}} } keys %regionShape), values %appCoords, (map { @{$riverLines{$_}} } keys %riverLines));
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
print "=== SPAIN OUTLINE PATH ===\n";
print 'M ' . join(' L ', map { join(',', project(@$_)) } @esMainlandDecimated) . " Z\n\n";

print "=== PORTUGAL OUTLINE PATH ===\n";
print 'M ' . join(' L ', map { join(',', project(@$_)) } @ptMainlandDecimated) . " Z\n\n";

print "=== REGION SHAPES ===\n";
for my $r (sort keys %regionShape) {
  print "$r:\nM " . join(' L ', map { join(',', project(@$_)) } @{$regionShape{$r}}) . " Z\n\n";
}

# ---------- 大區文字標籤避讓（推離圓形標記與彼此，避免被蓋住，見與使用者確認的需求）----------
# 標籤實際顯示文字（比對 index.html 既有內容，含中文括號說明），比照法國/義大利腳本改用
# 「實際顯示文字長度」而非「大區 key 長度」估計寬度——之前用 key 長度會嚴重低估寬度
# （例如 key「rioja」5字元，但實際顯示「Rioja(里奧哈)」含中文視覺寬度大得多），
# 這正是 Rioja/Navarra 兩個標籤先前會擠在一起的根本原因。
my %LABEL_TEXT = (
  'Rioja'                        => "Rioja(\x{91cc}\x{5967}\x{54c8})",
  "Castilla y Le\x{f3}n"         => "Castilla y Le\x{f3}n(\x{5361}\x{65af}\x{63d0}\x{4e9e}\x{ff0d}\x{840a}\x{6606})",
  'Andalusia'                    => "Andalusia(\x{5b89}\x{9054}\x{9b6f}\x{897f}\x{4e9e})",
  'Catalonia'                    => "Catalonia(\x{52a0}\x{6cf0}\x{9686}\x{5c3c}\x{4e9e})",
  'Galicia'                      => "Galicia(\x{52a0}\x{5229}\x{897f}\x{4e9e})",
  'Murcia'                       => "Murcia(\x{7a46}\x{723e}\x{897f}\x{4e9e})",
  'Navarra'                      => "Navarra(\x{7d0d}\x{74e6}\x{62c9})",
  'Douro'                        => "Douro(\x{675c}\x{7f85}\x{6cb3})",
  'Vinho Verde'                  => "Vinho Verde(\x{9752}\x{9152}\x{7522}\x{5340})",
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
my $MARKER_KEEPOUT = 17; # 標記圓半徑(7.5)+光暈環(8)再留一點緩衝

my %labelPos;
my %labelCentroid;
my %labelPoly;
my %labelRadius; # 每個大區形狀「重心到邊界的平均距離」，取代寫死的固定最大位移，
                  # 讓 Castilla y León 這種大形狀可以移動較多、Rioja/Navarra 這種
                  # 小形狀移動範圍自動跟著縮小，不會硬性要求「一定要留在形狀內」
                  # 導致兩個相鄰小形狀的標籤怎麼推都被拉回重心附近而擠在一起。
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

  # 初始位置預設為重心，但若重心本身就落在某個產區標記的安全距離內，先沿
  # 「重心→該標記」反方向做一次性偏移（加總全部衝突標記的推力向量）再開始
  # 迭代。這是為了解決 Vinho Verde 這類「大區重心與同名產區標記幾乎重合
  # （僅約5.8px）」的簡併起點問題：從幾乎疊在標記上的位置開始迭代，即使推力
  # 方向正確，仍容易收斂到還是太近的位置，先給一個非簡併的起點可以讓後續
  # 迭代更穩定地收斂到真正不重疊的位置。
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

# ---------- 依形狀大小分流：夠大的大區比照法國用硬性容器約束（point-in-polygon），
# 過窄過小的大區（文字寬度接近或超過形狀半徑，怎麼推都放不下完整文字）比照義大利
# 改用彈性位移上限＋指示線。分類依「重心到邊界平均距離 ÷ 標籤半寬」比值判斷，
# 而非憑印象寫死清單，避免地理資料調整後分類就跟著過時。----------
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
    # 推離所有產區標記（不只自己大區內的），用標籤半寬完整估計文字實際會蓋到的範圍
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
    # 推離其他大區標籤（互相之間也不要重疊）
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
    # 每一輪推完就立刻限制離自己重心的距離，避免密集區域把標籤越推越遠、最後才
    # 夾回去導致擠成一團。大形狀給較寬鬆的暫時上限（*4，最終交給下面的
    # point-in-polygon 硬性拉回收斂），小形狀維持原本的彈性上限（*2.2）。
    my $C = $labelCentroid{$r};
    # 小形狀改用固定像素上限（比照義大利 MAX_DISPLACEMENT=58），而非重心半徑的倍數：
    # 修正 LABEL_TEXT 對照表的 key 不一致 bug 後，標籤實際寬度（含中文括號）比先前
    # 估計大上許多，若仍用半徑倍數會讓 Castilla y León 這種大形狀的標籤被推到離
    # 重心100px以上、指示線橫跨大半個地圖，固定上限才能讓指示線長度維持合理範圍。
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
# 大形狀的最終保底：若避讓運算後仍落在形狀外，沿著「目前位置→重心」的線段
# 逐步退回，取第一個落在形狀內的點（比照法國的硬性容器約束做法）。
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
# 夾住邊界，避免標籤被推出畫布外
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

print "\n=== LABEL LEADER LINES (僅小形狀：標籤→大區重心，比照義大利指示線) ===\n";
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
for my $r (sort keys %riverLines) {
  print "$r:\nM " . join(' L ', map { join(',', project(@$_)) } @{$riverLines{$r}}) . "\n\n";
}
