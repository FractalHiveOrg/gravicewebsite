import Link from "next/link";
import { Logo } from "@/components/Logo";
import { PRODUCTS } from "../content";
import { NicoLogo } from "@/components/NicoLogo";
import { VtrackLogo } from "@/components/vtrack";
import { ElevateRMLogo } from "@/components/ElevateRMLogo";
import { companyLinks, industries, kits, PLATFORM_HREF, products } from "@/lib/navigation";

type FooterLink = { label: string; href: string; external?: boolean };

/* Same pages, in the same order, as the header nav (see @/lib/navigation). */
const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Products",
    links: products.map(({ label, href, external }) => ({ label, href, external })),
  },
  {
    title: "Platform",
    links: [
      { label: "GraviceOS", href: PLATFORM_HREF },
      ...kits.map(({ label }) => ({ label, href: `${PLATFORM_HREF}#kits` })),
    ],
  },
  {
    title: "Industries",
    links: industries.map(({ label, href }) => ({ label, href })),
  },
  {
    title: "Company",
    links: companyLinks.map(({ label, href }) => ({ label, href })),
  },
];

/** Footer with the product logo row. */
export function SiteFooter() {
  return (
    <footer className="gv-footer" data-cursor-surface="dark">
      <div className="gv-wrap gv-flogos">
        <Logo theme="dark" />
        {(Object.keys(PRODUCTS) as (keyof typeof PRODUCTS)[]).map((k) => (
          <a key={k} href={PRODUCTS[k].href}>
            {PRODUCTS[k].name == "NICO" && <NicoLogo size={60} />}
            {PRODUCTS[k].name == "V-Track" && <VtrackLogo size={100} />}
            {PRODUCTS[k].name == "ElevateRM" && <ElevateRMLogo size={130} />}
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
            href="https://www.linkedin.com/company/graviceposts/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn ↗
          </a>
        </div>
        <div className="gv-fcols">
          {columns.map((col) => (
            <div key={col.title}>
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer">
                        {link.label} ↗
                      </a>
                    ) : (
                      <Link href={link.href}>{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="gv-wrap gv-fbottom">
        <span>© 2026 Gravice. All rights reserved. Formerly FractalHive Solutions Private Limited.</span>
        <span>
          <Link href="/legal/privacy">Privacy</Link>
          {" · "}
          <Link href="/legal/terms">Terms</Link>
        </span>
      </div>
    </footer>
  );
}
