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
import { WorkflowDemo } from "@/gravice/components/industry/WorkflowDemo";
import { ArrowUpRight } from "lucide-react";

/**
 * Manufacturing industry page (prototypes/manufacturing.html; copy from Figma "Manufacturing — Desktop (v2)"):
 * hero globe → the pressure → sticky "from order to ledger" journey → workflow engine → by role →
 * integrations → insights → closing with "Explore the products".
 * The results band (template slot) stays off the live page until the figures are approved.
 */
const NICO_APP = "https://nico.fractalhive.com";

const PRESSURE: Pressure[] = [
  {
    product: "nico",
    title: "Supplier invoices are keyed into Tally / Zoho / ERP by hand.",
    body: "Invoices and GRNs pile up every month. Someone reads each one, types it in, and month end runs late.",
  },
  {
    product: "nico",
    title: "Orders arrive in every format.",
    body: "Purchase orders and delivery notes come by email, WhatsApp and paper, and each one is re-entered before work can start.",
  },
  {
    product: "elevaterm",
    title: "Key accounts live in spreadsheets.",
    body: "Dealer and customer deals are tracked by each salesperson, so follow-ups slip and repeat orders are missed.",
  },
];

const STAGES: JourneyStage[] = [
  {
    label: "Win the account",
    title: "Every dealer and key account in one pipeline.",
    body: "Leads, meetings and deals for each account in one place, so nothing depends on one salesperson's spreadsheet.",
    orb: "elevaterm",
    tags: ["elevaterm"],
  },
  {
    label: "Take the order",
    title: "Purchase orders read the moment they arrive.",
    body: "Forward POs by email or WhatsApp. NICO pulls out the items, quantities and terms, ready to act on.",
    orb: "nico",
    tags: ["nico"],
  },
  {
    label: "Buy and receive",
    title: "Supplier invoices and GRNs, checked for you.",
    body: "NICO reads each invoice and GRN, checks it against your rules and flags only what needs a person.",
    orb: "nico",
    tags: ["nico"],
  },
  {
    label: "Post and close",
    title: "Approved entries straight into Tally / Zoho / ERP.",
    body: "Approved documents export to Tally, Zoho, your ERP or Excel, so month end closes on time.",
    orb: "nico",
    tags: ["nico"],
  },
  {
    label: "Grow the account",
    title: "Repeat orders, before a competitor gets them.",
    body: "Account history and follow-ups in ElevateRM show sales teams which customers are due to reorder.",
    orb: "elevaterm",
    tags: ["elevaterm"],
  },
];

const BLOCKS = [
  { title: "Triggers", body: "Documents, orders, website events and schedules" },
  { title: "Rules engine", body: "Conditions, limits, waits and routing" },
  { title: "Notification engine", body: "WhatsApp, email and in-app alerts" },
  { title: "Actions", body: "Post to Tally / Zoho / ERP, create tasks, call APIs" },
];

const ROLES: Role[] = [
  {
    title: "Finance and accounts teams",
    lede: "Fewer documents to type, a faster month end.",
    points: [
      "Invoices, receipts and GRNs read automatically",
      "Only exceptions sent to a person for review",
      "Approved entries exported to Tally / Zoho / ERP",
    ],
    products: ["nico"],
  },
  {
    title: "Purchase and operations teams",
    lede: "Orders and receipts captured as they arrive.",
    points: [
      "Purchase orders and delivery notes read on arrival",
      "Approvals routed to the right person automatically",
      "Every step recorded for audit",
    ],
    products: ["nico"],
  },
  {
    title: "Sales and key-account teams",
    lede: "Every account and deal in one place.",
    points: [
      "One pipeline for dealers and key accounts",
      "Account history before every call",
      "Managers see the whole book without a report",
    ],
    products: ["elevaterm"],
  },
];

const INTEGRATIONS: { title: string; tiles: { name: string; key?: boolean }[] }[] = [
  {
    title: "Bring documents in",
    tiles: [{ name: "WhatsApp" }, { name: "Email" }, { name: "Upload" }, { name: "Google Drive" }, { name: "OneDrive" }, { name: "Dropbox" }],
  },
  {
    title: "Notify your team",
    tiles: [{ name: "WhatsApp" }, { name: "Email" }, { name: "In-app alerts" }],
  },
  {
    title: "Send entries to",
    tiles: [{ name: "Tally", key: true }, { name: "Zoho Books", key: true }, { name: "Your ERP (API)" }, { name: "Excel" }],
  },
];

const CONTROLS = [
  {
    title: "Cloud or on-premise",
    body: "NICO runs in the cloud on Microsoft Azure. Larger businesses can also run it in their own data centre.",
  },
  {
    title: "Controlled and auditable",
    body: "Role-based access, data retention controls and a log of every action, across every Gravice product.",
  },
];

const INSIGHTS: Insight[] = [
  { kind: "Product", title: "NICO now works with Tally", meta: "Placeholder announcement" },
  { kind: "Guide · placeholder", title: "Getting supplier invoices into Tally / Zoho / ERP without retyping", meta: "To be written" },
  { kind: "Company news", title: "FractalHive is now Gravice", meta: "A new name for a clear purpose." },
];

function Ctas({ source }: { source: string }) {
  return (
    <>
      <Button
        href={NICO_APP}
        target="_blank"
        rel="noopener noreferrer"
        clarityEvent="nico_explore_click"
        claritySource={source}
      >
        Try NICO for Free <ArrowUpRight />
      </Button>
      <Button
        href="/demo?product=nico"
        variant="secondary-dark"
        clarityEvent="book_demo_click"
        claritySource={source}
      >
        Book a demo
      </Button>
    </>
  );
}

export function ManufacturingPage() {
  return (
    <div>
      <ClarityTags tags={{ industry: "manufacturing" }} />

      <IndustryHero
        industry="Manufacturing"
        title="Built for the way manufacturers buy, sell and get paid."
        lede="Gravice turns supplier invoices, GRNs and purchase orders into Tally / Zoho / ERP entries without retyping, and keeps key accounts and dealer deals in one place."
        audiences={["Manufacturers", "Distributors and traders"]}
        actions={<Ctas source="industry_manufacturing_hero" />}
      />

      <IndustryPressure
        eyebrow="The pressure on manufacturers"
        title="Three things slow the back office down."
        items={PRESSURE}
      />

      <IndustryJourney
        eyebrow="From order to ledger"
        title="One platform, from the first order to the books."
        lede="NICO handles the documents and ElevateRM handles the accounts, with the same audit trail underneath both."
        stages={STAGES}
      />

      {/* workflow engine (manufacturing only) */}
      <section data-cursor-surface="light" className="gv-band gv-light gv-i-paper">
        <div className="gv-wrap">
          <div className="gv-i-top">
            <div className="gv-eyebrow">Workflow engine</div>
            <h2>Automate any business process, not just documents.</h2>
            <p className="gv-i-wf-lede">
              NICO&apos;s workflow engine connects triggers, a rules engine and a notification engine to the systems you
              already run. Set a process up once, and NICO runs it every time: approvals, order updates, sales
              follow-ups and more.
            </p>
          </div>
          <div className="gv-i-wf-blocks">
            {BLOCKS.map((b) => (
              <div key={b.title}>
                <b>{b.title}</b>
                <span>{b.body}</span>
              </div>
            ))}
          </div>
          <WorkflowDemo />
          <p className="gv-i-wf-ex">Start from a template, or build your own.</p>
        </div>
      </section>

      <IndustryRoles roles={ROLES} />

      {/* platform integrations */}
      <section data-cursor-surface="light" className="gv-band gv-light gv-i-paper">
        <div className="gv-wrap">
          <div className="gv-i-top">
            <div className="gv-eyebrow">Platform integrations</div>
            <h2>Works with the software you already use.</h2>
          </div>
          <div className="gv-i-int-grid">
            {INTEGRATIONS.map((g) => (
              <div key={g.title} className="gv-i-int">
                <h3>{g.title}</h3>
                <div className="gv-i-int-tiles">
                  {g.tiles.map((t) => (
                    <em key={t.name} >
                      {t.name}
                    </em>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* <div className="gv-i-int-foot">
            {CONTROLS.map((c) => (
              <div key={c.title} className="gv-p-card gv-p-sec-card">
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div> */}
        </div>
      </section>

      <IndustryInsights title="Reading for manufacturers." items={INSIGHTS} />

      <IndustryClosing
        title="See how Gravice can work for you."
        lede="Try NICO free in the web app, or book a 30-minute demo with our team."
        actions={<Ctas source="industry_manufacturing_footer" />}
        explore={[
          { product: "nico", line: "Invoices, GRNs and orders" },
          { product: "elevaterm", line: "Key accounts and dealers" },
        ]}
      />
    </div>
  );
}
