"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useHeroMotion } from "@/components/HeroMotionGate";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Legal rebrand notice window — show through this date (local midnight end). */
const REBRAND_UNTIL = new Date("2028-10-24T23:59:59");

/** Visible duration before fade-out begins. */
const SHOW_MS = 3000;
const FADE_MS = 400;

type Phase = "enter" | "from" | "swap" | "to" | "hold" | "leave";

/**
 * True after an in-app route change. Resets on full page reload.
 * Must NOT flip during React Strict Mode’s double effect invoke on first mount.
 */
let navigatedInApp = false;

/**
 * FractalHive → Gravice announcement.
 * Hard load / reload of `/` only, through REBRAND_UNTIL.
 * Hero DotField stays blocked until Continue / auto-dismiss fade completes.
 */
export function RebrandIntro() {
  const pathname = usePathname();
  const { allowHero } = useHeroMotion();
  const reduced = usePrefersReducedMotion();
  const titleId = useId();
  const continueRef = useRef<HTMLButtonElement>(null);
  const finished = useRef(false);
  const prevPath = useRef(pathname);
  const [portal, setPortal] = useState(false);
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("enter");

  // Mark in-app navigation only when the path actually changes (Strict Mode safe).
  useEffect(() => {
    if (prevPath.current !== pathname) {
      navigatedInApp = true;
      prevPath.current = pathname;
    }
  }, [pathname]);

  useEffect(() => {
    setPortal(true);

    const isHome = pathname === "/";
    const expired = Date.now() > REBRAND_UNTIL.getTime();

    // In-app hops or non-home: no notice — unlock hero immediately.
    if (!isHome || expired || navigatedInApp) {
      document.documentElement.classList.remove("rebrand-lock");
      allowHero();
      return;
    }

    // Hard entry to `/`: show notice. Do NOT call allowHero() here.
    // Safe under Strict Mode double-invoke (idempotent; never releases hero).
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    setOpen(true);
    document.documentElement.classList.add("rebrand-lock");
  }, [pathname, allowHero]);

  // Pin scroll at top while the notice is up.
  useEffect(() => {
    if (!open) return;
    const pin = () => {
      if (window.scrollY !== 0) window.scrollTo(0, 0);
    };
    pin();
    window.addEventListener("scroll", pin, { passive: true });
    const id = window.setInterval(pin, 50);
    return () => {
      window.removeEventListener("scroll", pin);
      window.clearInterval(id);
    };
  }, [open]);

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
    if (phase !== "hold" && !(reduced && open)) return;
    const t = window.setTimeout(() => continueRef.current?.focus(), 40);
    return () => clearTimeout(t);
  }, [phase, reduced, open]);

  useEffect(() => {
    if (!open || finished.current) return;

    if (reduced) {
      setPhase("hold");
      const leave = window.setTimeout(() => dismiss(), SHOW_MS);
      return () => clearTimeout(leave);
    }

    const steps: { at: number; next: Phase }[] = [
      { at: 700, next: "swap" },
      { at: 1200, next: "to" },
      { at: 1600, next: "hold" },
    ];

    const timers = steps.map(({ at, next }) =>
      window.setTimeout(() => {
        if (!finished.current) setPhase(next);
      }, at),
    );

    const leave = window.setTimeout(() => dismiss(), SHOW_MS);
    timers.push(leave);

    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, reduced]);

  function dismiss() {
    if (finished.current) return;
    finished.current = true;
    setPhase("leave");
    // Release hero only after the black overlay has fully faded.
    window.setTimeout(() => {
      setOpen(false);
      document.documentElement.classList.remove("rebrand-lock");
      window.scrollTo(0, 0);
      allowHero();
    }, FADE_MS);
  }

  if (!portal || !open) return null;

  const fromIn = phase === "enter" || phase === "from";
  const fromOut =
    phase === "swap" ||
    phase === "to" ||
    phase === "hold" ||
    phase === "leave";
  const toRising = phase === "swap";
  const toIn =
    phase === "to" ||
    phase === "hold" ||
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
          <p className="rebrand-modal__sub">Intelligence, at the centre.</p>
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
