"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";

const roles = [
  {
    id: "business",
    label: "Relationship managers",
    product: "ElevateRM",
    href: "/products/elevaterm",
    title: "Every deal, every customer, one workspace.",
    body: "ElevateRM gives relationship managers everything they need from deal creation to closure. Less time on admin. More time with customers.",
    points: [
      "Deal pipeline with stages and next steps in one view",
      "Customer 360 — relationships, exposure, and history",
      "Manager dashboards for team productivity and pipeline health",
    ],
    cta: "Explore ElevateRM →",
  },
  {
    id: "compliance",
    label: "Credit & risk",
    product: "V-Track",
    href: "/products/v-track",
    title: "An eagle-eye view of your collateral portfolio.",
    body: "V-Track keeps every collateral valuation compliant and audit-ready with dynamic valuation, real-time LTV, and insurance tracking.",
    points: [
      "One digital register for every collateral",
      "Time- and event-based valuation alerts",
      "Audit-ready history of every valuation cycle",
    ],
    cta: "Explore V-Track →",
  },
  {
    id: "operations",
    label: "Operations leads",
    product: "NICO",
    href: "/products/nico",
    title: "One engine. Any process.",
    body: "NICO automates document-heavy processes end-to-end — from ingestion to approval — with NICO Intelligence where judgement is needed.",
    points: [
      "Receive, read, check, resolve, approve, complete",
      "Predictable, explainable, and fully auditable",
      "SaaS ready-made workflows or Enterprise custom deployment",
    ],
    cta: "Explore NICO →",
  },
] as const;

export function ExploreByRole() {
  const [active, setActive] = useState(0);
  const role = roles[active];

  return (
    <section className="section-pad bg-deep-space">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="mb-10 flex flex-col gap-4 md:mb-14">
          <p className="text-[12px] font-semibold uppercase tracking-[0.96px] text-pull-orange">
            Explore by role
          </p>
          <h2 className="max-w-[40rem] font-serif text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-[1.15] tracking-[-0.01em] text-paper">
            Built for the people who keep institutions running.
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div
            className="mb-10 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Roles"
          >
            {roles.map((r, i) => {
              const selected = i === active;
              return (
                <button
                  key={r.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  className={[
                    "rounded-full border border-paper/25 px-3.5 py-2 text-[13px] font-medium transition-[color,background-color,border-color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-5 sm:py-2.5 sm:text-[15px]",
                    selected
                      ? "bg-paper text-deep-space"
                      : "bg-transparent text-navy-200 hover:border-paper/45 hover:text-paper",
                  ].join(" ")}
                  onClick={() => setActive(i)}
                >
                  {r.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div
          key={role.id}
          role="tabpanel"
          className="motion-panel flex flex-col items-center gap-12 lg:flex-row lg:gap-16"
        >
          <div className="flex flex-1 flex-col gap-5">
            <p className="text-[12px] font-semibold uppercase tracking-[0.96px] text-purple-300">
              {role.product}
            </p>
            <h3 className="font-serif text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-[1.15] text-paper">
              {role.title}
            </h3>
            <p className="text-[17px] leading-[1.6] text-navy-200">{role.body}</p>
            <ul className="flex flex-col gap-3">
              {role.points.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-3 text-[16px] text-paper"
                >
                  <span
                    className="size-2 shrink-0 rounded-full bg-pull-orange"
                    aria-hidden
                  />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-2 flex flex-wrap items-center gap-5">
              <Button href="/demo">Book a demo</Button>
              <Button href={role.href} variant="link-orange">
                {role.cta}
              </Button>
            </div>
          </div>

          <div className="relative h-[280px] w-full max-w-[600px] overflow-hidden rounded-2xl border border-paper/10 bg-navy transition-shadow duration-500 hover:shadow-[0_0_0_1px_rgba(246,104,46,0.25)] lg:h-[400px]">
            <Image
              src="/sections/product-screenshot.svg"
              alt="Illustrative product interface"
              fill
              className="object-cover object-left-top p-4"
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
}
