"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

type Child = { label: string; href: string };

type Props = {
  label: string;
  href: string;
  items: Child[];
};

export function NavDropdown({ label, href, items }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function clearClose() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function scheduleClose() {
    clearClose();
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }

  function openMenu() {
    clearClose();
    setOpen(true);
  }

  useEffect(() => {
    function onDocPointer(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onDocPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDocPointer);
      document.removeEventListener("keydown", onKey);
      clearClose();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative"
      onPointerEnter={openMenu}
      onPointerLeave={scheduleClose}
    >
      <Link
        href={href}
        className="inline-flex items-center gap-1 transition-colors hover:text-pull-orange"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onFocus={openMenu}
        onClick={() => setOpen(false)}
      >
        {label}
        <span
          className={[
            "inline-block text-[10px] opacity-60 transition-transform duration-200",
            open ? "rotate-180" : "",
          ].join(" ")}
          aria-hidden
        >
          ▾
        </span>
      </Link>

      <div
        id={menuId}
        role="menu"
        className={[
          "absolute left-0 top-full z-50 pt-3 transition-[opacity,transform,visibility] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0 pointer-events-none",
        ].join(" ")}
        onPointerEnter={openMenu}
        onPointerLeave={scheduleClose}
      >
        <div className="min-w-[200px] rounded-xl border border-paper/10 bg-navy p-2 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.55)]">
          {items.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              role="menuitem"
              className="block rounded-lg px-3 py-2 text-sm text-paper transition-colors hover:bg-paper/10 hover:text-pull-orange"
              onClick={() => setOpen(false)}
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
