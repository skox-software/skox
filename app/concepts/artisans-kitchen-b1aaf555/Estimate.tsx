"use client";

import { useState } from "react";
import { PHONE_DISPLAY, PHONE_TEL } from "./data";

/**
 * Live wedding estimate from the site's published numbers only:
 * $35–$65+ per person, 20% deposit, $25 tastings (ledger L11, L13, L14).
 * It shows a range and never a quote. Bar and rentals are flagged, not priced,
 * because the site publishes no numbers for them.
 */
const LOW = 35;
const HIGH = 65;
const money = (n: number) => "$" + n.toLocaleString("en-US");

export default function Estimate() {
  const [guests, setGuests] = useState(100);
  const [bar, setBar] = useState(false);
  const [rentals, setRentals] = useState(false);
  const low = guests * LOW;
  const high = guests * HIGH;

  return (
    <div className="est">
      <h3>Weddings, in plain numbers</h3>
      <label className="est-slider">
        <span>
          <strong>{guests}</strong> guests
        </span>
        <input
          type="range"
          min={20}
          max={300}
          step={5}
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          aria-valuetext={`${guests} guests`}
        />
      </label>
      <dl className="leaders">
        <div>
          <dt>Food, at $35 to $65+ a head</dt>
          <dd>
            {money(low)} to {money(high)}+
          </dd>
        </div>
        <div>
          <dt>20% deposit locks the date</dt>
          <dd>
            {money(Math.round(low * 0.2))} to {money(Math.round(high * 0.2))}
          </dd>
        </div>
        <div>
          <dt>Tasting for two, by appointment</dt>
          <dd>$50</dd>
        </div>
      </dl>
      <div className="est-flags">
        <button type="button" className="chip chip-dark" aria-pressed={bar} onClick={() => setBar(!bar)}>
          Bar service
        </button>
        <button type="button" className="chip chip-dark" aria-pressed={rentals} onClick={() => setRentals(!rentals)}>
          Rentals
        </button>
        <span className="est-flag-note">
          {bar || rentals
            ? `${[bar && "Bar", rentals && "Rentals"].filter(Boolean).join(" and ")} priced on the call.`
            : "Toggle what else you need."}
        </span>
      </div>
      <p className="pricing-example">
        A range, not a quote. The final number depends on guest count, venue, rentals, bar and menu.
      </p>
      <a className="btn btn-ghost" href={`tel:${PHONE_TEL}`}>
        Call {PHONE_DISPLAY} to book a tasting
      </a>
    </div>
  );
}
