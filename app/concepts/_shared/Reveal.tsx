"use client";

import { useEffect } from "react";

/**
 * Adds .is-in to each element matching `selector` (usually the concept's
 * sections, e.g. ".ak section") as it enters the viewport. CSS does the rest.
 */
export default function Reveal({ selector }: { selector: string }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(selector).forEach((s) => s.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    document.querySelectorAll(selector).forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [selector]);
  return null;
}
