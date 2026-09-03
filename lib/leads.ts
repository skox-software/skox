/** Scoping-form validation and delivery. Shared by the client and the route. */

export type Lead = {
  name: string;
  email: string;
  company: string;
  broken: string;
  timeline: string;
  leak?: string;
  /** Honeypot — must stay empty. */
  website?: string;
};

export type FieldErrors = Partial<Record<keyof Lead, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const TIMELINES = ["This month", "This quarter", "Just exploring"] as const;

export function validate(lead: Partial<Lead>): FieldErrors {
  const e: FieldErrors = {};
  if (!lead.name?.trim()) e.name = "Required.";
  else if (lead.name.trim().length > 120) e.name = "Too long.";

  if (!lead.email?.trim()) e.email = "Required.";
  else if (!EMAIL.test(lead.email.trim())) e.email = "That doesn't look like an email address.";

  if (!lead.broken?.trim()) e.broken = "This is the one we actually need.";
  else if (lead.broken.trim().length > 4000) e.broken = "Too long — give us the short version.";

  if (lead.company && lead.company.length > 200) e.company = "Too long.";
  return e;
}

/** Plain-text body, used for the email and for the mailto: fallback. */
export function formatLead(lead: Lead): string {
  return [
    `Name:     ${lead.name}`,
    `Email:    ${lead.email}`,
    `Company:  ${lead.company || "—"}`,
    `Timeline: ${lead.timeline || "—"}`,
    lead.leak ? `Leak:     ${lead.leak}` : null,
    "",
    "What's broken:",
    lead.broken,
  ]
    .filter(Boolean)
    .join("\n");
}
