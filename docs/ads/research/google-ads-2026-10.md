# Google Search ads in SKOX's space — October 2026

Researched 2026-10-05. Sources: 8 live Google SERPs (desktop, one load each) and the Google Ads Transparency Center (US, text ads) for 7 advertiser domains. All ad text below is quoted short, from OCR of Google's own archived renders or from the live results page.

## Method and cost

- **Apify: $0.00 spent.** Two runs attempted (`apify/google-search-scraper`, `scrapesage/google-ads-transparency-scraper`), both rejected before starting with "Monthly usage hard limit exceeded". Nothing was charged; 2 of the 4 allowed runs were used. Josh: the Apify account is at its monthly cap.
- **Live SERPs (step 1):** loaded each query in the Claude browser pane (`google.com/search?...&hl=en&gl=us`). This is one desktop load per query from Josh's network (Central Florida IP, no signed-in Google profile). Ads vary by time, auction and location, so treat "no ads" as a signal, not proof.
- **Transparency Center (step 2):** called the Center's public search endpoint directly, region US (2840), up to 800 creatives per domain. Kept only text-format creatives from the brand's own advertiser account (many results under servicetitan.com, getjobber.com and housecallpro.com are their *customers'* ads linking to booking pages). "Active" = last shown within 30 days of 2026-10-05. Days shown is Google's own count. Text was read by OCR from the archived ad renders.
- After 7 domains the endpoint started rate-limiting (HTTP 302 to a block page), so Vonigo, Archdesk and ThoughtSpot (found in step 1) were **not** pulled.

## 1. Live paid results by query

| Query | Ads? | Advertisers (headline → display URL) |
|---|---|---|
| multi location reporting dashboard | Yes, 2 (mid-page block) | Birdeye: "Multi-Location Listings Management Platform" → birdeye.com. ThoughtSpot: "Live Dashboards, Not Reports" → thoughtspot.com/bi/dashboard |
| franchise reporting dashboard | **Yes, 4 top + 2 bottom (most contested)** | Sage: "Real-Time Reporting Dashboards - All Your Financials, Connected". Vonigo: "The Franchise Growth Platform" / "#1 Franchise Analytics Software". FranFast: "All-in-One Franchise System". Capterra: "Top 10 Franchise Mgmt Software" (top) and "Best Franchise Mgmt Tools" (bottom). Sage again at bottom: "Take a Free Product Tour" |
| field service KPI dashboard | **No ads** | — |
| HVAC KPI dashboard | **No ads** | — |
| dashboard for contractors | Yes, 1 (bottom) | Archdesk: "Built For Contractors \| Real Time Dashboards" (construction, not home services) |
| custom quoting software for contractors | **No ads** | — |
| custom dashboard development | **No ads** | — |
| custom software for service business | **No ads** | — |

Descriptions and sitelinks seen live (short quotes):
- Vonigo description: "Franchise software with anywhere access on mobile & web." Sitelinks: Manage All Locations Simply · Book Your Free Demo Today · Vonigo Growth Program · Pricing.
- Birdeye: "Be Found Online. Get Your Business Listed. 24 x 7 Customer Support."
- ThoughtSpot: "eliminates dashboard sprawl with AI-augmented Liveboards."
- FranFast: "Real-Time Insights. POS & CRM Integration."
- Capterra sitelinks: Top Franchise Mgmt Software · Leading Way To Find Systems · Small Business Software · Salon.
- Archdesk: "Real time dashboards across projects, costs, procurement and site records." Sitelinks: Subcontractor Management · Request a Demo · Construction Reporting · Subcontractors · Pricing.

Organic note: the uncontested queries are full of blog listicles, YouTube "dashboard in Excel" templates (Next Gen Templates shows up on three queries) and a few small builders (Fuselab Creative, Allen App Tools "One app for quoting, scheduling, job costing and invoicing"). Nobody is paying to answer them.

## 2. Long-running text ads (Transparency Center, US)

Active brand text ads found: ServiceTitan 119 · Jobber 731 · Housecall Pro 381 · AgencyAnalytics 44 · FranConnect 15 · Databox 4 · ScienceSoft 15. Almost every active one has run ≥60 days; the ones below are the longest-running (likely winners).

| Advertiser | Days | Running since | Headline (short quote) | Description angle (short quote) |
|---|---|---|---|---|
| Jobber | 1,484 | 2022-08 | "Free Quote Templates" | "Create a Quote & Get Paid Faster" |
| Jobber | 1,477 | 2022-09 | "Free Estimate Templates" | same; "Sign Up Today - It's Free" |
| Jobber | 1,475 | 2022-08 | "Estimating App for Contractors" | "Quote, Schedule & Get Paid Faster" |
| Jobber | 1,434 | 2022-08 | "#1 App for Contractors" | "Contractor Invoicing App." |
| Jobber | 1,424 | 2022-08 | "Jobber® (Official App)" | "#1 Most Recommended Software for Field Service" |
| Housecall Pro | 1,464 | 2022-09 | "Tools Trusted by 200k+ Pros" | "manage everything from scheduling, dispatching, invoicing" |
| Housecall Pro | 1,437 | 2022-09 | "Work Simpler, Grow Smarter." | "See why over 20,000 service businesses trust" |
| Housecall Pro | 1,226 | 2023-05 | "All-In-One Contractor App - #1 Easiest to Use" | "Everything you need and more to run and grow" |
| Housecall Pro | 1,135 | 2023-08 | "Grow Your Cleaning Business - Try It For Free" | vertical-specific landing |
| ServiceTitan | 951 | 2023-12 | "#1 Irrigation Company Software" | "Estimate, Dispatch, & Invoice" (sitelink) |
| ServiceTitan | 938 | 2024-03 | "Estimating App For HVAC" (URL /hvac) | "Save Time, Streamline Your Entire Job Cycle." |
| ServiceTitan | 926 | 2024-03 | "Customer Portal Software" | "unparalleled visibility into their business operations" ; "Book a personalized demo" |
| ServiceTitan | 923 | 2024-03 | "Contractor Payroll & Timesheet Software" | "keeps their businesses profitable and competitive" |
| AgencyAnalytics | 1,399 | 2022-08 | "AgencyAnalytics Reporting" | "Stop The Spreadsheets! Reclaim Your Time" |
| AgencyAnalytics | 1,318 | 2022-08 | "Agency Analytics" | "The #1 Client Reporting Platform … Free 14-Day Trial" |
| AgencyAnalytics | 1,026 | 2023-10 | "Agency Analytics" | "Automate Your Agency Reporting In Minutes. 75+ Integrations." |
| AgencyAnalytics | 987 | 2022-08 | "AgencyAnalytics" | "Stop Building Spreadsheets. Create Fully Branded PPC Dashboards" |
| FranConnect | 789 | 2024-07 | "See how FranConnect Connects Growth" | "provides a single view of growth." |
| FranConnect | 664 | 2024-10 | (SSO page title, dynamic) | "A Single Source Of Truth For All Data" |
| FranConnect | 612 | 2024-10 | "Franchise Software - Franchise Management" | "Customers Grow 44% Faster" ; sitelinks Request a Demo · Contact Us · Franchise Sales · Franchise Software |
| FranConnect | 568 | 2024-10 | "Expand Locations - Franchise Management" | same 44% claim |
| Databox | 816 | 2024-07 | "Official Site - Beautiful Dashboards" | sitelinks Pricing · Product Overview · About · Dashboard Designer |
| Databox | 697 | 2024-06 | "14 Days Full Trial" | "No-Code, Simple, Quick, & Trusted by 20k+ firms" |
| Databox | 559 | 2024-07 | "All Your Data in One Platform - Free Trial, No Card Required" | "130+ data sources" |
| ScienceSoft | 326 | 2025-01 | Research-report headlines | All healthcare/fintech content offers; **not relevant** to this buyer |

## 3. Patterns

**Recurring angles**
1. **Kill the spreadsheet / one view.** AgencyAnalytics has run "stop the spreadsheets" lines for 3+ years; FranConnect runs "single view of growth" and "single source of truth"; Databox "All Your Data in One Platform". This is the angle closest to SKOX's dashboard offer.
2. **Trade-specific headline per ad group.** ServiceTitan writes a headline per trade and per feature (HVAC, plumbing, irrigation, payroll, customer portal), with matching URL paths (/hvac, /plumbing). Housecall Pro does the same by vertical (cleaning).
3. **Job-cycle verbs.** "Quote, Schedule & Get Paid Faster" (Jobber), "Estimate, Dispatch, & Invoice" (ServiceTitan). The buyer thinks in jobs, not in "software".
4. **Scale proof.** "#1", "200k+ pros", "20k+ firms", "1500 brands", "Grow 44% Faster", star ratings. Every big advertiser leans on it.
5. **Speed of setup.** "in minutes" (AgencyAnalytics, Databox).

**Offers**
- Free trial (Databox 14 days, AgencyAnalytics 14 days, Housecall Pro), often "No Card Required".
- Demo / self-guided tour (ServiceTitan, FranConnect, Vonigo, Archdesk, Sage "Free Product Tour").
- Free templates as a lead magnet (Jobber's quote/estimate templates — the single longest-running ads in the set, 4+ years).
- No ROI calculators or audits seen in this sample.

**Sitelink patterns:** Request a Demo · Pricing · Self-Guided Tour · Case Studies · Why Choose [Brand] · trade/industry pages · "Manage All Locations". Pricing appears on most SaaS ads.

**Uncontested queries (this snapshot):** field service KPI dashboard, HVAC KPI dashboard, custom quoting software for contractors, custom dashboard development, custom software for service business. Contested: franchise reporting dashboard (heavy: Sage, Vonigo, FranFast, Capterra), multi location reporting dashboard (light, off-target: listings and BI), dashboard for contractors (one construction ad).

## 4. Replicable for SKOX

Checked against `docs/ads/claims.md` and `docs/ads/copy-rules.md`.

| Pattern | Replicable? | How / why not |
|---|---|---|
| Kill the spreadsheet / one view | **Yes** | C22 "Stop rebuilding the same report" / "one clear view of your business"; C21 "location & team performance views", "connected data from your existing tools" |
| Trade- or buyer-specific ad groups | **Yes, structurally** | Separate ad groups per query theme (KPI dashboard, multi-location, quoting tool). Note: naming the audience in a headline ("For HVAC owners") is not a claim in claims.md; Reiss should rule whether audience labels need an ID before use |
| Job-cycle language ("quote, schedule, get paid") | Partly | Use only in keywords and landing-page echo. Headlines must still map to a claim; quoting tools are not named in claims.md (C02 says "custom web apps", C21 "internal tools") |
| Speed ("in minutes") | Conditional | Only C08 "14-day focused dashboard build" on /dashboards or /, with a scope-first description. Never "in minutes", never "two weeks" |
| Demo / trial / self-guided tour | **NOT yet** | SKOX has no demo or trial on the site. Nearest honest offer: C04 free 30-minute scope call (never "No deposit" alone), C19 keep the plan either way. A concept demo page would need a new site claim first |
| Free templates lead magnet | **NOT yet** | No template exists. Worth considering (Jobber's 4-year runner proves the angle), but needs an asset and a site claim |
| "#1", "trusted by", counts, ratings, "grow 44% faster" | **NOT replicable** | Forbidden: invented proof, superlatives |
| Pricing sitelink / "Monthly & Annual Pricing" | **NOT replicable** | No price on site. Use C03/C05 "fixed price, agreed upfront" instead |
| "No card required" / risk-free framing | **NOT replicable** | Implies guarantee; SKOX builds take a deposit. C04 applies to the call only |
| Sitelinks | Yes, with claims | e.g. "Free scope call" (C04/C20), "How pricing works" → fixed-price section (C05/C13), "You own the code" (C07), "Dashboards" route (C02/C22) |

**Where SKOX can win:** the five uncontested queries. No one is answering "custom dashboard development" or "field service KPI dashboard" with a paid ad, and the organic results are DIY templates and listicles. SKOX's angle (custom, fixed price, you own it, work with the founders) is the opposite of every SaaS ad above, so it stands out by being different, not by outspending. Avoid "franchise reporting dashboard" at first: it is the one crowded auction, and the advertisers there sell franchisor software, not franchisee dashboards.

## 5. Ten headline ideas (≤30 characters)

| # | Headline | Chars | Claim ID | Bet |
|---|---|---|---|---|
| 1 | One View of Every Location | 26 | C22 + C21 (paraphrase; claims-auditor to confirm) | Certainty |
| 2 | Stop Rebuilding Your Reports | 28 | C22 | Speed |
| 3 | 14-Day Focused Dashboard Build | 30 | C08 (dashboard ads only; scope-first description required) | Speed |
| 4 | Custom Dashboards, Fixed Price | 30 | C02 + C05 | Certainty |
| 5 | Fixed Price, Agreed Upfront | 27 | C05 | Certainty |
| 6 | Delivery Date in Writing | 24 | C03 | Certainty |
| 7 | Location & Team Performance | 27 | C21 | Speed |
| 8 | Work With the Founders | 22 | C06 | People |
| 9 | No Account Managers | 19 | C14 | People |
| 10 | You Own the Code | 16 | C07 | People |

Spares: "Connect Data From Your Tools" (28, C21), "No Hourly Billing" (17, C13), "Free 30-Minute Scope Call" (25, C04/C20), "Keep the Scope Either Way" (25, C19), "Review Working Software Midway" (30, C17 paraphrase).

Run these through the claims-auditor before they go in a campaign file.

## 6. Data gaps

- Apify was unavailable (account at monthly hard limit); live SERPs are one desktop load each from one Florida IP, not the multi-location US sample a scraper would give. Mobile not checked. Re-run steps 1 when credit is available, ideally twice on different days.
- Transparency Center was rate-limited after 7 domains: Vonigo, Archdesk, ThoughtSpot, Birdeye, Sage and FranFast were not pulled.
- The Center doesn't expose which keywords an ad ran on, impressions or spend. "Days shown" is a proxy for a winner, not proof.
- Text was read by OCR from archived renders; two Housecall Pro renders failed to load and were skipped. Minor OCR errors possible.
- Up to 800 creatives fetched per domain; ServiceTitan, Jobber and Housecall Pro have more, so a few long runners may be missing.
- No custom-dashboard or dev agency showed up as an advertiser on any query, so there is no direct-competitor ad copy to study. ScienceSoft (pulled as a stand-in) only runs healthcare/fintech research ads.
