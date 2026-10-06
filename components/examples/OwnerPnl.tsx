"use client";
import { useState } from "react";
import { arc, money, smoothPath, toPoints } from "./charts";

/* Concept 03 · Pest control. Deep navy: the owner's profit view, with ad spend set
   against booked jobs per channel. Every name and number is invented. */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const YEARS = {
  "This year": {
    sales: [182, 176, 214, 268, 331, 362, 371, 355, 309, 284, 0, 0],
    totalSales: 2852000,
    salesChange: "+12%",
    expenses: 1964000,
    expChange: "−4%",
    cpj: 84,
    cpjChange: "−11%",
    rating: 4.8,
  },
  "Last year": {
    sales: [161, 158, 190, 236, 298, 327, 340, 318, 281, 255, 214, 188],
    totalSales: 2966000,
    salesChange: "+7%",
    expenses: 2210000,
    expChange: "+3%",
    cpj: 95,
    cpjChange: "+2%",
    rating: 4.6,
  },
} as const;
type Year = keyof typeof YEARS;

/* Cost per booked job, by channel, by month (USD). */
const CHANNELS = [
  { name: "Google search", c: "#7c83ff", v: [96, 92, 90, 86, 81, 78, 76, 79, 82, 80, 84, 88] },
  { name: "Meta", c: "#f2c94c", v: [118, 121, 114, 109, 104, 101, 99, 103, 108, 112, 115, 117] },
  { name: "Door hangers", c: "#ef6b6b", v: [142, 139, 150, 146, 151, 158, 161, 156, 149, 153, 160, 165] },
];
const COSTS_RAW = [
  { name: "Technician labour", v: 912000, c: "#7c83ff" },
  { name: "Products & materials", v: 386000, c: "#a77cf5" },
  { name: "Fleet & fuel", v: 268000, c: "#d773e0" },
  { name: "Marketing", v: 214000, c: "#f2c94c" },
  { name: "Office & overhead", v: 184000, c: "#ef6b6b" },
];
const TOTAL_COST = COSTS_RAW.reduce((a, c) => a + c.v, 0);
/* Each slice's start and end angle, worked out once rather than during render. */
const COSTS = COSTS_RAW.map((c, k) => {
  const before = COSTS_RAW.slice(0, k).reduce((a, x) => a + x.v, 0);
  return { ...c, start: (before / TOTAL_COST) * 360, sweep: (c.v / TOTAL_COST) * 360 };
});

export function OwnerPnl() {
  const [year, setYear] = useState<Year>("This year");
  const [bar, setBar] = useState(5);
  const [month, setMonth] = useState(8);
  const [slice, setSlice] = useState<number | null>(null);
  const y = YEARS[year];
  const maxBar = 400;
  const LW = 470;
  const LH = 130;
  const totalCost = TOTAL_COST;

  return (
    <div className="dx dx-pnl">
      <header className="pnl-top">
        <span className="pnl-brand">
          <i aria-hidden /> Summit Pest Control
        </span>
        <nav aria-label="Concept navigation">
          {["Dashboard", "Routes", "Customers", "Marketing", "Reports"].map((n, k) => (
            <span key={n} className={k === 0 ? "is-on" : ""}>
              {n}
            </span>
          ))}
        </nav>
        <span className="pnl-user">
          <i aria-hidden>AL</i> Ana L. <small>Owner</small>
        </span>
      </header>

      <div className="pnl-titlebar">
        <h3>Owner dashboard</h3>
        <div className="pnl-actions">
          <div className="pnl-seg" role="tablist" aria-label="Year">
            {(Object.keys(YEARS) as Year[]).map((k) => (
              <button key={k} role="tab" aria-selected={k === year} onClick={() => setYear(k)}>
                {k}
              </button>
            ))}
          </div>
          <span className="pnl-btn">⇪ Export</span>
          <span className="pnl-btn pnl-btn-strong">Share with partner</span>
        </div>
      </div>

      <div className="pnl-grid">
        <div className="pnl-kpis">
          <article className="pnl-card">
            <small>Total sales</small>
            <strong>{money(y.totalSales)}</strong>
            <em className="up">↗ {y.salesChange} on last year</em>
          </article>
          <article className="pnl-card">
            <small>Total expenses</small>
            <strong>{money(y.expenses)}</strong>
            <em className={y.expChange.startsWith("−") ? "up" : "down"}>{y.expChange} on last year</em>
          </article>
          <article className="pnl-card">
            <small>Cost per booked job</small>
            <strong>{money(y.cpj)}</strong>
            <em className={y.cpjChange.startsWith("−") ? "up" : "down"}>{y.cpjChange} on last year</em>
          </article>
          <article className="pnl-card">
            <small>Average review</small>
            <strong>{y.rating.toFixed(1)}</strong>
            <em className="flat">Across 3 branches</em>
          </article>
        </div>

        <article className="pnl-card pnl-sales">
          <div className="card-head">
            <h4>Sales by month</h4>
            <span className="corner">→</span>
          </div>
          <div className="pnl-bars">
            {y.sales.map((v, k) => (
              <button
                key={MONTHS[k]}
                className={`${k === bar ? "is-on" : ""} ${v === 0 ? "empty" : ""}`}
                onMouseEnter={() => v && setBar(k)}
                onFocus={() => v && setBar(k)}
                aria-label={`${MONTHS[k]}: ${v ? money(v * 1000) : "not yet"}`}
              >
                <span style={{ height: `${Math.max(v, 6) / maxBar * 100}%` }} />
                <small>{MONTHS[k]}</small>
              </button>
            ))}
            <div className="pnl-tip" style={{ left: `${(bar + 0.5) * (100 / 12)}%` }}>
              <small>{MONTHS[bar]} sales</small>
              <b>{money(y.sales[bar] * 1000)}</b>
              {bar === 5 && <em>Peak season</em>}
            </div>
          </div>
        </article>

        <article className="pnl-card pnl-channels">
          <div className="card-head">
            <h4>Cost per booked job, by channel</h4>
            <span className="corner">→</span>
          </div>
          <div className="pnl-ch-body">
            <ul className="pnl-legend">
              {CHANNELS.map((ch) => (
                <li key={ch.name}>
                  <i style={{ background: ch.c }} />
                  <span>
                    <b>{money(ch.v[month])}</b> {ch.name}
                  </span>
                </li>
              ))}
            </ul>
            <svg viewBox={`0 0 ${LW} ${LH + 22}`} onMouseLeave={() => setMonth(8)}>
              {[0.33, 0.66].map((g) => (
                <line key={g} x1="0" x2={LW} y1={LH * g} y2={LH * g} stroke="#232a52" />
              ))}
              {CHANNELS.map((ch) => {
                const pts = toPoints(ch.v, LW, LH, 60, 175, 8);
                return (
                  <g key={ch.name}>
                    <path d={smoothPath(pts)} stroke={ch.c} strokeWidth="2.2" fill="none" />
                    <circle cx={pts[month][0]} cy={pts[month][1]} r="4.5" fill="#0f1433" stroke={ch.c} strokeWidth="2" />
                  </g>
                );
              })}
              {MONTHS.map((m, k) => {
                const x = 8 + (k * (LW - 16)) / 11;
                return (
                  <g key={m}>
                    <rect x={x - 19} y="0" width="38" height={LH} fill="transparent" onMouseEnter={() => setMonth(k)} />
                    {k === month && <line x1={x} x2={x} y1="0" y2={LH} stroke="#4b5288" strokeDasharray="3 4" />}
                    <text x={x} y={LH + 16} textAnchor="middle" className={k === month ? "lbl on" : "lbl"}>
                      {m}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </article>

        <article className="pnl-card pnl-costs">
          <div className="card-head">
            <h4>Where the money goes</h4>
            <span className="corner">→</span>
          </div>
          <div className="pnl-costs-body">
            <ul className="pnl-cost-list">
              {COSTS.map((c, k) => (
                <li
                  key={c.name}
                  className={slice === k ? "is-on" : ""}
                  onMouseEnter={() => setSlice(k)}
                  onMouseLeave={() => setSlice(null)}
                >
                  <i style={{ background: c.c }} />
                  <span>{c.name}</span>
                  <b>{money(c.v)}</b>
                </li>
              ))}
            </ul>
            <svg viewBox="0 0 200 200" aria-label="Expenses breakdown">
              {COSTS.map((c, k) => {
                const start = c.start + 2;
                const end = c.start + c.sweep - 2;
                return (
                  <path
                    key={c.name}
                    d={arc(100, 100, 72, start, end)}
                    stroke={c.c}
                    strokeWidth={slice === k ? 30 : 24}
                    fill="none"
                    strokeLinecap="round"
                    opacity={slice === null || slice === k ? 1 : 0.35}
                    onMouseEnter={() => setSlice(k)}
                    onMouseLeave={() => setSlice(null)}
                  />
                );
              })}
              <text x="100" y="98" textAnchor="middle" className="donut-big">
                {slice === null ? money(totalCost / 1000) + "K" : Math.round((COSTS[slice].v / totalCost) * 100) + "%"}
              </text>
              <text x="100" y="118" textAnchor="middle" className="donut-small">
                {slice === null ? "spent this year" : COSTS[slice].name}
              </text>
            </svg>
          </div>
        </article>
      </div>
    </div>
  );
}
