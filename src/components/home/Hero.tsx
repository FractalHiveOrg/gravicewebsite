"use client";

import { Button } from "@/components/Button";
import { GravityMirror } from "@/components/GravityMirror";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const line = reduced ? "" : "motion-hero-line";

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-deep-space"
      data-hero-track
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at center, #F6682E 0.9px, transparent 1.2px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 70% 45%, black 20%, transparent 75%)",
        }}
      />

      <div className="page-x relative mx-auto flex max-w-[1440px] flex-col items-center gap-10 pb-16 pt-12 sm:gap-12 sm:pb-20 sm:pt-16 lg:flex-row lg:gap-12 lg:pb-24 lg:pt-24 xl:gap-16 xl:pb-[120px]">
        <div className="flex w-full min-w-0 flex-1 flex-col gap-6 sm:gap-7">
          <p
            className={`text-[12px] font-semibold uppercase tracking-[0.96px] text-pull-orange ${line}`}
            style={{ ["--hero-delay" as string]: "80ms" }}
          >
            Fintech for banks and growing businesses
          </p>
          <h1
            className={`font-serif text-[clamp(2.25rem,7vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-paper ${line}`}
            style={{ ["--hero-delay" as string]: "180ms" }}
          >
            Structure, at the centre.
          </h1>
          <p
            className={`max-w-[36rem] text-[clamp(1rem,2.4vw,1.25rem)] leading-[1.6] text-navy-200 ${line}`}
            style={{ ["--hero-delay" as string]: "300ms" }}
          >
            Gravice builds software that brings order to slow, manual,
            high-stakes work, so banks and growing businesses can move faster
            with less risk.
          </p>
          <div
            className={`flex flex-wrap gap-3 sm:gap-4 ${line}`}
            style={{ ["--hero-delay" as string]: "420ms" }}
          >
            <Button href="#products">Explore products</Button>
            <Button href="/demo" variant="secondary-dark">
              Book a demo
            </Button>
          </div>
        </div>

        <div
          className={`relative w-full min-w-0 max-w-[min(100%,420px)] shrink-0 lg:max-w-[min(46%,520px)] ${reduced ? "" : "motion-hero-mirror"}`}
        >
          <GravityMirror
            size={520}
            nodeColor="#8B99AC"
            assemble
            trackSelector="[data-hero-track]"
            className="mx-auto"
          />
        </div>
      </div>
    </section>
  );
}
