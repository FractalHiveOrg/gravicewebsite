import gsap from "gsap";

export function cleanupHeroStreamAnimation() {
  gsap.killTweensOf(".hero-stream-card");
  gsap.set(".hero-stream-card", {
    opacity: 1,
    y: 0,
    scale: 1,
    clearProps: "transform",
  });
}

export function initHeroStreamAnimation() {
  const container = document.getElementById("hero-stream-wrapper");
  const cards = document.querySelectorAll<HTMLElement>(".hero-stream-card");
  if (!container || !cards.length) return;

  cleanupHeroStreamAnimation();

  // Desktop only (cards are hidden on mobile)
  const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
  if (!isDesktop) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    gsap.set(cards, { opacity: 1, y: 0, scale: 1, clearProps: "all" });
    return;
  }

  // Cards array reversed: animates sequentially from last card to first card
  const cardsReversed = Array.from(cards).reverse();

  // Reveal immediately on hero load — above-the-fold content should never wait for scroll!
  const tl = gsap.timeline({
    delay: 0.25,
  });

  tl.fromTo(
    cardsReversed,
    {
      opacity: 0,
      y: 28,
      scale: 0.96,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      stagger: 0.06,
      ease: "power3.out",
      clearProps: "transform",
    }
  );
}


