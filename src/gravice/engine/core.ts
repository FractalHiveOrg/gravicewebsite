/**
 * The Gravice core: an orange sphere lit from within, with a soft glow.
 * It breathes slowly (size ±3.5%, glow ±8%). Shared by the orbs and the shift animations.
 */
export function drawCore(
  ctx: CanvasRenderingContext2D, x: number, y: number, r: number, t: number,
  opts: { reduceMotion?: boolean } = {},
) {
  const ph = opts.reduceMotion ? 0 : Math.sin(t * 2.1);
  const R = r * (1 + 0.035 * ph), gr = R * 2.8 * (1 + 0.08 * ph);
  let g = ctx.createRadialGradient(x, y, R * 0.6, x, y, gr);
  g.addColorStop(0, `rgba(242,107,47,${(0.26 + 0.05 * ph).toFixed(3)})`);
  g.addColorStop(1, 'rgba(242,107,47,0)');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, gr, 0, Math.PI * 2); ctx.fill();
  g = ctx.createRadialGradient(x, y, 0, x, y, R);
  g.addColorStop(0, '#FF9F66'); g.addColorStop(0.45, '#F7793A');
  g.addColorStop(0.85, '#E5602A'); g.addColorStop(1, '#C24E20');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, R, 0, Math.PI * 2); ctx.fill();
}

export const clamp = (v: number, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
export const ease = (u: number) => (u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2);
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Shared requestAnimationFrame loop that pauses in hidden tabs. */
export function startLoop(tick: (t: number) => void) {
  let raf = 0, clock = 0, last = performance.now(), alive = true;
  const frame = (now: number) => {
    if (!alive) return;
    raf = requestAnimationFrame(frame);
    const dt = Math.min(50, now - last); last = now;
    if (document.hidden) return;
    clock += dt / 1000;
    tick(clock);
  };
  raf = requestAnimationFrame(frame);
  return () => { alive = false; cancelAnimationFrame(raf); };
}
