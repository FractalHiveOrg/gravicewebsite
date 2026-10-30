import Link from "next/link";
import { ClarityTags } from "@/components/ClarityTags";
import { CopyLinkButton } from "@/components/company/CopyLinkButton";
import { ProductImage } from "@/components/product/ProductImage";
import type { ImageSlot } from "@/lib/productImages";
import { Insights } from "../home/Insights";

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
  src:"/fractalhive-to-gravice-rebrand_1.png"
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
                <span>October 29, 2026</span>
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
                We started in 2024, when a banking veteran saw how much of the financial industry still ran on processes
                that were slow, redundant and costly. Since then we&apos;ve built three products to change that:
                ElevateRM for relationship managers, V-Track for collateral revaluation, and NICO for documents and
                processes.
              </p>
              <h2>Why a new name</h2>
              <p>Our products share one intelligent platform underneath. The new name says what that platform does.</p>
              <blockquote>
                Gravity is the pull of a strong centre. A lattice is order that holds. Gravice is both.
              </blockquote>
             
              <h2>What changes for customers</h2>
              <ul>
                <li>Our name, logo and website change to Gravice.</li>
                <li>Your products, your contacts and the way you work with us stay the same.</li>
                <li>Product names stay the same: ElevateRM, V-Track and NICO.</li>
              </ul>
              <p>If you have questions, reach out to us at  <Link
                  href="mailto:contact@gravicesolutions.com"
                  className="font-medium text-pull-orange-deep! underline-offset-4! hover:underline"
                >
                  contact@gravicesolutions.com
                </Link></p>
            </div>
          </article>
        </div>
      </section>

            <Insights />
    
    </div>
  );
}
