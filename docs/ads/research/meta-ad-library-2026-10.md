# Meta Ad Library research: winning ads aimed at SKOX's buyer

**Date:** 2026-10-05 · **Scope:** US, active ads only · **Source:** public Meta Ad Library (facebook.com/ads/library), read in a browser
**Cost incurred:** $0.00. The planned Apify runs (`brilliant_gum/facebook-ads-library-scraper`) were refused before starting with "Monthly usage hard limit exceeded" on the Apify account, so no run started and nothing was charged. All data below was read by hand from the public Ad Library.

## Method and data gaps (read this first)

- **Winner signal.** An ad still active today that started on or before 2026-08-06 (60+ days). I filtered with the Ad Library's start-date filter (`start_date[max]=2026-08-06`) and sorted by impressions, so each list shows survivors that are also getting delivery.
- **Days running** = 2026-10-05 minus "Started running on". When an ad "has multiple versions" (dynamic creative), the start date is for the ad ID. A relaunch or duplicate resets it, so real creative age can be **longer** than shown, never shorter.
- **What I couldn't get:**
  - Spend and reach. Meta hides these for US non-political ads.
  - Exact format for ads without a video player. If the card showed a player (`0:xx`) it's listed as **video**. Otherwise it's listed as **static**, which may be an image or a carousel.
  - Landing URLs for most ads. The scraper's snapshot resolver would have provided these; the Ad Library card shows only a domain, and only sometimes.
- **Coverage.** About 25–30 top cards per query, not every ad.
  - **FieldEdge** and **Workiz** run no long-lived US ads of their own (3 and 5 matches, all third parties).
  - **Databox:** 0 results.
  - **"Franchise owners" / "multi-location dashboard":** almost nothing relevant. Those searches return franchise sales and unrelated ads.
  - So the reporting-for-franchise-owners space is **not being advertised on Meta**. That's an opportunity, and it also means there are no proven hooks to copy for that exact buyer.
- Queries run: ServiceTitan, Jobber, "Housecall Pro", FieldEdge, Workiz, Databox, AgencyAnalytics, JITAI, "multi-location" dashboard, franchise owners software, home service business owners, contractors dashboard, contractor marketing booked jobs, quoting software contractors.

## Top 15 winners (60+ days, still active)

Hooks are short quotes (under 15 words), not whole ads. "Offer" is what the CTA leads to.

| # | Advertiser | Started | Days | Format | Hook (first line) | Headline | CTA | Landing | Offer |
|---|---|---|---|---|---|---|---|---|---|
| 1 | ServiceTitan | 2025-07-23 | 439 | static, multi-version | "Electrical Invoicing doesn't have to be hard." | Electrical Invoice Template | Download | servicetitan.com (gated) | Free template |
| 2 | ServiceTitan | 2025-07-23 | 439 | static, multi-version | "flat-rate electrical price list template makes bidding simpler, faster" | Electrical Flat-Rate Price List Template | Download | servicetitan.com | Free template |
| 3 | Housecall Pro | 2025-08-21 | 410 | static (video cut since 2025-11-10, 329 d) | "Invoicing, tap to pay, auto charge, ACH, financing, and more." | Get Paid Today | Learn More | housecallpro.com | Product (payments) |
| 4 | PaintForce App | 2025-09-24 | 376 | static | "You're losing jobs because your quotes are slow, unclear" | — | — | — | Quoting app |
| 5 | ServiceTitan | 2025-11-14 | 325 | static | "That cash flow gap kills growth." | Get Paid Instantly on the Job | Book Now | servicetitan.com | Demo |
| 6 | ServiceTitan | 2026-01-14/16 | 262–264 | static, multi-version | Same template ads repeated per trade (plumbing, HVAC) plus "2026 Roofing & Exterior Market Report" | Plumbing/HVAC Flat-Rate Price List Template | Download | servicetitan.com | Template / report |
| 7 | CashFlow Pro | 2026-04-13 | 175 | static | "Busy, but broke?" | CashFlow Pro | — | cashflowproapp.com | Free trial |
| 8 | Blue Collar Business Accelerator | 2026-04-24 | 164 | static/long copy | "Home-service business owners:" (direct callout) | — | — | — | Free training |
| 9 | Hardhat Ledger | 2026-04-30 | 158 | static | "Built for Contractors. Know Your Profit." | — | Learn More | — | Free trial |
| 10 | Jobber via creators (Keith Kalfas, That Lawn Dude, glen_c_owner) | 2026-05-12/20 | 138–146 | video, 37–60 s, partnership ads | "Quote, schedule, invoice and get paid - all in one tool." | Claim Your Free Trial | Sign up | go.getjobber.com | 14-day free trial |
| 11 | ServiceTitan | 2026-05-28 | 130 | static | "Spring and fall don't have to mean a revenue cliff." | Fill Your Slow Months | — | servicetitan.com | Demo |
| 12 | Jobber | 2026-06-22 | 105 | static, multi-version | "You didn't build your business to spend every night and weekend on paperwork." | Get paid. Then get home. | Sign Up | getjobber.com | Free trial |
| 13 | AgencyAnalytics | 2026-06-22 | 105 | static, 6+ variants | "Your team wasn't hired to build reports." / "Messy spreadsheets don't impress clients." | Reporting in Minutes, Not Hours | Contact Us / Learn More | agencyanalytics.com | Demo / trial |
| 14 | ServiceTitan | 2026-06-19 | 108 | static | "When you're managing multiple crews and jobs at once…" | Crew Scheduling For Retail Roofers | Learn More | servicetitan.com | Demo |
| 15 | ServiceTitan | 2026-07-13 | 84 | static | "Your office manager starts their day by opening five tabs" | — | Book (demo) | servicetitan.com | Demo |

**Close runners-up (60–112 days):**

| Advertiser | Started | Days | Format | Hook | Notes |
|---|---|---|---|---|---|
| Ascora | 2026-06-15 | 112 | static | "Past Jobber, but overwhelmed by ServiceTitan?" | Names competitors |
| Relentless Digital | 2026-06-22 | 105 | static/video | "Impressions don't pay your techs." / "Booked jobs and tracked revenue do." | Contractor marketing agency, $1M+ qualifier |
| SubContractor Hub | 2026-07-02 | 95 | static | "More Jobs. Less Chaos." | |
| FieldRoutes (ServiceTitan) | 2026-07-07 | 90 | static | "How much revenue are you losing to 'windshield time' every week?" | |
| Jobber | 2026-07-08 | 89 | video, 15 s | Customer revenue story | Proof-led |
| JITAI Systems | 2026-07-17 | 80 | static, long copy | "The problem is usually what happens between the systems." | Connects ServiceTitan/Jobber/HCP etc. The closest positioning to SKOX found |
| SmartCrew | 2026-07-21 | 76 | static | "Running a 5–50 person dirtwork company and tired of juggling multiple apps" | Wants "real financial data" per job |
| Jobber | 2026-07-28 | 69 | video, 26 s | "Pen and paper. Missed calls. A calendar that can't keep up." | |
| Housecall Pro | 2026-07-29 | 68 | static | "Free live demo + $50 Amazon gift card." | Paid-attendance demo |
| Unsliced Restaurant System | 2026-07-30 | 67 | static | Owner of 12 restaurants offering "the dashboard that power[s]" them | Multi-unit owner buyer, not a field-service buyer |

**Emerging (under 60 days, but heavily duplicated, so worth watching):**
- Jobber, started 2026-09-21: "'Did we have a good month?' shouldn't require a spreadsheet." 12 ads share the creative. This is SKOX's dashboard pitch almost word for word.
- Jobber, started 2026-09-11: "no matter how many crews you're running", headline "Stay in command". 14 ads share the creative.
- Jobber, started 2026-08-10: "Stop being last to know what happened on the job." 4 ads share the creative.

## Recurring angles

1. **Time and admin pain, framed as nights and weekends.** This is the dominant angle (Jobber, ServiceTitan, AgencyAnalytics).
   - Examples: "every night and weekend on paperwork", "follow-ups at 9 pm", "copy-paste job at 11pm", "five tabs to process a single job".
   - The pain is concrete, and the moment is one the owner recognises.
2. **Visibility and control as you grow.** This is the newest angle and Jobber is scaling it hard.
   - Examples: "Did we have a good month?", "last to know what happened on the job", "no matter how many crews", "Stay in command".
   - ServiceTitan adds "multiple crews and jobs at once", and SmartCrew adds "real financial data to know which jobs are on track".
3. **Money leaks.**
   - Examples: cash-flow gap (ServiceTitan), windshield time (FieldRoutes), slow months (ServiceTitan), slow and unclear quotes (PaintForce).
   - Revenue lost to a gap, never "save money".
4. **Tools that don't talk to each other.**
   - Examples: "juggling multiple apps, spreadsheets" (SmartCrew), "what happens between the systems" (JITAI), "Messy spreadsheets" (AgencyAnalytics), "five tabs" (ServiceTitan).
5. **Outcome over activity.** Relentless Digital: "Impressions don't pay your techs… booked jobs and tracked revenue do." This is the ad spend → booked jobs logic.
6. **Proof types used:**
   - customer revenue stories ("$200K to $1.2M", "scaled to $20M", "100 hours to 40")
   - user counts ("400K+ pros")
   - review quotes
   - "named easiest" awards
   - creator partnership ads, where a real owner posts as "X with Jobber"
7. **Qualifier callouts in line one.**
   - Examples: "Home-service business owners:", "Running 5+ HVAC technicians", "doing $1M+", "5–50 person", "10–50 Technicians".
   - Big players also split one ad by trade (electrical / plumbing / HVAC / roofing / pest / carpet cleaning versions of the same creative).

## Formats

- **Static images dominate the longest runners.** All ServiceTitan lead-magnet ads, Housecall Pro "Get Paid Today", PaintForce and Hardhat Ledger are static. Long-lived statics are cheap to keep running and keep converting.
- **Short video (15–40 s)** is how Jobber and Housecall Pro run their brand and trial ads. Many are newer (Jul–Sep 2026), which means they rotate faster.
- **Creator/partnership video (37–60 s):** Jobber has run these since May 2026, under owners' handles.
- **Multi-version (dynamic creative)** is on most big-player ads. Meta mixes the text variants.
- No carousel showed up as a long-running winner among relevant advertisers.

## Offers and lead magnets

| Offer | Who | Longevity |
|---|---|---|
| Free downloadable template (invoice, flat-rate price list, maintenance checklist) | ServiceTitan | **Longest-running in the whole set (439 days)** |
| Industry report / benchmark ("2026 Market Report", "494 agencies") | ServiceTitan, AgencyAnalytics | 80–262 days |
| Free trial (14 days) | Jobber, Hardhat Ledger, CashFlow Pro, AgencyAnalytics | 100–175 days |
| Demo (sometimes paid: $50 gift card) | ServiceTitan, Housecall Pro, Aspire, FieldRoutes | 60–325 days |
| Low first-month price ($26) | Housecall Pro | ~68 days |
| "Leads or you don't pay" guarantee | Contractor marketing agencies (John Cameron, S&C Digital) | ~60–139 days |
| Free training / VSL | Blue Collar Business Accelerator, Digital Shift | 160+ days |

## Creative patterns worth noting

- **The hook names a moment, not a feature.** For example "every night and weekend", "starts their day by opening five tabs", or "at 11pm".
- **The headline is a short benefit pair.** Examples: "Get paid. Then get home.", "Reporting in Minutes, Not Hours", "More Jobs. Less Chaos.", "Know Your Profit."
- **They sell a vertical with the same creative.** The text and creative stay the same and only the trade noun changes. ServiceTitan keeps every trade version alive for 260–440 days.
- **The lead magnet sits next to the work.** Every ServiceTitan template is something the owner uses on the job, which earns the download.
- **"Not replacing your software" positioning (JITAI).** It lists the tools the buyer already has and sells the layer between them.

## Replicable for SKOX

Every row is checked against `claims.md` and `copy-rules.md`.

| Pattern | SKOX version | Claim IDs | Status |
|---|---|---|---|
| Admin and reporting pain at a specific moment (nights, weekends, five tabs) | "Stop rebuilding the same report" plus "one clear view of your business" | C22 | **Replicable.** The moment-hook line itself is a description of the buyer's pain, not a SKOX claim. Treat it like the "They quoted you quarters?" line: needs Reiss's sign-off before it runs. |
| "Did we have a good month?" / visibility across crews and locations | One clear view; location & team performance views; connected data from your existing tools | C22, C21, C08 (conditional) | **Replicable, and the strongest fit.** Jobber is scaling this angle right now, which means it's resonating with the same buyer. SKOX's edge is "built around how you run your locations, and you own the code" (C07). |
| "What happens between the systems" (JITAI): connect the tools they already have | "Need your tools connected… We build that in, too" / connected data from your existing tools | C23 (support line only), C21 | **Replicable**, but **never name** ServiceTitan, Jobber or others in copy. Say "the tools you already use". |
| Ad spend → booked jobs ("Impressions don't pay your techs") | No claim covers ad-spend-to-booked-jobs reporting yet | — | **NOT replicable yet.** Add it to `landing.ts` and claims.md first (it's in the product brief, not on the site). |
| Qualifier callout in line one ("Running 5+ techs", "$1M+") | e.g. "Running three or more locations?" or "Crews in more than one territory?" | — (audience callout) | **Replicable with sign-off.** It's a question, not a claim. Avoid revenue thresholds; never name a place (no-location rule). |
| Same creative per trade (HVAC / plumbing / pest / pool) | One dashboard ad, trade noun swapped, separate ad sets | C22, C21 | **Replicable.** This is a structural pattern, so it doesn't need any new claims. |
| Short benefit-pair headlines | "Fixed price, agreed upfront" (C05); "You own the code" (C07); "Between expensive and risky." (C16) | C05, C07, C16 | **Replicable.** |
| Founder-to-camera video (the creator-ad pattern) | The two founders on camera: "Talk to the builders. Work with the founders." | C06, C14, C20 | **Replicable** as founders talking. **Not** as a client or creator testimonial. |
| Generic comparison (Ascora's "past X, overwhelmed by Y") | Big shop "Months" vs freelancer "Unpredictable" vs SKOX "A delivery date in writing" | C12–C15 | **Replicable, generic only.** The named-competitor version is forbidden. |
| Free useful download (ServiceTitan templates, the longest winner) | Closest existing: "The plan is yours, whether you hire us or not" (C19) | C19 | **NOT replicable yet.** SKOX has no template or guide. A real one (e.g. a one-page multi-location weekly-numbers sheet) would have to be built and put on the site first. Strongest long-term idea in this research. |
| Free trial / instant product | — | — | **NOT replicable.** SKOX sells builds, not a self-serve product. The equivalent is the free 30-minute scope call (C04: never "No deposit" alone). |
| Customer revenue stories, user counts, review quotes, "named easiest" | — | — | **NOT replicable.** No proof exists (forbidden: invented proof). |
| Paid demo ($50 gift card), $26 first month | — | — | **NOT replicable.** Incentive and price are not on the site (forbidden: any price). |
| "Leads or you don't pay" guarantees | — | — | **NOT replicable.** Forbidden: refunds or guarantees. |
| AI follow-ups / "CSR AI answers your calls" | — | — | **NOT replicable.** Forbidden: AI as method, AI front desk. |
| Benchmark report ("494 agencies weighed in") | — | — | **NOT replicable.** No data. |
| "Reporting in minutes, not hours" speed framing | "14-day focused dashboard build" with scope/data/access agreed first | C08 (conditional) | **Replicable only under C08's conditions.** Never "two weeks". |

### Suggested first three Meta bets (map to copy-rules' three bets)

1. **Visibility bet (new):** a "how did each location do this week?" moment hook, with C22 "one clear view of your business" and C21 "location & team performance views". Static, trade-swapped ad sets.
2. **Certainty bet:** C03 "a fixed price and a delivery date agreed upfront", with the C12–C15 generic comparison. Static.
3. **People bet:** a 20–30 s founders-to-camera video using C06/C14 plus C07 "You own the code". (The existing 20 s video's "No lock-in" line still needs Reiss's sign-off per claims.md.)

All three need the moment-hook lines signed by Reiss and a pass through the claims, policy and landing auditors (`/ads-prelaunch`).

## Next research steps

- Rerun with the Apify scraper once the account limit resets (next billing month or plan raise), to get exact formats, landing URLs and card counts. Same queries, under $1.50.
- Look up the pages of multi-unit franchise owner groups and franchise-ops vendors (e.g. FranConnect, Naranga) directly by page ID. Keyword search did not surface them.
