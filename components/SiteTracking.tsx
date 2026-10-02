"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

/** Email and phone links are leads that never touch a form, so count them. */
export function SiteTracking() {
  useEffect(() => {
    function clicked(event: MouseEvent) {
      const link =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>('a[href^="mailto:"], a[href^="tel:"]')
          : null;
      if (!link) return;
      const email = link.href.startsWith("mailto:");
      track(email ? "email_click" : "phone_click", {
        // Form fallbacks carry the whole draft in the href; only the page matters.
        fallback: link.href.includes("body=") ? true : undefined,
      });
    }
    document.addEventListener("click", clicked);
    return () => document.removeEventListener("click", clicked);
  }, []);
  return null;
}
