import { NextResponse } from "next/server";
import { formatLead, validate, type Lead } from "@/lib/leads";
import { enrichCompany, formatCompany } from "@/lib/enrich";
import { sendMetaLead } from "@/lib/meta-capi";
import { sendToPortal } from "@/lib/portal";
import { formatVisitor, readVisitor } from "@/lib/visitor";

export const runtime = "nodejs";

/* Small in-memory limiter. Resets on redeploy, which is fine for this volume. */
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

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 },
    );
  }

  let body: Partial<Lead>;
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

  const errors = validate(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const lead: Lead = {
    name: String(body.name).trim(),
    email: String(body.email).trim(),
    company: String(body.company ?? "").trim(),
    broken: String(body.broken).trim(),
    timeline: String(body.timeline ?? "").trim(),
    projectType: body.projectType || undefined,
    leak: body.leak ? String(body.leak).slice(0, 300) : undefined,
    attribution: body.attribution
      ? String(body.attribution).slice(0, 800)
      : undefined,
  };

  const visitor = readVisitor(req, body.context);
  const company = await enrichCompany(lead.email);

  const to = process.env.CONTACT_EMAIL ?? "founder@skoxsoftware.com";
  const key = process.env.RESEND_API_KEY;
  const text =
    formatLead(lead) + formatCompany(company, lead.email) + formatVisitor(visitor);

  if (!key) {
    // No mail provider configured. Log it so it is recoverable, then FAIL LOUDLY.
    //
    // Returning ok:true here was a real trap: the client fires its `scope_request`
    // conversion event on a 200, so the analytics dashboard would report healthy
    // conversions while nothing reached an inbox — and spend would be scaled on
    // the strength of a number that meant nothing. A non-200 makes the form show
    // its mailto: fallback instead, which preserves what the visitor typed.
    console.error(
      `[SKOX LEAD — NO MAIL PROVIDER CONFIGURED] ${new Date().toISOString()}\n${text}\n`,
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
        reply_to: lead.email,
        subject: `Scope request — ${lead.company || company?.name || lead.name}`,
        text,
      }),
    });
  } catch {
    console.error(`[SKOX LEAD — PROVIDER UNAVAILABLE]\n${text}\n`);
    return NextResponse.json(
      { ok: false, error: "delivery_failed" },
      { status: 502 },
    );
  }

  if (!res.ok) {
    // Log it too, so a provider outage can't silently eat a real lead.
    console.error(`[SKOX LEAD — DELIVERY FAILED ${res.status}]\n${text}\n`);
    return NextResponse.json(
      { ok: false, error: "delivery_failed" },
      { status: 502 },
    );
  }

  // After delivery, so a portal or ad platform outage can never cost the lead.
  await Promise.all([
    sendToPortal(
      {
        status: "submitted",
        email: lead.email,
        name: lead.name,
        company: lead.company,
        projectType: lead.projectType,
        message: lead.broken,
        timeline: lead.timeline,
        attribution: lead.attribution,
      },
      visitor,
      company,
    ),
    sendMetaLead(req, lead, visitor),
  ]);

  return NextResponse.json({ ok: true, delivered: "email" });
}
