/** Scoping-form validation and delivery. Shared by the client and the route. */

export type Lead = {
  /** Campaign attribution, serialised at submit time. */
  attribution?: string;
  /** The visitor's journey (lib/attribution `Journey`) as JSON. */
  context?: string;
  name: string;
  email: string;
  /** The firm. */
  company: string;
  /** The busywork, in the owner's words. */
  broken: string;
  timeline: string;
  phone?: string;
  /** What the firm does, free text. */
  industry?: string;
  /** People in the office. */
  people?: string;
  /** On site or screen share. */
  format?: string;
  /** "How did you hear about us?" Optional; one of review.form.heardOptions (content/site.ts). */
  heard?: string;
  projectType?: string;
  leak?: string;
  /** Honeypot — must stay empty. */
  website?: string;
};

export type FieldErrors = Partial<Record<keyof Lead, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const TIMELINES = [
  "This month",
  "This quarter",
  "Just exploring",
] as const;

export function validate(lead: Partial<Lead>): FieldErrors {
  const e: FieldErrors = {};
  // The API is public; TypeScript types do not validate incoming JSON.
  for (const key of [
    "name",
    "email",
    "company",
    "broken",
    "timeline",
    "website",
    "projectType",
    "attribution",
    "leak",
    "context",
    "phone",
    "industry",
    "people",
    "format",
    "heard",
  ] as const) {
    if (lead[key] !== undefined && typeof lead[key] !== "string")
      e[key] = "Please enter text.";
  }
  if (Object.keys(e).length) return e;
  if (!lead.name?.trim()) e.name = "Required.";
  else if (lead.name.trim().length > 120) e.name = "Too long.";

  if (!lead.email?.trim()) e.email = "Required.";
  else if (!EMAIL.test(lead.email.trim()))
    e.email = "That doesn't look like an email address.";
  else if (lead.email.trim().length > 254) e.email = "Too long.";

  if (!lead.broken?.trim()) e.broken = "This is the one we actually need.";
  else if (lead.broken.trim().length > 4000)
    e.broken = "Too long — give us the short version.";

  if (lead.company && lead.company.length > 200) e.company = "Too long.";
  if (lead.projectType && lead.projectType.length > 120) e.projectType = "Too long.";
  if (lead.phone && lead.phone.length > 40) e.phone = "Too long.";
  if (lead.industry && lead.industry.length > 120) e.industry = "Too long.";
  if (lead.people && lead.people.length > 40) e.people = "Too long.";
  if (lead.format && lead.format.length > 40) e.format = "Too long.";
  if (lead.heard && lead.heard.length > 60) e.heard = "Too long.";
  if (lead.timeline && lead.timeline.length > 200) e.timeline = "Too long.";
  if (lead.context && lead.context.length > 6000) e.context = "Too long.";
  return e;
}

/** Plain-text body, used for the email and for the mailto: fallback. */
export function formatLead(lead: Lead): string {
  return [
    `Name:     ${lead.name}`,
    `Email:    ${lead.email}`,
    `Firm:     ${lead.company || "—"}`,
    lead.phone ? `Phone:    ${lead.phone}` : null,
    `Does:     ${lead.industry || lead.projectType || "Not specified"}`,
    lead.people ? `People:   ${lead.people}` : null,
    lead.format ? `Review:   ${lead.format}` : null,
    lead.heard ? `Heard:    ${lead.heard}` : null,
    lead.timeline ? `Timeline: ${lead.timeline}` : null,
    lead.leak ? `Leak:     ${lead.leak}` : null,
    "",
    "The busywork:",
    lead.broken,
    lead.attribution || null,
  ]
    .filter(Boolean)
    .join("\n");
}
