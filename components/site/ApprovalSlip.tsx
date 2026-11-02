"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Step = { label: string; time: string };

/**
 * The home hero's one moment: a sample job as a sheet of paper. Each line
 * of work the desk did is struck through in blue, once, on load; the only
 * line left unstruck is the owner's decision, with the one real Approve
 * button on it. Approving stamps the sheet; Reset puts it back. Replay runs
 * the strikes again. Reduced motion shows every line already struck.
 * Labelled as a sample.
 */
export function ApprovalSlip({ title, total, steps, cta }: { title: string; total: string; steps: readonly Step[]; cta: string }) {
  const [run, setRun] = useState(0);
  const [approved, setApproved] = useState(false);
  const approveRef = useRef<HTMLButtonElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const moved = useRef(false);

  useEffect(() => {
    if (!moved.current) return;
    (approved ? ctaRef.current : approveRef.current)?.focus();
  }, [approved]);

  const decide = (next: boolean) => {
    moved.current = true;
    setApproved(next);
  };

  return (
    <figure className={approved ? "slip done" : "slip"} aria-label="A sample job: the desk's work struck off, the decision left for you">
      <div className="slip-cap">
        <b>{title}</b>
        <span className="num">Desk time {total}</span>
      </div>
      <ol className="slip-rows" key={run}>
        {steps.map((step, i) => (
          <li key={step.label} style={{ "--d": `${0.9 + i * 0.42}s` } as React.CSSProperties}>
            <span>
              <span className="slip-line">{step.label}</span>
            </span>
            <span className="t num">{step.time}</span>
          </li>
        ))}
      </ol>
      <div className="slip-decide" style={{ "--d": `${0.9 + steps.length * 0.42}s` } as React.CSSProperties}>
        <p className="slip-stamp" role="status">
          {approved ? "Approved by you. Sent to the client." : "Waiting on you."}
        </p>
        {approved ? (
          <div className="slip-after">
            <p>That&apos;s the only click your team makes.</p>
            <div className="slip-actions">
              <Link ref={ctaRef} className="btn blue s" href="/review" data-cta="hero-approve">
                {cta} <span className="dot" />
              </Link>
              <button type="button" className="slip-text" onClick={() => decide(false)}>
                Reset
              </button>
            </div>
          </div>
        ) : (
          <button ref={approveRef} type="button" className="btn ink s" onClick={() => decide(true)}>
            Approve the quote <span className="dot" />
          </button>
        )}
      </div>
      <figcaption className="slip-foot">
        <span>Sample job</span>
        <button type="button" className="slip-text" onClick={() => { setApproved(false); setRun((r) => r + 1); }}>
          Replay
        </button>
      </figcaption>
    </figure>
  );
}
