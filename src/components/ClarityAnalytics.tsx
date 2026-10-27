"use client";

import { useEffect } from "react";
import { initClarity, setClarityTag, trackEvent } from "@/lib/clarity";

/**
 * Microsoft Clarity session analytics. No-op until a project ID is set.
 * Any element with `data-clarity-event` fires that event on click; an optional
 * `data-clarity-source` is stored as the `<event>_source` tag.
 */
export function ClarityAnalytics() {
  useEffect(() => {
    initClarity();

    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>(
        "[data-clarity-event]",
      );
      const name = el?.dataset.clarityEvent;
      if (!name) return;
      trackEvent(name);
      if (el.dataset.claritySource) {
        setClarityTag(`${name}_source`, el.dataset.claritySource);
      }
    };

    document.addEventListener("click", onClick, { capture: true });
    return () =>
      document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
