"use client";

import { useState } from "react";
import { money } from "./contact";

/**
 * Live estimate from the business's published numbers only: a per-head
 * low/high, a deposit percent and an optional tasting price. It shows a range
 * and never a quote. Anything they publish no number for goes in `flags`:
 * toggleable chips that say "priced on the call" instead of inventing a price.
 */
export default function Estimate({
  title,
  low,
  high,
  depositPct,
  tasting,
  flags = [],
  unit = "guests",
  min = 20,
  max = 300,
  step = 5,
  initial = 100,
  perHeadLabel = `Food, at ${money(low)} to ${money(high)}+ a head`,
  depositLabel = `${depositPct}% deposit locks the date`,
  flagsIdle = "Toggle what else you need.",
  disclaimer,
  cta,
}: {
  title: string;
  /** Published per-head low and high. */
  low: number;
  high: number;
  depositPct: number;
  tasting?: { label: string; price: number };
  /** `short` is the word used in "X and Y priced on the call." */
  flags?: { label: string; short: string }[];
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  initial?: number;
  perHeadLabel?: string;
  depositLabel?: string;
  flagsIdle?: string;
  /** "A range, not a quote" line, specific to what moves their price. */
  disclaimer: string;
  cta: { href: string; label: string };
}) {
  const [count, setCount] = useState(initial);
  const [on, setOn] = useState<boolean[]>(() => flags.map(() => false));
  const lo = count * low;
  const hi = count * high;
  const picked = flags.filter((_, i) => on[i]).map((f) => f.short);

  return (
    <div className="est">
      <h3>{title}</h3>
      <label className="est-slider">
        <span>
          <strong>{count}</strong> {unit}
        </span>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          aria-valuetext={`${count} ${unit}`}
        />
      </label>
      <dl className="leaders">
        <div>
          <dt>{perHeadLabel}</dt>
          <dd>
            {money(lo)} to {money(hi)}+
          </dd>
        </div>
        <div>
          <dt>{depositLabel}</dt>
          <dd>
            {money(Math.round((lo * depositPct) / 100))} to {money(Math.round((hi * depositPct) / 100))}
          </dd>
        </div>
        {tasting && (
          <div>
            <dt>{tasting.label}</dt>
            <dd>{money(tasting.price)}</dd>
          </div>
        )}
      </dl>
      {flags.length > 0 && (
        <div className="est-flags">
          {flags.map((f, i) => (
            <button
              key={f.label}
              type="button"
              className="chip chip-dark"
              aria-pressed={on[i]}
              onClick={() => setOn(on.map((v, j) => (j === i ? !v : v)))}
            >
              {f.label}
            </button>
          ))}
          <span className="est-flag-note">
            {picked.length ? `${picked.join(" and ")} priced on the call.` : flagsIdle}
          </span>
        </div>
      )}
      <p className="pricing-example">{disclaimer}</p>
      <a className="btn btn-ghost" href={cta.href}>
        {cta.label}
      </a>
    </div>
  );
}
