import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────
type DocKey = "invoice" | "receipt" | "shipping";

interface DocConfig {
  key: DocKey;
  lineIndex: number; // 0-based index in the left source column (0: Google Drive, 1: OneDrive, 2: Dropbox)
  destIndex: number; // 0-based index in the right destination column (0: Zoho Books, 1: Tally)
}

const DOCS: DocConfig[] = [
  { key: "invoice",  lineIndex: 0, destIndex: 0 }, // Invoice: Google Drive -> Zoho Books
  { key: "receipt",  lineIndex: 1, destIndex: 1 }, // Receipt: OneDrive -> Tally
  { key: "shipping", lineIndex: 2, destIndex: 0 }, // Shipping: Dropbox -> Zoho Books
];

// ─── Timing constants (all in seconds, scaled 40% slower) ───────────────────
const LEFT_STICK_DUR   = 1.61;  // 1. live stick in (smooth, elegant glide)
const IMG_SHOW_DUR     = 0.56;  // 2. document node fades in
const IMG_HOLD         = 0.63;  // 2b. brief pause before scan
const SCAN_DUR         = 1.89;  // 3. green laser sweeps top → bottom
const HIGHLIGHT_STAGGER = 0.077; // 3.5. stagger between each field lighting up
const HIGHLIGHT_HOLD   = 1.26;  // 3.5. hold time showing all highlights on doc
const REVEAL_DUR       = 1.89;  // 4. blue clip-path reveal wipe (no glow)
const VAL1_DELAY       = 0.77;  // 4b. time after reveal where both amber spinners actively validate
const VAL2_EXTRA       = 0.91;  // val 2 resolves this many seconds after val 1
const HOLD_EXTRACTED   = 1.4;   // hold on extracted state with both validated
const RIGHT_STICK_DUR  = 1.54;  // 5. live stick out (smooth, elegant glide)
const SUCCESS_HOLD     = 1.12;  // 5b. hold the synced success state
const RESET_FADE       = 0.49;  // 6. everything fades for reset
const CYCLE_GAP        = 0.35;  // gap between docs


let _masterTimeline: gsap.core.Timeline | null = null;
let _st: ScrollTrigger | null = null;
// Track all pending setTimeouts so we can cancel them on cleanup
let _pendingTimeouts: ReturnType<typeof setTimeout>[] = [];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getEl<T extends HTMLElement = HTMLElement>(id: string): T | null {
  return document.getElementById(id) as T | null;
}

function resetValBlock(id: string) {
  const el = getEl(id);
  if (!el) return;
  el.classList.remove("verified");
  const proc = el.querySelector<HTMLElement>(".val-processing");
  const ver = el.querySelector<HTMLElement>(".val-verified");
  if (proc) proc.style.display = "flex";
  if (ver) {
    ver.style.display = "none";
    gsap.set(ver, { opacity: 0, scale: 0.95 });
  }
}

function resolveValBlock(id: string) {
  const el = getEl(id);
  if (!el) return;
  el.classList.add("verified");
  const proc = el.querySelector<HTMLElement>(".val-processing");
  const ver = el.querySelector<HTMLElement>(".val-verified");
  if (proc) proc.style.display = "none";
  if (ver) {
    ver.style.display = "flex";
    gsap.fromTo(ver, { scale: 0.94, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.28, ease: "back.out(1.6)" });
  }
}

function resetAllValBlocks() {
  document.querySelectorAll<HTMLElement>(".val-block").forEach(el => {
    el.classList.remove("verified");
    const proc = el.querySelector<HTMLElement>(".val-processing");
    const ver = el.querySelector<HTMLElement>(".val-verified");
    if (proc) proc.style.display = "flex";
    if (ver) {
      ver.style.display = "none";
      gsap.set(ver, { opacity: 0, scale: 0.95 });
    }
  });
}

function setLaserTop(laserLine: HTMLElement | null, pct: number) {
  if (laserLine) laserLine.style.top = `${pct}%`;
}

function setRevealTop(revealLine: HTMLElement | null, pct: number) {
  if (revealLine) revealLine.style.top = `${pct}%`;
}

function setRevealProgress(pct: number) {
  const card = getEl("doc-scanner-card");
  if (card) {
    card.style.setProperty("--reveal-progress", `${pct}%`);
  }
}

function setStatusPill(text: string, isComplete: boolean = false) {
  const pillText = getEl("scanner-status-text");
  const spinner = getEl("scanner-status-spinner");
  const check = getEl("scanner-status-check");

  if (pillText && pillText.textContent?.trim() !== text) {
    gsap.to(pillText, {
      opacity: 0,
      y: -3,
      duration: 0.15,
      ease: "power1.in",
      onComplete() {
        pillText.textContent = text;
        gsap.to(pillText, { opacity: 1, y: 0, duration: 0.2, ease: "power1.out" });
      },
    });
  }

  if (spinner && check) {
    if (isComplete) {
      spinner.classList.add("hidden");
      check.classList.remove("hidden");
      gsap.fromTo(check, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: "back.out(1.8)" });
    } else {
      spinner.classList.remove("hidden");
      check.classList.add("hidden");
    }
  }
}

/**
 * Step 3.5 — illuminate all [data-highlight] spans in the input doc node.
 * Each span gets the `.highlighted` CSS class (which applies color-coded bg).
 * We stagger them slightly so they pop in wave-like.
 */
function highlightDocFields(inputLayer: HTMLElement, stagger: number, callback: () => void) {
  const spans = Array.from(inputLayer.querySelectorAll<HTMLElement>("[data-highlight]"));
  if (spans.length === 0) { callback(); return; }

  spans.forEach((span, i) => {
    // Store timeout ID so cleanup() can cancel it
    const tid = setTimeout(() => {
      span.classList.add("highlighted");
      if (i === spans.length - 1) {
        const finalTid = setTimeout(callback, 0);
        _pendingTimeouts.push(finalTid);
      }
    }, i * stagger * 1000);
    _pendingTimeouts.push(tid);
  });
}

/**
 * Remove all highlight classes from a doc node's extractable spans.
 */
function clearDocHighlights(inputLayer: HTMLElement | null) {
  if (!inputLayer) return;
  inputLayer.querySelectorAll<HTMLElement>("[data-highlight]").forEach(el => {
    el.classList.remove("highlighted");
  });
}

// ─── Per-document cycle builder ───────────────────────────────────────────────
function buildDocCycle(tl: gsap.core.Timeline, doc: DocConfig, startAt: number): number {
  const { key, lineIndex, destIndex } = doc;
  const lineNum = lineIndex + 1;
  const destNum = destIndex + 1;

  const leftStickEl  = getEl(`left-stick-${lineNum}`);
  const rightStickEl = getEl(`right-stick-${destNum}`);
  const inputLayer   = getEl(`int-input-layer-${key}`);
  const outputLayer  = getEl(`int-output-layer-${key}`);
  const laserLine    = getEl("int-laser-line");
  const revealLine   = getEl("int-reveal-line");

  const prefix = key === "invoice" ? "inv" : key === "receipt" ? "rct" : "shp";
  const val1Id = `${prefix}-val-1`;
  const val2Id = `${prefix}-val-2`;
  const docName = key === "invoice" ? "invoice" : key === "receipt" ? "receipt" : "shipping note";

  const syncLayer       = getEl("doc-scanner-syncing");
  const syncIconBox     = getEl("sync-icon-box");
  const syncPingCircle  = getEl("sync-ping-circle");
  const syncIconUpload  = getEl("sync-icon-upload");
  const syncIconCheck   = getEl("sync-icon-check");
  const syncTextSyncing = getEl("sync-text-syncing");
  const syncTextComplete= getEl("sync-text-complete");
  const rightIconEl     = getEl(`right-icon-${destNum}`);
  const sourceCardEl    = getEl(`source-card-${lineNum}`);

  const leftHead  = leftStickEl?.querySelector<SVGPathElement>(".wf-fork-head");
  const leftBody  = leftStickEl?.querySelector<SVGPathElement>(".wf-fork-body");
  const leftTail  = leftStickEl?.querySelector<SVGPathElement>(".wf-fork-tail");

  const rightHead = rightStickEl?.querySelector<SVGPathElement>(".wf-fork-head");
  const rightBody = rightStickEl?.querySelector<SVGPathElement>(".wf-fork-body");
  const rightTail = rightStickEl?.querySelector<SVGPathElement>(".wf-fork-tail");

  let t = startAt;

  // ── Step 0: Hard reset from previous cycle ─────────────────────────────
  tl.call(() => {
    setStatusPill(`Pulling ${docName}`, false);
    resetValBlock(val1Id);
    resetValBlock(val2Id);
    if (laserLine) {
      gsap.set(laserLine, { opacity: 0 });
      setLaserTop(laserLine, 0);
    }
    if (revealLine) {
      gsap.set(revealLine, { opacity: 0 });
      setRevealTop(revealLine, 0);
    }
    setRevealProgress(0);
    if (inputLayer) {
      gsap.set(inputLayer, { opacity: 0 });
      clearDocHighlights(inputLayer);
    }
    if (outputLayer) {
      gsap.set(outputLayer, { opacity: 0 });
      outputLayer.scrollTop = 0;
    }
    if (syncLayer) {
      gsap.set(syncLayer, { opacity: 0 });
    }
    if (syncIconBox) {
      gsap.set(syncIconBox, { borderColor: "rgba(226, 232, 240, 0.9)", backgroundColor: "#ffffff" });
    }
    if (syncPingCircle) {
      syncPingCircle.className = "absolute w-16 h-16 rounded-full bg-blue-200/50 animate-ping opacity-25";
    }
    if (syncIconUpload) {
      syncIconUpload.classList.remove("hidden");
      gsap.set(syncIconUpload, { opacity: 1, scale: 1 });
    }
    if (syncIconCheck) {
      syncIconCheck.classList.add("hidden");
      gsap.set(syncIconCheck, { opacity: 0, scale: 0.7 });
    }
    if (syncTextSyncing) {
      syncTextSyncing.classList.remove("hidden");
    }
    if (syncTextComplete) {
      syncTextComplete.classList.add("hidden");
    }
    if (rightIconEl) {
      gsap.set(rightIconEl, { scale: 1, borderColor: "rgba(226, 232, 240, 0.8)" });
    }
    if (sourceCardEl) {
      gsap.set(sourceCardEl, { scale: 1, borderColor: "rgba(226, 232, 240, 0.8)" });
    }
    if (leftStickEl) {
      gsap.set(leftStickEl, { opacity: 0 });
      if (leftTail) gsap.set(leftTail, { strokeDashoffset: 28 });
      if (leftBody) gsap.set(leftBody, { strokeDashoffset: 16 });
      if (leftHead) gsap.set(leftHead, { strokeDashoffset: 8 });
    }
    if (rightStickEl) {
      gsap.set(rightStickEl, { opacity: 0 });
      if (rightTail) gsap.set(rightTail, { strokeDashoffset: 28 });
      if (rightBody) gsap.set(rightBody, { strokeDashoffset: 16 });
      if (rightHead) gsap.set(rightHead, { strokeDashoffset: 8 });
    }
  }, undefined, t);

  // ── Step 1: Left live stick flows forward into document card ───────────
  if (sourceCardEl) {
    tl.to(sourceCardEl, { scale: 1.05, borderColor: "rgba(59, 130, 246, 0.5)", duration: 0.25, ease: "power2.out" }, t);
    tl.to(sourceCardEl, { scale: 1, borderColor: "rgba(226, 232, 240, 0.8)", duration: 0.4, ease: "power2.in" }, t + 0.35);
  }
  if (leftStickEl) {
    tl.set(leftStickEl, { opacity: 1 }, t);
    if (leftTail) {
      tl.fromTo(leftTail, { strokeDashoffset: 28 }, { strokeDashoffset: -200, duration: LEFT_STICK_DUR, ease: "power2.inOut" }, t);
    }
    if (leftBody) {
      tl.fromTo(leftBody, { strokeDashoffset: 16 }, { strokeDashoffset: -200, duration: LEFT_STICK_DUR, ease: "power2.inOut" }, t);
    }
    if (leftHead) {
      tl.fromTo(leftHead, { strokeDashoffset: 8 }, { strokeDashoffset: -200, duration: LEFT_STICK_DUR, ease: "power2.inOut" }, t);
    }
    // Fade out as it completely enters the center card (never shrinks backward)
    tl.to(leftStickEl, { opacity: 0, duration: 0.12, ease: "power1.out" }, t + LEFT_STICK_DUR - 0.08);
  }
  t += LEFT_STICK_DUR;

  // ── Step 2: Document node fades in ────────────────────────────────────
  if (inputLayer) {
    tl.to(inputLayer, { opacity: 1, duration: IMG_SHOW_DUR, ease: "power1.out" }, t);
  }
  t += IMG_SHOW_DUR + IMG_HOLD;

  // ── Step 3: Green laser sweeps top → bottom ───────────────────────────
  tl.call(() => setStatusPill("Scanning document", false), undefined, t);
  if (laserLine) {
    tl.to(laserLine, { opacity: 1, duration: 0.1, ease: "power1.in" }, t);
    setLaserTop(laserLine, 0);
  }

  const scanState = { progress: 0 };
  tl.to(scanState, {
    progress: 100,
    duration: SCAN_DUR,
    ease: "sine.inOut",
    onUpdate() {
      setLaserTop(laserLine, scanState.progress);
    },
    onComplete() {
      setLaserTop(laserLine, 100);
    },
  }, t + 0.06);

  t += SCAN_DUR + 0.15;

  // Laser fades out at the bottom of the document
  if (laserLine) {
    tl.to(laserLine, { opacity: 0, duration: 0.12, ease: "power1.out" }, t);
  }
  t += 0.15;

  // ── Step 3.5: Highlight extractable text on document node ─────────────
  // All [data-highlight] spans light up in blue (#2c60ff).
  tl.call(() => {
    if (!inputLayer) return;
    highlightDocFields(inputLayer, HIGHLIGHT_STAGGER, () => {
      // Timeline continues independently
    });
  }, undefined, t);

  // Time budget for stagger + hold:
  const highlightBudget = 10 * HIGHLIGHT_STAGGER + HIGHLIGHT_HOLD;
  t += highlightBudget;

  // ── Step 3.5 to 4: Clip-Path Reveal Wipe (Different blue color, NO glow) ──
  // The crisp blue reveal line sweeps from top to bottom.
  // Behind the line: extracted details form is revealed.
  // Ahead of the line: document node with highlighted text stays visible until cut away.
  tl.call(() => {
    setStatusPill("Extracting fields", false);
    setRevealProgress(0);
    resetValBlock(val1Id);
    resetValBlock(val2Id);
    if (revealLine) {
      setRevealTop(revealLine, 0);
      gsap.set(revealLine, { opacity: 1 });
    }
    if (outputLayer) {
      outputLayer.scrollTop = 0;
      gsap.set(outputLayer, { opacity: 1 });
    }
  }, undefined, t);

  const revealState = { progress: 0 };
  tl.to(revealState, {
    progress: 100,
    duration: REVEAL_DUR,
    ease: "power2.inOut",
    onUpdate() {
      setRevealProgress(revealState.progress);
      setRevealTop(revealLine, revealState.progress);
    },
    onComplete() {
      setRevealProgress(100);
      setRevealTop(revealLine, 100);
    },
  }, t + 0.04);

  t += REVEAL_DUR + 0.06;

  // Blue reveal line fades out at bottom
  if (revealLine) {
    tl.to(revealLine, { opacity: 0, duration: 0.12, ease: "power1.out" }, t);
  }
  // Once 100% revealed, set inputLayer opacity to 0
  if (inputLayer) {
    tl.set(inputLayer, { opacity: 0 }, t);
  }
  t += 0.12;

  // ── Step 4b: Validation states ────────────────────────────────────────
  // Both blocks are ALREADY actively validating (amber spinner).
  // Give the user a clear window (VAL1_DELAY) to observe both spinning.
  tl.call(() => setStatusPill("Validating against records", false), undefined, t);
  t += VAL1_DELAY;

  // Amber spinner → green checkmark (validation 1)
  tl.call(() => resolveValBlock(val1Id), undefined, t);

  // Stagger before validation 2 resolves
  t += VAL2_EXTRA;

  // Amber spinner → green checkmark (validation 2)
  tl.call(() => resolveValBlock(val2Id), undefined, t);

  // Hold extracted view with both verified
  t += HOLD_EXTRACTED;

  // ── Step 5: Syncing state in center card & right live stick flight ────
  // Smooth crossfade: outputLayer fades out, syncLayer fades in
  tl.call(() => setStatusPill("Syncing to systems", false), undefined, t);
  if (outputLayer) {
    tl.to(outputLayer, { opacity: 0, duration: 0.35, ease: "power1.inOut" }, t);
  }
  if (syncLayer) {
    tl.call(() => {
      syncIconUpload?.classList.remove("hidden");
      syncIconCheck?.classList.add("hidden");
      syncTextSyncing?.classList.remove("hidden");
      syncTextComplete?.classList.add("hidden");
      if (syncIconBox) {
        gsap.set(syncIconBox, { borderColor: "rgba(226, 232, 240, 0.9)", backgroundColor: "#ffffff" });
      }
      if (syncPingCircle) {
        syncPingCircle.className = "absolute w-16 h-16 rounded-full bg-blue-200/50 animate-ping opacity-25";
      }
    }, undefined, t);
    tl.to(syncLayer, { opacity: 1, duration: 0.35, ease: "power1.out" }, t);
  }

  // Right live stick flies forward to destination
  if (rightStickEl) {
    tl.set(rightStickEl, { opacity: 1 }, t);
    if (rightTail) {
      tl.fromTo(rightTail, { strokeDashoffset: 28 }, { strokeDashoffset: -200, duration: RIGHT_STICK_DUR, ease: "power2.inOut" }, t);
    }
    if (rightBody) {
      tl.fromTo(rightBody, { strokeDashoffset: 16 }, { strokeDashoffset: -200, duration: RIGHT_STICK_DUR, ease: "power2.inOut" }, t);
    }
    if (rightHead) {
      tl.fromTo(rightHead, { strokeDashoffset: 8 }, { strokeDashoffset: -200, duration: RIGHT_STICK_DUR, ease: "power2.inOut" }, t);
    }
    // Fade out into destination icon (never shrinks backward)
    tl.to(rightStickEl, { opacity: 0, duration: 0.12, ease: "power1.out" }, t + RIGHT_STICK_DUR - 0.08);
  }

  // Live stick reaches destination icon
  const arrivalTime = t + RIGHT_STICK_DUR;
  tl.call(() => setStatusPill("Synced successfully", true), undefined, arrivalTime);

  // Destination icon micro-interaction (subtle pulse & green glow)
  if (rightIconEl) {
    tl.to(rightIconEl, { scale: 1.06, borderColor: "#10B981", duration: 0.2, ease: "power2.out" }, arrivalTime);
    tl.to(rightIconEl, { scale: 1, borderColor: "rgba(226, 232, 240, 0.8)", duration: 0.35, ease: "power2.in" }, arrivalTime + 0.2);
  }

  // Center card transitions to "Synced Successfully!" with green checkmark
  tl.call(() => {
    syncIconUpload?.classList.add("hidden");
    syncIconCheck?.classList.remove("hidden");
    syncTextSyncing?.classList.add("hidden");
    syncTextComplete?.classList.remove("hidden");
    if (syncIconBox) {
      syncIconBox.style.borderColor = "rgba(16, 185, 129, 0.4)";
      syncIconBox.style.backgroundColor = "rgba(240, 253, 244, 0.7)";
    }
    if (syncPingCircle) {
      syncPingCircle.className = "absolute w-16 h-16 rounded-full bg-emerald-200/50 animate-ping opacity-25";
    }
  }, undefined, arrivalTime);

  if (syncIconCheck) {
    tl.fromTo(syncIconCheck, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(1.8)" }, arrivalTime);
  }

  // Hold the success state for readability
  t = arrivalTime + SUCCESS_HOLD;

  // ── Step 6: Reset for next doc ────────────────────────────────────────
  if (syncLayer) {
    tl.to(syncLayer, { opacity: 0, duration: RESET_FADE, ease: "power1.inOut" }, t);
  }

  tl.call(() => {
    resetValBlock(val1Id);
    resetValBlock(val2Id);
    if (laserLine) {
      gsap.set(laserLine, { opacity: 0 });
      setLaserTop(laserLine, 0);
    }
    if (revealLine) {
      gsap.set(revealLine, { opacity: 0 });
      setRevealTop(revealLine, 0);
    }
    setRevealProgress(0);
    if (inputLayer) clearDocHighlights(inputLayer);
    if (outputLayer) outputLayer.scrollTop = 0;
    if (syncIconBox) {
      syncIconBox.style.borderColor = "";
      syncIconBox.style.backgroundColor = "";
    }
    if (syncPingCircle) {
      syncPingCircle.className = "absolute w-16 h-16 rounded-full bg-blue-200/50 animate-ping opacity-25";
    }
    if (syncIconUpload) {
      syncIconUpload.classList.remove("hidden");
      gsap.set(syncIconUpload, { opacity: 1, scale: 1 });
    }
    if (syncIconCheck) {
      syncIconCheck.classList.add("hidden");
    }
    if (syncTextSyncing) {
      syncTextSyncing.classList.remove("hidden");
    }
    if (syncTextComplete) {
      syncTextComplete.classList.add("hidden");
    }
    if (rightIconEl) {
      gsap.set(rightIconEl, { scale: 1, borderColor: "rgba(226, 232, 240, 0.8)" });
    }
    if (leftStickEl) {
      gsap.set(leftStickEl, { opacity: 0 });
      if (leftTail) gsap.set(leftTail, { strokeDashoffset: 28 });
      if (leftBody) gsap.set(leftBody, { strokeDashoffset: 16 });
      if (leftHead) gsap.set(leftHead, { strokeDashoffset: 8 });
    }
    if (rightStickEl) {
      gsap.set(rightStickEl, { opacity: 0 });
      if (rightTail) gsap.set(rightTail, { strokeDashoffset: 28 });
      if (rightBody) gsap.set(rightBody, { strokeDashoffset: 16 });
      if (rightHead) gsap.set(rightHead, { strokeDashoffset: 8 });
    }
  }, undefined, t + RESET_FADE + 0.05);

  t += RESET_FADE + CYCLE_GAP;

  return t;
}

// ─── Public API ───────────────────────────────────────────────────────────────
export function initIntegrationsScannerAnimation() {
  const section = getEl("integrations-section");
  if (!section) return;

  // ─── Desktop only: skip on mobile to avoid heavy repeating GSAP timeline ──
  if (typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches) return;

  _masterTimeline?.kill();
  _st?.kill();

  resetAllValBlocks();

  function buildTimeline() {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.2 });
    let cursor = 0;
    for (const doc of DOCS) {
      cursor = buildDocCycle(tl, doc, cursor);
    }
    tl.call(() => resetAllValBlocks(), undefined, cursor);
    return tl;
  }

  _st = ScrollTrigger.create({
    trigger: section,
    start: "top 80%",
    end: "bottom 10%",
    onEnter: () => {
      if (!_masterTimeline) {
        _masterTimeline = buildTimeline();
        _masterTimeline.play();
      } else {
        _masterTimeline.play();
      }
    },
    onLeave:     () => _masterTimeline?.pause(),
    onEnterBack: () => _masterTimeline?.play(),
    onLeaveBack: () => _masterTimeline?.pause(),
  });
}

export function cleanupIntegrationsScannerAnimation() {
  // Cancel all pending highlight setTimeouts to prevent stale DOM mutations
  _pendingTimeouts.forEach((id) => clearTimeout(id));
  _pendingTimeouts = [];

  _masterTimeline?.kill();
  _masterTimeline = null;
  _st?.kill();
  _st = null;
  setRevealProgress(0);
  resetAllValBlocks();
  const syncLayer = getEl("doc-scanner-syncing");
  if (syncLayer) gsap.set(syncLayer, { opacity: 0 });
  setStatusPill("Pulling invoice", false);
}
