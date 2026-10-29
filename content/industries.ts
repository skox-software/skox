import { quoteDeskJob, quoteDeskMock, type SheetRow, type TicketHead } from "@/content/site";
import type { DeskMock } from "@/components/site/DeskMockup";

/**
 * One question page per industry. A page ships only when a sample desk runs
 * for it (SITE-PLAN decision 1), so the list below is the live list: nothing
 * here is "coming soon".
 */
export type Industry = {
  slug: string;
  /** The trade, as the industries list and the hero eyebrow show it. */
  trade: string;
  desk: string;
  /** The owner's question. The H1, and the <title> unless seoTitle is set. */
  question: string;
  /** A <title> with the words owners search for, when the question lacks them. */
  seoTitle?: string;
  description: string;
  lead: string;
  mock: DeskMock;
  sheet: {
    caption: string;
    sample: string;
    head: TicketHead;
    rows: SheetRow[];
    total: string;
    totalNote: string;
    approve: string;
  };
  strip: { n: string; label: string }[];
  job: { title: string; intro: string; steps: { title: string; body?: string }[] };
  stops: { title: string; intro: string; items: string[] };
  math: {
    intro: string;
    hire: { amount: string; unit: string; title: string; points: string[] };
    desk: { amount: string; unit: string; title: string; points: string[] };
    source: string;
  };
  review: { intro: string; steps: { title: string; body?: string }[]; proof: string };
};

const WAGE =
  "Wage: US median for secretaries and administrative assistants, Bureau of Labor Statistics, Occupational Employment and Wage Statistics, May 2025.";

export const industries: Industry[] = [
  {
    slug: "surveying",
    trade: "Surveying",
    desk: "the Quote Desk",
    question: "Can AI pull the county records for every survey job?",
    seoTitle: "Can AI draft every survey quote from the county records?",
    description:
      "A new address comes in; the Quote Desk pulls the appraiser record, plat, flood zone and zoning and drafts the quote from your rates. You approve it.",
    lead: "Usually, yes. A new address comes in and the desk drafts the quote from the county records. The surveyor approves it.",
    mock: quoteDeskMock,
    sheet: {
      caption: quoteDeskJob.caption,
      sample: quoteDeskJob.sample,
      head: quoteDeskJob.head,
      rows: [
        quoteDeskJob.rows[0],
        quoteDeskJob.rows[1],
        quoteDeskJob.rows[2],
        quoteDeskJob.rows[3],
        { doc: "Prior jobs nearby", note: "Two within 0.3 miles, 2024 and 2025", source: "The firm's own job folders", status: "Read", time: "0:08" },
        { doc: "Quote", note: "Platted lot, boundary survey", source: "From the firm's rate sheet", status: "Waiting on the owner", waiting: true, time: "1:45" },
      ],
      total: "4 min 12 s",
      totalNote: "address to quote. Staff hours: 0.",
      approve: "Approve quote",
    },
    strip: [
      { n: "6", label: "records collected and read, from four county sources" },
      { n: "2", label: "prior jobs found within 0.3 miles" },
      { n: "1", label: "quote drafted from the firm's rate sheet" },
      { n: "0", label: "staff hours. One decision left for the surveyor." },
    ],
    job: {
      title: "One address, start to finish.",
      intro: "",
      steps: [
        { title: "Pulls the appraiser record, plat and deed." },
        { title: "Checks flood zone, zoning and setbacks." },
        { title: "Finds your prior jobs nearby." },
        { title: "Drafts the quote from your rate sheet." },
        { title: "Files it all. The surveyor approves." },
      ],
    },
    stops: {
      title: "Where it stops.",
      intro: "These stay with a person, every time.",
      items: ["The quote amount.", "Anything a county won't give. It says so, never guesses.", "The client."],
    },
    math: {
      intro: "",
      hire: { amount: "$47,540", unit: "a year, before benefits", title: "The next office hire", points: ["Every year they stay", "Weeks to learn the county sites", "Out sick in busy season"] },
      desk: { amount: "$1,500", unit: "a month, to start", title: "The Quote Desk", points: ["Plus a one-time setup", "Runs nights and weekends", "Your data, exportable any day"] },
      source: WAGE,
    },
    review: {
      intro: "60 to 90 minutes, in your office or on a screen share.",
      steps: [{ title: "Show us how a job comes in." }, { title: "Get a proposal in your numbers." }, { title: "Decide. It's good for 14 days." }],
      proof: "The job above is a sample. The desk runs at a Florida survey firm today; its name and hours go here when the owner says yes.",
    },
  },
  {
    slug: "property-management",
    trade: "Property management",
    desk: "the Maintenance Desk",
    question: "Can AI triage every maintenance request?",
    description:
      "A tenant's request comes in; the Maintenance Desk checks the lease and unit history, picks your vendor and drafts the work order. You send it.",
    lead: "Usually, yes. A request comes in and the desk drafts the work order. Your coordinator approves and sends it.",
    mock: {
      desk: "Maintenance Desk",
      inbox: [
        { kind: "Tenant portal", label: "\"Water under the kitchen sink since last night\", unit 2B" },
        { kind: "Photo", label: "IMG_4471.jpg, the cabinet floor" },
        { kind: "Lease file", label: "2B lease, maintenance clause" },
        { kind: "Vendor list", label: "Plumbers you use for this building" },
      ],
      work: [
        { label: "Read the request and the photo", time: "0:04" },
        { label: "Checked the lease: landlord's repair", time: "0:06" },
        { label: "Found two prior plumbing calls on 2B", time: "0:05" },
        { label: "Set urgency from your rules: same day", time: "0:03" },
        { label: "Picked the plumber from your list", time: "0:06" },
        { label: "Drafted the work order with access notes", time: "0:38" },
      ],
      out: {
        title: "Work order: 2B, active leak, same day",
        lines: ["Vendor: your plumber for this building", "Not-to-exceed from your rulebook", "Photos and access notes attached"],
        stamp: "Waiting on the coordinator",
        action: "Send",
      },
      meter: [
        { n: "120", label: "requests triaged" },
        { n: "40", label: "office hours back" },
        { n: "$1,234", label: "of payroll not spent" },
      ],
      meterNote: "Sample firm: 120 requests a month at 20 minutes each, at the BLS median admin wage loaded for benefits. Your numbers go in on the call.",
      total: "1:02",
      before: { src: "/brand/stills/maintenance.jpg", alt: "", title: "Today: the same request, by hand.", line: "The portal, the lease file, the vendor list, the phone. 120 times a month.", hand: "20:00" },
    },
    sheet: {
      caption: "The Maintenance Desk, one request, as it ran",
      sample: "Sample request. Sample building, sample tenant.",
      head: [
        { label: "Request", value: "MR-1187, plumbing" },
        { label: "Unit", value: "2B, sample building, Orlando, FL" },
        { label: "Received", value: "Today, 9:02 pm, tenant portal" },
      ],
      rows: [
        { doc: "Tenant's message", note: "\"Water under the kitchen sink since last night\"", source: "Tenant portal, unit 2B", status: "Read", time: "0:04" },
        { doc: "Lease and unit history", source: "The firm's own records: two prior plumbing calls", status: "Read", time: "0:11" },
        { doc: "Urgency and category", source: "The firm's rulebook: active leak, same day", status: "Read", time: "0:03" },
        { doc: "Vendor", source: "Your vendor list: the plumber you use for this building", status: "Collected", time: "0:06" },
        { doc: "Work order", note: "Drafted with photos, access notes and the not-to-exceed amount", source: "Your work order template", status: "Waiting on the coordinator", waiting: true, time: "0:38" },
      ],
      total: "1 min 02 s",
      totalNote: "message to work order. Staff hours: 0.",
      approve: "Send work order",
    },
    strip: [
      { n: "1", label: "request read, in the tenant's own words" },
      { n: "2", label: "prior calls on the unit found and attached" },
      { n: "1", label: "work order drafted from the firm's template" },
      { n: "0", label: "staff hours. One decision left for the coordinator." },
    ],
    job: {
      title: "One request, start to finish.",
      intro: "",
      steps: [
        { title: "Reads the request, however it arrived." },
        { title: "Checks the lease and the unit's history." },
        { title: "Sets the urgency from your rules." },
        { title: "Drafts the work order with your vendor." },
        { title: "Your coordinator approves and sends." },
      ],
    },
    stops: {
      title: "Where it stops.",
      intro: "These stay with a person, every time.",
      items: ["Sending the vendor.", "Anything outside your rules. It says so, never guesses.", "The tenant and the owner."],
    },
    math: {
      intro: "",
      hire: { amount: "$47,540", unit: "a year, before benefits", title: "The next maintenance coordinator", points: ["Every year they stay", "Weeks to learn the buildings", "Out sick when the pipes freeze"] },
      desk: { amount: "$1,500", unit: "a month, to start", title: "The Maintenance Desk", points: ["Plus a one-time setup", "Runs nights and weekends", "Your data, exportable any day"] },
      source: WAGE,
    },
    review: {
      intro: "60 to 90 minutes, in your office or on a screen share.",
      steps: [{ title: "Show us how a request comes in." }, { title: "Get a proposal in your numbers." }, { title: "Decide. It's good for 14 days." }],
      proof: "The request above is a sample. Client names and hours go here when owners say yes.",
    },
  },
];

export function industryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
