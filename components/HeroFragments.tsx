"use client";
import { useEffect, useRef, useState } from "react";
import { heroFragments } from "@/content/landing";

const REDUCED = "(prefers-reduced-motion: reduce)";

/**
 * The three product fragments collaged around the hero headline.
 *
 * Decorative — every figure is invented, so the group is hidden from assistive
 * tech and each card wears a SAMPLE tag. Nothing here is a claim.
 *
 * The pointer offset is written to `--px`/`--py` and applied by CSS through the
 * standalone `translate` property, deliberately not `transform`: the scroll
 * drift already owns `transform`, and the two compose instead of fighting.
 */
export function HeroFragments() {
  const stage = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState<number | null>(null);
  const target = Number(heroFragments.stat.value);

  // Count the headline figure up once, so the card reads as live data landing
  // rather than a screenshot.
  useEffect(() => {
    // Nothing to do when motion is off: the render falls back to the static
    // figure whenever `count` is still null.
    if (window.matchMedia(REDUCED).matches || !Number.isFinite(target)) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 900);
      // easeOutCubic — fast arrival, soft landing.
      setCount(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  useEffect(() => {
    if (window.matchMedia(REDUCED).matches || !Number.isFinite(target)) return;
    const id = window.setInterval(() => {
      setCount((current) => {
        const base = current ?? target;
        const next = base + Math.round((Math.random() - 0.35) * 4);
        // Drift a little, but never wander far from the figure on the card.
        return Math.min(target + 9, Math.max(target - 4, next));
      });
    }, 3200);
    return () => window.clearInterval(id);
  }, [target]);

  useEffect(() => {
    const node = stage.current;
    if (!node || window.matchMedia(REDUCED).matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    // The light tracks on any pointer device; the parallax needs the room the
    // floating cards only get on a wide screen, so it stays gated.
    const hero = node.closest<HTMLElement>(".hero-section");
    const parallax = window.matchMedia("(min-width: 1151px)").matches;

    let raf = 0;
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (hero) {
          const box = hero.getBoundingClientRect();
          hero.style.setProperty("--mx", `${event.clientX - box.left}px`);
          hero.style.setProperty("--my", `${event.clientY - box.top}px`);
          hero.style.setProperty("--lit", "1");
        }
        if (!parallax) return;
        // -0.5..0.5 from the centre of the viewport.
        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;
        node.style.setProperty("--px", `${x * 26}px`);
        node.style.setProperty("--py", `${y * 18}px`);
      });
    };
    const leave = () => hero?.style.setProperty("--lit", "0");

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  const { tag, table, stat, chart } = heroFragments;
  return (
    <div className="hero-frags" ref={stage} aria-hidden="true">
      <article className="hero-frag frag-table">
        <header>
          <span className="micro">{table.title}</span>
          <span className="frag-tag">{tag}</span>
        </header>
        <table>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td>{row.value}</td>
                <td className={row.up ? "is-up" : "is-down"}>{row.delta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>

      <article className="hero-frag frag-stat">
        <header>
          <span className="micro">{stat.label}</span>
          <span className="frag-tag">{tag}</span>
        </header>
        <strong>{count === null ? stat.value : count}</strong>
        <span className="frag-delta">{stat.delta}</span>
        <svg viewBox="0 0 120 28" preserveAspectRatio="none">
          <path
            className="frag-line"
            pathLength={1}
            d="M0 22 L20 18 L40 20 L60 11 L80 14 L100 6 L120 2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </article>

      <article className="hero-frag frag-chart">
        <header>
          <span className="micro">{chart.title}</span>
          <span className="frag-tag">{tag}</span>
        </header>
        <svg viewBox="0 0 200 64" preserveAspectRatio="none">
          <path
            className="frag-line"
            pathLength={1}
            d="M0 54 C 28 50, 44 34, 68 36 S 108 24, 130 26 S 172 8, 200 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <footer>
          {chart.months.map((month) => (
            <span key={month}>{month}</span>
          ))}
        </footer>
      </article>
    </div>
  );
}
