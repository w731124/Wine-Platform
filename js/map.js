/* ════════════════════════════════════
   MAP FUNCTIONS
════════════════════════════════════ */
function selectRegion(r){
  const n={bordeaux:'Bordeaux(波爾多)',burgundy:'Burgundy(勃根地)',loire:'Loire(羅亞爾河)',champagne:'Champagne(香檳)',alsace:'Alsace(阿爾薩斯)',rhone:'Rhône(隆河谷)',piedmont:'Piedmont(皮埃蒙特)',tuscany:'Tuscany(托斯卡尼)',veneto:'Veneto(威尼托)',sicily:'Sicily(西西里)',abruzzo:'Abruzzo(阿布魯佐)',puglia:'Puglia(普利亞)',lombardy:'Lombardy(倫巴底)',campania:'Campania(坎帕尼亞)',trentino:'Trentino-Alto Adige(特倫提諾-上阿迪傑)',emilia:'Emilia-Romagna(艾米利亞-羅馬涅)',friuli:'Friuli-Venezia Giulia(弗留利-威尼斯朱利亞)',marche:'Marche(馬爾凱)',umbria:'Umbria(溫布里亞)',rioja:'Rioja(里奧哈)','castilla-y-leon':'Castilla y León(卡斯提亞－萊昂)',andalusia:'Andalusia(安達魯西亞)',catalonia:'Catalonia(加泰隆尼亞)',galicia:'Galicia(加利西亞)',murcia:'Murcia(穆爾西亞)',navarra:'Navarra(納瓦拉)',douro:'Douro(杜羅河)','vinho-verde':'Vinho Verde(青酒產區)'};
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
   FRANCE MAP：動態產生編號標記 + 側邊編號清單
   投影參數對應 scripts/build-france-map.pl 產生 #france-svg 輪廓時使用的
   同一套換算依據——若重新執行該腳本調整省份分組或 viewBox，這裡也要同步更新，
   否則標記點位置會跟底圖對不上。
════════════════════════════════════ */
const FRANCE_PROJECTION = {
  minLng: -4.79490980371592, maxLng: 8.23283621603897,
  minLat: 42.3468077211805, maxLat: 51.0434905836422,
  cosMid: 0.685879966084986, scale: 58.0681172335003,
  offX: 30.5670403042436, offY: 30
};
function projectFrance(lng, lat){
  const x = (lng - FRANCE_PROJECTION.minLng) * FRANCE_PROJECTION.cosMid * FRANCE_PROJECTION.scale + FRANCE_PROJECTION.offX;
  const y = (FRANCE_PROJECTION.maxLat - lat) * FRANCE_PROJECTION.scale + FRANCE_PROJECTION.offY;
  return [x.toFixed(1), y.toFixed(1)];
}
function getFranceAppellations(){
  return WINE_DB.appellations.filter(a => a.country === 'France(法國)' && a.coords);
}
// 碰撞避讓：把距離過近（點不到）的標記點互相推開，直到彼此間距達到 minDist 或迭代上限。
// 只調整視覺位置，不影響 WINE_DB 座標本身，孤立的點完全不受影響。
function declutterPoints(points, minDist, maxIterations){
  for (let iter = 0; iter < maxIterations; iter++) {
    let moved = false;
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        let dx = points[j].x - points[i].x;
        let dy = points[j].y - points[i].y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDist) {
          moved = true;
          if (dist < 0.01) { dx = 1; dy = 0; dist = 0.01; }
          const push = (minDist - dist) / 2;
          const ux = dx / dist, uy = dy / dist;
          points[i].x -= ux * push; points[i].y -= uy * push;
          points[j].x += ux * push; points[j].y += uy * push;
        }
      }
    }
    if (!moved) break;
  }
}
function renderFranceMarkers(){
  const g = document.getElementById('france-markers');
  if (!g) return;
  const list = getFranceAppellations();
  const { numById } = computeGroupedNumbering(list);
  const points = list.map(a => {
    const [x, y] = projectFrance(a.coords.lng, a.coords.lat);
    return { x: Number(x), y: Number(y) };
  });
  declutterPoints(points, 17, 150);
  g.innerHTML = list.map((a, i) => {
    const num = numById[a.id];
    const x = points[i].x.toFixed(1), y = points[i].y.toFixed(1);
    return `<g class="pulse-marker" data-id="${a.id}" onclick="selectAppellation('${a.id}')">
      <circle class="pulse-ring" cx="${x}" cy="${y}" r="8" fill="none" stroke="rgba(185,140,20,.5)" stroke-width="1.5"/>
      <circle class="dot-inner" cx="${x}" cy="${y}" r="7.5" fill="#C5A228" stroke="#FFF" stroke-width="1.5"/>
      <text x="${x}" y="${(points[i].y+2.5).toFixed(1)}" text-anchor="middle" font-size="7" font-weight="700" fill="#FFF" font-family="Inter,sans-serif" style="pointer-events:none;">${num}</text>
    </g>`;
  }).join('');
}
// 通用（法國／義大利／伊比利共用）：側邊清單 hover 時對應地圖圓點同步亮起。
// 用獨立 class 而非重用 .selected，避免滑鼠移出清單時誤清除使用者已點擊選取的狀態。
function highlightMapMarker(id, on){
  const el = document.querySelector(`.pulse-marker[data-id="${id}"]`);
  if (el) el.classList.toggle('list-hover', on);
}
// 通用：依「大區分組後、列表由上到下顯示的順序」重新編號（而非沿用 list 在
// WINE_DB.appellations 裡的原始資料撰寫順序），讓側邊清單的編號永遠是連續的
// 1,2,3,4...；地圖上的標記編號也讀這份對照表，確保兩邊編號一致。
function computeGroupedNumbering(list){
  const groups = {}; const order = [];
  list.forEach(a => {
    if (!groups[a.region]) { groups[a.region] = []; order.push(a.region); }
    groups[a.region].push(a);
  });
  const numById = {};
  let n = 0;
  order.forEach(region => { groups[region].forEach(a => { numById[a.id] = ++n; }); });
  return { order, groups, numById };
}
// 通用：依「大區分組＋編號徽章」樣式產生側邊清單，寫入 #inspector-placeholder。
function renderMarkerIndexList(list){
  const ph = document.getElementById('inspector-placeholder');
  if (!ph) return;
  const { order, groups, numById } = computeGroupedNumbering(list);
  ph.innerHTML = `
    <p style="font-weight:600;font-size:12.5px;color:var(--burg);margin-bottom:10px;">📍 全部產區 Index（點擊列表或地圖上的編號）</p>
    ${order.map(region => `
      <div style="margin-bottom:10px;">
        <p style="font-size:10px;font-weight:700;letter-spacing:.05em;color:var(--txt4);text-transform:uppercase;margin-bottom:4px;">${region}</p>
        ${groups[region].map(app => `
          <div class="france-idx-item" onclick="selectAppellation('${app.id}')" onmouseenter="highlightMapMarker('${app.id}',true)" onmouseleave="highlightMapMarker('${app.id}',false)" style="display:flex;align-items:center;gap:6px;padding:3px 4px;font-size:12px;color:var(--txt2);cursor:pointer;border-radius:5px;">
            <span style="display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;border-radius:50%;background:#C5A228;color:#fff;font-size:9px;font-weight:700;flex-shrink:0;">${numById[app.id]}</span>
            <span>${app.name}</span>
          </div>`).join('')}
      </div>`).join('')}`;
}
function renderFranceMarkerList(){ renderMarkerIndexList(getFranceAppellations()); }

/* ════════════════════════════════════
   ITALY MAP：動態產生編號標記 + 側邊編號清單
   投影參數對應 scripts/build-italy-map.pl 產生 #italy-svg 輪廓時使用的
   同一套換算依據——若重新執行該腳本調整 viewBox，這裡也要同步更新。
════════════════════════════════════ */
const ITALY_PROJECTION = {
  minLng: 6.62773437500004, maxLng: 18.5165724719284,
  minLat: 36.6666711797673, maxLat: 47.0780434569092,
  cosMid: 0.744633659290215, scale: 41.568632953446,
  offX: 26, offY: 53.606743634902
};
function projectItaly(lng, lat){
  const x = (lng - ITALY_PROJECTION.minLng) * ITALY_PROJECTION.cosMid * ITALY_PROJECTION.scale + ITALY_PROJECTION.offX;
  const y = (ITALY_PROJECTION.maxLat - lat) * ITALY_PROJECTION.scale + ITALY_PROJECTION.offY;
  return [x.toFixed(1), y.toFixed(1)];
}
function getItalyAppellations(){
  return WINE_DB.appellations.filter(a => a.country === 'Italy(義大利)' && a.coords);
}
function renderItalyMarkers(){
  const g = document.getElementById('italy-markers');
  if (!g) return;
  const list = getItalyAppellations();
  const { numById } = computeGroupedNumbering(list);
  const points = list.map(a => {
    const [x, y] = projectItaly(a.coords.lng, a.coords.lat);
    return { x: Number(x), y: Number(y) };
  });
  declutterPoints(points, 17, 150);
  g.innerHTML = list.map((a, i) => {
    const num = numById[a.id];
    const x = points[i].x.toFixed(1), y = points[i].y.toFixed(1);
    return `<g class="pulse-marker" data-id="${a.id}" onclick="selectAppellation('${a.id}')">
      <circle class="pulse-ring" cx="${x}" cy="${y}" r="8" fill="none" stroke="rgba(185,140,20,.5)" stroke-width="1.5"/>
      <circle class="dot-inner" cx="${x}" cy="${y}" r="7.5" fill="#C5A228" stroke="#FFF" stroke-width="1.5"/>
      <text x="${x}" y="${(points[i].y+2.5).toFixed(1)}" text-anchor="middle" font-size="7" font-weight="700" fill="#FFF" font-family="Inter,sans-serif" style="pointer-events:none;">${num}</text>
    </g>`;
  }).join('');
}
function renderItalyMarkerList(){ renderMarkerIndexList(getItalyAppellations()); }

/* ════════════════════════════════════
   IBERIA MAP：動態產生編號標記 + 側邊編號清單（西班牙＋葡萄牙）
   投影參數對應 scripts/build-iberia-map.pl 產生 #iberia-svg 輪廓時使用的
   同一套換算依據——若重新執行該腳本調整 viewBox，這裡也要同步更新。
════════════════════════════════════ */
const IBERIA_PROJECTION = {
  minLng: -9.47973632812503, maxLng: 3.30673828125001,
  minLat: 36.038818359375, maxLat: 43.78571943,
  cosMid: 0.767027778945595, scale: 47.3103397854713,
  offX: 28, offY: 46.7457390321493
};
function projectIberia(lng, lat){
  const x = (lng - IBERIA_PROJECTION.minLng) * IBERIA_PROJECTION.cosMid * IBERIA_PROJECTION.scale + IBERIA_PROJECTION.offX;
  const y = (IBERIA_PROJECTION.maxLat - lat) * IBERIA_PROJECTION.scale + IBERIA_PROJECTION.offY;
  return [x.toFixed(1), y.toFixed(1)];
}
function getIberiaAppellations(){
  return WINE_DB.appellations.filter(a => (a.country === 'Spain(西班牙)' || a.country === 'Portugal(葡萄牙)') && a.coords);
}
function renderIberiaMarkers(){
  const g = document.getElementById('iberia-markers');
  if (!g) return;
  const list = getIberiaAppellations();
  const { numById } = computeGroupedNumbering(list);
  const points = list.map(a => {
    const [x, y] = projectIberia(a.coords.lng, a.coords.lat);
    return { x: Number(x), y: Number(y) };
  });
  declutterPoints(points, 17, 150);
  g.innerHTML = list.map((a, i) => {
    const num = numById[a.id];
    const x = points[i].x.toFixed(1), y = points[i].y.toFixed(1);
    return `<g class="pulse-marker" data-id="${a.id}" onclick="selectAppellation('${a.id}')">
      <circle class="pulse-ring" cx="${x}" cy="${y}" r="8" fill="none" stroke="rgba(185,140,20,.5)" stroke-width="1.5"/>
      <circle class="dot-inner" cx="${x}" cy="${y}" r="7.5" fill="#C5A228" stroke="#FFF" stroke-width="1.5"/>
      <text x="${x}" y="${(points[i].y+2.5).toFixed(1)}" text-anchor="middle" font-size="7" font-weight="700" fill="#FFF" font-family="Inter,sans-serif" style="pointer-events:none;">${num}</text>
    </g>`;
  }).join('');
}
function renderIberiaMarkerList(){ renderMarkerIndexList(getIberiaAppellations()); }

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