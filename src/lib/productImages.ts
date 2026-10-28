import type { ProductSlug } from "@/lib/products";

/**
 * Screenshot slots on the product pages (see prototypes/*.html, "IMG-xx" placeholders).
 * Until `src` is set, each slot renders as a dashed placeholder showing its ID, label and size.
 * `steps` and `features` line up with the product's steps and features in products.ts.
 * Use demo data only in the screenshots.
 */
export type ImageSlot = {
  id: string;
  label: string;
  size: string;
  note?: string;
  /** Path under /public once the real screenshot exists, e.g. "/products/elevaterm/img-01.png". */
  src?: string;
};

type Slots = { hero: ImageSlot; steps: ImageSlot[]; features: ImageSlot[] };

const HERO = "1600 × 1000";
const SCREEN = "1400 × 1000";
const CARD = "1200 × 750";

/** Number the slots IMG-01… in page order: hero, then how-it-works screens, then feature cards. */
function slots(
  hero: [string, string?],
  steps: [string, string?][],
  features: string[],
): Slots {
  let n = 1;
  const id = () => `IMG-${String(n++).padStart(2, "0")}`;
  return {
    hero: { id: id(), label: hero[0], size: HERO, note: hero[1] },
    steps: steps.map(([label, note]) => ({ id: id(), label, size: SCREEN, note })),
    features: features.map((label) => ({ id: id(), label, size: CARD })),
  };
}

export const productImages: Record<ProductSlug, Slots> = {
  elevaterm: slots(
    ["Pipeline view", "crop of the main dashboard"],
    [
      ["Create a deal", "new-deal form"],
      ["Client history", "client timeline and exposure"],
      ["Proposal to sanction", "approval tracker"],
      ["Cross-sell view", "opportunities across the book"],
    ],
    ["Deal pipeline", "Customer 360", "Manager dashboard", "Activity history"],
  ),
  "v-track": slots(
    ["Portfolio view", "revaluation status across the book"],
    [
      ["Portfolio import", "collateral records loaded from the loan system"],
      ["Revaluation calendar", "due, coming due and overdue"],
      ["Alerts", "overdue or approaching breach"],
      ["Valuation update", "new valuation recorded against an asset"],
      ["Valuation history", "every valuation cycle for an asset"],
    ],
    ["Dynamic valuation", "Real-time LTV", "Automated triggers", "Insurance tracking", "Portfolio dashboard"],
  ),
  nico: slots(
    ["Review inbox", "documents by status, ready to approve"],
    [
      ["Upload and connectors", "documents arriving by upload, email and WhatsApp"],
      ["Document review", "extracted fields and editable line items"],
      ["Checks and rules", "each document checked against your rules"],
      ["Needs attention", "failed checks flagged for review"],
      ["Approval", "reviewed entries approved"],
      ["Export to Tally", "approved entries ready to export"],
    ],
    ["Predictable", "Explainable", "Auditable"],
  ),
};
