"use client";

import { useMemo, useState } from "react";
import { sendPreviewLead } from "./contact";

/**
 * A group order builder: people × days × meals → a count and a pack plan
 * (largest packs first, then the smallest pack that covers the rest). Items
 * are filtered by the business's own dietary tags and grouped by course. It
 * never totals a price; the business confirms that. The request posts to
 * SKOX's contact API tagged `preview:<slug>`, so Reiss receives it, not the
 * business.
 *
 * Items must arrive sorted by course: a course heading is drawn wherever the
 * course changes.
 */

export type OrderItem = { name: string; tags: string[]; course: string };

export type OrderCopy = {
  /** First line of the lead, after the preview tag: "Boil-bag order request". */
  requestTitle: string;
  /** Sent as the company when the visitor leaves it blank. */
  companyFallback: string;
  /** Label of the optional company field: "Outfitter or group". */
  companyLabel: string;
  /** Shown if the post fails: "That didn't send. Call … and we'll take it by phone." */
  failed: string;
  /** Small print under the submit button. */
  note: string;
  /** Sentence after "N meals for P people over D days." on success. */
  doneBody: string;
  doneTitle?: string;
  groupLegend?: string;
  peopleLabel?: string;
  daysLabel?: string;
  dateLabel?: string;
  mealsLegend?: string;
  filterLegend?: string;
  menuLegend?: string;
  contactLegend?: string;
  needContact?: string;
  needItem?: string;
};

function packPlan(count: number, sizes: number[]) {
  let left = count;
  const plan: Record<number, number> = {};
  for (const size of [...sizes].reverse()) {
    const n = Math.floor(left / size);
    if (n) {
      plan[size] = n;
      left -= n * size;
    }
  }
  if (left > 0) {
    const size = sizes.find((s) => s >= left) ?? sizes[0];
    plan[size] = (plan[size] ?? 0) + 1;
  }
  return plan;
}

export default function OrderBuilder({
  slug,
  items,
  tagLabels,
  packSizes,
  packNoun,
  meals: mealOptions,
  unit = "meals",
  initial = { people: 12, days: 3, meals: [mealOptions[mealOptions.length - 1]] },
  limits = { people: [2, 200], days: [1, 21] },
  projectType = "other",
  copy,
}: {
  slug: string;
  items: OrderItem[];
  /** Tag code → chip label, in chip order: { GF: "Gluten-free" }. */
  tagLabels: Record<string, string>;
  /** Ascending pack sizes, in people. */
  packSizes: number[];
  /** "bag", "tray", "box". */
  packNoun: string;
  /** Meal slots a day: ["Breakfast", "Lunch", "Dinner"]. */
  meals: string[];
  unit?: string;
  initial?: { people: number; days: number; meals: string[] };
  limits?: { people: [number, number]; days: [number, number] };
  projectType?: string;
  copy: OrderCopy;
}) {
  const c = {
    doneTitle: "Order request received.",
    groupLegend: "Your group",
    peopleLabel: "People",
    daysLabel: "Days out",
    dateLabel: "Pickup date",
    mealsLegend: "Meals we’re covering",
    filterLegend: "Only show",
    menuLegend: "Pick dishes",
    contactLegend: "Send the order request",
    needContact: "Add a name and an email so we can confirm the order.",
    needItem: "Pick at least one dish.",
    ...copy,
  };
  const [people, setPeople] = useState(initial.people);
  const [days, setDays] = useState(initial.days);
  const [meals, setMeals] = useState<string[]>(initial.meals);
  const [tags, setTags] = useState<string[]>([]);
  const [picked, setPicked] = useState<string[]>([]);
  const [pickup, setPickup] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [error, setError] = useState("");

  const visible = useMemo(() => items.filter((i) => tags.every((t) => i.tags.includes(t))), [items, tags]);
  const total = people * days * meals.length;
  const plan = packPlan(total, packSizes);

  function toggle<T>(list: T[], v: T, set: (l: T[]) => void) {
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError(c.needContact);
      return;
    }
    if (!picked.length) {
      setError(c.needItem);
      return;
    }
    setError("");
    setState("sending");
    const summary = [
      `[preview:${slug}] ${c.requestTitle}`,
      `Group: ${people} people × ${days} days × ${meals.join("/")} = ${total} ${unit}`,
      `${packNoun[0].toUpperCase()}${packNoun.slice(1)}s: ${Object.entries(plan)
        .map(([s, n]) => `${n} × ${s}-person`)
        .join(", ")}`,
      `Dietary: ${tags.length ? tags.map((t) => tagLabels[t]).join(", ") : "none"}`,
      `Dishes: ${picked.join("; ")}`,
      `Pickup: ${pickup || "not set"}`,
    ].join("\n");
    try {
      await sendPreviewLead(slug, {
        name: name.trim(),
        email: email.trim(),
        company: company.trim() || c.companyFallback,
        message: summary,
        projectType,
      });
      setState("sent");
    } catch {
      setState("failed");
    }
  }

  if (state === "sent") {
    return (
      <div className="ob-done" role="status">
        <p className="ob-done-title">{c.doneTitle}</p>
        <p>
          {total} {unit} for {people} people over {days} day{days > 1 ? "s" : ""}. {c.doneBody}
        </p>
      </div>
    );
  }

  return (
    <form className="ob" onSubmit={submit} noValidate>
      <div className="ob-grid">
        <fieldset className="ob-field">
          <legend>{c.groupLegend}</legend>
          <label>
            {c.peopleLabel}
            <input
              type="number"
              min={limits.people[0]}
              max={limits.people[1]}
              value={people}
              onChange={(e) => setPeople(Math.max(limits.people[0], Number(e.target.value) || limits.people[0]))}
            />
          </label>
          <label>
            {c.daysLabel}
            <input
              type="number"
              min={limits.days[0]}
              max={limits.days[1]}
              value={days}
              onChange={(e) => setDays(Math.max(limits.days[0], Number(e.target.value) || limits.days[0]))}
            />
          </label>
          <label>
            {c.dateLabel}
            <input type="date" value={pickup} onChange={(e) => setPickup(e.target.value)} />
          </label>
        </fieldset>

        <fieldset className="ob-field">
          <legend>{c.mealsLegend}</legend>
          <div className="ob-chips">
            {mealOptions.map((m) => (
              <button
                type="button"
                key={m}
                aria-pressed={meals.includes(m)}
                className="chip"
                onClick={() => toggle(meals, m, setMeals)}
              >
                {m}
              </button>
            ))}
          </div>
          <legend className="ob-legend-2">{c.filterLegend}</legend>
          <div className="ob-chips">
            {Object.keys(tagLabels).map((t) => (
              <button
                type="button"
                key={t}
                aria-pressed={tags.includes(t)}
                className="chip"
                onClick={() => toggle(tags, t, setTags)}
              >
                {tagLabels[t]}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="ob-count" aria-live="polite">
        <span className="ob-num">{total}</span>
        <span>
          {unit} · packed as{" "}
          {Object.entries(plan)
            .sort((a, b) => Number(b[0]) - Number(a[0]))
            .map(([s, n]) => `${n} × ${s}-person ${packNoun}${n > 1 ? "s" : ""}`)
            .join(", ")}
        </span>
      </div>

      <fieldset className="ob-field ob-menu">
        <legend>
          {c.menuLegend} <small>{visible.length} of {items.length} match</small>
        </legend>
        <ul className="ob-list">
          {visible.map((i, idx) => {
            const on = picked.includes(i.name);
            const first = idx === 0 || visible[idx - 1].course !== i.course;
            return (
              <li key={i.name} style={first ? { display: "contents" } : undefined}>
                {first && <h3 className="ob-course">{i.course}</h3>}
                <button
                  type="button"
                  aria-pressed={on}
                  className="ob-dish"
                  onClick={() => toggle(picked, i.name, setPicked)}
                >
                  <span className="ob-dish-name">{i.name}</span>
                  <span className="ob-dish-meta">
                    {i.course}
                    {i.tags.length ? ` · ${i.tags.join(" ")}` : ""}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <fieldset className="ob-field ob-contact">
        <legend>{c.contactLegend}</legend>
        <div className="ob-contact-grid">
          <label>
            Name
            <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
          </label>
          <label>
            {c.companyLabel}
            <input value={company} onChange={(e) => setCompany(e.target.value)} autoComplete="organization" />
          </label>
          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
          </label>
        </div>
        {error && (
          <p className="ob-error" role="alert">
            {error}
          </p>
        )}
        <button className="btn btn-primary" type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : `Request ${total} ${unit}`}
        </button>
        {state === "failed" && (
          <p className="ob-error" role="alert">
            {c.failed}
          </p>
        )}
        <p className="ob-note">{c.note}</p>
      </fieldset>
    </form>
  );
}
