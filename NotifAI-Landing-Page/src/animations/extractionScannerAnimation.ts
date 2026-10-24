import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initExtractionScannerAnimation() {
  const extractionSection = document.querySelector("#extraction-section");
  const scannerCard = document.querySelector(
    "#extraction-scanner-card",
  ) as HTMLElement | null;
  const laserLine = document.querySelector(
    "#scanner-laser-line",
  ) as HTMLElement | null;
  const inputLayer = document.querySelector(
    "#scanner-input-layer",
  ) as HTMLElement | null;

  if (!extractionSection || !scannerCard) return;

  // Desktop-only: the pin animation only works with h-screen (flex-row) layout
  // On mobile (< 768px) sections stack vertically — skip the pinned laser scan.
  if (window.matchMedia("(max-width: 767px)").matches) {
    // Show the output layer immediately on mobile
    const outputLayer = document.getElementById("scanner-output-layer");
    if (outputLayer) outputLayer.style.clipPath = "none";
    if (inputLayer) gsap.set(inputLayer, { opacity: 0 });
    return;
  }

  ScrollTrigger.getById("class-to-extract-trigger")?.kill();
  ScrollTrigger.getById("extraction-scanner-trigger")?.kill();
  document.getElementById("flying-invoice-traveler")?.remove();

  gsap.killTweensOf(scannerCard);
  scannerCard.style.setProperty("--scan-progress", "0%");
  if (laserLine) gsap.set(laserLine, { opacity: 0, top: "0%" });

  // Scanner Transformation Timeline: Pinned inside ExtractionSection
  // ONLY starts once the invoice card has arrived at top top
  const scanState = { progress: 0 };

  const scannerTl = gsap.timeline({
    id: "extraction-scanner-trigger",
    scrollTrigger: {
      trigger: extractionSection,
      start: "top top",
      end: "+=130%",
      pin: true,
      anticipatePin: 1,
      scrub: 0.8,
      invalidateOnRefresh: true,
      onLeaveBack: () => {
        scannerCard.style.setProperty("--scan-progress", "0%");
        if (laserLine) gsap.set(laserLine, { opacity: 0, top: "0%" });
      },
    },
  });

  // 1. Brief settle, then laser activates
  if (laserLine) {
    scannerTl.to(laserLine, {
      opacity: 1,
      duration: 0.08,
      ease: "power1.in",
    });
  }

  // 2. Laser sweeps down, converting raw document into extracted fields
  scannerTl.to(scanState, {
    progress: 100,
    duration: 1,
    ease: "none",
    onUpdate: () => {
      const p = scanState.progress;
      scannerCard.style.setProperty("--scan-progress", `${p}%`);
      if (laserLine) laserLine.style.top = `${p}%`;
    },
  });

  // 3. Laser fades out at bottom
  if (laserLine) {
    scannerTl.to(laserLine, {
      opacity: 0,
      duration: 0.08,
      ease: "power1.out",
    });
  }

  // 4. Brief hold on completed document before unpinning
  scannerTl.to({}, { duration: 0.15 });
}
