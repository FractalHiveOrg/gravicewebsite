import { ClosingCta } from "@/components/home/ClosingCta";
import { ExploreByRole } from "@/components/home/ExploreByRole";
import { Hero } from "@/components/home/Hero";
import { Insights } from "@/components/home/Insights";
import { Products } from "@/components/home/Products";
import { WhyGravice } from "@/components/home/WhyGravice";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Products />
      <ExploreByRole />
      <WhyGravice />
      <Insights />
      <ClosingCta />
    </>
  );
}
