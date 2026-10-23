import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initHeroFlightAnimation() {
  const heroCard = document.getElementById("hero-flight-card");
  const heroSlot = document.getElementById("hero-flight-card-slot");
  const cardInner = document.getElementById("hero-flight-card-inner");
  const fullView = document.getElementById("hero-card-full-view");
  const compactView = document.getElementById("hero-card-compact-view");
  const badge = document.getElementById("hero-flight-badge");
  const targetStep = document.querySelector(
    '[data-wf-step="1"]',
  ) as HTMLElement | null;
  const workflowSection = document.getElementById("workflow-section");
  const heroSection = document.getElementById("hero-section");
  const canvasCard =
    document.getElementById("workflow-canvas-card") ||
    (workflowSection?.querySelector(".canvas-grid")?.parentElement as HTMLElement | null) ||
    workflowSection;

  if (
    !heroCard ||
    !heroSlot ||
    !cardInner ||
    !fullView ||
    !compactView ||
    !badge ||
    !targetStep ||
    !workflowSection ||
    !heroSection ||
    !canvasCard
  )
    return;

  const targetBadge = targetStep.children[0] as HTMLElement | undefined;
  const targetCard = targetStep.children[1] as HTMLElement | undefined;

  if (!targetBadge || !targetCard) return;

  ScrollTrigger.getById("hero-to-workflow-flight")?.kill();

  const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

  // On mobile (< 1024px), keep both in standard static flow
  if (!isDesktop) {
    gsap.set(heroCard, { opacity: 0, visibility: "hidden" });
    gsap.set(heroSlot, { opacity: 1, visibility: "visible" });
    gsap.set(targetStep, { autoAlpha: 1 });
    return;
  }

  // Ensure stacking contexts: hero section on top during flight
  heroSection.style.overflow = "visible";
  heroSection.style.position = "relative";
  heroSection.style.zIndex = "30";
  workflowSection.style.position = "relative";
  workflowSection.style.zIndex = "10";

  // Target step in WorkflowSection starts hidden on desktop so flying card docks in its place
  gsap.set(targetStep, { autoAlpha: 0 });

  function getPositions() {
    const scrollY = window.scrollY;
    const heroRect = heroSection!.getBoundingClientRect();
    const slotRect = heroSlot!.getBoundingClientRect();
    const targetRect = targetCard!.getBoundingClientRect();

    // Use page-absolute Y so positions don't shift as hero section scrolls out
    return {
      startX: slotRect.left - heroRect.left,
      startY: (slotRect.top + scrollY) - (heroRect.top + scrollY),
      startW: slotRect.width,
      startH: slotRect.height,
      endX: targetRect.left - heroRect.left,
      endY: (targetRect.top + scrollY) - (heroRect.top + scrollY),
      endW: targetRect.width,
      endH: targetRect.height,
    };
  }

  const initial = getPositions();

  // Position heroCard at initial slot coordinates with absolute origin (0, 0)
  gsap.set(heroCard, {
    position: "absolute",
    top: 0,
    left: 0,
    margin: 0,
    x: initial.startX,
    y: initial.startY,
    width: initial.startW,
    height: initial.startH,
    opacity: 0,
    visibility: "hidden",
    zIndex: 50,
  });

  gsap.set(cardInner, {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(16px)",
    borderColor: "rgba(255, 255, 255, 0.32)",
    borderWidth: "1.5px",
    borderStyle: "solid",
    borderRadius: "24px",
    boxShadow:
      "0 20px 48px -8px rgba(0, 0, 0, 0.35), inset 0 1px 1px 0 rgba(255, 255, 255, 0.45)",
  });

  gsap.set(fullView, { opacity: 1, visibility: "visible" });
  gsap.set(compactView, { opacity: 0, visibility: "hidden" });
  gsap.set(badge, { opacity: 0 });
  gsap.set(heroSlot, { visibility: "visible" });

  ScrollTrigger.addEventListener("refreshInit", () => {
    if (!heroCard || !heroSlot || !heroSection) return;
    const heroRect = heroSection.getBoundingClientRect();
    const slotRect = heroSlot.getBoundingClientRect();
    gsap.set(heroCard, {
      x: slotRect.left - heroRect.left,
      y: slotRect.top - heroRect.top,
      width: slotRect.width,
      height: slotRect.height,
    });
  });

  const flightTl = gsap.timeline({
    id: "hero-to-workflow-flight",
    scrollTrigger: {
      trigger: canvasCard,
      start: "top bottom",
      end: "top 20%",
      scrub: 0.6,
      fastScrollEnd: true,
      preventOverlaps: true,
      invalidateOnRefresh: true,
      onLeave: () => {
        flightTl.progress(1);
        gsap.set(heroCard, { opacity: 0, visibility: "hidden" });
        gsap.set(targetStep, { autoAlpha: 1 });
        gsap.set(heroSlot, { visibility: "hidden" });
      },
      onEnterBack: () => {
        gsap.set(heroCard, { opacity: 1, visibility: "visible" });
        gsap.set(targetStep, { autoAlpha: 0 });
        gsap.set(heroSlot, { visibility: "hidden" });
      },
      onLeaveBack: () => {
        flightTl.progress(0);
        const resetPos = getPositions();
        gsap.set(heroCard, {
          x: resetPos.startX,
          y: resetPos.startY,
          width: resetPos.startW,
          height: resetPos.startH,
          opacity: 0,
          visibility: "hidden",
        });
        gsap.set(heroSlot, { visibility: "visible" });
        gsap.set(cardInner, {
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(16px)",
          borderColor: "rgba(255, 255, 255, 0.32)",
          borderWidth: "1.5px",
          borderStyle: "solid",
          borderRadius: "24px",
          boxShadow:
            "0 20px 48px -8px rgba(0, 0, 0, 0.35), inset 0 1px 1px 0 rgba(255, 255, 255, 0.45)",
        });
        gsap.set(fullView, { opacity: 1, visibility: "visible" });
        gsap.set(compactView, { opacity: 0, visibility: "hidden" });
        gsap.set(badge, { opacity: 0 });
        gsap.set(targetStep, { autoAlpha: 0 });
      },
      onUpdate: (self) => {
        if (self.progress <= 0.005) {
          gsap.set(heroSlot, { visibility: "visible" });
          gsap.set(heroCard, { opacity: 0, visibility: "hidden" });
          gsap.set(targetStep, { autoAlpha: 0 });
        } else if (self.progress >= 0.98) {
          gsap.set(heroSlot, { visibility: "hidden" });
          gsap.set(heroCard, { opacity: 0, visibility: "hidden" });
          gsap.set(targetStep, { autoAlpha: 1 });
        } else {
          gsap.set(heroSlot, { visibility: "hidden" });
          gsap.set(heroCard, { opacity: 1, visibility: "visible" });
          gsap.set(targetStep, { autoAlpha: 0 });
        }
      },
    },
  });

  // Deterministic timeline states for scrub:
  // At scroll 0 (top): heroSlot visible, heroCard hidden, targetStep hidden
  flightTl.set(heroSlot, { visibility: "visible" }, 0);
  flightTl.set(heroCard, { opacity: 0, visibility: "hidden" }, 0);
  flightTl.set(targetStep, { autoAlpha: 0 }, 0);

  // At lift-off (> 0.005): heroSlot hides, flying heroCard takes flight
  flightTl.set(heroSlot, { visibility: "hidden" }, 0.005);
  flightTl.set(heroCard, { visibility: "visible", opacity: 1 }, 0.005);

  // 1. FLIGHT TRANSLATION: Move heroCard along (x, y) to land on targetCard (0% → 100%)
  flightTl.to(
    heroCard,
    {
      x: () => {
        const heroR = heroSection!.getBoundingClientRect();
        const targetR = targetCard!.getBoundingClientRect();
        return targetR.left - heroR.left;
      },
      y: () => {
        const heroR = heroSection!.getBoundingClientRect();
        const targetR = targetCard!.getBoundingClientRect();
        return targetR.top - heroR.top;
      },
      duration: 1,
      ease: "power1.inOut",
    },
    0,
  );

  // 2. DIMENSION MORPH: Shrink width & height from hero card dimensions to target step dimensions
  flightTl.to(
    heroCard,
    {
      width: () => `${targetCard!.offsetWidth}px`,
      height: () => `${targetCard!.offsetHeight}px`,
      duration: 0.92,
      ease: "power1.inOut",
    },
    0,
  );

  // 3. CARD STYLING MORPH: Glassmorphic dark -> Solid white with slate border
  flightTl.to(
    cardInner,
    {
      backgroundColor: "rgba(255, 255, 255, 1)",
      borderColor: "rgba(226, 232, 240, 1)",
      borderWidth: "1px",
      borderRadius: "12px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.04)",
      duration: 0.85,
      ease: "power1.inOut",
    },
    0.05,
  );

  // 4. CONTENT FADE: Full hero card view dissolves early
  flightTl.to(
    fullView,
    {
      opacity: 0,
      duration: 0.3,
      ease: "power1.out",
    },
    0.05,
  );

  // 5. CONTENT REVEAL: Compact workflow card view fades in
  flightTl.set(compactView, { visibility: "visible" }, 0.25);
  flightTl.to(
    compactView,
    {
      opacity: 1,
      duration: 0.35,
      ease: "power1.in",
    },
    0.25,
  );

  // 6. EVENT BADGE: Fades in perched on top center as card approaches
  flightTl.to(
    badge,
    {
      opacity: 1,
      duration: 0.35,
      ease: "power1.in",
    },
    0.35,
  );

  // 7. SEAMLESS DOCK HANDOFF (progress 98% -> 100%)
  flightTl.to(
    heroCard,
    {
      opacity: 0,
      duration: 0.02,
      ease: "none",
      visibility: "hidden",
    },
    0.98,
  );

  flightTl.to(
    targetStep,
    {
      autoAlpha: 1,
      duration: 0.02,
      ease: "none",
    },
    0.98,
  );
}
