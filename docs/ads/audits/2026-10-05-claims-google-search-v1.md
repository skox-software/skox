# Claims auditor — google-search-v1 — 2026-10-05

**Verdict:** PASS

Input: `docs/ads/campaigns/google-search-v1.md` (status in file: draft, not uploaded). Audited as a draft, so the unsigned `claims.md` sign-off is a non-blocker.

Every ad-facing line (3 RSAs × 15 headlines + 4 descriptions, 3 display paths, 4 sitelinks with descriptions, 9 callouts, 5 structured-snippet values) traces to an ALLOWED claim or a CONDITIONAL claim whose condition is met. No forbidden family appears in ad text. Platform names, "near me", "free", "cheap", "24/7" etc. appear only as negative keywords, which `claims.md` permits.

## Blockers

| # | Where (campaign line / file:line) | Problem | Rule or source | Fix |
|---|---|---|---|---|
| — | — | None | — | — |

## Non-blockers

| # | Where | Problem | Suggestion |
|---|---|---|---|
| 1 | `claims.md:9` | Sign-off line is blank (Reiss initials and date). | Must be signed before the campaign is marked ready to launch; becomes a blocker then. Already listed as checklist item 16 in the campaign. |
| 2 | Campaign line 387, callout "Working review halfway" [C17] | The exact wording is C15 (`landing.ts:172` "with a working review halfway"). C17 (`landing.ts:215`) means the same thing, so the line is fine; the ID is just not the closest match. | Cite as [C15, C17]. |
| 3 | Campaign line 201, dashboards H4 "Stop Rebuilding Reports" [C22] | Site says "stop rebuilding the same report" (`landing.ts:33`). Dropping "the same" is a slight broadening but not a stronger claim; meaning holds. The full wording is 31 characters, over the limit. | Acceptable as written. |
| 4 | Dashboards H5 / Websites H3 with H8–H9 and the callouts "Fixed price upfront", "Delivery date in writing" | Combined, "14-Day Focused Dashboard Build" + "Fixed Price, Agreed Upfront" + "A Delivery Date Before You Pay" could read as a guaranteed 14-day delivery. Checked: the condition sits in description 1, which is pinned to description position 1 in both day-promise ads, so the condition is served whenever a description is served. Every component is the site's own wording, and none adds "guaranteed". | No change. Keep the description-1 pin; if it is ever removed, C08/C09 become CONDITIONAL-BROKEN. |
| 5 | `claims.md:35` (C21 source `landing.ts:12–15`) | Includes list actually sits at `landing.ts:13–15`. Off by one, wording still matches; not stale. | Tidy at next `claims.md` edit. |

## Line table

Class key: ALLOWED, CONDITIONAL-MET (C-condition satisfied), and the blocker classes (none found). All `landing.ts` lines confirmed by reading the file today.

### 4.1 Web apps (final URL `/web-apps`)

| # | Line (verbatim) | Where | Class | Claim ID / rule | Evidence |
|---|---|---|---|---|---|
| W1 | Web Apps, Built at Speed | H1 (pinned 1) | ALLOWED | C01 | `landing.ts:20–21` "Your next web app." / "Built at speed." |
| W2 | Custom Web App Development | H2 | ALLOWED | C02 | `landing.ts:106` "Custom web apps…" |
| W3 | Portals & Internal Tools | H3 | ALLOWED | C21 | `landing.ts:13` "Customer portals & internal tools" |
| W4 | Between Expensive and Risky | H4 | ALLOWED | C16 | `landing.ts:143` |
| W5 | Fixed Price, Agreed Upfront | H5 | ALLOWED | C05 | `landing.ts:132` |
| W6 | A Delivery Date Before You Pay | H6 | ALLOWED | C03 | `landing.ts:154` |
| W7 | Date Set at Kickoff | H7 | ALLOWED | C18 | `landing.ts:192` |
| W8 | No Hourly Billing | H8 | CONDITIONAL-MET | C13 (fair restatement; no firm named) | `landing.ts:160–161` |
| W9 | You Own the Code | H9 | ALLOWED | C07 | `landing.ts:134` |
| W10 | Work With the Two Founders | H10 | CONDITIONAL-MET | C14 (no firm named); also C06 | `landing.ts:166`, `:220` |
| W11 | Direct Access to the Builders | H11 | ALLOWED | C06 | `landing.ts:133` |
| W12 | No Account Managers | H12 | CONDITIONAL-MET | C14 (fair restatement per `claims.md`) | `landing.ts:166–167` |
| W13 | Get My Price & Timeline | H13 | ALLOWED | C11 | `landing.ts:107`, `:284` |
| W14 | Free Scope Call, No Deposit | H14 | CONDITIONAL-MET | C04 ("no deposit" attached to the scope call) | `landing.ts:109` |
| W15 | Keep the Plan Either Way | H15 | ALLOWED | C19 | `landing.ts:209`, `:260` |
| W16 | Customer portals, internal tools, accounts, payments and integrations. Built at speed. | D1 | ALLOWED | C21, C01 | `landing.ts:13–14`, `:21` |
| W17 | A fixed price and a delivery date agreed in writing, before you pay anything. | D2 | ALLOWED | C03 | `landing.ts:154`, `:191` |
| W18 | Work directly with the two founders building it. No account managers. You own the code. | D3 | CONDITIONAL-MET | C06, C14, C07 | `landing.ts:23` "Work directly with the builders", `:166`, `:134` |
| W19 | Free 30-minute scope call, no deposit, no obligation. The plan is yours either way. | D4 | CONDITIONAL-MET | C04, C19 | `landing.ts:109`, `:260` |
| W20 | web-apps / fixed-price | Display path | ALLOWED | C05 | `landing.ts:132` |

### 4.2 Dashboards (final URL `/dashboards`)

| # | Line (verbatim) | Where | Class | Claim ID / rule | Evidence |
|---|---|---|---|---|---|
| D1 | Dashboards, Built at Speed | H1 (pinned 1) | ALLOWED | C01 | `landing.ts:42–43` |
| D2 | Custom Dashboard Development | H2 | ALLOWED | C02 | `landing.ts:106` |
| D3 | Your Business in One View | H3 | ALLOWED | C22 | `landing.ts:45` "one clear view of your business" |
| D4 | Stop Rebuilding Reports | H4 | ALLOWED | C22 | `landing.ts:33` (see non-blocker 3) |
| D5 | 14-Day Focused Dashboard Build | H5 | CONDITIONAL-MET | C08: dashboards ad, lands on `/dashboards`, "focused" kept, condition in pinned D-desc 1, no "two weeks" | `landing.ts:39–40` |
| D6 | Location & Team Performance | H6 | ALLOWED | C21 | `landing.ts:36` |
| D7 | Data From Your Existing Tools | H7 | ALLOWED | C21 | `landing.ts:35` |
| D8 | Fixed Price, Agreed Upfront | H8 | ALLOWED | C05 | `landing.ts:132` |
| D9 | A Delivery Date Before You Pay | H9 | ALLOWED | C03 | `landing.ts:154` |
| D10 | You Own the Code | H10 | ALLOWED | C07 | `landing.ts:134` |
| D11 | Work With the Two Founders | H11 | CONDITIONAL-MET | C14 / C06 | `landing.ts:166`, `:220` |
| D12 | No Account Managers | H12 | CONDITIONAL-MET | C14 | `landing.ts:166–167` |
| D13 | Get My Price & Timeline | H13 | ALLOWED | C11 | `landing.ts:107` |
| D14 | Free Scope Call, No Deposit | H14 | CONDITIONAL-MET | C04 | `landing.ts:109` |
| D15 | Keep the Plan Either Way | H15 | ALLOWED | C19 | `landing.ts:209`, `:260` |
| D16 | 14-day focused dashboard build. Timing depends on agreed data sources and access. | Desc 1 (pinned 1) | CONDITIONAL-MET | C08 with its condition, verbatim | `landing.ts:39–40` |
| D17 | One clear view of your business, with connected data from your existing tools. | Desc 2 | ALLOWED | C22, C21 | `landing.ts:45`, `:35` |
| D18 | A fixed price and a delivery date agreed in writing before you pay. You own the code. | Desc 3 | ALLOWED | C03, C07 | `landing.ts:154`, `:191`, `:134` |
| D19 | Free 30-minute scope call, no deposit, no obligation. Work with the two founders. | Desc 4 | CONDITIONAL-MET | C04, C14 | `landing.ts:109`, `:166` |
| D20 | dashboards / fixed-price | Display path | ALLOWED | C05 | `landing.ts:132` |

### 4.3 Websites (final URL `/websites`)

| # | Line (verbatim) | Where | Class | Claim ID / rule | Evidence |
|---|---|---|---|---|---|
| S1 | Websites, Built at Speed | H1 (pinned 1) | ALLOWED | C01 | `landing.ts:64–65` |
| S2 | Custom Website Design | H2 | ALLOWED | C21 (also C02) | `landing.ts:55`, `:57` |
| S3 | 7-Day Focused Site Build | H3 | CONDITIONAL-MET | C09: websites ad, lands on `/websites`, "focused" kept, condition in pinned desc 1, no "one week" | `landing.ts:61–62` |
| S4 | Built for Mobile | H4 | ALLOWED | C21 | `landing.ts:57` |
| S5 | Lead Capture & Booking | H5 | ALLOWED | C21 | `landing.ts:58` |
| S6 | Between Expensive and Risky | H6 | ALLOWED | C16 | `landing.ts:143` |
| S7 | Fixed Price, Agreed Upfront | H7 | ALLOWED | C05 | `landing.ts:132` |
| S8 | A Delivery Date Before You Pay | H8 | ALLOWED | C03 | `landing.ts:154` |
| S9 | No Hourly Billing | H9 | CONDITIONAL-MET | C13 | `landing.ts:160–161` |
| S10 | You Own the Code | H10 | ALLOWED | C07 | `landing.ts:134` |
| S11 | Work With the Two Founders | H11 | CONDITIONAL-MET | C14 / C06 | `landing.ts:166`, `:220` |
| S12 | Direct Access to the Builders | H12 | ALLOWED | C06 | `landing.ts:133` |
| S13 | Get My Price & Timeline | H13 | ALLOWED | C11 | `landing.ts:107` |
| S14 | Free Scope Call, No Deposit | H14 | CONDITIONAL-MET | C04 | `landing.ts:109` |
| S15 | Keep the Plan Either Way | H15 | ALLOWED | C19 | `landing.ts:209`, `:260` |
| S16 | 7-day focused site build. Scope, content and access agreed before kickoff. | Desc 1 (pinned 1) | CONDITIONAL-MET | C09 with its condition, verbatim | `landing.ts:61–62` |
| S17 | Custom design built for mobile, with lead capture and booking integrations. | Desc 2 | ALLOWED | C21 | `landing.ts:57–58` |
| S18 | A fixed price and a delivery date agreed in writing before you pay. You own the code. | Desc 3 | ALLOWED | C03, C07 | `landing.ts:154`, `:191`, `:134` |
| S19 | Free 30-minute scope call, no deposit, no obligation. Work with the two founders. | Desc 4 | CONDITIONAL-MET | C04, C14 | `landing.ts:109`, `:166` |
| S20 | websites / fixed-price | Display path | ALLOWED | C05 | `landing.ts:132` |

### 6. Assets (campaign level)

| # | Line (verbatim) | Where | Class | Claim ID / rule | Evidence |
|---|---|---|---|---|---|
| A1 | Custom Web Apps | Sitelink text | ALLOWED | C02 | `landing.ts:106` |
| A2 | Customer portals & internal tools | Sitelink desc | ALLOWED | C21 | `landing.ts:13` |
| A3 | Accounts, payments & integrations | Sitelink desc | ALLOWED | C21 | `landing.ts:14` |
| A4 | Custom Dashboards | Sitelink text | ALLOWED | C02 | `landing.ts:106` |
| A5 | One clear view of your business | Sitelink desc | ALLOWED | C22 | `landing.ts:45` |
| A6 | Data from your existing tools | Sitelink desc | ALLOWED | C21 | `landing.ts:35` |
| A7 | Custom Websites | Sitelink text | ALLOWED | C02 | `landing.ts:106` |
| A8 | Custom design, built for mobile | Sitelink desc | ALLOWED | C21 | `landing.ts:57` |
| A9 | Lead capture & booking integrations | Sitelink desc | ALLOWED | C21 | `landing.ts:58` |
| A10 | Get My Price & Timeline | Sitelink text | ALLOWED | C11 | `landing.ts:107` |
| A11 | Free 30-minute scope call | Sitelink desc | ALLOWED | C04 (no "no deposit", so condition not engaged); also C20 | `landing.ts:109`, `:203` |
| A12 | Reply within one business day | Sitelink desc | ALLOWED | C10 | `landing.ts:256`, `:281` |
| A13 | Fixed price upfront | Callout | ALLOWED | C05 | `landing.ts:132` |
| A14 | Delivery date in writing | Callout | ALLOWED | C03 | `landing.ts:154` |
| A15 | You own the code | Callout | ALLOWED | C07 | `landing.ts:134` |
| A16 | No account managers | Callout | CONDITIONAL-MET | C14 | `landing.ts:166–167` |
| A17 | No hourly billing | Callout | CONDITIONAL-MET | C13 | `landing.ts:160–161` |
| A18 | Free scope call | Callout | ALLOWED | C04 (no "no deposit") | `landing.ts:109` |
| A19 | Reply in 1 business day | Callout | ALLOWED | C10 | `landing.ts:256` |
| A20 | Work with the founders | Callout | ALLOWED | C06 | `landing.ts:220` |
| A21 | Working review halfway | Callout | CONDITIONAL-MET | C15 (author cited C17; see non-blocker 2) | `landing.ts:172`, `:215` |
| A22 | Services (header) | Snippet | ALLOWED | Google header, not a claim | — |
| A23 | Custom web apps | Snippet value | ALLOWED | C02 | `landing.ts:106` |
| A24 | Customer portals | Snippet value | ALLOWED | C21 | `landing.ts:13` |
| A25 | Internal tools | Snippet value | ALLOWED | C21 | `landing.ts:13` |
| A26 | Custom dashboards | Snippet value | ALLOWED | C02 | `landing.ts:106` |
| A27 | Custom websites | Snippet value | ALLOWED | C02 | `landing.ts:106` |

No sitelink, callout or snippet carries a day promise, so C08/C09 cannot leak into another route's ads via cross-campaign assets.

## Whole-ad checks

- **Day promises:** C08 and C09 appear only in their own route's ad, each with "focused" kept and the condition in a description pinned to position 1. No "two weeks", "one week", "business days" or "Live in". No "Needs Reiss" line is used.
- **C04:** "No deposit" appears only inside "Free Scope Call, No Deposit" and "Free 30-minute scope call, no deposit, no obligation". Never alone.
- **Comparison rows (C12–C15):** used only as SKOX-side restatements; no firm, platform or price number named in copy.
- **Forbidden families:** none in ad text. "fixed-price" in display paths is C05, not a price figure. Platform names, "near me", "free"/"cheap"/"affordable", "24/7", "staff augmentation", "mobile app" appear only in negative keyword lists, which is the permitted use.
- **Landing pages:** `/web-apps`, `/dashboards`, `/websites` exist (`app/[service]/page.tsx` generates them from `builds`), and `components/LandingPage.tsx` renders the trust strip, compare table, build cards with timing notes (`components/BuildSection.tsx:87–90`), build assurance, process, FAQ and form on every route, so each claimed line is visible on the page the ad lands on.
- **`claims.md` freshness:** every cited `landing.ts` line was checked against the current file; all still say what `claims.md` says (minor C21 offset noted). Not stale.

## Inputs I could not check

- Whether Google always serves at least one description for an RSA (which the description-1 pin relies on to keep the C08/C09 condition visible). That's a Google serving question; no web access here. Hand to `policy-auditor`.
- Character counts were not re-verified; that's `copy-rules.md` territory, not claims.

## Sources read

- `.claude/agents/claims-auditor.md`
- `docs/ads/campaigns/google-search-v1.md`
- `docs/ads/claims.md`
- `docs/ads/README.md`
- `content/landing.ts`
- `app/[service]/page.tsx`
- `components/LandingPage.tsx`
- `components/BuildSection.tsx`
- `components/CompareSection.tsx`
