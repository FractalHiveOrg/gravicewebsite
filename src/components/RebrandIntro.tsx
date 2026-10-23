"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const STORAGE_KEY = "gravice-rebrand-seen-v2";

type Phase = "enter" | "from" | "swap" | "to" | "ready" | "leave";

/**
 * First-visit announcement as a centered modal over the live site.
 * Logos crossfade in one shared frame; copy and Continue are always present.
 */
export function RebrandIntro() {
  const reduced = usePrefersReducedMotion();
  const titleId = useId();
  const continueRef = useRef<HTMLButtonElement>(null);
  const finished = useRef(false);
  const [portal, setPortal] = useState(false);
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("enter");

  useEffect(() => {
    setPortal(true);
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      /* private mode */
    }
    setOpen(true);
    document.documentElement.classList.add("rebrand-lock");
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (phase !== "ready" && !(reduced && open)) return;
    const t = window.setTimeout(() => continueRef.current?.focus(), 40);
    return () => clearTimeout(t);
  }, [phase, reduced, open]);

  useEffect(() => {
    if (!open || finished.current) return;

    if (reduced) {
      setPhase("ready");
      return;
    }

    const steps: { at: number; next: Phase }[] = [
      { at: 1800, next: "swap" },
      { at: 2550, next: "to" },
      { at: 3100, next: "ready" },
    ];

    const timers = steps.map(({ at, next }) =>
      window.setTimeout(() => {
        if (!finished.current) setPhase(next);
      }, at),
    );

    return () => timers.forEach(clearTimeout);
  }, [open, reduced]);

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  function dismiss() {
    if (finished.current) return;
    finished.current = true;
    persist();
    setPhase("leave");
    window.setTimeout(() => {
      setOpen(false);
      document.documentElement.classList.remove("rebrand-lock");
    }, 320);
  }

  if (!portal || !open) return null;

  const fromIn = phase === "enter" || phase === "from";
  const fromOut =
    phase === "swap" ||
    phase === "to" ||
    phase === "ready" ||
    phase === "leave";
  const toRising = phase === "swap";
  const toIn =
    phase === "to" ||
    phase === "ready" ||
    phase === "leave" ||
    reduced;

  return createPortal(
    <div
      className={[
        "rebrand-modal",
        phase === "enter" ? "is-entering" : "",
        phase === "leave" ? "is-leaving" : "",
        reduced ? "is-reduced" : "",
      ].join(" ")}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="rebrand-modal__scrim"
        aria-label="Dismiss"
        onClick={dismiss}
      />

      <div className="rebrand-modal__panel">
        <div className="rebrand-modal__stage" aria-hidden>
          {!reduced && (
            <div
              className={[
                "rebrand-modal__mark rebrand-modal__mark--from",
                fromIn ? "is-in" : "",
                fromOut ? "is-out" : "",
              ].join(" ")}
            >
              <Image
                src="/fractalhive_logo.png"
                alt=""
                width={104}
                height={104}
                priority
                unoptimized
                className="rebrand-modal__fh"
              />
            </div>
          )}

          <div
            className={[
              "rebrand-modal__mark rebrand-modal__mark--to",
              toRising ? "is-rising" : "",
              toIn ? "is-in" : "",
            ].join(" ")}
          >
            <Image
              src="/brand/symbol-on-dark.svg"
              alt=""
              width={88}
              height={88}
              priority
              unoptimized
              className="rebrand-modal__gv"
            />
          </div>

          <span
            className={[
              "rebrand-modal__core",
              phase === "swap" ? "is-pulse" : "",
            ].join(" ")}
          />
        </div>

        <div className="rebrand-modal__copy">
          <h2 id={titleId} className="rebrand-modal__title">
            FractalHive is now Gravice
          </h2>
          <p className="rebrand-modal__sub">Structure, at the centre.</p>
        </div>

        <div className="rebrand-modal__actions">
          <button
            ref={continueRef}
            type="button"
            className="rebrand-modal__continue"
            onClick={dismiss}
            data-magnetic
          >
            Continue to site
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
