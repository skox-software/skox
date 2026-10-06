"use client";
import { useMemo, useState } from "react";
import s from "./TruckStock.module.css";

/* Tool 04 · Electrical. Truck stock: what's on each van, what's running low,
   and a pick list that writes itself. Industrial charcoal and electric yellow.
   Every part, price and name is invented. */

type Part = { sku: string; name: string; unit: string; par: number; cost: number };
const PARTS: Part[] = [
  { sku: "WR-122", name: "12/2 NM-B wire", unit: "250 ft roll", par: 4, cost: 118 },
  { sku: "BR-20S", name: "20A single-pole breaker", unit: "each", par: 12, cost: 9 },
  { sku: "GF-20", name: "GFCI receptacle, 20A", unit: "each", par: 10, cost: 21 },
  { sku: "AF-15", name: "AFCI breaker, 15A", unit: "each", par: 8, cost: 46 },
  { sku: "EM-12", name: "1/2 in EMT conduit", unit: "10 ft stick", par: 20, cost: 7 },
  { sku: "LD-6W", name: "6 in LED wafer light", unit: "each", par: 16, cost: 14 },
  { sku: "SC-CO", name: "Smoke + CO alarm", unit: "each", par: 6, cost: 38 },
  { sku: "WN-MX", name: "Wire connectors, mixed", unit: "box", par: 6, cost: 12 },
];
const VANS = {
  "Van 2": { tech: "Tomás R.", stock: [3, 4, 9, 2, 14, 15, 1, 5] },
  "Van 4": { tech: "Priya K.", stock: [1, 11, 3, 7, 6, 12, 5, 2] },
  "Van 7": { tech: "Greg H.", stock: [4, 12, 10, 8, 19, 4, 6, 6] },
} as const;
type Van = keyof typeof VANS;

const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
const level = (on: number, par: number) => (on / par < 0.35 ? "low" : on / par < 0.7 ? "watch" : "ok");

export function TruckStock() {
  const [van, setVan] = useState<Van>("Van 4");
  const [stock, setStock] = useState<Record<Van, number[]>>({
    "Van 2": [...VANS["Van 2"].stock],
    "Van 4": [...VANS["Van 4"].stock],
    "Van 7": [...VANS["Van 7"].stock],
  });
  const [scan, setScan] = useState("");
  const [log, setLog] = useState<string[]>(["06:58  Van 4 checked out by Priya K."]);
  const [sent, setSent] = useState<Van | null>(null);

  const on = stock[van];
  const restock = useMemo(
    () =>
      PARTS.map((p, i) => ({ ...p, need: p.par - on[i], on: on[i] }))
        .filter((p) => level(p.on, p.par) !== "ok")
        .sort((a, b) => a.on / a.par - b.on / b.par),
    [on],
  );
  const value = PARTS.reduce((a, p, i) => a + p.cost * on[i], 0);
  const low = PARTS.filter((p, i) => level(on[i], p.par) === "low").length;
  const fill = Math.round((PARTS.reduce((a, p, i) => a + Math.min(1, on[i] / p.par), 0) / PARTS.length) * 100);
  const restockCost = restock.reduce((a, p) => a + p.need * p.cost, 0);

  function change(i: number, d: number, why: string) {
    setStock((st) => ({ ...st, [van]: st[van].map((n, k) => (k === i ? Math.max(0, n + d) : n)) }));
    setSent(null);
    const now = new Date();
    const t = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    setLog((l) => [`${t}  ${why}: ${PARTS[i].name} ${d > 0 ? "+" : "−"}${Math.abs(d)} (${van})`, ...l].slice(0, 6));
  }

  function submitScan(e: React.FormEvent) {
    e.preventDefault();
    const q = scan.trim().toLowerCase();
    const i = PARTS.findIndex((p) => p.sku.toLowerCase() === q || p.name.toLowerCase().includes(q));
    if (q && i >= 0) {
      change(i, -1, "Used on job #E-5520");
      setScan("");
    }
  }

  function receive() {
    setStock((st) => ({ ...st, [van]: PARTS.map((p, i) => Math.max(st[van][i], p.par)) }));
    setLog((l) => [`Restocked ${van} to par from warehouse`, ...l].slice(0, 6));
    setSent(null);
  }

  return (
    <div className={s.root}>
      <header className={s.top}>
        <span className={s.brand}>
          <b aria-hidden>⚡</b> VOLTLINE ELECTRIC
          <small>Truck stock</small>
        </span>
        <div className={s.vans} role="tablist" aria-label="Choose a van">
          {(Object.keys(VANS) as Van[]).map((v) => {
            const lows = PARTS.filter((p, i) => level(stock[v][i], p.par) === "low").length;
            return (
              <button key={v} role="tab" aria-selected={v === van} onClick={() => setVan(v)}>
                {v}
                <small>{VANS[v].tech}</small>
                {lows > 0 && <i>{lows}</i>}
              </button>
            );
          })}
        </div>
      </header>

      <div className={s.kpis}>
        <div>
          <small>Stock on van</small>
          <strong>{usd(value)}</strong>
        </div>
        <div>
          <small>Running low</small>
          <strong className={low ? s.red : ""}>{low}</strong>
        </div>
        <div>
          <small>Fill to par</small>
          <strong>{fill}%</strong>
          <span className={s.fillbar}>
            <i style={{ width: `${fill}%` }} />
          </span>
        </div>
        <form className={s.scan} onSubmit={submitScan}>
          <label htmlFor="ts-scan">Scan or type a part used</label>
          <div>
            <input id="ts-scan" list="ts-skus" value={scan} onChange={(e) => setScan(e.target.value)} placeholder="e.g. GF-20 or breaker" autoComplete="off" />
            <datalist id="ts-skus">
              {PARTS.map((p) => (
                <option key={p.sku} value={p.sku}>
                  {p.name}
                </option>
              ))}
            </datalist>
            <button type="submit">Log −1</button>
          </div>
        </form>
      </div>

      <div className={s.body}>
        <table className={s.table}>
          <thead>
            <tr>
              <th>Part</th>
              <th>SKU</th>
              <th className={s.levelCol}>On van / par</th>
              <th aria-label="Adjust" />
            </tr>
          </thead>
          <tbody>
            {PARTS.map((p, i) => {
              const lv = level(on[i], p.par);
              return (
                <tr key={p.sku} className={s[lv]}>
                  <td>
                    <b>{p.name}</b>
                    <small>{p.unit}</small>
                  </td>
                  <td className={s.mono}>{p.sku}</td>
                  <td>
                    <div className={s.level}>
                      <span className={s.bar}>
                        <i style={{ width: `${Math.min(100, (on[i] / p.par) * 100)}%` }} />
                        <em style={{ left: "35%" }} aria-hidden />
                      </span>
                      <span className={s.mono}>
                        {on[i]}/{p.par}
                      </span>
                      {lv !== "ok" && <span className={s.flag}>{lv === "low" ? "LOW" : "WATCH"}</span>}
                    </div>
                  </td>
                  <td className={s.adj}>
                    <button onClick={() => change(i, -1, "Used")} aria-label={`Use one ${p.name}`} disabled={on[i] === 0}>
                      −
                    </button>
                    <button onClick={() => change(i, 1, "Returned")} aria-label={`Add one ${p.name}`}>
                      +
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <aside className={s.side}>
          <div className={s.pick}>
            <div className={s.pickHead}>
              <h4>Pick list · {van}</h4>
              <span>{restock.length} lines</span>
            </div>
            {restock.length === 0 ? (
              <p className={s.allgood}>Fully stocked. Nothing to pick.</p>
            ) : (
              <ul>
                {restock.map((p) => (
                  <li key={p.sku}>
                    <span className={s.qty}>{p.need}×</span>
                    <span>
                      {p.name}
                      <small>{p.sku}</small>
                    </span>
                    <span className={s.mono}>{usd(p.need * p.cost)}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className={s.pickFoot}>
              <span>
                Restock cost <b>{usd(restockCost)}</b>
              </span>
              <button className={s.send} disabled={!restock.length || sent === van} onClick={() => (setSent(van), setLog((l) => [`Pick list sent for ${van}: ready by 6:30 am`, ...l].slice(0, 6)))}>
                {sent === van ? "✓ Sent to warehouse" : "Send to warehouse"}
              </button>
              {sent === van && (
                <button className={s.recv} onClick={receive}>
                  Mark received
                </button>
              )}
            </div>
          </div>
          <div className={s.log}>
            <h4>Activity</h4>
            <ul>
              {log.map((l, i) => (
                <li key={i + l}>{l}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
