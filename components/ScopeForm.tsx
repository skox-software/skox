"use client";

import { useState } from "react";
import { Section, SectionHead } from "@/components/Section";
import { LEAK_KEY } from "@/components/LeakCalculator";
import { form as copy, site } from "@/content/site";
import { formatLead, TIMELINES, validate, type FieldErrors, type Lead } from "@/lib/leads";

type State = "idle" | "sending" | "done" | "failed";

const EMPTY: Lead = { name: "", email: "", company: "", broken: "", timeline: "", website: "" };

export function ScopeForm() {
  const [lead, setLead] = useState<Lead>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<State>("idle");

  const set = (k: keyof Lead) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLead((l) => ({ ...l, [k]: e.target.value }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate(lead);
    setErrors(found);
    if (Object.keys(found).length) return;

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
        body: JSON.stringify({ ...lead, leak }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("done");
    } catch {
      // Never swallow a real lead behind a green checkmark.
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
          <h2 className="mt-5 text-[36px] sm:text-[48px] font-normal tracking-[-0.025em]" style={{ color: "var(--text)" }}>
            {copy.successTitle}
          </h2>
          <p className="mt-4 text-[17px] leading-[1.55]" style={{ color: "var(--text-dim)" }}>
            {copy.successBody}
          </p>
        </div>
      </Section>
    );
  }

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent("Scope request — " + (lead.company || lead.name))}&body=${encodeURIComponent(formatLead(lead))}`;

  return (
    <Section id="scope" tone="alt">
      <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] gap-12 lg:gap-20">
        <SectionHead kicker={copy.kicker} headline={copy.headline} sub={copy.sub} className="!max-w-none" />

        <form onSubmit={submit} noValidate className="reveal">
          {/* Honeypot — hidden from people, tempting to bots. */}
          <div aria-hidden className="absolute w-px h-px overflow-hidden -left-[9999px]">
            <label>
              Website
              <input tabIndex={-1} autoComplete="off" value={lead.website} onChange={set("website")} />
            </label>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field id="name" label="Your name" value={lead.name} onChange={set("name")} error={errors.name} required />
            <Field id="email" label="Email" type="email" value={lead.email} onChange={set("email")} error={errors.email} required />
          </div>

          <div className="mt-5">
            <Field id="company" label="Company" value={lead.company} onChange={set("company")} error={errors.company} />
          </div>

          <div className="mt-5">
            <label htmlFor="broken" className="block text-[14px] font-[450] mb-2" style={{ color: "var(--text)" }}>
              What&apos;s broken? <span className="text-[var(--color-amber-dim)]">*</span>
            </label>
            <textarea
              id="broken"
              rows={5}
              value={lead.broken}
              onChange={set("broken")}
              aria-invalid={Boolean(errors.broken)}
              placeholder="The spreadsheet, the missed calls, the report nobody can pull — whatever made you scroll this far."
              className="w-full px-4 py-3 text-[15px] leading-[1.5] bg-[var(--surface)] border outline-none focus:border-[var(--color-amber)] transition-colors resize-y"
              style={{ color: "var(--text)", borderColor: errors.broken ? "#c0392b" : "var(--line)" }}
            />
            {errors.broken && <p className="mt-1.5 text-[13px] text-[#c0392b]">{errors.broken}</p>}
          </div>

          <fieldset className="mt-6">
            <legend className="text-[14px] font-[450] mb-3" style={{ color: "var(--text)" }}>
              Timeline
            </legend>
            <div className="flex flex-wrap gap-2.5">
              {TIMELINES.map((t) => (
                <label
                  key={t}
                  className={`chamfer-sm cursor-pointer px-4 py-2.5 text-[14px] border transition-colors ${lead.timeline === t ? "bg-[var(--color-ink)] text-[var(--color-paper)] dark:bg-[var(--color-paper)] dark:text-[var(--color-ink)]" : ""}`}
                  style={
                    lead.timeline === t ? { borderColor: "transparent" } : { borderColor: "var(--line)", color: "var(--text-dim)" }
                  }
                >
                  <input
                    type="radio"
                    name="timeline"
                    value={t}
                    checked={lead.timeline === t}
                    onChange={set("timeline")}
                    className="sr-only"
                  />
                  {t}
                </label>
              ))}
            </div>
          </fieldset>

          <button
            type="submit"
            disabled={state === "sending"}
            className="chamfer mt-8 h-[51px] px-[27px] inline-flex items-center bg-[var(--color-ink)] dark:bg-[var(--color-paper)] text-[var(--color-paper)] dark:text-[var(--color-ink)] text-[15.5px] font-[450] transition-opacity hover:opacity-88 disabled:opacity-50"
          >
            {state === "sending" ? copy.submitting : copy.submit}
          </button>

          {state === "failed" && (
            <div role="alert" className="mt-6 p-5 border chamfer-sm" style={{ borderColor: "#c0392b" }}>
              <p className="text-[15px] font-[450]" style={{ color: "var(--text)" }}>
                {copy.errorTitle}
              </p>
              <p className="mt-2 text-[14px] leading-[1.55]" style={{ color: "var(--text-dim)" }}>
                Rather than lose what you wrote — this link opens your mail app with everything already filled in.
              </p>
              <a href={mailto} className="mt-3 inline-block text-[14px] font-[450] underline text-[var(--color-amber-dim)] dark:text-[var(--color-amber)]">
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
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[14px] font-[450] mb-2" style={{ color: "var(--text)" }}>
        {label} {required && <span className="text-[var(--color-amber-dim)]">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        className="w-full h-[46px] px-4 text-[15px] bg-[var(--surface)] border outline-none focus:border-[var(--color-amber)] transition-colors"
        style={{ color: "var(--text)", borderColor: error ? "#c0392b" : "var(--line)" }}
      />
      {error && <p className="mt-1.5 text-[13px] text-[#c0392b]">{error}</p>}
    </div>
  );
}
