"use client";

import { useEffect, useState } from "react";
import { PHONE_TEL } from "./data";

/**
 * Phone-width "Book now" bar. Appears once the hero has scrolled away and
 * steps aside while the planner itself is on screen.
 */
export default function BookBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const hero = document.querySelector(".bh .hero");
    const plan = document.getElementById("plan");
    if (!hero || !plan) return;
    let pastHero = false;
    let inPlan = false;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) pastHero = !e.isIntersecting && e.boundingClientRect.top < 0;
        if (e.target === plan) inPlan = e.isIntersecting;
      }
      setShow(pastHero && !inPlan);
    });
    io.observe(hero);
    io.observe(plan);
    return () => io.disconnect();
  }, []);
  return (
    <div className={`bookbar${show ? " is-on" : ""}`} aria-hidden={!show}>
      <a className="btn btn-ghost" href={`tel:${PHONE_TEL}`} tabIndex={show ? 0 : -1}>
        Call
      </a>
      <a className="btn btn-primary" href="#plan" tabIndex={show ? 0 : -1}>
        Book now
      </a>
    </div>
  );
}
