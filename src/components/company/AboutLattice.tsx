"use client";

import { useSyncExternalStore } from "react";
import { LatticeAnimation } from "@/gravice/components/company/LatticeAnimation";

const SMALL = "(max-width: 640px)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(SMALL);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/** "The name" lattice: 19 × 7 points on desktop, 9 × 6 on small screens (handoff README). */
export function AboutLattice() {
  const small = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(SMALL).matches,
    () => false,
  );
  return small ? <LatticeAnimation cols={9} rows={6} height={220} /> : <LatticeAnimation />;
}
