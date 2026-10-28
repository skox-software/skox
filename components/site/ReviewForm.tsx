"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { identify, track } from "@/lib/track";
import { review, site } from "@/content/site";
import { captureAttribution, formatAttribution, readAttribution, readJourney } from "@/lib/attribution";
import { formatLead, validate, type FieldErrors, type Lead } from "@/lib/leads";

const copy = review.form;

const EMPTY: Lead = {
  name: "",
  email: "",
  company: "",
  phone: "",
  industry: "",
  broken: "",
  people: "",
  format: copy.formatOptions[0],
  timeline: "",
  website: "",
};

/**
 * The review booking form. One per site, on /review.
 *
 * Delivery is unchanged from the SKOX form: /api/contact sends the email,
 * files the lead on the portal pipeline and tells the ad platforms; a success
 * lands on /review/booked so the platforms see a real URL. An address typed
 * and then abandoned goes to /api/partial once, as the notice under the
 * button says.
 */
export function ReviewForm() {
  const [lead, setLead] = useState<Lead>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<"idle" | "sending" | "failed">("idle");
  const [fallback, setFallback] = useState("");
  const router = useRouter();
  const form = useRef<HTMLFormElement>(null);
  const started = useRef(false);
  const submitting = useRef(false);
  const finished = useRef(false);
  const captured = useRef("");
  const pending = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const latest = useRef(lead);
  useEffect(() => {
    latest.current = lead;
  }, [lead]);

  function captureUnfinished(stage: string) {
    clearTimeout(pending.current);
    const current = latest.current;
    const email = current.email.trim();
    if (finished.current || submitting.current) return;
    if (!email || captured.current === email) return;
    if (validate({ ...current, name: "x", broken: "x" }).email) return;
    captured.current = email;
    captureAttribution();
    track("review_partial_captured", { stage });
    void fetch("/api/partial", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        email,
        name: current.name,
        broken: current.broken,
        projectType: current.industry?.slice(0, 40),
        website: current.website,
        stage,
        attribution: formatAttribution(readAttribution()),
        context: JSON.stringify(readJourney()),
      }),
    }).catch(() => {});
  }

  useEffect(() => {
    const leaving = () => captureUnfinished("left-page");
    const hidden = () => {
      if (document.visibilityState === "hidden") captureUnfinished("left-page");
    };
    window.addEventListener("pagehide", leaving);
    document.addEventListener("visibilitychange", hidden);
    return () => {
      window.removeEventListener("pagehide", leaving);
      document.removeEventListener("visibilitychange", hidden);
      clearTimeout(pending.current);
    };
  }, []);

  function change(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const key = event.target.name as keyof Lead;
    setLead((previous) => ({ ...previous, [key]: event.target.value }));
    setErrors((previous) => ({ ...previous, [key]: undefined }));
  }

  function checkOne(key: keyof Lead) {
    const found = validate(lead)[key];
    setErrors((previous) => ({ ...previous, [key]: found }));
    if (key === "email" && !found) {
      clearTimeout(pending.current);
      pending.current = setTimeout(() => captureUnfinished("email-entered"), 10_000);
    }
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (submitting.current) return;
    const found = validate(lead);
    setErrors(found);
    if (Object.keys(found).length) {
      track("review_form_invalid", { fields: Object.keys(found).join(",") });
      form.current?.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }
    submitting.current = true;
    clearTimeout(pending.current);
    setState("sending");
    captureAttribution();
    const enriched = { ...lead, attribution: formatAttribution(readAttribution()) };
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
      track("review_request", { from: "review", industry: lead.industry || "unspecified" });
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
      <div className="two">
        {text("company", copy.firm, true, { type: "text", autoComplete: "organization", maxLength: 200 })}
        {text("phone", copy.phone, false, { type: "tel", autoComplete: "tel", maxLength: 40 })}
      </div>
      {text("industry", copy.industry, true, { type: "text", placeholder: copy.industryPlaceholder, maxLength: 120 })}

      <div className="field">
        <label htmlFor="review-broken">
          {copy.busywork} <span className="req" aria-hidden>*</span>
        </label>
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
          aria-describedby={errors.broken ? "broken-error" : undefined}
        />
        {errors.broken && (
          <p className="field-error" id="broken-error">
            {errors.broken}
          </p>
        )}
      </div>

      <div className="two">
        <div className="field">
          <label htmlFor="review-people">{copy.people}</label>
          <select id="review-people" name="people" value={lead.people} onChange={change}>
            <option value="">Choose</option>
            {copy.peopleOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <fieldset>
            <legend>{copy.format}</legend>
            <div className="choice" style={{ marginTop: 8 }}>
              {copy.formatOptions.map((option) => (
                <label key={option} className={lead.format === option ? "on" : undefined}>
                  <input type="radio" name="format" value={option} checked={lead.format === option} onChange={change} />
                  {option}
                </label>
              ))}
            </div>
          </fieldset>
        </div>
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
      <p className="small notice">
        {copy.notice} <Link className="link" href="/privacy#choices">{copy.noticeLink}</Link> {copy.reply}
      </p>
    </form>
  );
}
