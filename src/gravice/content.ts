/** All homepage copy and links in one place. Edit text without touching layout. */
import type { OrbState } from "thinking-orbs/engine";

export type ProductKey = "erm" | "vt" | "nico";

export const PRODUCTS: Record<
  ProductKey,
  { name: string; letter: string; href: string; external?: boolean }
> = {
  erm: { name: "ElevateRM", letter: "E", href: "/products/elevaterm" },
  vt: { name: "V-Track", letter: "V", href: "/products/v-track" },
  nico: { name: "NICO", letter: "N", href: "https://app.nico.fractalhive.com/" },
};

export const HERO = {
  eyebrow: "Tech for enterprises and growing businesses",
  title: "Intelligence, at the centre.",
  lede: "Gravice builds software that brings order to slow, manual, high-stakes work, so enterprises and growing businesses can move faster with less risk.",
  primary: { label: "Explore products", href: "#products" },
  secondary: { label: "Book a demo", href: "/demo" },
};

export const STORY = {
  eyebrow: "What Gravice can do for you",
  title: "Intelligence that does the work, so your people can make the call.",
  body: "The same intelligence runs inside every Gravice product. Here is what each one does for your teams.",
  steps: [
    {
      product: "erm" as ProductKey,
      orb: "composing" as OrbState,
      title: "Less paperwork, more deals for your relationship managers.",
      body: "ElevateRM takes the admin off relationship managers' desks. It keeps every client, meeting and follow-up in one place and shows each RM which clients need them today, so deals close faster.",
      link: "Explore ElevateRM →",
    },
    {
      product: "vt" as ProductKey,
      orb: "searching" as OrbState,
      title: "Every collateral revaluation, on time.",
      body: "V-Track gives banks and NBFCs one view of their collateral book. It tracks each asset's next revaluation date, alerts teams before anything falls due, and keeps reports ready for audit and the RBI.",
      link: "Explore V-Track →",
    },
    {
      product: "nico" as ProductKey,
      orb: "solving" as OrbState,
      title: "Documents in, decisions out.",
      body: "NICO reads invoices, loan files and delivery notes, checks them against your rules, and sends approved entries to Tally or your ERP. Your team only reviews what needs a decision.",
      link: "Explore NICO →",
    },
  ],
};

export const WORKFLOW = {
  eyebrow: "Our products",
  title: "Three products, one platform, across the whole workflow.",
  body: "Each product takes care of one part of the work. The same intelligence runs underneath all three.",
  stages: [
    {
      n: "01",
      title: "Win and grow clients",
      product: "erm" as ProductKey,
      items: [
        "Leads, meetings and follow-ups",
        "A client book for every RM",
        "Pipeline view for leaders",
      ],
      who: "Banks · Manufacturers",
    },
    {
      n: "02",
      title: "Take in documents",
      product: "nico" as ProductKey,
      items: [
        "Loan files and KYC",
        "Invoices, POs and delivery notes",
        "Checked against your rules",
      ],
      who: "Banks · NBFCs · Manufacturers",
    },
    {
      n: "03",
      title: "Manage risk and collateral",
      product: "vt" as ProductKey,
      items: [
        "Collateral valuations",
        "Revaluation due dates",
        "Reports for audit and the RBI",
      ],
      who: "Banks · NBFCs",
    },
    {
      n: "04",
      title: "Run the back office",
      product: "nico" as ProductKey,
      items: [
        "Approvals and reconciliation",
        "Entries to Tally or your ERP",
        "Exceptions sent to the right person",
      ],
      who: "Banks · NBFCs · Manufacturers",
    },
  ],
  platform: {
    title: "Gravice intelligence platform",
    body: "Reads, checks and organises work at every stage. Every action is logged, and every decision stays with your people.",
  },
};

export const NEWS = {
  eyebrow: "Newsroom",
  title: "What's new at Gravice",
  posts: [
    {
      cat: "Company news",
      title: "FractalHive is now Gravice",
      meta: "A new name for a clear purpose: structure at the centre of banking and business operations.",
      href: "/insights",
    },
    {
      cat: "Guide",
      title: "A practical guide to collateral revaluation for banks and NBFCs",
      meta: "8 min read",
      href: "/insights",
    },
    {
      cat: "Article",
      title: "Where relationship managers' time really goes",
      meta: "6 min read",
      href: "/insights",
    },
    {
      cat: "Product",
      title: "NICO now works with Tally",
      meta: "Placeholder announcement",
      href: "/insights",
    },
  ],
};

export const CLOSING = {
  title: "See what Gravice can do for you.",
  body: "Book a 30-minute demo. Tell us which product you are interested in and we will route you to the right team.",
  cta: { label: "Book a demo", href: "/demo" },
};
