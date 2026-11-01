"use client";

import Link from "next/link";
import { useRef, useState } from "react";

type Item = { name: string; lines: readonly string[] };

/**
 * "What does your office run on?" Tiles for the software an owner already
 * knows; picking one shows what a desk does with it. Buttons, so Tab and
 * Enter work; arrow keys move between tiles. The answer is a polite live
 * region. No motion beyond the site's 1px hover lift.
 */
export function SoftwarePicker({ items, cta }: { items: readonly Item[]; cta: string }) {
  const [active, setActive] = useState(0);
  const tiles = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (i + step + items.length) % items.length;
    setActive(next);
    tiles.current[next]?.focus();
  };

  const item = items[active];
  return (
    <div className="picker">
      <div className="picker-tiles" role="group" aria-label="Software your office runs on">
        {items.map((it, i) => (
          <button
            key={it.name}
            ref={(el) => {
              tiles.current[i] = el;
            }}
            type="button"
            className={i === active ? "tile on" : "tile"}
            aria-pressed={i === active}
            aria-controls="picker-answer"
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {it.name}
          </button>
        ))}
      </div>
      <div className="picker-answer" id="picker-answer" aria-live="polite">
        <p className="picker-k">{item.name === "Something else" ? "Anything else:" : `With ${item.name}, a desk:`}</p>
        <ul>
          {item.lines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <Link className="btn blue" href="/review" data-cta="software-picker">
          {cta} <span className="dot" />
        </Link>
      </div>
    </div>
  );
}
