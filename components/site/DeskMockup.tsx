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
};

/**
 * The UnBusy desk, as a picture: the busywork comes in on the left, the desk
 * works through it in the middle, the finished job and the month's numbers
 * come out on the right. Plays once on load after the strike; "Play again"
 * replays it. Reduced-motion shows it finished. Everything on it is sample
 * data and says so.
 */
export function DeskMockup({ mock, delay = 1200 }: { mock: DeskMock; delay?: number }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timers: ReturnType<typeof setTimeout>[] = [];
    let raf = 0;

    const finish = () => {
      node.classList.add("done");
      node.querySelectorAll<HTMLElement>("[data-step]").forEach((el) => el.classList.add("on"));
      node.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => (el.textContent = el.dataset.count ?? ""));
      const t = node.querySelector<HTMLElement>("[data-timer]");
      if (t) t.textContent = mock.total;
    };

    const play = () => {
      timers.forEach(clearTimeout);
      timers = [];
      cancelAnimationFrame(raf);
      node.classList.remove("done");
      node.querySelectorAll<HTMLElement>("[data-step]").forEach((el) => el.classList.remove("on"));
      node.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => (el.textContent = "0"));
      const steps = Array.from(node.querySelectorAll<HTMLElement>("[data-step]"));
      // Step timing: inbox items 220ms apart, then the desk's lines 480ms apart, then the output.
      let at = 200;
      steps.forEach((el) => {
        const gap = Number(el.dataset.step);
        at += gap;
        const when = at;
        timers.push(setTimeout(() => el.classList.add("on"), when));
      });
      // The timer runs while the desk works.
      const timer = node.querySelector<HTMLElement>("[data-timer]");
      const workStart = 200 + mock.inbox.length * 220 + 200;
      const workEnd = at;
      const [m, s] = mock.total.replace(/[^\d:]/g, "").split(":").map(Number);
      const totalSec = (m || 0) * 60 + (s || 0);
      const tick = (now: number, start: number) => {
        const p = Math.min(1, Math.max(0, (now - start) / Math.max(1, workEnd - workStart)));
        const sec = Math.round(totalSec * p);
        if (timer) timer.textContent = `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;
        if (p < 1) raf = requestAnimationFrame((n) => tick(n, start));
      };
      timers.push(setTimeout(() => (raf = requestAnimationFrame((n) => tick(n, n))), workStart));
      // The month's numbers count up at the end.
      timers.push(
        setTimeout(() => {
          node.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
            const target = el.dataset.count ?? "0";
            const num = Number(target.replace(/[^\d.]/g, ""));
            const prefix = target.match(/^[^\d]*/)?.[0] ?? "";
            const suffix = target.match(/[^\d]*$/)?.[0] ?? "";
            const start = performance.now();
            const run = (now: number) => {
              const p = Math.min(1, Math.max(0, (now - start) / 900));
              const v = Math.round(num * (1 - Math.pow(1 - p, 3)));
              el.textContent = `${prefix}${v.toLocaleString()}${suffix}`;
              if (p < 1) requestAnimationFrame(run);
            };
            requestAnimationFrame(run);
          });
          node.classList.add("done");
        }, at + 500),
      );
    };

    if (reduced) finish();
    else timers.push(setTimeout(play, delay));

    const replay = node.querySelector<HTMLButtonElement>("[data-replay]");
    const onReplay = () => (reduced ? finish() : play());
    replay?.addEventListener("click", onReplay);
    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
      replay?.removeEventListener("click", onReplay);
    };
  }, [mock, delay]);

  return (
    <div className="mock" ref={root} aria-label={`A sample ${mock.desk} run`}>
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
      <div className="mock-cols">
        <div className="mock-col in">
          <div className="mock-h">What came in</div>
          <ul>
            {mock.inbox.map((item) => (
              <li key={item.label} data-step="220">
                <span className="kind">{item.kind}</span>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
          <div className="mock-foot">Nobody retyped any of it.</div>
        </div>
        <div className="mock-col do">
          <div className="mock-h">
            What the desk did <span className="timer num" data-timer>0:00</span>
          </div>
          <ul>
            {mock.work.map((step, i) => (
              <li key={step.label} data-step={i === 0 ? "420" : "480"}>
                <span className="tick" aria-hidden />
                <span>{step.label}</span>
                <span className="t num">{step.time}</span>
              </li>
            ))}
          </ul>
          <div className="mock-foot">Staff hours: 0</div>
        </div>
        <div className="mock-col out">
          <div className="mock-h">What came back to you</div>
          <div className="paper" data-step="600">
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
                  0
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
