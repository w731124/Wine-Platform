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
  'Hungary(匈牙利)': 'hu',
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
// 法國產區確定不綁定年份矩陣的已知例外清單（2026-07-30正式裁定，見DECISIONS.md）：
// 貴腐甜酒（sauternes/barsac）年份表格式不適用一般年份評級邏輯；beaujolais教學份量疑慮；
// entre-deux-mers為基礎不甜白酒入門款，及早飲用不具年份陳年討論價值。
const KNOWN_VINTAGE_EXCEPTIONS = {
  'sauternes': '貴腐甜酒風格，年份表格式不適用',
  'barsac': '貴腐甜酒風格，年份表格式不適用',
  'beaujolais': '教學份量疑慮，暫不納入',
  'entre-deux-mers': '基礎不甜白酒入門款，及早飲用不具年份陳年討論價值'
};

// 已知應統一但尚未統一的詞彙對照表（比照#218/#251的keyIdentifiers全站一致性稽核結果常態化）：
// key為非標準寫法，value為站內已確立的標準寫法；掃描範圍涵蓋 aromaWheel 與 keyIdentifiers 兩欄位。
const CANONICAL_VOCABULARY_MAP = {
  'Soft Tannin(柔軟單寧)': 'Soft Tannin(柔順單寧)',
  'Beeswax(蜂蠟香氣)': 'Beeswax(蜂蠟)',
  'Beeswax(蜂蠟感)': 'Beeswax(蜂蠟)',
  'Leather(皮革香)': 'Leather(皮革)',
  'Rose(玫瑰花香)': 'Rose(玫瑰花)',
  'Bitter Almond Finish(杏仁苦尾)': 'Bitter Almond Finish(苦杏仁尾韻)',
  'Crisp High Acidity(高爽脆酸度)': 'Crisp High Acidity(高酸爽脆)',
  'Crisp High Acidity(清爽高酸)': 'Crisp High Acidity(高酸爽脆)',
  'Fresh & Easy-Drinking(清爽易飲)': 'Fresh & Easy-Drinking(清新易飲)',
  'Rhône Blend(隆河式混調)': 'Rhône Blend(隆河混調)',
  'Red Berry(紅莓果香)': 'Red Berry(紅莓)',
  'Full-Bodied Dry Style(飽滿干型酒體)': 'Full-Bodied Dry(飽滿干型)',
  'Passion Fruit(百香果)': 'Passionfruit(百香果)',
  'Everyday Value(高性價比日常酒)': 'Everyday Value(日常餐酒)',
  'Green Apple(清新蘋果，白酒)': 'Green Apple(青蘋果)',
  'White Peach(水蜜桃)': 'White Peach(白桃)',
  'Limestone(石灰質土壤)': 'Limestone(石灰岩)',
  'Mineral(礦物感)': 'Mineral(礦石感)',
  'Volcanic Mineral(火山岩礦石感)': 'Volcanic Mineral(火山礦石感)',
  'Strawberry(草莓紅果，紅酒)': 'Strawberry(草莓)',
  'Fine Tannin(細緻單寧)': 'Refined Tannin(細緻單寧)',
  'Silky Tannin(絲滑單寧)': 'Silky Tannin(絲質單寧)',
  'Dark Cherry(黑櫻桃)': 'Black Cherry(黑櫻桃)',
  'High Value(高性價比)': 'Great Value(性價比高)',
  'Grassy(草本)': 'Grass(青草)'
};

// 建議侍酒溫度5個區間（比照「儲存與侍酒」頁 index.html 的靜態內容，見DECISIONS.md）
const SERVING_TEMP_BANDS = [
  { min: 6, max: 8 },
  { min: 7, max: 10 },
  { min: 10, max: 13 },
  { min: 13, max: 15 },
  { min: 16, max: 18 }
];
// 刻意橫跨兩區間的已知例外（多風格品種，2026-07-30核對後確認維持現狀）
const KNOWN_SERVING_TEMP_STRADDLE_EXCEPTIONS = {
  'chenin-blanc': '風格橫跨不甜到貴腐甜型，刻意橫跨清淡與濃郁白酒兩區間',
  'viognier': '酒體介於兩區間之間，刻意橫跨',
  'semillon': '干型與貴腐甜型溫度需求不同，刻意橫跨',
  'furmint': '不甜型與貴腐甜酒溫度需求不同，刻意橫跨'
};
function parseServingTempRange(str){
  const m = (str || '').match(/(\d+)\s*[–\-]\s*(\d+)/);
  if(!m) return null;
  return { min: parseInt(m[1], 10), max: parseInt(m[2], 10) };
}

function auditWineDB(){
  const report = { total: WINE_DB.appellations.length, missingMap: [], missingCompare: [], franceUnboundToVintage: [], inconsistentVocabulary: [], servingTempMismatch: [], ok: [] };
  const vintageRowIds = WINE_DB.vintages.rows.map(r=>r.id);

  // 將法國年份列 id 拆解為關鍵字，用於模糊比對 subRegion/region 是否能掛上某一列
  const vintageKeywords = {
    'bordeaux-left': ['Left Bank','Médoc','左岸','Pauillac','Margaux'],
    'bordeaux-right': ['Right Bank','右岸','Saint-Émilion','Pomerol'],
    'burgundy-red': ['Côte de Nuits','夜丘','Côte Chalonnaise','夏隆內丘'],
    'burgundy-white': ['Côte de Beaune','Chablis','伯恩丘','夏布利','Mâconnais','馬貢內'],
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
      if(!matched){
        report.franceUnboundToVintage.push(app.id);
        if(!KNOWN_VINTAGE_EXCEPTIONS[app.id]) issues.push('vintage-binding');
      }
    }

    // 5) 詞彙一致性檢查：aromaWheel／keyIdentifiers 是否命中已知非標準寫法
    const vocabTerms = [...(app.aromaWheel || []), ...(app.keyIdentifiers || [])];
    vocabTerms.forEach(term => {
      if(CANONICAL_VOCABULARY_MAP[term]){
        report.inconsistentVocabulary.push(`${app.id}: "${term}" 應改為 "${CANONICAL_VOCABULARY_MAP[term]}"`);
        issues.push('vocabulary');
      }
    });

    if(issues.length === 0) report.ok.push(app.id);
  });

  WINE_DB.grapes.forEach(g=>{
    // 5) 詞彙一致性檢查（grapes.aromaWheel）
    (g.aromaWheel || []).forEach(term => {
      if(CANONICAL_VOCABULARY_MAP[term]){
        report.inconsistentVocabulary.push(`${g.id}: "${term}" 應改為 "${CANONICAL_VOCABULARY_MAP[term]}"`);
      }
    });

    // 6) servingTemp 是否落在「建議侍酒溫度」5個區間中的其中一個
    const range = parseServingTempRange(g.servingTemp);
    if(range){
      const fitsSomeBand = SERVING_TEMP_BANDS.some(b => range.min >= b.min && range.max <= b.max);
      if(!fitsSomeBand && !KNOWN_SERVING_TEMP_STRADDLE_EXCEPTIONS[g.id]){
        report.servingTempMismatch.push(`${g.id}（${g.servingTemp}）`);
      }
    }
  });

  const knownVintageIds = Object.keys(KNOWN_VINTAGE_EXCEPTIONS);
  const knownVintageUnbound = report.franceUnboundToVintage.filter(id => knownVintageIds.includes(id));
  const unexpectedVintageUnbound = report.franceUnboundToVintage.filter(id => !knownVintageIds.includes(id));

  // Console 報告輸出
  console.groupCollapsed(`%c[WINE_DB Audit] ${report.ok.length}/${report.total} 完全通過`, 'color:#5C061C;font-weight:bold;');
  if(report.missingMap.length) console.warn('❌ 缺少地圖座標 (data-id 未在地圖 DOM 中找到):', report.missingMap);
  if(report.missingCompare.length) console.warn('❌ 缺少比較模式所需 profile 欄位:', report.missingCompare);
  if(knownVintageUnbound.length) console.log('%c✅ 已知並確認維持排除的法國產區（不綁定年份矩陣）:', 'color:#1a7a1a;font-weight:bold;', knownVintageUnbound.map(id => `${id}（${KNOWN_VINTAGE_EXCEPTIONS[id]}）`));
  if(unexpectedVintageUnbound.length) console.warn('❌ 法國產區未綁定至年份矩陣任何一列（非已知例外清單，需檢查）:', unexpectedVintageUnbound);
  if(report.inconsistentVocabulary.length) console.warn('❌ aromaWheel／keyIdentifiers 命中已知非標準詞彙寫法:', report.inconsistentVocabulary);
  if(report.servingTempMismatch.length) console.warn('❌ servingTemp 未落在建議侍酒溫度任一區間內（非已知橫跨例外）:', report.servingTempMismatch);
  if(!report.missingMap.length && !report.missingCompare.length && !unexpectedVintageUnbound.length && !report.inconsistentVocabulary.length && !report.servingTempMismatch.length){
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

function jumpToFaultById(id){
  switchToPanel('tasting');
  const hdr = document.getElementById('sat-nose-hdr');
  if (hdr && !hdr.classList.contains('open')) toggleSATSection(hdr);
  setTimeout(() => {
    const el = document.querySelector(`[data-fault-id="${id}"]`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 50);
}

function jumpToStorageServingTemp(){
  switchToPanel('storage');
  const hdr = document.getElementById('storage-servingtemp-hdr');
  if (hdr && !hdr.classList.contains('open')) toggleSATSection(hdr);
  setTimeout(() => {
    if (hdr) hdr.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 50);
}

function jumpToRegionById(id){
  const app = WINE_DB.appellations.find(a => a.id === id);
  if (!app) return;
  switchToPanel('regions');
  openDrawer(app);
}

function jumpToClassificationById(id){
  const c = (WINE_DB.classifications || []).find(x => x.id === id);
  if (!c) return;
  switchToPanel('classifications');
  classInteracted = true;
  curClassCountry = c.country;
  curClassBasis = 'all';
  const countryWrap = document.getElementById('class-country-filters');
  if (countryWrap) {
    countryWrap.querySelectorAll('.fp2').forEach(b => b.classList.remove('active'));
    const btn = countryWrap.querySelector(`[data-class-country="${c.country}"]`);
    if (btn) btn.classList.add('active');
  }
  renderClassificationPanel();
  setTimeout(() => {
    const hdr = document.querySelector(`.acc-hdr[data-class-id="${id}"]`);
    if (hdr) {
      hdr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (!hdr.classList.contains('open')) toggleClassCard(hdr);
    }
  }, 50);
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
  else if (id === 'germany') renderGermanyMarkerList();
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
  renderCompareGrapeColorFilters();
  renderFoodCategoryFilters();
  renderGrapeColorFilters();
  renderGrapeTierFilters();
  renderGrapePanel();
  renderClassCountryFilters();
  renderClassificationPanel();
  renderWineStylePanel();
  renderFranceMarkers();
  renderFranceMarkerList();
  renderItalyMarkers();
  renderIberiaMarkers();
  renderGermanyMarkers();
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

  // 手風琴行為：收合同一個panel內其他已展開卡片（用closest('.panel')而非寫死單一分頁id，讓多個分頁可共用此函式）
  const panelEl = hdr.closest('.panel');
  (panelEl ? panelEl.querySelectorAll('.acc-hdr.open') : []).forEach(otherHdr => {
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