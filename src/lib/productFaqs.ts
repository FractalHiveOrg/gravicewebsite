import type { ProductSlug } from "@/lib/products";

/**
 * Product page FAQs (prototypes/*.html, section 8).
 * `confirm` marks an answer the product team still has to confirm before launch; it renders
 * as an orange note after the answer. Remove it once the answer is confirmed.
 * `link` turns the first occurrence of `link.label` in the answer into a link.
 */
export type FaqItem = {
  q: string;
  a?: string;
  confirm?: string;
  link?: { label: string; href: string };
};

export type ProductFaq = {
  heading: string;
  note?: string;
  items: FaqItem[];
};

const NOTE = '';

export const productFaqs: Record<ProductSlug, ProductFaq> = {
  elevaterm: {
    heading: "Questions banks ask us.",
    note: NOTE,
    items: [
      {
        q: "What is ElevateRM?",
        a: "ElevateRM is a relationship management platform from Gravice. It brings an RM's pipeline, customer history, and follow-ups into one workspace, from the first meeting to the closed deal.",
      },
      {
        q: "Who is ElevateRM for?",
        a: "Relationship managers, zonal heads and credit operations teams at banks with a commercial banking business.",
      },
      {
        q: "Does it replace our CRM or loan origination system?",
        a: "No. ElevateRM works alongside your existing systems."      },
      {
        q: "Which systems does ElevateRM connect to?",
        a: "LOS, CMS, CRM, core banking systems, and more. Reach out to us for a list of supported systems."
      },
      {
        q: "Can ElevateRM run on-premise?",
        a: "Yes, cloud and on-premise deployments are available."
      },
      {
        q: "How long does implementation take?",
        a: "Implementation typically takes 4-6 weeks. Reach out to us for a detailed timeline."
      },
    ],
  },
  "v-track": {
    heading: "Questions that banks and NBFCs ask us.",
    note: NOTE,
    items: [
      {
        q: "What is V-Track?",
        a: "V-Track is a collateral compliance assurance platform from Gravice. It gives banks and NBFCs one view of their collateral book, so they can track, update, and revalue every collateral on time.",
      },
      {
        q: "Who is V-Track for?",
        a: "Chief credit officers, chief risk officers, and credit operations teams at banks and NBFCs.",
      },
      {
        q: "How does V-Track help with regulatory compliance requirements?",
        a: "It tracks the revaluation status of every collateral, alerts your teams before it is due, and keeps a dated record of each valuation"
      },
      {
        q: "Can V-Track run on-premise?",
        a: "Yes, cloud and on-premise deployments are available."
      },
      {
        q: "Which systems does V-Track integrate with?",
        a: "Core banking and loan origination systems. Reach out to us for a list of supported systems."
      },
      {
        q: "How long does implementation take?",
        a: "Implementation typically takes 4-6 weeks. Reach out to us for a detailed timeline."
      },
    ],
  },
  nico: {
    heading: "Questions that manufacturers and distributors ask us.",
    note: NOTE,
    items: [
      {
        q: "What is NICO?",
        a: "NICO is a document and process automation platform from Gravice. It reads business documents, checks them against your configured rules, and sends approved entries to your IT system, so your team only reviews what needs a decision.",
      },
      {
        q: "Which documents can NICO read?",
        a: "Invoices, receipts, GRNs, purchase orders, and loan files to name a few. Additional document types are available depending on your workflow.",
      },
      {
        q: "Does NICO work with Tally?",
        a: "Yes. Approved entries can be exported to Tally, Zoho, or your ERP."
      },
      {
        q: "Who is NICO for?",
        a: "Finance and accounts teams, chartered accountants, and operations teams at manufacturers and distributors, and lending operations teams at banks and NBFCs.",
      },
      {
        q: "Can NICO run on-premise?",
        a: "Yes, for Enterprise customers. Otherwise, NICO runs on the Microsoft Azure cloud.",
      },
      {
        q: "How do I get started?",
        a: "Sign up in the NICO web app and try it on your own documents. For custom workflows or on-premise deployment, book a demo with our team.",
        link: { label: "NICO web app", href: "https://nico.gravicesolutions.com" },
      },
    ],
  },
};
