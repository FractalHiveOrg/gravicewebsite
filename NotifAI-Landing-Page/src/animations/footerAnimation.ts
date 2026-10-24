import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initFooterAnimation() {
  const section = document.getElementById("footer-section");
  const ctaCard = document.querySelector(".footer-cta-card");
  const words = document.querySelectorAll(".footer-word");
  const btns = document.querySelector(".footer-cta-btns");

  if (!section || !ctaCard) return;

  ScrollTrigger.getById("footer-section-trigger")?.kill();

  gsap.set(ctaCard, { y: 30, opacity: 0 });
  if (words.length > 0) gsap.set(words, { y: "130%", opacity: 0 });
  if (btns) gsap.set(btns, { y: 20, opacity: 0 });

  const tl = gsap.timeline({
    id: "footer-section-trigger",
    scrollTrigger: {
      trigger: section,
      start: "top 75%",
      toggleActions: "play none none reverse",
    },
  });

  tl.to(
    ctaCard,
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
    },
    0,
  );

  if (words.length > 0) {
    tl.to(
      words,
      {
        y: "0%",
        opacity: 1,
        duration: 0.8,
        stagger: 0.06,
        ease: "power4.out",
      },
      0.15,
    );
  }

  if (btns) {
    tl.to(
      btns,
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      },
      0.35,
    );
  }
}
