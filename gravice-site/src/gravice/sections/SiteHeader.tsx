import { GlobeMark } from '../components/GlobeMark';
import { PRODUCTS } from '../content';

/** Optional: product-family bar + main nav. Skip it if your site already has a header. */
export function SiteHeader() {
  return (
    <header className="gv-header" data-gv-reveal>
      <div className="gv-family"><div className="gv-wrap">
        <span>The Gravice family</span>
        {(Object.keys(PRODUCTS) as (keyof typeof PRODUCTS)[]).map((k) => (
          <a key={k} href={PRODUCTS[k].href} style={{ ['--c' as string]: `var(--gv-${k})` }}><i />{PRODUCTS[k].name}{PRODUCTS[k].external ? ' ↗' : ''}</a>
        ))}
      </div></div>
      <div className="gv-mainbar"><div className="gv-wrap gv-nav">
        <a className="gv-brand" href="#top" aria-label="Gravice home"><GlobeMark />Gravice</a>
        <nav className="gv-links" aria-label="Main">
          <a href="#products">Products</a><a href="#products">Industries</a><a href="#what">Why Gravice</a>
          <a href="#news">Customers</a><a href="#news">Company</a><a href="#news">Insights</a>
        </nav>
        <a className="gv-btn gv-btn-primary gv-btn-sm" href="#cta">Book a demo</a>
      </div></div>
    </header>
  );
}
