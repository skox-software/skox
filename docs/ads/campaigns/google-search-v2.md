# Google Search v2

Written 2026-10-06 by the `google-ads` agent. Status: **draft, not uploaded.** Replaces the structure of `google-search-v1.md` and the live-but-unserved one-ad-group campaign in `reviews/2026-10-06-google.md`. It must pass `/ads-prelaunch google-search-v2` before any spend. Nothing here has been changed in Google Ads; Josh clicks every step.

**Rev 2, 2026-10-06:** revised for `audits/2026-10-06-claims-google-search-v2.md` and `audits/2026-10-06-policy-google-search-v2.md`. Changes: the trade-tail headlines and D4, Pest control D2, Plumbing D2, Garage doors D1, Internal tools D1, the Trades callouts, the structured snippet (Services only), two columns removed from the Editor `campaigns.csv`, and the new `google-search-v2-web-upload/` folder. **Budget change, same day (Josh):** hard cap $300 a month total, so Trades is $6.50/day and Services $3.30/day ($297.92 a month), Meta is $0, and the caps are $4.00 / $3.00 / $2.50. There are no ceilings, no increases without Josh's written OK, an ad group stops at $60 spent with zero form starts, and the whole account gets reviewed at $300 spent.

Line format: `Text (character count) [claim IDs]`. Every count was checked with a regex length match (`^.{N}$`). Neither Python nor a shell was available in the sessions that wrote this file. Before uploading, run `python3 docs/ads/campaigns/google-search-v2-editor/check_lengths.py` to re-check the CSVs.

Bulk-upload files: `docs/ads/campaigns/google-search-v2-editor/` (see its `README.md`).

---

## 1. Summary

**Goal:** buy the first scope requests from service-business owners searching in their own trade's words, on pages built for exactly those searches, and keep a small, capped line on the generic service searches. Month one tests whether the search terms are the right people and whether tracking works. It doesn't judge the offer: `economics.md` says a confident cost-per-lead verdict takes 6–10 weeks at this budget.

**Why two campaigns.** The research (`research/playbook-2026-10.md`) found **no ads at all** on the trade and multi-location searches, and the eight `/for/` pages now exist for them. The generic service searches are crowded and expensive. If they shared one budget, the expensive generic auctions could starve the trade groups. Two campaigns means two budgets, so the trades are protected.

**Budget (Josh, 2026-10-06): hard cap $300 a month total across Google and Meta.** This overrides the $500–1,000 test range in `README.md` and the earlier v2 figures.

| Campaign | Ad groups | Landing | $/day | $/month (×30.4) | Max CPC |
|---|---|---|---|---|---|
| Search – Trades – US | 9 (8 trades + Multi-location dashboards) | `/for/{slug}`, `/dashboards` | $6.50 | $197.60 | $4.00 (campaign bid limit, so every ad group is capped at $4.00) |
| Search – Services – US | 4 (Dashboards, Internal tools, Customer portals, Web apps) | `/dashboards`, `/internal-tools`, `/customer-portals`, `/web-apps` | $3.30 | $100.32 | $3.00 per ad group; $2.50 on two keywords |
| **Google total** | 13 | | **$9.80** | **$297.92** | |

**Combined account budget (hard cap $300/month)**

| | $/day | $/month |
|---|---|---|
| Google (Trades + Services) | $9.80 | $297.92 |
| Meta | $0.00 (**Meta is off for now**, per Josh) | $0.00 |
| **Combined** | **$9.80** | **$297.92** |
| Headroom under $300 | | $2.08 |

**There's no ceiling and no scale-up.** The scale rule is: **no budget or CPC increase without Josh's written OK.** Any increase request has to give dollars per day and per month, before and after, and show cost per lead isn't rising. Starting Meta at all needs the same OK and has to come out of Google's $297.92, because the cap is total.

**Spend stops (in dollars):**
- **Ad group:** $60 spent with zero form starts → pause it.
- **Account review:** at **$300 total spent** (about 31 days at full budget), stop and review the whole account with Josh before anything continues.
- **Dead campaign:** 60 days at full budget is **$395.20** for Trades ($6.50 × 60.8) and **$200.64** for Services ($3.30 × 60.8), **$595.84** together. Zero qualified leads by then → pause both and rethink the offer or keywords, not the bids.

Google can spend up to twice a campaign's daily budget on one day. Over a month it evens out, and monthly spend won't pass daily budget × 30.4. So Google can't go over $297.92 a month at these budgets.

**What success looks like**
- **Day 30:** test lead passed and written up in `audits/`. The Google Ads conversion shows "Recording conversions". Search terms are mostly owners and operators, with junk negated every week. At least one real scope request with a `gclid` in the lead email. At least 5 of the 9 Trades ad groups have impressions (the rest go in the Keyword Planner low-volume note). No ad group has hit the $60 dead rule. The account review at $300 spent has happened, or is due.
- **Day 60:** at least one **qualified** lead from paid search (definition in `economics.md`, Josh to confirm), with a first cost per lead for each campaign set beside Josh's tally. Zero qualified leads → the dead-campaign rule above.
- **Volume:** UNKNOWN. I can't see Keyword Planner, so there are no volumes or CPCs in this file.
  - At the caps, a fully spent budget buys **at least about 49 clicks a month in Trades** ($197.60 ÷ $4.00) and **about 33 in Services** ($100.32 ÷ $3.00), roughly 2.7 a day across the account. That's arithmetic, not a forecast.
  - ASSUMPTION from `economics.md`: if 3–8% of those clicks convert, that's about 2–7 form leads a month.
  - The real risk is the opposite: `economics.md` assumes $8–25 CPCs for custom-software terms, far above these caps. Where auctions clear above a cap, the campaign **underspends** and gets fewer clicks, not cheaper ones. The trade terms are the most likely to clear under $4, because nobody advertises on them. Nothing here is verified.

---

## 2. Prerequisites checklist

Josh hasn't confirmed anything in this session, so every item is UNKNOWN. Spend starts only when every box is ticked.

| # | Item | Status |
|---|---|---|
| 1 | **The current live campaign from `reviews/2026-10-06-google.md` (47 keywords, one ad group) is paused or removed**, so it can't spend alongside v2 | UNKNOWN |
| 2 | `RESEND_API_KEY` set in Vercel → skox → Production | UNKNOWN (set 2026-09-13 per memory; confirm) |
| 3 | `LEAD_FROM_EMAIL` set | UNKNOWN (set 2026-09-13 per memory; confirm) |
| 4 | `CONTACT_EMAIL` goes to an inbox someone reads daily | UNKNOWN |
| 5 | `NEXT_PUBLIC_GA_MEASUREMENT_ID` = `G-7KNPZ9T693` live (it also loads gtag.js for Google Ads) | UNKNOWN (live since 2026-10-01 per memory; confirm) |
| 6 | Google Ads conversion action created **"Set up manually using code"**: Submit lead form, no value, Count = One, 90-day click window, enhanced conversions on | UNKNOWN |
| 7 | `NEXT_PUBLIC_GOOGLE_ADS_ID` (`AW-…`) set | UNKNOWN |
| 8 | `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL` (full `AW-…/…` send_to) set | UNKNOWN |
| 9 | Site redeployed after 7–8 (`NEXT_PUBLIC_*` values are baked in at build time), using the `git archive` deploy, not `git push` | UNKNOWN |
| 10 | **No** URL-based conversion on `/scope-received` or `/scorecard/thanks` | UNKNOWN |
| 11 | GA4 `generate_lead` imported as **Secondary** only, or not imported. `scorecard_download` (if `NEXT_PUBLIC_GOOGLE_ADS_SCORECARD_LABEL` is set) is **Secondary** | UNKNOWN |
| 12 | GA4: `generate_lead` is a key event; `scope_partial_captured`, `scope_form_started`, `scope_cta_clicked` are not | UNKNOWN |
| 13 | Test lead from `tracking.md` passed, **plus one on a trade page**: `https://www.skoxsoftware.com/for/plumbing?utm_source=test&utm_medium=test&utm_campaign=tracking-check&gclid=TEST123` (the `/for/` pages use the same `ConversionForm`, but no test has run on them yet). Result saved to `audits/YYYY-MM-DD-tracking-test.md` | UNKNOWN |
| 14 | Conversion action shows "Recording conversions" or "No recent conversions" (not "Unverified") | UNKNOWN |
| 15 | Auto-tagging on (Admin → Account settings) | UNKNOWN |
| 16 | Account-level auto-apply recommendations **off** (they can add broad match and rewrite ads) | UNKNOWN |
| 17 | Reiss initials the sign-off line in `claims.md` **and** signs the trade-page wording ("Needs Reiss: the trade-page wording itself (all eight `/for/` pages)"). T01–T03 copy in this file comes from those pages | UNKNOWN (blank) |
| 18 | `economics.md` route prices and margins filled in (needed for cost-per-lead ceilings) | UNKNOWN (all JOSH) |
| 19 | Keyword Planner check done (section 4.3) and the CPC caps in section 3 adjusted from it | UNKNOWN |
| 20 | 7-day / 14-day: calendar or business days | UNKNOWN. Ads say "14-day focused dashboard build" exactly as the site does, so this doesn't block launch |
| 21 | Google advertiser verification started or complete; legal name matches the payments profile | UNKNOWN |
| 22 | Business name "SKOX" and logo asset approved at account level (logo file TBD by Josh) | UNKNOWN |
| 23 | Each of the 12 final URLs opened on a phone (8 `/for/` pages, `/dashboards`, `/internal-tools`, `/customer-portals`, `/web-apps`); the interactive example loads | UNKNOWN |
| 24 | `/ads-prelaunch google-search-v2` returns no FAIL | UNKNOWN |

---

## 3. Campaign settings

Both campaigns, unless the row says otherwise.

| Setting | Value |
|---|---|
| Campaign type | Search. Create without a goal's guidance, then set the conversion goal below |
| Networks | **Google Search only. Search Partners off. Display Network off** |
| AI Max for Search | **Off** (the review found "AI Max expanded matches" and "URL inclusions" rows in the current account) |
| Final URL expansion / text customization | **Off** |
| Automatically created assets | **Off.** Google would write headlines from the landing page, and those would bypass `claims.md` |
| Broad match (campaign setting "Use broad match keywords") | **Off.** Phrase and exact only; Services is exact only |
| Locations | United States (location ID 2840) |
| Location option | **Presence:** "People in or regularly in your included locations". Not "Presence or interest" |
| Language | English |
| Schedule | All days, all hours. At this budget a narrower schedule starves the data. Revisit after 30 days with the hour-of-day report |
| Start | Upload with **campaign status Paused**. Enable only when section 2 is done |
| Ad rotation | Optimize (default) |
| Budget | Trades $6.50/day ($197.60/month), Services $3.30/day ($100.32/month), not shared. Combined $297.92/month under Josh's $300 hard cap |
| Final URL suffix | `utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_content={adgroupid}&utm_term={keyword}` |
| Auto-tagging | On (account setting, adds `gclid`) |
| Conversion goal | Campaign-specific goal: **only** the manually coded lead action (`scope_request` sent with `send_to` = `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL`), as Primary. GA4 `generate_lead` Secondary (observe only). Scorecard download Secondary |

### Bidding and CPC caps

**Judgement call: Google can't cap Maximize Clicks per ad group.** Under Maximize Clicks the only cap is the **maximum CPC bid limit on the bid strategy**, which is campaign-wide ([Google Ads Help: About Maximize clicks](https://support.google.com/google-ads/answer/6268626)). Ad-group and keyword max CPCs aren't used. The brief needs per-ad-group caps and a lower cap on two keywords, which one strategy can't do, so:

| Campaign | Strategy (until the switch) | Cap | How the cap applies |
|---|---|---|---|
| Search – Trades – US | **Maximize clicks** with maximum CPC bid limit | **$4.00** (Josh, 2026-10-06) | Campaign-wide, so every trade ad group's effective cap is $4.00 (the per-ad-group $4.00 Josh asked for). **Set by hand in the web UI.** No CSV carries it |
| Search – Services – US | **Manual CPC** | Ad-group default max CPC **$3.00** on all four groups (Josh, 2026-10-06). Keyword-level max CPC **$2.50** on `[custom software development company]` and `[custom business software development]` | Manual CPC is the only standard strategy that honors ad-group and keyword bids |

Per-ad-group caps, stated in full:

| Ad group | Effective max CPC |
|---|---|
| HVAC, Pool service, Pest control, Landscaping, Roofing, Plumbing, Garage doors, Electrical, Multi-location dashboards | $4.00 (campaign bid limit) |
| Dashboards, Internal tools, Customer portals | $3.00 (ad-group default) |
| Web apps | $3.00 default; $2.50 on the two generic keywords |

**Judgement call on the two generic keywords: kept at $2.50, not removed.** At $2.50 they'll rarely win an auction. When they don't, they cost nothing. When they do, it's an exact-match click at under the group's cap. Removing them would leave Web apps with 5 keywords, below the 6-keyword floor for an ad group. If the Day 3/7 search terms show them taking clicks that never start the form, pause them first.

**Honest expectation:** these caps sit well below the `economics.md` ASSUMPTION of $8–25 for custom-software clicks. Services in particular may get few or no impressions at $3.00. That's acceptable: it caps the loss, and the Trades terms (uncontested in the research) are the real test. After Keyword Planner: if the "Top of page bid (low range)" for most of a campaign's keywords is above its cap, write the numbers into section 4.3. **Raising a cap needs Josh's written OK** (scale rule, section 1).

### Switch rule

When **a campaign** has **15+ conversions in the last 30 days**, move it to **Maximize conversions** with no target CPA (from `economics.md`). Run the starting strategy for at least 2 weeks first. Each campaign switches on its own count. Honest expectation: at the ASSUMPTION rates (about 2–7 leads a month across the account, at best), neither campaign is likely to reach 15 in 30 days within the first 60 days. Staying on the starting strategy is the normal state for v2, not a failure.

---

## 4. Ad groups

Rules applied to every RSA:
- **Exactly 15 headlines and 4 descriptions.** Headline 1 is **pinned to position 1**. In trade groups it's the trade keyword line (T01); in the other groups it's the route keyword line.
- **Day promise:** only the two ad groups that land on `/dashboards` (Multi-location dashboards, and Services → Dashboards) use C08. In both, **description 1 carries the C08 condition and is pinned to description position 1**, so the 14-day line never serves without it. No ad uses C09 (no `/websites` route in v2).
- **Trade groups never use C08.** C08 is only allowed in ads landing on `/dashboards` or `/`. The four dashboard trade pages do mention the 14-day build in their FAQ, but `claims.md` doesn't extend C08 to `/for/` pages. See judgement calls.
- **T01–T03 lines appear only in their own trade's ad group.** T04/T06 are ALLOWED everywhere.
- **"No deposit"** only ever appears as "Free Scope Call, No Deposit" or "Free 30-minute scope call, no deposit, no obligation." (C04). No roofing or garage-door line mentions the customer deposit those tools take, so "deposit" can't be misread.
- Bets: **problem** (their pain, or the tool that answers it), **certainty** (price and date in writing), **people** (founders), **speed** (built at speed / dated build), **CTA**.

### 4.1 Campaign A: Search – Trades – US

**Shared tail used by all eight trade RSAs (headlines 7–15, descriptions 3–4):**

| # | Headline | Bet |
|---|---|---|
| 7 | Try a Working Example (21) [T04] | CTA |
| 8 | Connects to Your Tools (22) [T06] | problem |
| 9 | Fixed Price, Agreed Upfront (27) [C05] | certainty |
| 10 | A Delivery Date Before You Pay (30) [C03] | certainty |
| 11 | You Own the Code (16) [C07] | certainty |
| 12 | Direct Access to the Builders (29) [C06] | people |
| 13 | Free 30-Minute Scope Call (25) [C04] | CTA |
| 14 | Get My Price & Timeline (23) [C11] | CTA |
| 15 | Free Scope Call, No Deposit (27) [C04] | CTA |

| # | Description |
|---|---|
| 3 | A fixed price and a delivery date agreed in writing before you pay. You own the code. (85) [C03, C07] |
| 4 | Free 30-minute scope call, no deposit, no obligation. Direct access to the builders. (84) [C04, C06] |

**Rev 2 (2026-10-06, claims audit NB 2):** the `/for/` pages don't render the comparison table, so "Work With the Two Founders", "No Account Managers" and "work with the two founders" (C14) aren't on the landing page. They're replaced with lines the `/for/` pages do show: the trust strip ("Direct access to the builders", C06) and the hero reassurance ("Free 30-minute scope call. No deposit. No obligation.", C04). Every trade-tail line now appears on `/for/*`: T04 example section, T06 build section, C05/C06/C07 trust strip, C03 intro, C11 CTA button, C04 reassurance.

No trade ad carries a day promise, so no description is pinned in 4.1.1–4.1.8.

**Ad-group negatives (all Negative Broad).** Each trade group excludes the other trades' words, so one trade's searches can't be caught by another trade's phrase keywords. Trade words: hvac · pool · pest · landscaping, landscape, lawn, mower · roofing, roof, roofer · plumbing, plumber · garage · electrical, electrician. **Exception:** HVAC and Plumbing don't exclude each other, because many shops run both and search that way ("plumbing and hvac dispatch software"). Their keywords don't overlap (dashboards vs dispatch).

#### 4.1.1 HVAC

- **Final URL:** `https://www.skoxsoftware.com/for/hvac`
- **Display path:** `hvac` (4) / `dashboards` (10)
- **Keywords (8):** "hvac kpi dashboard" · [hvac kpi dashboard] · "hvac business dashboard" · [hvac dashboard] · "hvac reporting software" · "hvac company dashboard" · "hvac technician performance dashboard" · [hvac reporting dashboard]
- **Ad-group negatives (12):** pool, pest, landscaping, landscape, lawn, mower, roofing, roof, roofer, garage, electrical, electrician

| # | Headline | Bet |
|---|---|---|
| 1 | HVAC Business Dashboards (24) [T01] **PIN 1** | problem (route) |
| 2 | Monday Starts in Five Logins (28) [T02] | problem |
| 3 | Every Crew in One View (22) [T03] | problem |
| 4 | Crew and Branch Dashboard (25) [T03] | problem |
| 5 | Onboarding Tracker for Techs (28) [T03] | problem |
| 6 | Overtime Shows Up Weeks Late (28) [T02] | problem |
| 7–15 | Shared tail | |

| # | Description |
|---|---|
| 1 | One view of every crew and tech: jobs done, hours, callbacks and onboarding. (76) [T03] |
| 2 | Dispatch, time clock, payroll and the bank each hold a piece. We build the one view. (84) [T02, T03] |
| 3–4 | Shared tail |

"HVAC" is an industry acronym, not a word in capitals for emphasis, so the editorial rule against ALL CAPS doesn't apply. Same for "PDF" in 4.1.7.

#### 4.1.2 Pool service

- **Final URL:** `https://www.skoxsoftware.com/for/pool-service`
- **Display path:** `pool-service` (12) / `dashboards` (10)
- **Keywords (7):** "pool service dashboard" · [pool service dashboard] · "pool service business software" · "pool route reporting" · "pool service reporting" · "pool company kpi" · [pool service business dashboard]
- **Ad-group negatives (14):** hvac, pest, landscaping, landscape, lawn, mower, roofing, roof, roofer, plumbing, plumber, garage, electrical, electrician

| # | Headline | Bet |
|---|---|---|
| 1 | Pool Service Dashboards (23) [T01] **PIN 1** | problem (route) |
| 2 | Revenue and Booked Jobs (23) [T03] | problem |
| 3 | Every Route Is a Guess (22) [T02] | problem |
| 4 | Recurring Revenue Hides Leaks (29) [T02] | problem |
| 5 | A Service-Area Map (18) [T03] | problem |
| 6 | Which Channel Booked the Job (28) [T03] | problem |
| 7–15 | Shared tail | |

| # | Description |
|---|---|
| 1 | Revenue against booked jobs by week, month and quarter, for every location. (75) [T03] |
| 2 | Routes drift and drive time eats the margin. See where the work actually is. (76) [T02, T03] |
| 3–4 | Shared tail |

#### 4.1.3 Pest control

- **Final URL:** `https://www.skoxsoftware.com/for/pest-control`
- **Display path:** `pest-control` (12) / `dashboards` (10)
- **Keywords (7):** "pest control dashboard" · "pest control business dashboard" · [pest control kpi dashboard] · "pest control kpi" · [pest control reporting] · "pest control reporting software" · "pest control profit dashboard"
- **Ad-group negatives (14):** hvac, pool, landscaping, landscape, lawn, mower, roofing, roof, roofer, plumbing, plumber, garage, electrical, electrician

| # | Headline | Bet |
|---|---|---|
| 1 | Pest Control Dashboards (23) [T01] **PIN 1** | problem (route) |
| 2 | Sales Against Expenses (22) [T03] | problem |
| 3 | Owner's Profit Dashboard (24) [T03] | problem |
| 4 | Cost Per Booked Job by Channel (30) [T03] | problem |
| 5 | Every Ad Channel Says It Works (30) [T02] | problem |
| 6 | Last Year Beside This Year (26) [T03] | problem |
| 7–15 | Shared tail | |

| # | Description |
|---|---|
| 1 | Sales against expenses, and what each booked job really costs by marketing channel. (83) [T03] |
| 2 | Labor, products, fleet and marketing sit in different systems. We build one view of them. (89) [T02, T03] |
| 3–4 | Shared tail |

#### 4.1.4 Landscaping

- **Final URL:** `https://www.skoxsoftware.com/for/landscaping`
- **Display path:** `landscaping` (11) / `fleet` (5)
- **Keywords (8):** "landscaping equipment tracking" · "landscape fleet management software" · [mower fleet tracking] · "landscaping fleet management" · "lawn care equipment tracking" · "landscape equipment maintenance tracking" · [lawn mower fleet management] · "landscaping fleet dashboard"
- **Ad-group negatives (11):** hvac, pool, pest, roofing, roof, roofer, plumbing, plumber, garage, electrical, electrician

| # | Headline | Bet |
|---|---|---|
| 1 | Landscaping Fleet Dashboards (28) [T01] **PIN 1** | problem (route) |
| 2 | Engine Health Per Mower (23) [T03] | problem |
| 3 | Alerts to the Crew Lead (23) [T03] | problem |
| 4 | A Service Log That Nags (23) [T03] | problem |
| 5 | Fuel Spend Per Truck and Mower (30) [T03] | problem |
| 6 | Mower Dies, Crew Stands Still (29) [T02] | problem |
| 7–15 | Shared tail | |

| # | Description |
|---|---|
| 1 | Fuel, battery and engine health for every truck, mower and trailer, in one dashboard. (85) [T03] |
| 2 | Alerts go to the crew lead, with service reminders before each check is due. (76) [T03] |
| 3–4 | Shared tail |

I deliberately left out the intro's "before a unit fails on a job". It reads as a prediction promise, which an ad shouldn't make.

#### 4.1.5 Roofing

- **Final URL:** `https://www.skoxsoftware.com/for/roofing`
- **Display path:** `roofing` (7) / `quotes` (6)
- **Keywords (7):** "roofing quote software" · [roofing quote software] · "roofing estimate software" · [roofing estimate software] · "custom roofing estimator" · "roofing proposal software" · "roofing estimating tool"
- **Ad-group negatives (12):** hvac, pool, pest, landscaping, landscape, lawn, mower, plumbing, plumber, garage, electrical, electrician

| # | Headline | Bet |
|---|---|---|
| 1 | Roofing Quote Software (22) [T01] **PIN 1** | problem (route) |
| 2 | Roofing Estimate Software (25) [T01] | problem |
| 3 | Good, Better, Best Quotes (25) [T03] | problem |
| 4 | Quote Builder With Your Prices (30) [T03] | problem |
| 5 | Margins Drift Job by Job (24) [T02] | problem |
| 6 | Approve and Sign From a Text (28) [T03] | problem |
| 7–15 | Shared tail | |

| # | Description |
|---|---|
| 1 | Measurements in, a good, better and best quote out, with your prices and margin floor. (86) [T03] |
| 2 | Is every quote a spreadsheet only one person understands? We build the quote builder. (85) [T02, T03] |
| 3–4 | Shared tail |

#### 4.1.6 Plumbing

- **Final URL:** `https://www.skoxsoftware.com/for/plumbing`
- **Display path:** `plumbing` (8) / `dispatch` (8)
- **Keywords (7):** "plumbing dispatch software" · [plumbing dispatch software] · "plumbing dispatch board" · [plumber scheduling software] · "plumbing scheduling software" · "plumber dispatch board" · "plumbing service dispatch"
- **Ad-group negatives (12):** pool, pest, landscaping, landscape, lawn, mower, roofing, roof, roofer, garage, electrical, electrician

| # | Headline | Bet |
|---|---|---|
| 1 | Plumbing Dispatch Software (26) [T01] **PIN 1** | problem (route) |
| 2 | Plumbing Dispatch Board (23) [T03] | problem |
| 3 | Emergencies Jump the Line (25) [T03] | problem |
| 4 | Drive Time Is Invisible (23) [T02] | problem |
| 5 | Skills, Zones and Drive Time (28) [T03] | problem |
| 6 | On-the-Way Texts to Customers (29) [T03] | problem |
| 7–15 | Shared tail | |

| # | Description |
|---|---|
| 1 | Drag a job onto a tech and the day re-plans: emergencies first, drive time included. (84) [T03] |
| 2 | One burst pipe rewrites the whole day. A dispatch board that shows overtime coming. (83) [T02, T03] |
| 3–4 | Shared tail |

#### 4.1.7 Garage doors

- **Final URL:** `https://www.skoxsoftware.com/for/garage-doors`
- **Display path:** `garage-doors` (12) / `quotes` (6)
- **Keywords (6):** "garage door quote software" · [garage door quote software] · "garage door estimate app" · "garage door estimate software" · "garage door proposal software" · "garage door business software"
- **Ad-group negatives (15):** hvac, pool, pest, landscaping, landscape, lawn, mower, roofing, roof, roofer, plumbing, plumber, electrical, electrician, opener (homeowners looking for an opener app)

| # | Headline | Bet |
|---|---|---|
| 1 | Garage Door Quote Software (26) [T01] **PIN 1** | problem (route) |
| 2 | Quote Software for Door Pros (28) [T01] | problem |
| 3 | Customer Approval Portal (24) [T03] | problem |
| 4 | Pick, Sign and Book by Text (27) [T03] | problem |
| 5 | See Where Quotes Stall (22) [T02, T03] | problem |
| 6 | A Live Quote Feed (17) [T03] | problem |
| 7–15 | Shared tail | |

| # | Description |
|---|---|
| 1 | Options, e-signature and time slots, from one link the tech can text on site. (77) [T03] |
| 2 | Quotes go out as a PDF and a phone call. See every quote opened, chosen and signed. (83) [T02, T03] |
| 3–4 | Shared tail |

Rev 2: D1 now describes the tool (the build body at `trades.ts:256`), not the timing outcome. I didn't use the suggested "Customers sign and pay a deposit from one text link". That would put a customer deposit in the same ad as "Free Scope Call, No Deposit", which is the C04 confusion the claims audit flagged (NB 5). The build body's "and a deposit" is dropped for the same reason.

#### 4.1.8 Electrical

- **Final URL:** `https://www.skoxsoftware.com/for/electrical`
- **Display path:** `electrical` (10) / `truck-stock` (11)
- **Keywords (7):** "electrician truck stock app" · "van inventory for electricians" · "electrical contractor inventory software" · [electrical contractor inventory software] · "electrician truck inventory" · "electrical truck stock" · "electrician van stock"
- **Ad-group negatives (13):** hvac, pool, pest, landscaping, landscape, lawn, mower, roofing, roof, roofer, plumbing, plumber, garage

| # | Headline | Bet |
|---|---|---|
| 1 | Truck Stock for Electricians (28) [T01] **PIN 1** | problem (route) |
| 2 | Truck Stock Software (20) [T01] | problem |
| 3 | Every Van's Parts Against Par (29) [T03] | problem |
| 4 | A Pick List That Writes Itself (30) [T03] | problem |
| 5 | Low-Stock Flags Per Van (23) [T03] | problem |
| 6 | Parts Matched to Invoices (25) [T03] | problem |
| 7–15 | Shared tail | |

| # | Description |
|---|---|
| 1 | Every van's parts against par, low-stock flags and tomorrow's pick list, written for you. (89) [T03] |
| 2 | A tech drives back to the shop for one breaker. We build the truck stock tracker. (81) [T02, T03] |
| 3–4 | Shared tail |

#### 4.1.9 Multi-location dashboards

- **Final URL:** `https://www.skoxsoftware.com/dashboards`
- **Display path:** `dashboards` (10) / `locations` (9)
- **Keywords (8):** "multi location reporting dashboard" · "dashboard for multiple locations" · "field service kpi dashboard" · [multi location dashboard] · "multi location business dashboard" · "field service business dashboard" · [multiple location reporting] · "service business kpi dashboard"
- **Ad-group negatives (17):** every trade word (hvac, pool, pest, landscaping, landscape, lawn, mower, roofing, roof, roofer, plumbing, plumber, garage, electrical, electrician), so trade searches go to their own page, plus franchise and franchisor (the research says that's head-office buyers on a crowded query)

| # | Headline | Bet |
|---|---|---|
| 1 | Multi-Location Dashboards (25) [C21] **PIN 1** | problem (route) |
| 2 | Every Location Side by Side (27) [C21, C22] | problem |
| 3 | Location & Team Performance (27) [C21] | problem |
| 4 | 14-Day Focused Dashboard Build (30) [C08] | speed |
| 5 | Your Business in One View (25) [C22] | problem |
| 6 | Stop Rebuilding Reports (23) [C22] | problem |
| 7 | Data From Your Existing Tools (29) [C21] | problem |
| 8 | Fixed Price, Agreed Upfront (27) [C05] | certainty |
| 9 | A Delivery Date Before You Pay (30) [C03] | certainty |
| 10 | You Own the Code (16) [C07] | certainty |
| 11 | Work With the Two Founders (26) [C14] | people |
| 12 | No Account Managers (19) [C14] | people |
| 13 | Get My Price & Timeline (23) [C11] | CTA |
| 14 | Free Scope Call, No Deposit (27) [C04] | CTA |
| 15 | Keep the Plan Either Way (24) [C19] | CTA |

| # | Description |
|---|---|
| 1 | 14-day focused dashboard build. Timing depends on agreed data sources and access. (81) [C08 with its condition] **PIN to description 1** |
| 2 | Compare every location in one clear view, with data from the tools you already use. (83) [C22, C21] |
| 3 | A fixed price and a delivery date agreed in writing before you pay. You own the code. (85) [C03, C07] |
| 4 | Free 30-minute scope call, no deposit, no obligation. Work with the two founders. (81) [C04, C14] |

C08 check: "focused" kept in H4 and D1. The condition is in pinned D1. Lands on `/dashboards`. No "two weeks". "Every Location Side by Side" restates "compare locations" (`landing.ts:33`) and "Location & team performance views" (`:36`). There's deliberately no scorecard headline: `/dashboards` only links the scorecard in its footer, so the scorecard is a sitelink that goes straight to `/scorecard`.

### 4.2 Campaign B: Search – Services – US (exact match only)

Built from the review's 8 exact keepers plus the 2 capped generics. Each group is topped up to 7 with exact variants of its page's own keyword (`topics.ts`). No phrase match in this campaign.

| Keeper (review) | Placed in |
|---|---|
| [custom dashboard development] | Dashboards |
| [internal tool development], [custom internal tools development], [custom workflow software development] | Internal tools |
| [workflow automation software development] | Internal tools (judgement call: there's no `/integrations` group in v2. `/internal-tools` renders the C23 line "Need your tools connected, or a workflow automated? We build that in, too." and D2 below uses it) |
| [customer portal development company] | Customer portals |
| [custom web application development], [web application development company] | Web apps |
| [custom software development company], [custom business software development] | Web apps, keyword max CPC **$2.50** |

**Shared descriptions used below:**
- S1: A fixed price and a delivery date agreed in writing before you pay. You own the code. (85) [C03, C07]
- S2: Free 30-minute scope call, no deposit, no obligation. Work with the two founders. (81) [C04, C14]
- S3: Work directly with the two founders building it. No account managers. You own the code. (87) [C06, C14, C07]
- S4: A fixed price and a delivery date agreed in writing, before you pay anything. (77) [C03]
- S5: Free 30-minute scope call, no deposit, no obligation. The plan is yours either way. (83) [C04, C19]

#### 4.2.1 Dashboards

- **Final URL:** `https://www.skoxsoftware.com/dashboards` · **Ad-group max CPC:** $3.00
- **Display path:** `dashboards` (10) / `fixed-price` (11) [C05]
- **Keywords (7, exact):** [custom dashboard development] · [custom dashboard development company] · [dashboard development company] · [dashboard development services] · [business dashboard development] · [custom business dashboard] · [custom kpi dashboard development]

| # | Headline | Bet |
|---|---|---|
| 1 | Custom Dashboard Development (28) [C02] **PIN 1** | problem (route) |
| 2 | Dashboards, Built at Speed (26) [C01] | speed |
| 3 | 14-Day Focused Dashboard Build (30) [C08] | speed |
| 4 | Your Business in One View (25) [C22] | problem |
| 5 | Stop Rebuilding Reports (23) [C22] | problem |
| 6 | Location & Team Performance (27) [C21] | problem |
| 7 | Data From Your Existing Tools (29) [C21] | problem |
| 8 | Fixed Price, Agreed Upfront (27) [C05] | certainty |
| 9 | A Delivery Date Before You Pay (30) [C03] | certainty |
| 10 | You Own the Code (16) [C07] | certainty |
| 11 | Work With the Two Founders (26) [C14] | people |
| 12 | No Account Managers (19) [C14] | people |
| 13 | Get My Price & Timeline (23) [C11] | CTA |
| 14 | Free Scope Call, No Deposit (27) [C04] | CTA |
| 15 | Keep the Plan Either Way (24) [C19] | CTA |

| # | Description |
|---|---|
| 1 | 14-day focused dashboard build. Timing depends on agreed data sources and access. (81) [C08 with its condition] **PIN to description 1** |
| 2 | One clear view of your business, with connected data from your existing tools. (78) [C22, C21] |
| 3 | S1 (85) [C03, C07] |
| 4 | S2 (81) [C04, C14] |

#### 4.2.2 Internal tools

- **Final URL:** `https://www.skoxsoftware.com/internal-tools` · **Ad-group max CPC:** $3.00
- **Display path:** `internal-tools` (14) / `fixed-price` (11) [C05]
- **Keywords (7, exact):** [internal tool development] · [internal tools development] · [custom internal tools development] · [custom internal tool development] · [custom internal tools] · [custom workflow software development] · [workflow automation software development]

| # | Headline | Bet |
|---|---|---|
| 1 | Internal Tool Development (25) [C21] **PIN 1** | problem (route) |
| 2 | Internal Tools, Built at Speed (30) [C01] | speed |
| 3 | Custom Internal Tools (21) [C21] | problem |
| 4 | Working Review at Halfway (25) [C17] | certainty |
| 5 | Date Set at Kickoff (19) [C18] | certainty |
| 6 | Between Expensive and Risky (27) [C16] | certainty |
| 7 | Fixed Price, Agreed Upfront (27) [C05] | certainty |
| 8 | A Delivery Date Before You Pay (30) [C03] | certainty |
| 9 | No Hourly Billing (17) [C13] | certainty |
| 10 | You Own the Code (16) [C07] | certainty |
| 11 | Work With the Two Founders (26) [C14] | people |
| 12 | Direct Access to the Builders (29) [C06] | people |
| 13 | Get My Price & Timeline (23) [C11] | CTA |
| 14 | Free Scope Call, No Deposit (27) [C04] | CTA |
| 15 | Keep the Plan Either Way (24) [C19] | CTA |

| # | Description |
|---|---|
| 1 | Internal tools with sign-in, roles and integrations, built around how your team works. (86) [C21; route text `topics.ts:212`, `:228`] |
| 2 | Need your tools connected, or a workflow automated? We build that in, too. (74) [C23, supporting line] |
| 3 | S1 (85) [C03, C07] |
| 4 | S2 (81) [C04, C14] |

#### 4.2.3 Customer portals

- **Final URL:** `https://www.skoxsoftware.com/customer-portals` · **Ad-group max CPC:** $3.00
- **Display path:** `portals` (7) / `fixed-price` (11) [C05] (`customer-portals` is 16 characters, over the 15 limit)
- **Keywords (7, exact):** [customer portal development company] · [customer portal development] · [client portal development] · [client portal development company] · [custom client portal development] · [custom customer portal] · [customer portal developer]

| # | Headline | Bet |
|---|---|---|
| 1 | Customer Portal Development (27) [C21] **PIN 1** | problem (route) |
| 2 | Your Portal, Built at Speed (27) [C01] | speed |
| 3 | Custom Client Portals (21) [C21] | problem |
| 4 | Payments & Integrations (23) [C21] | problem |
| 5 | Working Review at Halfway (25) [C17] | certainty |
| 6 | Date Set at Kickoff (19) [C18] | certainty |
| 7 | Fixed Price, Agreed Upfront (27) [C05] | certainty |
| 8 | A Delivery Date Before You Pay (30) [C03] | certainty |
| 9 | No Hourly Billing (17) [C13] | certainty |
| 10 | You Own the Code (16) [C07] | certainty |
| 11 | Work With the Two Founders (26) [C14] | people |
| 12 | Direct Access to the Builders (29) [C06] | people |
| 13 | Get My Price & Timeline (23) [C11] | CTA |
| 14 | Free Scope Call, No Deposit (27) [C04] | CTA |
| 15 | Keep the Plan Either Way (24) [C19] | CTA |

| # | Description |
|---|---|
| 1 | Client portals with accounts, payments and integrations, from idea to working software. (87) [C21, C01 route intro] |
| 2 | S3 (87) [C06, C14, C07] |
| 3 | S4 (77) [C03] |
| 4 | S5 (83) [C04, C19] |

#### 4.2.4 Web apps

- **Final URL:** `https://www.skoxsoftware.com/web-apps` · **Ad-group max CPC:** $3.00; **$2.50** on the two generic keywords
- **Display path:** `web-apps` (8) / `fixed-price` (11) [C05]
- **Keywords (7, exact):** [custom web application development] · [web application development company] · [custom web app development] · [web app development company] · [custom web app developer] · [custom software development company] **$2.50** · [custom business software development] **$2.50**

| # | Headline | Bet |
|---|---|---|
| 1 | Custom Web App Development (26) [C02] **PIN 1** | problem (route) |
| 2 | Web Apps, Built at Speed (24) [C01] | speed |
| 3 | Portals & Internal Tools (24) [C21] | problem |
| 4 | Between Expensive and Risky (27) [C16] | certainty |
| 5 | Date Set at Kickoff (19) [C18] | certainty |
| 6 | Working Review at Halfway (25) [C17] | certainty |
| 7 | Fixed Price, Agreed Upfront (27) [C05] | certainty |
| 8 | A Delivery Date Before You Pay (30) [C03] | certainty |
| 9 | No Hourly Billing (17) [C13] | certainty |
| 10 | You Own the Code (16) [C07] | certainty |
| 11 | Work With the Two Founders (26) [C14] | people |
| 12 | Direct Access to the Builders (29) [C06] | people |
| 13 | Get My Price & Timeline (23) [C11] | CTA |
| 14 | Free Scope Call, No Deposit (27) [C04] | CTA |
| 15 | Keep the Plan Either Way (24) [C19] | CTA |

| # | Description |
|---|---|
| 1 | Customer portals, internal tools, accounts, payments and integrations. (70) [C21] |
| 2 | S3 (87) [C06, C14, C07] |
| 3 | S4 (77) [C03] |
| 4 | S5 (83) [C04, C19] |

### 4.3 Keyword count and Keyword Planner check

| Campaign | Ad groups | Positive keywords | Ad-group negatives | Campaign negatives |
|---|---|---|---|---|
| Search – Trades – US | 9 | 66 (phrase + exact) | 120 | 82 |
| Search – Services – US | 4 | 28 (exact only) | 0 | 82 |
| **Total** | **13** | **94** | **120** | **164 rows (82 × 2)** |

**Paste into Keyword Planner.** I can't see Keyword Planner, so this file has no volumes or CPCs. Google Ads → Tools → Planning → Keyword Planner → **Get search volume and forecasts** → paste the block → Locations: United States · Language: English · Network: Google. Copy "Avg. monthly searches", "Top of page bid (low range)" and "(high range)" into the table below it.

```
hvac kpi dashboard
hvac business dashboard
hvac dashboard
hvac reporting software
hvac company dashboard
hvac technician performance dashboard
hvac reporting dashboard
pool service dashboard
pool service business software
pool route reporting
pool service reporting
pool company kpi
pool service business dashboard
pest control dashboard
pest control business dashboard
pest control kpi dashboard
pest control kpi
pest control reporting
pest control reporting software
pest control profit dashboard
landscaping equipment tracking
landscape fleet management software
mower fleet tracking
landscaping fleet management
lawn care equipment tracking
landscape equipment maintenance tracking
lawn mower fleet management
landscaping fleet dashboard
roofing quote software
roofing estimate software
custom roofing estimator
roofing proposal software
roofing estimating tool
plumbing dispatch software
plumbing dispatch board
plumber scheduling software
plumbing scheduling software
plumber dispatch board
plumbing service dispatch
garage door quote software
garage door estimate app
garage door estimate software
garage door proposal software
garage door business software
electrician truck stock app
van inventory for electricians
electrical contractor inventory software
electrician truck inventory
electrical truck stock
electrician van stock
multi location reporting dashboard
dashboard for multiple locations
field service kpi dashboard
multi location dashboard
multi location business dashboard
field service business dashboard
multiple location reporting
service business kpi dashboard
custom dashboard development
custom dashboard development company
dashboard development company
dashboard development services
business dashboard development
custom business dashboard
custom kpi dashboard development
internal tool development
internal tools development
custom internal tools development
custom internal tool development
custom internal tools
custom workflow software development
workflow automation software development
customer portal development company
customer portal development
client portal development
client portal development company
custom client portal development
custom customer portal
customer portal developer
custom web application development
web application development company
custom web app development
web app development company
custom web app developer
custom software development company
custom business software development
```

| Keyword | Avg. monthly searches | Top of page bid low | Top of page bid high |
|---|---|---|---|
| (Josh fills in from Keyword Planner) | | | |

How to read it: keywords showing "–" or under 10 searches get "Low search volume" status and won't serve. They cost nothing, so keep them. If **every** keyword in a trade group is low volume, note it in the first weekly review; that group simply won't spend. If "Top of page bid (low range)" is above $4.00 for most Trades keywords, or above $3.00 for most Services keywords, that campaign will underspend. Write it down; any cap change needs Josh's written OK.

The review also asks whether to drop zero-volume keywords. My view: drop nothing before launch. A zero-volume keyword can't spend, and Keyword Planner rounds small trade niches down to zero.

---

## 5. Campaign negatives

One list, applied to **both** campaigns. In the CSV it's written as campaign-level negatives on each campaign. If you'd rather keep one shared list, create "SKOX – Search negatives – v2" under Tools → Shared library → Negative keyword lists and attach it to both. Single words are negative broad (they block any search containing the word). Multi-word entries are negative phrase. Negatives don't match close variants, so plurals are listed separately.

Base list: `reviews/2026-10-06-google.md`, with the changes noted.

**Jobs and careers:** jobs, career, careers, salary, salaries, hiring, intern, internship, resume, "job description", "job openings"
- Changed from the review: **"job" (singular) is not negated.** Owners search "job costing", "job scheduling" and "cost per job", and the pest control page sells "cost per booked job". "jobs" plus the two phrases catch the job seekers.

**Learning:** course, courses, tutorial, learn, learning, "how to", student, students, degree, certification, bootcamp, school, training, apprenticeship, license, licensing, pdf, example, examples, github, "open source"
- Added: school, training, apprenticeship, license, licensing. Trade terms pull in people training for the trade ("hvac training", "electrician license").
- Kept from the review, but watch: example, examples. Our own `/examples` page means "hvac dashboard example" could be a buyer. Remove these if the search terms report shows owners being blocked.

**DIY and templates:** template, templates, diy, free, "no code", nocode, "low code", "app builder"

**Platforms** (negatives only; never in copy): wordpress, wix, squarespace, shopify, salesforce, sap, oracle, servicetitan, "service titan", jobber, housecallpro, "housecall pro", "power bi", powerbi, tableau, looker
- Field-service software names are negated because people searching them want that product (review note). I added power bi / tableau / looker because "dashboard for multiple locations" picks up their tutorials.

**Freelancer marketplaces:** freelance, freelancer, upwork, fiverr

**Price-shoppers:** cheap, cheapest

**Offshore and enterprise:** india, offshore, outsourcing, rfp, enterprise

**Not sold:** ios, android, "mobile app", game

**Logins and software shoppers** (added from v1): login, "log in", "sign in", reviews, vs, alternative, alternatives. "Client portal" and "plumbing dispatch software" searches include people logging into or comparing existing products.

**Homeowners and location-seekers:** homeowner, homeowners, calculator, "near me"
- Added for trades: "roofing estimate" and "garage door estimate" searches are often homeowners pricing a job.

Totals: 68 broad + 14 phrase = **82 per campaign**.

---

## 6. Assets

No sitelink, callout or snippet carries a day promise (C08 must stay inside the ads that pin its condition). No asset uses T01–T03, because those are tied to one trade's ad group.

### Sitelinks

| Sitelink text | Description 1 | Description 2 | URL |
|---|---|---|---|
| See Working Examples (20) [T04] | Try a working example (21) [T04] | Concepts with sample data (25) [T04] | `https://www.skoxsoftware.com/examples` |
| Free Monday Scorecard (21) [T05] | Every location side by side (27) [T05] | Revenue, jobs, labor, ad spend (30) [T05] | `https://www.skoxsoftware.com/scorecard` |
| How We Work (11) [C03, C17] | Plan and price in writing (25) [C03] | Working review at halfway (25) [C17] | `https://www.skoxsoftware.com/#process` |
| Dashboard Examples (18) [T04] | Four dashboards to try (22) [T04] | Sample data, not client work (28) [T04] | `https://www.skoxsoftware.com/dashboard-examples` |
| Internal Tool Examples (22) [T04] | Four tools to try (17) [T04] | Sample data, not client work (28) [T04] | `https://www.skoxsoftware.com/internal-tool-examples` |

**Where they attach**

| Level | Sitelinks |
|---|---|
| Trades ad groups HVAC, Pool service, Pest control, Landscaping, Multi-location dashboards | Examples, Scorecard, How We Work, **Dashboard Examples** (their sibling page) |
| Trades ad groups Roofing, Plumbing, Garage doors, Electrical | Examples, Scorecard, How We Work, **Internal Tool Examples** (their sibling page) |
| Search – Services – US (campaign level) | All five |

Sitelinks set at ad-group level replace campaign-level ones for that ad group. That's why Trades sets all four at ad-group level and has none at campaign level.

The scorecard wording comes from `/scorecard` ("Every location, side by side"; revenue, jobs, labor and ad spend). T05 is ALLOWED. Scorecard downloads are not leads (`tracking.md`) and never count as a primary conversion.

`/#process` is the homepage's "How we move fast" section (`components/LandingPage.tsx:158`). No other sitelink points at `/`, so Google shouldn't treat it as a duplicate destination. If Google rejects the fragment URL, use `https://www.skoxsoftware.com/` instead.

### Callouts (campaign level)

| Callout | Trades | Services | Visible on `/for/*` |
|---|---|---|---|
| Delivery date in writing (24) [C03] | Yes | Yes | Trade intro |
| Free scope call (15) [C04] | Yes | Yes | Hero reassurance |
| Reply in 1 business day (23) [C10] | Yes | Yes | Form intro ("We'll reply within one business day") |
| Working review halfway (22) [C17] | Yes | Yes | Steps section |
| Working examples to try (23) [T04] | Yes | Yes | Example section |
| Keep the scope either way (25) [C19] | **Yes** | No | Steps section ("Keep the scope either way") |
| Work with the founders (22) [C06] | **No** | Yes | Not shown on `/for/*` (team section isn't rendered there) |

Rev 2: Trades swaps "Work with the founders" for "Keep the scope either way". That fixes the same `/for/` page mismatch as the trade headlines.

### Structured snippet (Services campaign only)

Header: **Service catalog** (check the header in the UI; policy audit N5)
- Custom web apps (15) [C02]
- Customer portals (16) [C21]
- Internal tools (14) [C21]
- Custom dashboards (17) [C02]

Rev 2 (claims audit NB 3): **no structured snippet on the Trades campaign.** These values aren't on the `/for/` pages, and each trade's build names don't fit as ad-group snippets: several are over 25 characters ("A season-ready schedule view" is 28, "Cost per booked job, by channel" is 31), and Multi-location has no build list. Attach the snippet to **Search – Services – US only**. Web apps lead and websites are absent (copy rule 3).

**Account level (already in v1 steps):** Business name `SKOX` (4). Business logo: the SKOX mark, file TBD by Josh.

Not used: price, call, location, image, lead-form and promotion assets (no price, no phone in copy, no location in copy, no briefed images; leads must go through the tracked site form).

---

## 7. Upload steps

Three routes. Pick one; never run two, or everything gets created twice.
- **Route 1 (recommended): Google Ads Editor** with `google-search-v2-editor/`, then the web UI for the settings Editor's CSV import can't set.
- **Route 2: web bulk upload** (Tools → Bulk actions → Uploads) with `google-search-v2-web-upload/`. Its `README.md` gives the order. Parts A, C and D below still apply.
- **Route 3: web UI by hand**, as in v1 section 7, using the tables above.

The `$4.00` Maximize clicks bid limit on Trades is **not in any CSV**. It's a manual step (C11 below) on every route. Until it's set, Trades has no CPC cap, so it stays Paused. Google moves menus around; if a label differs, use the closest match and note it in the next review.

**A. Before anything (web UI, ads.google.com)**
1. If the top bar says "Smart Mode": Settings → "Switch to Expert Mode".
2. Campaigns → find the campaign reviewed on 2026-10-06 (47 keywords, one ad group) → tick it → Edit → **Pause**. It has spent $0; pausing costs nothing and keeps its history. (Checklist 1.) Under a $300 total cap, any other live campaign (Google or Meta) also has to be paused.
3. Admin (gear) → Account settings → **Auto-tagging** on.
4. Recommendations → **Auto-apply** → turn every type off.
5. Goals → Conversions → Summary: confirm the manual-code lead action exists, is **Primary**, and that `generate_lead` (GA4) and any scorecard action are **Secondary**. If the lead action doesn't exist yet, follow v1 section 7 step 4 (Category: Submit lead form; Count: One; 90 days; enhanced conversions on).

**B. Google Ads Editor import** (full detail in `google-search-v2-editor/README.md`)
6. Open Google Ads Editor → sign in → select the SKOX account → **Get recent account changes** (top left) so Editor is in sync.
7. **Account → Import → From file…** → choose `campaigns.csv`. Check every column header is mapped (fix any in the drop-down) → **Import** → **Review imported changes** → **Keep proposed changes**.
8. Repeat step 7 for `keywords.csv`, then `ads.csv`. Order matters: campaigns and ad groups must exist before keywords and ads.
9. In Editor's tree, click each campaign and check: Status **Paused**, Budget $6.50 / $3.30, Networks Google Search only, Bid strategy Maximize clicks (Trades) / Manual CPC (Services), Language English, Location United States.
10. Click **Check changes** (top) → fix any errors listed → **Post** → Post to the account.

**C. Settings Editor's CSV can't set reliably (web UI, each campaign)**
11. Campaign → Settings → **Bidding**: Trades → Maximize clicks → tick "Set a maximum cost per click bid limit" → **$4.00**. Services → Manual CPC (no bid limit; the ad-group and keyword bids are the caps).
12. Settings → **Locations** → Location options → Include: **"Presence: People in or regularly in your included locations"**.
13. Settings → **AI Max for Search** → Off. **Broad match keywords** → Off. **Automatically created assets** → Off. Also turn off final URL expansion and text customization if shown.
14. Settings → Networks: untick **Google search partners** and **Google Display Network** (check again, even though the CSV sets it).
15. Settings → **Campaign URL options** → Final URL suffix: paste the suffix from section 3 if the CSV import didn't set it.
16. Settings → **Goals**: use campaign-specific goals → only the lead form conversion.

**D. Assets (web UI)**
17. Trades → each ad group → Assets → + → **Sitelink**: add the four sitelinks from section 6 for that ad group (dashboard trades and Multi-location get Dashboard Examples; tool trades get Internal Tool Examples).
18. Services → campaign level → Assets → + → Sitelink: all five.
19. Each campaign → campaign level → + **Callout**: the six callouts for that campaign (section 6 table; Trades and Services differ by one). Services only → + **Structured snippet**: header "Service catalog", the four values. **No snippet on Trades.**
20. Account level (once): Business name `SKOX` and the logo, if not done in v1.

**E. Check and go live**
21. Ads → every RSA shows "Under review", then "Eligible", within about a working day. If one is disapproved, copy the policy reason into the next review. Don't swap in text that isn't in `claims.md`.
22. Keywords → each ad group: phrase shows as "…", exact as […]; there are no broad keywords. Negative keywords tab: the campaign list and the ad-group negatives are present.
23. Only after section 2 is all ticked, the $4.00 Trades bid limit is set (step 11), and `/ads-prelaunch google-search-v2` passes: enable both campaigns. If you used the web bulk upload (route 2), the 13 ad groups were also created Paused, so enable them too (Ad groups → select all 13 → Edit → Enable).

---

## 8. What to watch

From `economics.md` and the ad-manager diagnostics. No cost-per-lead verdict before the minimum volumes.

**Day 3**
- Do both campaigns serve? Impressions > 0 per campaign. Zero usually means low search volume or a cap below the auction; check each keyword's Status column ("Low search volume", "Rarely shown").
- **Search terms report** (Insights and reports → Search terms): negate every term that isn't a buyer: jobs, training, homeowners, software log-ins, competitor product names. Record the spend each one wasted.
- Check no trade group is catching another trade's searches. If one is, the ad-group negatives are missing a word; add it.

**Day 7 (end of week 1, learning period)**
- No verdict on anything. Only fix broken tracking or obviously wrong search terms.
- CTR per ad group. **Under 2% after 100+ impressions** means the ad doesn't match the search: check the search terms first, then the RSA's asset report. Rewriting needs only lines from `claims.md`.
- First real lead: the email shows `gclid`, `utm_campaign` (campaign ID), `utm_content` (ad group ID), `utm_term`; Google Ads shows the conversion within about 24 hours.

**Day 14 (week 2)**
- Search terms again, negatives again.
- Spend against budget per campaign. Under half the budget means cap-limited or volume-limited; note it, don't raise caps yet.
- Trades: Maximize Clicks will put the budget wherever clicks are cheapest. Check that it isn't spending everything in one or two ad groups. If it is, and the other groups have volume, that's a budget-split question for the day-30 review, not a reason to change bids now.

**Day 30 (week 4)**
- **Dead ad group:** **$60 spent** or 30 days with zero form starts (GA4 `scope_form_started` on that ad group's landing page) → pause it, and write down why before restarting. Check this weekly, not only at day 30. A group with **zero impressions** isn't "dead"; it has no volume. Note it and leave it.
- **Account review at $300 spent:** at full budget the account reaches $300 around day 31. Stop and review everything with Josh: spend, clicks, form starts and real leads per ad group, and whether to continue, cut or pause. Nothing continues past $300 without that review.
- **Weak ad group:** clicks, but form starts under 2% of clicks → run `landing-auditor` on that page before touching bids.
- First cost per form lead for each campaign, beside Josh's tally. No increase of any kind without Josh's written OK.
- Bidding switch: any campaign with 15+ conversions in 30 days → Maximize conversions. Expect none.
- If spend has to come down, cut Services first: the generic auctions are the expensive, crowded ones.

### Kill and scale rules (from `economics.md`, scaled to the $300/month cap)

| Rule | Trigger | Action |
|---|---|---|
| Learning period | First 7 days, or after a big change | No verdict. Fix tracking and obviously wrong search terms only |
| Search terms | Weekly | Negate anything that isn't a buyer |
| Dead ad group | **$60 spent** or 30 days with zero form starts | Pause it; write down why before restarting |
| Account review | **$300 total spent** across both campaigns | Stop and review the whole account with Josh before continuing |
| Weak ad group | 30 days, clicks but form starts under 2% of clicks | Landing-page check (landing-auditor) before bids |
| Dead campaign | 60 days with zero qualified leads: **$395.20** Trades, **$200.64** Services, **$595.84** together at full budget | Pause. Rethink offer or keywords, not bids |
| Bidding switch | 15+ conversions in 30 days (per campaign) | Starting strategy → Maximize conversions |
| Scale | Any budget or CPC increase | **Only with Josh's written OK.** Dollars per day and per month, before and after. The $300/month total cap stands |
| Never scale | Cost per lead rising while spend rises | Saturation. Hold or cut |

If tracking isn't confirmed (section 2, items 6–14), every verdict above is **"no verdict"**.

---

## 9. Weekly review recipe

Every Monday, after the lead loop in `lead-loop.md`:

1. In Google Ads, set the date range to **Last 7 days** and download each report as CSV (Download icon → .csv):
   - Campaigns
   - Ad groups
   - Keywords (Search keywords)
   - Search terms
2. Repeat all four for **Last 30 days**. That's eight files.
3. Give `google-ads` the eight CSVs and your lead tally for the same 7 and 30 days:

   | Campaign / ad group | Form leads | Qualified | Calls held | Proposals sent | Won |
   |---|---|---|---|---|---|
   | Trades: HVAC | | | | | |
   | Trades: Pool service | | | | | |
   | Trades: Pest control | | | | | |
   | Trades: Landscaping | | | | | |
   | Trades: Roofing | | | | | |
   | Trades: Plumbing | | | | | |
   | Trades: Garage doors | | | | | |
   | Trades: Electrical | | | | | |
   | Trades: Multi-location dashboards | | | | | |
   | Services: Dashboards | | | | | |
   | Services: Internal tools | | | | | |
   | Services: Customer portals | | | | | |
   | Services: Web apps | | | | | |
   | Unknown / no gclid | | | | | |

   Match each "Scope request" email to a row with `utm_campaign` (campaign ID) and `utm_content` (ad group ID), or the landing page (`/for/{slug}` names the trade). "Unfinished enquiry" emails and scorecard downloads don't count as leads. List scorecard downloads separately if any came from ads.
4. The agent writes `docs/ads/reviews/YYYY-MM-DD-google.md`: platform conversions beside your tally, proposed negatives with the dollars each term wasted, and one change block per recommendation.

---

## Judgement calls (for the auditors and Josh)

1. **Services runs Manual CPC, not Maximize Clicks.** That's the only way to honor the $3.00 ad-group caps and the $2.50 cap on the two generic keywords (section 3). Trades runs Maximize Clicks with one $4.00 campaign cap, which acts as a $4.00 cap on every ad group.
1a. **The two generic keywords are kept at $2.50, not removed.** That keeps Web apps at 7 keywords, and an unwon auction costs nothing.
2. **No C08 in trade ads**, even though the four dashboard trade pages state the 14-day build in their FAQ. C08 is scoped to `/dashboards` and `/`. Adding `/for/{dashboard trades}` to C08's allowed routes in `claims.md` (Reiss) would allow a speed bet there in v3.
3. **H1 pins are shortened trade keywords** where the page keyword is over 30 characters (e.g. "Pest Control Dashboards" for "Pest control business dashboards"). Each matches the page title in `trades.ts`.
4. **[workflow automation software development] moved to Internal tools** (there's no `/integrations` group). Pause it if its search terms are SaaS shoppers.
5. **"job" (singular) left off the negatives** (section 5).
6. **HVAC and Plumbing don't exclude each other.**
7. **Multi-location has no scorecard headline**, because `/dashboards` doesn't show the scorecard above the footer. The scorecard is a sitelink instead.
8. **The roofing and garage-door customer deposit is never mentioned**, so "deposit" can only ever mean the free scope call (C04).

## Open items for Josh

- Everything in section 2 is UNKNOWN, including pausing the current live campaign.
- Keyword volumes and CPCs: run the section 4.3 paste. The $4.00 / $3.00 / $2.50 caps are Josh's; whether they win auctions is UNKNOWN.
- `README.md` and `economics.md` still say $500–1,000/month. Josh's $300 total cap (2026-10-06) overrides them for this campaign; update those files when convenient.
- Meta is $0 for now. `meta-retargeting-v1` must not run alongside this without Josh's written OK, because the cap is total.
- `economics.md` prices and margins (JOSH): without them there's no cost-per-lead ceiling, so only the volume-based dead rules can fire.
- Reiss sign-off on `claims.md` and on the `/for/` page wording (T01–T03 depend on it).
- 7/14 calendar or business days (ads avoid the question).


> **2026-10-07 policy change.** Google disapproved the Garage doors ad and rejected the keyword "garage door quote approval" under **Local services**. That phrase reads as a homeowner looking for door service. The keyword was dropped, pinned H1 became "Garage Door Quote Software" and H2 became "Quote Software for Door Pros". Headline 15 "Free Scope Call, No Deposit" was flagged under the same policy in this ad group only, so it became "Work With the Two Founders" here. No exception was requested.
