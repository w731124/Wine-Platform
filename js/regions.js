function renderL2Bar(){
  const bar=document.getElementById('l2-bar');
  const cont=document.getElementById('l2-filters');
  if (!bar || !cont) return;
  const cfg=WINE_DB.l2Config[curL1];
  if(!cfg){bar.classList.remove('open');cont.innerHTML='';return;}
  cont.innerHTML=cfg.map(i=>`<button class="fp2 ${i.val===curL2?'active':''}" data-l2="${i.val}">${i.label}</button>`).join('');
  bar.classList.add('open');
  cont.onclick=e=>{
    const btn=e.target.closest('.fp2');if(!btn)return;
    cont.querySelectorAll('.fp2').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    curL2=btn.dataset.l2;
    renderFilteredRegions();
  };
}

const rs = document.getElementById('region-search');
if (rs) {
  rs.addEventListener('input',function(){
    srchQ=this.value.toLowerCase().trim();
    renderFilteredRegions();
  });
}

/* ════════════════════════════════════
   RENDER: 4-LAYER ACCORDION SYSTEM
════════════════════════════════════ */
function renderFilteredRegions(){
  const cellar=getCellar();
  const cont=document.getElementById('region-container');
  if(!cont) return;

  // 1. Filter
  let list=WINE_DB.appellations.filter(a=>{
    if(cellarFilter && !cellar.includes(a.id)) return false;
    if(curL1==='cellar') return cellar.includes(a.id);
    if(curL1==='old-world') return a.world==='old-world';
    if(curL1==='new-world') return a.world==='new-world';
    if(curL1!=='all') { if(a.country!==curL1) return false; }
    if(curL2&&curL2!=='all-regions'){ if(a.region!==curL2) return false; }
    if(srchQ){
      const h=(a.name+a.region+a.country+a.primaryGrapes.join(' ')).toLowerCase();
      if(!h.includes(srchQ)) return false;
    }
    return true;
  });

  // 2. Group by region
  const groups={};
  list.forEach(a=>{
    if(!groups[a.region]) groups[a.region]={region:a.region,country:a.country,emoji:a.emoji,apps:[]};
    groups[a.region].apps.push(a);
  });

  cont.innerHTML='';
  if(!Object.keys(groups).length){
    cont.innerHTML='<div style="text-align:center;padding:48px 0;"><p style="font-size:13px;color:var(--txt3);">找不到符合條件的產區</p></div>';
    return;
  }

  Object.values(groups).forEach((grp,gi)=>{
    const accId=`acc-${gi}`;
    const wrap=document.createElement('div');
    wrap.className='acc-wrap';

    // L2 Accordion header
    const hdr=document.createElement('div');
    hdr.className='acc-hdr';
    hdr.innerHTML=`
      <div style="display:flex;align-items:center;gap:10px;">
        <span style="font-size:18px;">${grp.emoji}</span>
        <div>
          <div style="font-family:'Cinzel',serif;font-size:14px;font-weight:600;color:var(--burg);">${grp.region}</div>
          <div style="font-size:11px;color:var(--txt3);">${grp.country} · ${grp.apps.length} 個次產區</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-size:11px;color:var(--txt4);">點擊展開</span>
        <span class="acc-arrow" id="arr-${gi}">▼</span>
      </div>`;

    // L3 Accordion body
    const body=document.createElement('div');
    body.className='acc-body';
    body.id=accId;

    const grid=document.createElement('div');
    grid.className='app-grid';
    grp.apps.forEach(app=>{
      const inCellar=cellar.includes(app.id);
      const card=document.createElement('div');
      card.className='app-card'+(inCellar?' in-cellar':'');
      card.innerHTML=`
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
          <div>
            <div style="font-size:13.5px;font-weight:700;color:var(--txt);margin-bottom:2px;">${app.name}</div>
            <div style="font-size:11px;color:var(--txt3);">${app.subRegion}</div>
          </div>
          <button class="cellar-btn ${inCellar?'saved':''}" onclick="event.stopPropagation();toggleCellar('${app.id}')" title="${inCellar?'移出酒窖':'加入酒窖'}">
            ${inCellar?'❤️':'🤍'} ${inCellar?'已收藏':'收藏'}
          </button>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px;">
          ${app.primaryGrapes.map(g=>`<span class="tg tg-grape">${g}</span>`).join('')}
        </div>
        <p style="font-size:11.5px;line-height:1.6;color:var(--txt3);margin-bottom:8px;">${app.styleSummary}</p>
        <div style="display:flex;gap:4px;flex-wrap:wrap;">
          ${(app.aromaWheel||[]).map(a=>`<span class="tg tg-aroma">${a}</span>`).join('')}
        </div>`;
      
      // L4: card click opens drawer
      card.addEventListener('click', e=>{
        e.stopPropagation();
        openDrawer(app);
      });
      grid.appendChild(card);
    });
    body.appendChild(grid);

    // Toggle accordion
    hdr.addEventListener('click',()=>{
      const open=body.classList.contains('open');
      body.classList.toggle('open',!open);
      hdr.classList.toggle('open',!open);
      const arr=document.getElementById('arr-'+gi);
      if(arr){ arr.classList.toggle('open',!open); arr.textContent=open?'▼':'▲'; }
    });

    wrap.appendChild(hdr);
    wrap.appendChild(body);
    cont.appendChild(wrap);
  });
}

/* ════════════════════════════════════
   L4 BOTTOM DRAWER — Full detail
════════════════════════════════════ */
function openDrawer(app){
  const cellar=getCellar();
  const inCellar=cellar.includes(app.id);
  const sp=app.sensoryProfile||{acidity:3,tannin:3,body:3,alcohol:3,finish:3};
  const worldTag=app.world==='old-world'
    ?`<span class="tg tg-co">${app.emoji} ${app.country}</span>`
    :`<span class="tg tg-nw">${app.emoji} ${app.country}</span>`;
  const kiH=(app.keyIdentifiers||[]).map(k=>`<span class="tg tg-reg">${k}</span>`).join(' ');
  const foodH=(app.foodPairingTags||[]).map(f=>`<span class="tg tg-food">${f}</span>`).join(' ');
  const estH=(app.famousEstates||[]).map(e=>`<li style="font-size:11.5px;padding:1.5px 0;color:var(--txt2);">• ${e}</li>`).join('');
  const dims=[{k:'acidity',l:'酸度',c:'#3A6EA8'},{k:'tannin',l:'單寧',c:'#5C061C'},{k:'body',l:'酒體',c:'#A88A60'},{k:'alcohol',l:'酒精感',c:'#7A44A8'},{k:'finish',l:'餘韻',c:'#2A7A58'}];
  const barsH=dims.map(d=>{
    const v=sp[d.k]??0, pct=v*20;
    return `<div style="margin-bottom:8px;">
      <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:3px;">
        <span style="color:var(--txt3);">${d.l}</span>
        <span style="font-weight:600;color:${d.c};">${'●'.repeat(v)}${'○'.repeat(5-v)}</span>
      </div>
      <div class="stat-bg"><div class="stat-fill" style="width:${pct}%;background:${d.c};"></div></div>
    </div>`;
  }).join('');

  // SVG Pentagon radar
  const pentaH=buildPentaSVG(sp);

  const drawerContent = document.getElementById('drawer-body');
  if (drawerContent) {
    drawerContent.innerHTML=`
      <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px;">
        <div>
          <div style="margin-bottom:6px;">${worldTag}</div>
          <h2 style="font-size:17px;font-weight:700;color:var(--txt);margin-bottom:2px;">${app.name}</h2>
          <p style="font-size:11.5px;color:var(--txt3);">${app.region} · ${app.subRegion}</p>
        </div>
        <button class="cellar-btn ${inCellar?'saved':''}" onclick="toggleCellar('${app.id}');this.outerHTML=getDrawerCellarBtn('${app.id}')" style="flex-shrink:0;">
          ${inCellar?'❤️ 已收藏':'🤍 加入酒窖'}
        </button>
      </div>
      <div class="mh" style="margin-bottom:14px;"><p style="font-size:12px;font-style:italic;color:var(--burg);">「${app.memoryHook}」</p></div>
      <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:12px;">
        ${app.primaryGrapes.map(g=>`<span class="tg tg-grape">${g}</span>`).join('')}
      </div>
      <p style="font-size:12.5px;line-height:1.65;color:var(--txt2);margin-bottom:14px;">${app.styleSummary}</p>

      <!-- Grid: sensory + pentagon -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px;">
        <div class="ic">
          <p style="font-size:10px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--txt4);margin-bottom:8px;">物理結構量化</p>
          ${barsH}
        </div>
        <div class="ic" style="display:flex;flex-direction:column;align-items:center;justify-content:center;">
          <p style="font-size:10px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--txt4);margin-bottom:6px;text-align:center;">感官五角圖</p>
          ${pentaH}
          <div style="display:flex;flex-wrap:wrap;gap:4px;justify-content:center;margin-top:6px;">
            <span style="font-size:9px;color:var(--txt4);">酸</span>
            <span style="font-size:9px;color:var(--txt4);">單寧</span>
            <span style="font-size:9px;color:var(--txt4);">酒體</span>
            <span style="font-size:9px;color:var(--txt4);">酒精</span>
            <span style="font-size:9px;color:var(--txt4);">餘韻</span>
          </div>
        </div>
      </div>

      <!-- Aroma -->
      <div style="margin-bottom:12px;">
        <p style="font-size:10px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--txt4);margin-bottom:6px;">核心風味 Aroma Wheel</p>
        <div style="display:flex;flex-wrap:wrap;gap:5px;">${(app.aromaWheel||[]).map(a=>`<span class="tg tg-aroma">${a}</span>`).join('')}</div>
      </div>

      <!-- KEY IDENTIFIERS -->
      <div style="margin-bottom:12px;">
        <p style="font-size:10px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--txt4);margin-bottom:6px;">辨識特徵</p>
        <div style="display:flex;flex-wrap:wrap;gap:4px;">${kiH}</div>
      </div>

      <!-- Food pairing -->
      <div style="margin-bottom:12px;">
        <p style="font-size:10px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--txt4);margin-bottom:6px;">餐酒配對結構</p>
        <div style="display:flex;flex-wrap:wrap;gap:4px;">${foodH}</div>
      </div>

      <!-- Terroir -->
      <div class="ic" style="margin-bottom:12px;">
        <p style="font-size:10px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--txt4);margin-bottom:8px;">TERROIR 風土</p>
        <div style="display:flex;flex-direction:column;gap:5px;">
          <div style="display:flex;gap:8px;font-size:12px;"><span style="color:var(--txt4);min-width:32px;">氣候</span><span style="color:var(--txt);">${app.terroir.climate}</span></div>
          <div style="display:flex;gap:8px;font-size:12px;"><span style="color:var(--txt4);min-width:32px;">土壤</span><span style="color:var(--txt);">${app.terroir.soil}</span></div>
          <div style="display:flex;gap:8px;font-size:12px;"><span style="color:var(--txt4);min-width:32px;">海拔</span><span style="color:var(--txt);">${app.terroir.elevation}</span></div>
        </div>
      </div>

      <!-- Estates -->
      <div style="margin-bottom:12px;">
        <p style="font-size:10px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--txt4);margin-bottom:6px;">代表酒莊</p>
        <ul>${estH}</ul>
      </div>

      <!-- History -->
      <div class="ic" style="margin-bottom:10px;">
        <p style="font-size:10px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--txt4);margin-bottom:6px;">歷史背景</p>
        <p style="font-size:11.5px;line-height:1.7;color:var(--txt3);">${app.history}</p>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:12px;">
        <span style="color:var(--txt4);">陳年潛力</span>
        <span style="color:var(--burg);font-weight:600;">${app.agingPotential}</span>
      </div>`;
  }

  const drawer = document.getElementById('bottom-drawer');
  const ov = document.getElementById('drawer-ov');
  if (drawer) drawer.classList.add('open');
  if (ov) ov.classList.add('open');
  document.body.style.overflow='hidden';
}

function getDrawerCellarBtn(id){
  const inC=getCellar().includes(id);
  return `<button class="cellar-btn ${inC?'saved':''}" onclick="toggleCellar('${id}');this.outerHTML=getDrawerCellarBtn('${id}')" style="flex-shrink:0;">${inC?'❤️ 已收藏':'🤍 加入酒窖'}</button>`;
}

function closeDrawer(){
  const drawer = document.getElementById('bottom-drawer');
  const ov = document.getElementById('drawer-ov');
  if (drawer) drawer.classList.remove('open');
  if (ov) ov.classList.remove('open');
  document.body.style.overflow='';
}

/* ── Pure SVG Pentagon radar ── */
function buildPentaSVG(sp){
  const vals=[sp.acidity||0,sp.tannin||0,sp.body||0,sp.alcohol||0,sp.finish||0];
  const cx=70,cy=70,R=55;
  const angles=[-90,-90+72,-90+144,-90+216,-90+288];
  const points=vals.map((v,i)=>{
    const frac=v/5;
    const rad=angles[i]*Math.PI/180;
    return [cx+R*frac*Math.cos(rad), cy+R*frac*Math.sin(rad)];
  });
  const bg=angles.map(a=>{const r=a*Math.PI/180;return[cx+R*Math.cos(r),cy+R*Math.sin(r)]});
  const toPath=pts=>pts.map((p,i)=>`${i===0?'M':'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')+'Z';
  const labels=['酸','單','體','醇','餘'];
  const labPts=angles.map((a,i)=>{const r=a*Math.PI/180;return{x:cx+(R+10)*Math.cos(r),y:cy+(R+10)*Math.sin(r),l:labels[i]}});
  const gridLines=[.2,.4,.6,.8,1].map(f=>
    `<polygon points="${angles.map(a=>{const r=a*Math.PI/180;return`${(cx+R*f*Math.cos(r)).toFixed(1)},${(cy+R*f*Math.sin(r)).toFixed(1)}`}).join(' ')}" fill="none" stroke="var(--border)" stroke-width="0.8"/>`
  ).join('');
  const spokes=angles.map(a=>{const r=a*Math.PI/180;return`<line x1="${cx}" y1="${cy}" x2="${(cx+R*Math.cos(r)).toFixed(1)}" y2="${(cy+R*Math.sin(r)).toFixed(1)}" stroke="var(--border)" stroke-width="0.8"/>`}).join('');

  return `<svg width="140" height="140" viewBox="0 0 140 140" class="sens-radar">
    ${gridLines}${spokes}
    <polygon points="${points.map(p=>p.map(v=>v.toFixed(1)).join(',')).join(' ')}" fill="rgba(92,6,28,.15)" stroke="var(--burg)" stroke-width="1.8"/>
    ${points.map(p=>`<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3" fill="var(--burg)"/>`).join('')}
    ${labPts.map(p=>`<text x="${p.x.toFixed(1)}" y="${p.y.toFixed(1)}" text-anchor="middle" dominant-baseline="middle" font-size="9" fill="var(--txt3)" font-family="Inter,sans-serif">${p.l}</text>`).join('')}
  </svg>`;
}