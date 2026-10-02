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
    const q = new URLSearchParams(window.location.search);
    // A tagged link is a new campaign touch and wins; an untagged page keeps
    // whatever this visit already arrived with.
    const tagged = PARAMS.some((p) => q.has(p));
    if (sessionStorage.getItem(KEY) && !tagged) return;
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

/**
 * The visitor's path to the enquiry, beyond this visit's campaign tags.
 *
 * First touch persists in localStorage, so a lead who found us through an ad
 * three weeks ago and came back by typing the address is still credited to the
 * ad. Nothing here identifies a person; it rides along only with an enquiry
 * they choose to send.
 */
export type Journey = {
  firstTouch?: Attribution & { at?: string };
  visits?: number;
  /** Pages viewed this visit, in order, most recent last. */
  pages?: string[];
  /** Seconds from the first page of this visit to now. */
  secondsOnSite?: number;
  /** Shared by the browser pixel and the server event so Meta counts one lead. */
  eventId?: string;
};

const FIRST = "skox:first-touch";
const VISITS = "skox:visits";
const PAGES = "skox:pages";
const STARTED = "skox:visit-started";
const EVENT_ID = "skox:lead-event-id";
const FIRST_TOUCH_DAYS = 90;

/** Called on every route change. */
export function recordPage(path: string): void {
  try {
    if (!sessionStorage.getItem(STARTED)) {
      sessionStorage.setItem(STARTED, String(Date.now()));
      localStorage.setItem(VISITS, String(Number(localStorage.getItem(VISITS) ?? 0) + 1));
    }
    const first = JSON.parse(localStorage.getItem(FIRST) ?? "null") as
      | (Attribution & { at?: string })
      | null;
    const stale =
      first?.at && Date.now() - Date.parse(first.at) > FIRST_TOUCH_DAYS * 864e5;
    if (!first || stale) {
      localStorage.setItem(
        FIRST,
        JSON.stringify({ ...readAttribution(), at: new Date().toISOString() }),
      );
    }
    const pages = JSON.parse(sessionStorage.getItem(PAGES) ?? "[]") as string[];
    if (pages[pages.length - 1] !== path) pages.push(path.slice(0, 100));
    sessionStorage.setItem(PAGES, JSON.stringify(pages.slice(-30)));
  } catch {
    /* private mode — the lead arrives with less context, nothing breaks */
  }
}

/** One id per visit, reused by every lead event in it. */
export function leadEventId(): string {
  try {
    let id = sessionStorage.getItem(EVENT_ID);
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem(EVENT_ID, id);
    }
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

export function readJourney(): Journey {
  try {
    const started = Number(sessionStorage.getItem(STARTED) ?? 0);
    return {
      firstTouch: JSON.parse(localStorage.getItem(FIRST) ?? "null") ?? undefined,
      visits: Number(localStorage.getItem(VISITS) ?? 0) || undefined,
      pages: JSON.parse(sessionStorage.getItem(PAGES) ?? "[]"),
      secondsOnSite: started ? Math.round((Date.now() - started) / 1000) : undefined,
      eventId: leadEventId(),
    };
  } catch {
    return {};
  }
}
