'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Sticky step stories ("How it works" on product pages, the homepage story, the industry journey).
 * Returns the index of the step whose centre is closest to a line at `focus` × viewport height.
 *
 *   const { active, register } = useScrollStep(steps.length);
 *   steps.map((s, i) => <li ref={register(i)} className={i === active ? 'on' : ''}>…</li>)
 *
 * Use `active` to swap the screenshot / orb in the sticky centre column.
 */
export function useScrollStep(count: number, focus = 0.55) {
  const els = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      let best = Infinity, b = 0;
      els.current.slice(0, count).forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect(), d = Math.abs(r.top + r.height / 2 - innerHeight * focus);
        if (d < best) { best = d; b = i; }
      });
      setActive((a) => (a === b ? a : b));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(check); };
    check();
    addEventListener('scroll', on, { passive: true }); addEventListener('resize', on);
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on); if (raf) cancelAnimationFrame(raf); };
  }, [count, focus]);
  const register = (i: number) => (el: HTMLElement | null) => { els.current[i] = el; };
  return { active, register };
}
