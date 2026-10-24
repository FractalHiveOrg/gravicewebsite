"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { MODE_DRAWS, resolvePreset } from "thinking-orbs/engine";

/**
 * Gravice product orbs, built on the thinking-orbs engine (MIT, Jakub Antalik).
 * npm install thinking-orbs
 *
 * Each product has its own orb, drawn large, tinted Gravice blue, slowed to one
 * calm shared speed, with the orange Gravice core showing through the centre.
 *   ElevateRM → "connecting": a network of relationships wiring itself
 *   V-track   → "searching":  a scan line sweeping a dotted globe (the collateral book)
 *   NICO      → "solving":    scrambled bands clicking back into order
 */
export type GraviceProduct = 'elevaterm' | 'vtrack' | 'nico';

const PRODUCT_STATE = {
  elevaterm: 'connecting',
  vtrack: 'searching',
  nico: 'solving',
} as const;

const LABEL: Record<GraviceProduct, string> = {
  elevaterm: 'ElevateRM',
  vtrack: 'V-track',
  nico: 'NICO',
};

export interface ProductOrbProps {
  product: GraviceProduct;
  /** Rendered size in CSS px (square). Default 400 */
  size?: number;
  /** Dot colour. Default Gravice blue */
  color?: string;
  /** Core colour. Default Gravice orange */
  coreColor?: string;
  /** Show the orange core in the centre. Default true */
  showCore?: boolean;
  /**
   * Animation clock rate. The library's own rates are tuned for a 64px icon
   * (solving 1.82, connecting 3.3, searching ~1.6); at large sizes 0.6 reads calmly. Default 0.6
   */
  speed?: number;
  /** Freeze on the current frame. */
  paused?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function ProductOrb({
  product,
  size = 400,
  color = '#3E5F93',
  coreColor = '#F26B2F',
  showCore = true,
  speed = 0.6,
  paused = false,
  className,
  style,
}: ProductOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const d = Math.min(2, window.devicePixelRatio || 1);
    const px = Math.round(size * d);
    canvas.width = px; canvas.height = px;

    // the engine paints in a single ink; draw it offscreen, then recolour it
    const tint = document.createElement('canvas');
    tint.width = px; tint.height = px;
    const tctx = tint.getContext('2d');
    if (!tctx) return;
    const preset = resolvePreset(PRODUCT_STATE[product], 64);
    const draw = MODE_DRAWS[preset.mode];

    // core sizing matches the website: ~4% of the orb box, with a soft glow
    const coreR = size * 0.042;

    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);

    let raf = 0, clock = 2, last = performance.now();
    const paint = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, px, px);
      ctx.setTransform(d, 0, 0, d, 0, 0);
      if (showCore) {
        const c = size / 2, gr = coreR * 3.6;
        const g = ctx.createRadialGradient(c, c, 0, c, c, gr);
        g.addColorStop(0, hexA(coreColor, 0.35));
        g.addColorStop(1, hexA(coreColor, 0));
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(c, c, gr, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = coreColor; ctx.beginPath(); ctx.arc(c, c, coreR, 0, Math.PI * 2); ctx.fill();
      }
      tctx.setTransform(1, 0, 0, 1, 0, 0);
      tctx.globalCompositeOperation = 'source-over';
      tctx.clearRect(0, 0, px, px);
      const sc = px / 64;
      tctx.setTransform(sc, 0, 0, sc, 0, 0);
      draw(tctx, 64, clock * speed, false, preset.opts);
      tctx.setTransform(1, 0, 0, 1, 0, 0);
      tctx.globalCompositeOperation = 'source-in';
      tctx.fillStyle = color;
      tctx.fillRect(0, 0, px, px);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(tint, 0, 0);
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(50, now - last); last = now;
      if (!visible || document.hidden || pausedRef.current) return;
      clock += dt / 1000;
      paint();
    };
    paint();
    if (!reduce) raf = requestAnimationFrame(frame);

    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [product, size, color, coreColor, showCore, speed]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={`${LABEL[product]} orb`}
      className={className}
      style={{ display: 'block', width: size, height: size, maxWidth: '100%', ...style }}
    />
  );
}

/** `#rrggbb` (or `#rgb`) plus alpha → rgba() string. */
function hexA(hex: string, a: number) {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

type Named = Omit<ProductOrbProps, 'product'>;
export const ElevateRMOrb = (p: Named) => <ProductOrb product="elevaterm" {...p} />;
export const VTrackOrb = (p: Named) => <ProductOrb product="vtrack" {...p} />;
export const NicoOrb = (p: Named) => <ProductOrb product="nico" {...p} />;

export default ProductOrb;
