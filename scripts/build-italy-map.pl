#!/usr/bin/env perl
# ════════════════════════════════════════════════════════════════
# build-italy-map.pl
#
# 一次性本機建圖腳本（非網站執行期程式碼）。與 build-france-map.pl 同一套
# 方法論，但義大利的產區「region」欄位本身就直接對應真實行政大區
# （義大利20個 regioni 之一），不需要像法國那樣用省份湊出凸包近似值——
# 直接抓每個對應大區的真實邊界即可，反而比法國單純。
#
# 用法：perl scripts/build-italy-map.pl
# 本機沒有 Node.js/Python，用 Perl（內建 JSON::PP）撰寫。
# ════════════════════════════════════════════════════════════════
use strict;
use warnings;
use utf8;
use JSON::PP;
binmode(STDOUT, ':utf8');
binmode(STDERR, ':utf8');

# ---------- 設定：本站用的英文大區名 → 資料集裡的義大利文 reg_name ----------
my %REGIONS = (
  piedmont  => "Piemonte",
  tuscany   => "Toscana",
  veneto    => "Veneto",
  sicily    => "Sicilia",
  abruzzo   => "Abruzzo",
  puglia    => "Puglia",
  lombardy  => "Lombardia",
  campania  => "Campania",
  trentino  => "Trentino-Alto Adige/S\x{fc}dtirol",
  emilia    => "Emilia-Romagna",
  friuli    => "Friuli-Venezia Giulia",
  marche    => "Marche",
  umbria    => "Umbria",
);

my $REGIONS_URL   = 'https://cdn.jsdelivr.net/gh/openpolis/geojson-italy@master/geojson/limits_IT_regions.geojson';
my $COUNTRIES_URL = 'https://cdn.jsdelivr.net/gh/martynafford/natural-earth-geojson@master/50m/cultural/ne_50m_admin_0_countries.json';
my $RIVERS_URL    = 'https://cdn.jsdelivr.net/gh/martynafford/natural-earth-geojson@master/50m/physical/ne_50m_rivers_lake_centerlines.json';
my $WINE_DATA_FILE = 'data/wine-data.js';
my $CACHE_DIR = 'scripts/.geo-cache';

my $VBW = 420; my $VBH = 540; my $MARGIN = 26; # 與現有 index.html 義大利 svg 尺寸相近
my $REGION_TARGET_POINTS = 60;   # 每個大區形狀 decimate 後的目標點數
my $OUTLINE_TARGET_POINTS = 160; # 全國輪廓（本土+西西里）decimate 後的目標點數

# ---------- 下載（有快取就不重抓；rivers.json 與法國腳本共用同一份快取） ----------
sub fetch_cached {
  my ($url, $dest) = @_;
  if (-e $dest) { print STDERR "[cache] $dest\n"; return; }
  print STDERR "[fetch] $url -> $dest\n";
  my $rc = system("curl", "-s", "-m", "25", "-o", $dest, $url);
  die "curl failed ($rc) for $url\n" if $rc != 0;
  die "downloaded file is empty: $dest\n" if -z $dest;
}
mkdir $CACHE_DIR unless -d $CACHE_DIR;
my $regionsFile   = "$CACHE_DIR/italy-regions.geojson";
my $countriesFile = "$CACHE_DIR/countries.geojson";
my $riversFile    = "$CACHE_DIR/rivers.json";
fetch_cached($REGIONS_URL, $regionsFile);
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

# ---------- 從 wine-data.js 讀取義大利產區座標 ----------
sub load_app_coords_for_country {
  my ($file, $country) = @_;
  # 明確用 :encoding(UTF-8) 解碼，讓 $content 是與 \x{...} 轉義字元相容的
  # decoded Unicode 字串，否則 $content 會是未解碼的原始 UTF-8 位元組字串，
  # 跟 $country（\x{}轉義產生的已解碼字串）比對永遠不會相符。
  open(my $fh, '<:encoding(UTF-8)', $file) or die "cannot open $file: $!";
  local $/;
  my $content = <$fh>;
  close $fh;
  $content =~ /appellations:\s*\[(.*?)\n  \],\n  grapes:/s
    or die "could not locate appellations[] array in $file\n";
  my $block = $1;
  # 用 country 欄位切開每個大物件的邊界較複雜，改用「往回找最近的 id」的方式：
  # 掃過整段文字，遇到 id 記住，遇到同一物件的 country 若符合才收進結果。
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
my %appCoords = load_app_coords_for_country($WINE_DATA_FILE, "Italy(\x{7fa9}\x{5927}\x{5229})");
print STDERR '[info] loaded ' . scalar(keys %appCoords) . " Italy appellation coords\n";

# ---------- 大區形狀（直接用真實邊界，不需凸包） ----------
my $regionsData = load_json($regionsFile);
my %regionPolys;
for my $f (@{$regionsData->{features}}) {
  my $name = $f->{properties}{reg_name};
  next unless defined $name;
  $regionPolys{$name} = $f;
}
sub decimate {
  my ($pts, $target) = @_;
  my $n = scalar(@$pts);
  return @$pts if $n <= $target;
  my @out;
  for (my $i = 0; $i < $target; $i++) { push @out, $pts->[int($i * $n / $target)]; }
  return @out;
}
my %regionShape;
for my $key (keys %REGIONS) {
  my $itName = $REGIONS{$key};
  my $f = $regionPolys{$itName};
  die "region '$itName' not found in $regionsFile\n" unless $f;
  my $geom = $f->{geometry};
  my @rings;
  if ($geom->{type} eq 'Polygon') { @rings = @{$geom->{coordinates}}; }
  elsif ($geom->{type} eq 'MultiPolygon') { for my $p (@{$geom->{coordinates}}) { push @rings, @$p; } }
  my ($biggest) = sort { scalar(@$b) <=> scalar(@$a) } @rings;
  my @dec = decimate($biggest, $REGION_TARGET_POINTS);
  $regionShape{$key} = \@dec;
  print STDERR "[region] $key ($itName) raw=" . scalar(@$biggest) . " decimated=" . scalar(@dec) . "\n";
}

# ---------- 全國輪廓（本土 + 西西里，不含薩丁尼亞與小島） ----------
my $countriesData = load_json($countriesFile);
my ($italyFeature) = grep { ($_->{properties}{NAME} // '') eq 'Italy' } @{$countriesData->{features}};
die "Italy not found in $countriesFile\n" unless $italyFeature;
my @italyPolys = @{$italyFeature->{geometry}{coordinates}};
my @sortedPolys = sort { scalar(@{$b->[0]}) <=> scalar(@{$a->[0]}) } @italyPolys;
my @mainlandDecimated = decimate($sortedPolys[0][0], $OUTLINE_TARGET_POINTS);   # 本土
my @sicilyDecimated   = decimate($sortedPolys[1][0], int($OUTLINE_TARGET_POINTS/2)); # 西西里
print STDERR '[outline] mainland raw=' . scalar(@{$sortedPolys[0][0]}) . ' decimated=' . scalar(@mainlandDecimated) . "\n";
print STDERR '[outline] sicily raw=' . scalar(@{$sortedPolys[1][0]}) . ' decimated=' . scalar(@sicilyDecimated) . "\n";

# ---------- 河流：波河 Po ----------
my $riversData = load_json($riversFile);
my ($poFeature) = grep { (($_->{properties}{name} // '') eq 'Po') && $_->{geometry}{type} eq 'LineString' } @{$riversData->{features}};
die "Po river not found in $riversFile\n" unless $poFeature;
my @poPoints = @{$poFeature->{geometry}{coordinates}};
print STDERR '[river] po points=' . scalar(@poPoints) . "\n";

# ---------- 投影（全國輪廓／大區形狀／產區座標／河流共用同一套參數） ----------
my @allProjPts = (@mainlandDecimated, @sicilyDecimated, (map { @{$regionShape{$_}} } keys %regionShape), values %appCoords, @poPoints);
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
print "=== MAINLAND OUTLINE PATH ===\n";
print 'M ' . join(' L ', map { join(',', project(@$_)) } @mainlandDecimated) . " Z\n\n";

print "=== SICILY OUTLINE PATH ===\n";
print 'M ' . join(' L ', map { join(',', project(@$_)) } @sicilyDecimated) . " Z\n\n";

print "=== REGION SHAPES ===\n";
for my $r (sort keys %regionShape) {
  print "$r:\nM " . join(' L ', map { join(',', project(@$_)) } @{$regionShape{$r}}) . " Z\n\n";
}

print "=== REGION LABEL CENTROIDS ===\n";
for my $r (sort keys %regionShape) {
  my @pts = @{$regionShape{$r}};
  my ($sx, $sy) = (0, 0);
  $sx += $_->[0], $sy += $_->[1] for @pts;
  print "$r: " . join(',', project($sx / scalar(@pts), $sy / scalar(@pts))) . "\n";
}

print "\n=== APPELLATION MARKERS ===\n";
for my $id (sort keys %appCoords) {
  print "$id: " . join(',', project(@{$appCoords{$id}})) . "\n";
}

print "\n=== RIVERS ===\n";
print "po:\nM " . join(' L ', map { join(',', project(@$_)) } @poPoints) . "\n\n";
