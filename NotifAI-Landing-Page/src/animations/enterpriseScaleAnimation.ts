import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initEnterpriseScaleAnimation() {
  const section = document.getElementById("enterprise-scale-section");
  const headingLines = document.querySelectorAll(".enterprise-heading-line");
  const cardItems = document.querySelectorAll(".enterprise-card-item");

  if (!section || headingLines.length === 0 || cardItems.length === 0) return;

  ScrollTrigger.getById("enterprise-scale-trigger")?.kill();

  // 1. Instantly enforce initial hidden state so nothing ever blinks or shows prematurely
  gsap.set(headingLines, { y: "120%", opacity: 0 });
  gsap.set(cardItems, { y: 40, opacity: 0, scale: 0.97 });

  const tl = gsap.timeline({
    id: "enterprise-scale-trigger",
    delay: 0.1,
    scrollTrigger: {
      trigger: section,
      start: "top 70%",
      // play on enter, DO NOT reverse or restart when leaving down, reverse ONLY when scrolling back above top
      toggleActions: "play none none reverse",
    },
  });

  // 2. Bold editorial heading lines slide up sequentially from behind overflow masks
  tl.to(
    headingLines,
    {
      y: "0%",
      opacity: 1,
      duration: 0.8,
      stagger: 0.09,
      ease: "power4.out",
    },
    0,
  );

  // 3. Feature cards cascade in with smooth upward rise and scale settle
  tl.to(
    cardItems,
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.75,
      stagger: 0.12,
      ease: "power3.out",
    },
    0.18, // Starts right as headings are settling in
  );
}
