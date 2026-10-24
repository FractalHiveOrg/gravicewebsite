import gsap from "gsap";

// How long each headline stays fully visible before rotating to the next one.
const SLIDE_HOLD_SECONDS = 4;

let introTimeline: gsap.core.Timeline | null = null;
let rotatorTimeline: gsap.core.Timeline | null = null;

export function cleanupHeroTextAnimation() {
  introTimeline?.kill();
  rotatorTimeline?.kill();
  introTimeline = null;
  rotatorTimeline = null;
  gsap.killTweensOf(
    ".hero-eyebrow, .hero-title-word, .hero-subtitle, .hero-subtitle-slide, .hero-cta",
  );
}

interface HeroSlide {
  titleLayer: HTMLElement;
  subtitleLayer: HTMLElement | null;
  words: HTMLElement[];
}

function collectSlides(section: HTMLElement): HeroSlide[] {
  const titleLayers = Array.from(
    section.querySelectorAll<HTMLElement>(".hero-title-slide"),
  );
  return titleLayers.map((titleLayer) => ({
    titleLayer,
    subtitleLayer: section.querySelector<HTMLElement>(
      `.hero-subtitle-slide[data-slide="${titleLayer.dataset.slide}"]`,
    ),
    words: Array.from(titleLayer.querySelectorAll<HTMLElement>(".hero-title-word")),
  }));
}

function setSlideAccessible(slide: HeroSlide, active: boolean) {
  [slide.titleLayer, slide.subtitleLayer].forEach((layer) => {
    if (!layer) return;
    if (active) layer.removeAttribute("aria-hidden");
    else layer.setAttribute("aria-hidden", "true");
  });
}

// Infinite loop: hold → current slide exits upward → next slide rises in.
// The last transition returns to slide 0, so `repeat: -1` loops seamlessly.
function buildRotator(slides: HeroSlide[]) {
  const tl = gsap.timeline({ repeat: -1, paused: true });

  slides.forEach((current, i) => {
    const next = slides[(i + 1) % slides.length];

    tl.to({}, { duration: SLIDE_HOLD_SECONDS });

    tl.to(current.words, {
      y: "-110%",
      opacity: 0,
      duration: 0.5,
      stagger: 0.04,
      ease: "power3.in",
    });
    if (current.subtitleLayer) {
      tl.to(
        current.subtitleLayer,
        { y: -14, opacity: 0, duration: 0.45, ease: "power2.in" },
        "<",
      );
    }

    tl.set(current.titleLayer, { visibility: "hidden" });
    if (current.subtitleLayer) tl.set(current.subtitleLayer, { visibility: "hidden" }, "<");
    tl.set(next.titleLayer, { visibility: "visible" }, "<");
    if (next.subtitleLayer) tl.set(next.subtitleLayer, { visibility: "visible" }, "<");
    tl.call(() => {
      setSlideAccessible(current, false);
      setSlideAccessible(next, true);
    });

    tl.fromTo(
      next.words,
      { y: "120%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.85,
        stagger: 0.07,
        ease: "power4.out",
        immediateRender: false,
      },
    );
    if (next.subtitleLayer) {
      tl.fromTo(
        next.subtitleLayer,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          immediateRender: false,
        },
        "<0.2",
      );
    }
  });

  return tl;
}

export function initHeroTextAnimation() {
  const section = document.getElementById("hero-section");
  const eyebrow = document.querySelector<HTMLElement>("span.hero-eyebrow");
  const subtitle = document.querySelector<HTMLElement>(".hero-subtitle");
  const cta = document.querySelector<HTMLElement>(".hero-cta");

  if (!section || !subtitle || !cta) return;

  const slides = collectSlides(section);
  const firstSlide = slides[0];
  if (!firstSlide || firstSlide.words.length === 0) return;

  cleanupHeroTextAnimation();

  // Respect prefers-reduced-motion: show the first headline only, no rotation.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.set([eyebrow, firstSlide.words, subtitle, cta].filter(Boolean), {
      y: 0,
      opacity: 1,
      scale: 1,
      clearProps: "all",
    });
    return;
  }

  // Play immediately upon page load — no scroll trigger needed for above-the-fold content!
  const tl = gsap.timeline({ delay: 0.1 });
  introTimeline = tl;

  if (eyebrow && eyebrow.innerText.trim().length > 0) {
    tl.fromTo(
      eyebrow,
      { y: "100%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 0.65, ease: "power3.out" },
      0,
    );
  }

  tl.fromTo(
    firstSlide.words,
    { y: "120%", opacity: 0 },
    {
      y: "0%",
      opacity: 1,
      duration: 0.85,
      stagger: 0.07,
      ease: "power4.out",
    },
    0.05,
  );

  tl.fromTo(
    subtitle,
    { y: 24, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
    0.28,
  );

  tl.fromTo(
    cta,
    { y: 20, opacity: 0, scale: 0.96 },
    { y: 0, opacity: 1, scale: 1, duration: 0.65, ease: "power3.out" },
    0.45,
  );

  if (slides.length > 1) {
    rotatorTimeline = buildRotator(slides);
    tl.call(() => rotatorTimeline?.play());
  }
}
