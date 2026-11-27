"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { DesktopNav } from "@/components/MegaMenu";
import { companyLinks, industries, PLATFORM_HREF, products } from "@/lib/navigation";

type NavItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
};

const nav: NavItem[] = [
  { label: "Products", children: products },
  { label: "Platform", href: PLATFORM_HREF },
  { label: "Industries", children: industries },
  { label: "Company", children: companyLinks },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-cursor-surface="dark"
      className={[
        "site-header sticky top-0 z-50 border-b border-paper/8 bg-deep-space",
        scrolled ? "is-scrolled" : "",
      ].join(" ")}
    >
      <div className="page-x mx-auto flex h-18 max-w-360 items-center justify-between gap-3 md:h-[84px] md:gap-6">
        <Logo theme="dark" className="min-w-0 shrink" />

        <DesktopNav className="mr-auto ml-4 hidden xl:flex" />

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Image
            src="/brand/microsoft-solutions-partner-isv.png"
            alt="Microsoft Solutions Partner, ISV Success Program"
            width={142}
            height={89}
            className="hidden h-11 w-auto sm:block md:h-13"
            unoptimized
          />
          {/* <Link
            href="/company/contact"
            className="hidden px-2 text-[15px] font-medium text-paper transition-colors hover:text-pull-orange xl:inline"
          >
            Contact us
          </Link> */}
          <Button
            href="/demo"
            size="sm"
            className="hidden md:inline-flex"
            clarityEvent="book_demo_click"
            claritySource="header"
          >
            Book a demo
          </Button>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-paper/25 text-paper transition-colors hover:border-pull-orange hover:text-pull-orange xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span aria-hidden className="text-lg leading-none">
              {open ? "×" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          data-cursor-surface="dark"
          className="page-x border-t border-paper/8 bg-deep-space py-4 xl:hidden"
        >
          <nav className="flex flex-col gap-3 text-paper" aria-label="Mobile">
            {nav.map((item) => (
              <div key={item.label}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="block py-1 font-medium"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="block py-1 font-medium">{item.label}</span>
                )}
                {item.children && (
                  <div className="ml-3 flex flex-col gap-1 border-l border-paper/15 pl-3 text-sm text-navy-200">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="py-1"
                        onClick={() => setOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Button
              href="/demo"
              size="sm"
              className="mt-2 flex w-full md:hidden text-white"
              clarityEvent="book_demo_click"
              claritySource="header_mobile"
            >
              Book a demo
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
