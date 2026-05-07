/* ============== Orlay Pay — vanilla JS ============== */
(function(){
  'use strict';

  /* ---------- year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- nav scroll bg ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 80);
  window.addEventListener('scroll', onScroll, {passive:true}); onScroll();

  /* ---------- mobile nav ---------- */
  const tog = document.getElementById('navToggle');
  const mob = document.getElementById('navMobile');
  tog.addEventListener('click', () => {
    const open = mob.hasAttribute('hidden') ? false : true;
    if (open) { mob.setAttribute('hidden',''); tog.setAttribute('aria-expanded','false'); }
    else      { mob.removeAttribute('hidden'); tog.setAttribute('aria-expanded','true'); }
  });
  mob.addEventListener('click', e => {
    if (e.target.tagName === 'A') { mob.setAttribute('hidden',''); tog.setAttribute('aria-expanded','false'); }
  });

  /* ---------- reveal on scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en, i) => {
      if (en.isIntersecting) {
        const el = en.target;
        const delay = +(el.dataset.delay||0);
        setTimeout(() => el.classList.add('in'), delay);
        io.unobserve(el);
      }
    });
  }, { threshold:.12, rootMargin:'0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* ---------- hero parallax ---------- */
  const px = document.querySelector('[data-parallax]');
  if (px) {
    const onMove = () => { const y = window.scrollY; px.style.transform = `translateY(${Math.min(120,y*.2)}px)`; px.style.opacity = String(Math.max(.2, 1 - y/600)); };
    window.addEventListener('scroll', onMove, {passive:true});
  }

  /* ---------- marquee ---------- */
  const items = ["Festival","Concerti","Stadi & Palazzetti","Food court","Hospitality","VIP","Merchandising","Corporate"];
  const mt = document.getElementById('marquee');
  const seq = items.concat(items).concat(items).concat(items);
  mt.innerHTML = seq.map(s => `<span>${s}</span><span class="sep"></span>`).join('');

  /* ---------- benefits ---------- */
  const benefits = [
    {t:"Più ordini completati",d:"Soprattutto nelle finestre di massima domanda."},
    {t:"Più velocità al banco",d:"Meno passaggi manuali, meno errori, meno improvvisazione."},
    {t:"Più controllo per zona",d:"Ordini, incassi, ritiri e performance leggibili per area."},
    {t:"Più valore post-evento",d:"Dati utili per decidere pricing, staffing e layout successivi."}
  ];
  document.getElementById('benefits').innerHTML = benefits.map((b,i)=>`
    <div class="benefit reveal" data-delay="${i*80}">
      <div class="badge">${i+1}</div>
      <div class="b-t">${b.t}</div>
      <p>${b.d}</p>
    </div>`).join('');
  document.querySelectorAll('#benefits .reveal').forEach(el => io.observe(el));

  /* ---------- tags ---------- */
  const tagList = ["Festival","Concerti","Stadi e palazzetti","Food court","Hospitality","Aree VIP","Merchandising","Eventi corporate"];
  document.getElementById('tags').innerHTML = tagList.map((t,i)=>`<span class="tag reveal" data-delay="${i*50}">${t}</span>`).join('');
  document.querySelectorAll('#tags .reveal').forEach(el => io.observe(el));

  /* ============== MOCKS ============== */

  function consoleMock(){
    return `<div class="console-mock">
      <div class="console-bar">
        <span class="b b1"></span><span class="b b2"></span><span class="b b3"></span>
        <span class="url">console.orlay.pay/live</span>
      </div>
      <div class="console-body">
        <aside class="console-side">
          <div style="font-weight:600;color:var(--ink);margin-bottom:6px">Tenant • Local</div>
          ${["Eventi","Zone di ritiro","Listini","Prodotti","Mappa","Media"].map(i=>`<div class="it ${i==='Eventi'?'active':''}">${i}</div>`).join('')}
        </aside>
        <main class="console-main">
          <div class="kpi-row">
            ${[{l:"Incassato",v:"€128.540",d:"+12%"},{l:"Ordini",v:"2.734",d:"+8%"},{l:"Ticket medio",v:"€12,80",d:"+3%"}].map(k=>`
              <div class="kpi"><div class="k">${k.l}</div><div class="v">${k.v}</div><div class="d">${k.d}</div></div>`).join('')}
          </div>
          <div class="panel-mini">
            <div class="ph"><span>Live trend · ultimi 60 min</span><span class="live-tag">LIVE</span></div>
            <svg viewBox="0 0 360 70" style="width:100%;height:80px">
              <defs><linearGradient id="lg1" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#48b6e6" stop-opacity=".4"/><stop offset="100%" stop-color="#48b6e6" stop-opacity="0"/></linearGradient></defs>
              <path d="M0,50 C40,40 60,55 90,42 C120,30 140,52 170,38 C200,24 220,40 260,28 C300,18 330,32 360,20 L360,70 L0,70 Z" fill="url(#lg1)"/>
              <path class="line-anim" d="M0,50 C40,40 60,55 90,42 C120,30 140,52 170,38 C200,24 220,40 260,28 C300,18 330,32 360,20" fill="none" stroke="#3a78d2" stroke-width="2" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" style="animation:line-draw 1.6s ease forwards"/>
            </svg>
          </div>
          <div class="panel-mini">
            <div class="ph"><span>Performance per area</span></div>
            <div class="bars-mini" data-bars>
              ${[{n:"VIP Lounge",v:92},{n:"Food Court",v:78},{n:"Bar Centrale",v:64},{n:"Merch",v:41}].map(b=>`
                <div class="bar-row"><div class="nm">${b.n}</div><div class="tr"><div class="fl" data-w="${b.v}%"></div></div><div class="pct">${b.v}%</div></div>`).join('')}
            </div>
          </div>
        </main>
      </div>
    </div>`;
  }

  function phoneMock(){
    return `<div class="phone">
      <div class="phone-deco"><div class="pill p1"></div><div class="pill p2"></div><div class="pill p3"></div><div class="glow"></div></div>
      <div class="phone-body">
        <div class="phone-notch"></div>
        <div class="phone-screen">
          <div class="top"><span>≡</span><span class="ttl">orlay<span class="d">.pay</span></span><span>🛒</span></div>
          <div class="row"><span class="green"></span>Connesso alla rete del locale</div>
          <div class="row"><div class="ev-t">Summer Festival 2026</div><div class="ev-d">30 Mar – 30 Apr · Ippodromo San Siro</div></div>
          <div class="search">🔍 Cerca prodotti</div>
          <div class="chips">${["Tutto","Beer","Cocktail","Spirit","Water","Soft"].map((c,i)=>`<span class="chip ${i===0?'on':''}">${c}</span>`).join('')}</div>
          <p class="h">Altri menu disponibili</p>
          <div class="grid4">${["Tacos","Milano","Fra","Arro"].map(n=>`<div class="av"><div class="dot"></div><span>${n}</span></div>`).join('')}</div>
          <p class="h">Drink</p>
          <div class="grid2">
            ${[{n:"Beer Lager",p:"5,00 €"},{n:"IPA Beer",p:"6,00 €"}].map(p=>`
              <div class="pcard"><div class="ph"></div><div class="nm">${p.n}</div><div class="price-row"><span class="pr">${p.p}</span><span class="add">AGGIUNGI</span></div></div>`).join('')}
          </div>
        </div>
      </div>
    </div>`;
  }

  function posMock(){
    return `<div class="pos">
      <div class="pos-deco"><div class="circle"></div><div class="pill pp1"></div><div class="pill pp2"></div><div class="pill pp3"></div></div>
      <div class="fan-screen f0">${fsOrder()}</div>
      <div class="fan-screen f1">${fsPaid()}</div>
      <div class="fan-screen f2">${fsQR()}</div>
      <div class="terminal">
        <div class="top"><span>▦</span><span>)))</span></div>
        <div class="scr">
          <div class="hh"><span style="color:var(--ink-soft)">14:30</span><span class="badge-on">● ONLINE</span></div>
          <div class="smm">Order</div>
          <div class="smm" style="margin-bottom:4px">4 ITEMS TOTAL</div>
          <div class="grid-cells">${["Drinks","Food","Drinks","Food"].map(c=>`<div class="cell">${c}</div>`).join('')}</div>
          <div class="total">€48,00</div>
          <div class="center"><span class="tag-am">PENDING</span></div>
          <div class="total" style="font-size:12px">€78,00</div>
          <div class="center"><span class="tag-em">PAID</span></div>
        </div>
        <div class="keys"><span>◀</span><span>●</span><span>▶</span></div>
        <div class="side1"></div><div class="side2"></div>
      </div>
    </div>`;
  }
  function fsOrder(){
    return `
      <div class="fs-row"><span style="font-weight:600">← Order #8492</span><span style="color:var(--ink-soft)">Cancel</span></div>
      <div class="fs-paid"><div class="pt"><span class="badge">PAID</span><span style="color:#10b981">✓</span></div>
      <div style="font-size:8px;color:var(--ink-soft);margin-top:2px">Total Amount</div><div class="am">$48.00</div>
      <div style="font-size:6px;color:#10b981">↓ Deliver now</div></div>
      <div class="fs-zone"><div class="sw"></div><div><div style="font-size:6px;font-weight:600">BAR A · Gate 2</div><div style="font-size:5px;color:var(--ink-soft)">Pickup zone</div></div></div>
      <div class="fs-list-h">Items to confirm</div>
      ${["Beer ×2","Classic Burger ×1","Garlic Bread ×1"].map((it,i)=>`
        <div class="fs-row bd"><span>${it}</span><span style="padding:1px 4px;border-radius:3px;font-size:5px;font-weight:700;${i===0?'background:#d1fae5;color:#047857':'background:#fef3c7;color:#92400e'}">${i===0?'OK':'PENDING'}</span></div>`).join('')}
    `;
  }
  function fsPaid(){
    return `<div style="text-align:right;font-size:7px;color:var(--ink-soft)">Cancel</div>
      <div class="fs-pay-block"><div class="req">REQUIRED</div><div class="am">$48.00</div><div class="cl">contactless</div></div>
      <div class="fs-tap">tap card near terminal</div>
      <div style="font-size:6px;color:var(--ink-soft);text-align:center">Waiting for payment...</div>
      <div class="fs-btn">Pay now →</div>`;
  }
  function fsQR(){
    return `<div style="text-align:right;font-size:7px;color:var(--ink-soft)">Cancel</div>
      <div style="text-align:center;font-weight:600;margin-bottom:4px">$48.00</div>
      <div style="font-size:6px;color:var(--ink-soft);text-align:center;margin-bottom:4px">Scan QR Code</div>
      <div class="fs-qr"></div>
      <div style="font-size:6px;text-align:center;color:var(--ink-soft)">Order</div>
      <div style="font-size:6px;text-align:center;color:var(--brand);font-weight:600">Enter QR Code Manually</div>
      <div class="fs-btn" style="margin-top:6px">VIEW ALL</div>`;
  }

  function mapMock(){
    const legend = [
      {c:"swe",n:"Area ristoro"},{c:"swa",n:"Bar"},{c:"swv",n:"Ospitalità"},
      {c:"swb",n:"VIP"},{c:"sws",n:"Merchandising"},{c:"swc",n:"Ritiro / E-line"},
      {c:"swbb",n:"Punti di interesse"}
    ];
    return `<div class="map-mock map" id="map">
      <div class="map-grid">
        <aside class="map-side">
          <div class="logo">O</div>
          <i>⌘</i><i>⏱</i><i>◐</i><i>♟</i><i class="on">◆</i><i>⚙</i>
        </aside>
        <div class="map-main">
          <div class="map-head">
            <div class="ttl">Mappa evento <span class="s">Arena dal Vivo 2026 · 26 Maggio 2026</span></div>
            <div class="map-controls">
              <button data-map="reset">Panoramica</button>
              <button data-map="route" class="active">Percorso</button>
              <button data-map="in" class="icon" aria-label="Zoom in">+</button>
              <button data-map="out" class="icon" aria-label="Zoom out">−</button>
              <button data-map="fs" class="icon" aria-label="Fullscreen">⛶</button>
            </div>
          </div>
          <div class="map-canvas" id="mapCanvas">
            <div class="map-stage" id="mapStage">
              <div class="map-dots"></div>
              <div class="tile" style="top:12px;left:50%;transform:translateX(-50%);width:128px;height:48px;background:#fff"><span class="lbl" style="top:50%;left:50%;transform:translate(-50%,-50%);color:var(--ink)">PALCO</span></div>
              <div class="tile bg-em" style="top:80px;left:24px;width:112px;height:96px"><span class="pin pin-em" style="top:8px;left:8px">1</span><span class="pin pin-bl" style="bottom:8px;left:12px">2</span><span class="lbl" style="bottom:8px;right:8px">AREA<br/>RISTORO</span></div>
              <div class="tile bg-am" style="top:80px;right:32px;width:112px;height:96px"><span class="pin pin-bl" style="top:8px;left:12px">4</span><span class="pin pin-bl" style="top:28px;right:16px">5</span><span class="lbl" style="bottom:8px;right:12px">BAR</span></div>
              <div class="tile bg-vi round" style="top:44%;left:50%;transform:translateX(-50%);width:96px;height:96px"><span class="pin pin-bl" style="top:12px;left:50%;transform:translateX(-50%)">★</span><span class="pin pin-bl" style="bottom:12px;left:50%;transform:translateX(-50%)">3</span><span class="lbl" style="bottom:6px;left:50%;transform:translateX(-50%)">AREA VIP</span></div>
              <div class="tile bg-pk" style="bottom:24px;left:24px;width:96px;height:80px"><span class="pin pin-vi" style="top:12px;left:12px">◆</span><span class="lbl" style="bottom:8px;left:12px">OSPITALITÀ</span></div>
              <div class="tile bg-cy" style="bottom:24px;right:40px;width:80px;height:80px"><span class="pin pin-cy" style="top:12px;left:50%;transform:translateX(-50%)">▦</span><span class="lbl" style="bottom:8px;left:50%;transform:translateX(-50%)">RITIRO</span></div>
              <div class="tile bg-bl" style="bottom:12px;left:38%;width:96px;height:48px"><span class="pin pin-cy" style="top:-8px;left:8px">6</span><span class="pin pin-bl" style="top:-8px;right:12px">7</span><span class="pin pin-bl" style="top:-28px;left:50%;transform:translateX(-50%)">8</span><span class="lbl" style="bottom:4px;left:50%;transform:translateX(-50%)">MERCHANDISING</span></div>
              <svg viewBox="0 0 400 340" class="routes" preserveAspectRatio="none">
                <path d="M80,140 C140,170 200,190 200,220 C200,250 260,260 300,250"/>
                <path d="M320,140 C280,170 230,190 200,220 C170,250 120,270 90,260" style="animation-delay:.2s"/>
              </svg>
            </div>
          </div>
        </div>
        <aside class="map-legend">
          <div class="lt">Legenda</div>
          ${legend.map(l=>`<div class="item"><span class="sw ${l.c}"></span>${l.n}</div>`).join('')}
          <div class="item"><span class="dashed"></span>Percorso consigliato</div>
          <div class="zoom-card">
            <div class="zh">Zoom</div>
            <div class="zoom-track"><div class="zoom-fill" id="zoomFill"></div></div>
            <div class="zoom-pct" id="zoomPct">100%</div>
          </div>
        </aside>
      </div>
    </div>`;
  }

  /* mount mocks */
  document.getElementById('consoleMockHero').innerHTML = consoleMock();
  document.getElementById('consoleMockMain').innerHTML = consoleMock();
  document.getElementById('phoneMockHero').innerHTML  = phoneMock();
  document.getElementById('posMockHero').innerHTML    = posMock();
  document.getElementById('posMockOverlay').innerHTML = posMock();
  document.getElementById('mapMock').innerHTML        = mapMock();

  /* console bars animation when visible */
  document.querySelectorAll('[data-bars]').forEach(panel => {
    const obs = new IntersectionObserver((es)=>{ es.forEach(e=>{ if(e.isIntersecting){ panel.querySelectorAll('.fl').forEach(fl => fl.style.width = fl.dataset.w); obs.disconnect(); } }); },{threshold:.3});
    obs.observe(panel);
  });

  /* POS fan-screens animate when in view */
  document.querySelectorAll('.fan-screen').forEach((fs, idx) => {
    const obs = new IntersectionObserver((es)=>{ es.forEach(e=>{ if(e.isIntersecting){ setTimeout(()=>fs.classList.add('in'), idx*150); obs.disconnect(); } }); },{threshold:.2});
    obs.observe(fs);
  });

  /* ---------- MAP controls ---------- */
  let zoom = 1;
  function applyZoom(){
    const stage = document.getElementById('mapStage');
    if (stage) stage.style.transform = `scale(${zoom})`;
    const fill = document.getElementById('zoomFill');
    const pct  = document.getElementById('zoomPct');
    if (fill) fill.style.width = (((zoom - 0.6) / 1.4) * 100) + '%';
    if (pct)  pct.textContent  = Math.round(zoom * 100) + '%';
  }
  applyZoom();
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-map]');
    if (!btn) return;
    const map = document.getElementById('map');
    const canvas = document.getElementById('mapCanvas');
    switch(btn.dataset.map){
      case 'in':    zoom = Math.min(2,  +(zoom + .15).toFixed(2)); applyZoom(); break;
      case 'out':   zoom = Math.max(.6, +(zoom - .15).toFixed(2)); applyZoom(); break;
      case 'reset': zoom = 1; applyZoom(); break;
      case 'route':
        map.classList.toggle('no-routes');
        btn.classList.toggle('active');
        if (!map.classList.contains('no-routes')){
          map.querySelectorAll('.routes path').forEach(p => { p.style.animation='none'; void p.offsetWidth; p.style.animation=''; });
        }
        break;
      case 'fs':
        if (!document.fullscreenElement) canvas.requestFullscreen?.();
        else document.exitFullscreen?.();
        break;
    }
  });

  /* ---------- Analytics: cards + charts ---------- */
  const aCards = [
    {t:"Performance per area",d:"Quali zone vendono e quali rallentano."},
    {t:"Picchi reali",d:"Quando la domanda cresce davvero."},
    {t:"Mix prodotti",d:"Cosa viene scelto, cosa resta indietro."},
    {t:"Decisioni migliori",d:"Meno percezioni, più evidenze operative."}
  ];
  document.getElementById('analyticsCards').innerHTML = aCards.map((c,i)=>`
    <div class="acard reveal" data-delay="${i*80}">
      <div class="meta"><span class="dot"></span><span>0${i+1}</span></div>
      <div class="a-t">${c.t}</div><p>${c.d}</p>
      <svg class="spark" viewBox="0 0 100 50" preserveAspectRatio="none">
        <polyline points="${spark(i)}" fill="none" stroke="#48b6e6" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </div>`).join('');
  document.querySelectorAll('#analyticsCards .reveal').forEach(el => io.observe(el));
  function spark(seed){
    return Array.from({length:12},(_,i)=>{ const v = 30 + Math.sin(i*.6+seed)*12 + (i*(seed+1))%8; return `${(i/11)*100},${50-v/2}`; }).join(' ');
  }

  /* growth chart */
  const bars = [40,55,48,70,88,110,135];
  document.getElementById('growthChart').innerHTML = `<div class="growth">
    <div class="label">Crescita ricavi · YoY</div>
    <div class="big">+182%</div>
    <svg viewBox="0 0 280 160" style="width:100%;margin-top:16px">
      <defs>
        <linearGradient id="bar3d" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#bfe5f7"/><stop offset="100%" stop-color="#5b3edc"/></linearGradient>
        <linearGradient id="bar3dSide" x1="0" x2="1" y1="0" y2="0"><stop offset="0%" stop-color="#3a78d2"/><stop offset="100%" stop-color="#2a3066"/></linearGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="2"/></filter>
      </defs>
      ${bars.map((h,i)=>{ const x=20+i*36, y=150-h; return `
        <g>
          <polygon points="${x+22},${y} ${x+30},${y-6} ${x+30},${150-6} ${x+22},150" fill="url(#bar3dSide)" opacity="0" style="animation:fade-in .6s ease ${i*.08+.2}s forwards"/>
          <rect x="${x}" y="150" width="22" height="0" rx="2" fill="url(#bar3d)" style="animation:bar-grow .8s cubic-bezier(.22,1,.36,1) ${i*.08}s forwards" data-y="${y}" data-h="${h}"/>
          <polygon points="${x},${y} ${x+8},${y-6} ${x+30},${y-6} ${x+22},${y}" fill="#cfe9f8" opacity="0" style="animation:fade-in-90 .5s ease ${i*.08+.4}s forwards"/>
        </g>`; }).join('')}
      <path d="M30,120 Q90,100 140,70 T260,15" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" filter="url(#glow)" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" style="animation:line-draw 1.6s ease .6s forwards"/>
      <polygon points="252,8 268,18 256,26" fill="#fff" opacity="0" style="animation:fade-in 0.4s ease 2s forwards"/>
    </svg>
    <div class="axis">${["Q1","Q2","Q3","Q4","Q5","Q6","Q7"].map(q=>`<span>${q}</span>`).join('')}</div>
  </div>`;
  // After insertion, set actual heights for animation via CSS keyframes (using attribute reach):
  // Simpler: use animation on rect's height/y via inline style w/ CSS variable
  document.querySelectorAll('#growthChart rect').forEach(r => {
    const y = r.dataset.y, h = r.dataset.h;
    r.style.setProperty('--y', y);
    r.style.setProperty('--h', h);
  });

  /* bars chart hourly */
  const bData = [12,18,22,30,28,45,62,78,95,88,70,48];
  const bMax  = Math.max(...bData);
  document.getElementById('barsChart').innerHTML = `<div class="bars" id="bChart">
    ${bData.map((v,i)=>`<div class="col"><div class="bar" style="--h:${(v/bMax)*100}%"></div><span class="lbl">${12+i}h</span></div>`).join('')}
  </div>`;
  const bChart = document.getElementById('bChart');
  const bObs = new IntersectionObserver((es)=>{ es.forEach(e=>{ if(e.isIntersecting){ bChart.classList.add('in'); bObs.disconnect(); } }); },{threshold:.3});
  bObs.observe(bChart);

  /* donuts */
  const donuts = [
    {n:"Bar Centrale",v:86,c:"#3a78d2"},
    {n:"Food Court",v:74,c:"#48b6e6"},
    {n:"VIP Lounge",v:92,c:"#7b5cf0"},
    {n:"Merch",v:48,c:"#22c1c3"}
  ];
  const r = 28, C = 2 * Math.PI * r;
  document.getElementById('donutRow').innerHTML = donuts.map((d,i)=>`
    <div class="donut">
      <svg viewBox="0 0 70 70">
        <circle cx="35" cy="35" r="${r}" fill="none" stroke="#eef3f7" stroke-width="6"/>
        <circle class="d-arc" cx="35" cy="35" r="${r}" fill="none" stroke="${d.c}" stroke-width="6" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C}" data-target="${C - (C*d.v)/100}" style="transition:stroke-dashoffset 1.2s cubic-bezier(.22,1,.36,1) ${i*.15}s"/>
      </svg>
      <div class="v" style="color:${d.c}">${d.v}%</div>
      <div class="label">${d.n}</div>
    </div>`).join('');
  const dRow = document.getElementById('donutRow');
  const dObs = new IntersectionObserver((es)=>{ es.forEach(e=>{ if(e.isIntersecting){ dRow.querySelectorAll('.d-arc').forEach(c => c.style.strokeDashoffset = c.dataset.target); dObs.disconnect(); } }); },{threshold:.3});
  dObs.observe(dRow);

  /* ---------- demo form ---------- */
  const form = document.getElementById('demoForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.querySelectorAll('label, .btn, .form-note').forEach(el => el.style.display = 'none');
    form.querySelector('.form-success').removeAttribute('hidden');
  });

  /* ---------- smooth-scroll handles offset ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      const t = document.getElementById(id);
      if (!t) return;
      e.preventDefault();
      const y = t.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: 'smooth' });
      history.replaceState(null,'','#'+id);
    });
  });

})();

/* keyframes injected via JS */
const style = document.createElement('style');
style.textContent = `
@keyframes line-draw { to { stroke-dashoffset:0 } }
@keyframes fade-in { to { opacity:1 } }
@keyframes fade-in-90 { to { opacity:.9 } }
@keyframes bar-grow {
  from { y:150; height:0 }
  to   { y:var(--y); height:var(--h) }
}
`;
document.head.appendChild(style);
