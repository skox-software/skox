"use client";

import { useSyncExternalStore } from "react";
import { gpcOn, optedOut, setOptOut } from "@/lib/consent";

/** The "Your Privacy Choices" switch on /privacy. Renders inside a Block's <p>. */
type State = "loading" | "gpc" | "out" | "in";
const read = (): State => (gpcOn() ? "gpc" : optedOut() ? "out" : "in");
// Nothing to subscribe to: a change reloads the page.
const subscribe = () => () => {};

export function PrivacyChoices() {
  // The choice lives in the browser, so the server renders nothing for it.
  const state = useSyncExternalStore<State>(subscribe, read, () => "loading");

  if (state === "loading") return null;
  if (state === "gpc") {
    return (
      <span>
        <strong>You’re already opted out.</strong> Your browser sends Global
        Privacy Control, so the analytics and advertising tools above stay off
        for you.
      </span>
    );
  }

  function toggle() {
    const out = state !== "out";
    setOptOut(out);
    // Tags already running on this page only stop on a fresh load.
    window.location.reload();
  }

  return (
    <span>
      <strong>
        {state === "out"
          ? "Analytics and ad measurement are off in this browser."
          : "Analytics and ad measurement are on in this browser."}
      </strong>{" "}
      <button type="button" onClick={toggle} className="underline">
        {state === "out" ? "Turn them back on" : "Turn them off"}
      </button>
    </span>
  );
}
