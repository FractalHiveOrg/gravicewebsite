"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Magnet = {
  el: HTMLElement;
  x: number;
  y: number;
  r: number;
};

type Surface = "dark" | "light";

const LUMINANCE_CUTOFF = 0.45;

function parseRgb(color: string): { r: number; g: number; b: number; a: number } | null {
  const m = color.match(
    /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/,
  );
  if (!m) return null;
  return {
    r: Number(m[1]),
    g: Number(m[2]),
    b: Number(m[3]),
    a: m[4] === undefined ? 1 : Number(m[4]),
  };
}

function luminance(r: number, g: number, b: number) {
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

/** Walk the stack under the pointer and pick light vs dark from the first opaque fill. */
function surfaceAt(x: number, y: number): Surface {
  const stack = document.elementsFromPoint(x, y);
  for (const el of stack) {
    if (!(el instanceof Element)) continue;
    if (el.closest?.(".gravity-cursor")) continue;

    const bg = getComputedStyle(el).backgroundColor;
    const rgb = parseRgb(bg);
    if (!rgb || rgb.a < 0.15) continue;

    return luminance(rgb.r, rgb.g, rgb.b) < LUMINANCE_CUTOFF ? "dark" : "light";
  }
  return "light";
}

/**
 * Brand-mark gravity cursor — cream logo on dark sections, navy logo on paper.
 * Mark tracks the pointer directly; ring trails behind. Fine pointers only.
 */
export function GravityCursor() {
  const reduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const markRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const onDarkRef = useRef<HTMLImageElement>(null);
  const onLightRef = useRef<HTMLImageElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const trail = useRef({ x: -100, y: -100 });
  const visual = useRef({
    core: 1,
    ring: 1,
    opacity: 0.45,
    darkMix: 1,
  });
  const mode = useRef<"default" | "magnet" | "press">("default");
  const raf = useRef(0);
  const activeMagnet = useRef<HTMLElement | null>(null);
  const shift = useRef({ x: 0, y: 0 });
  const sampleEvery = useRef(0);
  /** False once the pointer leaves the document — hide the mark immediately. */
  const inside = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const hover = window.matchMedia("(hover: hover)").matches;
    setEnabled(fine && hover && !reduced);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("has-gravity-cursor");

    function isMagnet(el: Element | null): HTMLElement | null {
      if (!el || !(el instanceof Element)) return null;
      if (el.closest("input, textarea, select, [contenteditable='true']")) {
        return null;
      }
      const hit = el.closest(
        'a, button, [role="button"], [role="menuitem"], [role="tab"], summary, [data-magnetic]',
      );
      if (!hit || !(hit instanceof HTMLElement)) return null;
      if (hit.closest("[data-no-cursor]")) return null;
      return hit;
    }

    function shouldShiftElement(el: HTMLElement) {
      if (el.hasAttribute("data-magnetic")) return true;
      if (el.tagName === "BUTTON") return true;
      const rect = el.getBoundingClientRect();
      return rect.width < 340 && rect.height < 88;
    }

    function magnetMetrics(el: HTMLElement): Magnet {
      const rect = el.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const r = Math.max(rect.width, rect.height) * 0.5 + 20;
      return { el, x, y, r };
    }

    function hide() {
      inside.current = false;
      mode.current = "default";
      if (activeMagnet.current) {
        activeMagnet.current.style.removeProperty("transform");
        activeMagnet.current = null;
      }
      shift.current = { x: 0, y: 0 };
      const root = rootRef.current;
      if (root) root.style.opacity = "0";
    }

    function show() {
      if (!inside.current) {
        inside.current = true;
        // Snap trail to pointer so it doesn't fly in from the last leave point
        trail.current.x = pos.current.x;
        trail.current.y = pos.current.y;
      }
      const root = rootRef.current;
      if (root) root.style.opacity = "1";
    }

    function onMove(e: PointerEvent) {
      const { clientX: x, clientY: y } = e;
      // Outside the viewport (window leave often misses this)
      if (x < 0 || y < 0 || x > window.innerWidth || y > window.innerHeight) {
        hide();
        return;
      }

      pos.current.x = x;
      pos.current.y = y;
      show();

      const magnet = isMagnet(e.target as Element);
      if (magnet) {
        mode.current = e.buttons === 1 ? "press" : "magnet";
        if (activeMagnet.current && activeMagnet.current !== magnet) {
          activeMagnet.current.style.removeProperty("transform");
          shift.current = { x: 0, y: 0 };
        }
        activeMagnet.current = magnet;
      } else {
        mode.current = "default";
        if (activeMagnet.current) {
          activeMagnet.current.style.removeProperty("transform");
          activeMagnet.current = null;
          shift.current = { x: 0, y: 0 };
        }
      }
    }

    function onDown() {
      if (mode.current === "magnet") mode.current = "press";
    }

    function onUp() {
      if (mode.current === "press") mode.current = "magnet";
    }

    function onDocLeave(e: MouseEvent | PointerEvent) {
      // Only when leaving the document itself (not moving between children)
      const next = (e as MouseEvent).relatedTarget as Node | null;
      if (next && document.documentElement.contains(next)) return;
      hide();
    }

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function tick() {
      const mark = markRef.current;
      const ring = ringRef.current;
      const onDark = onDarkRef.current;
      const onLight = onLightRef.current;
      if (!mark || !ring || !onDark || !onLight) {
        raf.current = requestAnimationFrame(tick);
        return;
      }

      if (!inside.current) {
        raf.current = requestAnimationFrame(tick);
        return;
      }

      let mx = pos.current.x;
      let my = pos.current.y;
      let pull = 0;

      if (activeMagnet.current && mode.current !== "default") {
        const m = magnetMetrics(activeMagnet.current);
        const dx = m.x - pos.current.x;
        const dy = m.y - pos.current.y;
        const dist = Math.hypot(dx, dy) || 1;
        const strength = Math.min(1, Math.max(0, (m.r - dist) / m.r));
        pull = strength * strength;
        const attract = 0.08 + pull * 0.16;
        mx = pos.current.x + dx * attract;
        my = pos.current.y + dy * attract;

        if (shouldShiftElement(activeMagnet.current)) {
          const maxShift = 3;
          const targetX = ((pos.current.x - m.x) / m.r) * maxShift * pull;
          const targetY = ((pos.current.y - m.y) / m.r) * maxShift * pull;
          shift.current.x = lerp(shift.current.x, targetX, 0.18);
          shift.current.y = lerp(shift.current.y, targetY, 0.18);
          activeMagnet.current.style.transform = `translate3d(${shift.current.x.toFixed(2)}px, ${shift.current.y.toFixed(2)}px, 0)`;
        }
      }

      // Mark follows pointer immediately — no ease lag
      // Ring trails for motion feel
      trail.current.x = lerp(trail.current.x, mx, 0.22);
      trail.current.y = lerp(trail.current.y, my, 0.22);

      let targetCore = 1;
      let targetRing = 1;
      let targetOpacity = 0.35;

      if (mode.current === "magnet") {
        targetCore = 1.05 + pull * 0.2;
        targetRing = 1.15 + pull * 0.35;
        targetOpacity = 0.28 + pull * 0.2;
      } else if (mode.current === "press") {
        targetCore = 0.85;
        targetRing = 0.95;
        targetOpacity = 0.5;
      }

      sampleEvery.current += 1;
      let targetDarkMix = visual.current.darkMix;
      if (
        sampleEvery.current % 8 === 0 &&
        pos.current.x >= 0 &&
        pos.current.y >= 0
      ) {
        targetDarkMix =
          surfaceAt(pos.current.x, pos.current.y) === "dark" ? 1 : 0;
      }

      const morph = 0.16;
      visual.current.core = lerp(visual.current.core, targetCore, morph);
      visual.current.ring = lerp(visual.current.ring, targetRing, morph);
      visual.current.opacity = lerp(visual.current.opacity, targetOpacity, morph);
      visual.current.darkMix = lerp(visual.current.darkMix, targetDarkMix, 0.22);

      const { core: coreScale, ring: ringScale, opacity, darkMix } = visual.current;

      mark.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%) scale(${coreScale.toFixed(4)})`;
      ring.style.transform = `translate3d(${trail.current.x}px, ${trail.current.y}px, 0) translate(-50%, -50%) scale(${ringScale.toFixed(4)})`;
      ring.style.opacity = opacity.toFixed(3);
      ring.dataset.surface = darkMix > 0.5 ? "dark" : "light";

      onDark.style.opacity = darkMix.toFixed(3);
      onLight.style.opacity = (1 - darkMix).toFixed(3);

      raf.current = requestAnimationFrame(tick);
    }

    function onVisibility() {
      if (document.hidden) hide();
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("mouseleave", onDocLeave);
    document.documentElement.addEventListener("pointerleave", onDocLeave);
    window.addEventListener("blur", hide);
    document.addEventListener("visibilitychange", onVisibility);
    // Start hidden until the first in-viewport move
    hide();
    raf.current = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("has-gravity-cursor");
      cancelAnimationFrame(raf.current);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("mouseleave", onDocLeave);
      document.documentElement.removeEventListener("pointerleave", onDocLeave);
      window.removeEventListener("blur", hide);
      document.removeEventListener("visibilitychange", onVisibility);
      if (activeMagnet.current) {
        activeMagnet.current.style.removeProperty("transform");
      }
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={rootRef}
      className="gravity-cursor"
      aria-hidden
      data-no-cursor
      style={{ opacity: 0 }}
    >
      <div ref={ringRef} className="gravity-cursor__ring" data-surface="dark" />
      <div ref={markRef} className="gravity-cursor__mark">
        {/* Cream orbit — readable on deep-space / navy */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={onDarkRef}
          className="gravity-cursor__logo gravity-cursor__logo--on-dark"
          src="/brand/header-symbol.svg"
          alt=""
          width={22}
          height={22}
          draggable={false}
        />
        {/* Navy orbit — readable on paper / beige */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={onLightRef}
          className="gravity-cursor__logo gravity-cursor__logo--on-light"
          src="/brand/symbol-small.svg"
          alt=""
          width={22}
          height={22}
          draggable={false}
        />
      </div>
    </div>
  );
}
