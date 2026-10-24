import gsap from "gsap";

export function initHeroCardsAnimation() {
  const heroSection = document.querySelector("#hero-section");
  const landingTarget = document.querySelector(".cards-landing-target");
  if (!heroSection || !landingTarget) return;

  gsap.killTweensOf(
    ".gmail-box, .outlook-box, .whatsapp-box, .pdf-box, .png-box, .word-box, .card-float-inner, .classification-doc-card",
  );

  // 1. Idle Floating Animation for each card inner element
  const floatConfigs = [
    {
      sel: ".word-box .card-float-inner",
      y: -13,
      rot: -2.2,
      duration: 3.3,
      delay: 0.4,
    },
    {
      sel: ".gmail-box .card-float-inner",
      y: -14,
      rot: -2.5,
      duration: 3.4,
      delay: 0,
    },
    {
      sel: ".outlook-box .card-float-inner",
      y: -16,
      rot: 2.5,
      duration: 3.0,
      delay: 0.3,
    },
    {
      sel: ".whatsapp-box .card-float-inner",
      y: -12,
      rot: -2.0,
      duration: 3.6,
      delay: 0.6,
    },
    {
      sel: ".pdf-box .card-float-inner",
      y: -10,
      rot: 2.0,
      duration: 3.2,
      delay: 0.2,
    },
    {
      sel: ".png-box .card-float-inner",
      y: -11,
      rot: -1.8,
      duration: 3.5,
      delay: 0.5,
    },
  ];

  floatConfigs.forEach((cfg) => {
    const el = document.querySelector(cfg.sel);
    if (!el) return;
    gsap.to(el, {
      y: cfg.y,
      rotation: cfg.rot,
      duration: cfg.duration,
      delay: cfg.delay,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  });

  // 2. Set initial card rotations and stacking order
  const cards = [
    {
      sel: ".word-box",
      startRot: -12,
      endRot: -8,
      offsetX: -28,
      offsetY: -14,
      zIndex: 14,
      startTime: 0,
      duration: 0.65,
    },
    {
      sel: ".pdf-box",
      startRot: -6,
      endRot: -3,
      offsetX: -16,
      offsetY: 4,
      zIndex: 15,
      startTime: 0.06,
      duration: 0.65,
    },
    {
      sel: ".png-box",
      startRot: -10,
      endRot: -5,
      offsetX: -22,
      offsetY: 18,
      zIndex: 16,
      startTime: 0.12,
      duration: 0.65,
    },
    {
      sel: ".whatsapp-box",
      startRot: 8,
      endRot: 3,
      offsetX: 0,
      offsetY: -16,
      zIndex: 17,
      startTime: 0.03,
      duration: 0.65,
    },
    {
      sel: ".gmail-box",
      startRot: -8,
      endRot: -4,
      offsetX: 18,
      offsetY: -8,
      zIndex: 18,
      startTime: 0.08,
      duration: 0.65,
    },
    {
      sel: ".outlook-box",
      startRot: 12,
      endRot: 6,
      offsetX: 26,
      offsetY: 12,
      zIndex: 19,
      startTime: 0.14,
      duration: 0.65,
    },
  ];

  cards.forEach((card) => {
    const el = document.querySelector<HTMLElement>(card.sel);
    if (!el) return;
    gsap.set(el, {
      rotation: card.startRot,
      zIndex: card.zIndex,
      opacity: 1,
      transformOrigin: "center center",
    });
  });

  // 3. Scroll Animation: fly all 6 cards into the Nico Intelligence card
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: heroSection,
      start: "top top",
      end: "bottom top",
      scrub: 1.2,
      invalidateOnRefresh: true,
      onLeaveBack: () => {
        cards.forEach((card) => {
          const el = document.querySelector<HTMLElement>(card.sel);
          if (el) gsap.set(el, { opacity: 1 });
        });
      },
    },
  });

  cards.forEach((card) => {
    const el = document.querySelector<HTMLElement>(card.sel);
    if (!el) return;

    tl.to(
      el,
      {
        x: () => {
          const targetRect = landingTarget.getBoundingClientRect();
          const elRect = el.getBoundingClientRect();
          const curX = gsap.getProperty(el, "x") || 0;
          return (
            Number(curX) +
            (targetRect.left + targetRect.width / 2) -
            (elRect.left + elRect.width / 2) +
            card.offsetX
          );
        },
        y: () => {
          const targetRect = landingTarget.getBoundingClientRect();
          const elRect = el.getBoundingClientRect();
          const curY = gsap.getProperty(el, "y") || 0;
          return (
            Number(curY) +
            (targetRect.top + targetRect.height / 2) -
            (elRect.top + elRect.height / 2) +
            card.offsetY
          );
        },
        scale: 0.55,
        rotation: card.endRot,
        ease: "power2.inOut",
        duration: card.duration,
      },
      card.startTime,
    );

    // Fade cleanly once card is fully tucked behind the Nico Intelligence card
    tl.to(
      el,
      {
        opacity: 0,
        duration: 0.2,
        ease: "power1.in",
      },
      card.startTime + card.duration - 0.15,
    );
  });

  // 4. Reveal Classification Document Cards smoothly once Hero cards reach their destination
  const docCards = document.querySelectorAll(".classification-doc-card");
  if (docCards.length > 0) {
    tl.fromTo(
      docCards,
      {
        opacity: 0,
        y: 35,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.35,
        stagger: 0.08,
        ease: "power2.out",
      },
      0.5,
    );
  }
}
