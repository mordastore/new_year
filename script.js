// Открытие сертификата
document.getElementById('openBtn').addEventListener('click', () => {
  document.getElementById('cover').style.display = 'none';
  document.getElementById('cert').classList.add('show');
  fireConfetti();
});

// Эмодзи и снежинки
function createEmojiRain() {
  const container = document.querySelector('.emoji-container');
  const emojis = ['❄️', '🎄', '🐶', '🎁'];
  const emoji = document.createElement('div');
  emoji.classList.add('emoji');
  emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  emoji.style.left = `${Math.random() * 100}%`;
  emoji.style.animationDuration = `${3 + Math.random() * 3}s`;
  emoji.style.fontSize = `${20 + Math.random() * 20}px`;
  emoji.style.top = '-5vh';
  container.appendChild(emoji);
  setTimeout(() => emoji.remove(), 6000);
}
setInterval(createEmojiRain, 300);

// Конфетти
function fireConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let pieces = [];
  const count = 80;
  const colors = ['#f6eedc', '#e3b56b', '#2f5d45', '#ffffff', '#b44933'];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * 2 * Math.PI;
    const speed = Math.random() * 5 + 2;
    pieces.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: Math.random() * 3 + 2,
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
  }
  update();
}
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
