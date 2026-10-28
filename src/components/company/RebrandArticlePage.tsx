import Link from "next/link";
import { ClarityTags } from "@/components/ClarityTags";
import { CopyLinkButton } from "@/components/company/CopyLinkButton";
import { ProductImage } from "@/components/product/ProductImage";
import type { ImageSlot } from "@/lib/productImages";

/**
 * Newsroom article (prototypes/newsroom-article.html): the FractalHive → Gravice announcement, then
 * "Keep reading" cards. Draft copy until the date, customer details and legal wording are confirmed.
 * "Newsroom" links point at /insights until the newsroom index page exists.
 */
const ARTICLE_PATH = "/insights/fractalhive-is-now-gravice";
const NEWSROOM_HREF = "/insights";
const TITLE = "FractalHive is now Gravice.";

const HERO_IMAGE: ImageSlot = {
  id: "NEWS-01",
  label: "Announcement image",
  size: "1600 × 900",
  note: "the new Gravice logo",
};

const MORE = [
  {
    title: "Gold loans may reach ₹30 lakh crore by FY28. Is the industry ready?",
    href: "https://www.linkedin.com/pulse/gold-loans-may-reach-30-lakh-crore-fy28-industry-ready-fractalhive-df8yc/",
  },
  {
    title: "Collateral valuation assurance: from static checks to continuous control",
    href: "https://www.linkedin.com/pulse/collateral-valuation-assurance-risk-management-fractalhive-hovdc/",
  },
  {
    title: "A day in the life of a relationship manager: what's silently weakening the sales engine?",
    href: "https://www.linkedin.com/pulse/day-life-relationship-manager-whats-silently-weakening-sales-uykpc/",
  },
];

function shareLinks() {
  const url = encodeURIComponent(`https://gravicesolutions.com${ARTICLE_PATH}`);
  const text = encodeURIComponent(TITLE);
  return [
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}` },
    { label: "X", href: `https://x.com/intent/post?url=${url}&text=${text}` },
    { label: "Email", href: `mailto:?subject=${text}&body=${url}` },
  ];
}

export function RebrandArticlePage() {
  return (
    <div>
      <ClarityTags tags={{ company: "newsroom_article" }} />

      <section data-cursor-surface="light" className="gv-band gv-light gv-c-sec gv-c-white gv-a-sec">
        <div className="gv-wrap">
          <article className="gv-a-wrap">
            <div className="gv-a-head">
              <div className="gv-a-crumb">
                <Link href={NEWSROOM_HREF}>Newsroom</Link> · Company news
              </div>
              <h1>{TITLE}</h1>
              <div className="gv-a-meta">
                <span>Date to confirm</span>
                <i aria-hidden="true" />
                <span>3 min read</span>
                <i aria-hidden="true" />
                <span>Gravice team</span>
              </div>
            </div>

            <ProductImage slot={HERO_IMAGE} className="gv-a-img" />

            <div className="gv-a-body">
              <p>FractalHive is now Gravice. The name is new. The team, the products and our purpose are the same.</p>
              <p>
                We started in 2023, when a banking veteran saw how much of the financial industry still ran on processes
                that were slow, redundant and costly. Since then we&apos;ve built three products to change that:
                ElevateRM for relationship managers, V-Track for collateral revaluation, and NICO for documents and
                processes.
              </p>
              <h2>Why a new name</h2>
              <p>Our products share one intelligent platform underneath. The new name says what that platform does.</p>
              <blockquote>
                Gravity is the pull of a strong centre. A lattice is order that holds. Gravice is both.
              </blockquote>
              <p>One core pulls scattered, manual work into a structure that teams and auditors can rely on.</p>
              <h2>What changes for customers</h2>
              <ul>
                <li>Our name, logo and website change to Gravice.</li>
                <li>Your products, your contacts and the way you work with us stay the same.</li>
                <li>Product names stay the same: ElevateRM, V-Track and NICO.</li>
              </ul>
              <p>If you have questions, your usual Gravice contact will help.</p>
            </div>

            <p className="gv-c-tbc">
              Draft copy. Confirm the date, the details for customers, and any legal wording before publishing.
            </p>

            <div className="gv-a-share">
              <span>Share</span>
              {shareLinks().map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              ))}
              <CopyLinkButton />
            </div>
          </article>
        </div>
      </section>

      <section data-cursor-surface="light" className="gv-band gv-light gv-c-sec gv-c-cream">
        <div className="gv-wrap">
          <div className="gv-i-top gv-p-top-between">
            <div className="gv-stack">
              <div className="gv-eyebrow">Keep reading</div>
              <h2>More from the newsroom.</h2>
            </div>
            <Link className="gv-textlink" href={NEWSROOM_HREF}>
              All posts →
            </Link>
          </div>
          <div className="gv-i-ins-grid">
            {MORE.map((a) => (
              <a key={a.href} className="gv-i-ins" href={a.href} target="_blank" rel="noopener noreferrer">
                <div className="gv-i-ins-art" />
                <div className="gv-i-ins-body">
                  <span className="gv-i-ins-k">Article</span>
                  <h3>{a.title}</h3>
                  <small className="gv-a-ext">On LinkedIn ↗</small>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
