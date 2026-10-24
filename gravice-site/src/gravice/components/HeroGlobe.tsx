import { useEffect, useRef } from 'react';

/**
 * Gravice hero animation.
 * Scattered dots drift, get pulled into the orange core (glow), burst outward,
 * then lock into the rotating dot globe with the core inside it.
 * After the intro the core can follow the cursor while it is over the canvas.
 *
 * The canvas fills its parent, so give the parent a size (for example a square
 * div, or the whole hero so the dots scatter across it before the globe forms).
 */
export interface HeroGlobeProps {
  /** Globe radius as a fraction of the smaller side of the canvas. Default 0.42 */
  globeScale?: number;
  /** Dot colour. Default Gravice blue */
  dotColor?: string;
  /** Core colour. Default Gravice orange */
  coreColor?: string;
  /** Play the scatter → glow → burst → globe intro. Default true */
  playIntro?: boolean;
  /** Core follows the mouse over the canvas after the intro. Default true */
  followCursor?: boolean;
  /** Globe rotation speed in radians per second. Default 0.28 */
  rotationSpeed?: number;
  /** Called once the globe has formed (good moment to reveal the headline). */
  onIntroComplete?: () => void;
  /** Change this value to replay the intro. */
  replayKey?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

const T_CONV = 0.8;   // core appears, dots start to fall in
const T_BURST = 1.9;  // dots burst out of the core
const T_FORMED = 3.0; // globe has formed
const T_DONE = 3.9;   // cursor follow becomes available
const TILT = -0.32;

type Dot = {
  x: number; y: number; vx: number; vy: number;
  s: number; a: number; sq: number; ang: number; z: number;
  ox: number; oy: number;
};

/** Latitude/longitude grid, matching the Gravice logo. 13 rings × 24 = 312 dots. */
const SPHERE: [number, number, number][] = (() => {
  const v: [number, number, number][] = [];
  for (let la = -72; la <= 72; la += 12)
    for (let lo = 0; lo < 360; lo += 15) {
      const a = (la * Math.PI) / 180, o = (lo * Math.PI) / 180;
      v.push([Math.cos(a) * Math.sin(o), Math.sin(a), Math.cos(a) * Math.cos(o)]);
    }
  return v;
})();

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function HeroGlobe({
  globeScale = 0.42,
  dotColor = '#4A6FA5',
  coreColor = '#F26B2F',
  playIntro = true,
  followCursor = true,
  rotationSpeed = 0.28,
  onIntroComplete,
  replayKey,
  className,
  style,
}: HeroGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const doneRef = useRef(onIntroComplete);
  doneRef.current = onIntroComplete;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const intro = playIntro && !reduce;
    const [cr, cg, cb] = hexToRgb(coreColor);

    let W = 0, H = 0;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const d = Math.min(2, window.devicePixelRatio || 1);
      W = r.width; H = r.height;
      canvas.width = Math.max(1, Math.round(W * d));
      canvas.height = Math.max(1, Math.round(H * d));
      ctx.setTransform(d, 0, 0, d, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const dots: Dot[] = SPHERE.map(() => {
      const an = Math.random() * Math.PI * 2, rr = Math.sqrt(Math.random());
      const dir = Math.random() * Math.PI * 2, sp = 0.4 + Math.random() * 1.4;
      return {
        x: Math.random() * W, y: Math.random() * H,
        vx: Math.cos(dir) * sp, vy: Math.sin(dir) * sp,
        s: 1.5 + Math.random() * 2, a: 0, sq: 1, ang: 0, z: 1,
        ox: Math.cos(an) * rr, oy: Math.sin(an) * rr,
      };
    });

    const core = { x: W / 2, y: H / 2, r: 0 };
    const ptr = { x: 0, y: 0, inside: false };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const r = canvas.getBoundingClientRect();
      ptr.x = e.clientX - r.left; ptr.y = e.clientY - r.top;
      ptr.inside = ptr.x >= 0 && ptr.y >= 0 && ptr.x <= r.width && ptr.y <= r.height;
    };
    const onLeave = () => { ptr.inside = false; };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);

    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);

    const start = performance.now() - (intro ? 0 : T_DONE * 1000);
    let last = performance.now(), clock = 0, burstDone = !intro, completed = false, raf = 0;
    const T = { x: 0, y: 0, z: 1, s: 0, a: 0, sq: 1, ang: 0 };

    const project = (v: [number, number, number], cx: number, cy: number, R: number, rot: number) => {
      const c = Math.cos(rot), s = Math.sin(rot);
      const x = v[0] * c + v[2] * s, z = -v[0] * s + v[2] * c, y = v[1];
      const ct = Math.cos(TILT), st = Math.sin(TILT);
      const y2 = y * ct - z * st, z2 = y * st + z * ct;
      T.x = cx + R * x; T.y = cy + R * y2; T.z = z2;
      T.s = R * 0.048 * (0.45 + 0.55 * Math.max(z2, 0));
      T.a = z2 > 0 ? 0.3 + 0.7 * z2 : Math.max(0, 0.07 * (1 + z2 * 1.4));
      T.sq = Math.max(0.16, Math.abs(z2));
      T.ang = Math.atan2(y2, x);
    };

    const drawDots = (back: boolean, cursor: boolean) => {
      ctx.fillStyle = dotColor;
      for (const p of dots) {
        if (back ? p.z >= 0 : p.z < 0) continue;
        if (p.a < 0.01) continue;
        let x = p.x, y = p.y;
        if (cursor) {
          const ex = core.x - x, ey = core.y - y, d = Math.hypot(ex, ey);
          if (d < 170) { const pull = 0.26 * Math.pow(1 - d / 170, 2); x += ex * pull; y += ey * pull; }
        }
        ctx.globalAlpha = Math.min(1, p.a);
        ctx.beginPath();
        ctx.ellipse(x, y, Math.max(0.4, p.s * p.sq), Math.max(0.4, p.s), p.ang, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const drawCore = (glow: number) => {
      if (core.r <= 0.3) return;
      const gr = core.r * (3.2 + glow * 2.5);
      const g = ctx.createRadialGradient(core.x, core.y, 0, core.x, core.y, gr);
      g.addColorStop(0, `rgba(${cr},${cg},${cb},${(0.33 + 0.3 * glow).toFixed(2)})`);
      g.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(core.x, core.y, gr, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = coreColor;
      ctx.beginPath(); ctx.arc(core.x, core.y, core.r, 0, Math.PI * 2); ctx.fill();
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(50, now - last); last = now;
      if (!visible || document.hidden) return;
      const f = dt / 16.667; clock += dt / 1000;
      const t = (now - start) / 1000;
      const cx = W / 2, cy = H / 2, R = Math.min(W, H) * globeScale;
      if (!completed && t >= T_FORMED + 0.3) { completed = true; doneRef.current?.(); }

      // spring settings for each intro phase
      let k = 0.07, damp = 0.78, glow = 0;
      if (t < T_CONV) k = 0;
      else if (t < T_BURST) { const u = (t - T_CONV) / (T_BURST - T_CONV); k = 0.002 + 0.06 * u * u; damp = 0.86; glow = u; }
      else if (t < T_FORMED) { const u = (t - T_BURST) / (T_FORMED - T_BURST); k = 0.012 + 0.06 * u; damp = 0.84 - 0.06 * u; glow = 1 - u; }
      if (!burstDone && t >= T_BURST) {
        burstDone = true;
        for (const p of dots) {
          const ex = p.x - cx, ey = p.y - cy, d = Math.hypot(ex, ey) || 1, sp = 9 + Math.random() * 12;
          p.vx += (ex / d) * sp; p.vy += (ey / d) * sp;
        }
      }
      const converging = t >= T_CONV && t < T_BURST;
      const rot = reduce ? 0.5 : clock * rotationSpeed;

      for (let i = 0; i < dots.length; i++) {
        const p = dots[i];
        if (converging) {
          T.x = cx + p.ox * R * 0.16; T.y = cy + p.oy * R * 0.16; T.z = -1; T.s = 1.8; T.a = 0.9; T.sq = 1; T.ang = 0;
        } else project(SPHERE[i], cx, cy, R, rot);

        // no intro (or reduced motion): start already formed
        if (reduce || (!intro && clock < 0.05)) {
          p.x = T.x; p.y = T.y; p.s = T.s; p.a = T.a; p.sq = T.sq; p.ang = T.ang; p.z = T.z; continue;
        }
        if (k === 0) { p.x += p.vx * f; p.y += p.vy * f; p.a += (0.55 - p.a) * 0.05 * f; continue; }
        p.vx = (p.vx + (T.x - p.x) * k * f) * Math.pow(damp, f);
        p.vy = (p.vy + (T.y - p.y) * k * f) * Math.pow(damp, f);
        p.x += p.vx * f; p.y += p.vy * f;
        const l = Math.min(1, 0.16 * f);
        p.s += (T.s - p.s) * l; p.a += (T.a - p.a) * l; p.sq += (T.sq - p.sq) * l;
        p.z += (T.z - p.z) * Math.min(1, 0.3 * f);
        let d = T.ang - p.ang; d -= Math.PI * Math.round(d / Math.PI); p.ang += d * l;
      }

      // core: grows in with a small overshoot, sits inside the globe, optionally follows the cursor
      const cursor = followCursor && fine && !reduce && t >= T_DONE && ptr.inside;
      let cR = t < T_CONV - 0.1 ? 0 : R * 0.2;
      if (t >= T_CONV - 0.1 && t < T_CONV + 0.7) {
        const u = (t - T_CONV + 0.1) / 0.8;
        cR = R * 0.2 * Math.max(0, 1 + 2.2 * Math.pow(u - 1, 3) + 1.2 * Math.pow(u - 1, 2));
      }
      const tx = cursor ? ptr.x : cx, ty = cursor ? ptr.y : cy;
      if (cursor) cR = 8;
      const cl = Math.min(1, (cursor ? 0.3 : 0.12) * f);
      core.x += (tx - core.x) * cl; core.y += (ty - core.y) * cl;
      core.r += (cR - core.r) * Math.min(1, t < T_CONV + 0.7 ? 1 : 0.16 * f);
      if (reduce) { core.x = cx; core.y = cy; core.r = R * 0.2; }

      ctx.clearRect(0, 0, W, H);
      // depth order: back of the globe, then the core, then the front, so the core sits inside
      drawDots(true, cursor);
      if (!cursor) drawCore(glow);
      drawDots(false, cursor);
      if (cursor) drawCore(0);
    };
    raf = requestAnimationFrame(frame);
    if (!intro) doneRef.current?.();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [globeScale, dotColor, coreColor, playIntro, followCursor, rotationSpeed, replayKey]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="Gravice globe"
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  );
}

export default HeroGlobe;
