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
    return `<span class="tg tg-reg">${app ? app.name : rid}</span>`;
  }).join('');
  const foodTags = (g.foodPairingTags || []).map(f => `<span class="tg tg-food">${f}</span>`).join('');

  return `
    <div class="acc-wrap mb-3">
      <div class="acc-hdr" onclick="toggleGrapeCard(this,'${g.id}')">
        <div class="flex items-center gap-3">
          <span style="font-size:18px;">${g.skinColor === 'red' ? '🍷' : '🥂'}</span>
          <div>
            <div style="font-family:'Cinzel',serif;font-size:14px;font-weight:600;color:var(--burg);">${g.name}</div>
            <div style="font-size:11.5px;color:var(--txt3);max-width:480px;">${g.styleSummary}</div>
          </div>
        </div>
        <span class="acc-arrow">▼</span>
      </div>
      <div class="acc-body">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
          <div>
            <p class="ins-lbl">關鍵香氣 Key Aromas</p>
            <div class="flex flex-wrap gap-1 mb-3">${aromaTags}</div>
            <p class="ins-lbl">代表產區 Regions</p>
            <div class="flex flex-wrap gap-1 mb-3">${regionTags}</div>
            <p class="ins-lbl">適飲溫度 Serving Temp</p>
            <p style="font-size:12.5px;color:var(--txt);margin-bottom:12px;">${g.servingTemp}</p>
            <p class="ins-lbl">餐酒搭配 Food Pairing</p>
            <div class="flex flex-wrap gap-1">${foodTags}</div>
          </div>
          <div class="flex flex-col items-center justify-center">
            <p class="ins-lbl mb-2">7 維雷達圖</p>
            <div style="position:relative;width:100%;max-width:260px;height:230px;">
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
            font: { size: 9, family: 'Inter' }
          }
        }
      }
    }
  });
}