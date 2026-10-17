# The offer ads can sell

Source of truth: `content/landing.ts`. If this file and that one disagree, `landing.ts` wins and this file is out of date.

## One sentence

Custom web apps, dashboards and websites, built at speed, with a fixed price and a delivery date agreed in writing before you pay. You work directly with the two founders who build it, and you own the code.

## The three landing routes

Every ad points to the route that matches its search intent. Each route changes the H1, intro, page title, canonical, demo tab and the form's pre-selected build type. The rest of the page is identical to the homepage.

| Route | H1 | Intro (verbatim) | Day promise | Condition (verbatim) |
|---|---|---|---|---|
| `/web-apps` | Your next web app. Built at speed. | "Take your portal, internal tool or product from idea to working software. Work directly with the builders, with a fixed scope, price and delivery date." | None. "Your scope. Your delivery date." | "Complexity sets the schedule. We agree it in writing." |
| `/dashboards` | Your next dashboard. Built at speed. | "Turn disconnected tools and weekly spreadsheet work into one clear view of your business. A focused dashboard build, with scope, price and timing agreed upfront." | "14-day focused dashboard build" | "Timing depends on agreed data sources and access." |
| `/websites` | Your next website. Built at speed. | "Turn a dated site into a clear, credible reason to choose you. Custom design, mobile layouts and lead capture, with a fixed price and a launch date agreed upfront." | "7-day focused site build" | "Scope, content and access agreed before kickoff." |
| `/` | Your next big thing. Built at speed. | "Custom web apps, dashboards and websites. We take what your business needs and turn it into working software—with a fixed price and a delivery date agreed upfront." | Both of the above | Both of the above |

Page titles: "Custom web apps, built at speed", "Custom dashboards, built at speed", "Custom websites, built at speed".

What each build includes (from `builds[].includes`):
- **Web apps:** customer portals & internal tools; accounts, payments & integrations; a focused first version you can use.
- **Dashboards:** connected data from your existing tools; location & team performance views; reporting built around your decisions.
- **Websites:** custom design, built for mobile; lead capture & booking integrations; an easy-to-update content system.

The FAQ adds: "Those timelines apply to an agreed scope with the required content, data and account access ready at kickoff. Web apps and larger projects get their own delivery date after scoping."

**Open question for Josh:** are 7 and 14 days calendar days or business days? The San Julián's proposal said "seven business days". Until answered, ads say "7-day" / "14-day" exactly as the site does and never "one week" or "two weeks".

## The call to action

- Button everywhere: **"Get my price & timeline"**
- Under it: "Free 30-minute scope call. No deposit. No obligation."
- After submit: "Next: a reply within one business day to arrange your free 30-minute scope call."
- What they get from the call (`formBenefits`): a 30-minute conversation with a founder; a written scope, fixed price and delivery date; the plan is theirs whether they hire SKOX or not.

Google Ads CTA choice: "Get quote" (Demand Gen / video). Meta CTA button: "Get quote" or "Learn more"; "Get quote" matches the page.

## What happens after someone submits

1. The form posts to `/api/contact`. Resend emails the lead to `CONTACT_EMAIL` with the journey (UTMs, gclid/fbclid, pages viewed, location, device, company lookup).
2. Only after Resend accepts it does the browser fire `scope_request` (GA4 `generate_lead`, Google Ads conversion, Meta `Lead`) and go to `/scope-received`.
3. A founder replies within one business day to book the 30-minute call.

## What the offer is NOT

- **Not the AI front desk.** That's the biz-stack outreach offer. No delivered client yet.
- **Not "automation" as a headline product.** The site mentions it in one supporting line only: "Need your tools connected, or a workflow automated? We build that in, too." No "10-day automation sprint" (legacy copy, not live).
- **Not retainers or hosting.** Mentioned in the FAQ, never advertised.
- **Not native iOS/Android apps.** Web apps only.
- **Not paid ads management for clients.** SKOX doesn't sell this.
- **Not a price.** No number appears on the site, so none appears in ads.
- **Not local.** Location was deliberately removed from the site ("Working everywhere"). Targeting can be geographic; copy is not.

## Real deals so far (private — never in ads)

| Client | What | Price |
|---|---|---|
| Lorenzen Motors | Website | $1,250 (50% deposit), $59/mo hosting option |
| San Julián's Coffee Bar | Website proposal (not sent) | $2,500, $249/mo care |
| Credit Snitch | Product build proposal | $4,500 paid discovery; $75,000 Phase One |

These feed `economics.md` only.
