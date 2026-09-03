/** Cost-of-inaction math for the calculator. Conservative by construction. */

export type LeakInput = { missedPerWeek: number; avgValue: number; closeRate: number };
export type LeakResult = { monthly: number; annual: number; lostCustomers: number };

const WEEKS_PER_MONTH = 52 / 12;

export const LIMITS = {
  missedPerWeek: { min: 0, max: 500 },
  avgValue: { min: 0, max: 250_000 },
  closeRate: { min: 0, max: 100 },
} as const;

/** Coerces anything (including NaN/Infinity/strings) into a sane number. */
export function clampField(raw: unknown, key: keyof typeof LIMITS): number {
  const n = typeof raw === "number" ? raw : Number(raw);
  if (!Number.isFinite(n)) return LIMITS[key].min;
  return Math.min(LIMITS[key].max, Math.max(LIMITS[key].min, n));
}

export function computeLeak(input: LeakInput): LeakResult {
  const missed = clampField(input.missedPerWeek, "missedPerWeek");
  const value = clampField(input.avgValue, "avgValue");
  const close = clampField(input.closeRate, "closeRate") / 100;

  const lostCustomers = missed * WEEKS_PER_MONTH * close;
  const monthly = lostCustomers * value;

  return {
    monthly: Math.round(monthly),
    annual: Math.round(monthly * 12),
    lostCustomers: Math.round(lostCustomers * 10) / 10,
  };
}

export function money(n: number): string {
  if (!Number.isFinite(n)) return "$0";
  return "$" + Math.round(n).toLocaleString("en-US");
}
