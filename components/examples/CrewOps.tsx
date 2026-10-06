"use client";
import { useEffect, useState } from "react";
import { arc } from "./charts";

/* Concept 01 · HVAC. Light and warm: crews, hours and hiring for an HVAC company with several branches.
   Every name and number is invented. */

const NAV = ["Overview", "Crews", "Jobs", "Hiring", "Fleet", "Payroll", "Reviews"];
const HOURS = [
  { d: "Mon", h: 7.5 },
  { d: "Tue", h: 8.25 },
  { d: "Wed", h: 6.5 },
  { d: "Thu", h: 8.75 },
  { d: "Fri", h: 9.5 },
  { d: "Sat", h: 4 },
  { d: "Sun", h: 0 },
];
const CHECKLIST = [
  { t: "Safety induction", when: "Mon 7:30 am", done: true },
  { t: "Van & tool check", when: "Mon 9:00 am", done: true },
  { t: "Ride-along with lead tech", when: "Tue 8:00 am", done: false },
  { t: "Job software training", when: "Wed 1:00 pm", done: false },
  { t: "First solo job review", when: "Fri 3:30 pm", done: false },
  { t: "30-day check-in", when: "Oct 30", done: false },
];

export function CrewOps() {
  const [day, setDay] = useState(4);
  const [running, setRunning] = useState(false);
  const [secs, setSecs] = useState(2 * 3600 + 35 * 60);
  const [list, setList] = useState(CHECKLIST);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const hh = String(Math.floor(secs / 3600)).padStart(2, "0");
  const mm = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");
  const ringEnd = Math.min(359.9, ((secs % 3600) / 3600) * 360 + 200);
  const done = list.filter((i) => i.done).length;
  const total = HOURS.reduce((a, b) => a + b.h, 0);

  return (
    <div className="dx dx-crew">
      <header className="crew-top">
        <span className="crew-brand">Brightline <small>Heating &amp; Air</small></span>
        <nav aria-label="Concept navigation">
          {NAV.map((n, i) => (
            <span key={n} className={i === 0 ? "is-on" : ""}>
              {n}
            </span>
          ))}
        </nav>
        <span className="crew-icons" aria-hidden>
          <i>⚙</i>
          <i>◔</i>
        </span>
      </header>

      <div className="crew-hello">
        <div>
          <h3>Good morning, Northside</h3>
          <div className="crew-chips">
            <div>
              <small>Jobs done</small>
              <span className="chip-dark">64%</span>
            </div>
            <div>
              <small>On time</small>
              <span className="chip-amber">82%</span>
            </div>
            <div className="chip-wide">
              <small>Crew utilisation</small>
              <span className="chip-stripe">
                <b style={{ width: "71%" }}>71%</b>
              </span>
            </div>
            <div>
              <small>Callbacks</small>
              <span className="chip-ghost">6%</span>
            </div>
          </div>
        </div>
        <div className="crew-bignums">
          <div>
            <strong>24</strong>
            <small>Techs</small>
          </div>
          <div>
            <strong>38</strong>
            <small>Open jobs</small>
          </div>
          <div>
            <strong>11</strong>
            <small>Vans out</small>
          </div>
        </div>
      </div>

      <div className="crew-grid">
        <article className="crew-card crew-person">
          <div className="crew-avatar" aria-hidden>
            MT
          </div>
          <div className="crew-person-meta">
            <strong>Marcus T.</strong>
            <small>Lead HVAC tech · Northside</small>
          </div>
          <span className="crew-pill">$4,860 billed</span>
          <span className="crew-badge">Tech of the week</span>
        </article>

        <article className="crew-card">
          <div className="card-head">
            <h4>Hours on the clock</h4>
            <span className="corner">↗</span>
          </div>
          <p className="crew-total">
            {total.toFixed(1)} h <small>this week</small>
          </p>
          <div className="crew-bars" role="list">
            {HOURS.map((h, i) => (
              <button
                key={h.d}
                role="listitem"
                className={i === day ? "is-on" : ""}
                onClick={() => setDay(i)}
                aria-label={`${h.d}: ${h.h} hours`}
              >
                {i === day && <em>{h.h}h</em>}
                <span style={{ height: `${(h.h / 10) * 100}%` }} />
                <small>{h.d[0]}</small>
              </button>
            ))}
          </div>
        </article>

        <article className="crew-card crew-timer">
          <div className="card-head">
            <h4>Job timer</h4>
            <span className="corner">↗</span>
          </div>
          <svg viewBox="0 0 160 160" aria-hidden>
            {Array.from({ length: 60 }, (_, i) => (
              <line
                key={i}
                x1="80"
                y1="10"
                x2="80"
                y2={i % 5 ? 15 : 18}
                transform={`rotate(${i * 6} 80 80)`}
                stroke="#cfc8b4"
                strokeWidth="1"
              />
            ))}
            <path d={arc(80, 80, 58, 200, ringEnd)} stroke="#f2c230" strokeWidth="12" fill="none" strokeLinecap="round" />
            <text x="80" y="82" textAnchor="middle" className="t-big">
              {hh}:{mm}
            </text>
            <text x="80" y="100" textAnchor="middle" className="t-small">
              {ss}s · Job #4182
            </text>
          </svg>
          <div className="crew-timer-ctrl">
            <button onClick={() => setRunning(true)} aria-label="Start timer" className={running ? "is-on" : ""}>
              ▶
            </button>
            <button onClick={() => setRunning(false)} aria-label="Pause timer" className={!running ? "is-on" : ""}>
              ❚❚
            </button>
          </div>
        </article>

        <article className="crew-card crew-onboard">
          <div className="card-head">
            <h4>Onboarding</h4>
            <strong>{Math.round((done / list.length) * 100)}%</strong>
          </div>
          <div className="crew-onboard-bars">
            <div style={{ flex: 3 }}>
              <small>Paperwork</small>
              <span className="b-amber">Done</span>
            </div>
            <div style={{ flex: 2 }}>
              <small>Training</small>
              <span className="b-dark" />
            </div>
            <div style={{ flex: 1 }}>
              <small>Solo</small>
              <span className="b-grey" />
            </div>
          </div>
          <div className="crew-check">
            <div className="crew-check-head">
              <span>New-hire checklist</span>
              <strong>
                {done}/{list.length}
              </strong>
            </div>
            <ul>
              {list.map((item, i) => (
                <li key={item.t}>
                  <button
                    aria-pressed={item.done}
                    onClick={() => setList((l) => l.map((x, j) => (j === i ? { ...x, done: !x.done } : x)))}
                  >
                    <span className={item.done ? "crossed" : ""}>{item.t}</span>
                    <small>{item.when}</small>
                    <i aria-hidden>{item.done ? "✓" : ""}</i>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </article>

        <article className="crew-card crew-side">
          {["Certifications", "Vans & tools", "Overtime summary", "Time-off requests"].map((t, i) => (
            <div key={t} className="crew-acc">
              <span>{t}</span>
              <i aria-hidden>{i === 1 ? "−" : "+"}</i>
              {i === 1 && (
                <div className="crew-acc-body">
                  <b>Van 07 · Cargo van</b>
                  <small>Service due in 840 mi</small>
                </div>
              )}
            </div>
          ))}
        </article>

        <article className="crew-card crew-cal">
          <div className="crew-cal-head">
            <span className="crew-pill-sm">Sep</span>
            <strong>October 2026</strong>
            <span className="crew-pill-sm">Nov</span>
          </div>
          <div className="crew-cal-days">
            {["Mon 5", "Tue 6", "Wed 7", "Thu 8", "Fri 9", "Sat 10"].map((d, i) => (
              <span key={d} className={i === 2 ? "is-on" : ""}>
                {d}
              </span>
            ))}
          </div>
          <div className="crew-cal-body">
            <span className="crew-time" style={{ top: "4%" }}>
              7 am
            </span>
            <span className="crew-time" style={{ top: "38%" }}>
              9 am
            </span>
            <span className="crew-time" style={{ top: "72%" }}>
              11 am
            </span>
            <div className="crew-event dark" style={{ left: "22%", top: "12%", width: "30%" }}>
              <b>Crew huddle</b>
              <small>All Northside techs</small>
            </div>
            <div className="crew-event light" style={{ left: "52%", top: "52%", width: "30%" }}>
              <b>Ride-along: Dana R.</b>
              <small>New hire, week 1</small>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
