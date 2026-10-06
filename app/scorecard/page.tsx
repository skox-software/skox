import type { Metadata } from "next";
import Link from "next/link";
import { SkoxLogo } from "@/components/SkoxLogo";
import { ScorecardForm } from "@/components/ScorecardForm";
import "./scorecard.css";

export const metadata: Metadata = {
  title: "Free Monday Locations Scorecard for service businesses",
  description:
    "A free Excel and Google Sheets template that puts every location side by side: revenue, jobs, labour and ad spend against your own targets, and flags who's slipping.",
  alternates: { canonical: "/scorecard" },
  openGraph: {
    title: "Free Monday Locations Scorecard",
    description: "Every location, side by side. A free template for service businesses with more than one location or crew.",
    url: "/scorecard",
  },
};

/* The template's own sample data, week of Sep 28 2026. Invented, and labelled so. */
const SAMPLE = [
  { name: "Northside", revenue: "$18,300", target: "+1.7%", labour: "30.1%", watch: "On track", ok: true },
  {
    name: "Downtown",
    revenue: "$19,550",
    target: "−11.1%",
    labour: "34.8%",
    watch: "Below revenue target. Labour over target. Booked jobs costing too much.",
    ok: false,
  },
  { name: "Riverside", revenue: "$14,950", target: "+6.8%", labour: "37.7%", watch: "Labour over target.", ok: false },
];

const INSIDE = [
  { title: "Setup", body: "Your locations and a weekly target for each: revenue, labour, cost per booked job, close rate." },
  { title: "Weekly input", body: "One row per location each Monday, from your job software, payroll and ad accounts." },
  { title: "Scorecard", body: "Every location side by side against its targets and last week, with a plain-English Watch column." },
  { title: "Trend", body: "Eight weeks of revenue and booked jobs per location, so you see a slide before the bank does." },
];

export default function ScorecardPage() {
  return (
    <div className="landing-page scorecard-page">
      <header className="scorecard-header shell">
        <Link href="/" aria-label="SKOX home">
          <SkoxLogo className="brand-logo" />
        </Link>
      </header>

      <main>
        <section className="scorecard-hero shell">
          <div className="scorecard-copy">
            <p className="eyebrow">Free template · Excel &amp; Google Sheets</p>
            <h1>Every location, side by side.</h1>
            <p className="scorecard-intro">
              A free Monday scorecard for service businesses with more than one location, territory or crew. Revenue,
              jobs, labour and ad spend against your own targets, in about ten minutes a week.
            </p>
            <ul className="scorecard-points">
              <li>See which location is slipping, and why, in one table.</li>
              <li>Cost per booked job and labour % for every location.</li>
              <li>Eight-week trend, so a slide shows up before the bank statement.</li>
            </ul>
          </div>
          <ScorecardForm />
        </section>

        <section className="scorecard-preview shell" aria-labelledby="preview-title">
          <div className="scorecard-preview-head">
            <h2 id="preview-title">What Monday looks like</h2>
            <span className="scorecard-sample-tag">Sample data</span>
          </div>
          <div className="scorecard-table-wrap">
            <table className="scorecard-table">
              <thead>
                <tr>
                  <th scope="col">Location</th>
                  <th scope="col">Revenue</th>
                  <th scope="col">vs target</th>
                  <th scope="col">Labour %</th>
                  <th scope="col">Watch</th>
                </tr>
              </thead>
              <tbody>
                {SAMPLE.map((row) => (
                  <tr key={row.name}>
                    <th scope="row">{row.name}</th>
                    <td>{row.revenue}</td>
                    <td className={row.target.startsWith("−") ? "is-bad" : "is-good"}>{row.target}</td>
                    <td>{row.labour}</td>
                    <td className={row.ok ? "is-good" : "is-bad"}>{row.watch}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="scorecard-note">
            The sample locations and numbers are invented, to show how the template works.
          </p>
        </section>

        <section className="scorecard-inside shell" aria-labelledby="inside-title">
          <h2 id="inside-title">What&apos;s inside</h2>
          <ol className="scorecard-tabs">
            {INSIDE.map((tab, i) => (
              <li key={tab.title}>
                <span className="scorecard-tab-number">{String(i + 1).padStart(2, "0")}</span>
                <h3>{tab.title}</h3>
                <p>{tab.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="scorecard-upsell shell">
          <div>
            <h2>Rather it filled itself in?</h2>
            <p>
              We build this as a live dashboard, connected to the tools you already use. A free 30-minute scope call
              gets you a written plan, a fixed price and a delivery date. The plan is yours whether you hire us or not.
            </p>
          </div>
          <Link href="/dashboard-examples" className="button button-dark">
            See dashboard examples <span aria-hidden>→</span>
          </Link>
        </section>
      </main>

      <footer className="scorecard-footer shell">
        <p>
          Built by SKOX, an independent software studio. <Link href="/privacy">Privacy</Link>
        </p>
      </footer>
    </div>
  );
}
