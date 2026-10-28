/**
 * NICO "solving" orb, rebuilt so the solve is unmistakable.
 * Inspired by the thinking-orbs `solving` state (MIT © Jakub Antalik), redrawn from scratch.
 *
 * A dotted sphere of latitude rings behaves like a puzzle cube:
 *   scramble  six slab turns twist the sphere out of order
 *   pause     it sits scrambled for a beat
 *   solve     the same turns run backwards, one by one, and click into place
 *   solved    it rests as clean, ordered rings; a soft pulse runs through the dots
 *             the moment it is solved, and it holds long enough to read as "done"
 *
 * Draws in a 64 × 64 unit space, the same space as the thinking-orbs painters,
 * so it can be scaled to any size with ctx.setTransform. Ink colour is whatever
 * fillStyle the caller tints with afterwards (or pass `color`).
 */

type V3 = [number, number, number];
interface Move { axis: 0 | 1 | 2; lo: number; hi: number; turn: number }

const MOVES: Move[] = [
  { axis: 1, lo: 0.34, hi: 1.01, turn: Math.PI / 2 },
  { axis: 0, lo: -1.01, hi: -0.34, turn: -Math.PI / 2 },
  { axis: 2, lo: -0.33, hi: 0.33, turn: Math.PI / 2 },
  { axis: 1, lo: -1.01, hi: -0.34, turn: -Math.PI / 2 },
  { axis: 0, lo: 0.34, hi: 1.01, turn: Math.PI / 2 },
  { axis: 2, lo: 0.34, hi: 1.01, turn: -Math.PI / 2 },
];

// timing, in seconds
const TURN = 0.42;                          // one slab turn
const T_SCRAMBLE = MOVES.length * TURN;     // 2.52
const T_PAUSE = 0.55;
const T_SOLVE = MOVES.length * 0.36;        // solving is a touch quicker: 2.16
const T_SOLVED = 2.4;                       // the solved hold
export const SOLVE_CYCLE = T_SCRAMBLE + T_PAUSE + T_SOLVE + T_SOLVED;

/** Base points: latitude rings, like the library's orb. */
const POINTS: V3[] = (() => {
  const pts: V3[] = [], rings = 16, density = 44;
  for (let li = 0; li <= rings; li++) {
    const lat = -Math.PI / 2 + (li / rings) * Math.PI;
    const c = Math.cos(lat), s = Math.sin(lat);
    const n = Math.max(1, Math.round(Math.abs(c) * density));
    for (let j = 0; j < n; j++) {
      const lon = (j / n) * Math.PI * 2;
      pts.push([c * Math.cos(lon), s, c * Math.sin(lon)]);
    }
  }
  return pts;
})();

const ease = (u: number) => (u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2);

/** Progress (0..1) of every move at time t in the cycle, plus the moment the solve completed. */
function moveProgress(t: number): { p: number[]; sinceSolved: number } {
  const c = ((t % SOLVE_CYCLE) + SOLVE_CYCLE) % SOLVE_CYCLE;
  const N = MOVES.length, p = new Array(N).fill(0);
  if (c < T_SCRAMBLE) {
    for (let i = 0; i < N; i++) p[i] = ease(Math.min(1, Math.max(0, (c - i * TURN) / TURN)));
    return { p, sinceSolved: -1 };
  }
  if (c < T_SCRAMBLE + T_PAUSE) return { p: p.fill(1), sinceSolved: -1 };
  const cs = c - T_SCRAMBLE - T_PAUSE, step = T_SOLVE / N;
  if (cs < T_SOLVE) {
    // undo the moves in reverse order
    for (let i = 0; i < N; i++) {
      const k = N - 1 - i; // move k is undone during slot i
      p[k] = 1 - ease(Math.min(1, Math.max(0, (cs - i * step) / step)));
    }
    return { p, sinceSolved: -1 };
  }
  return { p, sinceSolved: cs - T_SOLVE };
}

function rotate(v: V3, axis: 0 | 1 | 2, a: number): V3 {
  const c = Math.cos(a), s = Math.sin(a), [x, y, z] = v;
  if (axis === 0) return [x, y * c - z * s, y * s + z * c];
  if (axis === 1) return [x * c + z * s, y, -x * s + z * c];
  return [x * c - y * s, x * s + y * c, z];
}

export function drawSolving(ctx: CanvasRenderingContext2D, t: number, color?: string) {
  const { p, sinceSolved } = moveProgress(t);
  // a gentle pulse runs outward through the dots the moment the sphere is solved
  const pulse = sinceSolved >= 0 && sinceSolved < 1.1 ? Math.sin((sinceSolved / 1.1) * Math.PI) : 0;
  const cx = 32, cy = 32, R = 32 * 0.82 * (1 + 0.025 * pulse);
  const spin = t * 0.22, tilt = 0.35;
  const cs = Math.cos(spin), ss = Math.sin(spin), ct = Math.cos(tilt), st = Math.sin(tilt);
  const dots: { x: number; y: number; z: number; r: number; a: number }[] = [];
  for (const base of POINTS) {
    let v = base, active = false;
    for (let i = 0; i < MOVES.length; i++) {
      if (p[i] <= 0) continue;
      const m = MOVES[i];
      if (v[m.axis] >= m.lo && v[m.axis] <= m.hi) {
        v = rotate(v, m.axis, m.turn * p[i]);
        if (p[i] < 1) active = true;
      }
    }
    // view: slow spin about the vertical axis, slight tilt toward the viewer
    const x1 = v[0] * cs + v[2] * ss, z1 = -v[0] * ss + v[2] * cs;
    const y2 = v[1] * ct - z1 * st, z2 = v[1] * st + z1 * ct;
    const depth = (z2 + 1) / 2;
    dots.push({
      x: cx + R * x1, y: cy + R * y2, z: z2,
      r: (0.16 + 0.42 * depth + (active ? 0.12 : 0)) * (1 + 0.35 * pulse * depth),
      a: 0.18 + 0.82 * Math.pow(depth, 1.3),
    });
  }
  dots.sort((a, b) => a.z - b.z);
  if (color) ctx.fillStyle = color;
  for (const d of dots) {
    ctx.globalAlpha = d.a;
    ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.fill();
  }
  ctx.globalAlpha = 1;
}
