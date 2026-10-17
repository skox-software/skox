# Economics auditor (recheck) — google-search-v1 + meta-retargeting-v1 — 2026-10-05

**Verdict:**
- **google-search-v1: PASS** (0 blockers). Cost-per-lead ceilings: **NO VERDICT (missing input)**.
- **meta-retargeting-v1: PASS** (0 blockers). Cost-per-lead ceilings and time to a cost verdict: **NO VERDICT (missing input)**.

Both campaigns now share one combined budget table: **$27.00/day = $820.80/month at the start, $32.50/day = $988.00/month at the ceiling**, $12.00 under the $1,000 cap (`google-search-v1.md:28–33`, `meta-retargeting-v1.md:24–31`). The two files agree to the cent. Both blockers from this morning's reports are cleared. Ceilings still can't be computed, because every JOSH cell in `economics.md` is blank. That isn't a launch blocker for a test whose only live kill rules are volume-based, but it means **no scale step is possible in v1**. Both files say so (`google-search-v1.md:470`, `meta-retargeting-v1.md:287`).

## Previous blockers

| Report | Blocker | Status | Evidence |
|---|---|---|---|
| `2026-10-05-economics-google-search-v1.md` #1 | Google ceiling $33.00/day ($1,003.20/month) took the combined total to $1,216.00/month, $216 over the cap. The scale rule was ambiguous (per campaign or per account). | **CLEARED** | Ceiling now $11.50 / $9.00 / $5.00 = **$25.50/day = $775.20/month** (`:21–24`). Combined with Meta: **$988.00** (`:31`). Scale rule now reads "+$5/day per week **across the whole account** (Google and Meta together)", with +$152.00/month per step (`:35`, repeated at `:470`). Meta raises must come out of Google's ceiling (`:33`). |
| `2026-10-05-economics-meta-retargeting-v1.md` #1 | No scale rule and no dollar ceiling for Meta. The "$10 a day" split trigger implied an unruled raise. The $179.20 headroom was claimed three times. | **CLEARED** | Meta ceiling **$7.00/day = $212.80/month** (`:14`, `:27`, `:31`, `:282`). Scale rule (`:281–287`): under the ceiling for 4+ weeks, frequency ≤ 3 over 30 days, cost per lead not rising, at most +$5.00/day per week, and every raise is matched by an equal cut to Google's ceiling, stated in dollars for both lines. The split trigger (`:44`) and prospecting v2 (`:310`) now both point at that rule and fund themselves from Google's share. The headroom is claimed once (by Google's ceiling) with a written way to move it. |

## Previous non-blockers

| Report | # | Status |
|---|---|---|
| Google | 1 Websites can't pay back at ~$1,250 | Addressed: Websites is "first to pause" (`:240`, `:471`). Still Josh's call once the Websites row is filled in. |
| Google | 2 CPC caps cut off the $8–25 range | Mostly addressed: `:93` now says a campaign above its cap **underspends**. `:44` still quotes "24–75 clicks" without the caps (see new non-blocker 2). |
| Google | 3 "1–3 clicks a day per campaign" too high | Fixed (`:93`: 0.75–1.13 / 0.70–0.88 / ≤0.67; 2–2.7 a day across the account). |
| Google | 4 60-day rule in dollars | Fixed: $1,200.00 Google, $1,620.00 with Meta (`:37`, `:43`, `:473`). |
| Google | 5 "Never scale while cost per lead is rising" | Fixed (`:35`, `:470`). |
| Google | 6 2× daily overspend in dollars | Stated (`:39`) without the dollar figures ($40.00 at start, $51.00 at the new ceiling). Fine as is. |
| Meta | 1 Lead optimisation with no history | Turned into an explicit Josh decision with both options and a 15-Lead switch rule (`:123–132`). Still blank (see non-blocker 1). |
| Meta | 2 Frequency thresholds | Fixed: Watch > 3 over 30 days, Act > 4 in 7 days (`:273`). |
| Meta | 3 "$426" at day 60 | Fixed: $420 (`:268`, `:278`). |
| Meta | 4 Weak rule (< 2% form starts) | Fixed (`:274`). |
| Meta | 5 Daily overspend | Fixed, labelled ASSUMPTION (`:33`). |
| Meta | 6 Speed bet leads with the website route | Addressed: the tally records the build type of each lead (`:266`), and each lead is judged against its own route's ceiling (`:279`). |
| Meta | 7 No Meta assumptions in `economics.md` | Planned, not done: write observed CPM, CTR and Leads after 14 days (`:274`). `economics.md` still has none. |

## Blockers

| # | Where | Problem | Rule or source | Fix |
|---|---|---|---|---|
| — | — | None | — | — |

## Non-blockers

| # | Where | Problem | Suggestion |
|---|---|---|---|
| 1 | `meta-retargeting-v1.md:132` | The optimisation goal is still blank ("Josh picks one before upload"). Agent check 6 is triggered while it stays on Lead with no conversion history. | Josh writes his choice in before U3. If he keeps Lead, the Audience Network watch at `:273` is the money guard. |
| 2 | `google-search-v1.md:44` | "At $608/month and $8–25 CPC, about 24–75 clicks" still ignores the caps. Under the $12/$10/$6 caps the account can't buy fewer than about 64 clicks if it spends in full, and it underspends if the auction is higher (`:93` already says so). | Reword to "≥ about 64 clicks a month if it spends in full; less spend, not pricier clicks, if the caps bind". Cosmetic. |
| 3 | `meta-retargeting-v1.md:285` | Cites `economics.md:60` for the +$5/day step. `economics.md` has been edited; the scale row is now at `:65` (`:60` is the search-terms check). | Update the line reference. |
| 4 | `economics.md:25`, `google-search-v1.md:33` | `economics.md` now says Josh decides who gets the headroom under $1,000 (Google scaling, Meta retargeting or Meta prospecting), and that cell is blank. Both campaign files give it to Google's ceiling by default, with a written way to move it. Fine for v1, since nothing can scale until the ceilings exist. | When Josh fills `economics.md:25`, the campaign ceilings must match it. |
| 5 | `economics.md` (Meta rows) | Still no Meta CPM, CTR or retargeted form rate, so Meta's time to a cost verdict can't be computed. | As planned at `meta-retargeting-v1.md:274`. |

## Ceilings — NO VERDICT

I haven't filled any blank. `economics.md` now has columns for every input the formula needs, but these are still blank:

1. `economics.md:18` `/web-apps`: minimum price, typical price, gross margin %, share of first-job profit (JOSH ×4)
2. `economics.md:19` `/dashboards`: the same four (JOSH ×4). There's still no observed dashboard deal (`:12`).
3. `economics.md:20` `/websites`: the same four (JOSH ×4)
4. `economics.md:24` share of form leads that qualify (JOSH; 50% ASSUMPTION placeholder only)
5. `economics.md:68–70` the definition of "qualified" (ASSUMPTION, "Josh to confirm")

Close rates for the calculation are 10% and 20%, per the brief. Once 1–4 exist, the formula in the Appendix gives max CAC, max cost per qualified lead and max cost per form lead per route at both rates.

## Time to verdict (unchanged; start budgets didn't change)

Arithmetic is in Appendix B–C of `2026-10-05-economics-google-search-v1.md`. In short, all ASSUMPTION (CPC $8–25, form rate 3–8%, `economics.md:43`):
- **Google bidding switch** (15 conversions in 30 days, per campaign): not reachable at the start budgets or the ceiling. Maximize Clicks is v1's steady state, as the file says (`:113`).
- **First cost-per-lead read** (≥5 form leads, auditor's threshold, ASSUMPTION): about 3–11 weeks for the **whole Google account**. Per campaign it's too slow to judge in v1.
- **Meta:** no cited CPM, CTR or form rate, so no week count. The first decision is the day-30 / $210 volume kill rule.

## Kill and scale rules vs `economics.md`

| Rule (`economics.md`) | Google | Meta |
|---|---|---|
| Learning period, 7 days (`:59`) | `:457` Yes | `:272` Yes |
| Dead ad group: 30 days or $300, zero form starts (`:61`) | `:42`, `:468` Yes | `:277` day 30 or $210, zero leads and zero form starts. Yes, stricter |
| Weak: form starts < 2% of clicks (`:62`) | `:469` Yes | `:274` Yes |
| Dead campaign: 60 days, zero qualified (`:63`) | `:37`, `:473` Yes, $1,200.00 | `:278` Yes, $420 |
| Bidding switch, 15 in 30 days (`:64`) | `:97` Yes, per campaign | `:130` Yes, if Josh picks the landing-page-views option |
| Scale: under ceiling 4+ weeks + IS lost > 20%, ≤ +$5/day per week across the account, Google + Meta < $1,000 (`:65`) | `:35`, `:470` Yes | `:281–287` Yes (frequency replaces impression share, which Meta doesn't have) |
| Never scale while cost per lead is rising (`:66`) | `:35`, `:470` Yes | `:286` Yes |
| Changes in $/month before and after | `:35` Yes | `:273`, `:283` Yes |

## Bidding fit

- **Google: PASS.** Maximize Clicks with a CPC cap of $12 / $10 / $6 (`:103–109`). No Maximize Conversions or Target CPA before 15 conversions per campaign.
- **Meta: open decision** (non-blocker 1). Meta's Leads objective has no "clicks with a cap" equivalent. The file sets out the two options honestly and makes Josh's choice a written rule.

## Inputs I could not check

- Real CPCs and volumes (Keyword Planner not run; `google-search-v1.md:341` is empty).
- Meta CPM, CTR, retargeted form rate; the 90-day audience size (P9).
- Google's and Meta's current daily-overspend behaviour (no web access). Both files state it; Meta's figure is labelled ASSUMPTION.
- Whether the $1,000 cap covers both platforms. Both files and `economics.md:65` now say it does, so this is settled in the docs.

## Sources read

- `/Users/josh/SKOX/.claude/agents/economics-auditor.md`
- `/Users/josh/SKOX/docs/ads/campaigns/google-search-v1.md`
- `/Users/josh/SKOX/docs/ads/campaigns/meta-retargeting-v1.md`
- `/Users/josh/SKOX/docs/ads/economics.md`
- `/Users/josh/SKOX/docs/ads/README.md`
- `/Users/josh/SKOX/docs/ads/audits/2026-10-05-economics-google-search-v1.md`
- `/Users/josh/SKOX/docs/ads/audits/2026-10-05-economics-meta-retargeting-v1.md`
- The `diagnostics.md` and `gotchas.md` findings were carried over from the two reports above. I didn't re-open them, because no rule that depends on them changed.

---

## Appendix: worked numbers

### A. Budget arithmetic (× 30.4)

| Line | $/day | $/month | File says | OK |
|---|---|---|---|---|
| Web apps start | 9.00 | 273.60 | 273.60 | Yes |
| Dashboards start | 7.00 | 212.80 | 212.80 | Yes |
| Websites start | 4.00 | 121.60 | 121.60 | Yes |
| **Google start** | 20.00 | **608.00** | 608.00 | Yes |
| Web apps ceiling | 11.50 | 349.60 | 349.60 | Yes |
| Dashboards ceiling | 9.00 | 273.60 | 273.60 | Yes |
| Websites ceiling | 5.00 | 152.00 | 152.00 | Yes |
| **Google ceiling** | 25.50 | **775.20** | 775.20 | Yes |
| **Meta start = ceiling** | 7.00 | **212.80** | 212.80 | Yes |
| **Combined start** | 27.00 | **820.80** | 820.80 (both files) | Yes |
| **Combined ceiling** | 32.50 | **988.00** | 988.00 (both files) | Yes, $12.00 under $1,000 |

Shares at the ceiling: 11.5 / 25.5 = 45.1%, 9 / 25.5 = 35.3%, 5 / 25.5 = 19.6%. Josh's 45/35/20 split still holds.

Headroom from start to ceiling: 32.50 − 27.00 = $5.50/day = $167.20/month. That's one full +$5/day step and $0.50 left over.

### B. Change blocks in the files, checked

| Where | Change | Arithmetic | OK |
|---|---|---|---|
| Google `:35` | +$5/day step | 5 × 30.4 = 152.00 | Yes |
| Meta `:273` | $7 → $4/day | 212.80 → 121.60, saves 91.20 | Yes |
| Meta `:283` | Meta $7 → $12, Google ceiling $25.50 → $20.50 | 212.80 → 364.80 (+152.00); 775.20 → 623.20 (−152.00); combined 364.80 + 623.20 = 988.00 | Yes |
| Meta `:44` | Split: move $3/day from Google | 3 × 30.4 = 91.20; 25.50 → 22.50 = 775.20 → 684.00; 684.00 + 304.00 = 988.00 | Yes |
| Meta `:310` | Prospecting $5/day from Google | 152.00; 25.50 → 20.50 = 623.20; 623.20 + 212.80 + 152.00 = 988.00 | Yes |

### C. Hard stops (start budgets)

Google day 30 by campaign: 9 × 30 = $270, 7 × 30 = $210, 4 × 30 = $120. Google day 60: 20 × 60 = $1,200. Meta: day 30 = $210, day 60 = $420. Most spent before both day-60 stops: **$1,620**.

Biggest single day: Google 2 × $20 = $40.00 at start, 2 × $25.50 = $51.00 at the ceiling. Meta about $12.25 (ASSUMPTION, `meta-retargeting-v1.md:33`). Combined worst day at start: about $52.25.

### D. Ceiling formula, ready for Josh's numbers (`economics.md:31–33`)

- Max CAC = typical price × gross margin × share of first-job profit spent (all blank)
- Max cost per qualified lead = max CAC × close rate (× 0.10 and × 0.20)
- Max cost per form lead = max cost per qualified lead × share of form leads that qualify (blank)

---

# Claims auditor (recheck, changed lines only) — google-search-v1 + meta-retargeting-v1 — 2026-10-05

**Verdict:** **PASS** on every changed line (0 blockers). **Meta v1 contains only Ads B and C as launchable**, confirmed.

Scope: only the lines that differ from what `2026-10-05-claims-google-search-v1.md` and `2026-10-05-claims-meta-retargeting-v1.md` audited. Everything else stands on those reports. Both files are drafts, so the blank `claims.md:9` sign-off is a non-blocker here. It becomes a blocker the moment either campaign is marked ready to launch, and `meta-retargeting-v1.md` P7 already treats it as an upload gate.

## Blockers

| # | Where | Problem | Rule or source | Fix |
|---|---|---|---|---|
| — | — | None | — | — |

## Non-blockers

| # | Where | Problem | Suggestion |
|---|---|---|---|
| 1 | `claims.md:9` | Still not signed by Reiss. | Sign before upload of either campaign. |
| 2 | `google-search-v1.md:399`, business name "SKOX" tagged [C24] | C24 is the descriptor "Independent software studio", not the name. The name is a brand, not a claim (the earlier reports class the SKOX wordmark the same way). The file's note explains this, so it's only an ID tidy-up. | Tag it "brand name, not a claim". Whether "SKOX" meets Google's business-name rules (matches the domain and the payments profile) is a `policy-auditor` question. |
| 3 | `docs/ads/creative/meta-retargeting-v1-fixed-terms.md:25`, "Fixed date." tagged C03 | The closest sources are `landing.ts:23` ("a fixed scope, price and delivery date") and C18 (`:192`). C03 alone says "agreed upfront", not "fixed". It's fine, as the earlier report found (N6). | Tag it C03, C18. Cosmetic. |
| 4 | `meta-retargeting-v1.md:351–359` | Ad A's copy and destination URL are kept inside the campaign file under "Not in v1". It's clearly labelled, but it sits next to upload-ready text. | Optional: move it into `creative/meta-retargeting-v1-video-20s.md`, so the campaign file only carries what ships. |

## Line table (changed lines)

| # | Line (verbatim) | Where | Class | Claim ID / rule | Evidence |
|---|---|---|---|---|---|
| G1 | Customer portals, internal tools, accounts, payments and integrations. | Google Web apps, description 1 (`google-search-v1.md:177`) | ALLOWED | C21 | `landing.ts:13` "Customer portals & internal tools", `:14` "Accounts, payments & integrations". The earlier "Built at speed." tail is gone. 70 characters. |
| G2 | SKOX | Google business name asset, account level (`:399`) | ALLOWED (brand, not a claim) | Brand name; C24 cited (see non-blocker 2) | `landing.ts:147` uses "SKOX" as the studio's name |
| G3 | Delivery date in writing | Google callout (`:393`) | ALLOWED | C03 | `landing.ts:154` "A delivery date in writing, before you pay" |
| G4 | Free scope call | Google callout (`:394`) | ALLOWED | C04, without "no deposit", so the condition isn't engaged | `landing.ts:109` |
| G5 | Reply in 1 business day | Google callout (`:395`) | ALLOWED | C10 | `landing.ts:256`, `:281` "within one business day" |
| G6 | Work with the founders | Google callout (`:396`) | ALLOWED | C06 | `landing.ts:220` "Work with the founders." |
| G7 | Working review halfway | Google callout (`:397`) | CONDITIONAL-MET | C15 (now cited correctly; the earlier N2 is fixed). Generic, no firm named | `landing.ts:172` "with a working review halfway" |
| M1 | A 30-minute conversation with a founder, then a written scope, fixed price and delivery date. | Meta Ad B, primary text B-3 line 2 (`meta-retargeting-v1.md:175`) | ALLOWED | C20, C03 | `landing.ts:258–259`. "then" keeps the call and the written plan as two steps, matching steps 01→02 (`:203`, `:209`). This fixes the earlier N3. 93 characters; B-3 total 164. |
| B1 | Fixed price. | Ad B brief, on image | ALLOWED | C05, C03 | `landing.ts:132` |
| B2 | Fixed date. | Ad B brief, on image | ALLOWED | C03, C18 (non-blocker 3) | `landing.ts:23`, `:192` |
| B3 | Before you pay. | Ad B brief, on image | ALLOWED | C03 | `landing.ts:154`, `:191` |
| B4 | Custom web apps, dashboards and websites | Ad B brief, support line | ALLOWED | C02 | `landing.ts:106` |
| B5 | Free 30-minute scope call. No deposit. | Ad B brief, footnote | CONDITIONAL-MET | C04 ("No deposit" attached to the call) | `landing.ts:177` verbatim |
| B6 | Get my price & timeline | Ad B brief, call line (now **plain text, not a button**) | ALLOWED | C11 | `landing.ts:107`, `:284` |
| B7 | What gets built / The fixed price / The delivery date / You own the code | Ad B brief, optional card | ALLOWED | C03, C07 | `landing.ts:209`, `:259`, `:134` |
| B8 | SKOX wordmark | Ad B brief | — | brand | — |
| C1 | Between expensive and risky. | Ad C brief, title | ALLOWED | C16 | `landing.ts:143` |
| C2 | SKOX / Big dev shop / Freelancer or DIY | Ad C brief, column heads | ALLOWED | C12–C15, generic | `landing.ts:147–149` verbatim |
| C3 | Timeline: A delivery date in writing, before you pay / Months / Unpredictable | Ad C brief | CONDITIONAL-MET | C12 | `landing.ts:153–156` verbatim |
| C4 | Price: Fixed upfront, with no agency overhead / High, often billed by the hour / Low, but a gamble | Ad C brief | CONDITIONAL-MET | C13 | `landing.ts:159–162` verbatim |
| C5 | Who you deal with: The two founders building it / An account manager / One person, if they reply | Ad C brief | CONDITIONAL-MET | C14 | `landing.ts:165–168` verbatim |
| C6 | When plans change: Agreed in writing, with a working review halfway / Change orders / Start over | Ad C brief (may be dropped as a whole row on 1:1 or 9:16) | CONDITIONAL-MET | C15 | `landing.ts:171–174` verbatim |
| C7 | Free 30-minute scope call. No deposit. | Ad C brief, footnote | CONDITIONAL-MET | C04 | `landing.ts:177` verbatim |
| C8 | SKOX wordmark | Ad C brief | — | brand | — |

## Whole-ad checks on the changes

- **Google callouts:** none of the five carries a day promise, a price, or "No deposit" on its own. Shown beside the 14-day or 7-day headlines, "Delivery date in writing" adds nothing beyond the earlier finding (N4): the condition is still in pinned description 1.
- **Web apps description 1:** dropping "Built at speed." removes the only speed wording from that description. Nothing in the web apps ad states a day count, so no condition is needed.
- **B-3:** no day promise, and "No deposit for the call." keeps C04 tied to the call.
- **Ad B brief:** the call line is now plain text with no pill, box or arrow, so there's no fake button to read as a claim. Timing stays off the image (`fixed-terms.md:54`), so "Fixed date." can't fuse with "14-day" or "7-day" on the creative.
- **Ad C brief:** "Do not reword, shorten or re-case any cell" and "drop a whole row, never a word" (`compare-table.md:22`, `:55–56`) keep every cell verbatim. Dropping the last row doesn't strengthen any claim.

## Meta v1 contains only Ads B and C as launchable — confirmed

- Summary: "Ads in v1: **2:** Ad B `fixed-terms` … and Ad C `compare-table`. The 20s video is **not in v1**" (`meta-retargeting-v1.md:17`).
- Section 4 builds only Ads B and C (`:157–217`). Section 5 marks A "Not in v1" (`:227`).
- The upload steps create only Ad B (U4, `:249`) and Ad C (U5, `:258`). There's no step for Ad A.
- Section 10 marks the video **BLOCKED** (`:320`) and lists the 14 claim blockers from the earlier audit, all still open. Ad A's copy is kept there only for a future v2 (non-blocker 4).

The conditions from the earlier report still apply to B and C: build the PNGs exactly from the briefs and give them a fresh look once they exist (P8); keep every Advantage+ creative enhancement off, and re-check after duplicating (U4.6, U5); get `claims.md` signed before upload (P7).

## `claims.md` freshness

Every `landing.ts` line cited above was re-read today and still says what `claims.md` says. Not stale.

## Inputs I could not check

- The finished PNGs for B and C (P8, not made).
- Google's business-name policy fit for "SKOX" (`policy-auditor`).

## Sources read

- `/Users/josh/SKOX/.claude/agents/claims-auditor.md`
- `/Users/josh/SKOX/docs/ads/campaigns/google-search-v1.md`
- `/Users/josh/SKOX/docs/ads/campaigns/meta-retargeting-v1.md`
- `/Users/josh/SKOX/docs/ads/creative/meta-retargeting-v1-fixed-terms.md`
- `/Users/josh/SKOX/docs/ads/creative/meta-retargeting-v1-compare-table.md`
- `/Users/josh/SKOX/docs/ads/claims.md`
- `/Users/josh/SKOX/content/landing.ts`
- `/Users/josh/SKOX/docs/ads/audits/2026-10-05-claims-google-search-v1.md`
- `/Users/josh/SKOX/docs/ads/audits/2026-10-05-claims-meta-retargeting-v1.md`
