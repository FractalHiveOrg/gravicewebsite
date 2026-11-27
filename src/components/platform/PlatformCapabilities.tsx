"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useScrollStep } from "@/gravice/hooks/useScrollStep";
import {
  AutomateStage,
  ConnectStage,
  IntelligenceStage,
  SecureStage,
  STAGE_H,
  STAGE_W,
} from "./CapabilityVisuals";

/**
 * "Platform capabilities" (Figma: Platform — Desktop (v3), sticky scroll · 4 states).
 * Desktop: the list stays pinned on the left and the visual on the right swaps as each
 * capability becomes active. Below lg every capability is stacked with its own visual.
 * Visuals are drawn on a fixed 688 × 500 stage that shrinks to fit narrower panels.
 */

type Capability = { title: string; body: string; example: string; visual: ReactNode };

const CAPABILITIES: Capability[] = [
  {
    title: "Automate the flow",
    body: "Move work through the right steps, apply your checks and alert the right person, without writing code.",
    example: "In Nico: an invoice is checked and routed for approval.",
    visual: <AutomateStage />,
  },
  {
    title: "Connect your systems",
    body: "Plug GraviceOS into the apps your teams already use, from ERPs, CRMs and accounting software to HR systems, drives, AI tools and social media. Data flows in and results flow back, with no manual exports.",
    example: "Connects across your business, not just one department.",
    visual: <ConnectStage />,
  },
  {
    title: "Secure and traceable",
    body: "Control who sees what, and keep a record of every action, in every product.",
    example: "In V-Track: every change to a collateral record is on the trail.",
    visual: <SecureStage />,
  },
  {
    title: "Intelligence built in",
    body: "Ask in plain language and Gravice Intelligence gets it done. It can build a workflow, summarise a document, create a report or take an action for you.",
    example: "In Nico: one sentence becomes a working workflow.",
    visual: <IntelligenceStage />,
  },
];

function ActiveItem({ c }: { c: Capability }) {
  return (
    <>
      <p className="font-serif text-[24px] text-deep-space">{c.title}</p>
      <p className="text-[16px] leading-[1.55] text-[#5a6472]">{c.body}</p>
      <p className="self-start rounded-lg bg-[#edeae3] px-2.5 py-1.5 text-[13px] font-medium text-deep-space">
        {c.example}
      </p>
    </>
  );
}

/** Beige panel that scales its fixed-size stage down to the width it is given. */
function ScaledPanel({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.clientWidth / STAGE_W));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ height: STAGE_H * scale }}
      className="relative w-full overflow-hidden rounded-[24px] bg-[#e9e4da]"
    >
      <div
        style={{ width: STAGE_W, height: STAGE_H, transform: `scale(${scale})` }}
        className="absolute top-0 left-0 origin-top-left"
      >
        {children}
      </div>
    </div>
  );
}

export function PlatformCapabilities() {
  const { active, register } = useScrollStep(CAPABILITIES.length, 0.5);
  const count = CAPABILITIES.length;

  return (
    <section data-cursor-surface="light" className="bg-paper">
      <div className="page-x mx-auto max-w-360 pt-16 sm:pt-28">
        <div className="flex max-w-[820px] flex-col gap-4">
          <p className="text-[12px] font-semibold uppercase tracking-[1.44px] text-[#b4501f]">
            Platform capabilities
          </p>
          <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.12] text-deep-space">
            Capabilities that work the same way in every product.
          </h2>
          <p className="text-[18px] leading-normal text-[#5a6472]">
            Every Gravice product, and every kit, runs on the same four capabilities. Here’s what each one looks
            like in practice.
          </p>
        </div>
      </div>

      {/* Desktop: pinned list + swapping visual, driven by the scroll markers behind it. */}
      <div className="relative hidden lg:block" style={{ height: `${count * 75}vh` }}>
        <div aria-hidden className="absolute inset-0 flex flex-col">
          {CAPABILITIES.map((c, i) => (
            <div key={c.title} ref={register(i)} className="flex-1" />
          ))}
        </div>
        <div className="sticky top-(--gv-header-h) flex h-[calc(100svh-var(--gv-header-h))] items-center">
          <div className="page-x mx-auto grid w-full max-w-360 grid-cols-[440px_minmax(0,688px)] items-center justify-between gap-x-18">
            <div className="flex flex-col gap-1.5">
              <p className="text-[12px] font-semibold text-[#b4501f]" aria-live="polite">
                {active + 1} / {count}
              </p>
              {CAPABILITIES.map((c, i) =>
                i === active ? (
                  <div key={c.title} className="flex flex-col gap-2.5 border-l-[3px] border-pull-orange py-3.5 pl-5">
                    <ActiveItem c={c} />
                  </div>
                ) : (
                  <p
                    key={c.title}
                    className="border-l border-[#e4e0d6] py-3.5 pl-5 text-[18px] font-medium text-[#8a93a0]"
                  >
                    {c.title}
                  </p>
                ),
              )}
            </div>
            <ScaledPanel>
              {CAPABILITIES.map((c, i) => (
                <div
                  key={c.title}
                  aria-hidden={i !== active}
                  className={`absolute inset-0 transition-[opacity,transform] duration-500 ease-out-expo motion-reduce:transition-none ${
                    i === active ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0"
                  }`}
                >
                  {c.visual}
                </div>
              ))}
            </ScaledPanel>
          </div>
        </div>
      </div>

      {/* Mobile and tablet: each capability with its own visual. */}
      <div className="page-x mx-auto flex max-w-360 flex-col gap-12 pb-16 pt-10 sm:pb-28 lg:hidden">
        {CAPABILITIES.map((c, i) => (
          <div key={c.title} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2.5 border-l-[3px] border-pull-orange py-1 pl-5">
              <p className="text-[12px] font-semibold text-[#b4501f]">
                {i + 1} / {count}
              </p>
              <ActiveItem c={c} />
            </div>
            <div aria-hidden className="mx-auto w-full max-w-[688px]">
              <ScaledPanel>
                <div className="absolute inset-0">{c.visual}</div>
              </ScaledPanel>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
