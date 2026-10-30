import Link from "next/link";
import type { ReactNode } from "react";
import { HeroGlobe } from "@/gravice/components/HeroGlobe";
import type { GraviceProduct } from "@/gravice/components/ProductOrb";
import { PRODUCT_META, ProductMark, ProductTag } from "@/gravice/components/industry/ProductMark";
import { insights } from "@/lib/insights";
import { Reveal } from "../Reveal";
import Image from "next/image"
/**
 * Sections shared by the industry pages (prototypes/financial-services.html, manufacturing.html: one template).
 * Each page supplies its copy; page-specific sections (workflow engine, integrations, compliance) live with the page.
 */

export function IndustryHero({
  industry,
  title,
  lede,
  audiences,
  actions,
}: {
  industry: string;
  title: string;
  lede: string;
  audiences: string[];
  actions: ReactNode;
}) {
  return (
    <section data-cursor-surface="dark" className="gv-band gv-i-hero">
      <div className="gv-wrap gv-i-hero-grid">
        <div className="gv-i-hero-copy">
          <div className="gv-i-crumb">
            Industries · <b>{industry}</b>
          </div>
          <h1>{title}</h1>
          <p className="gv-p-lede">{lede}</p>
          <div className="gv-row">{actions}</div>
          <div className="gv-i-seg">
            <span>For</span>
            {audiences.map((a) => (
              <em key={a}>{a}</em>
            ))}
          </div>
        </div>
        <div className="gv-i-globe" aria-hidden="true">
          <HeroGlobe playIntro={false} followCursor={false} />
        </div>
      </div>
    </section>
  );
}

export type Pressure = { product: GraviceProduct; title: string; body: string };

export function IndustryPressure({ eyebrow, title, items }: { eyebrow: string; title: string; items: Pressure[] }) {
  return (
    <section data-cursor-surface="light" className="gv-band gv-light gv-i-cream">
      <div className="gv-wrap">
        <div className="gv-i-top">
          <div className="gv-eyebrow">{eyebrow}</div>
          <h2>{title}</h2>
        </div>
        <div className="gv-i-press-grid">
          {items.map((p) => (
            <article key={p.title} className="gv-i-press">
              <ProductMark product={p.product} />
              <h3>{p.title}</h3>
              <p>{p.body}</p>
              <ProductTag product={p.product} label={`See how ${PRODUCT_META[p.product].name} tackles this →`} hideLogo={true} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export type Role = { title: string; lede: string; points: string[]; products: GraviceProduct[] };

export function IndustryRoles({ roles }: { roles: Role[] }) {
  return (
    <section data-cursor-surface="light" className="gv-band gv-light gv-i-cream">
      <div className="gv-wrap">
        <div className="gv-i-top">
          <div className="gv-eyebrow">By role</div>
          <h2>What each team gets.</h2>
        </div>
        <div className="gv-i-role-grid">
          {roles.map((r) => (
            <div key={r.title} className="gv-i-role">
              <h3>{r.title}</h3>
              <p>{r.lede}</p>
              <ul>
                {r.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
              <div className="gv-i-tags">
                {r.products.map((p) => (
                  <ProductTag key={p} product={p} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export type Insight = { kind: string; title: string; meta: string };

export function IndustryInsights({ title, items }: { title: string; items: Insight[] }) {
  return (
    <section data-cursor-surface="light" className="gv-band gv-light gv-i-cream">
      <div className="gv-wrap">
        <div className="gv-i-top gv-p-top-between">
          <div className="gv-stack">
            <div className="gv-eyebrow">Insights</div>
            <h2>{title}</h2>
          </div>
          <Link className="gv-textlink" href="/insights">
            All insights →
          </Link>
        </div>
         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
        {insights.slice(0, 3).map((a, i) =>
        (
          <Reveal key={a.url} delay={i * 70}>
            <a
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="motion-card group flex h-full flex-col overflow-hidden rounded-[20px] border border-transparent bg-white hover:border-navy-100"
            >
              <div className="relative h-[180px] overflow-hidden bg-navy-100">
                <Image
                  src={a.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-3 px-5 pb-5 pt-5 sm:px-6 sm:pb-6">
                <p className="text-[12px] font-semibold uppercase tracking-[0.96px] text-slate">
                  LinkedIn
                </p>
                <h3 className="font-serif text-[clamp(1.05rem,2.2vw,1.25rem)] font-normal leading-[1.25] text-balance text-deep-space transition-colors group-hover:text-navy">
                  {a.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-pretty text-slate">
                  {a.blurb}
                </p>
                <span className="mt-auto pt-2 text-[14px] font-medium text-pull-orange-deep">
                  Read on LinkedIn →
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
      </div>
    </section>
  );
}

export function IndustryClosing({
  title,
  lede,
  actions,
  explore,
}: {
  title: string;
  lede: string;
  actions: ReactNode;
  /** "Explore the products" cards: one per product with a short line. */
  explore: { product: GraviceProduct; line: string }[];
}) {
  return (
    <section data-cursor-surface="dark" className="gv-band gv-p-close gv-i-close">
      <div className="gv-wrap gv-p-close-inner">
        <div className="gv-i-close-globe" aria-hidden="true">
          <HeroGlobe playIntro={false} followCursor={false} />
        </div>
        <h2>{title}</h2>
        <p>{lede}</p>
        <div className="gv-row">{actions}</div>
        
      </div>
    </section>
  );
}
