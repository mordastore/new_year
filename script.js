// Кнопка "открой свой подарок" — надёжно
document.addEventListener('click', (e) => {
  const openBtn = e.target.closest('#openBtn');
  if (openBtn) {
    e.preventDefault();
    const cover = document.getElementById('cover');
    const cert  = document.getElementById('cert');
    if (cover) cover.classList.add('is-hidden');
    if (cert) { cert.style.display=''; cert.classList.add('show'); }
    fireConfetti();
  }
});

// Глобальный снег
(function(){
  const c = document.getElementById('global-snow'), k = c.getContext('2d');
  let W,H,F=[];
  function resize(){ W=c.width=innerWidth; H=c.height=innerHeight;
    F = Array.from({length: Math.min(180, Math.floor(W*H/15000))}, ()=>({
      x:Math.random()*W, y:Math.random()*H, r:1+Math.random()*2.2, s:.35+Math.random()*1.1, w:Math.random()*1.6
    }));
  }
  function draw(){ k.clearRect(0,0,W,H); k.fillStyle='rgba(255,255,255,.9)';
    for(const f of F){ k.beginPath(); k.arc(f.x,f.y,f.r,0,Math.PI*2); k.fill();
      f.y+=f.s; f.x+=Math.sin(f.y/28)*f.w; if(f.y>H){ f.y=-5; f.x=Math.random()*W; } }
    requestAnimationFrame(draw);
  }
  addEventListener('resize', resize); resize(); draw();
})();

// Падающие мордочки
const EMOJIS = ['🐶','🐱','🐭','🐹','🐰','🐻','🐼'];
function spawnEmoji(){
  const cont = document.querySelector('.emoji-container'); if(!cont) return;
  const e = document.createElement('div'); e.className='emoji';
  e.textContent = EMOJIS[Math.floor(Math.random()*EMOJIS.length)];
  e.style.left = `${Math.random()*100}%`;
  e.style.animationDuration = `${3 + Math.random()*3}s`;
  e.style.fontSize = `${18 + Math.random()*16}px`;
  cont.appendChild(e); setTimeout(()=>e.remove(), 6500);
}
setInterval(spawnEmoji, 300);

// Конфетти
function fireConfetti(){
  const c = document.getElementById('confetti-canvas'), k = c.getContext('2d');
  c.width=innerWidth; c.height=innerHeight;
  const colors=['#f6eedc','#e3b56b','#2f5d45','#b44933','#ffffff'];
  let P=[], n=140, cx=c.width/2, cy=c.height/2;
  for(let i=0;i<n;i++){ const a=Math.random()*Math.PI*2, v=3+Math.random()*5;
    P.push({x:cx,y:cy,vx:Math.cos(a)*v,vy:Math.sin(a)*v,r:2+Math.random()*4,c:colors[Math.floor(Math.random()*colors.length)],life:60+Math.random()*20});
  }
  (function upd(){
    k.clearRect(0,0,c.width,c.height);
    P.forEach(p=>{ p.x+=p.vx; p.y+=p.vy; p.life--; k.beginPath(); k.arc(p.x,p.y,p.r,0,Math.PI*2); k.fillStyle=p.c; k.fill(); });
    P=P.filter(p=>p.life>0);
    P.length ? requestAnimationFrame(upd) : k.clearRect(0,0,c.width,c.height);
  })();
}
