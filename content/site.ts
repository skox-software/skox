/**
 * Every word on the site lives here. Components stay structural so copy can be
 * iterated without touching layout.
 *
 * Rules enforced throughout (docs/brand/site-concept/SITE-PLAN.md):
 * - Sell the solution, never the category. No "AI agency", "automation" or
 *   "software company" in a headline. "AI" appears once per page, as the
 *   owner's own question.
 * - "UnBusy" describes people and work, never the firm.
 * - No invented proof. Every sample says "sample". Named clients only with
 *   their permission.
 * - No founder names, photos or phone number anywhere (Josh, 2026-10-27).
 */

export const site = {
  name: "UnBusy",
  tagline: "Get the busywork off your team.",
  description:
    "UnBusy builds and runs the desk that does one part of your office legwork: it collects the documents, reads them, drafts the job and stops at your decision. A free operations review shows you the part it can take.",
  email: "founder@skoxsoftware.com",
  /** The host visitors land on; canonicals, OG and the sitemap use it. */
  url: "https://gounbusy.com",
} as const;

export const nav = {
  links: [
    { label: "How a desk works", href: "/#how" },
    { label: "Industries", href: "/#industries" },
    { label: "Hire vs. build", href: "/#math" },
  ],
  action: { label: "Book a free review", href: "/review" },
} as const;

export const footer = {
  line: "Your data and your rules are yours. The system is ours to keep improving.",
  links: [
    { label: "Privacy", href: "/privacy" },
    { label: "Your privacy choices", href: "/privacy#choices" },
    { label: "Sign in", href: "/portal" },
  ],
} as const;

/** The sample job every sheet on the site shows. Real counties, sample address. */
export type SheetRow = {
  doc: string;
  note?: string;
  source: string;
  status: string;
  /** The row that waits on a person gets the blue dot. */
  waiting?: boolean;
  time: string;
};

export const quoteDeskJob = {
  caption: "Quote Desk · one job, as it ran",
  sample: "Sample job. Real counties, sample address.",
  rows: [
    { doc: "Property appraiser record", source: "Seminole County Property Appraiser", status: "Collected", time: "0:41" },
    { doc: "Plat and deed", source: "Clerk of Court, book 41, page 12", status: "Collected", time: "1:07" },
    { doc: "Flood zone", source: "FEMA NFHL, Zone X", status: "Read", time: "0:12" },
    { doc: "Zoning and setbacks", source: "City of Lake Mary, R-1", status: "Read", time: "0:19" },
    { doc: "Quote", note: "Platted lot, two prior jobs within 0.3 miles", source: "From the firm's own rates", status: "Waiting on the owner", waiting: true, time: "1:53" },
  ] as SheetRow[],
  total: "4 min 12 s",
  totalNote: "address to quote. Staff hours: 0.",
  approve: "Approve quote",
  approveHref: "/surveying",
} as const;

export const home = {
  title: "UnBusy: Get the busywork off your team",
  hero: {
    eyebrow: "For owners who think AI could take some of this, and don't know where to start.",
    /** The struck word is the brand device; it is rendered with a blue line through it. */
    headlineBefore: "What's still",
    struck: "busywork",
    headlineAfter: "in your company?",
    lead: "The retyping, the chasing, the paperwork that fills someone's week. Tell us the job. We look at how it runs today and show you the part a desk can take, up to your decision.",
    primary: "Book a free review",
    secondary: "Tell us the busywork",
  },
  /** The sample job's own numbers. Nothing here is invented. */
  strip: [
    { n: "5", label: "documents collected, from four county sources" },
    { n: "4", label: "read against the firm's rulebook" },
    { n: "1", label: "quote drafted from the firm's own rates" },
    { n: "0", label: "staff hours. One decision left for a person." },
  ],
  how: {
    n: "01",
    title: "A desk does the legwork. Your people make the calls.",
    intro: "Every desk has the same four parts, built around how your office already works. Three are the desk's. The last one is yours.",
    parts: [
      { who: "The desk", title: "Collect", body: "Pulls documents and data in by itself: county sites, email, uploads, QuickBooks, the software you already run. Nothing is retyped." },
      { who: "The desk", title: "Read", body: "Reads each document and applies your rules. A new threshold, county or staff member is a setting you change, not a rebuild." },
      { who: "The desk", title: "Prepare", body: "Every job arrives as a finished draft: the quote, the filing, the packet or the statement, written and filed." },
      { who: "Yours", title: "Decide", body: "You approve, sign or send. The desk logs it and learns from it. The judgement, the signature and the client stay yours.", yours: true },
    ],
  },
  industries: {
    n: "02",
    title: "Start with the question you're already asking.",
    intro: "Each page shows a desk running in that trade, on sample data, labelled as a sample.",
  },
  math: {
    n: "03",
    title: "Hire vs. build.",
    intro: "What owners usually try first, then the plain comparison. Your own numbers go in on the call.",
    ladder: [
      { title: "The next hire.", body: "Works until they leave. Four to eight weeks to train, out sick in busy season, and the cost comes back every year.", tag: "Costs every year", struck: true },
      { title: "The all-in-one app.", body: "Answers the phone and builds the website. It has never read a plat, a W-9 or a work order, so your staff still retype into it.", tag: "Still retyped", struck: true },
      { title: "ChatGPT on a laptop.", body: "Answers questions when someone asks. It doesn't pull the records, doesn't know your rates and doesn't file anything.", tag: "Files nothing", struck: true },
      { title: "A desk.", body: "Does the job, in your systems, with your rules, and stops at your decision. Priced against the hire.", tag: "Stops at your decision", struck: false },
    ],
    hire: {
      amount: "$47,540",
      unit: "a year, before benefits",
      title: "The next admin hire",
      points: ["Every year, for as long as they stay", "Four to eight weeks to hire and train", "Out sick in busy season"],
    },
    desk: {
      amount: "$1,500",
      unit: "a month, to start",
      title: "A desk",
      points: ["One-time setup that covers configuring it to your office", "A fixed monthly fee, about a quarter of what the work costs you now", "Your data and rules, exportable any day"],
    },
    source: "Wage: US median for secretaries and administrative assistants, Bureau of Labor Statistics, Occupational Employment and Wage Statistics, May 2025.",
  },
  review: {
    n: "04",
    title: "The review.",
    intro: "We start by watching the work, not by pitching it. Free, 60 to 90 minutes, in your office or on a screen share.",
    steps: [
      { title: "Show us how it runs today.", body: "Your systems, your steps, your hours." },
      { title: "Get a proposal in your own numbers.", body: "What the work costs you now, the desk that takes it over, and the monthly fee." },
      { title: "Decide.", body: "The review is free. The proposal is good for 14 days." },
    ],
    cta: "Book a free review",
    proofTitle: "Proof, the honest version",
    proof: "Every screen on this site is a working sample and says so. Named clients and measured hours appear here when owners say yes, and not before. If you want to know what a desk would do with your process, that is what the review is for.",
  },
} as const;

export const review = {
  title: "Book a free operations review",
  description:
    "Free, 60 to 90 minutes, in your office or on a screen share. We watch how one part of your office runs today and come back with a proposal in your own numbers.",
  eyebrow: "Free. 60 to 90 minutes. In your office or on a screen share.",
  headlineBefore: "Tell us the",
  struck: "busywork",
  headlineAfter: ".",
  lead: "Can AI run this part of your office? Usually, yes. The review is where we find out which part: we watch how it runs today and come back with a proposal in your own numbers. No pitch deck.",
  form: {
    name: "Your name",
    email: "Email",
    firm: "Firm",
    phone: "Phone",
    industry: "What your firm does",
    industryPlaceholder: "Land surveying, title and escrow, a CPA practice, property management, anything else",
    busywork: "The busywork you think your team could get rid of",
    busyworkPlaceholder: "Describe it the way you'd describe it to a new hire: what comes in, who handles it, what they open and retype, how many a week.",
    people: "People in the office",
    peopleOptions: ["1 to 4", "5 to 15", "16 to 50", "More than 50"],
    format: "Where",
    formatOptions: ["On site", "Screen share"],
    submit: "Book the review",
    submitting: "Sending…",
    /* The notice for unfinished-form follow-up. Reword freely; do not remove it. */
    notice: "We save what you type as you go, so a half-finished form still reaches us. We also use it to measure our ads.",
    noticeLink: "Your privacy choices.",
    reply: "We reply within one business day to set a time.",
    error: "That didn't send. Try again, or email us with the details below.",
    emailUs: "Email us instead",
  },
  ready: {
    title: "What to have ready",
    items: [
      { title: "The systems you use.", body: "County sites, QuickBooks, the software you already run, the shared drive. Logged in on the day." },
      { title: "Who does the work.", body: "The person who does it now, in the room if they can be. They know where it gets stuck." },
      { title: "Roughly how many a month.", body: "Jobs, requests, filings, whatever the unit is. A guess is fine; we confirm it together." },
    ],
  },
  get: {
    title: "What you get",
    items: [
      { title: "A proposal in your own numbers.", body: "What the work costs you now, the desk that takes it over, the setup fee and the monthly fee. Good for 14 days." },
      { title: "A yes/no list of the jobs the desk will run.", body: "If it isn't running them by day 90, you can cancel the term and keep what was built." },
    ],
  },
  data: {
    title: "Your data",
    items: [
      { title: "Yours, exportable any day.", body: "Plain formats, no fee, no notice period." },
      { title: "Your rulebook is a document you keep.", body: "Thresholds, counties, templates, staff. Readable without us." },
      { title: "Never used to train anything.", body: "Your files run your desk and nobody else's." },
    ],
  },
  booked: {
    title: "Got it.",
    body: "We'll reply within one business day to set a time. Until then, the page that started this is a fair picture of what the review looks at.",
    back: "Back to the start",
  },
} as const;
