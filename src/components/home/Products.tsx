import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { PlatformWheel } from "@/components/home/PlatformWheel";

export function Products() {
  return (
    <section id="products" className="section-pad bg-deep-space">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="mx-auto mb-10 flex max-w-[40rem] flex-col gap-4 text-center md:mb-14">
          <p className="text-[12px] font-semibold uppercase tracking-[0.96px] text-pull-orange">
            Our offerings
          </p>
          <h2 className="font-serif text-[clamp(2rem,4vw,2.75rem)] font-normal leading-[1.15] tracking-[-0.01em] text-paper">
            Three platforms. <br />One layer of assurance.
          </h2>
          <p className="text-[17px] leading-[1.6] text-navy-200">
            ElevateRM, V-Track, and NICO sit above the systems you already run —
            LOS, CMS, ERP, and core banking — without rip-and-replace.
          </p>
        </Reveal>

        <Reveal delay={80} className="mb-12 md:mb-16">
          <PlatformWheel />
        </Reveal>

        <Reveal delay={160} className="flex justify-center">
          <Button href="/demo">Book a demo</Button>
        </Reveal>
      </div>
    </section>
  );
}
