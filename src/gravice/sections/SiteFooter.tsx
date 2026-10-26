import { GlobeMark } from "../components/GlobeMark";
import { PRODUCTS } from "../content";

/** Footer with the product logo row. */
export function SiteFooter() {
  return (
    <footer className="gv-footer" data-cursor-surface="dark">
      <div className="gv-wrap gv-flogos">
        <a href="/">
          <GlobeMark size={24} />
          Gravice
        </a>
        {(Object.keys(PRODUCTS) as (keyof typeof PRODUCTS)[]).map((k) => (
          <a key={k} href={PRODUCTS[k].href}>
            {PRODUCTS[k].name}
            {PRODUCTS[k].external ? " ↗" : ""}
          </a>
        ))}
      </div>
      <div className="gv-wrap gv-fwrap">
        <div className="gv-fabout">
          <p>
            Gravice is a fintech company that builds software for enterprises and
            growing businesses. Its products are ElevateRM, V-Track, and NICO.
          </p>
          <a
            href="https://www.linkedin.com/company/fractalhive/posts/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn ↗
          </a>
        </div>
        <div className="gv-fcols">
          <div>
            <h4>Products</h4>
            <ul>
              <li>
                <a href="/products/elevaterm">ElevateRM</a>
              </li>
              <li>
                <a href="/products/v-track">V-Track</a>
              </li>
              <li>
                <a href="/products/nico">NICO</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Industries</h4>
            <ul>
              <li>
                <a href="/industries/banking">Banking &amp; NBFCs</a>
              </li>
              <li>
                <a href="/industries/manufacturing">Manufacturing</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li>
                <a href="/company/about">About</a>
              </li>
              <li>
                <a href="/company/careers">Careers</a>
              </li>
              <li>
                <a href="/company/contact">Contact</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Resources</h4>
            <ul>
              <li>
                <a href="/insights">Insights</a>
              </li>
              <li>
                <a href="/resources/glossary">Glossary</a>
              </li>
              <li>
                <a href="/trust">Trust Center</a>
              </li>
              <li>
                <a href="/legal/privacy">Privacy</a>
              </li>
              <li>
                <a href="/legal/terms">Terms</a>
              </li>
              <li>
                <a href="/legal/cookies">Cookies</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="gv-wrap gv-fbottom">
        <span>© 2026 Gravice. All rights reserved. Formerly FractalHive Solutions Private Limited.</span>
        <span>
          <a href="/legal/privacy">Privacy</a>
          {" · "}
          <a href="/legal/terms">Terms</a>
          {" · "}
          <a href="/legal/cookies">Cookies</a>
        </span>
      </div>
    </footer>
  );
}
