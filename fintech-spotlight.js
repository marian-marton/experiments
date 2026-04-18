(function(){
  var container = document.getElementById('hero-animation');
  if(!container) return;

  container.style.position = 'absolute';
  container.style.inset = '0';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.zIndex = '0';
  container.style.background = '#010408';

  var style = document.createElement('style');
  style.textContent = [
    '.ft-ui-layer{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:24px;background:#010408;}',
    '.ft-dashboard{width:100%;max-width:960px;height:540px;background:#060c14;border-radius:16px;display:grid;grid-template-columns:56px 1fr 1fr 1fr;grid-template-rows:56px 1fr 1fr;overflow:hidden;border:1px solid rgba(255,255,255,0.06);}',
    '.ft-sidebar{grid-row:1/4;background:#060c14;border-right:1px solid rgba(255,255,255,0.06);display:flex;flex-direction:column;align-items:center;padding:16px 0;gap:20px;}',
    '.ft-logo{width:28px;height:28px;background:linear-gradient(135deg,#2a4a8e,#1a3a6e);border-radius:6px;display:flex;align-items:center;justify-content:center;}',
    '.ft-nav-icon{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;opacity:0.35;}',
    '.ft-nav-icon.active{background:rgba(59,130,246,0.2);opacity:1;}',
    '.ft-nav-icon svg,.ft-header svg{width:16px;height:16px;stroke:rgba(255,255,255,0.7);fill:none;stroke-width:1.5;}',
    '.ft-avatar{width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#7c2d12,#831843);margin-top:auto;}',
    '.ft-header{grid-column:2/5;background:#060c14;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:flex-end;padding:0 20px;gap:16px;}',
    '.ft-panel-left{grid-row:2/4;background:#060c14;border-right:1px solid rgba(255,255,255,0.06);padding:16px;display:flex;flex-direction:column;gap:10px;overflow:hidden;}',
    '.ft-section-title{font-size:11px;font-weight:600;color:rgba(255,255,255,0.7);}',
    '.ft-balance-main{background:linear-gradient(135deg,#0d1f3c,#0a1628);border-radius:10px;padding:12px;border:1px solid rgba(59,130,246,0.15);}',
    '.ft-balance-label{font-size:8px;color:rgba(255,255,255,0.4);margin-bottom:4px;}',
    '.ft-balance-amount{font-size:18px;font-weight:700;color:white;}',
    '.ft-balance-change{font-size:9px;color:#22c55e;margin-top:2px;}',
    '.ft-chart{width:100%;height:80px;margin:4px 0;}',
    '.ft-stat-row{display:flex;gap:6px;}',
    '.ft-stat{flex:1;background:#0a1220;border-radius:8px;padding:7px;display:flex;align-items:center;gap:5px;}',
    '.ft-stat-icon{width:20px;height:20px;border-radius:5px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}',
    '.ft-stat-icon.green{background:rgba(34,197,94,0.15);}',
    '.ft-stat-icon.red{background:rgba(239,68,68,0.15);}',
    '.ft-stat-icon svg{width:10px;height:10px;fill:none;stroke-width:2;}',
    '.ft-stat-name{font-size:7px;color:rgba(255,255,255,0.3);}',
    '.ft-stat-val{font-size:9px;font-weight:600;color:rgba(255,255,255,0.8);}',
    '.ft-tx{display:flex;align-items:center;gap:6px;padding:4px 0;border-bottom:1px solid rgba(255,255,255,0.04);}',
    '.ft-tx-icon{width:20px;height:20px;border-radius:6px;background:#0a1220;display:flex;align-items:center;justify-content:center;font-size:9px;flex-shrink:0;}',
    '.ft-tx-name{font-size:8px;color:rgba(255,255,255,0.6);flex:1;}',
    '.ft-tx-amount{font-size:8px;font-weight:600;color:rgba(255,255,255,0.5);}',
    '.ft-panel-mid{background:#060c14;border-right:1px solid rgba(255,255,255,0.06);padding:16px;display:flex;flex-direction:column;gap:10px;overflow:hidden;}',
    '.ft-invest-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px;}',
    '.ft-invest-card{background:#0a1220;border-radius:8px;padding:10px;border:1px solid rgba(255,255,255,0.04);}',
    '.ft-invest-pair{font-size:8px;color:rgba(255,255,255,0.35);margin-bottom:3px;}',
    '.ft-invest-val{font-size:12px;font-weight:700;color:rgba(255,255,255,0.85);}',
    '.ft-trend{font-size:7px;margin-top:2px;}',
    '.ft-trend.up{color:#22c55e;}.ft-trend.down{color:#ef4444;}',
    '.ft-sparkline{margin-top:6px;}',
    '.ft-donut-wrap{display:flex;align-items:center;gap:12px;background:#0a1220;border-radius:8px;padding:10px;}',
    '.ft-donut-info{flex:1;}',
    '.ft-donut-pct{font-size:14px;font-weight:700;color:white;}',
    '.ft-donut-label{font-size:8px;color:rgba(255,255,255,0.3);}',
    '.ft-donut-items{display:flex;flex-direction:column;gap:3px;margin-top:4px;}',
    '.ft-donut-item{display:flex;align-items:center;gap:4px;font-size:7px;color:rgba(255,255,255,0.5);}',
    '.ft-donut-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0;}',
    '.ft-panel-right{background:#060c14;padding:16px;display:flex;flex-direction:column;gap:10px;overflow:hidden;}',
    '.ft-card-visual{background:linear-gradient(135deg,#0d1f3c,#060e1c);border-radius:12px;padding:14px;display:flex;flex-direction:column;justify-content:space-between;height:100px;border:1px solid rgba(59,130,246,0.2);}',
    '.ft-visa-logo{font-size:13px;font-weight:800;color:rgba(255,255,255,0.6);font-style:italic;}',
    '.ft-card-dots{font-size:8px;color:rgba(255,255,255,0.4);letter-spacing:0.12em;}',
    '.ft-card-exp{font-size:7px;color:rgba(255,255,255,0.25);}',
    '.ft-total-balance{text-align:center;}',
    '.ft-total-label{font-size:8px;color:rgba(255,255,255,0.3);}',
    '.ft-total-amount{font-size:18px;font-weight:700;color:white;}',
    '.ft-activity{display:flex;align-items:center;gap:8px;padding:4px 0;border-bottom:1px solid rgba(255,255,255,0.04);}',
    '.ft-act-icon{width:22px;height:22px;border-radius:6px;flex-shrink:0;display:flex;align-items:center;justify-content:center;}',
    '.ft-act-name{font-size:8px;color:rgba(255,255,255,0.7);font-weight:500;}',
    '.ft-act-sub{font-size:7px;color:rgba(255,255,255,0.25);}',
    '.ft-act-amount{font-size:8px;color:rgba(255,255,255,0.45);margin-left:auto;}',
    '#ft-customize-btn{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,0.1);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.2);color:white;font-size:12px;letter-spacing:0.08em;padding:8px 16px;border-radius:999px;cursor:pointer;font-family:inherit;transition:background 0.3s;}',
    '#ft-customize-btn:hover{background:rgba(255,255,255,0.2);}',
    '#ft-panel{background:rgba(5,5,8,0.92);border:1px solid rgba(255,255,255,0.12);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:16px;padding:20px;width:240px;font-family:inherit;color:white;}',
    '.ft-cl{font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.4);margin-bottom:6px;margin-top:14px;display:block;}',
    '.ft-cl:first-child{margin-top:0;}',
    '.ft-cr{display:flex;align-items:center;gap:10px;}',
    '.ft-cr input[type=range]{flex:1;-webkit-appearance:none;height:3px;background:rgba(255,255,255,0.15);border-radius:999px;outline:none;}',
    '.ft-cr input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:14px;height:14px;border-radius:50%;background:#BCF448;cursor:pointer;}',
    '.ft-cv{font-size:11px;color:rgba(255,255,255,0.5);min-width:28px;text-align:right;}',
    '.ft-divl{height:0.5px;background:rgba(255,255,255,0.1);margin:14px 0;}',
    '#ft-reset{width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.5);font-size:11px;letter-spacing:0.08em;padding:7px;border-radius:999px;cursor:pointer;font-family:inherit;}',
    '#ft-reset:hover{background:rgba(255,255,255,0.12);color:white;}'
  ].join('');
  document.head.appendChild(style);

  function buildBarChart(){
    var bars=[40,65,45,80,55,90,70,85,60,75,50,88];
    var W=160,H=60,pad=2;
    var bw=(W-pad*(bars.length-1))/bars.length;
    var max=Math.max.apply(null,bars);
    var rects=bars.map(function(v,i){
      var h=(v/100)*H,x=i*(bw+pad),y=H-h;
      return '<rect x="'+x.toFixed(1)+'" y="'+y.toFixed(1)+'" width="'+bw.toFixed(1)+'" height="'+h.toFixed(1)+'" rx="2" fill="'+(v===max?'#3b82f6':'rgba(59,130,246,0.3)')+'"/>';
    }).join('');
    var points=bars.map(function(v,i){ return (i*(bw+pad)+bw/2).toFixed(1)+','+(H-(v/100)*H).toFixed(1); }).join(' ');
    var labels=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(function(l,i){
      return '<text x="'+(i*2*(bw+pad)+bw/2).toFixed(1)+'" y="'+(H+10)+'" font-size="5" fill="rgba(255,255,255,0.25)" text-anchor="middle">'+l+'</text>';
    }).join('');
    return '<svg viewBox="0 0 '+W+' '+(H+14)+'" width="100%" style="display:block;">'+rects+'<polyline points="'+points+'" fill="none" stroke="rgba(99,179,237,0.6)" stroke-width="1.2" stroke-linejoin="round"/>'+labels+'</svg>';
  }

  function buildSparkline(vals,color){
    var W=60,H=20,max=Math.max.apply(null,vals),min=Math.min.apply(null,vals);
    var pts=vals.map(function(v,i){ return ((i/(vals.length-1))*W).toFixed(1)+','+(H-((v-min)/(max-min||1))*H).toFixed(1); }).join(' ');
    return '<svg viewBox="0 0 '+W+' '+H+'" width="60" height="20"><polyline points="'+pts+'" fill="none" stroke="'+color+'" stroke-width="1.5" stroke-linejoin="round"/></svg>';
  }

  function buildDonut(){
    var r=22,cx=26,cy=26,circ=2*Math.PI*r,offset=0;
    var segs=[{pct:0.5047,color:'#3b82f6'},{pct:0.28,color:'#22c55e'},{pct:0.215,color:'#8b5cf6'}];
    var paths=segs.map(function(s){
      var dash=s.pct*circ,gap=circ-dash;
      var p='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="'+s.color+'" stroke-width="6" stroke-dasharray="'+dash.toFixed(2)+' '+gap.toFixed(2)+'" stroke-dashoffset="'+(-offset*circ).toFixed(2)+'" transform="rotate(-90 '+cx+' '+cy+')"/>';
      offset+=s.pct; return p;
    }).join('');
    return '<svg viewBox="0 0 52 52" width="52" height="52"><circle cx="26" cy="26" r="22" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="6"/>'+paths+'</svg>';
  }

  function buildDashboard(){
    return [
      '<div class="ft-sidebar">',
        '<div class="ft-logo"><svg viewBox="0 0 16 16"><path d="M8 2L14 12H2L8 2Z" fill="rgba(255,255,255,0.8)"/></svg></div>',
        '<div class="ft-nav-icon active"><svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>',
        '<div class="ft-nav-icon"><svg viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg></div>',
        '<div class="ft-nav-icon"><svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>',
        '<div class="ft-nav-icon"><svg viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg></div>',
        '<div class="ft-nav-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg></div>',
        '<div class="ft-avatar"></div>',
      '</div>',
      '<div class="ft-header">',
        '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
        '<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>',
      '</div>',
      '<div class="ft-panel-left">',
        '<span class="ft-section-title">Investment Overview</span>',
        '<div class="ft-balance-main"><div class="ft-balance-label">Current Balance</div><div class="ft-balance-amount">$4,124.00</div><div class="ft-balance-change">▲ 773%</div></div>',
        '<div class="ft-chart">'+buildBarChart()+'</div>',
        '<div class="ft-stat-row">',
          '<div class="ft-stat"><div class="ft-stat-icon green"><svg viewBox="0 0 24 24" stroke="#22c55e"><polyline points="17 11 12 6 7 11"/><line x1="12" y1="18" x2="12" y2="6"/></svg></div><div><div class="ft-stat-name">Income</div><div class="ft-stat-val">+$4,245</div></div></div>',
          '<div class="ft-stat"><div class="ft-stat-icon red"><svg viewBox="0 0 24 24" stroke="#ef4444"><polyline points="17 13 12 18 7 13"/><line x1="12" y1="6" x2="12" y2="18"/></svg></div><div><div class="ft-stat-name">Outcome</div><div class="ft-stat-val">−$445</div></div></div>',
        '</div>',
        '<div class="ft-tx"><div class="ft-tx-icon">🚲</div><span class="ft-tx-name">Sport — July</span><span class="ft-tx-amount">$321.47</span></div>',
        '<div class="ft-tx"><div class="ft-tx-icon">🚗</div><span class="ft-tx-name">Car Repair</span><span class="ft-tx-amount">$210.03</span></div>',
        '<div class="ft-tx"><div class="ft-tx-icon">📖</div><span class="ft-tx-name">Education</span><span class="ft-tx-amount">$554.12</span></div>',
      '</div>',
      '<div class="ft-panel-mid">',
        '<span class="ft-section-title">Markets</span>',
        '<div class="ft-invest-grid">',
          '<div class="ft-invest-card"><div class="ft-invest-pair">ETH/USD</div><div class="ft-invest-val">$4,124.00</div><div class="ft-trend down">↘ −2.1%</div><div class="ft-sparkline">'+buildSparkline([60,55,58,50,45,48,42,44,40],'#ef4444')+'</div></div>',
          '<div class="ft-invest-card"><div class="ft-invest-pair">BTC/USD</div><div class="ft-invest-val">$7,124.00</div><div class="ft-trend up">↗ +5.3%</div><div class="ft-sparkline">'+buildSparkline([40,45,42,50,55,52,60,58,65],'#22c55e')+'</div></div>',
        '</div>',
        '<span class="ft-section-title">Portfolio</span>',
        '<div class="ft-donut-wrap">'+buildDonut()+'<div class="ft-donut-info"><div class="ft-donut-pct">5047%</div><div class="ft-donut-label">Total return</div><div class="ft-donut-items"><div class="ft-donut-item"><div class="ft-donut-dot" style="background:#3b82f6"></div>BTC 50.5%</div><div class="ft-donut-item"><div class="ft-donut-dot" style="background:#22c55e"></div>ETH 28.0%</div><div class="ft-donut-item"><div class="ft-donut-dot" style="background:#8b5cf6"></div>Other 21.5%</div></div></div></div>',
        '<div class="ft-tx"><div class="ft-tx-icon">📈</div><span class="ft-tx-name">Nobut Thriva</span><span class="ft-tx-amount" style="color:#22c55e">+3000%</span></div>',
        '<div class="ft-tx"><div class="ft-tx-icon">💹</div><span class="ft-tx-name">$1,688.30</span><span class="ft-tx-amount" style="color:#22c55e">+3000%</span></div>',
      '</div>',
      '<div class="ft-panel-right">',
        '<div style="display:flex;align-items:center;justify-content:space-between;"><span class="ft-section-title">My cards</span><span style="font-size:16px;color:rgba(255,255,255,0.2);">···</span></div>',
        '<div class="ft-card-visual"><div style="display:flex;align-items:center;justify-content:space-between;"><span class="ft-visa-logo">VISA</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"><path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01"/></svg></div><div><div class="ft-card-dots">•••• •••• •••• 2233</div><div class="ft-card-exp">07 / 2023</div></div></div>',
        '<div class="ft-total-balance"><div class="ft-total-label">Total balance</div><div class="ft-total-amount">$8,244.00</div></div>',
        '<span class="ft-section-title">Recent Activities</span>',
        '<div class="ft-activity"><div class="ft-act-icon" style="background:rgba(29,185,84,0.15)"><svg width="12" height="12" viewBox="0 0 24 24" fill="#1db954"><circle cx="12" cy="12" r="10"/></svg></div><div><div class="ft-act-name">Spotify</div><div class="ft-act-sub">Music Platform</div></div><span class="ft-act-amount">−$24.00</span></div>',
        '<div class="ft-activity"><div class="ft-act-icon" style="background:rgba(0,97,254,0.15)"><svg width="12" height="12" viewBox="0 0 24 24" fill="#0061fe"><circle cx="12" cy="12" r="10"/></svg></div><div><div class="ft-act-name">Dropbox</div><div class="ft-act-sub">Storage</div></div><span class="ft-act-amount">−$78.12</span></div>',
        '<div class="ft-activity"><div class="ft-act-icon" style="background:rgba(255,255,255,0.06)"><svg width="12" height="12" viewBox="0 0 24 24" fill="rgba(255,255,255,0.5)"><circle cx="12" cy="12" r="10"/></svg></div><div><div class="ft-act-name">Nike</div><div class="ft-act-sub">Sport</div></div><span class="ft-act-amount">−$50.00</span></div>',
      '</div>'
    ].join('');
  }

  var uiSharp = document.createElement('div');
  uiSharp.className = 'ft-ui-layer';
  uiSharp.style.zIndex = '1';
  uiSharp.innerHTML = '<div class="ft-dashboard">'+buildDashboard()+'</div>';
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
        var progress=layer/16, layerR=r+organ*2*progress;
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
