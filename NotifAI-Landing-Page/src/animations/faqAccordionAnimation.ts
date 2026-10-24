import gsap from "gsap";

/**
 * FAQ ACCORDION TIMING & FLEX-GROW CONFIGURATION
 */
export const FAQ_CONFIG = {
  expandDuration: 0.5,     // Duration of stretch animation
  collapseDuration: 0.5,   // Duration of return to equal height
  activeFlexGrow: 3.5,     // Active item stretch ratio (~210px in 560px box)
  idleFlexGrow: 1.0,       // Equal height ratio for idle/inactive items (~60px-85px)
  leaveDelay: 100,         // Delay (ms) before returning to equal heights
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

export function cleanupFaqAccordion() {
  if (activeCleanup) {
    activeCleanup();
    activeCleanup = null;
  }
  gsap.killTweensOf(".faq-item, .faq-answer, .faq-answer-inner, .faq-icon, .faq-question");
}

export function initFaqAccordionAnimation() {
  cleanupFaqAccordion();

  const container = document.querySelector<HTMLElement>("#faq-accordion");
  if (!container) return;

  const items = Array.from(container.querySelectorAll<HTMLElement>(".faq-item"));
  if (!items.length) return;

  const checkIsMobile = () => window.matchMedia("(max-width: 1023px)").matches;

  let activeIndex = -1;
  let leaveTimeout: ReturnType<typeof setTimeout> | null = null;

  function resetAllFaqs(animate = true) {
    activeIndex = -1;
    if (animate) lockNavbar();

    const isMobile = checkIsMobile();

    items.forEach((item) => {
      item.setAttribute("aria-expanded", "false");
      item.classList.remove("is-active");
      item.classList.add("is-inactive");

      const answer = item.querySelector<HTMLElement>(".faq-answer");
      const inner = item.querySelector<HTMLElement>(".faq-answer-inner");
      const icon = item.querySelector<HTMLElement>(".faq-icon");

      if (animate) {
        if (!isMobile) {
          gsap.to(item, {
            flexGrow: FAQ_CONFIG.idleFlexGrow,
            duration: FAQ_CONFIG.collapseDuration,
            ease: FAQ_CONFIG.collapseEase,
            overwrite: "auto",
          });
        }

        if (icon) {
          gsap.to(icon, {
            rotation: 0,
            scale: 1.0,
            duration: 0.35,
            ease: "power2.inOut",
            overwrite: "auto",
          });
        }

        if (answer) {
          gsap.killTweensOf(answer);
          if (inner) gsap.killTweensOf(inner);

          if (isMobile) {
            if (inner) {
              gsap.to(inner, {
                y: -6,
                opacity: 0,
                duration: 0.22,
                ease: "power2.in",
                overwrite: "auto",
              });
            }
            gsap.to(answer, {
              height: 0,
              opacity: 0,
              duration: 0.38,
              ease: "power2.inOut",
              overwrite: "auto",
            });
          } else {
            if (inner) {
              gsap.to(inner, {
                y: -4,
                opacity: 0,
                duration: 0.2,
                ease: "power2.in",
                overwrite: "auto",
              });
            }
            gsap.to(answer, {
              height: 0,
              opacity: 0,
              duration: 0.22,
              ease: "power2.in",
              overwrite: "auto",
            });
          }
        }
      } else {
        if (!isMobile) gsap.set(item, { flexGrow: FAQ_CONFIG.idleFlexGrow });
        if (icon) gsap.set(icon, { rotation: 0, scale: 1.0 });
        if (answer) {
          gsap.set(answer, { height: 0, opacity: 0 });
          if (inner) gsap.set(inner, { y: -6, opacity: 0 });
        }
      }
    });
  }

  function setActiveFaq(index: number, animate = true) {
    if (index === activeIndex && animate) return;
    activeIndex = index;
    if (animate) lockNavbar();

    const isMobile = checkIsMobile();

    items.forEach((item, i) => {
      const isTarget = i === index;
      const answer = item.querySelector<HTMLElement>(".faq-answer");
      const inner = item.querySelector<HTMLElement>(".faq-answer-inner");
      const icon = item.querySelector<HTMLElement>(".faq-icon");

      item.setAttribute("aria-expanded", isTarget ? "true" : "false");

      if (isTarget) {
        item.classList.add("is-active");
        item.classList.remove("is-inactive");
      } else {
        item.classList.remove("is-active");
        item.classList.add("is-inactive");
      }

      const targetFlexGrow = isTarget ? FAQ_CONFIG.activeFlexGrow : FAQ_CONFIG.idleFlexGrow;

      if (animate) {
        // Desktop only: stretch active item & shrink other items
        if (!isMobile) {
          gsap.to(item, {
            flexGrow: targetFlexGrow,
            duration: isTarget ? FAQ_CONFIG.expandDuration : FAQ_CONFIG.collapseDuration,
            ease: isTarget ? FAQ_CONFIG.expandEase : FAQ_CONFIG.collapseEase,
            overwrite: "auto",
          });
        }

        if (icon) {
          gsap.to(icon, {
            rotation: isTarget ? 45 : 0,
            scale: isTarget ? 1.2 : 1.0,
            duration: 0.38,
            ease: isTarget ? "back.out(1.8)" : "power2.inOut",
            overwrite: "auto",
          });
        }

        if (answer) {
          gsap.killTweensOf(answer);
          if (inner) gsap.killTweensOf(inner);

          if (isTarget) {
            if (isMobile) {
              gsap.fromTo(
                answer,
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
                  { y: -10, opacity: 0 },
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
              gsap.to(answer, {
                height: "auto",
                opacity: 1,
                duration: 0.32,
                delay: 0.05,
                ease: "power2.out",
                overwrite: "auto",
              });
              if (inner) {
                gsap.fromTo(
                  inner,
                  { y: 6, opacity: 0 },
                  {
                    y: 0,
                    opacity: 1,
                    duration: 0.32,
                    delay: 0.08,
                    ease: "power2.out",
                    overwrite: "auto",
                  }
                );
              }
            }
          } else {
            // Inactive item closing
            if (isMobile) {
              if (inner) {
                gsap.to(inner, {
                  y: -6,
                  opacity: 0,
                  duration: 0.22,
                  ease: "power2.in",
                  overwrite: "auto",
                });
              }
              gsap.to(answer, {
                height: 0,
                opacity: 0,
                duration: 0.38,
                ease: "power2.inOut",
                overwrite: "auto",
              });
            } else {
              if (inner) {
                gsap.to(inner, {
                  y: -4,
                  opacity: 0,
                  duration: 0.2,
                  ease: "power2.in",
                  overwrite: "auto",
                });
              }
              gsap.to(answer, {
                height: 0,
                opacity: 0,
                duration: 0.2,
                ease: "power2.in",
                overwrite: "auto",
              });
            }
          }
        }
      } else {
        if (!isMobile) gsap.set(item, { flexGrow: targetFlexGrow });
        if (icon) gsap.set(icon, { rotation: isTarget ? 45 : 0, scale: isTarget ? 1.2 : 1.0 });
        if (answer) {
          if (isTarget) {
            gsap.set(answer, { height: "auto", opacity: 1 });
            if (inner) gsap.set(inner, { y: 0, opacity: 1 });
          } else {
            gsap.set(answer, { height: 0, opacity: 0 });
            if (inner) gsap.set(inner, { y: -6, opacity: 0 });
          }
        }
      }
    });
  }

  // Initial state: all equal
  resetAllFaqs(false);

  const listeners: Array<{ el: HTMLElement; event: string; fn: EventListener }> = [];

  const isTouchOrMobile =
    window.matchMedia("(max-width: 1023px)").matches ||
    window.matchMedia("(hover: none)").matches ||
    "ontouchstart" in window;

  items.forEach((item, i) => {
    // Click toggle works everywhere: touch, mobile, and desktop
    const onClick = (e: Event) => {
      e.stopPropagation();
      (item as HTMLElement).focus?.({ preventScroll: true });
      if (leaveTimeout) {
        clearTimeout(leaveTimeout);
        leaveTimeout = null;
      }
      if (activeIndex === i) {
        resetAllFaqs(true);
      } else {
        setActiveFaq(i, true);
      }
    };

    item.addEventListener("click", onClick);
    listeners.push({ el: item, event: "click", fn: onClick });

    // Desktop only: hover & focus interactions
    if (!isTouchOrMobile) {
      const onEnter = () => {
        if (leaveTimeout) {
          clearTimeout(leaveTimeout);
          leaveTimeout = null;
        }
        setActiveFaq(i, true);
      };

      const onLeave = () => {
        if (leaveTimeout) clearTimeout(leaveTimeout);
        leaveTimeout = setTimeout(() => {
          resetAllFaqs(true);
        }, FAQ_CONFIG.leaveDelay);
      };

      const onFocus = () => {
        if (leaveTimeout) {
          clearTimeout(leaveTimeout);
          leaveTimeout = null;
        }
        setActiveFaq(i, true);
      };

      item.addEventListener("mouseenter", onEnter);
      item.addEventListener("mouseleave", onLeave);
      item.addEventListener("focus", onFocus);

      listeners.push(
        { el: item, event: "mouseenter", fn: onEnter },
        { el: item, event: "mouseleave", fn: onLeave },
        { el: item, event: "focus", fn: onFocus }
      );
    }
  });

  // Desktop only: container leave collapse
  if (!isTouchOrMobile) {
    const onContainerLeave = () => {
      if (leaveTimeout) clearTimeout(leaveTimeout);
      leaveTimeout = setTimeout(() => {
        resetAllFaqs(true);
      }, FAQ_CONFIG.leaveDelay);
    };

    container.addEventListener("mouseleave", onContainerLeave);
    listeners.push({ el: container, event: "mouseleave", fn: onContainerLeave });

    const onContainerFocusOut = (e: FocusEvent) => {
      if (!container.contains(e.relatedTarget as Node)) {
        resetAllFaqs(true);
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
