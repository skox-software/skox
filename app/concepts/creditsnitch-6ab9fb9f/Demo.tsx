"use client";

import { useState } from "react";
import ConsumerApp, { type Screen } from "./ConsumerApp";
import PartnerPortal from "./PartnerPortal";
import CommandCenter from "./CommandCenter";
import { Arrow, Gauge, Spark, Users } from "./icons";
import {
  blockers, buildProfile, GOAL_ORDER, GOALS, plan, readiness, utilization,
  type ActionId, type GoalId,
} from "./engine";

/**
 * The demo shell.
 *
 * Goal and completed actions live here rather than inside the phone, because
 * the driver's console next to the phone edits the same state. That is the
 * point of the whole page: change one input and watch three surfaces re-derive.
 */

type Surface = "consumer" | "partner" | "command";

const SURFACES: { id: Surface; label: string; who: string }[] = [
  { id: "consumer", label: "The app", who: "Consumers" },
  { id: "partner", label: "Partner portal", who: "Realtors, lenders, dealerships" },
  { id: "command", label: "Command Center", who: "The CreditSnitch team" },
];

const ACTIONS: { id: ActionId; label: string }[] = [
  { id: "utilization", label: "Paid revolving balances down" },
  { id: "collection", label: "Resolved the collection" },
  { id: "payment", label: "Twelve months on time" },
  { id: "inquiries", label: "No new hard inquiries" },
  { id: "debt", label: "Paid down the auto loan" },
];

export default function Demo() {
  const [surface, setSurface] = useState<Surface>("consumer");
  const [goal, setGoalRaw] = useState<GoalId>("home");
  const [done, setDone] = useState<ActionId[]>([]);
  const [screen, setScreen] = useState<Screen>("onboarding");

  const profile = buildProfile(done);
  const r = readiness(profile, goal);
  const top = blockers(profile, goal)[0];
  const first = plan(profile, goal)[0];

  function setGoal(g: GoalId) {
    setGoalRaw(g);
  }
  function toggle(a: ActionId) {
    setDone((d) => (d.includes(a) ? d.filter((x) => x !== a) : [...d, a]));
  }
  function reset() {
    setGoalRaw("home");
    setDone([]);
    setScreen("onboarding");
  }

  return (
    <div className="cs-demo" id="demo">
      <div className="cs-surfacebar" role="tablist" aria-label="Choose a surface">
        {SURFACES.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={surface === s.id}
            className={surface === s.id ? "is-on" : ""}
            onClick={() => setSurface(s.id)}
          >
            <strong>{s.label}</strong>
            <span>{s.who}</span>
          </button>
        ))}
      </div>

      {surface === "consumer" ? (
        <div className="cs-stagewrap">
          <ConsumerApp
            goal={goal}
            setGoal={setGoal}
            done={done}
            toggle={toggle}
            screen={screen}
            setScreen={setScreen}
          />

          <aside className="cs-console" aria-label="Demo controls">
            <div className="cs-console-head">
              <p className="cs-eyebrow"><Spark size={14} /> The engine, exposed</p>
              <h3>Drive the demo</h3>
              <p>
                Everything in the app is derived from two inputs: the goal, and what the
                consumer has actually done. Change either one and every screen
                recalculates. Nothing here is hardcoded per screen.
              </p>
            </div>

            <div className="cs-console-block">
              <label className="cs-console-label" htmlFor="cs-goal">Goal</label>
              <select
                id="cs-goal"
                className="cs-select"
                value={goal}
                onChange={(e) => setGoal(e.target.value as GoalId)}
              >
                {GOAL_ORDER.map((id) => (
                  <option key={id} value={id}>{GOALS[id].label}</option>
                ))}
              </select>
            </div>

            <div className="cs-console-block">
              <span className="cs-console-label">What the consumer has done</span>
              <ul className="cs-switches">
                {ACTIONS.map((a) => (
                  <li key={a.id}>
                    <label>
                      <input type="checkbox" checked={done.includes(a.id)} onChange={() => toggle(a.id)} />
                      <span className="cs-switch" aria-hidden />
                      {a.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="cs-readout">
              <div>
                <span>Readiness stage</span>
                <b>{r.stage}</b>
              </div>
              <div>
                <span>Internal value</span>
                <b>{r.value}<em> / 100</em></b>
              </div>
              <div>
                <span>Utilization</span>
                <b>{utilization(profile)}%</b>
              </div>
              <div>
                <span>Top blocker</span>
                <b>{top ? top.label : "None"}</b>
              </div>
              <div className="cs-readout-wide">
                <span>First action</span>
                <b>{first ? first.title : "Plan is clear"}</b>
              </div>
            </div>

            <p className="cs-console-note">
              The internal value is shown here for you, never to the consumer. The app
              displays stages on purpose — &ldquo;74% ready&rdquo; reads like an approval probability.
            </p>

            <button type="button" className="cs-ghost cs-ghost-block" onClick={reset}>
              Reset the demo
            </button>

            <div className="cs-jump">
              <span className="cs-console-label">Jump to a screen</span>
              <div>
                {(["onboarding", "connect", "home", "blockers", "plan", "scores", "accounts", "progress", "learn"] as Screen[]).map((s) => (
                  <button key={s} type="button" className={screen === s ? "is-on" : ""} onClick={() => setScreen(s)}>
                    {s === "onboarding" ? "Goal" : s === "connect" ? "Connect" : s === "blockers" ? "Blockers" : s === "accounts" ? "Report" : s[0].toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      ) : (
        <div className="cs-deskwrap">
          {surface === "partner" ? <PartnerPortal /> : <CommandCenter />}
          <p className="cs-deskwrap-note">
            {surface === "partner" ? (
              <><Users size={15} /> The partner portal shares one database with the app. A partner never sees a report, a balance or a score — only a stage, and only with consent.</>
            ) : (
              <><Gauge size={15} /> The Command Center ranks by Opportunity, not Readiness. Toggle the sort to see why those are two different numbers. <Arrow size={14} /></>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
