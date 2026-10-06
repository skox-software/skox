import type { Metadata } from "next";
import Link from "next/link";
import { SkoxLogo } from "@/components/SkoxLogo";
import { CrewOps } from "@/components/examples/CrewOps";
import { RevenueBookings } from "@/components/examples/RevenueBookings";
import { OwnerPnl } from "@/components/examples/OwnerPnl";
import { FleetMonitor } from "@/components/examples/FleetMonitor";
import "./examples.css";

export const metadata: Metadata = {
  title: "Dashboard examples for service businesses",
  description:
    "Four interactive dashboard concepts for HVAC, pool service, pest control and landscaping companies: crews, bookings, profit and fleet, each in a different style. Sample data.",
  alternates: { canonical: "/dashboard-examples" },
  openGraph: {
    title: "Dashboard examples for service businesses",
    description: "Four interactive concepts, four industries, four styles. Sample data.",
    url: "/dashboard-examples",
  },
};

const EXAMPLES = [
  {
    id: "hvac",
    industry: "HVAC",
    title: "Crews, hours and hiring",
    for: "An HVAC company running several branches that wants to see who's on the clock, how each crew is tracking and where new hires are in onboarding.",
    connects: "Scheduling, time clock, payroll, job software",
    style: "Light and warm",
    try: "Start the job timer, pick a day on the hours chart, tick off the new-hire checklist.",
    Component: CrewOps,
  },
  {
    id: "pool",
    industry: "Pool service",
    title: "Revenue, bookings and service area",
    for: "A pool-service company with several locations that wants revenue and booked jobs in one place, where the work is and which services carry the month.",
    connects: "Job software, payments, booking calendar, ad accounts",
    style: "Dark, violet and amber",
    try: "Switch week, month and quarter, hover the revenue line, pick a date range on the calendar.",
    Component: RevenueBookings,
  },
  {
    id: "pest",
    industry: "Pest control",
    title: "The owner's profit view",
    for: "A pest-control owner who wants sales against expenses, and what each booked job really costs by marketing channel, month by month.",
    connects: "Accounting, job software, Google and Meta ad accounts, reviews",
    style: "Deep navy",
    try: "Flip between years, hover the months, hover a slice of the costs ring.",
    Component: OwnerPnl,
  },
  {
    id: "landscaping",
    industry: "Lawn & landscaping",
    title: "Fleet and equipment health",
    for: "A landscaping company with trucks, mowers and trailers that wants fuel, battery and engine health per unit, with alerts to the crew lead.",
    connects: "Telematics, equipment sensors, service log, text alerts",
    style: "Slate and green, builder layout",
    try: "Switch units, pick a widget, then change its color and labels in the inspector.",
    Component: FleetMonitor,
  },
];

export default function DashboardExamples() {
  return (
    <div className="landing-page examples-page">
      <header className="ex-header shell">
        <Link href="/" aria-label="SKOX home">
          <SkoxLogo className="brand-logo" />
        </Link>
        <nav aria-label="Examples">
          {EXAMPLES.map((e) => (
            <a key={e.id} href={`#${e.id}`}>
              {e.industry}
            </a>
          ))}
        </nav>
        <Link href="/dashboards#scope" className="button button-primary ex-cta" data-cta="examples-header">
          Get my price &amp; timeline <span aria-hidden>↗</span>
        </Link>
      </header>

      <main>
        <section className="ex-hero shell">
          <p className="eyebrow">Dashboard examples · Concepts</p>
          <h1>Four industries. Four ways your numbers could look.</h1>
          <p className="ex-intro">
            Every dashboard we build is designed around the decisions you make each week. These are concept builds with
            invented sample data, to show the range: from a bright crew view to a live equipment monitor. Click around.
            They work.
          </p>
          <p className="ex-disclaimer">
            Concepts, not client work. The companies, people and numbers are made up.
          </p>
        </section>

        {EXAMPLES.map((e, i) => (
          <section key={e.id} id={e.id} className="ex-section shell" aria-labelledby={`${e.id}-title`}>
            <div className="ex-meta">
              <p className="ex-number">
                {String(i + 1).padStart(2, "0")} · {e.industry}
              </p>
              <h2 id={`${e.id}-title`}>{e.title}</h2>
              <p className="ex-for">{e.for}</p>
              <dl>
                <div>
                  <dt>Connects to</dt>
                  <dd>{e.connects}</dd>
                </div>
                <div>
                  <dt>Style</dt>
                  <dd>{e.style}</dd>
                </div>
                <div>
                  <dt>Try it</dt>
                  <dd>{e.try}</dd>
                </div>
              </dl>
            </div>
            <div className="ex-frame">
              <span className="ex-tag">Concept · sample data</span>
              <div className="ex-scroll" tabIndex={0} aria-label={`${e.industry} dashboard concept, scrollable`}>
                <e.Component />
              </div>
              <p className="ex-scroll-hint" aria-hidden>
                Scroll sideways to see the whole dashboard →
              </p>
            </div>
          </section>
        ))}

        <section className="ex-close shell">
          <div>
            <h2>Want one built around your numbers?</h2>
            <p>
              A 14-day focused dashboard build, with a fixed price and a delivery date agreed in writing before you pay.
              Timing depends on agreed data sources and access. It starts with a free 30-minute scope call, and the plan
              is yours whether you hire us or not.
            </p>
          </div>
          <div className="ex-close-actions">
            <Link href="/dashboards#scope" className="button button-primary" data-cta="examples-close">
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
          SKOX, an independent software studio. <Link href="/dashboards">Dashboards</Link> ·{" "}
          <Link href="/privacy">Privacy</Link>
        </p>
      </footer>
    </div>
  );
}
