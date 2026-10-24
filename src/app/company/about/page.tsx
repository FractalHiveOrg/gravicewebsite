import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Gravice builds assurance-first platforms for banks and NBFCs — bringing structure to high-stakes work without disrupting core systems.",
};

const missionPoints = [
  "Intelligent systems that stay simple to run",
  "Less operational complexity, more dependable control",
  "Technology that supports people, not the other way around",
];

const visionPoints = [
  "Modern AI that institutions can adopt with confidence",
  "Trust and accountability built into every workflow",
  "Teams empowered — not replaced — by automation",
];

const values = [
  {
    title: "Be 10× better",
    body: "We aim for transformative impact, not incremental change. Gravice platforms rework how high-stakes processes run — so teams move faster with less risk.",
  },
  {
    title: "Simplicity over extravagance",
    body: "Clarity beats clutter. Every feature and interface is filtered for what institutions actually need — capability without unnecessary complexity.",
  },
  {
    title: "Honesty over short-term gain",
    body: "Trust, transparency, and ethics come first. Long relationships with the institutions we serve matter more than quick wins.",
  },
  {
    title: "Innovation through collaboration",
    body: "The best outcomes come from diverse perspectives. We combine domain expertise with modern technology to build systems operators can rely on.",
  },
];

const culture = [
  {
    title: "Work · Play · Learn",
    body: "Serious work for serious institutions — with room for curiosity, creative exploration, and continuous learning.",
  },
  {
    title: "Diversity · Equality · Inclusion",
    body: "An inclusive workplace where different perspectives strengthen the products we ship and the teams that build them.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-deep-space">
        <div className="page-x mx-auto max-w-[1100px] py-14 sm:py-16 lg:py-24">
          <Reveal className="flex max-w-[46rem] flex-col gap-5">
            <p className="text-[12px] font-semibold uppercase tracking-[0.96px] text-pull-orange">
              About Gravice
            </p>
            <h1 className="font-serif text-[clamp(2.5rem,5vw,3.75rem)] font-normal leading-[1.08] tracking-[-0.02em] text-paper">
              Intelligence, at the centre.
            </h1>
            <p className="text-[18px] leading-[1.6] text-navy-200">
              One intelligent platform sits at the centre of Gravice Solutions. It reads, checks and organises the slow, manual work, so banks and growing businesses move faster with less risk.
            </p>
            <p className="text-[18px] leading-[1.6] text-navy-200">
              Today we sit above the systems institutions already run — LOS,
              CMS, ERP, and core banking — with ElevateRM, V-Track, and NICO.
              Formerly FractalHive Solutions Private Limited.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button href="/demo">Book a demo</Button>
              <Button href="/#products" variant="secondary-dark">
                Our products
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad bg-paper">
        <div className="mx-auto max-w-[1100px]">
          <Reveal className="mb-10 max-w-[36rem]">
            <p className="text-[12px] font-semibold uppercase tracking-[0.96px] text-pull-orange-deep">
              Mission &amp; vision
            </p>
            <h2 className="mt-4 font-serif text-[clamp(1.75rem,3vw,2.25rem)] font-normal text-deep-space">
              The principles that shape what we build.
            </h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <article className="flex h-full flex-col gap-5 rounded-[20px] border border-navy-100 bg-white p-8 md:p-10">
                <p className="text-[12px] font-semibold uppercase tracking-[0.96px] text-pull-orange-deep">
                  Mission
                </p>
                <p className="text-[17px] leading-[1.6] text-slate">
                  We build intelligent yet simple tools for modern businesses —
                  reducing operational complexity while making systems more
                  capable, human-centred, and dependable.
                </p>
                <ul className="mt-auto flex flex-col gap-3">
                  {missionPoints.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-[15px] leading-[1.55] text-slate"
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
            <Reveal delay={80}>
              <article className="flex h-full flex-col gap-5 rounded-[20px] bg-deep-space p-8 md:p-10">
                <p className="text-[12px] font-semibold uppercase tracking-[0.96px] text-pull-orange">
                  Vision
                </p>
                <p className="text-[17px] leading-[1.6] text-navy-200">
                  A world where every organisation can use modern AI
                  affordably, responsibly, and with trust — empowering people,
                  not replacing them.
                </p>
                <ul className="mt-auto flex flex-col gap-3">
                  {visionPoints.map((item) => (
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
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="mx-auto max-w-[1100px]">
          <Reveal className="mb-10 max-w-[36rem]">
            <p className="text-[12px] font-semibold uppercase tracking-[0.96px] text-pull-orange-deep">
              Core values
            </p>
            <h2 className="mt-4 font-serif text-[clamp(1.75rem,3vw,2.25rem)] font-normal text-deep-space">
              What drives how we work.
            </h2>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 60}>
                <article className="motion-card h-full rounded-[20px] border border-navy-100 bg-paper p-7 sm:p-8">
                  <div className="mb-4 h-1 w-10 rounded-full bg-pull-orange" />
                  <h3 className="font-serif text-xl font-normal text-deep-space">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.6] text-slate">
                    {value.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-paper">
        <div className="mx-auto max-w-[1100px]">
          <Reveal className="mb-10 max-w-[36rem]">
            <p className="text-[12px] font-semibold uppercase tracking-[0.96px] text-pull-orange-deep">
              Our culture
            </p>
            <h2 className="mt-4 font-serif text-[clamp(1.75rem,3vw,2.25rem)] font-normal text-deep-space">
              How we show up for the work — and each other.
            </h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            {culture.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <article className="rounded-[20px] border border-navy-100 bg-white p-8">
                  <h3 className="font-serif text-xl font-normal text-deep-space">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[16px] leading-[1.6] text-slate">
                    {item.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-deep-space">
        <Reveal className="mx-auto flex max-w-[720px] flex-col items-center gap-6 text-center">
          <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.5rem)] font-normal leading-[1.15] text-paper">
            Ready to bring more structure to your operations?
          </h2>
          <p className="text-[17px] leading-[1.6] text-navy-200">
            Book a 30-minute conversation. Tell us which product you are
            interested in and we will route you to the right team.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-1">
            <Button href="/demo">Book a demo</Button>
            <Button href="/#products" variant="secondary-dark">
              Explore products
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
