import { CtaBlock, Section, SectionHead } from "@/components/Section";
import { capabilities, faq, offer, problems, refusals, riskReversal, whyUs } from "@/content/site";

const withRefund = (s: string) => s.replace("{REFUND}", String(riskReversal.refundPercent));

/* ------------------------------------------------------------ problem stack */
export function ProblemStack() {
  return (
    <Section id="problem" tone="alt">
      <SectionHead kicker={problems.kicker} headline={problems.headline} sub={problems.sub} />
      <ul className="mt-14 border-t" style={{ borderColor: "var(--line)" }}>
        {problems.items.map((p) => (
          <li
            key={p.n}
            className="reveal grid grid-cols-[auto_1fr] md:grid-cols-[80px_minmax(0,1fr)_minmax(0,1fr)] gap-x-5 gap-y-2 py-7 border-b items-baseline"
            style={{ borderColor: "var(--line)" }}
          >
            <span className="font-mono text-[12px] tabular-nums" style={{ color: "var(--color-amber-dim)" }}>
              {p.n}
            </span>
            <h3 className="text-[19px] sm:text-[22px] font-[450] leading-tight" style={{ color: "var(--text)" }}>
              {p.title}
            </h3>
            <p
              className="col-start-2 md:col-start-3 text-[15px] leading-[1.55] max-w-[440px]"
              style={{ color: "var(--text-dim)" }}
            >
              {p.body}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ------------------------------------------------------------- capabilities */
export function WhatWeBuild() {
  const [lead, ...rest] = capabilities;
  return (
    <Section id="build">
      <SectionHead
        kicker="What we build"
        headline="Six things. We lead with the ones we have shipped most."
        sub="Broad in what we can build, narrow in what we say first."
      />

      <div className="mt-14 grid lg:grid-cols-3 gap-px" style={{ background: "var(--line)" }}>
        {/* Lead capability gets double width and the accent treatment. */}
        <article
          className="reveal lg:col-span-2 p-8 sm:p-10 relative"
          style={{ background: "var(--surface)" }}
        >
          <span className="absolute top-0 left-0 h-[3px] w-20 bg-[var(--color-amber)]" />
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[12px]" style={{ color: "var(--color-amber-dim)" }}>
              {lead.n}
            </span>
            <h3 className="text-[26px] sm:text-[32px] font-[450] tracking-[-0.02em]" style={{ color: "var(--text)" }}>
              {lead.title}
            </h3>
          </div>
          <p className="mt-3 text-[17px]" style={{ color: "var(--text-dim)" }}>
            {lead.blurb}
          </p>
          <ul className="mt-7 grid sm:grid-cols-2 gap-x-8 gap-y-3">
            {lead.items.map((it) => (
              <li key={it} className="flex gap-3 text-[15px] leading-[1.5]" style={{ color: "var(--text)" }}>
                <span aria-hidden className="mt-[9px] h-[5px] w-[5px] shrink-0 bg-[var(--color-amber)]" />
                {it}
              </li>
            ))}
          </ul>
        </article>

        {rest.map((c) => (
          <article key={c.id} className="reveal p-8 sm:p-9" style={{ background: "var(--surface)" }}>
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-[12px]" style={{ color: "var(--text-dim)" }}>
                {c.n}
              </span>
              <h3 className="text-[21px] font-[450] tracking-[-0.015em]" style={{ color: "var(--text)" }}>
                {c.title}
              </h3>
            </div>
            <p className="mt-2.5 text-[15px]" style={{ color: "var(--text-dim)" }}>
              {c.blurb}
            </p>
            <ul className="mt-6 space-y-2.5">
              {c.items.map((it) => (
                <li key={it} className="flex gap-3 text-[14.5px] leading-[1.5]" style={{ color: "var(--text)" }}>
                  <span aria-hidden className="mt-[9px] h-[4px] w-[4px] shrink-0" style={{ background: "var(--text-dim)" }} />
                  {it}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------------- offer */
export function Offer() {
  return (
    <Section id="offer" tone="alt">
      <SectionHead kicker={offer.kicker} headline={offer.headline} sub={offer.sub} />

      <ol className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "var(--line)" }}>
        {offer.steps.map((s) => (
          <li key={s.n} className="reveal p-7" style={{ background: "var(--surface-2)" }}>
            <span className="font-mono text-[12px]" style={{ color: "var(--color-amber-dim)" }}>
              {s.n}
            </span>
            <h3 className="mt-4 text-[19px] font-[450]" style={{ color: "var(--text)" }}>
              {s.title}
            </h3>
            <p className="mt-2 text-[14.5px] leading-[1.55]" style={{ color: "var(--text-dim)" }}>
              {s.body}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-16 reveal">
        <h3 className="font-mono text-[12px] uppercase tracking-[0.16em]" style={{ color: "var(--text-dim)" }}>
          Engagements
        </h3>
        <ul className="mt-6 border-t" style={{ borderColor: "var(--line)" }}>
          {offer.engagements.map((e) => (
            <li
              key={e.name}
              className="grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)_auto] gap-x-8 gap-y-2 py-6 border-b items-baseline"
              style={{ borderColor: "var(--line)" }}
            >
              <h4 className="text-[18px] sm:text-[20px] font-[450]" style={{ color: "var(--text)" }}>
                {e.name}
              </h4>
              <p className="text-[15px] leading-[1.5]" style={{ color: "var(--text-dim)" }}>
                {e.scope}
              </p>
              <span className="font-mono text-[13px] whitespace-nowrap text-[var(--color-amber-dim)] dark:text-[var(--color-amber)]">
                {e.guarantee}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-7 text-[15px] max-w-[620px] leading-[1.55]" style={{ color: "var(--text-dim)" }}>
          {offer.pricingLine}
        </p>
      </div>

      <CtaBlock label="Get your free scope" note="A call, then a written scope. Yours to keep." />
    </Section>
  );
}

/* ------------------------------------------------------------ risk reversal */
export function RiskReversal() {
  return (
    <Section id="risk">
      <SectionHead kicker={riskReversal.kicker} headline={riskReversal.headline} sub={riskReversal.sub} />
      <div className="mt-14 grid sm:grid-cols-2 gap-px" style={{ background: "var(--line)" }}>
        {riskReversal.points.map((p) => (
          <div key={p.title} className="reveal p-8 sm:p-10" style={{ background: "var(--surface)" }}>
            <h3 className="text-[21px] font-[450] tracking-[-0.015em]" style={{ color: "var(--text)" }}>
              {p.title}
            </h3>
            <p className="mt-3 text-[15px] leading-[1.6]" style={{ color: "var(--text-dim)" }}>
              {withRefund(p.body)}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------- why us */
export function WhyUs() {
  return (
    <Section id="why" tone="alt">
      <SectionHead kicker="Why us" headline="Why anyone picks us over an agency." />
      <div className="mt-14 grid lg:grid-cols-3 gap-10 lg:gap-14">
        {whyUs.map((w) => (
          <div key={w.n} className="reveal">
            <span
              className="font-mono text-[42px] leading-none tabular-nums"
              style={{ color: "var(--line)" }}
            >
              {w.n}
            </span>
            <h3 className="mt-5 text-[22px] font-[450] tracking-[-0.015em]" style={{ color: "var(--text)" }}>
              {w.title}
            </h3>
            <p className="mt-3 text-[15px] leading-[1.6]" style={{ color: "var(--text-dim)" }}>
              {w.body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* -------------------------------------------------------------- what we don't */
export function WhatWeDont() {
  return (
    <Section id="refusals" className="!bg-[var(--color-pitch)] relative overflow-hidden">
      <div className="absolute inset-0 grain opacity-70 pointer-events-none" />
      <div className="relative">
        <div className="reveal max-w-[760px]">
          <p className="flex items-center gap-2.5 text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.16em] text-[var(--color-amber)]">
            <span className="h-px w-7 bg-[var(--color-amber)]/60" />
            {refusals.kicker}
          </p>
          <h2 className="mt-5 text-[32px] sm:text-[44px] md:text-[54px] font-normal leading-[1.02] tracking-[-0.025em] text-white">
            {refusals.headline}
          </h2>
          <p className="mt-5 text-[16px] sm:text-[18px] leading-[1.5] max-w-[620px] text-white/60">{refusals.sub}</p>
        </div>

        <ul className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10">
          {refusals.items.map((r) => (
            <li key={r} className="reveal flex items-center gap-4 py-4 border-b border-white/10">
              <span aria-hidden className="font-mono text-[15px] text-white/25">
                ✕
              </span>
              <span className="text-[16px] sm:text-[17px] text-white/85">{r}</span>
            </li>
          ))}
        </ul>

        <p className="reveal mt-12 text-[17px] sm:text-[19px] leading-[1.5] max-w-[680px] text-white">{refusals.close}</p>
        <p className="reveal mt-5 text-[14px] font-mono leading-[1.6] max-w-[560px] text-[var(--color-amber)]/85">
          {refusals.scarcity}
        </p>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------------- FAQ */
export function Faq() {
  return (
    <Section id="faq">
      <SectionHead kicker="Questions" headline="The ones you're actually asking." />
      <div className="mt-14 border-t" style={{ borderColor: "var(--line)" }}>
        {faq.map((f) => (
          <details key={f.q} className="reveal group border-b" style={{ borderColor: "var(--line)" }}>
            <summary className="flex items-start justify-between gap-6 py-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <h3 className="text-[18px] sm:text-[21px] font-[450] leading-snug" style={{ color: "var(--text)" }}>
                {f.q}
              </h3>
              <span
                aria-hidden
                className="mt-1 shrink-0 font-mono text-[19px] leading-none transition-transform duration-300 group-open:rotate-45"
                style={{ color: "var(--color-amber-dim)" }}
              >
                +
              </span>
            </summary>
            <p className="pb-7 pr-10 text-[15.5px] leading-[1.65] max-w-[720px]" style={{ color: "var(--text-dim)" }}>
              {withRefund(f.a)}
            </p>
          </details>
        ))}
      </div>
      <CtaBlock label="Get your free scope" note="Thirty minutes. You keep the document either way." />
    </Section>
  );
}
