// ГЛОБАЛЬНЫЙ СНЕГ
(function(){
  const c = document.getElementById('global-snow'), x = c.getContext('2d');
  let W,H,F=[];
  function resize(){ W=c.width=innerWidth; H=c.height=innerHeight;
    F = Array.from({length: Math.min(180, Math.floor(W*H/15000))}, ()=>({
      x:Math.random()*W, y:Math.random()*H, r:1+Math.random()*2.2, s:.35+Math.random()*1.1, w:Math.random()*1.6
    }));
  }
  function draw(){ x.clearRect(0,0,W,H); x.fillStyle='rgba(255,255,255,.9)';
    for(const f of F){ x.beginPath(); x.arc(f.x,f.y,f.r,0,Math.PI*2); x.fill();
      f.y+=f.s; f.x+=Math.sin(f.y/28)*f.w; if(f.y>H){ f.y=-5; f.x=Math.random()*W; } }
    requestAnimationFrame(draw);
  }
  addEventListener('resize', resize); resize(); draw();
})();

// ПАДАЮЩИЕ МОРДОЧКИ
const EMOJIS = ['🐶','🐱','🦴','❄️','🎁'];
function spawnEmoji(){
  const cont = document.querySelector('.emoji-container'); if(!cont) return;
  const e = document.createElement('div'); e.className='emoji';
  e.textContent = EMOJIS[Math.floor(Math.random()*EMOJIS.length)];
  e.style.left = `${Math.random()*100}%`;
  e.style.animationDuration = `${3 + Math.random()*3}s`;
  e.style.fontSize = `${18 + Math.random()*16}px`;
  cont.appendChild(e); setTimeout(()=>e.remove(), 6500);
}
let emojiTimer = setInterval(spawnEmoji, 300);

// КОНФЕТТИ (новогодняя палитра)
function fireConfetti(){
  const c = document.getElementById('confetti-canvas'), k = c.getContext('2d');
  c.width=innerWidth; c.height=innerHeight;
  let P=[], n=120, cx=c.width/2, cy=c.height/2, colors=['#f6eedc','#e3b56b','#2f5d45','#b44933','#ffffff'];
  for(let i=0;i<n;i++){ const a=Math.random()*Math.PI*2, v=3+Math.random()*5;
    P.push({x:cx,y:cy,vx:Math.cos(a)*v,vy:Math.sin(a)*v,r:2+Math.random()*4,c:colors[Math.floor(Math.random()*colors.length)],life:60+Math.random()*20}); }
  (function upd(){
    k.clearRect(0,0,c.width,c.height);
    P.forEach(p=>{ p.x+=p.vx; p.y+=p.vy; p.life--; k.beginPath(); k.arc(p.x,p.y,p.r,0,Math.PI*2); k.fillStyle=p.c; k.fill(); });
    P=P.filter(p=>p.life>0); P.length?requestAnimationFrame(upd):k.clearRect(0,0,c.width,c.height);
  })();
}

// ОТКРЫТИЕ СЕРТИФИКАТА
document.getElementById('openBtn').addEventListener('click', () => {
  document.getElementById('cover').style.display='none';
  document.getElementById('cert').classList.add('show');
  fireConfetti();
});
  const e = document.createElement('div');
  e.className = 'emoji';
  e.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
  e.style.left = `${Math.random()*100}%`;
  e.style.animationDuration = `${3 + Math.random()*3}s`;
  e.style.fontSize = `${18 + Math.random()*16}px`;
  cont.appendChild(e);
  setTimeout(()=> e.remove(), 6500);
}
let emojiTimer = setInterval(spawnEmoji, 300);

// ====== Конфетти (новогодняя палитра) ======
function fireConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let pieces = [];
  const count = 120;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const colors = ['#f6eedc', '#e3b56b', '#2f5d45', '#b44933', '#ffffff'];

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * 2 * Math.PI;
    const speed = Math.random() * 5 + 3;
    pieces.push({
      x: centerX, y: centerY,
      vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
      r: Math.random() * 4 + 2,
      c: colors[Math.floor(Math.random() * colors.length)],
      life: 60 + Math.random()*20
    });
  }

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.life--;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = p.c; ctx.fill();
    });
    pieces = pieces.filter(p => p.life > 0);
    if (pieces.length) requestAnimationFrame(update);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  update();
}

// ====== ПОВЕДЕНИЕ КНОПКИ (открываем сертификат) ======
document.getElementById('openBtn').addEventListener('click', function () {
  const cert = document.getElementById('cert');
  const cover = document.getElementById('cover');
  cover.style.display = 'none';
  cert.classList.add('show');
  fireConfetti();
});
