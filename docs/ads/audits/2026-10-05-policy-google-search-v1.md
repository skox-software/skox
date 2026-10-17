# Policy auditor — google-search-v1 — 2026-10-05

**Verdict:** PASS WITH FIXES

No line in the three RSAs, sitelinks, callouts, snippet, display paths or keyword lists is likely to be disapproved under the live Google Ads policies I fetched today. The fixes below lower the risk of limits or a later verification hold; none stops the upload. Account-level items stay UNKNOWN (see "Inputs I could not check").

Scope: Google Search only. Meta checks (6) and video/image text checks (5) were skipped because this file has no Meta, Demand Gen, image or video assets.

## Blockers

| # | Where | Problem | Rule or source | Fix |
|---|---|---|---|---|
| — | — | None found. | — | — |

## Findings by check

### 1. Misrepresentation / unreliable claims
Policy: Misrepresentation, https://support.google.com/adspolicy/answer/6020955 (fetched). Relevant parts: unreliable claims ("an improbable result"), unavailable offers, dishonest pricing, missing business information.

| Line | Outcome | Note |
|---|---|---|
| All 3 ads, headline "Free Scope Call, No Deposit (27)" and description "Free 30-minute scope call, no deposit, no obligation." | Fine | Live on every route: "Free 30-minute scope call. No deposit. No obligation." Dishonest-pricing risk is that "No Deposit" is read as applying to the build (builds take a 50% deposit). The file never lets it stand alone (C04 check, line 279), so it's fine. Keep it that way; never split "No Deposit" into its own headline or callout. |
| Dashboards headline 5 "14-Day Focused Dashboard Build (30)" | Fine | Live on `/dashboards` with the condition "Timing depends on agreed data sources and access." The condition is in description 1, pinned to position 1, so it always serves with the headline. Unreliable-claims risk is controlled. |
| Websites headline 3 "7-Day Focused Site Build (24)" | Fine | Live on `/websites` with "Scope, content and access agreed before kickoff." Condition in pinned description 1. |
| "A Delivery Date Before You Pay (30)", "Fixed Price, Agreed Upfront (27)", "Date Set at Kickoff (19)", "No Hourly Billing (17)", "You Own the Code (16)", "Work With the Two Founders (26)", "No Account Managers (19)", "Direct Access to the Builders (29)" | Fine | All found on the live route pages (C03, C05, C18, C13, C07, C14, C06). |
| Callout "Reply in 1 business day (23)", sitelink desc "Reply within one business day (29)" | Fine | Live on `/` and `/dashboards`: "reply within one business day". |
| Callout "Working review halfway (22)" | Fine | Live: "Review working software at the halfway mark" (C17). |
| No guarantees, "risk-free", superlatives, prices, scarcity, location, AI-as-method or invented proof anywhere in the file | Fine | Checked every headline, description, sitelink, callout and snippet against the Forbidden table in `claims.md`. |

### 2. Editorial
Policy: Editorial, https://support.google.com/adspolicy/answer/6021546 (fetched).

| Line | Outcome | Note |
|---|---|---|
| No ALL CAPS words, no "!", no emoji, no phone number, no "click here" in any asset | Fine | |
| "&" in "Portals & Internal Tools", "Location & Team Performance", "Lead Capture & Booking", "Get My Price & Timeline" and sitelink descriptions | Fine | Used as "and", its intended purpose. Each matches site wording (C21, C11). |
| "14-Day", "7-Day", "30-minute", "fixed-price" display path | Fine | Standard hyphenation. |
| Callouts repeat headlines word for word: "You own the code", "No account managers", "No hourly billing", "Fixed price upfront" | Fine, minor risk | The policy bars "non-standard, gimmicky, or unnecessary repetition" across related assets. Duplicates usually just don't show together, but they waste callout slots. See non-blocker 2. |
| Web apps headline 1 "Web Apps, Built at Speed" + description 1 ending "Built at speed." | Fine, minor risk | Same phrase can serve twice in one ad. See non-blocker 3. |
| "Between Expensive and Risky (27)" (Web apps H4, Websites H6), "Keep the Plan Either Way (24)" | Fine, minor risk | Policy asks content to make sense. Both are fragments that rely on context; Google rarely disapproves this, but they may get Low asset ratings. Watch the asset report. |
| No headline or description names SKOX | Fine, minor risk | Policy: ads must "name the product, service, or entity they are promoting". Services are named; the business name comes from the account's business-name asset. See non-blocker 1. |

### 3. Trademarks
Policy: Trademarks, https://support.google.com/adspolicy/answer/6118 (fetched). Google doesn't restrict trademarks as keywords; it restricts them in ad text when a competitor uses them in a confusing way.

| Line | Outcome | Note |
|---|---|---|
| Ad text, display paths, sitelinks, callouts, snippet | Fine | No third-party brand anywhere. |
| Positive keywords (37 terms × 2) | Fine | None contains a brand. |
| Section 5 "Platforms" and "Freelancer marketplaces" negatives (wix, wordpress, power bi, tableau, upwork, fiverr, toptal, etc.) | Fine | Negatives only, which `claims.md` allows. |

### 4. Destination
Policy: Destination requirements, https://support.google.com/adspolicy/answer/6368661 (fetched).

| URL | Outcome | Note |
|---|---|---|
| `https://www.skoxsoftware.com/web-apps` | Fine | Loads; H1 "Your next web app. Built at speed."; no login wall; every claim in the Web apps ad is on the page. |
| `https://www.skoxsoftware.com/dashboards` | Fine | Loads; H1 "Your next dashboard. Built at speed."; 14-day claim and its condition on the page. |
| `https://www.skoxsoftware.com/websites` | Fine | Loads; H1 "Your next website. Built at speed."; 7-day claim and its condition on the page. |
| `https://www.skoxsoftware.com/` (CTA sitelink) | Fine | Loads; "Get my price & timeline" and "free 30-minute scope call" on the page. |
| Display path domain vs final URL | Fine | All final URLs are on www.skoxsoftware.com; display paths are paths only. |
| Final URL suffix (utm_* with ValueTrack) | Fine | Same domain, no redirect. |
| Crawlability | Fine | Live robots.txt: `Allow: /`, `Disallow: /scope-received`. Uncommitted `app/robots.ts` adds `/concepts/`; neither touches an ad route. AdsBot ignores `*` rules anyway. |
| Mobile rendering | Not verified | WebFetch can't render a phone viewport. See "Inputs I could not check". |

### 7. Account prerequisites
Policy: Advertiser verification, https://support.google.com/adspolicy/answer/9703665 (fetched). All advertisers are being rolled into verification; Google notifies with a deadline, and unfinished verification can pause ads or suspend the account. Status update takes up to 5 business days.

| Item | Status |
|---|---|
| Google advertiser verification | UNKNOWN. Not in the campaign's section 2 checklist at all. |
| Business name / logo assets set on the account | UNKNOWN |

### 8. Landing page policy signals
| Item | Outcome | Note |
|---|---|---|
| `/privacy` linked in the footer of every route | Fine | Present on `/`, `/web-apps`, `/dashboards`, `/websites`. |
| `/privacy` discloses Google, Meta and LinkedIn advertising | Fine | Last updated 1 October 2026. Names Google Analytics 4, Google, Meta (Facebook and Instagram) and LinkedIn tags, and cookies. |
| Business contact info visible | Fine | founder@skoxsoftware.com on every route. No legal entity name or address on the site; not required by the Misrepresentation page for this kind of offer, but advertiser verification will ask for the legal name. See non-blocker 4. |

## Non-blockers

| # | Where | Problem | Suggestion |
|---|---|---|---|
| 1 | Account setup (section 7 A) | No ad text names the business, and the upload steps don't set a business name or logo asset. Editorial asks ads to identify the entity. | Add a step: Assets → Business name "SKOX" (C24 allows "Independent software studio" if a longer descriptor is ever needed). Logo from the existing SKOX mark. |
| 2 | Section 6 callouts | Four callouts duplicate headlines word for word. | Keep only callouts that add something the headlines don't: "Delivery date in writing", "Free scope call", "Reply in 1 business day", "Work with the founders", "Working review halfway" (C03, C04, C10, C06, C17). Dropping the four duplicates is optional. |
| 3 | 4.1 description 1 "...Built at speed." | Repeats pinned headline 1. | Drop the last sentence: "Customer portals, internal tools, accounts, payments and integrations." (C21). |
| 4 | Section 2 checklist | Advertiser verification is missing. A new account is likely to be asked, and a missed deadline pauses ads. | Add a row: "Google advertiser verification started/complete (Billing → Advertiser verification); legal name matches the payments profile." Mark UNKNOWN until Josh confirms. |
| 5 | Headlines "Between Expensive and Risky", "Keep the Plan Either Way" | Context-dependent fragments; could earn Low ratings. | No change now. If the asset report rates them Low after 2 weeks, swap for "Talk to the Builders" (C06) or "The Plan Is Yours Either Way" (C19, 28 chars). |

## Inputs I could not check

- Mobile rendering of the four destination URLs (WebFetch returns text only). Josh: open each on a phone before go-live.
- Google advertiser verification status: UNKNOWN.
- Business name / logo assets on the account: UNKNOWN.
- Whether AdsBot gets the same response as WebFetch (no bot-specific blocking was seen; not testable with these tools).
- Character counts were taken as written in the file; I didn't recount (no Bash). The claims and policy checks don't depend on them.

## Sources read

- `/Users/josh/SKOX/.claude/agents/policy-auditor.md`
- `/Users/josh/SKOX/docs/ads/campaigns/google-search-v1.md`
- `/Users/josh/SKOX/docs/ads/claims.md`
- `/Users/josh/SKOX/docs/ads/offer.md`
- `/Users/josh/SKOX/docs/ads/copy-rules.md`
- `/Users/josh/SKOX/docs/ads/README.md`
- `/Users/josh/SKOX/app/robots.ts`
- https://support.google.com/adspolicy/answer/6008942
- https://support.google.com/adspolicy/answer/6020955
- https://support.google.com/adspolicy/answer/6021546
- https://support.google.com/adspolicy/answer/6368661
- https://support.google.com/adspolicy/answer/6118
- https://support.google.com/adspolicy/answer/9703665
- https://www.skoxsoftware.com/
- https://www.skoxsoftware.com/web-apps
- https://www.skoxsoftware.com/dashboards
- https://www.skoxsoftware.com/websites
- https://www.skoxsoftware.com/privacy
- https://www.skoxsoftware.com/robots.txt
