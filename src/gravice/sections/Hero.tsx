import { MicrosoftPartnership } from '@/components/microsoftPartnership';
import { HERO } from '../content';

/** Hero: the globe forms here (data-gv="hero-globe"); text fades in once it has formed. */
export function Hero() {
  return (
    <section className="gv-band gv-hero" data-gv="hero" id="hero" data-cursor-surface="dark">
      <noscript>
        <style>{`.gv-hero [data-gv-reveal]{opacity:1;transform:none}`}</style>
      </noscript>
      <div className="gv-hero-inner">
        <div className="gv-hero-globe" data-gv="hero-globe" aria-hidden="true" />
        <div className="gv-eyebrow" data-gv-reveal>{HERO.eyebrow}</div>
        <h1 data-gv-reveal>{HERO.title}</h1>
        <p className="gv-lede" data-gv-reveal>{HERO.lede}</p>
        <div className="gv-row" data-gv-reveal>
          <a className="gv-btn gv-btn-primary text-white!" href={HERO.primary.href} data-clarity-event="explore_products_click" data-clarity-source="hero">{HERO.primary.label}</a>
          <a className="gv-btn gv-btn-ghost" href={HERO.secondary.href} data-clarity-event="book_demo_click" data-clarity-source="hero">{HERO.secondary.label}</a>
        </div>
      </div>
            <MicrosoftPartnership/>
      
    </section>
  );
}
