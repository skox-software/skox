import type { Metadata } from "next";
import Demo from "./Demo";
import "./creditsnitch.css";

/**
 * A private product mockup of CreditSnitch, built for SKOX's second meeting
 * with the client. It is the September 2026 vision document made clickable.
 *
 * The client has NOT approved this and it is not a shipped product. It lives on
 * an unguessable path, is excluded from the sitemap and robots.txt, and carries
 * a standing "private mockup" bar so it can never be mistaken for a live app.
 * An unguessable URL is obscurity, not access control — treat the link as
 * shareable-to-anyone and do not publish it.
 *
 * Every consumer, partner, score, balance and figure is invented. The client's
 * own logo is the only real asset. Nothing here connects to a credit bureau, a
 * data provider or any backend: the Readiness engine in engine.ts runs entirely
 * in the browser over a fixed illustrative profile.
 */
export const metadata: Metadata = {
  title: "CreditSnitch — private product mockup",
  description: "An interactive mockup of the CreditSnitch product vision, prepared by SKOX.",
  robots: { index: false, follow: false, nocache: true },
};

export default function CreditSnitchMockup() {
  return (
    <div className="cs-page">
      <a className="cs-skip" href="#demo">Skip to the mockup</a>

      <div className="cs-bar">
        <span>SKOX × CREDITSNITCH</span>
        <span>Private mockup · Illustrative data · Not a live product</span>
      </div>

      <header className="cs-hero">
        <div className="cs-hero-inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="cs-hero-logo"
            src="/concepts/creditsnitch/logo.png"
            alt="CreditSnitch"
            width={300}
            height={150}
          />
          <h1>From Denied to Qualified, at&nbsp;scale.</h1>
          <p className="cs-hero-lede">
            The product vision, made clickable. Three surfaces, one database, and a
            readiness engine you can drive yourself.
          </p>
          <div className="cs-hero-links">
            <a className="cs-cta cs-cta-hero" href="#demo">Open the mockup</a>
            <a className="cs-ghost" href="#how">How it works</a>
          </div>
        </div>
      </header>

      <main>
        <section className="cs-intro">
          <div className="cs-intro-grid">
            <div>
              <p className="cs-eyebrow">What you are looking at</p>
              <p>
                This is a working mockup, not a slide deck and not a shipped app. The
                screens respond, the numbers recalculate, and the logic behind them is the
                same logic described in the vision document. What it does <em>not</em> do is
                touch real credit data: there is no bureau connection, no data provider and
                no account behind any of it.
              </p>
              <p>
                Every consumer, partner, balance and score on these screens is invented for
                the demonstration.
              </p>
            </div>
            <div>
              <p className="cs-eyebrow">The layer, not another app</p>
              <div className="cs-versus">
                <div><span>Every credit app</span><p>&ldquo;Here is your credit report.&rdquo;</p></div>
                <span className="cs-versus-arrow">→</span>
                <div className="is-us"><span>CreditSnitch</span><p>&ldquo;Here is exactly what to do about it.&rdquo;</p></div>
              </div>
            </div>
          </div>
        </section>

        <Demo />

        <section className="cs-how" id="how">
          <p className="cs-eyebrow">Section 7 · The CreditSnitch engine</p>
          <h2>The credit report is an input. The engine is the product.</h2>
          <p className="cs-how-lede">
            Everything the mockup shows you is produced by defined rules over a single
            profile. That is why switching the goal reshuffles the blockers instead of
            just relabelling the page: the weights changed, not the data.
          </p>
          <div className="cs-engine">
            <ul className="cs-engine-col">
              <li>Goal</li><li>Scores</li><li>Tradelines</li><li>Utilization</li>
              <li>Collections</li><li>Derogatory items</li><li>Payment history</li>
              <li>Inquiries</li><li>Debt profile</li><li>Timeline</li>
              <li>Progress history</li><li>Engagement</li>
            </ul>
            <div className="cs-engine-core">
              <span>CreditSnitch</span>
              <strong>engine</strong>
              <em>Deterministic</em>
            </div>
            <ul className="cs-engine-col is-out">
              <li>Readiness stage</li><li>Top blockers</li><li>Prioritized actions</li>
              <li>Recommended content</li><li>Potential disputes</li>
              <li>Partner status</li><li>Opportunity Score</li><li>Next evaluation date</li>
            </ul>
          </div>
          <p className="cs-how-foot">
            When AI features are added, AI explains the engine&rsquo;s results in plain English.
            It does not make the determinations. That keeps outputs consistent, auditable
            and defensible.
          </p>
        </section>

        <section className="cs-loop">
          <p className="cs-eyebrow">Section 10 · The core loop</p>
          <div className="cs-loop-row">
            <h3>Direct consumer</h3>
            <ol>
              <li>Wants better credit</li><li>Connects credit</li><li>Learns what&rsquo;s wrong</li>
              <li>Follows a personalized plan</li><li>Improves</li>
              <li>CreditSnitch measures progress</li><li>Reaches their goal</li>
            </ol>
          </div>
          <div className="cs-loop-row">
            <h3>Partner-referred</h3>
            <ol>
              <li>Partner has a consumer who isn&rsquo;t ready</li><li>Sends them to CreditSnitch</li>
              <li>Same experience</li><li>Improves</li><li>CreditSnitch detects readiness</li>
              <li>Partner gets notified</li><li>Consumer returns to the partner</li>
            </ol>
          </div>
        </section>

        <section className="cs-notes">
          <p className="cs-eyebrow">Still open</p>
          <ul>
            <li>
              <strong>The credit data provider.</strong> ConsumerDirect, SmartCredit&rsquo;s parent,
              is the first candidate to evaluate for an embedded integration. The score
              inventory in the mockup assumes licensing that is not yet in place.
            </li>
            <li>
              <strong>Dispute letter pricing and delivery.</strong> Needs legal review before
              launch. The mockup shows the flow, not a commitment.
            </li>
            <li>
              <strong>Partner compensation.</strong> How partners are rewarded is a question in
              the vision document, and it carries real regulatory weight. Nothing is
              assumed here.
            </li>
            <li>
              <strong>Readiness thresholds.</strong> What makes someone &ldquo;Qualified&rdquo; in your
              eyes is question 6 in the document. The stage bands in this mockup are
              placeholders we expect you to move.
            </li>
          </ul>
        </section>
      </main>

      <footer className="cs-foot">
        <p>
          Confidential · Prepared for CreditSnitch by SKOX · Private mockup for client
          review. Every figure, consumer and partner shown is illustrative.
        </p>
        <p>skoxsoftware.com</p>
      </footer>
    </div>
  );
}
