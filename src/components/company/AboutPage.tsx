import Link from "next/link";
import { Button } from "@/components/Button";
import { ClarityTags } from "@/components/ClarityTags";
import { AboutLattice } from "@/components/company/AboutLattice";
import { CompanyClosing, CompanyHero } from "@/components/company/CompanySections";
import type { GraviceProduct } from "@/gravice/components/ProductOrb";
import { PRODUCT_META, ProductMark } from "@/gravice/components/industry/ProductMark";

/**
 * About page (prototypes/about.html): hero globe → our story + timeline → the name (gravity + lattice) →
 * mission and vision → values → what we build → closing.
 */
const TIMELINE = [
  {
    when: "2023",
    title: "FractalHive is founded",
    body: "A banking veteran sets out to remove the slow, redundant and costly work from financial operations.",
  },
  {
    when: "Our products",
    title: "ElevateRM, V-Track and NICO",
    body: "Relationship management, collateral revaluation tracking, and document and process automation.",
  },
  {
    when: "2026",
    title: "FractalHive becomes Gravice",
    body: "A new name for a clear purpose: intelligence at the centre of banking and business operations.",
    now: true,
  },
];

const VALUES = [
  { title: "Be 10× better", body: "We aim for real change in high-stakes processes, not small improvements." },
  {
    title: "Simplicity over extravagance",
    body: "Every feature earns its place. We build what institutions need, nothing more.",
  },
  {
    title: "Honesty over short-term gain",
    body: "Trust and transparency come first, because we want relationships that last.",
  },
  {
    title: "Innovation through collaboration",
    body: "Domain expertise and modern technology, with many perspectives at the table.",
  },
];

const PRODUCTS: { product: GraviceProduct; name: string; body: string }[] = [
  {
    product: "elevaterm",
    name: "ElevateRM",
    body: "Relationship management for banks: every deal and customer in one workspace.",
  },
  {
    product: "vtrack",
    name: "V-Track",
    body: "Collateral revaluation tracking: every asset and due date in one view.",
  },
  {
    product: "nico",
    name: "NICO",
    body: "Document and process automation: documents in, decisions out.",
  },
];

export function AboutPage() {
  return (
    <div>
      <ClarityTags tags={{ company: "about" }} />

      <CompanyHero
        page="About"
        title="We bring order to slow, manual, high-stakes work."
        lede="Gravice builds intelligent but simple software for banks, NBFCs and growing businesses, so their teams move faster, with less risk and more control."
        actions={
          <>
            <Button href="/demo" clarityEvent="book_demo_click" claritySource="about_hero">
              Book a demo
            </Button>
            <Button href="#story" variant="secondary-dark">
              Our story
            </Button>
          </>
        }
      />

      <section id="story" data-cursor-surface="light" className="gv-band gv-light gv-c-sec gv-c-cream">
        <div className="gv-wrap gv-c-two">
          <div className="gv-c-stack">
            <div className="gv-eyebrow">Our story</div>
            <h2 className="gv-c-big-h">Started by a banker who saw the gap.</h2>
            <p className="gv-c-lead">
              In 2023, a banking veteran saw how much of the financial industry still ran on processes that were slow,
              redundant and costly. Relationship managers chased paperwork instead of clients. Collateral was tracked
              in spreadsheets. Loan files were read and re-keyed by hand.
            </p>
            <p className="gv-c-lead">
              FractalHive was founded to fix that. Today, as Gravice, we build one intelligent platform that sits
              underneath the work and keeps it moving.
            </p>
          </div>
          <ol className="gv-c-timeline">
            {TIMELINE.map((t) => (
              <li key={t.title} className={t.now ? "gv-now" : undefined}>
                <b>{t.when}</b>
                <h3>{t.title}</h3>
                <p>{t.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section data-cursor-surface="light" className="gv-band gv-light gv-c-sec gv-c-white">
        <div className="gv-wrap">
          <div className="gv-i-top">
            <div className="gv-eyebrow">The name</div>
            <h2>Gravity, and a lattice.</h2>
            <p className="gv-c-lead">
              Gravity is the pull of a strong centre. A lattice is order that holds. Gravice is both: one intelligent
              core that pulls scattered, manual work into a structure people can rely on.
            </p>
          </div>
          <AboutLattice />
        </div>
      </section>

      <section data-cursor-surface="dark" className="gv-band gv-c-sec gv-c-dark">
        <div className="gv-wrap">
          <div className="gv-i-top">
            <div className="gv-eyebrow">Mission and vision</div>
            <h2>Why we exist.</h2>
          </div>
          <div className="gv-c-mv">
            <div>
              <span className="gv-eyebrow">Mission</span>
              <h3>Build intelligent but simple tools that make complex operations dependable.</h3>
              <p>Systems that are simple to run, give people dependable control, and serve the teams who use them.</p>
            </div>
            <div>
              <span className="gv-eyebrow">Vision</span>
              <h3>Modern AI that every organisation can afford and trust.</h3>
              <p>Technology that empowers people instead of replacing them, with trust built in from the start.</p>
            </div>
          </div>
        </div>
      </section>

      <section data-cursor-surface="light" className="gv-band gv-light gv-c-sec gv-c-cream">
        <div className="gv-wrap">
          <div className="gv-i-top">
            <div className="gv-eyebrow">Our values</div>
            <h2>How we work.</h2>
          </div>
          <div className="gv-c-cards4">
            {VALUES.map((v, i) => (
              <div key={v.title} className="gv-c-vcard">
                <span className="gv-c-n">{String(i + 1).padStart(2, "0")}</span>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-cursor-surface="light" className="gv-band gv-light gv-c-sec gv-c-white">
        <div className="gv-wrap">
          <div className="gv-i-top">
            <div className="gv-eyebrow">What we build</div>
            <h2>Three products. <br /> One platform underneath.</h2>
          </div>
          <div className="gv-c-cards3">
            {PRODUCTS.map((p) => (
              <Link
                key={p.product}
                href={PRODUCT_META[p.product].href}
                data-clarity-event="product_link_click"
                data-clarity-source={`about_${p.product}`}
                className="gv-c-pcard"
              >
                <ProductMark product={p.product} />
                <h3>{p.name}</h3>
                <p>{p.body}</p>
                <span className="gv-textlink">Explore {p.name} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CompanyClosing
        title="Work with us, or build with us."
        lede="See what Gravice can do for your teams, or join the team building it."
        actions={
          <>
            <Button href="/demo" clarityEvent="book_demo_click" claritySource="about_footer">
              Book a demo
            </Button>
            <Button href="/company/careers" variant="secondary-dark">
              See careers
            </Button>
          </>
        }
      />
    </div>
  );
}
