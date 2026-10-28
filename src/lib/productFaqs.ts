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
        a: "ElevateRM is a relationship management platform from Gravice. It brings an RM's pipeline, client history and follow-ups into one workspace, from the first meeting to the closed deal.",
      },
      {
        q: "Who is ElevateRM for?",
        a: "Relationship managers, zonal heads and credit operations teams at banks with a commercial banking business.",
      },
      {
        q: "Does it replace our CRM or loan origination system?",
        a: "No. ElevateRM sits alongside your existing systems and connects to them, so nothing has to be ripped out.",
        confirm: "To confirm.",
      },
      {
        q: "Which systems does ElevateRM connect to?",
        a: "LOS, CMS and core banking systems.",
        confirm: "To confirm the list of supported systems.",
      },
      {
        q: "Can ElevateRM run on-premise?",
        a: "Yes, cloud and on-premise deployments are available.",
        confirm: "To confirm.",
      },
      {
        q: "How long does implementation take?",
        confirm: "To confirm with the product team.",
      },
    ],
  },
  "v-track": {
    heading: "Questions banks ask us.",
    note: NOTE,
    items: [
      {
        q: "What is V-Track?",
        a: "V-Track is a collateral revaluation tracker from Gravice. It gives banks and NBFCs one view of their collateral book, so they can track, update and revalue every asset on time.",
      },
      {
        q: "Who is V-Track for?",
        a: "Chief credit officers, chief risk officers and credit operations teams at banks and NBFCs in India and the Middle East.",
      },
      {
        q: "How does V-Track help with RBI requirements?",
        a: "It tracks the revaluation due date of every asset, alerts teams before it falls due and keeps a dated record of each valuation, so you can show auditors and the RBI that revaluations happened on time.",
        confirm: "To confirm.",
      },
      {
        q: "Can V-Track run on-premise?",
        a: "Yes, cloud and on-premise deployments are available.",
        confirm: "To confirm.",
      },
      {
        q: "Which systems does V-Track integrate with?",
        a: "Core banking and loan origination systems.",
        confirm: "To confirm the list of supported systems.",
      },
      {
        q: "How long does implementation take?",
        confirm: "To confirm with the product team.",
      },
    ],
  },
  nico: {
    heading: "Questions teams ask us.",
    note: NOTE,
    items: [
      {
        q: "What is NICO?",
        a: "NICO is a document and process automation platform from Gravice. It reads business documents, checks them against your rules and sends approved entries to your accounting system, so your team only reviews what needs a decision.",
      },
      {
        q: "Which documents can NICO read?",
        a: "Invoices, receipts, GRNs, purchase orders and loan files. The document types available depend on your workflow.",
      },
      {
        q: "Does NICO work with Tally?",
        a: "Yes. Approved entries can be exported to Tally.",
        confirm: "To confirm which Tally products are supported.",
      },
      {
        q: "Who is NICO for?",
        a: "Finance and accounts teams, chartered accountants and operations teams at manufacturers and distributors, and lending operations teams at banks and NBFCs.",
      },
      {
        q: "Can NICO run on-premise?",
        a: "Yes, for Enterprise customers. Otherwise NICO runs in the cloud on Microsoft Azure.",
      },
      {
        q: "How do I get started?",
        a: "Sign up in the NICO web app and try it on your own documents. For custom workflows or on-premise deployment, book a demo with our team.",
        link: { label: "NICO web app", href: "https://nico.fractalhive.com" },
      },
    ],
  },
};
