"use client";

import type { GraviceProduct } from "@/gravice/components/ProductOrb";
import { OrbStage } from "@/gravice/components/industry/OrbStage";
import { ProductTag } from "@/gravice/components/industry/ProductMark";
import { useScrollStep } from "@/gravice/hooks/useScrollStep";

export type JourneyStage = {
  label: string;
  title: string;
  body: string;
  orb: GraviceProduct;
  tags: GraviceProduct[];
};

type Props = {
  /** Anchor for in-page links (e.g. the hero's "See how it fits"). */
  id?: string;
  eyebrow: string;
  title: string;
  lede: string;
  stages: JourneyStage[];
};

/**
 * Industry page journey: sticky heading + tracker | sticky orb | scrolling stages.
 * The stage nearest the focus line is lit, the tracker follows it and the orb crossfades
 * to that stage's product.
 */
export function IndustryJourney({ id, eyebrow, title, lede, stages }: Props) {
  const { active, register } = useScrollStep(stages.length);
  const orbs = [...new Set(stages.map((s) => s.orb))];
  return (
    <section id={id} data-cursor-surface="light" className="gv-band gv-light gv-i-journey">
      <div className="gv-wrap gv-i-j-grid">
        <div className="gv-i-j-left">
          <div className="gv-eyebrow">{eyebrow}</div>
          <h2>{title}</h2>
          <p>{lede}</p>
          <ol className="gv-i-j-track">
            {stages.map((s, i) => (
              <li key={s.label} className={i === active ? "gv-on" : undefined}>
                <b>{String(i + 1).padStart(2, "0")}</b>
                {s.label}
              </li>
            ))}
          </ol>
        </div>
        <div className="gv-i-j-stage" aria-hidden="true">
          <OrbStage products={orbs} active={stages[active].orb} />
        </div>
        <ol className="gv-i-j-steps">
          {stages.map((s, i) => (
            <li
              key={s.label}
              ref={register(i)}
              className={`gv-i-j-step${i === active ? " gv-on" : ""}`}
            >
              <span className="gv-p-n">
                {String(i + 1).padStart(2, "0")} · {s.label}
              </span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <div className="gv-i-tags">
                {s.tags.map((p) => (
                  <ProductTag key={p} product={p} />
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
