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
        <div className="gv-p-how-left ">
          <h2 className="text-[48px]!">
            How <span className="whitespace-nowrap">{name}</span> works
          </h2>
          <ol className="gv-p-how-index" aria-hidden="true">
            {steps.map((step, i) => (
              <li key={step.title} className={i === active ? "gv-on" : undefined}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {step.title}
              </li>
            ))}
          </ol>
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
              <span className="gv-p-n text-[13px]!">Step {i + 1}</span>
              <h3 className="text-[40px]!">{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
