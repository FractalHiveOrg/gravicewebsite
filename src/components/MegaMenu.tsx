"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { NavigationMenu as Nav } from "radix-ui";
import { companyLinks, industries, kits, PLATFORM_HREF, products } from "@/lib/navigation";

/* —— Shared pieces —— */

function Eyebrow({ children, className = "text-slate" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-[11px] font-medium uppercase tracking-[0.14em] ${className}`}>{children}</p>
  );
}

/** Link that closes the menu on select; opens external hrefs in a new tab. */
function MenuLink({
  href,
  external,
  className,
  children,
}: {
  href: string;
  external?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Nav.Link asChild>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
          {children}
        </a>
      ) : (
        <Link href={href} className={className}>
          {children}
        </Link>
      )}
    </Nav.Link>
  );
}

function Card({
  href,
  external,
  cta,
  children,
}: {
  href: string;
  external?: boolean;
  cta: string;
  children: ReactNode;
}) {
  const Arrow = external ? ArrowUpRight : ArrowRight;
  return (
    <MenuLink
      href={href}
      external={external}
      className="group/card flex flex-col overflow-hidden rounded-xl border border-deep-space/10 bg-white transition-[border-color,box-shadow] duration-200 hover:border-deep-space/20 hover:shadow-[0_12px_28px_-18px_rgba(14,27,44,0.45)]"
    >
      <div className="flex-1 p-5">{children}</div>
      <div className="flex items-center justify-between border-t border-deep-space/8 bg-[#faf9f6] px-5 py-3.5 text-[13px] font-medium text-deep-space">
        <span>{cta}</span>
        <Arrow
          className={`size-4 transition-transform duration-200 ${
            external
              ? "group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5"
              : "group-hover/card:translate-x-0.5"
          }`}
          aria-hidden
        />
      </div>
    </MenuLink>
  );
}

function Banner({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 bg-deep-space flex items-center justify-between gap-4 rounded-lg px-5 py-3 text-[13px] text-white">
      {children}
    </div>
  );
}

function Dot() {
  return <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-pull-orange " />;
}

function ProductBrand({ symbol, name, size = 32 }: { symbol: string; name: string; size?: number }) {
  return (
    <span className="flex items-center gap-3">
      <Image src={symbol} alt="" width={size} height={size} className="shrink-0" unoptimized />
      <span className="flex flex-col">
        <span className="font-serif text-[18px] leading-tight text-deep-space">{name}</span>
        <span className="text-[11px] leading-tight text-slate">by Gravice</span>
      </span>
    </span>
  );
}

/* —— Panels —— */

function ProductsPanel() {
  return (
    <>
      <Eyebrow>Products</Eyebrow>
      <div className="mt-4 grid grid-cols-3 gap-4">
        {products.map((p) => (
          <Card
            key={p.label}
            href={p.href}
            external={p.external}
            cta={p.external ? `Visit ${p.label}` : `Explore ${p.label}`}
          >
            <ProductBrand symbol={p.symbol} name={p.label} />
            <p className="mt-4 text-[13px] leading-snug text-slate">{p.description}</p>
          </Card>
        ))}
      </div>
      <Banner >
        <p className="flex items-center gap-2.5">
          <Dot />
          Every Gravice product is built on GraviceOS, our shared platform.
        </p>
        <MenuLink
          href={PLATFORM_HREF}
          className="group/cta flex shrink-0 items-center gap-1.5 font-medium text-pull-orange transition-colors "
        >
          See the platform
          <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-0.5" aria-hidden />
        </MenuLink>
      </Banner>
    </>
  );
}

function PlatformPanel() {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_380px] gap-6">
      <MenuLink
        href={PLATFORM_HREF}
        className="group/cta relative isolate flex min-h-60 flex-col justify-center overflow-hidden rounded-xl bg-deep-space p-6 text-paper"
      >
        <PlatformDotField />
        <Eyebrow className="text-pull-orange">Platform</Eyebrow>
        <span className="mt-3 font-serif text-[26px] text-paper">GraviceOS</span>
        <span className="mt-3 max-w-90 text-[13px] leading-snug text-navy-200">
          The operating layer for business software, and the foundation every Gravice product is built on.
        </span>
        <span className="mt-5 flex items-center gap-1.5 text-[13px] font-medium">
          Explore GraviceOS
          <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-0.5" aria-hidden />
        </span>
      </MenuLink>

      <div>
        <Eyebrow>Kits</Eyebrow>
        <ul className="mt-3 flex flex-col gap-1">
          {kits.map(({ label, description, icon }) => (
            <li key={label}>
              <MenuLink
                href={`${PLATFORM_HREF}#kits`}
                className="group/item -mx-2 flex items-start gap-3 rounded-lg p-2 outline-none transition-colors duration-200 hover:bg-deep-space/5 focus-visible:bg-deep-space/5"
              >
                <IconBox icon={icon} interactive />
                <span className="min-w-0">
                  <span className="block text-[14px] font-medium leading-tight text-deep-space">{label}</span>
                  <span className="mt-1 block text-[12.5px] leading-snug text-slate">{description}</span>
                </span>
              </MenuLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/*
 * Dot field for the GraviceOS card: dots on concentric arcs centred past the
 * card's bottom-right corner, like the edge of a globe. Dots grow and turn
 * orange toward that corner, and fade out toward the card's text.
 */
const FIELD_W = 360;
const FIELD_H = 260;
const FIELD_CX = FIELD_W + 50;
const FIELD_CY = FIELD_H + 70;
const FIELD_REACH = 470;

const fieldDots: { x: number; y: number; r: number; o: number; warm: boolean }[] = (() => {
  const dots = [];
  for (let radius = 60; radius < FIELD_REACH; radius += 17) {
    const step = 15 / radius;
    for (let a = Math.PI; a < Math.PI * 1.5; a += step) {
      const x = FIELD_CX + radius * Math.cos(a);
      const y = FIELD_CY + radius * Math.sin(a);
      if (x < 0 || x > FIELD_W || y < 0 || y > FIELD_H) continue;
      const t = 1 - radius / FIELD_REACH; // 1 near the corner, 0 at the far edge
      dots.push({
        x: Math.round(x * 10) / 10,
        y: Math.round(y * 10) / 10,
        r: Math.round((0.7 + 1.3 * t) * 100) / 100,
        o: Math.round(Math.min(1, t * 2.2) * 100) / 100,
        warm: radius < 175,
      });
    }
  }
  return dots;
})();

function PlatformDotField() {
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${FIELD_W} ${FIELD_H}`}
      preserveAspectRatio="xMaxYMax slice"
      className="pointer-events-none absolute inset-y-0 right-0 -z-10 h-full w-[48%] opacity-85 transition-opacity duration-500 group-hover/cta:opacity-100"
    >
      <defs>
        <radialGradient id="gv-platform-card-glow" cx="1" cy="1" r="0.75">
          <stop offset="0" stopColor="#F6682E" stopOpacity="0.28" />
          <stop offset="1" stopColor="#F6682E" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={FIELD_W} height={FIELD_H} fill="url(#gv-platform-card-glow)" />
      {fieldDots.map((d, i) => (
        <circle
          key={i}
          cx={d.x}
          cy={d.y}
          r={d.r}
          fill={d.warm ? "#F6682E" : "#4A6FA5"}
          fillOpacity={d.o}
        />
      ))}
    </svg>
  );
}

/** `interactive` fills the badge with deep-space when its parent `group/item` link is hovered. */
function IconBox({ icon: Icon, interactive = false }: { icon: LucideIcon; interactive?: boolean }) {
  return (
    <span
      className={`flex size-9 shrink-0 items-center justify-center rounded-lg border border-deep-space/10 bg-white text-deep-space ${
        interactive
          ? "transition-colors duration-200 ease-nav-popup group-hover/item:border-deep-space group-hover/item:bg-deep-space group-hover/item:text-paper group-focus-visible/item:border-deep-space group-focus-visible/item:bg-deep-space group-focus-visible/item:text-paper"
          : ""
      }`}
    >
      <Icon className="size-4" strokeWidth={1.75} aria-hidden />
    </span>
  );
}

function IndustriesPanel() {
  return (
    <>
      <Eyebrow>Industries</Eyebrow>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {industries.map(({ label, href, description, icon: Icon }) => (
          <Card key={label} href={href} cta={`Explore ${label}`}>
            <span className="flex items-center gap-3">
              <Icon className="size-7 text-deep-space" strokeWidth={1.25} aria-hidden />
              <span className="font-serif text-[20px] leading-tight text-deep-space">{label}</span>
            </span>
            <p className="mt-4 text-[13px] leading-snug text-slate">{description}</p>
          </Card>
        ))}
      </div>
    </>
  );
}

function CompanyPanel() {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_360px] gap-10">
      <div>
        <Eyebrow>Company</Eyebrow>
        <ul className="mt-3 grid grid-cols-2 gap-x-8 gap-y-1">
          {companyLinks.map(({ label, href, description, icon }) => (
            <li key={label}>
              <MenuLink
                href={href}
                className="group/item -mx-2 flex items-start gap-3 rounded-lg p-2 outline-none transition-colors duration-200 hover:bg-deep-space/5 focus-visible:bg-deep-space/5"
              >
                <IconBox icon={icon} interactive />
                <span className="min-w-0">
                  <span className="flex items-center gap-1 text-[14px] font-medium leading-tight text-deep-space">
                    {label}
                    {/* Arrow slides in on hover. */}
                    <ArrowRight
                      className="size-3.5 -translate-x-1 opacity-0 transition-[opacity,transform] duration-200 ease-nav-popup group-hover/item:translate-x-0.5 group-hover/item:opacity-100 group-focus-visible/item:translate-x-0.5 group-focus-visible/item:opacity-100"
                      aria-hidden
                    />
                  </span>
                  <span className="mt-1 block text-[12.5px] leading-snug text-slate">{description}</span>
                </span>
              </MenuLink>
            </li>
          ))}
        </ul>
      </div>

      <MenuLink
        href="/news/fractalhive-is-now-gravice"
        className="group/cta flex flex-col rounded-xl bg-deep-space p-4 text-paper"
      >
        <span className="relative block aspect-16/7 overflow-hidden rounded-lg bg-navy/60">
          <Image
            src="/fractalhive-to-gravice-rebrand_1.png"
            alt=""
            fill
            sizes="360px"
            className="object-cover transition-transform duration-500 group-hover/cta:scale-[1.03]"
            unoptimized
          />
        </span>
        <Eyebrow className="mt-4 text-pull-orange">Featured story</Eyebrow>
        <span className="mt-2 font-serif text-[22px] text-paper">FractalHive is now Gravice.</span>
        <span className="mt-3 flex items-center gap-1.5 text-[13px] font-medium">
          Read the story
          <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-0.5" aria-hidden />
        </span>
      </MenuLink>
    </div>
  );
}

/* —— Desktop nav —— */

const menus: { label: string; panel: ReactNode }[] = [
  { label: "Products", panel: <ProductsPanel /> },
  { label: "Platform", panel: <PlatformPanel /> },
  { label: "Industries", panel: <IndustriesPanel /> },
  { label: "Company", panel: <CompanyPanel /> },
];

/**
 * Desktop header nav. Panels open on hover into a floating viewport anchored to
 * the nearest positioned ancestor (the sticky header), so the root stays static.
 *
 * Motion: the viewport drops down with a clip-path reveal and morphs its height;
 * panels fade and slide sideways in the direction of travel when switching menus.
 * The viewport is force-mounted so the last panel stays visible while it folds away.
 */
export function DesktopNav({ className = "" }: { className?: string }) {
  const [value, setValue] = useState("");
  const open = value !== "";

  return (
    <Nav.Root
      aria-label="Primary"
      value={value}
      onValueChange={setValue}
      delayDuration={80}
      className={`self-stretch ${className}`}
    >
      <Nav.List data-nav-list className="flex h-full list-none items-stretch gap-1">
        {menus.map((menu) => (
          <Nav.Item key={menu.label} className="flex">
            {/* Siblings dim while the list is hovered or a menu is open. */}
            <Nav.Trigger className="group flex cursor-pointer items-center text-[15px] font-medium text-paper outline-none transition-colors duration-200 ease-nav-popup focus-visible:outline-none [[data-nav-list]:is(:hover,:has([data-state=open]))_&:not(:hover,[data-state=open])]:text-paper/55">
              <span className="inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 group-focus-visible:ring-2 group-focus-visible:ring-pull-orange">
                {menu.label}
                <ChevronDown
                  className="size-4 opacity-70 transition-transform duration-250 ease-nav-chevron group-data-[state=open]:rotate-180"
                  aria-hidden
                />
              </span>
            </Nav.Trigger>
            <Nav.Content className="absolute inset-x-0 top-0 animate-nav-in data-[motion=from-end]:animate-nav-from-end data-[motion=from-start]:animate-nav-from-start data-[motion=to-end]:animate-nav-to-end data-[motion=to-start]:animate-nav-to-start motion-reduce:animate-none">
              <div className="p-8">{menu.panel}</div>
            </Nav.Content>
          </Nav.Item>
        ))}
      </Nav.List>

      {/* Page scrim below the header. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-full h-dvh bg-linear-to-b from-deep-space/10 to-deep-space/60 transition-opacity duration-300 ease-nav-popup ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="absolute inset-x-0 top-full" data-cursor-surface="light">
        <div className="page-x mx-auto max-w-360">
          <Nav.Viewport
            forceMount
            className="invisible relative h-(--radix-navigation-menu-viewport-height) w-full overflow-hidden rounded-b-xl bg-[#f3f1ec] text-deep-space opacity-0 shadow-[0_9px_20px_rgba(14,27,44,0.09),0_20px_50px_rgba(14,27,44,0.09),0_37px_37px_rgba(14,27,44,0.07)] transition-[height,clip-path,opacity,visibility] duration-300 ease-nav-popup [clip-path:inset(0_-80px_calc(100%+320px))] data-[state=closed]:h-0 data-[state=open]:visible data-[state=open]:opacity-100 data-[state=open]:[clip-path:inset(0_-80px_-320px)] motion-reduce:transition-none"
          />
        </div>
      </div>
    </Nav.Root>
  );
}
