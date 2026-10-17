# Google Search v1

Written 2026-10-05 by the `google-ads` agent. Status: **draft, not uploaded.** It must pass `/ads-prelaunch google-search-v1` before any spend. Nothing here has been changed in Google Ads; Josh clicks every step.

Line format: `Text (character count) [claim IDs]`. Every count was checked with a script, not by eye.

---

## 1. Summary

**Goal:** buy the first scope requests from people already searching for a custom web app, dashboard or website, and learn which search terms bring real buyers. Month one checks that the right people are searching and that tracking works. It does not judge the offer (`economics.md`: a confident cost-per-lead verdict takes 6–10 weeks at this budget).

**Structure decision: three campaigns, one ad group each, not one campaign with three ad groups.**
Josh's split is web apps ~45%, dashboards ~35%, websites ~20%. In a single campaign the ad groups share one budget, and that can't hold a split:
- Under Maximize Clicks, Google sets the bids itself. The only cap is the **maximum CPC bid limit on the strategy or campaign**. Ad-group max CPC bids aren't used, so "ad-group CPC caps" can't steer the split. ([Google Ads Help: About Maximize clicks bidding](https://support.google.com/google-ads/answer/6268626))
- Maximize Clicks spends the shared budget where clicks are cheapest. Website terms are likely the cheapest (ASSUMPTION), so websites would take the most money. That's the reverse of the plan, and `economics.md` says websites can carry the least.
- Separate campaigns give each route its own daily budget and its own CPC cap, and the split happens by construction. The cost: each campaign reaches the 15-conversion bidding switch on its own, and that will be slow (see section 3). At this budget the switch is slow either way.

| Campaign | Route | Share | Start $/day | Start $/month (×30.4) | Ceiling $/day | Ceiling $/month |
|---|---|---|---|---|---|---|
| SKOX – Search – Web apps – v1 | `/web-apps` | 45% | $9.00 | $273.60 | $11.50 | $349.60 |
| SKOX – Search – Dashboards – v1 | `/dashboards` | 35% | $7.00 | $212.80 | $9.00 | $273.60 |
| SKOX – Search – Websites – v1 | `/websites` | 20% | $4.00 | $121.60 | $5.00 | $152.00 |
| **Total** | | | **$20.00** | **$608.00** | **$25.50** | **$775.20** |

**Combined account budget.** Meta retargeting (`meta-retargeting-v1`) runs at the same time, at $7/day. The $1,000/month test cap in the README covers both platforms together, so Google's ceiling is set to leave room for Meta.

| | Google $/day | Google $/month | Meta $/day | Meta $/month | **Combined $/month** |
|---|---|---|---|---|---|
| At start | $20.00 | $608.00 | $7.00 | $212.80 | **$820.80** |
| At ceiling | $25.50 | $775.20 | $7.00 | $212.80 | **$988.00** |

At the ceiling the combined total is $12.00 a month under the $1,000 cap. Any Meta budget increase has to come out of Google's ceiling, or the cap has to be raised by Josh first.

**Scale rule:** raise spend by at most **+$5/day per week across the whole account** (Google and Meta together), not per campaign. That's at most +$152.00 a month per weekly step. State every step in dollars, before and after. Only raise when cost per qualified lead has been under the ceiling for 4+ weeks and search impression share lost to budget is above 20%. **Never raise while cost per lead is rising.**

**60-day dollar stop:** at start budgets, day 60 is **$1,200.00** of Google spend ($20 × 60). Together with Meta's day-60 stop ($420.00), **$1,620.00** is the most the test spends before either platform's hard stop, if it never scales. If Google has produced zero qualified leads by then, all three campaigns pause.

Google can spend up to twice a campaign's daily budget on a single day. It evens out over the month, and monthly spend won't pass daily budget × 30.4.

**What success looks like**
- **Day 30:** the test lead passed and is written up in `audits/`; the Google Ads conversion shows "Recording conversions"; the search-terms report is mostly buyers, with junk terms negated every week; at least one real scope request with a `gclid` in the lead email; no campaign has hit the dead rule ($300 spent or 30 days with zero form starts).
- **Day 60:** at least one **qualified** lead (definition in `economics.md`, Josh to confirm) from paid search, and a first cost-per-lead per campaign set beside Josh's tally. Zero qualified leads at 60 days (about $1,200.00 of Google spend) → pause and rethink the offer or keywords, not the bids (dead-campaign rule).
- The volume expectation is ASSUMPTION, from `economics.md`: at $608/month and $8–25 CPC, about 24–75 clicks and about 1–6 form leads a month across all three campaigns. The CPC caps below lower that range: where real CPCs sit above a cap, the campaign underspends instead of buying the click, so expect the low end (see the per-campaign click estimates).

---

## 2. Prerequisites checklist

Nothing below is confirmed by Josh in this session, so every item is UNKNOWN. Spend starts only when every box is ticked.

| # | Item | Status |
|---|---|---|
| 1 | `RESEND_API_KEY` set in Vercel → skox → Production | UNKNOWN (set 2026-09-13 per memory; confirm) |
| 2 | `LEAD_FROM_EMAIL` set | UNKNOWN (set 2026-09-13 per memory; confirm) |
| 3 | `CONTACT_EMAIL` set to an inbox someone reads daily | UNKNOWN (code default `founder@`, `.env.example` says `founders@`) |
| 4 | `NEXT_PUBLIC_GA_MEASUREMENT_ID` = `G-7KNPZ9T693` live (it also loads gtag.js for Google Ads) | UNKNOWN (live since 2026-10-01 per memory; confirm) |
| 5 | Google Ads conversion action created **manually using code**: Submit lead form, no value, Count = One, 90-day click window, enhanced conversions on | UNKNOWN |
| 6 | `NEXT_PUBLIC_GOOGLE_ADS_ID` (`AW-…`) set | UNKNOWN |
| 7 | `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL` (full `AW-…/…` send_to) set | UNKNOWN |
| 8 | Site redeployed after items 6–7 (`NEXT_PUBLIC_*` values are baked in at build), using the `git archive` deploy, not `git push` | UNKNOWN |
| 9 | **No** URL-based conversion on `/scope-received` | UNKNOWN |
| 10 | GA4 linked to Google Ads, with `generate_lead` imported as **Secondary** only (or not imported) | UNKNOWN |
| 11 | GA4: `generate_lead` marked as a key event; `scope_partial_captured`, `scope_form_started`, `scope_cta_clicked` **not** marked | UNKNOWN |
| 12 | Test-lead procedure in `tracking.md` passed on `/dashboards?…&gclid=TEST123`, result saved to `audits/YYYY-MM-DD-tracking-test.md` | UNKNOWN |
| 13 | Conversion action shows "Recording conversions" or "No recent conversions" (not "Unverified") | UNKNOWN |
| 14 | Auto-tagging on (Admin → Account settings) | UNKNOWN |
| 15 | Account-level auto-apply recommendations **off** (they can add broad-match keywords and rewrite ads) | UNKNOWN |
| 16 | Reiss initials the sign-off line in `claims.md` | UNKNOWN (blank) |
| 17 | `economics.md` route prices and margins filled in (needed for cost-per-lead ceilings) | UNKNOWN (all JOSH) |
| 18 | Keyword Planner check done (section 4, "Paste into Keyword Planner") and CPC caps set from it | UNKNOWN |
| 19 | 7-day / 14-day: calendar or business days | UNKNOWN. Ads say "7-day"/"14-day" exactly as the site does, so this doesn't block launch, but answer it before anyone writes "7 business days". |
| 20 | Google advertiser verification started or complete (Billing → Advertiser verification); the legal name matches the payments profile. A missed verification deadline can pause ads. | UNKNOWN |
| 21 | Business name "SKOX" and a logo asset approved on the account (logo file TBD by Josh) | UNKNOWN |
| 22 | `/ads-prelaunch google-search-v1` returns no FAIL | UNKNOWN |

---

## 3. Campaign settings

These apply to all three campaigns unless a row says otherwise.

| Setting | Value |
|---|---|
| Campaign type | Search. Create without a goal's guidance, then pick the conversion goal below. |
| Networks | Google Search only. **Search Partners off. Display Network off.** |
| AI Max for Search / final URL expansion | **Off.** It expands queries beyond the keyword list and can send traffic to other pages. |
| Automatically created assets | **Off.** Google would write headlines from the landing page, and those bypass `claims.md`. |
| Broad match setting (campaign level) | **Off.** Phrase and exact only. |
| Locations | United States |
| Location option | **Presence:** "People in or regularly in your included locations" (not "Presence or interest") |
| Language | English |
| Schedule | All days, all hours for v1. Judgement call: a narrower schedule would starve the data. ASSUMPTION ($8–25 CPC, capped by the limits below): at full spend, Web apps gets about 0.75–1.13 clicks a day, Dashboards 0.70–0.88, and Websites at most about 0.67 at its $6 cap. That's under 1 click a day per campaign, and roughly 2–2.7 a day across the account when all three serve. Where real CPCs sit above a cap, the campaign **underspends** its budget; it doesn't just get cheaper clicks. Read low spend as cap-limited, not as savings. Revisit after 30 days with the hour-of-day report. |
| Start date | A future date, so nothing serves before the checklist is done. Remove it or set it to today when Josh is ready. |
| Ad rotation | Optimize (default) |
| Bidding (weeks 1 to switch) | **Maximize Clicks with a maximum CPC bid limit** (table below) |
| Bidding switch rule | When **that campaign** has **15+ conversions in the last 30 days**, move it to Maximize Conversions with no target CPA. Run Maximize Clicks for at least 2 weeks before considering the switch. After that the 15-conversion gate decides, not the calendar. Each campaign switches on its own count. Don't switch on the three campaigns' combined count without Josh deciding to restructure. |
| Budget | Per the summary table: $9.00 / $7.00 / $4.00 per day |
| Final URL suffix | `utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_content={adgroupid}&utm_term={keyword}` |
| Auto-tagging | On (account setting, adds `gclid`) |
| Conversion goal | Campaign-specific goal: **only** the manually coded lead action (the `scope_request` event, sent as the Google Ads conversion with `send_to` = `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL`). GA4 `generate_lead` stays Secondary (observe only). |

**Maximum CPC bid limits: ASSUMPTION until Keyword Planner is checked**

| Campaign | Starting cap | Basis |
|---|---|---|
| Web apps | $12.00 | ASSUMPTION, inside the `economics.md` $8–25 range |
| Dashboards | $10.00 | ASSUMPTION |
| Websites | $6.00 | ASSUMPTION; lowest because a $1,250 website can't carry a high CPC (`economics.md`) |

After Keyword Planner: if the "Top of page bid (low range)" for most of a campaign's keywords is above its cap, that campaign will barely serve. Write the real numbers into the Keyword Planner table below and decide with Josh. Don't raise caps silently. Clicks don't happen that way, they just cost more.

**Honest expectation on the bidding switch:** at the ASSUMPTION rates (3–8% of clicks converting, about 1–6 leads a month in total), no single campaign is likely to reach 15 conversions in 30 days in the first 60 days. Staying on Maximize Clicks is the expected state for v1, not a failure.

---

## 4. Ad groups

One ad group per campaign. Each RSA pins **only headline 1** (the route headline) to position 1.

Judgement call on the dashboards and websites ads: **description 1 is also pinned to description position 1.** It carries the C08/C09 condition. An RSA picks descriptions at random, so without the pin the day promise in a headline could show without its condition. Pinning is the only way to guarantee the condition always shows. The web apps ad has no day promise, so no description is pinned there.

Each keyword appears as both phrase `"…"` and exact `[…]`. No broad match.

### 4.1 Web apps (campaign: SKOX – Search – Web apps – v1)

- **Ad group name:** Web apps – v1
- **Final URL:** `https://www.skoxsoftware.com/web-apps`
- **Display path:** `web-apps` (8) / `fixed-price` (11) [C05]

**Keywords: 15 terms × 2 match types = 30 keywords**

| Phrase | Exact |
|---|---|
| "custom web app development" | [custom web app development] |
| "custom web application development" | [custom web application development] |
| "web app development company" | [web app development company] |
| "web application development company" | [web application development company] |
| "web app development agency" | [web app development agency] |
| "custom web app developer" | [custom web app developer] |
| "hire web app developer" | [hire web app developer] |
| "customer portal development" | [customer portal development] |
| "client portal development" | [client portal development] |
| "custom client portal" | [custom client portal] |
| "internal tool development" | [internal tool development] |
| "custom internal tools" | [custom internal tools] |
| "custom business software" | [custom business software] |
| "custom software for small business" | [custom software for small business] |
| "mvp development company" | [mvp development company] |

**Negatives for this campaign only** (phrase match; they keep the other routes' searches in their own campaigns): "dashboard", "dashboards", "website design", "website redesign", "web design"

**RSA headlines (15)**

| # | Headline | Bet |
|---|---|---|
| 1 | Web Apps, Built at Speed (24) [C01] **PIN 1** | speed (route) |
| 2 | Custom Web App Development (26) [C02] | problem |
| 3 | Portals & Internal Tools (24) [C21] | problem |
| 4 | Between Expensive and Risky (27) [C16] | problem |
| 5 | Fixed Price, Agreed Upfront (27) [C05] | certainty |
| 6 | A Delivery Date Before You Pay (30) [C03] | certainty |
| 7 | Date Set at Kickoff (19) [C18] | certainty |
| 8 | No Hourly Billing (17) [C13] | certainty |
| 9 | You Own the Code (16) [C07] | certainty |
| 10 | Work With the Two Founders (26) [C14] | people |
| 11 | Direct Access to the Builders (29) [C06] | people |
| 12 | No Account Managers (19) [C14] | people |
| 13 | Get My Price & Timeline (23) [C11] | CTA |
| 14 | Free Scope Call, No Deposit (27) [C04] | CTA |
| 15 | Keep the Plan Either Way (24) [C19] | CTA |

**RSA descriptions (4)**

| # | Description |
|---|---|
| 1 | Customer portals, internal tools, accounts, payments and integrations. (70) [C21] |
| 2 | A fixed price and a delivery date agreed in writing, before you pay anything. (77) [C03] |
| 3 | Work directly with the two founders building it. No account managers. You own the code. (87) [C06, C14, C07] |
| 4 | Free 30-minute scope call, no deposit, no obligation. The plan is yours either way. (83) [C04, C19] |

### 4.2 Dashboards (campaign: SKOX – Search – Dashboards – v1)

- **Ad group name:** Dashboards – v1
- **Final URL:** `https://www.skoxsoftware.com/dashboards`
- **Display path:** `dashboards` (10) / `fixed-price` (11) [C05]

**Keywords: 12 terms × 2 match types = 24 keywords**

| Phrase | Exact |
|---|---|
| "custom dashboard development" | [custom dashboard development] |
| "dashboard development company" | [dashboard development company] |
| "dashboard development services" | [dashboard development services] |
| "custom business dashboard" | [custom business dashboard] |
| "business dashboard development" | [business dashboard development] |
| "custom reporting dashboard" | [custom reporting dashboard] |
| "custom kpi dashboard" | [custom kpi dashboard] |
| "kpi dashboard development" | [kpi dashboard development] |
| "custom analytics dashboard" | [custom analytics dashboard] |
| "multi location reporting dashboard" | [multi location reporting dashboard] |
| "hire dashboard developer" | [hire dashboard developer] |
| "build a dashboard for my business" | [build a dashboard for my business] |

**Negatives for this campaign only** (phrase): "website", "web design", "portal"

**RSA headlines (15)**

| # | Headline | Bet |
|---|---|---|
| 1 | Dashboards, Built at Speed (26) [C01] **PIN 1** | speed (route) |
| 2 | Custom Dashboard Development (28) [C02] | problem |
| 3 | Your Business in One View (25) [C22] | problem |
| 4 | Stop Rebuilding Reports (23) [C22] | problem |
| 5 | 14-Day Focused Dashboard Build (30) [C08] | speed |
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

**RSA descriptions (4)**

| # | Description |
|---|---|
| 1 | 14-day focused dashboard build. Timing depends on agreed data sources and access. (81) [C08 with its condition] **PIN to description 1** |
| 2 | One clear view of your business, with connected data from your existing tools. (78) [C22, C21] |
| 3 | A fixed price and a delivery date agreed in writing before you pay. You own the code. (85) [C03, C07] |
| 4 | Free 30-minute scope call, no deposit, no obligation. Work with the two founders. (81) [C04, C14] |

C08 check: "focused" is kept in headline 5 and description 1; the condition is in pinned description 1 of the same ad; it lands on `/dashboards`; no "two weeks" anywhere.

### 4.3 Websites (campaign: SKOX – Search – Websites – v1)

- **First to pause.** At a ~$1,250 website price (Lorenzen), `economics.md` puts the max cost per form lead at about $38, which paid search rarely delivers. This campaign probably can't pay back at that price. It's the first campaign to pause if spend has to come down, and its future depends on the prices Josh puts in `economics.md` (a higher website minimum, or a hosting/retainer relationship).
- **Ad group name:** Websites – v1
- **Final URL:** `https://www.skoxsoftware.com/websites`
- **Display path:** `websites` (8) / `fixed-price` (11) [C05]

**Keywords: 10 terms × 2 match types = 20 keywords**

| Phrase | Exact |
|---|---|
| "custom website design" | [custom website design] |
| "custom website development" | [custom website development] |
| "custom web design company" | [custom web design company] |
| "custom website design company" | [custom website design company] |
| "website redesign services" | [website redesign services] |
| "website redesign company" | [website redesign company] |
| "business website design" | [business website design] |
| "small business website design" | [small business website design] |
| "website design company" | [website design company] |
| "professional website design services" | [professional website design services] |

**Negatives for this campaign only** (phrase): "app", "application", "dashboard", "portal", "software"

**RSA headlines (15)**

| # | Headline | Bet |
|---|---|---|
| 1 | Websites, Built at Speed (24) [C01] **PIN 1** | speed (route) |
| 2 | Custom Website Design (21) [C21] | problem |
| 3 | 7-Day Focused Site Build (24) [C09] | speed |
| 4 | Built for Mobile (16) [C21] | problem |
| 5 | Lead Capture & Booking (22) [C21] | problem |
| 6 | Between Expensive and Risky (27) [C16] | problem |
| 7 | Fixed Price, Agreed Upfront (27) [C05] | certainty |
| 8 | A Delivery Date Before You Pay (30) [C03] | certainty |
| 9 | No Hourly Billing (17) [C13] | certainty |
| 10 | You Own the Code (16) [C07] | certainty |
| 11 | Work With the Two Founders (26) [C14] | people |
| 12 | Direct Access to the Builders (29) [C06] | people |
| 13 | Get My Price & Timeline (23) [C11] | CTA |
| 14 | Free Scope Call, No Deposit (27) [C04] | CTA |
| 15 | Keep the Plan Either Way (24) [C19] | CTA |

**RSA descriptions (4)**

| # | Description |
|---|---|
| 1 | 7-day focused site build. Scope, content and access agreed before kickoff. (74) [C09 with its condition] **PIN to description 1** |
| 2 | Custom design built for mobile, with lead capture and booking integrations. (75) [C21] |
| 3 | A fixed price and a delivery date agreed in writing before you pay. You own the code. (85) [C03, C07] |
| 4 | Free 30-minute scope call, no deposit, no obligation. Work with the two founders. (81) [C04, C14] |

C09 check: "focused" is kept; the condition is in pinned description 1; it lands on `/websites`; no "one week" anywhere.

C04 check (all three ads): "No Deposit" appears only as "Free Scope Call, No Deposit" and "Free 30-minute scope call, no deposit, no obligation". It never stands alone.

### Paste into Keyword Planner

I can't see Keyword Planner, so there are no volumes or CPCs in this file. Google Ads → Tools → Planning → Keyword Planner → **Get search volume and forecasts** → paste the block below → Locations: United States, Language: English, Network: Google. Then copy "Avg. monthly searches", "Top of page bid (low range)" and "(high range)" into the table under it.

```
custom web app development
custom web application development
web app development company
web application development company
web app development agency
custom web app developer
hire web app developer
customer portal development
client portal development
custom client portal
internal tool development
custom internal tools
custom business software
custom software for small business
mvp development company
custom dashboard development
dashboard development company
dashboard development services
custom business dashboard
business dashboard development
custom reporting dashboard
custom kpi dashboard
kpi dashboard development
custom analytics dashboard
multi location reporting dashboard
hire dashboard developer
build a dashboard for my business
custom website design
custom website development
custom web design company
custom website design company
website redesign services
website redesign company
business website design
small business website design
website design company
professional website design services
```

| Keyword | Avg. monthly searches | Top of page bid low | Top of page bid high |
|---|---|---|---|
| (Josh fills in from Keyword Planner) | | | |

Keywords that show "–" or under 10 searches get "Low search volume" status and won't serve. Keep them for now; they cost nothing. If a whole campaign is mostly low volume, flag it in the first weekly review.

---

## 5. Campaign negatives

Add these as one **shared negative keyword list** called "SKOX – Search negatives – v1" and apply it to all three campaigns. Words without quotes are negative broad match: they block any search containing the word. Negatives don't match close variants, so plurals are listed separately.

**Jobs and careers:** job, jobs, career, careers, salary, salaries, hiring, internship, internships, intern, resume, "job description", "remote jobs", "freelance jobs", indeed, glassdoor

**Learning:** tutorial, tutorials, course, courses, learn, learning, "how to", bootcamp, certification, certificate, class, classes, degree, university, college, student, students, "for beginners", example, examples, "project ideas", youtube, pdf, book, udemy, coursera, w3schools, github

**DIY and templates:** template, templates, theme, themes, diy, "drag and drop", builder, builders, "no code", "no-code", nocode, "low code", "open source", plugin, plugins, sample, samples, download, apk, "app store"

**Platforms** (names allowed here as negatives only): wix, squarespace, wordpress, shopify, webflow, godaddy, weebly, "power bi", powerbi, tableau, looker, "data studio", "looker studio", excel, "google sheets", salesforce, hubspot, bubble, retool, glide, softr, airtable, notion, canva, figma, "power apps", powerapps, appsheet, zoho, sharepoint, grafana, metabase, kibana, qlik, domo

**Freelancer marketplaces:** upwork, fiverr, toptal, peopleperhour, 99designs, "freelancer.com", craigslist

**Price-shoppers:** free, cheap, cheapest, "low cost", inexpensive, affordable, budget, discount, coupon, coupons, deal, deals

**Logins and existing-software users** (a lot of "client portal" searches are people trying to log in): login, "log in", "sign in", signin, password, "customer service", support, "phone number"

**Off-the-shelf software shoppers:** "portal software", "dashboard software", "dashboard tool", "dashboard tools", reviews, review, "vs", alternative, alternatives

**Services SKOX doesn't sell:** "mobile app", "ios", "android", iphone, game, games, seo, "marketing agency", "digital marketing", logo, hosting, domain, "email marketing", "24/7", "staff augmentation"

**Location-seekers:** "near me". Judgement call: the copy is deliberately not local, so someone wanting a local shop is a poor match. Remove this one if Josh disagrees.

Two calls I made on purpose:
- I didn't add "freelancer" or "freelance" alone. Someone searching "freelance web app developer" may be a buyer comparing options, and the ads speak to that comparison (C13, C14). Only the marketplaces are excluded. Revisit after the first search-terms report.
- I didn't add "cost" or "price". "Custom web app development cost" is a buyer researching, and the site's answer is the scope call.

---

## 6. Assets

Attach at **campaign** level to all three campaigns, except where a sitelink row says otherwise. No sitelink, callout or snippet carries a day promise. C08 and C09 may only appear in their own route's ads, and sitelinks show across campaigns.

**Sitelinks**

| Sitelink text | Description 1 | Description 2 | URL | Attach to |
|---|---|---|---|---|
| Custom Web Apps (15) [C02] | Customer portals & internal tools (33) [C21] | Accounts, payments & integrations (33) [C21] | `https://www.skoxsoftware.com/web-apps` | Dashboards, Websites |
| Custom Dashboards (17) [C02] | One clear view of your business (31) [C22] | Data from your existing tools (29) [C21] | `https://www.skoxsoftware.com/dashboards` | Web apps, Websites |
| Custom Websites (15) [C02] | Custom design, built for mobile (31) [C21] | Lead capture & booking integrations (35) [C21] | `https://www.skoxsoftware.com/websites` | Web apps, Dashboards |
| Get My Price & Timeline (23) [C11] | Free 30-minute scope call (25) [C04] | Reply within one business day (29) [C10] | `https://www.skoxsoftware.com/` | All three |

Each campaign gets 3 sitelinks: the CTA plus the two routes that aren't its own final URL.

**Callouts** (all three campaigns). Callouts that repeated a headline word for word have been dropped: "Fixed price upfront", "You own the code", "No account managers", "No hourly billing".
- Delivery date in writing (24) [C03]
- Free scope call (15) [C04]
- Reply in 1 business day (23) [C10]
- Work with the founders (22) [C06]
- Working review halfway (22) [C15]

**Business name** (account level): SKOX (4) [brand name, not a claim; "Independent software studio" is the approved descriptor if a longer one is ever needed]

**Business logo** (account level): the SKOX mark. **Logo file TBD by Josh.** Google asks for a square image (1:1, at least 128×128) and accepts an optional landscape version (4:1). Use the existing SKOX mark, not a new design.

**Structured snippet** (all three campaigns). Header: **Services**
- Custom web apps (15) [C02]
- Customer portals (16) [C21]
- Internal tools (14) [C21]
- Custom dashboards (17) [C02]
- Custom websites (15) [C02]

Not used in v1: price assets (no price exists), call assets (no phone in copy), location assets, image assets (none briefed), lead-form assets (leads must go through the site form so they're tracked).

---

## 7. Upload steps

Google moves its menus around. If a label differs, look for the closest match and note it in the next review.

**A. Account-level (once)**
1. Sign in at ads.google.com. If the top bar says "Smart Mode", go to Settings → "Switch to Expert Mode".
2. Admin (gear icon) → Account settings → **Auto-tagging** → tick "Tag the URL that people click through from my ad" → Save.
3. Recommendations (left menu) → **Auto-apply** → turn off every type → Save.
4. Goals → Conversions → Summary → **+ New conversion action** → Website → enter `skoxsoftware.com` → **"Set up manually using code"** (not "URL", not GA4). Category: Submit lead form. Name: `Scope request – site form`. Value: Don't use a value. Count: One. Click-through window: 90 days. Enhanced conversions: on, via the Google tag. Save.
5. On the tag screen, choose "Use Google tag" → copy the `AW-…` ID and the full `send_to` (`AW-…/…`). Give both to whoever sets the Vercel env vars (checklist items 6–8). Don't install the snippet by hand; the site already sends the event.
6. Goals → Conversions → Summary: confirm `Scope request – site form` is **Primary**. If GA4's `generate_lead` appears, open it → set to **Secondary**.
7. Billing → **Advertiser verification**: if Google shows a verification request, start it straight away. The legal name has to match the payments profile. A missed deadline pauses ads. (Checklist item 20.)
8. Assets (left menu, or Campaigns → Assets) → + → **Business name** → `SKOX` → Save at account level. Then + → **Business logo** → upload the square SKOX mark (file TBD by Josh) → Save. Both need review before they show. (Checklist item 21.)
9. Tools → Shared library → **Negative keyword lists** → + → name `SKOX – Search negatives – v1` → paste every negative from section 5, one per line (keep the quotes on the phrase ones) → Save.

**B. Each campaign (repeat 3 times: Web apps, Dashboards, Websites)**
10. Campaigns → **+ New campaign** → "Create a campaign without guidance" (or the Leads objective if that option is missing) → **Search** → Continue.
11. If asked for conversion goals, keep only "Submit lead forms" with `Scope request – site form`. Remove any others.
12. Campaign name: exactly as in the summary table (e.g. `SKOX – Search – Web apps – v1`).
13. **Bidding:** "What do you want to focus on?" → Clicks → tick "Set a maximum cost per click bid limit" → enter the cap from section 3 ($12.00 / $10.00 / $6.00).
14. **Networks:** untick "Include Google search partners" and "Include Google Display Network".
15. **Locations:** "Enter another location" → United States. Open **Location options** → Include: "Presence: People in or regularly in your included locations".
16. **Languages:** English only.
17. **AI Max / broad match / automatically created assets:** if any appears, turn it off. That includes "Use broad match keywords", "AI Max for Search campaigns", "Final URL expansion", "Text customization" and "Automatically created assets".
18. **More settings:** set a **Start date** in the future. Ad schedule: leave as all days. Under **Campaign URL options**, paste the Final URL suffix from section 3 exactly.
19. **Keywords and ads:** final URL from section 4. Paste the keywords for that route, phrase lines with `"…"` and exact lines with `[…]`. Ignore Google's "get keyword ideas" box.
20. Build the RSA: paste headlines 1–15 and descriptions 1–4 from section 4. Set display path 1 and 2. On headline 1, click the pin icon → "Show only in position 1". For Dashboards and Websites only, pin description 1 to position 1. Ignore "Ad strength" prompts that suggest adding unapproved text.
21. **Budget:** "Set custom budget" → $9.00 / $7.00 / $4.00.
22. Review → Publish. If Google suggests extra keywords or "recommendations", decline.
23. Open the new campaign → **Keywords** → Negative keywords → + → "Use negative keyword list" → `SKOX – Search negatives – v1`. Then add the three to five campaign-only negatives from section 4 as phrase match.
24. **Assets** → + → Sitelink: add the 3 sitelinks for this campaign (section 6). Repeat for the 5 callouts and the Services structured snippet, at campaign level. (Business name and logo are already set at account level in step 8.)
25. Check Ads: status should move from "Under review" to "Eligible" within a working day. Disapproved → copy the policy reason into the next review; don't edit text that isn't in `claims.md`.

**C. Go-live**
26. Only after section 2 is all ticked and `/ads-prelaunch` passes: set each campaign's start date to today (Settings → Start and end dates).

---

## 8. What to watch

From `economics.md` and the ad-manager diagnostics. No verdict on cost per lead before the minimums.

**Week 1 (learning period)**
- No verdict on anything. Only two jobs: fix broken tracking, and negate obviously wrong search terms.
- Check every day: do all three campaigns spend? (Impressions > 0. If zero, it's usually low search volume or a CPC cap below the auction; check the keyword status column.)
- First real lead: confirm the email shows `gclid`, `utm_campaign` = a campaign ID and `utm_term` = a keyword. Confirm Google Ads shows the conversion within about 24 hours.
- Search terms report (Insights and reports → Search terms): add negatives for jobs, learning, DIY, platforms and logins.

**Week 2**
- Search terms again; negatives again.
- Per campaign: spend vs budget, clicks, CTR, average CPC against its cap. A campaign spending under half its budget is cap-limited or volume-limited. Note it; don't raise caps yet.
- Bidding: stay on Maximize Clicks. Check conversions in the last 30 days per campaign against the 15 switch threshold.

**Week 4**
- Dead campaign rule: **$300 spent or 30 days with zero form starts** → pause it, and write down why before restarting. At $4/day, Websites reaches 30 days before $300; Web apps reaches about $270 at 30 days.
- Weak rule: clicks but form starts under 2% of clicks → run `landing-auditor` before touching bids.
- First real cost per form lead per campaign, next to Josh's tally. Still no scale decision. Scaling needs 4+ weeks under the ceiling **and** search impression share lost to budget above 20%, and the ceiling doesn't exist until `economics.md` has prices. When scaling is allowed, it's at most **+$5/day per week across the whole account** (Google and Meta together), stated in dollars before and after, up to the $25.50/day Google ceiling ($988.00/month combined with Meta). Never scale while cost per lead is rising.
- If spend has to come down, pause **Websites first** (section 4.3).
- Bidding switch: any campaign with 15+ conversions in 30 days → Maximize Conversions. Expect none (section 3).
- Day 60 (about **$1,200.00** of Google spend at start budgets; **$1,620.00** with Meta's $420.00): zero qualified leads across the account → pause all three campaigns; rethink the offer or keywords, not the bids.

---

## 9. Weekly review recipe

Every Monday, after the lead loop in `lead-loop.md`:

1. In Google Ads, set the date range to **Last 7 days** and download a CSV of each report (Download icon → .csv):
   - Campaigns
   - Ad groups
   - Keywords (Search keywords)
   - Search terms
2. Repeat all four for **Last 30 days**. That's eight files.
3. In chat to `google-ads`, give it the eight CSVs and the lead tally for the same 7 and 30 days, per campaign:

   | Campaign | Form leads | Qualified | Calls held | Proposals sent | Won |
   |---|---|---|---|---|---|
   | Web apps | | | | | |
   | Dashboards | | | | | |
   | Websites | | | | | |
   | Unknown / no gclid | | | | | |

   Match leads to campaigns with `utm_campaign` (the campaign ID) and `gclid` from the "Scope request" emails. "Unfinished enquiry" emails don't count.
4. The agent writes `docs/ads/reviews/YYYY-MM-DD-google.md` with platform conversions beside your tally, proposed negatives with the money each term wasted, and one change block per recommendation.

---

## Open items for Josh

- Everything in section 2 is UNKNOWN.
- Keyword volumes and CPCs: not known; run the Keyword Planner paste above. The CPC caps are ASSUMPTION until then.
- `economics.md` prices and margins (JOSH): with no cost-per-lead ceiling, no scale or kill verdict on cost is possible, only the volume-based dead rules.
- 7/14 calendar or business days: ads avoid the question by using the site's own words.
- Reiss sign-off on `claims.md`. Nothing from the "Needs Reiss" list is used in this file.
