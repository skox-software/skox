"use client";

import { useState } from "react";
import { SLUG } from "./data";

/** The concept bar's one-field question. Posts to SKOX, tagged with the slug. */
export default function AskForm() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!q.trim() || !email.trim()) return;
    setState("sending");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Question from the preview",
          email: email.trim(),
          company: "Artisan's Kitchen Catering",
          broken: `[preview:${SLUG}] Question: ${q.trim()}`,
          timeline: `preview:${SLUG}`,
          projectType: "websites",
        }),
        signal: AbortSignal.timeout(15000),
      });
      if (!r.ok) throw new Error("bad");
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
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Can we keep our phone number on every page?" required />
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
