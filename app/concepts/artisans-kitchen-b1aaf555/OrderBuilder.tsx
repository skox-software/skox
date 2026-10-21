"use client";

import { useMemo, useState } from "react";
import { BAG_MENU, BAG_SIZES, SLUG, type Tag } from "./data";

/**
 * The one working upgrade: a boil-bag trip order builder for outfitters.
 * People × days × meals → meal count and a bag plan. Dietary filters use the
 * GF/LF/VT tags printed on the Boil-Bag page. It never totals a price (the
 * site's price lines don't map to items). The request posts to SKOX's contact
 * API tagged with the preview slug so Reiss receives it, not the caterer.
 */

const MEALS = ["Breakfast", "Lunch", "Dinner"] as const;
type Meal = (typeof MEALS)[number];
const TAG_LABEL: Record<Tag, string> = {
  GF: "Gluten-free",
  LF: "Lactose-free",
  VT: "Vegetarian",
};

function bagPlan(meals: number) {
  // Largest bags first, then fill the remainder with the smallest that fits.
  let left = meals;
  const plan: Record<number, number> = {};
  for (const size of [...BAG_SIZES].reverse()) {
    const n = Math.floor(left / size);
    if (n) {
      plan[size] = n;
      left -= n * size;
    }
  }
  if (left > 0) {
    const size = BAG_SIZES.find((s) => s >= left) ?? BAG_SIZES[0];
    plan[size] = (plan[size] ?? 0) + 1;
  }
  return plan;
}

export default function OrderBuilder() {
  const [people, setPeople] = useState(12);
  const [days, setDays] = useState(3);
  const [meals, setMeals] = useState<Meal[]>(["Dinner"]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [picked, setPicked] = useState<string[]>([]);
  const [pickup, setPickup] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [error, setError] = useState("");

  const visible = useMemo(
    () => BAG_MENU.filter((i) => tags.every((t) => i.tags.includes(t))),
    [tags],
  );
  const totalMeals = people * days * meals.length;
  const plan = bagPlan(totalMeals);

  function toggle<T>(list: T[], v: T, set: (l: T[]) => void) {
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Add a name and an email so we can confirm the order.");
      return;
    }
    if (!picked.length) {
      setError("Pick at least one dish.");
      return;
    }
    setError("");
    setState("sending");
    const summary = [
      `[preview:${SLUG}] Boil-bag order request`,
      `Group: ${people} people × ${days} days × ${meals.join("/")} = ${totalMeals} meals`,
      `Bags: ${Object.entries(plan)
        .map(([s, n]) => `${n} × ${s}-person`)
        .join(", ")}`,
      `Dietary: ${tags.length ? tags.map((t) => TAG_LABEL[t]).join(", ") : "none"}`,
      `Dishes: ${picked.join("; ")}`,
      `Pickup: ${pickup || "not set"}`,
    ].join("\n");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim() || "Artisan's Kitchen preview",
          broken: summary,
          timeline: `preview:${SLUG}`,
          projectType: "other",
        }),
        signal: AbortSignal.timeout(15000),
      });
      if (!r.ok) throw new Error("bad");
      setState("sent");
    } catch {
      setState("failed");
    }
  }

  if (state === "sent") {
    return (
      <div className="ob-done" role="status">
        <p className="ob-done-title">Order request received.</p>
        <p>
          {totalMeals} meals for {people} people over {days} day{days > 1 ? "s" : ""}.
          On the live site this goes straight to the kitchen with a confirmation
          text to you. On this concept it went to Reiss at SKOX, who will text
          you back so you can see how fast it lands.
        </p>
      </div>
    );
  }

  return (
    <form className="ob" onSubmit={submit} noValidate>
      <div className="ob-grid">
        <fieldset className="ob-field">
          <legend>Your group</legend>
          <label>
            People
            <input
              type="number"
              min={2}
              max={200}
              value={people}
              onChange={(e) => setPeople(Math.max(2, Number(e.target.value) || 2))}
            />
          </label>
          <label>
            Days out
            <input
              type="number"
              min={1}
              max={21}
              value={days}
              onChange={(e) => setDays(Math.max(1, Number(e.target.value) || 1))}
            />
          </label>
          <label>
            Pickup date
            <input type="date" value={pickup} onChange={(e) => setPickup(e.target.value)} />
          </label>
        </fieldset>

        <fieldset className="ob-field">
          <legend>Meals we&rsquo;re covering</legend>
          <div className="ob-chips">
            {MEALS.map((m) => (
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
          <legend className="ob-legend-2">Only show</legend>
          <div className="ob-chips">
            {(Object.keys(TAG_LABEL) as Tag[]).map((t) => (
              <button
                type="button"
                key={t}
                aria-pressed={tags.includes(t)}
                className="chip"
                onClick={() => toggle(tags, t, setTags)}
              >
                {TAG_LABEL[t]}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="ob-count" aria-live="polite">
        <span className="ob-num">{totalMeals}</span>
        <span>
          meals · packed as{" "}
          {Object.entries(plan)
            .sort((a, b) => Number(b[0]) - Number(a[0]))
            .map(([s, n]) => `${n} × ${s}-person bag${n > 1 ? "s" : ""}`)
            .join(", ")}
        </span>
      </div>

      <fieldset className="ob-field ob-menu">
        <legend>
          Pick dishes <small>{visible.length} of {BAG_MENU.length} match</small>
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
        <legend>Send the order request</legend>
        <div className="ob-contact-grid">
          <label>
            Name
            <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
          </label>
          <label>
            Outfitter or group
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
          {state === "sending" ? "Sending…" : `Request ${totalMeals} meals`}
        </button>
        {state === "failed" && (
          <p className="ob-error" role="alert">
            That didn&rsquo;t send. Call 928.779.3662 and we&rsquo;ll take it by phone.
          </p>
        )}
        <p className="ob-note">
          Pricing is confirmed by the kitchen. Boil bags keep 30 days in a cooler and 3+ years frozen; most are
          ready in 45 minutes of boiling or 10 in a microwave.
        </p>
      </fieldset>
    </form>
  );
}
