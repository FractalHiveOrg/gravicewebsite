"use client";

import { useState } from "react";

/** "Copy link" pill for the article share row; copies the current page URL. */
export function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (insecure context or denied permission): leave the label as is.
    }
  };

  return (
    <button type="button" onClick={copy}>
      {copied ? "Link copied" : "Copy link"}
    </button>
  );
}
