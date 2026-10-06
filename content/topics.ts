import type { BuildType } from "@/content/landing";

/**
 * Service pages, one per thing people search for. Each one reuses the landing
 * page and adds its own hero, its own section and its own FAQs, so no two
 * pages say the same thing to Google.
 *
 * Same rules as the rest of the site: only facts already true (timelines,
 * integrations we've wired, our own products and portal), no invented proof,
 * no prices, AI never named as the method, no profanity.
 */
export type Topic = {
  slug: string;
  /** Which build the form, preview and cards open on. */
  build: BuildType;
  /** First line of the H1: the phrase people search for. */
  keyword: string;
  /** Short name for links and breadcrumbs. */
  name: string;
  /** <title>; the template adds "— SKOX". */
  title: string;
  description: string;
  /** Schema.org serviceType. */
  serviceType: string;
  /** Hero; the three original pages keep theirs from `builds`. */
  headline?: string;
  accent?: string;
  intro?: string;
  sectionTitle: string;
  sectionSub: string;
  examples: { title: string; body: string }[];
  signs: string[];
  includes: string[];
  timing: string;
  faq: { q: string; a: string }[];
  related: string[];
};

export const topics: Topic[] = [
  {
    slug: "web-apps",
    build: "web-apps",
    keyword: "Custom web app development",
    name: "Web apps",
    title: "Custom web app development, fixed price and date",
    description:
      "Custom web app development for growing businesses: customer portals, internal tools and first products, with a fixed price and a delivery date agreed in writing before you pay.",
    serviceType: "Custom web application development",
    sectionTitle: "Web apps that do\none job really well.",
    sectionSub:
      "Most businesses don’t need a giant platform. They need the one workflow that’s stuck in email and spreadsheets turned into software people actually use.",
    examples: [
      { title: "Customer portals", body: "Clients sign in to see progress, approve work, sign documents, upload files and pay invoices, instead of chasing you by email." },
      { title: "Internal tools", body: "Quoting, scheduling, approvals or job tracking, built around how your team already works rather than how a generic tool wants them to." },
      { title: "Your first product", body: "A focused first version with accounts, payments and the core workflow, ready for real users and room to grow." },
    ],
    signs: [
      "The process lives in a spreadsheet only one person understands",
      "Customers email to ask where things stand",
      "You pay for several tools that don’t talk to each other",
      "Off-the-shelf software gets you 70% there and the rest is workarounds",
    ],
    includes: [
      "Sign-in and accounts for your team or your customers",
      "The core workflow, built and tested against the written scope",
      "Payments, email and the integrations you agreed",
      "A working review at the halfway mark",
      "Your code, repositories and accounts, handed over",
    ],
    timing:
      "Web apps get their own delivery date after the scope call, because complexity sets the schedule. The date goes in writing with the price before you pay, and it doesn’t get re-estimated later.",
    faq: [
      { q: "How much does a custom web app cost?", a: "It depends on the workflows, users and integrations involved, so every build gets a fixed price against a written scope. The free 30-minute scope call is how we get to a real number, and the price doesn’t change unless you change the scope in writing." },
      { q: "Can you build on top of the tools we already use?", a: "Usually, yes. If a tool has an API, the web app can read from it and write to it. We confirm each integration and the access we need during scoping." },
      { q: "Do you build mobile apps?", a: "We build web apps that work properly on phones, tablets and desktops, and can be installed to a home screen. If you need an App Store app, tell us on the call and we’ll say honestly whether it fits." },
    ],
    related: ["customer-portals", "internal-tools", "mvp-development"],
  },
  {
    slug: "dashboards",
    build: "dashboards",
    keyword: "Business dashboard development",
    name: "Dashboards",
    title: "Business dashboard development in 14 days",
    description:
      "Custom business dashboards that pull your numbers from the tools you already use into one live view. A focused 14-day dashboard build with a fixed price agreed upfront.",
    serviceType: "Business intelligence dashboard development",
    sectionTitle: "One screen your managers\nactually open.",
    sectionSub:
      "The numbers already exist. They’re spread across your booking system, payments, ads and social accounts. A dashboard puts them in one place, live.",
    examples: [
      { title: "Multi-location performance", body: "Revenue, bookings and trends for every location side by side, so you can see which one needs attention this week." },
      { title: "Marketing and channels", body: "Social, ads and streaming numbers next to the bookings and revenue they’re meant to drive." },
      { title: "Command Center views", body: "A single page for owners and managers, styled to your business, replacing the report someone rebuilds every Monday." },
    ],
    signs: [
      "Someone spends hours each week pulling the same report",
      "Each location or team reports its numbers differently",
      "You find out about a bad week after it’s over",
      "Your data is split across five or more logins",
    ],
    includes: [
      "Connections to the data sources agreed in the scope",
      "Views built around the decisions you make each week",
      "Location, team or channel breakdowns",
      "Styled to your business, working on desktop and phone",
      "Ownership of the dashboard and its accounts",
    ],
    timing:
      "A focused dashboard build takes 14 days. The clock starts once the agreed data sources and account access are ready at kickoff, and everything that affects timing is written into the scope first.",
    faq: [
      { q: "What data sources can a dashboard connect to?", a: "Anything with an API. We’ve wired Spotify, TikTok, Instagram, Authorize.net and Acuity into dashboards already. We confirm every source during scoping, before you pay." },
      { q: "Is this different from Looker Studio or Power BI?", a: "Those are tools you configure yourself. We build the finished dashboard for you, around your decisions, including connections those tools don’t offer out of the box." },
      { q: "Will the numbers update automatically?", a: "Yes. The dashboard reads from your tools on a schedule agreed in the scope, so nobody has to export and paste anything." },
    ],
    related: ["integrations", "internal-tools", "web-apps"],
  },
  {
    slug: "websites",
    build: "websites",
    keyword: "Custom website design and development",
    name: "Websites",
    title: "Custom website design, live in 7 days",
    description:
      "Custom website design and development for service businesses: mobile-first, built to turn visitors into enquiries, with a 7-day focused build and a fixed price agreed upfront.",
    serviceType: "Website design and development",
    sectionTitle: "A website that\nwins the enquiry.",
    sectionSub:
      "Your website is often the first thing a customer judges you on. It should make the offer obvious and the next step easy, on a phone, in seconds.",
    examples: [
      { title: "Service business sites", body: "Clear services, real photos and a contact or booking step on every page, so visitors know what to do next." },
      { title: "Landing pages for ads", body: "Focused pages that match what someone clicked on, with tracking set up so you can see which ads bring enquiries." },
      { title: "Redesigns", body: "A dated site rebuilt with custom design, faster pages and a content system your team can update." },
    ],
    signs: [
      "Your site looks dated next to competitors",
      "It’s hard to use on a phone",
      "Visitors arrive but rarely get in touch",
      "Small text changes mean waiting on someone else",
    ],
    includes: [
      "Custom design, built for mobile first",
      "Contact forms, lead capture and booking integrations",
      "An easy-to-update content system",
      "Search basics: titles, descriptions, sitemap and speed",
      "Analytics so you can see where enquiries come from",
    ],
    timing:
      "A focused website build takes 7 days, once the scope, content and access are agreed before kickoff. Bigger sites get their own date in writing.",
    faq: [
      { q: "Do you write the content?", a: "We shape the structure and help tighten the words. The facts about your business come from you, and the scope says exactly what content is needed at kickoff." },
      { q: "Will I be able to update the site myself?", a: "Yes. Every site comes with a content system your team can use for everyday changes, without calling us." },
      { q: "Can you set up tracking for our ads?", a: "Yes. We connect analytics and the ad platforms you use so each enquiry can be traced to where it came from." },
    ],
    related: ["web-apps", "dashboards", "customer-portals"],
  },
  {
    slug: "customer-portals",
    build: "web-apps",
    keyword: "Customer portal development",
    name: "Customer portals",
    title: "Customer portal development, fixed price and date",
    description:
      "A custom client portal where your customers sign in to track progress, approve work, sign documents, share files and pay invoices. Fixed price and delivery date before you pay.",
    serviceType: "Customer portal development",
    headline: "Your customer portal.",
    accent: "Built at speed.",
    intro:
      "Give clients one place to sign in, see where things stand, approve work and pay, instead of another email thread. A fixed scope, price and delivery date, agreed upfront.",
    sectionTitle: "Fewer “any update?”\nemails.",
    sectionSub:
      "We run our own client portal: sign-in with an emailed code, documents to sign, invoices and card payments, file sharing and project updates. We build the same kind of thing for you.",
    examples: [
      { title: "Project and status portals", body: "Clients see each project’s stage, upcoming milestones and what’s waiting on them, without asking." },
      { title: "Documents, approvals and e-signatures", body: "Agreements, proofs and change requests approved or signed in the portal, with a record of who did what and when." },
      { title: "Invoices and payments", body: "Clients see what they owe and pay by card online, and payment updates the project automatically." },
    ],
    signs: [
      "Clients regularly email to ask for status updates",
      "Files go back and forth as email attachments",
      "Approvals get lost or happen over the phone",
      "Invoices are chased by hand every month",
    ],
    includes: [
      "Secure sign-in for each client and their team",
      "The views and actions agreed in the scope",
      "Email notifications for the things clients need to act on",
      "Payments and integrations with the tools you already use",
      "Your code, data and accounts, handed over",
    ],
    timing:
      "A portal gets its own delivery date after scoping, in writing with the price. You review a working version at the halfway mark, before launch.",
    faq: [
      { q: "Is a custom portal better than an off-the-shelf client portal?", a: "Not always. If an existing product fits your workflow, use it. A custom portal makes sense when your process is what sets you apart, or when you’re stitching several tools together to fake one." },
      { q: "Can clients pay invoices in the portal?", a: "Yes. Card payments can be built in, with the payment marking the invoice paid and updating the project." },
      { q: "Is client data kept private?", a: "Each client only sees their own records. Access rules are part of the written scope, and the data lives in accounts you own." },
    ],
    related: ["web-apps", "internal-tools", "integrations"],
  },
  {
    slug: "internal-tools",
    build: "web-apps",
    keyword: "Internal tool development",
    name: "Internal tools",
    title: "Internal tool development: replace the spreadsheet",
    description:
      "Custom internal tools for quoting, scheduling, approvals and job tracking, built around how your team works. Replace the spreadsheet with a fixed price and delivery date.",
    serviceType: "Internal business software development",
    headline: "Your internal tool.",
    accent: "Built at speed.",
    intro:
      "Replace the spreadsheet, the shared inbox or the patchwork of apps with one tool built around how your team works. A fixed scope, price and delivery date, agreed upfront.",
    sectionTitle: "Built around how\nyour team works.",
    sectionSub:
      "Generic software makes your team adapt to it. An internal tool does the opposite: the fields, steps and rules are yours, and nothing else gets in the way.",
    examples: [
      { title: "Quoting and estimating", body: "Turn your pricing rules into a tool that produces a consistent quote in minutes, not a spreadsheet that only one person trusts." },
      { title: "Scheduling and job tracking", body: "Who’s doing what, where and when, with the status of every job visible to the people who need it." },
      { title: "Approvals and requests", body: "Purchase requests, time off or sign-offs routed to the right person, with a record of every decision." },
    ],
    signs: [
      "A critical spreadsheet breaks when someone edits the wrong cell",
      "Work is tracked in a shared inbox or group chat",
      "The same information gets typed into several systems",
      "New staff need weeks to learn the workarounds",
    ],
    includes: [
      "Sign-in with roles for each part of your team",
      "The workflow, fields and rules agreed in the scope",
      "Imports from your existing spreadsheets",
      "Connections to the tools you already rely on",
      "Your code and accounts, handed over",
    ],
    timing:
      "Internal tools get their own delivery date after scoping. We agree the smallest complete version first, so your team is using it sooner, and add the rest after.",
    faq: [
      { q: "Can you move our existing spreadsheet data across?", a: "Yes. Importing your current data is part of the scope, so the tool starts full rather than empty." },
      { q: "What if our process changes later?", a: "Because it’s yours, it can change with you. Changes are scoped and priced in writing, or covered by a cancel-anytime retainer." },
      { q: "Do we need IT staff to run it?", a: "No. It’s hosted for you, and hosting and support are agreed separately before you commit." },
    ],
    related: ["web-apps", "dashboards", "integrations"],
  },
  {
    slug: "integrations",
    build: "dashboards",
    keyword: "API integrations and workflow automation",
    name: "Integrations",
    title: "API integrations and workflow automation",
    description:
      "Connect the tools your business already uses so data moves on its own: booking, payments, social and ad platforms, CRMs and spreadsheets. Fixed price and date, agreed upfront.",
    serviceType: "API integration and workflow automation",
    headline: "Your tools, connected.",
    accent: "Built at speed.",
    intro:
      "Stop copying data between systems by hand. We connect the tools you already pay for so information moves on its own, with a fixed scope, price and delivery date agreed upfront.",
    sectionTitle: "If it has an API,\nit can be connected.",
    sectionSub:
      "We’ve wired Spotify, TikTok, Instagram, Authorize.net and Acuity into live dashboards. The same work connects your booking, payments, CRM and spreadsheets to each other.",
    examples: [
      { title: "Data syncing", body: "New bookings, payments or leads copied to the systems that need them, without anyone re-typing them." },
      { title: "Reporting feeds", body: "Numbers from several platforms collected on a schedule and sent to one dashboard or report." },
      { title: "Workflow automation", body: "When something happens in one tool, the next steps happen in the others: a record created, a message sent, a task assigned." },
    ],
    signs: [
      "Someone exports and re-imports data every week",
      "Your tools disagree about the same customer",
      "Mistakes come from re-typing the same details",
      "Zapier-style automations keep breaking or getting expensive",
    ],
    includes: [
      "The connections and rules agreed in the scope",
      "Error alerts when a connected service misbehaves",
      "Documentation of what moves where",
      "Accounts and credentials kept in your name",
      "Ongoing monitoring available on a retainer",
    ],
    timing:
      "Integration timelines depend on the systems and the access they allow. Each one is checked during scoping, and the delivery date goes in writing before you pay.",
    faq: [
      { q: "Which tools can you integrate?", a: "Anything with an API or a reliable export. We confirm each one during scoping, including what the platform allows, before a price is agreed." },
      { q: "What happens if a connected service changes?", a: "Platforms do change their APIs. Monitoring and fixes can be covered by a cancel-anytime retainer, agreed separately." },
      { q: "Do we need to replace any of our current tools?", a: "Usually not. The point is to make the tools you already pay for work together." },
    ],
    related: ["dashboards", "internal-tools", "customer-portals"],
  },
  {
    slug: "mvp-development",
    build: "web-apps",
    keyword: "MVP development",
    name: "MVPs",
    title: "MVP development: your first product, built fast",
    description:
      "MVP development for founders and businesses launching a product: the core workflow, accounts and payments, built as a focused first version with a fixed price and launch date.",
    serviceType: "MVP and product development",
    headline: "Your first product.",
    accent: "Built at speed.",
    intro:
      "Get the core of your product in front of real users, without a long agency project. A focused first version with a fixed scope, price and launch date, agreed upfront.",
    sectionTitle: "The smallest version\nworth launching.",
    sectionSub:
      "We’ve taken our own products from idea to working software: Tender, a marketplace with accounts, payments and administration, and FocusTap. We bring the same discipline to yours.",
    examples: [
      { title: "Marketplaces", body: "Two sides, accounts for each, listings or requests, and payments between them." },
      { title: "Subscription products", body: "Sign-up, plans, billing and the core feature people are paying for." },
      { title: "Workflow products", body: "A tool for a specific industry or job, built around the one workflow that makes it worth paying for." },
    ],
    signs: [
      "You have an idea and early interest, but nothing to show",
      "Agency quotes are measured in months",
      "A no-code prototype has hit its limits",
      "You need something real to put in front of users or investors",
    ],
    includes: [
      "Product scoping: what’s in version one and what waits",
      "Accounts, payments and the core workflow",
      "A working review at the halfway mark",
      "Launch, then your code and accounts handed over",
      "Room to grow, with us or with your own team",
    ],
    timing:
      "Version one gets a launch date in writing after scoping. Keeping the first version focused is how it ships quickly, and the scope spells out what comes after.",
    faq: [
      { q: "Do I own the code?", a: "Yes. You own the code, repositories and accounts, so you can keep building with us or hand it to your own team." },
      { q: "Can you help decide what goes in the first version?", a: "That’s the point of the scope call. We help you find the smallest complete version that proves the idea." },
      { q: "Will it scale if the product takes off?", a: "It’s built on standard, widely used technology that grows with you. What happens after launch is scoped separately, when you know what users want." },
    ],
    related: ["web-apps", "customer-portals", "integrations"],
  },
];

export function topicBySlug(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}
