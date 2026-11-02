"use client";

import { useEffect, useRef } from "react";

export type DeskMock = {
  /** Window title: "Quote Desk" */
  desk: string;
  /** What arrives: the owner's busywork as it comes in. */
  inbox: readonly { kind: string; label: string }[];
  /** What the desk does with it, in order, with the desk's own times. */
  work: readonly { label: string; time: string }[];
  /** What comes back to a person. */
  out: { title: string; lines: readonly string[]; stamp: string; action: string };
  /** The month, for a sample firm. Numbers count up; the label says sample. */
  meter: readonly { n: string; label: string }[];
  meterNote: string;
  total: string;
  /** The pile, before: a photograph of the busywork and what it costs today. Swept away into the desk. */
  before?: { src: string; alt: string; title: string; line: string; /** How long the job takes by hand, "45:00". */ hand: string };
};

const COLS = 8;
const ROWS = 5;
/** The still-lifes are 2688×1520. */
const PHOTO = { w: 2688, h: 1520, focusX: 0.7, focusY: 0.5 };

const secs = (t: string) => {
  const [m, s] = t.replace(/[^\d:]/g, "").split(":").map(Number);
  return (m || 0) * 60 + (s || 0);
};

/**
 * The UnBusy desk, as a picture, and the page's one moment.
 *
 * 1. The window holds the pile: the photograph of the busywork and what it
 *    costs by hand.
 * 2. The strike through "busywork" in the headline finishes; its blue line
 *    keeps going, crosses the gap and becomes the edge that sweeps the pile
 *    out of the window.
 * 3. The desk underneath is already working: the inputs land, each step is
 *    typed in as the clock reaches its time (the clock runs at the desk's
 *    real pace, compressed to about five seconds), the quote comes back and
 *    the stamp lands on it.
 * 4. The month's numbers count up, the window settles, and the one button on
 *    the page gets a single pulse.
 *
 * "Play again" replays it. Reduced-motion shows it finished.
 */
export function DeskMockup({ mock, delay = 1200 }: { mock: DeskMock; delay?: number }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timers: ReturnType<typeof setTimeout>[] = [];
    let raf = 0;
    const hero = node.closest<HTMLElement>(".mock-hero");
    const strike = hero?.querySelector<HTMLElement>(".strike");
    const stroke = hero?.querySelector<HTMLElement>(".hero-stroke");
    const cta = hero?.querySelector<HTMLElement>('[data-cta="hero"]');

    const states = ["swept", "done", "settled", "stroking"];
    const stepEls = () => Array.from(node.querySelectorAll<HTMLElement>("[data-step]"));
    const counters = () => Array.from(node.querySelectorAll<HTMLElement>("[data-count]"));
    const timer = node.querySelector<HTMLElement>("[data-timer]");
    const hand = node.querySelector<HTMLElement>("[data-hand]");

    /* The tiles show a cover crop of the photograph, not a stretch: size and offset are measured from the window. */
    const grid = node.querySelector<HTMLElement>(".tiles");
    const layoutTiles = () => {
      if (!grid) return;
      const w = grid.clientWidth;
      const h = grid.clientHeight;
      if (!w || !h) return;
      const scale = Math.max(w / PHOTO.w, h / PHOTO.h);
      const bw = PHOTO.w * scale;
      const bh = PHOTO.h * scale;
      const ox = (w - bw) * PHOTO.focusX;
      const oy = (h - bh) * PHOTO.focusY;
      const tw = w / COLS;
      const th = h / ROWS;
      grid.querySelectorAll<HTMLElement>(".tile").forEach((tile, i) => {
        const c = i % COLS;
        const r = Math.floor(i / COLS);
        tile.style.backgroundSize = `${bw}px ${bh}px`;
        tile.style.backgroundPosition = `${ox - c * tw}px ${oy - r * th}px`;
      });
    };
    layoutTiles();
    const ro = typeof ResizeObserver !== "undefined" && grid ? new ResizeObserver(layoutTiles) : null;
    if (grid && ro) ro.observe(grid);

    const finish = () => {
      node.classList.add("swept", "done", "settled");
      stepEls().forEach((el) => el.classList.add("on"));
      counters().forEach((el) => (el.textContent = el.dataset.count ?? ""));
      if (timer) timer.textContent = mock.total;
    };

    const reset = () => {
      timers.forEach(clearTimeout);
      timers = [];
      cancelAnimationFrame(raf);
      node.classList.remove(...states);
      cta?.classList.remove("pulse");
      stroke?.removeAttribute("style");
      stepEls().forEach((el) => el.classList.remove("on"));
      // The month counts up from zero when the run reaches it; until then it reads its real value.
      counters().forEach((el) => {
        const t = el.dataset.count ?? "";
        el.textContent = `${t.match(/^[^\d]*/)?.[0] ?? ""}0${t.match(/[^\d]*$/)?.[0] ?? ""}`;
      });
      counters().forEach((el) => (el.textContent = "0"));
      if (timer) timer.textContent = "0:00";
      if (hand) hand.textContent = "0:00";
    };

    /* The strike's line continues to the window: measure the gap and draw it. */
    const drawStroke = () => {
      if (!stroke || !strike || !hero) return 0;
      const h = hero.getBoundingClientRect();
      const s = strike.getBoundingClientRect();
      const w = node.getBoundingClientRect();
      if (w.left <= s.right) return 0; // phones: the window is below the copy; no stroke
      const y = s.top + s.height * 0.54 - h.top;
      stroke.style.top = `${y}px`;
      stroke.style.left = `${s.right - h.left - 4}px`;
      stroke.style.width = `${w.left - s.right + 4}px`;
      node.classList.add("stroking");
      return 260;
    };

    const play = () => {
      reset();
      let at = 0;

      // 1. The pile holds. A clock runs up to what the job takes by hand, so the cost is felt before it goes.
      if (mock.before) {
        const hold = 3000;
        const handTotal = secs(mock.before.hand);
        const handTick = (now: number, start: number) => {
          const p = Math.min(1, Math.max(0, (now - start) / 2200));
          const sec = Math.round(handTotal * (1 - Math.pow(1 - p, 2)));
          if (hand) hand.textContent = `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;
          if (p < 1) raf = requestAnimationFrame((n) => handTick(n, start));
        };
        timers.push(setTimeout(() => (raf = requestAnimationFrame((n) => handTick(n, n))), 300));
        // Then the strike's stroke arrives and the paperwork is struck off: the tiles flip away in a wave behind it.
        timers.push(
          setTimeout(() => {
            const travel = drawStroke();
            timers.push(setTimeout(() => node.classList.add("swept"), travel));
          }, hold),
        );
        at = hold + 260 + 700; // stroke travel + most of the wave
      }

      // 2. The inputs land, quickly.
      const inbox = stepEls().filter((el) => el.dataset.step === "in");
      inbox.forEach((el, i) => {
        const when = at + 120 + i * 170;
        timers.push(setTimeout(() => el.classList.add("on"), when));
      });
      at += 120 + inbox.length * 170 + 200;

      // 3. The desk works: the clock runs at the desk's pace, compressed to ~4.8 s; each step types in when the clock reaches it.
      const work = stepEls().filter((el) => el.dataset.step === "do");
      const total = secs(mock.total);
      const span = 4800;
      let acc = 0;
      const workStart = at;
      work.forEach((el, i) => {
        acc += secs(mock.work[i]?.time ?? "0:00");
        const when = workStart + Math.round((acc / Math.max(1, total)) * span);
        timers.push(setTimeout(() => el.classList.add("on"), when));
      });
      const tick = (now: number, start: number) => {
        const p = Math.min(1, Math.max(0, (now - start) / span));
        const sec = Math.round(total * p);
        if (timer) timer.textContent = `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;
        if (p < 1) raf = requestAnimationFrame((n) => tick(n, start));
      };
      timers.push(setTimeout(() => (raf = requestAnimationFrame((n) => tick(n, n))), workStart));
      at = workStart + span;

      // 4. The quote comes back; the stamp lands.
      const out = stepEls().filter((el) => el.dataset.step === "out");
      out.forEach((el) => timers.push(setTimeout(() => el.classList.add("on"), at + 250)));
      at += 250 + 700;

      // 5. The month counts up; the window settles; the button pulses once.
      timers.push(
        setTimeout(() => {
          counters().forEach((el) => {
            const target = el.dataset.count ?? "0";
            const num = Number(target.replace(/[^\d.]/g, ""));
            const prefix = target.match(/^[^\d]*/)?.[0] ?? "";
            const suffix = target.match(/[^\d]*$/)?.[0] ?? "";
            const start = performance.now();
            const run = (now: number) => {
              const p = Math.min(1, Math.max(0, (now - start) / 1000));
              const v = Math.round(num * (1 - Math.pow(1 - p, 3)));
              el.textContent = `${prefix}${v.toLocaleString()}${suffix}`;
              if (p < 1) requestAnimationFrame(run);
            };
            requestAnimationFrame(run);
          });
          node.classList.add("done");
        }, at),
      );
      timers.push(
        setTimeout(() => {
          node.classList.add("settled");
          cta?.classList.add("pulse");
        }, at + 1100),
      );
    };

    let seen: IntersectionObserver | null = null;
    if (reduced) finish();
    else {
      // Start when the mockup is on screen: on phones it sits below the headline.
      seen = new IntersectionObserver(
        ([e]) => {
          if (!e.isIntersecting) return;
          seen?.disconnect();
          timers.push(setTimeout(play, Math.max(0, delay - 700)));
        },
        { threshold: 0.35 },
      );
      seen.observe(node);
    }

    const replay = node.querySelector<HTMLButtonElement>("[data-replay]");
    const onReplay = () => (reduced ? finish() : play());
    replay?.addEventListener("click", onReplay);
    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
      replay?.removeEventListener("click", onReplay);
      ro?.disconnect();
      seen?.disconnect();
    };
  }, [mock, delay]);

  return (
    <div className="mock" ref={root} role="region" aria-label={`A sample ${mock.desk} run`}>
      <div className="mock-bar">
        <span className="mock-mark" aria-hidden>
          <span className="mock-u">Un</span>
          <span className="mock-dot" />
        </span>
        <span className="mock-title">{mock.desk}</span>
        <span className="mock-sample">Sample firm, sample job</span>
        <button type="button" className="mock-replay" data-replay>
          Play again
        </button>
      </div>
      {mock.before && (
        <div className="mock-before" aria-hidden>
          {/* The photograph as a grid of tiles, so it can be struck off piece by piece. */}
          <div className="tiles">
            {Array.from({ length: COLS * ROWS }, (_, i) => {
              const c = i % COLS;
              const r = Math.floor(i / COLS);
              return (
                <span
                  className="tile"
                  key={i}
                  style={{
                    backgroundImage: `url(${mock.before!.src})`,
                    transitionDelay: `${c * 55 + r * 22}ms`,
                  }}
                />
              );
            })}
          </div>
          <div className="mock-before-cap">
            <b>{mock.before.title}</b>
            <span>{mock.before.line}</span>
          </div>
          <div className="mock-hand">
            <span>By hand</span>
            <b className="num" data-hand>0:00</b>
          </div>
        </div>
      )}
      <div className="mock-cols">
        <div className="mock-col in">
          <div className="mock-h">What came in</div>
          <ul>
            {mock.inbox.map((item) => (
              <li key={item.label} data-step="in">
                <span className="kind">{item.kind}</span>
                <span className="typed">{item.label}</span>
              </li>
            ))}
          </ul>
          <div className="mock-foot">Nobody retyped any of it.</div>
        </div>
        <div className="mock-col do">
          <div className="mock-h">
            What the desk did{" "}
            <span className="timer num" data-timer>
              0:00
            </span>
          </div>
          <ul>
            {mock.work.map((step) => (
              <li key={step.label} data-step="do">
                <span className="tick" aria-hidden />
                <span>
                  <span className="typed">{step.label}</span>
                </span>
                <span className="t num">{step.time}</span>
              </li>
            ))}
          </ul>
          <div className="mock-foot">Staff hours: 0</div>
        </div>
        <div className="mock-col out">
          <div className="mock-h">What came back to you</div>
          <div className="paper" data-step="out">
            <div className="paper-title">{mock.out.title}</div>
            {mock.out.lines.map((line) => (
              <div className="paper-line" key={line}>
                {line}
              </div>
            ))}
            <span className="stamp">{mock.out.stamp}</span>
            <span className="btn ink mock-approve">
              {mock.out.action} <span className="dot" />
            </span>
          </div>
          <div className="meter">
            <div className="mock-h">This month, sample firm</div>
            {mock.meter.map((m) => (
              <div className="m" key={m.label}>
                <b className="num" data-count={m.n}>
                  {m.n}
                </b>
                <span>{m.label}</span>
              </div>
            ))}
            <div className="mock-foot">{mock.meterNote}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
