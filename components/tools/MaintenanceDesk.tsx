"use client";
import { useState } from "react";
import s from "./MaintenanceDesk.module.css";

/* Tool 05 · Property management. A maintenance desk: a tenant's request comes
   in, gets a vendor, waits for the owner's OK when it's over their limit, and
   lands on the owner's statement. Every name, unit and price is invented. */

type Category = "plumbing" | "electrical" | "appliance" | "hvac";
type Stage = "new" | "owner" | "vendor" | "done";
type Ticket = { id: string; unit: string; owner: string; what: string; category: Category; urgent: boolean; stage: Stage; vendor?: string; cost?: number };

const OWNERS: Record<string, { name: string; limit: number }> = {
  delgado: { name: "R. Delgado", limit: 500 },
  pine: { name: "Pine Holdings LLC", limit: 1000 },
  osei: { name: "A. Osei", limit: 300 },
};
const UNITS: { unit: string; owner: string }[] = [
  { unit: "Maple Row 2B", owner: "delgado" },
  { unit: "Maple Row 4A", owner: "delgado" },
  { unit: "Pine Court 101", owner: "pine" },
  { unit: "Pine Court 207", owner: "pine" },
  { unit: "14 Birch St", owner: "osei" },
];
const VENDORS: Record<Category, { name: string; quote: number }> = {
  plumbing: { name: "Northside Plumbing", quote: 340 },
  electrical: { name: "Brightline Electric", quote: 260 },
  appliance: { name: "Metro Appliance Repair", quote: 610 },
  hvac: { name: "Comfort Air Service", quote: 1180 },
};
const CATEGORIES: { key: Category; label: string; what: string }[] = [
  { key: "plumbing", label: "Plumbing", what: "Leak under kitchen sink" },
  { key: "electrical", label: "Electrical", what: "Outlet in bedroom is dead" },
  { key: "appliance", label: "Appliance", what: "Dishwasher won't drain" },
  { key: "hvac", label: "Heating & cooling", what: "No heat, thermostat blank" },
];
const STAGES: { key: Stage; label: string }[] = [
  { key: "new", label: "New" },
  { key: "owner", label: "Needs owner OK" },
  { key: "vendor", label: "With vendor" },
  { key: "done", label: "Done" },
];

const T = (id: string, unit: string, what: string, category: Category, stage: Stage, urgent = false, cost?: number): Ticket => ({
  id,
  unit,
  owner: UNITS.find((u) => u.unit === unit)!.owner,
  what,
  category,
  urgent,
  stage,
  vendor: stage === "new" ? undefined : VENDORS[category].name,
  cost: cost ?? (stage === "new" ? undefined : VENDORS[category].quote),
});
const START: Ticket[] = [
  T("t1", "Pine Court 207", "Garbage disposal jammed", "appliance", "new"),
  T("t2", "Maple Row 4A", "Bathroom fan sparks", "electrical", "new", true),
  T("t3", "14 Birch St", "Water heater pilot out", "plumbing", "owner", true),
  T("t4", "Pine Court 101", "Running toilet", "plumbing", "vendor", false, 180),
  T("t5", "Maple Row 2B", "Fridge not cooling", "appliance", "done", false, 410),
];

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

export function MaintenanceDesk() {
  const [tickets, setTickets] = useState(START);
  const [unit, setUnit] = useState(UNITS[0].unit);
  const [category, setCategory] = useState<Category>("plumbing");
  const [urgent, setUrgent] = useState(false);
  const [toast, setToast] = useState("Submit a request as the tenant, then move it along with the buttons on each card.");
  const [seq, setSeq] = useState(1);

  function update(id: string, patch: Partial<Ticket>) {
    setTickets((ts) => ts.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  }

  function submit() {
    const owner = UNITS.find((u) => u.unit === unit)!.owner;
    const what = CATEGORIES.find((c) => c.key === category)!.what;
    setTickets((ts) => [{ id: `n${seq}`, unit, owner, what, category, urgent, stage: "new" }, ...ts]);
    setSeq((n) => n + 1);
    setToast(`New request from ${unit}${urgent ? ", marked urgent" : ""}. The tenant got a text confirming it.`);
  }

  function assign(t: Ticket) {
    const v = VENDORS[t.category];
    const o = OWNERS[t.owner];
    // Over the owner's limit, the repair waits for their OK instead of going out.
    const stage: Stage = v.quote > o.limit ? "owner" : "vendor";
    update(t.id, { vendor: v.name, cost: v.quote, stage });
    setToast(
      stage === "owner"
        ? `${v.name} quoted ${money(v.quote)}, over ${o.name}'s ${money(o.limit)} limit. Approval request sent to the owner.`
        : `${v.name} quoted ${money(v.quote)}, inside ${o.name}'s limit. Work order sent.`,
    );
  }

  function approve(t: Ticket) {
    update(t.id, { stage: "vendor" });
    setToast(`${OWNERS[t.owner].name} approved ${money(t.cost ?? 0)} from the owner portal. Work order sent to ${t.vendor}.`);
  }

  function finish(t: Ticket) {
    update(t.id, { stage: "done" });
    setToast(`${t.unit} closed. ${money(t.cost ?? 0)} added to ${OWNERS[t.owner].name}'s statement.`);
  }

  function reset() {
    setTickets(START);
    setSeq(1);
    setToast("Desk reset.");
  }

  const open = tickets.filter((t) => t.stage !== "done").length;
  const waiting = tickets.filter((t) => t.stage === "owner").length;
  const spend = (owner: string) => tickets.filter((t) => t.owner === owner && t.stage === "done").reduce((a, t) => a + (t.cost ?? 0), 0);
  const total = Object.keys(OWNERS).reduce((a, o) => a + spend(o), 0);

  return (
    <div className={s.root}>
      <header className={s.top}>
        <div className={s.brand}>
          <span className={s.mark} aria-hidden>
            ⌂
          </span>
          Lakeside Property Group <small>Maintenance</small>
        </div>
        <div className={s.stats}>
          <span>
            <b>{open}</b> open
          </span>
          <span className={waiting ? s.warnText : ""}>
            <b>{waiting}</b> waiting on owners
          </span>
          <span>
            <b>{money(total)}</b> closed this month
          </span>
        </div>
        <div className={s.actions}>
          <button onClick={reset} className={s.ghost}>
            Reset
          </button>
        </div>
      </header>

      <div className={s.body}>
        <aside className={s.intake} aria-label="Tenant request form">
          <h4>Tenant request</h4>
          <label>
            Unit
            <select value={unit} onChange={(e) => setUnit(e.target.value)}>
              {UNITS.map((u) => (
                <option key={u.unit}>{u.unit}</option>
              ))}
            </select>
          </label>
          <fieldset>
            <legend>What&apos;s wrong?</legend>
            {CATEGORIES.map((c) => (
              <button key={c.key} type="button" aria-pressed={category === c.key} onClick={() => setCategory(c.key)} className={`${s.chip} ${s[c.key]}`}>
                {c.label}
              </button>
            ))}
          </fieldset>
          <label className={s.check}>
            <input type="checkbox" checked={urgent} onChange={(e) => setUrgent(e.target.checked)} />
            It&apos;s urgent (water, no heat, safety)
          </label>
          <button type="button" onClick={submit} className={s.primary}>
            Send request
          </button>
          <div className={s.owners}>
            <h4>Owner statements</h4>
            <ul>
              {Object.entries(OWNERS).map(([key, o]) => (
                <li key={key}>
                  <span>
                    {o.name}
                    <small>OK needed over {money(o.limit)}</small>
                  </span>
                  <b>{money(spend(key))}</b>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <section className={s.board} aria-label="Maintenance requests">
          <div className={s.columns}>
            {STAGES.map((st) => {
              const list = tickets.filter((t) => t.stage === st.key);
              return (
                <div key={st.key} className={`${s.column} ${st.key === "owner" && list.length ? s.hot : ""}`}>
                  <h5>
                    {st.label} <span>{list.length}</span>
                  </h5>
                  <ul>
                    {list.map((t) => (
                      <li key={t.id} className={`${s.card} ${s[t.category]}`}>
                        <span className={s.cardTop}>
                          <b>{t.unit}</b>
                          {t.cost !== undefined && <em>{money(t.cost)}</em>}
                        </span>
                        <span>{t.what}</span>
                        <span className={s.tags}>
                          <i>{OWNERS[t.owner].name}</i>
                          {t.vendor && <i>{t.vendor}</i>}
                          {t.urgent && <i className={s.urgent}>Urgent</i>}
                        </span>
                        {t.stage === "new" && (
                          <button onClick={() => assign(t)} className={s.step}>
                            Get vendor quote →
                          </button>
                        )}
                        {t.stage === "owner" && (
                          <button onClick={() => approve(t)} className={s.step}>
                            Approve as owner →
                          </button>
                        )}
                        {t.stage === "vendor" && (
                          <button onClick={() => finish(t)} className={s.step}>
                            Vendor marked done →
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          <p className={s.toast} role="status">
            {toast}
          </p>
        </section>
      </div>
    </div>
  );
}
