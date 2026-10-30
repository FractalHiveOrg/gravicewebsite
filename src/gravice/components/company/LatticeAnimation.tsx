'use client';

import { useEffect, useMemo, useRef } from 'react';
import { prefersReducedMotion, startLoop } from '../../engine/core';
import { drawLattice, makeLatticePoints } from '../../engine/lattice';

/**
 * About page, "The name": the gravity + lattice card, drawn as the settled lattice (not scroll-linked).
 * Desktop uses 19 × 7 points; pass cols/rows (e.g. 9 × 6) for small screens.
 */
export function LatticeAnimation({ height = 300, cols = 19, rows = 7, beforeLabel = 'Manual work', afterLabel = 'With Gravice', className }: {
  height?: number; cols?: number; rows?: number; beforeLabel?: string; afterLabel?: string; className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const pts = useMemo(() => makeLatticePoints(cols, rows), [cols, rows]);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext('2d'); if (!ctx) return;
    const reduce = prefersReducedMotion();
    const paint = (t: number) => {
      const r = cv.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      const d = Math.min(2, devicePixelRatio || 1);
      if (cv.width !== Math.round(r.width * d)) { cv.width = Math.round(r.width * d); cv.height = Math.round(r.height * d); }
      ctx.setTransform(d, 0, 0, d, 0, 0);
      drawLattice(ctx, pts, cols, rows, r.width, r.height, 1, t, reduce);
    };
    if (reduce) { paint(2); const on = () => paint(2); addEventListener('resize', on); return () => removeEventListener('resize', on); }
    return startLoop(paint);
  }, [pts, cols, rows]);
  return (
    <div className={['gv-lattice', className].filter(Boolean).join(' ')} aria-hidden="true" style={{ height }}>
      <canvas ref={ref} />
      <span className="gv-shift-tag gv-shift-l">{beforeLabel}</span>
      <span className="gv-shift-tag gv-shift-r">{afterLabel}</span>
    </div>
  );
}
