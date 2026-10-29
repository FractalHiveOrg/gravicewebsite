import Image from "next/image";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { insights } from "@/lib/insights";

export function Insights() {
  return (
    <section
      className="section-pad bg-paper"
      data-gv="news"
      id="news"
      data-cursor-surface="light"
    >
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-[40rem] flex-col gap-4">
            <p className="text-[12px] font-semibold uppercase tracking-[0.96px] text-pull-orange-deep">
              Insights
            </p>
            <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.5rem)] font-normal leading-[1.15] tracking-[-0.01em] text-deep-space">
              Ideas on bringing structure to business operations.
            </h2>
          </div>
          <Button href="/insights" variant="link-light">
            All insights →
          </Button>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {insights.slice(0,3).map((a, i) =>
           (
            <Reveal key={a.url} delay={i * 70}>
              <a
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="motion-card group flex h-full flex-col overflow-hidden rounded-[20px] border border-transparent bg-white hover:border-navy-100"
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
                <div className="flex min-w-0 flex-1 flex-col gap-3 px-5 pb-5 pt-5 sm:px-6 sm:pb-6">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.96px] text-slate">
                    LinkedIn
                  </p>
                  <h3 className="font-serif text-[clamp(1.05rem,2.2vw,1.25rem)] font-normal leading-[1.25] text-balance text-deep-space transition-colors group-hover:text-navy">
                    {a.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-pretty text-slate">
                    {a.blurb}
                  </p>
                  <span className="mt-auto pt-2 text-[14px] font-medium text-pull-orange-deep">
                    Read on LinkedIn →
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
