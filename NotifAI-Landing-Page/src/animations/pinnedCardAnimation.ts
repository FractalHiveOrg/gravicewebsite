import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initPinnedCardAnimation() {
  const pinedCard = document.getElementById("classification-invoice-card");
  const parentColumn = document.getElementById(
    "classification-invoice-column",
  );
  const scannerCard = document.getElementById("extraction-scanner-card");
  const inputLayer = document.getElementById("scanner-input-layer");
  const extractionSection = document.getElementById("extraction-section");
  if (!pinedCard || !scannerCard || !extractionSection) return;

  // Desktop-only: this animation moves an element across two side-by-side columns.
  // On mobile (< 768px) sections stack vertically — skip this cross-section flight.
  if (window.matchMedia("(max-width: 767px)").matches) return;

  ScrollTrigger.getById("classification-pinned-trigger")?.kill();
  if (inputLayer) gsap.set(inputLayer, { opacity: 0 });

  // Flight takes place as the page scrolls from Classification into Extraction
  // and docks right as Extraction hits top top
  const tl = gsap.timeline({
    id: "classification-pinned-trigger",
    scrollTrigger: {
      trigger: extractionSection,
      start: "top bottom",
      end: "top top",
      scrub: 0.8,
      invalidateOnRefresh: true,
      onToggle: (self) => {
        if (parentColumn) {
          parentColumn.style.zIndex = self.isActive ? "40" : "";
          parentColumn.style.overflow = self.isActive ? "visible" : "";
          parentColumn.style.clipPath = self.isActive
            ? "inset(0px 0px -4000px -4000px)"
            : "";
        }
      },
      onLeaveBack: () => {
        pinedCard.style.zIndex = "";
        if (parentColumn) {
          parentColumn.style.zIndex = "";
          parentColumn.style.overflow = "";
          parentColumn.style.clipPath = "";
          parentColumn.style.width = "";
          parentColumn.style.maxWidth = "";
          parentColumn.style.flex = "";
        }
        if (inputLayer) gsap.set(inputLayer, { opacity: 0 });
        gsap.set(pinedCard, { opacity: 1, visibility: "visible" });
      },
    },
  });

  // 1. Move and morph pinedCard from resting position to scannerCard
  tl.fromTo(
    pinedCard,
    {
      x: 0,
      y: 0,
      opacity: 1,
      visibility: "visible",
      padding: "0px",
      borderRadius: "16px",
      border: "1px solid rgba(0, 0, 0, 0.05)",
      boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      immediateRender: false,
    },
    {
      x: () => {
        const targetRect = scannerCard.getBoundingClientRect();
        const cardRect = pinedCard.getBoundingClientRect();
        const curX = gsap.getProperty(pinedCard, "x") || 0;
        return Number(curX) + (targetRect.left - cardRect.left);
      },
      y: () => {
        const targetRect = scannerCard.getBoundingClientRect();
        const cardRect = pinedCard.getBoundingClientRect();
        const curY = gsap.getProperty(pinedCard, "y") || 0;
        return Number(curY) + (targetRect.top - cardRect.top);
      },
      width: () => `${scannerCard.getBoundingClientRect().width}px`,
      height: () => `${scannerCard.getBoundingClientRect().height}px`,
      minHeight: () => `${scannerCard.getBoundingClientRect().height}px`,
      padding: "0px",
      borderRadius: "24px",
      border: "1px solid rgba(241, 245, 249, 1)",
      boxShadow:
        "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      ease: "power2.inOut",
      duration: 1,
      immediateRender: false,
    },
    0,
  );

  // 2. Seamless crossfade handoff as pinedCard lands on scannerCard
  // Between progress 0.92 and 1.0, inputLayer fades in while pinedCard fades out
  // Completely eliminating any white flash or blank gap
  if (inputLayer) {
    tl.fromTo(
      inputLayer,
      { opacity: 0 },
      { opacity: 1, duration: 0.08, ease: "power1.in", immediateRender: false },
      0.92,
    );
    tl.to(
      pinedCard,
      { opacity: 0, duration: 0.08, ease: "power1.out" },
      0.92,
    );
    tl.set(pinedCard, { visibility: "hidden" }, 1.0);
  }
}
