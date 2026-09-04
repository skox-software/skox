"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { track } from "@vercel/analytics";
import { formatAttribution, readAttribution } from "@/lib/attribution";
import { heroForm, form as copy, site } from "@/content/site";
import { formatLead, validate, type FieldErrors, type Lead } from "@/lib/leads";

type State = "idle" | "sending" | "done" | "failed";

const EMPTY: Lead = { name: "", email: "", company: "", broken: "", timeline: "", website: "" };

/**
 * Contact form that lives inside the hero. Styled for the dark ground and wired
 * to the same /api/contact endpoint (and validation) as the full ScopeForm.
 */
export function HeroContactForm() {
  const [lead, setLead] = useState<Lead>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<State>("idle");
  const router = useRouter();

  /** One object, used for both the POST and the mailto fallback. */
  const enriched: Lead = { ...lead, attribution: formatAttribution(readAttribution()) };

  const set =
    (k: keyof Lead) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setLead((l) => ({ ...l, [k]: e.target.value }));
      if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
    };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate(lead);
    setErrors(found);
    if (Object.keys(found).length) {
      track("hero_form_invalid", { fields: Object.keys(found).join(",") });
      return;
    }

    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enriched),
      });
      if (!res.ok) throw new Error(String(res.status));
      track("scope_request", { from: "hero" });
      // A real URL the ad platforms can register as a conversion.
      router.push("/scope-received");
    } catch {
      track("scope_request_failed", { from: "hero" });
      setState("failed");
    }
  }

  if (state === "done") {
    return (
      <div className="w-full max-w-[440px] rounded-[16px] border border-white/10 bg-white/[0.03] p-7 sm:p-8 backdrop-blur-[6px]">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-amber)]">
          Sent
        </p>
        <h3 className="mt-4 text-white text-[24px] font-normal tracking-[-0.02em]">
          {copy.successTitle}
        </h3>
        <p className="mt-3 text-white/70 text-[15px] leading-[1.55]">{copy.successBody}</p>
      </div>
    );
  }

  // The mailto is the fallback when delivery fails, so it must carry exactly what
  // the POST would have carried — otherwise the only working path loses the
  // company from the hero demo and the calculator figure.
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
    "Scope request — " + (enriched.company || enriched.name),
  )}&body=${encodeURIComponent(formatLead(enriched))}`;

  return (
    <form
      onSubmit={submit}
      noValidate
      className="w-full max-w-[440px] rounded-[16px] border border-white/10 bg-white/[0.03] p-6 sm:p-7 backdrop-blur-[6px]"
    >
      <h3 className="text-white text-[19px] font-[450] tracking-[-0.01em]">{heroForm.formTitle}</h3>
      <p className="mt-1.5 text-white/55 text-[13.5px] leading-[1.45]">{heroForm.formSub}</p>

      {/* Honeypot — hidden from people, tempting to bots. */}
      <div aria-hidden className="absolute w-px h-px overflow-hidden -left-[9999px]">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={lead.website} onChange={set("website")} />
        </label>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field id="hf-name" label="Your name" value={lead.name} onChange={set("name")} error={errors.name} required autoComplete="name" />
        <Field id="hf-email" label="Email" type="email" value={lead.email} onChange={set("email")} error={errors.email} required autoComplete="email" />
      </div>

      <div className="mt-4">
        <Field id="hf-company" label="Company" value={lead.company} onChange={set("company")} error={errors.company} autoComplete="organization" optional />
      </div>

      <div className="mt-4">
        <label htmlFor="hf-broken" className="mb-1.5 block text-[13px] font-[450] text-white/70">
          What do you need? <span className="text-[var(--color-amber)]">*</span>
        </label>
        <textarea
          id="hf-broken"
          rows={3}
          value={lead.broken}
          onChange={set("broken")}
          aria-invalid={Boolean(errors.broken)}
          placeholder="A new site, a dashboard, an internal tool, something automated…"
          className="w-full resize-y rounded-[10px] border bg-white/[0.04] px-3.5 py-2.5 text-[14px] leading-[1.5] text-white placeholder-white/55 outline-none transition-colors focus:border-[var(--color-amber)]"
          style={{ borderColor: errors.broken ? "#ff8a80" : "rgba(255,255,255,0.15)" }}
        />
        {errors.broken && <p className="mt-1.5 text-[12.5px] text-[#ff8a80]">{errors.broken}</p>}
      </div>

      <button
        type="submit"
        disabled={state === "sending"}
        className="mt-5 inline-flex h-[48px] w-full items-center justify-center rounded-[12px] bg-[#E9E9E9] px-6 text-[15px] font-[450] text-[#0A0707] transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {state === "sending" ? copy.submitting : copy.submit}
      </button>
      <p className="mt-3 text-center text-[12px] leading-[1.5] text-white/60">{copy.reassure}</p>

      {state === "failed" && (
        <div role="alert" className="mt-4 rounded-[10px] border border-[#ff8a80]/40 bg-[#ff8a80]/[0.06] p-4">
          <p className="text-[14px] font-[450] text-white">{copy.errorTitle}</p>
          <p className="mt-1.5 text-[13px] leading-[1.5] text-white/60">
            Rather than lose what you wrote — this opens your mail app with everything filled in.
          </p>
          <a href={mailto} className="mt-2 inline-block text-[13px] font-[450] text-[var(--color-amber)] underline underline-offset-2">
            Send it as an email instead
          </a>
        </div>
      )}
    </form>
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
  optional,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-[450] text-white/70">
        {label}
        {required && <span className="text-[var(--color-amber)]"> *</span>}
        {optional && <span className="text-white/55"> (optional)</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        className="h-[46px] w-full rounded-[10px] border bg-white/[0.04] px-3.5 text-[14px] text-white placeholder-white/55 outline-none transition-colors focus:border-[var(--color-amber)]"
        style={{ borderColor: error ? "#ff8a80" : "rgba(255,255,255,0.15)" }}
      />
      {error && <p className="mt-1.5 text-[12.5px] text-[#ff8a80]">{error}</p>}
    </div>
  );
}
