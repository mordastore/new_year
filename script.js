// ====== открытие сертификата (включаем новогодний скин) ======
document.getElementById('openBtn').addEventListener('click', function () {
  const cert = document.getElementById('cert');
  const cover = document.getElementById('cover');

  cover.style.display = 'none';
  cert.classList.add('show', 'ny');   // показываем и включаем новогодний скин

  fireConfetti();                     // праздничное конфетти
  stopEmojiSnow();                    // останавливаем снежинки на фоне страницы
  startLocalSnow();                   // запускаем локальный снег внутри сертификата
});

// ====== «эмодзи-дождь» → снежинки, пока открыт cover ======
let snowTimer = setInterval(createSnowflake, 300);
function createSnowflake() {
  const container = document.querySelector('.emoji-container');
  if (!container) return;
  const snow = document.createElement('div');
  snow.classList.add('emoji');
  snow.textContent = '❄️';
  snow.style.left = `${Math.random() * 100}%`;
  snow.style.animationDuration = `${3 + Math.random() * 3}s`;
  snow.style.fontSize = `${18 + Math.random() * 18}px`;
  container.appendChild(snow);
  setTimeout(() => snow.remove(), 6000);
}
function stopEmojiSnow(){
  if (snowTimer) { clearInterval(snowTimer); snowTimer = null; }
  const container = document.querySelector('.emoji-container');
  if (container) container.innerHTML = '';
}

// ====== локальный снег на canvas внутри #cert ======
function startLocalSnow(){
  const cert = document.getElementById('cert');
  const cv = document.getElementById('ms-snow');
  if (!cert || !cv) return;

  const ctx = cv.getContext('2d');
  let W,H, flakes=[];
  function resize(){
    const r = cert.getBoundingClientRect();
    W = cv.width = r.width;
    H = cv.height = r.height;
  }
  function make(n){
    flakes = Array.from({length:n}, ()=>({
      x: Math.random()*W,
      y: Math.random()*H,
      r: 1 + Math.random()*2.2,
      s: .3 + Math.random()*1.0,
      w: Math.random()*1.2
    }));
  }
  function draw(){
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle = 'rgba(255,255,255,.9)';
    for (const f of flakes){
      ctx.beginPath(); ctx.arc(f.x,f.y,f.r,0,Math.PI*2); ctx.fill();
      f.y += f.s; f.x += Math.sin(f.y/28)*f.w;
      if (f.y > H){ f.y = -5; f.x = Math.random()*W; }
    }
    requestAnimationFrame(draw);
  }
  const ro = new ResizeObserver(()=>{ resize(); make(Math.min(120, Math.floor((W*H)/15000))); });
  ro.observe(cert);
  resize(); make(90); draw();
}

// ====== конфетти-взрыв в новогодней палитре ======
function fireConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let pieces = [];
  const count = 120;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const colors = ['#f6eedc', '#e3b56b', '#2f5d45', '#b44933', '#ffffff']; // крем, золото, хвоя, терракот, белый

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * 2 * Math.PI;
    const speed = Math.random() * 5 + 3;
    pieces.push({
      x: centerX,
      y: centerY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 60
    });
  }

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });
    pieces = pieces.filter(p => p.life > 0);
    if (pieces.length > 0) requestAnimationFrame(update);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  update();
}
