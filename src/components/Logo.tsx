import Image from "next/image";
import Link from "next/link";

type Props = {
  theme?: "dark" | "light";
  className?: string;
};

export function Logo({ className = "" }: Props) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center ${className}`}
      aria-label="Gravice home"
    >
      <Image
        src="/brand/logo-horizontal-on-dark.png"
        alt="Gravice"
        width={352}
        height={96}
        className="h-8 w-auto md:h-9"
        priority
        unoptimized
      />
    </Link>
  );
}
