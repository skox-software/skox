"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { track } from "@vercel/analytics";
import { Section, SectionHead } from "@/components/Section";
import { calculator } from "@/content/site";
import { clampField, computeLeak, money } from "@/lib/leak";

export const LEAK_KEY = "skox:leak";

const motionQuery = {
  subscribe(cb: () => void) {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener("change", cb);
    return () => mq.removeEventListener("change", cb);
  },
  get: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
};

function usePrefersReducedMotion() {
  return useSyncExternalStore(motionQuery.subscribe, motionQuery.get, () => false);
}

/** Counts to a target without ever showing NaN. */
function useCountUp(target: number) {
  const reduced = usePrefersReducedMotion();
  const [n, setN] = useState(target);
  const raf = useRef<number | undefined>(undefined);
  const from = useRef(target);

  useEffect(() => {
    if (reduced || !Number.isFinite(target)) {
      from.current = target;
      return;
    }
    const start = performance.now();
    const a = from.current;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 520);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(a + (target - a) * eased);
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else from.current = target;
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      from.current = target;
    };
  }, [target, reduced]);

  return reduced ? target : n;
}

export function LeakCalculator() {
  const [missed, setMissed] = useState<number>(calculator.defaults.missed);
  const [value, setValue] = useState<number>(calculator.defaults.value);
  const [close, setClose] = useState<number>(calculator.defaults.close);

  const result = useMemo(
    () => computeLeak({ missedPerWeek: missed, avgValue: value, closeRate: close }),
    [missed, value, close],
  );

  const monthly = useCountUp(result.monthly);
  const annual = useCountUp(result.annual);

  /* Fire once when someone actually moves a control — not on the default state. */
  const engaged = useRef(false);
  useEffect(() => {
    if (engaged.current) return;
    if (missed === calculator.defaults.missed && value === calculator.defaults.value && close === calculator.defaults.close) return;
    engaged.current = true;
    track("calculator_used");
  }, [missed, value, close]);

  /* Hand the number to the form, so a lead arrives pre-qualified. */
  useEffect(() => {
    try {
      sessionStorage.setItem(
        LEAK_KEY,
        `${money(result.monthly)}/mo · ${money(result.annual)}/yr (${missed} missed/wk, ${money(value)} avg, ${close}% close)`,
      );
    } catch {
      /* private mode — the calculator still works, the lead just arrives without it */
    }
  }, [result, missed, value, close]);

  const fields = [
    { ...calculator.fields.missed, v: missed, set: setMissed, key: "missedPerWeek" as const, min: 0, max: 100, step: 1 },
    { ...calculator.fields.value, v: value, set: setValue, key: "avgValue" as const, min: 0, max: 20000, step: 50 },
    { ...calculator.fields.close, v: close, set: setClose, key: "closeRate" as const, min: 0, max: 100, step: 1 },
  ];

  return (
    <Section id="cost">
      <SectionHead kicker={calculator.kicker} headline={calculator.headline} sub={calculator.sub} />

      <div className="mt-14 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-px" style={{ background: "var(--line)" }}>
        <div className="reveal p-8 sm:p-10 space-y-8" style={{ background: "var(--surface)" }}>
          {fields.map((f) => (
            <div key={f.key}>
              <label htmlFor={f.key} className="block text-[14px] font-[450] mb-3" style={{ color: "var(--text)" }}>
                {f.label}
              </label>
              <div className="flex items-center gap-4">
                <input
                  id={f.key}
                  type="range"
                  min={f.min}
                  max={f.max}
                  step={f.step}
                  value={f.v}
                  onChange={(e) => f.set(clampField(e.target.value, f.key))}
                  className="flex-1 h-1 appearance-none rounded-full bg-[var(--line)] accent-[var(--color-amber)] cursor-pointer"
                />
                <div className="flex items-baseline gap-1 min-w-[104px] justify-end">
                  {"prefix" in f && f.prefix && (
                    <span className="font-mono text-[15px]" style={{ color: "var(--text-dim)" }}>
                      {f.prefix}
                    </span>
                  )}
                  <input
                    type="number"
                    aria-label={f.label}
                    value={f.v}
                    min={f.min}
                    max={f.max}
                    onChange={(e) => f.set(clampField(e.target.value, f.key))}
                    className="w-[76px] bg-transparent font-mono text-[19px] tabular-nums text-right outline-none border-b focus:border-[var(--color-amber)] transition-colors"
                    style={{ color: "var(--text)", borderColor: "var(--line)" }}
                  />
                  {"suffix" in f && f.suffix && (
                    <span className="font-mono text-[12px]" style={{ color: "var(--text-dim)" }}>
                      {f.suffix === "%" ? "%" : ""}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          <p className="text-[13px] leading-[1.6] pt-2" style={{ color: "var(--text-dim)" }}>
            {calculator.footnote}
          </p>
        </div>

        <div className="reveal p-8 sm:p-10 flex flex-col justify-center bg-[var(--color-pitch)] relative overflow-hidden">
          <div className="grain absolute inset-0 opacity-60 pointer-events-none" />
          <div className="relative" aria-live="polite">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">Walking past you, monthly</p>
            <p className="mt-3 font-mono text-[40px] sm:text-[56px] leading-none tabular-nums text-[var(--color-amber)]">
              {money(monthly)}
            </p>
            <div className="mt-8 pt-8 border-t border-white/12 grid grid-cols-2 gap-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">Per year</p>
                <p className="mt-2 font-mono text-[22px] tabular-nums text-white">{money(annual)}</p>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">Customers lost/mo</p>
                <p className="mt-2 font-mono text-[22px] tabular-nums text-white">{result.lostCustomers}</p>
              </div>
            </div>
            <p className="mt-8 text-[15px] leading-[1.55] text-white/75">{calculator.payoff}</p>
            <p className="mt-3 text-[14px] leading-[1.55] text-white/50">{calculator.priceBand}</p>
            <a
              href="#scope"
              className="chamfer mt-7 h-[51px] px-[27px] inline-flex items-center bg-[#E9E9E9] text-[#0A0707] text-[15.5px] font-[450] transition-opacity hover:opacity-90"
            >
              {calculator.cta}
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
