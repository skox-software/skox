"use client";

import { useEffect, useState } from "react";

/**
 * "Today on the harbor": live tide predictions from NOAA station 8413651
 * (Bass Harbor, ME, about half a mile from the cottages) and tonight's sunset
 * computed for the property's coordinates. Real data, every day; nothing
 * here is about the business itself.
 */

const STATION = "8413651";
const STATION_URL = `https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=${STATION}`;
const LAT = 44.2452;
const LNG = -68.3455;
const TZ = "America/New_York";

type Tide = { t: number; v: number; type: "H" | "L" }; // t = minutes from Maine midnight today

/** Today's date and the current minute, in Maine. */
function maineNow() {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
      .formatToParts(new Date())
      .map((x) => [x.type, x.value]),
  );
  return { y: +p.year, m: +p.month, d: +p.day, min: +p.hour * 60 + +p.minute };
}

function clock(min: number) {
  const m = ((Math.round(min) % 1440) + 1440) % 1440;
  const h = Math.floor(m / 60);
  const mm = String(m % 60).padStart(2, "0");
  return `${h % 12 || 12}:${mm} ${h < 12 ? "am" : "pm"}`;
}

/** NOAA's sunset approximation, in UTC minutes for the given date. */
function sunsetUtc(y: number, m: number, d: number) {
  const rad = Math.PI / 180;
  const n = Math.floor(Date.UTC(y, m - 1, d) / 86400000) - Math.floor(Date.UTC(y, 0, 0) / 86400000);
  const g = ((2 * Math.PI) / 365) * (n - 1 + 0.5);
  const eqt = 229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
  const decl =
    0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) + 0.000907 * Math.sin(2 * g) - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g);
  const ha = Math.acos(Math.cos(90.833 * rad) / (Math.cos(LAT * rad) * Math.cos(decl)) - Math.tan(LAT * rad) * Math.tan(decl)) / rad;
  return 720 - 4 * (LNG - ha) - eqt;
}

/** Sunset as Maine clock minutes. */
function sunsetMaine(y: number, m: number, d: number) {
  const utc = sunsetUtc(y, m, d);
  const date = new Date(Date.UTC(y, m - 1, d) + utc * 60000);
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", { timeZone: TZ, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(date).map((x) => [x.type, x.value]),
  );
  return +p.hour * 60 + +p.minute;
}

/** Height between two turning points, on a cosine (how tides actually curve). */
function heightAt(tides: Tide[], t: number) {
  for (let i = 0; i < tides.length - 1; i++) {
    const a = tides[i], b = tides[i + 1];
    if (t >= a.t && t <= b.t) {
      const f = (t - a.t) / (b.t - a.t);
      return a.v + (b.v - a.v) * (1 - Math.cos(Math.PI * f)) / 2;
    }
  }
  return null;
}

export default function Harbor() {
  const [now, setNow] = useState<ReturnType<typeof maineNow> | null>(null);
  const [tides, setTides] = useState<Tide[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const n = maineNow();
    const begin = new Date(Date.UTC(n.y, n.m - 1, n.d - 1));
    const ymd = `${begin.getUTCFullYear()}${String(begin.getUTCMonth() + 1).padStart(2, "0")}${String(begin.getUTCDate()).padStart(2, "0")}`;
    const url =
      "https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?product=predictions&application=bass_harbor_concept" +
      `&begin_date=${ymd}&range=72&datum=MLLW&station=${STATION}&time_zone=lst_ldt&units=english&interval=hilo&format=json`;
    const today0 = Date.UTC(n.y, n.m - 1, n.d);
    const ctrl = new AbortController();
    fetch(url, { signal: ctrl.signal })
      .then((r) => r.json())
      .then((j: { predictions?: { t: string; v: string; type: "H" | "L" }[] }) => {
        if (!j.predictions?.length) throw new Error("no data");
        setTides(
          j.predictions.map((p) => {
            const [date, time] = p.t.split(" ");
            const [yy, mm, dd] = date.split("-").map(Number);
            const [hh, mi] = time.split(":").map(Number);
            return { t: (Date.UTC(yy, mm - 1, dd) - today0) / 60000 + hh * 60 + mi, v: Number(p.v), type: p.type };
          }),
        );
        setNow(n);
      })
      .catch((e) => {
        if (e?.name !== "AbortError") {
          setFailed(true);
          setNow(n);
        }
      });
    return () => ctrl.abort();
  }, []);

  const sunset = now ? sunsetMaine(now.y, now.m, now.d) : null;
  const next = tides && now ? tides.filter((x) => x.t > now.min).slice(0, 2) : [];
  const todays = tides ? tides.filter((x) => x.t >= 0 && x.t < 1440) : [];
  const range = todays.length ? Math.max(...todays.map((x) => x.v)) - Math.min(...todays.map((x) => x.v)) : null;
  const level = tides && now ? heightAt(tides, now.min) : null;
  const rising = next[0]?.type === "H";

  // The day's curve, midnight to midnight.
  const W = 600, H = 120, PAD = 10;
  const vs = tides ? tides.map((x) => x.v) : [0, 1];
  const lo = Math.min(...vs) - 0.5, hi = Math.max(...vs) + 0.5;
  const y = (v: number) => PAD + (H - PAD * 2) * (1 - (v - lo) / (hi - lo));
  const x = (t: number) => (t / 1440) * W;
  let path = "";
  if (tides) {
    const pts: string[] = [];
    for (let t = 0; t <= 1440; t += 10) {
      const h = heightAt(tides, t);
      if (h !== null) pts.push(`${x(t).toFixed(1)},${y(h).toFixed(1)}`);
    }
    path = pts.length ? `M${pts.join(" L")}` : "";
  }

  return (
    <div className="harbor-today" aria-live="polite">
      <div className="ht-tide">
        <p className="ht-label">Tide at Bass Harbor</p>
        {failed ? (
          <p className="ht-big">
            <a href={STATION_URL}>Today&rsquo;s tides from NOAA</a>
          </p>
        ) : !tides || !now ? (
          <p className="ht-big ht-wait">Reading the tide table…</p>
        ) : (
          <>
            <p className="ht-big">
              {rising ? "Coming in" : "Going out"}
              {level !== null && <small> · about {level.toFixed(1)} ft now</small>}
            </p>
            <p className="ht-next">
              {next.map((t) => (
                <span key={t.t}>
                  {t.type === "H" ? "High" : "Low"} {clock(t.t)}
                  {t.t >= 1440 ? " tomorrow" : ""}
                </span>
              ))}
            </p>
            {path && (
              <svg className="ht-curve" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" role="img" aria-label={`Today's tide curve${range ? `, a range of about ${range.toFixed(1)} feet` : ""}`}>
                <path d={`${path} L${W},${H} L0,${H} Z`} className="ht-water" />
                <path d={path} className="ht-line" />
                {level !== null && <circle cx={x(now.min)} cy={y(level)} r="6" className="ht-now" />}
                {sunset !== null && <line x1={x(sunset)} x2={x(sunset)} y1="0" y2={H} className="ht-sunset" />}
              </svg>
            )}
            <p className="ht-fine">
              {range !== null && <>Today&rsquo;s range is about {range.toFixed(0)} feet. </>}
              Launch your kayak with the tide. Predictions: <a href={STATION_URL}>NOAA station {STATION}</a>.
            </p>
          </>
        )}
      </div>
      <div className="ht-sun">
        <p className="ht-label">Sunset tonight</p>
        <p className="ht-big">{sunset !== null ? clock(sunset) : "…"}</p>
        <p className="ht-fine">Worked out for the harbor&rsquo;s coordinates. Guests watch it from the porch.</p>
      </div>
    </div>
  );
}
