/**
 * About page, "The name": scattered dots are pulled by the orange core into a connected lattice
 * (gravity + lattice) as the card scrolls into view. Painter only; see components/company/LatticeAnimation.tsx.
 */
import { drawCore } from './core';

const INK = '#3E5F93';
export type LatticePoint = { c: number; r: number; x: number; y: number; ph: number };

export function makeLatticePoints(cols = 19, rows = 7): LatticePoint[] {
  const pts: LatticePoint[] = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) pts.push({ c, r, x: Math.random(), y: Math.random(), ph: Math.random() * 6.28 });
  return pts;
}

/** p: scroll progress 0…1 (eased). t: clock in seconds. */
export function drawLattice(ctx: CanvasRenderingContext2D, pts: LatticePoint[], cols: number, rows: number, W: number, H: number, p: number, t: number, reduceMotion = false) {
  ctx.clearRect(0, 0, W, H);
  const gx = W * 0.12, gw = W * 0.76, gy = 58, gh = H - 96, cw = gw / (cols - 1), rh = gh / (rows - 1), cx = W / 2, cy = gy + gh / 2;
  const P = pts.map((q) => {
    const sx = W * q.x + Math.sin(t * 0.7 + q.ph) * 8, sy = 40 + (H - 60) * q.y + Math.cos(t * 0.6 + q.ph) * 8;
    const tx = gx + q.c * cw, ty = gy + q.r * rh;
    return [sx + (tx - sx) * p, sy + (ty - sy) * p] as const;
  });
  if (p > 0.4) { // the lattice lines appear as the dots arrive
    ctx.strokeStyle = INK; ctx.lineWidth = 1; ctx.globalAlpha = ((p - 0.4) / 0.6) * 0.22; ctx.beginPath();
    pts.forEach((q, i) => {
      const [x, y] = P[i];
      if (q.c < cols - 1) { const [x2, y2] = P[i + 1]; ctx.moveTo(x, y); ctx.lineTo(x2, y2); }
      if (q.r < rows - 1) { const [x3, y3] = P[i + cols]; ctx.moveTo(x, y); ctx.lineTo(x3, y3); }
    });
    ctx.stroke();
  }
  ctx.fillStyle = INK;
  for (const [x, y] of P) { ctx.globalAlpha = 0.35 + 0.55 * p; ctx.beginPath(); ctx.arc(x, y, 2.4 + p, 0, Math.PI * 2); ctx.fill(); }
  ctx.globalAlpha = 1;
  drawCore(ctx, cx, cy, 9, t, { reduceMotion });
}
