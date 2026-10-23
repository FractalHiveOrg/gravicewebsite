import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { productList } from "@/lib/products";

const homeCopy = {
  elevaterm: {
    audience: "For relationship managers at banks",
    body: "Helps RMs move deals from creation to closure on one platform. Pipeline, client history, and follow-ups in one place.",
  },
  "v-track": {
    audience: "For credit and risk teams at banks and NBFCs",
    body: "Keeps every collateral valuation compliant and audit-ready — with dynamic valuation, LTV, and insurance tracking.",
  },
  nico: {
    audience: "For operations and finance teams",
    body: "Agentic platform for automating document-heavy processes — from ingestion to approval, with every step logged.",
  },
} as const;

export function Products() {
  return (
    <section id="products" className="section-pad bg-paper">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="mb-14 flex max-w-[820px] flex-col gap-4">
          <p className="text-[12px] font-semibold uppercase tracking-[0.96px] text-pull-orange-deep">
            Our offerings
          </p>
          <h2 className="font-serif text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-[1.15] tracking-[-0.01em] text-deep-space">
            Three platforms. One layer of assurance.
          </h2>
          <p className="max-w-[40rem] text-[17px] leading-[1.6] text-slate">
            ElevateRM, V-Track, and NICO sit above the systems you already run —
            LOS, CMS, ERP, and core banking — without rip-and-replace.
          </p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {productList.map((p, i) => {
            const copy = homeCopy[p.slug];
            return (
              <Reveal key={p.slug} delay={i * 90}>
                <article className="motion-card flex h-full min-w-0 flex-col gap-5 rounded-[20px] border border-navy-100 bg-white p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-serif text-[clamp(1.35rem,2.5vw,1.75rem)] font-semibold leading-[1.15] text-deep-space">
                      {p.name}
                    </h3>
                    {p.badge && (
                      <span className="rounded-full border border-pull-orange/50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-pull-orange-deep">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.96px] text-slate">
                    {copy.audience}
                  </p>
                  <p className="flex-1 text-[16px] leading-[1.6] text-slate">
                    {copy.body}
                  </p>
                  <div className="flex flex-wrap items-center gap-5">
                    <Button href={`/demo?product=${p.slug}`} size="sm">
                      Book a demo
                    </Button>
                    <Button
                      href={`/products/${p.slug}`}
                      variant="link-light"
                      size="sm"
                    >
                      Learn more →
                    </Button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
