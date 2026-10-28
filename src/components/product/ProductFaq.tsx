import type { ReactNode } from "react";
import type { FaqItem, ProductFaq as Faq } from "@/lib/productFaqs";

/** Answer text, with `link.label` (if any) turned into a link, then the "to confirm" note. */
function Answer({ item }: { item: FaqItem }) {
  let body: ReactNode = item.a;
  if (item.a && item.link) {
    const at = item.a.indexOf(item.link.label);
    if (at >= 0) {
      body = (
        <>
          {item.a.slice(0, at)}
          <a href={item.link.href} target="_blank" rel="noopener noreferrer">
            {item.link.label}
          </a>
          {item.a.slice(at + item.link.label.length)}
        </>
      );
    }
  }
  return (
    <p>
      {body}
      {item.a && item.confirm ? " " : null}
      {item.confirm && <em>{item.confirm}</em>}
    </p>
  );
}

/** Product page FAQ: heading on the left, accordion on the right; the first answer starts open. */
export function ProductFaq({ faq, band }: { faq: Faq; band: string }) {
  return (
    <section id="faq" data-cursor-surface="light" className={`gv-band gv-light gv-p-faq ${band}`}>
      <div className="gv-wrap gv-p-faq-grid">
        <div className="gv-p-faq-head">
          <div className="gv-eyebrow">FAQ</div>
          <h2>{faq.heading}</h2>
          {faq.note && <p className="gv-p-muted">{faq.note}</p>}
        </div>
        <div className="gv-p-faq-list">
          {faq.items.map((item, i) => (
            <details key={item.q} open={i === 0}>
              <summary>{item.q}</summary>
              <Answer item={item} />
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
