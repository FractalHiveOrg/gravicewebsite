/**
 * ElevateRM "composing" orb, re-oriented as a belt around the core.
 * Based on the thinking-orbs `composing` state (MIT © Jakub Antalik), rebuilt so the
 * band lies flat around the equator, like a ring around a planet: the orange core sits
 * in the middle, and the sine wave lifts and drops the dots, so they move up and down.
 *
 * Draws in the same 64 × 64 unit space as the thinking-orbs painters. Ink colour is
 * whatever the caller tints with afterwards (or pass `color`).
 */
import type { ModeOpts } from 'thinking-orbs/engine';

const TILT = 0.3;   // camera looks slightly down onto the belt
const SPIN = 0.12;  // slow turn of the belt around the vertical axis

export function drawBelt(ctx: CanvasRenderingContext2D, t: number, o: ModeOpts, color?: string) {
  const size = 64, cx = 32, cy = 32, R = (size / 2) * 0.78;
  const rs = Math.pow(size / 300, o.rsPow ?? 0.6);
  const st = Math.sin(TILT), ct = Math.cos(TILT);
  const view = (x: number, y: number, z: number): [number, number, number] => {
    const y1 = y * ct - z * st, z2 = y * st + z * ct;
    return [cx + x, cy - y1, z2];
  };
  const dots: { x: number; y: number; z: number; r: number; w: number; a: number }[] = [];

  // faint ghost sphere behind the belt
  const ghostN = o.ghostN ?? 150;
  for (let i = 0; i < ghostN; i++) {
    const yy = 1 - (2 * (i + 0.5)) / ghostN, r = Math.sqrt(1 - yy * yy), th = i * 2.399963;
    const [px, py, z] = view(Math.cos(th) * r * R, yy * R, Math.sin(th) * r * R);
    const depth = (z / R + 1) / 2;
    dots.push({ x: px, y: py, z, r: 0.8 * rs, w: 0.78, a: 0.1 + 0.22 * depth });
  }

  // the belt: lanes stacked vertically, running around the equator; the wave moves along it
  const ya = t * SPIN;
  const ux = Math.cos(ya), uz = Math.sin(ya);          // in-plane axis 1 (horizontal)
  const vx = -uz, vz = ux;                             // in-plane axis 2 (horizontal)
  const wm = o.wobMul ?? 1;
  const lanes = Math.max(1, Math.round((o.lanes ?? 5) * (o.bandMul ?? 1)));
  const segs = o.segs ?? 88;
  for (let w = 0; w < lanes; w++) {
    const laneOff = (w - (lanes - 1) / 2) * 0.075;
    const edge = Math.abs(w - (lanes - 1) / 2) / Math.max(1, (lanes - 1) / 2);
    for (let k = 0; k < segs; k++) {
      const a = (k / segs) * Math.PI * 2;
      const wob = (0.16 * Math.sin(a * 3 - t * 1.7 + w * 0.22) + 0.07 * Math.sin(a * 5 + t * 1.1)) * wm;
      const off = laneOff + wob; // vertical: the sine wave lifts and drops the dots
      const x = ux * Math.cos(a) + vx * Math.sin(a), y = off, z = uz * Math.cos(a) + vz * Math.sin(a);
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
  dots.sort((p, q) => p.z - q.z);
  if (color) ctx.fillStyle = color;
  const rMin = o.rMin ?? 0.3;
  for (const d of dots) {
    // lighter ink in the library becomes lower opacity here, so the tint keeps the depth
    ctx.globalAlpha = Math.max(0, Math.min(1, d.a * (1 - 0.8 * Math.max(0, Math.min(1, d.w)))));
    ctx.beginPath(); ctx.arc(d.x, d.y, Math.max(rMin, d.r), 0, Math.PI * 2); ctx.fill();
  }
  ctx.globalAlpha = 1;
}
