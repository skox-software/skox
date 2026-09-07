import type { BuildType } from "@/content/landing";

/**
 * The channel between the hero composer and the enquiry form.
 *
 * Both live on the same page and are mounted at the same time, so a window
 * event is enough — no storage, and nothing to read during render that could
 * desync hydration. `LandingPage` is a server component, so lifting this into
 * shared React state would mean making the whole page a client component.
 */
export const BRIEF_EVENT = "skox:brief";

export type Brief = {
  text: string;
  /** What the hero read the brief as, so the form starts already answered. */
  build?: BuildType;
};

export function sendBrief(brief: Brief) {
  window.dispatchEvent(new CustomEvent(BRIEF_EVENT, { detail: brief }));
}

export function onBrief(handler: (brief: Brief) => void) {
  const listener = (event: Event) => {
    const detail = (event as CustomEvent).detail as Brief | undefined;
    handler({ text: String(detail?.text ?? ""), build: detail?.build });
  };
  window.addEventListener(BRIEF_EVENT, listener);
  return () => window.removeEventListener(BRIEF_EVENT, listener);
}
