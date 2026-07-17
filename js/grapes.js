/* ════════════════════════════════════
   GRAPE VARIETIES PANEL
════════════════════════════════════ */
let curGrapeColor = 'all';
let grapeRadarInsts = {};

function setGrapeColorFilter(color, btn) {
  curGrapeColor = color;
  const wrap = document.getElementById('grape-color-filters');
  if (wrap) wrap.querySelectorAll('.fp').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderGrapePanel();
}

function renderGrapePanel() {
  const cont = document.getElementById('grape-container');
  if (!cont) return;

  // 銷毀既有雷達圖實例，避免重繪時殘留 Chart.js 記憶體
  Object.keys(grapeRadarInsts).forEach(id => {
    if (grapeRadarInsts[id]) { grapeRadarInsts[id].destroy(); delete grapeRadarInsts[id]; }
  });

  const list = (WINE_DB.grapes || []).filter(g => curGrapeColor === 'all' || g.skinColor === curGrapeColor);
  cont.innerHTML = list.map(g => buildGrapeCardHTML(g)).join('');
}

function buildGrapeCardHTML(g) {
  const aromaTags = (g.aromaWheel || []).map(a => `<span class="tg tg-aroma">${a}</span>`).join('');
  const regionTags = (g.representativeRegions || []).map(rid => {
    const app = WINE_DB.appellations.find(a => a.id === rid);
    return app
      ? `<span class="tg tg-reg" style="cursor:pointer;text-decoration:underline;" onclick="jumpToRegionById('${rid}')">${app.name}</span>`
      : `<span class="tg tg-reg">${rid}</span>`;
  }).join('');
  const foodTags = (g.foodPairingTags || []).map(f => `<span class="tg tg-food">${f}</span>`).join('');

  return `
    <div class="acc-wrap mb-3">
      <div class="acc-hdr" data-grape-id="${g.id}" onclick="toggleGrapeCard(this,'${g.id}')">
        <div class="flex items-center gap-3">
          <span style="font-size:18px;">${g.skinColor === 'red' ? '🍷' : '🥂'}</span>
          <div>
            <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
              <div style="font-family:'Cinzel',serif;font-size:var(--fs-card-title);font-weight:600;color:var(--burg);">${g.name}</div>
              ${g.originCountry ? `<span class="tg tg-co">${g.originCountry}</span>` : ''}
              ${g.wsetLevel === 2 ? `<span class="tg-match">WSET L2</span>` : ''}
            </div>
            <div style="font-size:var(--fs-base);color:var(--txt2);max-width:480px;">${g.styleSummary}</div>
          </div>
        </div>
        <span class="acc-arrow">▼</span>
      </div>
      <div class="acc-body" style="background:var(--bg-sub);">
        ${g.history ? `<div class="ic mb-3" style="background:var(--bg-card);"><p class="ins-lbl">📜 品種身世 History</p><p style="font-size:var(--fs-base);line-height:1.65;color:var(--txt2);">${g.history}</p></div>` : ''}
        ${g.confusionNote ? `<div class="ic mb-3" style="background:var(--bg-card);"><p class="ins-lbl">🔍 易混淆品種 Similar Grapes</p><p style="font-size:var(--fs-base);line-height:1.65;color:var(--txt2);">${g.confusionNote}</p></div>` : ''}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="ic" style="background:var(--bg-card);">
            <p class="ins-lbl">🌸 關鍵香氣 Key Aromas</p>
            <div class="flex flex-wrap gap-1 mb-3">${aromaTags}</div>
            <p class="ins-lbl">🗺️ 代表產區 Regions</p>
            <div class="flex flex-wrap gap-1 mb-3">${regionTags}</div>
            <p class="ins-lbl">🌡️ 適飲溫度 Serving Temp</p>
            <p style="font-size:var(--fs-base);line-height:1.65;color:var(--txt2);margin-bottom:12px;">${g.servingTemp}</p>
            <p class="ins-lbl">🍽️ 餐酒搭配 Food Pairing</p>
            <div class="flex flex-wrap gap-1">${foodTags}</div>
          </div>
          <div class="ic flex flex-col items-center justify-center" style="background:var(--bg-card);">
            <p class="ins-lbl mb-2">📈 7 維雷達圖 Radar Chart</p>
            <div style="position:relative;width:100%;max-width:340px;height:290px;">
              <canvas id="grape-radar-${g.id}"></canvas>
            </div>
            <div style="display:flex;gap:10px;justify-content:center;margin-top:6px;font-size:10px;color:var(--txt3);">
              <span>● 品種基因特性</span>
              <span>○ 風格參考值（依產地／釀造而異）</span>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

function toggleGrapeCard(hdr, id) {
  const body = hdr.nextElementSibling;
  const arrow = hdr.querySelector('.acc-arrow');
  const isOpen = body.classList.contains('open');

  // 手風琴行為：收合其他已展開卡片，並銷毀其雷達圖實例避免記憶體洩漏
  document.querySelectorAll('#grape-container .acc-hdr.open').forEach(otherHdr => {
    if (otherHdr === hdr) return;
    const otherId = otherHdr.getAttribute('data-grape-id');
    const otherBody = otherHdr.nextElementSibling;
    const otherArrow = otherHdr.querySelector('.acc-arrow');
    if (otherBody) otherBody.classList.remove('open');
    otherHdr.classList.remove('open');
    if (otherArrow) { otherArrow.classList.remove('open'); otherArrow.textContent = '▼'; }
    if (otherId && grapeRadarInsts[otherId]) { grapeRadarInsts[otherId].destroy(); delete grapeRadarInsts[otherId]; }
  });

  body.classList.toggle('open', !isOpen);
  hdr.classList.toggle('open', !isOpen);
  if (arrow) { arrow.classList.toggle('open', !isOpen); arrow.textContent = isOpen ? '▼' : '▲'; }

  if (!isOpen) {
    buildGrapeRadar(id);
  } else if (grapeRadarInsts[id]) {
    grapeRadarInsts[id].destroy();
    delete grapeRadarInsts[id];
  }
}

function buildGrapeRadar(id) {
  const g = (WINE_DB.grapes || []).find(x => x.id === id);
  if (!g) return;
  if (grapeRadarInsts[id]) { grapeRadarInsts[id].destroy(); delete grapeRadarInsts[id]; }
  const ctx = document.getElementById(`grape-radar-${id}`);
  if (!ctx) return;

  const p = g.profile || {};
  // genetic: 品種基因決定（花香、單寧上限、酸度保留力）；style: 風格參考值，主要由產地/釀造決定
  const DIMS = [
    { key: 'tannin',  label: '單寧\nTannin',       genetic: true  },
    { key: 'acidity', label: '酸度\nAcidity',      genetic: true  },
    { key: 'body',    label: '酒體\nBody',         genetic: false },
    { key: 'alcohol', label: '酒精\nAlcohol',      genetic: false },
    { key: 'finish',  label: '餘韻\nFinish',       genetic: false },
    { key: 'aging',   label: '陳年潛力\nAging',    genetic: false },
    { key: 'floral',  label: '花香/草本\nFloral',  genetic: true  }
  ];
  const labels = DIMS.map(d => d.label);
  const data = DIMS.map(d => p[d.key] || 0);
  const color = g.skinColor === 'red' ? '#5C061C' : '#C5A228';

  grapeRadarInsts[id] = new Chart(ctx.getContext('2d'), {
    type: 'radar',
    data: {
      labels,
      datasets: [{
        label: g.name,
        data,
        backgroundColor: g.skinColor === 'red' ? 'rgba(92,6,28,.18)' : 'rgba(197,168,128,.22)',
        borderColor: color,
        borderWidth: 2.5,
        pointBackgroundColor: DIMS.map(d => d.genetic ? color : '#FFFFFF'),
        pointBorderColor: DIMS.map(() => color),
        pointBorderWidth: 1.5,
        pointRadius: DIMS.map(d => d.genetic ? 5 : 3.5)
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        r: {
          min: 0, max: 10,
          ticks: { stepSize: 2, color: '#A8A29E', font: { size: 9 }, backdropColor: 'transparent' },
          grid: { color: 'rgba(0,0,0,.07)' },
          angleLines: { color: 'rgba(0,0,0,.09)' },
          pointLabels: {
            color: (ctx) => DIMS[ctx.index].genetic ? '#44403C' : '#A8A29E',
            font: { size: 13, family: 'Inter' }
          }
        }
      }
    }
  });
}