/**
 * Posts a preview lead to SKOX's contact API, tagged `preview:<slug>` so it
 * lands with Reiss and never with the business. Throws on any failure so the
 * caller can show its own fallback.
 */
export async function sendPreviewLead(
  slug: string,
  lead: { name: string; email: string; company: string; message: string; projectType: string },
) {
  const r = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: lead.name,
      email: lead.email,
      company: lead.company,
      broken: lead.message,
      timeline: `preview:${slug}`,
      projectType: lead.projectType,
    }),
    signal: AbortSignal.timeout(15000),
  });
  if (!r.ok) throw new Error("bad");
}

export const money = (n: number) => "$" + n.toLocaleString("en-US");
