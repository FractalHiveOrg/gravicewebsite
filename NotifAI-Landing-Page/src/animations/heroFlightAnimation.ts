import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pulseWorkflowCard } from "./workflowAnimation";

let activeRefreshHandler: (() => void) | null = null;

export function cleanupHeroFlightAnimation() {
  ScrollTrigger.getById("hero-to-workflow-flight")?.kill();
  if (activeRefreshHandler) {
    ScrollTrigger.removeEventListener("refreshInit", activeRefreshHandler);
    activeRefreshHandler = null;
  }
  const heroCard = document.getElementById("hero-flight-card");
  const heroSlot = document.getElementById("hero-flight-card-slot");
  const cardInner = document.getElementById("hero-flight-card-inner");
  const fullView = document.getElementById("hero-card-full-view");
  const compactView = document.getElementById("hero-card-compact-view");
  const badge = document.getElementById("hero-flight-badge");
  const targetStep = document.querySelector('[data-wf-step="1"]');

  if (heroCard) {
    gsap.killTweensOf(heroCard);
    gsap.set(heroCard, {
      opacity: 0,
      visibility: "hidden",
      clearProps: "transform,width,height",
    });
  }
  if (cardInner) gsap.killTweensOf(cardInner);
  if (fullView) {
    gsap.killTweensOf(fullView);
    gsap.set(fullView, { opacity: 1, visibility: "visible" });
  }
  if (compactView) {
    gsap.killTweensOf(compactView);
    gsap.set(compactView, { opacity: 0, visibility: "hidden" });
  }
  if (badge) {
    gsap.killTweensOf(badge);
    gsap.set(badge, { opacity: 0 });
  }
  if (heroSlot) {
    gsap.killTweensOf(heroSlot);
    gsap.set(heroSlot, { visibility: "visible" });
  }
  if (targetStep) {
    gsap.killTweensOf(targetStep);
  }
}

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

  cleanupHeroFlightAnimation();

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

  function getSlotCoordinates() {
    const heroRect = heroSection!.getBoundingClientRect();
    const slotRect = heroSlot!.getBoundingClientRect();
    const curX = Number(gsap.getProperty(heroSlot, "x")) || 0;
    const curY = Number(gsap.getProperty(heroSlot, "y")) || 0;
    return {
      x: slotRect.left - heroRect.left - curX,
      y: slotRect.top - heroRect.top - curY,
      width: heroSlot!.offsetWidth,
      height: heroSlot!.offsetHeight,
    };
  }

  function getTargetCoordinates() {
    const heroRect = heroSection!.getBoundingClientRect();
    const targetRect = targetCard!.getBoundingClientRect();
    const curX = Number(gsap.getProperty(targetCard, "x")) || 0;
    const curY = Number(gsap.getProperty(targetCard, "y")) || 0;
    return {
      x: targetRect.left - heroRect.left - curX,
      y: targetRect.top - heroRect.top - curY,
      width: targetCard!.offsetWidth,
      height: targetCard!.offsetHeight,
    };
  }

  const initialSlot = getSlotCoordinates();

  // Position heroCard at initial slot coordinates with absolute origin (0, 0)
  gsap.set(heroCard, {
    position: "absolute",
    top: 0,
    left: 0,
    margin: 0,
    x: initialSlot.x,
    y: initialSlot.y,
    width: initialSlot.width,
    height: initialSlot.height,
    opacity: 0,
    visibility: "hidden",
    zIndex: 50,
  });

  gsap.set(cardInner, {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(16px)",
    webkitBackdropFilter: "blur(16px)",
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

  activeRefreshHandler = () => {
    if (!heroCard || !heroSlot || !heroSection) return;
    const slotPos = getSlotCoordinates();
    gsap.set(heroCard, {
      x: slotPos.x,
      y: slotPos.y,
      width: slotPos.width,
      height: slotPos.height,
    });
  };
  ScrollTrigger.addEventListener("refreshInit", activeRefreshHandler);

  let step1Docked = false;

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
        if (!step1Docked) {
          step1Docked = true;
          pulseWorkflowCard(targetStep);
        }
      },
      onEnterBack: () => {
        gsap.set(heroCard, { opacity: 1, visibility: "visible" });
        gsap.set(targetStep, { autoAlpha: 0 });
        gsap.set(heroSlot, { visibility: "hidden" });
      },
      onLeaveBack: () => {
        step1Docked = false;
        flightTl.progress(0);
        const slotPos = getSlotCoordinates();
        gsap.set(heroCard, {
          x: slotPos.x,
          y: slotPos.y,
          width: slotPos.width,
          height: slotPos.height,
          opacity: 0,
          visibility: "hidden",
        });
        gsap.set(heroSlot, { visibility: "visible" });
        gsap.set(cardInner, {
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(16px)",
          webkitBackdropFilter: "blur(16px)",
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
          step1Docked = false;
          gsap.set(heroSlot, { visibility: "visible" });
          gsap.set(heroCard, { opacity: 0, visibility: "hidden" });
          gsap.set(targetStep, { autoAlpha: 0 });
        } else if (self.progress >= 0.98) {
          gsap.set(heroSlot, { visibility: "hidden" });
          gsap.set(heroCard, { opacity: 0, visibility: "hidden" });
          gsap.set(targetStep, { autoAlpha: 1 });
          if (!step1Docked && self.direction > 0) {
            step1Docked = true;
            pulseWorkflowCard(targetStep);
          }
        } else {
          if (self.progress < 0.9) {
            step1Docked = false;
          }
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

  // 1. FLIGHT TRANSLATION & MORPH: from current slot coordinates to exact target card coordinates
  flightTl.fromTo(
    heroCard,
    {
      x: () => getSlotCoordinates().x,
      y: () => getSlotCoordinates().y,
      width: () => `${getSlotCoordinates().width}px`,
      height: () => `${getSlotCoordinates().height}px`,
    },
    {
      x: () => getTargetCoordinates().x,
      y: () => getTargetCoordinates().y,
      width: () => `${getTargetCoordinates().width}px`,
      height: () => `${getTargetCoordinates().height}px`,
      duration: 1,
      ease: "power1.inOut",
    },
    0,
  );

  // 2. CARD STYLING MORPH: Glassmorphic dark -> Solid white with slate border
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

  // 3. CONTENT FADE: Full hero card view dissolves early
  flightTl.to(
    fullView,
    {
      opacity: 0,
      duration: 0.3,
      ease: "power1.out",
    },
    0.05,
  );

  // 4. CONTENT REVEAL: Compact workflow card view fades in
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

  // 5. EVENT BADGE: Fades in perched on top center as card approaches
  flightTl.to(
    badge,
    {
      opacity: 1,
      duration: 0.35,
      ease: "power1.in",
    },
    0.35,
  );

  // 6. SEAMLESS DOCK HANDOFF (progress 98% -> 100%)
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
