"use client";

import { ProductImage } from "@/components/product/ProductImage";
import { useScrollStep } from "@/gravice/hooks/useScrollStep";
import type { ImageSlot } from "@/lib/productImages";

type Props = {
  name: string;
  steps: { title: string; body: string }[];
  /** One screenshot slot per step, shown in the sticky centre column. */
  screens: ImageSlot[];
};

/**
 * Product page "How it works": sticky heading | sticky screenshot stage | scrolling steps.
 * The step nearest the focus line is lit and its screenshot crossfades in.
 */
export function ProductHowItWorks({ name, steps, screens }: Props) {
  const { active, register } = useScrollStep(steps.length);
  return (
    <section data-cursor-surface="light" className="gv-band gv-light gv-p-how">
      <div className="gv-wrap gv-p-how-grid">
        <div className="gv-p-how-left">
          <h2>How {name} works</h2>
        </div>
        <div className="gv-p-how-stage" aria-hidden="true">
          {screens.map((slot, i) => (
            <ProductImage
              key={slot.id}
              slot={slot}
              className={`gv-ph-screen${i === active ? " gv-on" : ""}`}
            />
          ))}
        </div>
        <ol className="gv-p-how-steps">
          {steps.map((step, i) => (
            <li
              key={step.title}
              ref={register(i)}
              className={`gv-p-how-step${i === active ? " gv-on" : ""}`}
            >
              <span className="gv-p-n">Step {i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
