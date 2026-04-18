(function(){
  var container = document.getElementById('hero-animation');
  if(!container) return;

  var style = document.createElement('style');
  style.textContent = [
    '.ft-ui-layer{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:24px;background:#010408;}',
    '.ft-dashboard{width:100%;max-width:960px;height:540px;background:#060c14;border-radius:16px;display:grid;grid-template-columns:56px 1fr 1fr 1fr;grid-template-rows:56px 1fr 1fr;overflow:hidden;border:1px solid rgba(255,255,255,0.04);}',
    '.ft-sidebar{grid-row:1/4;background:#060c14;border-right:1px solid rgba(255,255,255,0.04);display:flex;flex-direction:column;align-items:center;padding:16px 0;gap:20px;}',
    '.ft-logo{width:28px;height:28px;background:linear-gradient(135deg,#1a3a6e,#0d1f3c);border-radius:6px;display:flex;align-items:center;justify-content:center;}',
    '.ft-nav-icon{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;opacity:0.3;}',
    '.ft-nav-icon.active{background:rgba(20,50,100,0.3);opacity:0.8;}',
    '.ft-nav-icon svg,.ft-header svg{width:16px;height:16px;stroke:rgba(255,255,255,0.6);fill:none;stroke-width:1.5;}',
    '.ft-avatar{width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#7c2d12,#831843);margin-top:auto;}',
    '.ft-header{grid-column:2/5;background:#060c14;border-bottom:1px solid rgba(255,255,255,0.04);display:flex;align-items:center;justify-content:flex-end;padding:0 20px;gap:16px;}',
    '.ft-panel-left{grid-row:2/4;background:#060c14;border-right:1px solid rgba(255,255,255,0.04);padding:16px;display:flex;flex-direction:column;gap:10px;overflow:hidden;}',
    '.ft-section-title{font-size:11px;font-weight:600;color:rgba(255,255,255,0.5);}',
    '.ft-chart-ring{width:90px;height:90px;margin:0 auto;position:relative;}',
    '.ft-ring-label{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;}',
    '.ft-ring-amount{font-size:10px;font-weight:700;color:rgba(255,255,255,0.7);}',
    '.ft-ring-pct{font-size:8px;color:#1a5c2e;}',
    '.ft-stat-row{display:flex;gap:6px;}',
    '.ft-stat{flex:1;background:#0a1220;border-radius:8px;padding:7px;display:flex;align-items:center;gap:5px;}',
    '.ft-stat-icon{width:20px;height:20px;border-radius:5px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}',
    '.ft-stat-icon.green{background:rgba(20,80,40,0.3);}',
    '.ft-stat-icon.red{background:rgba(80,20,20,0.3);}',
    '.ft-stat-icon svg{width:10px;height:10px;fill:none;stroke-width:2;}',
    '.ft-stat-name{font-size:7px;color:rgba(255,255,255,0.25);}',
    '.ft-stat-val{font-size:9px;font-weight:600;color:rgba(255,255,255,0.6);}',
    '.ft-tx{display:flex;align-items:center;gap:6px;padding:3px 0;border-bottom:1px solid rgba(255,255,255,0.03);}',
    '.ft-tx-icon{width:18px;height:18px;border-radius:50%;background:#0a1220;display:flex;align-items:center;justify-content:center;font-size:8px;flex-shrink:0;}',
    '.ft-tx-name{font-size:8px;color:rgba(255,255,255,0.4);flex:1;}',
    '.ft-tx-amount{font-size:8px;color:rgba(255,255,255,0.35);}',
    '.ft-panel-mid{background:#060c14;border-right:1px solid rgba(255,255,255,0.04);padding:16px;display:flex;flex-direction:column;gap:10px;overflow:hidden;}',
    '.ft-invest-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px;}',
    '.ft-invest-card{background:#0a1220;border-radius:8px;padding:8px;}',
    '.ft-invest-pair{font-size:8px;color:rgba(255,255,255,0.25);margin-bottom:3px;}',
    '.ft-invest-val{font-size:11px;font-weight:700;color:rgba(255,255,255,0.6);}',
    '.ft-trend{font-size:7px;}.ft-trend.up{color:#1a5c2e;}.ft-trend.down{color:#5c1a1a;}',
    '.ft-avatars{display:flex;gap:5px;}',
    '.ft-send-avatar{width:24px;height:24px;border-radius:50%;border:1.5px solid #060c14;}',
    '.ft-send-avatar.add{background:#0a1220;display:flex;align-items:center;justify-content:center;font-size:11px;color:rgba(255,255,255,0.2);}',
    '.ft-card-sel{background:#0a1220;border-radius:7px;padding:6px 8px;display:flex;align-items:center;gap:6px;}',
    '.ft-visa{font-size:8px;font-weight:800;color:rgba(255,255,255,0.5);}',
    '.ft-card-num{font-size:8px;color:rgba(255,255,255,0.2);flex:1;}',
    '.ft-amount-box{background:#0a1220;border-radius:7px;padding:8px;}',
    '.ft-input-label{font-size:7px;color:rgba(255,255,255,0.2);margin-bottom:2px;}',
    '.ft-input-val{font-size:14px;font-weight:700;color:rgba(255,255,255,0.6);}',
    '.ft-send-btn{background:#0d2244;border-radius:7px;padding:7px;text-align:center;font-size:9px;font-weight:600;color:rgba(255,255,255,0.4);}',
    '.ft-panel-right{background:#060c14;padding:16px;display:flex;flex-direction:column;gap:10px;overflow:hidden;}',
    '.ft-card-visual{background:linear-gradient(135deg,#0a1a2e,#060e1c);border-radius:10px;padding:12px;display:flex;flex-direction:column;justify-content:space-between;height:90px;border:1px solid rgba(255,255,255,0.04);}',
    '.ft-visa-logo{font-size:12px;font-weight:800;color:rgba(255,255,255,0.4);font-style:italic;}',
    '.ft-card-dots{font-size:8px;color:rgba(255,255,255,0.3);letter-spacing:0.1em;}',
    '.ft-card-exp{font-size:7px;color:rgba(255,255,255,0.2);}',
    '.ft-balance{font-size:16px;font-weight:700;color:rgba(255,255,255,0.55);text-align:center;}',
    '.ft-activity{display:flex;align-items:center;gap:6px;margin-bottom:4px;}',
    '.ft-act-icon{width:20px;height:20px;border-radius:5px;flex-shrink:0;opacity:0.5;}',
    '.ft-act-name{font-size:8px;color:rgba(255,255,255,0.45);font-weight:500;}',
    '.ft-act-sub{font-size:7px;color:rgba(255,255,255,0.2);}',
    '.ft-act-amount{font-size:8px;color:rgba(255,255,255,0.3);margin-left:auto;}',
    '#ft-customize-btn{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,0.05);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);font-size:12px;letter-spacing:0.08em;padding:8px 16px;border-radius:999px;cursor:pointer;font-family:inherit;transition:background 0.3s;}',
    '#ft-customize-btn:hover{background:rgba(255,255,255,0.1);}',
    '#ft-panel{position:fixed;bottom:60px;right:20px;left:auto;z-index:9999;background:rgba(1,4,8,0.96);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:20px;width:240px;opacity:0;transform:translateY(8px);pointer-events:none;transition:opacity 0.3s,transform 0.3s;font-family:inherit;}',
    '#ft-panel.visible{opacity:1;transform:translateY(0);pointer-events:all;}',
    '.ft-cl{font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.3);margin-bottom:6px;margin-top:14px;display:block;}',
    '.ft-cl:first-child{margin-top:0;}',
    '.ft-cr{display:flex;align-items:center;gap:10px;}',
    '.ft-cr input[type=range]{flex:1;-webkit-appearance:none;height:3px;background:rgba(255,255,255,0.08);border-radius:999px;outline:none;}',
    '.ft-cr input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:14px;height:14px;border-radius:50%;background:#1a3a6e;cursor:pointer;}',
    '.ft-cv{font-size:11px;color:rgba(255,255,255,0.3);min-width:32px;text-align:right;}',
    '.ft-divl{height:0.5px;background:rgba(255,255,255,0.06);margin:14px 0;}',
    '#ft-reset{width:100%;margin-top:14px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.3);font-size:11px;letter-spacing:0.08em;padding:7px;border-radius:999px;cursor:pointer;font-family:inherit;transition:background 0.2s;}',
    '#ft-reset:hover{background:rgba(255,255,255,0.08);color:rgba(255,255,255,0.6);}'
  ].join('');
  document.head.appendChild(style);

  function buildDashboard(){
    return [
      '<div class="ft-sidebar">',
        '<div class="ft-logo"><svg viewBox="0 0 16 16"><path d="M8 2L14 12H2L8 2Z" fill="rgba(255,255,255,0.6)"/></svg></div>',
        '<div class="ft-nav-icon active"><svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>',
        '<div class="ft-nav-icon"><svg viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg></div>',
        '<div class="ft-nav-icon"><svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>',
        '<div class="ft-nav-icon"><svg viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg></div>',
        '<div class="ft-nav-icon"><svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg></div>',
        '<div class="ft-avatar"></div>',
      '</div>',
      '<div class="ft-header">',
        '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
        '<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>',
      '</div>',
      '<div class="ft-panel-left">',
        '<span class="ft-section-title">Income & Expenses</span>',
        '<div class="ft-chart-ring"><svg viewBox="0 0 100 100" width="90" height="90"><circle fill="none" stroke="#0a1220" stroke-width="12" cx="50" cy="50" r="35"/><circle fill="none" stroke="#1a3a6e" stroke-width="12" stroke-linecap="round" stroke-dasharray="220" stroke-dashoffset="55" transform="rotate(-90 50 50)" cx="50" cy="50" r="35"/></svg><div class="ft-ring-label"><span class="ft-ring-amount">$1,562</span><span class="ft-ring-pct">+14%</span></div></div>',
        '<div class="ft-stat-row"><div class="ft-stat"><div class="ft-stat-icon green"><svg viewBox="0 0 24 24" stroke="#1a5c2e"><polyline points="17 11 12 6 7 11"/><line x1="12" y1="18" x2="12" y2="6"/></svg></div><div><div class="ft-stat-name">Income</div><div class="ft-stat-val">+$4,245</div></div></div><div class="ft-stat"><div class="ft-stat-icon red"><svg viewBox="0 0 24 24" stroke="#5c1a1a"><polyline points="17 13 12 18 7 13"/><line x1="12" y1="6" x2="12" y2="18"/></svg></div><div><div class="ft-stat-name">Outcome</div><div class="ft-stat-val">−$445</div></div></div></div>',
        '<div class="ft-tx"><div class="ft-tx-icon">🚲</div><span class="ft-tx-name">Sport — July</span><span class="ft-tx-amount">$321.47</span></div>',
        '<div class="ft-tx"><div class="ft-tx-icon">🚗</div><span class="ft-tx-name">Car Repair</span><span class="ft-tx-amount">$210.03</span></div>',
        '<div class="ft-tx"><div class="ft-tx-icon">📖</div><span class="ft-tx-name">Education</span><span class="ft-tx-amount">$554.12</span></div>',
      '</div>',
      '<div class="ft-panel-mid">',
        '<span class="ft-section-title">Investment</span>',
        '<div class="ft-invest-grid"><div class="ft-invest-card"><div class="ft-invest-pair">ETH/USD</div><div class="ft-invest-val">$4,124.00</div><div class="ft-trend down">↘ −2.1%</div></div><div class="ft-invest-card"><div class="ft-invest-pair">BTC/USD</div><div class="ft-invest-val">$7,124.00</div><div class="ft-trend up">↗ +5.3%</div></div></div>',
        '<span class="ft-section-title">Send money to</span>',
        '<div class="ft-avatars"><div class="ft-send-avatar" style="background:linear-gradient(135deg,#7c2d12,#831843)"></div><div class="ft-send-avatar" style="background:linear-gradient(135deg,#1e3a8a,#3b0764)"></div><div class="ft-send-avatar" style="background:linear-gradient(135deg,#14532d,#164e63)"></div><div class="ft-send-avatar add">+</div></div>',
        '<div class="ft-card-sel"><span class="ft-visa">VISA</span><span class="ft-card-num">•••• 2233</span></div>',
        '<div class="ft-amount-box"><div class="ft-input-label">Enter the amount</div><div class="ft-input-val">$266</div></div>',
        '<div class="ft-send-btn">Send money</div>',
      '</div>',
      '<div class="ft-panel-right">',
        '<span class="ft-section-title">My cards</span>',
        '<div class="ft-card-visual"><span class="ft-visa-logo">VISA</span><div><div class="ft-card-dots">•••• •••• •••• 2233</div><div class="ft-card-exp">07 / 2023</div></div></div>',
        '<div class="ft-balance">$8,244.00</div>',
        '<span class="ft-section-title">Recent Activities</span>',
        '<div class="ft-activity"><div class="ft-act-icon" style="background:#1db954"></div><div><div class="ft-act-name">Spotify</div><div class="ft-act-sub">Music Platform</div></div><span class="ft-act-amount">−$24.00</span></div>',
        '<div class="ft-activity"><div class="ft-act-icon" style="background:#0061fe"></div><div><div class="ft-act-name">Dropbox</div><div class="ft-act-sub">Storage</div></div><span class="ft-act-amount">−$78.12</span></div>',
        '<div class="ft-activity"><div class="ft-act-icon" style="background:#111;border:1px solid #1a2030"></div><div><div class="ft-act-name">Nike</div><div class="ft-act-sub">Sport</div></div><span class="ft-act-amount">−$50.00</span></div>',
      '</div>'
    ].join('');
  }

  container.style.position = 'relative';
  container.style.overflow = 'hidden';
  container.style.background = '#010408';

  var uiSharp = document.createElement('div');
  uiSharp.className = 'ft-ui-layer';
  uiSharp.style.zIndex = '1';
  uiSharp.innerHTML = '<div class="ft-dashboard">'+buildDashboard()+'</div>';
  container.style.position = 'absolute';
container.style.inset = '0';
container.style.width = '100%';
container.style.height = '100%';
container.style.zIndex = '0';
  container.appendChild(uiSharp);

  var uiBlur = document.createElement('div');
  uiBlur.className = 'ft-ui-layer';
  uiBlur.style.zIndex = '2';
  uiBlur.style.filter = 'blur(3px) brightness(0.65)';
  uiBlur.innerHTML = '<div class="ft-dashboard">'+buildDashboard()+'</div>';
  container.appendChild(uiBlur);

  var canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;z-index:3;pointer-events:none;';
  container.appendChild(canvas);
  var ctx = canvas.getContext('2d');

  var glowEl = document.createElement('div');
  glowEl.style.cssText = 'position:absolute;border-radius:50%;pointer-events:none;z-index:4;opacity:0;transform:translate(-50%,-50%);transition:opacity 0.6s ease;';
  container.appendChild(glowEl);

  var hint = document.createElement('div');
  hint.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;z-index:5;pointer-events:none;transition:opacity 0.8s ease;';
  hint.innerHTML = '<span style="font-size:12px;color:rgba(255,255,255,0.18);letter-spacing:0.2em;text-transform:uppercase;font-family:inherit;">Mueve el ratón para explorar</span>';
  container.appendChild(hint);

  var CFG = { radius:140, blur:3, organ:20, residual:25, glowInt:10 };
  var DEFAULTS = JSON.parse(JSON.stringify(CFG));
  var mx=0, my=0, lx=0, ly=0;
  var active=false, hintGone=false, t=0;

  function sNoise(x,y,t){
    return Math.sin(x*0.7+t)*Math.cos(y*0.5+t*0.6)*0.5+
           Math.sin(x*1.2-t*0.4)*Math.sin(y*1.0+t*0.25)*0.3+
           Math.cos(x*0.4+y*0.8+t*0.35)*0.2;
  }

  function resize(){
    canvas.width=container.offsetWidth;
    canvas.height=container.offsetHeight;
  }
  window.addEventListener('resize',function(){ setTimeout(resize,200); });
  resize();

  document.addEventListener('mousemove',function(e){
    var r=container.getBoundingClientRect();
    mx=e.clientX-r.left; my=e.clientY-r.top;
    if(!active){
      active=true;
      glowEl.style.opacity='1';
      if(!hintGone){ hint.style.opacity='0'; hintGone=true; }
    }
  });

  /* ── Botón personalizar ── */
  var btn = document.createElement('button');
  btn.id = 'ft-customize-btn';
  btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="2.5" stroke="rgba(255,255,255,0.5)" stroke-width="1.2"/><path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M2.5 2.5l1 1M10.5 10.5l1 1M11.5 2.5l-1 1M3.5 10.5l-1 1" stroke="rgba(255,255,255,0.5)" stroke-width="1.2" stroke-linecap="round"/></svg><span>Personalizar</span>';

  var panel = document.createElement('div');
  panel.id = 'ft-panel';
  panel.innerHTML = [
    '<span class="ft-cl">Radio del spotlight</span>',
    '<div class="ft-cr"><input type="range" id="ft-radius" min="40" max="300" step="10" value="140"><span class="ft-cv" id="ft-vradius">140</span></div>',
    '<span class="ft-cl">Blur en el spotlight</span>',
    '<div class="ft-cr"><input type="range" id="ft-blur" min="0" max="24" step="1" value="3"><span class="ft-cv" id="ft-vblur">3</span></div>',
    '<span class="ft-cl">Organicidad del borde</span>',
    '<div class="ft-cr"><input type="range" id="ft-organ" min="0" max="50" step="1" value="20"><span class="ft-cv" id="ft-vorgan">20</span></div>',
    '<span class="ft-cl">Opacidad residual</span>',
    '<div class="ft-cr"><input type="range" id="ft-residual" min="0" max="70" step="1" value="25"><span class="ft-cv" id="ft-vresidual">25</span></div>',
    '<span class="ft-cl">Intensidad del glow</span>',
    '<div class="ft-cr"><input type="range" id="ft-glow-sl" min="0" max="30" step="1" value="10"><span class="ft-cv" id="ft-vglow">10</span></div>',
    '<div class="ft-divl"></div>',
    '<button id="ft-reset">Restablecer</button>'
  ].join('');

 container.appendChild(btn);
document.body.appendChild(panel);

  var panelOpen=false;
  btn.addEventListener('click',function(){
    panelOpen=!panelOpen;
    panel.classList.toggle('visible',panelOpen);
    btn.querySelector('span').textContent=panelOpen?'Cerrar':'Personalizar';
  });

  function bind(id,vid,key){
    var sl=document.getElementById(id),vl=document.getElementById(vid);
    sl.addEventListener('input',function(){ CFG[key]=parseFloat(this.value); vl.textContent=this.value; });
  }
  bind('ft-radius','ft-vradius','radius');
  bind('ft-blur','ft-vblur','blur');
  bind('ft-organ','ft-vorgan','organ');
  bind('ft-residual','ft-vresidual','residual');
  bind('ft-glow-sl','ft-vglow','glowInt');

  document.getElementById('ft-reset').addEventListener('click',function(){
    CFG=JSON.parse(JSON.stringify(DEFAULTS));
    document.getElementById('ft-radius').value=140;  document.getElementById('ft-vradius').textContent='140';
    document.getElementById('ft-blur').value=3;      document.getElementById('ft-vblur').textContent='3';
    document.getElementById('ft-organ').value=20;    document.getElementById('ft-vorgan').textContent='20';
    document.getElementById('ft-residual').value=25; document.getElementById('ft-vresidual').textContent='25';
    document.getElementById('ft-glow-sl').value=10;  document.getElementById('ft-vglow').textContent='10';
  });

  /* ── Loop ── */
  function draw(){
    lx+=(mx-lx)*0.06; ly+=(my-ly)*0.06;
    var W=canvas.width, H=canvas.height;
    ctx.clearRect(0,0,W,H);
    uiBlur.style.filter='blur('+CFG.blur+'px) brightness(0.65)';

    if(active||Math.abs(lx-mx)>0.2||Math.abs(ly-my)>0.2){
      var r=CFG.radius, organ=CFG.organ, POINTS=80;
      ctx.fillStyle='rgba(0,0,0,1)'; ctx.fillRect(0,0,W,H);

      ctx.save();
      ctx.globalCompositeOperation='destination-out';
      ctx.beginPath();
      for(var i=0;i<=POINTS;i++){
        var angle=(i/POINTS)*Math.PI*2;
        var nx=Math.cos(angle), ny=Math.sin(angle);
        var d=sNoise(nx*2.5+lx*0.008,ny*2.5+ly*0.008,t)*organ;
        var rr=r+d;
        i===0?ctx.moveTo(lx+nx*rr,ly+ny*rr):ctx.lineTo(lx+nx*rr,ly+ny*rr);
      }
      ctx.closePath(); ctx.fillStyle='rgba(0,0,0,1)'; ctx.fill();

      for(var layer=0;layer<16;layer++){
        var progress=layer/16;
        var layerR=r+organ*2*progress;
        ctx.beginPath();
        for(var i=0;i<=POINTS;i++){
          var angle=(i/POINTS)*Math.PI*2;
          var nx=Math.cos(angle), ny=Math.sin(angle);
          var d=sNoise(nx*2.5+lx*0.008+layer*0.2,ny*2.5+ly*0.008,t+layer*0.08)*organ*(1+progress*0.8);
          var rr=layerR+d;
          i===0?ctx.moveTo(lx+nx*rr,ly+ny*rr):ctx.lineTo(lx+nx*rr,ly+ny*rr);
        }
        ctx.closePath();
        ctx.fillStyle='rgba(0,0,0,'+(0.08*(1-progress))+')'; ctx.fill();
      }
      ctx.restore();

      if(CFG.residual>0){
        ctx.save(); ctx.globalCompositeOperation='source-over';
        var rg=ctx.createRadialGradient(lx,ly,0,lx,ly,r*1.2);
        rg.addColorStop(0,'rgba(0,0,0,'+(CFG.residual/100)+')');
        rg.addColorStop(0.6,'rgba(0,0,0,'+(CFG.residual/200)+')');
        rg.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=rg; ctx.beginPath(); ctx.arc(lx,ly,r*1.4,0,Math.PI*2); ctx.fill();
        ctx.restore();
      }

      var gs=r*3;
      glowEl.style.width=gs+'px'; glowEl.style.height=gs+'px';
      glowEl.style.left=lx.toFixed(1)+'px'; glowEl.style.top=ly.toFixed(1)+'px';
      glowEl.style.background='radial-gradient(circle,rgba(10,20,60,'+(CFG.glowInt/100).toFixed(2)+') 0%,transparent 65%)';
    } else {
      ctx.fillStyle='rgba(0,0,0,1)'; ctx.fillRect(0,0,W,H);
    }

    t+=0.01;
    requestAnimationFrame(draw);
  }
  draw();
})();
