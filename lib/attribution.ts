/**
 * Campaign attribution captured at submit time.
 *
 * Without `gclid` on the record there is no way to run offline conversion import
 * later — and for a business closing one or two builds a month, that import is
 * the only mechanism by which Google ever learns what a good lead looks like.
 */
export type Attribution = Partial<Record<
  "utm_source" | "utm_medium" | "utm_campaign" | "utm_term" | "utm_content" | "gclid" | "fbclid" | "referrer" | "landing",
  string
>>;

const KEY = "skox:attribution";
const PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"] as const;

/** Stored on first load so it survives navigation within the visit. */
export function captureAttribution(): void {
  try {
    if (sessionStorage.getItem(KEY)) return;
    const q = new URLSearchParams(window.location.search);
    const found: Attribution = {};
    for (const p of PARAMS) {
      const v = q.get(p);
      if (v) found[p] = v.slice(0, 200);
    }
    if (document.referrer && !document.referrer.includes(window.location.host)) {
      found.referrer = document.referrer.slice(0, 200);
    }
    found.landing = window.location.pathname.slice(0, 100);
    sessionStorage.setItem(KEY, JSON.stringify(found));
  } catch {
    /* private mode — the lead just arrives without attribution */
  }
}

export function readAttribution(): Attribution {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? "{}") as Attribution;
  } catch {
    return {};
  }
}

export function formatAttribution(a: Attribution): string {
  const rows = Object.entries(a).filter(([, v]) => v);
  if (rows.length === 0) return "";
  return "\n\nSource:\n" + rows.map(([k, v]) => `  ${k}: ${v}`).join("\n");
}
