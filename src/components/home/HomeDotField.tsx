"use client";

import { useEffect } from "react";
import { useHeroMotion } from "@/components/HeroMotionGate";
import { DotField } from "@/gravice/components/DotField";

/**
 * DotField mounts only when RebrandIntro has called allowHero()
 * (Continue / auto-dismiss after fade, or rebrand skipped).
 * Until then allowed is false — no canvases, no intro clock.
 */
export function HomeDotField() {
  const { allowed } = useHeroMotion();

  useEffect(() => {
    if (!allowed) return;
    window.scrollTo(0, 0);
  }, [allowed]);

  if (!allowed) return null;
  return <DotField followCursor={false} />;
}
