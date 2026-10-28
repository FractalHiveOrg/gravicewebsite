export type Stub = {
  title: string;
  description: string;
  cta?: { label: string; href: string };
  /** When false, hides the “jump to products” line. Defaults to true. */
  showProductsLink?: boolean;
};

export const stubs: Record<string, Stub> = {
  "company/contact": {
    title: "Contact",
    description:
      "Prefer a structured conversation? Book a 30-minute demo and we will route you to the right team.",
  },
  trust: {
    title: "Trust Center",
    description:
      "Compliance, control, and audit-ready design across ElevateRM, V-Track, and NICO. Ask about security in your demo.",
  },
  "resources/glossary": {
    title: "Glossary",
    description: "Banking and platform terminology glossary coming soon.",
  },
};
