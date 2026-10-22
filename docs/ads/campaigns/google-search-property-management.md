# Google Search — Property Management

Written 2026-10-21. Status: **DRAFT in Google Ads ("Search - Property Management - US", draft 10219525985), not published.** Audits: claims FAIL only on Reiss's missing sign-off of the new page wording; policy PASS WITH FIXES (fixes applied below). Publishing was left to Josh. Landing page: `https://www.skoxsoftware.com/for/property-management` (live since commit 22dbd33).

**Why:** our own outreach (2026-10-17 to 10-20) found property management the only segment with warm replies: 3 of 5 property managers reached said yes or warm, plus 1 of 1 title company. See `docs/prospects/brain-panel/market-strategist.md` (segment 1: owner/tenant portal, online applications, maintenance requests). Caveat: those yeses came from us calling them about a dated site, not from them searching. This campaign tests whether the same buyers search.

## Budget (inside the $300/month cap)

| Campaign | Before | After | $/month (×30.4) |
|---|---|---|---|
| Search – Trades – US | $9.80/day | **$5.80/day** | $176.32 |
| **Search – Property Management – US** (new) | n/a | **$4.00/day** | $121.60 |
| Search – Services – US | paused | paused | $0 |
| **Total** | $9.80/day | **$9.80/day** | **$297.92** |

Why Trades can drop: since the $4 cap came back it spends ~$5/day at most (10-14 review: 54% of budget), so $5.80 barely limits it. A separate campaign, not an ad group inside Trades, is the only way to hold property management at $3–5/day: ad groups share their campaign's budget.

Stop rules (same as the plan): pause the ad group at **$60 spent with zero form starts**; review at $300 total account spend.

## Settings

Same as Trades after the 10-21 fixes: Search only (**Search Partners off, Display off**), Maximize clicks with a **$4.00 max CPC limit**, United States with Presence, English, **AI Max off, automatically created assets off, broad match off**, final URL suffix `utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_content={adgroupid}&utm_term={keyword}`, conversion goal = account default (primary: Scope request (site form, code) only). Shared negative list "SKOX – Search negatives – v2" attached (checked: no conflict; it only overlaps on "homeowner(s)").

## Ad group: Property management

Final URL `https://www.skoxsoftware.com/for/property-management`.

### Keywords (phrase and exact)

| Keyword | Match | Why |
|---|---|---|
| property management software | Phrase | Mid-volume. Mostly SaaS shoppers, like "landscaping software", which did get clicks under $4. Watch the search terms |
| custom property management software | Phrase | Exact intent for the page H1 |
| property management owner portal | Phrase | Build 2 |
| owner portal for property managers | Phrase | Build 2 |
| tenant portal software | Phrase | Build 2/1 |
| maintenance request software | Phrase | Build 1, the live example |
| property maintenance request system | Phrase | Build 1 |
| work order software for property management | Phrase | Build 1 |
| online rental application software | Phrase | Build 3 |
| [property management dashboard] | Exact | Dashboards angle |
| [property management reporting software] | Exact | Owner statements |

Volumes are UNKNOWN (no Keyword Planner access in this session). Expect several to show "Low search volume".

### Ad-group negatives

Platforms (people who want that brand's login or pricing): appfolio, buildium, yardi, "rent manager", doorloop, propertyware, rentec, tenantcloud, turbotenant, rentredi, entrata, realpage, "rentvine", "hemlane", "innago", "avail".
Tenants and renters: "pay rent", "apartments", "for rent", "homes for rent", "near me", "portal login", "sign in", "my landlord", "tenant rights".
Not our buyer: hoa, "property manager jobs", "how to become", "free trial", "excel", "spreadsheet", "app for landlords" (single-door landlords; watch rather than block if volume is tiny).

### Responsive search ad

Display path: `/property-mgmt/software`

| # | Headline | Chars | Claim |
|---|---|---|---|
| H1 | Property Management Software | 28 | T01 (pin 1) |
| H2 | For Property Managers | 21 | T01 qualifier (pin 2, as on every trade ad) |
| H3 | Custom Property Mgmt Tools | 26 | T01 |
| H4 | Maintenance Request Desk | 24 | T03 |
| H5 | An Owner Portal, Built for You | 30 | T03 + T08 |
| H6 | Online Rental Applications | 26 | T03 |
| H7 | Repair Requests by Text? | 24 | T02 |
| H8 | Owners Calling for Updates? | 27 | T02 |
| H9 | Focused Builds From $5,000 | 26 | T11 |
| H10 | Fixed Price, Agreed Upfront | 27 | C05 |
| H11 | You Own the Code | 16 | C07 |
| H12 | Free 30-Minute Scope Call | 25 | C04 (the call only) |
| H13 | Try a Working Example | 21 | T04 |
| H14 | Connected to Your Tools | 23 | T06 (exact wording, per policy audit) |
| H15 | Built at Speed | 14 | C01 |

| # | Description | Chars | Claim |
|---|---|---|---|
| D1 | Maintenance requests, owner updates and rental applications in one place, built for you. | 88 | intro, T03, T08 |
| D2 | Focused builds start at $5,000. Free 30-minute scope call, no deposit for the call. | 83 | T11 + C04 (pin 2, as on the trade ads) |
| D3 | Repairs over an owner's limit wait for their approval. Try the working example online. | 86 | T03 + T04 ("OK" removed per policy audit) |
| D4 | Fixed price and delivery date agreed in writing before you pay. You own the code. | 81 | C03 + C07 |

Every length checked with Python. No location, no guarantee, no AI-as-method, no named platform in copy (platform names appear only as negatives).

### Assets

Campaign callouts copied from Trades (already approved): Working examples to try · Free scope call · Working review halfway · Keep the scope either way · Reply in 1 business day · Delivery date in writing. The account-level call asset (904) 792-0720 applies automatically.

## Needs Reiss

The new `/for/property-management` wording (pains, builds, intro) in `content/trades.ts`, the same sign-off he gave the other eight trade pages. The ad only reuses that wording plus already-signed claims.

## Draft state (2026-10-21, ~10:20 PM ET)

Entered in the draft: name, goal Submit lead forms (1 action: Scope request), Maximize clicks with a $4.00 cap, Search Partners and Display off, AI Max off, English, final URL suffix, 11 keywords, RSA (15 headlines, 4 descriptions, H1 pin 1, H2 pin 2, D2 pin 2), $4.00/day.

**Fix right after publishing (the wizard's review page didn't keep these):**
1. Locations: the review shows "All countries and territories". Set **United States, Presence** in campaign settings.
2. Asset optimization: the review shows "Text customization and Final URL expansion turned on" (inactive while AI Max is off). Turn both off anyway.
3. Rename "Ad group 1" to "Property management".
4. Add the ad-group negatives above, attach the shared list "SKOX – Search negatives – v2", and link the six campaign callouts.
5. **Lower Search – Trades – US from $9.80 to $5.80/day in the same sitting**, so the account stays at $9.80/day (~$298/month).
