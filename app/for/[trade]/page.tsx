import type { Metadata } from "next";
import type { ComponentType } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SkoxLogo } from "@/components/SkoxLogo";
import { ConversionForm } from "@/components/ConversionForm";
import { ShowcaseFrame } from "@/components/examples/Showcase";
import { CrewOps } from "@/components/examples/CrewOps";
import { RevenueBookings } from "@/components/examples/RevenueBookings";
import { OwnerPnl } from "@/components/examples/OwnerPnl";
import { FleetMonitor } from "@/components/examples/FleetMonitor";
import { QuoteBuilder } from "@/components/tools/QuoteBuilder";
import { DispatchBoard } from "@/components/tools/DispatchBoard";
import { ApprovalPortal } from "@/components/tools/ApprovalPortal";
import { TruckStock } from "@/components/tools/TruckStock";
import { landing } from "@/content/landing";
import { site } from "@/content/site";
import { trades, tradeBySlug, type ExampleKey } from "@/content/trades";
import "../../dashboard-examples/examples.css";
import "./trades.css";

const EXAMPLES: Record<ExampleKey, ComponentType> = {
  "crew-ops": CrewOps,
  "revenue-bookings": RevenueBookings,
  "owner-pnl": OwnerPnl,
  "fleet-monitor": FleetMonitor,
  "quote-builder": QuoteBuilder,
  "dispatch-board": DispatchBoard,
  "approval-portal": ApprovalPortal,
  "truck-stock": TruckStock,
};

export const dynamicParams = false;
export function generateStaticParams() {
  return trades.map((t) => ({ trade: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ trade: string }> }): Promise<Metadata> {
  const { trade: slug } = await params;
  const trade = tradeBySlug(slug);
  if (!trade) return {};
  return {
    title: trade.title,
    description: trade.description,
    alternates: { canonical: `/for/${trade.slug}` },
    openGraph: { title: `SKOX — ${trade.title}`, description: trade.description, url: `/for/${trade.slug}` },
    twitter: { title: `SKOX — ${trade.title}`, description: trade.description },
  };
}

export default async function TradePage({ params }: { params: Promise<{ trade: string }> }) {
  const { trade: slug } = await params;
  const trade = tradeBySlug(slug);
  if (!trade) notFound();
  const Example = EXAMPLES[trade.example];
  const others = trades.filter((t) => t.slug !== trade.slug);

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: trade.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <div className="landing-page examples-page trade-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <header className="tr-header shell">
        <Link href="/" aria-label="SKOX home">
          <SkoxLogo className="brand-logo" />
        </Link>
        <nav aria-label="On this page">
          <a href="#example">See it working</a>
          <a href="#build">What we&apos;d build</a>
          <a href="#faq">Questions</a>
        </nav>
        <a href="#scope" className="button button-primary tr-cta" data-cta="trade-header">
          Get my price &amp; timeline <span aria-hidden>↗</span>
        </a>
      </header>

      <main>
        <section className="tr-hero shell">
          <div className="tr-hero-copy">
            <p className="eyebrow">For {trade.name.toLowerCase()} companies</p>
            <h1>
              {trade.keyword}. <em>Built at speed.</em>
            </h1>
            <p className="tr-intro">{trade.intro}</p>
            <div className="tr-actions">
              <a href="#scope" className="button button-primary" data-cta="trade-hero">
                {landing.cta} <span aria-hidden>↗</span>
              </a>
              <a href="#example" className="button button-ghost">
                Try the example <span aria-hidden>↓</span>
              </a>
            </div>
            <p className="tr-reassure">{landing.reassurance}</p>
          </div>
          <ul className="tr-trust" aria-label="What you can count on">
            {landing.trust.map((t) => (
              <li key={t}>{t}</li>
            ))}
            <li>The two founders who build it, on every call</li>
          </ul>
        </section>

        <section className="tr-pains shell" aria-labelledby="pains-title">
          <h2 id="pains-title">Sound familiar?</h2>
          <ol>
            {trade.pains.map((p, i) => (
              <li key={p.title}>
                <span className="tr-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="example" className="tr-example shell" aria-labelledby="example-title">
          <div className="tr-example-head">
            <div>
              <p className="eyebrow">A working example</p>
              <h2 id="example-title">{trade.exampleTitle}</h2>
            </div>
            <p>
              <strong>Try it:</strong> {trade.exampleTry}
            </p>
          </div>
          <ShowcaseFrame label={`${trade.name} example`}>
            <Example />
          </ShowcaseFrame>
          <p className="tr-example-note">
            A concept with invented sample data, not a client&apos;s system. Yours is built around your numbers.{" "}
            <Link href={trade.more.href}>{trade.more.label} →</Link>
          </p>
        </section>

        <section id="build" className="tr-build shell" aria-labelledby="build-title">
          <div className="tr-build-head">
            <p className="eyebrow">What we&apos;d build for {trade.company}</p>
            <h2 id="build-title">Start with the one that hurts most.</h2>
            <p>
              Connected to the tools you already use: <strong>{trade.connects}</strong>.
            </p>
          </div>
          <div className="tr-build-grid">
            {trade.builds.map((b, i) => (
              <article key={b.title} className={i === 0 ? "is-lead" : ""}>
                <span className="tr-num">{i === 0 ? "Shown above" : `Also`}</span>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="tr-steps shell" aria-labelledby="steps-title">
          <h2 id="steps-title">{landing.processTitle.replace("\n", " ")}</h2>
          <ol>
            {landing.steps.map((s) => (
              <li key={s.number}>
                <span className="tr-num">{s.number}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <small>{s.output}</small>
              </li>
            ))}
          </ol>
        </section>

        <section className="tr-scorecard shell">
          <div>
            <p className="eyebrow">Not ready for a call?</p>
            <h2>Start with the free Monday scorecard.</h2>
            <p>Every location or crew side by side in a spreadsheet: revenue, jobs, labor and ad spend against your own targets.</p>
          </div>
          <Link href="/scorecard" className="button button-dark" data-cta="trade-scorecard">
            Get the scorecard <span aria-hidden>→</span>
          </Link>
        </section>

        <section id="faq" className="tr-faq shell" aria-labelledby="faq-title">
          <h2 id="faq-title">Good questions</h2>
          <div>
            {trade.faq.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="scope" className="scope-section" aria-labelledby="scope-title">
          <div className="shell scope-grid">
            <div className="scope-copy">
              <p className="eyebrow">{landing.formEyebrow}</p>
              <h2 id="scope-title">{landing.formTitle}</h2>
              <p>{landing.formSub}</p>
              <ul>
                {landing.formBenefits.map((benefit) => (
                  <li key={benefit}>
                    <span aria-hidden>✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <ConversionForm initial={trade.build} />
          </div>
        </section>
      </main>

      <footer className="tr-footer shell">
        <nav aria-label="Other trades">
          <p className="micro">Also for</p>
          {others.map((t) => (
            <Link key={t.slug} href={`/for/${t.slug}`}>
              {t.name}
            </Link>
          ))}
        </nav>
        <p>
          SKOX, an independent software studio · <a href={`mailto:${site.email}`}>{site.email}</a> ·{" "}
          <Link href="/privacy">Privacy</Link>
        </p>
      </footer>
    </div>
  );
}
