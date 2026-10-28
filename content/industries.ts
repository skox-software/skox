import { quoteDeskJob, type SheetRow } from "@/content/site";

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
  /** The owner's question. The H1 and the <title>. */
  question: string;
  description: string;
  lead: string;
  sheet: {
    caption: string;
    sample: string;
    rows: SheetRow[];
    total: string;
    totalNote: string;
    approve: string;
  };
  strip: { n: string; label: string }[];
  job: { title: string; intro: string; steps: { title: string; body: string }[] };
  stops: { title: string; intro: string; items: string[] };
  math: {
    intro: string;
    hire: { amount: string; unit: string; title: string; points: string[] };
    desk: { amount: string; unit: string; title: string; points: string[] };
    source: string;
  };
  review: { intro: string; steps: { title: string; body: string }[]; proof: string };
};

const WAGE =
  "Wage: US median for secretaries and administrative assistants, Bureau of Labor Statistics, Occupational Employment and Wage Statistics, May 2025.";

export const industries: Industry[] = [
  {
    slug: "surveying",
    trade: "Surveying",
    desk: "the Quote Desk",
    question: "Can AI pull the county records for every survey job?",
    description:
      "A new address comes in; the Quote Desk collects the appraiser record, plat, flood zone and zoning, finds your prior jobs nearby and drafts the quote from your rates. The surveyor approves it.",
    lead: "Usually, yes. A new address comes in; the desk collects the appraiser record, plat, flood zone and zoning, finds your prior jobs nearby and drafts the quote from your rates. The surveyor approves it.",
    sheet: {
      caption: quoteDeskJob.caption,
      sample: quoteDeskJob.sample,
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
      intro: "The sample job above, step by step. Each step is a setting in your rulebook, not a rebuild.",
      steps: [
        { title: "A new address comes in. The desk pulls the appraiser record, plat and deed.", body: "From the county sites your staff open today. A new county is added once and works for every job after." },
        { title: "It checks the flood zone, zoning and setbacks.", body: "Reads the FEMA layer and the municipal code and writes down what it found, with the source." },
        { title: "It finds your prior jobs nearby.", body: "Searches the firm's own folders by distance, so a lot you surveyed last year is priced like one." },
        { title: "The quote arrives as a finished draft, from your rate sheet.", body: "Your rates, your job types, your wording, written into the quote template the office already sends." },
        { title: "Everything is filed in the job folder. The surveyor approves, changes or sends.", body: "The records, the notes and the draft, in the folder structure the crew uses. Nothing goes out until a person says so." },
      ],
    },
    stops: {
      title: "Where it stops.",
      intro: "The desk prepares. These stay with a person, every time.",
      items: [
        "The quote amount. The surveyor reads the draft, changes what they want, and sends it.",
        "Anything a county won't give. A row that says so, with the link. The desk never guesses.",
        "The client. The call, the question, the negotiation. The desk hands you a finished file, not a conversation.",
      ],
    },
    math: {
      intro: "The plain comparison. Your own numbers go in on the call.",
      hire: { amount: "$47,540", unit: "a year, before benefits", title: "The next office hire", points: ["Every year, for as long as they stay", "Four to eight weeks to train on the county sites", "Out sick in busy season"] },
      desk: { amount: "$1,500", unit: "a month, to start", title: "The Quote Desk", points: ["One-time setup that covers configuring it to your counties, rates and folders", "A fixed monthly fee, about a quarter of what the work costs you now", "Your data and rules, exportable any day"] },
      source: WAGE,
    },
    review: {
      intro: "We start by watching a job come in, not by pitching. Free, 60 to 90 minutes, in your office or on a screen share.",
      steps: [
        { title: "Show us how a job comes in today.", body: "The counties you work, the sites your staff open, the quote you send." },
        { title: "Get a proposal in your own numbers.", body: "What the records and quoting cost you now, the desk that takes it over, and the monthly fee." },
        { title: "Decide.", body: "The review is free. The proposal is good for 14 days." },
      ],
      proof: "The job above is a sample, and says so. The desk it shows is running at a Florida survey firm today; its name and its measured hours appear here when the owner says yes, and not before.",
    },
  },
  {
    slug: "property-management",
    trade: "Property management",
    desk: "the Maintenance Desk",
    question: "Can AI triage every maintenance request?",
    description:
      "A tenant's request comes in by email, text or portal; the Maintenance Desk reads it, checks the lease and the unit's history, picks the vendor from your list and drafts the work order. Your coordinator sends it.",
    lead: "Usually, yes. A request comes in by email, text or portal; the desk reads it, checks the lease and the unit's history, picks the vendor from your own list and drafts the work order. Your coordinator approves and sends it.",
    sheet: {
      caption: "The Maintenance Desk, one request, as it ran",
      sample: "Sample request. Sample building, sample tenant.",
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
      intro: "The sample request above, step by step. Each step is a setting in your rulebook, not a rebuild.",
      steps: [
        { title: "A request comes in. The desk reads it, however it arrived.", body: "Portal, email, text or a voicemail transcript. It pulls out the unit, the problem and the photos." },
        { title: "It checks the lease and the unit's history.", body: "Who pays for what, what has been fixed before, which vendor did it, and whether this is the third time." },
        { title: "It sets the urgency from your rules.", body: "An active leak is same day; a dripping tap is this week. Your thresholds, written once, applied every time." },
        { title: "The work order arrives as a finished draft.", body: "The vendor from your list, the access notes, the photos, the not-to-exceed amount, in the template you already send." },
        { title: "Your coordinator approves, changes or sends.", body: "Nothing goes to a vendor or a tenant until a person says so. The desk logs the decision and learns from it." },
      ],
    },
    stops: {
      title: "Where it stops.",
      intro: "The desk prepares. These stay with a person, every time.",
      items: [
        "Sending the vendor. The coordinator reads the draft, changes the vendor or the amount, and sends it.",
        "Anything outside the rulebook. A request it can't place is a row that says so, not a guess.",
        "The tenant and the owner. The call, the apology, the explanation. The desk hands your team a finished file, not a conversation.",
      ],
    },
    math: {
      intro: "The plain comparison. Your own numbers go in on the call.",
      hire: { amount: "$47,540", unit: "a year, before benefits", title: "The next maintenance coordinator", points: ["Every year, for as long as they stay", "Four to eight weeks to learn the buildings and the vendors", "Out sick when the pipes freeze"] },
      desk: { amount: "$1,500", unit: "a month, to start", title: "The Maintenance Desk", points: ["One-time setup that covers configuring it to your buildings, vendors and rules", "A fixed monthly fee, about a quarter of what the work costs you now", "Your data and rules, exportable any day"] },
      source: WAGE,
    },
    review: {
      intro: "We start by watching a request come in, not by pitching. Free, 60 to 90 minutes, in your office or on a screen share.",
      steps: [
        { title: "Show us how a request comes in today.", body: "The portal, the inbox, the vendor list, the work order you send." },
        { title: "Get a proposal in your own numbers.", body: "What triage costs you now, the desk that takes it over, and the monthly fee." },
        { title: "Decide.", body: "The review is free. The proposal is good for 14 days." },
      ],
      proof: "The request above is a sample, and says so. Named clients and measured hours appear here when owners say yes, and not before.",
    },
  },
];

export function industryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
