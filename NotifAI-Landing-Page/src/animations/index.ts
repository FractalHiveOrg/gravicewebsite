import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { initScrollSmoother } from "./scrollSmoother";
import { initHeroCardsAnimation } from "./heroCardsAnimation";
import { initClassificationAnimation } from "./classificationAnimation";
import { initExtractionTextAnimation } from "./extractionTextAnimation";
import { initExtractionScannerAnimation } from "./extractionScannerAnimation";
import { initPinnedCardAnimation } from "./pinnedCardAnimation";
import { initIntegrationTextAnimation } from "./integrationTextAnimation";
import { initEnterpriseScaleAnimation } from "./enterpriseScaleAnimation";
import { initWorkflowAnimation } from "./workflowAnimation";
import {
  initHeroFlightAnimation,
  cleanupHeroFlightAnimation,
} from "./heroFlightAnimation";
import {
  initHeroStreamAnimation,
  cleanupHeroStreamAnimation,
} from "./heroStreamAnimation";
import { initEngineeredSectionAnimation } from "./engineeredSectionAnimation";
import { initPricingAnimation } from "./pricingAnimation";
import { initValueFlightAnimation } from "./valueFlightAnimation";
import {
  initEngineeredAccordionAnimation,
  cleanupEngineeredAccordion,
} from "./engineeredAccordionAnimation";
import { initFaqAccordionAnimation, cleanupFaqAccordion } from "./faqAccordionAnimation";
import { initFooterAnimation } from "./footerAnimation";
import {
  initWhyNicoAnimation,
  cleanupWhyNicoAnimation,
} from "./whyNicoAnimation";

import {
  initFooterWaveAnimation,
  destroyFooterWaveAnimation,
  pauseWaveAnimation,
  stopWaveAnimation,
  resumeWaveAnimation,
  playWaveAnimation,
  captureWaveScreenshot,
  setWaveTime,
} from "./footerWaveAnimation";
import {
  initIntegrationsScannerAnimation,
  cleanupIntegrationsScannerAnimation,
} from "./integrationsScannerAnimation";
import {
  initHeroTextAnimation,
  cleanupHeroTextAnimation,
} from "./heroTextAnimation";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export function cleanupAnimations() {
  ScrollSmoother.get()?.kill();
  ScrollTrigger.getAll().forEach((t) => t.kill());
  cleanupEngineeredAccordion();
  cleanupFaqAccordion();
  cleanupWhyNicoAnimation();
  destroyFooterWaveAnimation();
  cleanupIntegrationsScannerAnimation();
  cleanupHeroTextAnimation();
  cleanupHeroStreamAnimation();
  cleanupHeroFlightAnimation();
}

export function initAllAnimations() {
  // ScrollSmoother must always be created before any ScrollTrigger instances
  // (disabled automatically on mobile inside initScrollSmoother)
  initScrollSmoother();

  // ─── Animations that work on ALL screen sizes ──────────────────────────────
  // Text mask reveals, accordion interactions, staggered card entries
  initHeroTextAnimation();
  initClassificationAnimation();
  initExtractionTextAnimation();
  initIntegrationTextAnimation();
  initWorkflowAnimation();
  initWhyNicoAnimation();
  initHeroFlightAnimation();
  initHeroStreamAnimation();
  initEnterpriseScaleAnimation();
  initEngineeredSectionAnimation();
  initEngineeredAccordionAnimation();
  initPricingAnimation();
  initFaqAccordionAnimation();
  initFooterAnimation();
  initFooterWaveAnimation();
  initIntegrationsScannerAnimation();

  // ─── Desktop-only animations (≥ 768px) ────────────────────────────────────
  // These animations depend on precise pixel-coordinate cross-section flights
  // (getBoundingClientRect across two side-by-side columns) and scroll pinning.
  // On mobile sections stack vertically, making these animations meaningless/broken.
  const mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    // Hero: 6 icon cards float idle AND fly down into the Classification card
    initHeroCardsAnimation();
    // Invoice card morphs from Classification into Extraction scanner
    initPinnedCardAnimation();
    // Extraction laser scanner sweep (pinned section)
    initExtractionScannerAnimation();
    // 12 field values fly from Extraction into Integration Tally window
    initValueFlightAnimation();

    // Cleanup function called when matchMedia condition no longer matches
    return () => {
      ScrollTrigger.getById("classification-pinned-trigger")?.kill();
      ScrollTrigger.getById("extraction-scanner-trigger")?.kill();
      ScrollTrigger.getById("extraction-to-integration-flight")?.kill();
    };
  });

  mm.add("(max-width: 767px)", () => {
    // On mobile: hero cards only do the idle float (no scroll fly-to-classification)
    // The heroCardsAnimation checks for .cards-landing-target and won't run full scroll anim
    // Just run the idle float portion
    initHeroMobileFloatOnly();

    // Make sure classification doc cards are visible immediately on mobile
    document
      .querySelectorAll<HTMLElement>(".classification-doc-card.mobile-visible")
      .forEach((el) => {
        el.style.opacity = "1";
      });

    // Make sure tally field values are visible on mobile
    document
      .querySelectorAll<HTMLElement>(".tally-field-value")
      .forEach((el) => {
        el.style.opacity = "1";
      });
  });

  // Recalculate all scroll positions and pin spacers after all animations are registered
  ScrollTrigger.refresh();

  // Re-sync positions once web fonts are fully loaded to avoid layout shift discrepancies
  if (typeof document !== "undefined" && "fonts" in document) {
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });
  }

  // Re-sync positions when window and images finish loading
  if (typeof window !== "undefined") {
    if (document.readyState === "complete") {
      ScrollTrigger.refresh();
    } else {
      window.addEventListener(
        "load",
        () => {
          ScrollTrigger.refresh();
        },
        { once: true }
      );
    }
  }
}

/** Mobile-only: run just the idle floating animation for hero icon cards */
function initHeroMobileFloatOnly() {
  const floatConfigs = [
    { sel: ".word-box .card-float-inner", y: -6, rot: -2.2, duration: 3.3, delay: 0.4 },
    { sel: ".gmail-box .card-float-inner", y: -6, rot: -2.5, duration: 3.4, delay: 0 },
    { sel: ".outlook-box .card-float-inner", y: -7, rot: 2.5, duration: 3.0, delay: 0.3 },
    { sel: ".whatsapp-box .card-float-inner", y: -5, rot: -2.0, duration: 3.6, delay: 0.6 },
    { sel: ".pdf-box .card-float-inner", y: -5, rot: 2.0, duration: 3.2, delay: 0.2 },
    { sel: ".png-box .card-float-inner", y: -5, rot: -1.8, duration: 3.5, delay: 0.5 },
  ];

  const tweens: gsap.core.Tween[] = [];

  floatConfigs.forEach((cfg) => {
    const el = document.querySelector(cfg.sel);
    if (!el) return;
    const t = gsap.to(el, {
      y: cfg.y,
      rotation: cfg.rot,
      duration: cfg.duration,
      delay: cfg.delay,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      paused: false,
    });
    tweens.push(t);
  });

  // Pause all float tweens when hero leaves viewport — resume on re-entry
  const heroSection = document.getElementById("hero-section");
  if (heroSection && tweens.length > 0) {
    const obs = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0]?.isIntersecting;
        tweens.forEach((t) => (isVisible ? t.resume() : t.pause()));
      },
      { threshold: 0 }
    );
    obs.observe(heroSection);
  }
}

export {
  initScrollSmoother,
  initHeroCardsAnimation,
  initClassificationAnimation,
  initExtractionTextAnimation,
  initExtractionScannerAnimation,
  initPinnedCardAnimation,
  initIntegrationTextAnimation,
  initWorkflowAnimation,
  initWhyNicoAnimation,
  cleanupWhyNicoAnimation,
  initHeroFlightAnimation,
  cleanupHeroFlightAnimation,
  initHeroStreamAnimation,
  cleanupHeroStreamAnimation,
  initEnterpriseScaleAnimation,
  initValueFlightAnimation,
  initEngineeredSectionAnimation,
  initEngineeredAccordionAnimation,
  initPricingAnimation,
  initFaqAccordionAnimation,
  initFooterAnimation,
  initFooterWaveAnimation,
  destroyFooterWaveAnimation,
  pauseWaveAnimation,
  stopWaveAnimation,
  resumeWaveAnimation,
  playWaveAnimation,
  captureWaveScreenshot,
  setWaveTime,
};
