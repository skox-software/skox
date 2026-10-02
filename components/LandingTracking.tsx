"use client";
import { useEffect } from "react";
import { track } from "@/lib/track";
export function LandingTracking() {
  useEffect(() => {
    function clicked(event: MouseEvent) {
      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>("[data-cta]")
          : null;
      if (target)
        track("scope_cta_clicked", {
          placement: target.dataset.cta || "unknown",
          page: window.location.pathname,
        });
    }
    document.addEventListener("click", clicked);
    return () => document.removeEventListener("click", clicked);
  }, []);
  return null;
}
