# Claims auditor — meta-retargeting-v1 — 2026-10-05

**Verdict:** FAIL for v1 as written, because Ad A (video-20s) has 14 blockers. **Ads B (`fixed-terms`) and C (`compare-table`) PASS on their own, with zero blockers.** v1 can launch with B and C only, as far as claims go. The conditions for that are under "Launching with B and C only" below.

Inputs: `docs/ads/campaigns/meta-retargeting-v1.md`, `docs/ads/creative/meta-retargeting-v1-video-20s.md`, `docs/ads/creative/meta-retargeting-v1-fixed-terms.md`, `docs/ads/creative/meta-retargeting-v1-compare-table.md`. Status: draft (nothing live, not yet through `/ads-prelaunch`), so the unsigned `claims.md` is a non-blocker.

## Summary by ad

| Ad | Lines checked | Blockers | Verdict |
|---|---|---|---|
| A · video-20s (primary texts, headlines, description, CTA) | 15 | 0 | Text is clean |
| A · video-20s (on-screen lines) | 33 | 14 | **FAIL. Author's BLOCKED status confirmed.** |
| B · fixed-terms (text + on-image) | 22 | 0 | **PASS** |
| C · compare-table (text + on-image) | 35 | 0 | **PASS** |

**On the video's BLOCKED status:** confirmed, and it's slightly worse than the creative file says. The author counts 8 NOT IN CLAIMS lines; there are **9** ("Anything with an API" is listed in the table but left out of the total). The author also treats the missing C08/C09 condition as something the ad's description can carry. It can't: in Stories and Reels, Meta doesn't reliably show the description, and the 9:16 cut puts the "FOCUSED" qualifier under the Reels UI. So "BUILT IN DAYS." → "14 DAYS. A live dashboard." → "07 DAYS. A new website." reads as an unconditional day promise (a forbidden family) on its own. That's a blocker.

## Blockers (all in Ad A, on screen)

| # | Where | Problem | Rule or source | Fix |
|---|---|---|---|---|
| 1 | Video 15.75–16.17s, "No lock-in." (`ad.html:618`) | NEEDS REISS. No site line says it. | `claims.md:47` | Reiss signs it, or cut it (recut spec step 1) |
| 2 | Video 0.00–0.94s, "THEY QUOTED YOU" / "QUARTERS?" (`ad.html:150–154`) | NEEDS REISS | `claims.md:49` | Reiss signs, or cut |
| 3 | Video 0.94–1.88s, "BUILT IN DAYS." (`ad.html:184–185`) | NEEDS REISS | `claims.md:48` | Reiss signs, or cut |
| 4 | Video 16.41–16.75s, "TWO FOUNDERS · NOBODY IN BETWEEN" (`ad.html:643`) | NEEDS REISS | `claims.md:50` | Reiss signs, or use "WORK WITH THE FOUNDERS" (C06) |
| 5 | Video 0.12–0.94s, "A DISCOVERY PHASE. A RANGE. AN HOURLY RATE." (`ad.html:162`) | UNSOURCED. Only "hourly" has a source (C13). | — | "OFTEN BILLED BY THE HOUR." (C13), or drop it |
| 6 | Video 1.88–2.81s, "A live dashboard." | UNSOURCED. Next to "14 DAYS" it reads as a promise. | — | "Focused dashboard build." (C08) |
| 7 | Video 2.81–3.75s, "A new website." | UNSOURCED | — | "Focused site build." (C09) |
| 8 | Video 5.39–7.27s, "One dashboard. Every location." (`ad.html:286`) | UNSOURCED | nearest C21 | "Location & team performance views" (C21) |
| 9 | Video 6.56–7.50s, "LIVE." stamp (`ad.html:302`) | UNSOURCED. It implies a delivered, running system on SAMPLE data. | — | Drop it, or use "SAMPLE" |
| 10 | Video 7.97–8.20s, "MVPs." (`ad.html:418`) | UNSOURCED | nearest `landing.ts:15` | Drop it; "First versions." only if Reiss signs it |
| 11 | Video 8.75–9.38s, "Whatever's next." (`ad.html:421`) | UNSOURCED | nearest C01 | "Your next big thing." (C01) |
| 12 | Video 9.38–11.25s, "Every system in." / "One number out." (`ad.html:551–552`) | UNSOURCED | nearest C21, C22 | "Connected data from your existing tools" / "One clear view of your business" |
| 13 | Video 9.38–11.25s, chip "Anything with an API" (`ad.html:495`) | UNSOURCED. It suggests SKOX can connect anything. | nearest C21, C23 | "Your other tools" |
| 14 | Video 0.94–3.75s, "BUILT IN DAYS." + "14 DAYS" + "07 DAYS" | CONDITIONAL-BROKEN (C08, C09). No condition on screen. In 9:16 "14-DAY FOCUSED DASHBOARD BUILD" sits at y≈1380, under the Reels UI. The ad description doesn't render reliably in Stories/Reels. Read together, it's an unconditional day promise. | `claims.md:22–23`, `:71` | Recut spec step 3 (on-screen "Data and access agreed first" / "Content and access agreed first") plus step 9 (9:16 text inside y 269–1248) |

## Non-blockers

| # | Where | Problem | Suggestion |
|---|---|---|---|
| N1 | `claims.md:9` | Not signed by Reiss. This is a non-blocker for a draft. **`claims.md` itself says "Reiss initials here before the first upload"**, and campaign row P7 is still NOT SIGNED. | Get it signed before Josh uploads B and C. |
| N2 | Campaign C-1, C-2, C-3 | The primary text shortens the site label "Freelancer or DIY" to "Freelancer" and lower-cases cells ("months", "unpredictable"). It stays generic and isn't stronger, so C12–C14 conditions are met. | Fine as is. The on-image table must stay word for word (the brief already says so). |
| N3 | Campaign B-3, line 2: "A 30-minute conversation with a founder gets you a written scope, fixed price and delivery date." | Joins two `formBenefits` lines (`landing.ts:258–259`) with "gets you". On the site the written plan is step 02, after the call (`:208–209`). It's a fair compression, but it could be read as getting the scope during the call. | Optional: "A 30-minute conversation with a founder, then a written scope, fixed price and delivery date." |
| N4 | Campaign B-3 claim IDs "C20, C03" | The second half is `landing.ts:259`, which has no claim ID of its own. C03 is the nearest, so the ID is acceptable. | Consider adding `:259` to C03's sources in `claims.md` (Josh/Reiss edit, not mine). |
| N5 | Campaign Ad B line 170: image text tagged "(C03)" | "Fixed price." is C05 as well. The fixed-terms brief tags it correctly (C03, C05). | Cosmetic. |
| N6 | Ad B on-image "Fixed date." | This is the strongest-sounding word in B. It's sourced: `landing.ts:23` "a fixed scope, price and delivery date", plus C18 `:192`. It's no stronger than the site. When it rotates with B-1, the 14/7-day timings carry their condition in the same sentence, so "fixed date" doesn't fuse with a day count. | Keep timing off the image, as the brief requires. |
| N7 | CTA "Get quote" (all ads) | Meta preset label. It maps to C11 by meaning ("Get my price & timeline"; FAQ `landing.ts:300` uses "quote"). | Fine. |
| N8 | Video creative file totals line | It says "8 lines NOT IN CLAIMS". The table has 9. | Correct the count in the next revision. |
| N9 | Video `ad.html:627` | The strike-through runs on **all three** lines in that scene, not only "No lock-in." Crossing out "No account managers." can read as the opposite claim. | A style issue for the recut (the author already noted it). |

## Launching with B and C only

As far as claims go, yes. Ads B and C have no NEEDS REISS, UNSOURCED, FORBIDDEN or CONDITIONAL-BROKEN line, and nothing in either ad depends on the video. The conditions:
1. The PNGs are built **exactly** from the briefs, and each finished asset gets a fresh look at its pixels. I audited briefs, not images (P8 is NOT MADE).
2. Advantage+ creative enhancements are all off (campaign §3, U4.6). Otherwise Meta can add text nobody has checked.
3. `claims.md` is signed before upload (N1, P7). This isn't a blocker for this draft audit, but `claims.md:9` makes it a gate for the upload itself.
4. Skip Ad A (U6), as the campaign already says.

## Line table

### Ad A — video-20s (campaign text)

| # | Line (verbatim) | Where | Class | Claim ID / rule | Evidence |
|---|---|---|---|---|---|
| A1 | A 14-day focused dashboard build. | A-1 primary | CONDITIONAL-MET | C08 | `landing.ts:39`; condition in A1-3, lands on `/` |
| A2 | A 7-day focused site build. | A-1 primary | CONDITIONAL-MET | C09 | `landing.ts:61` |
| A3 | Both once scope, content, data and access are agreed. | A-1 primary | ALLOWED | C08/C09 condition | `landing.ts:40`, `:62`, FAQ `:296` |
| A4 | Free 30-minute scope call. No deposit. No obligation. | A-1, A-2 primary | CONDITIONAL-MET | C04 | `landing.ts:109` verbatim |
| A5 | A fixed price and a delivery date, agreed in writing before you pay. | A-2 primary | ALLOWED | C03 | `landing.ts:106`, `:154`, `:191` |
| A6 | The date is set at kickoff, not re-estimated later. | A-2 primary | ALLOWED | C18 | `landing.ts:192` |
| A7 | Talk to the builders. Work with the founders. | A-3 primary | ALLOWED | C06 | `landing.ts:220` |
| A8 | No account managers. No hourly billing. | A-3 primary | CONDITIONAL-MET | C14, C13 restatements | `claims.md:27–28` |
| A9 | You own the code and the accounts from day one. | A-3 primary | ALLOWED | C07 | `landing.ts:193` |
| A10 | 14-day focused dashboard build | Headline | CONDITIONAL-MET | C08 | `landing.ts:39`; description carries the condition |
| A11 | Fixed price. Fixed date. Before you pay. | Headline | ALLOWED | C03, C05 | `landing.ts:23`, `:132`, `:154` |
| A12 | Talk to the builders, not a manager | Headline | ALLOWED | C06, C14 | `landing.ts:220`, `:166–167` |
| A13 | Scope and access agreed first | Description | ALLOWED | C08/C09 condition | `landing.ts:62` |
| A14 | Get quote | CTA | ALLOWED | C11 | `landing.ts:107` |

### Ad A — video-20s (on screen; timecodes from the creative file)

| # | Line (verbatim) | Where | Class | Claim ID / rule | Evidence |
|---|---|---|---|---|---|
| V1 | THEY QUOTED YOU / QUARTERS? | 0.00s | NEEDS REISS | — | `claims.md:49` |
| V2 | A DISCOVERY PHASE. A RANGE. AN HOURLY RATE. | 0.12s | UNSOURCED | — | only "hourly" ≈ C13 `:161` |
| V3 | BUILT IN DAYS. | 0.94s | NEEDS REISS | — | `claims.md:48` |
| V4 | 14 / DAYS / 14-DAY FOCUSED DASHBOARD BUILD | 1.88s | CONDITIONAL-BROKEN | C08 | no on-screen condition; 9:16 qualifier under Reels UI |
| V5 | A live dashboard. | 1.88s | UNSOURCED | — | none |
| V6 | 07 / DAYS / 7-DAY FOCUSED SITE BUILD | 2.81s | CONDITIONAL-BROKEN | C09 | same as V4 |
| V7 | A new website. | 2.81s | UNSOURCED | — | none |
| V8 | Your business. In focus. | 3.75s | ALLOWED | site preview title | `landing.ts:46` |
| V9 | SAMPLE dashboard figures (142, ↑18%, $24,680, 3 locations, Downtown/Northside/Riverside) | 3.75–7.50s | ALLOWED (SAMPLE) | not proof; SAMPLE-tagged as on site | `landing.ts:75–99` |
| V10 | One dashboard. Every location. | 5.39s | UNSOURCED | nearest C21 | `landing.ts:36` |
| V11 | LIVE. | 6.56s | UNSOURCED | — | none |
| V12 | Web apps. Portals. DASHBOARDS Internal tools. Integrations. Websites. | 7.50s | ALLOWED | C02, C21 | `landing.ts:106`, `:13–14` |
| V13 | MVPs. | 7.97s | UNSOURCED | nearest `:15` | none |
| V14 | Whatever's next. | 8.75s | UNSOURCED | nearest C01 | none |
| V15 | 0X / 08, WHAT WE BUILD | 7.50s (1:1) | ALLOWED | section label | `landing.ts:178` |
| V16 | Every system in. / One number out. | 9.38s | UNSOURCED | nearest C21/C22 | none |
| V17 | Bookings, Payments, Social, Spreadsheets, Your CRM | 9.38s | ALLOWED | C21 | `landing.ts:35` |
| V18 | Anything with an API | 9.38s | UNSOURCED | nearest C21/C23 | none |
| V19 | $24,680 + SAMPLE | 10.3s | ALLOWED (SAMPLE) | — | `landing.ts:81` |
| V20 | Fixed price. Fixed date. In writing. Before you pay. | 11.25s | ALLOWED | C03, C05 | `landing.ts:154`, `:191` |
| V21 | WRITTEN SCOPE / Your project / What gets built / The fixed price / The delivery date / You own the code | 11.25s | ALLOWED | C03, C07 | `landing.ts:209`, `:259`, `:134` |
| V22 | AGREED IN WRITING | 14.06s | ALLOWED | C03, C15 | `landing.ts:172` |
| V23 | No account managers. | 15.00s | CONDITIONAL-MET | C14 restatement | `claims.md:28` |
| V24 | No hourly billing. | 15.38s | CONDITIONAL-MET | C13 restatement | `claims.md:27` |
| V25 | No lock-in. | 15.75s | NEEDS REISS | — | `claims.md:47`; `ad.html:618` confirmed |
| V26 | Talk to the builders. | 16.41s | ALLOWED | C06 | `landing.ts:220` |
| V27 | TWO FOUNDERS · NOBODY IN BETWEEN | 16.41s | NEEDS REISS | — | `claims.md:50`; `ad.html:643` |
| V28 | Your next big thing. Built at speed. | 16.88s | ALLOWED | C01 | `landing.ts:103–104` |
| V29 | FREE 30-MINUTE SCOPE CALL · NO DEPOSIT | 16.88s | CONDITIONAL-MET | C04 | `landing.ts:177` |
| V30 | Get my price & timeline ↗ | 16.88s | ALLOWED | C11 | `landing.ts:107` |
| V31 | skoxsoftware.com | 16.88s | ALLOWED | display domain | — |

### Ad B — fixed-terms

| # | Line (verbatim) | Where | Class | Claim ID / rule | Evidence |
|---|---|---|---|---|---|
| B1 | A 14-day focused dashboard build or a 7-day focused site build, once scope, content, data and access are agreed. | B-1 primary | CONDITIONAL-MET | C08, C09 | `landing.ts:39–40`, `:61–62`, FAQ `:296`; lands on `/`; condition in the same sentence and in the description |
| B2 | Custom web apps, dashboards and websites, built at speed. | B-1 primary | ALLOWED | C02, C01 | `landing.ts:104`, `:106` |
| B3 | Get my price & timeline. | B-1 primary | ALLOWED | C11 | `landing.ts:107` |
| B4 | A fixed price, agreed in writing before you pay anything. | B-2 primary | ALLOWED | C03 | `landing.ts:191` verbatim |
| B5 | A delivery date set at kickoff, not re-estimated later. | B-2 primary | ALLOWED | C18 | `landing.ts:192` verbatim |
| B6 | The plan is yours, whether you hire us or not. | B-2 primary | ALLOWED | C19 | `landing.ts:260` verbatim |
| B7 | Talk to the builders. Work with the founders. | B-3 primary | ALLOWED | C06 | `landing.ts:220` |
| B8 | A 30-minute conversation with a founder gets you a written scope, fixed price and delivery date. | B-3 primary | ALLOWED | C20, C03 | `landing.ts:258–259` (see N3) |
| B9 | No deposit for the call. | B-3 primary | CONDITIONAL-MET | C04 | the wording `claims.md:18` approves |
| B10 | Custom web apps, dashboards and websites | Headline | ALLOWED | C02 | `landing.ts:106` |
| B11 | A delivery date set at kickoff | Headline | ALLOWED | C18 | `landing.ts:192` |
| B12 | Work with the two founders building it | Headline | CONDITIONAL-MET | C14, C06 | `landing.ts:166`, `:220`; no firm named |
| B13 | Scope and access agreed first | Description | ALLOWED | C08/C09 condition | `landing.ts:62` |
| B14 | Get quote | CTA | ALLOWED | C11 | see N7 |
| B15 | Fixed price. | On image | ALLOWED | C05, C03 | `landing.ts:132` |
| B16 | Fixed date. | On image | ALLOWED | C03, C18 | `landing.ts:23`, `:192` (see N6) |
| B17 | Before you pay. | On image | ALLOWED | C03 | `landing.ts:154`, `:191` |
| B18 | Custom web apps, dashboards and websites | On image | ALLOWED | C02 | `landing.ts:106` |
| B19 | Free 30-minute scope call. No deposit. | On image | CONDITIONAL-MET | C04 | `landing.ts:177` verbatim |
| B20 | Get my price & timeline | On image (button graphic) | ALLOWED | C11 | `landing.ts:107` (see the policy audit about button graphics) |
| B21 | What gets built / The fixed price / The delivery date / You own the code | On image (optional card) | ALLOWED | C03, C07 | `landing.ts:209`, `:134` |
| B22 | SKOX wordmark | On image | — | brand | — |

Combination check for B: "Fixed price. Fixed date. Before you pay." with B-1 doesn't add up to a guarantee. The day timings never appear without "once scope, content, data and access are agreed", and no line uses guarantee, refund or risk wording.

### Ad C — compare-table

| # | Line (verbatim) | Where | Class | Claim ID / rule | Evidence |
|---|---|---|---|---|---|
| C1 | Big dev shop: months. Freelancer: unpredictable. | C-1 primary | CONDITIONAL-MET | C12 | `landing.ts:155–156`; generic, no number added (N2) |
| C2 | SKOX: a delivery date in writing, before you pay. | C-1 primary | ALLOWED | C12, C03 | `landing.ts:154` |
| C3 | Free 30-minute scope call. No deposit. No obligation. | C-1, C-3 primary | CONDITIONAL-MET | C04 | `landing.ts:109` |
| C4 | Between expensive and risky. | C-2 primary | ALLOWED | C16 | `landing.ts:143` |
| C5 | Big dev shop: high, often billed by the hour. Freelancer: low, but a gamble. | C-2 primary | CONDITIONAL-MET | C13 | `landing.ts:161–162` |
| C6 | SKOX: fixed upfront, with no agency overhead. | C-2 primary | CONDITIONAL-MET | C13 | `landing.ts:160` |
| C7 | Big dev shop: an account manager. Freelancer: one person, if they reply. | C-3 primary | CONDITIONAL-MET | C14 | `landing.ts:167–168` |
| C8 | SKOX: the two founders building it. | C-3 primary | CONDITIONAL-MET | C14 | `landing.ts:166` |
| C9 | Between expensive and risky. | Headline | ALLOWED | C16 | `landing.ts:143` |
| C10 | Fixed upfront, with no agency overhead | Headline | CONDITIONAL-MET | C13 | `landing.ts:160` |
| C11 | The two founders building it | Headline | CONDITIONAL-MET | C14 | `landing.ts:166` |
| C12 | Free scope call, no deposit | Description | CONDITIONAL-MET | C04 | the wording `claims.md:18` approves |
| C13 | Get quote | CTA | ALLOWED | C11 | see N7 |
| C14 | Between expensive and risky. | On image, title | ALLOWED | C16 | `landing.ts:143` |
| C15–C17 | SKOX / Big dev shop / Freelancer or DIY | On image, column heads | ALLOWED | C12–C15 (generic) | `landing.ts:147–149` |
| C18–C21 | Timeline: A delivery date in writing, before you pay / Months / Unpredictable | On image | CONDITIONAL-MET | C12 | `landing.ts:153–156` verbatim |
| C22–C25 | Price: Fixed upfront, with no agency overhead / High, often billed by the hour / Low, but a gamble | On image | CONDITIONAL-MET | C13 | `landing.ts:159–162` verbatim |
| C26–C29 | Who you deal with: The two founders building it / An account manager / One person, if they reply | On image | CONDITIONAL-MET | C14 | `landing.ts:165–168` verbatim |
| C30–C33 | When plans change: Agreed in writing, with a working review halfway / Change orders / Start over | On image | CONDITIONAL-MET | C15 | `landing.ts:171–174` verbatim |
| C34 | Free 30-minute scope call. No deposit. | On image, footnote | CONDITIONAL-MET | C04 | `landing.ts:177` verbatim |
| C35 | SKOX wordmark | On image | — | brand | — |

Combination check for C: the table repeats the site's own comparison word for word. It names no firm and puts no number on anyone else's price or timeline. It has no day promise, so it needs no day condition.

## Is `claims.md` stale?

No. Every `landing.ts` line that `claims.md` cites (C01–C27 and the competitor note at `:137–140`) still says what `claims.md` says it does. I checked each against `content/landing.ts` today. `components/LandingPage.tsx` confirms that `/` renders the hero, the reassurance line, the trust strip, `CompareSection`, `BuildSection` (which carries the 14-day and 7-day timelines with their notes), the assurance and process copy, the founders and the FAQ.

## Inputs I could not check

- The finished PNGs for B and C don't exist yet (P8). I audited the briefs. The images need a check once they're made.
- How Meta actually renders the description per placement. That's a platform behaviour, not repo evidence. Blocker 14 stands either way, because the 9:16 hides the qualifier.

## Sources read

- `docs/ads/campaigns/meta-retargeting-v1.md`
- `docs/ads/creative/meta-retargeting-v1-video-20s.md`, `-fixed-terms.md`, `-compare-table.md`
- `docs/ads/claims.md`, `docs/ads/README.md`
- `content/landing.ts`, `components/LandingPage.tsx`
- `output/skox-hype/ad.html:145–189`, `:612–646`. Read only to confirm what the video shows on screen; it isn't used as evidence for any claim.
