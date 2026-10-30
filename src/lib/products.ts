export type ProductSlug = "elevaterm" | "v-track" | "nico";

export type Product = {
  slug: ProductSlug;
  name: string;
  tagline: string;
  headline: string;
  summary: string;
  audience: string;
  accent: "purple" | "navy" | "orange";
  badge?: string;
  problem: string;
  outcome: string;
  steps: { title: string; body: string }[];
  features: { title: string; body: string }[];
  footerLine: string;
  footerNote: string;
  coverage: { stage: string; capability: string }[];
  useCases?: { title: string; body: string }[];
  offerings?: { title: string; body: string }[];
  comparison?: {
    today: string[];
    withProduct: string[];
  };
  /** Microsoft Marketplace / partner block (e.g. V-Track). */
  microsoftPartnership?: {
    headline: string;
    summary: string;
    marketplaceUrl: string;
  };
};

export const products: Record<ProductSlug, Product> = {
  elevaterm: {
    slug: "elevaterm",
    name: "ElevateRM",
    tagline: "Relationship management",
    headline: "Every deal, every customer, one workspace.",
    summary:
      "ElevateRM gives relationship managers everything they need, from deal creation to closure, on one platform. Less time on admin tasks. More time with customers.",
    audience: "For banks and NBFCs with a commercial banking footprint",
    accent: "purple",
    problem:
      "Relationship pipelines are scattered. Deals, follow-ups, and upsell opportunities sit across email, Excel, and notebooks.",
    outcome:
      "Every deal in one workspace. Pipeline, client history, and follow-ups in one place - from creation to closure to upsell.",
    steps: [
      {
        title: "Create",
        body: "Capture details and initiate proposals in minutes.",
      },
      {
        title: "Engage",
        body: "Customer history and bank exposure, all in one place.",
      },
      {
        title: "Close",
        body: "Track proposals and approvals through to sanction.",
      },
      {
        title: "Grow",
        body: "Spot cross-sell and upsell opportunities across the book.",
      },
    ],
    features: [
      {
        title: "Deal pipeline",
        body: "Every opportunity, stage, and next step in one view.",
      },
      {
        title: "Customer 360",
        body: "Relationships, exposure, and history at a glance.",
      },
      {
        title: "Manager dashboards",
        body: "Team productivity and pipeline health for leadership.",
      },
      {
        title: "Activity history",
        body: "A complete auditable record of platform actions.",
      },
    ],
    footerLine: "More time with customers. Less time chasing emails.",
    footerNote: "Enterprise deployment for commercial banking teams.",
    coverage: [
      {
        stage: "Prospect & engage",
        capability: "Lead capture and customer 360 view",
      },
      {
        stage: "Originate & sanction",
        capability: "Deal creation and tracking through closure",
      },
      {
        stage: "Monitor & review",
        capability: "Portfolio view across every relationship",
      },
      {
        stage: "Renew & grow",
        capability: "Cross-sell and upsell opportunities",
      },
      {
        stage: "Audit & report",
        capability: "Complete deal history",
      },
    ],
  },
  "v-track": {
    slug: "v-track",
    name: "V\u2011Track",
    tagline: "Valuation assurance",
    headline: "An eagle-eye view of your collateral portfolio.",
    summary:
      "V-Track provides continuous, asset-level visibility into every facility through dynamic valuation, LTV, and insurance tracking across the entire collateral lifecycle.",
    audience: "For banks and NBFCs",
    accent: "navy",
    badge: "Patent pending",
    problem:
      "Revaluation processes live in spreadsheets. A team tracks dates by hand; one missed revaluation can mean a regulatory penalty.",
    outcome:
      "Every revaluation enforced on time, in one place. One digital register with time- and event-based alerts and an audit-ready history.",
    steps: [
      {
        title: "Bring in your portfolio",
        body: "Load collateral records from your loan systems or spreadsheets, so every asset starts in one place.",
      },
      {
        title: "Track every due date",
        body: "V-Track schedules each revaluation and flags what is coming due, before it becomes overdue.",
      },
      {
        title: "Revalue and report",
        body: "Record new valuations as reports arrive, and share the status with audit, the board and the regulator.",
      },
    ],
    features: [
      {
        title: "Valuation trend",
        body: "How an asset's value has moved since its first valuation, with the peak and the trough.",
      },
      {
        title: "LTV against policy",
        body: "Average loan-to-value across the portfolio, measured against your own policy limit.",
      },
      {
        title: "Revaluation pipeline",
        body: "What is overdue, and what falls due in the next 7, 14 and 30 days, across the whole book.",
      },
      {
        title: "Valuation history",
        body: "Every valuation recorded for an asset, with its date, the next due date and who recorded it.",
      },
    ],
    comparison: {
      today: [
        "Accuracy degrades rapidly post sanction as updates become irregular.",
        "Answering “What is overdue today?” in real time creates regulatory and exposure risk.",
        "Audit evidence is pieced together after the fact — or missing.",
      ],
      withProduct: [
        "Dynamic valuation kept current at a defined cadence.",
        "Real-time LTV with breach alerts.",
        "Automated triggers for margin calls, top-ups, and escalations.",
        "Insurance tracking across renewals and coverage checks.",
        "Portfolio dashboards for concentration, stress, and recovery.",
      ],
    },
    footerLine: "Control credit exposure. Accelerate portfolio growth.",
    footerNote:
      "Enterprise deployment. Works alongside your existing core systems.",
    coverage: [
      {
        stage: "Monitor & review",
        capability: "Time and event based valuation alerts",
      },
      {
        stage: "Renew & grow",
        capability: "Current valuations and growth opportunities ahead of renewal",
      },
      {
        stage: "Audit & report",
        capability: "Complete history of your valuation actions",
      },
    ],
    microsoftPartnership: {
      headline: "Built with Microsoft. \nAvailable on Microsoft Marketplace.",
      summary:
        "Gravice is an official Microsoft partner, part of the Microsoft AI Cloud Partner Program and the ISV Success program. V-Track is listed on Microsoft Marketplace, so your teams can find, procure, and deploy through a channel you already trust.",
      marketplaceUrl:
        "https://marketplace.microsoft.com/en-us/product/fractalhive01.v-track",
    },
  },
  nico: {
    slug: "nico",
    name: "NICO",
    tagline: "Intelligent automation",
    headline: "One engine. Any process.",
    summary:
      "NICO is an agentic orchestration platform that automates business processes end-to-end, from document ingestion to downstream processing. If a process runs on documents and decisions, NICO can automate it.",
    audience: "For banks, NBFCs, and operations teams",
    accent: "orange",
    problem:
      "Documents are keyed in by hand. Invoices, notices, and approvals are typed, checked, and chased manually.",
    outcome:
      "Documents processed automatically. NICO Intelligence reads and checks each document, rules route approvals, and every step is logged.",
    steps: [
      {
        title: "Receive",
        body: "Documents arrive by email, upload, or API.",
      },
      {
        title: "Read",
        body: "NICO Intelligence classifies documents and extracts contextual data.",
      },
      {
        title: "Check",
        body: "Validate against your rules, masters, and limits.",
      },
      {
        title: "Resolve",
        body: "NICO Intelligence handles exceptions that need human judgment.",
      },
      {
        title: "Approve",
        body: "Route to the right decision-makers with complete context.",
      },
      {
        title: "Complete",
        body: "Post to your systems and log every step.",
      },
    ],
    features: [
      {
        title: "Predictable",
        body: "Defined processes follow the same path, every time.",
      },
      {
        title: "Explainable",
        body: "Every NICO Intelligence step shows what it read and how it decided.",
      },
      {
        title: "Auditable",
        body: "A complete log of every document, check, and step.",
      },
    ],
    useCases: [
      {
        title: "Lender notices",
        body: "Read incoming notices, extract key details and deadlines, and route each one to the correct team.",
      },
      {
        title: "KYC verification",
        body: "Extract and cross-check data from identity and address documents, and flag mismatches for review.",
      },
      {
        title: "Application processing",
        body: "Capture data from loan applications and supporting documents, and auto-check each file for completeness.",
      },
      {
        title: "Complex workflows",
        body: "Route credit, deviation, and exception workflows with complete context and audit trail.",
      },
      {
        title: "Invoices and accounts payable",
        body: "Capture vendor invoices, validate them against your rules, and post them to your ERP.",
      },
    ],
    offerings: [
      {
        title: "NICO SaaS",
        body: "Get started immediately with ready-made workflows.",
      },
      {
        title: "NICO Enterprise",
        body: "Custom workflows, integrations, and deployment for large organisations.",
      },
    ],
    footerLine: "Automation your teams can trust.",
    footerNote: "Powered by NICO Intelligence.",
    coverage: [
      {
        stage: "Prospect & engage",
        capability: "KYC and onboarding document processing",
      },
      {
        stage: "Originate & sanction",
        capability: "Approval workflows and routing",
      },
      {
        stage: "Disburse & enable",
        capability: "Document checks and processing",
      },
      {
        stage: "Audit & report",
        capability: "Every human, system, and agentic action logged",
      },
    ],
  },
};

export const productList = Object.values(products);

export function getProduct(slug: string): Product | undefined {
  if (slug in products) return products[slug as ProductSlug];
  return undefined;
}
