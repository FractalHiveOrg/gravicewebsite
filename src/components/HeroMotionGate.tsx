"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type HeroMotionValue = {
  /** True only after rebrand is done (or skipped). DotField must wait for this. */
  allowed: boolean;
  allowHero: () => void;
};

const HeroMotionContext = createContext<HeroMotionValue | null>(null);

/**
 * Defaults to blocked. Only RebrandIntro (or a skip path) may call allowHero().
 * Avoids module-level flags that can race with effect order / HMR.
 */
export function HeroMotionProvider({ children }: { children: ReactNode }) {
  const [allowed, setAllowed] = useState(false);
  const allowHero = useCallback(() => setAllowed(true), []);
  const value = useMemo(
    () => ({ allowed, allowHero }),
    [allowed, allowHero],
  );
  return (
    <HeroMotionContext.Provider value={value}>
      {children}
    </HeroMotionContext.Provider>
  );
}

export function useHeroMotion() {
  const ctx = useContext(HeroMotionContext);
  if (!ctx) {
    throw new Error("useHeroMotion must be used within HeroMotionProvider");
  }
  return ctx;
}
