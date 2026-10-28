import Link from "next/link";
import type { ProductSecurity as Security } from "@/lib/productSecurity";

/** Product page "Security & deployment": heading with a Trust Center link, then three cards. */
export function ProductSecurity({ security, band }: { security: Security; band: string }) {
  return (
    <section id="security" data-cursor-surface="light" className={`gv-band gv-light ${band}`}>
      <div className="gv-wrap">
        <div className="gv-p-top gv-p-top-between">
          <div className="gv-p-top">
            <div className="gv-eyebrow">Security &amp; deployment</div>
            <h2>{security.heading}</h2>
          </div>
          <Link className="gv-textlink" href="/trust">
            Visit the Trust Center →
          </Link>
        </div>
        <div className="gv-p-grid gv-p-grid-3">
          {security.cards.map((card) => (
            <article key={card.title} className="gv-p-card gv-p-sec-card">
              <h3>{card.title}</h3>
              <p>
                {card.body}
                {card.inlineConfirm && (
                  <>
                    {" "}
                    <em>{card.inlineConfirm}</em>
                  </>
                )}
              </p>
              {card.confirm && <span className="gv-p-tbc">{card.confirm}</span>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
