"use client";

import { useId, useState } from "react";
import type { BuildType } from "@/content/landing";
import { sendBrief } from "@/lib/brief";
import { track } from "@/lib/track";

const YEARS = [3, 5] as const;

const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/**
 * Rent vs. own, with the visitor's own numbers. It only multiplies what they
 * type in, with no assumed subscription price. The build side shows the public
 * starting price (claim T11) and the fixed-price promise.
 */
export function OwnVsRent({ build, startingPrice }: { build: BuildType; startingPrice: string }) {
  const id = useId();
  const [users, setUsers] = useState(8);
  const [perUser, setPerUser] = useState(40);
  const [years, setYears] = useState<(typeof YEARS)[number]>(5);
  const [touched, setTouched] = useState(false);

  const monthly = Math.max(0, users) * Math.max(0, perUser);
  const total = monthly * 12 * years;

  function touch() {
    if (touched) return;
    setTouched(true);
    track("own_rent_used", { page: window.location.pathname });
  }

  function ask() {
    track("scope_cta_clicked", { placement: "trade-own-rent", page: window.location.pathname });
    sendBrief({
      text: `We pay about ${money(monthly)} a month for software (${users} users). We'd rather own something built around how we work.`,
      build,
    });
    document.getElementById("scope")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="tr-rent" onInput={touch}>
      <div className="tr-rent-inputs">
        <label htmlFor={`${id}-users`}>
          People using it
          <input
            id={`${id}-users`}
            type="number"
            inputMode="numeric"
            min={1}
            max={500}
            value={users}
            onChange={(e) => setUsers(Number(e.target.value))}
          />
        </label>
        <label htmlFor={`${id}-price`}>
          What you pay per user, per month
          <span className="tr-rent-money">
            <span aria-hidden>$</span>
            <input
              id={`${id}-price`}
              type="number"
              inputMode="decimal"
              min={0}
              max={1000}
              value={perUser}
              onChange={(e) => setPerUser(Number(e.target.value))}
            />
          </span>
        </label>
        <fieldset>
          <legend>Over</legend>
          {YEARS.map((y) => (
            <button
              key={y}
              type="button"
              aria-pressed={years === y}
              onClick={() => {
                setYears(y);
                touch();
              }}
            >
              {y} years
            </button>
          ))}
        </fieldset>
      </div>

      <div className="tr-rent-result" aria-live="polite">
        <div>
          <p className="micro">Renting</p>
          <strong>{money(total)}</strong>
          <p>
            {money(monthly)} a month for {years} years, and you still don&apos;t own it.
          </p>
        </div>
        <div className="is-own">
          <p className="micro">Owning, with SKOX</p>
          <strong>From {startingPrice}</strong>
          <p>One fixed price, quoted in writing before you pay. Built around how you work, and yours to keep. Care plan optional.</p>
        </div>
      </div>

      <p className="tr-rent-note">Example numbers. Change them to yours.</p>
      <button type="button" className="button button-primary" onClick={ask}>
        Get my fixed price <span aria-hidden>↗</span>
      </button>
    </div>
  );
}
