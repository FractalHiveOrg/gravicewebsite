import Link from "next/link";
import { Button } from "@/components/Button";
import { NicoMark } from "@/components/NicoMark";
import { ProductOrbVisual } from "@/components/ProductOrbVisual";
import { Reveal } from "@/components/Reveal";
import type { Product } from "@/lib/products";
import { productList } from "@/lib/products";

const accentBar: Record<Product["accent"], string> = {
  purple: "bg-lattice-purple",
  navy: "bg-navy",
  orange: "bg-pull-orange",
};

const accentText: Record<Product["accent"], string> = {
  purple: "text-purple-300",
  navy: "text-navy-200",
  orange: "text-pull-orange",
};

type Props = { product: Product };

export function ProductPage({ product }: Props) {
  const others = productList.filter((p) => p.slug !== product.slug);

  return (
    <>
      <section className="bg-deep-space">
        <div className="page-x mx-auto flex max-w-[1100px] flex-col items-center gap-10 py-14 sm:py-16 lg:flex-row lg:items-center lg:gap-12 lg:py-24">
          <Reveal className="flex w-full max-w-[46rem] flex-1 flex-col gap-5">
            <div className="flex flex-wrap items-center gap-3">
              <p
                className={`text-[12px] font-semibold uppercase tracking-[0.96px] ${accentText[product.accent]}`}
              >
                {product.tagline}
              </p>
              {product.badge && (
                <span className="rounded-full border border-pull-orange/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-pull-orange">
                  {product.badge}
                </span>
              )}
            </div>
            <h1 className="font-serif text-[clamp(2.5rem,5vw,3.75rem)] font-normal leading-[1.08] tracking-[-0.02em] text-paper">
              {product.headline}
            </h1>
            <p className="text-[18px] leading-[1.6] text-navy-200">
              {product.summary}
            </p>
            <p className="text-[14px] font-medium text-navy-200">
              {product.audience}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              {product.slug === "nico" ? (
                <Button
                  href="/nico2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2.5"
                >
                  Explore <NicoMark on="dark" height={18} />
                </Button>
              ) : (
                <Button href={`/demo?product=${product.slug}`}>
                  Book a demo
                </Button>
              )}
              <Button href="/#products" variant="secondary-dark">
                All products
              </Button>
            </div>
          </Reveal>
          <Reveal delay={100} className="shrink-0">
            <ProductOrbVisual slug={product.slug} size={360} />
          </Reveal>
        </div>
      </section>

      <section className="section-pad bg-paper">
        <div className="mx-auto grid max-w-[1100px] gap-6 md:grid-cols-2">
          <Reveal>
            <article className="h-full rounded-[20px] border border-navy-100 bg-white p-8 md:p-10">
              <p className="text-[12px] font-semibold uppercase tracking-[0.96px] text-pull-orange-deep">
                Where it breaks
              </p>
              <p className="mt-4 text-[17px] leading-[1.6] text-slate">
                {product.problem}
              </p>
            </article>
          </Reveal>
          <Reveal delay={80}>
            <article className="h-full rounded-[20px] bg-deep-space p-8 md:p-10">
              <p className="text-[12px] font-semibold uppercase tracking-[0.96px] text-pull-orange">
                What changes
              </p>
              <p className="mt-4 text-[17px] leading-[1.6] text-navy-200">
                {product.outcome}
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="mx-auto max-w-[1100px]">
          <Reveal className="mb-10 max-w-[36rem]">
            <h2 className="font-serif text-[clamp(1.75rem,3vw,2.25rem)] font-normal text-deep-space">
              How {product.name} works
            </h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {product.steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 60}>
                <article className="motion-card h-full rounded-[20px] border border-navy-100 bg-paper p-6">
                  <div
                    className={`mb-4 h-1 w-10 rounded-full ${accentBar[product.accent]}`}
                  />
                  <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-slate">
                    Step {i + 1}
                  </p>
                  <h3 className="mt-2 font-serif text-xl font-normal text-deep-space">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-[1.55] text-slate">
                    {step.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-paper">
        <div className="mx-auto max-w-[1100px]">
          <Reveal className="mb-10">
            <h2 className="font-serif text-[clamp(1.75rem,3vw,2.25rem)] font-normal text-deep-space">
              Built in
            </h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {product.features.map((f, i) => (
              <Reveal key={f.title} delay={i * 50}>
                <article className="rounded-[20px] border border-navy-100 bg-white p-7">
                  <h3 className="font-serif text-xl font-normal text-deep-space">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-[1.6] text-slate">
                    {f.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {product.comparison && (
        <section className="section-pad bg-white">
          <div className="mx-auto grid max-w-[1100px] gap-6 lg:grid-cols-2">
            <Reveal>
              <article className="h-full rounded-[20px] border border-navy-100 bg-paper p-8">
                <h2 className="font-serif text-2xl font-normal text-deep-space">
                  Today
                </h2>
                <ul className="mt-6 flex flex-col gap-4">
                  {product.comparison.today.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-[15px] leading-[1.55] text-slate"
                    >
                      <span
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-slate"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
            <Reveal delay={80}>
              <article className="h-full rounded-[20px] bg-deep-space p-8">
                <h2 className="font-serif text-2xl font-normal text-paper">
                  With {product.name}
                </h2>
                <ul className="mt-6 flex flex-col gap-4">
                  {product.comparison.withProduct.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-[15px] leading-[1.55] text-navy-200"
                    >
                      <span
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-pull-orange"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </div>
        </section>
      )}

      {product.useCases && (
        <section className="section-pad bg-white">
          <div className="mx-auto max-w-[1100px]">
            <Reveal className="mb-4">
              <p className="text-[12px] font-semibold uppercase tracking-[0.96px] text-pull-orange-deep">
                Use cases for banks &amp; NBFCs
              </p>
            </Reveal>
            <Reveal className="mb-10 max-w-[36rem]">
              <h2 className="font-serif text-[clamp(1.75rem,3vw,2.25rem)] font-normal text-deep-space">
                One engine. Any process.
              </h2>
            </Reveal>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {product.useCases.map((uc, i) => (
                <Reveal key={uc.title} delay={i * 50}>
                  <article className="motion-card h-full rounded-[20px] border border-navy-100 bg-paper p-6">
                    <h3 className="font-serif text-lg font-normal text-deep-space">
                      {uc.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-[1.55] text-slate">
                      {uc.body}
                    </p>
                  </article>
                </Reveal>
              ))}
              <Reveal delay={(product.useCases.length || 0) * 50}>
                <article className="motion-card flex h-full flex-col justify-between rounded-[20px] bg-deep-space p-6">
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.96px] text-pull-orange">
                      Your process
                    </p>
                    <p className="mt-3 text-[15px] leading-[1.55] text-navy-200">
                      Show us your manual workflow. We will show you how NICO
                      automates it.
                    </p>
                  </div>
                  <Button href="/demo?product=nico" size="sm" className="mt-6 w-fit">
                    Book a demo
                  </Button>
                </article>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {product.offerings && (
        <section className="section-pad bg-paper">
          <div className="mx-auto grid max-w-[1100px] gap-5 md:grid-cols-2">
            {product.offerings.map((o, i) => (
              <Reveal key={o.title} delay={i * 60}>
                <article className="rounded-[20px] bg-deep-space p-8">
                  <h3 className="font-serif text-2xl font-normal text-paper">
                    {o.title}
                  </h3>
                  <p className="mt-3 text-[16px] leading-[1.6] text-navy-200">
                    {o.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {product.microsoftPartnership && (
        <section className="section-pad bg-paper">
          <div className="mx-auto max-w-[1100px]">
            <Reveal className="mb-10 max-w-[42rem]">
              <p className="text-[12px] font-semibold uppercase tracking-[0.96px] text-pull-orange-deep">
                Our partnership
              </p>
              <h2 className="mt-4 font-serif text-[clamp(1.75rem,3.5vw,2.5rem)] font-normal leading-[1.15] text-deep-space">
                {product.microsoftPartnership.headline}
              </h2>
              <p className="mt-4 text-[17px] leading-[1.6] text-slate">
                {product.microsoftPartnership.summary}
              </p>
            </Reveal>

            <Reveal delay={60}>
              <div className="flex flex-col gap-6 rounded-[20px] bg-deep-space p-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
                <div className="flex flex-col gap-4">
                  <h3 className="font-serif text-[clamp(1.5rem,2.5vw,1.85rem)] font-normal text-paper">
                    Official Microsoft Partner
                  </h3>
                  <p className="text-[15px] text-navy-200">
                    Microsoft AI Cloud Partner Program · ISV Success
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    <span className="rounded-full border border-paper/25 px-3.5 py-1.5 text-[12px] font-medium text-paper">
                      Listed on Microsoft Marketplace
                    </span>
                    <span className="rounded-full border border-paper/25 px-3.5 py-1.5 text-[12px] font-medium text-paper">
                      Built on Microsoft Azure
                    </span>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-3 rounded-xl bg-white px-5 py-4 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.45)]">
                  <span className="grid grid-cols-2 gap-0.5" aria-hidden>
                    <span className="size-3.5 bg-[#F25022]" />
                    <span className="size-3.5 bg-[#7FBA00]" />
                    <span className="size-3.5 bg-[#00A4EF]" />
                    <span className="size-3.5 bg-[#FFB900]" />
                  </span>
                  <p className="text-[14px] font-semibold leading-snug text-deep-space">
                    Available on
                    <br />
                    Microsoft Marketplace
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100} className="mt-10">
              <h3 className="mb-6 font-serif text-[clamp(1.35rem,2.5vw,1.65rem)] font-normal text-deep-space">
                Why buying through Microsoft Marketplace helps
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: "Buy through a channel you already use",
                    body: "Find and procure V-Track from the marketplace your IT and procurement teams already work with.",
                  },
                  {
                    title: "One Microsoft invoice",
                    body: "Marketplace purchases are billed alongside your existing Microsoft charges, with no new vendor billing to set up.",
                  },
                  {
                    title: "Use your Azure commitment",
                    body: "Eligible purchases can count toward your Microsoft Azure Consumption Commitment (MACC).",
                  },
                  {
                    title: "Faster procurement",
                    body: "Your existing Microsoft agreement shortens vendor onboarding, security reviews, and contracting.",
                  },
                ].map((item, i) => (
                  <article
                    key={item.title}
                    className="motion-card rounded-[20px] border border-navy-100 bg-white p-6"
                    style={{ transitionDelay: `${i * 40}ms` }}
                  >
                    <div className="mb-4 h-1 w-10 rounded-full bg-navy" />
                    <h4 className="font-serif text-lg font-normal text-deep-space">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-[15px] leading-[1.55] text-slate">
                      {item.body}
                    </p>
                  </article>
                ))}
              </div>
            </Reveal>

            <Reveal delay={140} className="mt-10">
              <div className="flex flex-col items-start justify-between gap-5 rounded-[20px] bg-deep-space px-7 py-8 sm:flex-row sm:items-center sm:px-9">
                <h3 className="font-serif text-[clamp(1.35rem,2.5vw,1.75rem)] font-normal text-paper">
                  Find {product.name} on Microsoft Marketplace.
                </h3>
                <Button
                  href={product.microsoftPartnership.marketplaceUrl}
                  className="shrink-0"
                >
                  View on the Marketplace →
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="section-pad bg-deep-space">
        <div className="mx-auto max-w-[1100px]">
          <Reveal className="mb-10">
            <h2 className="font-serif text-[clamp(1.75rem,3vw,2.25rem)] font-normal text-paper">
              Across the credit journey
            </h2>
          </Reveal>
          <div className="grid gap-3">
            {product.coverage.map((row, i) => (
              <Reveal key={row.stage} delay={i * 40}>
                <div className="grid gap-2 rounded-2xl border border-paper/10 bg-navy/40 px-5 py-4 lg:grid-cols-[minmax(0,240px)_1fr] lg:items-center">
                  <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-pull-orange">
                    {row.stage}
                  </p>
                  <p className="text-[15px] text-navy-200">{row.capability}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-paper">
        <Reveal className="mx-auto flex max-w-[800px] flex-col items-center gap-5 text-center">
          <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.5rem)] font-normal text-deep-space">
            {product.footerLine}
          </h2>
          <p className="text-[16px] text-slate">{product.footerNote}</p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button href={`/demo?product=${product.slug}`}>Book a demo</Button>
            <Button href="/#products" variant="link-light">
              Explore other products →
            </Button>
          </div>
        </Reveal>
      </section>

      <section className="page-x border-t border-navy-100 bg-white py-14">
        <div className="mx-auto max-w-[1100px]">
          <p className="mb-6 text-[12px] font-semibold uppercase tracking-[0.96px] text-slate">
            Also from Gravice
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {others.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                data-magnetic
                className="motion-card rounded-[20px] border border-navy-100 p-6 transition-colors hover:border-pull-orange/40"
              >
                <p className="font-serif text-xl font-normal text-deep-space">
                  {p.name}
                </p>
                <p className="mt-2 text-[14px] text-slate">{p.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
