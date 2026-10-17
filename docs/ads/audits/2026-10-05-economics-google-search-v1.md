# Economics auditor — google-search-v1 — 2026-10-05

**Verdict:** FAIL (1 blocker, a one-table fix). **Cost-per-lead ceilings: NO VERDICT (missing input).**

The starting budget is fine: $20.00/day = $608.00/month, and with Meta retargeting the total is $820.80/month, inside $500–1,000. Daily × 30.4 matches the monthly figure on every row. The split favours the higher-value routes, and the bidding setup is right. What fails is the **ceiling** plan. Google's $33/day ceiling was written as if Google had the whole $1,000. Next to Meta at $7/day it reaches **$1,216.00/month, $216.00 over the cap**. No ceiling can be computed because every JOSH field in `economics.md` is blank, so no scale or cost-based kill verdict is possible yet.

## Blockers

| # | Where | Problem | Rule or source | Fix |
|---|---|---|---|---|
| 1 | `google-search-v1.md:19–26` (budget table, ceiling columns), and the scale rule at `:26` and `:454` | The ceiling is $33.00/day = $1,003.20/month. On its own that's $3.20 over the README's $1,000 test cap. Running together with `meta-retargeting-v1` at $7.00/day ($212.80/month), the combined ceiling is **$40.00/day = $1,216.00/month, $216.00 over**. Even after Meta's day-14 cut to $4.00/day, it's $37.00/day = $1,124.80/month, $124.80 over. The scale rule ("at most $5/day per week") also doesn't say whether that's per campaign or per account. Read per campaign, all three could rise in the same week: +$15/day = +$456.00/month in one step. | Agent check 1 (within $500–1,000 unless Josh changed it). `README.md:9`. `economics.md:60` | Restate the Google ceiling as a **combined** figure. The most both platforms can spend together is $1,000 ÷ 30.4 = **$32.89/day**. With Meta at $7.00, Google's ceiling is at most **$25.89/day ($787.20/month)**. One option that keeps 45/35/20: Web apps $11.50 ($349.60), Dashboards $9.00 ($273.60), Websites $5.00 ($152.00), total **$25.50/day = $775.20/month**, combined with Meta **$988.00/month**. That uses up the ~$179 Meta's v2 prospecting stub plans to spend (`meta-retargeting-v1.md:314`), so Josh picks which one gets the headroom. Also write "$5/day per week **across the account**". Josh can raise the cap instead, but it has to be his decision, written into `README.md`. |

## Non-blockers

| # | Where | Problem | Suggestion |
|---|---|---|---|
| 1 | `:19–24`, `:85`, `:96` | **Websites at $4.00/day ($121.60/month) is within Josh's 20%, but the illustration in `economics.md` says it can't pay back.** At the $6.00 cap and 3–8% form rate (ASSUMPTION), a form lead costs $75–200. The illustrative $1,250 website carries about $38 per form lead at a 1-in-5 close, or about $19 at 1-in-10 (Appendix D). That's 2–10× over. This is the ILLUSTRATION, not a ceiling, so it isn't a verdict. | Not a blocker: the share is Josh's and `economics.md:34` approves it as the smallest. When Josh fills in the Websites row, if the minimum stays near $1,250, consider running Websites at $0 and moving its $121.60 to Dashboards. Websites' $6.50 ceiling should be the last place any scale money goes. |
| 2 | `:33`, `economics.md:43` | The CPC caps cut off the $8–25 ASSUMPTION range. With caps at $12/$10/$6, no click can cost $25, so the "24–75 clicks" range can't happen as written. Two outcomes: either the budgets spend in full at ≥64 clicks/month (Appendix B), or, if the real auction sits at $8–25, the campaigns **underspend**, Websites most of all (its $6 cap is below the $8 floor). | Keep the caps; they protect the money. Once the Keyword Planner numbers are in, restate the expected clicks as "≥ budget ÷ cap, if it spends". Treat "spending under half of budget" (`:448`) as the expected week-2 signal for Websites, not a surprise. |
| 3 | `:80` | "Roughly 1–3 clicks a day per campaign" is about 2–3× too high. At full spend under the ASSUMPTION range, Web apps gets 0.75–1.13 clicks/day, Dashboards 0.70–0.88, and Websites about 0.67 at its cap. That's about 0.8–2.5/day across the whole **account** (Appendix B). | Change the wording. This makes the "don't narrow the schedule" call stronger. |
| 4 | `:32`, `:456` | The 60-day dead-campaign rule is stated in days only. | Add the dollars: day 60 at start budgets is **$1,200.00** on Google (20 × 60). Together with Meta's day-60 stop ($420.00), **$1,620.00** is the most the test spends before either platform's hard stop, if it never scales. |
| 5 | `:454` | The "never scale while cost per lead is rising" rule from `economics.md:61` isn't written into the campaign file. | Add one line under Week 4: "Never raise a budget while cost per lead is rising with spend. Hold or cut." |
| 6 | `:28` | The 2× daily overspend is stated correctly. Here's what it means in dollars: one Google day can reach **$40.00** at start budgets and **$66.00** at the written ceiling. | Mention it, so a $40 day in week 1 doesn't look like a broken budget. The monthly cap still applies: average daily budget × 30.4. |

## Ceilings — NO VERDICT

Every input that sets a ceiling is blank. I haven't filled any of them. These blanks block it:

1. `economics.md:18` `/web-apps`: minimum price, typical price, gross margin % (JOSH ×3)
2. `economics.md:19` `/dashboards`: minimum price, typical price, gross margin % (JOSH ×3). There's no observed dashboard deal either (`economics.md:12`).
3. `economics.md:20` `/websites`: minimum price, typical price, gross margin % (JOSH ×3)
4. **The share of first-job profit Josh will spend to win a client.** The formula needs it (`economics.md:26`), but the inputs table has **no column for it**. Only the illustration uses one ("half"). Add it as a JOSH column.
5. **The share of form leads that qualify.** The formula needs it (`economics.md:28`), and it exists only as the illustration's "half". This becomes a measured number once the lead tally runs. Until then Josh states a planning figure, or it stays blank.
6. The definition of "qualified" (`economics.md:63–65`) is still ASSUMPTION, "Josh to confirm".

The close rates are set by this audit's brief at 10% and 20%. Once 1–5 exist, the formula in Appendix D gives max CAC, max cost per qualified lead and max cost per form lead for each route at both rates.

## Time to verdict (ASSUMPTION-based; full arithmetic in Appendix B–C)

- **Bidding switch (15 conversions in 30 days, per campaign): not reachable at this budget, or at the ceiling.** It would take $1,125–6,000/month **per campaign** (15 × cost per lead). That agrees with the file's own "honest expectation" (`:100`). Maximize Clicks is v1's permanent state.
- **15 conversions in total (not in a 30-day window):** about 10–34 weeks for the account. Per campaign: Web apps about 24–95 weeks, Dashboards about 31–102, Websites about 40–107.
- **A first meaningful cost-per-lead read** (I've set it at ≥5 form leads: ASSUMPTION, the auditor's threshold): about **3–11 weeks for the account**, which fits `economics.md`'s 6–10 weeks. Per campaign: Web apps about 8–32 weeks. **In v1, cost per lead can only be judged across the whole account, not per campaign.**
- The volume rules come first: each campaign's 30-day dead rule fires at day 30 (Web apps $270, Dashboards $210, Websites $120), before any campaign reaches $300.

## Kill and scale rules — present, match `economics.md`

| Rule (`economics.md`) | In the campaign file | Match |
|---|---|---|
| Learning period, 7 days | `:440–441` | Yes |
| Weekly search-terms check | `:444`, `:446` | Yes |
| Dead ad group: 30 days or $300, zero form starts | `:452` (per campaign = per ad group, 1:1) | Yes |
| Weak: form starts < 2% of clicks | `:453` | Yes |
| Dead campaign: 60 days, zero qualified | `:32`, `:456` | Yes (add the $1,200, non-blocker 4) |
| Bidding switch at 15 in 30 days | `:84`, `:455` | Yes, counted per campaign |
| Scale: under ceiling 4+ weeks and IS lost to budget > 20%, +$5/day per week | `:26`, `:454` | Yes, but per-campaign vs per-account is ambiguous (blocker 1) |
| Never scale when cost per lead is rising | Missing | Non-blocker 5 |

## Bidding fit — PASS

Maximize Clicks with a maximum CPC bid limit on each campaign ($12 / $10 / $6, `:92–96`). No Maximize Conversions or Target CPA until 15 conversions are on record (`:84`). Each campaign switches on its own count.

## Inputs I could not check

- Real CPCs and search volumes. Keyword Planner hasn't been run (`:325–327` is empty). Every CPC here is the `economics.md` ASSUMPTION.
- Real form-submit rate. 3–8% is ASSUMPTION (`economics.md:38`).
- Whether Josh meant the $1,000 cap to cover Google and Meta together. `README.md:9` says "$500–1,000 a month while testing", with no per-platform split. I read it as the total, as the brief instructs.
- Google's daily-overspend and monthly-cap behaviour as it works today (no web access). I relied on the campaign file's own statement at `:28`.

## Sources read

- `/Users/josh/SKOX/.claude/agents/economics-auditor.md`
- `/Users/josh/SKOX/docs/ads/campaigns/google-search-v1.md`
- `/Users/josh/SKOX/docs/ads/campaigns/meta-retargeting-v1.md` (for the combined budget)
- `/Users/josh/SKOX/docs/ads/economics.md`
- `/Users/josh/SKOX/docs/ads/offer.md`
- `/Users/josh/SKOX/docs/ads/README.md`
- `/Users/josh/.claude/plugins/synced/952e6b41-8da7-4419-b95c-d5efe950b3f1_642b0eb8-fc79-4cd2-a00e-4f3eba31eaaf/small-business/skills/ad-manager/reference/diagnostics.md`
- `/Users/josh/.claude/plugins/synced/952e6b41-8da7-4419-b95c-d5efe950b3f1_642b0eb8-fc79-4cd2-a00e-4f3eba31eaaf/small-business/skills/ad-manager/reference/gotchas.md`

---

## Appendix: worked numbers

### A. Budget arithmetic (all from `google-search-v1.md:19–24` and `meta-retargeting-v1.md:14`)

| Line | $/day | × 30.4 | $/month | File says | OK |
|---|---|---|---|---|---|
| Web apps start | 9.00 | 9 × 30.4 | 273.60 | 273.60 | Yes |
| Dashboards start | 7.00 | 7 × 30.4 | 212.80 | 212.80 | Yes |
| Websites start | 4.00 | 4 × 30.4 | 121.60 | 121.60 | Yes |
| **Google start** | 20.00 | 20 × 30.4 | **608.00** | 608.00 | Yes |
| Web apps ceiling | 15.00 | | 456.00 | 456.00 | Yes |
| Dashboards ceiling | 11.50 | | 349.60 | 349.60 | Yes |
| Websites ceiling | 6.50 | | 197.60 | 197.60 | Yes |
| **Google ceiling** | 33.00 | | **1,003.20** | 1,003.20 | Yes |
| Meta retargeting | 7.00 | 7 × 30.4 | 212.80 | "about $213" | Yes |

Shares at the start: 9/20 = 45%, 7/20 = 35%, 4/20 = 20%. At the ceiling: 15/33 = 45.5%, 11.5/33 = 34.8%, 6.5/33 = 19.7%.

**Combined, against the $1,000 cap**

| Scenario | Google $/day | Meta $/day | Total $/day | $/month | vs $1,000 |
|---|---|---|---|---|---|
| Both at start | 20.00 | 7.00 | 27.00 | 820.80 | $179.20 under |
| Google at ceiling, Meta at start | 33.00 | 7.00 | 40.00 | 1,216.00 | **$216.00 over** |
| Google at ceiling, Meta cut to $4 (Meta day-14 block) | 33.00 | 4.00 | 37.00 | 1,124.80 | **$124.80 over** |
| Most possible within the cap | — | — | 1,000 ÷ 30.4 = 32.89 | 999.86 | — |
| Google's most, with Meta at $7 | 32.89 − 7 = 25.89 | 7.00 | 32.89 | 787.20 + 212.80 = 1,000.00 | — |
| Suggested: 11.50 / 9.00 / 5.00 | 25.50 | 7.00 | 32.50 | 775.20 + 212.80 = 988.00 | $12.00 under |

Headroom over the start budgets: $179.20/month = $5.89/day. That's one $5/day scale step. Google scaling and Meta's v2 prospecting (`meta-retargeting-v1.md:314`) both want the same $179.20.

**Biggest single day** (Google can spend 2× daily, `google-search-v1.md:28`): 2 × $20 = $40.00 at the start, 2 × $33 = $66.00 at the ceiling.

**Spend before the hard stops (start budgets):** Google day 30 by campaign: 9 × 30 = $270, 7 × 30 = $210, 4 × 30 = $120. Google day 60: 20 × 60 = $1,200. Meta day 60: 7 × 60 = $420. Total: $1,620.

### B. Click and lead volume (ASSUMPTION: CPC $8–25, form rate 3–8%, `economics.md:38`; CPC can't go above each cap)

CPC range used = [$8 ASSUMPTION floor, campaign cap]. Websites' $6 cap is below the $8 floor, so I only compute it at $6, the most a click can cost.

| Campaign | $/month | Clicks = $ ÷ CPC | Clicks/day (÷ 30.4) | Leads at 3% (low clicks) | Leads at 8% (high clicks) | Cost per lead = CPC ÷ rate |
|---|---|---|---|---|---|---|
| Web apps | 273.60 | ÷12 = 22.80; ÷8 = 34.20 | 0.75–1.13 | 22.80 × 0.03 = 0.68 | 34.20 × 0.08 = 2.74 | 8/0.08 = $100 to 12/0.03 = $400 |
| Dashboards | 212.80 | ÷10 = 21.28; ÷8 = 26.60 | 0.70–0.88 | 0.64 | 2.13 | $100 to 10/0.03 = $333 |
| Websites | 121.60 | ÷6 = 20.27 (at least, if it spends) | 0.67 | 0.61 | 20.27 × 0.08 = 1.62 | 6/0.08 = $75 to 6/0.03 = $200 |
| **Account** | 608.00 | **≥ 64.35** | **≥ 2.1** | **1.93** | **6.49** | — |

Without the caps (`economics.md:43`): 608/25 = 24.3 to 608/8 = 76 clicks, 0.73–6.08 leads. If the real auction runs above the caps, expect the budget to go **unspent**, not fewer, pricier clicks.

### C. Time to verdict (months × 4.34 weeks; 30.4 ÷ 7 = 4.34)

| Target | Level | Best (high leads) | Worst (low leads) |
|---|---|---|---|
| 15 conversions in 30 days (switch) | per campaign | Needs 15 × CPL/month: Web apps 15 × $100–400 = $1,500–6,000; Dashboards $1,500–5,000; Websites 15 × $75–200 = $1,125–3,000. Budgets are $273.60 / $212.80 / $121.60. **Not reachable.** | — |
| 15 cumulative | Account | 15 ÷ 6.49 = 2.31 mo = 10.0 wk | 15 ÷ 1.93 = 7.77 mo = 33.7 wk |
| 15 cumulative | Web apps | 15 ÷ 2.74 = 5.47 mo = 23.8 wk | 15 ÷ 0.68 = 21.9 mo = 95 wk |
| 15 cumulative | Dashboards | 15 ÷ 2.13 = 7.05 mo = 30.6 wk | 15 ÷ 0.64 = 23.5 mo = 102 wk |
| 15 cumulative | Websites | 15 ÷ 1.62 = 9.25 mo = 40.2 wk | 15 ÷ 0.61 = 24.7 mo = 107 wk |
| ≥5 leads (CPL read; threshold is ASSUMPTION) | Account | 5 ÷ 6.49 = 0.77 mo = 3.3 wk | 5 ÷ 1.93 = 2.59 mo = 11.2 wk |
| ≥5 leads | Web apps | 5 ÷ 2.74 = 1.83 mo = 7.9 wk | 5 ÷ 0.68 = 7.31 mo = 31.7 wk |

### D. Ceiling formula, ready for Josh's numbers (`economics.md:24–28`)

- Max CAC = typical price × gross margin × share of first-job profit spent (**all blank**)
- Max cost per qualified lead = max CAC × close rate → at 10%: × 0.10; at 20%: × 0.20
- Max cost per form lead = max cost per qualified lead × share of form leads that qualify (**blank**)

**The ILLUSTRATION from `economics.md:32–34`, for scale only. ASSUMPTION. Not a ceiling.**

| Illustration | Max CAC | ÷ qualified at 20% | ÷ qualified at 10% | Form lead (× 0.5) at 20% / 10% |
|---|---|---|---|---|
| Dashboard $6,000 × 60% × 50% | $1,800 | $360 | $180 | $180 / $90 |
| Website $1,250 × 60% × 50% | $375 | $75 | $37.50 | $37.50 / $18.75 |

Compare the Websites cost per form lead in B: $75–200. The illustration's $1,250 website pays back only if the minimum price rises, or if hosting or care revenue (`offer.md:60–61`: $59/month, $249/month) is counted in "typical price".
