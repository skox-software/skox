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

/**
 * The review booking. With NEXT_PUBLIC_REVIEW_BOOKING_URL set (a Calendly or
 * Google Calendar appointment-schedule link Josh controls), the form ends on
 * a scheduling step and every button can honestly say "Book". Without it,
 * the visitor sends a request and we reply to set a time, so the buttons say
 * "Request". One switch keeps the promise and the page in step.
 */
const BOOKING_URL = (process.env.NEXT_PUBLIC_REVIEW_BOOKING_URL ?? "").trim();
export const booking = {
  url: BOOKING_URL,
  enabled: BOOKING_URL.startsWith("https://"),
} as const;
const CTA = booking.enabled ? "Book a free review" : "Request a free review";
const CTA_SHORT = booking.enabled ? "Book a review" : "Request a review";

export const site = {
  name: "UnBusy",
  tagline: "Get the busywork off your team.",
  description:
    "UnBusy builds the desk that does one part of your office paperwork and stops at your decision. Start with a free operations review.",
  email: "founders@gounbusy.com",
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
  "title-and-escrow": { src: "/brand/stills/title.jpg", bg: "#0159EE", alt: "Title and escrow paperwork laid out on a blue surface." },
  accounting: { src: "/brand/stills/cpa.jpg", bg: "#0159EE", alt: "Accounting paperwork laid out on a blue surface." },
  "law-offices": { src: "/brand/stills/law.jpg", bg: "#0159EE", alt: "Law office paperwork laid out on a blue surface." },
  "insurance-agencies": { src: "/brand/stills/insurance.jpg", bg: "#0159EE", alt: "Insurance agency paperwork laid out on a blue surface." },
  contractors: { src: "/brand/stills/contractor.jpg", bg: "#0159EE", alt: "Contractor paperwork laid out on a blue surface." },
  "medical-and-dental": { src: "/brand/stills/medical.jpg", bg: "#0159EE", alt: "Medical and dental office paperwork laid out on a blue surface." },
  freight: { src: "/brand/stills/freight.jpg", bg: "#0159EE", alt: "Freight and trucking paperwork laid out on a blue surface." },
  "hvac-and-plumbing": { src: "/brand/stills/hvac.jpg", bg: "#0159EE", alt: "HVAC and plumbing service paperwork laid out on a blue surface." },
} as const;

/**
 * The industry wall on the home page: every owner's paperwork, with the
 * question they are already asking. Trades with a live page link to it;
 * the rest go to the review with the trade filled in.
 */

export const wall = [
  { slug: "surveying", trade: "Land surveying", question: "Can AI pull the county records for every survey job?", src: "/brand/stills/surveying.jpg", live: true },
  { slug: "property-management", trade: "Property management", question: "Can AI triage every maintenance request?", src: "/brand/stills/maintenance.jpg", live: true },
  { slug: "title-and-escrow", trade: "Title and escrow", question: "Can AI order the records for a title file?", src: "/brand/stills/title.jpg", live: true },
  { slug: "accounting", trade: "Accounting", question: "Can AI run my 1099 season?", src: "/brand/stills/cpa.jpg", live: true },
  { slug: "law-offices", trade: "Law offices", question: "Can AI open the file and chase the intake?", src: "/brand/stills/law.jpg", live: true },
  { slug: "insurance-agencies", trade: "Insurance agencies", question: "Can AI issue the certificates and chase the renewals?", src: "/brand/stills/insurance.jpg", live: true },
  { slug: "contractors", trade: "Contractors", question: "Can AI pull the permits and collect the lien waivers?", src: "/brand/stills/contractor.jpg", live: true },
  { slug: "medical-and-dental", trade: "Medical and dental offices", question: "Can AI do the intake and the insurance paperwork?", src: "/brand/stills/medical.jpg", live: true },
  { slug: "freight", trade: "Freight and trucking", question: "Can AI match the bills of lading to the rate confirmations?", src: "/brand/stills/freight.jpg", live: true },
  { slug: "hvac-and-plumbing", trade: "HVAC and plumbing", question: "Can AI turn the service tickets into invoices?", src: "/brand/stills/hvac.jpg", live: true },
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
    { label: "What we do", href: "/#offer" },
    { label: "How a desk works", href: "/#how" },
    { label: "Questions", href: "/#faq" },
  ],
  action: { label: CTA, short: CTA_SHORT, href: "/review" },
} as const;

export const footer = {
  line: "Your data and your rules are yours. The system is ours to keep improving.",
  /** Continuity for anyone who knew us, or was emailed by us, before the rename. */
  formerly: "UnBusy was SKOX Software until October 2026. Same people, same work, new name.",
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
    /** The struck word is the brand device; it is rendered with a blue line through it. */
    headlineBefore: "AI that does your office's",
    struck: "busywork",
    headlineAfter: ".",
    lead: "Built around the software you already use. You keep the final say.",
    primary: CTA,
    secondary: "What does your office run on?",
  },
  /**
   * The way in: the software an owner already knows. Picking one says, in two
   * or three plain lines, what a desk does with it. No times, no numbers.
   */
  software: {
    title: "What does your office run on?",
    intro: "Pick one. Here's what a desk does with it.",
    cta: "Bring it to the review",
    items: [
      { name: "QuickBooks", lines: ["Pulls the vendor payments and sorts what needs a 1099.", "Drafts invoices from finished jobs and matches payments as they land.", "Flags the edge cases for you."] },
      { name: "Outlook / Gmail", lines: ["Reads what comes in and files each attachment to the right job.", "Drafts the reply. You hit send."] },
      { name: "Excel / Google Sheets", lines: ["Fills the sheet your team keeps by hand, from the emails and documents behind it.", "Your rates and rules stay in the sheet you already edit."] },
      { name: "County and state websites", lines: ["Looks up the records for an address or a name and saves them to the job.", "Says so when a site won't give an answer. It never guesses."] },
      { name: "Your CRM", lines: ["Logs every call, email and form to the right contact.", "Sets the next follow-up and drafts it for you."] },
      { name: "Shared drive / Dropbox", lines: ["Names, sorts and files every document into the folders your team already uses."] },
      { name: "A scheduling calendar", lines: ["Books the visit from the request and sends the reminder.", "Moves it when the reply asks to."] },
      { name: "E-signature", lines: ["Prepares the agreement from your template, sends it and chases the signature."] },
      { name: "Payments / Stripe", lines: ["Sends the invoice or payment link.", "Marks it paid when the money lands, in your books too."] },
      { name: "Something else", lines: ["Name it at the review.", "If someone in your office opens it every day, a desk can usually work with it."] },
    ],
  },
  /**
   * What we sell, said plainly. One line each. Prices are the ones in the
   * business plan; no tiers, no packages.
   */
  offer: {
    title: "What we do.",
    steps: [
      { name: "A free review", what: "We watch the job and price it in your numbers.", price: "Free" },
      { name: "A desk", what: "Does one job, start to finish. We build it and run it.", price: "About a quarter of what the work costs you now" },
      { name: "The next desk", what: "The next job off your team's plate.", price: "Same rule, half the setup" },
    ],
    desksTitle: "Desks we build",
    desksNote: "Each opens a sample job.",
    desks: [
      { desk: "Quote Desk", slug: "surveying", output: "a priced survey quote from an address, ready for you to approve." },
      { desk: "Maintenance Desk", slug: "property-management", output: "a work order from a tenant's request, with your vendor picked." },
      { desk: "Title Desk", slug: "title-and-escrow", output: "the records for a new file, with what needs clearing listed." },
      { desk: "1099 Desk", slug: "accounting", output: "every W-9 chased, every 1099 ready for your signature." },
      { desk: "New Matter Desk", slug: "law-offices", output: "a new matter opened, conflicts checked, engagement letter drafted." },
      { desk: "Certificate Desk", slug: "insurance-agencies", output: "a certificate drafted from the policies on file, ready to issue." },
      { desk: "Permit Desk", slug: "contractors", output: "a permit packet built and the lien waivers chased." },
      { desk: "Intake Desk", slug: "medical-and-dental", output: "a new patient set up and their coverage checked before the visit." },
      { desk: "Billing Desk", slug: "freight", output: "the paperwork matched to the rate confirmation and the invoice drafted." },
      { desk: "Invoice Desk", slug: "hvac-and-plumbing", output: "a finished ticket turned into an invoice from your price book." },
    ],
  },
  how: {
    title: "How a desk works.",
    parts: [
      { who: "The desk", title: "Collect", body: "Pulls in the documents and data. Nothing is retyped." },
      { who: "The desk", title: "Read", body: "Checks each one against your rules." },
      { who: "The desk", title: "Prepare", body: "Drafts the quote, filing or work order." },
      { who: "Yours", title: "Decide", body: "You approve, sign or send. The call stays yours.", yours: true },
    ],
  },
  industries: {
    title: "Pick your trade.",
  },
  /**
   * Real work, unnamed until each owner says yes. Status words are exact:
   * "In testing" is not "Live". Nothing here is a concept or a pitch.
   */
  work: {
    title: "Work we've done.",
    intro: "Real jobs, no names. Names go up when owners say yes.",
    items: [
      { status: "In testing", who: "A Florida land survey firm", what: "Type an address. The county records for the job land in its folder." },
      { status: "Running daily", who: "Our own office", what: "Leads file themselves, preview opens alert us, unsubscribes are honored on their own. Our own office runs on desks." },
      { status: "Shipped", who: "A medical clinic", what: "A point of sale, with every product set up by SKU." },
      { status: "Shipped", who: "Client dashboards", what: "Spotify, TikTok, Instagram, Authorize.net and Acuity on one screen." },
      { status: "Shipped", who: "A car dealership", what: "The website that brings its customers in." },
      { status: "Shipped", who: "An app for CFOs", what: "Anonymous second opinions from people who've done the thing. Ours, built in three days." },
      { status: "Live", who: "A classroom app", what: "Students tap in by NFC or a link. Professors see attendance and engagement. Ours, built end to end.", href: "https://www.focustap.org/", linkLabel: "focustap.org" },
    ],
  },
  math: {
    title: "You win, we win.",
    intro: "Our monthly fee is about a quarter of what the work costs you now, set in your own numbers at the review. You keep the rest.",
    hire: {
      amount: "$47,540",
      unit: "a year, before benefits",
      title: "The next admin hire",
      points: ["Every year they stay", "Weeks to find and train", "Out sick in busy season"],
    },
    desk: {
      amount: "About 25%",
      unit: "of what the work costs you now",
      title: "A desk",
      points: ["You keep the other three quarters", "There's a minimum; the review tells you if your work clears it", "Not running the agreed jobs by day 90? Cancel and keep what was built"],
    },
    source: "Wage: US median for secretaries and administrative assistants, Bureau of Labor Statistics, Occupational Employment and Wage Statistics, May 2025.",
  },
  /** Every line is a sourced figure from docs/research/small-business-busywork-evidence.md §8. */
  now: {
    title: "Why now.",
    facts: [
      { n: "32%", line: "of small-business owners have jobs they can't fill.", src: "NFIB Small Business Economic Trends, September 2026" },
      { n: "+26%", line: "admin pay since 2019, with 16% fewer people doing the job.", src: "Bureau of Labor Statistics, OEWS May 2019 and May 2025" },
      { n: "54%", line: "of small firms trying AI say the hard part is finding a tool that fits.", src: "Federal Reserve Small Business Credit Survey, 2026 report" },
    ],
  },
  invite: {
    line: "Got a job you think can't be handed off? Bring it to the review.",
    cta: CTA,
  },
  faq: {
    title: "Questions owners ask.",
    items: [
      { q: "Is the review free?", a: "Yes. 60 to 90 minutes, in your office or on a screen share.", more: "You leave with a proposal in your own numbers, good for 14 days." },
      { q: "What happens after?", a: "If you say yes, we build the desk around how your office works today.", more: "Setup is paid before we start, then one fixed monthly fee. You approve its work from day one." },
      { q: "How long until it runs?", a: "The review gives you a date, and it goes in the proposal.", more: "So does a yes/no list of the jobs the desk will run. If it isn't running them by day 90, you can cancel and keep what was built." },
      { q: "Do we have to change our software?", a: "No. The desk works in the software you already run.", more: "If something can't be connected, the review tells you before you sign anything." },
      { q: "Is our data safe?", a: "Your files run your desk and nobody else's. They're never used to train anything.", more: "Only your team and ours see them, and you can export them any day." },
      { q: "Who owns what?", a: "Your data and your rules are yours, exportable any day.", more: "We own and run the engine underneath, and keep improving it." },
    ],
  },
  review: {
    title: "Start with a free review.",
    intro: "60 to 90 minutes, in your office or on a screen share.",
    steps: [
      { title: "Show us the job." },
      { title: "Get a proposal in your numbers." },
      { title: "Decide. It's good for 14 days." },
    ],
    cta: CTA,
    proofTitle: "Proof, the honest version",
    proof: "Every screen on this site is a sample and says so. Client names and hours go here when owners say yes.",
  },
} as const;

export const review = {
  title: booking.enabled ? "Book a free operations review" : "Request a free operations review",
  description:
    "Free, 60 to 90 minutes, in your office or on a screen share. We watch how one part of your office runs today and come back with a proposal in your own numbers.",
  eyebrow: "Free. 60 to 90 minutes. In your office or on a screen share.",
  headlineBefore: "Tell us the",
  struck: "busywork",
  headlineAfter: ".",
  lead: "We watch how the job runs today and send you a proposal in your own numbers. No pitch deck.",
  form: {
    name: "Your name",
    email: "Email",
    firm: "Firm",
    phone: "Phone",
    industry: "What your firm does",
    industryPlaceholder: "Surveying, title, accounting, property management…",
    busywork: "The busywork you think your team could get rid of",
    busyworkPlaceholder: "What comes in, who handles it, how many a week.",
    people: "People in the office",
    peopleOptions: ["1 to 4", "5 to 15", "16 to 50", "More than 50"],
    format: "Where",
    formatOptions: ["On site", "Screen share"],
    submit: booking.enabled ? "Next: pick a time" : "Send the request",
    submitting: "Sending…",
    /* The notice for unfinished-form follow-up. Reword freely; do not remove it. */
    notice: "We save what you type as you go, so a half-finished form still reaches us. We also use it to measure our ads.",
    noticeLink: "Your privacy choices.",
    reply: booking.enabled ? "Next you pick a time that suits you." : "We reply within one business day to set a time.",
    error: "That didn't send. Try again, or email us with the details below.",
    emailUs: "Email us instead",
  },
  ready: {
    title: "What to have ready",
    items: [
      { title: "The systems you use.", body: "Logged in on the day." },
      { title: "Who does the work.", body: "In the room, if they can be." },
      { title: "Roughly how many a month.", body: "A guess is fine." },
    ],
  },
  get: {
    title: "What you get",
    items: [
      { title: "A proposal in your own numbers.", body: "Good for 14 days." },
      { title: "A list of the jobs the desk will run.", body: "Not running by day 90? Cancel and keep what was built." },
    ],
  },
  data: {
    title: "Your data",
    items: [
      { title: "Yours, exportable any day.", body: "No fee, no notice." },
      { title: "Your rules are a document you keep.", body: "Readable without us." },
      { title: "Never used to train anything.", body: "Your files run your desk only." },
    ],
  },
  booked: {
    /** Without a booking link: the honest end of a request. */
    requested: {
      meta: "Review requested",
      title: "Request received.",
      body: "We'll reply within one business day to set a time.",
    },
    /** With a booking link: the scheduling step, then the confirmation. */
    pick: {
      meta: "Review requested",
      title: "Pick a time.",
      body: "60 to 90 minutes, in your office or on a screen share. Choose what suits you.",
    },
    confirmed: {
      meta: "Review booked",
      title: "You're booked",
      noTime: "The invite with the time is in your inbox.",
      addToCalendar: "Add to Google Calendar",
      calendarTitle: "UnBusy operations review",
    },
    back: "Back to the start",
  },
} as const;
