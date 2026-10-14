"use client";

import { useEffect, useState } from "react";
import { landing } from "@/content/landing";
import { site } from "@/content/site";

/**
 * Phones only (see trades.css). Paid visitors read the hero, scroll and leave
 * without ever reaching the form at the bottom, so the next step stays on
 * screen. It appears once the hero has scrolled away and steps aside while the
 * form itself is on screen.
 */
export function TradeStickyBar() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const hero = document.querySelector(".tr-hero");
    const form = document.getElementById("scope");
    if (!hero || !form) return;
    function update() {
      const pastHero = hero!.getBoundingClientRect().bottom < 0;
      const formRect = form!.getBoundingClientRect();
      const formOnScreen = formRect.top < window.innerHeight && formRect.bottom > 0;
      setShown(pastHero && !formOnScreen);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="tr-sticky" data-shown={shown} aria-hidden={!shown}>
      <a
        href="#scope"
        className="button button-primary"
        data-cta="trade-sticky"
        tabIndex={shown ? 0 : -1}
      >
        {landing.cta}
      </a>
      <a href={site.phone.href} className="button button-ghost" tabIndex={shown ? 0 : -1}>
        Call
      </a>
    </div>
  );
}
