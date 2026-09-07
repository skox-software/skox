import { NextResponse } from "next/server";
import {
  formatPartial,
  validatePartial,
  type PartialLead,
} from "@/lib/leads";

export const runtime = "nodejs";

/**
 * Unfinished enquiries.
 *
 * Deliberately its own route rather than a flag on /api/contact. These arrive
 * without the visitor pressing anything, so they must never touch the delivered
 * lead path, never return `delivered: "email"`, and never be able to trip the
 * conversion event the client fires on a successful scope request.
 *
 * The client sends at most one of these per address per visit; the limiter here
 * is the backstop, not the mechanism.
 */

const hits = new Map<string, number[]>();
const WINDOW = 60_000;
const MAX = 4;

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 },
    );
  }

  let body: Partial<PartialLead>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  // Honeypot: bots fill it, people never see it. Accept silently, deliver nothing.
  if (body.website) return NextResponse.json({ ok: true });

  const errors = validatePartial(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const lead: PartialLead = {
    email: String(body.email).trim(),
    name: String(body.name ?? "")
      .trim()
      .slice(0, 120),
    broken: String(body.broken ?? "")
      .trim()
      .slice(0, 4000),
    projectType: body.projectType
      ? String(body.projectType).slice(0, 40)
      : undefined,
    stage: body.stage ? String(body.stage).slice(0, 40) : undefined,
    attribution: body.attribution
      ? String(body.attribution).slice(0, 800)
      : undefined,
  };

  const to = process.env.CONTACT_EMAIL ?? "snkrpickups@gmail.com";
  const key = process.env.RESEND_API_KEY;
  const text = formatPartial(lead);

  if (!key) {
    // Logged rather than surfaced: nothing on screen is waiting on this, so a
    // missing provider must stay recoverable without interrupting the visitor.
    console.error(
      `[SKOX PARTIAL — NO MAIL PROVIDER CONFIGURED] ${new Date().toISOString()}\n${text}\n`,
    );
    return NextResponse.json(
      { ok: false, error: "no_mail_provider" },
      { status: 503 },
    );
  }

  let res: Response;
  try {
    res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(10000),
      body: JSON.stringify({
        from: process.env.LEAD_FROM_EMAIL ?? "SKOX <onboarding@resend.dev>",
        to: [to],
        // No reply_to: this person did not ask to be written to, and a stray
        // reply-all should not open a thread with them by accident.
        subject: `Unfinished enquiry — ${lead.email}`,
        text,
      }),
    });
  } catch {
    console.error(`[SKOX PARTIAL — PROVIDER UNAVAILABLE]\n${text}\n`);
    return NextResponse.json(
      { ok: false, error: "delivery_failed" },
      { status: 502 },
    );
  }

  if (!res.ok) {
    console.error(`[SKOX PARTIAL — DELIVERY FAILED ${res.status}]\n${text}\n`);
    return NextResponse.json(
      { ok: false, error: "delivery_failed" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
