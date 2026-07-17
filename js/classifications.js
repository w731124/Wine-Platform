/* ════════════════════════════════════
   CLASSIFICATION SYSTEMS PANEL
════════════════════════════════════ */
let curClassBasis = 'all';
let curClassCountry = null; // null = 尚未選定國家
let classInteracted = false; // 是否已經點過任一篩選（國家或By類型），尚未點擊前不顯示卡片

const CLASS_BASIS_META = {
  estate: { icon: '🏰', label: 'Estate(酒莊)' },
  vineyard: { icon: '🍇', label: 'Vineyard(葡萄園)' },
  region: { icon: '🗺️', label: 'Region(產區)' }
};

function renderClassCountryFilters() {
  const cont = document.getElementById('class-country-filters');
  if (!cont) return;
  const countries = [...new Set((WINE_DB.classifications || []).map(c => c.country))];
  cont.innerHTML = countries.map(country =>
    `<button class="fp2 ${country === curClassCountry ? 'active' : ''}" data-class-country="${country}">${flagIconHTML(country)} ${country}</button>`
  ).join('');
  cont.onclick = e => {
    const btn = e.target.closest('.fp2');
    if (!btn) return;
    cont.querySelectorAll('.fp2').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    curClassCountry = btn.dataset.classCountry;
    classInteracted = true;
    // 國家與 By 分類是各自獨立的篩選模式，點國家後 By 篩選重設為「全部」
    curClassBasis = 'all';
    const basisWrap = document.getElementById('class-basis-filters');
    if (basisWrap) {
      basisWrap.querySelectorAll('.fp').forEach(b => b.classList.remove('active'));
      const allBtn = basisWrap.querySelector('.fp');
      if (allBtn) allBtn.classList.add('active');
    }
    renderClassificationPanel();
  };
}

function setClassBasisFilter(basis, btn) {
  curClassBasis = basis;
  classInteracted = true;
  // 國家與 By 分類是各自獨立的篩選模式，點 By 篩選後國家選擇重設
  curClassCountry = null;
  const countryWrap = document.getElementById('class-country-filters');
  if (countryWrap) countryWrap.querySelectorAll('.fp2').forEach(b => b.classList.remove('active'));
  const wrap = document.getElementById('class-basis-filters');
  if (wrap) wrap.querySelectorAll('.fp').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderClassificationPanel();
}

function renderClassificationPanel() {
  const cont = document.getElementById('classification-container');
  if (!cont) return;

  if (!classInteracted) {
    cont.innerHTML = '<div style="text-align:center;padding:64px 0;"><p style="font-size:32px;margin-bottom:12px;">🎖️</p><p style="font-size:var(--fs-base);color:var(--txt2);">請先選擇上方的國家，或直接選擇分級邏輯（By 酒莊／葡萄園／產區）</p></div>';
    return;
  }

  const list = curClassCountry
    ? (WINE_DB.classifications || []).filter(c => c.country === curClassCountry)
    : (WINE_DB.classifications || []).filter(c => curClassBasis === 'all' || c.basis === curClassBasis);

  const groups = {};
  list.forEach(c => {
    if (!groups[c.country]) groups[c.country] = [];
    groups[c.country].push(c);
  });

  if (!Object.keys(groups).length) {
    cont.innerHTML = '<div style="text-align:center;padding:48px 0;"><p style="font-size:var(--fs-base);color:var(--txt2);">找不到符合條件的分級制度</p></div>';
    return;
  }

  cont.innerHTML = Object.keys(groups).map(country => `
    <div class="mb-2" style="font-family:'Cinzel',serif;font-size:var(--fs-2xl);font-weight:600;color:var(--burg);margin-top:18px;padding-bottom:6px;border-bottom:1px solid var(--border-lt);">${country}</div>
    ${groups[country].map(c => buildClassificationCardHTML(c)).join('')}
  `).join('');
}

function toggleClassCard(hdr) {
  const body = hdr.nextElementSibling;
  const arrow = hdr.querySelector('.acc-arrow');
  const isOpen = body.classList.contains('open');

  // 手風琴行為：收合其他已展開卡片
  document.querySelectorAll('#classification-container .acc-hdr.open').forEach(otherHdr => {
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

function buildClassificationCardHTML(c) {
  const meta = CLASS_BASIS_META[c.basis] || {};
  const tiersHTML = (c.tiers || []).map((t, i) => `
    <div style="display:flex;gap:10px;align-items:flex-start;padding:9px 12px;background:var(--bg-card);border:1px solid var(--border-lt);border-radius:8px;">
      <span style="font-family:'Cinzel',serif;font-weight:700;color:var(--gold-dk);font-size:12px;flex-shrink:0;">${i + 1}</span>
      <div>
        <div style="font-size:var(--fs-base);font-weight:600;color:var(--txt);">${t.name}</div>
        ${t.note ? `<div style="font-size:var(--fs-base);color:var(--txt2);margin-top:2px;line-height:1.55;">${t.note}</div>` : ''}
      </div>
    </div>`).join('');

  return `
    <div class="acc-wrap mb-3">
      <div class="acc-hdr" data-class-id="${c.id}" onclick="toggleClassCard(this)">
        <div class="flex items-center gap-3">
          <span style="font-size:18px;">🎖️</span>
          <div>
            <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
              <div style="font-family:'Cinzel',serif;font-size:var(--fs-card-title);font-weight:600;color:var(--burg);">${c.name}</div>
              <span class="tg tg-reg" style="font-size:9.5px;padding:1px 7px;">${c.region}</span>
              <span class="tg-match" style="font-size:9.5px;padding:1px 7px;">${meta.icon || ''} ${c.basisLabel}</span>
            </div>
            <div style="font-size:var(--fs-base);color:var(--txt2);max-width:560px;">${c.summary}</div>
          </div>
        </div>
        <span class="acc-arrow">▼</span>
      </div>
      <div class="acc-body" style="background:var(--bg-sub);">
        <p class="ins-lbl">🎖️ 分級層級 Tiers（由高至低）</p>
        <div class="flex flex-col gap-2 mb-3">${tiersHTML}</div>
        ${c.history ? `<div class="ic mb-3" style="background:var(--bg-card);"><p class="ins-lbl">📜 歷史背景 History</p><p style="font-size:var(--fs-base);line-height:1.65;color:var(--txt2);">${c.history}</p></div>` : ''}
        ${c.crossNote ? `<div class="ic" style="background:var(--bg-card);"><p class="ins-lbl">🔗 跨區對照 Cross-reference</p><p style="font-size:var(--fs-base);line-height:1.65;color:var(--txt2);">${c.crossNote}</p></div>` : ''}
      </div>
    </div>`;
}
