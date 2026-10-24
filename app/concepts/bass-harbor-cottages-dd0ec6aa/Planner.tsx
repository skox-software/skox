"use client";

import { useMemo, useState } from "react";
import { money, sendPreviewLead } from "../_shared";
import { PHONE_DISPLAY, PHONE_TEL, PLACES, POLICY, RULES, SLUG, type Place, type Rate } from "./data";

/**
 * "Plan your stay": a reservation request built on their own published rules.
 * It enforces each place's minimum stay and occupancy (children included),
 * shows the published "from" rate for the arrival month only when they
 * publish one (May, August), and never totals a stay: they quote by phone.
 * The request posts to SKOX tagged preview:<slug>, so Reiss receives it.
 */

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const WORDS = ["", "one", "two", "three", "four", "five", "six"];
const NIGHTS = Array.from({ length: 14 }, (_, i) => i + 1);

function parseDate(s: string) {
  const [y, m, d] = s.split("-").map(Number);
  return y && m && d ? new Date(y, m - 1, d) : null;
}
function fmt(d: Date) {
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}
function rateLine(r: Rate) {
  return `${money(r.amount)} a ${r.per}`;
}
/** The published figure for this arrival month, if they publish one. */
function monthRate(p: Place, month: number): Rate | undefined {
  if (month === 4) return p.may;
  if (month === 7) return p.august;
  return undefined;
}

export default function Planner() {
  const [placeId, setPlaceId] = useState(PLACES[0].id);
  const place = PLACES.find((p) => p.id === placeId)!;
  const [arrive, setArrive] = useState("");
  const [nights, setNights] = useState(place.minNights);
  const [guests, setGuests] = useState(2);
  const [linen, setLinen] = useState(false);
  const [rules, setRules] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [tried, setTried] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [snapped, setSnapped] = useState("");

  const today = useMemo(() => {
    const t = new Date();
    return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
  }, []);
  const arriveDate = parseDate(arrive);
  const leaveDate = arriveDate ? new Date(arriveDate.getFullYear(), arriveDate.getMonth(), arriveDate.getDate() + nights) : null;
  const rate = arriveDate ? monthRate(place, arriveDate.getMonth()) : undefined;
  const weekly = nights >= 7;

  function pickPlace(p: Place) {
    setPlaceId(p.id);
    const notes: string[] = [];
    if (nights < p.minNights) {
      setNights(p.minNights);
      notes.push(`${p.name} has a ${WORDS[p.minNights]}-night minimum, so we moved you to ${p.minNights} nights.`);
    }
    if (guests > p.sleeps) {
      setGuests(p.sleeps);
      notes.push(`It sleeps ${WORDS[p.sleeps]}, so we set ${p.sleeps} guests.`);
    }
    setSnapped(notes.join(" "));
  }
  function pickNights(n: number) {
    if (n < place.minNights) {
      setNights(place.minNights);
      setSnapped(`${place.name} has a ${WORDS[place.minNights]}-night minimum.`);
    } else {
      setNights(n);
      setSnapped("");
    }
  }

  const errors = {
    arrive: !arrive ? "Pick an arrival date." : arrive < today ? "Pick a date from today on." : "",
    rules: !rules ? "Please confirm the house rules." : "",
    name: !name.trim() ? "Your name, please." : "",
    email: !/^\S+@\S+\.\S+$/.test(email.trim()) ? "An email we can reply to." : "",
  };
  const ok = !Object.values(errors).some(Boolean);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setTried(true);
    if (!ok || !arriveDate || !leaveDate) return;
    setState("sending");
    const summary = [
      `[preview:${SLUG}] Stay request`,
      `Place: ${place.name}`,
      `Arrive: ${fmt(arriveDate)} · Leave: ${fmt(leaveDate)} · ${nights} nights`,
      `Guests (incl. children): ${guests}`,
      `Linen rental: ${linen ? "yes" : "no"}`,
      `House rules confirmed: yes`,
      phone.trim() ? `Phone: ${phone.trim()}` : "",
      note.trim() ? `Note: ${note.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    try {
      await sendPreviewLead(SLUG, {
        name: name.trim(),
        email: email.trim(),
        company: "Bass Harbor Cottages preview",
        message: summary,
        projectType: "websites",
      });
      setState("sent");
    } catch {
      setState("failed");
    }
  }

  if (state === "sent" && arriveDate && leaveDate) {
    return (
      <div className="pl-done" role="status">
        <p className="eyebrow">Request sent</p>
        <h3>
          {place.name}, {nights} nights from {fmt(arriveDate)}.
        </h3>
        <p>
          Thank you, {name.trim().split(" ")[0]}. We&rsquo;ll be in touch to confirm your rate and dates. Our deposit terms:
        </p>
        <ul className="pl-policy">
          <li>{POLICY.deposit}</li>
          <li>{POLICY.cancel}</li>
          <li>{POLICY.daily}</li>
        </ul>
        <p className="works-note">
          <strong>This form works.</strong> On your live site it would land in your inbox with every detail above. On this
          concept it went to Reiss at SKOX, who will text you back so you can see how fast a request arrives.
        </p>
        <button type="button" className="btn btn-ghost" onClick={() => setState("idle")}>
          Plan another stay
        </button>
      </div>
    );
  }

  return (
    <form className="pl" onSubmit={submit} noValidate>
      <div className="pl-form">
        <fieldset>
          <legend>
            <span className="pl-step">1</span> Where would you like to stay?
          </legend>
          <div className="pl-places" role="group" aria-label="Places to stay">
            {PLACES.map((p) => (
              <button
                key={p.id}
                type="button"
                className="chip pl-place"
                aria-pressed={p.id === placeId}
                onClick={() => pickPlace(p)}
              >
                <span className="pl-place-name">{p.name}</span>
                <span className="pl-place-meta">
                  Sleeps {p.sleeps} · {p.minNights}-night minimum
                </span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <span className="pl-step">2</span> When, and for how long?
          </legend>
          <label className="pl-field">
            Arrival
            <input
              type="date"
              value={arrive}
              min={today}
              onChange={(e) => setArrive(e.target.value)}
              aria-invalid={tried && !!errors.arrive}
            />
          </label>
          {tried && errors.arrive && (
            <p className="pl-error" role="alert">
              {errors.arrive}
            </p>
          )}
          <p className="pl-label" id="nights-label">
            Nights
          </p>
          <div className="pl-ruler" role="group" aria-labelledby="nights-label">
            {NIGHTS.map((n) => (
              <button
                key={n}
                type="button"
                className={`chip pl-night${n < place.minNights ? " is-below" : ""}`}
                aria-pressed={n === nights}
                aria-label={n < place.minNights ? `${n} nights, below the minimum` : `${n} nights`}
                onClick={() => pickNights(n)}
              >
                {n}
                {n === place.minNights && <span className="pl-min">min</span>}
              </button>
            ))}
          </div>
          <div className="pl-tide" aria-hidden="true">
            <span style={{ width: `${(nights / 14) * 100}%` }} />
          </div>
          <p className="pl-tide-label">{weekly ? `${nights} nights: a full week` : `${nights} nights`}</p>
          {snapped && (
            <p className="pl-snap" role="status">
              {snapped}
            </p>
          )}
        </fieldset>

        <fieldset>
          <legend>
            <span className="pl-step">3</span> Who&rsquo;s coming?
          </legend>
          <div className="pl-guests">
            <button type="button" className="chip" aria-label="One fewer guest" disabled={guests <= 1} onClick={() => setGuests((g) => Math.max(1, g - 1))}>
              −
            </button>
            <output aria-live="polite">
              {guests} {guests === 1 ? "guest" : "guests"}
            </output>
            <button
              type="button"
              className="chip"
              aria-label="One more guest"
              disabled={guests >= place.sleeps}
              onClick={() => setGuests((g) => Math.min(place.sleeps, g + 1))}
            >
              +
            </button>
          </div>
          <p className="pl-hint">
            {place.sleepsText}. Every place has a maximum occupancy, children and the little ones included.
          </p>
          {weekly && (
            <label className="pl-check">
              <input type="checkbox" checked={linen} onChange={(e) => setLinen(e.target.checked)} />
              <span>
                Add linen rental. Guests bring their own linen for weekly stays; rental is available and priced when we confirm.
              </span>
            </label>
          )}
        </fieldset>

        <fieldset>
          <legend>
            <span className="pl-step">4</span> Our house rules
          </legend>
          <ul className="pl-rules">
            {RULES.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <label className="pl-check">
            <input type="checkbox" checked={rules} onChange={(e) => setRules(e.target.checked)} aria-invalid={tried && !!errors.rules} />
            <span>I&rsquo;ve read the house rules and our party will keep them.</span>
          </label>
          {tried && errors.rules && (
            <p className="pl-error" role="alert">
              {errors.rules}
            </p>
          )}
        </fieldset>

        <fieldset>
          <legend>
            <span className="pl-step">5</span> Where should we reply?
          </legend>
          <div className="pl-contact">
            <label className="pl-field">
              Name
              <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" aria-invalid={tried && !!errors.name} />
              {tried && errors.name && <span className="pl-error" role="alert">{errors.name}</span>}
            </label>
            <label className="pl-field">
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                aria-invalid={tried && !!errors.email}
              />
              {tried && errors.email && <span className="pl-error" role="alert">{errors.email}</span>}
            </label>
            <label className="pl-field">
              Phone <small>(optional)</small>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
            </label>
            <label className="pl-field pl-wide">
              Anything we should know <small>(optional)</small>
              <textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Bringing kayaks, arriving late, a birthday…" />
            </label>
          </div>
        </fieldset>
      </div>

      <aside className="pl-ticket" aria-label="Your stay">
        <p className="eyebrow">Your stay</p>
        <h3>{place.name}</h3>
        <dl className="pl-sum">
          <div>
            <dt>Arrive</dt>
            <dd>{arriveDate ? fmt(arriveDate) : "Pick a date"}</dd>
          </div>
          <div>
            <dt>Leave</dt>
            <dd>{leaveDate ? fmt(leaveDate) : "—"}</dd>
          </div>
          <div>
            <dt>Nights</dt>
            <dd>
              {nights} <small>({place.minNights}-night minimum)</small>
            </dd>
          </div>
          <div>
            <dt>Guests</dt>
            <dd>
              {guests} of {place.sleeps}
            </dd>
          </div>
        </dl>
        <div className="pl-rate">
          {arriveDate && rate ? (
            <p>
              <strong>From {rateLine(rate)}</strong> in {MONTHS[arriveDate.getMonth()]}, as published.
            </p>
          ) : arriveDate ? (
            <p>
              We publish rates for May and August. Your {MONTHS[arriveDate.getMonth()]} rate is confirmed when we reply.
            </p>
          ) : (
            <p>Pick a date to see the published rate for that month.</p>
          )}
          <ul className="leaders">
            {[place.may, place.august, place.daily].filter(Boolean).map((r) => (
              <li key={r!.label}>
                <span>{r!.label}</span>
                <span>from {rateLine(r!)}</span>
              </li>
            ))}
          </ul>
          <p className="pl-fine">
            Your rate depends on your dates, length of stay and party. {POLICY.tax} We never total a stay here: we confirm it
            with you.
          </p>
        </div>
        <button className="btn btn-primary btn-block" type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Send my request"}
        </button>
        {tried && !ok && (
          <p className="pl-error" role="alert">
            A few details are missing above.
          </p>
        )}
        {state === "failed" && (
          <p className="pl-error" role="alert">
            That didn&rsquo;t send. Call <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>, 8 am to 7 pm Eastern.
          </p>
        )}
        <p className="pl-fine">A request, not a booking. Nothing is charged.</p>
      </aside>
    </form>
  );
}
