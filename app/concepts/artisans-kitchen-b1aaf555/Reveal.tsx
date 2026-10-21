"use client";

import { useEffect } from "react";

/** Adds .is-in to each section as it enters the viewport. CSS does the rest. */
export default function Reveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".ak section").forEach((s) => s.classList.add("is-in"));
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
    document.querySelectorAll(".ak section").forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);
  return null;
}
