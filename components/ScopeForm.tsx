"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { track } from "@vercel/analytics";
import { formatAttribution, readAttribution } from "@/lib/attribution";
import { Section, SectionHead } from "@/components/Section";
import { LEAK_KEY } from "@/components/LeakCalculator";
import { entryOffer, form as copy, site } from "@/content/site";
import {
  BUDGETS,
  DECISION_ROLES,
  TIMELINES,
  formatLead,
  validate,
  type FieldErrors,
  type Lead,
} from "@/lib/leads";

type State = "idle" | "sending" | "done" | "failed";

const EMPTY: Lead = {
  name: "",
  email: "",
  company: "",
  industry: "",
  broken: "",
  timeline: "",
  budget: "",
  decisionRole: "",
  industryEligibility: "",
  website: "",
};

function readLeak(): string | undefined {
  try {
    return sessionStorage.getItem(LEAK_KEY) ?? undefined;
  } catch {
    return undefined;
  }
}

function enrich(lead: Lead): Lead {
  return { ...lead, attribution: formatAttribution(readAttribution()) };
}

export function ScopeForm() {
  const [lead, setLead] = useState<Lead>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<State>("idle");
  const router = useRouter();

  const set =
    (k: keyof Lead) =>
    (e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >) => {
      setLead((l) => ({ ...l, [k]: e.target.value }));
      if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
    };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate(lead);
    setErrors(found);
    if (Object.keys(found).length) {
      // Which field blocks people is the most actionable form metric there is.
      track("scope_form_invalid", { fields: Object.keys(found).join(",") });
      return;
    }

    let leak: string | undefined;
    try {
      leak = sessionStorage.getItem(LEAK_KEY) ?? undefined;
    } catch {
      /* private mode */
    }

    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...enrich(lead), leak }),
      });
      if (!res.ok) throw new Error(String(res.status));
      // The conversion. Everything upstream is judged against this.
      track("scope_request", { withLeak: Boolean(leak) });
      // A real URL the ad platforms can register as a conversion.
      router.push("/scope-received");
    } catch {
      // Never swallow a real lead behind a green checkmark.
      track("scope_request_failed");
      setState("failed");
    }
  }

  if (state === "done") {
    return (
      <Section id="scope" tone="alt">
        <div className="max-w-[620px]">
          <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-[var(--color-amber-dim)] dark:text-[var(--color-amber)]">
            Sent
          </p>
          <h2
            className="mt-5 text-[36px] sm:text-[48px] font-normal tracking-[-0.025em]"
            style={{ color: "var(--text)" }}
          >
            {copy.successTitle}
          </h2>
          <p
            className="mt-4 text-[17px] leading-[1.55]"
            style={{ color: "var(--text-dim)" }}
          >
            {copy.successBody}
          </p>
        </div>
      </Section>
    );
  }

  // Must carry what the POST carried — the fallback is the only path when delivery fails.
  const forMail: Lead = { ...enrich(lead), leak: readLeak() };
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent("Scope request — " + (forMail.company || forMail.name))}&body=${encodeURIComponent(formatLead(forMail))}`;

  return (
    <Section id="scope" tone="alt">
      <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] gap-12 lg:gap-20">
        <div>
          <SectionHead
            kicker={copy.kicker}
            headline={copy.headline}
            sub={copy.sub}
            className="!max-w-none"
          />

          {/* Scattered benefits read as features. Stacked in one place they read as an offer. */}
          <div
            className="reveal mt-10 border-t"
            style={{ borderColor: "var(--line)" }}
          >
            <p
              className="pt-5 font-mono text-[11px] uppercase tracking-[0.16em]"
              style={{ color: "var(--color-amber-dim)" }}
            >
              {entryOffer.name} — what you get
            </p>
            <ul className="mt-4 space-y-3.5">
              {entryOffer.stack.map((s2) => (
                <li key={s2.item} className="flex gap-3.5">
                  <span
                    aria-hidden
                    className="mt-[9px] h-[5px] w-[5px] shrink-0 bg-[var(--color-amber)]"
                  />
                  <span>
                    <span
                      className="block text-[16px] font-[450]"
                      style={{ color: "var(--text)" }}
                    >
                      {s2.item}
                    </span>
                    <span
                      className="block text-[14px] leading-[1.5] mt-0.5"
                      style={{ color: "var(--text-dim)" }}
                    >
                      {s2.detail}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <p
              className="mt-6 text-[15px] leading-[1.55]"
              style={{ color: "var(--text)" }}
            >
              {entryOffer.keep}{" "}
              <span style={{ color: "var(--text-dim)" }}>
                {entryOffer.cost}
              </span>
            </p>
            {site.sampleScopeUrl && (
              <a
                href={site.sampleScopeUrl}
                target="_blank"
                rel="noopener"
                className="mt-4 inline-flex items-center gap-2 text-[15px] font-[450] underline underline-offset-4 text-[var(--color-amber-dim)]"
              >
                See a real one first
                <span aria-hidden>↗</span>
              </a>
            )}
          </div>
        </div>

        <form onSubmit={submit} noValidate className="reveal">
          {/* Honeypot — hidden from people, tempting to bots. */}
          <div
            aria-hidden
            className="absolute w-px h-px overflow-hidden -left-[9999px]"
          >
            <label>
              Website
              <input
                tabIndex={-1}
                autoComplete="off"
                value={lead.website}
                onChange={set("website")}
              />
            </label>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field
              id="name"
              label="Your name"
              value={lead.name}
              onChange={set("name")}
              error={errors.name}
              required
            />
            <Field
              id="email"
              label="Email"
              type="email"
              value={lead.email}
              onChange={set("email")}
              error={errors.email}
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5 mt-5">
            <Field
              id="company"
              label="Company"
              value={lead.company}
              onChange={set("company")}
              error={errors.company}
              required
            />
            <Field
              id="industry"
              label="Industry"
              value={lead.industry}
              onChange={set("industry")}
              error={errors.industry}
              required
            />
          </div>

          <div className="mt-5">
            <label
              htmlFor="broken"
              className="block text-[14px] font-[450] mb-2"
              style={{ color: "var(--text)" }}
            >
              What&apos;s broken?{" "}
              <span className="text-[var(--color-amber-dim)]">*</span>
            </label>
            <textarea
              id="broken"
              rows={5}
              value={lead.broken}
              onChange={set("broken")}
              aria-invalid={Boolean(errors.broken)}
              placeholder="The spreadsheet, the missed calls, the report nobody can pull — whatever made you scroll this far."
              className="w-full px-4 py-3 text-[15px] leading-[1.5] bg-[var(--surface)] border outline-none focus:border-[var(--color-amber)] transition-colors resize-y"
              style={{
                color: "var(--text)",
                borderColor: errors.broken ? "#c0392b" : "var(--line)",
              }}
            />
            {errors.broken && (
              <p className="mt-1.5 text-[13px] text-[#c0392b]">
                {errors.broken}
              </p>
            )}
          </div>

          <p
            className="mt-5 border-l-[3px] border-[var(--color-amber)] px-4 py-3 text-[13px] leading-[1.55]"
            style={{ color: "var(--text-dim)", background: "var(--surface)" }}
          >
            Custom software projects generally start at $10,000. SKOX does not
            take healthcare or financial-services projects.
          </p>

          <div className="grid sm:grid-cols-2 gap-5 mt-5">
            <Select
              id="budget"
              label="Expected project budget"
              value={lead.budget}
              options={BUDGETS}
              onChange={set("budget")}
              error={errors.budget}
            />
            <Select
              id="timeline"
              label="When do you want to start?"
              value={lead.timeline}
              options={TIMELINES}
              onChange={set("timeline")}
              error={errors.timeline}
            />
          </div>

          <div className="mt-5">
            <Select
              id="decisionRole"
              label="Your role in the decision"
              value={lead.decisionRole}
              options={DECISION_ROLES}
              onChange={set("decisionRole")}
              error={errors.decisionRole}
            />
          </div>

          <div className="mt-5">
            <label className="flex items-start gap-3 text-[14px] leading-[1.5]">
              <input
                type="checkbox"
                checked={lead.industryEligibility === "confirmed"}
                onChange={(event) => {
                  setLead((previous) => ({
                    ...previous,
                    industryEligibility: event.target.checked
                      ? "confirmed"
                      : "",
                  }));
                  setErrors((previous) => ({
                    ...previous,
                    industryEligibility: undefined,
                  }));
                }}
                className="mt-1 h-4 w-4 shrink-0"
              />
              <span>
                I confirm this project is not for healthcare or financial
                services.
              </span>
            </label>
            {errors.industryEligibility && (
              <p className="mt-1.5 text-[13px] text-[#c0392b]">
                {errors.industryEligibility}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={state === "sending"}
            className="chamfer mt-8 h-[51px] px-[27px] inline-flex items-center bg-[var(--color-ink)] dark:bg-[var(--color-paper)] text-[var(--color-paper)] dark:text-[var(--color-ink)] text-[15.5px] font-[450] transition-opacity hover:opacity-88 disabled:opacity-50"
          >
            {state === "sending" ? copy.submitting : copy.submit}
          </button>
          <p
            className="mt-3 text-[13.5px]"
            style={{ color: "var(--text-dim)" }}
          >
            {copy.reassure}
          </p>

          {state === "failed" && (
            <div
              role="alert"
              className="mt-6 p-5 border chamfer-sm"
              style={{ borderColor: "#c0392b" }}
            >
              <p
                className="text-[15px] font-[450]"
                style={{ color: "var(--text)" }}
              >
                {copy.errorTitle}
              </p>
              <p
                className="mt-2 text-[14px] leading-[1.55]"
                style={{ color: "var(--text-dim)" }}
              >
                Rather than lose what you wrote — this link opens your mail app
                with everything already filled in.
              </p>
              <a
                href={mailto}
                className="mt-3 inline-block text-[14px] font-[450] underline text-[var(--color-amber-dim)] dark:text-[var(--color-amber)]"
              >
                Send it as an email instead
              </a>
            </div>
          )}
        </form>
      </div>
    </Section>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  error?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[14px] font-[450] mb-2"
        style={{ color: "var(--text)" }}
      >
        {label}{" "}
        {required && <span className="text-[var(--color-amber-dim)]">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        className="w-full h-[46px] px-4 text-[15px] bg-[var(--surface)] border outline-none focus:border-[var(--color-amber)] transition-colors"
        style={{
          color: "var(--text)",
          borderColor: error ? "#c0392b" : "var(--line)",
        }}
      />
      {error && <p className="mt-1.5 text-[13px] text-[#c0392b]">{error}</p>}
    </div>
  );
}

function Select({
  id,
  label,
  value,
  options,
  onChange,
  error,
}: {
  id: string;
  label: string;
  value: string;
  options: readonly string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[14px] font-[450] mb-2"
        style={{ color: "var(--text)" }}
      >
        {label} <span className="text-[var(--color-amber-dim)]">*</span>
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        className="w-full h-[46px] px-4 text-[15px] bg-[var(--surface)] border outline-none focus:border-[var(--color-amber)] transition-colors"
        style={{
          color: "var(--text)",
          borderColor: error ? "#c0392b" : "var(--line)",
        }}
      >
        <option value="">Choose one</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="mt-1.5 text-[13px] text-[#c0392b]">{error}</p>}
    </div>
  );
}
