import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import {
  VTRACK_MARKETPLACE_PATH,
  VTrackMarketplaceArt,
} from "@/components/company/VTrackMarketplaceArticlePage";
import { MediaCarousel } from "@/components/news/MediaCarousel";
import { mediaCoverage } from "@/lib/news";

export const metadata: Metadata = {
  title: "Newsroom | Gravice",
  description:
    "Press releases and company announcements from Gravice.",
};

export default function NewsPage() {
  return (
    <section className="bg-paper" data-cursor-surface="light">
      <div className="page-x mx-auto max-w-[1200px] py-16 sm:py-20 lg:py-28">
        <div className="mb-14 flex max-w-[40rem] flex-col gap-4">
          <p className="text-[12px] font-semibold uppercase tracking-[0.96px] text-pull-orange-deep">
            Newsroom
          </p>
          <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.1] tracking-[-0.01em] text-deep-space">
            The latest from Gravice.
          </h1>
          <p className="text-[17px] leading-relaxed text-slate">
            Press releases, product announcements and company news.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <Link
            href={VTRACK_MARKETPLACE_PATH}
            className="motion-card group grid overflow-hidden rounded-[22px] border border-navy-100/60 bg-white hover:border-navy-100 lg:grid-cols-[1.2fr_1fr]"
          >
            <div className="relative overflow-hidden border-b border-navy-100/60 lg:border-r lg:border-b-0">
              <VTrackMarketplaceArt className="h-full min-h-[240px] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] lg:min-h-[320px]" />
            </div>
            <div className="flex flex-col justify-center gap-3.5 px-6 py-8 sm:px-9 sm:py-9">
              <p className="text-[12px] font-semibold uppercase tracking-[0.96px] text-slate">
                Press release · Featured
              </p>
              <h2 className="font-serif text-[clamp(1.75rem,2.8vw,2.375rem)] font-normal leading-[1.12] text-deep-space transition-colors group-hover:text-navy">
                V-Track is now available on Microsoft Marketplace.
              </h2>
              <p className="text-[16px] leading-relaxed text-slate">
                Banks and NBFCs can now discover and deploy V-Track, our
                collateral valuation governance platform, through Microsoft
                Marketplace.
              </p>
              <span className="pt-1 text-[14px] font-medium text-pull-orange-deep">
                Read the press release →
              </span>
            </div>
          </Link>

          <Link
            href="/news/fractalhive-is-now-gravice"
            className="motion-card group grid overflow-hidden rounded-[22px] border border-navy-100/60 bg-white hover:border-navy-100 lg:grid-cols-[1.2fr_1fr]"
          >
            <div className="relative aspect-video overflow-hidden bg-navy lg:aspect-auto lg:min-h-[320px]">
              <Image
                src="/fractalhive-to-gravice-rebrand_1.png"
                alt="FractalHive is now Gravice"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 660px"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-col justify-center gap-3.5 px-6 py-8 sm:px-9 sm:py-9">
              <p className="text-[12px] font-semibold uppercase tracking-[0.96px] text-slate">
                Company news
              </p>
              <h2 className="font-serif text-[clamp(1.75rem,2.8vw,2.375rem)] font-normal leading-[1.12] text-deep-space transition-colors group-hover:text-navy">
                FractalHive is now Gravice.
              </h2>
              <p className="text-[16px] leading-relaxed text-slate">
                A new name for a clear purpose: intelligence at the centre of
                banking and business operations. Here&apos;s what changes, and
                what doesn&apos;t.
              </p>
              <span className="pt-1 text-[14px] font-medium text-pull-orange-deep">
                Read the announcement →
              </span>
            </div>
          </Link>
        </div>

        <div className="mt-20 flex flex-col gap-8">
          <div className="flex max-w-[40rem] flex-col gap-3">
            <p className="text-[12px] font-semibold uppercase tracking-[0.96px] text-pull-orange-deep">
              In the media
            </p>
            <h2 className="font-serif text-[clamp(1.5rem,2.6vw,2rem)] font-normal leading-[1.15] text-deep-space">
              Gravice in the news.
            </h2>
          </div>

          <MediaCarousel items={mediaCoverage} />
        </div>

        <div className="mt-16">
          <Button href="/demo">Book a demo</Button>
        </div>
      </div>
    </section>
  );
}
