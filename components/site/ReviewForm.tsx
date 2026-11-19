"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { identify, track } from "@/lib/track";
import { review, site } from "@/content/site";
import { captureAttribution, formatAttribution, readAttribution, readJourney } from "@/lib/attribution";
import { formatLead, validate, type FieldErrors, type Lead } from "@/lib/leads";

/**
 * The review form's own checks on top of the shared validate(), which concept
 * previews also use through /api/contact. Firm is required here only, and the
 * messages name the field. Four fields: name, email, firm, the busywork, plus an
 * optional "How did you hear about us?" that catches the visitor who saw a post
 * and typed the address later, which no link tag can. The trade comes from the
 * page the visitor clicked through from (?industry=).
 */
function check(lead: Partial<Lead>): FieldErrors {
  const e = validate(lead);
  if (e.broken === "This is the one we actually need.") e.broken = "Tell us the job in a sentence or two.";
  if (e.name === "Required.") e.name = "Add your name.";
  if (e.email === "Required.") e.email = "Add your email address.";
  if (!e.company && !lead.company?.trim()) e.company = "Add your firm's name.";
  return e;
}

const copy = review.form;

const EMPTY: Lead = {
  name: "",
  email: "",
  company: "",
  phone: "",
  industry: "",
  broken: "",
  people: "",
  format: "",
  timeline: "",
  heard: "",
  website: "",
};

/**
 * The review booking form. One per site, on /review.
 *
 * Delivery is unchanged from the SKOX form: /api/contact sends the email,
 * files the lead on the portal pipeline and tells the ad platforms; a success
 * lands on /review/booked so the platforms see a real URL. Nothing is sent
 * until the visitor presses the button.
 */
export function ReviewForm({ initialIndustry = "", software = "" }: { initialIndustry?: string; software?: string }) {
  const [lead, setLead] = useState<Lead>({ ...EMPTY, industry: initialIndustry });
  /** From the homepage picker: shown as a lead-in above the box, joined on send. The visitor types only the job. */
  const leadIn = software ? `We use ${software}.` : "";
  const outgoing = (l: Lead): Lead => (leadIn && l.broken.trim() ? { ...l, broken: `${leadIn} ${l.broken.trim()}` } : l);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<"idle" | "sending" | "failed">("idle");
  const [fallback, setFallback] = useState("");
  const router = useRouter();
  const form = useRef<HTMLFormElement>(null);
  const started = useRef(false);
  const submitting = useRef(false);
  const finished = useRef(false);

  function change(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const key = event.target.name as keyof Lead;
    setLead((previous) => ({ ...previous, [key]: event.target.value }));
    setErrors((previous) => ({ ...previous, [key]: undefined }));
  }

  /** On blur, only once something has been typed: tabbing past an empty field says nothing. Submit flags the empty ones. */
  function checkOne(key: keyof Lead) {
    if (!String(lead[key] ?? "").trim()) return;
    const found = check(lead)[key];
    setErrors((previous) => ({ ...previous, [key]: found }));
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (submitting.current) return;
    const found = check(lead);
    setErrors(found);
    if (Object.keys(found).length) {
      track("review_form_invalid", { fields: Object.keys(found).join(",") });
      form.current?.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }
    submitting.current = true;
    setState("sending");
    captureAttribution();
    const enriched = { ...outgoing(lead), attribution: formatAttribution(readAttribution()) };
    setFallback(
      `mailto:${site.email}?subject=${encodeURIComponent(`Operations review: ${lead.company || lead.name}`)}&body=${encodeURIComponent(formatLead(enriched))}`,
    );
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...enriched, context: JSON.stringify(readJourney()) }),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok || result.delivered !== "email") throw new Error("Delivery not confirmed");
      finished.current = true;
      identify(lead.email);
      track("review_request", { from: "review", industry: lead.industry || "unspecified", heard: lead.heard || "unspecified" });
      router.push("/review/booked");
    } catch {
      track("review_request_failed", { from: "review" });
      setState("failed");
      submitting.current = false;
    }
  }

  const text = (key: "name" | "email" | "company" | "phone" | "industry", label: string, required: boolean, extra: Partial<React.InputHTMLAttributes<HTMLInputElement>> = {}) => (
    <div className="field">
      <label htmlFor={`review-${key}`}>
        {label} {required && <span className="req" aria-hidden>*</span>}
      </label>
      <input
        id={`review-${key}`}
        name={key}
        value={lead[key] ?? ""}
        onChange={change}
        onBlur={() => checkOne(key)}
        required={required}
        aria-invalid={!!errors[key]}
        aria-describedby={errors[key] ? `${key}-error` : undefined}
        {...extra}
      />
      {errors[key] && (
        <p className="field-error" id={`${key}-error`}>
          {errors[key]}
        </p>
      )}
    </div>
  );

  return (
    <form
      data-clarity-mask="true"
      ref={form}
      method="post"
      action="/api/contact"
      onSubmit={submit}
      noValidate
      aria-busy={state === "sending"}
      onFocusCapture={() => {
        if (!started.current) {
          started.current = true;
          track("review_form_started", { page: window.location.pathname });
        }
      }}
    >
      <div className="honeypot" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" value={lead.website} onChange={change} />
        </label>
      </div>

      <div className="two">
        {text("name", copy.name, true, { type: "text", autoComplete: "name", maxLength: 120 })}
        {text("email", copy.email, true, { type: "email", autoComplete: "email", maxLength: 254 })}
      </div>
      {text("company", copy.firm, true, { type: "text", autoComplete: "organization", maxLength: 200 })}

      <div className="field">
        <label htmlFor="review-broken">
          {copy.busywork} <span className="req" aria-hidden>*</span>
        </label>
        {leadIn && (
          <p className="lead-in" id="broken-leadin">
            {leadIn} <span>We&apos;ll add that to what you write.</span>
          </p>
        )}
        <textarea
          id="review-broken"
          name="broken"
          required
          maxLength={4000}
          placeholder={copy.busyworkPlaceholder}
          value={lead.broken}
          onChange={change}
          onBlur={() => checkOne("broken")}
          aria-invalid={!!errors.broken}
          aria-describedby={[leadIn ? "broken-leadin" : "", errors.broken ? "broken-error" : ""].filter(Boolean).join(" ") || undefined}
        />
        {errors.broken && (
          <p className="field-error" id="broken-error">
            {errors.broken}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="review-heard">{copy.heard}</label>
        <select id="review-heard" name="heard" value={lead.heard ?? ""} onChange={change}>
          <option value="">Choose one (optional)</option>
          {copy.heardOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {state === "failed" && (
        <div className="form-failure" role="alert">
          <p>{copy.error}</p>
          <a href={fallback} onClick={() => track("review_email_fallback")}>
            {copy.emailUs}
          </a>
        </div>
      )}

      <div style={{ marginTop: 6 }}>
        <button className="btn blue" type="submit" disabled={state === "sending"}>
          {state === "sending" ? copy.submitting : copy.submit} <span className="dot" />
        </button>
      </div>
      <p className="small notice">{copy.reply}</p>
    </form>
  );
}
