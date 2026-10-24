import gsap from "gsap";

/**
 * ANIMATION TIMING & FLEX-GROW CONFIGURATION
 * Control fixed-height stretch ratios and durations:
 */
export const ACCORDION_CONFIG = {
  expandDuration: 0.55,    // <--- Expand duration
  collapseDuration: 0.55,  // <--- Return to equal height duration
  activeFlexGrow: 3.8,     // <--- Active card stretch ratio (~270px in 520px box)
  idleFlexGrow: 1.0,       // <--- Equal height ratio for inactive cards (~70px active / ~120px idle)
  bgZoomScale: 1.15,       // <--- Zoom effect on the hovered card's background
  leaveDelay: 100,         // <--- Delay (ms) before returning to equal heights
  expandEase: "power2.out",
  collapseEase: "power2.inOut",
};

let activeCleanup: (() => void) | null = null;

function lockNavbar() {
  if (typeof window !== "undefined") {
    (window as any).__accordionAnimating = true;
    if ((window as any).__accordionLockTimeout) {
      clearTimeout((window as any).__accordionLockTimeout);
    }
    (window as any).__accordionLockTimeout = setTimeout(() => {
      (window as any).__accordionAnimating = false;
    }, 700);
  }
}

export function cleanupEngineeredAccordion() {
  if (activeCleanup) {
    activeCleanup();
    activeCleanup = null;
  }
  gsap.killTweensOf(
    ".accordion-card, .card-expanded-content, .card-expanded-inner, .card-title, .card-bg-img, .card-chevron"
  );
}

export function initEngineeredAccordionAnimation() {
  cleanupEngineeredAccordion();

  const container = document.querySelector<HTMLElement>("#engineering-accordion");
  if (!container) return;

  const cards = Array.from(container.querySelectorAll<HTMLElement>(".accordion-card"));
  if (!cards.length) return;

  const checkIsMobile = () => window.matchMedia("(max-width: 1023px)").matches;

  let activeIndex = -1;
  let leaveTimeout: ReturnType<typeof setTimeout> | null = null;

  function resetAllCards(animate = true) {
    activeIndex = -1;
    if (animate) lockNavbar();

    const isMobile = checkIsMobile();

    cards.forEach((card) => {
      card.setAttribute("aria-expanded", "false");
      card.classList.remove("is-active");
      card.classList.add("is-inactive");

      const desc = card.querySelector<HTMLElement>(".card-expanded-content");
      const inner = card.querySelector<HTMLElement>(".card-expanded-inner");
      const title = card.querySelector<HTMLElement>(".card-title");
      const bgImg = card.querySelector<HTMLElement>(".card-bg-img");
      const chevron = card.querySelector<HTMLElement>(".card-chevron");

      if (animate) {
        // Return all cards smoothly to equal height (desktop only)
        if (!isMobile) {
          gsap.to(card, {
            flexGrow: ACCORDION_CONFIG.idleFlexGrow,
            duration: ACCORDION_CONFIG.collapseDuration,
            ease: ACCORDION_CONFIG.collapseEase,
            overwrite: "auto",
          });
        }

        // Return background image to normal scale
        if (bgImg) {
          gsap.to(bgImg, {
            scale: 1.0,
            duration: ACCORDION_CONFIG.collapseDuration,
            ease: "power2.inOut",
            overwrite: "auto",
          });
        }

        // Hide description with smooth slide & height collapse
        if (desc) {
          gsap.killTweensOf(desc);
          if (inner) gsap.killTweensOf(inner);

          if (isMobile) {
            if (inner) {
              gsap.to(inner, {
                y: -8,
                opacity: 0,
                duration: 0.22,
                ease: "power2.in",
                overwrite: "auto",
              });
            }
            gsap.to(desc, {
              height: 0,
              opacity: 0,
              duration: 0.38,
              ease: "power2.inOut",
              overwrite: "auto",
            });
          } else {
            if (inner) {
              gsap.to(inner, {
                y: -6,
                opacity: 0,
                duration: 0.2,
                ease: "power2.in",
                overwrite: "auto",
              });
            }
            gsap.to(desc, {
              height: 0,
              opacity: 0,
              duration: 0.25,
              ease: "power2.in",
              overwrite: "auto",
            });
          }
        }

        if (title) {
          gsap.to(title, {
            scale: 1.0,
            duration: 0.25,
            ease: "power2.out",
            overwrite: "auto",
          });
        }

        if (chevron) {
          gsap.to(chevron, {
            rotation: 0,
            scale: 1.0,
            duration: 0.35,
            ease: "power2.inOut",
            overwrite: "auto",
          });
        }
      } else {
        // Initial instant state: equal heights
        if (!isMobile) gsap.set(card, { flexGrow: ACCORDION_CONFIG.idleFlexGrow });
        if (bgImg) gsap.set(bgImg, { scale: 1.0 });
        if (desc) {
          gsap.set(desc, { height: 0, opacity: 0 });
          if (inner) gsap.set(inner, { y: -8, opacity: 0 });
        }
        if (title) gsap.set(title, { scale: 1.0 });
        if (chevron) gsap.set(chevron, { rotation: 0, scale: 1.0 });
      }
    });
  }

  function setActiveCard(index: number, animate = true) {
    if (index === activeIndex && animate) return;
    activeIndex = index;
    if (animate) lockNavbar();

    const isMobile = checkIsMobile();

    cards.forEach((card, i) => {
      const isTarget = i === index;
      const desc = card.querySelector<HTMLElement>(".card-expanded-content");
      const inner = card.querySelector<HTMLElement>(".card-expanded-inner");
      const title = card.querySelector<HTMLElement>(".card-title");
      const bgImg = card.querySelector<HTMLElement>(".card-bg-img");
      const chevron = card.querySelector<HTMLElement>(".card-chevron");

      card.setAttribute("aria-expanded", isTarget ? "true" : "false");

      if (isTarget) {
        card.classList.add("is-active");
        card.classList.remove("is-inactive");
      } else {
        card.classList.remove("is-active");
        card.classList.add("is-inactive");
      }

      const targetFlexGrow = isTarget
        ? ACCORDION_CONFIG.activeFlexGrow
        : ACCORDION_CONFIG.idleFlexGrow;

      if (animate) {
        // 1. Stretch active card & shrink other cards (desktop only)
        if (!isMobile) {
          gsap.to(card, {
            flexGrow: targetFlexGrow,
            duration: isTarget ? ACCORDION_CONFIG.expandDuration : ACCORDION_CONFIG.collapseDuration,
            ease: isTarget ? ACCORDION_CONFIG.expandEase : ACCORDION_CONFIG.collapseEase,
            overwrite: "auto",
          });
        }

        // 2. Zoom background image ONLY on the hovered/active card
        if (bgImg) {
          gsap.to(bgImg, {
            scale: isTarget ? ACCORDION_CONFIG.bgZoomScale : 1.0,
            duration: isTarget
              ? ACCORDION_CONFIG.expandDuration + 0.1
              : ACCORDION_CONFIG.collapseDuration,
            ease: isTarget ? "power2.out" : "power2.inOut",
            overwrite: "auto",
          });
        }

        // 3. Smooth height & content motion
        if (desc) {
          gsap.killTweensOf(desc);
          if (inner) gsap.killTweensOf(inner);

          if (isTarget) {
            if (isMobile) {
              gsap.fromTo(
                desc,
                { height: 0, opacity: 0 },
                {
                  height: "auto",
                  opacity: 1,
                  duration: 0.45,
                  ease: "power2.out",
                  overwrite: "auto",
                }
              );
              if (inner) {
                gsap.fromTo(
                  inner,
                  { y: -12, opacity: 0 },
                  {
                    y: 0,
                    opacity: 1,
                    duration: 0.38,
                    delay: 0.06,
                    ease: "power2.out",
                    overwrite: "auto",
                  }
                );
              }
            } else {
              gsap.to(desc, {
                height: "auto",
                opacity: 1,
                duration: 0.35,
                delay: 0.05,
                ease: "power2.out",
                overwrite: "auto",
              });
              if (inner) {
                gsap.fromTo(
                  inner,
                  { y: 8, opacity: 0 },
                  {
                    y: 0,
                    opacity: 1,
                    duration: 0.35,
                    delay: 0.08,
                    ease: "power2.out",
                    overwrite: "auto",
                  }
                );
              }
            }
          } else {
            // Inactive card closing
            if (isMobile) {
              if (inner) {
                gsap.to(inner, {
                  y: -8,
                  opacity: 0,
                  duration: 0.22,
                  ease: "power2.in",
                  overwrite: "auto",
                });
              }
              gsap.to(desc, {
                height: 0,
                opacity: 0,
                duration: 0.38,
                ease: "power2.inOut",
                overwrite: "auto",
              });
            } else {
              if (inner) {
                gsap.to(inner, {
                  y: -6,
                  opacity: 0,
                  duration: 0.2,
                  ease: "power2.in",
                  overwrite: "auto",
                });
              }
              gsap.to(desc, {
                height: 0,
                opacity: 0,
                duration: 0.25,
                ease: "power2.in",
                overwrite: "auto",
              });
            }
          }
        }

        // 4. Subtle title accent
        if (title) {
          gsap.to(title, {
            scale: isTarget ? 1.02 : 1.0,
            transformOrigin: "left center",
            duration: 0.25,
            ease: "power2.out",
            overwrite: "auto",
          });
        }

        // 5. Rotate chevron indicator with spring
        if (chevron) {
          gsap.to(chevron, {
            rotation: isTarget ? 180 : 0,
            scale: isTarget ? 1.15 : 1.0,
            duration: 0.4,
            ease: isTarget ? "back.out(1.8)" : "power2.inOut",
            overwrite: "auto",
          });
        }
      } else {
        // Immediate setup
        if (!isMobile) gsap.set(card, { flexGrow: targetFlexGrow });
        if (bgImg) gsap.set(bgImg, { scale: isTarget ? ACCORDION_CONFIG.bgZoomScale : 1.0 });
        if (desc) {
          if (isTarget) {
            gsap.set(desc, { height: "auto", opacity: 1 });
            if (inner) gsap.set(inner, { y: 0, opacity: 1 });
          } else {
            gsap.set(desc, { height: 0, opacity: 0 });
            if (inner) gsap.set(inner, { y: -8, opacity: 0 });
          }
        }
        if (title) gsap.set(title, { scale: isTarget ? 1.02 : 1.0 });
        if (chevron) gsap.set(chevron, { rotation: isTarget ? 180 : 0, scale: isTarget ? 1.15 : 1.0 });
      }
    });
  }

  // Initial state: all cards at equal height, none active
  resetAllCards(false);

  const listeners: Array<{ el: HTMLElement; event: string; fn: EventListener }> = [];

  const isTouchOrMobile =
    window.matchMedia("(max-width: 1023px)").matches ||
    window.matchMedia("(hover: none)").matches ||
    "ontouchstart" in window;

  cards.forEach((card, i) => {
    // Click toggle works everywhere: touch, mobile, and desktop
    const onClick = (e: Event) => {
      e.stopPropagation();
      (card as HTMLElement).focus?.({ preventScroll: true });
      if (leaveTimeout) {
        clearTimeout(leaveTimeout);
        leaveTimeout = null;
      }
      if (activeIndex === i) {
        resetAllCards(true);
      } else {
        setActiveCard(i, true);
      }
    };

    card.addEventListener("click", onClick);
    listeners.push({ el: card, event: "click", fn: onClick });

    // Desktop only: hover & focus interactions
    if (!isTouchOrMobile) {
      const onEnter = () => {
        if (leaveTimeout) {
          clearTimeout(leaveTimeout);
          leaveTimeout = null;
        }
        setActiveCard(i, true);
      };

      const onLeave = () => {
        if (leaveTimeout) clearTimeout(leaveTimeout);
        leaveTimeout = setTimeout(() => {
          resetAllCards(true);
        }, ACCORDION_CONFIG.leaveDelay);
      };

      const onFocus = () => {
        if (leaveTimeout) {
          clearTimeout(leaveTimeout);
          leaveTimeout = null;
        }
        setActiveCard(i, true);
      };

      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);
      card.addEventListener("focus", onFocus);

      listeners.push(
        { el: card, event: "mouseenter", fn: onEnter },
        { el: card, event: "mouseleave", fn: onLeave },
        { el: card, event: "focus", fn: onFocus }
      );
    }
  });

  // Desktop only: container leave collapse
  if (!isTouchOrMobile) {
    const onContainerLeave = () => {
      if (leaveTimeout) clearTimeout(leaveTimeout);
      leaveTimeout = setTimeout(() => {
        resetAllCards(true);
      }, ACCORDION_CONFIG.leaveDelay);
    };

    container.addEventListener("mouseleave", onContainerLeave);
    listeners.push({ el: container, event: "mouseleave", fn: onContainerLeave });

    const onContainerFocusOut = (e: FocusEvent) => {
      if (!container.contains(e.relatedTarget as Node)) {
        resetAllCards(true);
      }
    };
    container.addEventListener("focusout", onContainerFocusOut as EventListener);
    listeners.push({ el: container, event: "focusout", fn: onContainerFocusOut as EventListener });
  }

  activeCleanup = () => {
    if (leaveTimeout) {
      clearTimeout(leaveTimeout);
      leaveTimeout = null;
    }
    listeners.forEach(({ el, event, fn }) => el.removeEventListener(event, fn));
  };
}
