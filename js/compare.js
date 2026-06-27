/* ════════════════════════════════════
   COMPARE MODE
════════════════════════════════════ */


/* ════════════════════════════════════
   COMPARE MODE — 3-tier cascading selects
   國家 (Country) → 大產區 (Region) → 次產區 (Sub-region/Appellation)
   選項全數從 WINE_DB.appellations 動態 map/filter 產生，HTML 中不寫死 <option>。
   只有第三層完整選定後才觸發 renderCompareRadar()。
════════════════════════════════════ */
function populateCompareSelects() {
  ['a','b'].forEach(side=>{
    const countrySel = document.getElementById(`compare-${side}-country`);
    if (!countrySel) return;
    const countries = [...new Set(WINE_DB.appellations.map(a => a.country))];
    countrySel.innerHTML = '<option value="">— 選擇國家 —</option>' +
      countries.map(c => `<option value="${c}">${c}</option>`).join('');

    const regionSel = document.getElementById(`compare-${side}-region`);
    if (regionSel) { regionSel.innerHTML = '<option value="">— 選擇大產區 —</option>'; regionSel.disabled = true; }

    const subSel = document.getElementById(`compare-${side}-sub`);
    if (subSel) { subSel.innerHTML = '<option value="">— 選擇次產區 —</option>'; subSel.disabled = true; }
  });
}

function onCompareCountryChange(side){
  const country = document.getElementById(`compare-${side}-country`)?.value;
  const regionSel = document.getElementById(`compare-${side}-region`);
  const subSel = document.getElementById(`compare-${side}-sub`);

  // 重置下游選單
  if (subSel) { subSel.innerHTML = '<option value="">— 選擇次產區 —</option>'; subSel.disabled = true; }

  if (!country) {
    if (regionSel) { regionSel.innerHTML = '<option value="">— 選擇大產區 —</option>'; regionSel.disabled = true; }
    renderCompareRadar();
    return;
  }

  const regions = [...new Set(
    WINE_DB.appellations.filter(a => a.country === country).map(a => a.region)
  )];
  if (regionSel) {
    regionSel.innerHTML = '<option value="">— 選擇大產區 —</option>' +
      regions.map(r => `<option value="${r}">${r}</option>`).join('');
    regionSel.disabled = false;
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

  const subs = WINE_DB.appellations.filter(a => a.country === country && a.region === region);
  if (subSel) {
    subSel.innerHTML = '<option value="">— 選擇次產區 —</option>' +
      subs.map(a => `<option value="${a.id}">${a.name}</option>`).join('');
    subSel.disabled = false;
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
  if(caInfo) caInfo.innerHTML=appA?`<p style="font-size:12.5px;font-weight:600;color:var(--burg);margin-bottom:4px;">${appA.name}</p><p style="font-size:11px;color:var(--txt3);">${appA.styleSummary}</p>`:'<p style="font-size:11px;text-align:center;color:var(--txt4);">請選擇</p>';
  
  const cbInfo = document.getElementById('cb-info');
  if(cbInfo) cbInfo.innerHTML=appB?`<p style="font-size:12.5px;font-weight:600;color:var(--gold-dk);margin-bottom:4px;">${appB.name}</p><p style="font-size:11px;color:var(--txt3);">${appB.styleSummary}</p>`:'<p style="font-size:11px;text-align:center;color:var(--txt4);">請選擇</p>';

  const rph = document.getElementById('radar-placeholder');
  const ci = document.getElementById('compare-identity');

  // 渲染觸發機制：唯有兩側都已完整選定到第三層（次產區）才繪製雷達圖
  if (!appA || !appB) {
    if (rph) rph.style.display = 'block';
    if (ci) ci.innerHTML = '';
    if (radarInst) { radarInst.destroy(); radarInst = null; }
    return;
  }
  if (rph) rph.style.display = 'none';

  const labels = ['單寧\nTannin','酸度\nAcidity','酒體\nBody','陳年潛力\nAging','花香/草本\nFloral'];
  const dsA = [appA.radarStats.tannin,appA.radarStats.acidity,appA.radarStats.body,appA.radarStats.aging,appA.radarStats.floral];
  const dsB = [appB.radarStats.tannin,appB.radarStats.acidity,appB.radarStats.body,appB.radarStats.aging,appB.radarStats.floral];

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
        plugins: { legend:{ position:'bottom', labels:{ color:'#1C1917', font:{size:12,family:'Inter'}, padding:14 } } },
        scales: { r:{ min:0, max:10, ticks:{stepSize:2,color:'#A8A29E',font:{size:10},backdropColor:'transparent'}, grid:{color:'rgba(0,0,0,.07)'}, angleLines:{color:'rgba(0,0,0,.09)'}, pointLabels:{color:'#44403C',font:{size:11,family:'Inter'}} } }
      }
    });
  }

  if (ci) {
    ci.innerHTML = [appA,appB].map((a,i)=>{
      const c = i===0 ? 'var(--burg)' : 'var(--gold-dk)';
      return `<div style="background:var(--bg-card);border:1px solid var(--border-lt);border-radius:12px;padding:14px;box-shadow:var(--sh);">
        <h4 style="font-size:13.5px;font-weight:600;color:${c};margin-bottom:3px;">${a.name}</h4>
        <p style="font-size:11px;color:var(--txt3);margin-bottom:8px;">${a.subRegion}</p>
        <div class="mh"><p style="font-size:10.5px;font-style:italic;color:${c};">「${a.memoryHook}」</p></div>
      </div>`;
    }).join('');
  }
}

function renderRadar() {
  renderCompareRadar();
}