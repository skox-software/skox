"use client";

import { useState } from "react";
import { Alert, Arrow, Check, Lock, Shield, Users } from "./icons";
import { PIPELINE, REFERRALS } from "./data";

/**
 * Section 5 — the Connect X Network portal.
 *
 * The important design constraint is what is NOT here: no balances, no scores,
 * no report, no SSN. A partner sees a name, a referral date and a stage, and
 * only where the consumer has consented. The consent toggle in the demo makes
 * that visible rather than asking anyone to take it on faith.
 */

const STAGE_TONE: Record<string, string> = {
  Building: "cs-t-grey",
  Improving: "cs-t-blue",
  "Almost Qualified": "cs-t-amber",
  Qualified: "cs-t-green",
  "Under Contract": "cs-t-green",
};

export default function PartnerPortal() {
  const [view, setView] = useState<"pipeline" | "alerts" | "links">("pipeline");
  const [showRedacted, setShowRedacted] = useState(true);

  const visible = REFERRALS.filter((r) => showRedacted || r.consent);

  return (
    <div className="cs-desk">
      <header className="cs-desk-top">
        <div className="cs-desk-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/concepts/creditsnitch/logo.png" alt="CreditSnitch" width={104} height={52} />
          <span className="cs-netmark">Connect <b>X</b> Network</span>
        </div>
        <nav className="cs-desk-nav" aria-label="Partner portal sections">
          {(["pipeline", "alerts", "links"] as const).map((v) => (
            <button key={v} type="button" className={view === v ? "is-on" : ""} onClick={() => setView(v)}>
              {v === "pipeline" ? "My buyer pipeline" : v === "alerts" ? "Alerts & updates" : "Referral links"}
            </button>
          ))}
        </nav>
        <div className="cs-desk-who">
          <span className="cs-avatar">JS</span>
          <div><strong>Jane Smith</strong><span>Century 21 · Realtor</span></div>
        </div>
      </header>

      {view === "pipeline" && (
        <div className="cs-desk-body">
          <div className="cs-funnel">
            {PIPELINE.map((p) => (
              <div key={p.label} className="cs-funnel-cell">
                <b>{p.value}</b>
                <span>{p.label}</span>
              </div>
            ))}
          </div>

          <section className="cs-panel">
            <div className="cs-panel-head">
              <h3>Who should I contact?</h3>
              <label className="cs-toggle">
                <input type="checkbox" checked={showRedacted} onChange={(e) => setShowRedacted(e.target.checked)} />
                Show referrals without consent
              </label>
            </div>
            <table className="cs-table">
              <thead>
                <tr><th>Consumer</th><th>Referred</th><th>Readiness stage</th><th>Moved this month</th><th>Last active</th><th /></tr>
              </thead>
              <tbody>
                {visible.map((r) => (
                  <tr key={r.name} className={r.consent ? "" : "is-redacted"}>
                    <td>{r.consent ? r.name : <span className="cs-redact"><Lock size={13} /> Consent not given</span>}</td>
                    <td>{r.referred}</td>
                    <td>
                      {r.consent
                        ? <span className={`cs-tag ${STAGE_TONE[r.stage]}`}>{r.stage}</span>
                        : <span className="cs-tag cs-t-grey">Hidden</span>}
                    </td>
                    <td>{r.consent ? (r.moved ? <span className="cs-up">▲ Up a stage</span> : "—") : "—"}</td>
                    <td>{r.consent ? r.lastActive : "—"}</td>
                    <td>
                      {r.consent && (r.stage === "Qualified" ? <button type="button" className="cs-mini">Contact now</button> : <span className="cs-wait">Don&rsquo;t contact yet</span>)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="cs-privacy">
            <Shield size={18} />
            <div>
              <h4>What partners can and cannot see</h4>
              <ul>
                <li><Check size={14} /> Name, referral date and Readiness stage — with the consumer&rsquo;s consent</li>
                <li><Check size={14} /> Qualified alerts and monthly updates — with the consumer&rsquo;s consent</li>
                <li className="is-never"><Lock size={14} /> Balances and detailed financial information — never</li>
                <li className="is-never"><Lock size={14} /> Credit reports — never</li>
                <li className="is-never"><Lock size={14} /> SSNs and account numbers — never</li>
              </ul>
              <p>Consent is recorded with a version and timestamp, and the consumer can revoke it at any time.</p>
            </div>
          </section>
        </div>
      )}

      {view === "alerts" && (
        <div className="cs-desk-body cs-two">
          <section className="cs-panel cs-alertcard">
            <span className="cs-alert-icon"><Alert size={20} /></span>
            <h3>John D. is now Qualified.</h3>
            <dl className="cs-detail">
              <div><dt>Referred</dt><dd>March 14</dd></div>
              <div><dt>Stage</dt><dd><span className="cs-tag cs-t-green">Qualified</span></dd></div>
              <div><dt>Next step</dt><dd>Reconnect with John</dd></div>
            </dl>
            <button type="button" className="cs-mini">Contact now <Arrow size={14} /></button>
            <p className="cs-legal">
              This is the hook on the partner side: it recovers leads that would otherwise
              be lost. Readiness is a CreditSnitch planning tool, not a lender decision.
            </p>
          </section>

          <section className="cs-panel">
            <h3>Your September referral update</h3>
            <p className="cs-sub">Sent automatically on the 1st of every month. Manual reporting time: zero.</p>
            <ul className="cs-deltas">
              <li className="is-moved"><span>Moved up a stage</span><b>7</b></li>
              <li className="is-moved"><span>Newly Qualified</span><b>2</b></li>
              <li><span>No movement</span><b>11</b></li>
              <li className="is-moved"><span>Contact now</span><b>John D., Maria L.</b></li>
            </ul>
          </section>
        </div>
      )}

      {view === "links" && (
        <div className="cs-desk-body cs-two">
          <section className="cs-panel">
            <h3>Your referral link</h3>
            <p className="cs-sub">
              Attribution is stored permanently in the database, not in a cookie. Every
              consumer gets the same app — the only difference is <em>Source: Partner, Jane Smith</em>.
            </p>
            <code className="cs-url">creditsnitch.com/r/janesmith</code>
            <div className="cs-qr" aria-hidden>
              <QR />
            </div>
            <p className="cs-legal">For open houses, texts, social posts, emails and lead follow-up.</p>
          </section>
          <section className="cs-panel cs-cobrand">
            <p className="cs-eyebrow">Later phase</p>
            <h3>Jane Smith × CreditSnitch</h3>
            <p className="cs-cobrand-line">
              Find out exactly what stands between you and your new home.
            </p>
            <button type="button" className="cs-mini">Preview my co-branded page</button>
            <div className="cs-cohort">
              <Users size={16} />
              <p>
                Launch cohort: existing Century 21, Compass and eXp relationships already
                inside the Connect X Network.
              </p>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

/** A decorative QR-like block. It encodes nothing; this is a mockup. */
function QR() {
  const cells = Array.from({ length: 144 }, (_, i) => {
    const x = i % 12, y = Math.floor(i / 12);
    const finder = (x < 3 && y < 3) || (x > 8 && y < 3) || (x < 3 && y > 8);
    return finder || (x * 7 + y * 13 + x * y) % 3 === 0;
  });
  return (
    <div className="cs-qr-grid">
      {cells.map((on, i) => <span key={i} className={on ? "is-on" : ""} />)}
    </div>
  );
}
