import { Button } from "@/components/Button";
import { ClarityTags } from "@/components/ClarityTags";
import { IndustryJourney, type JourneyStage } from "@/components/industry/IndustryJourney";
import {
  IndustryClosing,
  IndustryHero,
  IndustryInsights,
  IndustryPressure,
  IndustryRoles,
  type Insight,
  type Pressure,
  type Role,
} from "@/components/industry/IndustrySections";

/**
 * Financial services industry page (prototypes/financial-services.html; copy from Figma
 * "Financial services — Desktop (v2)"): hero globe → the pressure → sticky credit journey → by role →
 * built for regulatory compliance → insights → closing with "Explore the products".
 * The results band (template slot) stays off the live page until the figures are approved.
 */
const PRESSURE: Pressure[] = [
  {
    product: "elevaterm",
    title: "RMs spend their day on admin, not clients.",
    body: "Pipelines live in inboxes and spreadsheets. Follow-ups slip, and managers wait for reports to see the book.",
  },
  {
    product: "vtrack",
    title: "Collateral revaluations slip past due dates.",
    body: "Due dates are tracked by hand. Late revaluations draw regulatory penalties and hide risk in the portfolio.",
  },
  {
    product: "nico",
    title: "Loan files are read and re-keyed by hand.",
    body: "Every application means hours of reading documents and typing the same details into another system.",
  },
];

const STAGES: JourneyStage[] = [
  {
    label: "Prospect & engage",
    title: "Every customer, ready before the meeting.",
    body: "Leads, meetings and a 360° view of each relationship, so RMs walk into every conversation prepared.",
    orb: "elevaterm",
    tags: ["elevaterm"],
  },
  {
    label: "Originate & sanction",
    title: "From application to sanction, without re-keying.",
    body: "NICO reads the loan file and checks it against your rules, while ElevateRM tracks the deal through approvals to sanction.",
    orb: "nico",
    tags: ["nico", "elevaterm"],
  },
  {
    label: "Monitor & review",
    title: "Every asset, every due date, in one view.",
    body: "V-track tracks the next revaluation date for every asset and alerts teams before anything falls due.",
    orb: "vtrack",
    tags: ["vtrack"],
  },
  {
    label: "Renew & grow",
    title: "Renewals with current values and the next opportunity.",
    body: "Current collateral values from V-track, and cross-sell and upsell opportunities surfaced in ElevateRM for each RM.",
    orb: "elevaterm",
    tags: ["elevaterm", "vtrack"],
  },
  {
    label: "Audit & report",
    title: "One audit trail, ready when the regulator asks.",
    body: "Every action across all three products is recorded in one place, with revaluation status ready for internal audit and regulatory inspections.",
    orb: "vtrack",
    tags: ["vtrack", "elevaterm", "nico"],
  },
];

const ROLES: Role[] = [
  {
    title: "Relationship managers",
    lede: "Less admin and a clear view of the book.",
    points: [
      "One pipeline from first meeting to sanction",
      "Client history and exposure before every call",
      "Team dashboards without asking for a report",
    ],
    products: ["elevaterm"],
  },
  {
    title: "Chief credit and risk officers",
    lede: "The state of the collateral book, at any moment.",
    points: [
      "Overdue revaluations spotted before they become findings",
      "Portfolio views by asset type, region and status",
      "Reports ready for the board, audit and the regulator",
    ],
    products: ["vtrack", "elevaterm"],
  },
  {
    title: "Credit and lending operations",
    lede: "Fewer documents to read, nothing to re-key.",
    points: [
      "Loan files read and checked against your rules",
      "Only exceptions sent to a person for review",
      "Every step recorded for audit",
    ],
    products: ["nico", "vtrack"],
  },
];

const COMPLIANCE = [
  {
    title: "One audit trail",
    body: "Every action across ElevateRM, V-track and NICO is recorded, so audits start from one place.",
  },
  {
    title: "Revaluations on schedule",
    body: "Due dates tracked for every asset, with a dated record of each revaluation for inspections.",
  },
  {
    title: "Cloud or on-premise",
    body: "Run Gravice in the cloud or in your own data centre, to match your IT and data residency policies.",
  },
  {
    title: "No rip-and-replace",
    body: "Works alongside your LOS, CMS and core banking systems, so nothing has to be replaced.",
  },
];

const INSIGHTS: Insight[] = [
  { kind: "Guide", title: "A practical guide to collateral revaluation for banks and NBFCs", meta: "8 min read" },
  { kind: "Article", title: "Where relationship managers' time really goes", meta: "6 min read" },
  { kind: "Company news", title: "FractalHive is now Gravice", meta: "A new name for a clear purpose." },
];

export function FinancialServicesPage() {
  return (
    <div>
      <ClarityTags tags={{ industry: "financial-services" }} />

      <IndustryHero
        industry="Financial services"
        title="Built for the way banks and NBFCs lend."
        lede="Gravice helps banks and NBFCs run relationship management, collateral tracking and loan documents on one platform, with the audit trail regulators expect."
        audiences={["Banks", "NBFCs"]}
        actions={
          <>
            <Button href="/demo" clarityEvent="book_demo_click" claritySource="industry_financial_hero">
              Book a demo
            </Button>
            <Button href="#journey" variant="secondary-dark">
              See how it fits
            </Button>
          </>
        }
      />

      <IndustryPressure
        eyebrow="The pressure on lenders"
        title="Three things affect your loan book today."
        items={PRESSURE}
      />

      <IndustryJourney
        id="journey"
        eyebrow="Across the credit journey"
        title="One platform, every stage of the loan."
        lede="Each Gravice product picks up where the last one leaves off, and the same audit trail runs underneath all of them."
        stages={STAGES}
      />

      <IndustryRoles roles={ROLES} />

      {/* built for regulatory compliance */}
      <section data-cursor-surface="light" className="gv-band gv-light gv-i-paper">
        <div className="gv-wrap">
          <div className="gv-i-top">
            <div className="gv-eyebrow">Built for regulated lenders</div>
            <h2>Built for regulatory compliance.</h2>
          </div>
          <div className="gv-i-reg-grid">
            {COMPLIANCE.map((c) => (
              <div key={c.title} className="gv-p-card gv-p-sec-card">
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <IndustryInsights title="Reading for lenders." items={INSIGHTS} />

      <IndustryClosing
        title="See Gravice with examples from lenders like you."
        lede="Book a 30-minute demo. Tell us which part of the credit journey you want to fix first."
        actions={
          <Button href="/demo" clarityEvent="book_demo_click" claritySource="industry_financial_footer">
            Book a demo
          </Button>
        }
        explore={[
          { product: "elevaterm", line: "Relationship management" },
          { product: "vtrack", line: "Collateral revaluation" },
          { product: "nico", line: "Loan documents" },
        ]}
      />
    </div>
  );
}
