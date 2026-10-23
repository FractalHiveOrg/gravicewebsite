export type Stub = {
  title: string;
  description: string;
  cta?: { label: string; href: string };
  /** When false, hides the “jump to products” line. Defaults to true. */
  showProductsLink?: boolean;
};

export const stubs: Record<string, Stub> = {
  industries: {
    title: "Industries",
    description:
      "Gravice serves banks, NBFCs, and growing institutional businesses. Industry pages are expanding — book a demo for a tailored walkthrough.",
  },
  "industries/banking": {
    title: "Banking & NBFCs",
    description:
      "Assurance-first platforms for modern banking — ElevateRM, V-Track, and NICO sit above LOS, CMS, and core without rip-and-replace.",
  },
  "industries/manufacturing": {
    title: "Manufacturing",
    description:
      "Document-heavy and decision-heavy workflows for industrial operators. Talk to us about NICO and process automation.",
  },
  company: {
    title: "Company",
    description:
      "Gravice (formerly Fractal-Hive Solutions Private Limited) builds assurance-first platforms for banks and NBFCs.",
  },
  "company/careers": {
    title: "Careers",
    description:
      "Join a team building control, visibility, and automation for institutions. Contact us to learn about open roles.",
    cta: {
      label: "Contact Gravice",
      href: "mailto:contact@gravicesolutions.com",
    },
    showProductsLink: false,
  },
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
