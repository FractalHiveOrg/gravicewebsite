import type { ReactNode } from "react";
import { HeroGlobe } from "@/gravice/components/HeroGlobe";

/**
 * Sections shared by the company pages (prototypes/about.html, careers.html, …).
 * Each page supplies its copy and buttons.
 */

export function CompanyHero({
  page,
  title,
  lede,
  actions,
  visual,
}: {
  page: string;
  title: string;
  lede: string;
  actions: ReactNode;
  /** Replaces the turning globe on the right (e.g. the Life at Gravice photo collage). */
  visual?: ReactNode;
}) {
  return (
    <section data-cursor-surface="dark" className="gv-band gv-c-hero">
      <div className="gv-wrap gv-c-hero-grid">
        <div className="gv-c-hero-copy">
          <div className="gv-i-crumb">
            Company · <b>{page}</b>
          </div>
          <h1>{title}</h1>
          <p className="gv-p-lede">{lede}</p>
          <div className="gv-row">{actions}</div>
        </div>
        {visual ?? (
          <div className="gv-c-globe" aria-hidden="true">
            <HeroGlobe playIntro={false} followCursor={false} />
          </div>
        )}
      </div>
    </section>
  );
}

export function CompanyClosing({ title, lede, actions }: { title: string; lede: string; actions: ReactNode }) {
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
