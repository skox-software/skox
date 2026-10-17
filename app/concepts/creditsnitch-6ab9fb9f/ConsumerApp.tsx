"use client";

import { useEffect, useRef, useState } from "react";
import {
  Arrow, Check, Flag, Gauge, Home, Layers, List, Play, Shield, Spark, Trend,
} from "./icons";
import { DISPUTE_REASONS, MILESTONES, TIMELINE, TRADELINES } from "./data";
import {
  blockers, buildProfile, GOAL_ORDER, GOALS, lessons, plan, readiness, scoreGroups,
  STAGES, utilization, type ActionId, type GoalId,
} from "./engine";

export type Screen =
  | "onboarding" | "connect" | "home" | "blockers"
  | "plan" | "scores" | "accounts" | "progress" | "learn";

type Props = {
  goal: GoalId;
  setGoal: (g: GoalId) => void;
  done: ActionId[];
  toggle: (a: ActionId) => void;
  screen: Screen;
  setScreen: (s: Screen) => void;
};

const money = (n: number) => `$${n.toLocaleString()}`;

export default function ConsumerApp(props: Props) {
  const { goal, done, screen, setScreen } = props;
  const profile = buildProfile(done);
  const r = readiness(profile, goal);
  const scroller = useRef<HTMLDivElement>(null);

  // Each screen starts at the top, the way a real app would.
  useEffect(() => { scroller.current?.scrollTo({ top: 0 }); }, [screen]);

  const chromeless = screen === "onboarding" || screen === "connect";

  return (
    <div className="cs-phone" role="group" aria-label="CreditSnitch consumer app mockup">
      <div className="cs-phone-bezel">
        <div className="cs-phone-screen">
          {!chromeless && <StatusBar />}
          <div className="cs-scroll" ref={scroller}>
            {screen === "onboarding" && <Onboarding {...props} />}
            {screen === "connect" && <Connect {...props} />}
            {screen === "home" && <HomeScreen {...props} />}
            {screen === "blockers" && <Blockers {...props} />}
            {screen === "plan" && <Plan {...props} />}
            {screen === "scores" && <Scores {...props} />}
            {screen === "accounts" && <Accounts {...props} />}
            {screen === "progress" && <Progress {...props} />}
            {screen === "learn" && <Learn {...props} />}
          </div>
          {!chromeless && <TabBar screen={screen} setScreen={setScreen} stage={r.stage} />}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- app chrome */

function StatusBar() {
  return (
    <div className="cs-status" aria-hidden>
      <span>9:41</span>
      <span className="cs-status-right">
        <span className="cs-sig" /><span className="cs-batt" />
      </span>
    </div>
  );
}

const TABS: { id: Screen; label: string; Icon: (p: { size?: number }) => React.ReactElement }[] = [
  { id: "home", label: "Home", Icon: Home },
  { id: "plan", label: "My Plan", Icon: List },
  { id: "scores", label: "Scores", Icon: Gauge },
  { id: "progress", label: "Progress", Icon: Trend },
  { id: "learn", label: "Learn", Icon: Play },
];

function TabBar({ screen, setScreen, stage }: { screen: Screen; setScreen: (s: Screen) => void; stage: string }) {
  const active = screen === "blockers" ? "home" : screen === "accounts" ? "scores" : screen;
  return (
    <nav className="cs-tabs" aria-label="App sections">
      {TABS.map(({ id, label, Icon }) => (
        <button
          key={id}
          type="button"
          className={`cs-tab${active === id ? " is-on" : ""}`}
          aria-current={active === id ? "page" : undefined}
          onClick={() => setScreen(id)}
        >
          <Icon size={21} />
          <span>{label}</span>
        </button>
      ))}
      <span className="sr-only" aria-live="polite">Readiness stage: {stage}</span>
    </nav>
  );
}

function Head({ eyebrow, title, sub }: { eyebrow?: string; title: string; sub?: string }) {
  return (
    <header className="cs-head">
      {eyebrow && <p className="cs-eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {sub && <p className="cs-sub">{sub}</p>}
    </header>
  );
}

/** The line the doc insists appears anywhere Readiness does. */
function ReadinessDisclaimer() {
  return (
    <p className="cs-legal">
      Readiness is a CreditSnitch planning tool. It is never a credit score, a lender
      decision or a guarantee of approval.
    </p>
  );
}

/* ---------------------------------------------------------- 4.1 onboarding */

function Onboarding({ goal, setGoal, setScreen }: Props) {
  return (
    <div className="cs-pad cs-onboard">
      <div className="cs-brand-mark">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/concepts/creditsnitch/logo.png" alt="CreditSnitch" width={168} height={84} />
      </div>
      <Head
        eyebrow="Step 1 of 2"
        title="What are you trying to accomplish?"
        sub="Your answer shapes everything that follows: which scores we emphasize, how Readiness is calculated, what your plan prioritizes and which lessons we recommend."
      />
      <div className="cs-goals">
        {GOAL_ORDER.map((id) => (
          <button
            key={id}
            type="button"
            className={`cs-goal${goal === id ? " is-on" : ""}`}
            onClick={() => setGoal(id)}
            aria-pressed={goal === id}
          >
            {GOALS[id].label}
          </button>
        ))}
      </div>
      <button type="button" className="cs-cta" onClick={() => setScreen("connect")}>
        Continue <Arrow size={18} />
      </button>
      <p className="cs-legal">You can change your goal at any time, and the whole app re-evaluates.</p>
    </div>
  );
}

/* ------------------------------------------------- 4.2 secure connection */

function Connect({ setScreen }: Props) {
  const [step, setStep] = useState(0);
  const running = step > 0 && step < 3;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setStep((s) => s + 1), 900);
    return () => clearTimeout(t);
  }, [step, running]);

  const steps = [
    "Verify your identity",
    "Authorize credit access",
    "Your CreditSnitch profile is ready",
  ];

  return (
    <div className="cs-pad cs-connect">
      <Head eyebrow="Step 2 of 2" title="Connect My Credit" />
      <p className="cs-sub">
        Complete a quick identity check with our credit data partner. CreditSnitch
        receives your authorized credit data, never your Social Security number.
      </p>

      <ol className="cs-steps">
        {steps.map((label, i) => (
          <li key={label} className={step > i ? "is-done" : step === i && running ? "is-live" : ""}>
            <span>{label}</span>
            {step > i ? <Check size={18} /> : <em>{i === 2 ? "Next" : "Waiting"}</em>}
          </li>
        ))}
      </ol>

      <div className="cs-trust">
        <Shield size={18} />
        <div>
          <strong>CreditSnitch is not an SSN database.</strong>
          <p>
            A specialized credit data provider handles identity verification and any
            Social Security number collection. The flow stays native to CreditSnitch,
            so you are never handed off to another company.
          </p>
        </div>
      </div>

      {step === 0 && (
        <button type="button" className="cs-cta" onClick={() => setStep(1)}>
          Connect My Credit
        </button>
      )}
      {running && <button type="button" className="cs-cta is-busy" disabled>Connecting…</button>}
      {step >= 3 && (
        <button type="button" className="cs-cta" onClick={() => setScreen("home")}>
          See my results <Arrow size={18} />
        </button>
      )}
    </div>
  );
}

/* --------------------------------------------------------------- 4.5 home */

function StageRail({ index }: { index: number }) {
  return (
    <div className="cs-rail" role="img" aria-label={`Stage ${index + 1} of 4: ${STAGES[index]}`}>
      {STAGES.map((s, i) => (
        <div key={s} className={`cs-rail-step${i < index ? " is-past" : ""}${i === index ? " is-now" : ""}`}>
          <span className="cs-rail-bar" />
          <span className="cs-rail-label">{s}</span>
        </div>
      ))}
    </div>
  );
}

function HomeScreen(props: Props) {
  const { goal, setGoal, done, screen, setScreen } = props;
  const [switching, setSwitching] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);
  const profile = buildProfile(done);
  const r = readiness(profile, goal);
  const was = readiness(buildProfile([]), goal);
  const top = blockers(profile, goal).slice(0, 3);
  const next = plan(profile, goal)[0];

  // Derived, not decorative: the line only claims a move when one happened.
  const stageNote =
    done.length === 0
      ? `${GOALS[goal].short} · measured from your connected report`
      : r.stage !== was.stage
        ? `Moved up from ${was.stage} this month`
        : "No stage change yet — keep going";

  function pick(g: GoalId) {
    setGoal(g);
    setSwitching(false);
    setFlash(GOALS[g].label);
  }
  useEffect(() => {
    if (!flash) return;
    const t = setTimeout(() => setFlash(null), 3200);
    return () => clearTimeout(t);
  }, [flash]);

  return (
    <div className="cs-pad">
      <div className="cs-goalbar">
        <div>
          <p className="cs-eyebrow">Your goal</p>
          <strong>{GOALS[goal].label}</strong>
        </div>
        <button type="button" className="cs-ghost" onClick={() => setSwitching((s) => !s)}>
          {switching ? "Cancel" : "Change"}
        </button>
      </div>

      {switching && (
        <div className="cs-goals cs-goals-inline">
          {GOAL_ORDER.map((id) => (
            <button key={id} type="button" className={`cs-goal${goal === id ? " is-on" : ""}`} onClick={() => pick(id)}>
              {GOALS[id].label}
            </button>
          ))}
        </div>
      )}

      {flash && (
        <p className="cs-flash" role="status">
          <Spark size={16} /> Re-evaluated for {flash}. Your stage, blockers, plan and
          lessons all changed with it.
        </p>
      )}

      <section className="cs-card cs-stage">
        <p className="cs-eyebrow">Your Readiness stage</p>
        <h2>{r.stage}</h2>
        <p className="cs-stage-note">{stageNote}</p>
        <StageRail index={r.stageIndex} />
        <div className="cs-within">
          <div className="cs-within-bar"><span style={{ width: `${Math.max(4, r.withinStage)}%` }} /></div>
          <span>Progress within {r.stage}</span>
        </div>
        <ReadinessDisclaimer />
      </section>

      {next && (
        <section className="cs-card cs-next">
          <p className="cs-eyebrow">Do this next</p>
          <h3>{next.title}</h3>
          <p className="cs-kv"><span>{next.from}</span><Arrow size={15} /><span>{next.to}</span></p>
          <button type="button" className="cs-cta cs-cta-sm" onClick={() => setScreen("plan")}>
            Open My Plan
          </button>
        </section>
      )}

      <section className="cs-card">
        <div className="cs-card-head">
          <h3>Here&rsquo;s what&rsquo;s holding you back</h3>
          <button type="button" className="cs-ghost" onClick={() => setScreen("blockers")}>See all</button>
        </div>
        {top.length === 0 ? (
          <p className="cs-sub">Nothing is standing between you and {GOALS[goal].label.toLowerCase()}. Keep it steady.</p>
        ) : (
          <ol className="cs-blockers">
            {top.map((b, i) => (
              <li key={b.id}>
                <span className="cs-rank">{i + 1}</span>
                <div>
                  <strong>{b.label}</strong>
                  <p>{b.detail}</p>
                </div>
                <span className={`cs-sev cs-sev-${b.severity.toLowerCase()}`}>{b.severity}</span>
              </li>
            ))}
          </ol>
        )}
      </section>

      <WhiteGlove screen={screen} setScreen={setScreen} />
    </div>
  );
}

function WhiteGlove({ setScreen }: { screen: Screen; setScreen: (s: Screen) => void }) {
  return (
    <section className="cs-card cs-glove">
      <p className="cs-eyebrow">Upgrade</p>
      <h3>Work with a credit strategist</h3>
      <p className="cs-sub">
        Your profile and timeline say you&rsquo;d get real value from a person. A strategist
        works from this same plan, so you never start a call from scratch.
      </p>
      <ul className="cs-ticks">
        <li><Check size={15} /> An assigned credit strategist</li>
        <li><Check size={15} /> Booked calls and messaging in the app</li>
        <li><Check size={15} /> A plan the strategist can adjust</li>
      </ul>
      <button type="button" className="cs-cta cs-cta-sm" onClick={() => setScreen("plan")}>
        See what&rsquo;s included
      </button>
    </section>
  );
}

/* ----------------------------------------------------------- 4.6 blockers */

function Blockers({ goal, done, setScreen }: Props) {
  const profile = buildProfile(done);
  const list = blockers(profile, goal);
  return (
    <div className="cs-pad">
      <Head
        eyebrow={GOALS[goal].label}
        title="Here's what's holding you back"
        sub="Ranked by how much each one is costing you against this goal. Change your goal and this list re-orders."
      />
      {list.length === 0 ? (
        <p className="cs-sub">No blockers left against this goal.</p>
      ) : (
        <ol className="cs-blockers cs-blockers-full">
          {list.map((b, i) => (
            <li key={b.id}>
              <span className="cs-rank">{i + 1}</span>
              <div>
                <strong>{b.label}</strong>
                <p>{b.detail}</p>
                <span className="cs-impact">Impact on this goal: {b.impact}</span>
              </div>
              <span className={`cs-sev cs-sev-${b.severity.toLowerCase()}`}>{b.severity}</span>
            </li>
          ))}
        </ol>
      )}
      <button type="button" className="cs-cta" onClick={() => setScreen("plan")}>
        Turn this into my plan <Arrow size={18} />
      </button>
    </div>
  );
}

/* --------------------------------------------------------------- 4.6 plan */

function Plan({ goal, done, toggle }: Props) {
  const profile = buildProfile(done);
  const items = plan(profile, goal);
  const r = readiness(profile, goal);
  const [open, setOpen] = useState<string | null>(items[0]?.title ?? null);

  return (
    <div className="cs-pad">
      <Head
        eyebrow={`${GOALS[goal].label} · ${r.stage}`}
        title="My Plan"
        sub="Every blocker above becomes exactly one action here, in priority order. Tick one to watch your Readiness move."
      />
      <ol className="cs-plan">
        {items.map((it, i) => {
          const isDone = it.actionId ? done.includes(it.actionId) : false;
          const isOpen = open === it.title;
          return (
            <li key={it.title} className={isDone ? "is-done" : ""}>
              <div className="cs-plan-row">
                <button
                  type="button"
                  className={`cs-check${isDone ? " is-on" : ""}${it.actionId ? "" : " is-locked"}`}
                  onClick={() => it.actionId && toggle(it.actionId)}
                  disabled={!it.actionId}
                  aria-label={isDone ? `Mark ${it.title} not done` : `Mark ${it.title} done`}
                >
                  {isDone && <Check size={14} />}
                </button>
                <button type="button" className="cs-plan-main" onClick={() => setOpen(isOpen ? null : it.title)} aria-expanded={isOpen}>
                  <span className="cs-p">P{i + 1}</span>
                  <span className="cs-plan-title">{it.title}</span>
                  <span className="cs-kv"><span>{it.from}</span><Arrow size={14} /><span>{it.to}</span></span>
                </button>
                <span className="cs-timing">{it.timing}</span>
              </div>
              {isOpen && (
                <div className="cs-plan-body">
                  <p><strong>Why it matters.</strong> {it.why}</p>
                  <p><strong>How to handle it.</strong> {it.how}</p>
                </div>
              )}
            </li>
          );
        })}
      </ol>
      {items.length === 0 && <p className="cs-sub">Your plan is clear. We will re-evaluate at your next refresh.</p>}
      <ReadinessDisclaimer />
    </div>
  );
}

/* ------------------------------------------------------------- 4.4 scores */

function Scores({ goal, done, setScreen }: Props) {
  const profile = buildProfile(done);
  const groups = scoreGroups(profile);
  const primary = GOALS[goal].scoreGroup;
  const ordered = [...groups].sort((a, b) => (a.name === primary ? -1 : b.name === primary ? 1 : 0));

  return (
    <div className="cs-pad">
      <Head
        title="My Scores"
        sub="There is no single credit score. We group them by what they are used for, and put your goal's group first."
      />
      {ordered.map((g) => (
        <section key={g.name} className={`cs-card cs-scoregroup${g.name === primary ? " is-primary" : ""}`}>
          <div className="cs-card-head">
            <h3>{g.name}</h3>
            {g.name === primary && <span className="cs-pill">Your goal</span>}
          </div>
          <ul className="cs-scores">
            {g.scores.map((s) => (
              <li key={`${s.model}-${s.bureau}`}>
                <div><strong>{s.model}</strong><span>{s.bureau}</span></div>
                <b>{s.value}</b>
              </li>
            ))}
          </ul>
          <p className="cs-legal">{g.note}</p>
        </section>
      ))}
      <p className="cs-legal">
        The score inventory depends on the data provider and our licensing, so the platform
        supports any licensed score instead of hardcoding one or two. VantageScore access
        comes at the base level, with expanded FICO access as a paid upgrade.
      </p>
      <button type="button" className="cs-cta" onClick={() => setScreen("accounts")}>
        See my full report <Arrow size={18} />
      </button>
    </div>
  );
}

/* --------------------------------------------- 4.3 / 4.8 report + disputes */

function Accounts({ done, setScreen }: Props) {
  const [open, setOpen] = useState<string | null>(null);
  const [dispute, setDispute] = useState<string | null>(null);
  const [filed, setFiled] = useState<string | null>(null);

  const account = TRADELINES.find((t) => t.id === open);
  const fixed = (t: typeof TRADELINES[number]) => Boolean(t.fixedBy && done.includes(t.fixedBy));
  const bal = (t: typeof TRADELINES[number]) => (fixed(t) && t.fixedBalance !== undefined ? t.fixedBalance : t.balance);

  if (account) {
    const isFixed = fixed(account);
    const b = bal(account);
    const util = account.limit ? Math.round((b / account.limit) * 100) : null;
    return (
      <div className="cs-pad">
        <button type="button" className="cs-back" onClick={() => { setOpen(null); setDispute(null); }}>
          ← All accounts
        </button>
        <Head eyebrow={account.kind} title={account.name} sub={`Opened ${account.opened}`} />

        {isFixed && account.id === "abc" ? (
          <p className="cs-resolved"><Check size={16} /> Resolved and removed from your report.</p>
        ) : (
          <dl className="cs-detail">
            <div><dt>Balance</dt><dd>{money(b)}</dd></div>
            {account.limit && <div><dt>Limit</dt><dd>{money(account.limit)}</dd></div>}
            {util !== null && (
              <div>
                <dt>Utilization</dt>
                <dd className={util > 30 ? "is-bad" : "is-good"}>
                  {util}% <span>{util > 30 ? "Needs attention" : "Healthy"}</span>
                </dd>
              </div>
            )}
            {account.kind !== "Collection" && (
              <div>
                <dt>Payment history</dt>
                <dd>{account.onTime} on time{account.late && !(account.fixedBy === "payment" && isFixed) ? `, ${account.late} late` : ""}</dd>
              </div>
            )}
          </dl>
        )}

        <section className="cs-says">
          <p className="cs-eyebrow">CreditSnitch says</p>
          <p>{isFixed && account.saysAfter ? account.saysAfter : account.says}</p>
        </section>

        {!dispute && !filed && (
          <button type="button" className="cs-ghost cs-ghost-block" onClick={() => setDispute(account.id)}>
            <Flag size={15} /> Something wrong with this account?
          </button>
        )}

        {dispute === account.id && !filed && (
          <section className="cs-card cs-dispute">
            <h3>What&rsquo;s wrong?</h3>
            <div className="cs-reasons">
              {DISPUTE_REASONS.map((reason) => (
                <button key={reason} type="button" onClick={() => setFiled(reason)}>{reason}</button>
              ))}
            </div>
            <p className="cs-legal">
              Disputes surface only where your profile supports them, never as a blanket
              upsell. Pricing and delivery of the dispute letter product need legal review
              before launch.
            </p>
          </section>
        )}

        {filed && (
          <section className="cs-card cs-dispute">
            <p className="cs-resolved"><Check size={16} /> Noted: &ldquo;{filed}&rdquo;</p>
            <p className="cs-sub">
              We&rsquo;ll walk you through the dispute letter for {account.name}, confirm what
              the bureaus actually received and track the response window for you.
            </p>
            <button type="button" className="cs-ghost" onClick={() => { setFiled(null); setDispute(null); }}>
              Start over
            </button>
          </section>
        )}
      </div>
    );
  }

  return (
    <div className="cs-pad">
      <button type="button" className="cs-back" onClick={() => setScreen("scores")}>← Scores</button>
      <Head
        title="Your full report, translated"
        sub="Every account on your report, rewritten for normal people. The raw report is always one tap away."
      />
      <ul className="cs-accounts">
        {TRADELINES.map((t) => {
          const b = bal(t);
          const u = t.limit ? Math.round((b / t.limit) * 100) : null;
          const resolved = t.id === "abc" && fixed(t);
          return (
            <li key={t.id}>
              <button type="button" onClick={() => setOpen(t.id)}>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.kind}</span>
                </div>
                <div className="cs-acct-right">
                  {resolved ? <em className="is-good">Resolved</em> : <b>{money(b)}</b>}
                  {u !== null && !resolved && <em className={u > 30 ? "is-bad" : "is-good"}>{u}%</em>}
                </div>
              </button>
            </li>
          );
        })}
      </ul>
      <button type="button" className="cs-ghost cs-ghost-block"><Layers size={15} /> View the raw credit report</button>
    </div>
  );
}

/* ----------------------------------------------------------- 4.9 progress */

function Progress({ goal, done }: Props) {
  const base = buildProfile([]);
  const now = buildProfile(done);
  const rBase = readiness(base, goal);
  const rNow = readiness(now, goal);
  const changed = done.length > 0;

  const rows = [
    { label: "Utilization", from: `${utilization(base)}%`, to: `${utilization(now)}%`, moved: utilization(base) !== utilization(now) },
    { label: "Revolving debt", from: money(base.revolvingBalance), to: money(now.revolvingBalance), moved: base.revolvingBalance !== now.revolvingBalance },
    { label: "Collection", from: "1 open", to: now.openCollections ? "1 open" : "Resolved", moved: now.openCollections === 0 },
    { label: "Readiness", from: rBase.stage, to: rNow.stage, moved: rBase.stage !== rNow.stage },
  ];

  return (
    <div className="cs-pad">
      <Head title="Since you connected" sub="Every refresh is compared with the snapshot before it." />
      {!changed && (
        <p className="cs-sub cs-empty">
          Nothing has changed yet. Complete an action in My Plan and this page fills in.
        </p>
      )}
      <ul className="cs-deltas">
        {rows.map((row) => (
          <li key={row.label} className={row.moved ? "is-moved" : ""}>
            <span>{row.label}</span>
            <b>{row.from} <Arrow size={14} /> {row.to}</b>
          </li>
        ))}
      </ul>

      {changed && (
        <section className="cs-says">
          <p className="cs-eyebrow">CreditSnitch says</p>
          <p>
            {done.includes("utilization")
              ? "Paying down revolving balances was your biggest positive change this month."
              : "Clearing the items on your plan is what moved your stage."}
          </p>
        </section>
      )}

      <section className="cs-card">
        <h3>Your journey</h3>
        <ol className="cs-timeline">
          {TIMELINE.map((t) => {
            const on = t.done || (t.needs ? done.includes(t.needs) : false);
            return (
              <li key={t.label} className={on ? "is-on" : ""}>
                <span className="cs-dot" />
                <span className="cs-date">{t.date}</span>
                <span>{t.label}</span>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="cs-card">
        <div className="cs-card-head">
          <h3>Milestones</h3>
          <span className="cs-pill">{MILESTONES.filter((m) => done.includes(m.needs)).length} of {MILESTONES.length}</span>
        </div>
        <ul className="cs-ticks cs-milestones">
          {MILESTONES.map((m) => (
            <li key={m.label} className={done.includes(m.needs) ? "is-on" : ""}>
              <Check size={15} /> {m.label}
            </li>
          ))}
        </ul>
      </section>
      <ReadinessDisclaimer />
    </div>
  );
}

/* ---------------------------------------------------------- 4.7 education */

function Learn({ goal, done }: Props) {
  const list = lessons(buildProfile(done), goal);
  return (
    <div className="cs-pad">
      <Head
        title="Recommended for you"
        sub="Not a library you have to search. These are picked from your actual blockers and your goal."
      />
      <ul className="cs-lessons">
        {list.map((l) => (
          <li key={l.title}>
            <span className="cs-thumb"><Play size={20} /></span>
            <div>
              <strong>{l.title}</strong>
              <span className="cs-because">{l.because}</span>
            </div>
            <em>{l.length}</em>
          </li>
        ))}
      </ul>
      {list.length === 0 && <p className="cs-sub">Nothing urgent to learn right now.</p>}
      <p className="cs-legal">
        Drawn from CreditSnitch&rsquo;s existing video library. Premium education sits behind
        the subscription.
      </p>
    </div>
  );
}
