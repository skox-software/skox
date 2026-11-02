import type { Visitor } from "@/lib/visitor";

/**
 * Files every enquiry, finished or not, as a deal on the portal's Pipeline.
 *
 * Off until PORTAL_LEADS_URL and PORTAL_LEADS_SECRET are set. Runs after the
 * email has gone, and never throws: the email is the lead's record of last
 * resort, the portal is the working copy.
 */

const KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid", "referrer", "landing"] as const;
type Touch = Partial<Record<(typeof KEYS)[number], string>>;

/* The form sends this visit's tags pre-formatted for the email ("  gclid: …"). */
function parseAttribution(text: string | undefined): Touch {
  const out: Touch = {};
  for (const line of (text ?? "").split("\n")) {
    const m = line.match(/^\s*([a-z_]+):\s*(.+)$/);
    if (m && (KEYS as readonly string[]).includes(m[1])) out[m[1] as keyof Touch] = m[2].trim().slice(0, 200);
  }
  return out;
}

export type PortalLead = {
  status: "submitted";
  email: string;
  name?: string;
  company?: string;
  projectType?: string;
  message?: string;
  timeline?: string;
  /** This visit's campaign tags, as the form formatted them. */
  attribution?: string;
};

export async function sendToPortal(lead: PortalLead, visitor: Visitor): Promise<void> {
  const url = process.env.PORTAL_LEADS_URL;
  const secret = process.env.PORTAL_LEADS_SECRET;
  if (!url || !secret) return;

  const visit = parseAttribution(lead.attribution);
  const first = visitor.journey.firstTouch ?? {};
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
      signal: AbortSignal.timeout(5000),
      body: JSON.stringify({
        status: lead.status,
        email: lead.email,
        name: lead.name || undefined,
        company: lead.company || undefined,
        location: [visitor.city, visitor.region].filter(Boolean).join(", ") || undefined,
        projectType: lead.projectType,
        message: lead.message,
        timeline: lead.timeline || undefined,
        // The latest click is the one Google credits, so this visit's wins.
        gclid: visit.gclid ?? first.gclid,
        visit,
        firstTouch: first,
        pages: visitor.journey.pages,
        visits: visitor.journey.visits,
        secondsOnSite: visitor.journey.secondsOnSite,
        device: [visitor.device, visitor.browser].filter(Boolean).join(" · ") || undefined,
        leadEventId: visitor.journey.eventId,
      }),
    });
    if (!res.ok) console.error(`[SKOX LEAD — PORTAL ${res.status}] ${lead.email}`);
  } catch (err) {
    console.error(`[SKOX LEAD — PORTAL UNREACHABLE] ${lead.email}`, err);
  }
}
