const RAD = Math.PI / 180;
const DEBUG = true;   // Modo debug: dibuja hitboxes en rojo
const scrn = document.getElementById("canvas");
const sctx = scrn.getContext("2d");
scrn.tabIndex = 1;
scrn.addEventListener("click", (e) => {
  const rect = scrn.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  switch (state.curr) {
    case state.getReady:
      if (UI.isPlayButtonHit(mx, my)) {
        state.curr = state.Play;
        SFX.start.play();
      }
      break;
    case state.Play:
      bird.flap();
      break;
    case state.gameOver:
      state.curr = state.getReady;
      bird.speed = 0;
      bird.y = 100;
      pipe.pipes = [];
      UI.score.curr = 0;
      SFX.played = false;
      break;
  }
});

scrn.onkeydown = function keyDown(e) {
  if (e.keyCode == 32 || e.keyCode == 87 || e.keyCode == 38) {
    // Space Key or W key or arrow up
    switch (state.curr) {
      case state.getReady:
        state.curr = state.Play;
        SFX.start.play();
        break;
      case state.Play:
        bird.flap();
        break;
      case state.gameOver:
        state.curr = state.getReady;
        bird.speed = 0;
        bird.y = 100;
        pipe.pipes = [];
        UI.score.curr = 0;
        SFX.played = false;
        break;
    }
  }
};

let frames = 0;
let dx = 2;
const state = {
  curr: 0,
  getReady: 0,
  Play: 1,
  gameOver: 2,
};
const SFX = {
  start: new Audio(),
  flap: new Audio(),
  score: new Audio(),
  hit: new Audio(),
  die: new Audio(),
  played: false,
};
const gnd = {
  sprite: new Image(),
  x: 0,
  y: 0,
  draw: function () {
    this.y = parseFloat(scrn.height - this.sprite.height);
    sctx.drawImage(this.sprite, this.x, this.y);
  },
  update: function () {
    if (state.curr != state.Play) return;
    this.x -= dx;
    this.x = this.x % (this.sprite.width / 2);
  },
};
const bg = {
  sprite: new Image(),
  x: 0,
  y: 0,
  draw: function () {
    y = parseFloat(scrn.height - this.sprite.height);
    sctx.drawImage(this.sprite, this.x, y);
  },
};

const stars = {
  items: [],
  nebulas: [],
  init: function () {
    this.items = [];
    for (let i = 0; i < 80; i++) {
      this.items.push({
        x: Math.random() * scrn.width,
        y: Math.random() * scrn.height,
        size: Math.random() * 2 + 0.5,
        speed: (Math.random() * 0.5 + 0.1) * (Math.random() > 0.7 ? 1.5 : 0.5),
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.05 + 0.01,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }
    // Nebulosas decorativas de fondo (fijas, muy sutiles)
    this.nebulas = [
      { x: 60, y: 100, r: 90, color: "rgba(80, 40, 120, 0.12)" },
      { x: 220, y: 300, r: 70, color: "rgba(30, 60, 100, 0.10)" },
      { x: 150, y: 50, r: 60, color: "rgba(60, 30, 80, 0.08)" },
    ];
  },
  draw: function () {
    // Dibujar nebulosas primero (capa más lejana)
    for (let i = 0; i < this.nebulas.length; i++) {
      let n = this.nebulas[i];
      let g = sctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
      g.addColorStop(0, n.color);
      g.addColorStop(1, "rgba(0,0,0,0)");
      sctx.fillStyle = g;
      sctx.beginPath();
      sctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      sctx.fill();
    }
    // Dibujar estrellas
    for (let i = 0; i < this.items.length; i++) {
      let s = this.items[i];
      let twinkle = Math.sin(frames * s.twinkleSpeed + s.twinkleOffset);
      let alpha = s.opacity * (0.6 + 0.4 * twinkle);
      sctx.fillStyle = `rgba(200, 230, 255, ${alpha})`;
      sctx.beginPath();
      sctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      sctx.fill();
    }
  },
  update: function () {
    if (state.curr != state.Play) return;
    for (let i = 0; i < this.items.length; i++) {
      let s = this.items[i];
      s.x -= s.speed;
      if (s.x < 0) {
        s.x = scrn.width;
        s.y = Math.random() * scrn.height;
      }
    }
  },
};

const particles = {
  items: [],
  MAX: 60,
  emit: function (x, y, count, color, speedBase, lifeBase) {
    for (let i = 0; i < count; i++) {
      if (this.items.length >= this.MAX) break;
      let angle = Math.random() * Math.PI * 2;
      let speed = speedBase * (0.5 + Math.random() * 0.5);
      this.items.push({
        x: x + (Math.random() - 0.5) * 4,
        y: y + (Math.random() - 0.5) * 4,
        vx: Math.cos(angle) * speed - 1.5, // sesgo hacia atrás
        vy: Math.sin(angle) * speed,
        life: lifeBase + Math.random() * 10,
        maxLife: lifeBase + 10,
        color: color,
        size: 1.5 + Math.random() * 1.5,
      });
    }
  },
  update: function () {
    for (let i = this.items.length - 1; i >= 0; i--) {
      let p = this.items[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      if (p.life <= 0) {
        this.items.splice(i, 1);
      }
    }
  },
  draw: function () {
    for (let i = 0; i < this.items.length; i++) {
      let p = this.items[i];
      let alpha = p.life / p.maxLife;
      sctx.globalAlpha = alpha;
      sctx.fillStyle = p.color;
      sctx.beginPath();
      sctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
      sctx.fill();
    }
    sctx.globalAlpha = 1.0;
  },
};

const pipe = {
  // Dimensiones visuales (asteroide dibujado con Canvas)
  top: { sprite: new Image(), width: 52, height: 400 },
  bot: { sprite: new Image(), width: 52, height: 400 },
  // Hitbox ajustada: más justa que el sprite completo
  hitboxWidth: 38,
  hitboxOffset: 7,   // margen izquierdo dentro del ancho visual
  gap: 110,          // aumentado desde 85 para dar más margen
  moved: true,
  pipes: [],
  asteroidColors: ["#5a4a3a", "#4a5560", "#6a5a4a"],

  drawAsteroid: function (x, y, w, h, seed, color, isTop) {
    sctx.save();
    sctx.fillStyle = color;

    // Cuerpo compuesto por círculos superpuestos (forma rocosa irregular)
    let circles = isTop
      ? [
          { dx: w * 0.5, dy: h * 0.92, r: w * 0.50 },
          { dx: w * 0.3, dy: h * 0.88, r: w * 0.38 },
          { dx: w * 0.7, dy: h * 0.90, r: w * 0.35 },
          { dx: w * 0.5, dy: h * 0.82, r: w * 0.28 },
          { dx: w * 0.2, dy: h * 0.95, r: w * 0.25 },
          { dx: w * 0.8, dy: h * 0.93, r: w * 0.22 },
        ]
      : [
          { dx: w * 0.5, dy: h * 0.08, r: w * 0.50 },
          { dx: w * 0.3, dy: h * 0.12, r: w * 0.38 },
          { dx: w * 0.7, dy: h * 0.10, r: w * 0.35 },
          { dx: w * 0.5, dy: h * 0.18, r: w * 0.28 },
          { dx: w * 0.2, dy: h * 0.05, r: w * 0.25 },
          { dx: w * 0.8, dy: h * 0.07, r: w * 0.22 },
        ];

    for (let c of circles) {
      sctx.beginPath();
      sctx.arc(x + c.dx, y + c.dy, c.r, 0, Math.PI * 2);
      sctx.fill();
    }

    // Cráteres oscuros
    sctx.fillStyle = "rgba(20, 15, 10, 0.35)";
    let craters = isTop
      ? [
          { dx: 0.35, dy: 0.90, r: 0.12 },
          { dx: 0.65, dy: 0.87, r: 0.09 },
          { dx: 0.50, dy: 0.94, r: 0.10 },
        ]
      : [
          { dx: 0.35, dy: 0.10, r: 0.12 },
          { dx: 0.65, dy: 0.13, r: 0.09 },
          { dx: 0.50, dy: 0.06, r: 0.10 },
        ];
    for (let c of craters) {
      sctx.beginPath();
      sctx.arc(x + w * c.dx, y + h * c.dy, w * c.r, 0, Math.PI * 2);
      sctx.fill();
    }

    // Línea de energía sci-fi sutil
    sctx.strokeStyle = "rgba(0, 212, 255, 0.25)";
    sctx.lineWidth = 1;
    sctx.beginPath();
    if (isTop) {
      sctx.moveTo(x + w * 0.15, y + h * 0.80);
      sctx.lineTo(x + w * 0.45, y + h * 0.75);
      sctx.lineTo(x + w * 0.75, y + h * 0.82);
    } else {
      sctx.moveTo(x + w * 0.15, y + h * 0.20);
      sctx.lineTo(x + w * 0.45, y + h * 0.25);
      sctx.lineTo(x + w * 0.75, y + h * 0.18);
    }
    sctx.stroke();

    // Borde luminoso sutil
    sctx.strokeStyle = "rgba(200, 180, 160, 0.15)";
    sctx.lineWidth = 2;
    sctx.beginPath();
    sctx.arc(
      x + w * 0.5,
      y + (isTop ? h * 0.90 : h * 0.10),
      w * 0.40,
      0,
      Math.PI * 2
    );
    sctx.stroke();

    sctx.restore();
  },

  drawDebugHitbox: function (p) {
    if (!DEBUG) return;
    sctx.save();
    sctx.strokeStyle = "rgba(255, 0, 0, 0.6)";
    sctx.lineWidth = 1;
    sctx.setLineDash([4, 4]);

    let hx = p.x + this.hitboxOffset;
    let hw = this.hitboxWidth;

    // Hitbox obstáculo superior
    let roof = p.y + this.top.height;
    sctx.strokeRect(hx, p.y, hw, this.top.height);

    // Hitbox obstáculo inferior
    let floorStart = roof + this.gap;
    sctx.strokeRect(hx, floorStart, hw, this.bot.height);

    // Líneas del gap
    sctx.strokeStyle = "rgba(0, 255, 0, 0.4)";
    sctx.setLineDash([]);
    sctx.beginPath();
    sctx.moveTo(hx, roof);
    sctx.lineTo(hx + hw, roof);
    sctx.moveTo(hx, floorStart);
    sctx.lineTo(hx + hw, floorStart);
    sctx.stroke();

    sctx.restore();
  },

  draw: function () {
    for (let i = 0; i < this.pipes.length; i++) {
      let p = this.pipes[i];
      let color =
        this.asteroidColors[p.colorIdx % this.asteroidColors.length];
      this.drawAsteroid(
        p.x,
        p.y,
        this.top.width,
        this.top.height,
        p.seed,
        color,
        true
      );
      this.drawAsteroid(
        p.x,
        p.y + this.top.height + this.gap,
        this.bot.width,
        this.bot.height,
        p.seed,
        color,
        false
      );
      this.drawDebugHitbox(p);
    }
  },

  update: function () {
    if (state.curr != state.Play) return;
    if (frames % 100 == 0) {
      this.pipes.push({
        x: parseFloat(scrn.width),
        y: -210 * Math.min(Math.random() + 1, 1.8),
        seed: Math.random(),
        colorIdx: Math.floor(Math.random() * this.asteroidColors.length),
      });
    }
    this.pipes.forEach((pipe) => {
      pipe.x -= dx;
    });

    if (this.pipes.length && this.pipes[0].x < -this.top.width) {
      this.pipes.shift();
      this.moved = true;
    }
  },
};
const bird = {
  animations: [
    { sprite: new Image() },
    { sprite: new Image() },
    { sprite: new Image() },
    { sprite: new Image() },
  ],
  rotatation: 0,
  x: 50,
  y: 100,
  speed: 0,
  gravity: 0.18,
  thrust: 4.2,
  frame: 0,
  draw: function () {
    sctx.save();
    sctx.translate(this.x, this.y);
    sctx.rotate(this.rotatation * RAD);

    // ── Fuego del motor (varía con frame de animación) ──
    let flameLen = 6 + (this.frame % 3) * 3;
    sctx.fillStyle = this.frame % 2 === 0 ? "#ff6600" : "#ffaa00";
    sctx.beginPath();
    sctx.moveTo(-10, -3);
    sctx.lineTo(-10 - flameLen, 0);
    sctx.lineTo(-10, 3);
    sctx.fill();

    // ── Cuerpo de la nave ──
    sctx.fillStyle = "#00d4ff";
    sctx.shadowColor = "#00d4ff";
    sctx.shadowBlur = 10;
    sctx.beginPath();
    sctx.moveTo(12, 0);   // punta derecha
    sctx.lineTo(-8, -7);  // ala superior
    sctx.lineTo(-5, 0);   // centro cola
    sctx.lineTo(-8, 7);   // ala inferior
    sctx.closePath();
    sctx.fill();

    // ── Cabina / cockpit ──
    sctx.fillStyle = "#ffffff";
    sctx.shadowBlur = 4;
    sctx.shadowColor = "#ffffff";
    sctx.beginPath();
    sctx.arc(2, -2, 3, 0, Math.PI * 2);
    sctx.fill();

    // ── Borde decorativo ──
    sctx.strokeStyle = "#88eeff";
    sctx.lineWidth = 1;
    sctx.shadowBlur = 0;
    sctx.stroke();

    // ── Debug: radio de colisión de la nave ──
    if (DEBUG) {
      let birdSprite = this.animations[0].sprite;
      let r = birdSprite.height / 4 + birdSprite.width / 4;
      sctx.strokeStyle = "rgba(0, 255, 0, 0.5)";
      sctx.lineWidth = 1;
      sctx.setLineDash([3, 3]);
      sctx.beginPath();
      sctx.arc(0, 0, r, 0, Math.PI * 2);
      sctx.stroke();
      sctx.setLineDash([]);
    }

    sctx.restore();
  },
  update: function () {
    let r = parseFloat(this.animations[0].sprite.width) / 2;
    switch (state.curr) {
      case state.getReady:
        this.rotatation = 0;
        this.y += frames % 10 == 0 ? Math.sin(frames * RAD) : 0;
        this.frame += frames % 10 == 0 ? 1 : 0;
        break;
      case state.Play:
        this.frame += frames % 5 == 0 ? 1 : 0;
        // Partículas continuas del motor (fuego de nave)
        if (frames % 3 === 0) {
          particles.emit(
            this.x - 10,
            this.y + (Math.random() - 0.5) * 4,
            1,
            Math.random() > 0.5 ? "#ff6600" : "#ffaa00",
            1.2,
            22
          );
        }
        this.y += this.speed;
        this.setRotation();
        this.speed += this.gravity;
        if (this.y + r >= gnd.y || this.collisioned()) {
          state.curr = state.gameOver;
        }

        break;
      case state.gameOver:
        this.frame = 1;
        if (this.y + r < gnd.y) {
          this.y += this.speed;
          this.setRotation();
          this.speed += this.gravity * 2;
        } else {
          this.speed = 0;
          this.y = gnd.y - r;
          this.rotatation = 90;
          if (!SFX.played) {
            SFX.die.play();
            SFX.played = true;
          }
        }

        break;
    }
    this.frame = this.frame % this.animations.length;
  },
  flap: function () {
    if (this.y > 0) {
      SFX.flap.play();
      this.speed = -this.thrust;
      // Burst de partículas al saltar (estela de propulsión)
      particles.emit(
        this.x - 8,
        this.y,
        8,
        "#00d4ff",
        2.5,
        18
      );
    }
  },
  setRotation: function () {
    if (this.speed <= 0) {
      this.rotatation = Math.max(-25, (-25 * this.speed) / (-1 * this.thrust));
    } else if (this.speed > 0) {
      this.rotatation = Math.min(90, (90 * this.speed) / (this.thrust * 2));
    }
  },
  collisioned: function () {
    if (!pipe.pipes.length) return;
    let bird = this.animations[0].sprite;
    let x = pipe.pipes[0].x;
    let y = pipe.pipes[0].y;
    let r = bird.height / 4 + bird.width / 4;
    // Hitboxes ajustadas: más justas que el sprite completo
    let roof = y + pipe.top.height;
    let floor = roof + pipe.gap;
    let hx = x + pipe.hitboxOffset;   // borde izquierdo de la hitbox real
    let hw = pipe.hitboxWidth;         // ancho reducido de la hitbox
    if (this.x + r >= hx) {
      if (this.x + r < hx + hw) {
        if (this.y - r <= roof || this.y + r >= floor) {
          SFX.hit.play();
          return true;
        }
      } else if (pipe.moved) {
        UI.score.curr++;
        SFX.score.play();
        pipe.moved = false;
      }
    }
  },
};
const UI = {
  getReady: { sprite: new Image() },
  gameOver: { sprite: new Image() },
  tap: [{ sprite: new Image() }, { sprite: new Image() }],
  score: {
    curr: 0,
    best: 0,
  },
  x: 0,
  y: 0,
  tx: 0,
  ty: 0,
  frame: 0,
  playBtn: {
    w: 100,
    h: 36,
    getX: function () {
      return (scrn.width - this.w) / 2;
    },
    getY: function () {
      return 240;
    },
  },
  isPlayButtonHit: function (mx, my) {
    let bx = this.playBtn.getX();
    let by = this.playBtn.getY();
    return (
      mx >= bx &&
      mx <= bx + this.playBtn.w &&
      my >= by &&
      my <= by + this.playBtn.h
    );
  },
  draw: function () {
    switch (state.curr) {
      case state.getReady:
        // ── Pantalla de inicio retro espacial ──
        sctx.save();
        sctx.textAlign = "center";

        // Título principal con glow neón
        sctx.font = "bold 32px Squada One";
        sctx.fillStyle = "#ffffff";
        sctx.shadowColor = "#00d4ff";
        sctx.shadowBlur = 15;
        sctx.fillText("FLAPPY RETRO", scrn.width / 2, 140);
        sctx.restore();

        // Subtítulo
        sctx.save();
        sctx.textAlign = "center";
        sctx.font = "16px Squada One";
        sctx.fillStyle = "#00d4ff";
        sctx.fillText("ImploseLabs Edition", scrn.width / 2, 170);
        sctx.restore();

        // Línea decorativa
        sctx.save();
        sctx.strokeStyle = "rgba(0, 212, 255, 0.4)";
        sctx.lineWidth = 1;
        sctx.beginPath();
        sctx.moveTo(scrn.width / 2 - 80, 185);
        sctx.lineTo(scrn.width / 2 + 80, 185);
        sctx.stroke();
        sctx.restore();

        // Botón PLAY
        let bx = this.playBtn.getX();
        let by = this.playBtn.getY();
        let pulse = Math.sin(frames * 0.08) * 0.15 + 0.85;

        // Fondo del botón
        sctx.fillStyle = `rgba(0, 212, 255, ${0.12 * pulse})`;
        sctx.fillRect(bx, by, this.playBtn.w, this.playBtn.h);

        // Borde neón pulsante
        sctx.save();
        sctx.strokeStyle = `rgba(0, 212, 255, ${pulse})`;
        sctx.lineWidth = 2;
        sctx.strokeRect(bx, by, this.playBtn.w, this.playBtn.h);
        sctx.restore();

        // Texto PLAY
        sctx.save();
        sctx.textAlign = "center";
        sctx.font = "22px Squada One";
        sctx.fillStyle = "#ffffff";
        sctx.shadowColor = "#00d4ff";
        sctx.shadowBlur = 8;
        sctx.fillText("PLAY", scrn.width / 2, by + 25);
        sctx.restore();

        // Instrucciones
        sctx.save();
        sctx.textAlign = "center";
        sctx.font = "11px monospace";
        sctx.fillStyle = "#88aabb";
        sctx.fillText("CLICK PLAY  or  press SPACE", scrn.width / 2, 320);
        sctx.restore();

        // Crédito abajo
        sctx.save();
        sctx.textAlign = "center";
        sctx.font = "10px monospace";
        sctx.fillStyle = "#556677";
        sctx.fillText("ARROWS / SPACE / W to fly", scrn.width / 2, 370);
        sctx.restore();
        break;
      case state.gameOver:
        // ── Pantalla de Misión Fallida ──
        // Overlay oscuro
        sctx.fillStyle = "rgba(10, 10, 26, 0.75)";
        sctx.fillRect(0, 0, scrn.width, scrn.height);

        // Cruz de mira roja (decorative)
        sctx.save();
        sctx.strokeStyle = "rgba(255, 51, 68, 0.15)";
        sctx.lineWidth = 1;
        sctx.beginPath();
        sctx.moveTo(scrn.width / 2 - 40, scrn.height / 2 - 80);
        sctx.lineTo(scrn.width / 2 + 40, scrn.height / 2 - 80);
        sctx.moveTo(scrn.width / 2, scrn.height / 2 - 100);
        sctx.lineTo(scrn.width / 2, scrn.height / 2 - 60);
        sctx.stroke();
        sctx.restore();

        // "MISSION FAILED"
        sctx.save();
        sctx.textAlign = "center";
        sctx.font = "bold 26px Squada One";
        sctx.fillStyle = "#ff3344";
        sctx.shadowColor = "#ff3344";
        sctx.shadowBlur = 15;
        sctx.fillText("MISSION FAILED", scrn.width / 2, scrn.height / 2 - 55);
        sctx.restore();

        // Subtítulo
        sctx.save();
        sctx.textAlign = "center";
        sctx.font = "13px monospace";
        sctx.fillStyle = "#aa5566";
        sctx.fillText("SIGNAL LOST", scrn.width / 2, scrn.height / 2 - 32);
        sctx.restore();

        // Línea decorativa roja
        sctx.save();
        sctx.strokeStyle = "rgba(255, 51, 68, 0.4)";
        sctx.lineWidth = 1;
        sctx.beginPath();
        sctx.moveTo(scrn.width / 2 - 70, scrn.height / 2 - 22);
        sctx.lineTo(scrn.width / 2 + 70, scrn.height / 2 - 22);
        sctx.stroke();
        sctx.restore();

        // Prompt para reiniciar
        sctx.save();
        sctx.textAlign = "center";
        sctx.font = "11px monospace";
        sctx.fillStyle = "#556677";
        sctx.fillText("CLICK or SPACE to retry", scrn.width / 2, scrn.height / 2 + 85);
        sctx.restore();
        break;
    }
    this.drawScore();
  },
  drawScore: function () {
    sctx.fillStyle = "#FFFFFF";
    sctx.strokeStyle = "#000000";
    switch (state.curr) {
      case state.Play:
        sctx.lineWidth = "2";
        sctx.font = "35px Squada One";
        sctx.fillText(this.score.curr, scrn.width / 2 - 5, 50);
        sctx.strokeText(this.score.curr, scrn.width / 2 - 5, 50);
        break;
      case state.gameOver:
        sctx.lineWidth = "2";
        sctx.font = "40px Squada One";
        let sc = `SCORE :     ${this.score.curr}`;
        try {
          this.score.best = Math.max(
            this.score.curr,
            localStorage.getItem("best")
          );
          localStorage.setItem("best", this.score.best);
          let bs = `BEST  :     ${this.score.best}`;
          sctx.fillText(sc, scrn.width / 2 - 80, scrn.height / 2 + 0);
          sctx.strokeText(sc, scrn.width / 2 - 80, scrn.height / 2 + 0);
          sctx.fillText(bs, scrn.width / 2 - 80, scrn.height / 2 + 30);
          sctx.strokeText(bs, scrn.width / 2 - 80, scrn.height / 2 + 30);
        } catch (e) {
          sctx.fillText(sc, scrn.width / 2 - 85, scrn.height / 2 + 15);
          sctx.strokeText(sc, scrn.width / 2 - 85, scrn.height / 2 + 15);
        }

        break;
    }
  },
  update: function () {
    if (state.curr == state.Play) return;
    this.frame += frames % 10 == 0 ? 1 : 0;
    this.frame = this.frame % this.tap.length;
  },
};

gnd.sprite.src = "img/ground.png";
bg.sprite.src = "img/BG.png";
pipe.top.sprite.src = "img/toppipe.png";
pipe.bot.sprite.src = "img/botpipe.png";
UI.gameOver.sprite.src = "img/go.png";
UI.getReady.sprite.src = "img/getready.png";
UI.tap[0].sprite.src = "img/tap/t0.png";
UI.tap[1].sprite.src = "img/tap/t1.png";
bird.animations[0].sprite.src = "img/bird/b0.png";
bird.animations[1].sprite.src = "img/bird/b1.png";
bird.animations[2].sprite.src = "img/bird/b2.png";
bird.animations[3].sprite.src = "img/bird/b0.png";
SFX.start.src = "sfx/start.wav";
SFX.flap.src = "sfx/flap.wav";
SFX.score.src = "sfx/score.wav";
SFX.hit.src = "sfx/hit.wav";
SFX.die.src = "sfx/die.wav";

function gameLoop() {
  update();
  draw();
  frames++;
}

function update() {
  bird.update();
  gnd.update();
  pipe.update();
  UI.update();
  stars.update();
  particles.update();
}

function draw() {
  sctx.fillStyle = "#0a0a1a";
  sctx.fillRect(0, 0, scrn.width, scrn.height);
  stars.draw();
  pipe.draw();

  particles.draw();   // estela detrás de la nave, antes de la nave
  bird.draw();
  gnd.draw();
  UI.draw();
}

stars.init();
setInterval(gameLoop, 20);
