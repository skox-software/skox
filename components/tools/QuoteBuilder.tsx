"use client";
import { useMemo, useState } from "react";
import s from "./QuoteBuilder.module.css";

/* Tool 01 · Roofing. An estimator's quote builder: measure, choose, price, send.
   Blueprint paper, slate ink, terracotta. Every price and name is invented. */

const PITCHES = [
  { label: "4/12", rise: 4, labor: 1, waste: 0.1 },
  { label: "6/12", rise: 6, labor: 1.08, waste: 0.12 },
  { label: "8/12", rise: 8, labor: 1.2, waste: 0.14 },
  { label: "10/12", rise: 10, labor: 1.35, waste: 0.15 },
  { label: "12/12", rise: 12, labor: 1.5, waste: 0.17 },
];
const TIERS = [
  { id: "arch", name: "Architectural shingle", short: "Good", perSq: 135, color: "#5b6470", warranty: "30-yr material" },
  { id: "designer", name: "Designer shingle", short: "Better", perSq: 210, color: "#7a4b3a", warranty: "50-yr material" },
  { id: "metal", name: "Standing-seam metal", short: "Best", perSq: 520, color: "#3d5a6c", warranty: "40-yr finish" },
] as const;
const ADDONS = [
  { id: "ice", name: "Ice & water shield, eaves and valleys", cost: 380 },
  { id: "vent", name: "Ridge vent, 45 ft", cost: 540 },
  { id: "guards", name: "Gutter guards", cost: 1150 },
  { id: "skylight", name: "Re-flash one skylight", cost: 425 },
] as const;
const LABOUR_PER_SQ = 95;
const TEAR_OFF_PER_SQ = 45;
const FIXED = 650; // dumpster and permit

const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

function price(squares: number, pitchIdx: number, tierIdx: number, layers: number, addons: string[], margin: number) {
  const p = PITCHES[pitchIdx];
  const t = TIERS[tierIdx];
  const orderSq = squares * (1 + p.waste);
  const materials = orderSq * t.perSq;
  const labor = squares * LABOUR_PER_SQ * p.labor * (t.id === "metal" ? 1.6 : 1);
  const tearOff = squares * TEAR_OFF_PER_SQ * layers;
  const extras = ADDONS.filter((a) => addons.includes(a.id)).reduce((x, a) => x + a.cost, 0);
  const cost = materials + labor + tearOff + extras + FIXED;
  const total = cost / (1 - margin);
  return { orderSq, materials, labor, tearOff, extras, cost, total, profit: total - cost };
}

export function QuoteBuilder() {
  const [squares, setSquares] = useState(28);
  const [pitchIdx, setPitchIdx] = useState(2);
  const [tierIdx, setTierIdx] = useState(1);
  const [layers, setLayers] = useState(1);
  const [addons, setAddons] = useState<string[]>(["ice", "vent"]);
  const [margin, setMargin] = useState(0.32);
  const [view, setView] = useState<"estimator" | "customer">("estimator");
  const [sent, setSent] = useState(false);

  const q = useMemo(() => price(squares, pitchIdx, tierIdx, layers, addons, margin), [squares, pitchIdx, tierIdx, layers, addons, margin]);
  const options = TIERS.map((_, i) => price(squares, pitchIdx, i, layers, addons, margin).total);
  const pitch = PITCHES[pitchIdx];
  const tier = TIERS[tierIdx];

  /* The roof diagram: a gable whose slope follows the pitch. */
  const span = 220;
  const ridgeH = (pitch.rise / 12) * (span / 2) * 0.9;
  const baseY = 128;
  const left = 50;
  const right = left + span;
  const mid = (left + right) / 2;
  const toggle = (id: string) => {
    setSent(false);
    setAddons((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));
  };

  return (
    <div className={s.root}>
      <header className={s.top}>
        <div className={s.brand}>
          <span className={s.mark} aria-hidden>
            ⌂
          </span>
          Ridgeline Roofing
          <small>Estimate #R-2291 · 418 Oak Hollow Dr</small>
        </div>
        <div className={s.view} role="tablist" aria-label="Who's looking">
          <button role="tab" aria-selected={view === "estimator"} onClick={() => setView("estimator")}>
            Estimator view
          </button>
          <button role="tab" aria-selected={view === "customer"} onClick={() => setView("customer")}>
            Customer view
          </button>
        </div>
      </header>

      <div className={s.body}>
        <section className={s.inputs} aria-label="Measurements and choices">
          <div className={s.diagram}>
            <svg viewBox="0 0 320 196" role="img" aria-label={`Gable roof at ${pitch.label} pitch`}>
              <defs>
                <pattern id="qbGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M10 0H0V10" fill="none" stroke="#c9d3dc" strokeWidth=".6" />
                </pattern>
              </defs>
              <rect width="320" height="196" fill="url(#qbGrid)" />
              <rect x={left + 18} y={baseY} width={span - 36} height="34" fill="#f4efe6" stroke="#24313d" strokeWidth="1.5" />
              <rect x={mid - 12} y={baseY + 10} width="24" height="24" fill="none" stroke="#24313d" strokeWidth="1.2" />
              <polygon
                points={`${left},${baseY} ${mid},${baseY - ridgeH} ${right},${baseY}`}
                fill={tier.color}
                stroke="#24313d"
                strokeWidth="1.5"
                className={s.roof}
              />
              {Array.from({ length: 6 }, (_, k) => {
                const t = (k + 1) / 7;
                return (
                  <line
                    key={k}
                    x1={left + (mid - left) * t}
                    y1={baseY - ridgeH * t}
                    x2={right - (right - mid) * t}
                    y2={baseY - ridgeH * t}
                    stroke="rgba(255,255,255,.18)"
                  />
                );
              })}
              <path d={`M${right - 34},${baseY} A34,34 0 0,0 ${right - 34 * Math.cos(Math.atan(pitch.rise / 12))},${baseY - 34 * Math.sin(Math.atan(pitch.rise / 12))}`} fill="none" stroke="#c4552e" strokeWidth="1.4" />
              <text x={right - 64} y={baseY - 8} className={s.dimText} fill="#c4552e">
                {pitch.label}
              </text>
              <line x1={left} y1={baseY + 46} x2={right} y2={baseY + 46} stroke="#24313d" strokeWidth="1" />
              <line x1={left} y1={baseY + 41} x2={left} y2={baseY + 51} stroke="#24313d" />
              <line x1={right} y1={baseY + 41} x2={right} y2={baseY + 51} stroke="#24313d" />
              <text x={mid} y={baseY + 62} textAnchor="middle" className={s.dimText}>
                {squares} squares · {(squares * 100).toLocaleString("en-US")} sq ft
              </text>
            </svg>
            <span className={s.stamp}>Measured from aerial · Oct 2</span>
          </div>

          <label className={s.field}>
            <span>
              Roof area <b>{squares} sq</b>
            </span>
            <input type="range" min={12} max={60} value={squares} onChange={(e) => (setSquares(+e.target.value), setSent(false))} />
          </label>

          <div className={s.field}>
            <span>Pitch</span>
            <div className={s.segs}>
              {PITCHES.map((p, i) => (
                <button key={p.label} aria-pressed={i === pitchIdx} onClick={() => (setPitchIdx(i), setSent(false))}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className={s.field}>
            <span>Material</span>
            <div className={s.tiers}>
              {TIERS.map((t, i) => (
                <button key={t.id} aria-pressed={i === tierIdx} onClick={() => (setTierIdx(i), setSent(false))}>
                  <i style={{ background: t.color }} aria-hidden />
                  <b>{t.short}</b>
                  <small>{t.name}</small>
                  <em>{usd(options[i])}</em>
                </button>
              ))}
            </div>
          </div>

          <div className={s.row2}>
            <div className={s.field}>
              <span>Tear-off layers</span>
              <div className={s.segs}>
                {[0, 1, 2].map((n) => (
                  <button key={n} aria-pressed={n === layers} onClick={() => (setLayers(n), setSent(false))}>
                    {n === 0 ? "Overlay" : n}
                  </button>
                ))}
              </div>
            </div>
            {view === "estimator" && (
              <label className={s.field}>
                <span>
                  Margin <b>{Math.round(margin * 100)}%</b>
                </span>
                <input type="range" min={20} max={45} value={Math.round(margin * 100)} onChange={(e) => (setMargin(+e.target.value / 100), setSent(false))} />
              </label>
            )}
          </div>

          <fieldset className={s.addons}>
            <legend>Add-ons</legend>
            {ADDONS.map((a) => (
              <label key={a.id}>
                <input type="checkbox" checked={addons.includes(a.id)} onChange={() => toggle(a.id)} />
                <span>{a.name}</span>
                <em>{usd(a.cost)}</em>
              </label>
            ))}
          </fieldset>
        </section>

        <section className={s.sheet} aria-label="Quote">
          <div className={s.sheetHead}>
            <div>
              <small>Prepared for</small>
              <b>Dana &amp; Chris Whitfield</b>
            </div>
            <div className={s.sheetMeta}>
              <small>Valid 30 days</small>
              <b>{tier.warranty}</b>
            </div>
          </div>
          <table className={s.lines}>
            <thead>
              <tr>
                <th>Item</th>
                {view === "estimator" && <th>Cost</th>}
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {[
                [`${tier.name}, ${q.orderSq.toFixed(1)} sq incl. waste`, q.materials],
                [`Install labor, ${pitch.label} pitch`, q.labor],
                [layers ? `Tear-off, ${layers} layer${layers > 1 ? "s" : ""}` : "Overlay, no tear-off", q.tearOff],
                ["Add-ons", q.extras],
                ["Dumpster & permit", FIXED],
              ].map(([label, cost]) => (
                <tr key={label as string}>
                  <td>{label as string}</td>
                  {view === "estimator" && <td className={s.cost}>{usd(cost as number)}</td>}
                  <td>{usd((cost as number) / (1 - margin))}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={s.total}>
            <span>Total</span>
            <strong key={Math.round(q.total)} className={s.tick}>
              {usd(q.total)}
            </strong>
          </div>
          {view === "estimator" ? (
            <div className={s.profit}>
              <span>
                Job cost <b>{usd(q.cost)}</b>
              </span>
              <span>
                Gross profit <b>{usd(q.profit)}</b>
              </span>
              <span className={margin < 0.25 ? s.warn : ""}>{margin < 0.25 ? "Below your 25% floor" : "Above your 25% floor"}</span>
            </div>
          ) : (
            <p className={s.note}>Financing from {usd(q.total / 60)}/mo over 60 months. Deposit {usd(q.total * 0.3)} to book.</p>
          )}
          <button className={s.send} onClick={() => setSent(true)} disabled={sent}>
            {sent ? "✓ Sent with good / better / best" : "Send quote to customer"}
          </button>
        </section>
      </div>
    </div>
  );
}
