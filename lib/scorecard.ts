/**
 * The free Monday Locations Scorecard: the lead magnet behind /scorecard.
 * Shared by the form and the route, like lib/leads.ts is for enquiries.
 *
 * A download is not an enquiry. It never touches /api/contact, never fires
 * `scope_request`, and never counts as a Google Ads lead. It is its own,
 * lower-intent event: `scorecard_download`.
 */

export const SCORECARD_FILE = "/downloads/SKOX-Monday-Locations-Scorecard.xlsx";

/** Bucketed so the form is one tap, and so it reads as a qualifier at a glance. */
export const LOCATION_OPTIONS = ["Just one", "2–3", "4–10", "11+"] as const;

export type ScorecardRequest = {
  email: string;
  name?: string;
  locations?: string;
  /** This visit's campaign tags, pre-formatted (lib/attribution). */
  attribution?: string;
  /** The visitor's journey as JSON (lib/attribution `Journey`). */
  context?: string;
  /** Honeypot: must stay empty. */
  website?: string;
};

export type ScorecardErrors = Partial<Record<keyof ScorecardRequest, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateScorecard(req: Partial<ScorecardRequest>): ScorecardErrors {
  const e: ScorecardErrors = {};
  // The API is public; TypeScript types do not validate incoming JSON.
  for (const key of ["email", "name", "locations", "attribution", "context", "website"] as const) {
    if (req[key] !== undefined && typeof req[key] !== "string") e[key] = "Please enter text.";
  }
  if (Object.keys(e).length) return e;

  const email = req.email?.trim() ?? "";
  if (!email) e.email = "Required, so we can send it to you.";
  else if (email.length > 254 || !EMAIL.test(email)) e.email = "That doesn't look like an email address.";

  if (req.name && req.name.trim().length > 120) e.name = "Too long.";
  if (req.locations && !(LOCATION_OPTIONS as readonly string[]).includes(req.locations))
    e.locations = "Pick one of the options.";
  return e;
}

export function formatScorecard(req: ScorecardRequest): string {
  return [
    "Someone downloaded the Monday Locations Scorecard.",
    "",
    `Email:     ${req.email}`,
    `Name:      ${req.name || "(not given)"}`,
    `Locations: ${req.locations || "(not given)"}`,
    "",
    "This is a template download, not an enquiry. One personal note from a",
    "founder is fine (the page says so). No sequence, no newsletter.",
    req.attribution ? `\nCampaign:\n${req.attribution}` : "",
  ].join("\n");
}

/** The email the visitor asked for: the link, and nothing they didn't ask for. */
export function scorecardEmail(siteUrl: string, name?: string): string {
  const hi = name?.trim() ? `Hi ${name.trim().split(/\s+/)[0]},` : "Hi,";
  return [
    hi,
    "",
    "Here's your Monday Locations Scorecard:",
    `${siteUrl}${SCORECARD_FILE}`,
    "",
    "It opens in Excel, Google Sheets (File > Import) or Numbers. Start on the",
    "\"Start here\" tab. The sample locations and numbers are invented, so",
    "delete them before you add your own.",
    "",
    "If anything's unclear, just reply. It comes straight to us.",
    "",
    "Josh & Reiss",
    "SKOX",
  ].join("\n");
}
