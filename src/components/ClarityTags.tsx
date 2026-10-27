"use client";

import { useEffect } from "react";
import { setClarityTag, upgradeSession } from "@/lib/clarity";

type Props = {
  tags: Record<string, string>;
  /** When set, prioritise recording this session with the given reason. */
  upgrade?: string;
};

/** Tags the current Clarity session from a server-rendered page. */
export function ClarityTags({ tags, upgrade }: Props) {
  const key = JSON.stringify(tags);

  useEffect(() => {
    for (const [k, v] of Object.entries(JSON.parse(key))) {
      setClarityTag(k, v as string);
    }
    if (upgrade) upgradeSession(upgrade);
  }, [key, upgrade]);

  return null;
}
