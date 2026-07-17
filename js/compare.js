/* ════════════════════════════════════
   COMPARE MODE
════════════════════════════════════ */

let curColorFilter = null;
let curGrapeColorFilter = null;
let grapeCompareRadarInst = null;

const WINE_COLOR_META = {
  red:       { emoji: '🔴', label: '紅酒' },
  white:     { emoji: '🟡', label: '白酒' },
  'rosé':    { emoji: '🌸', label: '粉紅酒' },
  sparkling: { emoji: '✨', label: '氣泡酒' }
};

function renderCompareColorFilters() {
  const wrap = document.getElementById('compare-color-filters');
  if (!wrap) return;
  const colors = [...new Set(WINE_DB.appellations.map(a => a.wineColor))];
  wrap.innerHTML = colors.map(c => {
    const meta = WINE_COLOR_META[c] || { emoji: '', label: c };
    return `<button class="color-filter-btn" onclick="setColorFilter('${c}',this)" style="padding:5px 14px;border-radius:20px;border:1px solid #D6CFC8;background:#fff;color:#44403C;font-size:var(--fs-base);cursor:pointer;font-family:'Inter',sans-serif;">${meta.emoji} ${meta.label}</button>`;
  }).join('');
}

function populateCompareSelects() {
  ['a','b'].forEach(side=>{
    const countrySel = document.getElementById(`compare-${side}-country`);
    if (!countrySel) return;
    const countries = [...new Set(getFilteredAppellations().map(a => a.country))];
    countrySel.innerHTML = '<option value="">— 選擇國家 —</option>' +
      countries.map(c => `<option value="${c}">${c}</option>`).join('');
    countrySel.disabled = !curColorFilter;
    const regionSel = document.getElementById(`compare-${side}-region`);
    if (regionSel) { regionSel.innerHTML = '<option value="">— 選擇大產區 —</option>'; regionSel.disabled = true; }
    const subSel = document.getElementById(`compare-${side}-sub`);
    if (subSel) { subSel.innerHTML = '<option value="">— 選擇次產區 —</option>'; subSel.disabled = true; }
  });
}

function setColorFilter(color, btn) {
  curColorFilter = color;
  document.querySelectorAll('.color-filter-btn').forEach(b => {
    b.style.background = '#fff';
    b.style.color = '#44403C';
    b.style.borderColor = '#D6CFC8';
  });
  if (btn) {
    btn.style.background = 'var(--burg)';
    btn.style.color = '#fff';
    btn.style.borderColor = 'var(--burg)';
  }
  populateCompareSelects();
  renderCompareRadar();
}

function getFilteredAppellations() {
  if (!curColorFilter) return [];
  return WINE_DB.appellations.filter(a => a.wineColor === curColorFilter);
}

function onCompareCountryChange(side){
  const country = document.getElementById(`compare-${side}-country`)?.value;
  const regionSel = document.getElementById(`compare-${side}-region`);
  const subSel = document.getElementById(`compare-${side}-sub`);
  if (subSel) { subSel.innerHTML = '<option value="">— 選擇次產區 —</option>'; subSel.disabled = true; }
  if (!country) {
    if (regionSel) { regionSel.innerHTML = '<option value="">— 選擇大產區 —</option>'; regionSel.disabled = true; }
    renderCompareRadar();
    return;
  }
  const regions = [...new Set(
    getFilteredAppellations().filter(a => a.country === country).map(a => a.region)
  )];
  if (regionSel) {
    regionSel.innerHTML = '<option value="">— 選擇大產區 —</option>' +
      regions.map(r => `<option value="${r}">${r}</option>`).join('');
    regionSel.disabled = regions.length === 0;
  }
  renderCompareRadar();
}

function onCompareRegionChange(side){
  const country = document.getElementById(`compare-${side}-country`)?.value;
  const region = document.getElementById(`compare-${side}-region`)?.value;
  const subSel = document.getElementById(`compare-${side}-sub`);
  if (!region) {
    if (subSel) { subSel.innerHTML = '<option value="">— 選擇次產區 —</option>'; subSel.disabled = true; }
    renderCompareRadar();
    return;
  }
  const subs = getFilteredAppellations().filter(a => a.country === country && a.region === region);
  if (subSel) {
    subSel.innerHTML = '<option value="">— 選擇次產區 —</option>' +
      subs.map(a => `<option value="${a.id}">${a.name}</option>`).join('');
    subSel.disabled = subs.length === 0;
  }
  renderCompareRadar();
}

function onCompareSubChange(side){
  renderCompareRadar();
}

function renderCompareRadar() {
  const idA = document.getElementById('compare-a-sub')?.value || null;
  const idB = document.getElementById('compare-b-sub')?.value || null;
  const appA = WINE_DB.appellations.find(a=>a.id===idA);
  const appB = WINE_DB.appellations.find(a=>a.id===idB);

  const caInfo = document.getElementById('ca-info');
  if(caInfo) caInfo.innerHTML=appA?`<p style="font-size:var(--fs-lg);font-weight:600;color:var(--burg);margin-bottom:4px;">${appA.name}</p><p style="font-size:var(--fs-base);color:var(--txt2);">${appA.styleSummary}</p>`:'<p style="font-size:var(--fs-lg);text-align:center;color:var(--txt4);">請選擇</p>';
  const cbInfo = document.getElementById('cb-info');
  if(cbInfo) cbInfo.innerHTML=appB?`<p style="font-size:var(--fs-lg);font-weight:600;color:var(--gold-dk);margin-bottom:4px;">${appB.name}</p><p style="font-size:var(--fs-base);color:var(--txt2);">${appB.styleSummary}</p>`:'<p style="font-size:var(--fs-lg);text-align:center;color:var(--txt4);">請選擇</p>';

  const rph = document.getElementById('radar-placeholder');
  const ci = document.getElementById('compare-identity');

  if (!appA || !appB) {
    if (rph) rph.style.display = 'block';
    if (ci) ci.innerHTML = '';
    if (radarInst) { radarInst.destroy(); radarInst = null; }
    return;
  }
  if (rph) rph.style.display = 'none';

  const pA = appA.profile || {};
  const pB = appB.profile || {};
  const labels = ['單寧\nTannin','酸度\nAcidity','酒體\nBody','酒精\nAlcohol','餘韻\nFinish','陳年潛力\nAging','花香/草本\nFloral'];
  const dsA = [pA.tannin||0,pA.acidity||0,pA.body||0,pA.alcohol||0,pA.finish||0,pA.aging||0,pA.floral||0];
  const dsB = [pB.tannin||0,pB.acidity||0,pB.body||0,pB.alcohol||0,pB.finish||0,pB.aging||0,pB.floral||0];

  if (radarInst) radarInst.destroy();
  const ctx = document.getElementById('compare-radar-chart');
  if (ctx) {
    radarInst = new Chart(ctx.getContext('2d'), {
      type: 'radar',
      data: {
        labels,
        datasets: [
          { label:appA.name, data:dsA, backgroundColor:'rgba(92,6,28,.18)', borderColor:'#5C061C', borderWidth:2.5, pointBackgroundColor:'#5C061C', pointRadius:5 },
          { label:appB.name, data:dsB, backgroundColor:'rgba(197,168,128,.18)', borderColor:'#C5A228', borderWidth:2.5, pointBackgroundColor:'#C5A228', pointRadius:5 }
        ]
      },
      options: {
        responsive:true, maintainAspectRatio:false,
        plugins:{ legend:{ position:'bottom', labels:{ color:'#1C1917', font:{size:12,family:'Inter'}, padding:14 } } },
        scales:{ r:{ min:0, max:10, ticks:{stepSize:2,color:'#A8A29E',font:{size:10},backdropColor:'transparent'}, grid:{color:'rgba(0,0,0,.07)'}, angleLines:{color:'rgba(0,0,0,.09)'}, pointLabels:{color:'#44403C',font:{size:13,family:'Inter'}} } }
      }
    });
  }

  if (ci) {
    ci.innerHTML = [appA,appB].map((a,i)=>{
      const c = i===0 ? 'var(--burg)' : 'var(--gold-dk)';
      return `<div style="background:var(--bg-card);border:1px solid var(--border-lt);border-radius:12px;padding:14px;box-shadow:var(--sh);">
        <h4 style="font-size:var(--fs-lg);font-weight:600;color:${c};margin-bottom:3px;">${a.name}</h4>
        <p style="font-size:var(--fs-base);color:var(--txt3);margin-bottom:8px;">${a.subRegion}</p>
        <div class="mh" style="margin-bottom:10px;"><p style="font-size:var(--fs-base);font-style:italic;color:${c};">「${a.memoryHook}」</p></div>
        <button onclick="openDrawer(WINE_DB.appellations.find(a=>a.id==='${a.id}'))" style="width:100%;background:var(--burg);color:#fff;border:none;border-radius:8px;padding:7px;font-size:var(--fs-base);cursor:pointer;font-family:'Inter',sans-serif;font-weight:600;margin-top:4px;">完整詳情 →</button>
      </div>`;
    }).join('');
  }
}

function switchCompareMode(mode) {
  const apBtn = document.getElementById('cm-toggle-appellation');
  const grBtn = document.getElementById('cm-toggle-grape');
  const apWrap = document.getElementById('cm-mode-appellation');
  const grWrap = document.getElementById('cm-mode-grape');
  if (!apBtn || !grBtn || !apWrap || !grWrap) return;
  if (mode === 'appellation') {
    apBtn.style.background = 'var(--burg)'; apBtn.style.color = '#fff'; apBtn.style.borderColor = 'var(--burg)';
    grBtn.style.background = '#fff'; grBtn.style.color = '#44403C'; grBtn.style.borderColor = '#D6CFC8';
    apWrap.style.display = 'block';
    grWrap.style.display = 'none';
  } else {
    grBtn.style.background = 'var(--burg)'; grBtn.style.color = '#fff'; grBtn.style.borderColor = 'var(--burg)';
    apBtn.style.background = '#fff'; apBtn.style.color = '#44403C'; apBtn.style.borderColor = '#D6CFC8';
    grWrap.style.display = 'block';
    apWrap.style.display = 'none';
  }
}

function renderCompareGrapeColorFilters() {
  const wrap = document.getElementById('compare-grape-color-filters');
  if (!wrap) return;
  const colors = [...new Set((WINE_DB.grapes || []).map(g => g.skinColor))];
  wrap.innerHTML = colors.map(c => {
    const meta = WINE_COLOR_META[c] || { emoji: '', label: c };
    return `<button class="color-filter-btn" onclick="setCompareGrapeColorFilter('${c}',this)" style="padding:5px 14px;border-radius:20px;border:1px solid #D6CFC8;background:#fff;color:#44403C;font-size:var(--fs-base);cursor:pointer;font-family:'Inter',sans-serif;">${meta.emoji} ${meta.label}</button>`;
  }).join('');
}

function setCompareGrapeColorFilter(color, btn) {
  curGrapeColorFilter = color;
  document.querySelectorAll('#compare-grape-color-filters .color-filter-btn').forEach(b => {
    b.style.background = '#fff'; b.style.color = '#44403C'; b.style.borderColor = '#D6CFC8';
  });
  if (btn) { btn.style.background = 'var(--burg)'; btn.style.color = '#fff'; btn.style.borderColor = 'var(--burg)'; }
  populateCompareGrapeSelects();
  renderCompareGrapeRadar();
}

function populateCompareGrapeSelects() {
  ['a','b'].forEach(side=>{
    const sel = document.getElementById(`compare-grape-${side}`);
    if (!sel) return;
    const list = (WINE_DB.grapes || []).filter(g => g.skinColor === curGrapeColorFilter);
    sel.innerHTML = '<option value="">— 選擇品種 —</option>' + list.map(g=>`<option value="${g.id}">${g.name}</option>`).join('');
    sel.disabled = !curGrapeColorFilter;
  });
}

function onCompareGrapeChange(side) {
  renderCompareGrapeRadar();
}

function renderCompareGrapeRadar() {
  const idA = document.getElementById('compare-grape-a')?.value || null;
  const idB = document.getElementById('compare-grape-b')?.value || null;
  const gA = (WINE_DB.grapes || []).find(g=>g.id===idA);
  const gB = (WINE_DB.grapes || []).find(g=>g.id===idB);

  const cgaInfo = document.getElementById('cga-info');
  if (cgaInfo) cgaInfo.innerHTML = gA?`<p style="font-size:var(--fs-lg);font-weight:600;color:var(--burg);margin-bottom:4px;">${gA.name}</p><p style="font-size:var(--fs-base);color:var(--txt2);">${gA.styleSummary}</p>`:'<p style="font-size:var(--fs-lg);text-align:center;color:var(--txt4);">請選擇</p>';
  const cgbInfo = document.getElementById('cgb-info');
  if (cgbInfo) cgbInfo.innerHTML = gB?`<p style="font-size:var(--fs-lg);font-weight:600;color:var(--gold-dk);margin-bottom:4px;">${gB.name}</p><p style="font-size:var(--fs-base);color:var(--txt2);">${gB.styleSummary}</p>`:'<p style="font-size:var(--fs-lg);text-align:center;color:var(--txt4);">請選擇</p>';

  const rph = document.getElementById('grape-radar-placeholder');
  const ci = document.getElementById('compare-grape-identity');

  if (!gA || !gB) {
    if (rph) rph.style.display = 'block';
    if (ci) ci.innerHTML = '';
    if (grapeCompareRadarInst) { grapeCompareRadarInst.destroy(); grapeCompareRadarInst = null; }
    return;
  }
  if (rph) rph.style.display = 'none';

  const pA = gA.profile || {};
  const pB = gB.profile || {};
  const labels = ['單寧\nTannin','酸度\nAcidity','酒體\nBody','酒精\nAlcohol','餘韻\nFinish','陳年潛力\nAging','花香/草本\nFloral'];
  const dsA = [pA.tannin||0,pA.acidity||0,pA.body||0,pA.alcohol||0,pA.finish||0,pA.aging||0,pA.floral||0];
  const dsB = [pB.tannin||0,pB.acidity||0,pB.body||0,pB.alcohol||0,pB.finish||0,pB.aging||0,pB.floral||0];

  if (grapeCompareRadarInst) grapeCompareRadarInst.destroy();
  const ctx = document.getElementById('compare-grape-radar-chart');
  if (ctx) {
    grapeCompareRadarInst = new Chart(ctx.getContext('2d'), {
      type: 'radar',
      data: {
        labels,
        datasets: [
          { label:gA.name, data:dsA, backgroundColor:'rgba(92,6,28,.18)', borderColor:'#5C061C', borderWidth:2.5, pointBackgroundColor:'#5C061C', pointRadius:5 },
          { label:gB.name, data:dsB, backgroundColor:'rgba(197,168,128,.18)', borderColor:'#C5A228', borderWidth:2.5, pointBackgroundColor:'#C5A228', pointRadius:5 }
        ]
      },
      options: {
        responsive:true, maintainAspectRatio:false,
        plugins:{ legend:{ position:'bottom', labels:{ color:'#1C1917', font:{size:12,family:'Inter'}, padding:14 } } },
        scales:{ r:{ min:0, max:10, ticks:{stepSize:2,color:'#A8A29E',font:{size:10},backdropColor:'transparent'}, grid:{color:'rgba(0,0,0,.07)'}, angleLines:{color:'rgba(0,0,0,.09)'}, pointLabels:{color:'#44403C',font:{size:13,family:'Inter'}} } }
      }
    });
  }

  if (ci) {
    ci.innerHTML = [gA,gB].map((g,i)=>{
      const c = i===0 ? 'var(--burg)' : 'var(--gold-dk)';
      return `<div style="background:var(--bg-card);border:1px solid var(--border-lt);border-radius:12px;padding:14px;box-shadow:var(--sh);">
        <h4 style="font-size:var(--fs-lg);font-weight:600;color:${c};margin-bottom:3px;">${g.name}</h4>
        <p style="font-size:var(--fs-base);color:var(--txt3);margin-bottom:8px;">${g.skinColor==='red'?'紅葡萄品種':'白葡萄品種'}</p>
        <button onclick="jumpToGrapeById('${g.id}')" style="width:100%;background:var(--burg);color:#fff;border:none;border-radius:8px;padding:7px;font-size:var(--fs-base);cursor:pointer;font-family:'Inter',sans-serif;font-weight:600;margin-top:4px;">完整詳情 →</button>
      </div>`;
    }).join('');
  }
}