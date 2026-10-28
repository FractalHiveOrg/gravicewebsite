/**
 * "The shift" animations from the product pages (section 2, before → after).
 * Each painter draws one frame for a scroll progress p (0 = scattered "Today", 1 = ordered "With …").
 * All three share the same layout: chaos on the left, the breathing core in the middle, order on the right.
 */
import { drawCore } from './core';

const INK = '#3E5F93';

export type ShiftVariant = 'elevaterm' | 'vtrack' | 'nico';
type Pt = { x: number; y: number; ph: number; row: number; k: number; flag: boolean };

/** Random layout for a variant. Create once per mount so dots don't jump between frames. */
export function makeShiftPoints(variant: ShiftVariant): Pt[] {
  if (variant === 'elevaterm') // 70 dots → 4 pipeline lanes
    return [...Array(70)].map((_, i) => ({ x: Math.random(), y: Math.random(), ph: Math.random() * 6.28, row: i % 4, k: Math.floor(i / 4), flag: false }));
  if (variant === 'vtrack') // 72 assets → 4 rows of the collateral book; ~22% start overdue (orange)
    return [...Array(72)].map((_, i) => ({ x: Math.random(), y: Math.random(), ph: Math.random() * 6.28, row: i % 4, k: Math.floor(i / 4), flag: Math.random() < 0.22 }));
  // nico: 66 documents → 3 status lanes; every 11th lands in "Needs attention"
  const pts = [...Array(66)].map((_, i) => { const att = i % 11 === 3; return { x: Math.random(), y: Math.random(), ph: Math.random() * 6.28, row: att ? 2 : i % 2, k: 0, flag: att }; });
  const c = [0, 0, 0]; for (const q of pts) q.k = c[q.row]++;
  return pts;
}

export const NICO_LANES = ['Ready to export', 'Ready for review', 'Needs attention'];

/**
 * @param W,H  canvas size in CSS px
 * @param p    scroll progress 0…1 (already eased)
 * @param t    clock in seconds (for drift, scan line and core breathing)
 */
export function drawShift(ctx: CanvasRenderingContext2D, variant: ShiftVariant, pts: Pt[], W: number, H: number, p: number, t: number, reduceMotion = false) {
  ctx.clearRect(0, 0, W, H);
  const drift = (q: Pt) => [W * (0.04 + q.x * (variant === 'nico' ? 0.38 : 0.42)) + Math.sin(t * 0.8 + q.ph) * 6, 40 + (H - 60) * q.y + Math.cos(t * 0.7 + q.ph) * 6];

  if (variant === 'elevaterm') {
    const lx0 = W * 0.56, lw = W * 0.4, laneH = (H - 70) / 4;
    ctx.globalAlpha = 0.25 * p; ctx.strokeStyle = INK; ctx.setLineDash([3, 5]);
    for (let l = 0; l < 4; l++) { const y = 48 + laneH * (l + 0.5); ctx.beginPath(); ctx.moveTo(lx0, y); ctx.lineTo(lx0 + lw, y); ctx.stroke(); }
    ctx.setLineDash([]);
    for (const q of pts) {
      const [sx, sy] = drift(q), tx = lx0 + (q.k + 0.5) * (lw / 18), ty = 48 + laneH * (q.row + 0.5);
      const x = sx + (tx - sx) * p, y = sy + (ty - sy) * p;
      ctx.globalAlpha = 0.35 + 0.55 * p; ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(x, y, 2.6 + 1.2 * p, 0, Math.PI * 2); ctx.fill();
    }
  } else if (variant === 'vtrack') {
    const gx0 = W * 0.56, gw = W * 0.4, rowH = (H - 70) / 4, cw = gw / 18;
    const scanX = gx0 + ((t * 0.18) % 1) * gw;
    if (p > 0.05) {
      const g = ctx.createLinearGradient(scanX - 60, 0, scanX, 0);
      g.addColorStop(0, 'rgba(62,95,147,0)'); g.addColorStop(1, `rgba(62,95,147,${(0.14 * p).toFixed(3)})`);
      ctx.fillStyle = g; ctx.fillRect(scanX - 60, 38, 60, H - 58);
      ctx.globalAlpha = 0.55 * p; ctx.strokeStyle = INK; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(scanX, 38); ctx.lineTo(scanX, H - 20); ctx.stroke();
    }
    for (const q of pts) {
      const [sx, sy] = drift(q), tx = gx0 + (q.k + 0.5) * cw, ty = 48 + rowH * (q.row + 0.5);
      const x = sx + (tx - sx) * p, y = sy + (ty - sy) * p;
      const lit = p > 0.6 ? Math.exp(-Math.pow((x - scanX) / 14, 2)) : 0, late = q.flag && p < 0.85;
      ctx.globalAlpha = late ? 0.9 : 0.35 + 0.55 * p; ctx.fillStyle = late ? '#F26B2F' : INK;
      ctx.beginPath(); ctx.arc(x, y, 2.6 + 1.2 * p + 1.6 * lit, 0, Math.PI * 2); ctx.fill();
    }
  } else {
    const gx0 = W * 0.66, gw = W * 0.3, laneH = (H - 70) / 3;
    const cw = gw / Math.max(16, ...[0, 1, 2].map((l) => pts.filter((q) => q.row === l).length));
    ctx.globalAlpha = 0.85 * p; ctx.font = '500 11px Inter, system-ui, sans-serif'; ctx.textBaseline = 'middle'; ctx.textAlign = 'right';
    NICO_LANES.forEach((l, i) => { ctx.fillStyle = i === 2 ? '#B4501F' : '#5B6678'; ctx.fillText(l, gx0 - 14, 48 + laneH * (i + 0.5)); });
    const mx = W * 0.5, my = H * 0.55;
    for (const q of pts) {
      const [sx, sy] = drift(q), tx = gx0 + (q.k + 0.5) * cw, ty = 48 + laneH * (q.row + 0.5), u = p;
      // documents route through the core on their way to a lane
      const x = (1 - u) * (1 - u) * sx + 2 * u * (1 - u) * mx + u * u * tx, y = (1 - u) * (1 - u) * sy + 2 * u * (1 - u) * my + u * u * ty;
      const w = 4 + 2 * p, h = 5.5 + 1.5 * p, hot = q.flag && p > 0.6;
      ctx.globalAlpha = hot ? 0.95 : 0.35 + 0.55 * p; ctx.fillStyle = hot ? '#F26B2F' : INK;
      ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(x - w / 2, y - h / 2, w, h, 1.2); else ctx.rect(x - w / 2, y - h / 2, w, h); ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
  drawCore(ctx, W * 0.5, H * 0.55, 7, t, { reduceMotion });
}
