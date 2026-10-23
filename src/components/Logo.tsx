import Image from "next/image";
import Link from "next/link";

type Props = {
  theme?: "dark" | "light";
  className?: string;
};

export function Logo({ theme = "dark", className = "" }: Props) {
  const word = theme === "dark" ? "text-paper" : "text-deep-space";

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 ${className}`}
      aria-label="Gravice home"
    >
      <Image
        src="/brand/header-symbol.svg"
        alt=""
        width={34}
        height={34}
        className="size-[34px]"
        priority
        unoptimized
      />
      <span className="relative inline-block h-[26px] w-[86px]">
        <span
          className={`font-serif text-[26px] font-semibold leading-none tracking-[-0.39px] ${word}`}
        >
          Gravice
        </span>
        <Image
          src="/brand/i-dot.svg"
          alt=""
          width={4}
          height={4}
          className="absolute left-[55px] top-[4.5px] size-[3.16px]"
          unoptimized
        />
      </span>
    </Link>
  );
}
