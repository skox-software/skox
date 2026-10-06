"use client";
import { useState } from "react";
import { areaPath, money, smoothPath, toPoints } from "./charts";

/* Concept 02 · Pool service. Dark, violet and amber: revenue, bookings and service area for a
   multi-location pool-service company. Every name and number is invented. */

const SERIES = {
  Week: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    revenue: [8200, 9100, 7600, 10400, 11800, 6900, 2100],
    jobs: [21, 24, 19, 27, 31, 18, 5],
    total: 56100,
    change: "+3.1%",
  },
  Month: {
    labels: ["1", "4", "8", "12", "16", "20", "24", "28", "31"],
    revenue: [6100, 7400, 6800, 8900, 8200, 9800, 9100, 10300, 9600],
    jobs: [16, 20, 18, 23, 21, 26, 24, 27, 25],
    total: 238400,
    change: "+2.4%",
  },
  Quarter: {
    labels: ["Jul", "Aug", "Sep", "Oct"],
    revenue: [212000, 226500, 238400, 241900],
    jobs: [560, 591, 622, 634],
    total: 676900,
    change: "+6.8%",
  },
} as const;
type Period = keyof typeof SERIES;

const BY_DAY = [
  { d: "Mon", res: 14, com: 7 },
  { d: "Tue", res: 16, com: 8 },
  { d: "Wed", res: 12, com: 7 },
  { d: "Thu", res: 18, com: 9 },
  { d: "Fri", res: 22, com: 9 },
  { d: "Sat", res: 15, com: 3 },
  { d: "Sun", res: 4, com: 1 },
];
const SERVICES = [
  { name: "Weekly pool service", tag: "Recurring", n: "412" },
  { name: "Filter & pump repair", tag: "Repair", n: "137" },
  { name: "Spa start-up", tag: "Seasonal", n: "58" },
];
const SOURCES = [
  { label: "Google", pct: 41, x: 70, y: 92, r: 62, c: "#b9a6f5" },
  { label: "Referrals", pct: 27, x: 150, y: 58, r: 46, c: "#f2c94c" },
  { label: "Repeat", pct: 22, x: 158, y: 138, r: 40, c: "#6fd3f5" },
  { label: "Meta", pct: 10, x: 212, y: 98, r: 22, c: "#8ce3a1" },
];
const LOCATIONS = [
  { name: "Northside", v: 98400, x: 9, y: 4 },
  { name: "Downtown", v: 81250, x: 15, y: 7 },
  { name: "Riverside", v: 58750, x: 6, y: 10 },
];
const BOOKED = new Set([2, 3, 6, 9, 10, 13, 16, 17, 20, 23, 24, 27, 30]);

/* A rough service-area outline as a dot grid: deterministic, no map data. */
const COLS = 26;
const ROWS = 14;
function inArea(c: number, r: number) {
  const a = ((c - 10) / 9) ** 2 + ((r - 6) / 5.5) ** 2 < 1;
  const b = ((c - 17) / 7) ** 2 + ((r - 8.5) / 4.5) ** 2 < 1;
  const coast = c > 23 || (r > 12 && c < 6);
  return (a || b) && !coast;
}

export function RevenueBookings() {
  const [period, setPeriod] = useState<Period>("Month");
  const [hover, setHover] = useState<number | null>(null);
  const [picked, setPicked] = useState(16);
  const s = SERIES[period];
  const W = 520;
  const H = 170;
  const rMax = Math.max(...s.revenue) * 1.12;
  const jMax = Math.max(...s.jobs) * 1.75; // its own lower scale, so the two lines never sit on top of each other
  const rev = toPoints([...s.revenue], W, H, 0, rMax);
  const jobs = toPoints([...s.jobs], W, H, 0, jMax);
  const i = hover ?? s.labels.length - 3;

  return (
    <div className="dx dx-rev">
      <header className="rev-top">
        <span className="rev-brand">peak·pool</span>
        <nav aria-label="Concept navigation">
          {["Overview", "Bookings", "Finance", "Crews"].map((n, k) => (
            <span key={n} className={k === 0 ? "is-on" : ""}>
              {n}
            </span>
          ))}
        </nav>
        <span className="rev-user">
          <i aria-hidden>JR</i>
          <span>
            Jordan Reyes
            <small>Owner</small>
          </span>
        </span>
      </header>

      <div className="rev-grid">
        <article className="rev-card rev-revenue">
          <div className="card-head">
            <h4>Revenue</h4>
            <div className="rev-seg" role="tablist" aria-label="Period">
              {(Object.keys(SERIES) as Period[]).map((p) => (
                <button
                  key={p}
                  role="tab"
                  aria-selected={p === period}
                  onClick={() => {
                    setPeriod(p);
                    setHover(null);
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="rev-stats">
            <div>
              <strong>{money(s.total)}</strong>
              <em className="up">↗ {s.change}</em>
              <small>This {period.toLowerCase()}</small>
            </div>
            <div>
              <strong>{s.jobs.reduce((a, b) => a + b, 0).toLocaleString("en-US")}</strong>
              <em className="up">↗ 4.7%</em>
              <small>Jobs booked</small>
            </div>
          </div>
          <svg viewBox={`0 0 ${W} ${H + 24}`} className="rev-chart" onMouseLeave={() => setHover(null)}>
            <defs>
              <linearGradient id="revFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#b9a6f5" stopOpacity=".35" />
                <stop offset="1" stopColor="#b9a6f5" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0.25, 0.5, 0.75].map((g) => (
              <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="#2a2833" />
            ))}
            <path d={areaPath(rev, H)} fill="url(#revFill)" />
            <path d={smoothPath(rev)} stroke="#b9a6f5" strokeWidth="2.5" fill="none" />
            <path d={smoothPath(jobs)} stroke="#f2c94c" strokeWidth="2" fill="none" />
            <line x1={rev[i][0]} x2={rev[i][0]} y1="0" y2={H} stroke="#6e6a7c" strokeDasharray="4 4" />
            <circle cx={rev[i][0]} cy={rev[i][1]} r="5" fill="#fff" stroke="#b9a6f5" strokeWidth="2" />
            {s.labels.map((l, k) => (
              <g key={l + k}>
                <rect
                  x={rev[k][0] - W / s.labels.length / 2}
                  y="0"
                  width={W / s.labels.length}
                  height={H}
                  fill="transparent"
                  onMouseEnter={() => setHover(k)}
                />
                <text x={rev[k][0]} y={H + 18} textAnchor="middle" className={k === i ? "lbl on" : "lbl"}>
                  {l}
                </text>
              </g>
            ))}
          </svg>
          <div className="rev-tip" style={{ left: `${(rev[i][0] / W) * 100}%` }}>
            <span>
              <i className="dot v" /> {money(s.revenue[i])}
            </span>
            <span>
              <i className="dot y" /> {s.jobs[i]} jobs
            </span>
          </div>
        </article>

        <article className="rev-card rev-cal">
          <div className="card-head">
            <span className="rev-pill">October 2026 ⌄</span>
            <span className="corner">↗</span>
          </div>
          <div className="rev-days">
            {Array.from({ length: 31 }, (_, k) => k + 1).map((d) => (
              <button
                key={d}
                className={`${BOOKED.has(d) ? "busy" : ""} ${d >= picked && d <= picked + 4 ? "in" : ""}`}
                onClick={() => setPicked(Math.min(d, 27))}
                aria-label={`October ${d}`}
              >
                {d}
              </button>
            ))}
          </div>
          <div className="rev-cal-total">
            <strong>{money(18434 + picked * 211)}</strong>
            <small>
              booked Oct {picked}–{picked + 4}
            </small>
          </div>
        </article>

        <article className="rev-card rev-days-card">
          <div className="card-head">
            <h4>Jobs by day</h4>
            <span className="rev-pill">This week</span>
          </div>
          <div className="rev-split">
            <span>
              <i className="dot v" /> Residential <b>101</b>
            </span>
            <span>
              <i className="dot y" /> Commercial <b>44</b>
            </span>
          </div>
          <div className="rev-stack">
            {BY_DAY.map((b) => (
              <div key={b.d} title={`${b.d}: ${b.res + b.com} jobs`}>
                <span className="col">
                  <span className="hatch" style={{ height: `${100 - ((b.res + b.com) / 32) * 100}%` }} />
                  <span className="y" style={{ height: `${(b.com / 32) * 100}%` }} />
                  <span className="v" style={{ height: `${(b.res / 32) * 100}%` }} />
                </span>
                <small>{b.d}</small>
              </div>
            ))}
          </div>
        </article>

        <article className="rev-card rev-services">
          <div className="card-head">
            <h4>Top services</h4>
            <span className="rev-pill">This month</span>
          </div>
          <ul>
            {SERVICES.map((sv) => (
              <li key={sv.name}>
                <span className="thumb" aria-hidden />
                <span>
                  {sv.name}
                  <em>{sv.tag}</em>
                </span>
                <b>{sv.n}</b>
              </li>
            ))}
          </ul>
        </article>

        <article className="rev-card rev-sources">
          <div className="card-head">
            <h4>Lead sources</h4>
          </div>
          <svg viewBox="0 0 250 190" aria-label="Lead sources share">
            {SOURCES.map((b) => (
              <g key={b.label}>
                <circle cx={b.x} cy={b.y} r={b.r} fill={b.c} opacity=".92" />
                <text x={b.x} y={b.y + (b.r > 30 ? 2 : 4)} textAnchor="middle" className={b.r > 30 ? "bub" : "bub sm"}>
                  {b.pct}%
                </text>
                {b.r > 30 && (
                  <text x={b.x} y={b.y + 16} textAnchor="middle" className="bub-l">
                    {b.label}
                  </text>
                )}
              </g>
            ))}
          </svg>
        </article>

        <article className="rev-card rev-map">
          <div className="card-head">
            <h4>Service area</h4>
            <span className="rev-pill">Jobs this month</span>
          </div>
          <svg viewBox={`0 0 ${COLS * 10} ${ROWS * 10}`} aria-label="Service area dot map">
            {Array.from({ length: COLS * ROWS }, (_, k) => {
              const c = k % COLS;
              const r = Math.floor(k / COLS);
              if (!inArea(c, r)) return null;
              const near = LOCATIONS.some((l) => Math.hypot(l.x - c, l.y - r) < 2.6);
              return <circle key={k} cx={c * 10 + 5} cy={r * 10 + 5} r="3" fill={near ? "#b9a6f5" : "#3a3746"} />;
            })}
            {LOCATIONS.map((l) => (
              <circle key={l.name} cx={l.x * 10 + 5} cy={l.y * 10 + 5} r="6" fill="#f2c94c" stroke="#121117" strokeWidth="2" />
            ))}
          </svg>
        </article>

        <article className="rev-card rev-locs">
          <strong className="rev-big">{money(LOCATIONS.reduce((a, l) => a + l.v, 0))}</strong>
          <small>Revenue across locations</small>
          <ul>
            {LOCATIONS.map((l) => (
              <li key={l.name}>
                <span className="flag" aria-hidden />
                {l.name}
                <b>{money(l.v)}</b>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </div>
  );
}
