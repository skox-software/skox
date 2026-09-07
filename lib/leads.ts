/** Scoping-form validation and delivery. Shared by the client and the route. */

export type Lead = {
  /** Campaign attribution, serialised at submit time. */
  attribution?: string;
  name: string;
  email: string;
  company: string;
  broken: string;
  timeline: string;
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
  if (
    lead.projectType &&
    !["websites", "web-apps", "dashboards", "other"].includes(lead.projectType)
  )
    e.projectType = "Choose a build type.";
  if (lead.timeline && lead.timeline.length > 200) e.timeline = "Too long.";
  return e;
}

/** Plain-text body, used for the email and for the mailto: fallback. */
export function formatLead(lead: Lead): string {
  return [
    `Name:     ${lead.name}`,
    `Email:    ${lead.email}`,
    `Company:  ${lead.company || "—"}`,
    `Timeline: ${lead.timeline || "—"}`,
    `Build:    ${lead.projectType || "Not specified"}`,
    lead.leak ? `Leak:     ${lead.leak}` : null,
    "",
    "What's broken:",
    lead.broken,
    lead.attribution || null,
  ]
    .filter(Boolean)
    .join("\n");
}

/**
 * An enquiry that was started but never sent.
 *
 * Kept deliberately separate from `Lead`: these records are weaker evidence of
 * intent, they arrive without the visitor pressing anything, and they must never
 * be counted as conversions or mixed into the delivered-lead path.
 */
export type PartialLead = {
  email: string;
  name?: string;
  broken?: string;
  projectType?: string;
  attribution?: string;
  /** Where in the form they were when this fired. */
  stage?: string;
  /** Honeypot — must stay empty. */
  website?: string;
};

const PARTIAL_LIMITS: Record<string, number> = {
  email: 254,
  name: 120,
  broken: 4000,
  projectType: 40,
  attribution: 800,
  stage: 40,
};

/** Only the address has to be real; everything else is whatever they'd reached. */
export function validatePartial(lead: Partial<PartialLead>): FieldErrors {
  const e: FieldErrors = {};
  for (const key of Object.keys(PARTIAL_LIMITS) as (keyof PartialLead)[]) {
    if (lead[key] !== undefined && typeof lead[key] !== "string")
      e[key as keyof FieldErrors] = "Please enter text.";
  }
  if (Object.keys(e).length) return e;

  const email = lead.email?.trim();
  if (!email) e.email = "Required.";
  else if (!EMAIL.test(email))
    e.email = "That doesn't look like an email address.";
  else if (email.length > PARTIAL_LIMITS.email) e.email = "Too long.";
  return e;
}

export function formatPartial(lead: PartialLead): string {
  return [
    "This enquiry was never submitted — the form was left unfinished.",
    "Treat it as a lead to approach, not a request to reply to.",
    "",
    `Email:    ${lead.email}`,
    `Name:     ${lead.name?.trim() || "—"}`,
    `Build:    ${lead.projectType || "Not specified"}`,
    `Left at:  ${lead.stage || "unknown"}`,
    "",
    "What they'd written:",
    lead.broken?.trim() || "— nothing yet —",
    lead.attribution || null,
  ]
    .filter(Boolean)
    .join("\n");
}
