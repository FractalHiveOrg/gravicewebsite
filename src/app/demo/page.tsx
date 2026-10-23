import type { Metadata } from "next";
import { DemoForm } from "@/components/DemoForm";

export const metadata: Metadata = {
  title: "Book a demo",
  description:
    "Book a 30-minute Gravice demo. Tell us which product you are interested in.",
};

export default function DemoPage() {
  return (
    <section className="bg-paper">
      <div className="page-x mx-auto grid max-w-[1100px] gap-10 py-14 sm:gap-12 sm:py-16 lg:grid-cols-2 lg:py-24">
        <div className="flex min-w-0 flex-col gap-5">
          <p className="text-[12px] font-semibold uppercase tracking-[0.96px] text-pull-orange-deep">
            Book a demo
          </p>
          <h1 className="font-serif text-[clamp(2.25rem,4vw,3rem)] font-semibold leading-[1.15] text-deep-space">
            See what Gravice can do for you.
          </h1>
          <p className="text-[17px] leading-[1.6] text-slate">
            Tell us which product you are interested in and we will route you to
            the right team for a 30-minute conversation.
          </p>
          <ul className="flex flex-col gap-3 text-[15px] text-slate">
            <li className="flex gap-3">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-pull-orange" />
              ElevateRM for relationship managers
            </li>
            <li className="flex gap-3">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-pull-orange" />
              V-Track for credit and risk teams
            </li>
            <li className="flex gap-3">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-pull-orange" />
              NICO for operations and finance
            </li>
          </ul>
        </div>
        <DemoForm />
      </div>
    </section>
  );
}
