"use client";

import { useEffect, useRef } from "react";

type Props = {
  size?: number;
  className?: string;
  interactive?: boolean;
  /** Listen for pointer on this element (or document) instead of only the canvas */
  trackSelector?: string;
  /** Dot fill for lattice nodes (not the orange core) */
  nodeColor?: string;
  coreColor?: string;
  /** Assemble-from-centre entrance (hero focal moment) */
  assemble?: boolean;
};

/**
 * Convex Gravity Mirror: 9×9 lattice on a dome (~70°), head-on.
 * Focal motion: assemble from the orange core, then track the pointer.
 */
export function GravityMirror({
  size = 520,
  className = "",
  interactive = true,
  trackSelector,
  nodeColor = "#8B99AC",
  coreColor = "#F6682E",
  assemble = false,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const assembleT = useRef(assemble ? 0 : 1);
  const raf = useRef<number>(0);
  const start = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const canTrack = interactive && !reduceMotion;
    if (reduceMotion || !assemble) {
      assembleT.current = 1;
    } else {
      assembleT.current = 0;
      start.current = performance.now();
    }

    const grid = 9;
    const half = (grid - 1) / 2;
    const domeDeg = 70;
    const maxTheta = (domeDeg * Math.PI) / 180;

    type Dot = {
      u: number;
      v: number;
      r: number;
      isCore: boolean;
    };

    const dots: Dot[] = [];
    for (let j = 0; j < grid; j++) {
      for (let i = 0; i < grid; i++) {
        const u = (i - half) / half;
        const v = (j - half) / half;
        const r = Math.hypot(u, v);
        if (r > 1.02) continue;
        dots.push({ u, v, r, isCore: i === half && j === half });
      }
    }

    function project(u: number, v: number, tiltX: number, tiltY: number) {
      const r = Math.min(1, Math.hypot(u, v));
      const theta = r * maxTheta;
      const phi = Math.atan2(v, u);
      let x = Math.sin(theta) * Math.cos(phi);
      let y = Math.sin(theta) * Math.sin(phi);
      let z = Math.cos(theta);

      const ax = tiltY * 0.42;
      const ay = tiltX * 0.42;
      let y1 = y * Math.cos(ax) - z * Math.sin(ax);
      let z1 = y * Math.sin(ax) + z * Math.cos(ax);
      y = y1;
      z = z1;
      const x1 = x * Math.cos(ay) + z * Math.sin(ay);
      z1 = -x * Math.sin(ay) + z * Math.cos(ay);
      x = x1;
      z = z1;

      const perspective = 1.8 / (1.8 + (1 - z));
      const scale = size * 0.42 * perspective;
      const cx = size / 2 + x * scale;
      const cy = size / 2 + y * scale;
      const baseR = size * 0.018;
      const radius = baseR * (0.55 + 0.9 * perspective) * (1 - r * 0.35);
      const flatten = 0.55 + 0.45 * (1 - r);
      return { cx, cy, rx: radius, ry: radius * flatten, z, r };
    }

    function easeOutCubic(t: number) {
      return 1 - (1 - t) ** 3;
    }

    function draw(now: number) {
      if (assembleT.current < 1 && !reduceMotion) {
        const elapsed = now - start.current;
        assembleT.current = Math.min(1, easeOutCubic(elapsed / 1400));
      }

      current.current.x += (target.current.x - current.current.x) * 0.07;
      current.current.y += (target.current.y - current.current.y) * 0.07;

      ctx!.clearRect(0, 0, size, size);

      const t = assembleT.current;
      const sorted = dots
        .map((d) => ({
          d,
          p: project(d.u, d.v, current.current.x, current.current.y),
        }))
        .sort((a, b) => a.p.z - b.p.z);

      for (const { d, p } of sorted) {
        // Appear from core outward (structure assembling)
        const appearAt = d.isCore ? 0 : 0.08 + d.r * 0.85;
        const local = Math.max(0, Math.min(1, (t - appearAt) / 0.22));
        if (local <= 0) continue;

        const grow = 0.35 + 0.65 * local;
        ctx!.beginPath();
        ctx!.ellipse(
          p.cx,
          p.cy,
          Math.max(0.5, p.rx * grow),
          Math.max(0.5, p.ry * grow),
          0,
          0,
          Math.PI * 2,
        );
        if (d.isCore) {
          ctx!.fillStyle = coreColor;
          ctx!.globalAlpha = local;
        } else {
          const alpha = (0.35 + 0.55 * ((p.z + 1) / 2)) * local;
          ctx!.fillStyle = hexToRgba(nodeColor, alpha);
          ctx!.globalAlpha = 1;
        }
        ctx!.fill();
        ctx!.globalAlpha = 1;
      }

      raf.current = requestAnimationFrame(draw);
    }

    function setTargetFromClient(clientX: number, clientY: number) {
      if (!canTrack || !canvas) return;
      const trackEl =
        (trackSelector && document.querySelector(trackSelector)) ||
        canvas.parentElement ||
        canvas;
      const rect = trackEl.getBoundingClientRect();
      const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((clientY - rect.top) / rect.height) * 2 - 1;
      target.current.x = Math.max(-1, Math.min(1, nx));
      target.current.y = Math.max(-1, Math.min(1, ny));
    }

    function onMove(e: PointerEvent) {
      setTargetFromClient(e.clientX, e.clientY);
    }

    function onLeave() {
      target.current.x = 0;
      target.current.y = 0;
    }

    const trackEl =
      (trackSelector && document.querySelector(trackSelector)) ||
      canvas.parentElement ||
      canvas;

    if (canTrack) {
      trackEl.addEventListener("pointermove", onMove as EventListener);
      trackEl.addEventListener("pointerleave", onLeave);
    }

    raf.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf.current);
      trackEl.removeEventListener("pointermove", onMove as EventListener);
      trackEl.removeEventListener("pointerleave", onLeave);
    };
  }, [
    size,
    interactive,
    nodeColor,
    coreColor,
    assemble,
    trackSelector,
  ]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className={["motion-mirror", className].filter(Boolean).join(" ")}
      style={{
        width: "100%",
        height: "auto",
        maxWidth: size,
        aspectRatio: "1",
        display: "block",
      }}
      aria-hidden
    />
  );
}

function hexToRgba(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const n = parseInt(full, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}
