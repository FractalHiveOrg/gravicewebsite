"use client";

import { useEffect } from "react";

/**
 * Any link whose href starts with `https:` opens in a new tab. Set at click
 * time (capture phase, before the browser follows the link) so it covers every
 * anchor on the site, including ones rendered from content data.
 */
export function ExternalLinks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest<HTMLAnchorElement>(
        'a[href^="https:"]',
      );
      if (!a) return;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    };

    document.addEventListener("click", onClick, { capture: true });
    return () =>
      document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
