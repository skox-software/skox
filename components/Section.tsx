import type { ReactNode } from "react";

export function Section({
  id,
  children,
  className = "",
  tone = "surface",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "surface" | "alt";
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 px-5 sm:px-8 md:px-[82px] py-20 sm:py-28 md:py-32 ${className}`}
      style={{ background: tone === "alt" ? "var(--surface-2)" : "var(--surface)" }}
    >
      <div className="w-full max-w-[1800px] mx-auto">{children}</div>
    </section>
  );
}

export function SectionHead({
  kicker,
  headline,
  sub,
  className = "",
}: {
  kicker: string;
  headline: string;
  sub?: string;
  className?: string;
}) {
  return (
    <div className={`reveal max-w-[760px] ${className}`}>
      <p className="flex items-center gap-2.5 text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.16em] text-[var(--color-amber-dim)] dark:text-[var(--color-amber)]">
        <span className="h-px w-7 bg-[var(--color-amber)]/60" />
        {kicker}
      </p>
      <h2
        className="mt-5 text-[32px] sm:text-[44px] md:text-[54px] font-normal leading-[1.02] tracking-[-0.025em] text-balance"
        style={{ color: "var(--text)" }}
      >
        {headline}
      </h2>
      {sub && (
        <p className="mt-5 text-[16px] sm:text-[18px] leading-[1.5] max-w-[620px]" style={{ color: "var(--text-dim)" }}>
          {sub}
        </p>
      )}
    </div>
  );
}

/** Repeated conversion point — the page asks five times, not once. */
export function CtaBlock({ label, note }: { label: string; note?: string }) {
  return (
    <div className="reveal mt-14 flex flex-col sm:flex-row sm:items-center gap-4">
      <a
        href="#scope"
        className="chamfer h-[51px] px-[27px] inline-flex items-center justify-center bg-[var(--color-ink)] dark:bg-[var(--color-paper)] text-[var(--color-paper)] dark:text-[var(--color-ink)] text-[15.5px] font-[450] transition-opacity hover:opacity-88"
      >
        {label}
      </a>
      {note && (
        <p className="text-[13px] font-mono" style={{ color: "var(--text-dim)" }}>
          {note}
        </p>
      )}
    </div>
  );
}
