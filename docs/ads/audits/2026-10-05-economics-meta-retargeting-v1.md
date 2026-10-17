# Economics auditor — meta-retargeting-v1 — 2026-10-05

**Verdict:** FAIL (1 blocker). **Cost-per-lead ceilings: NO VERDICT (missing input). Time to a cost verdict: NO VERDICT (no Meta assumptions on file).**

The starting budget is fine: $7.00/day = $212.80/month. With Google Search at $608.00, the total is $820.80/month, inside $500–1,000. The kill rules are written in dollars and days and match `economics.md`. What fails: **there's no scale rule and no dollar ceiling for Meta.** The file mentions a later step to "$10 a day or more" but gives it no rule. Meanwhile, the only headroom under the cap, $179.20/month, is claimed three times: by Google's own ceiling, by Meta prospecting v2, and by that implied Meta raise.

## Blockers

| # | Where | Problem | Rule or source | Fix |
|---|---|---|---|---|
| 1 | `meta-retargeting-v1.md:29`, `:287–291`, `:314` | **No scale rule, no ceiling.** The kill rules are there. The only scale-side lines are "never scale while frequency is above 4" (a stop, not a rule) and a v2 split trigger at "$10 a day or more". That trigger implies a raise from $212.80 to at least $304.00/month (+$91.20) with no criteria, no step size and no ceiling. Combined with Google's written $33/day ceiling, that's **$43.00/day = $1,307.20/month, $307.20 over the cap**. Even at Google's start budget, Meta at $10/day plus prospecting at $5.89/day spends the whole $1,000. The headroom left after both start budgets, $1,000 − $820.80 = **$179.20**, is assigned three times: to Google scaling (`google-search-v1.md:26`), to Meta prospecting (`:314`), and to this implied raise. | Agent check 5 (scale rules in dollars and days, matching `economics.md`; missing is a blocker). Check 1 (combined ≤ $1,000). `economics.md:60–61` | Add a scale rule matching `economics.md:60`: cost per qualified lead under the ceiling for 4+ weeks **and** frequency ≤ 3 over 30 days (`diagnostics.md` "Watch" line), at most +$5/day per week, stated before and after in $/month. Write a **Meta ceiling in dollars** that fits a single **combined** budget table shared with `google-search-v1`, e.g. "Meta retargeting ceiling $7.00/day ($212.80) until Josh moves money from Google". Then change the v2 split trigger to point at that rule instead of "$10 a day or more". Josh decides who gets the $179.20. |

## Non-blockers

| # | Where | Problem | Suggestion |
|---|---|---|---|
| 1 | `:89` | **Rule triggered: "Maximize number of conversions" with no conversion history** (agent check 6). The file itself says Meta "won't get anywhere near" its ~50 conversions a week (`:24`) and expects single-digit Leads (`:125`). Meta will optimise for `Lead` on almost no signal and stay in learning. My judgement: not a blocker. On a pool of a few hundred people, the goal mostly decides *who in the pool sees it first*, and the budget can't buy much beyond the pool anyway. The money risk is that a starved Lead goal pushes delivery into cheap placements (the Audience Network watch at `:284`). | Josh's call, recorded either way: keep Lead (signal stays clean for later), or run v1 on **Landing page views** and switch to Lead at 15+ Leads in 30 days, mirroring Google's switch rule. Whichever he picks, write it as a rule. |
| 2 | `:284`, `:290` | The frequency threshold "above 4 in 7 days" is looser than `diagnostics.md`, where frequency "above 3–4 in a month means the audience is exhausted" and above 3 is "Watch". | Set "Watch" at frequency > 3 over 30 days. Keep > 4 in 7 days as the trigger for the $7 → $4 cut. |
| 3 | `:289` | "Day 60 (about $426 spent)": 7 × 60 = **$420.00**. $426 is two 30.4-day months ($425.60). | Write "$420 (day 60)". It's minor, but the rule fires on dollars or days. |
| 4 | `:283–285`, `:287–288` | The `economics.md:57` weak rule (30 days, clicks but form starts < 2% of clicks) isn't stated in dollars or numbers. Only "zero leads but form starts" is covered. | Add: at day 30 ($210), if `LeadFormStarted` ÷ link clicks < 2%, run landing-auditor before touching the ads. |
| 5 | `:14` | Meta can spend over its daily budget on some days. The file doesn't say so (the Google file does). ASSUMPTION, Meta's behaviour as I understand it, not checked (no web): up to about 75% over the daily budget on a single day, with the week held to 7× daily. That's up to about $12.25 on one day. | Add one line so a $12 day isn't read as a fault. Combined worst single day at start budgets: Google $40.00 + Meta about $12.25 = about $52.25. |
| 6 | `:141–145`, `:175` | The "speed bet" texts A-1 and B-1 lead with the **7-day focused site build**, which serves the lowest-value route (`economics.md:34`: a $1,250 website "can't carry paid search on its own"). That pulls retargeting money toward website leads. | Not a blocker, since claims and copy belong to other auditors. On economics grounds, prefer the dashboard-first phrasing, or make sure the lead tally records the build type so website leads can be priced separately once the ceilings exist. |
| 7 | `economics.md:36–46` | `economics.md` has no Meta assumptions at all (CPM, link CTR, form rate from retargeted traffic), so no time-to-verdict can be computed from cited numbers (see below). | After 14 days, have `meta-ads` write the observed CPM, CTR and Leads into `economics.md` as dated ASSUMPTION rows. |

## Ceilings — NO VERDICT

The same blanks block it as in the Google audit (`2026-10-05-economics-google-search-v1.md`):

1. `economics.md:18–20`: minimum price, typical price and gross margin % for `/web-apps`, `/dashboards`, `/websites` (9 JOSH cells).
2. The share of first-job profit Josh will spend to win a client. The formula needs it, but the inputs table has no column for it.
3. The share of form leads that qualify (exists only as the illustration's "half").
4. The definition of "qualified" (still ASSUMPTION).

**Meta-specific:** this campaign lands on `/` (`:16`), so a single lead can be any of the three routes. One blended Meta ceiling would mix a $1,250 website with a web app. Once the inputs exist, judge each Meta lead against the ceiling for the build type it chose on the form (the form pre-selects build type by route, `offer.md:11`). Never use one blended number.

## Time to verdict — NO VERDICT on cost; volume rules only

- There's no cited Meta CPM, CTR or conversion rate, so I can't compute weeks to N leads without inventing numbers. I haven't.
- **What bounds it:** the 90-day pool is mostly Google clicks. ASSUMPTION from `economics.md:43`: 24–75/month. Under Google's CPC caps, ≥64/month if Google spends its budget (Google audit, Appendix B). Plus organic visitors (UNKNOWN), less pixel match loss. That's about 72–225 Google visitors over 90 days. Organic traffic and match rate are UNKNOWN until Ads Manager shows the audience estimate (`:255`, P9).
- **15 results per variant** (diagnostics, needed to name a winner) can't be reached in v1. The file says so itself (`:125`).
- **The earliest decision is volume-based:** day 30 ($210 spent, 7 × 30), the kill rule (zero leads and zero form starts). That matches the `diagnostics.md` minimum to pause ("30 days, or 50 results"). There's no cost-per-lead read in v1. Per `economics.md:46`, even the account-level read across both platforms takes 6–10 weeks.

## Kill and scale rules vs `economics.md`

| Rule (`economics.md`) | In the campaign file | Match |
|---|---|---|
| Learning period, 7 days | `:283` Day 7, "No verdict" | Yes |
| Dead: 30 days or $300, zero form starts | `:288` day 30 or $213, zero leads **and** zero `LeadFormStarted` | Yes, and stricter in dollars. At $7/day, day 30 ($210) always comes first. |
| Weak: form starts < 2% of clicks | Only "zero leads but form starts" (`:285`) | Partial (non-blocker 4) |
| Dead campaign: 60 days, zero qualified | `:289` | Yes (dollar figure off by $6, non-blocker 3) |
| Scale: under ceiling 4+ weeks, ≤ +$5/day per week | **Missing** | **Blocker 1** |
| Never scale when cost per lead is rising | Frequency-only version at `:290` | Partial; add cost per lead rising |
| Budget changes in $/month before and after | `:284` change block: $7 → $4/day, $212.80 → $121.60, saves $91.20 | Yes |

## Inputs I could not check

- Audience size (P9, UNKNOWN). If it comes out under about 1,000, $7/day may already be more than the pool can absorb. The file's day-7 rule ("spends under $3 a day") catches this.
- Meta CPM, CTR, retargeted form rate. None are on file.
- Meta's current daily-overspend behaviour (no web access; non-blocker 5 is labelled ASSUMPTION).
- Whether the $1,000 cap is meant for both platforms together. I read `README.md:9` as the total, as the brief instructs.

## Sources read

- `/Users/josh/SKOX/.claude/agents/economics-auditor.md`
- `/Users/josh/SKOX/docs/ads/campaigns/meta-retargeting-v1.md`
- `/Users/josh/SKOX/docs/ads/campaigns/google-search-v1.md` (for the combined budget)
- `/Users/josh/SKOX/docs/ads/economics.md`
- `/Users/josh/SKOX/docs/ads/offer.md`
- `/Users/josh/SKOX/docs/ads/README.md`
- `/Users/josh/.claude/plugins/synced/952e6b41-8da7-4419-b95c-d5efe950b3f1_642b0eb8-fc79-4cd2-a00e-4f3eba31eaaf/small-business/skills/ad-manager/reference/diagnostics.md`
- `/Users/josh/.claude/plugins/synced/952e6b41-8da7-4419-b95c-d5efe950b3f1_642b0eb8-fc79-4cd2-a00e-4f3eba31eaaf/small-business/skills/ad-manager/reference/gotchas.md`

---

## Appendix: worked numbers

### A. Budget arithmetic

| Line | $/day | × 30.4 | $/month | File says | OK |
|---|---|---|---|---|---|
| Meta retargeting | 7.00 | 7 × 30.4 | 212.80 | "about $213" | Yes |
| Meta after day-14 cut | 4.00 | 4 × 30.4 | 121.60 | "about $122" | Yes |
| Saving from the cut | | 212.80 − 121.60 | 91.20 | "about $91" | Yes |
| Meta at the implied v2 split level | 10.00 | 10 × 30.4 | 304.00 | not stated | — |
| Google start (`google-search-v1.md:24`) | 20.00 | | 608.00 | 608.00 | Yes |
| Google ceiling | 33.00 | | 1,003.20 | 1,003.20 | Yes |

**Combined, against the $1,000 cap**

| Scenario | Google $/day | Meta $/day | Total $/day | $/month | vs $1,000 |
|---|---|---|---|---|---|
| Both at start | 20.00 | 7.00 | 27.00 | 820.80 | $179.20 under |
| + Meta prospecting v2 (`:314`) | 20.00 | 7.00 + 5.89 | 32.89 | 999.86 | at the cap |
| Meta raised to the $10 split level | 20.00 | 10.00 | 30.00 | 912.00 | $88.00 under |
| Meta $10 + prospecting $5.89 | 20.00 | 15.89 | 35.89 | 1,091.06 | **$91.06 over** |
| Google at ceiling, Meta at start | 33.00 | 7.00 | 40.00 | 1,216.00 | **$216.00 over** |
| Google at ceiling, Meta at $10 | 33.00 | 10.00 | 43.00 | 1,307.20 | **$307.20 over** |

Headroom over the start budgets: 1,000 − 820.80 = $179.20/month = 179.20 ÷ 30.4 = $5.89/day. Claimed by Google scaling (`google-search-v1.md:26`), Meta prospecting (`:314`) and the implied Meta raise (`:29`).

### B. Spend at each checkpoint (7 × days)

| Day | Spend | File says |
|---|---|---|
| 7 | $49.00 | $49 |
| 14 | $98.00 | $98 |
| 30 | $210.00 | "$213" (= 30.4 days) |
| 60 | $420.00 | "$426" (correct to $420) |

Most spent across both platforms before both day-60 stops, at start budgets: Google $1,200 + Meta $420 = **$1,620**.

### C. Retargeting pool bound (ASSUMPTION, `economics.md:43`)

- Google clicks/month without caps: 608/25 = 24.3 to 608/8 = 76 → about 24–75.
- With Google's caps and full spend: ≥ 64.35/month (Google audit, Appendix B).
- 90-day pool from Google alone: 3 × 24 = 72 to 3 × 75 = 225 visitors, before match-rate loss. Organic traffic is UNKNOWN.
- At $7/day against a pool of a few hundred, the day-14 frequency check (`:284`) is the likeliest first trigger. That's consistent with the file's own $7 → $4 change block.
