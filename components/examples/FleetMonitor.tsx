"use client";
import { useState } from "react";
import { arc, areaPath, smoothPath, toPoints } from "./charts";

/* Concept 04 · Lawn & landscaping. Slate and green, in a builder layout: fleet and
   equipment health for a landscaping company, with a live widget inspector that
   shows the dashboard is shaped to the client. Every name and number is invented. */

const UNITS = {
  "Crew truck 03": { kind: "Truck", id: "TRK-03", hours: "2,418 engine h", fuel: 58, battery: 91, temp: [182, 188, 191, 186, 195, 201, 197, 192, 189, 194] },
  "Mower 12": { kind: "Zero-turn mower", id: "MWR-12", hours: "614 engine h", fuel: 34, battery: 84, temp: [205, 211, 219, 214, 222, 228, 216, 209, 213, 220] },
  "Trailer 05": { kind: "Equipment trailer", id: "TRL-05", hours: "Brake check due", fuel: 0, battery: 72, temp: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
} as const;
type Unit = keyof typeof UNITS;

const WIDGETS = ["Unit info", "Fuel level", "Battery", "Engine temperature"] as const;
type Widget = (typeof WIDGETS)[number];
const SWATCHES = ["#2fb46e", "#3b8cff", "#f2b632", "#e5566b"];
const DATES = ["Sep 6", "Sep 9", "Sep 12", "Sep 15", "Sep 18", "Sep 21", "Sep 24", "Sep 27", "Sep 30", "Oct 3"];

export function FleetMonitor() {
  const [unit, setUnit] = useState<Unit>("Mower 12");
  const [selected, setSelected] = useState<Widget>("Fuel level");
  const [colors, setColors] = useState<Record<Widget, string>>({
    "Unit info": "#2fb46e",
    "Fuel level": "#3b8cff",
    Battery: "#2fb46e",
    "Engine temperature": "#f2b632",
  });
  const [labels, setLabels] = useState(true);
  const u = UNITS[unit];
  const W = 640;
  const H = 120;
  const hasTemp = u.temp.some(Boolean);
  const pts = toPoints([...u.temp], W, H, 160, 240, 18);
  const cls = (w: Widget) => `fl-card ${selected === w ? "is-selected" : ""}`;

  return (
    <div className="dx dx-fleet">
      <header className="fl-top">
        <span className="fl-logo" aria-hidden>
          ≡
        </span>
        <span className="fl-tool">＋ New</span>
        <span className="fl-tool">▢ Open</span>
        <span className="fl-tool">⤓ Save</span>
        <span className="fl-company">Greenway Lawn &amp; Landscape · Fleet</span>
      </header>
      <div className="fl-tabs">
        {["Design", "Units", "Service log", "Alerts"].map((t, k) => (
          <span key={t} className={k === 0 ? "is-on" : ""}>
            {t}
          </span>
        ))}
      </div>

      <div className="fl-body">
        <aside className="fl-rail" aria-label="Widget palette">
          {[
            ["▮▮", "Bars"],
            ["◐", "Gauge"],
            ["10", "Number"],
            ["Aa", "Text"],
            ["⌖", "Map"],
            ["⇆", "Switch"],
          ].map(([i, l]) => (
            <span key={l}>
              <b>{i}</b>
              <small>{l}</small>
            </span>
          ))}
        </aside>

        <div className="fl-canvas">
          <div className="fl-row">
            <article className={cls("Unit info")} onClick={() => setSelected("Unit info")}>
              <h4>Unit</h4>
              <div className="fl-unit">
                <span className="fl-unit-icon" style={{ background: colors["Unit info"] }} aria-hidden>
                  {u.kind === "Truck" ? "▣" : u.kind === "Zero-turn mower" ? "◫" : "▭"}
                </span>
                <span>
                  <b>{unit}</b>
                  {labels && (
                    <small>
                      {u.kind} · {u.id}
                      <br />
                      {u.hours}
                    </small>
                  )}
                </span>
              </div>
              <div className="fl-unit-pick">
                {(Object.keys(UNITS) as Unit[]).map((k) => (
                  <button key={k} type="button" aria-pressed={k === unit} className={k === unit ? "is-on" : ""} onClick={() => setUnit(k)}>
                    {k}
                  </button>
                ))}
              </div>
            </article>

            <article className={cls("Fuel level")} onClick={() => setSelected("Fuel level")}>
              <h4>Fuel level</h4>
              <svg viewBox="0 0 140 140" aria-hidden>
                <circle cx="70" cy="70" r="50" stroke="#2c3644" strokeWidth="12" fill="none" />
                {u.fuel > 0 && (
                  <path d={arc(70, 70, 50, 0, (u.fuel / 100) * 359.9)} stroke={colors["Fuel level"]} strokeWidth="12" fill="none" strokeLinecap="round" />
                )}
                <text x="70" y="78" textAnchor="middle" className="fl-big">
                  {u.fuel ? `${u.fuel}%` : "n/a"}
                </text>
              </svg>
              {labels && <small className="fl-link">{u.fuel && u.fuel < 40 ? "Refuel before tomorrow" : "View history"}</small>}
            </article>

            <article className={cls("Battery")} onClick={() => setSelected("Battery")}>
              <h4>Battery</h4>
              <strong className="fl-big-html">{u.battery}%</strong>
              <span className="fl-battery" aria-hidden>
                {[0, 1, 2, 3].map((k) => (
                  <i key={k} style={{ background: k < Math.round(u.battery / 25) ? colors.Battery : "transparent" }} />
                ))}
              </span>
              {labels && <small className="fl-link">View details</small>}
            </article>
          </div>

          <article className={`${cls("Engine temperature")} fl-wide`} onClick={() => setSelected("Engine temperature")}>
            <h4>Engine temperature</h4>
            {labels && <small className="fl-sub">Last 30 days · daily average °F</small>}
            {hasTemp ? (
              <svg viewBox={`0 0 ${W} ${H + 24}`} aria-hidden>
                <defs>
                  <linearGradient id="flFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor={colors["Engine temperature"]} stopOpacity=".55" />
                    <stop offset="1" stopColor={colors["Engine temperature"]} stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={areaPath(pts, H)} fill="url(#flFill)" />
                <path d={smoothPath(pts)} stroke={colors["Engine temperature"]} strokeWidth="2.5" fill="none" />
                {pts.map((p, k) => (
                  <g key={k}>
                    <line x1={p[0]} x2={p[0]} y1={p[1]} y2={H} stroke={colors["Engine temperature"]} strokeDasharray="2 4" opacity=".6" />
                    <circle cx={p[0]} cy={p[1]} r="4.5" fill="#fff" stroke={colors["Engine temperature"]} strokeWidth="2" />
                    {labels && (
                      <text x={p[0]} y={H + 18} textAnchor="middle" className="fl-lbl">
                        {DATES[k]}
                      </text>
                    )}
                  </g>
                ))}
              </svg>
            ) : (
              <p className="fl-empty">No engine on this unit. Swap the widget for brake and tyre checks.</p>
            )}
          </article>
        </div>

        <aside className="fl-panel" aria-label="Widget inspector">
          <div className="fl-panel-head">Widgets</div>
          <ul className="fl-browser">
            {WIDGETS.map((w) => (
              <li key={w}>
                <button className={w === selected ? "is-on" : ""} onClick={() => setSelected(w)}>
                  <i style={{ background: colors[w] }} aria-hidden />
                  {w}
                </button>
              </li>
            ))}
          </ul>
          <div className="fl-panel-head">Inspector · {selected}</div>
          <div className="fl-inspect">
            <span className="fl-prop">Accent colour</span>
            <div className="fl-swatches">
              {SWATCHES.map((c) => (
                <button
                  key={c}
                  style={{ background: c }}
                  aria-label={`Set colour ${c}`}
                  aria-pressed={colors[selected] === c}
                  onClick={() => setColors((x) => ({ ...x, [selected]: c }))}
                />
              ))}
            </div>
            <label className="fl-toggle">
              <input type="checkbox" checked={labels} onChange={(e) => setLabels(e.target.checked)} />
              <span>Show labels</span>
            </label>
            <span className="fl-prop">Alert when</span>
            <span className="fl-value">
              {selected === "Fuel level" ? "Below 25%" : selected === "Battery" ? "Below 40%" : selected === "Engine temperature" ? "Above 230 °F" : "Service is due"}
            </span>
            <span className="fl-prop">Send alert to</span>
            <span className="fl-value">Crew lead · text message</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
