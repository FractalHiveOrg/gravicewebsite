import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/Button";
import { HeroGlobe } from "@/gravice/components/HeroGlobe";
import { PlatformCapabilities } from "./PlatformCapabilities";
import { ProblemVisual } from "./ProblemVisual";
import { SecurityActivity } from "./SecurityActivity";

/**
 * GraviceOS platform page (Figma: "Platform — Desktop (v3)").
 * hero globe → the problem → one foundation → capabilities (sticky) → how it fits (rings)
 * → kits → security → products built on GraviceOS → closing CTA.
 * Header and footer come from the root layout.
 */

const CONTACT = "/company/contact";
const NICO_APP = "https://nico.gravicesolutions.com/";

/* —— Shared pieces —— */

function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={`text-[12px] font-semibold uppercase tracking-[1.44px] ${
        dark ? "text-pull-orange" : "text-[#b4501f]"
      }`}
    >
      {children}
    </p>
  );
}

function SectionHeading({
  eyebrow,
  title,
  lede,
  dark = false,
  className = "max-w-[760px]",
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <h2
        className={`font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.12] ${dark ? "text-paper" : "text-deep-space"}`}
      >
        {title}
      </h2>
      {lede ? (
        <p className={`text-[18px] leading-normal ${dark ? "text-navy-200" : "text-[#5a6472]"}`}>{lede}</p>
      ) : null}
    </div>
  );
}

const WRAP = "page-x mx-auto max-w-360";
const BAND = "py-16 sm:py-28";

const PRODUCTS = [
  {
    name: "ElevateRM",
    symbol: "/elevateRmSymbol.svg",
    line: "Less paperwork, more deals for your relationship managers.",
    cta: "Talk to sales",
    href: CONTACT,
  },
  {
    name: "V-Track",
    symbol: "/vtrackSymbol.svg",
    line: "Every collateral revaluation tracked and on time, with nothing missed.",
    cta: "Talk to sales",
    href: CONTACT,
  },
  {
    name: "Nico",
    symbol: "/NicoSymbolNavy.svg",
    line: "Reads the paperwork your business runs on, and does the work that follows.",
    cta: "Visit Nico",
    href: NICO_APP,
    external: true,
  },
];

function ProductLockup({ name, symbol, size }: { name: string; symbol: string; size: number }) {
  return (
    <span className="flex items-center gap-3">
      <Image src={symbol} alt="" width={size} height={size} className="shrink-0" unoptimized />
      <span className="flex flex-col">
        <span className={`font-serif leading-tight text-deep-space ${size > 32 ? "text-[20px]" : "text-[18px]"}`}>
          {name}
        </span>
        <span className="text-[12px] leading-tight text-[#5a6472]">by Gravice</span>
      </span>
    </span>
  );
}

/* —— Sections —— */

function Hero() {
  return (
    <section data-cursor-surface="dark" className="overflow-hidden bg-deep-space">
      <div className={`${WRAP} grid items-center gap-10 pb-16 pt-16 sm:pb-30 sm:pt-28 lg:grid-cols-[minmax(0,1fr)_520px]`}>
        <div className="flex flex-col items-start gap-6">
          <Eyebrow dark>GraviceOS</Eyebrow>
          <h1 className="font-serif text-[clamp(2.5rem,5.5vw,4rem)] leading-[1.08] text-paper">
            The operating layer behind every Gravice product.
          </h1>
          <p className="max-w-[640px] text-[clamp(1.0625rem,1.6vw,1.1875rem)] leading-normal text-navy-200">
           The same foundation that runs ElevateRM, V-Track and Nico. Use it through our products, or build on it with our kits.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <Button href={CONTACT}>Contact us</Button>
            <Button href="#kits" variant="secondary-dark">
              Explore kits
            </Button>
          </div>
        </div>
        <div aria-hidden className="relative mx-auto aspect-square w-full max-w-[460px]">
          <HeroGlobe playIntro={false} followCursor={false} />
        </div>
      </div>
    </section>
  );
}

const PROBLEMS = [
  { title: "Systems that don’t share data.", body: "The same details get typed in again and again." },
  { title: "Hand-offs by email and spreadsheet.", body: "Work stalls between people and teams." },
  { title: "No single record of who did what.", body: "Every audit turns into a hunt." },
];

function Problem() {
  return (
    <section data-cursor-surface="light" className="bg-paper">
      <div className={`${WRAP} ${BAND} grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_560px] lg:gap-20`}>
        <div className="flex flex-col gap-8">
          <div className="flex max-w-[560px] flex-col gap-4">
            <Eyebrow>The problem</Eyebrow>
            <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.12] text-deep-space">
              Most business software is held together by hand.
            </h2>
          </div>
          <ul className="flex flex-col gap-5">
            {PROBLEMS.map((p) => (
              <li key={p.title} className="flex items-start gap-4">
                <span aria-hidden className="mt-[9px] size-2.5 shrink-0 rounded-full bg-pull-orange" />
                <div className="flex flex-col gap-0.5 leading-normal">
                  <p className="text-[19px] font-semibold text-deep-space">{p.title}</p>
                  <p className="text-[17px] text-[#5a6472]">{p.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <ProblemVisual />
      </div>
    </section>
  );
}

const BENEFITS = [
  {
    title: "Live in weeks, not months",
    body: "The foundation is already built and proven, so Gravice products and kits plug into your systems quickly, without a long build.",
  },
  {
    title: "Automate the whole job",
    body: "Work flows from the moment it arrives to the moment it’s filed, without anyone retyping it.",
  },
  {
    title: "Start with connected data",
    body: "Intelligence works better when everything it reads is already in one place.",
  },
];

function Foundation() {
  return (
    <section data-cursor-surface="light" className="bg-white">
      <div className={`${WRAP} ${BAND} flex flex-col gap-14`}>
        <SectionHeading
          eyebrow="One foundation"
          title="When everything runs on one foundation, work moves faster."
          lede="GraviceOS replaces the tools, hand-offs and manual steps in between with one shared layer."
        />
        <div className="grid gap-10 md:grid-cols-3">
          {BENEFITS.map((b) => (
            <div key={b.title} className="flex flex-col gap-2.5 border-t-2 border-pull-orange pt-5">
              <p className="text-[20px] font-semibold leading-[1.4] text-deep-space">{b.title}</p>
              <p className="text-[16px] leading-[1.55] text-[#5a6472]">{b.body}</p>
            </div>
          ))}
        </div>

        <div aria-hidden className="flex flex-col gap-4 rounded-[24px] bg-deep-space px-5 py-8 sm:px-16 sm:py-12">
          <div className="grid gap-3 sm:grid-cols-3 sm:gap-5">
            {PRODUCTS.map((p) => (
              <div key={p.name} className="flex items-center justify-center rounded-[14px] bg-paper px-5 py-[18px]">
                <ProductLockup name={p.name} symbol={p.symbol} size={32} />
              </div>
            ))}
          </div>
          <div className="hidden w-full justify-between sm:flex sm:px-[16.8%]">
            {PRODUCTS.map((p) => (
              <span key={p.name} className="h-7 w-0.5 bg-pull-orange/70" />
            ))}
          </div>
          <div className="relative h-[107px] w-full overflow-hidden rounded-2xl border border-paper/12 bg-[#13233a]">
            {/* Dots fan out from the bottom-right corner, where the core glows. */}
            <Image
              src="/platform/bar-core-glow.svg"
              alt=""
              width={500}
              height={500}
              unoptimized
              className="absolute -top-[144px] -right-[249px] max-w-none"
            />
            <Image
              src="/platform/bar-concentric-dots.svg"
              alt=""
              width={1072}
              height={107}
              unoptimized
              className="absolute -top-px -right-px max-w-none"
            />
            <Image
              src="/platform/bar-core.svg"
              alt=""
              width={56}
              height={56}
              unoptimized
              className="absolute top-[78px] -right-[27px] max-w-none"
            />
            <span className="absolute top-1/2 left-[43px] -translate-y-1/2 font-serif text-[34px] leading-none text-paper">
              GraviceOS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

const LAYERS = [
  { title: "The flow", body: "Sign in, connect, move the work and send it back.", mark: "border-paper" },
  { title: "Every step recorded", body: "A full trail around everything that happens.", mark: "border-[#8fa3bf]" },
  { title: "Intelligence throughout", body: "Reads, summarises, reports and acts, across the whole flow.", mark: "border-pull-orange" },
];

/** Points evenly spaced on a circle around (300, 300). */
function ring(count: number, r: number) {
  return Array.from({ length: count }, (_, i) => {
    const a = (i / count) * Math.PI * 2;
    return [300 + r * Math.cos(a), 300 + r * Math.sin(a)] as const;
  });
}
const RECORD_MARKS = ring(16, 200);
const INTELLIGENCE_DOTS = ring(36, 270);

/* Diagram labels: [text, centre x, centre y] on the 600 × 600 diagram. */
const FLOW_NODES: [string, number, number][] = [
  ["Sign in", 300, 170],
  ["Connect", 430, 300],
  ["Work moves", 300, 430],
  ["Send back", 170, 300],
];

const pct = (v: number) => `${(v / 600) * 100}%`;

function RingsDiagram() {
  return (
    <div aria-hidden className="relative mx-auto aspect-square w-full max-w-[600px]">
      <svg viewBox="0 0 600 600" className="absolute inset-0 size-full overflow-visible">
        <defs>
          <radialGradient id="gv-intel-glow">
            <stop offset="0.8" stopColor="#F6682E" stopOpacity="0" />
            <stop offset="0.9" stopColor="#F6682E" stopOpacity="0.32" />
            <stop offset="1" stopColor="#F6682E" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="300" cy="300" r="300" fill="url(#gv-intel-glow)" />
        <circle cx="300" cy="300" r="269" fill="#0E1B2C" stroke="#F6682E" strokeWidth="2" />
        {/* Rings turn slowly (outer clockwise, middle counter-clockwise); labels stay put. */}
        <g className="origin-center animate-spin motion-reduce:animate-none" style={{ animationDuration: "90s" }}>
          {INTELLIGENCE_DOTS.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2" fill="#F6682E" />
          ))}
        </g>
        <circle cx="300" cy="300" r="200" fill="#13233A" />
        <g
          className="origin-center animate-spin motion-reduce:animate-none"
          style={{ animationDuration: "70s", animationDirection: "reverse" }}
        >
          <circle cx="300" cy="300" r="200" fill="none" stroke="#8FA3BF" strokeWidth="1.25" strokeDasharray="5 6" />
          {RECORD_MARKS.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2.5" fill="#8FA3BF" />
          ))}
        </g>
        <circle cx="300" cy="300" r="130" fill="#1A2A42" stroke="#F7F5F0" strokeOpacity="0.45" strokeWidth="1.25" />
      </svg>

      {FLOW_NODES.map(([label, x, y]) => (
        <span
          key={label}
          style={{ left: pct(x), top: pct(y) }}
          className="absolute -translate-1/2 rounded-full bg-paper px-3 py-[7px] text-[13px] font-semibold whitespace-nowrap text-deep-space max-sm:px-2 max-sm:py-1 max-sm:text-[10px]"
        >
          {label}
        </span>
      ))}
      <span
        style={{ left: "50%", top: "50%" }}
        className="absolute -translate-1/2 font-serif text-[16px] whitespace-nowrap text-paper max-sm:text-[13px]"
      >
        Your work
      </span>
      <span
        style={{ left: "50%", top: pct(100) }}
        className="absolute -translate-1/2 rounded-full border border-[#8fa3bf] bg-deep-space px-3 py-1.5 text-[12px] font-semibold whitespace-nowrap text-[#c9d3e0] max-sm:text-[10px]"
      >
        Every step recorded
      </span>
      <span
        style={{ left: "50%", top: pct(30) }}
        className="absolute -translate-1/2 rounded-full border border-pull-orange bg-deep-space px-3 py-1.5 text-[12px] font-semibold whitespace-nowrap text-pull-orange max-sm:text-[10px]"
      >
        Intelligence throughout
      </span>
    </div>
  );
}

function HowItFits() {
  return (
    <section data-cursor-surface="dark" className="overflow-hidden bg-deep-space">
      <div className={`${WRAP} ${BAND} grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_600px] lg:gap-20`}>
        <div className="flex flex-col gap-5">
          <Eyebrow dark>How it fits together</Eyebrow>
          <h2 className="font-serif text-[clamp(2rem,3.6vw,2.75rem)] leading-[1.14] text-paper">
            Your work at the centre.<br /> Everything else wraps around it.
          </h2>
          <p className="text-[18px] leading-normal text-navy-200">
            Work flows through the centre. Every step is recorded around it, and intelligence wraps the whole thing.
          </p>
          <ul className="flex flex-col pt-3">
            {LAYERS.map((l) => (
              <li key={l.title} className="flex items-start gap-4 border-t border-paper/12 py-4">
                <span aria-hidden className={`mt-1 size-3.5 shrink-0 rounded-full border-2 ${l.mark}`} />
                <div className="flex flex-col gap-[3px]">
                  <p className="text-[18px] font-semibold text-paper">{l.title}</p>
                  <p className="text-[15px] leading-normal text-navy-200">{l.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <RingsDiagram />
      </div>
    </section>
  );
}

const KITS = [
  {
    name: "Relay",
    headline: "Put approvals and alerts into any process.",
    line: "Relay routes work through the right steps, applies your rules, and tells the right people when something needs them.",
    bullets: [
      "Route work through steps, hand-offs and approvals",
      "Change checks and limits without writing code",
      "Alert the right person when something needs them",
    ],
  },
  {
    name: "Relay Pro",
    headline: "Relay that understands what it’s routing, and acts on it.",
    line: "Everything in Relay, with Gravice Intelligence and MCP at its core.",
    bullets: [
      "Everything in Relay: steps, approvals, checks and alerts",
      "Gravice Intelligence reads documents and data, such as an invoice or a notice",
      "MCP connects Gravice Intelligence to your tools, so it can act inside them",
    ],
  },
  {
    name: "Conduit",
    headline: "Connect your product to the systems your customers use.",
    line: "Conduit links your software to the tools around it, so data moves without manual exports.",
    bullets: [
      "Connect to the tools your customers already run",
      "Move data in and out, with no manual exports",
      "Keep every sync on the record",
    ],
  },
];

function Kits() {
  return (
    <section id="kits" data-cursor-surface="light" className="scroll-mt-(--gv-header-h) bg-paper">
      <div className={`${WRAP} ${BAND} flex flex-col gap-12`}>
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Kits"
            title="GraviceOS, inside your software."
            lede="Ready-made kits for software companies. Use the same foundation our products run on, without building it yourself."
          />
         
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {KITS.map((k) => (
            <article
              key={k.name}
              className="flex flex-col gap-5 rounded-[20px] border border-[#e4e0d6] bg-white p-6 sm:p-8"
            >
              <h3 className="font-serif text-[30px] text-deep-space">{k.name}</h3>
              <p className="text-[19px] font-semibold leading-[1.4] text-deep-space">{k.headline}</p>
              <p className="text-[15px] leading-[1.55] text-[#5a6472]">{k.line}</p>
              <span aria-hidden className="h-px w-full bg-[#e4e0d6]" />
              <p className="text-[12px] font-semibold uppercase tracking-[1.44px] text-[#5a6472]">What it does</p>
              <ul className="flex flex-col gap-2.5">
                {k.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-[15px] leading-normal text-deep-space">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-pull-orange" />
                    {b}
                  </li>
                ))}
              </ul>
              <p className="mt-auto rounded-lg bg-paper px-3 py-2 text-[13px] font-medium text-[#5a6472]">
                Included: secure sign-in · full audit trail
              </p>
              <div className="pt-1">
                <Button href={CONTACT}>Contact us</Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const SECURITY_POINTS = [
  "Sign-in controls and roles in every product",
  "A full trail of every action, kept by default",
  "Built for regulated industries like banking",
];

function Security() {
  return (
    <section data-cursor-surface="dark" className="bg-[#0a1422]">
      <div className={`${WRAP} grid items-center gap-12 py-16 sm:py-26 lg:grid-cols-[minmax(0,1fr)_540px] lg:gap-20`}>
        <div className="flex flex-col items-start gap-5">
          <Eyebrow dark>Security</Eyebrow>
          <h2 className="font-serif text-[clamp(2rem,3.6vw,2.75rem)] leading-[1.14] text-paper">
            Your data is safe with GraviceOS.
          </h2>
          <p className="text-[18px] leading-normal text-navy-200">
            Security isn’t added to each product separately. It’s part of the foundation every product and kit is
            built on.
          </p>
          <ul className="flex flex-col gap-3 pt-1">
            {SECURITY_POINTS.map((p) => (
              <li key={p} className="flex items-center gap-3 text-[16px] font-medium text-paper">
                <Image src="/platform/security-point-dot.svg" alt="" width={8} height={8} unoptimized className="shrink-0" />
                {p}
              </li>
            ))}
          </ul>
          <div className="pt-3">
            <Button href={CONTACT} variant="secondary-dark">
              Talk to us
            </Button>
          </div>
        </div>
        <SecurityActivity />
      </div>
    </section>
  );
}

function BuiltOn() {
  return (
    <section data-cursor-surface="light" className="bg-white">
      <div className={`${WRAP} ${BAND} flex flex-col gap-12`}>
        <SectionHeading
          eyebrow="Built on GraviceOS"
          title="Proven in our own products."
          lede="ElevateRM, V-Track and Nico run on GraviceOS every day, for banks, lenders and businesses."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {PRODUCTS.map((p) => {
            const Arrow = p.external ? ArrowUpRight : ArrowRight;
            const card = (
              <>
                <div className="flex flex-1 flex-col gap-3.5 p-6">
                  <ProductLockup name={p.name} symbol={p.symbol} size={40} />
                  <p className="text-[14px] text-[#5a6472]">{p.line}</p>
                </div>
                <div className="flex items-center justify-between border-t border-[#e4e0d6] bg-[#fbfaf7] px-6 py-4 text-[14px] font-semibold text-deep-space">
                  {p.cta}
                  <Arrow
                    className={`size-[18px] transition-transform duration-200 ${
                      p.external
                        ? "group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        : "group-hover:translate-x-0.5"
                    }`}
                    aria-hidden
                  />
                </div>
              </>
            );
            const className =
              "group flex min-h-[200px] flex-col overflow-hidden rounded-[14px] border border-[#e4e0d6] bg-white transition-[border-color,box-shadow] duration-200 hover:border-deep-space/20 hover:shadow-[0_12px_28px_-18px_rgba(14,27,44,0.45)]";
            return p.external ? (
              <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className={className}>
                {card}
              </a>
            ) : (
              <Link key={p.name} href={p.href} className={className}>
                {card}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section data-cursor-surface="dark" className="bg-deep-space">
      <div className={`${WRAP} flex flex-col items-center gap-8 py-16 text-center sm:py-30`}>
        <SectionHeading
          dark
          eyebrow="Get started"
          title="Talk to us about GraviceOS."
          lede="Tell us what you’re building. We’ll show you which kit fits, or which Gravice product already does the job."
          className="max-w-[760px] items-center"
        />
        <div className="flex flex-wrap justify-center gap-3.5">
          <Button href={CONTACT}>Contact us</Button>
          <Button href="/demo" variant="secondary-dark">
            Book a demo
          </Button>
        </div>
      </div>
    </section>
  );
}

export function PlatformPage() {
  return (
    <>
      <Hero />
      <Problem />
      <Foundation />
      <PlatformCapabilities />
      <HowItFits />
      <Kits />
      <Security />
      <BuiltOn />
      <Closing />
    </>
  );
}
