export type BuildType = "websites" | "web-apps" | "dashboards";

export const builds = [
  {
    id: "websites" as const,
    number: "01",
    label: "Websites",
    title: "Look the part. Win the enquiry.",
    description:
      "A custom website that makes your offer clear and gives visitors an easy next step. Designed for your business, from the first screen to the contact form.",
    includes: [
      "Custom design, built for mobile",
      "Lead capture & booking integrations",
      "An easy-to-update content system",
    ],
    timeline: "7-day focused site build",
    note: "Scope, content and access agreed before kickoff.",
    cta: "Plan my website",
    headline: "Your next website.",
    accent: "Built at speed.",
    intro:
      "Turn a dated site into a clear, credible reason to choose you. Custom design, mobile layouts and lead capture, with a fixed price and a launch date agreed upfront.",
    previewTitle: "A better first impression.",
    previewCaption: "Website concept · custom design & a clear next step",
  },
  {
    id: "web-apps" as const,
    number: "02",
    label: "Web apps",
    title: "Get the idea into people’s hands.",
    description:
      "A customer portal, an internal tool or your first product. We turn the essential workflow into working software, then give you room to grow.",
    includes: [
      "Customer portals & internal tools",
      "Accounts, payments & integrations",
      "A focused first version you can use",
    ],
    timeline: "Your scope. Your delivery date.",
    note: "Complexity sets the schedule. We agree it in writing.",
    cta: "Plan my web app",
    headline: "Your next web app.",
    accent: "Built at speed.",
    intro:
      "Take your portal, internal tool or product from idea to working software. Work directly with the builders, with a fixed scope, price and delivery date.",
    previewTitle: "Less back-and-forth. More progress.",
    previewCaption: "Web app concept · try approving the sample request",
  },
  {
    id: "dashboards" as const,
    number: "03",
    label: "Dashboards",
    title: "Know what’s happening. Act on it.",
    description:
      "Bring the numbers scattered across your tools into one useful view. See performance, compare locations and stop rebuilding the same report.",
    includes: [
      "Connected data from your existing tools",
      "Location & team performance views",
      "Reporting built around your decisions",
    ],
    timeline: "14-day focused dashboard build",
    note: "Timing depends on agreed data sources and access.",
    cta: "Plan my dashboard",
    headline: "Your next dashboard.",
    accent: "Built at speed.",
    intro:
      "Turn disconnected tools and weekly spreadsheet work into one clear view of your business. A focused dashboard build, with scope, price and timing agreed upfront.",
    previewTitle: "Your business. In focus.",
    previewCaption: "Dashboard concept · sample data, not client results",
  },
] as const;

/**
 * Copy for the three product fragments that float around the hero headline.
 *
 * Every number here is invented, so each fragment carries a SAMPLE tag for the
 * same reason `BuildPreview` carries a DEMO badge: these depict the kind of
 * dashboard we build for a client, and must never be read as our own results.
 */
export const heroFragments = {
  tag: "Sample",
  table: {
    title: "Revenue by location",
    rows: [
      { name: "Downtown", value: "$9,240", delta: "+12%", up: true },
      { name: "Northside", value: "$8,110", delta: "+6%", up: true },
      { name: "Riverside", value: "$7,330", delta: "−3%", up: false },
    ],
  },
  stat: {
    label: "Bookings this week",
    value: "142",
    delta: "↑ 18% vs last week",
  },
  chart: {
    title: "Revenue trend",
    months: ["Aug", "Sep", "Oct", "Nov"],
  },
} as const;

export const landing = {
  eyebrow: "Independent software studio · Working everywhere",
  headline: "Your next big thing.",
  accent: "Built at speed.",
  intro:
    "Custom websites, web apps and dashboards. We take what your business needs and turn it into working software—with a fixed price and a delivery date agreed upfront.",
  cta: "Get my price & timeline",
  secondaryCta: "Explore what we build",
  reassurance: "Free 30-minute scope call. No deposit. No obligation.",
  composerLabel: "Describe what you want built",
  composerPlaceholder: "What do you want built?",
  composerSubmit: "Start my scope",
  composerHint: "Start typing here and we’ll carry it into the form below.",
  /**
   * Cycled through the empty input as ghost text. Deliberately wider than the
   * three chips below it: the point is to show the range of things worth
   * asking for, to someone who does not yet know what to ask for.
   */
  composerTypewriter: [
    "An internal tool to replace our spreadsheet",
    "One dashboard for all my locations",
    "A quoting tool my team will actually use",
    "A customer portal for my clients",
    "A booking site for my service team",
  ],
  composerExamples: [
    "A booking site for my service team",
    "A customer portal for my clients",
    "One dashboard for all my locations",
  ],
  trust: [
    "Fixed price, agreed upfront",
    "Direct access to the builders",
    "You own the code",
  ],
  /**
   * "Why SKOX": the gap between a big dev shop and a freelancer. The two
   * alternative columns describe typical characteristics only. Never name a
   * firm, and never put a number on someone else's price or timeline. Every
   * SKOX answer is a commitment already made elsewhere on this page.
   */
  compareEyebrow: "01 / Why SKOX",
  compareTitle: "Between expensive\nand risky.",
  compareSub:
    "Big dev shops are slow and priced for big budgets. Freelancers cost less, but they’re a gamble. We sit in the gap: the people who build it, a fixed price and a date, all in writing.",
  compareColumns: {
    us: "SKOX",
    shop: "Big dev shop",
    freelancer: "Freelancer or DIY",
  },
  compareRows: [
    {
      label: "Timeline",
      us: "A delivery date in writing, before you pay",
      shop: "Months",
      freelancer: "Unpredictable",
    },
    {
      label: "Price",
      us: "Fixed, agreed upfront",
      shop: "High, often billed by the hour",
      freelancer: "Low, but a gamble",
    },
    {
      label: "Who you deal with",
      us: "The two founders building it",
      shop: "An account manager",
      freelancer: "One person, if they reply",
    },
    {
      label: "When plans change",
      us: "Agreed in writing, with a working review halfway",
      shop: "Change orders",
      freelancer: "Start over",
    },
  ],
  compareNote: "Free 30-minute scope call. No deposit.",
  offerEyebrow: "02 / What we build",
  offerTitle: "What do you need to move forward?",
  offerSub:
    "Start with the build that matters most. We’ll help you define the smallest complete version that solves the problem.",
  integrations:
    "Need your tools connected, or a workflow automated? We build that in, too.",
  /**
   * Sits directly under the build cards, at the moment someone is deciding
   * whether to enquire. Every line here is a commitment already made elsewhere
   * on the page — the trust strip, the offer and the FAQ — restated where the
   * decision actually happens. Nothing new is being promised.
   */
  buildAssurance: [
    "A fixed price, agreed in writing before you pay anything",
    "A delivery date set at kickoff, not re-estimated later",
    "You own the code and the accounts from day one",
  ],
  processEyebrow: "03 / How we move fast",
  processTitle: "A shorter path from\n“we need this” to live.",
  processSub:
    "You work with the people making the decisions and writing the code. A clear scope keeps the build moving. A working preview keeps you in the loop.",
  steps: [
    {
      number: "01",
      title: "Tell us the goal",
      body: "A free 30-minute call to understand what you need, who will use it and what has to work on day one.",
      output: "A clear starting point",
    },
    {
      number: "02",
      title: "Get the plan in writing",
      body: "Exactly what we’ll build, the fixed price, what we need from you and the delivery date. Keep the scope either way.",
      output: "Your price + your date",
    },
    {
      number: "03",
      title: "See it. Shape it. Ship it.",
      body: "Review working software at the halfway mark. We test the agreed scope, launch it and hand over your code and accounts.",
      output: "Working software, in your hands",
    },
  ],
  teamEyebrow: "04 / The people behind the build",
  teamTitle: "Talk to the builders.\nWork with the founders.",
  teamSub:
    "One of us brings the operator’s perspective, the other product engineering. The people you meet on the first call are the people taking your project live.",
  founders: [
    {
      name: "Joshua Fox",
      role: "Co-founder · Strategy & operations",
      photo: "/team/joshua-fox.jpg",
      bio: "Runs strategy and operations for a multi-location healthcare group. Brings firsthand experience with multi-location operations, reporting and the systems a growing business needs.",
    },
    {
      name: "Reiss Skeen",
      role: "Co-founder · Product & engineering",
      photo: "/team/reiss-skeen.jpg",
      bio: "Co-founded FocusTap and led its technical build and product strategy. Turns business problems into practical software, from the first workflow to the finished product.",
    },
  ],
  workEyebrow: "Products we’ve built",
  workSub: "Our own products, from idea to working software.",
  projects: [
    {
      name: "Tender",
      type: "Marketplace",
      body: "A second-opinion marketplace for CFOs, with accounts, payments and administration.",
    },
    {
      name: "FocusTap",
      type: "Focus tool",
      body: "A focus product taken from the initial idea through product strategy and engineering.",
    },
  ],
  faqEyebrow: "05 / Good questions",
  faqTitle: "A few things, upfront.",
  formEyebrow: "Let’s build something useful",
  formTitle: "What do you want\nto get live?",
  formSub:
    "Tell us about the project. Reiss will review it and reply within one business day to arrange your free scope call.",
  formBenefits: [
    "A 30-minute scope call with Reiss",
    "A written scope, fixed price and delivery date",
    "The plan is yours, whether you hire us or not",
  ],
  formTitleSmall: "Tell Reiss what you need",
  formNote:
    "Describe the project first. Reiss will review it before arranging the call.",
  formLabels: {
    name: "Your name",
    email: "Email address",
    company: "Company",
    industry: "Industry",
    budget: "Expected project budget",
    timeline: "When do you want to start?",
    decisionRole: "Your role in the decision",
    projectType: "What are we building?",
    broken: "What would you like to build?",
    unspecified: "Help me figure it out",
    optional: "Optional",
    other: "Something else",
  },
  /* Sits with the email field, where the hesitation actually happens. The
     second sentence is the notice for unfinished-enquiry follow-up: it is what
     makes that follow-up something the visitor was told about rather than
     something done to them. Reword it freely; do not remove it. */
  formReassure:
    "One reply from a founder. No newsletter, no sales sequence. Once you enter your address we may follow up about this enquiry, even if you don’t finish the form.",
  /* Sits under the button: the click has a known consequence. */
  formNext:
    "Next: Reiss reviews it and replies within one business day to arrange the call.",
  formPlaceholder:
    "For example: a client portal where customers approve quotes.",
  formSubmit: "Send my project",
  formFitNote:
    "Custom software projects generally start at $10,000. SKOX does not take healthcare or financial-services projects.",
  formEligibility:
    "I confirm this project is not for healthcare or financial services.",
  formSubmitting: "Sending your request…",
  formPrivacy: "We’ll only use your details to respond to your enquiry.",
  formError:
    "Your request hasn’t been delivered yet. Try again, or email us with the details below.",
  formEmail: "Email my project instead",
  footerLine: "Good ideas deserve to get built.",
} as const;

export const landingFaq = [
  {
    q: "How quickly can you actually deliver?",
    a: "We offer a 7-day focused website build and a 14-day focused dashboard build. Those timelines apply to an agreed scope with the required content, data and account access ready at kickoff. Web apps and larger projects get their own delivery date after scoping. Your written scope sets the exact schedule and dependencies before you pay.",
  },
  {
    q: "What does a project cost?",
    a: "Every build has a fixed price against a written scope. The number depends on the pages, workflows, integrations and data involved. Your free scope call is how we get to a useful quote. Any hosting, third-party services or ongoing support are identified separately before you commit.",
  },
  {
    q: "Do I need to know exactly what I want?",
    a: "No. Bring the business problem, an idea or the thing you’re replacing. We’ll help work out what needs to be in the first version and what can wait. A few sentences in the form are enough to start.",
  },
  {
    q: "What if the project changes?",
    a: "We agree changes that affect cost or timing in writing before doing the additional work. You review a working version at the halfway mark so there is room for feedback before launch.",
  },
  {
    q: "Who owns the finished work?",
    a: "You own the code, repositories and accounts. We hand everything over so you can keep working with us or take the project in-house.",
  },
  {
    q: "Can you help after launch?",
    a: "Yes. We can scope ongoing hosting, support, improvements and new reports. Ongoing support is agreed separately, with a cancel-anytime retainer available. We do not provide 24/7 on-call coverage.",
  },
] as const;
