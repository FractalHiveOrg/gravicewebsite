"use client";

import {
  ElevateRMOrb,
  NicoOrb,
  VTrackOrb,
} from "@/gravice/components/ProductOrb";
import type { ProductSlug } from "@/lib/products";

const CORE = "#F6682E";
const DOTS = "#3E5F93";

const orbs = {
  elevaterm: ElevateRMOrb,
  "v-track": VTrackOrb,
  nico: NicoOrb,
} as const;

type Props = {
  slug: ProductSlug;
  size?: number;
  className?: string;
};

/** Product-specific thinking orb for marketing surfaces. */
export function ProductOrbVisual({ slug, size = 320, className }: Props) {
  const Orb = orbs[slug];
  return (
    <div className={className}>
      <Orb size={size} color={DOTS} coreColor={CORE} />
    </div>
  );
}
