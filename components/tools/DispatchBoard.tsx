"use client";
import { useMemo, useState } from "react";
import s from "./DispatchBoard.module.css";

/* Tool 02 · Plumbing. A dispatch board: drag a job onto a tech and the day
   re-plans itself, drive time included. Every name and job is invented. */

type Kind = "repair" | "drain" | "install" | "emergency";
type Job = { id: string; customer: string; what: string; kind: Kind; mins: number; zone: number; skill: string };
type Tech = { id: string; name: string; role: string; skills: string[] };

const TECHS: Tech[] = [
  { id: "luis", name: "Luis M.", role: "Master plumber", skills: ["repair", "install", "gas"] },
  { id: "kayla", name: "Kayla P.", role: "Journeyman", skills: ["repair", "install"] },
  { id: "dev", name: "Dev S.", role: "Drain specialist", skills: ["drain", "repair"] },
  { id: "ruth", name: "Ruth A.", role: "Apprentice", skills: ["repair"] },
];
const ZONES = ["Shop", "North", "Central", "Lakes", "South"];

const J = (id: string, customer: string, what: string, kind: Kind, mins: number, zone: number, skill: string): Job => ({ id, customer, what, kind, mins, zone, skill });
const START: Record<string, Job[]> = {
  luis: [J("a1", "Harlow", "Water heater swap", "install", 180, 2, "install"), J("a2", "Pine St Deli", "Grease trap check", "repair", 60, 2, "repair")],
  kayla: [J("b1", "Okafor", "Leaking shut-off", "repair", 60, 1, "repair"), J("b2", "Brennan", "Toilet rebuild", "repair", 90, 1, "repair")],
  dev: [J("c1", "Maple Court HOA", "Main line jetting", "drain", 150, 3, "drain")],
  ruth: [J("d1", "Castillo", "Faucet replace", "repair", 60, 4, "repair")],
};
const QUEUE: Job[] = [
  J("q1", "Nguyen", "Burst pipe, water on floor", "emergency", 90, 2, "repair"),
  J("q2", "Sato", "Slow kitchen drain", "drain", 60, 3, "drain"),
  J("q3", "Fairview Dental", "Tankless install", "install", 240, 1, "install"),
  J("q4", "Romero", "Running toilet", "repair", 45, 4, "repair"),
  J("q5", "Whitaker", "Sump pump test", "repair", 60, 3, "repair"),
];

const DAY_START = 7 * 60;
const DAY_END = 17 * 60;
const DAY = DAY_END - DAY_START;
const drive = (a: number, b: number) => 10 + 8 * Math.abs(a - b);
const clock = (m: number) => {
  const h = Math.floor(m / 60);
  const mm = String(m % 60).padStart(2, "0");
  return `${((h + 11) % 12) + 1}:${mm}${h < 12 ? "a" : "p"}`;
};

/** Lay a tech's jobs out in order, adding drive time from the previous stop. */
function plan(jobs: Job[]) {
  let t = DAY_START;
  let zone = 0;
  return jobs.map((job) => {
    const d = drive(zone, job.zone);
    const start = t + d;
    t = start + job.mins;
    zone = job.zone;
    return { job, start, end: t, drive: d };
  });
}

export function DispatchBoard() {
  const [lanes, setLanes] = useState(START);
  const [queue, setQueue] = useState(QUEUE);
  const [picked, setPicked] = useState<string | null>(null);
  const [over, setOver] = useState<string | null>(null);
  const [toast, setToast] = useState("Drag a job onto a tech, or tap a job then tap a tech.");

  const plans = useMemo(() => Object.fromEntries(TECHS.map((t) => [t.id, plan(lanes[t.id])])), [lanes]);

  function assign(jobId: string, techId: string) {
    const job = queue.find((j) => j.id === jobId);
    const tech = TECHS.find((t) => t.id === techId)!;
    if (!job) return;
    setQueue((q) => q.filter((j) => j.id !== jobId));
    setLanes((l) => {
      const list = [...l[techId]];
      // Emergencies jump the line: they go first, everything else to the end.
      if (job.kind === "emergency") list.unshift(job);
      else list.push(job);
      return { ...l, [techId]: list };
    });
    setPicked(null);
    const skillOk = tech.skills.includes(job.skill);
    setToast(skillOk ? `${job.customer} → ${tech.name} (day re-planned, drive time added)` : `Heads up: ${tech.name} isn't marked for ${job.skill} work`);
  }

  function unassign(techId: string, jobId: string) {
    const job = lanes[techId].find((j) => j.id === jobId)!;
    setLanes((l) => ({ ...l, [techId]: l[techId].filter((j) => j.id !== jobId) }));
    setQueue((q) => [...q, job]);
    setToast(`${job.customer} back in the queue.`);
  }

  function autoAssign() {
    let l = { ...lanes };
    const sorted = [...queue].sort((a, b) => (a.kind === "emergency" ? -1 : 0) - (b.kind === "emergency" ? -1 : 0));
    for (const job of sorted) {
      const fits = TECHS.filter((t) => t.skills.includes(job.skill));
      const pool = fits.length ? fits : TECHS;
      const best = pool.reduce((a, b) => (plan(l[a.id]).at(-1)?.end ?? DAY_START) <= (plan(l[b.id]).at(-1)?.end ?? DAY_START) ? a : b);
      l = { ...l, [best.id]: job.kind === "emergency" ? [job, ...l[best.id]] : [...l[best.id], job] };
    }
    setLanes(l);
    setQueue([]);
    setToast("Auto-assigned by skill and lightest day. Emergencies went first.");
  }

  function reset() {
    setLanes(START);
    setQueue(QUEUE);
    setPicked(null);
    setToast("Board reset.");
  }

  const total = Object.values(lanes).reduce((a, l) => a + l.length, 0);
  const overtime = TECHS.filter((t) => (plans[t.id].at(-1)?.end ?? 0) > DAY_END).length;

  return (
    <div className={s.root}>
      <header className={s.top}>
        <div className={s.brand}>
          <span className={s.mark} aria-hidden>
            ◉
          </span>
          Clearflow Plumbing <small>Dispatch</small>
        </div>
        <div className={s.stats}>
          <span>
            <b>Tue Oct 6</b>
          </span>
          <span>
            <b>{total}</b> scheduled
          </span>
          <span className={queue.length ? s.warnText : ""}>
            <b>{queue.length}</b> waiting
          </span>
          <span className={overtime ? s.warnText : ""}>
            <b>{overtime}</b> into overtime
          </span>
        </div>
        <div className={s.actions}>
          <button onClick={reset} className={s.ghost}>
            Reset
          </button>
          <button onClick={autoAssign} disabled={!queue.length} className={s.primary}>
            Auto-assign
          </button>
        </div>
      </header>

      <div className={s.body}>
        <aside className={s.queue} aria-label="Unassigned jobs">
          <h4>
            Waiting <span>{queue.length}</span>
          </h4>
          {queue.length === 0 && <p className={s.empty}>All jobs assigned. Tap a job on the board to send it back.</p>}
          <ul>
            {queue.map((job) => (
              <li key={job.id}>
                <button
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData("text/plain", job.id);
                    setPicked(job.id);
                  }}
                  onDragEnd={() => setOver(null)}
                  onClick={() => setPicked(picked === job.id ? null : job.id)}
                  aria-pressed={picked === job.id}
                  className={`${s.card} ${s[job.kind]}`}
                >
                  <span className={s.cardTop}>
                    <b>{job.customer}</b>
                    <em>{job.mins} min</em>
                  </span>
                  <span>{job.what}</span>
                  <span className={s.tags}>
                    <i>{ZONES[job.zone]}</i>
                    <i>{job.skill}</i>
                    {job.kind === "emergency" && <i className={s.urgent}>Emergency</i>}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <section className={s.board} aria-label="Today's schedule">
          <div className={s.hours} aria-hidden>
            <span />
            {Array.from({ length: 11 }, (_, k) => (
              <span key={k}>{clock(DAY_START + k * 60)}</span>
            ))}
          </div>
          {TECHS.map((tech) => {
            const p = plans[tech.id];
            const end = p.at(-1)?.end ?? DAY_START;
            const load = Math.min(1, (end - DAY_START) / DAY);
            return (
              <div
                key={tech.id}
                className={`${s.lane} ${over === tech.id ? s.over : ""} ${picked ? s.armed : ""}`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setOver(tech.id);
                }}
                onDragLeave={() => setOver(null)}
                onDrop={(e) => {
                  e.preventDefault();
                  setOver(null);
                  assign(e.dataTransfer.getData("text/plain"), tech.id);
                }}
              >
                <button className={s.who} onClick={() => picked && assign(picked, tech.id)} disabled={!picked} aria-label={picked ? `Assign selected job to ${tech.name}` : tech.name}>
                  <b>{tech.name}</b>
                  <small>{tech.role}</small>
                  <span className={s.loadbar}>
                    <i style={{ width: `${load * 100}%` }} className={end > DAY_END ? s.loadOver : ""} />
                  </span>
                  <small className={s.until}>{p.length ? `Free from ${clock(end)}` : "Free all day"}</small>
                </button>
                <div className={s.track}>
                  {p.map(({ job, start, end: jEnd, drive: d }) => (
                    <span key={job.id}>
                      <span
                        className={s.drive}
                        style={{ left: `${Math.min(100, ((start - d - DAY_START) / DAY) * 100)}%`, width: `${Math.max(0, Math.min(DAY_END, start) - (start - d)) / DAY * 100}%` }}
                        title={`${d} min drive`}
                      />
                      <button
                        className={`${s.block} ${s[job.kind]} ${jEnd > DAY_END ? s.late : ""}`}
                        style={{
                          left: `${Math.min(97, ((start - DAY_START) / DAY) * 100)}%`,
                          width: `${Math.max(3, ((Math.min(jEnd, DAY_END) - start) / DAY) * 100)}%`,
                        }}
                        onClick={() => unassign(tech.id, job.id)}
                        title={`${clock(start)}–${clock(jEnd)} · ${job.what} · tap to unassign`}
                      >
                        <b>{job.customer}</b>
                        <small>
                          {clock(start)} · {job.what}
                        </small>
                      </button>
                    </span>
                  ))}
                  <span className={s.endline} aria-hidden />
                </div>
              </div>
            );
          })}
          <p className={s.toast} role="status">
            {toast}
          </p>
        </section>
      </div>
    </div>
  );
}
