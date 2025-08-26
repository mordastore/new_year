// ====== ГЛОБАЛЬНЫЙ СНЕГ (на всём сайте) ======
(function globalSnow(){
  const canvas = document.getElementById('global-snow');
  const ctx = canvas.getContext('2d');
  let W, H, flakes = [];

  function resize(){
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    flakes = Array.from({length: Math.min(180, Math.floor(W*H/15000))}, ()=>({
      x: Math.random()*W,
      y: Math.random()*H,
      r: 1 + Math.random()*2.2,
      s: .35 + Math.random()*1.1,
      w: Math.random()*1.6
    }));
  }
  function draw(){
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle = 'rgba(255,255,255,.9)';
    for(const f of flakes){
      ctx.beginPath(); ctx.arc(f.x,f.y,f.r,0,Math.PI*2); ctx.fill();
      f.y += f.s; f.x += Math.sin(f.y/28)*f.w;
      if(f.y>H){ f.y=-5; f.x=Math.random()*W; }
    }
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize', resize);
  resize(); draw();
})();

// ====== ПАДАЮЩИЕ ЭМОДЗИ (мордочки) — на обеих частях ======
const EMOJIS = ['🐶','🐱','🐭','🐹','🐰','🐻','🐼'];
function spawnEmoji(){
  const cont = document.querySelector('.emoji-container');
  if (!cont) return;
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
