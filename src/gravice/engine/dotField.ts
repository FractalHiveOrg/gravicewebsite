/**
 * Gravice dot field: one set of 312 dots that travels through the page.
 *
 *   Hero      scattered dots → pulled into the orange core (glow) → burst → rotating globe.
 *             After the intro the core follows the cursor while it is over the hero.
 *   Story     as you scroll, the globe breaks apart and re-forms in the sticky centre column,
 *             then dissolves into the first product orb. Between steps the orb dissolves into
 *             dots, they scatter and re-form, and the next orb appears. After the last step the
 *             dots scatter outward and fade.
 *   Closing   when the bottom edge of the newsroom (or the top of the closing section) comes up
 *             the screen, dots rise out of it and gather into the closing globe.
 *
 * Framework-agnostic. It finds the page sections by data attributes, every frame, so sections
 * can be mounted in any order and any of them can be left out:
 *
 *   data-gv="hero"         hero section (cursor follow is active inside it)
 *   data-gv="hero-globe"   empty box where the hero globe sits
 *   data-gv="story"        the scroll story section
 *   data-gv="stage"        sticky centre column of the story
 *   data-gv="orb-canvas"   <canvas> inside the stage that the orbs are painted on
 *   data-gv="step"         one per story step, with data-gv-orb="connecting|searching|solving|…"
 *   data-gv="tick"         optional progress labels, one per step
 *   data-gv="news"         section the closing dots rise out of (optional)
 *   data-gv="cta"          closing section
 *   data-gv="cta-globe"    empty box where the closing globe forms
 *   data-gv-reveal         elements faded in once the hero globe has formed
 *
 * Toggles: class "gv-on" on the active step/tick, "gv-in" on revealed elements.
 */
import { MODE_DRAWS, resolvePreset } from 'thinking-orbs/engine';
import type { OrbState } from 'thinking-orbs/engine';

export interface DotFieldOptions {
  /** Full-viewport canvas behind content (dots, cores). */
  field: HTMLCanvasElement;
  /** Full-viewport canvas above everything (only the cursor core is drawn here). */
  cursor: HTMLCanvasElement;
  dotColor?: string;
  coreColor?: string;
  orbColor?: string;
  /** Orb clock rate. Library rates are tuned for 64px icons; 0.6 reads calmly at ~400px. */
  orbSpeed?: number;
  /** Play the hero intro. Default true. */
  intro?: boolean;
  /** Core follows the mouse over the hero after the intro. Default true. */
  followCursor?: boolean;
}

export interface DotFieldController {
  replay(): void;
  skip(): void;
  destroy(): void;
}

type V3 = [number, number, number];
interface Dot {
  x: number; y: number; vx: number; vy: number;
  s: number; a: number; sq: number; ang: number; z: number;
  r: number; ox: number; oy: number; ptx: number; pty: number;
}
interface Target { x: number; y: number; z: number; s: number; a: number; sq: number; ang: number }
interface Box { x: number; y: number; w: number; h: number; top: number; bottom: number }

const T_CONV = 0.8, T_BURST = 1.9, T_FORMED = 3.0, T_REVEAL = 3.3, T_HANDOFF = 3.9;
const TILT = -0.32;
const clamp = (v: number, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
const ease = (u: number) => (u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2);
const lerp = (a: number, b: number, u: number) => a + (b - a) * u;

/** Latitude/longitude grid matching the Gravice logo: 13 rings × 24 = 312 dots. */
const SPHERE: V3[] = (() => {
  const v: V3[] = [];
  for (let la = -72; la <= 72; la += 12)
    for (let lo = 0; lo < 360; lo += 15) {
      const a = (la * Math.PI) / 180, o = (lo * Math.PI) / 180;
      v.push([Math.cos(a) * Math.sin(o), Math.sin(a), Math.cos(a) * Math.cos(o)]);
    }
  return v;
})();
const P = SPHERE.length;

function rgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function createDotField(opts: DotFieldOptions): DotFieldController {
  const {
    field, cursor,
    dotColor = '#4A6FA5', coreColor = '#F26B2F', orbColor = '#3E5F93',
    orbSpeed = 0.6, intro: playIntro = true, followCursor = true,
  } = opts;
  const fx = field.getContext('2d')!;
  const cx = cursor.getContext('2d')!;
  const [cr, cg, cb] = rgb(coreColor);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const q = (sel: string) => document.querySelector<HTMLElement>(`[data-gv="${sel}"]`);
  const qa = (sel: string) => Array.from(document.querySelectorAll<HTMLElement>(`[data-gv="${sel}"]`));
  const boxOf = (el: Element): Box => {
    const r = el.getBoundingClientRect();
    return { x: r.left, y: r.top + window.scrollY, w: r.width, h: r.height, top: r.top, bottom: r.bottom };
  };

  // ---- canvases
  let W = 0, H = 0;
  let stuckTop = 0, stuckTopW = -1, lastCut = NaN;
  const resize = () => {
    const d = Math.min(2, window.devicePixelRatio || 1);
    W = window.innerWidth; H = window.innerHeight;
    for (const [c, x] of [[field, fx], [cursor, cx]] as const) {
      c.width = Math.round(W * d); c.height = Math.round(H * d);
      c.style.width = W + 'px'; c.style.height = H + 'px';
      x.setTransform(d, 0, 0, d, 0, 0);
    }
  };
  resize();
  window.addEventListener('resize', resize);

  // ---- dots
  const dots: Dot[] = SPHERE.map(() => {
    const an = Math.random() * Math.PI * 2, rr = 0.35 + 0.65 * Math.sqrt(Math.random());
    return { x: 0, y: 0, vx: 0, vy: 0, s: 2, a: 0, sq: 1, ang: 0, z: 1, r: Math.random(), ox: Math.cos(an) * rr, oy: Math.sin(an) * rr, ptx: 0, pty: 0 };
  });
  const scatter = () => {
    const sy = window.scrollY;
    for (const p of dots) {
      p.x = Math.random() * W; p.y = sy + Math.random() * H;
      const an = Math.random() * Math.PI * 2, sp = 0.4 + Math.random() * 1.4;
      p.vx = Math.cos(an) * sp; p.vy = Math.sin(an) * sp;
      p.s = 1.5 + Math.random() * 2; p.a = 0; p.sq = 1; p.ang = 0; p.z = 1;
    }
  };

  const proj = (v: V3, ox: number, oy: number, R: number, rot: number, bs: number, o: Target) => {
    const c = Math.cos(rot), s = Math.sin(rot);
    const x = v[0] * c + v[2] * s, z = -v[0] * s + v[2] * c, y = v[1];
    const ct = Math.cos(TILT), st = Math.sin(TILT);
    const y2 = y * ct - z * st, z2 = y * st + z * ct;
    o.x = ox + R * x; o.y = oy + R * y2; o.z = z2;
    o.s = bs * (0.45 + 0.55 * Math.max(z2, 0));
    o.a = z2 > 0 ? 0.3 + 0.7 * z2 : Math.max(0, 0.07 * (1 + z2 * 1.4));
    o.sq = Math.max(0.16, Math.abs(z2)); o.ang = Math.atan2(y2, x);
    return o;
  };
  const exitTo = (p: Dot, X: number, Y: number, R: number, o: Target) => {
    o.x = X + p.ox * R * 3.2; o.y = Y + p.oy * R * 3.2; o.z = 1; o.s = R * 0.03; o.sq = 1; o.ang = 0; o.a = 0;
    return o;
  };

  // ---- orbs (thinking-orbs engine, MIT © Jakub Antalik), drawn large and tinted
  const tint = document.createElement('canvas');
  const tctx = tint.getContext('2d')!;
  let orbBox = 0, orbCanvasEl: HTMLCanvasElement | null = null;
  const drawOrbs = (stage: HTMLElement | null, orbCv: HTMLCanvasElement | null, states: OrbState[], oa: number[], clock: number) => {
    if (!stage || !orbCv) return;
    const oc = orbCv.getContext('2d');
    if (!oc) return;
    const r = stage.getBoundingClientRect();
    const box = Math.round(Math.min(r.width, r.height) * 0.95), d = Math.min(2, window.devicePixelRatio || 1);
    if (box !== orbBox || orbCv !== orbCanvasEl) {
      orbBox = box; orbCanvasEl = orbCv;
      for (const c of [orbCv, tint]) { c.width = Math.max(1, box * d); c.height = Math.max(1, box * d); }
      orbCv.style.width = orbCv.style.height = box + 'px';
    }
    oc.setTransform(1, 0, 0, 1, 0, 0); oc.clearRect(0, 0, orbCv.width, orbCv.height);
    if (r.bottom < 0 || r.top > H) return;
    oa.forEach((a, k) => {
      if (a <= 0.01 || !states[k]) return;
      const pr = resolvePreset(states[k], 64);
      tctx.setTransform(1, 0, 0, 1, 0, 0); tctx.globalCompositeOperation = 'source-over';
      tctx.clearRect(0, 0, tint.width, tint.height);
      const sc = (box * d) / 64; tctx.setTransform(sc, 0, 0, sc, 0, 0);
      MODE_DRAWS[pr.mode](tctx, 64, (reduce ? 2 : clock) * orbSpeed, false, pr.opts);
      tctx.setTransform(1, 0, 0, 1, 0, 0); tctx.globalCompositeOperation = 'source-in';
      tctx.fillStyle = orbColor; tctx.fillRect(0, 0, tint.width, tint.height);
      oc.globalAlpha = a; oc.drawImage(tint, 0, 0); oc.globalAlpha = 1;
    });
  };

  // ---- state
  let introStart = performance.now(), last = introStart, clock = 0;
  let revealed = false, burstDone = false, stepOn = -2, raf = 0, alive = true;
  const HC = { x: W / 2, y: window.scrollY + H / 2, R: Math.min(W, H) * 0.3 };
  const core = { x: W / 2, y: H / 2, r: 0 };
  const ptr = { x: 0, y: 0, inHero: false, seen: false };
  const heroPresent = () => !!q('hero-globe');
  if (reduce || !playIntro || !heroPresent()) { introStart -= 1e4; burstDone = true; }
  scatter();
  document.documentElement.classList.add('gv-js');

  const setReveal = (on: boolean) => {
    document.querySelectorAll('[data-gv-reveal]').forEach((e) => e.classList.toggle('gv-in', on));
    revealed = on;
  };
  setReveal(false); // reset (React StrictMode mounts effects twice)

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    ptr.x = e.clientX; ptr.y = e.clientY; ptr.seen = true;
    const t = e.target as Element | null;
    ptr.inHero = !!(t && t.closest && t.closest('[data-gv="hero"]'));
  };
  const onLeave = () => { ptr.inHero = false; };
  window.addEventListener('pointermove', onMove, { passive: true });
  document.documentElement.addEventListener('mouseleave', onLeave);

  const A: Target = { x: 0, y: 0, z: 1, s: 0, a: 0, sq: 1, ang: 0 };
  const B: Target = { ...A }, T: Target = { ...A };

  const drawDots = (sy: number, cursorMode: boolean, back: boolean) => {
    fx.fillStyle = dotColor;
    for (const p of dots) {
      if (back ? p.z >= 0 : p.z < 0) continue;
      let x = p.x, y = p.y - sy;
      if (y < -60 || y > H + 60 || p.a < 0.01) continue;
      if (cursorMode) {
        const ex = core.x - x, ey = core.y - y, d = Math.hypot(ex, ey);
        if (d < 170) { const pull = 0.26 * Math.pow(1 - d / 170, 2); x += ex * pull; y += ey * pull; }
      }
      fx.globalAlpha = Math.min(1, p.a);
      fx.beginPath(); fx.ellipse(x, y, Math.max(0.4, p.s * p.sq), Math.max(0.4, p.s), p.ang, 0, Math.PI * 2); fx.fill();
    }
    fx.globalAlpha = 1;
  };
  const drawCore = (ctx: CanvasRenderingContext2D, glow: number) => {
    if (core.r <= 0.3) return;
    const gr = core.r * (3.2 + glow * 2.5);
    const g = ctx.createRadialGradient(core.x, core.y, 0, core.x, core.y, gr);
    g.addColorStop(0, `rgba(${cr},${cg},${cb},${(0.33 + 0.3 * glow).toFixed(2)})`);
    g.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(core.x, core.y, gr, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = coreColor; ctx.beginPath(); ctx.arc(core.x, core.y, core.r, 0, Math.PI * 2); ctx.fill();
  };

  const frame = (now: number) => {
    if (!alive) return;
    raf = requestAnimationFrame(frame);
    const dt = Math.min(50, now - last); last = now;
    if (document.hidden) return;
    const f = dt / 16.667; clock += dt / 1000;
    const t = (now - introStart) / 1000, intro = t < T_HANDOFF, sy = window.scrollY;
    if (!revealed && t >= T_REVEAL) setReveal(true);

    // ---- where things are
    const heroG = q('hero-globe'), storyEl = q('story'), stage = q('stage');
    const orbCv = q('orb-canvas') as HTMLCanvasElement | null;
    const steps = qa('step'), ticks = qa('tick');
    const ctaG = q('cta-globe'), ctaSec = q('cta'), newsEl = q('news');
    const states = steps.map((el) => (el.dataset.gvOrb || 'searching') as OrbState);
    const N = steps.length;
    const hasStory = !!(storyEl && stage && N > 0);

    // hero globe (eases from screen centre to its slot after the intro)
    if (heroG) {
      const hg = boxOf(heroG), atCentre = !reduce && t < T_REVEAL;
      const hx = atCentre ? W / 2 : hg.x + hg.w / 2, hy = atCentre ? sy + H / 2 : hg.y + hg.h / 2;
      const hR = atCentre ? Math.min(W, H) * 0.3 : Math.min(hg.w, hg.h) * 0.46;
      const hl = reduce ? 1 : Math.min(1, 0.06 * f);
      HC.x += (hx - HC.x) * hl; HC.y += (hy - HC.y) * hl; HC.R += (hR - HC.R) * hl;
    }
    const sg = stage ? boxOf(stage) : null;
    const SC = sg ? { x: sg.x + sg.w / 2, y: sg.y + sg.h / 2, R: Math.min(sg.w, sg.h) * 0.36 } : { ...HC };

    // ---- one continuous story value s: -1 hero globe, 0..N-1 step orbs, N gone
    // Narrow screens: stage pinned in the top half, step copy lives in the bottom half and fades
    // out where it would slide under the stage.
    const stacked = hasStory && W <= 900;
    let mid = H * 0.55;
    if (stacked && sg) {
      if (stuckTopW !== W) { stuckTop = parseFloat(getComputedStyle(stage!).top) || 0; stuckTopW = W; }
      mid = (stuckTop + sg.h + H) / 2;
      const col = steps[0].parentElement;
      if (col) {
        const cut = Math.round(sg.bottom - col.getBoundingClientRect().top);
        if (cut !== lastCut) { lastCut = cut; col.style.setProperty('--gv-cut', cut + 'px'); }
      }
    }
    let s = -1;
    if (hasStory && !intro) {
      const st = boxOf(storyEl!);
      const keys = [st.y - H * 0.75, ...steps.map((el) => { const r = boxOf(el); return r.y + r.h / 2 - mid; }), st.y + st.h - H * 0.45];
      if (sy <= keys[0]) s = -1;
      else if (sy >= keys[N + 1]) s = N;
      else for (let j = 0; j <= N; j++) if (sy < keys[j + 1]) { s = j - 1 + (sy - keys[j]) / Math.max(1, keys[j + 1] - keys[j]); break; }
    }
    if (!heroG && s <= -1 && hasStory) s = Math.max(s, -0.0001); // no hero: start at the first step
    const on = s < -0.5 || s > N - 0.5 ? -1 : Math.round(clamp(s, 0, N - 1));
    if (on !== stepOn) {
      stepOn = on;
      steps.forEach((el, i) => el.classList.toggle('gv-on', i === on));
      ticks.forEach((el, i) => el.classList.toggle('gv-on', i === on));
    }

    // ---- closing: dots rise out of the newsroom's bottom edge (or the closing section's top)
    let cp = 0, cg0: Box | null = null, srcY = 0;
    if (ctaG && !intro) {
      cg0 = boxOf(ctaG);
      const maxS = Math.max(1, document.documentElement.scrollHeight - H);
      srcY = newsEl ? boxOf(newsEl).y + boxOf(newsEl).h : ctaSec ? boxOf(ctaSec).y : cg0.y - H * 0.4;
      const c0 = srcY - H * 0.98;
      let c1 = Math.min(maxS - 4, cg0.y + cg0.h / 2 - H * 0.42);
      if (c1 < c0 + H * 0.25) c1 = c0 + H * 0.25;
      cp = clamp((sy - c0) / (c1 - c0));
    }
    const ctaIn = cp > 0 && !!cg0;

    // ---- segment progress: each segment holds briefly, then disperses and re-forms
    const seg = s < 0 ? 0 : Math.min(N, Math.floor(s) + 1);
    const qq = s < 0 ? s + 1 : s - Math.floor(Math.min(s, N - 0.001));
    const w = ease(clamp((qq - 0.15) / 0.7));
    const fin = clamp((w - 0.8) / 0.2), fout = 1 - clamp(w / 0.2);
    const oa = new Array(N).fill(0);
    let pm = 1;
    if (hasStory && !intro && s > -1 && s < N) {
      if (seg === 0) { oa[0] = fin; pm = 1 - fin; }
      else if (seg === N) { oa[N - 1] = fout; pm = 1 - fout; }
      else { oa[seg - 1] = fout; oa[seg] = fin; pm = (1 - fout) * (1 - fin); }
    }

    // ---- springs for the intro phases
    let k = 0.2, damp = 0.62, glow = 0;
    if (!reduce && t < T_CONV) k = 0;
    else if (!reduce && t < T_BURST) { const u = (t - T_CONV) / (T_BURST - T_CONV); k = 0.002 + 0.06 * u * u; damp = 0.86; glow = u; }
    else if (!reduce && t < T_FORMED) { const u = (t - T_BURST) / (T_FORMED - T_BURST); k = 0.012 + 0.06 * u; damp = 0.84 - 0.06 * u; glow = 1 - u; }
    else if (intro) { k = 0.07; damp = 0.78; }
    if (!reduce && !burstDone && t >= T_BURST) {
      burstDone = true;
      for (const p of dots) {
        const ex = p.x - HC.x, ey = p.y - HC.y, d = Math.hypot(ex, ey) || 1, sp = 9 + Math.random() * 12;
        p.vx += (ex / d) * sp; p.vy += (ey / d) * sp;
      }
    }
    const converging = !reduce && t >= T_CONV && t < T_BURST;
    const rot = reduce ? 0.5 : clock * 0.28;
    const from = seg === 0 ? HC : SC;
    const mx = (from.x + SC.x) / 2, my = (from.y + SC.y) / 2;
    const spreadX = seg === 0 ? W * 0.18 : SC.R * 1.6, spreadY = seg === 0 ? H * 0.16 : SC.R * 1.4;

    for (let i = 0; i < P; i++) {
      const p = dots[i];
      if (converging) { T.x = HC.x + p.ox * HC.R * 0.16; T.y = HC.y + p.oy * HC.R * 0.16; T.z = -1; T.s = 1.8; T.a = 0.9; T.sq = 1; T.ang = 0; }
      else if (intro || s <= -1) { proj(SPHERE[i], HC.x, HC.y, HC.R, rot, HC.R * 0.048, T); if (!heroG) T.a = 0; }
      else if (ctaIn && cg0) {
        const gx = cg0.x + cg0.w / 2, gy = cg0.y + cg0.h / 2;
        proj(SPHERE[i], gx, gy, cg0.w * 0.46, clock * 0.6, cg0.w * 0.02, B);
        const qd = clamp((cp - p.r * 0.4) / 0.6), e = ease(qd), u1 = 1 - e;
        const sx = (p.ox * 0.5 + 0.5) * W, s0y = srcY + 6, kx = lerp(sx, gx, 0.55) + p.oy * W * 0.08, ky = lerp(s0y, gy, 0.35);
        T.x = u1 * u1 * sx + 2 * e * u1 * kx + e * e * B.x; T.y = u1 * u1 * s0y + 2 * e * u1 * ky + e * e * B.y;
        T.a = qd <= 0 ? 0 : lerp(0.8 * clamp(qd / 0.08), B.a, clamp((qd - 0.75) / 0.25));
        T.s = lerp(cg0.w * 0.016, B.s, e); T.sq = lerp(1, B.sq, clamp((qd - 0.7) / 0.3)); T.ang = B.ang; T.z = qd > 0.85 ? B.z : 1;
      }
      else if (s >= N || !hasStory) exitTo(p, SC.x, SC.y, SC.R, T);
      else {
        if (seg === 0) { proj(SPHERE[i], HC.x, HC.y, HC.R, rot, HC.R * 0.048, A); if (!heroG) A.a = 0; proj(SPHERE[i], SC.x, SC.y, SC.R, rot, SC.R * 0.048, B); }
        else if (seg < N) { proj(SPHERE[i], SC.x, SC.y, SC.R, rot, SC.R * 0.048, A); proj(SPHERE[i], SC.x, SC.y, SC.R, rot, SC.R * 0.048, B); }
        else { proj(SPHERE[i], SC.x, SC.y, SC.R, rot, SC.R * 0.048, A); exitTo(p, SC.x, SC.y, SC.R, B); }
        // quadratic path through a scatter point: the formation breaks apart, then re-forms
        const Sx = mx + p.ox * spreadX, Sy = my + p.oy * spreadY, u1 = 1 - w;
        T.x = u1 * u1 * A.x + 2 * w * u1 * Sx + w * w * B.x; T.y = u1 * u1 * A.y + 2 * w * u1 * Sy + w * w * B.y;
        const bump = 4 * w * u1;
        T.a = lerp(lerp(A.a, B.a, w), seg === N ? 0.5 : 0.75, bump * (seg === N ? 0 : 1));
        T.s = lerp(A.s, B.s, w); T.sq = lerp(A.sq, B.sq, clamp(w * 1.4)); T.ang = w < 0.5 ? A.ang : B.ang; T.z = w < 0.5 ? A.z : B.z;
        if (bump > 0.3) T.sq = lerp(T.sq, 1, bump);
        T.a *= pm;
      }
      // a big jump while nearly invisible is a teleport, not a flight
      if (!converging && T.a < 0.12 && Math.hypot(T.x - p.ptx, T.y - p.pty) > SC.R * 0.5) { p.x = T.x; p.y = T.y; p.vx = p.vy = 0; p.a = Math.min(p.a, T.a); }
      p.ptx = T.x; p.pty = T.y;
      if (reduce) { p.x = T.x; p.y = T.y; p.s = T.s; p.a = T.a; p.sq = T.sq; p.ang = T.ang; p.z = T.z; continue; }
      if (k === 0) { p.x += p.vx * f; p.y += p.vy * f; p.a += (0.55 - p.a) * 0.05 * f; continue; }
      if (intro) {
        p.vx = (p.vx + (T.x - p.x) * k * f) * Math.pow(damp, f);
        p.vy = (p.vy + (T.y - p.y) * k * f) * Math.pow(damp, f);
        p.x += p.vx * f; p.y += p.vy * f;
      } else {
        // Scroll-driven motion: overshoot-free glide toward the target.
        const g = 1 - Math.pow(1 - 0.13, f);
        p.vx *= Math.pow(0.8, f); p.vy *= Math.pow(0.8, f);
        p.x += (T.x - p.x) * g + p.vx * f; p.y += (T.y - p.y) * g + p.vy * f;
      }
      const l = Math.min(1, 0.16 * f);
      p.s += (T.s - p.s) * l; p.a += (T.a - p.a) * l; p.sq += (T.sq - p.sq) * l; p.z += (T.z - p.z) * Math.min(1, 0.3 * f);
      let d = T.ang - p.ang; d -= Math.PI * Math.round(d / Math.PI); p.ang += d * Math.min(1, 0.3 * f);
    }

    // ---- core: follows the formation; shrinks while dots are scattered between formations
    const cursorMode = followCursor && fine && !reduce && !intro && ptr.seen && ptr.inHero && s <= -0.98 && !!heroG;
    let ccx: number, ccy: number, cR: number;
    if (intro || s <= -1) { ccx = HC.x; ccy = HC.y; cR = heroG ? HC.R * 0.2 : 0; }
    else if (ctaIn && cg0) { ccx = cg0.x + cg0.w / 2; ccy = cg0.y + cg0.h / 2; cR = cg0.w * 0.46 * 0.2 * ease(clamp((cp - 0.3) / 0.7)); }
    else if (s >= N || !hasStory) { ccx = SC.x; ccy = SC.y; cR = 0; }
    else {
      const e = seg === 0 ? w : 1, bump = 4 * w * (1 - w);
      ccx = lerp(HC.x, SC.x, e); ccy = lerp(HC.y, SC.y, e);
      cR = lerp(seg === 0 ? HC.R : SC.R, SC.R, e) * lerp(0.2, 0.11, e) * (1 - 0.35 * bump);
      if (seg === N) cR = SC.R * 0.11 * (1 - w);
    }
    if (!reduce && t < T_CONV - 0.1) cR = 0;
    if (!reduce && heroG && t >= T_CONV - 0.1 && t < T_CONV + 0.7) {
      const u = (t - T_CONV + 0.1) / 0.8;
      cR = HC.R * 0.2 * Math.max(0, 1 + 2.2 * Math.pow(u - 1, 3) + 1.2 * Math.pow(u - 1, 2));
    }
    let tx = ccx, ty = ccy - sy;
    if (cursorMode) { tx = ptr.x; ty = ptr.y; cR = 8; }
    const cl = Math.min(1, (cursorMode ? 0.3 : intro ? 0.25 : 0.13) * f);
    core.x += (tx - core.x) * cl; core.y += (ty - core.y) * cl;
    core.r += (cR - core.r) * Math.min(1, t < T_CONV + 0.7 ? 1 : 0.16 * f);

    // ---- paint: back dots, core (inside the formation), front dots; cursor core on the top canvas
    fx.clearRect(0, 0, W, H); cx.clearRect(0, 0, W, H);
    drawDots(sy, cursorMode, true);
    if (!cursorMode) drawCore(fx, glow);
    drawDots(sy, cursorMode, false);
    if (cursorMode) drawCore(cx, 0);
    if (hasStory) drawOrbs(stage, orbCv, states, oa, clock);
  };
  raf = requestAnimationFrame(frame);
  if (reduce || !playIntro || !heroPresent()) setReveal(true);

  return {
    replay() {
      if (reduce) return;
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      introStart = performance.now(); burstDone = false; setReveal(false);
      core.r = 0; HC.x = W / 2; HC.y = H / 2; HC.R = Math.min(W, H) * 0.3; scatter();
    },
    skip() { introStart = performance.now() - T_HANDOFF * 1000; burstDone = true; setReveal(true); },
    destroy() {
      alive = false; cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.classList.remove('gv-js');
      setReveal(true);
    },
  };
}
