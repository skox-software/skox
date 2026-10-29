"use client";

import { useRef } from "react";

type Item = { status: string; who: string; what: string; href?: string; linkLabel?: string };

/**
 * Work we've done, as cards that answer the cursor: a light follows the
 * mouse across each card and the card tilts a few degrees toward it, like
 * the hero's dots moving aside. Mouse and pen only; reduced motion leaves
 * them still.
 */
export function WorkCards({ items }: { items: readonly Item[] }) {
  const reduced = useRef<boolean | null>(null);

  const move = (e: React.PointerEvent<HTMLLIElement>) => {
    if (e.pointerType === "touch") return;
    if (reduced.current === null) reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
    el.style.setProperty("--rx", `${((0.5 - y) * 6).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${((x - 0.5) * 8).toFixed(2)}deg`);
    el.classList.add("hot");
  };

  const leave = (e: React.PointerEvent<HTMLLIElement>) => {
    const el = e.currentTarget;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.classList.remove("hot");
  };

  return (
    <ul className="work-list">
      {items.map((item) => (
        <li key={item.who} onPointerMove={move} onPointerLeave={leave}>
          <span className="w-glow" aria-hidden />
          <span className={item.status === "In testing" ? "w-status testing" : "w-status"}>
            <span className="w-dot" aria-hidden /> {item.status}
          </span>
          <h3>{item.who}</h3>
          <p>{item.what}</p>
          {item.href && (
            <a className="link w-link" href={item.href} target="_blank" rel="noopener">
              {item.linkLabel}
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}
