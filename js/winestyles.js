/* ════════════════════════════════════
   WINEMAKING STYLES PANEL
════════════════════════════════════ */
function renderWineStylePanel() {
  const cont = document.getElementById('winestyle-container');
  if (!cont) return;
  const list = WINE_DB.wineStyles || [];
  cont.innerHTML = list.map(s => buildWineStyleCardHTML(s)).join('');
}

function buildProductionTableHTML(table) {
  if (!table) return '';
  const headH = table.columns.map(c => `<th style="background:var(--burg);color:#fff;font-size:var(--fs-base);font-weight:600;padding:8px 10px;text-align:left;">${c}</th>`).join('');
  const rowsH = table.rows.map(r => `
    <tr>
      <td style="font-size:var(--fs-base);font-weight:600;color:var(--txt);padding:8px 10px;background:var(--bg-el);white-space:nowrap;vertical-align:top;">${r.label}</td>
      ${r.values.map(v => `<td style="font-size:var(--fs-base);color:var(--txt2);padding:8px 10px;vertical-align:top;">${v}</td>`).join('')}
    </tr>`).join('');
  return `<div style="overflow-x:auto;"><table style="width:100%;border-collapse:collapse;background:var(--bg-card);"><thead><tr><th style="background:var(--burg);"></th>${headH}</tr></thead><tbody>${rowsH}</tbody></table></div>`;
}

function buildProductionStepsHTML(steps) {
  if (!steps) return '';
  return `<div class="flex flex-col gap-3">${steps.map(s => `
    <div style="display:flex;gap:12px;align-items:flex-start;">
      <span style="display:flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:var(--burg);color:#fff;font-size:var(--fs-base);font-weight:700;flex-shrink:0;">${s.step}</span>
      <div>
        <div style="font-size:var(--fs-base);font-weight:700;color:var(--txt);margin-bottom:2px;">${s.title}</div>
        <div style="font-size:var(--fs-base);line-height:1.6;color:var(--txt2);">${s.desc}</div>
      </div>
    </div>`).join('')}</div>`;
}

function buildWineStyleCardHTML(s) {
  const productionH = s.productionType === 'table'
    ? buildProductionTableHTML(s.productionTable)
    : buildProductionStepsHTML(s.productionSteps);
  const tagsH = (s.tags || []).map(t => `<span class="tg tg-trait">${t}</span>`).join(' ');
  return `
    <div class="acc-wrap mb-3">
      <div class="acc-hdr" data-style-id="${s.id}" onclick="toggleWineStyleCard(this)">
        <div class="flex items-center gap-3">
          <span style="font-size:18px;">${s.icon}</span>
          <div>
            <div style="font-family:'Cinzel',serif;font-size:var(--fs-card-title);font-weight:600;color:var(--burg);">${s.name}</div>
            <div style="font-size:var(--fs-base);color:var(--txt2);max-width:520px;">${s.oneLiner}</div>
          </div>
        </div>
        <span class="acc-arrow">▼</span>
      </div>
      <div class="acc-body" style="background:var(--bg-sub);">
        <div class="ic mb-3" style="background:var(--bg-card);">
          <p class="ins-lbl">📜 歷史文化 History</p>
          <p style="font-size:var(--fs-base);line-height:1.65;color:var(--txt2);">${s.history}</p>
        </div>
        <div class="ic mb-3" style="background:var(--bg-card);">
          <p class="ins-lbl">🍇 葡萄品種 Grapes</p>
          <p style="font-size:var(--fs-base);line-height:1.65;color:var(--txt2);">${s.grapes}</p>
        </div>
        <div class="ic mb-3" style="background:var(--bg-card);">
          <p class="ins-lbl">🌍 風土 Terroir</p>
          <p style="font-size:var(--fs-base);line-height:1.65;color:var(--txt2);">${s.terroir}</p>
        </div>
        <div class="ic mb-3" style="background:var(--bg-card);">
          <p class="ins-lbl">⚗️ 釀造方式 Production</p>
          ${productionH}
        </div>
        <div class="ic mb-3" style="background:var(--bg-card);">
          <p class="ins-lbl">🏷️ 工藝標籤 Tags</p>
          <div style="display:flex;flex-wrap:wrap;gap:4px;">${tagsH}</div>
        </div>
      </div>
    </div>`;
}

function toggleWineStyleCard(hdr) {
  const body = hdr.nextElementSibling;
  const arrow = hdr.querySelector('.acc-arrow');
  const isOpen = body.classList.contains('open');

  // 手風琴行為：收合其他已展開卡片
  document.querySelectorAll('#winestyle-container .acc-hdr.open').forEach(otherHdr => {
    if (otherHdr === hdr) return;
    const otherBody = otherHdr.nextElementSibling;
    const otherArrow = otherHdr.querySelector('.acc-arrow');
    if (otherBody) otherBody.classList.remove('open');
    otherHdr.classList.remove('open');
    if (otherArrow) { otherArrow.classList.remove('open'); otherArrow.textContent = '▼'; }
  });

  body.classList.toggle('open', !isOpen);
  hdr.classList.toggle('open', !isOpen);
  if (arrow) { arrow.classList.toggle('open', !isOpen); arrow.textContent = isOpen ? '▼' : '▲'; }
}
