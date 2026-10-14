import type { BuildType } from "@/content/landing";

/**
 * One landing page per trade we advertise to, at /for/[slug]. Each Google ad
 * group points at its own trade, so the searcher sees their trade in the
 * headline and a working example from their world.
 *
 * Copy rules (docs/ads/claims.md): describe the trade's problems and what we
 * would build. Never imply we've already built it for a company in that trade,
 * never name their software, never promise results. Every example is a concept.
 */

export type ExampleKey =
  | "crew-ops"
  | "revenue-bookings"
  | "owner-pnl"
  | "fleet-monitor"
  | "quote-builder"
  | "dispatch-board"
  | "approval-portal"
  | "truck-stock";

export type Trade = {
  slug: string;
  name: string;
  /** "an HVAC company" — used in running copy. */
  company: string;
  /** First line of the H1: the phrase people search for. */
  keyword: string;
  title: string;
  description: string;
  intro: string;
  build: BuildType;
  example: ExampleKey;
  exampleTitle: string;
  exampleTry: string;
  /** The Monday problems, in the owner's words. */
  pains: { title: string; body: string }[];
  /** What we'd build. The first one is the live example. */
  builds: { title: string; body: string }[];
  connects: string;
  faq: { q: string; a: string }[];
  /** Where the full set of examples lives. */
  more: { href: string; label: string };
  /** Line under the H1. Defaults to the shared one in the page (claim T08). */
  mechanism?: string;
  /** Form example. Defaults to "For example: <first build>." */
  placeholder?: string;
};

const DASH_MORE = { href: "/dashboard-examples", label: "See all four dashboard examples" };
const TOOL_MORE = { href: "/internal-tool-examples", label: "See all four internal tool examples" };

const DASH_FAQ = {
  q: "How quickly can you build it?",
  a: "We offer a 14-day focused dashboard build. That timing applies to an agreed scope with the data and account access ready at kickoff. Your written scope sets the exact date before you pay.",
};
const TOOL_FAQ = {
  q: "How long does a tool like this take?",
  a: "It depends on what it has to do, so it gets its own delivery date after scoping. You get the price and the date in writing before you pay, and you review working software at the halfway mark.",
};
const CONNECT_FAQ = {
  q: "Will it work with the software we already use?",
  a: "If your software has an API or an export, usually yes. We confirm every connection during the free scope call, before you pay anything.",
};
const OWN_FAQ = {
  q: "Who owns it when it's done?",
  a: "You do: the code, the repositories and the accounts. You can keep working with us or take it in-house.",
};

export const trades: Trade[] = [
  {
    slug: "hvac",
    name: "HVAC",
    company: "an HVAC company",
    keyword: "HVAC business dashboards",
    title: "HVAC business dashboards, built at speed",
    description:
      "Custom dashboards for HVAC companies with more than one crew: hours, jobs, callbacks and hiring in one view. A 14-day focused build with a fixed price agreed upfront.",
    intro:
      "One view of every crew, branch and tech: jobs done, hours on the clock, callbacks and who's still in onboarding. Fixed price and delivery date agreed in writing before you pay.",
    build: "dashboards",
    example: "crew-ops",
    exampleTitle: "Crews, hours and hiring",
    exampleTry: "Start the job timer, pick a day on the hours chart, tick off the new-hire checklist.",
    pains: [
      { title: "Monday starts in five logins.", body: "Dispatch, time clock, payroll and the bank each hold a piece. Somebody rebuilds the same spreadsheet every week." },
      { title: "You find out a crew slipped after payroll.", body: "Overtime, callbacks and missed windows show up weeks late, when they've already cost you." },
      { title: "New hires disappear into the busy season.", body: "Nobody can say who's finished training, who's riding along and who's ready to run calls alone." },
    ],
    builds: [
      { title: "A crew and branch dashboard", body: "Jobs, hours, callbacks and utilization per crew, updated from the tools you already use." },
      { title: "An onboarding tracker", body: "Every new tech's checklist, ride-alongs and sign-offs in one place, visible to the crew lead." },
      { title: "A season-ready schedule view", body: "Maintenance agreements, installs and service calls side by side, so you staff ahead of the heat." },
    ],
    connects: "Job and dispatch software, time clock, payroll, accounting",
    faq: [DASH_FAQ, CONNECT_FAQ, OWN_FAQ],
    more: DASH_MORE,
  },
  {
    slug: "pool-service",
    name: "Pool service",
    company: "a pool service company",
    keyword: "Pool service business dashboards",
    title: "Pool service dashboards, built at speed",
    description:
      "Custom dashboards for pool service companies with several locations or routes: revenue, booked jobs, services and service area in one view. A 14-day focused build, fixed price.",
    intro:
      "Revenue and booked jobs in one place, by week, month and route, with the services that carry the season. Fixed price and delivery date agreed in writing before you pay.",
    build: "dashboards",
    example: "revenue-bookings",
    exampleTitle: "Revenue, bookings and service area",
    exampleTry: "Switch week, month and quarter, hover the revenue line, pick a date range on the calendar.",
    pains: [
      { title: "Recurring revenue hides the leaks.", body: "Weekly accounts look steady until you notice repairs and start-ups quietly dropped off at one location." },
      { title: "Every route is a guess.", body: "You can't see where the work actually is, so routes drift and drive time eats the margin." },
      { title: "Lead sources blur together.", body: "Google, referrals and repeat customers all land in the same inbox, so you can't tell what to spend more on." },
    ],
    builds: [
      { title: "A revenue and bookings dashboard", body: "Revenue against booked jobs by week, month and quarter, per location, with the services behind it." },
      { title: "A service-area map", body: "Where this month's jobs are, so routes and new hires follow the work." },
      { title: "A lead-source view", body: "Which channel the booked jobs came from, next to what each channel cost." },
    ],
    connects: "Job software, payments, booking calendar, ad accounts",
    faq: [DASH_FAQ, CONNECT_FAQ, OWN_FAQ],
    more: DASH_MORE,
  },
  {
    slug: "pest-control",
    name: "Pest control",
    company: "a pest control company",
    keyword: "Pest control business dashboards",
    title: "Pest control dashboards, built at speed",
    description:
      "Custom dashboards for pest control owners: sales against expenses, cost per booked job by marketing channel and where the money goes. A 14-day focused build, fixed price.",
    intro:
      "Sales against expenses, and what each booked job really costs by marketing channel, month by month. Fixed price and delivery date agreed in writing before you pay.",
    build: "dashboards",
    example: "owner-pnl",
    exampleTitle: "The owner's profit view",
    exampleTry: "Flip between years, hover the months, hover a slice of the costs ring.",
    pains: [
      { title: "You know revenue. You don't know profit per job.", body: "Labor, products, fleet and marketing sit in different systems, so margin is a month-end surprise." },
      { title: "Every ad channel says it's working.", body: "Each platform reports its own numbers. None of them tells you the cost of a job that actually got booked." },
      { title: "Seasonality makes every month look different.", body: "Without last year beside this year, you can't tell a slow month from a real problem." },
    ],
    builds: [
      { title: "An owner's profit dashboard", body: "Sales, expenses and margin by month and branch, with last year beside this year." },
      { title: "Cost per booked job, by channel", body: "Ad spend from each platform set against the jobs it actually booked." },
      { title: "A route and branch view", body: "Recurring accounts, one-off treatments and renewals per branch and per tech." },
    ],
    connects: "Accounting, job software, Google and Meta ad accounts, reviews",
    faq: [DASH_FAQ, CONNECT_FAQ, OWN_FAQ],
    more: DASH_MORE,
  },
  {
    slug: "landscaping",
    name: "Lawn & landscaping",
    company: "a landscaping company",
    // Leads with what "landscaping software" searchers want: running the
    // company. Fleet health stays as the live example, one part of it.
    keyword: "Custom landscaping software",
    title: "Custom landscaping software, built at speed",
    description:
      "Custom software for landscaping companies: crews, routes, equipment and job costs in one place, built around how you already work. Fixed price and delivery date agreed upfront.",
    intro:
      "Built around how your company actually runs: crews, routes, equipment and what each property really costs you. Start with the part that hurts most. Fixed price and delivery date agreed in writing before you pay.",
    build: "web-apps",
    example: "fleet-monitor",
    exampleTitle: "One piece of it: fleet and equipment health",
    exampleTry: "Tap the truck, mower or trailer and watch fuel, battery and engine temperature change.",
    pains: [
      { title: "The day lives in five apps and a whiteboard.", body: "Crews, routes, equipment and changes never sit in one place, so the office spends the morning on the phone." },
      { title: "A mower dies on site and a crew stands still.", body: "Equipment problems surface when a crew calls in, not when the warning signs started." },
      { title: "You can't tell which properties make money.", body: "Hours, fuel and materials never meet the contract price, so underpriced accounts hide until year end." },
    ],
    builds: [
      { title: "A fleet and equipment dashboard", body: "Fuel, battery, engine hours and service due per truck and mower, with alerts sent to the crew lead." },
      { title: "A crew and route board", body: "Who is on which property today and in what order, with changes sent to the crew lead's phone." },
      { title: "A job-costing view", body: "Hours, fuel and materials against what you charge, per property, so the underpriced ones stand out." },
    ],
    connects: "Scheduling and invoicing software, telematics, fuel cards, text alerts",
    faq: [TOOL_FAQ, CONNECT_FAQ, OWN_FAQ],
    more: DASH_MORE,
    // The intro already opens with "Built around how your company actually runs".
    mechanism: "Connected to the tools you already use. You own the code and the accounts.",
    placeholder: "For example: see which properties lose money.",
  },
  {
    slug: "roofing",
    name: "Roofing",
    company: "a roofing company",
    keyword: "Roofing estimate and quote software",
    title: "Custom roofing quote software, built at speed",
    description:
      "A custom quote builder for roofing companies: measurements, pitch, materials, add-ons and margin in, a good / better / best quote out. Fixed price and delivery date agreed upfront.",
    intro:
      "Measurements in, a good, better and best quote out, with your prices, your margins and your floor. Fixed price and delivery date agreed in writing before you pay.",
    build: "web-apps",
    example: "quote-builder",
    exampleTitle: "A quote builder that does the math",
    exampleTry: "Drag the roof size, change the pitch, flip to the customer view, then send it.",
    pains: [
      { title: "Every quote is a spreadsheet only one person understands.", body: "Pitch factors, waste and tear-off live in someone's head. When they're out, quotes wait." },
      { title: "Margins drift job by job.", body: "Material prices move and nobody updates the sheet, so you find out at job close." },
      { title: "Customers get one option and shop it around.", body: "A single number invites a comparison. Good, better and best invites a decision." },
    ],
    builds: [
      { title: "A quote builder", body: "Your price list, pitch and waste rules, add-ons and margin floor, producing a customer-ready quote." },
      { title: "A customer approval link", body: "The customer picks an option, signs and pays a deposit from a text message." },
      { title: "A job-costing view", body: "Quoted against actual materials and labor on every job, so margins stop drifting." },
    ],
    connects: "Aerial measurement reports, your price list, job software, e-signature",
    faq: [TOOL_FAQ, CONNECT_FAQ, OWN_FAQ],
    more: TOOL_MORE,
    placeholder: "For example: turn our quote spreadsheet into a quote builder.",
  },
  {
    slug: "plumbing",
    name: "Plumbing",
    company: "a plumbing company",
    keyword: "Plumbing dispatch software",
    title: "Custom plumbing dispatch software, built at speed",
    description:
      "A custom dispatch board for plumbing companies: drag jobs onto techs, emergencies first, drive time included, overtime flagged. Fixed price and delivery date agreed upfront.",
    intro:
      "Drag a job onto a tech and the day re-plans itself: emergencies first, drive time included, overtime flagged before it happens. Fixed price and delivery date agreed in writing before you pay.",
    build: "web-apps",
    example: "dispatch-board",
    exampleTitle: "A dispatch board that re-plans the day",
    exampleTry: "Drag a waiting job onto a tech, or tap the job then the tech. Tap a scheduled job to send it back. Try Auto-assign.",
    pains: [
      { title: "One burst pipe rewrites the whole day.", body: "Every emergency means calling three techs and re-juggling the board by hand." },
      { title: "Drive time is invisible.", body: "The schedule looks full of work, but half of it is windshield time across town." },
      { title: "The wrong tech gets the job.", body: "Drain work lands on the apprentice and a gas job on someone who isn't certified." },
    ],
    builds: [
      { title: "A dispatch board", body: "Techs, skills, zones and drive time on one board, with emergencies jumping the line." },
      { title: "Customer on-the-way texts", body: "Customers get a text when their tech heads over, without anyone typing it." },
      { title: "A daily capacity view", body: "Who's free, who's into overtime and how many jobs you can still book today." },
    ],
    connects: "Job software, phone system, GPS, text notifications",
    faq: [TOOL_FAQ, CONNECT_FAQ, OWN_FAQ],
    more: TOOL_MORE,
  },
  {
    slug: "garage-doors",
    name: "Garage doors",
    company: "a garage door company",
    keyword: "Garage door quote approval software",
    title: "Custom garage door quote approval, built at speed",
    description:
      "A custom customer approval portal for garage door companies: good / better / best options, e-signature and a deposit from one text link. Fixed price and delivery date agreed upfront.",
    intro:
      "The customer gets a text, picks an option, signs and pays a deposit before the tech is back in the van. You watch every step. Fixed price and delivery date agreed in writing before you pay.",
    build: "web-apps",
    example: "approval-portal",
    exampleTitle: "A customer approval portal",
    exampleTry: "Be the customer: pick an option, choose a time, sign with your finger or mouse, pay the demo deposit.",
    pains: [
      { title: "“Let me think about it” turns into a lost job.", body: "Quotes go out as a PDF and a phone call. By the time you follow up, someone else did the door." },
      { title: "Deposits are chased by phone.", body: "Booking waits on a card number read out over the phone, so the calendar fills slowly." },
      { title: "You can't see where quotes stall.", body: "Viewed? Chosen? Signed? Nobody knows until the customer calls back, or doesn't." },
    ],
    builds: [
      { title: "A customer approval portal", body: "Options, e-signature, time slots and a deposit, from one link the tech can text on site." },
      { title: "A live quote feed", body: "Every quote's status as it happens: opened, chosen, signed, paid." },
      { title: "Automatic follow-up", body: "A reminder goes out when a quote sits unopened or unsigned, written in your words." },
    ],
    connects: "Quotes, payments, calendar, text messages",
    faq: [TOOL_FAQ, CONNECT_FAQ, OWN_FAQ],
    more: TOOL_MORE,
  },
  {
    slug: "electrical",
    name: "Electrical",
    company: "an electrical contractor",
    keyword: "Electrical contractor truck stock software",
    title: "Custom truck stock software for electricians, built at speed",
    description:
      "Custom truck stock software for electrical contractors: parts per van against par, low-stock flags and a pick list that writes itself. Fixed price and delivery date agreed upfront.",
    intro:
      "What's on every van against par, what's running low, and tomorrow's pick list written for you. Fixed price and delivery date agreed in writing before you pay.",
    build: "web-apps",
    example: "truck-stock",
    exampleTitle: "Truck stock that writes the pick list",
    exampleTry: "Switch vans, type a part like GF-20 into the scan box, use parts with minus, then send and receive the pick list.",
    pains: [
      { title: "A tech drives back to the shop for one breaker.", body: "An hour lost because nobody knew the van was out of the part the job needed." },
      { title: "Stock disappears into jobs nobody billed.", body: "Parts leave the van, but they never make it onto the invoice." },
      { title: "Restocking is a Friday guessing game.", body: "The warehouse pulls from memory, so some vans overflow and others run dry." },
    ],
    builds: [
      { title: "A truck stock tracker", body: "Every van's parts against par, with low-stock flags and usage logged by scan or tap." },
      { title: "An automatic pick list", body: "Tomorrow's restock list per van, sent to the warehouse before the techs clock out." },
      { title: "Parts-to-invoice matching", body: "Parts used on a job show up on that job's invoice, so nothing leaves unbilled." },
    ],
    connects: "Inventory, purchasing, job software, barcode scanners",
    faq: [TOOL_FAQ, CONNECT_FAQ, OWN_FAQ],
    more: TOOL_MORE,
  },
];

export function tradeBySlug(slug: string): Trade | undefined {
  return trades.find((t) => t.slug === slug);
}
