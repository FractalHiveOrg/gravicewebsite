import { GlobeMark } from '../components/GlobeMark';
import { PRODUCTS } from '../content';

/** Optional footer with the product logo row. */
export function SiteFooter() {
  return (
    <footer className="gv-footer">
      <div className="gv-wrap gv-flogos">
        <a href="#top"><GlobeMark size={24} />Gravice</a>
        {(Object.keys(PRODUCTS) as (keyof typeof PRODUCTS)[]).map((k) => (
          <a key={k} href={PRODUCTS[k].href} style={{ ['--c' as string]: `var(--gv-${k})` }}><i />{PRODUCTS[k].name}{PRODUCTS[k].external ? ' ↗' : ''}</a>
        ))}
      </div>
      <div className="gv-wrap gv-fwrap">
        <div className="gv-fabout">
          <p>Gravice is a fintech company that builds software for banks and growing businesses in India and the Middle East. Its products are ElevateRM, V-track and NICO.</p>
          <a href="#top">LinkedIn ↗</a>
        </div>
        <div className="gv-fcols">
          <div><h4>Products</h4><ul><li><a href="#products">ElevateRM</a></li><li><a href="#products">V-track</a></li><li><a href={PRODUCTS.nico.href}>NICO ↗</a></li></ul></div>
          <div><h4>Industries</h4><ul><li><a href="#products">Financial services</a></li><li><a href="#products">Manufacturing</a></li></ul></div>
          <div><h4>Company</h4><ul><li><a href="#what">About</a></li><li><a href="#what">Leadership</a></li><li><a href="#news">Careers</a></li><li><a href="#news">Newsroom</a></li><li><a href="#cta">Contact</a></li></ul></div>
          <div><h4>Resources</h4><ul><li><a href="#news">Insights</a></li><li><a href="#news">Glossary</a></li><li><a href="#what">Trust Center</a></li></ul></div>
        </div>
      </div>
      <div className="gv-wrap gv-fbottom"><span>© 2026 Gravice. All rights reserved.</span><span>Privacy · Terms · Cookies</span></div>
    </footer>
  );
}
