import type { Journey } from "@/lib/attribution";

/** What the server can say about the person behind an enquiry, without asking. */
export type Visitor = {
  journey: Journey;
  city?: string;
  region?: string;
  country?: string;
  device?: string;
  browser?: string;
};

function header(req: Request, name: string): string | undefined {
  const v = req.headers.get(name);
  if (!v) return undefined;
  try {
    return decodeURIComponent(v).slice(0, 80);
  } catch {
    return v.slice(0, 80);
  }
}

/* Whitelisted, typed copy of what the browser claims. It is public input. */
function parseJourney(raw: unknown): Journey {
  if (typeof raw !== "string") return {};
  let j: Record<string, unknown>;
  try {
    j = JSON.parse(raw);
  } catch {
    return {};
  }
  if (!j || typeof j !== "object" || Array.isArray(j)) return {};
  const str = (v: unknown, n = 200) => (typeof v === "string" ? v.slice(0, n) : undefined);
  const num = (v: unknown) =>
    typeof v === "number" && Number.isFinite(v) && v >= 0 ? Math.round(v) : undefined;
  const ft = j.firstTouch && typeof j.firstTouch === "object" ? (j.firstTouch as Record<string, unknown>) : {};
  const firstTouch = Object.fromEntries(
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid", "referrer", "landing", "at"]
      .map((k) => [k, str(ft[k])])
      .filter(([, v]) => v),
  );
  return {
    firstTouch: Object.keys(firstTouch).length ? firstTouch : undefined,
    visits: num(j.visits),
    pages: Array.isArray(j.pages)
      ? j.pages.filter((p): p is string => typeof p === "string").slice(-30).map((p) => p.slice(0, 100))
      : undefined,
    secondsOnSite: num(j.secondsOnSite),
    eventId: str(j.eventId, 64),
  };
}

function device(ua: string): { device?: string; browser?: string } {
  if (!ua) return {};
  const d = /iPad|Tablet/i.test(ua) ? "tablet" : /Mobi|iPhone|Android/i.test(ua) ? "mobile" : "desktop";
  const os = /iPhone|iPad/.test(ua) ? "iOS" : /Android/.test(ua) ? "Android" : /Mac OS X/.test(ua) ? "macOS" : /Windows/.test(ua) ? "Windows" : undefined;
  const b = /Edg\//.test(ua) ? "Edge" : /Chrome\//.test(ua) ? "Chrome" : /Safari\//.test(ua) ? "Safari" : /Firefox\//.test(ua) ? "Firefox" : undefined;
  return { device: [d, os].filter(Boolean).join(" · "), browser: b };
}

export function readVisitor(req: Request, context: unknown): Visitor {
  return {
    journey: parseJourney(context),
    // Vercel's edge sets these from the IP; locally they are simply absent.
    city: header(req, "x-vercel-ip-city"),
    region: header(req, "x-vercel-ip-country-region"),
    country: header(req, "x-vercel-ip-country"),
    ...device(req.headers.get("user-agent") ?? ""),
  };
}

export function formatVisitor(v: Visitor): string {
  const j = v.journey;
  const ft = j.firstTouch;
  const where = [v.city, v.region, v.country].filter(Boolean).join(", ");
  const firstSource = ft
    ? [ft.utm_source, ft.utm_medium, ft.utm_campaign].filter(Boolean).join(" / ") ||
      ft.referrer ||
      "direct"
    : undefined;
  const lines = [
    where && `  location: ${where}`,
    v.device && `  device: ${v.device}${v.browser ? ` (${v.browser})` : ""}`,
    j.visits && `  visits: ${j.visits}`,
    j.secondsOnSite !== undefined && `  time on site this visit: ${Math.round(j.secondsOnSite / 60)} min`,
    firstSource && `  first found us via: ${firstSource}${ft?.at ? ` on ${ft.at.slice(0, 10)}` : ""}`,
    ft?.landing && `  first landing page: ${ft.landing}`,
    j.pages?.length && `  pages this visit: ${j.pages.join(" → ")}`,
  ].filter(Boolean);
  return lines.length ? `\n\nVisitor:\n${lines.join("\n")}` : "";
}
