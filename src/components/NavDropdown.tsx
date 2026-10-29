"use client";

import Link from "next/link";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

type Child = { label: string; href: string; description?: string };

type Props = {
  label: string;
  /** Landing page for the menu, listed first as "All <label>". */
  href?: string;
  /** Sub text for the "All <label>" entry. */
  description?: string;
  items: Child[];
};

/** One dropdown in the desktop header. Render inside `NavigationMenuList`. */
export function NavDropdown({ label, href, description, items }: Props) {
  const links: Child[] = href
    ? [{ label: `All ${label.toLowerCase()}`, href, description }, ...items]
    : items;

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="h-auto cursor-pointer gap-1 bg-transparent p-0 text-[length:inherit] font-[inherit] text-paper transition-colors hover:text-pull-orange focus:text-pull-orange data-[state=open]:text-pull-orange [&>svg]:top-0.5 [&>svg]:ml-0 [&>svg]:size-5 [&>svg]:opacity-60">
        {label}
      </NavigationMenuTrigger>
      <NavigationMenuContent className="z-50 p-2 md:w-[360px] group-data-[viewport=false]/navigation-menu:mt-3group-data-[viewport=false]/navigation-menu:rounded-xl group-data-[viewport=false]/navigation-menu:border-paper/10 group-data-[viewport=false]/navigation-menu:bg-deep-space group-data-[viewport=false]/navigation-menu:text-paper group-data-[viewport=false]/navigation-menu:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.55)]">
        <ul className="grid gap-1">
          {links.map((child) => (
            <li key={child.href}>
              <NavigationMenuLink
                asChild
                className="group/link gap-1 rounded-lg px-3 py-2.5 text-paper transition-colors hover:bg-paper/10 focus:bg-paper/10"
              >
                <Link href={child.href}>
                  <span className="text-[15px] font-medium leading-tight transition-colors group-hover/link:text-pull-orange group-focus/link:text-pull-orange">
                    {child.label}
                  </span>
                  {child.description ? (
                    <span className="text-[13px] leading-snug text-navy-200">
                      {child.description}
                    </span>
                  ) : null}
                </Link>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
