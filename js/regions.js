function renderL1CountryFilters(){
  const bar=document.getElementById('l1-country-bar');
  const cont=document.getElementById('l1-country-filters');
  if (!bar || !cont) return;
  if(curL1!=='all'&&curL1!=='old-world'&&curL1!=='new-world'){ bar.classList.remove('open'); cont.innerHTML=''; return; }

  const buildRow=(list)=>`<div class="flex flex-wrap justify-center gap-1.5">${list.map(country=>
    `<button class="fp2 ${country===curL1?'active':''}" data-l1c="${country}">${flagIconHTML(country)} ${country}</button>`
  ).join('')}</div>`;

  if(curL1==='all'){
    const oldWorld=[...new Set(WINE_DB.appellations.filter(a=>a.world==='old-world').map(a=>a.country))];
    const newWorld=[...new Set(WINE_DB.appellations.filter(a=>a.world==='new-world').map(a=>a.country))];
    cont.innerHTML=buildRow(oldWorld)+buildRow(newWorld);
  } else {
    const countries=[...new Set(WINE_DB.appellations.filter(a=>a.world===curL1).map(a=>a.country))];
    cont.innerHTML=buildRow(countries);
  }
  bar.classList.add('open');
  cont.onclick=e=>{
    const btn=e.target.closest('.fp2');if(!btn)return;
    cont.querySelectorAll('.fp2').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    curL1=btn.dataset.l1c;
    curL2='all-regions';
    renderL2Bar();
    renderFilteredRegions();
  };
}

function renderL2Bar(){
  const bar=document.getElementById('l2-bar');
  const cont=document.getElementById('l2-filters');
  if (!bar || !cont) return;
  if(curL1==='all'||curL1==='old-world'||curL1==='new-world'){bar.classList.remove('open');cont.innerHTML='';return;}
  const regions=[...new Set(WINE_DB.appellations.filter(a=>a.country===curL1).map(a=>a.region))];
  const cfg=[{val:'all-regions',label:'全部大區'}, ...regions.map(r=>({val:r,label:r}))];
  cont.innerHTML=cfg.map(i=>`<button class="fp2 fp2-region ${i.val===curL2?'active':''}" data-l2="${i.val}">${i.label}</button>`).join('');
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
  const cont=document.getElementById('region-container');
  if(!cont) return;

  // 尚未選定特定國家、也沒有搜尋關鍵字時，不列出大產區，等使用者點擊國家後才展開
  const hasCountry = curL1!=='all'&&curL1!=='old-world'&&curL1!=='new-world';
  if(!hasCountry && !srchQ){
    cont.innerHTML='<div style="text-align:center;padding:64px 0;"><p style="font-size:32px;margin-bottom:12px;">🌍</p><p style="font-size:13px;color:var(--txt3);">請先選擇上方的國家，即可瀏覽該國所有大產區</p></div>';
    return;
  }

  // 1. Filter
  let list=WINE_DB.appellations.filter(a=>{
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
    if(!groups[a.region]) groups[a.region]={region:a.region,country:a.country,apps:[]};
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
        <span>${flagIconHTML(grp.country, 20)}</span>
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
      const card=document.createElement('div');
      card.className='app-card';
      card.innerHTML=`
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
          <div>
            <div style="font-size:13.5px;font-weight:700;color:var(--txt);margin-bottom:2px;">${app.name}</div>
            <div style="font-size:11px;color:var(--txt3);">${app.subRegion}</div>
          </div>
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
  const sp=app.profile||{acidity:6,tannin:6,body:6,alcohol:6,finish:6,aging:5,floral:5};
  const worldTag=app.world==='old-world'
    ?`<span class="tg tg-co">${flagIconHTML(app.country,16)} ${app.country}</span>`
    :`<span class="tg tg-nw">${flagIconHTML(app.country,16)} ${app.country}</span>`;
  const kiH=(app.keyIdentifiers||[]).map(k=>`<span class="tg tg-trait">${k}</span>`).join(' ');
  const foodH=(app.foodPairingTags||[]).map(f=>`<span class="tg tg-food">${f}</span>`).join(' ');
  const estH=(app.famousEstates||[]).map(e=>`<li style="font-size:11.5px;padding:1.5px 0;color:var(--txt2);">• ${e}</li>`).join('');
  const dims=[{k:'acidity',l:'酸度',c:'#3A6EA8'},{k:'tannin',l:'單寧',c:'#5C061C'},{k:'body',l:'酒體',c:'#A88A60'},{k:'alcohol',l:'酒精',c:'#7A44A8'},{k:'finish',l:'餘韻',c:'#2A7A58'},{k:'aging',l:'陳年潛力',c:'#1A6A4A'},{k:'floral',l:'花香/草本',c:'#A84A7A'}];
  const barsH=dims.map(d=>{
    const v=sp[d.k]??0, pct=v*10;
    return `<div style="margin-bottom:8px;">
      <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:3px;">
        <span style="color:var(--txt3);">${d.l}</span>
        <span style="font-weight:600;color:${d.c};">${v}/10</span>
      </div>
      <div class="stat-bg"><div class="stat-fill" style="width:${pct}%;background:${d.c};"></div></div>
    </div>`;
  }).join('');

  const drawerContent = document.getElementById('drawer-body');
  if (drawerContent) {
    drawerContent.innerHTML=`
      <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px;">
        <div>
          <div style="margin-bottom:6px;">${worldTag}</div>
          <h2 style="font-size:17px;font-weight:700;color:var(--txt);margin-bottom:2px;">${app.name}</h2>
          <p style="font-size:11.5px;color:var(--txt3);">${app.region} · ${app.subRegion}</p>
        </div>
      </div>
      <div class="mh" style="margin-bottom:14px;"><p style="font-size:12px;font-style:italic;color:var(--burg);">「${app.memoryHook}」</p></div>
      <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:12px;">
        ${app.primaryGrapes.map(g=>{
          const gid=findGrapeIdByName(g);
          return gid
            ? `<span class="tg tg-grape" style="cursor:pointer;text-decoration:underline;" onclick="jumpToGrapeById('${gid}')">${g}</span>`
            : `<span class="tg tg-grape">${g}</span>`;
        }).join('')}
      </div>
      <p style="font-size:12.5px;line-height:1.65;color:var(--txt2);margin-bottom:14px;">${app.styleSummary}</p>

<!-- Grid: sensory bars + tag groups -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px;">
        <div class="ic" style="background:var(--bg-card);">
          <p class="ins-lbl" style="color:var(--gold-dk);font-size:11px;">📊 物理結構量化 Structure</p>
          ${barsH}
        </div>
        <div class="ic" style="background:var(--bg-card);display:flex;flex-direction:column;gap:12px;">
          <div>
            <p class="ins-lbl" style="color:var(--gold-dk);font-size:11px;">🌸 核心風味 Aroma Wheel</p>
            <div style="display:flex;flex-wrap:wrap;gap:5px;">${(app.aromaWheel||[]).map(a=>`<span class="tg tg-aroma">${a}</span>`).join('')}</div>
          </div>
          <div>
            <p class="ins-lbl" style="color:var(--gold-dk);font-size:11px;">🔑 辨識特徵 Key Identifiers</p>
            <div style="display:flex;flex-wrap:wrap;gap:4px;">${kiH}</div>
          </div>
          <div>
            <p class="ins-lbl" style="color:var(--gold-dk);font-size:11px;">🍽️ 餐酒配對結構 Food Pairing</p>
            <div style="display:flex;flex-wrap:wrap;gap:4px;">${foodH}</div>
          </div>
        </div>
      </div>

      <!-- Terroir -->
      <div class="ic mb-3" style="background:var(--bg-card);">
        <p class="ins-lbl" style="color:var(--gold-dk);font-size:11px;">🌍 風土 Terroir</p>
        <div style="display:flex;flex-direction:column;gap:5px;">
          <div style="display:flex;gap:8px;font-size:12px;"><span style="color:var(--txt4);min-width:32px;">氣候</span><span style="color:var(--txt);">${app.terroir.climate}</span></div>
          <div style="display:flex;gap:8px;font-size:12px;"><span style="color:var(--txt4);min-width:32px;">土壤</span><span style="color:var(--txt);">${app.terroir.soil}</span></div>
          <div style="display:flex;gap:8px;font-size:12px;"><span style="color:var(--txt4);min-width:32px;">海拔</span><span style="color:var(--txt);">${app.terroir.elevation}</span></div>
        </div>
      </div>

      <!-- Estates -->
      <div class="ic mb-3" style="background:var(--bg-card);">
        <p class="ins-lbl" style="color:var(--gold-dk);font-size:11px;">🏰 代表酒莊 Famous Estates</p>
        <ul>${estH}</ul>
      </div>

      <!-- History -->
      <div class="ic mb-3" style="background:var(--bg-card);">
        <p class="ins-lbl" style="color:var(--gold-dk);font-size:11px;">📜 歷史背景 History</p>
        <p style="font-size:12.5px;line-height:1.65;color:var(--txt2);">${app.history}</p>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:12px;">
        <span style="color:var(--txt4);">陳年潛力</span>
        <span style="color:var(--burg);font-weight:600;">${app.agingPotential}</span>
      </div>
      ${app.agingNote ? `
      <div class="ic mb-3" style="background:var(--bg-card);margin-top:10px;">
        <p class="ins-lbl" style="color:var(--gold-dk);font-size:11px;">⏳ 陳年潛力解析 Aging Note</p>
        <p style="font-size:12.5px;line-height:1.65;color:var(--txt2);">${app.agingNote}</p>
      </div>` : ''}`;
  }

  const drawer = document.getElementById('bottom-drawer');
  const ov = document.getElementById('drawer-ov');
  if (drawer) drawer.classList.add('open');
  if (ov) ov.classList.add('open');
  document.body.style.overflow='hidden';
}

function closeDrawer(){
  const drawer = document.getElementById('bottom-drawer');
  const ov = document.getElementById('drawer-ov');
  if (drawer) drawer.classList.remove('open');
  if (ov) ov.classList.remove('open');
  document.body.style.overflow='';
}