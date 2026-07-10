/* ════════════════════════════════════
   VINTAGE MATRIX
════════════════════════════════════ */
const stMap={l:'vs-l',o:'vs-o',e:'vs-e',g:'vs-g',a:'vs-a',p:'vs-p'};
function buildVintageMatrix(){
  const years=Array.from({length:26},(_,i)=>2000+i);
  
  const thead = document.getElementById('vm-thead');
  if (thead) {
    thead.innerHTML = '<th class="rh">產區 Region</th>' + years.map(y=>`<th>${String(y).slice(2)}</th>`).join('');
  }
  
  const tb = document.getElementById('vm-tbody');
  if (tb) {
    tb.innerHTML = '';
    WINE_DB.vintages.rows.forEach(row=>{
      const sc = WINE_DB.vintages.scores[row.id] || [];
      const tr = document.createElement('tr');
      
      const cells = years.map((y,i)=>{
        const d = sc[i] || {s:0,st:'x'};
        if(!d.s) return `<td><div class="vc" style="background:transparent;border:1px dashed var(--border-lt);"><span class="sc" style="color:var(--txt4);font-size:10px;">—</span></div></td>`;
        const cls = stMap[d.st] || 'vs-a';
        return `<td><div class="vc ${cls}" onclick="openVMI('${row.id}','${y}',${d.s},'${d.st}')"><span class="sc">${d.s}</span></div></td>`;
      }).join('');
      
      tr.innerHTML = `<td class="rl"><div>${row.label}</div><div class="sub">${row.sublabel}</div></td>` + cells;
      tb.appendChild(tr);
    });
  }
}


function openVMI(rid,year,score,st){
  const key=`${rid}_${year}`;
  const d=WINE_DB.vintages.detail[key];
  const row=WINE_DB.vintages.rows.find(r=>r.id===rid)||{label:rid,sublabel:''};
  const sbCls={l:'sbl',o:'sbo',e:'sbe',g:'sbg'}[st]||'sbg';
  let h=`<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;"><div class="sbadge ${sbCls}">${score}</div><div><div style="font-family:'Cinzel',serif;font-size:19px;font-weight:700;color:var(--burg);">${year}</div><div style="font-size:11px;color:var(--txt3);">${row.label}(${row.sublabel})</div></div></div>`;
  if(d){
    const dims=[{k:'acidity',l:'酸度'},{k:'tannin',l:'單寧'},{k:'body',l:'酒體'},{k:'alcohol',l:'酒精度'}];
    const bH=dims.map(dm=>{const v=d.structure[dm.k]??0;return`<div style="margin-bottom:5px;"><div style="display:flex;justify-content:space-between;font-size:10.5px;margin-bottom:2px;"><span style="color:var(--txt3);">${dm.l}</span><span style="color:var(--burg);font-weight:600;">${v}/10</span></div><div class="stat-bg"><div class="stat-fill" style="width:${v*10}%;background:linear-gradient(90deg,var(--burg),var(--gold));"></div></div></div>`}).join('');
    h+=`<div class="ic mb-3" style="background:var(--bg-card);"><p class="ins-lbl" style="color:var(--burg);font-size:11px;">📝 年份總結 Summary</p><p style="font-size:12.5px;line-height:1.65;color:var(--txt2);">${d.summary}</p></div>
    <div class="ic mb-3" style="background:var(--bg-card);"><p class="ins-lbl" style="color:var(--burg);font-size:11px;">🌦️ 氣候成因 Climate</p><p style="font-size:12.5px;line-height:1.65;color:var(--txt2);">${d.climate}</p></div>
    <div class="ic mb-3" style="background:var(--bg-card);"><p class="ins-lbl" style="color:var(--burg);font-size:11px;">📊 結構量化 Structure</p>${bH}</div>
    <div class="ic mb-3" style="background:var(--bg-card);"><p class="ins-lbl" style="color:var(--burg);font-size:11px;">🍷 侍酒師建議 Sommelier's Tips</p><div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;font-size:11.5px;"><div><span style="color:var(--txt4);">醒酒：</span>${d.sommelier.decant}</div><div><span style="color:var(--txt4);">溫度：</span>${d.sommelier.temp}</div><div><span style="color:var(--txt4);">杯型：</span>${d.sommelier.glass}</div><div><span style="color:var(--txt4);">巔峰：</span>${d.sommelier.peak}</div></div></div>
    <div class="ic" style="background:var(--bg-card);"><p class="ins-lbl" style="color:var(--burg);font-size:11px;">🌸 風味輪廓 Aroma Profile</p><div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:5px;">
      <div style="background:rgba(59,110,168,.06);border:1px solid rgba(59,110,168,.15);border-radius:8px;padding:7px;"><p style="font-size:9.5px;font-weight:700;color:#1A3A6A;margin-bottom:3px;">初級</p><p style="font-size:11px;color:var(--txt3);">${d.aromaP}</p></div>
      <div style="background:rgba(92,6,28,.06);border:1px solid rgba(92,6,28,.15);border-radius:8px;padding:7px;"><p style="font-size:9.5px;font-weight:700;color:var(--burg);margin-bottom:3px;">次級</p><p style="font-size:11px;color:var(--txt3);">${d.aromaS}</p></div>
      <div style="background:rgba(42,122,88,.06);border:1px solid rgba(42,122,88,.15);border-radius:8px;padding:7px;"><p style="font-size:9.5px;font-weight:700;color:var(--em);margin-bottom:3px;">三級</p><p style="font-size:11px;color:var(--txt3);">${d.aromaT}</p></div>
    </div></div>`;
  } else {
    h+=`<div class="ic" style="background:var(--bg-card);text-align:center;padding:20px;"><p style="font-size:12px;color:var(--txt3);">試試 2005、2010、2015 等年份的深度資料。</p></div>`;
  }
  const vph = document.getElementById('vmi-placeholder');
  const vcn = document.getElementById('vmi-content');
  const vbd = document.getElementById('vmi-body');
  if (vph) vph.style.display='none';
  if (vcn) vcn.style.display='block';
  if (vbd) vbd.innerHTML=h;
}
function closeVMI(){ 
  const vph = document.getElementById('vmi-placeholder');
  const vcn = document.getElementById('vmi-content');
  if (vph) vph.style.display='block'; 
  if (vcn) vcn.style.display='none'; 
}