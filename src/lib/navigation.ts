import {
  Briefcase,
  Factory,
  FileText,
  Info,
  Landmark,
  Mail,
  Newspaper,
  Plug,
  Sparkle,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/*
 * Site navigation data, shared by the header mega menu, the mobile nav and the
 * footer so they always list the same pages.
 */

/** GraviceOS platform page. */
export const PLATFORM_HREF = "/platform";
export const NICO_HREF = "https://nico.gravicesolutions.com/";

export type CardLink = {
  label: string;
  href: string;
  description: string;
  external?: boolean;
};

export const products: (CardLink & { symbol: string })[] = [
  {
    label: "ElevateRM",
    href: "/products/elevaterm",
    symbol: "/elevateRmSymbol.svg",
    description: "Less paperwork, more deals for your relationship managers.",
  },
  {
    label: "V-Track",
    href: "/products/v-track",
    symbol: "/vtrackSymbol.svg",
    description: "Every collateral revaluation tracked and on time, with nothing missed.",
  },
  {
    label: "Nico",
    href: NICO_HREF,
    symbol: "/NicoSymbol.svg",
    description: "Reads the paperwork your business runs on, and does the work that follows.",
    external: true,
  },
];

export const industries: (CardLink & { icon: LucideIcon })[] = [
  {
    label: "Financial Services",
    href: "/industries/financial-institutions",
    icon: Landmark,
    description: "Banks and NBFCs: lending, collateral and operations",
  },
  {
    label: "Manufacturing",
    href: "/industries/manufacturing",
    icon: Factory,
    description: "From order to ledger, with less manual entry",
  },
];

export const companyLinks: (CardLink & { icon: LucideIcon })[] = [
  { label: "About", href: "/company/about", icon: Info, description: "Our story, mission and values" },
  {
    label: "Careers",
    href: "/company/careers",
    icon: Briefcase,
    description: "Build the tools banks and businesses rely on",
  },
  { label: "Newsroom", href: "/news", icon: Newspaper, description: "Company news and product updates" },
  {
    label: "Contact us",
    href: "/company/contact",
    icon: Mail,
    description: "Tell us what you need and we'll reach out",
  },
  { label: "Insights", href: "/insights", icon: FileText, description: "Blogs and articles" },
];

export type Kit = { label: string; description: string; icon: LucideIcon };

export const kits: Kit[] = [
  { label: "Relay", icon: Workflow, description: "Put approvals and alerts into any process." },
  {
    label: "Relay Pro",
    icon: Sparkle,
    description: "Relay plus Gravice intelligence, connected to your tools through MCP.",
  },
  { label: "Conduit", icon: Plug, description: "Connect your product to the systems your customers use." },
];
