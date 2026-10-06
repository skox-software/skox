import type { Metadata } from "next";
import Link from "next/link";
import { SkoxLogo } from "@/components/SkoxLogo";
import { trades } from "@/content/trades";
import "../dashboard-examples/examples.css";
import "./hub.css";

export const metadata: Metadata = {
  title: "Examples: dashboards and internal tools you can try",
  description:
    "Eight interactive concept builds for service businesses: four dashboards and four internal tools, across eight trades. Sample data. Click around, they work.",
  alternates: { canonical: "/examples" },
  openGraph: {
    title: "SKOX examples: dashboards and internal tools you can try",
    description: "Eight interactive concepts across eight trades. Sample data.",
    url: "/examples",
  },
};

const SETS = [
  {
    href: "/dashboard-examples",
    kind: "Dashboards",
    title: "See your numbers in one place.",
    body: "Four dashboards, four styles: crews and hiring, revenue and bookings, the owner's profit view, fleet health.",
    items: [
      { id: "hvac", industry: "HVAC", name: "Crews, hours and hiring" },
      { id: "pool", industry: "Pool service", name: "Revenue, bookings and service area" },
      { id: "pest", industry: "Pest control", name: "The owner's profit view" },
      { id: "landscaping", industry: "Lawn & landscaping", name: "Fleet and equipment health" },
    ],
    tone: "is-light",
  },
  {
    href: "/internal-tool-examples",
    kind: "Internal tools",
    title: "Replace the spreadsheet and the whiteboard.",
    body: "Four tools your team would actually use: quoting, dispatch, customer approval and truck stock.",
    items: [
      { id: "roofing", industry: "Roofing", name: "A quote builder that does the math" },
      { id: "plumbing", industry: "Plumbing", name: "A dispatch board that re-plans the day" },
      { id: "garage-doors", industry: "Garage doors", name: "A customer approval portal" },
      { id: "electrical", industry: "Electrical", name: "Truck stock that writes the pick list" },
    ],
    tone: "is-dark",
  },
];

export default function ExamplesHub() {
  return (
    <div className="landing-page examples-page hub-page">
      <header className="ex-header shell">
        <Link href="/" aria-label="SKOX home">
          <SkoxLogo className="brand-logo" />
        </Link>
        <nav aria-label="Examples">
          <Link href="/dashboard-examples">Dashboards</Link>
          <Link href="/internal-tool-examples">Internal tools</Link>
          <a href="#trades">By trade</a>
        </nav>
        <Link href="/#scope" className="button button-primary ex-cta" data-cta="hub-header">
          Get my price &amp; timeline <span aria-hidden>↗</span>
        </Link>
      </header>

      <main>
        <section className="hub-hero shell">
          <p className="eyebrow">Examples · Concepts you can use</p>
          <h1>Don&apos;t take our word for it. Click around.</h1>
          <p className="ex-intro">
            Eight concept builds for service businesses, each one interactive. Drag jobs, sign a quote, switch vans, flip a
            dashboard between months. The companies and numbers are invented. The software is real.
          </p>
        </section>

        <section className="hub-sets shell" aria-label="Example sets">
          {SETS.map((set) => (
            <article key={set.href} className={`hub-set ${set.tone}`}>
              <p className="hub-kind">{set.kind} · 4 examples</p>
              <h2>{set.title}</h2>
              <p className="hub-body">{set.body}</p>
              <ol>
                {set.items.map((item, i) => (
                  <li key={item.id}>
                    <Link href={`${set.href}#${item.id}`}>
                      <span className="hub-n">{String(i + 1).padStart(2, "0")}</span>
                      <span>
                        <small>{item.industry}</small>
                        {item.name}
                      </span>
                      <span aria-hidden className="hub-arrow">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
              <Link href={set.href} className="hub-open">
                Open all four <span aria-hidden>↗</span>
              </Link>
            </article>
          ))}
        </section>

        <section id="trades" className="hub-trades shell" aria-labelledby="trades-title">
          <div className="hub-trades-head">
            <h2 id="trades-title">Find your trade.</h2>
            <p>Each page covers the problems that trade runs into, a working example and what we&apos;d build first.</p>
          </div>
          <ul>
            {trades.map((t) => (
              <li key={t.slug}>
                <Link href={`/for/${t.slug}`}>
                  <b>{t.name}</b>
                  <span>{t.keyword}</span>
                  <i aria-hidden>→</i>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="ex-close shell">
          <div>
            <h2>Want one built around your business?</h2>
            <p>
              A free 30-minute scope call gets you a written plan with a fixed price and a delivery date, before you pay
              anything. The plan is yours whether you hire us or not.
            </p>
          </div>
          <div className="ex-close-actions">
            <Link href="/#scope" className="button button-primary" data-cta="hub-close">
              Get my price &amp; timeline <span aria-hidden>↗</span>
            </Link>
            <Link href="/scorecard" className="button button-ghost">
              Start with the free scorecard
            </Link>
          </div>
        </section>
      </main>

      <footer className="ex-footer shell">
        <p>
          SKOX, an independent software studio. <Link href="/">Home</Link> · <Link href="/privacy">Privacy</Link>
        </p>
      </footer>
    </div>
  );
}
