import type { Metadata } from "next";
import { CalBooker } from "@/components/CalBooker";
import { getCalEventSlug } from "@/lib/cal";

export const metadata: Metadata = {
  title: "Book a demo",
  description:
    "Book a 30-minute Gravice demo. Tell us which product you are interested in.",
};

type DemoPageProps = {
  searchParams: Promise<{ product?: string }>;
};

export default async function DemoPage({ searchParams }: DemoPageProps) {
  const { product } = await searchParams;
  const eventSlug = getCalEventSlug(product);

  return (
    <section className="bg-paper" data-cursor-surface="light">
      <div className="page-x mx-auto flex max-w-[1100px] flex-col gap-10 py-14 sm:gap-12 sm:py-16 lg:py-24">
        <div className="mx-auto flex max-w-[640px] flex-col items-center gap-5 text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.96px] text-pull-orange-deep">
            Book a demo
          </p>
          <h1 className="font-serif text-[clamp(2.25rem,4vw,3rem)] font-normal leading-[1.15] text-deep-space">
            See what Gravice can do for you.
          </h1>
          <p className="text-[17px] leading-[1.6] text-slate">
            Pick a time for a 30-minute conversation. We will walk through the
            product that fits your team.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[15px] text-slate">
            <li className="flex items-center gap-2">
              <span className="size-1.5 shrink-0 rounded-full bg-pull-orange" />
              ElevateRM
            </li>
            <li className="flex items-center gap-2">
              <span className="size-1.5 shrink-0 rounded-full bg-pull-orange" />
              V-Track
            </li>
            <li className="flex items-center gap-2">
              <span className="size-1.5 shrink-0 rounded-full bg-pull-orange" />
              NICO
            </li>
          </ul>
        </div>

        <CalBooker eventSlug={eventSlug} />
      </div>
    </section>
  );
}
