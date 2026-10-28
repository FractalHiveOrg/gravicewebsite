'use client';

import { useEffect, useRef } from 'react';
import { drawSolving, SOLVE_CYCLE } from '../engine/solvingOrb';
import { drawBelt } from '../engine/beltOrb';
import { drawScan } from '../engine/scanOrb';
import { drawCore, prefersReducedMotion, startLoop } from '../engine/core';

/**
 * Gravice product orbs, as used on the homepage story and on each product page
 * (hero, closing, "Also from Gravice" cards).
 *   ElevateRM → belt orb   (engine/beltOrb.ts): a belt of dots around the core; the wave moves them up and down
 *   V-track   → scan orb   (engine/scanOrb.ts): a scan line sweeps the globe and leaves an afterglow
 *   NICO      → solving orb (engine/solvingOrb.ts): scramble, pause, click back into order, hold
 * The orange core sits at the centre and breathes.
 *
 * The orbs build on thinking-orbs by Jakub Antalik (MIT).
 */
export type GraviceProduct = 'elevaterm' | 'vtrack' | 'nico';

/** Belt settings tuned for large sizes (do not change without checking ElevateRM visually). */
export const BELT_OPTS = { lanes: 3, segs: 44, ghostN: 38, rBase: 0.935, rDepth: 1.445, rsPow: 0.6, rMin: 0.3, bandMul: 3.9, wobMul: 1 };

const LABEL: Record<GraviceProduct, string> = { elevaterm: 'ElevateRM', vtrack: 'V-track', nico: 'NICO' };

export interface ProductOrbProps {
  product: GraviceProduct;
  /** Rendered size in CSS px (square). Omit to fill the parent's width (keep the parent square). */
  size?: number;
  /** 'dark' = on navy (#4A6FA5 dots), 'light' = on cream/white (#3E5F93 dots). Default 'dark' */
  tone?: 'dark' | 'light';
  /** Override the dot colour. */
  color?: string;
  /** Show the orange core. Default true */
  showCore?: boolean;
  /** Core radius as a fraction of the orb size. Default 0.045 for ElevateRM, 0.06 otherwise (matches the prototypes). */
  coreScale?: number;
  /** Freeze on the current frame. */
  paused?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function ProductOrb({ product, size, tone = 'dark', color, showCore = true, coreScale, paused = false, className, style }: ProductOrbProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  useEffect(() => { pausedRef.current = paused; }, [paused]);

  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext('2d'); if (!ctx) return;
    const tint = document.createElement('canvas'); const tc = tint.getContext('2d'); if (!tc) return;
    const reduce = prefersReducedMotion();
    const ink = color ?? (tone === 'dark' ? '#4A6FA5' : '#3E5F93');
    const cs = coreScale ?? (product === 'elevaterm' ? 0.045 : 0.06);
    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }); io.observe(cv);

    const paint = (t: number) => {
      const d = Math.min(2, window.devicePixelRatio || 1), w = cv.getBoundingClientRect().width || size || 0, px = Math.max(1, Math.round(w * d));
      if (cv.width !== px || cv.height !== px) { cv.width = cv.height = px; }
      if (tint.width !== px || tint.height !== px) { tint.width = tint.height = px; }
      tc.setTransform(1, 0, 0, 1, 0, 0); tc.globalCompositeOperation = 'source-over'; tc.clearRect(0, 0, px, px);
      tc.setTransform(px / 64, 0, 0, px / 64, 0, 0);
      if (product === 'elevaterm') drawBelt(tc, t * 0.6, BELT_OPTS);
      else if (product === 'vtrack') drawScan(tc, t);
      else drawSolving(tc, reduce ? SOLVE_CYCLE - 1 : t);
      tc.setTransform(1, 0, 0, 1, 0, 0); tc.globalCompositeOperation = 'source-in'; tc.fillStyle = ink; tc.fillRect(0, 0, px, px);
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, px, px);
      if (showCore) drawCore(ctx, px / 2, px / 2, px * cs, t, { reduceMotion: reduce });
      ctx.drawImage(tint, 0, 0);
    };
    paint(2);
    if (reduce) return () => io.disconnect();
    const stop = startLoop((t) => { if (visible && !pausedRef.current) paint(t + 2); });
    return () => { stop(); io.disconnect(); };
  }, [product, size, tone, color, showCore, coreScale]);

  return (
    <canvas ref={ref} role="img" aria-label={`${LABEL[product]} orb`} className={className}
      style={{ display: 'block', width: size ?? '100%', height: size ?? 'auto', aspectRatio: '1', maxWidth: '100%', ...style }} />
  );
}

type Named = Omit<ProductOrbProps, 'product'>;
export const ElevateRMOrb = (p: Named) => <ProductOrb product="elevaterm" {...p} />;
export const VTrackOrb = (p: Named) => <ProductOrb product="vtrack" {...p} />;
export const NicoOrb = (p: Named) => <ProductOrb product="nico" {...p} />;

export default ProductOrb;
