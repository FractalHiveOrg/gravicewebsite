import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function pulseWorkflowCard(container: Element | HTMLElement | null) {
  if (!container) return;

  // Target the top badge (EVENT, NICO INTELLIGENCE, VALIDATIONS, RULES, AUTO ROUTE, ACTION, HUMAN REVIEW)
  const badge = (container.querySelector(".primary-bg-color") ||
    container.querySelector("span:first-child")) as HTMLElement | null;

  if (badge) {
    const now = Date.now();
    const lastPulse = Number(badge.dataset.wfLastPulse || 0);
    if (now - lastPulse < 800) return;
    badge.dataset.wfLastPulse = String(now);

    gsap.killTweensOf(badge);

    gsap
      .timeline({
        onComplete: () => {
          gsap.set(badge, { scale: 1, clearProps: "boxShadow,scale" });
        },
      })
      .to(badge, {
        scale: 1.2,
        boxShadow: "0 2px 10px rgba(30, 58, 95, 0.4)",
        duration: 0.2,
        ease: "power2.out",
        transformOrigin: "center bottom",
      })
      .to(badge, {
        scale: 1,
        duration: 0.22,
        ease: "power2.inOut",
        clearProps: "boxShadow,scale",
      });
    return;
  }

  // Fallback for nodes without a top badge (e.g. final Success node)
  const node = (container.querySelector("[style*='linear-gradient']") ||
    container) as HTMLElement;
  if (node) {
    gsap.killTweensOf(node);
    gsap
      .timeline({
        onComplete: () => {
          gsap.set(node, { scale: 1, clearProps: "scale" });
        },
      })
      .to(node, {
        scale: 1.05,
        duration: 0.18,
        ease: "power2.out",
        transformOrigin: "center center",
      })
      .to(node, {
        scale: 1,
        duration: 0.22,
        ease: "power2.inOut",
        clearProps: "scale",
      });
  }
}

function handleCardEntrance(
  container: Element | HTMLElement | null,
  isForward = true,
) {
  if (!container) return;
  const target = (container.querySelector(".primary-bg-color") ||
    container.querySelector("span:first-child") ||
    container.querySelector("[style*='linear-gradient']") ||
    container) as HTMLElement;
  if (!target) return;

  if (isForward) {
    pulseWorkflowCard(container);
  } else {
    gsap.killTweensOf(target);
    gsap.set(target, { scale: 1, clearProps: "boxShadow,scale" });
  }
}

export function initWorkflowAnimation() {
  const section = document.getElementById("workflow-section");
  if (!section) return;

  const canvasCard =
    document.getElementById("workflow-canvas-card") ||
    (section.querySelector(".canvas-grid")?.parentElement as HTMLElement | null) ||
    section;

  ScrollTrigger.getById("workflow-scroll-pin")?.kill();
  ScrollTrigger.getById("workflow-view-trigger")?.kill();
  ScrollTrigger.getById("workflow-mobile-step1")?.kill();
  ScrollTrigger.getById("workflow-mobile-step2")?.kill();
  ScrollTrigger.getById("workflow-mobile-step3")?.kill();
  ScrollTrigger.getById("workflow-mobile-step4")?.kill();
  ScrollTrigger.getById("workflow-mobile-auto")?.kill();
  ScrollTrigger.getById("workflow-mobile-erp")?.kill();
  ScrollTrigger.getById("workflow-mobile-review")?.kill();
  ScrollTrigger.getById("workflow-mobile-success")?.kill();
  gsap.getById("workflow-branch-loop")?.kill();

  const step1 = section.querySelector('[data-wf-step="1"]');
  const step2 = section.querySelector('[data-wf-step="2"]');
  const step3 = section.querySelector('[data-wf-step="3"]');
  const step4 = section.querySelector('[data-wf-step="4"]');
  const popup = section.querySelector("[data-wf-popup]");

  const lines = section.querySelectorAll("[data-wf-line]");
  const hLines = section.querySelectorAll("[data-wf-h-conn]");

  const maskStem = document.getElementById("mask-stem");
  const maskLeft = document.getElementById("mask-left-fork");
  const maskRight = document.getElementById("mask-right-fork");

  const badgeNo = section.querySelector('[data-wf-badge="no"]');
  const badgeYes = section.querySelector('[data-wf-badge="yes"]');

  const nodeAuto = section.querySelector('[data-wf-node="auto"]');
  const nodeErp = section.querySelector('[data-wf-node="erp"]');
  const nodeReview = section.querySelector('[data-wf-node="review"]');
  const nodeSuccess = section.querySelector('[data-wf-node="success"]');
  const footnote = section.querySelector("[data-wf-footnote]");

  // Status badges: completed green checkmarks and review indicator
  const check1 = section.querySelector('[data-wf-check="1"]');
  const check2 = section.querySelector('[data-wf-check="2"]');
  const check3 = section.querySelector('[data-wf-check="3"]');
  const check4 = section.querySelector('[data-wf-check="4"]');
  const checkErp = section.querySelector('[data-wf-check="erp"]');
  const checkReview = section.querySelector('[data-wf-check="review"]');
  const allChecks = [
    check1,
    check2,
    check3,
    check4,
    checkErp,
    checkReview,
  ].filter(Boolean);

  const pulse1 = section.querySelector('[data-wf-pulse="1"]');
  const pulse2 = section.querySelector('[data-wf-pulse="2"]');
  const pulse3 = section.querySelector('[data-wf-pulse="3"]');
  const pulseForkLeft = section.querySelector('[data-wf-fork-pulse="left"]');
  const pulseForkRight = section.querySelector('[data-wf-fork-pulse="right"]');
  const pulseH1 = section.querySelector('[data-wf-pulse="h1"]');
  const pulseH2 = section.querySelector('[data-wf-pulse="h2"]');
  const allPulses = [
    pulse1,
    pulse2,
    pulse3,
    pulseForkLeft,
    pulseForkRight,
    pulseH1,
    pulseH2,
  ].filter(Boolean);

  if (!step1 || !step2 || !step3 || !step4) return;

  const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReduced) {
    gsap.set(
      [
        step1,
        step2,
        step3,
        step4,
        popup,
        nodeAuto,
        nodeErp,
        nodeReview,
        nodeSuccess,
        footnote,
      ],
      { autoAlpha: 1, y: 0, x: 0, scale: 1 },
    );
    gsap.set(allChecks, { autoAlpha: 1, scale: 1 });
    gsap.set(lines, { clipPath: "inset(0% 0% 0% 0%)" });
    gsap.set(hLines, { clipPath: "inset(0% 0% 0% 0%)" });
    if (maskStem) gsap.set(maskStem, { strokeDashoffset: 0 });
    if (maskLeft) gsap.set(maskLeft, { strokeDashoffset: 0 });
    if (maskRight) gsap.set(maskRight, { strokeDashoffset: 0 });
    gsap.set([badgeNo, badgeYes], { autoAlpha: 1, scale: 1 });
    gsap.set(allPulses, { autoAlpha: 0 });
    return;
  }

  // --- Sub-elements for branch pulses & badge highlights ---
  const rightTail = pulseForkRight?.querySelector(".wf-fork-tail-r");
  const rightBody = pulseForkRight?.querySelector(".wf-fork-body-r");
  const rightHead = pulseForkRight?.querySelector(".wf-fork-head-r");

  const badgeYesSpan = badgeYes?.querySelector("span");

  // Initial resets for fork & horizontal branch pulses
  gsap.set([pulseForkLeft, pulseForkRight], { autoAlpha: 0 });
  gsap.set([pulseH1, pulseH2], { autoAlpha: 0, x: -22, opacity: 0 });
  if (rightTail) gsap.set(rightTail, { strokeDashoffset: 28 });
  if (rightBody) gsap.set(rightBody, { strokeDashoffset: 16 });
  if (rightHead) gsap.set(rightHead, { strokeDashoffset: 8 });

  if (isDesktop) {
    // --- Desktop: Pinned scrub animation ---
    // Step 1 starts hidden on desktop until the hero card lands on it
    gsap.set(step1, { autoAlpha: 0, y: 0 });

    // Remaining steps start hidden
    gsap.set([step2, step3, step4], { autoAlpha: 0, y: 24 });
    gsap.set(popup, { autoAlpha: 0, x: 25, scale: 0.96 });
    gsap.set(lines, { clipPath: "inset(0% 0% 100% 0%)" });
    gsap.set(hLines, { clipPath: "inset(0% 100% 0% 0%)" });

    if (maskStem) gsap.set(maskStem, { strokeDashoffset: 18 });
    if (maskLeft) gsap.set(maskLeft, { strokeDashoffset: 260 });
    if (maskRight) gsap.set(maskRight, { strokeDashoffset: 190 });

    gsap.set([badgeNo, badgeYes], { autoAlpha: 0, scale: 0.5 });
    gsap.set([nodeAuto, nodeErp, nodeReview], { autoAlpha: 0, y: 24 });
    gsap.set(nodeSuccess, { autoAlpha: 0, scale: 0.88 });
    if (footnote) gsap.set(footnote, { autoAlpha: 0, y: 16 });

    // All pulse sticks start hidden until their connector segment is active
    gsap.set(allPulses, { autoAlpha: 0 });

    // Checkmarks and review badge start hidden & scaled down
    gsap.set(allChecks, { autoAlpha: 0, scale: 0.4 });

    const tl = gsap.timeline({
      id: "workflow-scroll-pin",
      scrollTrigger: {
        trigger: canvasCard,
        start: "top 80px",
        end: "+=4000",
        pin: canvasCard,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    const isForward = () => !tl.scrollTrigger || tl.scrollTrigger.direction >= 0;

    // 1. Step 1: Event receives green checkmark as user starts scrolling workflow
    tl.to(check1, {
      autoAlpha: 1,
      scale: 1,
      duration: 0.35,
      ease: "back.out(2)",
    })
      // 2. Connector 1 draws down dash by dash
      .to(lines[0], {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.45,
        ease: "none",
      })
      // Connector 1 live stick pulses down to Step 2
      .to(pulse1, { autoAlpha: 1, duration: 0.15 }, "-=0.2")
      // 3. Step 2: NICO INTELLIGENCE appears
      .to(step2, {
        autoAlpha: 1,
        y: 0,
        duration: 0.55,
        ease: "power2.out",
      })
      .call(() => handleCardEntrance(step2, isForward()), [], ">-0.1")
      // Step 2 finishes -> receives green checkmark!
      .to(check2, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.35,
        ease: "back.out(2)",
      })
      // Once Step 2 is finished, hide Connector 1 live stick
      .to(pulse1, { autoAlpha: 0, duration: 0.2 }, "<")

      // 4. Connector 2 draws down dash by dash
      .to(lines[1], {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.45,
        ease: "none",
      })
      // Connector 2 live stick pulses down to Step 3
      .to(pulse2, { autoAlpha: 1, duration: 0.15 }, "-=0.2")
      // 5. Step 3: VALIDATIONS appears
      .to(step3, {
        autoAlpha: 1,
        y: 0,
        duration: 0.55,
        ease: "power2.out",
      })
      .call(() => handleCardEntrance(step3, isForward()), [], ">-0.1")
      // Step 3 finishes -> receives green checkmark!
      .to(check3, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.35,
        ease: "back.out(2)",
      })
      // Once Step 3 is finished, hide Connector 2 live stick
      .to(pulse2, { autoAlpha: 0, duration: 0.2 }, "<")

      // 6. Connector 3 draws down dash by dash
      .to(lines[2], {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.45,
        ease: "none",
      })
      // Connector 3 live stick pulses down to Step 4
      .to(pulse3, { autoAlpha: 1, duration: 0.15 }, "-=0.2")
      // 7. Step 4: RULES card appears
      .to(step4, {
        autoAlpha: 1,
        y: 0,
        duration: 0.55,
        ease: "power2.out",
      })
      .call(() => handleCardEntrance(step4, isForward()), [], ">-0.1")
      // Step 4 finishes -> receives green checkmark!
      .to(check4, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.35,
        ease: "back.out(2)",
      })
      // Once Step 4 is finished, hide Connector 3 live stick
      .to(pulse3, { autoAlpha: 0, duration: 0.2 }, "<")

      // 8. Rule Settings popup slides in smoothly from the right
      .to(
        popup,
        {
          autoAlpha: 1,
          x: 0,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.15",
      )

      // 9. Fork: Center stem draws down
      .to(maskStem, {
        strokeDashoffset: 0,
        duration: 0.35,
        ease: "none",
      })
      // 10. Fork: Left and Right branches draw outward
      .to(
        maskLeft,
        {
          strokeDashoffset: 0,
          duration: 0.65,
          ease: "none",
        },
        "fork-branch",
      )
      .to(
        maskRight,
        {
          strokeDashoffset: 0,
          duration: 0.65,
          ease: "none",
        },
        "fork-branch",
      )
      // 11. Badges NO and YES pop in
      .to(
        [badgeNo, badgeYes],
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.35,
          stagger: 0.08,
          ease: "back.out(1.8)",
        },
        "-=0.25",
      )
      // 12. Bottom nodes: Auto-process & Create ERP appear
      .to(
        [nodeAuto, nodeErp],
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.1",
      )
      .call(
        () => {
          const fwd = isForward();
          handleCardEntrance(nodeAuto, fwd);
          handleCardEntrance(nodeErp, fwd);
        },
        [],
        ">-0.1",
      )
      // Live stick flows down YES fork to ERP
      .set(pulseForkRight, { autoAlpha: 1 }, "-=0.4")
      .fromTo(
        rightTail,
        { strokeDashoffset: 28 },
        { strokeDashoffset: -202, duration: 0.6, ease: "power1.inOut" },
        "-=0.4",
      )
      .fromTo(
        rightBody,
        { strokeDashoffset: 16 },
        { strokeDashoffset: -214, duration: 0.6, ease: "power1.inOut" },
        "<",
      )
      .fromTo(
        rightHead,
        { strokeDashoffset: 8 },
        { strokeDashoffset: -222, duration: 0.6, ease: "power1.inOut" },
        "<",
      )
      .call(() => badgeYesSpan?.classList.add("wf-badge-active"), [], "<0.3")
      .call(() => badgeYesSpan?.classList.remove("wf-badge-active"), [], ">0.3")

      // Step ERP finishes -> receives green checkmark!
      .to(checkErp, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.35,
        ease: "back.out(2)",
      })
      // Once ERP is finished, hide fork live stick!
      .to(pulseForkRight, { autoAlpha: 0, duration: 0.2 }, "<")

      // 13. Horizontal Connector 1 draws from ERP to Finance approval
      .to(hLines[0], {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.4,
        ease: "none",
      })
      // Horizontal live stick 1 pulses towards Finance approval
      .set(pulseH1, { autoAlpha: 1, x: -22, opacity: 0 }, "-=0.2")
      .to(pulseH1, { x: 48, duration: 0.45, ease: "power1.inOut" }, "-=0.2")
      .to(pulseH1, { opacity: 1, duration: 0.12 }, "<")
      .to(pulseH1, { opacity: 0, duration: 0.12 }, "-=0.12")
      .set(pulseH1, { autoAlpha: 0 })

      // 14. Finance approval card appears
      .to(nodeReview, {
        autoAlpha: 1,
        y: 0,
        duration: 0.55,
        ease: "power2.out",
      })
      .call(() => handleCardEntrance(nodeReview, isForward()), [], ">-0.1")
      // Finance approval finishes -> receives green checkmark!
      .to(
        checkReview,
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.35,
          ease: "back.out(2)",
        },
        "-=0.2",
      )

      // 15. Horizontal Connector 2 draws between Finance approval and Success
      .to(hLines[1], {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.4,
        ease: "none",
      })
      // 16. Final Success node pops in
      .to(nodeSuccess, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.5)",
      })
      .call(() => handleCardEntrance(nodeSuccess, isForward()), [], ">-0.1");

    // 17. Footnote reveals (if element present)
    if (footnote) {
      tl.to(
        footnote,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.2",
      );
    }
  } else {
    // --- Mobile: Viewport Scroll Reveal with One-by-One Green Ticks ---
    const allAnimElements = [
      step1,
      step2,
      step3,
      step4,
      nodeAuto,
      nodeErp,
      nodeReview,
      nodeSuccess,
    ].filter(Boolean);

    gsap.set(allAnimElements, { autoAlpha: 0, y: 20 });
    gsap.set(lines, { clipPath: "inset(0% 0% 0% 0%)" });
    gsap.set(hLines, { clipPath: "inset(0% 0% 0% 0%)" });
    if (maskStem) gsap.set(maskStem, { strokeDashoffset: 0 });
    if (maskLeft) gsap.set(maskLeft, { strokeDashoffset: 0 });
    if (maskRight) gsap.set(maskRight, { strokeDashoffset: 0 });
    gsap.set([badgeNo, badgeYes], { autoAlpha: 1, scale: 1 });
    gsap.set(allChecks, { autoAlpha: 0, scale: 0.4 });
    gsap.set(allPulses, { autoAlpha: 0 });

    // Step 1:
    gsap.to(step1, {
      id: "workflow-mobile-step1",
      autoAlpha: 1,
      y: 0,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: step1,
        start: "top 85%",
        onEnter: () => {
          pulseWorkflowCard(step1);
          gsap.to(check1, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.35,
            ease: "back.out(2)",
          });
          gsap.set(pulse1, { autoAlpha: 1 });
        },
        onLeaveBack: () => {
          handleCardEntrance(step1, false);
          gsap.to(check1, { autoAlpha: 0, scale: 0.4, duration: 0.2 });
          gsap.set(pulse1, { autoAlpha: 0 });
        },
      },
    });

    // Step 2:
    gsap.to(step2, {
      id: "workflow-mobile-step2",
      autoAlpha: 1,
      y: 0,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: step2,
        start: "top 85%",
        onEnter: () => {
          pulseWorkflowCard(step2);
          gsap.to(check2, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.35,
            ease: "back.out(2)",
          });
          gsap.set(pulse1, { autoAlpha: 0 }); // Turn off live stick for finished Step 1
          gsap.set(pulse2, { autoAlpha: 1 });
        },
        onLeaveBack: () => {
          handleCardEntrance(step2, false);
          gsap.to(check2, { autoAlpha: 0, scale: 0.4, duration: 0.2 });
          gsap.set(pulse1, { autoAlpha: 1 });
          gsap.set(pulse2, { autoAlpha: 0 });
        },
      },
    });

    // Step 3:
    gsap.to(step3, {
      id: "workflow-mobile-step3",
      autoAlpha: 1,
      y: 0,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: step3,
        start: "top 85%",
        onEnter: () => {
          pulseWorkflowCard(step3);
          gsap.to(check3, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.35,
            ease: "back.out(2)",
          });
          gsap.set(pulse2, { autoAlpha: 0 }); // Turn off live stick for finished Step 2
          gsap.set(pulse3, { autoAlpha: 1 });
        },
        onLeaveBack: () => {
          handleCardEntrance(step3, false);
          gsap.to(check3, { autoAlpha: 0, scale: 0.4, duration: 0.2 });
          gsap.set(pulse2, { autoAlpha: 1 });
          gsap.set(pulse3, { autoAlpha: 0 });
        },
      },
    });

    // Step 4:
    gsap.to(step4, {
      id: "workflow-mobile-step4",
      autoAlpha: 1,
      y: 0,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: step4,
        start: "top 85%",
        onEnter: () => {
          pulseWorkflowCard(step4);
          gsap.to(check4, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.35,
            ease: "back.out(2)",
          });
          gsap.set(pulse3, { autoAlpha: 0 }); // Turn off live stick for finished Step 3
        },
        onLeaveBack: () => {
          handleCardEntrance(step4, false);
          gsap.to(check4, { autoAlpha: 0, scale: 0.4, duration: 0.2 });
          gsap.set(pulse3, { autoAlpha: 1 });
        },
      },
    });

    // Node Auto:
    gsap.to(nodeAuto, {
      id: "workflow-mobile-auto",
      autoAlpha: 1,
      y: 0,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: nodeAuto,
        start: "top 85%",
        onEnter: () => {
          pulseWorkflowCard(nodeAuto);
        },
        onLeaveBack: () => {
          handleCardEntrance(nodeAuto, false);
        },
      },
    });

    // Node ERP:
    gsap.to(nodeErp, {
      id: "workflow-mobile-erp",
      autoAlpha: 1,
      y: 0,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: nodeErp,
        start: "top 85%",
        onEnter: () => {
          pulseWorkflowCard(nodeErp);
          gsap.to(checkErp, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.35,
            ease: "back.out(2)",
          });
          gsap.set(pulseForkRight, { autoAlpha: 0 });
        },
        onLeaveBack: () => {
          handleCardEntrance(nodeErp, false);
          gsap.to(checkErp, { autoAlpha: 0, scale: 0.4, duration: 0.2 });
        },
      },
    });

    // Node Review:
    gsap.to(nodeReview, {
      id: "workflow-mobile-review",
      autoAlpha: 1,
      y: 0,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: nodeReview,
        start: "top 85%",
        onEnter: () => {
          pulseWorkflowCard(nodeReview);
          gsap.to(checkReview, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.35,
            ease: "back.out(2)",
          });
          gsap.set([pulseH1, pulseH2], { autoAlpha: 0 });
        },
        onLeaveBack: () => {
          handleCardEntrance(nodeReview, false);
          gsap.to(checkReview, { autoAlpha: 0, scale: 0.4, duration: 0.2 });
        },
      },
    });

    // Node Success:
    gsap.to(nodeSuccess, {
      id: "workflow-mobile-success",
      autoAlpha: 1,
      scale: 1,
      duration: 0.7,
      ease: "back.out(1.5)",
      scrollTrigger: {
        trigger: nodeSuccess,
        start: "top 85%",
        onEnter: () => {
          pulseWorkflowCard(nodeSuccess);
        },
        onLeaveBack: () => {
          handleCardEntrance(nodeSuccess, false);
        },
      },
    });
  }
}
