import Link from "next/link";
import type { ReactNode } from "react";
import { HeroGlobe } from "@/gravice/components/HeroGlobe";
import type { GraviceProduct } from "@/gravice/components/ProductOrb";
import { PRODUCT_META, ProductMark, ProductTag } from "@/gravice/components/industry/ProductMark";

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
              <ProductTag product={p.product} label={`${PRODUCT_META[p.product].name} fixes this →`} />
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
        <div className="gv-i-ins-grid">
          {items.map((a) => (
            <Link key={a.title} className="gv-i-ins" href="/insights">
              <div className="gv-i-ins-art" />
              <div className="gv-i-ins-body">
                <span className="gv-i-ins-k">{a.kind}</span>
                <h3>{a.title}</h3>
                <small>{a.meta}</small>
              </div>
            </Link>
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
        <div className={`gv-p-also${explore.length === 3 ? " gv-i-also-3" : ""}`}>
          <span className="gv-p-also-label">Explore the products</span>
          <div className="gv-p-also-grid">
            {explore.map((e) => (
              <Link
                key={e.product}
                href={PRODUCT_META[e.product].href}
                data-magnetic
                data-clarity-event="product_link_click"
                data-clarity-source={`industry_${e.product}`}
                className="gv-p-also-card"
              >
                <ProductMark product={e.product} size={44} />
                <div>
                  <b>{PRODUCT_META[e.product].name}</b>
                  <span>{e.line}</span>
                </div>
                <em aria-hidden>→</em>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
