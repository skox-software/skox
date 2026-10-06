import type { Metadata } from "next";
import Link from "next/link";
import { SkoxLogo } from "@/components/SkoxLogo";
import { ShowcaseSection, type ShowcaseItem } from "@/components/examples/Showcase";
import { QuoteBuilder } from "@/components/tools/QuoteBuilder";
import { DispatchBoard } from "@/components/tools/DispatchBoard";
import { ApprovalPortal } from "@/components/tools/ApprovalPortal";
import { TruckStock } from "@/components/tools/TruckStock";
import "../dashboard-examples/examples.css";

export const metadata: Metadata = {
  title: "Internal tool examples for service businesses",
  description:
    "Four interactive internal tools for roofing, plumbing, garage door and electrical companies: a quote builder, a dispatch board, a customer approval portal and a truck stock tracker. Sample data.",
  alternates: { canonical: "/internal-tool-examples" },
  openGraph: {
    title: "Internal tool examples for service businesses",
    description: "A quote builder, a dispatch board, an approval portal and truck stock. Try them. Sample data.",
    url: "/internal-tool-examples",
  },
};

const TOOLS: ShowcaseItem[] = [
  {
    id: "roofing",
    industry: "Roofing",
    title: "A quote builder that does the math",
    for: "A roofing company whose estimators price every job in a spreadsheet. Measure, pick the material, set the margin, and send good, better and best in one go.",
    connects: "Aerial measurements, your price list, job software, e-signature",
    style: "Estimator's blueprint",
    try: "Drag the roof size, change the pitch and watch the diagram, flip to the customer view, then send it.",
    Component: QuoteBuilder,
  },
  {
    id: "plumbing",
    industry: "Plumbing",
    title: "A dispatch board that re-plans the day",
    for: "A plumbing company juggling emergencies and booked work across several techs. Drop a job on a tech and the day re-plans itself, drive time included.",
    connects: "Job software, phone system, GPS, text notifications",
    style: "High-contrast ops board",
    try: "Drag a waiting job onto a tech (or tap the job, then the tech). Tap a scheduled job to send it back. Try Auto-assign.",
    Component: DispatchBoard,
  },
  {
    id: "garage-doors",
    industry: "Garage doors",
    title: "A customer approval portal",
    for: "A garage door company that wants quotes approved the same day. The customer chooses an option, signs and pays a deposit from a text link, and the owner sees every step.",
    connects: "Quotes, payments, calendar, text messages",
    style: "Soft consumer app",
    try: "Be the customer: pick an option, choose a time, sign with your finger or mouse, pay the demo deposit.",
    Component: ApprovalPortal,
  },
  {
    id: "electrical",
    industry: "Electrical",
    title: "Truck stock that writes the pick list",
    for: "An electrical contractor with a van per tech. See what's on each van against par, flag what's running low, and send tomorrow's pick list to the warehouse.",
    connects: "Inventory, purchasing, job software, barcode scanners",
    style: "Industrial, charcoal and yellow",
    try: "Switch vans, type a part like GF-20 into the scan box, use parts with minus, then send and receive the pick list.",
    Component: TruckStock,
  },
];

export default function InternalToolExamples() {
  return (
    <div className="landing-page examples-page">
      <header className="ex-header shell">
        <Link href="/" aria-label="SKOX home">
          <SkoxLogo className="brand-logo" />
        </Link>
        <nav aria-label="Examples">
          {TOOLS.map((t) => (
            <a key={t.id} href={`#${t.id}`}>
              {t.industry}
            </a>
          ))}
        </nav>
        <Link href="/internal-tools#scope" className="button button-primary ex-cta" data-cta="tools-header">
          Get my price &amp; timeline <span aria-hidden>↗</span>
        </Link>
      </header>

      <main>
        <section className="ex-hero shell">
          <p className="eyebrow">Internal tool examples · Concepts</p>
          <h1>Four tools your team would actually use.</h1>
          <p className="ex-intro">
            The spreadsheet that prices every job. The whiteboard that runs dispatch. The text thread that chases approval.
            These are concept builds of the tools that replace them, with invented sample data. Every one works. Try them.
          </p>
          <p className="ex-disclaimer">Concepts, not client work. The companies, people and numbers are made up.</p>
        </section>

        {TOOLS.map((t, i) => (
          <ShowcaseSection key={t.id} item={t} index={i} />
        ))}

        <section className="ex-close shell">
          <div>
            <h2>Have a tool in mind?</h2>
            <p>
              Tell us the job it has to do. You&apos;ll get a written plan with a fixed price and a delivery date before you pay,
              and you work directly with the two founders who build it. You own the code.
            </p>
          </div>
          <div className="ex-close-actions">
            <Link href="/internal-tools#scope" className="button button-primary" data-cta="tools-close">
              Get my price &amp; timeline <span aria-hidden>↗</span>
            </Link>
            <Link href="/dashboard-examples" className="button button-ghost">
              See dashboard examples
            </Link>
          </div>
        </section>
      </main>

      <footer className="ex-footer shell">
        <p>
          SKOX, an independent software studio. <Link href="/internal-tools">Internal tools</Link> ·{" "}
          <Link href="/privacy">Privacy</Link>
        </p>
      </footer>
    </div>
  );
}
