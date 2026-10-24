import { Button } from "@/components/Button";
import { GravityMirror } from "@/components/GravityMirror";
import { Reveal } from "@/components/Reveal";

export function ClosingCta() {
  return (
    <section className="section-pad bg-deep-space">
      <Reveal className="mx-auto flex max-w-[720px] flex-col items-center gap-7 text-center">
        <GravityMirror size={72} interactive={false} nodeColor="#8B99AC" />
        <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.15] tracking-[-0.01em] text-paper">
          See what Gravice can do for you.
        </h2>
        <p className="text-[18px] leading-[1.6] text-navy-200">
          Book a 30-minute demo. Tell us which product you are interested in and
          we will route you to the right team.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button href="/demo">Book a demo</Button>
          <Button href="#products" variant="secondary-dark">
            Explore products
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
