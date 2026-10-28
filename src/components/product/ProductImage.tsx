import type { ImageSlot } from "@/lib/productImages";

type Props = {
  slot: ImageSlot;
  className?: string;
  /** Alt text once a real screenshot is set. */
  alt?: string;
};

/** A product screenshot, or its dashed "IMG-xx" placeholder until the screenshot exists. */
export function ProductImage({ slot, className = "", alt }: Props) {
  if (slot.src) {
    return (
      <figure className={`gv-ph gv-ph-img ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={slot.src} alt={alt ?? slot.label} loading="lazy" />
      </figure>
    );
  }
  return (
    <figure className={`gv-ph ${className}`} data-img={slot.id}>
      <figcaption>
        <b>{slot.id}</b> {slot.label}
        <small>
          {slot.size}
          {slot.note ? ` · ${slot.note}` : ""}
        </small>
      </figcaption>
    </figure>
  );
}
