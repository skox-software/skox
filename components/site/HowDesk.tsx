"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

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
            <div className="flow-top">
              <span className="who">
                <span className="wdot" /> {part.who}
              </span>
              <span className="n num">{String(i + 1).padStart(2, "0")}/{String(parts.length).padStart(2, "0")}</span>
            </div>
            <h3>{part.title}</h3>
            <p>{part.body}</p>
            <div className="mini" aria-hidden>
              {i === 0 && <MiniCollect />}
              {i === 1 && <MiniRead />}
              {i === 2 && <MiniPrepare />}
              {i === 3 && <MiniDecide />}
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

function MiniDecide() {
  return (
    <div className="m-decide">
      <div className="m-card">
        <span className="m-wait">
          <span className="w1">Waiting on you</span>
          <span className="w2">Approved by you</span>
        </span>
        <b className="m-title">Quote, 1 address</b>
        <span className="m-btn">
          <span className="b1">Approve quote</span>
          <span className="b2">Sent to the client</span>
        </span>
      </div>
      <svg className="m-cursor" viewBox="0 0 20 22" width="20" height="22">
        <path d="M2 1.5 L2 17.5 L6.4 13.6 L9.3 20 L12.1 18.8 L9.3 12.6 L15 12.4 Z" fill="#FAFAF8" stroke="#15181D" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
