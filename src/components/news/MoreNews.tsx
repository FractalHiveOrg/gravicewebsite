import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { mediaCoverage, newsArticles } from "@/lib/news";

const MAX_CARDS = 3;

/**
 * "More news" block at the foot of a newsroom article: the other Gravice articles first, then
 * media coverage to fill the row.
 */
export function MoreNews({ currentHref }: { currentHref: string }) {
  const articles = newsArticles.filter((a) => a.href !== currentHref).slice(0, MAX_CARDS);
  const coverage = mediaCoverage.slice(0, MAX_CARDS - articles.length);

  return (
    <section className="section-pad bg-paper" data-cursor-surface="light">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-[40rem] flex-col gap-4">
            <p className="text-[12px] font-semibold uppercase tracking-[0.96px] text-pull-orange-deep">
              More news
            </p>
            <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.5rem)] font-normal leading-[1.15] tracking-[-0.01em] text-deep-space">
              The latest from Gravice.
            </h2>
          </div>
          <Button href="/news" variant="link-light">
            All news →
          </Button>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a, i) => (
            <Reveal key={a.href} delay={i * 70}>
              <Link
                href={a.href}
                className="motion-card group flex h-full flex-col overflow-hidden rounded-[20px] border border-transparent bg-white hover:border-navy-100"
              >
                <div
                  className={`relative h-[180px] overflow-hidden ${
                    a.imageFit === "contain" ? "border-b border-navy-100/60 bg-white" : "bg-navy-100"
                  }`}
                >
                  <Image
                    src={a.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={`transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] ${
                      a.imageFit === "contain" ? "object-contain p-12" : "object-cover"
                    }`}
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-3 px-5 pb-5 pt-5 sm:px-6 sm:pb-6">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.96px] text-slate">{a.kind}</p>
                  <h3 className="font-serif text-[clamp(1.05rem,2.2vw,1.25rem)] font-normal leading-[1.25] text-balance text-deep-space transition-colors group-hover:text-navy">
                    {a.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-pretty text-slate">{a.blurb}</p>
                  <span className="mt-auto pt-2 text-[14px] font-medium text-pull-orange-deep">Read more →</span>
                </div>
              </Link>
            </Reveal>
          ))}

          {coverage.map((item, i) => (
            <Reveal key={item.url} delay={(articles.length + i) * 70}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="motion-card group flex h-full flex-col gap-3 rounded-[20px] border border-transparent bg-white px-5 pb-5 pt-5 hover:border-navy-100 sm:px-6 sm:pb-6"
              >
                <p className="text-[12px] font-semibold uppercase tracking-[0.96px] text-slate">
                  In the media · {item.publication}
                </p>
                <h3 className="font-serif text-[clamp(1.05rem,2.2vw,1.25rem)] font-normal leading-[1.25] text-balance text-deep-space transition-colors group-hover:text-navy">
                  {item.title}
                </h3>
                <span className="mt-auto pt-2 text-[14px] font-medium text-pull-orange-deep">
                  Read on {item.publication} ↗
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
