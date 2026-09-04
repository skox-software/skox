/**
 * Presets for the hero's "make it yours" demo.
 *
 * The visitor types their business name and picks their industry; the demo
 * restyles and repopulates as their company. Every figure below is illustrative
 * and is labelled as sample data on screen — none of it is presented as the
 * visitor's real numbers.
 */

export const COMPANY_KEY = "skox:company";

export type Preset = {
  id: string;
  label: string;
  /** Accent the mini app is themed around. */
  accent: string;
  onAccent: string;
  bg: string;
  panel: string;
  text: string;
  dim: string;
  /** Corner treatment — a real part of how a brand reads. */
  radius: string;
  appKind: string;
  appHeadline: string;
  appCta: string;
  appStats: [string, string][];
  /** Command Center view. */
  revenue: string;
  delta: string;
  kpis: [string, string][];
  sources: string[];
};

export const PRESETS: Preset[] = [
  {
    id: "medspa",
    label: "Med spa",
    accent: "#d9a2a8",
    onAccent: "#2a1c20",
    bg: "#141013",
    panel: "#1e181c",
    text: "#f6efea",
    dim: "#a08e97",
    radius: "14px",
    appKind: "Client portal",
    appHeadline: "Your treatment plan",
    appCta: "Book next visit",
    appStats: [
      ["Visits", "14"],
      ["Next", "Mar 3"],
      ["Plan", "62%"],
    ],
    revenue: "$1,420,589",
    delta: "+32.4%",
    kpis: [
      ["Locations", "4"],
      ["Rebook rate", "68%"],
      ["Avg ticket", "$412"],
    ],
    sources: ["Acuity", "Authorize.net", "Instagram", "Google", "Mailchimp", "QuickBooks"],
  },
  {
    id: "fitness",
    label: "Fitness studio",
    accent: "#4ade9a",
    onAccent: "#06251a",
    bg: "#0c1210",
    panel: "#131c19",
    text: "#eefaf4",
    dim: "#7f9a90",
    radius: "6px",
    appKind: "Member app",
    appHeadline: "This week's block",
    appCta: "Reserve a spot",
    appStats: [
      ["Classes", "9"],
      ["Streak", "23d"],
      ["Capacity", "78%"],
    ],
    revenue: "$684,210",
    delta: "+18.9%",
    kpis: [
      ["Studios", "3"],
      ["Retention", "81%"],
      ["Avg member", "$149/mo"],
    ],
    sources: ["Mindbody", "Stripe", "Instagram", "TikTok", "Klaviyo", "QuickBooks"],
  },
  {
    id: "trades",
    label: "Home services",
    accent: "#3f9df5",
    onAccent: "#04101f",
    bg: "#0b1017",
    panel: "#111823",
    text: "#eaf2fb",
    dim: "#7d8ea3",
    radius: "3px",
    appKind: "Ops dashboard",
    appHeadline: "Today's routes",
    appCta: "Dispatch crew",
    appStats: [
      ["Stops", "31"],
      ["Crews", "4"],
      ["On time", "96%"],
    ],
    revenue: "$2,106,740",
    delta: "+24.1%",
    kpis: [
      ["Trucks", "11"],
      ["First-time fix", "89%"],
      ["Avg job", "$1,340"],
    ],
    sources: ["ServiceTitan", "Authorize.net", "Google LSA", "Twilio", "Podium", "QuickBooks"],
  },
  {
    id: "dental",
    label: "Dental / clinic",
    accent: "#7cc6d8",
    onAccent: "#04191f",
    bg: "#0a1114",
    panel: "#101a1e",
    text: "#e9f5f8",
    dim: "#7d949c",
    radius: "10px",
    appKind: "Patient portal",
    appHeadline: "Your next appointment",
    appCta: "Confirm visit",
    appStats: [
      ["Recalls", "212"],
      ["Next", "Apr 9"],
      ["Filled", "84%"],
    ],
    revenue: "$3,480,155",
    delta: "+11.6%",
    kpis: [
      ["Chairs", "12"],
      ["No-show rate", "4.2%"],
      ["Avg case", "$980"],
    ],
    sources: ["Dentrix", "Authorize.net", "Google", "Weave", "Mailchimp", "QuickBooks"],
  },
];

/** Trims and caps what a visitor types before it is rendered as a brand name. */
export function cleanName(raw: string): string {
  return raw.replace(/\s+/g, " ").trim().slice(0, 28);
}

/** A short mark for the app chrome — first two initials, else the first letter. */
export function initials(name: string): string {
  const words = name.split(" ").filter(Boolean);
  if (words.length === 0) return "S";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

/** A plausible domain from the business name, for the browser chrome. */
export function domainFor(name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .join("");
  return (slug || "yourbusiness") + ".com";
}
