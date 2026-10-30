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

/**
 * Number the slots IMG-01… in page order: hero, then how-it-works screens, then feature cards.
 * `src` maps a slot ID to its screenshot under /public, e.g. { "IMG-02": "/products/elevaterm/img-02.png" }.
 */
function slots(
  hero: [string, string?],
  steps: [string, string?][],
  features: string[],
  src: Record<string, string> = {},
): Slots {
  let n = 1;
  const slot = (label: string, size: string, note?: string): ImageSlot => {
    const id = `IMG-${String(n++).padStart(2, "0")}`;
    return { id, label, size, note, src: src[id] };
  };
  return {
    hero: slot(hero[0], HERO, hero[1]),
    steps: steps.map(([label, note]) => slot(label, SCREEN, note)),
    features: features.map((label) => slot(label, CARD)),
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
    {
      "IMG-02":
        "https://fractalhiveassets.blob.core.windows.net/assets/ERMimg-02-new-deal.webp?sp=r&st=2026-10-29T12:23:17Z&se=2036-10-29T20:38:17Z&spr=https&sv=2026-02-06&sr=b&sig=8WS3WHOqK9krSB18Ex7lYG9j01gthTcVMaXdihQQOow%3D",
      "IMG-03":
        "https://fractalhiveassets.blob.core.windows.net/assets/ERMimg-03-relationship.webp?sp=r&st=2026-10-29T12:24:12Z&se=2036-10-29T20:39:12Z&spr=https&sv=2026-02-06&sr=b&sig=OJ4M3rXpp91TE5bgfv4mvpcOQw9NE%2B%2BMFYQGlBrqw1c%3D",
      "IMG-04":
        "https://fractalhiveassets.blob.core.windows.net/assets/ERMimg-04-approval.webp?sp=r&st=2026-10-29T12:24:28Z&se=2036-10-29T20:39:28Z&spr=https&sv=2026-02-06&sr=b&sig=xVMVzmvk7eyCxhprH5MO%2BHOcuSKgVLWifxTZbgNJgv8%3D",
      "IMG-05":
        "https://fractalhiveassets.blob.core.windows.net/assets/ERMimg-05-reminders.webp?sp=r&st=2026-10-29T12:24:45Z&se=2036-10-29T20:39:45Z&spr=https&sv=2026-02-06&sr=b&sig=gcvpoCSTrWIwX%2BGkvGZyrEiDZGuSEINtgU52MwmtbZU%3D",
      "IMG-06":
        "https://fractalhiveassets.blob.core.windows.net/assets/ERMimg-06-reports.webp?sp=r&st=2026-10-29T12:24:59Z&se=2036-10-29T20:39:59Z&spr=https&sv=2026-02-06&sr=b&sig=RPiY2i1VvmSkjLkxiN2iREyu1JCi2e1DvKefioDB9xw%3D",
      "IMG-07":
        "https://fractalhiveassets.blob.core.windows.net/assets/ERMimg-07-customer.webp?sp=r&st=2026-10-29T12:25:17Z&se=2036-10-29T20:40:17Z&spr=https&sv=2026-02-06&sr=b&sig=A7Ga6Tb%2BaddSgltQPsPVJmYm%2FiFaPUcmtUcYVWIXQfY%3D",
      "IMG-08":
        "https://fractalhiveassets.blob.core.windows.net/assets/ERMimg-08-analytics.webp?sp=r&st=2026-10-29T12:25:32Z&se=2036-10-29T20:40:32Z&spr=https&sv=2026-02-06&sr=b&sig=e9SHmP%2Bl1eYnrdUMe8Ey88r6nxjLbdtrH7zFxKnsSjg%3D",
      "IMG-09":
        "https://fractalhiveassets.blob.core.windows.net/assets/ERMimg-09-activity.webp?sp=r&st=2026-10-29T12:25:54Z&se=2036-10-29T20:40:54Z&spr=https&sv=2026-02-06&sr=b&sig=G%2F%2Bqgv8nMR5BkCUnY3gzzAhpv3NNb7CODAVkTmJCPcA%3D",
    },
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
    {
      "IMG-02":
        "https://fractalhiveassets.blob.core.windows.net/assets/VTimg-02-portfolio.webp?sp=r&st=2026-10-29T12:26:32Z&se=2036-10-29T20:41:32Z&spr=https&sv=2026-02-06&sr=b&sig=TnJVI0Y655idcTrSh%2FsoSFFTaHmauf1tupwGqpL4jBI%3D",
      "IMG-03":
        "https://fractalhiveassets.blob.core.windows.net/assets/VTimg-03-collateral.webp?sp=r&st=2026-10-29T12:26:47Z&se=2036-10-29T20:41:47Z&spr=https&sv=2026-02-06&sr=b&sig=z4bdqj5I6BrygjvWTrh%2Ft35dCVBE0SlGGP8uB7Uz0Xg%3D",
      "IMG-04":
        "https://fractalhiveassets.blob.core.windows.net/assets/VTimg-04-valuation.webp?sp=r&st=2026-10-29T12:27:01Z&se=2036-10-29T20:42:01Z&spr=https&sv=2026-02-06&sr=b&sig=hAqU%2Fnn62DbuKP2HNFJ8lhlltesLPNxEfpf2vc8%2Fce0%3D",
      "IMG-05":
        "https://fractalhiveassets.blob.core.windows.net/assets/VTimg-05-pipeline.webp?sp=r&st=2026-10-29T12:27:17Z&se=2036-10-29T20:42:17Z&spr=https&sv=2026-02-06&sr=b&sig=Ver1R0uisrgKW%2BkrmPy6l38vrbfnDtQ03rHZfAb5FV8%3D",
      "IMG-06":
        "https://fractalhiveassets.blob.core.windows.net/assets/VTimg-06-history.webp?sp=r&st=2026-10-29T12:27:32Z&se=2036-10-29T20:42:32Z&spr=https&sv=2026-02-06&sr=b&sig=lkCwpNrE%2FoaMzYYzKnz%2Fj6BArvLWORXMbaWcCW0wvV4%3D",
      "IMG-07":
        "https://fractalhiveassets.blob.core.windows.net/assets/VTimg-07-trend.webp?sp=r&st=2026-10-29T12:27:52Z&se=2036-10-29T20:42:52Z&spr=https&sv=2026-02-06&sr=b&sig=%2BEFIa4jmAbul000FOyrVjMWYJmfT1UqdiXmAUhB1eVo%3D",
      "IMG-08":
        "https://fractalhiveassets.blob.core.windows.net/assets/VTimg-08-ltv.webp?sp=r&st=2026-10-29T12:28:10Z&se=2036-10-29T20:43:10Z&spr=https&sv=2026-02-06&sr=b&sig=g5Y3hseL66jZ5uh54WhgA0Zjt10pPKAJjILyymW6uMU%3D",
      "IMG-09":
        "https://fractalhiveassets.blob.core.windows.net/assets/VTimg-05-pipeline.webp?sp=r&st=2026-10-29T12:27:17Z&se=2036-10-29T20:42:17Z&spr=https&sv=2026-02-06&sr=b&sig=Ver1R0uisrgKW%2BkrmPy6l38vrbfnDtQ03rHZfAb5FV8%3D",
      "IMG-10":
        "https://fractalhiveassets.blob.core.windows.net/assets/VTimg-06-history.webp?sp=r&st=2026-10-29T12:27:32Z&se=2036-10-29T20:42:32Z&spr=https&sv=2026-02-06&sr=b&sig=lkCwpNrE%2FoaMzYYzKnz%2Fj6BArvLWORXMbaWcCW0wvV4%3D",
    },
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
