(function(){
  var container = document.getElementById('hero-animation');
  if(!container) return;

  var canvas = document.createElement('canvas');
  canvas.style.cssText = 'width:100%;height:100%;display:block;position:absolute;inset:0;';
  container.appendChild(canvas);
  var ctx = canvas.getContext('2d');
  var W, H, cx, cy;
  var mouse = { x:-9999, y:-9999, active:false };
  var lerpMouse = { x:0, y:0 };
  var t = 0;
  var INFLUENCE_RADIUS = 160;

  /* ── Noise de fondo ── */
  var noiseFrames=[], noiseIdx=0, lastNoiseT=0;
  var NOISE_FRAMES=8, NOISE_INTERVAL=50;

  function prebakeNoise(w,h){
    noiseFrames=[];
    for(var f=0;f<NOISE_FRAMES;f++){
      var nc=document.createElement('canvas');
      nc.width=w; nc.height=h;
      var c=nc.getContext('2d');
      var id=c.createImageData(w,h);
      var d=id.data;
      for(var i=0;i<d.length;i+=4){
        var v=Math.random()*255;
        d[i]=d[i+1]=d[i+2]=v;
        d[i+3]=Math.random()<0.5?0:Math.floor(Math.random()*14);
      }
      c.putImageData(id,0,0);
      noiseFrames.push(nc);
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

  document.addEventListener('mousemove',function(e){
    var r=container.getBoundingClientRect();
    mouse.x=e.clientX-r.left;
    mouse.y=e.clientY-r.top;
    mouse.active=true;
  });

  /* ── Perlin noise ── */
  function fade(t){ return t*t*t*(t*(t*6-15)+10); }
  function lerpF(a,b,t){ return a+t*(b-a); }
  var perm=[];
  for(var i=0;i<256;i++) perm[i]=i;
  for(var i=255;i>0;i--){
    var j=Math.floor(Math.random()*(i+1));
    var tmp=perm[i]; perm[i]=perm[j]; perm[j]=tmp;
  }
  for(var i=0;i<256;i++) perm[i+256]=perm[i];
  function grad(h,x,y,z){
    var hh=h&15,u=hh<8?x:y,v=hh<4?y:hh===12||hh===14?x:z;
    return ((hh&1)?-u:u)+((hh&2)?-v:v);
  }
  function noise(x,y,z){
    var X=Math.floor(x)&255,Y=Math.floor(y)&255,Z=Math.floor(z)&255;
    x-=Math.floor(x); y-=Math.floor(y); z-=Math.floor(z);
    var u=fade(x),v=fade(y),w=fade(z);
    var a=perm[X]+Y,aa=perm[a]+Z,ab=perm[a+1]+Z;
    var b=perm[X+1]+Y,ba=perm[b]+Z,bb=perm[b+1]+Z;
    return lerpF(
      lerpF(
        lerpF(grad(perm[aa],x,y,z),   grad(perm[ba],x-1,y,z),  u),
        lerpF(grad(perm[ab],x,y-1,z), grad(perm[bb],x-1,y-1,z),u),v),
      lerpF(
        lerpF(grad(perm[aa+1],x,y,z-1),   grad(perm[ba+1],x-1,y,z-1),  u),
        lerpF(grad(perm[ab+1],x,y-1,z-1), grad(perm[bb+1],x-1,y-1,z-1),u),v),w);
  }

  /* ── Partículas ── */
  var RINGS=42, SEGMENTS=68;
  var particles=[];
  for(var i=0;i<=RINGS;i++){
    for(var j=0;j<SEGMENTS;j++){
      particles.push({
        phi:   (i/RINGS)*Math.PI,
        theta: (j/SEGMENTS)*Math.PI*2,
        isGreen: (i+j)%2===0,
        ox:0, oy:0, vx:0, vy:0,
        seed: Math.random()*100
      });
    }
  }

  function getBase(phi,theta,baseR){
    var nx=Math.sin(phi)*Math.cos(theta);
    var ny=Math.cos(phi);
    var nz=Math.sin(phi)*Math.sin(theta);
    var n1=noise(nx*1.2+t*0.18, ny*1.2+t*0.14, nz*1.2+t*0.11);
    var n2=noise(nx*2.4-t*0.09, ny*2.4+t*0.07, nz*2.4);
    var n3=noise(nx*4.0+t*0.05, ny*4.0-t*0.12, nz*4.0);
    var organic=n1*0.55+n2*0.30+n3*0.15;
    var r=baseR*(1+organic*0.32);
    var rotY=t*0.09;
    var cosR=Math.cos(rotY), sinR=Math.sin(rotY);
    var wx=Math.sin(phi)*Math.cos(theta)*cosR - Math.sin(phi)*Math.sin(theta)*sinR;
    var wy=Math.cos(phi);
    var wz=Math.sin(phi)*Math.cos(theta)*sinR + Math.sin(phi)*Math.sin(theta)*cosR;
    return { x:cx+r*wx, y:cy+r*wy, z:r*wz };
  }

  /* ── Loop principal ── */
  function draw(){
    ctx.fillStyle='#050508';
    ctx.fillRect(0,0,W,H);

    var now=performance.now();
    if(now-lastNoiseT>NOISE_INTERVAL&&noiseFrames.length){
      noiseIdx=(noiseIdx+1)%NOISE_FRAMES;
      lastNoiseT=now;
    }
    if(noiseFrames.length) ctx.drawImage(noiseFrames[noiseIdx],0,0);

    lerpMouse.x+=(mouse.x-lerpMouse.x)*0.05;
    lerpMouse.y+=(mouse.y-lerpMouse.y)*0.05;

    var baseR=Math.min(W,H)*0.28;

    for(var k=0;k<particles.length;k++){
      var p=particles[k];
      var base=getBase(p.phi,p.theta,baseR);
      var depth=(base.z+baseR*1.5)/(baseR*3);
      if(depth<0.05) continue;

      var mdx=base.x-lerpMouse.x;
      var mdy=base.y-lerpMouse.y;
      var mdist=Math.sqrt(mdx*mdx+mdy*mdy);

      if(mdist<INFLUENCE_RADIUS&&mouse.active){
        var falloff=Math.pow(1-mdist/INFLUENCE_RADIUS,2);
        var force=falloff*55;
        var nx2=mdx/(mdist||1), ny2=mdy/(mdist||1);

        if(p.isGreen){
          var tx2=noise(p.seed+t*0.8,   p.phi*3.5, p.theta*3.5);
          var ty2=noise(p.seed+100+t*0.8, p.phi*3.5, p.theta*3.5);
          var closeness=1-mdist/INFLUENCE_RADIUS;
          p.vx += (-nx2*force*0.12) + (tx2*force*0.28*closeness);
          p.vy += (-ny2*force*0.12) + (ty2*force*0.28*closeness);
        } else {
          p.vx += nx2*force*0.22;
          p.vy += ny2*force*0.22;
        }
      }

      p.vx += -p.ox*0.08;
      p.vy += -p.oy*0.08;
      p.vx *= 0.80;
      p.vy *= 0.80;
      p.ox += p.vx;
      p.oy += p.vy;

      var oLen=Math.sqrt(p.ox*p.ox+p.oy*p.oy);
      var maxOff=INFLUENCE_RADIUS*0.7;
      if(oLen>maxOff){ p.ox=p.ox/oLen*maxOff; p.oy=p.oy/oLen*maxOff; }

      var px=base.x+p.ox, py=base.y+p.oy;
      var inR=mouse.active&&mdist<INFLUENCE_RADIUS;
      var falloff2=inR?Math.pow(1-mdist/INFLUENCE_RADIUS,2):0;
      var size=0.5+depth*1.2+falloff2*1.8;

      ctx.beginPath();
      ctx.arc(px,py,size,0,Math.PI*2);
      if(p.isGreen){
        ctx.fillStyle='rgba(188,244,72,'+(depth*0.65+falloff2*0.4).toFixed(2)+')';
      } else {
        ctx.fillStyle='rgba(138,56,245,'+(depth*0.55+falloff2*0.35).toFixed(2)+')';
      }
      ctx.fill();
    }

    t+=0.006;
    requestAnimationFrame(draw);
  }

  draw();
})();
