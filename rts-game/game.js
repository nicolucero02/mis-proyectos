const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// ---------- Game Constants ----------
const TILE = 32;
const COLS = 60;
const ROWS = 40;
const SPEED = { worker: 1.8, soldier: 1.4 };
const HP = { worker: 30, soldier: 60, building: 200, tower: 150 };
const DMG = { soldier: 8, tower: 5 };
const ATTACK_RANGE = { soldier: 26, tower: 140 };
const ATTACK_COOLDOWN = { soldier: 800, tower: 900 };
const SIGHT = 220;
const START_FOOD = 50;
const START_GOLD = 300;

// ---------- State ----------
let gold = [START_GOLD, START_GOLD];
let food = [START_FOOD, START_FOOD];
let maxFood = [20, 20];
let units = [];
let buildings = [];
let particles = [];
let selected = [];
let placing = null;
let dragStart = null;
let dragCurrent = null;
let camera = { x: 0, y: 0 };
let gameStarted = false;
let globalTime = 0;

// FX tracking
let attackLines = [];
let moveArrows = [];
let floatTexts = [];

function addUnit(type, team, x, y) {
  const u = {
    id: uid(), type, team, x, y,
    hp: HP[type], maxHp: HP[type],
    dest: null, target: null, gatherTarget: null,
    carry: 0, lastAttack: 0,
    state: 'idle',
    path: [], pathTimer: 0,
    gatherProgress: 0,
    gatherAnim: 0,
  };
  units.push(u);
  return u;
}

function addBuilding(kind, team, x, y) {
  const b = {
    id: uid(), kind, team, x, y,
    hp: kind === 'tower' ? HP.tower : HP.building,
    maxHp: kind === 'tower' ? HP.tower : HP.building,
    rally: null, buildProgress: 1,
  };
  buildings.push(b);
  return b;
}

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// ---------- Map ----------
function cellAt(x, y) {
  const cx = Math.floor(x / TILE);
  const cy = Math.floor(y / TILE);
  return { cx, cy, walkable: cx >= 0 && cy >= 0 && cx < COLS && cy < ROWS };
}

function isBlocked(cx, cy, ignoreId = null) {
  if (cx < 0 || cy < 0 || cx >= COLS || cy >= ROWS) return true;
  for (const b of buildings) {
    const bx = Math.floor(b.x / TILE);
    const by = Math.floor(b.y / TILE);
    const w = b.kind === 'tower' ? 1 : 2;
    const h = b.kind === 'tower' ? 1 : 2;
    if (cx >= bx && cx < bx + w && cy >= by && cy < by + h) return true;
  }
  for (const u of units) {
    if (u.id === ignoreId) continue;
    const uc = cellAt(u.x, u.y);
    if (uc.cx === cx && uc.cy === cy) return true;
  }
  return false;
}

const goldMines = [];
function initGoldMines() {
  const centers = [
    { x: 8, y: 6 },
    { x: COLS - 10, y: ROWS - 8 },
    { x: 10, y: ROWS - 10 },
    { x: COLS - 12, y: 8 },
    { x: Math.floor(COLS / 2), y: Math.floor(ROWS / 2) },
  ];
  for (const c of centers) {
    const cluster = [];
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        cluster.push({ cx: c.x + dx, cy: c.y + dy });
      }
    }
    goldMines.push(cluster);
  }
}

function nearestGoldTile(x, y) {
  let best = null, bd = Infinity;
  for (const cluster of goldMines) {
    for (const t of cluster) {
      const d = Math.hypot(t.cx * TILE + TILE / 2 - x, t.cy * TILE + TILE / 2 - y);
      if (d < bd) { bd = d; best = t; }
    }
  }
  return best;
}

// ---------- Pathfinding ----------
function pathfind(sx, sy, tx, ty, ignoreId = null) {
  const start = cellAt(sx, sy);
  const goal = cellAt(tx, ty);
  if (!start.walkable || !goal.walkable) return [];

  const open = [];
  const closed = new Set();
  const cameFrom = new Map();
  const gScore = new Map();

  function key(cx, cy) { return `${cx},${cy}`; }

  open.push({ cx: start.cx, cy: start.cy, f: 0 });
  gScore.set(key(start.cx, start.cy), 0);

  while (open.length) {
    open.sort((a, b) => a.f - b.f);
    const cur = open.shift();
    const ck = key(cur.cx, cur.cy);
    if (closed.has(ck)) continue;
    closed.add(ck);

    if (cur.cx === goal.cx && cur.cy === goal.cy) {
      const path = [];
      let k = ck;
      while (cameFrom.has(k)) {
        const [px, py] = cameFrom.get(k).split(',').map(Number);
        path.push({ x: px * TILE + TILE / 2, y: py * TILE + TILE / 2 });
        k = cameFrom.get(k);
      }
      path.reverse();
      return path;
    }

    for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]) {
      const nx = cur.cx + dx, ny = cur.cy + dy;
      if (nx < 0 || ny < 0 || nx >= COLS || ny >= ROWS) continue;
      const nk = key(nx, ny);
      if (closed.has(nk)) continue;
      if (isBlocked(nx, ny, ignoreId) && !(nx === goal.cx && ny === goal.cy)) continue;
      const moveCost = (dx !== 0 && dy !== 0) ? 1.414 : 1;
      const tentative = (gScore.get(ck) || Infinity) + moveCost;
      if (tentative < (gScore.get(nk) || Infinity)) {
        cameFrom.set(nk, ck);
        gScore.set(nk, tentative);
        const h = Math.abs(nx - goal.cx) + Math.abs(ny - goal.cy);
        open.push({ cx: nx, cy: ny, f: tentative + h });
      }
    }
  }
  return [];
}

// ---------- Initialization ----------
function initGame() {
  initGoldMines();

  // Player base
  addBuilding('townhall', 0, 3 * TILE, 3 * TILE);
  for (let i = 0; i < 3; i++) addUnit('worker', 0, (4 + i) * TILE, 5 * TILE);
  addUnit('soldier', 0, 5 * TILE, 7 * TILE);

  // Enemy base
  addBuilding('townhall', 1, (COLS - 5) * TILE, (ROWS - 5) * TILE);
  for (let i = 0; i < 3; i++) addUnit('worker', 1, (COLS - 6 - i) * TILE, (ROWS - 7) * TILE);
  addUnit('soldier', 1, (COLS - 7) * TILE, (ROWS - 9) * TILE);

  camera.x = 0;
  camera.y = 0;
}

// ---------- Update ----------
let lastTime = performance.now();

function update(dt) {
  globalTime += dt;

  if (!gameStarted) return;

  if (Math.random() < 0.02) {
    food[0] = Math.min(food[0] + 0.5, maxFood[0]);
    food[1] = Math.min(food[1] + 0.5, maxFood[1]);
  }

  for (const u of units) unitAI(u, dt);
  for (const b of buildings) buildingAI(b, dt);

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.life -= dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    if (p.life <= 0) particles.splice(i, 1);
  }

  for (let i = attackLines.length - 1; i >= 0; i--) {
    attackLines[i].life -= dt;
    if (attackLines[i].life <= 0) attackLines.splice(i, 1);
  }

  for (let i = moveArrows.length - 1; i >= 0; i--) {
    moveArrows[i].life -= dt;
    if (moveArrows[i].life <= 0) moveArrows.splice(i, 1);
  }

  for (let i = floatTexts.length - 1; i >= 0; i--) {
    const ft = floatTexts[i];
    ft.life -= dt;
    ft.y -= dt * 0.04;
    ft.alpha = Math.max(0, ft.life / ft.maxLife);
    if (ft.life <= 0) floatTexts.splice(i, 1);
  }

  updateUI();
}

function unitAI(u, dt) {
  const now = performance.now();

  if (u.target && !u.target.dead) {
    const tx = u.target.x ?? (u.target.x + TILE);
    const ty = u.target.y ?? (u.target.y + TILE);
    const d = Math.hypot(tx - u.x, ty - u.y);
    const range = u.type === 'tower' ? ATTACK_RANGE.tower : ATTACK_RANGE.soldier;
    if (d <= range + 10) {
      if (now - u.lastAttack >= (u.type === 'tower' ? ATTACK_COOLDOWN.tower : ATTACK_COOLDOWN.soldier)) {
        u.lastAttack = now;
        const dmg = u.type === 'tower' ? DMG.tower : DMG.soldier;
        const actual = Math.max(1, dmg + (Math.random() * 4 - 2));
        u.target.hp -= actual;
        spawnHitParticle(u.target.x ?? u.target.x, u.target.y ?? u.target.y);
        addAttackLine(u.x, u.y, u.target.x ?? u.target.x, u.target.y ?? u.target.y, u.team);
        if (u.target.hp <= 0) {
          u.target.dead = true;
          u.target = null;
        }
      }
      u.dest = null;
      u.path = [];
      u.state = 'attack';
      return;
    } else {
      if (!u.path.length || u.pathTimer <= 0) {
        u.path = pathfind(u.x, u.y, tx, ty, u.id);
        u.pathTimer = 600;
      }
      u.state = 'move';
    }
  }

  if (u.path.length) {
    const wp = u.path[0];
    const dx = wp.x - u.x;
    const dy = wp.y - u.y;
    const d = Math.hypot(dx, dy);
    const spd = (SPEED[u.type] || 1.5) * (dt / 16);
    if (d < spd * 2) {
      u.path.shift();
    } else {
      u.x += (dx / d) * spd;
      u.y += (dy / d) * spd;
    }
    u.pathTimer -= dt;
    u.state = 'move';
  } else if (u.dest) {
    const dx = u.dest.x - u.x;
    const dy = u.dest.y - u.y;
    const d = Math.hypot(dx, dy);
    const spd = (SPEED[u.type] || 1.5) * (dt / 16);
    if (d < 4) {
      u.dest = null;
      u.state = 'idle';
    } else {
      u.x += (dx / d) * spd;
      u.y += (dy / d) * spd;
      u.state = 'move';
    }
  }

  // Worker gather
  if (u.type === 'worker' && u.gatherTarget) {
    const gt = u.gatherTarget;
    const d = Math.hypot(gt.cx * TILE + TILE / 2 - u.x, gt.cy * TILE + TILE / 2 - u.y);
    if (d < TILE * 1.2) {
      u.state = 'gather';
      u.gatherAnim += dt;
      u.gatherProgress += dt;
      if (u.gatherProgress >= 1200) {
        u.gatherProgress = 0;
        u.carry = Math.min(u.carry + 1, 10);
        if (u.carry >= 10) {
          u.gatherTarget = null;
          const th = buildings.find(b => b.kind === 'townhall' && b.team === u.team && !b.dead);
          if (th) u.dest = { x: th.x + TILE, y: th.y + TILE };
        }
        addFloatText(u.x, u.y - 14, '+Gold', '#fbbf24');
        spawnGatherParticles(u.x, u.y);
      }
    } else {
      u.gatherProgress = Math.max(0, u.gatherProgress - dt * 0.5);
    }
  }

  // Idle workers auto-gather nearby gold
  if (u.type === 'worker' && u.team === 0 && u.state === 'idle' && u.carry === 0 && !u.gatherTarget && !u.dest) {
    const gt = nearestGoldTile(u.x, u.y);
    if (gt) {
      u.gatherTarget = gt;
      u.dest = { x: gt.cx * TILE + TILE / 2, y: gt.cy * TILE + TILE / 2 };
      u.path = pathfind(u.x, u.y, u.dest.x, u.dest.y, u.id);
    }
  }

  if (u.type === 'worker' && u.carry > 0 && !u.dest && !u.gatherTarget) {
    const th = buildings.find(b => b.kind === 'townhall' && b.team === u.team && !b.dead);
    if (th) {
      const d = Math.hypot(th.x + TILE - u.x, th.y + TILE - u.y);
      if (d < TILE * 1.5) {
        const amount = u.carry * 5;
        gold[u.team] += amount;
        addFloatText(u.x, u.y - 14, `+${amount} Gold`, '#fbbf24');
        u.carry = 0;
      } else {
        u.dest = { x: th.x + TILE, y: th.y + TILE };
      }
    }
  }

  // Auto-target
  if (u.type === 'soldier' || u.type === 'worker') {
    if (!u.target || u.target.dead) {
      let best = null, bd = SIGHT;
      for (const o of units) {
        if (o.team !== u.team && !o.dead) {
          const d = Math.hypot(o.x - u.x, o.y - u.y);
          if (d < bd) { bd = d; best = o; }
        }
      }
      for (const b of buildings) {
        if (b.team !== u.team && !b.dead && b.kind !== 'farm') {
          const d = Math.hypot(b.x + TILE - u.x, b.y + TILE - u.y);
          if (d < bd) { bd = d; best = b; }
        }
      }
      u.target = best;
    }
  }
}

function buildingAI(b, dt) {
  if (b.dead) return;
  if (b.kind === 'tower') {
    const now = performance.now();
    if (now - (b.lastAttack || 0) >= ATTACK_COOLDOWN.tower) {
      let best = null, bd = ATTACK_RANGE.tower;
      for (const u of units) {
        if (u.team !== b.team && !u.dead) {
          const d = Math.hypot(u.x - (b.x + TILE / 2), u.y - (b.y + TILE / 2));
          if (d < bd) { bd = d; best = u; }
        }
      }
      if (best) {
        b.lastAttack = now;
        best.hp -= DMG.tower;
        spawnHitParticle(best.x, best.y);
        addAttackLine(b.x + TILE / 2, b.y + TILE / 2, best.x, best.y, b.team);
        if (best.hp <= 0) best.dead = true;
      }
    }
  }
}

// ---------- FX Spawners ----------
function spawnHitParticle(x, y) {
  for (let i = 0; i < 5; i++) {
    particles.push({
      x, y,
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3,
      life: 350,
      color: Math.random() > 0.5 ? '#fca5a5' : '#fef08a',
      size: 2 + Math.random() * 3,
    });
  }
}

function spawnGatherParticles(x, y) {
  for (let i = 0; i < 8; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.5 + Math.random() * 1.5;
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1,
      life: 500,
      color: '#fbbf24',
      size: 2 + Math.random() * 2,
    });
  }
}

function addAttackLine(x1, y1, x2, y2, team) {
  attackLines.push({ x1, y1, x2, y2, team, life: 150 });
}

function addMoveArrow(x, y) {
  moveArrows.push({ x, y, life: 500, spawn: performance.now() });
}

function addFloatText(x, y, text, color) {
  floatTexts.push({ x, y, text, color, life: 900, maxLife: 900, alpha: 1 });
}

function cleanup() {
  for (let i = units.length - 1; i >= 0; i--) {
    if (units[i].dead) {
      if (selected.includes(units[i])) selected = selected.filter(x => x !== units[i]);
      units.splice(i, 1);
    }
  }
  for (let i = buildings.length - 1; i >= 0; i--) {
    if (buildings[i].dead) {
      if (selected.includes(buildings[i])) selected = selected.filter(x => x !== buildings[i]);
      buildings.splice(i, 1);
    }
  }
}

// ---------- Enemy AI ----------
let aiTimer = 0;
function enemyAI(dt) {
  aiTimer += dt;
  if (aiTimer < 1500) return;
  aiTimer = 0;

  const enemyWorkers = units.filter(u => u.team === 1 && u.type === 'worker' && !u.dead);
  const enemySoldiers = units.filter(u => u.team === 1 && u.type === 'soldier' && !u.dead);
  const enemyBuildings = buildings.filter(b => b.team === 1 && !b.dead);
  const enemyTH = enemyBuildings.find(b => b.kind === 'townhall');

  for (const w of enemyWorkers) {
    if (w.carry === 0 && !w.gatherTarget && !w.dest) {
      const gt = nearestGoldTile(w.x, w.y);
      if (gt) {
        w.gatherTarget = gt;
        w.dest = { x: gt.cx * TILE + TILE / 2, y: gt.cy * TILE + TILE / 2 };
      }
    }
  }

  if (gold[1] >= 150 && !enemyBuildings.find(b => b.kind === 'barracks')) {
    const bx = enemyTH ? enemyTH.x - 4 * TILE : (COLS - 10) * TILE;
    const by = enemyTH ? enemyTH.y : (ROWS - 10) * TILE;
    if (!isBlocked(Math.floor(bx / TILE), Math.floor(by / TILE))) {
      addBuilding('barracks', 1, bx, by);
      gold[1] -= 150;
    }
  }

  const barracks = enemyBuildings.find(b => b.kind === 'barracks');
  if (barracks && gold[1] >= 100 && food[1] >= 50 && enemySoldiers.length < 8) {
    gold[1] -= 100;
    food[1] -= 50;
    addUnit('soldier', 1, barracks.x + TILE, barracks.y + TILE);
  }

  for (const s of enemySoldiers) {
    if (!s.target || s.target.dead) {
      const targets = units.filter(u => u.team === 0 && !u.dead).concat(
        buildings.filter(b => b.team === 0 && !b.dead && b.kind !== 'farm')
      );
      if (targets.length) {
        const t = targets[Math.floor(Math.random() * targets.length)];
        s.target = t;
        s.dest = { x: (t.x ?? t.x + TILE), y: (t.y ?? t.y + TILE) };
        s.path = pathfind(s.x, s.y, s.dest.x, s.dest.y, s.id);
      }
    }
  }
}

// ---------- Drawing ----------
function draw() {
  ctx.fillStyle = '#0b0e14';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(-camera.x, -camera.y);

  // Subtle grid
  ctx.strokeStyle = 'rgba(255,255,255,0.025)';
  ctx.lineWidth = 1;
  for (let x = 0; x <= COLS * TILE; x += TILE) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, ROWS * TILE); ctx.stroke();
  }
  for (let y = 0; y <= ROWS * TILE; y += TILE) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(COLS * TILE, y); ctx.stroke();
  }

  // Gold mines
  for (const cluster of goldMines) {
    for (const t of cluster) {
      ctx.fillStyle = '#b45309';
      ctx.fillRect(t.cx * TILE, t.cy * TILE, TILE, TILE);
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(t.cx * TILE + 4, t.cy * TILE + 4, TILE - 8, TILE - 8);
      // sparkle
      const sparkle = (Math.sin(globalTime * 0.005 + t.cx * 3 + t.cy * 7) + 1) / 2;
      ctx.fillStyle = `rgba(255,255,255,${0.15 + sparkle * 0.25})`;
      ctx.fillRect(t.cx * TILE + 10, t.cy * TILE + 10, TILE - 20, TILE - 20);
    }
  }

  // Buildings
  for (const b of buildings) {
    if (b.dead) continue;
    const w = b.kind === 'tower' ? TILE : TILE * 2;
    const h = b.kind === 'tower' ? TILE : TILE * 2;

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(b.x + 3, b.y + 3, w, h);

    // Main body
    ctx.fillStyle = b.team === 0 ? '#3b82f6' : '#ef4444';
    if (b.kind === 'townhall') ctx.fillStyle = b.team === 0 ? '#2563eb' : '#dc2626';
    if (b.kind === 'barracks') ctx.fillStyle = b.team === 0 ? '#6366f1' : '#c02626';
    if (b.kind === 'tower') ctx.fillStyle = b.team === 0 ? '#0ea5e9' : '#b91c1c';
    ctx.fillRect(b.x, b.y, w, h);

    // Border highlight
    ctx.strokeStyle = b.team === 0 ? 'rgba(147,197,253,0.35)' : 'rgba(252,165,165,0.35)';
    ctx.lineWidth = 1;
    ctx.strokeRect(b.x + 0.5, b.y + 0.5, w - 1, h - 1);

    // Selection ring
    if (selected.includes(b)) {
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 2;
      ctx.strokeRect(b.x - 2, b.y - 2, w + 4, h + 4);
      // Animated corner brackets
      drawCornerBrackets(b.x - 4, b.y - 4, w + 8, h + 8, globalTime);
    }

    drawHP(b.x, b.y - 8, w, b.hp, b.maxHp);
  }

  // Units
  for (const u of units) {
    if (u.dead) continue;
    const r = u.type === 'worker' ? 6 : 8;

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath();
    ctx.ellipse(u.x + 2, u.y + 3, r + 2, r * 0.6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Body
    ctx.fillStyle = u.team === 0 ? '#93c5fd' : '#fca5a5';
    if (u.type === 'soldier') ctx.fillStyle = u.team === 0 ? '#60a5fa' : '#f87171';
    ctx.beginPath();
    ctx.arc(u.x, u.y, r, 0, Math.PI * 2);
    ctx.fill();

    // Team ring
    ctx.strokeStyle = u.team === 0 ? 'rgba(96,165,250,0.6)' : 'rgba(239,68,68,0.6)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(u.x, u.y, r + 1, 0, Math.PI * 2);
    ctx.stroke();

    // Selection
    if (selected.includes(u)) {
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(u.x, u.y, r + 5, 0, Math.PI * 2);
      ctx.stroke();
      // Pulsing selection ring
      const pulse = Math.sin(globalTime * 0.008) * 2;
      ctx.strokeStyle = 'rgba(250,204,21,0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(u.x, u.y, r + 7 + pulse, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Carry indicator (larger, clearer)
    if (u.carry > 0) {
      const bagY = u.y - r - 8;
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.beginPath();
      ctx.arc(u.x, bagY, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(u.x, bagY, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 8px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(u.carry, u.x, bagY + 0.5);
      ctx.textBaseline = 'alphabetic';
    }

    // Gather progress ring
    if (u.state === 'gather' && u.gatherProgress > 0) {
      const pct = Math.min(1, u.gatherProgress / 1200);
      ctx.strokeStyle = 'rgba(251,191,36,0.7)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(u.x, u.y, r + 10, -Math.PI / 2, -Math.PI / 2 + pct * Math.PI * 2);
      ctx.stroke();
      // Inner glow
      ctx.fillStyle = `rgba(251,191,36,${0.1 + pct * 0.15})`;
      ctx.beginPath();
      ctx.arc(u.x, u.y, r + 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // State icon
    if (selected.includes(u)) {
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      const label = u.state === 'attack' ? '\u2694' : u.state === 'move' ? '\u2192' : u.state === 'gather' ? '\u26cf' : '\u25cb';
      ctx.fillText(label, u.x, u.y - r - (u.carry > 0 ? 20 : 12));
    }

    drawHP(u.x - 10, u.y - r - 16, 20, u.hp, u.maxHp);
  }

  // Move arrows
  for (const a of moveArrows) {
    const progress = 1 - (a.life / 500);
    const alpha = Math.max(0, 1 - progress);
    ctx.fillStyle = `rgba(255,255,255,${alpha * 0.6})`;
    drawArrow(ctx, a.x, a.y, 10 + progress * 6, globalTime * 0.005);
  }

  // Attack lines
  for (const line of attackLines) {
    const alpha = Math.max(0, line.life / 150);
    ctx.strokeStyle = line.team === 0 ? `rgba(96,165,250,${alpha})` : `rgba(239,68,68,${alpha})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(line.x1, line.y1);
    ctx.lineTo(line.x2, line.y2);
    ctx.stroke();
  }

  // Particles
  for (const p of particles) {
    ctx.fillStyle = p.color;
    ctx.globalAlpha = Math.max(0, p.life / 350);
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  // Destination lines for selected units
  for (const u of units) {
    if (u.dest && selected.includes(u)) {
      ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx.setLineDash([5, 5]);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(u.x, u.y);
      ctx.lineTo(u.dest.x, u.dest.y);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.beginPath();
      ctx.arc(u.dest.x, u.dest.y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Placing ghost
  if (placing) {
    const mx = snap(mouse.x + camera.x);
    const my = snap(mouse.y + camera.y);
    const w = placing === 'tower' ? TILE : TILE * 2;
    const h = placing === 'tower' ? TILE : TILE * 2;
    const ok = canBuildAt(mx, my, placing);
    ctx.fillStyle = ok ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)';
    ctx.fillRect(mx, my, w, h);
    ctx.strokeStyle = ok ? '#22c55e' : '#ef4444';
    ctx.lineWidth = 2;
    ctx.strokeRect(mx, my, w, h);
    // Grid inside
    ctx.strokeStyle = ok ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(mx + TILE, my); ctx.lineTo(mx + TILE, my + h);
    ctx.moveTo(mx, my + TILE); ctx.lineTo(mx + w, my + TILE);
    ctx.stroke();
  }

  // Float texts
  for (const ft of floatTexts) {
    ctx.fillStyle = ft.color;
    ctx.globalAlpha = ft.alpha;
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(ft.text, ft.x, ft.y);
    ctx.globalAlpha = 1;
  }

  ctx.restore();

  // Drag selection rect in screen space
  if (dragStart && dragCurrent) {
    const x = Math.min(dragStart.x, dragCurrent.x);
    const y = Math.min(dragStart.y, dragCurrent.y);
    const w = Math.abs(dragCurrent.x - dragStart.x);
    const h = Math.abs(dragCurrent.y - dragCurrent.y);
    ctx.strokeStyle = '#60a5fa';
    ctx.fillStyle = 'rgba(96,165,250,0.12)';
    ctx.lineWidth = 1.5;
    ctx.fillRect(x, y, w, h);
    ctx.strokeRect(x, y, w, h);
  }
}

function drawCornerBrackets(x, y, w, h, time) {
  const len = 10 + Math.sin(time * 0.005) * 3;
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 2;
  const inset = 0;

  ctx.beginPath();
  ctx.moveTo(x, y + len); ctx.lineTo(x, y); ctx.lineTo(x + len, y);
  ctx.moveTo(x + w, y + len); ctx.lineTo(x + w, y); ctx.lineTo(x + w - len, y);
  ctx.moveTo(x, y + h - len); ctx.lineTo(x, y + h); ctx.lineTo(x + len, y + h);
  ctx.moveTo(x + w, y + h - len); ctx.lineTo(x + w, y + h); ctx.lineTo(x + w - len, y + h);
  ctx.stroke();
}

function drawArrow(ctx, x, y, size, rot) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.beginPath();
  ctx.moveTo(0, -size);
  ctx.lineTo(-size * 0.5, size * 0.3);
  ctx.lineTo(size * 0.5, size * 0.3);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawHP(x, y, w, hp, maxHp) {
  const ratio = Math.max(0, hp / maxHp);
  ctx.fillStyle = '#1f2937';
  ctx.fillRect(x, y, w, 4);
  ctx.fillStyle = ratio > 0.5 ? '#4ade80' : ratio > 0.25 ? '#fbbf24' : '#ef4444';
  ctx.fillRect(x, y, w * ratio, 4);
}

function snap(v) {
  return Math.floor(v / TILE) * TILE;
}

function canBuildAt(x, y, kind) {
  const cx = Math.floor(x / TILE);
  const cy = Math.floor(y / TILE);
  const w = kind === 'tower' ? 1 : 2;
  const h = kind === 'tower' ? 1 : 2;
  for (let dy = 0; dy < h; dy++) {
    for (let dx = 0; dx < w; dx++) {
      if (isBlocked(cx + dx, cy + dy)) return false;
    }
  }
  return true;
}

// ---------- Input ----------
const mouse = { x: 0, y: 0, down: false, rightDown: false };

canvas.addEventListener('mousedown', e => {
  if (!gameStarted) return;
  if (e.button === 0) {
    if (placing) {
      const wx = snap(e.clientX + camera.x);
      const wy = snap(e.clientY + camera.y);
      const cost = placing === 'tower' ? 200 : 150;
      if (gold[0] >= cost && canBuildAt(wx, wy, placing)) {
        addBuilding(placing, 0, wx, wy);
        gold[0] -= cost;
        addFloatText(wx + TILE, wy, `-${cost} Gold`, '#fca5a5');
        placing = null;
        setActiveButton(null);
        toast('Building placed!', 'success');
      } else {
        toast('Cannot build here', 'error');
      }
      return;
    }
    mouse.down = true;
    dragStart = { x: e.clientX, y: e.clientY };
    dragCurrent = { x: e.clientX, y: e.clientY };
  } else if (e.button === 2) {
    mouse.rightDown = true;
    handleRightClick(e.clientX, e.clientY);
  }
});

window.addEventListener('mouseup', e => {
  if (e.button === 0) {
    mouse.down = false;
    if (dragStart && dragCurrent) {
      const x1 = Math.min(dragStart.x, dragCurrent.x) + camera.x;
      const y1 = Math.min(dragStart.y, dragCurrent.y) + camera.y;
      const x2 = Math.max(dragStart.x, dragCurrent.x) + camera.x;
      const y2 = Math.max(dragStart.y, dragCurrent.y) + camera.y;
      selected = units.filter(u => u.team === 0 && !u.dead && u.x >= x1 && u.x <= x2 && u.y >= y1 && u.y <= y2);
      if (selected.length) toast(`${selected.length} unit${selected.length > 1 ? 's' : ''} selected`);
    }
    dragStart = null;
    dragCurrent = null;
  } else if (e.button === 2) {
    mouse.rightDown = false;
  }
});

canvas.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  if (mouse.down && dragStart) dragCurrent = { x: e.clientX, y: e.clientY };
  const margin = 40;
  if (e.clientX < margin) camera.x -= 6;
  if (e.clientX > window.innerWidth - margin) camera.x += 6;
  if (e.clientY < margin) camera.y -= 6;
  if (e.clientY > window.innerHeight - margin) camera.y += 6;
  camera.x = Math.max(0, Math.min(camera.x, COLS * TILE - canvas.width));
  camera.y = Math.max(0, Math.min(camera.y, ROWS * TILE - canvas.height));
});

canvas.addEventListener('contextmenu', e => e.preventDefault());

function handleRightClick(sx, sy) {
  const wx = sx + camera.x;
  const wy = sy + camera.y;
  addMoveArrow(wx, wy);

  let target = null;
  for (const u of units) {
    if (u.team !== 0 && !u.dead && Math.hypot(u.x - wx, u.y - wy) < 14) {
      target = u; break;
    }
  }
  if (!target) {
    for (const b of buildings) {
      if (b.team !== 0 && !b.dead && wx >= b.x && wx <= b.x + TILE * 2 && wy >= b.y && wy <= b.y + TILE * 2) {
        target = b; break;
      }
    }
  }

  for (const u of selected) {
    if (u.team !== 0) continue;
    if (target) {
      u.target = target;
      u.gatherTarget = null;
      u.dest = null;
      u.path = [];
    } else {
      u.target = null;
      u.gatherTarget = null;
      u.dest = { x: wx, y: wy };
      u.path = pathfind(u.x, u.y, wx, wy, u.id);
      u.pathTimer = 800;
    }
  }
}

canvas.addEventListener('click', e => {
  if (!gameStarted) return;
  if (placing) return;
  if (dragStart && dragCurrent && (Math.abs(dragCurrent.x - dragStart.x) > 4 || Math.abs(dragCurrent.y - dragStart.y) > 4)) return;
  const wx = e.clientX + camera.x;
  const wy = e.clientY + camera.y;
  let hit = null;
  for (const u of units) {
    if (u.team === 0 && !u.dead && Math.hypot(u.x - wx, u.y - wy) < 12) {
      hit = u; break;
    }
  }
  if (!hit) {
    for (const b of buildings) {
      if (b.team === 0 && !b.dead && wx >= b.x && wx <= b.x + TILE * 2 && wy >= b.y && wy <= b.y + TILE * 2) {
        hit = b; break;
      }
    }
  }
  if (e.shiftKey) {
    if (hit) {
      if (selected.includes(hit)) selected = selected.filter(x => x !== hit);
      else selected.push(hit);
    }
  } else {
    selected = hit ? [hit] : [];
  }
});

// ---------- UI Bindings ----------
const btnWorker = document.getElementById('btnWorker');
const btnSoldier = document.getElementById('btnSoldier');
const btnBarracks = document.getElementById('btnBarracks');
const btnTower = document.getElementById('btnTower');
const btnCancel = document.getElementById('btnCancel');
const btnStart = document.getElementById('btnStart');
const overlay = document.getElementById('instructions-overlay');

function setActiveButton(btn) {
  [btnWorker, btnSoldier, btnBarracks, btnTower].forEach(b => b.classList.toggle('active', b === btn));
}

function toast(msg, type = '') {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = type ? `show ${type}` : 'show';
  setTimeout(() => el.className = '', 2000);
}

btnStart.addEventListener('click', () => {
  overlay.classList.remove('open');
  gameStarted = true;
  toast('Game started! Good luck.');
});

btnWorker.addEventListener('click', () => {
  const th = buildings.find(b => b.kind === 'townhall' && b.team === 0 && !b.dead);
  if (!th) return toast('No Townhall!', 'error');
  if (gold[0] >= 50) {
    gold[0] -= 50;
    const u = addUnit('worker', 0, th.x + TILE, th.y + TILE);
    u.dest = { x: th.x + TILE + (Math.random() - 0.5) * 40, y: th.y + TILE + (Math.random() - 0.5) * 40 };
    toast('Worker trained', 'success');
  } else {
    toast('Not enough gold', 'error');
  }
});

btnSoldier.addEventListener('click', () => {
  const bar = buildings.find(b => b.kind === 'barracks' && b.team === 0 && !b.dead);
  if (!bar) return toast('Build a Barracks first!', 'error');
  if (gold[0] >= 100 && food[0] >= 50) {
    gold[0] -= 100;
    food[0] -= 50;
    const u = addUnit('soldier', 0, bar.x + TILE, bar.y + TILE);
    u.dest = { x: bar.x + TILE + (Math.random() - 0.5) * 40, y: bar.y + TILE + (Math.random() - 0.5) * 40 };
    toast('Soldier trained', 'success');
  } else {
    toast('Not enough resources', 'error');
  }
});

btnBarracks.addEventListener('click', () => {
  placing = 'barracks';
  setActiveButton(btnBarracks);
  toast('Click on map to place Barracks');
});

btnTower.addEventListener('click', () => {
  placing = 'tower';
  setActiveButton(btnTower);
  toast('Click on map to place Tower');
});

btnCancel.addEventListener('click', () => {
  placing = null;
  selected = [];
  setActiveButton(null);
});

function updateUI() {
  document.getElementById('gold').textContent = Math.floor(gold[0]);
  document.getElementById('food').textContent = Math.floor(food[0]);
  document.getElementById('units').textContent = units.filter(u => u.team === 0 && !u.dead).length;
  document.getElementById('maxUnits').textContent = maxFood[0];

  const info = document.getElementById('selection-info');
  if (selected.length === 0) {
    info.innerHTML = '';
  } else if (selected.length === 1) {
    const s = selected[0];
    if (s.type) {
      info.innerHTML = `<b>${s.type.toUpperCase()}</b><br>HP: ${Math.ceil(s.hp)}/${s.maxHp}<br>State: ${s.state}`;
    } else {
      info.innerHTML = `<b>${s.kind.toUpperCase()}</b><br>HP: ${Math.ceil(s.hp)}/${s.maxHp}`;
    }
  } else {
    info.innerHTML = `<b>${selected.length} selected</b>`;
  }

  // Button affordances
  btnWorker.disabled = gold[0] < 50 || !buildings.find(b => b.kind === 'townhall' && b.team === 0 && !b.dead);
  btnSoldier.disabled = gold[0] < 100 || food[0] < 50 || !buildings.find(b => b.kind === 'barracks' && b.team === 0 && !b.dead);
  btnBarracks.disabled = gold[0] < 150;
  btnTower.disabled = gold[0] < 200;
}

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    placing = null;
    selected = [];
    setActiveButton(null);
  }
  if (!gameStarted) return;
  const key = e.key.toLowerCase();
  if (key === 'w') btnWorker.click();
  if (key === 's') btnSoldier.click();
  if (key === 'b') btnBarracks.click();
  if (key === 't') btnTower.click();
});

// ---------- Main Loop ----------
function frame(now) {
  const dt = Math.min(now - lastTime, 50);
  lastTime = now;
  update(dt);
  enemyAI(dt);
  cleanup();
  draw();
  requestAnimationFrame(frame);
}

initGame();
requestAnimationFrame(frame);
