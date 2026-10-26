import Image from "next/image";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";

const pillars = [
  {
    title: "Structure by design",
    body: "We turn slow, manual processes into clear, trackable workflows that your teams and auditors can rely on.",
  },
  {
    title: "Execution you can count on",
    body: "We commit to what we can deliver, then deliver it, and stay with you long after go-live.",
  },
  {
    title: "Fair partnership",
    body: "Every deal has to work for both sides. That is how we build long relationships with the institutions we serve.",
  },
];

export function WhyGravice() {
  return (
    <section id="why" className="section-pad bg-white" data-cursor-surface="light">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-[40rem] flex-col gap-4">
            <p className="text-[12px] font-semibold uppercase tracking-[0.96px] text-pull-orange-deep">
              Why Gravice
            </p>
            <h2 className="font-serif text-[clamp(2rem,4vw,2.75rem)] font-normal leading-[1.15] tracking-[-0.01em] text-deep-space">
              A partner that brings order, and keeps its word.
            </h2>
          </div>
          <Button href="/trust" variant="link-light">
            Visit the Trust Center →
          </Button>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <article className="motion-card flex h-full min-w-0 flex-col gap-4 rounded-[20px] border border-transparent bg-paper p-6 sm:p-8 hover:border-navy-100">
                <Image
                  src="/brand/symbol-small.svg"
                  alt=""
                  width={40}
                  height={40}
                  className="size-10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  unoptimized
                />
                <h3 className="font-serif text-[clamp(1.25rem,2.5vw,1.5rem)] font-normal leading-[1.15] text-deep-space">
                  {p.title}
                </h3>
                <p className="text-[16px] leading-[1.6] text-slate">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
