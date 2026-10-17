"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "../san-julians-4c9f2a71/icons";

/**
 * The first-screen showpiece.
 *
 * A cut-out of the café's own product photography sits in front of an oversized
 * wordmark and occludes it — which is what reads as depth. The drink leans
 * toward the pointer on a 2D perspective transform, the page floods with the
 * colour of whichever drink is chosen, and roasted beans fall behind it.
 *
 * Deliberately no 3D runtime, no scroll-jacking library and no Lottie: this
 * page's actual job is getting someone to tap "Order pickup" on a phone outside
 * the shop, and a multi-megabyte scene would work against that. Everything here
 * is CSS plus one pointer handler.
 *
 * The three drinks are real menu items photographed together by the café, so
 * they share one light and crossfade cleanly.
 */
const drinks = [
  {
    id: "frappe",
    name: "Caramel Frappé",
    img: "/concepts/san-julians/cups/frappe.png",
    note: "Blended cold, whipped cream, caramel over the top.",
    tint: "#3a2214",
    glow: "#a9713a",
    dot: "#c98a4b",
  },
  {
    id: "berry",
    name: "Berry Refresher",
    img: "/concepts/san-julians/cups/berry.png",
    note: "Blended berries, ice, and not much else.",
    tint: "#5c1230",
    glow: "#a8265c",
    dot: "#8e2050",
  },
  {
    id: "mango",
    name: "Mango Refresher",
    img: "/concepts/san-julians/cups/mango.png",
    note: "Fresh mango, blended cold.",
    tint: "#7a4405",
    glow: "#e59a12",
    dot: "#e0900f",
  },
  {
    id: "pina",
    name: "Strawberry Piña",
    img: "/concepts/san-julians/cups/pina.png",
    note: "Strawberry and pineapple, layered.",
    tint: "#6b2a12",
    glow: "#d4632c",
    dot: "#c8562a",
  },
];

/** Beans are seeded once so they don't reshuffle on every state change. */
const beans = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  delay: ((i * 13) % 90) / 10,
  duration: 7 + ((i * 7) % 60) / 10,
  scale: 0.55 + ((i * 17) % 70) / 100,
  drift: ((i % 5) - 2) * 14,
}));

export default function DrinkHero() {
  const [active, setActive] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const drink = drinks[active];

  // Pointer lean. Written to custom properties so CSS owns the easing, and
  // skipped entirely on touch and for anyone who asked for less motion.
  useEffect(() => {
    const node = stage.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (min-width: 861px)").matches)
      return;

    let raf = 0;
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;
        node.style.setProperty("--lean-x", `${x * 16}deg`);
        node.style.setProperty("--lean-y", `${-y * 10}deg`);
        node.style.setProperty("--shift", `${x * -22}px`);
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      className="drink-hero"
      style={
        {
          "--tint": drink.tint,
          "--glow": drink.glow,
        } as React.CSSProperties
      }
      aria-labelledby="drink-hero-title"
    >
      <div className="beanfall" aria-hidden="true">
        {beans.map((b, i) => (
          <span
            key={i}
            style={
              {
                left: `${b.left}%`,
                animationDelay: `${b.delay}s`,
                animationDuration: `${b.duration}s`,
                "--bean-scale": b.scale,
                "--bean-drift": `${b.drift}px`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className="drink-stage shell" ref={stage}>
        <h1 id="drink-hero-title" className="drink-word">
          <span className="sr-only">San Julián’s Coffee Bar, Winter Park</span>
          <span aria-hidden="true">San Julián’s</span>
        </h1>

        <div className="drink-figure">
          {drinks.map((d, i) => (
            <img
              key={d.id}
              src={d.img}
              alt={i === active ? d.name : ""}
              className={i === active ? "is-active" : ""}
              aria-hidden={i === active ? undefined : true}
              loading={i === 0 ? "eager" : "lazy"}
            />
          ))}
        </div>

        <div className="drink-panel">
          <p className="drink-eyebrow">Colombian coffee · Made to order</p>
          <p className="drink-name" aria-live="polite">
            {drink.name}
          </p>
          <p className="drink-note">{drink.note}</p>

          <div
            className="drink-dots"
            role="tablist"
            aria-label="Choose a drink"
          >
            {drinks.map((d, i) => (
              <button
                key={d.id}
                role="tab"
                type="button"
                aria-selected={i === active}
                aria-label={d.name}
                tabIndex={i === active ? 0 : -1}
                className={i === active ? "is-on" : ""}
                style={{ background: d.dot }}
                onClick={() => setActive(i)}
                onKeyDown={(event) => {
                  let next = active;
                  if (event.key === "ArrowRight")
                    next = (active + 1) % drinks.length;
                  else if (event.key === "ArrowLeft")
                    next = (active + drinks.length - 1) % drinks.length;
                  else return;
                  event.preventDefault();
                  setActive(next);
                }}
              />
            ))}
          </div>

          <a className="btn drink-cta" href="#menu">
            Order pickup <ArrowUpRight size={16} />
          </a>
          <p className="drink-foot">110 S Orlando Ave · Open daily from 7:30</p>
        </div>
      </div>
    </section>
  );
}
