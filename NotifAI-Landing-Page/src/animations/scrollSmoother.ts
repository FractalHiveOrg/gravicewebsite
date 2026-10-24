import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export function initScrollSmoother() {
  if (typeof window === "undefined") return;

  // Disable ScrollSmoother on mobile — causes jank on iOS/Android touch scroll
  if (window.matchMedia("(max-width: 767px)").matches) return;

  const wrapper = document.getElementById("smooth-wrapper");
  const content = document.getElementById("smooth-content");
  if (!wrapper || !content) return;

  const existing = ScrollSmoother.get();
  if (existing) {
    existing.kill();
  }

  return ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1, // responsive smooth scroll
    normalizeScroll: true, // prevents vibration / thread desync between wheel/touch and RAF
    effects: true,
    smoothTouch: 0.1,
  });
}
