'use client';

import { useEffect, useMemo, useRef } from 'react';
import { clamp, ease, prefersReducedMotion, startLoop } from '../../engine/core';
import { drawShift, makeShiftPoints, type ShiftVariant } from '../../engine/shift';

/**
 * Product page, section 2 ("Where it breaks → What changes").
 * A white card with a canvas: scattered dots on the left resolve into order on the right as the card scrolls into view.
 *   elevaterm: dots → 4 pipeline lanes
 *   vtrack:    assets (some overdue, orange) → collateral book rows, with a scan line keeping them current
 *   nico:      documents → read through the core → Ready to export / Ready for review / Needs attention
 * Fully scroll-linked, so it reverses on scroll up. Reduced motion shows the finished state.
 */
export interface ShiftAnimationProps {
  variant: ShiftVariant;
  /** Left label. Default "Today" */
  beforeLabel?: string;
  /** Right label. Default "With ElevateRM" / "With V-Track" / "With NICO" */
  afterLabel?: string;
  /** Card height in px. Default 220 */
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

const AFTER: Record<ShiftVariant, string> = { elevaterm: 'With ElevateRM', vtrack: 'With V-Track', nico: 'With NICO' };

export function ShiftAnimation({ variant, beforeLabel = 'Today', afterLabel, height = 220, className, style }: ShiftAnimationProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const pts = useMemo(() => makeShiftPoints(variant), [variant]);

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
      // p: 0 when the card enters at 85% of the viewport, 1 after scrolling another 60% of the viewport
      const p = reduce ? 1 : ease(clamp((innerHeight * 0.85 - r.top) / (innerHeight * 0.6)));
      drawShift(ctx, variant, pts, r.width, r.height, p, t, reduce);
    };
    if (reduce) { paint(2); const on = () => paint(2); addEventListener('resize', on); return () => removeEventListener('resize', on); }
    return startLoop(paint);
  }, [variant, pts]);

  return (
    <div className={['gv-shift', className].filter(Boolean).join(' ')} aria-hidden="true" style={{ height, ...style }}>
      <canvas ref={ref} />
      <span className="gv-shift-tag gv-shift-l">{beforeLabel}</span>
      <span className="gv-shift-tag gv-shift-r">{afterLabel ?? AFTER[variant]}</span>
    </div>
  );
}
