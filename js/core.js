/* ════════════════════════════════════
   STATE
════════════════════════════════════ */
let curL1='all', curL2='all-regions', srchQ='';
let radarInst=null;
let selMapMarker=null;

/* ════════════════════════════════════
   COUNTRY FLAG ICONS（自架 SVG，取代不受作業系統字型支援保證的國旗 emoji）
   key 需與 wine-data.js 的 country 欄位值完全一致；value 為 ISO 3166-1 alpha-2 小寫國碼，
   對應 assets/flags/{code}.svg 檔名。新增國家資料庫時記得同步在此補上對照，
   否則 auditCountryFlags() 會在 console 輸出警告。
════════════════════════════════════ */
const COUNTRY_FLAG_CODE = {
  'Argentina(阿根廷)': 'ar',
  'Australia(澳洲)': 'au',
  'Austria(奧地利)': 'at',
  'Chile(智利)': 'cl',
  'France(法國)': 'fr',
  'Germany(德國)': 'de',
  'Italy(義大利)': 'it',
  'New Zealand(紐西蘭)': 'nz',
  'Portugal(葡萄牙)': 'pt',
  'South Africa(南非)': 'za',
  'Spain(西班牙)': 'es',
  'USA(美國)': 'us'
};

function flagIconHTML(country, sizePx){
  sizePx = sizePx || 18;
  const code = COUNTRY_FLAG_CODE[country];
  if(!code) return '';
  const h = Math.round(sizePx * 0.75);
  return `<img src="assets/flags/${code}.svg" alt="${country}" width="${sizePx}" height="${h}" style="width:${sizePx}px;height:${h}px;object-fit:cover;border-radius:2px;vertical-align:middle;display:inline-block;">`;
}

/* ════════════════════════════════════
   LEGACY CELLAR CLEANUP（一次性）
   酒窖功能已移除，此處僅負責清除使用者瀏覽器中殘留的舊 localStorage 資料。
   確認所有使用者端資料清除完畢後，此函式與其呼叫可一併刪除。
════════════════════════════════════ */
function cleanupLegacyCellarStorage(){
  try{ localStorage.removeItem('wine_cellar'); }catch{}
}

/* ════════════════════════════════════
   DATA CONSISTENCY AUDIT
   稽核 WINE_DB.appellations 是否在「地圖座標」「比較模式所需欄位」
   「（法國產區）年份矩陣綁定」三個面向都具備完整資料，於 console 輸出報告。
   純檢查、不更動任何既有渲染邏輯；可在 DOMContentLoaded 後安全呼叫。
════════════════════════════════════ */
function auditWineDB(){
  const report = { total: WINE_DB.appellations.length, missingMap: [], missingCompare: [], franceUnboundToVintage: [], ok: [] };
  const vintageRowIds = WINE_DB.vintages.rows.map(r=>r.id);

  // 將法國年份列 id 拆解為關鍵字，用於模糊比對 subRegion/region 是否能掛上某一列
  const vintageKeywords = {
    'bordeaux-left': ['Left Bank','Médoc','左岸','Pauillac','Margaux'],
    'bordeaux-right': ['Right Bank','右岸','Saint-Émilion','Pomerol'],
    'burgundy-red': ['Côte de Nuits','夜丘'],
    'burgundy-white': ['Côte de Beaune','Chablis','伯恩丘','夏布利'],
    'rhone-north': ['Northern Rhône','北隆河','Hermitage'],
    'rhone-south': ['Southern Rhône','南隆河','Châteauneuf'],
    'loire': ['Loire','羅亞爾','Muscadet','Vouvray','Sancerre'],
    'alsace': ['Alsace','阿爾薩斯'],
    'champagne': ['Champagne','香檳','Reims','Marne','Blancs'],
    'languedoc-roussillon': ['Languedoc','朗格多克','Roussillon','胡西雍'],
  };

  WINE_DB.appellations.forEach(app=>{
    const issues = [];

    // 1) 地圖座標檢查：DOM 中是否存在對應 pulse-marker
    const hasMapNode = !!document.querySelector(`.pulse-marker[data-id="${app.id}"]`);
    if(!hasMapNode){ report.missingMap.push(app.id); issues.push('map'); }

    // 3) 比較模式檢查：profile 七維是否齊全（比較模式雷達圖實際讀取的欄位）
    const p = app.profile;
    const pOk = p && ['tannin','acidity','body','alcohol','finish','aging','floral'].every(k => typeof p[k] === 'number');
    if(!pOk){ report.missingCompare.push(app.id); issues.push('compare'); }

    // 4) 法國產區年份矩陣綁定檢查
    if(app.country === 'France(法國)'){
      const haystack = `${app.region} ${app.subRegion}`;
      const matched = Object.keys(vintageKeywords).some(rowId =>
        vintageRowIds.includes(rowId) && vintageKeywords[rowId].some(kw => haystack.includes(kw))
      );
      if(!matched){ report.franceUnboundToVintage.push(app.id); issues.push('vintage-binding'); }
    }

    if(issues.length === 0) report.ok.push(app.id);
  });

  // Console 報告輸出
  console.groupCollapsed(`%c[WINE_DB Audit] ${report.ok.length}/${report.total} 完全通過`, 'color:#5C061C;font-weight:bold;');
  if(report.missingMap.length) console.warn('❌ 缺少地圖座標 (data-id 未在地圖 DOM 中找到):', report.missingMap);
  if(report.missingCompare.length) console.warn('❌ 缺少比較模式所需 profile 欄位:', report.missingCompare);
  if(report.franceUnboundToVintage.length) console.warn('❌ 法國產區未綁定至年份矩陣任何一列:', report.franceUnboundToVintage);
  if(!report.missingMap.length && !report.missingCompare.length && !report.franceUnboundToVintage.length){
    console.log('%c✅ 全部產區通過一致性稽核', 'color:#1a7a1a;font-weight:bold;');
  }
  console.groupEnd();

  return report;
}

/* ════════════════════════════════════
   COUNTRY FLAG AUDIT
   確認 WINE_DB.appellations 內每個 country 都能對應到 COUNTRY_FLAG_CODE 的國碼，
   且該國碼的 SVG 檔案實際可載入，避免擴充新國家時忘記補國旗圖示。
════════════════════════════════════ */
function auditCountryFlags(){
  const countries = [...new Set(WINE_DB.appellations.map(a => a.country))];
  const missingMapping = countries.filter(c => !COUNTRY_FLAG_CODE[c]);
  if(missingMapping.length){
    console.warn('❌ [Flag Audit] 以下 country 在 COUNTRY_FLAG_CODE 找不到對照的國碼:', missingMapping);
  }
  countries.filter(c => COUNTRY_FLAG_CODE[c]).forEach(c => {
    const code = COUNTRY_FLAG_CODE[c];
    const img = new Image();
    img.onerror = () => console.warn(`❌ [Flag Audit] ${c} 對應的 assets/flags/${code}.svg 載入失敗（檔案可能遺失或路徑錯誤）`);
    img.src = `assets/flags/${code}.svg`;
  });
  if(!missingMapping.length){
    console.log('%c✅ 全部產區國家皆有對應的國碼', 'color:#1a7a1a;font-weight:bold;');
  }
}

/* ════════════════════════════════════
   TAB / MAP NAV
════════════════════════════════════ */
function showPanel(name,btn){
  document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  const target = document.getElementById('panel-'+name);
  if (target) target.classList.add('active');
  if (btn) btn.classList.add('active');

  // Trigger chart re-draws in case hidden state broke sizes
  if (name === 'compare') {
    renderCompareRadar();
    }
}

/* ════════════════════════════════════
   TAB NAV：下拉分類群組（產區與分級／品種與釀造／工具）
════════════════════════════════════ */
function toggleTabGroup(btn, groupId){
  const dd = document.getElementById('dd-'+groupId);
  if (!dd) return;
  const isOpen = dd.classList.contains('open');
  document.querySelectorAll('.tab-dropdown').forEach(d=>d.classList.remove('open'));
  document.querySelectorAll('.tab-group-trigger').forEach(b=>b.classList.remove('dd-open'));
  if (!isOpen) {
    dd.classList.add('open');
    btn.classList.add('dd-open');
  }
}

function selectTabFromGroup(itemBtn, panelName, evt){
  if (evt) evt.stopPropagation();
  const groupEl = itemBtn.closest('.tab-group');
  const trigger = groupEl ? groupEl.querySelector('.tab-group-trigger') : null;
  document.querySelectorAll('.tab-dropdown-item').forEach(b=>b.classList.remove('active'));
  itemBtn.classList.add('active');
  showPanel(panelName, trigger);
  document.querySelectorAll('.tab-dropdown').forEach(d=>d.classList.remove('open'));
  document.querySelectorAll('.tab-group-trigger').forEach(b=>b.classList.remove('dd-open'));
}

document.addEventListener('click', function(e){
  if (!e.target.closest('.tab-group')) {
    document.querySelectorAll('.tab-dropdown').forEach(d=>d.classList.remove('open'));
    document.querySelectorAll('.tab-group-trigger').forEach(b=>b.classList.remove('dd-open'));
  }
});

function switchToPanel(name){
  // 獨立分頁按鈕（不在下拉群組內，例如品飲系統）
  const directBtn = document.querySelector(`.tab-nav > .tab-btn[onclick*="showPanel('${name}'"]`);
  if (directBtn) { showPanel(name, directBtn); return; }
  // 下拉群組內的分頁：連動高亮群組觸發鈕與對應項目
  const item = document.querySelector(`.tab-dropdown-item[onclick*="'${name}',event"]`);
  if (item) {
    const groupEl = item.closest('.tab-group');
    const trigger = groupEl ? groupEl.querySelector('.tab-group-trigger') : null;
    document.querySelectorAll('.tab-dropdown-item').forEach(b=>b.classList.remove('active'));
    item.classList.add('active');
    showPanel(name, trigger);
  }
}

/* ════════════════════════════════════
   CROSS-PANEL LINKS：產區 ⇄ 品種
════════════════════════════════════ */
function findGrapeIdByName(text){
  const g = (WINE_DB.grapes || []).find(x => {
    const englishName = x.name.split('(')[0].trim();
    if (englishName === text) return true;
    return englishName.split('/').map(s => s.trim()).includes(text);
  });
  return g ? g.id : null;
}

function jumpToGrapeById(id){
  const g = (WINE_DB.grapes || []).find(x => x.id === id);
  if (!g) return;
  closeDrawer();
  switchToPanel('grapes');
  const allBtn = document.querySelector('#grape-color-filters .fp');
  if (allBtn) setGrapeColorFilter('all', allBtn);
  setTimeout(() => {
    const hdr = document.querySelector(`.acc-hdr[data-grape-id="${id}"]`);
    if (hdr) {
      hdr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (!hdr.classList.contains('open')) toggleGrapeCard(hdr, id);
    }
  }, 50);
}

function jumpToRegionById(id){
  const app = WINE_DB.appellations.find(a => a.id === id);
  if (!app) return;
  switchToPanel('regions');
  openDrawer(app);
}
function showMap(id,btn){
  document.querySelectorAll('.map-subpanel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.map-tab').forEach(b=>b.classList.remove('active'));
  document.getElementById('map-'+id).classList.add('active');
  btn.classList.add('active');
  clearInspector();
  if (id === 'france') renderFranceMarkerList();
  else if (id === 'italy') renderItalyMarkerList();
  else if (id === 'iberia') renderIberiaMarkerList();
}

/* ════════════════════════════════════
   L1 FILTER
════════════════════════════════════ */
const l1Filters = document.getElementById('l1-filters');
if (l1Filters) {
  l1Filters.addEventListener('click',function(e){
    const btn=e.target.closest('.fp');
    if(!btn) return;
    this.querySelectorAll('.fp').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    curL1=btn.dataset.l1;
    curL2='all-regions';
    renderL1CountryFilters();
    renderL2Bar();
    renderFilteredRegions();
  });
}

/* ════════════════════════════════════
   INIT
════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function() {
  cleanupLegacyCellarStorage();
  renderL1CountryFilters();
  renderFilteredRegions();
  buildVintageMatrix();
  renderCompareColorFilters();
  populateCompareSelects();
  renderGrapePanel();
  renderClassCountryFilters();
  renderClassificationPanel();
  renderWineStylePanel();
  renderFranceMarkers();
  renderFranceMarkerList();
  renderItalyMarkers();
  renderIberiaMarkers();
  initMapTooltips();
  auditWineDB();
  auditCountryFlags();
});

/* ════════════════════════════════════
   SAT TASTING — 手風琴展開/收合
════════════════════════════════════ */
function toggleSATSection(hdr){
  const body = hdr.nextElementSibling;
  const arrow = hdr.querySelector('.acc-arrow');
  const isOpen = body.classList.contains('open');

  // 手風琴行為：收合其他已展開卡片
  document.querySelectorAll('#panel-tasting .acc-hdr.open').forEach(otherHdr => {
    if (otherHdr === hdr) return;
    const otherBody = otherHdr.nextElementSibling;
    const otherArrow = otherHdr.querySelector('.acc-arrow');
    if (otherBody) otherBody.classList.remove('open');
    otherHdr.classList.remove('open');
    if (otherArrow) { otherArrow.classList.remove('open'); otherArrow.textContent = '▼'; }
  });

  body.classList.toggle('open', !isOpen);
  hdr.classList.toggle('open', !isOpen);
  if(arrow){
    arrow.classList.toggle('open', !isOpen);
    arrow.textContent = isOpen ? '▼' : '▲';
  }
}