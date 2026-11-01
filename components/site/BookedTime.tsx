"use client";

import { useSyncExternalStore } from "react";

type Copy = { title: string; noTime: string; addToCalendar: string; calendarTitle: string };

const noop = () => () => {};

/** "You're booked: Tuesday 3 November, 10:00 AM", in the visitor's own time zone, with an add-to-calendar link. */
export function BookedTime({ start, end, copy }: { start: string; end: string; copy: Copy }) {
  const s = parse(start);
  const e = parse(end) ?? (s ? new Date(s.getTime() + 90 * 60_000) : null);
  // Formatted on the client only, so it's in the visitor's time zone.
  const when = useSyncExternalStore(
    noop,
    () => (s ? s.toLocaleString(undefined, { weekday: "long", day: "numeric", month: "long", hour: "numeric", minute: "2-digit" }) : ""),
    () => "",
  );

  if (!s || !e) {
    return (
      <>
        <h1>{copy.title}.</h1>
        <p className="lead" style={{ color: "var(--ink-2)", maxWidth: "44ch" }}>
          {copy.noTime}
        </p>
      </>
    );
  }
  const gcal = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(copy.calendarTitle)}&dates=${stamp(s)}/${stamp(e)}`;
  return (
    <>
      <h1>
        {copy.title}: <span className="booked-when">{when || s.toISOString().slice(0, 16).replace("T", " ")}</span>
      </h1>
      <p className="lead">
        <a className="link" href={gcal} target="_blank" rel="noopener">
          {copy.addToCalendar}
        </a>
      </p>
    </>
  );
}

function parse(v: string) {
  if (!v) return null;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}

function stamp(d: Date) {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}
