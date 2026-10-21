"use client";

import { useState } from "react";
import { sendPreviewLead } from "./contact";

/** The concept bar's one-field question. Posts to SKOX, tagged with the slug. */
export default function AskForm({
  slug,
  business,
  placeholder,
}: {
  slug: string;
  /** Sent as the lead's company. */
  business: string;
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!q.trim() || !email.trim()) return;
    setState("sending");
    try {
      await sendPreviewLead(slug, {
        name: "Question from the preview",
        email: email.trim(),
        company: business,
        message: `[preview:${slug}] Question: ${q.trim()}`,
        projectType: "websites",
      });
      setState("sent");
    } catch {
      setState("failed");
    }
  }

  return (
    <div className="ask">
      <button type="button" className="ask-toggle" aria-expanded={open} onClick={() => setOpen(!open)}>
        Ask a question
      </button>
      {open && (
        <form className="ask-form" onSubmit={send}>
          {state === "sent" ? (
            <p role="status">Sent. Reiss will reply by email.</p>
          ) : (
            <>
              <label>
                Your question
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder} required />
              </label>
              <label>
                Email
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </label>
              <button className="btn btn-small" type="submit" disabled={state === "sending"}>
                {state === "sending" ? "Sending…" : "Send"}
              </button>
              {state === "failed" && <p role="alert">Didn&rsquo;t send. Email reiss@skoxsoftware.com instead.</p>}
            </>
          )}
        </form>
      )}
    </div>
  );
}
