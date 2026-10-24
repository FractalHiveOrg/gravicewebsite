import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initValueFlightAnimation() {
  const extractionSection = document.getElementById("extraction-section");
  const integrationSection = document.getElementById("integration-section");
  const extractionCardColumn = document.getElementById("extraction-card-column");
  const scannerCard = document.getElementById("extraction-scanner-card");
  const scannerOutputLayer = document.getElementById("scanner-output-layer");

  if (!extractionSection || !integrationSection || !scannerCard) return;

  // Desktop-only: flying text values cross from Extraction to Integration window.
  // On mobile (< 768px) sections stack vertically — tally values are shown via CSS.
  if (window.matchMedia("(max-width: 767px)").matches) return;

  ScrollTrigger.getById("extraction-to-integration-flight")?.kill();

  const flightPairs = [
    { valId: "val-invoice-no", targetId: "target-invoice-no", alignRight: false },
    { valId: "val-invoice-date", targetId: "target-invoice-date", alignRight: true },
    { valId: "val-supplier", targetId: "target-supplier", alignRight: false },
    { valId: "val-gstin", targetId: "target-gstin", alignRight: false },
    { valId: "val-item-1-name", targetId: "target-item-1-name", alignRight: false },
    { valId: "val-item-1-qty", targetId: "target-item-1-qty", alignRight: true },
    { valId: "val-item-1-amount", targetId: "target-item-1-amount", alignRight: true },
    { valId: "val-item-2-name", targetId: "target-item-2-name", alignRight: false },
    { valId: "val-item-2-qty", targetId: "target-item-2-qty", alignRight: true },
    { valId: "val-item-2-amount", targetId: "target-item-2-amount", alignRight: true },
    { valId: "val-subtotal", targetId: "target-subtotal", alignRight: true },
    { valId: "val-total", targetId: "target-total", alignRight: true },
  ];

  const validPairs = flightPairs
    .map((p) => ({
      val: document.getElementById(p.valId),
      target: document.getElementById(p.targetId),
      alignRight: p.alignRight,
    }))
    .filter(
      (p): p is { val: HTMLElement; target: HTMLElement; alignRight: boolean } =>
        p.val !== null && p.target !== null,
    );

  if (validPairs.length === 0) return;

  const tallyValues = Array.from(
    integrationSection.querySelectorAll<HTMLElement>(".tally-field-value"),
  );
  const flyingEls = validPairs.map((p) => p.val);

  // Set clean initial GSAP states
  gsap.set(tallyValues, { autoAlpha: 0 });
  gsap.set(flyingEls, { autoAlpha: 1, x: 0, y: 0, scale: 1 });

  const tl = gsap.timeline({
    id: "extraction-to-integration-flight",
    scrollTrigger: {
      trigger: integrationSection,
      start: "top bottom",
      end: "top top",
      scrub: 1,
      invalidateOnRefresh: true,
      onToggle: (self) => {
        if (extractionCardColumn) {
          extractionCardColumn.style.overflow = self.isActive ? "visible" : "";
        }

        if (scannerCard) {
          scannerCard.style.overflow = self.isActive ? "visible" : "";
          scannerCard.style.clipPath = self.isActive ? "none" : "";
        }

        if (scannerOutputLayer) {
          scannerOutputLayer.style.overflow = self.isActive ? "visible" : "";
          scannerOutputLayer.style.clipPath = self.isActive ? "none" : "";
        }
      },
      onLeaveBack: () => {
        if (extractionCardColumn) extractionCardColumn.style.overflow = "";
        if (scannerCard) {
          scannerCard.style.overflow = "";
          scannerCard.style.clipPath = "";
        }
        if (scannerOutputLayer) {
          scannerOutputLayer.style.overflow = "";
          scannerOutputLayer.style.clipPath = "";
        }
      },
    },
  });

  // 1. Flight animation: move each value along x and y to exact destination
  validPairs.forEach(({ val, target, alignRight }) => {
    tl.fromTo(
      val,
      {
        x: 0,
        y: 0,
        autoAlpha: 1,
        scale: 1,
        immediateRender: false,
      },
      {
        x: () => {
          const tRect = target.getBoundingClientRect();
          const vRect = val.getBoundingClientRect();
          const curX = Number(gsap.getProperty(val, "x") || 0);
          if (alignRight) {
            return tRect.right - (vRect.right - curX);
          }
          return tRect.left - (vRect.left - curX);
        },
        y: () => {
          const tRect = target.getBoundingClientRect();
          const vRect = val.getBoundingClientRect();
          const curY = Number(gsap.getProperty(val, "y") || 0);
          return tRect.top - (vRect.top - curY);
        },
        scale: 0.85,
        transformOrigin: alignRight ? "right center" : "left center",
        ease: "power2.inOut",
        duration: 0.85,
        immediateRender: false,
      },
      0,
    );
  });

  // 2. Seamless bidirectional crossfade:
  // As values arrive at their destination (0.78 -> 0.90), flying text fades out
  tl.to(
    flyingEls,
    {
      autoAlpha: 0,
      duration: 0.12,
      ease: "power1.out",
    },
    0.78,
  );

  // 3. Simultaneously (0.80 -> 0.94), all Tally voucher fields fade in
  tl.fromTo(
    tallyValues,
    { autoAlpha: 0 },
    {
      autoAlpha: 1,
      duration: 0.14,
      ease: "power1.in",
    },
    0.80,
  );
}
