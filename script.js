// --- Делегирование клика по кнопке "открой свой подарок"
document.addEventListener('click', (e) => {
  const openBtn = e.target.closest('#openBtn');
  if (openBtn) {
    e.preventDefault();
    document.getElementById('cover')?.classList.add('is-hidden');
    document.getElementById('cert')?.classList.add('show');
    fireConfetti();
  }
});

// --- Глобальный снег
(function(){
  const c = document.getElementById('global-snow');
  const k = c.getContext('2d');
  let W, H, flakes = [];

  function resize(){
    W = c.width = window.innerWidth;
    H = c.height = window.innerHeight;
    flakes = Array.from({length: Math.min(180, Math.floor(W*H/15000))}, () => ({
      x: Math.random()*W,
      y: Math.random()*H,
      r: 1 + Math.random()*2.2,
      s: 0.35 + Math.random()*1.1,
      w: Math.random()*1.6
    }));
  }

  function draw(){
    k.clearRect(0,0,W,H);
    k.fillStyle = 'rgba(255,255,255,.9)';
    for (const f of flakes){
      k.beginPath(); k.arc(f.x,f.y,f.r,0,Math.PI*2); k.fill();
      f.y += f.s; f.x += Math.sin(f.y/28)*f.w;
      if (f.y > H){ f.y = -5; f.x = Math.random()*W; }
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize(); draw();
})();

// --- Падающие мордочки на всём сайте
const EMOJIS = ['🐶','🐱','🐭','🐹','🐰','🐻','🐼'];
function spawnEmoji(){
  const cont = document.querySelector('.emoji-container');
  if (!cont) return;
  const e = document.createElement('div');
  e.className = 'emoji';
  e.textContent = EMOJIS[Math.floor(Math.random()*EMOJIS.length)];
  e.style.left = `${Math.random()*100}%`;
  e.style.animationDuration = `${3 + Math.random()*3}s`;
  e.style.fontSize = `${18 + Math.random()*16}px`;
  cont.appendChild(e);
  setTimeout(() => e.remove(), 6500);
}
setInterval(spawnEmoji, 300);

// --- Конфетти в новогодней палитре (при клике по кнопке)
function fireConfetti() {
  const c = document.getElementById('confetti-canvas');
  const k = c.getContext('2d');
  c.width = window.innerWidth;
  c.height = window.innerHeight;

  const colors = ['#f6eedc', '#e3b56b', '#2f5d45', '#b44933', '#ffffff'];
  let parts = [];
  const count = 140, cx = c.width/2, cy = c.height/2;

  for (let i=0;i<count;i++){
    const a = Math.random()*Math.PI*2, v = 3 + Math.random()*5;
    parts.push({
      x: cx, y: cy, vx: Math.cos(a)*v, vy: Math.sin(a)*v,
      r: 2 + Math.random()*4, col: colors[Math| (Math.random()*colors.length)],
      life: 60 + Math.random()*20
    });
  }

  (function tick(){
    k.clearRect(0,0,c.width,c.height);
    parts.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy; p.life--;
      k.beginPath(); k.arc(p.x,p.y,p.r,0,Math.PI*2);
      k.fillStyle=p.col; k.fill();
    });
    parts = parts.filter(p=>p.life>0);
    parts.length ? requestAnimationFrame(tick) : k.clearRect(0,0,c.width,c.height);
  })();
}

