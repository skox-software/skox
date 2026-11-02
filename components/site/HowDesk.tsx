"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { nav } from "@/content/site";

const REDUCED = "(prefers-reduced-motion: reduce)";
function subscribe(cb: () => void) {
  const m = window.matchMedia(REDUCED);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
}
const reducedNow = () => window.matchMedia(REDUCED).matches;

type Part = { who: string; title: string; body: string; yours?: boolean };

const STEP_MS = 4200;

/**
 * How a desk works, as four cards on one line from "a job comes in". One card
 * is in focus at a time and widens; its small screen plays what the desk does
 * at that step. Hover or tap a card to hold it. Everything on the small
 * screens is a sample survey job and says so.
 */
export function HowDesk({ parts }: { parts: readonly Part[] }) {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const [inView, setInView] = useState(false);
  const still = useSyncExternalStore(subscribe, reducedNow, () => false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (still || held || !inView) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % parts.length), STEP_MS);
    return () => clearTimeout(t);
  }, [active, held, inView, still, parts.length]);

  return (
    <div className={still ? "how-flow still" : "how-flow"} ref={root} onMouseLeave={() => setHeld(false)}>
      <div className="flow-stem" aria-hidden>
        <span className="flow-in">
          <span className="p-dot" /> A new job comes in
        </span>
      </div>
      <ol className="flow-cards">
        {parts.map((part, i) => (
          <li
            key={part.title}
            className={[i === active ? "on" : "", part.yours ? "yours" : ""].join(" ").trim() || undefined}
            onMouseEnter={() => { setActive(i); setHeld(true); }}
          >
            <button type="button" className="flow-hit" onClick={() => { setActive(i); setHeld(true); }} aria-pressed={i === active}>
              <span className="sr">Show step {i + 1}: {part.title}</span>
            </button>
            <span className="who">{part.who}</span>
            <h3>{part.title}</h3>
            <p>{part.body}</p>
            <div className={i === 3 ? "mini live" : "mini"} aria-hidden={i === 3 ? undefined : true}>
              {i === 0 && <MiniCollect />}
              {i === 1 && <MiniRead />}
              {i === 2 && <MiniPrepare />}
              {i === 3 && <MiniDecide onUse={() => { setActive(3); setHeld(true); }} />}
            </div>
            <span className="flow-bar" aria-hidden>
              <span style={{ animationDuration: `${STEP_MS}ms` }} />
            </span>
          </li>
        ))}
      </ol>
      <p className="flow-note">Sample survey job.</p>
    </div>
  );
}

function MiniCollect() {
  const rows = ["County appraiser", "Plat and deed", "Flood map", "Client's email"];
  return (
    <div className="m-collect">
      {rows.map((r, i) => (
        <div className="m-row" key={r} style={{ "--d": `${0.35 + i * 0.55}s` } as React.CSSProperties}>
          <span className="m-ico">{r[0]}</span>
          <span className="m-lbl">{r}</span>
          <span className="m-st">
            <span className="pend">Pulling</span>
            <span className="done">Collected</span>
          </span>
        </div>
      ))}
    </div>
  );
}

function MiniRead() {
  return (
    <div className="m-read">
      <div className="m-doc">
        <i style={{ width: "62%" }} />
        <i style={{ width: "88%" }} />
        <i style={{ width: "74%" }} />
        <i style={{ width: "92%" }} />
        <i style={{ width: "56%" }} />
        <span className="m-scan" />
      </div>
      <div className="m-rules">
        <span className="m-rule" style={{ "--d": "0.9s" } as React.CSSProperties}>
          Flood zone AE <b>add elevation cert</b>
        </span>
        <span className="m-rule" style={{ "--d": "1.8s" } as React.CSSProperties}>
          Platted lot <b>boundary rate</b>
        </span>
        <span className="m-rule" style={{ "--d": "2.7s" } as React.CSSProperties}>
          Prior job 0.3 mi <b>noted</b>
        </span>
      </div>
    </div>
  );
}

function MiniPrepare() {
  const lines = ["Boundary survey", "Elevation certificate", "Prior job nearby, noted"];
  return (
    <div className="m-prep">
      <div className="m-quote">
        <div className="m-qh">
          <b>Quote</b>
          <span>Draft</span>
        </div>
        {lines.map((l, i) => (
          <div className="m-line" key={l} style={{ "--d": `${0.4 + i * 0.6}s` } as React.CSSProperties}>
            <span>{l}</span>
            <i />
          </div>
        ))}
        <div className="m-ready" style={{ "--d": "2.4s" } as React.CSSProperties}>
          From your rate sheet
        </div>
      </div>
    </div>
  );
}

/**
 * The page's peak: the one click a person makes. A real button; approving
 * stamps the sample quote, says that's the only click, and offers the
 * review. Reset puts it back. Labelled as a sample.
 */
function MiniDecide({ onUse }: { onUse: () => void }) {
  const [approved, setApproved] = useState(false);
  const approveRef = useRef<HTMLButtonElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const moved = useRef(false);

  useEffect(() => {
    if (!moved.current) return;
    (approved ? ctaRef.current : approveRef.current)?.focus();
  }, [approved]);

  const act = (next: boolean) => (e: React.MouseEvent) => {
    e.stopPropagation();
    moved.current = true;
    onUse();
    setApproved(next);
  };

  return (
    <div className={approved ? "m-decide done" : "m-decide"}>
      <div className="m-card">
        <span className="m-stamp" role="status">
          {approved ? "Approved by you · sent to the client" : "Waiting on you"}
        </span>
        <b className="m-title">
          Quote, 1 address <span className="m-sample">Sample</span>
        </b>
        {approved ? (
          <div className="m-after">
            <p>That&apos;s the only click your team makes.</p>
            <div className="m-actions">
              <Link ref={ctaRef} className="m-cta" href="/review" data-cta="demo-approve" onClick={(e) => e.stopPropagation()}>
                {nav.action.label}
              </Link>
              <button type="button" className="m-reset" onClick={act(false)}>
                Reset
              </button>
            </div>
          </div>
        ) : (
          <button ref={approveRef} type="button" className="m-approve" onClick={act(true)}>
            Approve quote
          </button>
        )}
      </div>
    </div>
  );
}
