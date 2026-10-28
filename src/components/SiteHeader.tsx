"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { NavDropdown } from "@/components/NavDropdown";

const nav = [
  {
    label: "Products",
    href: "/#products",
    children: [
      { label: "ElevateRM", href: "/products/elevaterm" },
      { label: "V-Track", href: "/products/v-track" },
      { label: "NICO", href: "/products/nico" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    children: [
      { label: "Banking & NBFCs", href: "/industries/banking" },
      { label: "Manufacturing", href: "/industries/manufacturing" },
    ],
  },
  { label: "Why Gravice", href: "/#why" },
  {
    label: "Company",
    href: "/company",
    children: [
      { label: "About", href: "/company/about" },
      { label: "Careers", href: "/company/careers" },
      { label: "Contact", href: "/company/contact" },
    ],
  },
  { label: "Insights", href: "/insights" },
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
      <div className="page-x mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-3 md:h-[84px] md:gap-6">
        <Logo theme="dark" className="min-w-0 shrink" />

        <nav
          className="hidden items-center gap-5 text-[14px] font-medium text-paper xl:flex xl:gap-8 xl:text-[15px]"
          aria-label="Primary"
        >
          {nav.map((item) =>
            item.children ? (
              <NavDropdown
                key={item.label}
                label={item.label}
                href={item.href}
                items={item.children}
              />
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="transition-colors hover:text-pull-orange"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
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
                <Link
                  href={item.href}
                  className="block py-1 font-medium"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
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
              className="mt-2 flex w-full md:hidden"
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
