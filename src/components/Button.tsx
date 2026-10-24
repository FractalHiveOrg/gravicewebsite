import Link from "next/link";
import type { ReactNode } from "react";

type Variant =
  | "primary"
  | "secondary-dark"
  | "secondary-light"
  | "link-dark"
  | "link-light"
  | "link-orange";

type Size = "sm" | "lg";

const variantClass: Record<Variant, string> = {
  primary:
    "bg-pull-orange text-deep-space hover:bg-[#f88c60] border border-transparent shadow-[0_0_0_0_rgba(246,104,46,0)] hover:shadow-[0_10px_28px_-12px_rgba(246,104,46,0.55)]",
  "secondary-dark":
    "bg-transparent text-paper border-[1.25px] border-paper/60 hover:border-paper hover:bg-paper/5",
  "secondary-light":
    "bg-transparent text-deep-space border-[1.25px] border-navy-100 hover:border-navy",
  "link-dark":
    "motion-link bg-transparent text-pull-orange border-transparent px-0 py-0",
  "link-light":
    "motion-link bg-transparent text-pull-orange-deep border-transparent px-0 py-0",
  "link-orange":
    "motion-link bg-transparent text-pull-orange border-transparent px-0 py-0",
};

const sizeClass: Record<Size, string> = {
  sm: "px-[18px] py-[10px] text-[14px]",
  lg: "px-[28px] py-[16px] text-[16px]",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  target?: string;
  rel?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "lg",
  className = "",
  target,
  rel,
}: Props) {
  const isLink = variant.startsWith("link");
  const hasDisplayOverride =
    /\b(hidden|block|inline|inline-block|flex|inline-flex|grid)\b/.test(
      className,
    );

  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      data-magnetic
      className={[
        "items-center justify-center rounded-full font-semibold transition-[color,background-color,border-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        hasDisplayOverride ? "" : "inline-flex",
        isLink
          ? "rounded-none"
          : `${sizeClass[size]} active:scale-[0.98]`,
        variantClass[variant],
        className,
      ].join(" ")}
    >
      {children}
    </Link>
  );
}
