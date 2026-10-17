"use client";

import { useState } from "react";
import { Arrow, Spark, Target, Trend } from "./icons";
import { KPIS, NEXT_BEST_ACTION, OPPORTUNITIES, STAGE_MIX } from "./data";

/**
 * Section 6 — the internal view.
 *
 * The point of this screen is the Opportunity Score, which is deliberately not
 * the consumer's Readiness. Carmen is Qualified and ranks last, because her
 * timeline is two years out. That inversion is the whole argument for having a
 * second score, so the demo sorts by it and shows the formula above the table.
 */

const TONE: Record<string, string> = {
  Building: "cs-t-grey",
  Improving: "cs-t-blue",
  "Almost Qualified": "cs-t-amber",
  Qualified: "cs-t-green",
};

export default function CommandCenter() {
  const [sort, setSort] = useState<"opportunity" | "readiness">("opportunity");
  const stageRank = ["Building", "Improving", "Almost Qualified", "Qualified"];
  const rows = [...OPPORTUNITIES].sort((a, b) =>
    sort === "opportunity"
      ? b.score - a.score
      : stageRank.indexOf(b.stage) - stageRank.indexOf(a.stage),
  );
  const total = STAGE_MIX.reduce((a, s) => a + s.value, 0);

  return (
    <div className="cs-desk">
      <header className="cs-desk-top">
        <div className="cs-desk-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/concepts/creditsnitch/logo.png" alt="CreditSnitch" width={104} height={52} />
          <span className="cs-netmark">Command <b>Center</b></span>
        </div>
        <nav className="cs-desk-nav" aria-label="Command center sections">
          <button type="button" className="is-on">Overview</button>
          <button type="button">Consumers</button>
          <button type="button">Partners</button>
          <button type="button">Content</button>
        </nav>
        <div className="cs-desk-who">
          <span className="cs-avatar">CS</span>
          <div><strong>CreditSnitch team</strong><span>Internal</span></div>
        </div>
      </header>

      <div className="cs-desk-body">
        <div className="cs-kpis">
          {KPIS.map((k) => (
            <div key={k.label} className="cs-kpi">
              <span>{k.label}</span>
              <b>{k.value}</b>
              <em>{k.delta}</em>
            </div>
          ))}
        </div>

        <section className="cs-panel">
          <h3>Consumers by Readiness stage</h3>
          <div className="cs-mix" role="img" aria-label={STAGE_MIX.map((s) => `${s.label}: ${s.value}`).join(", ")}>
            {STAGE_MIX.map((s) => (
              <span key={s.label} className={`cs-mix-seg ${TONE[s.label]}`} style={{ flexGrow: s.value }} />
            ))}
          </div>
          <ul className="cs-mix-key">
            {STAGE_MIX.map((s) => (
              <li key={s.label}>
                <i className={TONE[s.label]} /> {s.label}
                <b>{s.value}</b>
                <em>{Math.round((s.value / total) * 100)}%</em>
              </li>
            ))}
          </ul>
        </section>

        <section className="cs-panel">
          <div className="cs-panel-head">
            <div>
              <h3>Who deserves attention now</h3>
              <p className="cs-formula">
                <Target size={15} /> Opportunity = Readiness + Intent + Timeline + Engagement + Recent Improvement
              </p>
            </div>
            <div className="cs-segmented" role="group" aria-label="Sort the queue">
              <button type="button" className={sort === "opportunity" ? "is-on" : ""} onClick={() => setSort("opportunity")}>
                Opportunity Score
              </button>
              <button type="button" className={sort === "readiness" ? "is-on" : ""} onClick={() => setSort("readiness")}>
                Readiness stage
              </button>
            </div>
          </div>

          <table className="cs-table">
            <thead>
              <tr><th>Consumer</th><th>Goal</th><th>Stage</th><th>Opportunity</th><th>Why</th><th>Next best action</th></tr>
            </thead>
            <tbody>
              {rows.map((o) => (
                <tr key={o.name}>
                  <td><strong>{o.name}</strong><span className="cs-src">{o.partner}</span></td>
                  <td>{o.goal}</td>
                  <td><span className={`cs-tag ${TONE[o.stage]}`}>{o.stage}</span></td>
                  <td>
                    <span className="cs-oppscore">
                      <i style={{ width: `${o.score}%` }} />
                      <b>{o.score}</b>
                    </span>
                  </td>
                  <td className="cs-why">{o.reason}</td>
                  <td className="cs-why">{o.next}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="cs-legal">
            Sort by Readiness stage and Carmen V. jumps to the top. She is Qualified and
            she is not going to buy for two years. That gap is why Opportunity is scored
            separately from what the consumer sees.
          </p>
        </section>

        <section className="cs-panel cs-nba">
          <div className="cs-panel-head">
            <h3>Next Best Action — Marcus W.</h3>
            <span className="cs-pill"><Spark size={14} /> Engine output</span>
          </div>
          <div className="cs-nba-grid">
            {NEXT_BEST_ACTION.map((n) => (
              <div key={n.who}>
                <span className="cs-eyebrow">{n.who}</span>
                <p>{n.what}</p>
              </div>
            ))}
          </div>
          <p className="cs-legal">
            <Trend size={14} /> Every recommendation here is produced by defined rules over
            the profile. When AI is added, it explains these results in plain English; it
            does not make the determinations. <Arrow size={14} /> Consistent, auditable, defensible.
          </p>
        </section>
      </div>
    </div>
  );
}
