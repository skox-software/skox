"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};
/** True between 9 pm and 9 am in Maine. */
function isQuietNow() {
  const h = Number(
    new Intl.DateTimeFormat("en-US", { hour: "numeric", hourCycle: "h23", timeZone: "America/New_York" }).format(new Date()),
  );
  return h >= 21 || h < 9;
}

/** "Quiet hours 9 pm to 9 am" (L44), with a moon when it's quiet hours in Maine. */
export default function QuietHours() {
  // Read the clock on the client only; the server renders the plain line.
  const quiet = useSyncExternalStore(noop, isQuietNow, () => null);
  return (
    <p className="quiet">
      <span className={`quiet-glyph${quiet ? " is-moon" : ""}`} aria-hidden="true" />
      Quiet hours 9 pm to 9 am
      {quiet !== null && <span className="quiet-now">{quiet ? ". It's quiet hours on the harbor now." : "."}</span>}
    </p>
  );
}
