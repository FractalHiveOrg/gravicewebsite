/**
 * Gravice's own story orbs, painted in a 64×64 box in a single ink (the caller tints them).
 * Ported from the homepage prototype (prototypes/home.html).
 *
 *   ElevateRM → "composing": the composing band laid flat around the core like a belt;
 *                            a wave moves its dots up and down
 *   V-track   → "searching": a scan line sweeps a dotted globe and leaves a short afterglow
 *   NICO      → "solving":   scramble → pause → click back → solved hold with a pulse
 *
 * Any other state falls back to the thinking-orbs engine (MIT © Jakub Antalik).
 */
import { MODE_DRAWS, resolvePreset } from 'thinking-orbs/engine';
import type { OrbState } from 'thinking-orbs/engine';

type V3 = [number, number, number];
interface OrbDot { x: number; y: number; z: number; r: number; a: number; w?: number }

const ease = (u: number) => (u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2);

function paint(ctx: CanvasRenderingContext2D, dots: OrbDot[], alpha: (d: OrbDot) => number, rMin = 0) {
  dots.sort((p, q) => p.z - q.z);
  for (const d of dots) {
    ctx.globalAlpha = alpha(d);
    ctx.beginPath(); ctx.arc(d.x, d.y, Math.max(rMin, d.r), 0, Math.PI * 2); ctx.fill();
  }
  ctx.globalAlpha = 1;
}

/* ---- V-track: scan */
const SCAN_SPIN = 0.2, SCAN_SWEEP = 1.9, SCAN_RINGS = 17, SCAN_DENSITY = 44;
const SCAN_POINTS: [number, number][] = (() => {
  const pts: [number, number][] = [];
  for (let li = 0; li <= SCAN_RINGS; li++) {
    const lat = -Math.PI / 2 + (li / SCAN_RINGS) * Math.PI;
    const n = Math.max(1, Math.round(Math.abs(Math.cos(lat)) * SCAN_DENSITY));
    for (let j = 0; j < n; j++) pts.push([lat, (j / n) * Math.PI * 2]);
  }
  return pts;
})();
function angleDelta(a: number, b: number) {
  let d = (a - b) % (Math.PI * 2);
  if (d > Math.PI) d -= Math.PI * 2;
  if (d <= -Math.PI) d += Math.PI * 2;
  return d;
}
function drawScan(ctx: CanvasRenderingContext2D, t: number) {
  const cx = 32, cy = 32, R = 32 * 0.82;
  const yaw = t * SCAN_SPIN, tilt = 0.4 + 0.06 * Math.sin(t * 0.35);
  const cyw = Math.cos(yaw), syw = Math.sin(yaw), ct = Math.cos(tilt), st = Math.sin(tilt);
  const scan = t * (SCAN_SPIN + SCAN_SWEEP);
  const dots: OrbDot[] = [];
  for (const [lat, lon] of SCAN_POINTS) {
    const cl = Math.cos(lat), x = cl * Math.cos(lon), y = Math.sin(lat), z = cl * Math.sin(lon);
    const x1 = x * cyw + z * syw, z1 = -x * syw + z * cyw;
    const y1 = y * ct - z1 * st, z2 = y * st + z1 * ct;
    const depth = (z2 + 1) / 2;
    const d = angleDelta(scan, lon + yaw);
    const front = Math.max(0, z2);
    const lead = Math.exp(-(d * d) / 0.035) * front;
    const trail = d < 0 ? Math.exp(d / 0.55) * 0.55 * front : 0;
    const lit = Math.min(1, lead + trail);
    dots.push({
      x: cx + R * x1, y: cy - R * y1, z: z2,
      r: 0.17 + 0.42 * depth + 0.3 * lead + 0.08 * trail,
      a: Math.min(1, (0.16 + 0.5 * Math.pow(depth, 1.4)) * (1 - 0.55 * lit) + lit),
    });
  }
  paint(ctx, dots, (d) => d.a);
}

/* ---- ElevateRM: belt */
const BELT_TILT = 0.3, BELT_SPIN = 0.12;
interface BeltOpts {
  rsPow?: number; ghostN?: number; wobMul?: number; lanes?: number; bandMul?: number;
  segs?: number; rBase?: number; rDepth?: number; rMin?: number;
}
function drawBelt(ctx: CanvasRenderingContext2D, t: number, o: BeltOpts) {
  const size = 64, cx = 32, cy = 32, R = (size / 2) * 0.78;
  const rs = Math.pow(size / 300, o.rsPow ?? 0.6);
  const st = Math.sin(BELT_TILT), ct = Math.cos(BELT_TILT);
  const view = (x: number, y: number, z: number): V3 => [cx + x, cy - (y * ct - z * st), y * st + z * ct];
  const dots: OrbDot[] = [];
  // a faint sphere behind the belt
  const ghostN = o.ghostN ?? 150;
  for (let i = 0; i < ghostN; i++) {
    const yy = 1 - (2 * (i + 0.5)) / ghostN, r = Math.sqrt(1 - yy * yy), th = i * 2.399963;
    const [px, py, z] = view(Math.cos(th) * r * R, yy * R, Math.sin(th) * r * R);
    const depth = (z / R + 1) / 2;
    dots.push({ x: px, y: py, z, r: 0.8 * rs, w: 0.78, a: 0.1 + 0.22 * depth });
  }
  const ya = t * BELT_SPIN, ux = Math.cos(ya), uz = Math.sin(ya), vx = -uz, vz = ux;
  const wm = o.wobMul ?? 1;
  const lanes = Math.max(1, Math.round((o.lanes ?? 5) * (o.bandMul ?? 1)));
  const segs = o.segs ?? 88;
  for (let w = 0; w < lanes; w++) {
    const laneOff = (w - (lanes - 1) / 2) * 0.075;
    const edge = Math.abs(w - (lanes - 1) / 2) / Math.max(1, (lanes - 1) / 2);
    for (let k = 0; k < segs; k++) {
      const a = (k / segs) * Math.PI * 2;
      const wob = (0.16 * Math.sin(a * 3 - t * 1.7 + w * 0.22) + 0.07 * Math.sin(a * 5 + t * 1.1)) * wm;
      const x = ux * Math.cos(a) + vx * Math.sin(a), y = laneOff + wob, z = uz * Math.cos(a) + vz * Math.sin(a);
      const l = Math.hypot(x, y, z);
      const [px, py, zr] = view((x / l) * R, (y / l) * R, (z / l) * R);
      const depth = (zr / R + 1) / 2;
      dots.push({
        x: px, y: py, z: zr,
        r: ((o.rBase ?? 1.1) + (o.rDepth ?? 1.7) * depth) * (1 - 0.25 * edge) * rs,
        w: 0.52 - 0.44 * depth + 0.18 * edge,
        a: 0.4 + 0.6 * depth,
      });
    }
  }
  paint(ctx, dots, (d) => Math.max(0, Math.min(1, d.a * (1 - 0.8 * Math.max(0, Math.min(1, d.w ?? 0))))), o.rMin ?? 0.3);
}

/* ---- NICO: solving */
const MOVES = [
  { axis: 1, lo: 0.34, hi: 1.01, turn: Math.PI / 2 },
  { axis: 0, lo: -1.01, hi: -0.34, turn: -Math.PI / 2 },
  { axis: 2, lo: -0.33, hi: 0.33, turn: Math.PI / 2 },
  { axis: 1, lo: -1.01, hi: -0.34, turn: -Math.PI / 2 },
  { axis: 0, lo: 0.34, hi: 1.01, turn: Math.PI / 2 },
  { axis: 2, lo: 0.34, hi: 1.01, turn: -Math.PI / 2 },
];
const TURN = 0.42, T_SCRAMBLE = MOVES.length * TURN, T_PAUSE = 0.55, T_SOLVE = MOVES.length * 0.36, T_SOLVED = 2.4;
export const SOLVE_CYCLE = T_SCRAMBLE + T_PAUSE + T_SOLVE + T_SOLVED;
const SOLVE_POINTS: V3[] = (() => {
  const pts: V3[] = [], rings = 16, density = 44;
  for (let li = 0; li <= rings; li++) {
    const lat = -Math.PI / 2 + (li / rings) * Math.PI, c = Math.cos(lat), s = Math.sin(lat);
    const n = Math.max(1, Math.round(Math.abs(c) * density));
    for (let j = 0; j < n; j++) { const lon = (j / n) * Math.PI * 2; pts.push([c * Math.cos(lon), s, c * Math.sin(lon)]); }
  }
  return pts;
})();
function moveProgress(t: number) {
  const c = ((t % SOLVE_CYCLE) + SOLVE_CYCLE) % SOLVE_CYCLE;
  const N = MOVES.length, p = new Array<number>(N).fill(0);
  if (c < T_SCRAMBLE) {
    for (let i = 0; i < N; i++) p[i] = ease(Math.min(1, Math.max(0, (c - i * TURN) / TURN)));
    return { p, sinceSolved: -1 };
  }
  if (c < T_SCRAMBLE + T_PAUSE) return { p: p.fill(1), sinceSolved: -1 };
  const cs = c - T_SCRAMBLE - T_PAUSE, step = T_SOLVE / N;
  if (cs < T_SOLVE) {
    for (let i = 0; i < N; i++) p[N - 1 - i] = 1 - ease(Math.min(1, Math.max(0, (cs - i * step) / step)));
    return { p, sinceSolved: -1 };
  }
  return { p, sinceSolved: cs - T_SOLVE };
}
function rotate(v: V3, axis: number, a: number): V3 {
  const c = Math.cos(a), s = Math.sin(a), [x, y, z] = v;
  if (axis === 0) return [x, y * c - z * s, y * s + z * c];
  if (axis === 1) return [x * c + z * s, y, -x * s + z * c];
  return [x * c - y * s, x * s + y * c, z];
}
function drawSolving(ctx: CanvasRenderingContext2D, t: number) {
  const { p, sinceSolved } = moveProgress(t);
  const pulse = sinceSolved >= 0 && sinceSolved < 1.1 ? Math.sin((sinceSolved / 1.1) * Math.PI) : 0;
  const cx = 32, cy = 32, R = 32 * 0.82 * (1 + 0.025 * pulse);
  const spin = t * 0.22, tilt = 0.35;
  const cs = Math.cos(spin), ss = Math.sin(spin), ct = Math.cos(tilt), st = Math.sin(tilt);
  const dots: OrbDot[] = [];
  for (const base of SOLVE_POINTS) {
    let v = base, active = false;
    for (let i = 0; i < MOVES.length; i++) {
      if (p[i] <= 0) continue;
      const m = MOVES[i];
      if (v[m.axis] >= m.lo && v[m.axis] <= m.hi) { v = rotate(v, m.axis, m.turn * p[i]); if (p[i] < 1) active = true; }
    }
    const x1 = v[0] * cs + v[2] * ss, z1 = -v[0] * ss + v[2] * cs;
    const y2 = v[1] * ct - z1 * st, z2 = v[1] * st + z1 * ct;
    const depth = (z2 + 1) / 2;
    dots.push({
      x: cx + R * x1, y: cy + R * y2, z: z2,
      r: (0.16 + 0.42 * depth + (active ? 0.12 : 0)) * (1 + 0.35 * pulse * depth),
      a: 0.18 + 0.82 * Math.pow(depth, 1.3),
    });
  }
  paint(ctx, dots, (d) => d.a);
}

/**
 * Paint one orb into a 64×64 user-space box on ctx (set the transform first).
 * `clock` is seconds; `rate` slows the belt and library orbs (scan and solve run on their own timing).
 */
export function drawOrb(ctx: CanvasRenderingContext2D, state: OrbState, clock: number, rate: number, reduce: boolean) {
  if (state === 'solving') return drawSolving(ctx, reduce ? SOLVE_CYCLE - 1 : clock);
  if (state === 'searching') return drawScan(ctx, reduce ? 1.2 : clock);
  const pr = resolvePreset(state, 64);
  if (state === 'composing') return drawBelt(ctx, (reduce ? 2 : clock) * rate, pr.opts as BeltOpts);
  MODE_DRAWS[pr.mode](ctx, 64, (reduce ? 2 : clock) * rate, false, pr.opts);
}
