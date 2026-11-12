import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { insights } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights | Gravice",
  description:
    "Ideas on bringing structure to business operations for banks and NBFCs.",
};

export default function InsightsPage() {
  return (
    <section className="bg-paper" data-cursor-surface="light">
      <div className="page-x mx-auto max-w-[1200px] py-16 sm:py-20 lg:py-28">
        <div className="mb-14 flex max-w-[40rem] flex-col gap-4">
          <p className="text-[12px] font-semibold uppercase tracking-[0.96px] text-pull-orange-deep">
            Insights
          </p>
          <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.1] tracking-[-0.01em] text-deep-space">
            Ideas on bringing structure to business operations.
          </h1>
          <p className="text-[17px] leading-relaxed text-slate">
            Articles and notes from the Gravice team on collateral, RM
            productivity, and assurance-first banking.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {insights.map((a) => (
            <a
              key={a.url}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="motion-card group flex h-full flex-col overflow-hidden rounded-[20px] border border-navy-100/60 bg-white hover:border-navy-100"
            >
              <div className="relative h-[180px] overflow-hidden bg-navy-100">
                <Image
                  src={a.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 px-6 pb-6 pt-5">
                <p className="text-[12px] font-semibold uppercase tracking-[0.96px] text-slate">
                  LinkedIn
                </p>
                <h2 className="font-serif text-[20px] font-normal leading-[1.2] text-deep-space transition-colors group-hover:text-navy">
                  {a.title}
                </h2>
                <p className="text-[14px] leading-relaxed text-slate">
                  {a.blurb}
                </p>
                <span className="mt-auto pt-2 text-[14px] font-medium text-pull-orange-deep">
                  Read on LinkedIn →
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-16">
          <Button href="/demo">Book a demo</Button>
        </div>
      </div>
    </section>
  );
}
