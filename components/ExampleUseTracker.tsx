"use client";

import { useRef } from "react";
import { track } from "@/lib/track";

/**
 * Counts the first touch on a live example, once per page view. Without it a
 * visitor who played with the demo and left looks the same as one who bounced.
 */
export function ExampleUseTracker({ example, children }: { example: string; children: React.ReactNode }) {
  const used = useRef(false);
  return (
    <div
      onPointerDownCapture={() => {
        if (used.current) return;
        used.current = true;
        track("example_used", { example, page: window.location.pathname });
      }}
    >
      {children}
    </div>
  );
}
