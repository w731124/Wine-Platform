/* ════════════════════════════════════
   WINEMAKING STYLES PANEL
════════════════════════════════════ */
function renderWineStylePanel() {
  const cont = document.getElementById('winestyle-container');
  if (!cont) return;
  const list = WINE_DB.wineStyles || [];
  cont.innerHTML = list.map(s => buildWineStyleCardHTML(s)).join('');
}

function buildWineStyleCardHTML(s) {
  return `
    <div class="acc-wrap mb-3">
      <div class="acc-hdr" data-style-id="${s.id}" onclick="toggleWineStyleCard(this)">
        <div class="flex items-center gap-3">
          <span style="font-size:18px;">${s.icon}</span>
          <div>
            <div style="font-family:'Cinzel',serif;font-size:14px;font-weight:600;color:var(--burg);">${s.name}</div>
            <div style="font-size:11.5px;color:var(--txt3);max-width:520px;">${s.oneLiner}</div>
          </div>
        </div>
        <span class="acc-arrow">▼</span>
      </div>
      <div class="acc-body">
        <div class="ic mb-3" style="background:var(--bg-card);">
          <p class="ins-lbl" style="color:var(--burg);font-size:11px;">📜 歷史文化 History</p>
          <p style="font-size:12.5px;line-height:1.65;color:var(--txt2);">${s.history}</p>
        </div>
        <div class="ic mb-3" style="background:var(--bg-card);">
          <p class="ins-lbl" style="color:var(--burg);font-size:11px;">🍇 葡萄品種 Grapes</p>
          <p style="font-size:12.5px;line-height:1.65;color:var(--txt2);">${s.grapes}</p>
        </div>
        <div class="ic mb-3" style="background:var(--bg-card);">
          <p class="ins-lbl" style="color:var(--burg);font-size:11px;">🌍 風土 Terroir</p>
          <p style="font-size:12.5px;line-height:1.65;color:var(--txt2);">${s.terroir}</p>
        </div>
        <div class="ic" style="background:var(--bg-card);">
          <p class="ins-lbl" style="color:var(--burg);font-size:11px;">⚗️ 釀造方式 Production</p>
          <p style="font-size:12.5px;line-height:1.65;color:var(--txt2);">${s.production}</p>
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
