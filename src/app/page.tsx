import { HomeDotField } from "@/components/home/HomeDotField";
import { Insights } from "@/components/home/Insights";
import { Products } from "@/components/home/Products";
import { WhyGravice } from "@/components/home/WhyGravice";
import { MicrosoftPartnership } from "@/components/microsoftPartnership";
import { ClosingCTA } from "@/gravice/sections/ClosingCTA";
import { Hero } from "@/gravice/sections/Hero";
import { ProductStory } from "@/gravice/sections/ProductStory";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductStory />
      {/* Own sections: keep above the dot layer so scroll dots stay behind */}
      <div className="relative z-[2]">
        <Products />
        <WhyGravice />
        <Insights />
      </div>
      {/* Closing globe: dots rise from Insights (data-gv="news") into this CTA */}
      <ClosingCTA />
      <HomeDotField />
    </>
  );
}
