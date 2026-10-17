# Policy audit — google-search-v2 — 2026-10-06

**Verdict:** PASS WITH FIXES

No line in the ad text, keywords, display paths or sitelinks is likely to be disapproved. Every final URL loads. The blockers below are launch gates (account prerequisites and one unsigned sign-off) and import-file checks to do before upload. They are not copy rewrites.

Scope: Google Search only. Meta checks (personal attributes, before/after imagery, domain verification) are out of scope for this file and were not run.

Inputs read: `docs/ads/campaigns/google-search-v2.md`, `google-search-v2-editor/{README.md,campaigns.csv,keywords.csv,ads.csv,check_lengths.py}`, `docs/ads/claims.md`, `offer.md`, `copy-rules.md`, `content/trades.ts` (grep only).

## Blockers

| # | Where | Problem | Rule or source | Fix |
|---|---|---|---|---|
| B1 | Campaign file section 2, items 21 and 22 | Google advertiser verification and the business name/logo at account level are UNKNOWN. A new account can have ads restricted until verification completes (up to 5 business days). The campaign file doesn't say Josh confirmed either. | Advertiser verification, https://support.google.com/adspolicy/answer/9703665 (fetched 2026-10-06) | Josh starts verification before enabling. The legal name must match the payments profile. Don't enable until it shows complete. |
| B2 | `claims.md` line 9 (sign-off blank) and the "Needs Reiss" trade-page wording line | The T01–T03 copy in all 8 trade ads depends on wording that isn't signed. Policy-wise the lines are fine. Under `claims.md` rules they aren't approved until signed. | `claims.md` sign-off rule; campaign file section 2 item 17 | Reiss initials and dates the sign-off line and the trade-page wording. |
| B3 | `google-search-v2-editor/keywords.csv`, `Criterion Type` column (values `Negative Broad`, `Campaign Negative Broad`, `Campaign Negative Phrase`) | Not confirmed against Google's help. The page I fetched lists only "Negative" and "Campaign negative" as negative values. If Editor doesn't accept the combined values, 120 ad-group negatives and 164 campaign negatives import as the wrong type or fail. That would leave the trade groups with no cross-trade protection. | https://support.google.com/google-ads/editor/answer/57747 | Import `keywords.csv` and read Editor's preview and the "Review imported changes" list before keeping anything. Check the Negative keywords tab shows 120 ad-group rows and 82 per campaign, with the right match types. If the values aren't accepted, use `Negative` and `Campaign negative` plus the match-type column Editor offers. |

## Check 4: CSV columns against Editor's current import format

Fetched https://support.google.com/google-ads/editor/answer/57747 (twice), https://support.google.com/google-ads/editor/answer/56368 and https://support.google.com/google-ads/editor/answer/30564 on 2026-10-06. The fetch tool summarises pages, so "not seen" means the summary didn't show it. It doesn't prove the page lacks it. Nothing was run in Editor itself.

Editor lets you re-map any header in a drop-down at import (answer 30564), so an unrecognised header costs a manual mapping step and doesn't fail the import. Order of import (campaigns, keywords, ads) is correct.

| Column (file) | Result |
|---|---|
| `Campaign`, `Ad Group`, `Campaign Status`, `Ad Group Status`, `Networks`, `Budget`, `Max CPC`, `Keyword`, `Criterion Type`, `Location`, `Location ID`, `Language`, `Bid Strategy Type`, `Final URL`, `Path 1`, `Path 2`, `Headline 1`–`Headline 15` | **Recognised.** Seen on the help page. (`Campaign Type` is also listed as "Campaign type".) |
| `Final URL suffix` (campaigns.csv) | **Recognised.** It is on the help page. The README says it isn't, which is wrong, and the README's "not sure" row can be dropped. |
| `Description 1`–`Description 4` (ads.csv) | **Not confirmed.** The page showed "Description line 1" and "Description line 2", the older expanded-text-ad names. RSA descriptions should map, but I couldn't see them. Check the mapping screen. |
| `Headline 1 position`, `Description 1 position` (ads.csv) | **Not confirmed.** The page says pin positions are supported but the summary didn't show the exact header. The pin matters: it keeps the 14-day line (C08) with its condition. After import, open the two `/dashboards` ads and check description 1 shows the pin icon. |
| `Ad type`, `Status` (ads.csv) | **Not seen on the page.** Likely fine (standard Editor export headers). Confirm `Ad type` maps and the ad imports as a responsive search ad. |
| `Budget type` (campaigns.csv) | **Not on the page** (matches the README). Safe to leave unmapped, since daily is the default. |
| `Maximum CPC bid limit` (campaigns.csv) | **Not on the page.** The page lists only `Max CPC`. Likely unrecognised: don't map it, and set the $8.00 limit in the web UI (README and campaign file step 11 already say so). Until then Trades has no bid cap, so keep it Paused. |
| `Criterion Type` values `Negative Broad`, `Campaign Negative Broad`, `Campaign Negative Phrase` | **Not confirmed**, see B3. `Phrase` and `Exact` for positives are the normal values. |
| `Bid Strategy Type` values `Maximize clicks`, `Manual CPC` | Column recognised. The values aren't listed on the page. Check both campaigns in the tree after import. |
| `Language` = `en` | Column recognised ("Language", language codes). Value is the standard code. Check it shows English after import. |

Other file checks (done by regex on the file, not by running `check_lengths.py`, since no shell was available):
- All 13 rows in `ads.csv` have headlines 30 characters or fewer, descriptions 90 or fewer and paths 15 or fewer, with headline 1 pinned to 1. This agrees with the campaign file.
- Row counts agree with the campaign file: 66 + 28 positive keywords, 120 ad-group negatives, 82 per campaign (68 broad and 14 phrase).
- No ad-group negative blocks that group's own keywords, and no campaign negative blocks any positive keyword.
- Every field contains an en dash in the campaign names, so the file must be UTF-8. If Editor shows `Search â€“ Trades`, use Import → Paste text, as the README says. Names must match exactly across all three files.

## Check 3: trademarks and brand names

| Where | Finding | Outcome |
|---|---|---|
| Positive keywords (94 rows in `keywords.csv`, rows 2–95) | **No software or platform brand names.** Terms are trade words plus generic software words ("field service", "dashboard", "dispatch", "quote"). | Fine |
| Ad text, display paths, sitelinks, callouts, snippet | No third-party brand anywhere. | Fine |
| Negative keywords | Wordpress, wix, squarespace, shopify, salesforce, sap, oracle, servicetitan, "service titan", jobber, housecallpro, "housecall pro", "power bi", powerbi, tableau, looker, upwork, fiverr. These are brands used as negatives only, which is the allowed use. | Fine |

Policy: https://support.google.com/adspolicy/answer/6118 (fetched). Google doesn't restrict trademarks as keywords. It restricts them in ad text where a competitor uses them or the use is misleading. SKOX's rule against brand keywords is a relevance choice. It isn't something Google enforces.

## Check 1: misrepresentation and unreliable claims

Policy: https://support.google.com/adspolicy/answer/6020955 (fetched).

| Line | Finding | Outcome | Compliant alternative |
|---|---|---|---|
| "Free Scope Call, No Deposit" (all ads), D4 "Free 30-minute scope call, no deposit, no obligation." | C04 wording, scoped to the call. Garage-door and roofing pages mention a customer deposit inside the demo, but no ad line mentions a deposit apart from the call. | Fine | none needed |
| "14-Day Focused Dashboard Build" (Multi-location H4, Services Dashboards H3) with D1 pinned "14-day focused dashboard build. Timing depends on agreed data sources and access." | C08 with its condition pinned. `/dashboards` states "A focused dashboard build takes 14 days. The clock starts once the agreed data sources and account access are ready at kickoff." | Fine | none needed |
| "A Delivery Date Before You Pay", "Fixed Price, Agreed Upfront", "You Own the Code", "Keep the Plan Either Way" | C03, C05, C07, C19. No guarantee wording. | Fine | none needed |
| Pinned H1 "Plumbing Dispatch Software", "Roofing Quote Software", "Roofing Estimate Software", "Garage Door Quote Software", "Truck Stock Software", "Truck Stock for Electricians" | These read like a ready-made product. The pages say "custom" and "what we'd build", and descriptions say "We build the quote builder" or "We build the truck stock tracker". Low risk of a destination-mismatch or "offering unavailable services" flag. Plumbing D1 and Garage D1 ("Drag a job onto a tech and the day re-plans", "The customer gets a text, picks an option and signs") are written like a live product. | Fine, with a non-blocker (N1) | N1: if a limited status appears, use C02 wording: "Custom Plumbing Dispatch Board" (29), "Custom Roofing Quote Builder" (28). The `claims.md` T01 line allows the trade keyword only, so Reiss should agree first. |
| Pool D2 "Routes drift and drive time eats the margin." | Supported by `content/trades.ts` line 112 ("so routes drift and drive time eats the margin"). The rendered pool page's pain titles (checked in the fetch) are "Recurring revenue hides the leaks", "Every route is a guess" and "Lead sources blur together". Fine for ad policy. | Fine | none needed |
| HVAC H6 "Overtime Shows Up Weeks Late" | Supported by `trades.ts` line 84. Describes a problem. It isn't an outcome promise. | Fine | none needed |
| Garage H4 "Pick, Sign and Book by Text" | The page example offers "choose a time", so "Book" is supported. The page also says "pays a deposit", which the headline omits. Omission isn't misleading here, since the ad doesn't promise no deposit for builds. | Fine | none needed |
| Business identification | Site shows `founder@skoxsoftware.com` only. No phone or postal address. | Fine for ad policy; see B1 | If verification asks for an address, add it to the site. |

No guarantees, "risk-free", superlatives, prices, locations, AI-as-method or testimonials appear. Grep checks agree with the `claims.md` forbidden list.

## Check 2: editorial

Policy: https://support.google.com/adspolicy/answer/6021546 (fetched). The page says nothing specific about exclamation marks, ampersands or apostrophes, so those fall under general "intended use" rules.

| Check | Finding | Outcome |
|---|---|---|
| ALL CAPS | "HVAC" (acronym) and "PDF" (Garage D2) only. | Fine |
| Exclamation marks, emoji, repeated punctuation | None. | Fine |
| "&" in "Get My Price & Timeline", "Location & Team Performance", "Payments & Integrations", "Portals & Internal Tools" | Used as normal punctuation, and matches the site's own wording. | Fine |
| Apostrophes ("Owner's Profit Dashboard", "Every Van's Parts Against Par") | Normal use. | Fine |
| Phone numbers, "click here" | None. | Fine |
| Repetition | Headlines 7–15 are identical across all 8 trade ads and D3/D4 are identical across 11 ads. That's legitimate per ad. Within a single ad, "Free Scope Call, No Deposit" (H15) overlaps with D4, and "Work With the Two Founders" (H12) overlaps with D4. | Fine. The policy bars "gimmicky or unnecessary repetition", but this is a normal RSA pattern. It may lower ad strength. |
| Unclear or generic text | "Monday Starts in Five Logins" and "Every Route Is a Guess" are oblique but understandable. | Fine |

## Check 4 (continued): destinations

Policy: https://support.google.com/adspolicy/answer/6368661 (fetched). All URLs fetched 2026-10-06. Every one returned a full page with no login wall. A "Client login" link in the nav isn't a gate.

| URL | Loads | Matches the ad's promise |
|---|---|---|
| https://www.skoxsoftware.com/for/hvac | Yes | Yes. H1 "HVAC business dashboards"; working example; pains and builds match; 14-day mention in FAQ (not used in the ad, as planned). |
| https://www.skoxsoftware.com/for/pool-service | Yes | Yes. Revenue/bookings, service-area map, lead sources. |
| https://www.skoxsoftware.com/for/pest-control | Yes | Yes. Profit view, cost per booked job by channel. |
| https://www.skoxsoftware.com/for/landscaping | Yes | Yes. Fleet dashboards, service log, fuel view. Example labelled "Concept · sample data". |
| https://www.skoxsoftware.com/for/roofing | Yes | Yes. Quote builder, good/better/best, approval link. |
| https://www.skoxsoftware.com/for/plumbing | Yes | Yes. Dispatch board example. |
| https://www.skoxsoftware.com/for/garage-doors | Yes | Yes. Approval portal and live quote feed. |
| https://www.skoxsoftware.com/for/electrical | Yes | Yes. Truck stock example. |
| https://www.skoxsoftware.com/dashboards | Yes | Yes. 14 days and its condition; three-location example; scorecard only in the footer (matches the campaign file's note). |
| https://www.skoxsoftware.com/internal-tools | Yes | Yes |
| https://www.skoxsoftware.com/customer-portals | Yes | Yes |
| https://www.skoxsoftware.com/web-apps | Yes | Yes |
| Sitelinks: `/examples`, `/scorecard`, `/dashboard-examples`, `/internal-tool-examples`, `/#process` | Yes, all five | Yes. Examples pages say "The companies and numbers are invented". `/#process` resolves to "03 / How we move fast" with the plan-in-writing and halfway-review steps. |

Display URL domain: all display paths sit under `skoxsoftware.com`, which is the final URL domain. No mismatch.

Crawlability: https://www.skoxsoftware.com/robots.txt disallows only `/scope-received` and `/concepts/`. None of the ad destinations are blocked.

Not verified: mobile rendering on a real phone (the fetch tool can't render pages), and page speed. Campaign file item 23 covers this and stays open. The final URL suffix with `{keyword}` isn't a policy issue, but check it doesn't appear in the display URL.

## Check 7: account prerequisites

| Item | Status |
|---|---|
| Google advertiser verification | UNKNOWN (B1) |
| Business name "SKOX" and logo approved | UNKNOWN |
| Auto-apply recommendations off, auto-tagging on, AI Max off, automatically created assets off | UNKNOWN. These are settings Josh clicks (campaign file section 7). |
| Conversion tracking live | UNKNOWN, for the tracking auditor |
| Meta domain verification / Business Manager | Out of scope, Google Search only |

## Check 8: landing page policy signals

- https://www.skoxsoftware.com/privacy loads. It says "We advertise on Meta (Facebook and Instagram), Google and LinkedIn, and use their tags on this site." Disclosure of ad-platform cookies and hashed emails is present.
- Contact email visible (`founder@skoxsoftware.com`). No phone or postal address. Not a Google Search policy failure.

## Non-blockers

| # | Where | Problem | Suggestion |
|---|---|---|---|
| N1 | Pinned product-style H1s (see check 1) | Reads like a ready-made product | Optional "Custom" wording once Reiss agrees |
| N2 | `README.md` "Columns I'm not sure of" | Says `Final URL suffix` isn't on the help page. It is. | Update the README. |
| N3 | Negative `example` and `examples` (both campaigns) | Could block buyers searching "hvac dashboard example". The campaign file already flags this. | Check the Day 3 search terms report. |
| N4 | Sitelink `/#process` | Fragment URLs can be treated as the homepage. The file has a fallback to `/`. | Keep the fallback ready. |
| N5 | Structured snippet header "Service catalog" | Not verified against Google's current header list (no fetch run) | Check the header in the UI. |
| N6 | `check_lengths.py` | Not run (no shell here). My regex check of `ads.csv` passed for all 13 ads, but it doesn't check duplicates. | Run it once before import. |

## Inputs I could not check

- Whether Editor accepts every CSV header and value (needs Editor itself).
- Mobile rendering of the 12 final URLs.
- Whether Josh has confirmed any account prerequisite.
- Current Google header list for structured snippets.

## Sources read

- Files: `/Users/josh/SKOX/docs/ads/campaigns/google-search-v2.md`, `/Users/josh/SKOX/docs/ads/campaigns/google-search-v2-editor/{README.md,campaigns.csv,keywords.csv,ads.csv,check_lengths.py}`, `/Users/josh/SKOX/docs/ads/{claims.md,offer.md,copy-rules.md,README.md}`, `/Users/josh/SKOX/content/trades.ts` (grep)
- Policy URLs fetched 2026-10-06: https://support.google.com/adspolicy/answer/6008942, /6020955, /6021546, /6368661, /6118, /9703665
- Editor URLs fetched 2026-10-06: https://support.google.com/google-ads/editor/answer/57747, /56368, /30564
- Site URLs fetched 2026-10-06: the 12 final URLs, `/examples`, `/scorecard`, `/dashboard-examples`, `/internal-tool-examples`, `/#process`, `/privacy`, `/robots.txt`
- Not fetched: Meta policy pages (out of scope)
