"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { identify, track } from "@/lib/track";
import { builds, landing, type BuildType } from "@/content/landing";
import { site } from "@/content/site";
import { onBrief } from "@/lib/brief";
import {
  captureAttribution,
  formatAttribution,
  readAttribution,
  readJourney,
} from "@/lib/attribution";
import { formatLead, validate, type Lead, type FieldErrors } from "@/lib/leads";

/** The build chips, plus the honest escape hatch for people who don't know. */
const TYPE_OPTIONS = [
  ...builds.map((build) => ({ value: build.id as string, label: build.label })),
  { value: "other", label: landing.formLabels.other },
];

export function ConversionForm({ initial }: { initial?: BuildType }) {
  const [lead, setLead] = useState<Lead>({
    name: "",
    email: "",
    broken: "",
    company: "",
    timeline: "",
    website: "",
    projectType: initial || "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<"idle" | "sending" | "failed">("idle");
  const started = useRef(false);
  const submitting = useRef(false);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const brief = useRef<HTMLTextAreaElement>(null);
  const [fallback, setFallback] = useState("");
  /** The address already sent as an unfinished enquiry, so it goes once only. */
  const captured = useRef("");
  /** Set the moment a real submit lands, so no partial follows it out. */
  const finished = useRef(false);
  /** The delayed send after the email field is left, cancelled by a submit. */
  const pending = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  /** Read by the leave handler, which is bound once and would otherwise see
      the state as it was on mount. */
  const latest = useRef(lead);
  useEffect(() => {
    latest.current = lead;
  }, [lead]);

  // The hero composer hands over both the text and the build it read. Anything
  // the visitor has already put in wins — their own edits are never overwritten.
  useEffect(
    () =>
      onBrief(({ text, build }) => {
        if (!text) return;
        setLead((previous) => ({
          ...previous,
          broken: previous.broken.trim() ? previous.broken : text,
          projectType: previous.projectType || build || "",
        }));
        setErrors((previous) => ({ ...previous, broken: undefined }));
      }),
    [],
  );

  // The brief is the first field and often arrives pre-filled from the hero, so
  // it has to be able to show more than four rows without the visitor resizing.
  useEffect(() => {
    const node = brief.current;
    if (!node) return;
    node.style.height = "auto";
    node.style.height = `${Math.min(node.scrollHeight, 320)}px`;
  }, [lead.broken]);

  /**
   * Send the enquiry as it stands, without a submit.
   *
   * Announced at the email field rather than done quietly — the line beside it
   * says this may happen, which is the difference between following up on an
   * unfinished enquiry and collecting an address someone chose not to give.
   *
   * Fires at most once per address per visit, never after a real submit, and
   * lands on its own route so it can never be mistaken for a conversion.
   */
  function captureUnfinished(stage: string) {
    clearTimeout(pending.current);
    const current = latest.current;
    const email = current.email.trim();
    if (finished.current || submitting.current) return;
    if (!email || captured.current === email) return;
    if (validate({ ...current, name: "x", broken: "x" }).email) return;

    captured.current = email;
    captureAttribution();
    track("scope_partial_captured", { stage });
    void fetch("/api/partial", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // The page may be closing; keepalive is what gets it out of the door.
      keepalive: true,
      body: JSON.stringify({
        email,
        name: current.name,
        broken: current.broken,
        projectType: current.projectType,
        website: current.website,
        stage,
        attribution: formatAttribution(readAttribution()),
        context: JSON.stringify(readJourney()),
      }),
    }).catch(() => {
      // Nothing on screen is waiting on this. Let the visitor carry on.
    });
  }

  // The other half: someone who fills the address and then leaves the page
  // without pressing anything. pagehide is the only event that reliably fires
  // on a mobile tab being closed or backgrounded for good.
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
    // Bound once; everything it reads comes through `latest`.
  }, []);

  function change(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const key = event.target.name as keyof Lead;
    setLead((previous) => ({ ...previous, [key]: event.target.value }));
    setErrors((previous) => ({ ...previous, [key]: undefined }));
  }

  /**
   * Check one field the moment the visitor leaves it. Catching a typo at the
   * email box costs a glance; catching it at the submit button costs the lead.
   */
  function checkOne(key: keyof Lead) {
    const found = validate(lead)[key];
    setErrors((previous) => ({ ...previous, [key]: found }));
    // Email is often the last field before Submit, and leaving it is part of
    // pressing the button. Wait long enough to see whether a real submit
    // follows; leaving the page still sends at once.
    if (key === "email" && !found) {
      clearTimeout(pending.current);
      pending.current = setTimeout(() => captureUnfinished("email-entered"), 10_000);
    }
  }

  function chooseType(value: string) {
    setLead((previous) => ({
      ...previous,
      // A second tap on the same chip clears it — it is an optional field.
      projectType: previous.projectType === value ? "" : value,
    }));
    track("scope_type_chosen", { type: value });
  }

  /** Ticked once the field holds something valid and has been left. */
  function isDone(key: "name" | "email" | "broken") {
    return Boolean(lead[key]?.trim()) && !errors[key] && !validate(lead)[key];
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (submitting.current) return;
    const found = validate(lead);
    setErrors(found);
    if (Object.keys(found).length) {
      track("scope_form_invalid", { fields: Object.keys(found).join(",") });
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`)
        ?.focus();
      return;
    }
    submitting.current = true;
    clearTimeout(pending.current);
    setState("sending");
    captureAttribution();
    const enriched = {
      ...lead,
      attribution: formatAttribution(readAttribution()),
    };
    setFallback(
      `mailto:${site.email}?subject=${encodeURIComponent(`Project enquiry — ${lead.name}`)}&body=${encodeURIComponent(formatLead(enriched))}`,
    );
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...enriched,
          context: JSON.stringify(readJourney()),
        }),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok || result.delivered !== "email")
        throw new Error("Delivery not confirmed");
      finished.current = true;
      identify(lead.email);
      track("scope_request", {
        from: "landing",
        type: lead.projectType || "unspecified",
      });
      router.push("/scope-received");
    } catch {
      track("scope_request_failed", { from: "landing" });
      setState("failed");
      submitting.current = false;
    }
  }

  return (
    <form
      ref={formRef}
      method="post"
      action="/api/contact"
      onSubmit={submit}
      noValidate
      className="conversion-form"
      aria-busy={state === "sending"}
      onFocusCapture={() => {
        if (!started.current) {
          started.current = true;
          track("scope_form_started", { page: window.location.pathname });
        }
      }}
    >
      <h3>{landing.formTitleSmall}</h3>
      <p className="form-description">{landing.formNote}</p>
      <div className="honeypot" aria-hidden="true">
        <label>
          Website
          <input
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={lead.website}
            onChange={change}
          />
        </label>
      </div>

      {/* The project comes first. Asking for a name and an email before the
          visitor has said anything is the step people leave on; asking after
          they have described the thing they want is the step they finish. */}
      <div className="field">
        <label htmlFor="project-broken">
          {landing.formLabels.broken} <span aria-hidden>*</span>
          {isDone("broken") && (
            <span className="field-done" aria-hidden>
              ✓
            </span>
          )}
        </label>
        <textarea
          ref={brief}
          id="project-broken"
          name="broken"
          required
          rows={3}
          maxLength={4000}
          placeholder={landing.formPlaceholder}
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

      {/* One tap, no dropdown to open. Pre-selected when the hero already read
          the brief, so most visitors never touch it. */}
      <fieldset className="field type-field">
        <legend>
          {landing.formLabels.projectType}{" "}
          <span className="optional">{landing.formLabels.optional}</span>
        </legend>
        <div className="type-chips">
          {TYPE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={lead.projectType === option.value}
              onClick={() => chooseType(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <input type="hidden" name="projectType" value={lead.projectType} />
      </fieldset>

      <div className="form-row">
        {(["name", "email"] as const).map((key) => (
          <div className="field" key={key}>
            <label htmlFor={`project-${key}`}>
              {landing.formLabels[key]} <span aria-hidden>*</span>
              {isDone(key) && (
                <span className="field-done" aria-hidden>
                  ✓
                </span>
              )}
            </label>
            <input
              id={`project-${key}`}
              name={key}
              type={key === "email" ? "email" : "text"}
              autoComplete={key}
              required
              maxLength={key === "name" ? 120 : 254}
              value={lead[key]}
              onChange={change}
              onBlur={() => checkOne(key)}
              aria-invalid={!!errors[key]}
              aria-describedby={
                errors[key]
                  ? `${key}-error`
                  : key === "email"
                    ? "email-reassure"
                    : undefined
              }
            />
            {errors[key] && (
              <p className="field-error" id={`${key}-error`}>
                {errors[key]}
              </p>
            )}
          </div>
        ))}
      </div>
      <p className="form-reassure" id="email-reassure">
        {landing.formReassure}
      </p>

      {state === "failed" && (
        <div className="form-failure" role="alert">
          <p>{landing.formError}</p>
          <a href={fallback} onClick={() => track("scope_email_fallback")}>
            {landing.formEmail} ↗
          </a>
        </div>
      )}
      <button
        className="button button-primary form-submit"
        disabled={state === "sending"}
        type="submit"
      >
        {state === "sending" ? landing.formSubmitting : landing.formSubmit}
        <span aria-hidden>↗</span>
      </button>
      <p className="form-next">{landing.formNext}</p>
      <p className="form-privacy">
        {landing.formPrivacy} <Link href="/privacy">Privacy</Link>
      </p>
    </form>
  );
}
