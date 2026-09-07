# SKOX: landing-page audit, market findings and conversion plan

Prepared September 6, 2026. Scope: the existing SKOX repository, a rendered inspection of skoxsoftware.com, current primary-source market research, competitor offers, a complete local landing-page rebuild, and functional verification.

[Desktop preview](preview-desktop.png) · [Mobile preview](preview-mobile.png) · [Verification results](verification.md)

## The recommendation

Lead with fast delivery of useful, custom software. Keep websites, web apps and dashboards available, as requested. Give each a distinct paid-traffic entry page so a prospective website client immediately sees a website offer, while a dashboard buyer sees reporting and connected data.

The business does not need to pick one industry to make its first sale. An individual ad does need one recognizable buyer problem, one relevant offer and one next step. “We can build anything” describes capacity; it does not give someone a reason to act today.

The proposed position is **custom software, built at speed, with the commercial details agreed upfront**. Speed earns attention. Clear scope, visible working software and direct founder access make that speed believable. The site should sell getting a business need into use, with the delivery date as supporting evidence.

This is a researched starting hypothesis, not a demonstrated conversion lift. Historical traffic, qualified lead volume, win rate, acquisition costs and customer revenue were unavailable. Page Duel returned a reauthentication error. No claim here relies on private analytics or invented client results.

## What the old page was doing well—and where it was losing clarity

| Area | Observed evidence | Conversion implication | Action in the rebuild |
| --- | --- | --- | --- |
| Positioning | The first screen lists websites, dashboards, internal tools and AI; the body expands into six capability categories. | Buyers have to identify their own use case inside a broad software pitch. | Three recognizable categories; focused service landing pages. |
| Speed | The concrete 7-day site and 14-day dashboard offers appear later, while the live headline says only that a date will be committed to. | The user's intended differentiator is less prominent than the generic “custom software” category. | “Built at speed” leads every route, supported by scoped delivery offers and a clear process. |
| Visual hierarchy | Dark, atmospheric hero, subdued type, multiple navigation groups and staggered entrance animations. | The visual treatment emphasizes atmosphere; critical content waits for animation. | Light editorial layout, strong type, amber CTA, immediate server-rendered headline and enquiry action. |
| Page sequence | Problem stack, calculator, capabilities, AI front desk, offer, products, risk, why-us, team, refusals, FAQ and another form. | The visitor repeatedly shifts between different purchase stories. | Six major sections: hero, builds, process, founders/products, FAQ and enquiry. |
| Relevance | The missed-enquiry calculator and front-desk chat are prominent even for app or dashboard visitors. | A useful demonstration for one buyer becomes a detour for another. | Interactive previews for the three core build types; automation retained as a supporting capability. |
| Proof | Founder biographies, Tender and FocusTap exist, but product URLs and testimonials are absent. | There is experience to discuss, but little independently inspectable evidence. | Founder credibility appears immediately; own products remain clearly identified. Concepts never masquerade as client work. |
| Commercial clarity | A $6,500–$75,000 range appears in calculator copy, while the FAQ asks why pricing is absent. | Visitors can encounter conflicting signals. | One consistent written-quote explanation. No new price was invented. Confirm an actual minimum before advertising. |
| Risk language | Copy repeatedly asserts an unchanging date, with unclear treatment of customer dependencies and scope changes. | An unusually absolute promise can create skepticism and delivery disputes. | Focused timelines explicitly depend on scope, content and access; changes affecting price/date are agreed in writing. |
| Calls to action | “Get my price and date,” “Get your free scope,” “Get my free scope,” plus two forms. | The next step sounds inconsistent. | One primary action: “Get my price & timeline”; one reusable form on each route. |
| Lead delivery | The existing endpoint already returns 503 if Resend is absent. Local mail credentials are absent; README describes outdated success/logging behavior. | Paid traffic cannot be considered ready until production email delivery is confirmed. | Preserve honest failures; add provider timeouts, error handling, input validation and regression coverage. |
| Measurement | UTMs and gclid/fbclid capture, Vercel Analytics and a confirmation URL already exist. | Useful foundation, but no evidence of configured ad-platform conversion tracking or downstream qualification. | Keep attribution; add CTA, form-start and demo events; count successful submission only after server confirmation. |

The live site responded with HTTP 200. Initial restricted DNS access failed locally; this was a tool-network limitation, not evidence that the domain was down. Browser inspection succeeded through an isolated Chrome instance after the in-app Browser runtime failed to initialize.

## SKOX’s strengths, with evidence boundaries

**1. Fast, bounded delivery.** Existing copy offers focused site, dashboard and automation builds on short schedules. This is a saleable promise if the scope and dependencies are real. The rebuild retains the 7-day site and 14-day dashboard offers with their prerequisites; it does not extend those promises to every app.

**2. Direct access to two accountable builders.** The existing team is named, with real photos. Clients can speak to the people doing the work. Make this a practical advantage—fewer handoffs and faster decisions—rather than repeatedly defending team size.

**3. An operator’s view of software.** Josh’s existing biography describes strategy and operations for a multi-location healthcare group. That is a stronger starting point for dashboards, portals and internal workflows than generic technical expertise. It is founder experience, not proof of a SKOX client engagement or a healthcare compliance capability.

**4. Product experience.** Existing project descriptions identify Tender and FocusTap. They can support a conversation about accounts, payments, workflow and shipping products. The current repository does not provide live links, screenshots, external customer references or audited results. Avoid turning those descriptions into invented case studies.

**5. Commercial control for the buyer.** Written scope, fixed price, a working midpoint review and customer ownership are already part of the offer. Present them once, clearly. Identify recurring hosting/service costs separately rather than implying the one-off development fee is the entire lifetime cost.

The strongest combined proposition is speed plus accountability and ownership. None of those alone is exclusive; together, demonstrated on a real project, they can justify choosing a small studio.

## What the market wants now

The sources below are current observations, not evidence that a particular SKOX service has a known search volume or conversion rate. Survey populations and question wording differ; percentages should not be averaged.

| Source and date | Finding | Implication for SKOX |
| --- | --- | --- |
| [U.S. Bank Small Business Perspective, June 2026](https://ir.usbank.com/news-events/news/news-details/2026/U-S--Bank-Survey-Finds-Gen-Z-Small-Business-Owners-Are-Making-Bigger-Bets-to-Drive-Growth/default.aspx) | Survey of 1,000 owners, including a Gen Z oversample. Predictable fees were preferred by 92%. Among AI users, 53% also reported negative effects such as complexity or overstated benefits. | Sell an understandable result and predictable project cost. Avoid leading with AI novelty. The fee finding concerns tools, not custom-development purchasing directly. |
| [Goldman Sachs 10,000 Small Businesses Voices, March 2026](https://www.goldmansachs.com/pressroom/press-releases/2026/small-businesses-embrace-ai-but-need-training-and-support-to-fully-harness-it) | Among 1,256 program participants, 76% used AI but only 14% had fully integrated it into core operations. Efficiency/productivity was cited as a primary benefit by 84% of AI users. | There is an implementation gap worth exploring: connect a real workflow and make it useful. This program cohort is not a representative census of all small businesses. |
| [NFIB technology survey, June 2025](https://www.nfib.com/news/press-release/new-nfib-report-how-small-businesses-incorporate-tech-and-ai-advancements/) | 82% of surveyed small employers had a website; 57% had introduced new or significantly improved technology in the previous two years. | Much of the website opportunity is improving an existing presence. Ask what the current site fails to do, rather than assuming the buyer needs a first website. |
| [U.S. Chamber technology findings, August 2025](https://www.uschamber.com/co/run/technology/impact-of-technology-small-business) | 58% of surveyed businesses used four or more technology tools; roughly a third used six or more. | Connected reporting and workflows address a recognizable operational condition. Tool count alone does not establish demand for custom dashboards. |
| [Google Ads: improve Quality Score](https://support.google.com/google-ads/answer/6167130?hl=en) | Google advises matching ad language to search intent and making the destination relevant and useful. | Keep the business broad, but route each campaign to a matching service page. |

My inference: SKOX should market practical improvements—launch a credible site, give customers a usable portal, eliminate recurring report assembly—and use speed as the reason to do it now. “AI transformation” would place SKOX in a noisier category with a greater burden of proof.

## The competitive alternatives

These are public offer comparisons, not claims about competitors’ conversion rates or delivery quality.

| Alternative | What the buyer sees | What to learn / where SKOX can compete |
| --- | --- | --- |
| [Designjoy](https://www.designjoy.co/) | A productized design subscription, visible pricing, work samples and average 48-hour delivery language with complexity qualifications. Adjacent, not equivalent to a software engineering engagement. | Speed is already common in creative services. Make output, scope and ownership tangible; do not compete on a bare “fast” claim or copy their subscription economics. |
| [thoughtbot](https://thoughtbot.com/services) | Product design, strategy and engineering organized around product stages, specialist teams and a substantial body of resources. | Established studios offer confidence and depth. SKOX can make a smaller, focused engagement easy to understand and begin, while building its own proof library. |
| [Smith.ai](https://smith.ai/pricing/ai-receptionist) | A ready-made AI front desk, explicit plans, testing, scheduling and integrations. | A generic receptionist demo invites comparison with packaged software. Custom integration is the stronger story when off-the-shelf tools do not fit. This is why front-desk AI no longer dominates the homepage. |
| Off-the-shelf products / an existing vendor | The buyer may already have a way to solve part of the problem without a custom build. | The scope call must identify the actual gap. Do not sell a new app when configuring an existing tool solves the need; honest fit builds trust. This is strategic judgment, not a measured competitor claim. |

## The new conversion architecture

**Homepage:** “Your next big thing. Built at speed.” Explicit supporting copy names websites, web apps and dashboards. A visible CTA offers price and timeline, then explains that the next step is a free scope call—not an instant automated quote.

**Service routes:** `/websites`, `/web-apps`, `/dashboards`. Each changes the headline, introduction, initial demo, service ordering, metadata, canonical URL and form selection. They share one maintained page and form implementation. They are intent-specific entry points, not A/B tests.

**Visual demonstration:** A dashboard period switch, an approval workflow and a website concept. All use sample content and carry visible demo/concept labels. They show interaction and design direction, not actual customer results. Replace or complement these with real product captures when available.

**Offer and process:** Three build choices, inclusions and scoped timing. Then the three-step path: understand the goal, put the terms in writing, review working software and launch.

**Trust:** Real founders and existing own-product descriptions. No fabricated star ratings, customer logos, testimonials, revenue lift, countdowns or scarcity.

**Enquiry:** Name, email and a short project description are required; project type is optional and preselected on service routes. Validation identifies the field and moves focus to it. Submission disables repeat clicks. Failure retains the entered details and offers an email draft. Provider acceptance, not a button click, triggers `scope_request` and the confirmation route.

**Mobile and accessibility:** Persistent mobile enquiry action, clearly labeled fields, native FAQ disclosure, keyboard-operable preview tabs, visible focus styles, reduced-motion support and no initial content hidden by an entrance animation. The sticky CTA hides when the form is focused or targeted.

## How to test paid acquisition without confusing traffic with demand

1. **Establish a working sales path.** Confirm the production sender, destination inbox and reply handling. Submit one authorized real enquiry, verify the inbox, reply and check the confirmation event. A provider-accepted email is not proof it landed in the inbox. Set up an actual booking URL if immediate booking is operationally useful.
2. **Choose the first service based on proof and economics.** You can accept all three, but the first paid test should favor the service with the best credible example and a profitable minimum engagement. If the budget is too small to learn across three groups, run one first.
3. **Start with intent.** Test narrowly grouped search terms such as custom website development, customer portal development, or a concrete dashboard use case. Validate actual search demand and estimated CPC in Keyword Planner before committing a budget. Those figures were not available in this research. Broad informational “AI” terms are not an appropriate default.
4. **Match the ad to the destination.** Website copy goes to `/websites`; portals/apps to `/web-apps`; reporting to `/dashboards`. Keep the promised scope/date consistent. Screen early search terms for job-seekers, tutorials, free templates and unrelated software categories.
5. **Track the full funnel.** Visit → CTA → form start → provider-confirmed enquiry → qualified lead → attended call → written proposal → won client. Track project value and delivery margin alongside the originating campaign. Demo clicks are diagnostic, not revenue conversions.
6. **Set the economics before a spend cap.** Maximum sustainable acquisition cost should come from expected gross profit and cash-flow constraints, not top-line project revenue. As an illustrative calculation only: a chosen $1,000 acquisition allowance and a 10% qualified-lead-to-client rate imply a $100 ceiling per qualified lead. If only half of submitted enquiries qualify, that implies $50 per submitted enquiry. These are example assumptions, not recommended SKOX targets or forecasts.
7. **Use early traffic to diagnose, not declare victory.** CTA clicks without form starts can indicate friction or weak offer continuity. Starts without completion suggest form trouble or uncertainty. Plenty of enquiries but few qualified conversations points toward targeting/price fit. Qualified proposals without wins points toward proof, offer or sales handling. Check delivery and measurement before interpreting any drop-off.
8. **Test one material question at a time.** First, concrete timing versus broad speed in the headline. Next, real project proof versus the concept preview. Then a confirmed minimum price versus quote-only copy. Use a defined primary metric and sufficient sample size; a handful of wins or a few hundred visits is not automatically a statistically reliable A/B result.

Illustrative message directions, requiring the same scoped terms as the page:

- Website: “A custom website, without the drawn-out build. Get a fixed price and a scoped launch date.”
- Web app: “Get your customer portal into people’s hands. Work directly with the builders.”
- Dashboard: “Stop assembling the same report. Bring your business numbers into one view.”

No campaign has been created, no budget has been committed and no ad-platform pixel has been represented as configured. Vercel custom events and a thank-you URL do not automatically configure Google Ads or Meta. Connect the chosen platform, implement its appropriate conversion setup, and confirm that refreshes/direct visits do not generate duplicate qualified conversions. Capture downstream qualification rather than optimizing indefinitely for raw form volume.

## The evidence to collect next

The most valuable additions are a real screenshot or short product walkthrough, the starting business problem, the exact scope, actual delivery time, and a permissioned client quote or measured result. Keep owned products separate from client engagements. If a metric is used, document its baseline, period and attribution limitations.

Also confirm the commercially useful minimum project price, whether the 7/14-day offers mean calendar or business days, actual available start dates, ongoing support terms and the founders’ ability to meet the one-business-day response promise. These cannot be reliably inferred from the repository. The rebuild does not invent answers.

## Verification and remaining release work

The implementation preserves the existing Next.js/Vercel project. It does not migrate hosting or add a paid service. Production publication is separate from the local rebuild.

Automated checks cover malformed request bodies, field types, provider absence/rejection/network failure, confirmed provider success, project/attribution preservation, bot trapping and rate limiting. Browser checks exercise preview controls, keyboard tabs, FAQ, form error focus, retained failed submissions, the email fallback and mocked success navigation. Layout checks cover 320, 390, 768, 1024 and 1440 pixels, plus reduced motion and dark system preference.

Local browser tests do not establish field performance or conversion improvement. For launch monitoring, Google’s [Web Vitals guidance](https://web.dev/articles/vitals?hl=en) targets LCP at or below 2.5 seconds, INP at or below 200 ms and CLS at or below 0.1 at the 75th percentile. Verify those against real traffic after deployment.

Release dependencies: review the actual page; verify production email delivery; confirm commercial claims and service economics; attach real proof; configure the selected ad conversion; publish through the existing Vercel workflow. Historical performance remains unknown until analytics access is restored.
