import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initEngineeredSectionAnimation() {
  const section = document.getElementById("engineering-section");
  const words = document.querySelectorAll(".engineering-word");
  const accordion = document.getElementById("engineering-accordion");

  if (!section || words.length === 0 || !accordion) return;

  ScrollTrigger.getById("engineering-section-trigger")?.kill();

  // 1. Instantly enforce initial hidden state so nothing ever blinks or shows prematurely
  gsap.set(words, { y: "130%", opacity: 0 });
  gsap.set(accordion, { y: 40, opacity: 0, scale: 0.97 });

  const tl = gsap.timeline({
    id: "engineering-section-trigger",
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

  // 3. The entire accordion container glides smoothly up and settles into place
  tl.to(
    accordion,
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power3.out",
    },
    0.15,
  );
}
