/**
 * Every word on the site lives here. Components stay structural so copy can be
 * iterated without touching layout.
 *
 * Positioning rule enforced throughout: AI is named as the PRODUCT
 * ("AI phone agents that answer after-hours calls"), never as the METHOD.
 * Nothing here describes how the work gets built.
 */

export const site = {
  name: "SKOX",
  tagline: "Custom websites, web apps & dashboards. Built at speed.",
  description:
    "Custom websites, web apps and dashboards, built at speed. Work directly with the SKOX founders. A clear scope, fixed price and delivery date, agreed before you pay.",
  email: "snkrpickups@gmail.com",
  url: "https://skoxsoftware.com",
  /** Set to a Cal.com/Calendly URL and the page switches from "we'll reply" to instant booking. */
  bookingUrl: null as string | null,
  /** Drop a redacted scope at public/sample-scope.pdf and set this to "/sample-scope.pdf". */
  sampleScopeUrl: null as string | null,
} as const;

export const nav = [
  { label: "What we build", href: "#build" },
  { label: "How it works", href: "#offer" },
  { label: "What we don't", href: "#refusals" },
  { label: "FAQ", href: "#faq" },
] as const;

export const hero = {
  eyebrow: "Two builders · fixed scope · fixed date",
  headline: "A site in 7 days. A live dashboard in 14. One workflow automated in 10.",
  sub: "Two builders. We take one problem — the spreadsheet, the missed calls, the report nobody can pull — and hand it back working, on the date we set.",
  primaryCta: "Get my price and date",
  secondaryCta: "See what we build",
  /** Sits directly under the headline — the top half of the fold gets ~65% of all attention. */
  guarantee: "Fixed price and a delivery date, both agreed in writing before you pay anything.",
  proofline: "Free written scope — what gets built, what it costs, the day it goes live. Yours to keep either way.",
} as const;

/**
 * Simplified hero: a plain statement of what we provide, next to a contact form.
 * Kept separate from `hero` above so the original long-form fold stays intact.
 */
export const heroForm = {
  eyebrow: "Two builders · fixed scope · fixed date",
  headline: "Custom software, live on a date we commit to.",
  sub: "Websites, dashboards, internal tools and AI automation — built by two people at a fixed price, on a delivery date agreed in writing before you pay.",
  provides: [
    "Websites & custom web apps",
    "Live dashboards & Command Centers",
    "Internal tools & integrations",
    "AI phone & chat automation",
  ],
  formTitle: "Get your free scope",
  formSub: "Tell us what you need — it comes straight to the two of us. A reply within one business day.",
} as const;

/**
 * The entry offer, named rather than described. Named things get received;
 * described things get scheduled.
 */
export const entryOffer = {
  name: "The 30-Minute Scope",
  promise: "A call, then a written scope. Yours whether or not you hire us.",
  stack: [
    { item: "A 30-minute call", detail: "You describe what's broken. We ask the questions that price it." },
    { item: "A written scope document", detail: "Exactly what gets built, in plain language, with nothing hand-waved." },
    { item: "A fixed price", detail: "Not a range, not an estimate, not billed by the hour." },
    { item: "A fixed delivery date", detail: "Set before you pay anything, and not re-estimated once work starts." },
    { item: "You see it working at the halfway mark", detail: "Not a status email — the actual thing, running, while there is still time to change it." },
    { item: "You own the code outright", detail: "Your repos, your accounts, from day one. No licence, no hostage hosting." },
  ],
  keep: "You keep the scope document whether you hire us or not. No deposit, no obligation, no follow-up sequence.",
  cost: "Costs you thirty minutes.",
} as const;

/** Problem stack — specific enough to sting, broad enough to cover the range. */
export const problems = {
  kicker: "The leak",
  headline: "You already know which one this is.",
  sub: "Every business has one. It has a name, it has a cost, and it has been there long enough that everyone works around it.",
  items: [
    {
      n: "01",
      title: "The site nobody can update",
      body: "It looks nothing like the business does now, and changing a price means emailing whoever built it.",
    },
    {
      n: "02",
      title: "The spreadsheet only one person understands",
      body: "It runs scheduling, or commissions, or inventory. If they leave, the process leaves with them.",
    },
    {
      n: "03",
      title: "Six platforms, no answer",
      body: "The number you actually manage against lives across systems that don't talk, so nobody pulls it.",
    },
    {
      n: "04",
      title: "The 9pm enquiry answered at 10am",
      body: "By then they have called someone else. Most of your leads arrive when nobody is at the desk.",
    },
    {
      n: "05",
      title: "The quote that came back in quarters",
      body: "Fourteen weeks and a discovery phase, for something the business needs this month.",
    },
  ],
} as const;

export const calculator = {
  kicker: "The cost of doing nothing",
  headline: "Put your own numbers in.",
  sub: "This is not our math. It is yours — the leak you already have, priced.",
  fields: {
    missed: { label: "Enquiries missed or unanswered per week", suffix: "per week" },
    value: { label: "Average value of one customer", prefix: "$" },
    close: { label: "Of the ones you do reach, how many become customers", suffix: "%" },
  },
  defaults: { missed: 12, value: 900, close: 25 },
  footnote:
    "Deliberately conservative: it only counts enquiries you never reached, at your own close rate. No industry multipliers, no assumed lift.",
  payoff:
    "That is every month. A build is one number, once, and it is live before another one of those months finishes.",
  priceBand:
    "Most builds land between $6,500 and $75,000. If your budget is not in that range we will say so on the call rather than waste your thirty minutes.",
  cta: "Get my price and date",
} as const;

export const capabilities = [
  {
    id: "web",
    lead: true,
    n: "01",
    title: "Websites & custom web apps",
    blurb: "The thing your business runs on, built to look like your business.",
    items: [
      "Marketing sites and multi-location pages",
      "Custom web apps — portals, member areas, client-facing tools",
      "Landing and campaign pages that convert",
      "Booking and lead capture wired straight into your CRM",
      "Rebuilds of slow, dated or unmaintainable sites",
      "Designed per company, not dropped into a template",
    ],
  },
  {
    id: "dashboards",
    n: "02",
    title: "Command Centers",
    blurb: "If it has an API, it can feed one screen.",
    items: [
      "Spotify, TikTok, Instagram, Authorize.net, Acuity — and anything else with an API",
      "Multi-location performance dashboards, live",
      "Owner and manager scorecards",
      "Automated weekly and monthly reports",
      "Forecasting and cohort views",
    ],
  },
  {
    id: "products",
    n: "03",
    title: "Full products",
    blurb: "Ground-up web apps for founders with an idea and no team.",
    items: [
      "MVPs built in days, not funded quarters",
      "Auth, payments, admin — the whole thing",
      "We have shipped our own: Tender in three days, and FocusTap end to end",
    ],
  },
  {
    id: "internal",
    n: "04",
    title: "Internal tools",
    blurb: "Anything currently held together by one person and a spreadsheet.",
    items: [
      "Intake, scheduling, inventory, commissions, approvals",
      "Admin panels and back-office workflows",
      "Customer and client portals",
    ],
  },
  {
    id: "integrations",
    n: "05",
    title: "Integrations & plumbing",
    blurb: "Making the tools you already pay for talk to each other.",
    items: [
      "Custom API work where no connector exists",
      "Data migration and cleanup",
      "Replacing brittle automation chains with something that holds",
    ],
  },
  {
    id: "ai",
    n: "06",
    title: "AI automation",
    blurb: "The work that happens when nobody is at the desk.",
    items: [
      "Phone and chat agents that handle intake, booking, FAQs and after-hours calls",
      "Document extraction from invoices, intake forms and contracts",
      "Call transcription, summary and drafted follow-ups",
      "Lead scoring and routing, email and ticket triage",
    ],
  },
] as const;

/** Things SKOX has actually shipped. Named and linkable beats named alone. */
export const shipped = [
  {
    name: "Tender",
    what: "A second-opinion marketplace for CFOs — auth, payments, admin, the lot.",
    built: "Built in three days",
    url: null as string | null,
  },
  {
    name: "FocusTap",
    what: "A focus tool, taken end to end from idea to shipped product.",
    built: "Built end to end",
    url: null as string | null,
  },
] as const;

export const commandCenter = {
  kicker: "Command Center",
  headline: "Every platform in. One number out.",
  sub: "Spotify, TikTok, Instagram, Authorize.net, Acuity — we have wired all of them in. If a platform has an API, it can feed one screen your managers actually open. Live in fourteen days.",
} as const;

export const offer = {
  kicker: "How it works",
  headline: "A written scope. A fixed price. A date.",
  sub: "You get the scope document whether or not you hire us. It says exactly what gets built, what it costs, and the day it goes live.",
  steps: [
    { n: "01", title: "A call", body: "Thirty minutes. You describe the leak, we ask the questions that price it." },
    { n: "02", title: "A written scope", body: "What gets built, what it costs, the date it lands. Yours to keep, hire us or not." },
    { n: "03", title: "We build", body: "You talk to the people writing the code. No account manager in between." },
    { n: "04", title: "It goes live", body: "On the date in the document. That date is the commitment, not an estimate." },
  ],
  engagements: [
    {
      name: "The 7-Day Site Build",
      days: 7,
      scope: "Full marketing site, mobile, CMS, booking and lead capture wired up.",
      guarantee: "Live in 7 days",
    },
    {
      name: "The 14-Day Command Center",
      days: 14,
      scope: "Anything with an API, feeding one live dashboard with manager scorecards.",
      guarantee: "Live in 14 days",
    },
    {
      name: "The 10-Day Automation Sprint",
      days: 10,
      scope: "One workflow automated end to end. Document pipeline, triage system or chat agent.",
      guarantee: "Working in 10 days",
    },
    {
      name: "The Fixed-Date Custom Build",
      days: null,
      scope: "Internal tool, portal or full product. Scoped first, then a fixed price and a fixed date.",
      guarantee: "Date set at scope, held",
    },
    {
      name: "The Operator Retainer",
      days: null,
      scope: "Hosting, support, changes, new reports, priority access. Default on every deal.",
      guarantee: "Cancel anytime",
    },
  ],
  pricingLine:
    "Fixed price against a written scope, quoted on the call. Never hourly — hourly bills you for our time instead of your result.",
} as const;

export const riskReversal = {
  kicker: "Risk",
  headline: "The date is the product.",
  sub: "Anyone can quote a range. The commitment is what you're actually buying, so we put weight behind it.",

  points: [
    {
      title: "You keep the scope either way",
      body: "The written scope is yours whether you hire us or not. No deposit, no commitment, no obligation to proceed.",
    },
    {
      title: "The date is fixed at scope",
      body: "It goes in the document before you pay anything. It is not re-estimated once work starts.",
    },
    {
      title: "You see it working halfway, not at the end",
      body: "At the midpoint you get the actual thing running, not a status update — while there is still time to change direction. Most projects fail because nobody looked until it was too late to act.",
    },
    {
      title: "Never hourly",
      body: "Fixed price against written scope. You are buying a working system on a date, not a stack of timesheets.",
    },
  ],
} as const;

export const whyUs = [
  {
    n: "01",
    title: "Speed that changes the math",
    body: "Agencies quote in quarters because they are staffed to bill hours. We ship in days and weeks. That is not a nicer timeline, it is a different product — you get the thing while the problem is still the problem.",
  },
  {
    n: "02",
    title: "We have run the business",
    body: "One of us built and ran the entire tech stack for a multi-location healthcare operation while doing the ops job. We know what the dashboard needs to say because we were the one staring at it at eleven at night.",
  },
  {
    n: "03",
    title: "You talk to the builders",
    body: "Two people. No account manager, no offshore handoff, no game of telephone between the person who understood the problem and the person writing the code.",
  },
] as const;

export type TeamMember = {
  name: string;
  role: string;
  photo: string;
  bio: string;
};

/**
 * Bios are drawn from each person's own LinkedIn profile. Current employers are
 * deliberately not named — the day jobs belong to the people, not to SKOX.
 */
export const team = {
  kicker: "Who you're talking to",
  headline: "Two builders. Nobody in between.",
  sub: "No account manager, no offshore handoff, no game of telephone between the person who understood the problem and the person writing the code. These are the two people who scope the work, build it, and answer when you call.",
  members: [
    {
      name: "Joshua Fox",
      role: "Co-founder",
      photo: "/team/joshua-fox.jpg",
      bio: "Josh runs strategy and operations for a multi-location healthcare group, scaling it through operations, technology and strategy. That means he has spent his working life on the operator's side of the exact problems we get hired to fix — he has been the one staring at the dashboard at eleven at night. MBA from the University of North Florida, former student-athlete.",
    },
    {
      name: "Reiss Skeen",
      role: "Co-founder",
      photo: "/team/reiss-skeen.jpg",
      bio: "Reiss engineers solutions for companies — taking a problem apart and building the thing that actually closes it. He co-founded FocusTap, leading both the technical build and the strategy behind it. Finance graduate of Flagler College and ex-captain of its men's soccer team, with a bias toward what the data actually says.",
    },
  ] as TeamMember[],
};

export const refusals = {
  kicker: "Limits",
  headline: "What we don't do.",
  sub: "Saying this out loud is what makes the rest credible. Nobody believes two people who claim they do everything.",
  items: [
    "Staff augmentation",
    "Native iOS and Android",
    "Enterprise procurement cycles",
    "24/7 on-call support",
    "Ongoing paid media management",
    "Rescuing someone else's codebase",
    "Anything without a written scope",
  ],
  close:
    "We take the work that fits in a fixed scope with a date on it. Everything else breaks the guarantee, and the guarantee is the business.",
  /**
   * Scarcity is OFF until real numbers exist.
   *
   * Set `concurrentBuilds` to the true figure and `nextStart` to a real ISO date to
   * turn the line back on. Leave `nextStart` null and it renders the undated version.
   * Nothing here may be a guess: the entire offer rests on "our dates are real", and
   * one invented date on this page discredits every other date on it.
   */
  concurrentBuilds: null as number | null,
  nextStart: null as string | null,
  scarcity:
    "We run {N} builds at a time. That is the whole calendar. Next start date we can commit to is {DATE}.",
  scarcityNoDate:
    "We run {N} builds at a time. That is the whole calendar — the date we give you assumes a slot is open.",
} as const;

export const faq = [
  {
    q: "Can two people actually do this?",
    a: "For work that fits a written scope with a date on it, yes — that is exactly why the list of what we don't do is on this page. We are not staffed to run enterprise procurement or 24/7 on-call, so we don't sell it. What we do sell, we deliver ourselves, which is why there is nobody in between you and the build.",
  },
  {
    q: "What actually happens if the date slips?",
    a: "It goes in the written scope before you pay anything, and it is not re-estimated once work starts. You also see the thing running at the halfway mark, so a slip is visible to you with time to act rather than announced at the end. We would rather commit to a real date than pad the estimate — a padded estimate is just an agency timeline with better manners.",
  },
  {
    q: "Why isn't pricing on the site?",
    a: "Because a real number needs a real scope, and we won't quote one without the other. The call is thirty minutes and ends with a written price and a date. Nothing about that is a sales process — you keep the document either way.",
  },
  {
    q: "Who owns the code?",
    a: "You do. Outright, from day one, in your own repositories and your own accounts. No licence, no hostage hosting, no per-seat fee to keep using the thing you paid to have built.",
  },
  {
    q: "What happens after it goes live?",
    a: "Most clients keep the Operator Retainer — hosting, support, changes, new reports and priority access. It is cancel-anytime. If you would rather take it in-house, the code and the accounts are yours and we will hand over cleanly.",
  },
  {
    q: "What if the scope changes mid-build?",
    a: "Small things get absorbed. Anything that moves the date gets written down, priced, and agreed before we touch it — so the date never quietly moves while you assume it hasn't.",
  },
] as const;

export const form = {
  kicker: "Start here",
  headline: "Tell us what's broken.",
  sub: "Three fields. It comes straight to the two of us — no filter, no sequence.",
  submit: "Get my free scope",
  reassure: "No deposit. No obligation. You keep the scope document either way.",
  submitting: "Sending…",
  successTitle: "Got it.",
  successBody: "We read every one of these ourselves. Expect a reply within one business day.",
  successBooking: "Now pick your thirty minutes. If nothing on there works, just reply to the email we've sent you.",
  errorTitle: "That didn't send.",
} as const;
