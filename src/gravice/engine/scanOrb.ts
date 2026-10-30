/**
 * V-Track "searching" orb, recreated.
 * Based on the thinking-orbs `searching` state (MIT © Jakub Antalik), rebuilt for large sizes:
 * a dotted globe of latitude rings turns slowly while a scan line sweeps across it.
 * Dots light up as the line passes and stay a little brighter for a moment afterwards,
 * so you can see what has just been checked, like V-Track going through the collateral book.
 *
 * Draws in the same 64 × 64 unit space as the thinking-orbs painters. Ink colour is
 * whatever the caller tints with afterwards (or pass `color`).
 */

const SPIN = 0.2;        // globe turn, radians per second
const SWEEP = 1.9;       // scan line speed, radians per second (one sweep ≈ 3.3s)
const RINGS = 17;
const DENSITY = 44;

const POINTS: [number, number][] = (() => {
  const pts: [number, number][] = [];
  for (let li = 0; li <= RINGS; li++) {
    const lat = -Math.PI / 2 + (li / RINGS) * Math.PI;
    const n = Math.max(1, Math.round(Math.abs(Math.cos(lat)) * DENSITY));
    for (let j = 0; j < n; j++) pts.push([lat, (j / n) * Math.PI * 2]);
  }
  return pts;
})();

/** Signed angle a − b, wrapped to (−π, π]. */
function angleDelta(a: number, b: number) {
  let d = (a - b) % (Math.PI * 2);
  if (d > Math.PI) d -= Math.PI * 2;
  if (d <= -Math.PI) d += Math.PI * 2;
  return d;
}

export function drawScan(ctx: CanvasRenderingContext2D, t: number, color?: string) {
  const cx = 32, cy = 32, R = 32 * 0.82;
  const yaw = t * SPIN, tilt = 0.4 + 0.06 * Math.sin(t * 0.35);
  const cyw = Math.cos(yaw), syw = Math.sin(yaw), ct = Math.cos(tilt), st = Math.sin(tilt);
  const scan = t * (SPIN + SWEEP);
  const dots: { x: number; y: number; z: number; r: number; a: number }[] = [];
  for (const [lat, lon] of POINTS) {
    const cl = Math.cos(lat), x = cl * Math.cos(lon), y = Math.sin(lat), z = cl * Math.sin(lon);
    const x1 = x * cyw + z * syw, z1 = -x * syw + z * cyw;
    const y1 = y * ct - z1 * st, z2 = y * st + z1 * ct;
    const depth = (z2 + 1) / 2;
    // d > 0: the line is still coming; d < 0: it has just passed
    const d = angleDelta(scan, lon + yaw);
    const front = Math.max(0, z2);
    const lead = Math.exp(-(d * d) / 0.035) * front;               // the scan line itself
    const trail = d < 0 ? Math.exp(d / 0.55) * 0.55 * front : 0;    // fading afterglow
    const lit = Math.min(1, lead + trail);
    dots.push({
      x: cx + R * x1, y: cy - R * y1, z: z2,
      r: 0.17 + 0.42 * depth + 0.3 * lead + 0.08 * trail,
      a: Math.min(1, (0.16 + 0.5 * Math.pow(depth, 1.4)) * (1 - 0.55 * lit) + lit),
    });
  }
  dots.sort((p, q) => p.z - q.z);
  if (color) ctx.fillStyle = color;
  for (const p of dots) {
    ctx.globalAlpha = p.a;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
  }
  ctx.globalAlpha = 1;
}
