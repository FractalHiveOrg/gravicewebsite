import Clarity from "@microsoft/clarity";

const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID
// const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || "z465hl406u"

/**
 * Returns Clarity once its queue exists, or null on the server / without a
 * project ID. `init` is idempotent, so calls made before the root effect runs
 * are queued instead of throwing on a missing `window.clarity`.
 */
function clarity() {
  if (!projectId || typeof window === "undefined") return null;
  Clarity.init(projectId);
  return Clarity;
}

export function initClarity() {
  clarity();
}

export function trackEvent(name: string) {
  clarity()?.event(name);
}

export function setClarityTag(key: string, value: string | string[]) {
  clarity()?.setTag(key, value);
}

/** Prioritise recording this session (Clarity samples on busy sites). */
export function upgradeSession(reason: string) {
  clarity()?.upgrade(reason);
}
