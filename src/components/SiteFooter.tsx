import Link from "next/link";
import { Logo } from "@/components/Logo";

const columns = [
  {
    title: "Products",
    links: [
      { label: "ElevateRM", href: "/products/elevaterm" },
      { label: "V-Track", href: "/products/v-track" },
      { label: "NICO", href: "/products/nico" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Banking & NBFCs", href: "/industries/banking" },
      { label: "Manufacturing", href: "/industries/manufacturing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/company/about" },
      { label: "Careers", href: "/company/careers" },
      { label: "Contact", href: "/company/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Insights", href: "/insights" },
      { label: "Glossary", href: "/resources/glossary" },
      { label: "Trust Center", href: "/trust" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-deep-space text-paper">
      <div className="page-x mx-auto flex max-w-[1440px] flex-col gap-14 pb-10 pt-[72px]">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          <div className="flex max-w-[340px] flex-col gap-5">
            <Logo theme="dark" />
            <p className="text-[14px] leading-[1.6] text-navy-200">
              Gravice is a fintech company that builds software for banks and
              growing businesses in India and the Middle East. Its products are
              ElevateRM, V-Track and NICO.
            </p>
            <a
              href="https://www.linkedin.com/"
              className="text-[14px] font-medium text-paper hover:text-pull-orange"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>
          </div>

          <div className="grid min-w-0 flex-1 grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8 lg:justify-end lg:gap-12">
            {columns.map((col) => (
              <div key={col.title} className="flex flex-col gap-3.5">
                <p className="text-[12px] font-semibold uppercase tracking-[0.96px] text-navy-200">
                  {col.title}
                </p>
                {col.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[15px] text-paper hover:text-pull-orange"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-paper/10 pt-6 text-[13px] text-navy-200 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 Gravice. All rights reserved. Formerly FractalHive Solutions
            Private Limited.
          </p>
          <p className="flex flex-wrap gap-x-2">
            <Link href="/legal/privacy" className="hover:text-paper">
              Privacy
            </Link>
            <span aria-hidden>·</span>
            <Link href="/legal/terms" className="hover:text-paper">
              Terms
            </Link>
            <span aria-hidden>·</span>
            <Link href="/legal/cookies" className="hover:text-paper">
              Cookies
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
