"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { NavDropdown } from "@/components/NavDropdown";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

type NavItem = {
  label: string;
  /** Omitted for menus with no landing page: the label only opens the menu. */
  href?: string;
  /** Sub text for the "All <label>" entry when the menu has an href. */
  description?: string;
  children?: { label: string; href: string; description?: string }[];
};

const nav: NavItem[] = [
  {
    label: "Products",
    href: "/#products",
    description: "Three platforms. One layer of assurance.",
    children: [
      {
        label: "ElevateRM",
        href: "/products/elevaterm",
        description: "Relationship management, from deal creation to closure.",
      },
      {
        label: "V-Track",
        href: "/products/v-track",
        description: "Continuous valuation, LTV and insurance tracking for collateral.",
      },
      {
        label: "NICO",
        href: "https://app.nico.fractalhive.com/",
        description: "Agentic automation for document-heavy processes.",
      },
    ],
  },
  {
    label: "Industries",
    children: [
      {
        label: "Financial Institutions",
        href: "/industries/financial-institutions",
        description: "RM, collateral and loan documents for banks and NBFCs.",
      },
      {
        label: "Manufacturing",
        href: "/industries/manufacturing",
        description: "Invoices, GRNs and POs into your ERP without retyping.",
      },
    ],
  },
  // { label: "Why Gravice", href: "/#why" },
  {
    label: "Company",
    children: [
      {
        label: "About",
        href: "/company/about",
        description: "Who we are and why we build Gravice.",
      },
      {
        label: "Careers",
        href: "/company/careers",
        description: "Join a small team shipping high-stakes software.",
      },
      {
        label: "Contact",
        href: "/company/contact",
        description: "Book a call and we will route you to the right team.",
      },
      {
        label: "Life at Gravice",
        href: "/company/life-at-gravice",
        description: "How we work, learn and celebrate together.",
      },
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
      <div className="page-x mx-auto flex h-18 max-w-360 items-center justify-between gap-3 md:h-[84px] md:gap-6">
        <Logo theme="dark" className="min-w-0 shrink" />

        <NavigationMenu
          viewport={false}
          className="hidden flex-none text-[14px] font-medium text-paper xl:flex xl:text-[15px]"
          aria-label="Primary"
        >
          <NavigationMenuList className="gap-5 xl:gap-8">
            {nav.map((item) =>
              item.children ? (
                <NavDropdown
                  key={item.label}
                  label={item.label}
                  href={item.href}
                  description={item.description}
                  items={item.children}
                />
              ) : (
                <NavigationMenuItem key={item.label}>
                  <NavigationMenuLink
                    asChild
                    className="block rounded-none p-0 text-[length:inherit] transition-colors hover:bg-transparent hover:text-pull-orange focus:bg-transparent focus:text-pull-orange"
                  >
                    <Link href={item.href ?? "/"}>{item.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ),
            )}
          </NavigationMenuList>
        </NavigationMenu>

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
