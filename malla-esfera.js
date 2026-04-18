(function(){
  var container = document.getElementById('hero-animation');
  if(!container) return;

  var canvas = document.createElement('canvas');
  canvas.style.cssText = 'width:100%;height:100%;display:block;position:absolute;inset:0;';
  container.appendChild(canvas);
  var hint = document.createElement('div');
hint.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;z-index:5;pointer-events:none;transition:opacity 0.8s ease;';
hint.innerHTML = '<span style="font-size:12px;color:rgba(255,255,255,0.18);letter-spacing:0.2em;text-transform:uppercase;font-family:inherit;">Mueve el ratón para explorar</span>';
container.appendChild(hint);
  var ctx = canvas.getContext('2d');
  var W, H, cx, cy;
  var mouse = { x:-9999, y:-9999, active:false };
  var lerpMouse = { x:0, y:0 };
  var t = 0;
  var INFLUENCE_RADIUS = 160;

  var noiseFrames=[], noiseIdx=0, lastNoiseT=0;
  var NOISE_FRAMES=8, NOISE_INTERVAL=50;

  function prebakeNoise(w,h){
    noiseFrames=[];
    for(var f=0;f<NOISE_FRAMES;f++){
      var nc=document.createElement('canvas'); nc.width=w; nc.height=h;
      var c=nc.getContext('2d'), id=c.createImageData(w,h), d=id.data;
      for(var i=0;i<d.length;i+=4){ var v=Math.random()*255; d[i]=d[i+1]=d[i+2]=v; d[i+3]=Math.random()<0.5?0:Math.floor(Math.random()*14); }
      c.putImageData(id,0,0); noiseFrames.push(nc);
    }
  }

  function resize(){
    W=canvas.width=container.offsetWidth;
    H=canvas.height=container.offsetHeight;
    cx=W/2; cy=H/2;
    lerpMouse.x=cx; lerpMouse.y=cy;
    mouse.x=cx; mouse.y=cy;
    prebakeNoise(W,H);
  }
  window.addEventListener('resize',function(){ setTimeout(resize,200); });
  resize();

  var hintGone = false;
document.addEventListener('mousemove',function(e){
  var r=container.getBoundingClientRect();
  mouse.x=e.clientX-r.left;
  mouse.y=e.clientY-r.top;
  mouse.active=true;
  if(!hintGone){ hint.style.opacity='0'; hintGone=true; }
});

  function fade(t){ return t*t*t*(t*(t*6-15)+10); }
  function lerpF(a,b,t){ return a+t*(b-a); }
  var perm=[];
  for(var i=0;i<256;i++) perm[i]=i;
  for(var i=255;i>0;i--){
    var j=Math.floor(Math.random()*(i+1));
    var tmp=perm[i]; perm[i]=perm[j]; perm[j]=tmp;
  }
  for(var i=0;i<256;i++) perm[i+256]=perm[i];
  function grad(h,x,y,z){ var hh=h&15,u=hh<8?x:y,v=hh<4?y:hh===12||hh===14?x:z; return ((hh&1)?-u:u)+((hh&2)?-v:v); }
  function noise(x,y,z){
    var X=Math.floor(x)&255,Y=Math.floor(y)&255,Z=Math.floor(z)&255;
    x-=Math.floor(x); y-=Math.floor(y); z-=Math.floor(z);
    var u=fade(x),v=fade(y),w=fade(z);
    var a=perm[X]+Y,aa=perm[a]+Z,ab=perm[a+1]+Z,b=perm[X+1]+Y,ba=perm[b]+Z,bb=perm[b+1]+Z;
    return lerpF(lerpF(lerpF(grad(perm[aa],x,y,z),grad(perm[ba],x-1,y,z),u),lerpF(grad(perm[ab],x,y-1,z),grad(perm[bb],x-1,y-1,z),u),v),lerpF(lerpF(grad(perm[aa+1],x,y,z-1),grad(perm[ba+1],x-1,y,z-1),u),lerpF(grad(perm[ab+1],x,y-1,z-1),grad(perm[bb+1],x-1,y-1,z-1),u),v),w);
  }

  var RINGS=42, SEGMENTS=68;
  var particles=[];
  for(var i=0;i<=RINGS;i++){
    for(var j=0;j<SEGMENTS;j++){
      particles.push({
        phi:(i/RINGS)*Math.PI, theta:(j/SEGMENTS)*Math.PI*2,
        isGreen:(i+j)%2===0, ox:0,oy:0,vx:0,vy:0,
        seed:Math.random()*100
      });
    }
  }

  var CFG = { speed:0.006, radius:160, size:1.0, distort:0.32, green:{r:188,g:244,b:72}, purple:{r:138,g:56,b:245} };
  var DEFAULTS = JSON.parse(JSON.stringify(CFG));

  function getBase(phi,theta,baseR){
    var nx=Math.sin(phi)*Math.cos(theta), ny=Math.cos(phi), nz=Math.sin(phi)*Math.sin(theta);
    var n1=noise(nx*1.2+t*0.18,ny*1.2+t*0.14,nz*1.2+t*0.11);
    var n2=noise(nx*2.4-t*0.09,ny*2.4+t*0.07,nz*2.4);
    var n3=noise(nx*4.0+t*0.05,ny*4.0-t*0.12,nz*4.0);
    var organic=n1*0.55+n2*0.30+n3*0.15;
    var r=baseR*(1+organic*CFG.distort);
    var rotY=t*0.09, cosR=Math.cos(rotY), sinR=Math.sin(rotY);
    var wx=Math.sin(phi)*Math.cos(theta)*cosR-Math.sin(phi)*Math.sin(theta)*sinR;
    var wy=Math.cos(phi);
    var wz=Math.sin(phi)*Math.cos(theta)*sinR+Math.sin(phi)*Math.sin(theta)*cosR;
    return { x:cx+r*wx, y:cy+r*wy, z:r*wz };
  }

  /* ── UI ── */
  var styleEl = document.createElement('style');
  styleEl.textContent = [
    '#mm-customize-btn{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,0.1);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.2);color:white;font-size:12px;letter-spacing:0.08em;padding:8px 16px;border-radius:999px;cursor:pointer;transition:background 0.3s ease;font-family:inherit;}',
    '#mm-customize-btn:hover{background:rgba(255,255,255,0.2);}',
    '#mm-controls-panel{position:fixed;bottom:60px;right:20px;left:auto;z-index:9999;background:rgba(5,5,8,0.9);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.12);border-radius:16px;padding:20px;width:240px;opacity:0;transform:translateY(8px);pointer-events:none;transition:opacity 0.3s ease,transform 0.3s ease;font-family:inherit;}',
    '#mm-controls-panel.visible{opacity:1;transform:translateY(0);pointer-events:all;}',
    '.mm-cl{font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.4);margin-bottom:6px;margin-top:14px;display:block;}',
    '.mm-cl:first-child{margin-top:0;}',
    '.mm-cr{display:flex;align-items:center;gap:10px;}',
    '.mm-cr input[type=range]{flex:1;-webkit-appearance:none;height:3px;background:rgba(255,255,255,0.15);border-radius:999px;outline:none;}',
    '.mm-cr input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:14px;height:14px;border-radius:50%;background:#BCF448;cursor:pointer;}',
    '.mm-cv{font-size:11px;color:rgba(255,255,255,0.5);min-width:28px;text-align:right;}',
    '.mm-colors{display:flex;gap:8px;margin-top:6px;}',
    '.mm-cb{width:28px;height:28px;border-radius:50%;border:2px solid transparent;cursor:pointer;transition:border-color 0.2s;}',
    '.mm-cb.active{border-color:white;}',
    '.mm-div{height:0.5px;background:rgba(255,255,255,0.1);margin:14px 0;}',
    '#mm-reset{width:100%;margin-top:14px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.5);font-size:11px;letter-spacing:0.08em;padding:7px;border-radius:999px;cursor:pointer;transition:background 0.2s;font-family:inherit;}',
    '#mm-reset:hover{background:rgba(255,255,255,0.12);color:white;}'
  ].join('');
  document.head.appendChild(styleEl);

  var panel = document.createElement('div');
  panel.id = 'mm-controls-panel';
  panel.innerHTML = [
    '<span class="mm-cl">Velocidad</span>',
    '<div class="mm-cr"><input type="range" id="mm-speed" min="1" max="20" step="1" value="6"><span class="mm-cv" id="mm-vspeed">6</span></div>',
    '<span class="mm-cl">Radio del ratón</span>',
    '<div class="mm-cr"><input type="range" id="mm-radius" min="40" max="300" step="10" value="160"><span class="mm-cv" id="mm-vradius">160</span></div>',
    '<span class="mm-cl">Tamaño partículas</span>',
    '<div class="mm-cr"><input type="range" id="mm-size" min="2" max="20" step="1" value="6"><span class="mm-cv" id="mm-vsize">6</span></div>',
    '<span class="mm-cl">Distorsión orgánica</span>',
    '<div class="mm-cr"><input type="range" id="mm-distort" min="0" max="20" step="1" value="8"><span class="mm-cv" id="mm-vdistort">8</span></div>',
    '<div class="mm-div"></div>',
    '<span class="mm-cl">Color 1</span>',
    '<div class="mm-colors" id="mm-greens">',
      '<div class="mm-cb active" style="background:#BCF448" data-r="188" data-g="244" data-b="72"></div>',
      '<div class="mm-cb" style="background:#44F4A0" data-r="68" data-g="244" data-b="160"></div>',
      '<div class="mm-cb" style="background:#F4E044" data-r="244" data-g="224" data-b="68"></div>',
      '<div class="mm-cb" style="background:#44D4F4" data-r="68" data-g="212" data-b="244"></div>',
      '<div class="mm-cb" style="background:#F4F4F4" data-r="244" data-g="244" data-b="244"></div>',
    '</div>',
    '<span class="mm-cl">Color 2</span>',
    '<div class="mm-colors" id="mm-purples">',
      '<div class="mm-cb active" style="background:#8A38F5" data-r="138" data-g="56" data-b="245"></div>',
      '<div class="mm-cb" style="background:#F53880" data-r="245" data-g="56" data-b="128"></div>',
      '<div class="mm-cb" style="background:#F57038" data-r="245" data-g="112" data-b="56"></div>',
      '<div class="mm-cb" style="background:#3870F5" data-r="56" data-g="112" data-b="245"></div>',
      '<div class="mm-cb" style="background:#888" data-r="136" data-g="136" data-b="136"></div>',
    '</div>',
    '<button id="mm-reset">Restablecer</button>'
  ].join('');

  var btn = document.createElement('button');
  btn.id = 'mm-customize-btn';
  btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="2.5" stroke="white" stroke-width="1.2"/><path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M2.5 2.5l1 1M10.5 10.5l1 1M11.5 2.5l-1 1M3.5 10.5l-1 1" stroke="white" stroke-width="1.2" stroke-linecap="round"/></svg><span>Personalizar</span>';

  container.appendChild(btn);
document.body.appendChild(panel);

  var panelOpen = false;
  btn.addEventListener('click', function(){
    panelOpen = !panelOpen;
    panel.classList.toggle('visible', panelOpen);
    btn.querySelector('span').textContent = panelOpen ? 'Cerrar' : 'Personalizar';
  });

  function bindSlider(id, valId, key, factor){
    var sl=document.getElementById(id), vl=document.getElementById(valId);
    sl.addEventListener('input',function(){ CFG[key]=parseFloat(this.value)*(factor||1); vl.textContent=this.value; });
  }
  bindSlider('mm-speed',   'mm-vspeed',   'speed',   0.001);
  bindSlider('mm-radius',  'mm-vradius',  'radius',  1);
  bindSlider('mm-size',    'mm-vsize',    'size',    0.2);
  bindSlider('mm-distort', 'mm-vdistort', 'distort', 0.04);

  function bindColors(id, key){
    var btns=document.getElementById(id).querySelectorAll('.mm-cb');
    btns.forEach(function(b){
      b.addEventListener('click',function(){
        btns.forEach(function(x){ x.classList.remove('active'); });
        b.classList.add('active');
        CFG[key]={ r:parseInt(b.dataset.r), g:parseInt(b.dataset.g), b:parseInt(b.dataset.b) };
      });
    });
  }
  bindColors('mm-greens',  'green');
  bindColors('mm-purples', 'purple');

  document.getElementById('mm-reset').addEventListener('click',function(){
    CFG=JSON.parse(JSON.stringify(DEFAULTS));
    document.getElementById('mm-speed').value=6;    document.getElementById('mm-vspeed').textContent='6';
    document.getElementById('mm-radius').value=160; document.getElementById('mm-vradius').textContent='160';
    document.getElementById('mm-size').value=6;     document.getElementById('mm-vsize').textContent='6';
    document.getElementById('mm-distort').value=8;  document.getElementById('mm-vdistort').textContent='8';
    document.querySelectorAll('.mm-cb').forEach(function(b){ b.classList.remove('active'); });
    document.querySelector('#mm-greens .mm-cb').classList.add('active');
    document.querySelector('#mm-purples .mm-cb').classList.add('active');
  });

  /* ── Loop ── */
  function draw(){
    ctx.fillStyle='#050508'; ctx.fillRect(0,0,W,H);
    var now=performance.now();
    if(now-lastNoiseT>NOISE_INTERVAL&&noiseFrames.length){ noiseIdx=(noiseIdx+1)%NOISE_FRAMES; lastNoiseT=now; }
    if(noiseFrames.length) ctx.drawImage(noiseFrames[noiseIdx],0,0);

    lerpMouse.x+=(mouse.x-lerpMouse.x)*0.05;
    lerpMouse.y+=(mouse.y-lerpMouse.y)*0.05;

    var baseR=Math.min(W,H)*0.28;

    for(var k=0;k<particles.length;k++){
      var p=particles[k];
      var base=getBase(p.phi,p.theta,baseR);
      var depth=(base.z+baseR*1.5)/(baseR*3);
      if(depth<0.05) continue;

      var mdx=base.x-lerpMouse.x, mdy=base.y-lerpMouse.y;
      var mdist=Math.sqrt(mdx*mdx+mdy*mdy);

      if(mdist<CFG.radius&&mouse.active){
        var falloff=Math.pow(1-mdist/CFG.radius,2);
        var force=falloff*55;
        var nx2=mdx/(mdist||1), ny2=mdy/(mdist||1);
        if(p.isGreen){
          var tx2=noise(p.seed+t*0.8,p.phi*3.5,p.theta*3.5);
          var ty2=noise(p.seed+100+t*0.8,p.phi*3.5,p.theta*3.5);
          var cl=1-mdist/CFG.radius;
          p.vx+=(-nx2*force*0.12)+(tx2*force*0.28*cl);
          p.vy+=(-ny2*force*0.12)+(ty2*force*0.28*cl);
        } else {
          p.vx+=nx2*force*0.22; p.vy+=ny2*force*0.22;
        }
      }

      p.vx+=-p.ox*0.08; p.vy+=-p.oy*0.08;
      p.vx*=0.80; p.vy*=0.80;
      p.ox+=p.vx; p.oy+=p.vy;

      var oLen=Math.sqrt(p.ox*p.ox+p.oy*p.oy);
      var maxOff=CFG.radius*0.7;
      if(oLen>maxOff){ p.ox=p.ox/oLen*maxOff; p.oy=p.oy/oLen*maxOff; }

      var px=base.x+p.ox, py=base.y+p.oy;
      var inR=mouse.active&&mdist<CFG.radius;
      var f2=inR?Math.pow(1-mdist/CFG.radius,2):0;
      var sz=(0.5+depth*1.2+f2*1.8)*CFG.size;

      ctx.beginPath(); ctx.arc(px,py,sz,0,Math.PI*2);
      var g=CFG.green, pu=CFG.purple;
      if(p.isGreen) ctx.fillStyle='rgba('+g.r+','+g.g+','+g.b+','+(depth*0.65+f2*0.4).toFixed(2)+')';
      else          ctx.fillStyle='rgba('+pu.r+','+pu.g+','+pu.b+','+(depth*0.55+f2*0.35).toFixed(2)+')';
      ctx.fill();
    }

    t+=CFG.speed;
    requestAnimationFrame(draw);
  }
  draw();
})();
