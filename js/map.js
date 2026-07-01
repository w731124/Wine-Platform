/* ════════════════════════════════════
   MAP FUNCTIONS
════════════════════════════════════ */
function selectRegion(r){
  const n={bordeaux:'Bordeaux(波爾多)',burgundy:'Burgundy(勃根地)',loire:'Loire(羅亞爾河)',champagne:'Champagne(香檳)',rhone:'Rhône(隆河谷)',piedmont:'Piedmont(皮埃蒙特)',tuscany:'Tuscany(托斯卡尼)',veneto:'Veneto(威尼托)',rioja:'Rioja(里奧哈)','ribera-del-duero':'Ribera del Duero(斗羅河岸)',jerez:'Jerez(赫雷斯)'};
  showMapIns(`<span class="tg tg-reg" style="font-size:13px;">${n[r]||r}</span><p style="font-size:12px;color:var(--txt3);margin-top:8px;">點擊金色圓點查看具體次產區資訊。</p>`);
}
function selectAppellation(id){
  if(selMapMarker) selMapMarker.classList.remove('selected');
  const el=document.querySelector(`.pulse-marker[data-id="${id}"]`);
  if(el){el.classList.add('selected');selMapMarker=el;}
  const app=WINE_DB.appellations.find(a=>a.id===id);
  if(!app){showMapIns(`<p style="font-size:12px;color:var(--txt3);">資料建置中</p>`);return;}
  if(window.innerWidth<768) openDrawer(app);
  else showMapIns(buildMapInsHTML(app));
}
function showMapIns(h){
  const ph = document.getElementById('inspector-placeholder');
  const cn = document.getElementById('inspector-content');
  const bd = document.getElementById('inspector-body');
  if(ph) ph.style.display='none';
  if(cn) cn.style.display='block';
  if(bd) bd.innerHTML=h;
}
function clearInspector(){
  const ph = document.getElementById('inspector-placeholder');
  const cn = document.getElementById('inspector-content');
  if(ph) ph.style.display='block';
  if(cn) cn.style.display='none';
  if(selMapMarker){selMapMarker.classList.remove('selected');selMapMarker=null;}
}
function buildMapInsHTML(app){
  const sp=app.profile||{};
const dims=[{k:'acidity',l:'酸度',c:'#3A6EA8'},{k:'tannin',l:'單寧',c:'#5C061C'},{k:'body',l:'酒體',c:'#A88A60'},{k:'alcohol',l:'酒精',c:'#7A44A8'},{k:'finish',l:'餘韻',c:'#2A7A58'},{k:'aging',l:'陳年潛力',c:'#1A6A4A'},{k:'floral',l:'花香/草本',c:'#A84A7A'}];
  const bH=dims.map(d=>{const v=sp[d.k]??0;return`<div style="margin-bottom:5px;"><div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:2px;"><span style="color:var(--txt3);">${d.l}</span><span style="color:${d.c};font-weight:700;">${v}/10</span></div><div class="stat-bg"><div class="stat-fill" style="width:${v*10}%;background:${d.c};"></div></div></div>`}).join('');
  return `<div style="margin-bottom:10px;"><h3 style="font-size:14px;font-weight:700;color:var(--txt);">${app.name}</h3><p style="font-size:11px;color:var(--txt3);">${app.region}</p></div>
    <div class="mh" style="margin-bottom:10px;"><p style="font-size:11px;font-style:italic;color:var(--burg);">「${app.memoryHook}」</p></div>
    <div style="display:flex;flex-wrap:wrap;gap:3px;margin-bottom:8px;">${app.primaryGrapes.map(g=>`<span class="tg tg-grape">${g}</span>`).join('')}</div>
    <p style="font-size:11.5px;line-height:1.6;color:var(--txt2);margin-bottom:10px;">${app.styleSummary}</p>
    <div style="font-size:10px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--txt4);margin-bottom:6px;">感官結構</div>
    ${bH}
    <div style="font-size:10px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--txt4);margin:10px 0 5px;">風味</div>
    <div style="display:flex;flex-wrap:wrap;gap:3px;margin-bottom:10px;">${(app.aromaWheel||[]).map(a=>`<span class="tg tg-aroma">${a}</span>`).join('')}</div>
    <button onclick="openDrawer(WINE_DB.appellations.find(a=>a.id==='${app.id}'))" style="width:100%;background:var(--burg);color:#fff;border:none;border-radius:8px;padding:8px;font-size:12px;cursor:pointer;font-family:'Inter',sans-serif;font-weight:600;">完整詳情 →</button>`;
}
/* ════════════════════════════════════
   MAP TOOLTIPS
════════════════════════════════════ */
function initMapTooltips(){
  document.querySelectorAll('.pulse-marker').forEach(marker=>{
    const id=marker.dataset.id;
    const app=WINE_DB.appellations.find(a=>a.id===id);
    const tip=document.getElementById('map-tooltip');
    if(!tip) return;
    marker.addEventListener('mouseenter',function(e){
      const svg=this.closest('svg');if(!svg)return;
      const dot=this.querySelector('.dot-inner');if(!dot)return;
      const svgR=svg.getBoundingClientRect(),wR=svg.parentElement.getBoundingClientRect();
      const cx=parseFloat(dot.getAttribute('cx')),cy=parseFloat(dot.getAttribute('cy'));
      const vb=svg.viewBox.baseVal;
      const px=cx*(svgR.width/vb.width)+(svgR.left-wR.left)+14;
      const py=cy*(svgR.height/vb.height)+(svgR.top-wR.top)-14;
      tip.innerHTML=`<strong style="color:var(--burg);font-size:12px;">${app?app.name:id}</strong>${app?`<br><span style="color:var(--txt3);font-size:11px;">${app.primaryGrapes.join(' · ')}</span>`:''}`;
      tip.style.left=px+'px';tip.style.top=py+'px';tip.style.display='block';
    });
    marker.addEventListener('mouseleave',()=>{if(tip)tip.style.display='none';});
  });
}