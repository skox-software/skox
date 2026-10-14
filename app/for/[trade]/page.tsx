import type { Metadata } from "next";
import type { ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SkoxLogo } from "@/components/SkoxLogo";
import { ConversionForm } from "@/components/ConversionForm";
import { LandingTracking } from "@/components/LandingTracking";
import { TradeStickyBar } from "@/components/TradeStickyBar";
import { ExampleUseTracker } from "@/components/ExampleUseTracker";
import { OwnVsRent } from "@/components/OwnVsRent";
import { ShowcaseFrame } from "@/components/examples/Showcase";
import { CrewOps } from "@/components/examples/CrewOps";
import { RevenueBookings } from "@/components/examples/RevenueBookings";
import { OwnerPnl } from "@/components/examples/OwnerPnl";
import { FleetMonitor } from "@/components/examples/FleetMonitor";
import { QuoteBuilder } from "@/components/tools/QuoteBuilder";
import { DispatchBoard } from "@/components/tools/DispatchBoard";
import { ApprovalPortal } from "@/components/tools/ApprovalPortal";
import { TruckStock } from "@/components/tools/TruckStock";
import { landing, landingFaq } from "@/content/landing";
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

/** C04 as claims.md asks: the deposit-free part is the call, not the build. */
const REASSURANCE = "Free 30-minute scope call. No deposit for the call. No obligation.";
/** T08: T06 + C07. A trade can override it (landscaping's intro already says "built around"). */
const MECHANISM = "Built for your company, connected to the tools you already use. You own the code.";

/** T07, Josh 2026-10-14. */
const ALONGSIDE_FAQ = {
  q: "Do we have to replace the software we already use?",
  a: "No. If your current software allows a connection, such as an API or an export, we build alongside it. If it doesn't, or it's holding you back, we can replace it. We confirm which during the free scope call, before you pay anything.",
};
/** T11, Josh 2026-10-14. The public floor; founding-client pricing stays private. */
const STARTING_PRICE = "$5,000";
/** T09, Josh 2026-10-14: the "custom means expensive" objection. */
const COST_FAQ = {
  q: "Isn't custom software expensive?",
  a: `Not the way it used to be. Two founders build it, so there are no account managers or hourly billing in the price, and you get a fixed price in writing before you pay anything. Start with the one tool that hurts most: a focused build, not a six-figure project. Focused builds start at ${STARTING_PRICE}.`,
};
/** The homepage's own answers on cost and after-launch, word for word. */
const SHARED_FAQ = landingFaq.filter((f) => f.q === "What does a project cost?" || f.q === "Can you help after launch?");

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
  const faqs = [COST_FAQ, ALONGSIDE_FAQ, ...trade.faq, ...SHARED_FAQ];
  const placeholder = trade.placeholder ?? `For example: ${trade.builds[0].title.replace(/^A /, "a ").toLowerCase()}.`;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
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
            <p className="tr-mechanism">{trade.mechanism ?? MECHANISM}</p>
            <p className="tr-intro">{trade.intro}</p>
            <div className="tr-actions">
              <a href="#scope" className="button button-primary" data-cta="trade-hero">
                {landing.cta} <span aria-hidden>↗</span>
              </a>
              <a href="#example" className="button button-ghost" data-cta="trade-hero-example">
                Try the example <span aria-hidden>↓</span>
              </a>
            </div>
            <p className="tr-reassure">{REASSURANCE}</p>
            <div className="tr-benefits">
              <p>What you get from the free call:</p>
              <ul>
                {landing.formBenefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </div>
            <p className="tr-call">
              Focused builds start at {STARTING_PRICE}. <a href="#own">See how that compares ↓</a>
            </p>
            <p className="tr-call">
              Rather talk now? Call <a href={site.phone.href}>{site.phone.display}</a>
            </p>
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
          <ExampleUseTracker example={trade.example}>
            <ShowcaseFrame label={`${trade.name} example`}>
              <Example />
            </ShowcaseFrame>
          </ExampleUseTracker>
          <p className="tr-example-note">
            A concept with invented sample data, not a client&apos;s system. Yours is built around your numbers.{" "}
            <Link href={trade.more.href}>{trade.more.label} →</Link>
          </p>
          <div className="tr-inline-cta">
            <div>
              <h3>Want yours built around how you work?</h3>
              <p>{REASSURANCE}</p>
            </div>
            <div className="tr-inline-actions">
              <a href="#scope" className="button button-primary" data-cta="trade-after-example">
                {landing.cta} <span aria-hidden>↗</span>
              </a>
              <a href={site.phone.href} className="button button-ghost">
                Call {site.phone.display}
              </a>
            </div>
          </div>
        </section>

        <section id="own" className="tr-own shell" aria-labelledby="own-title">
          <div className="tr-own-copy">
            <p className="eyebrow">Own it, don&apos;t rent it</p>
            <h2 id="own-title">Custom doesn&apos;t mean a six-figure project anymore.</h2>
            <p className="tr-own-price">
              Focused builds start at <strong>{STARTING_PRICE}</strong>.
            </p>
            <p>
              Two founders build it, so you&apos;re not paying for account managers or hourly billing. You get a fixed
              price in writing before you pay anything, and you own what we build.
            </p>
            <p>
              Subscription apps charge you every month, per user, for features built for someone else. A build you own
              is priced once, built around how you work, and yours to keep. Care plans are optional.
            </p>
          </div>
          <OwnVsRent build={trade.build} startingPrice={STARTING_PRICE} />
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

        <section className="tr-founders shell" aria-labelledby="founders-title">
          <div className="tr-build-head">
            <p className="eyebrow">Who you&apos;ll work with</p>
            <h2 id="founders-title">{landing.teamTitle.replace("\n", " ")}</h2>
            <p>{landing.teamSub}</p>
          </div>
          <div className="founder-grid">
            {landing.founders.map((person) => (
              <article className="founder-card" key={person.name}>
                <Image src={person.photo} width={280} height={320} sizes="(max-width: 600px) 110px, 180px" alt={person.name} />
                <div>
                  <span className="micro">{person.role}</span>
                  <h3>{person.name}</h3>
                  <p>{person.bio}</p>
                </div>
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
            {faqs.map((f) => (
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
            <ConversionForm initial={trade.build} placeholder={placeholder} />
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
          <a href={site.phone.href}>{site.phone.display}</a> · <Link href="/privacy">Privacy</Link>
        </p>
      </footer>
      <TradeStickyBar />
      <LandingTracking />
    </div>
  );
}
