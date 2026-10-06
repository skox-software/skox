import { NextResponse } from "next/server";
import {
  formatScorecard,
  scorecardEmail,
  validateScorecard,
  type ScorecardRequest,
} from "@/lib/scorecard";
import { enrichCompany, formatCompany } from "@/lib/enrich";
import { formatVisitor, readVisitor } from "@/lib/visitor";

export const runtime = "nodejs";

/**
 * Scorecard downloads.
 *
 * Sends the visitor the link they asked for, then tells the founders who
 * downloaded it. Only `delivered: true` lets the browser count a download,
 * so a broken mail provider never inflates the numbers. The page still hands
 * the file over either way: nobody is punished for our outage.
 */

const hits = new Map<string, number[]>();
const WINDOW = 60_000;
const MAX = 5;

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX;
}

const SITE = "https://www.skoxsoftware.com";

async function send(key: string, payload: Record<string, unknown>): Promise<boolean> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      signal: AbortSignal.timeout(10000),
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: Partial<ScorecardRequest>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  // Honeypot: bots fill it, people never see it. Accept silently, send nothing.
  if (body.website) return NextResponse.json({ ok: true });

  const errors = validateScorecard(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const request: ScorecardRequest = {
    email: String(body.email).trim(),
    name: body.name ? String(body.name).trim().slice(0, 120) : undefined,
    locations: body.locations || undefined,
    attribution: body.attribution ? String(body.attribution).slice(0, 800) : undefined,
  };

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error(`[SKOX SCORECARD — NO MAIL PROVIDER CONFIGURED] ${request.email}`);
    return NextResponse.json({ ok: false, error: "no_mail_provider" }, { status: 503 });
  }

  const from = process.env.LEAD_FROM_EMAIL ?? "SKOX <onboarding@resend.dev>";
  const founders = process.env.CONTACT_EMAIL ?? "founder@skoxsoftware.com";

  // 1. The thing they asked for. This is the delivery that counts.
  const delivered = await send(key, {
    from,
    to: [request.email],
    reply_to: founders,
    subject: "Your Monday Locations Scorecard",
    text: scorecardEmail(SITE, request.name),
  });
  if (!delivered) {
    console.error(`[SKOX SCORECARD — DELIVERY FAILED] ${request.email}`);
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  // 2. Tell the founders. A failure here is logged and never undoes the delivery.
  const visitor = readVisitor(req, body.context);
  const company = await enrichCompany(request.email);
  const sentToUs = await send(key, {
    from,
    to: [founders],
    reply_to: request.email,
    subject: `Scorecard download — ${company?.name || request.email}`,
    text: formatScorecard(request) + formatCompany(company, request.email) + formatVisitor(visitor),
  });
  if (!sentToUs) console.error(`[SKOX SCORECARD — FOUNDER NOTICE FAILED] ${request.email}`);

  return NextResponse.json({ ok: true, delivered: true });
}
