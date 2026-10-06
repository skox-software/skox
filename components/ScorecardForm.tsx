"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { identify, track } from "@/lib/track";
import {
  captureAttribution,
  formatAttribution,
  readAttribution,
  readJourney,
} from "@/lib/attribution";
import {
  LOCATION_OPTIONS,
  SCORECARD_FILE,
  validateScorecard,
  type ScorecardErrors,
  type ScorecardRequest,
} from "@/lib/scorecard";

export function ScorecardForm() {
  const [form, setForm] = useState<ScorecardRequest>({
    email: "",
    name: "",
    locations: "",
    website: "",
  });
  const [errors, setErrors] = useState<ScorecardErrors>({});
  const [state, setState] = useState<"idle" | "sending" | "failed">("idle");
  const started = useRef(false);
  const submitting = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  function change(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name as keyof ScorecardErrors]) setErrors((x) => ({ ...x, [name]: undefined }));
  }

  function chooseLocations(value: string) {
    setForm((f) => ({ ...f, locations: f.locations === value ? "" : value }));
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (submitting.current) return;
    const found = validateScorecard(form);
    setErrors(found);
    if (Object.keys(found).length) {
      formRef.current?.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }
    submitting.current = true;
    setState("sending");
    captureAttribution();
    try {
      const response = await fetch("/api/scorecard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          attribution: formatAttribution(readAttribution()),
          context: JSON.stringify(readJourney()),
        }),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok || result.delivered !== true) throw new Error("Not delivered");
      identify(form.email);
      track("scorecard_download", { locations: form.locations || "unspecified" });
      router.push("/scorecard/thanks");
    } catch {
      // Their copy didn't send. They still get the file; we just don't count it.
      track("scorecard_send_failed");
      setState("failed");
      submitting.current = false;
    }
  }

  return (
    <form
      data-clarity-mask="true"
      ref={formRef}
      method="post"
      action="/api/scorecard"
      onSubmit={submit}
      noValidate
      className="conversion-form scorecard-form"
      aria-busy={state === "sending"}
      onFocusCapture={() => {
        if (!started.current) {
          started.current = true;
          track("scorecard_form_started");
        }
      }}
    >
      <h2 className="scorecard-form-title">Get the free scorecard</h2>
      <p className="form-description">We&apos;ll email you the download link straight away.</p>

      <div className="honeypot" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={change} />
        </label>
      </div>

      <div className="field">
        <label htmlFor="scorecard-email">
          Email address <span aria-hidden>*</span>
        </label>
        <input
          id="scorecard-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          value={form.email}
          onChange={change}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "scorecard-email-error" : "scorecard-reassure"}
        />
        {errors.email && (
          <p className="field-error" id="scorecard-email-error">
            {errors.email}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="scorecard-name">
          First name <span className="optional">Optional</span>
        </label>
        <input
          id="scorecard-name"
          name="name"
          type="text"
          autoComplete="given-name"
          maxLength={120}
          value={form.name}
          onChange={change}
          aria-invalid={!!errors.name}
        />
      </div>

      <fieldset className="field type-field">
        <legend>
          How many locations or crews? <span className="optional">Optional</span>
        </legend>
        <div className="type-chips">
          {LOCATION_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={form.locations === option}
              onClick={() => chooseLocations(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <input type="hidden" name="locations" value={form.locations} />
      </fieldset>

      <p className="form-reassure" id="scorecard-reassure">
        One email with the link. A founder may send one personal note afterwards. No newsletter, no
        sales sequence.
      </p>

      {state === "failed" && (
        <div className="form-failure" role="alert">
          <p>We couldn&apos;t email it just now. Download it directly instead.</p>
          <a href={SCORECARD_FILE} download onClick={() => track("scorecard_direct_download")}>
            Download the scorecard ↓
          </a>
        </div>
      )}

      <button className="button button-primary form-submit" disabled={state === "sending"} type="submit">
        {state === "sending" ? "Sending…" : "Send me the scorecard"}
        <span aria-hidden>↗</span>
      </button>
      <p className="form-privacy">
        We&apos;ll only use your email to send this and, at most, one note about it.{" "}
        <Link href="/privacy">Privacy</Link>
      </p>
    </form>
  );
}
