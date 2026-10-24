import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initPricingAnimation() {
  const section = document.getElementById("pricing-section");
  const words = document.querySelectorAll(".pricing-word");
  const cards = document.querySelectorAll(".pricing-card-col");

  if (!section || words.length === 0 || cards.length === 0) return;

  ScrollTrigger.getById("pricing-section-trigger")?.kill();

  // 1. Instantly enforce initial hidden state so nothing ever blinks or shows prematurely
  gsap.set(words, { y: "130%", opacity: 0 });
  gsap.set(cards, { y: 40, opacity: 0 });

  const tl = gsap.timeline({
    id: "pricing-section-trigger",
    delay: 0.1,
    scrollTrigger: {
      trigger: section,
      start: "top 70%",
      // play on enter, DO NOT reverse or restart when leaving down, reverse ONLY when scrolling back above top
      toggleActions: "play none none reverse",
    },
  });

  // 2. Headline words slide up sequentially from behind their masked lines
  tl.to(
    words,
    {
      y: "0%",
      opacity: 1,
      duration: 0.85,
      stagger: 0.07,
      ease: "power4.out",
    },
    0,
  );

  // 3. Pricing cards glide up in a clean 3-card cascade
  tl.to(
    cards,
    {
      y: 0,
      opacity: 1,
      duration: 0.75,
      stagger: 0.12,
      ease: "power3.out",
    },
    0.15,
  );
}
