import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initClassificationAnimation() {
  const section = document.getElementById("classification-section");
  const badge = document.querySelector(".classification-badge");
  const words = document.querySelectorAll(".classification-word");

  if (!section || !badge || words.length === 0) return;

  ScrollTrigger.getById("classification-text-trigger")?.kill();

  // 1. Instantly enforce initial hidden state so nothing ever blinks or shows prematurely
  gsap.set(badge, { y: "120%", opacity: 0 });
  gsap.set(words, { y: "130%", opacity: 0 });

  const tl = gsap.timeline({
    id: "classification-text-trigger",
    delay: 0.1,
    scrollTrigger: {
      trigger: section,
      start: "top 72%",
      // play on enter, DO NOT reverse or restart when leaving down, reverse ONLY when scrolling back above top
      toggleActions: "play none none reverse",
    },
  });

  // 2. Badge slides up out of its overflow mask
  tl.to(
    badge,
    {
      y: "0%",
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
    },
    0,
  );

  // 3. Words slide up sequentially from behind their masked lines
  tl.to(
    words,
    {
      y: "0%",
      opacity: 1,
      duration: 0.85,
      stagger: 0.065,
      ease: "power4.out",
    },
    0.1,
  );
}
