import Link from "next/link";
import { Button } from "@/components/Button";

type Props = {
  title: string;
  description: string;
  cta?: { label: string; href: string };
  showProductsLink?: boolean;
};

export function StubPage({
  title,
  description,
  cta = { label: "Book a demo", href: "/demo" },
  showProductsLink = true,
}: Props) {
  return (
    <section className="bg-deep-space" data-cursor-surface="dark">
      <div className="page-x mx-auto flex max-w-[800px] flex-col gap-6 py-20 sm:py-24 lg:py-32">
        <p className="text-[12px] font-semibold uppercase tracking-[0.96px] text-pull-orange">
          Coming soon
        </p>
        <h1 className="font-serif text-[clamp(2.5rem,5vw,3.5rem)] font-normal leading-[1.1] text-paper">
          {title}
        </h1>
        <p className="text-[18px] leading-[1.6] text-navy-200">{description}</p>
        <div className="flex flex-wrap gap-4 pt-2">
          <Button href={cta.href}>{cta.label}</Button>
          <Button href="/" variant="secondary-dark">
            Back to home
          </Button>
        </div>
        {showProductsLink && (
          <p className="pt-8 text-sm text-navy-200">
            Or jump to{" "}
            <Link href="/#products" className="text-pull-orange hover:underline">
              products
            </Link>
            .
          </p>
        )}
      </div>
    </section>
  );
}
