import { createHash } from "node:crypto";
import type { Visitor } from "@/lib/visitor";

const sha = (v: string) => createHash("sha256").update(v.trim().toLowerCase()).digest("hex");

/**
 * The server half of Meta's Lead event. Browsers block the pixel often enough
 * that Meta's optimisation starves without this; the shared event id means a
 * lead seen by both is counted once. Contact details are hashed before sending.
 * Off until both the pixel ID and a Conversions API token are set.
 */
export async function sendMetaLead(
  req: Request,
  lead: { email: string; name?: string; projectType?: string },
  visitor: Visitor,
): Promise<void> {
  const pixel = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CAPI_TOKEN;
  if (!pixel || !token) return;
  // Same opt-out the browser tag honours.
  if (req.headers.get("sec-gpc") === "1") return;

  const [first, ...rest] = (lead.name ?? "").trim().split(/\s+/);
  const cookies = Object.fromEntries(
    (req.headers.get("cookie") ?? "").split(/;\s*/).map((c) => {
      const i = c.indexOf("=");
      return [c.slice(0, i), c.slice(i + 1)];
    }),
  );
  const user_data: Record<string, unknown> = {
    em: [sha(lead.email)],
    client_ip_address: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
    client_user_agent: req.headers.get("user-agent") ?? undefined,
    fbp: cookies._fbp,
    fbc: cookies._fbc,
  };
  if (first) user_data.fn = [sha(first)];
  if (rest.length) user_data.ln = [sha(rest.join(" "))];
  if (visitor.city) user_data.ct = [sha(visitor.city.replace(/\s+/g, ""))];
  if (visitor.region) user_data.st = [sha(visitor.region)];
  if (visitor.country) user_data.country = [sha(visitor.country)];

  try {
    await fetch(`https://graph.facebook.com/v21.0/${pixel}/events?access_token=${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(4000),
      body: JSON.stringify({
        data: [
          {
            event_name: "Lead",
            event_time: Math.floor(Date.now() / 1000),
            event_id: visitor.journey.eventId,
            action_source: "website",
            event_source_url: req.headers.get("referer") ?? undefined,
            user_data,
            custom_data: { content_category: lead.projectType },
          },
        ],
      }),
    });
  } catch {
    /* a missed ad signal never costs a lead */
  }
}
