import type { ProductSlug } from "@/lib/products";

/**
 * Product page "Security & deployment" (prototypes/*.html, section 7).
 * `confirm` marks a card the product team still has to confirm before launch; it renders as
 * an orange note under the card. `inlineConfirm` renders at the end of the text instead.
 * Remove them once confirmed.
 */
export type SecurityCard = {
  title: string;
  body: string;
  inlineConfirm?: string;
  confirm?: string;
};

export type ProductSecurity = { heading: string; cards: SecurityCard[] };

const TBC = "To confirm with the product team";

export const productSecurity: Record<ProductSlug, ProductSecurity> = {
  elevaterm: {
    heading: "Fits the way your bank already works.",
    cards: [
      {
        title: "Cloud or on-premise",
        body: "Run ElevateRM in the cloud or inside your own data centre, to match your IT and data residency policies.",
        confirm: TBC,
      },
      {
        title: "Connects to what you run",
        body: "Works alongside your LOS, CMS and core banking systems, so client and exposure data stay in sync.",
        confirm: TBC,
      },
      {
        title: "Controlled and auditable",
        body: "Role-based access and a full activity history, part of the assurance layer shared by every Gravice product.",
      },
    ],
  },
  "v-track": {
    heading: "Fits the way your bank already works.",
    cards: [
      {
        title: "Cloud or on-premise",
        body: "Run V-Track in the cloud or inside your own data centre, to match your IT and data residency policies.",
        confirm: TBC,
      },
      {
        title: "Connects to what you run",
        body: "Connects to your core banking and loan origination systems, so collateral records stay in sync.",
        confirm: TBC,
      },
      {
        title: "Controlled and auditable",
        body: "Role-based access and a dated history of every valuation update, part of the assurance layer shared by every Gravice product.",
      },
    ],
  },
  nico: {
    heading: "Fits the way your business already works.",
    cards: [
      {
        title: "Cloud or on-premise",
        body: "NICO runs in the cloud on Microsoft Azure. Enterprise customers can also run it inside their own data centre.",
        confirm: TBC,
      },
      {
        title: "Connects to what you run",
        body: "Tally, Zoho Books, WhatsApp and cloud drives, with custom APIs for Enterprise customers.",
        inlineConfirm: "To confirm the current list.",
        confirm: TBC,
      },
      {
        title: "Controlled and auditable",
        body: "Encryption, data retention controls, role-based access and an audit log of every action, part of the assurance layer shared by every Gravice product.",
      },
    ],
  },
};
