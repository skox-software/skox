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

/**
 * The photographs: the paperwork of each trade, shot flat on the brand blue.
 * Masters in docs/brand/stills; the site serves JPEGs from public/brand/stills.
 * The left third of each hero frame is clear for the headline.
 */
export const stills = {
  home: { src: "/brand/stills/pile.jpg", bg: "#0058F0", alt: "A stack of manila folders labelled Invoices, Clients, Follow up, County and Payroll, an open ledger of handwritten figures, a rubber stamp and an ink pad, laid out on a blue surface." },
  surveying: { src: "/brand/stills/surveying.jpg", bg: "#0159EE", alt: "A folded county plat, a property appraiser printout, a FEMA flood map, a surveyor's field book, a brass plumb bob and a rubber stamp, laid out on a blue surface." },
  "property-management": { src: "/brand/stills/maintenance.jpg", bg: "#025BE9", alt: "A clipboard with a maintenance work order, a tenant's handwritten note, a ring of keys tagged 2B, a lease page with a highlighted clause and a rubber stamp, laid out on a blue surface." },
} as const;

/**
 * The industry wall on the home page: every owner's paperwork, with the
 * question they are already asking. Trades with a live page link to it;
 * the rest go to the review with the trade filled in.
 */

export const wall = [
  { slug: "surveying", trade: "Land surveying", question: "Can AI pull the county records for every survey job?", src: "/brand/stills/surveying.jpg", live: true },
  { slug: "property-management", trade: "Property management", question: "Can AI triage every maintenance request?", src: "/brand/stills/maintenance.jpg", live: true },
  { slug: "title", trade: "Title and escrow", question: "Can AI order the records for a title file?", src: "/brand/stills/title.jpg", live: false },
  { slug: "cpas", trade: "Accounting", question: "Can AI run my 1099 season?", src: "/brand/stills/cpa.jpg", live: false },
  { slug: "law", trade: "Law offices", question: "Can AI open the file and chase the intake?", src: "/brand/stills/law.jpg", live: false },
  { slug: "insurance", trade: "Insurance agencies", question: "Can AI issue the certificates and chase the renewals?", src: "/brand/stills/insurance.jpg", live: false },
  { slug: "contractors", trade: "Contractors", question: "Can AI pull the permits and collect the lien waivers?", src: "/brand/stills/contractor.jpg", live: false },
  { slug: "medical", trade: "Medical and dental offices", question: "Can AI do the intake and the insurance paperwork?", src: "/brand/stills/medical.jpg", live: false },
  { slug: "freight", trade: "Freight and trucking", question: "Can AI match the bills of lading to the rate confirmations?", src: "/brand/stills/freight.jpg", live: false },
  { slug: "hvac", trade: "HVAC and plumbing", question: "Can AI turn the service tickets into invoices?", src: "/brand/stills/hvac.jpg", live: false },
] as const;

/**
 * The desk, as the hero shows it: what came in, what the desk did, what
 * came back. Sample firm, sample job; the month's numbers are the sample
 * firm's arithmetic from the cost ledger below the hero, never a client's.
 */
export const quoteDeskMock = {
  desk: "Quote Desk",
  inbox: [
    { kind: "Email", label: "New survey request: a platted lot in Lake Mary" },
    { kind: "Attachment", label: "Prior survey, 2019.pdf" },
    { kind: "County portal", label: "Seminole County Property Appraiser" },
    { kind: "Spreadsheet", label: "Rates 2026.xlsx" },
  ],
  work: [
    { label: "Pulled the appraiser record", time: "0:41" },
    { label: "Pulled the plat and deed from the Clerk", time: "1:07" },
    { label: "Read the FEMA flood layer: Zone X", time: "0:12" },
    { label: "Read zoning and setbacks: R-1", time: "0:19" },
    { label: "Found two prior jobs within 0.3 miles", time: "0:08" },
    { label: "Drafted the quote from the rate sheet", time: "1:45" },
  ],
  out: {
    title: "Quote: boundary survey, platted lot",
    lines: ["Records attached, four sources", "Priced from the firm's own rates", "Filed in the job folder"],
    stamp: "Waiting on the owner",
    action: "Approve",
  },
  meter: [
    { n: "40", label: "quotes drafted" },
    { n: "30", label: "office hours back" },
    { n: "$926", label: "of payroll not spent" },
  ],
  meterNote: "Sample firm: 40 quotes a month at 45 minutes each, at the BLS median admin wage loaded for benefits. Your numbers go in on the call.",
  total: "4:12",
  before: { src: "/brand/stills/surveying.jpg", alt: "", title: "Today: the same job, by hand.", line: "Four county sites, a PDF, a spreadsheet, an email. 40 times a month.", hand: "45:00" },
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

/** The header block at the top of a job ticket. */
export type TicketHead = readonly { label: string; value: string }[];

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
  caption: "The Quote Desk, one job, as it ran",
  sample: "Sample job. Real counties, sample address.",
  head: [
    { label: "Job", value: "26-0412, boundary survey" },
    { label: "Address", value: "Sample address, Lake Mary, FL" },
    { label: "Received", value: "Today, 8:14 am, by email" },
  ] as TicketHead,
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
    title: "Start with the question you're already asking.",
    intro: "Every trade has its own pile. Two of these have a page that shows a desk running on it; the rest start with the review.",
  },
  /**
   * What the work costs now, in the owner's units. A worked sample, labelled
   * as one: every figure is the BLS wage, our price, or a stated assumption.
   */
  cost: {
    title: "What this work costs you now.",
    intro: "A sample firm, so the arithmetic is visible. On the call it's your firm: your jobs, your minutes, your payroll.",
    sample: "Sample: a 12-person survey firm. 40 quotes a month, about 45 minutes of office time each.",
    before: {
      label: "Today",
      lines: [
        { k: "Office hours a month on quotes", v: "30 hours" },
        { k: "Loaded cost of those hours", v: "about $926 a month", note: "The BLS median administrative assistant earns $47,540. At firms under 50 workers each wage dollar costs about $1.35 with benefits: $30.86 an hour." },
        { k: "Over a year", v: "360 hours, about $11,100" },
        { k: "When the quoter is out", v: "Quotes wait" },
      ],
    },
    after: {
      label: "With a desk",
      lines: [
        { k: "Office hours a month on quotes", v: "0 hours", note: "Someone still approves each one. That's minutes, not hours." },
        { k: "The desk", v: "$1,500 a month", note: "Fixed for the term. Setup is a one-time fee that covers configuring it to your office." },
        { k: "The 360 hours", v: "Back, for billable work" },
        { k: "When the quoter is out", v: "Quotes go out" },
      ],
    },
    foot: "One job type rarely pays for a desk on its own; two or three do, and that's what the review finds. Wage: Bureau of Labor Statistics, Occupational Employment and Wage Statistics, May 2025 (SOC 43-6014). Benefits: BLS Employer Costs for Employee Compensation, June 2026, establishments with 1–49 workers.",
    cta: "Put your numbers in",
  },
  /** Why owners are looking at this now. Every line is a sourced figure from docs/research/small-business-busywork-evidence.md §8. */
  now: {
    title: "Why owners are looking at this now.",
    intro: "Not because of a headline. Because the seat that does this work is getting harder to fill and more expensive, and the tools have got good enough to take the job, not just help with it.",
    facts: [
      { n: "32%", line: "of small-business owners have jobs they can't fill, eight points above the 48-year average. 87% of those hiring get few or no qualified applicants.", src: "NFIB Small Business Economic Trends, September 2026" },
      { n: "+26%", line: "median pay for an administrative assistant, $37,690 in 2019 to $47,540 in 2025, while the number of people doing the job fell 16%.", src: "Bureau of Labor Statistics, OEWS May 2019 and May 2025" },
      { n: "−6%", line: "bookkeeping clerks expected by 2035. The Bureau of Labor Statistics gives the reason: software has automated many of their tasks.", src: "BLS Occupational Outlook Handbook, 2025–35 projections" },
      { n: "7%", line: "of small employers already using AI say it's fully built into how the business runs. The rest are still testing it or using it in a few places.", src: "Federal Reserve Small Business Credit Survey, 2026 report" },
      { n: "54%", line: "of small employers planning to try AI say the hard part is finding or adapting a tool that fits their business. Cost came well behind, at 32%.", src: "Federal Reserve Small Business Credit Survey, 2026 report" },
      { n: "1.4 h", line: "a week of email saved by a general AI assistant in a six-month, 66-company trial, with no change in work finished. The savings are in taking a whole job, not in a chat window.", src: "Dillon, Jaffe, Immorlica & Stanton, NBER Working Paper 33795, 2025" },
    ],
  },
  proof: {
    title: "One job, as it ran.",
    intro: "The Quote Desk at a Florida survey firm, on a sample address. The ticket is the product: what it collected, what it read, what it drafted, and where it stopped.",
  },
  math: {
    title: "Hire vs. build.",
    intro: "What owners usually try first, then the plain comparison. Your own numbers go in on the call.",
    ladder: [
      { title: "The next hire.", body: "If you can find one: 87% of small firms hiring right now get few or no qualified applicants. Then they work until they leave, and the cost comes back every year.", tag: "Costs every year", struck: true },
      { title: "The all-in-one app.", body: "Answers the phone and builds the website. It has never read a plat, a W-9 or a work order, so your staff still retype into it.", tag: "Still retyped", struck: true },
      { title: "ChatGPT on a laptop.", body: "Answers questions when someone asks. In a six-month trial at 66 companies, a general AI assistant saved about 1.4 hours a week of email and didn't change how much work got finished. It doesn't pull the records or file anything.", tag: "Files nothing", struck: true },
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
