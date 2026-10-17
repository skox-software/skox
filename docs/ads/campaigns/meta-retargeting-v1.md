# Meta retargeting v1

Written 2026-10-05 by the `meta-ads` agent, then revised the same day to fix the pre-launch audit findings (`docs/ads/audits/2026-10-05-{claims,economics,policy}-meta-retargeting-v1.md`). **Nothing here is live.** Josh does every click in Ads Manager. This file must pass `/ads-prelaunch meta-retargeting-v1` again before any money is spent.

Sources read: `docs/ads/README.md`, `offer.md`, `claims.md`, `copy-rules.md`, `economics.md`, `tracking.md`, `output/skox-hype/AD-UPLOAD.md`, `output/skox-hype/ad.html`, `content/landing.ts`, `components/ConversionForm.tsx`, `components/AdPixels.tsx`, `lib/meta-capi.ts`, the ad-manager rulebook (`ad_copy.md`, `change_playbook.md`, `diagnostics.md`, `gotchas.md`), and the three audit reports above.

---

## 1. Summary

| | |
|---|---|
| Goal | Bring back people who already visited the site (mostly from Google Search) and get them to submit the scope form. The test is whether a second touch turns visits into leads. It is not trying to find new people. |
| Budget | **$7.00 a day = $212.80 a month** (7 × 30.4). This is also the v1 **ceiling**. See section 1a. |
| Audience | US website visitors from the last 90 days (this includes the last 30 days), excluding anyone who fired `Lead` or visited `/scope-received` in the last 180 days. |
| Landing route | `/` (the homepage). It is the only route that carries both the 14-day and the 7-day promise (C08, C09), and retargeted visitors may have come in on any of the three routes. |
| Ads in v1 | **2:** Ad B `fixed-terms` (type-led static) and Ad C `compare-table` (static comparison table). The 20s video is **not in v1** (section 10). |
| Conversion | `Lead` (browser pixel + Conversions API, deduplicated by event ID). |

### 1a. Combined budget: start and ceiling

The $1,000 a month cap covers Google and Meta together.

| Line | Start $/day | Start $/month | Ceiling $/day | Ceiling $/month |
|---|---|---|---|---|
| Google Search (`google-search-v1`) | $20.00 | $608.00 | $25.50 | $775.20 |
| Meta retargeting (this file) | $7.00 | $212.80 | $7.00 | $212.80 |
| **Combined** | **$27.00** | **$820.80** | **$32.50** | **$988.00** |
| Room under $1,000 | | $179.20 | | $12.00 |

**Meta's v1 ceiling is $7.00 a day ($212.80 a month).** Meta only goes above that if Josh lowers Google's ceiling by the same amount, so the combined ceiling stays at $988.00. See the scale rule in section 7.

**Day-to-day overspend.** Meta can spend somewhat more than the daily budget on a given day and less on others. ASSUMPTION, not checked against a live Meta page: up to about 75% over on one day (about $12.25), with the week held to about 7 × $7.00 = $49.00. A $12 day is normal, not a fault. Judge spend by the week and the month.

### One ad set or two? One.

Run **a single ad set on the 90-day audience**. Build the 30-day audience too, but don't target it on its own yet. The reasons:

1. **The budget won't split.** Two ad sets at $3.50 a day each would each get too little delivery for Meta to optimise either one.
2. **The audiences overlap.** Everyone in the 30-day pool is also in the 90-day pool. Two ad sets would bid against each other for the same people.
3. **The pool is small.** Google at $608 a month buys about 24–75 clicks a month (`economics.md` ASSUMPTION). So the 90-day audience is probably in the hundreds at launch, not the thousands (UNKNOWN until Ads Manager shows the estimate). A 30-day ad set would be smaller still and might not deliver at all.
4. **Recency already happens inside one ad set.** People who visited recently are more active on Meta, so they tend to see the ad first anyway.

**When a split becomes possible (not in v1):** the 30-day audience is over 1,000 people **and** the Meta budget is at least $10.00 a day. At a $7.00 Meta ceiling, the second condition can only be met by moving $3.00 a day ($91.20 a month) from Google, which takes Google's ceiling from $25.50 to $22.50 a day ($775.20 → $684.00) and the scale rule in section 7 has to be met first. Without that move, there is no split.

---

## 2. Prerequisites

Nothing launches until every row says YES.

| # | Item | Status | How to confirm |
|---|---|---|---|
| P1 | Meta Business Manager (Business Portfolio) exists and owns the ad account and the pixel | UNKNOWN | business.facebook.com → Settings → Accounts |
| P1b | A SKOX Facebook Page exists, the Instagram account is connected, and both are linked to Business Manager (a Page is required to run any ad) | UNKNOWN | Settings → Accounts → Pages / Instagram accounts |
| P2 | Domain `skoxsoftware.com` verified in Business Manager (DNS TXT record added in Vercel) | UNKNOWN | Settings → Brand safety → Domains |
| P3 | `NEXT_PUBLIC_META_PIXEL_ID` set in Vercel **Production**, followed by a redeploy (a `NEXT_PUBLIC_` value is baked in when the site builds) | UNKNOWN | Vercel → skox → Settings → Environment Variables |
| P4 | `META_CAPI_TOKEN` set in Vercel Production | UNKNOWN | Same place. Without it `lib/meta-capi.ts:19` sends nothing, and only browser Leads count |
| P5 | `Lead` at the top of the event priority list (Aggregated Event Measurement) | UNKNOWN | Events Manager → the pixel → settings. If Meta no longer shows a priority list for web events, write that down and treat this row as moot |
| P6 | Test lead passes, following `tracking.md` → Test-lead procedure. **Use `utm_source=test`**, and in Meta check that `Lead` shows from both Browser and Server with one event ID | UNKNOWN | `audits/YYYY-MM-DD-tracking-test.md` exists and passes |
| P7 | `claims.md` signed by Reiss (initials and date). `claims.md:9` makes this a gate for the upload itself. | NOT SIGNED | `claims.md:9` |
| P8 | The B and C static creatives made from their briefs, and given a fresh claims and policy look once the PNGs exist | NOT MADE | `docs/ads/creative/meta-retargeting-v1-fixed-terms.md`, `-compare-table.md` |
| P9 | The 90-day audience shows an estimated size in Ads Manager, and Ads Manager doesn't say it's too small to deliver | UNKNOWN | Shown in step U3 below |
| P10 | Josh has opened each destination URL once on a phone and checked it loads | UNKNOWN | — |

### Tracking gap that shapes the audiences (from `tracking.md` Known gaps)

**Meta `PageView` fires only on the first page load, not when someone moves between pages inside the site** (`components/AdPixels.tsx:25`; the site is a Next.js app that changes pages client-side).

- **"All website visitors" audiences are fine.** Every visit starts with a full page load, which fires `PageView`. The 30-day and 90-day audiences below only use this rule.
- **Page-specific audiences would miss people.** A visitor who lands on `/` and then clicks through to `/dashboards` never sends a `PageView` for `/dashboards`. That's why v1 has no `/dashboards`, `/web-apps` or `/websites` audiences. Fix the gap before building any.
- **The `/scope-received` exclusion is mostly empty for the same reason.** The form goes there with `router.push` (`ConversionForm.tsx:218`), which is a client-side change, so `PageView` doesn't fire on it. Someone only gets into that audience if they reload the page or open it directly. **The `Lead`-event exclusion is the one doing the work.** The URL exclusion stays as a backstop because it costs nothing.
- To check during the P6 test lead: open Meta Pixel Helper, click from `/` to `/dashboards`, and see whether a second `PageView` fires. `tracking.md` says it doesn't. If it does, update `tracking.md`; the plan here doesn't change.

---

## 3. Settings

### Audiences (build these first: Ads Manager → Audiences → Create audience → Custom audience → Website)

| Name (exactly) | Source | Rule | Retention |
|---|---|---|---|
| `SKOX – Site visitors – 90d` | the SKOX pixel | Include people who meet: **All website visitors** | 90 days |
| `SKOX – Site visitors – 30d` | the SKOX pixel | Include: **All website visitors** | 30 days (built now so it fills up; not targeted in v1) |
| `SKOX – Lead – 180d` | the SKOX pixel | Include: **From your events → `Lead`** | 180 days |
| `SKOX – Scope received – 180d` | the SKOX pixel | Include: **People who visited specific web pages → URL contains `scope-received`** | 180 days |

### Campaign

| Setting | Value |
|---|---|
| Name | `SKOX – Retargeting – v1` |
| Buying type | Auction |
| Objective | **Leads** |
| Setup | Manual (not an Advantage+ leads campaign; see the audience note below) |
| Special Ad Categories | **None.** This isn't credit, employment, housing or politics. If Meta forces a category, stop and tell the agent why. |
| Advantage campaign budget | Off (there's one ad set, so the budget is set on the ad set) |
| A/B test | Off |

### Ad set

| Setting | Value |
|---|---|
| Name | `Visitors 90d – excl. leads 180d` |
| Conversion location | **Website** |
| Performance goal | Maximize number of conversions |
| Dataset / pixel | the SKOX pixel |
| Conversion event | **`Lead`** (never `LeadFormStarted`, `Contact` or `PageView` as the conversion; see `tracking.md`) |
| Cost per result goal | Leave blank |
| Budget | **Daily, $7.00** ($212.80 a month; this is also the v1 ceiling) |
| Schedule | Start the day after `/ads-prelaunch` passes. No end date; it gets reviewed at day 30. |
| Audience mode | **Switch to "Use original audience options."** Under Advantage+ audience, a custom audience is only a suggestion, and Meta may show the ad to people who never visited. That would make this a prospecting campaign by accident. |
| Custom audiences, include | `SKOX – Site visitors – 90d` |
| Custom audiences, exclude | `SKOX – Lead – 180d`, `SKOX – Scope received – 180d` |
| Locations | United States. "People living in or recently in this location." |
| Age | 25–65+ |
| Gender | All |
| Detailed targeting | None. **Advantage detailed targeting off.** |
| Languages | Leave blank |
| Placements | **Advantage+ placements** (Josh's decision). See "What to watch" for Audience Network. |
| Attribution setting | **7-day click, 1-day view.** View-through inflates the count. Anyone in this audience already knows SKOX, and many will come back through Google Search. If one of them scrolls past the ad and then submits through a Google ad, Meta can count a view-through Lead *and* Google counts a conversion for the same person. Steer by Josh's lead tally and the `utm_source` in each lead email, never by adding the two platforms together. |

### Optimisation goal: Josh decides

v1 is set to optimise for **`Lead`**, but the pixel has **no conversion history**. Meta wants about 50 conversions a week; this ad set will see single digits a month at best. So the goal mostly decides *who in the pool sees the ad first*, and a starved Lead goal can push delivery toward cheap placements.

| Option | What it does | Trade-off |
|---|---|---|
| **Keep `Lead`** (as written) | Meta optimises toward the real conversion from day one | It stays in learning; delivery may skew to cheap placements. Keeps the signal clean for later. |
| **Landing page views until 15 Leads in 30 days** | Performance goal "Maximize number of landing page views" until Josh's tally plus Meta show **15+ Leads in 30 days**, then switch to `Lead` (this mirrors Google's bidding switch in `economics.md`) | More reliable delivery to people who actually load the page. It doesn't learn from Leads until the switch, and the switch resets learning for a few days. |

**Josh picks one before upload and writes it here:** ________. Either way it's a rule: whichever goal he picks stays until the 15-Lead mark, and the switch (if any) gets its own change block.

### Ad-level settings (every ad)

| Setting | Value |
|---|---|
| Identity | SKOX Facebook Page and Instagram account (P1b) |
| Format | Single image |
| **Advantage+ creative enhancements** | **Turn all of them off**, including text improvements, adding overlays, brightness/contrast, music, image animation, "relevant comments" and site links. Each one can change or add text that hasn't been checked against `claims.md`. **Re-check after duplicating an ad**, because duplicating can reset some of these switches. |
| Multi-advertiser ads | Off |
| Website URL | the full URL with UTMs listed under each ad (paste it into Website URL as is; leave URL parameters empty) |
| Display link | `skoxsoftware.com` |
| Call to action | **Get quote** [9] (Meta's own button; it matches the page's "Get my price & timeline", `offer.md`) |
| Pixel tracking | Website events on, SKOX pixel |

---

## 4. Ads in v1

Character counts were checked with Python `len()`. In the primary text each line is one line break, and a line break counts as 1. Meta shows about the first 125 characters before "See more". **Every line that gives a 7-day or 14-day timing states its condition in the same sentence, inside the first 125 characters.** Ad B also carries the condition in its description. Ad C has no day promise.

There's one honest caveat about the three variants. At $212.80 a month this ad set will produce single-digit Leads at best, far below the 15 results per variant that `diagnostics.md` needs to name a winner. The three primary texts are loaded as **text options on one ad**, so they rotate and slow down fatigue. Nobody calls a winner from v1.

---

### Ad B — `fixed-terms` (static, type-led)

**Creative:** brief at `docs/ads/creative/meta-retargeting-v1-fixed-terms.md`. On the image: "Fixed price. Fixed date. Before you pay." (C03, C05).

**Destination:** `https://www.skoxsoftware.com/?utm_source=meta&utm_medium=paid_social&utm_campaign=retargeting-v1&utm_content=fixed-terms` [120]

**Primary text B-1 · speed bet** [195 total; condition ends at character 112]
- A 14-day focused dashboard build or a 7-day focused site build, once scope, content, data and access are agreed. [112] C08, C09 (with conditions)
- Custom web apps, dashboards and websites, built at speed. [57] C02, C01
- Get my price & timeline. [24] C11

**Primary text B-2 · certainty bet** [160 total]
- A fixed price, agreed in writing before you pay anything. [57] C03 (`landing.ts:191`)
- A delivery date set at kickoff, not re-estimated later. [55] C18
- The plan is yours, whether you hire us or not. [46] C19

**Primary text B-3 · people bet** [164 total]
- Talk to the builders. Work with the founders. [45] C06
- A 30-minute conversation with a founder, then a written scope, fixed price and delivery date. [93] C20, C03 (`landing.ts:258–259`; "then" keeps the call and the written scope as two steps, as on the site, `:203–209`)
- No deposit for the call. [24] C04 (the wording `claims.md` approves)

**Headlines** (≤40; what shows at 27 characters is in quotes)
- Custom web apps, dashboards and websites [40] C02 · "Custom web apps, dashboards"
- A delivery date set at kickoff [30] C18 · "A delivery date set at kick"
- Work with the two founders building it [38] C14, C06 · "Work with the two founders "

**Description:** Scope and access agreed first [29] C08/C09 condition

**CTA:** Get quote [9]

---

### Ad C — `compare-table` (static, comparison)

**Creative:** brief at `docs/ads/creative/meta-retargeting-v1-compare-table.md`. On the image: the site's comparison table, word for word from `landing.ts:143–177`, with the generic labels "Big dev shop" and "Freelancer or DIY" (C12–C16). No firm is named.

**Destination:** `https://www.skoxsoftware.com/?utm_source=meta&utm_medium=paid_social&utm_campaign=retargeting-v1&utm_content=compare-table` [122]

**Primary text C-1 · speed bet** [152 total] (the speed claim is the site's timeline row; no 7- or 14-day timing, so no day-promise condition is needed)
- Big dev shop: months. Freelancer: unpredictable. [48] C12
- SKOX: a delivery date in writing, before you pay. [49] C12, C03
- Free 30-minute scope call. No deposit. No obligation. [53] C04

**Primary text C-2 · certainty bet** [151 total]
- Between expensive and risky. [28] C16
- Big dev shop: high, often billed by the hour. Freelancer: low, but a gamble. [76] C13
- SKOX: fixed upfront, with no agency overhead. [45] C13

**Primary text C-3 · people bet** [162 total]
- Big dev shop: an account manager. Freelancer: one person, if they reply. [72] C14
- SKOX: the two founders building it. [35] C14
- Free 30-minute scope call. No deposit. No obligation. [53] C04

**Headlines**
- Between expensive and risky. [28] C16 · "Between expensive and risky"
- Fixed upfront, with no agency overhead [38] C13 · "Fixed upfront, with no agen"
- The two founders building it [28] C14 · "The two founders building i"

**Description:** Free scope call, no deposit [27] C04

**CTA:** Get quote [9]

---

## 5. Creative briefs

| Ad | Brief | Status |
|---|---|---|
| B | `docs/ads/creative/meta-retargeting-v1-fixed-terms.md` | In v1. Brief ready; asset not made. |
| C | `docs/ads/creative/meta-retargeting-v1-compare-table.md` | In v1. Brief ready; asset not made. |
| A (video) | `docs/ads/creative/meta-retargeting-v1-video-20s.md` | **Not in v1.** See section 10. |

---

## 6. Upload steps (Josh clicks)

**U1. Build the audiences.** Ads Manager → ☰ → Audiences → Create audience → Custom audience → Website → choose the SKOX pixel. Create the four audiences in the table in section 3, one at a time, with the exact names and retention days. Wait until each one shows "Ready" or "Populating".

**U2. Create the campaign.** Campaigns tab → **+ Create** → **Leads** → Continue → Manual leads campaign (if Meta asks) → name it `SKOX – Retargeting – v1` → Special Ad Categories: none → Advantage campaign budget off → A/B test off → Next.

**U3. Set up the ad set.**
1. Name it `Visitors 90d – excl. leads 180d`.
2. Conversion location: **Website**. Performance goal: whatever Josh chose in "Optimisation goal" (section 3). Dataset: the SKOX pixel. If the goal is Leads, the conversion event is **Lead**.
3. Budget: **Daily, $7.00**. Schedule: start date the day after the prelaunch pass, no end date.
4. Audience: click **Switch to original audience options** (it might say "Use original audience options").
5. Custom audiences → include `SKOX – Site visitors – 90d`. Click **Exclude** → add `SKOX – Lead – 180d` and `SKOX – Scope received – 180d`.
6. Locations: United States. Age 25 to 65+. Gender all. Detailed targeting empty; Advantage detailed targeting **unchecked**.
7. **Write down the estimated audience size** shown on the right, and put it in "Record of what was set" at the end of this file. If Meta says the audience is too small to deliver, **stop here** and tell the agent.
8. Placements: **Advantage+ placements**.
9. Attribution setting (under Optimization & delivery → Show more options): **7-day click, 1-day view**.
10. Next.

**U4. Create Ad B (`fixed-terms`).**
1. Ad name `fixed-terms`. Identity: the SKOX Page and Instagram account. Turn **Multi-advertiser ads off**.
2. Ad setup: Single image. Media: upload the 1:1 (or 4:5) PNG and the 9:16 PNG. Use **placement asset customization** so Feeds get the 1:1 or 4:5, and Stories/Reels get the 9:16.
3. Primary text: click **Add text options** and paste B-1, B-2 and B-3, line breaks included.
4. Headline: add the three Ad B headlines. Description: `Scope and access agreed first`.
5. Website URL: paste the Ad B destination URL. Display link: `skoxsoftware.com`. Call to action: **Get quote**.
6. **Advantage+ creative:** open "Standard enhancements" / "Optimize creative for each person" and **turn every option off**. Check that the preview shows no overlays and no rewritten text.
7. Tracking: Website events on, SKOX pixel.

**U5. Create Ad C (`compare-table`).** Click **Duplicate** on Ad B and rename it `compare-table`. Replace the media with the comparison-table PNGs. Replace the three primary texts with C-1, C-2 and C-3, the headlines with the Ad C headlines, the description with `Free scope call, no deposit` and the URL with the Ad C destination. **Open Advantage+ creative again and check every enhancement is still off**, because duplicating can reset them.

**U6. Review, then publish.** Open each preview: Facebook Feed, Instagram Feed, Instagram Reels and Stories. Check that no text sits under the Reels UI. Click **Publish** only after the `/ads-prelaunch` audit file says GO.

---

## 7. What to watch, the kill rule and the scale rule

Josh's lead tally means: lead emails whose journey shows `utm_source=meta`, or an `fbclid`, and `utm_campaign=retargeting-v1`. Record the build type each lead picked on the form too, since `/` takes all three. Put the tally next to Meta's "Results" every time, and **steer by the tally**.

Spend at each checkpoint is 7 × days: day 7 = $49, day 14 = $98, day 30 = $210, day 60 = $420.

| When | Look at | What it means and what to do |
|---|---|---|
| **Day 7** ($49) | Is it spending about $49 for the week? (Single days above $7, up to about $12, are normal.) Any ad rejected? Frequency? Is `Lead` still deduplicated (Events Manager)? | **No verdict on performance.** Fix only what's broken: rejection, no delivery, tracking. If it's spending under $3 a day across the week, the audience is too small to deliver; report the audience size. |
| **Day 14** ($98) | Frequency over 7 days and over the period so far. Link CTR. Placement breakdown (Breakdown → By delivery → Placement). | **Watch: frequency above 3 over 30 days** (the `diagnostics.md` threshold) means the pool is wearing out. **Act: frequency above 4 in 7 days.** The fix is a smaller budget, not new targeting. Bring Josh a change block: *"Reduce `Visitors 90d – excl. leads 180d` from $7.00 a day ($212.80 a month) to $4.00 a day ($121.60 a month). Saves $91.20 a month. Expected effect: same people reached, less repetition."* **Audience Network** taking over 20% of spend with no link clicks that reach the site gets noted for v2. Placements stay Advantage+ in v1 because that's Josh's decision. |
| **Day 30** ($210) | Josh's tally vs Meta Results. Cost per lead by the tally. Link clicks. Form starts (`LeadFormStarted`, a diagnostic only). | One or more leads in the tally: keep running. **Form starts under 2% of link clicks** (`LeadFormStarted` ÷ link clicks): run the landing-auditor before touching the ads (`economics.md` weak rule). **Zero leads but form starts:** run the landing-auditor. Zero of both: see the kill rule. After 14 days, write the observed CPM, link CTR and Leads into `economics.md` as dated ASSUMPTION rows. |

**Kill rule.**
- **Pause the campaign** at **day 30 or $210 spent, whichever comes first**, if Josh's tally shows **zero leads and Meta shows zero `LeadFormStarted`**. Write down why in a review file before restarting.
- **Pause** at **day 60 ($420 spent)** if the tally still shows **zero qualified leads**, even when there are form fills.
- Cost-per-lead ceilings are blank until Josh fills in the JOSH fields in `economics.md`. Until then the economics verdict is NO VERDICT, and only the zero-lead rules above apply. Once the ceilings exist, judge each Meta lead against the ceiling for the build type it chose, never against one blended number.

**Scale rule.**
- **Meta's ceiling is $7.00 a day ($212.80 a month)** until Josh moves money from Google. The combined ceiling stays at **$988.00 a month** (section 1a).
- **Any raise comes out of Google's share**, stated in dollars for both lines. For example: *"Raise Meta from $7.00 to $12.00 a day ($212.80 → $364.80 a month, +$152.00). Lower Google's ceiling from $25.50 to $20.50 a day ($775.20 → $623.20 a month, −$152.00). Combined ceiling unchanged at $988.00."* That's one change block and one yes for the pair.
- **Only when all of these are true:** cost per qualified lead (by Josh's tally) is under the `economics.md` ceiling for 4+ weeks; frequency is **3 or under over 30 days**; and cost per lead is **not rising**.
- **At most +$5.00 a day per week** ($152.00 a month), per `economics.md` (Kill and scale criteria, "Scale" row).
- **Never raise while cost per lead is rising**, or while frequency is above 3 over 30 days. At this audience size there are no more people to buy, only more repeats.
- Until the ceilings exist in `economics.md`, the first condition can't be met, so **no raise is possible in v1**.

---

## 8. Weekly review recipe

1. Ads Manager → **Reports** → Create report → Export table data (CSV).
2. Level: **Ad**. Columns, in this order: Campaign name, Ad set name, Ad name, Amount spent (USD), Reach, Frequency, Impressions, Link clicks, CTR (link click-through rate), CPC (cost per link click), Results, Cost per result. Add the custom conversion column for `LeadFormStarted` if it's available.
3. Export two files: **Last 7 days** and **Last 30 days**.
4. Hand both files, plus the week's lead tally (how many lead emails had `utm_source=meta`, which build type each chose, and which qualified), to the `meta-ads` agent. It writes `docs/ads/reviews/YYYY-MM-DD-meta.md` with one change block per change, in dollars before and after.

---

## 9. Prospecting v2: not yet

A stub, so nobody starts it early.

**Entry criteria (all of them):**
1. Retargeting v1 has run **30 days**.
2. Events Manager shows `Lead` **deduplicated across Browser and Server** for real leads, not just the test.
3. Josh's lead tally exists for those 30 days, next to Meta's Results.
4. The JOSH fields in `economics.md` (minimum price, typical price and margin per route) are filled in, so a cost-per-lead ceiling exists.
5. `claims.md` is signed by Reiss.
6. **The money comes out of Google's share.** At the ceilings in section 1a, only $12.00 a month is left under $1,000, so prospecting can only run if Josh lowers Google's ceiling by the same amount. For example, prospecting at $5.00 a day ($152.00 a month) means Google's ceiling goes from $25.50 to $20.50 a day ($775.20 → $623.20). That gets its own change block in dollars.

**Shape (to decide then, not now):** US, broad targeting or an interest audience built around business owners and operators. Land on the route that matches the creative (`/dashboards` for a dashboard creative). Use the best-performing static from v1. No lookalikes until a few dozen leads exist.

**Kill rule (written now so it can't drift):** pause prospecting at **30 days or $150 spent (at $5.00 a day), whichever comes first, with zero leads in Josh's tally**. Pause at **45 days with zero qualified leads**. Cold Meta traffic for custom software is weaker than search, so this is a test with a hard stop, not a channel to grow.

---

## 10. Not in v1: the 20s video (Ad A)

**Status: BLOCKED.** The creative file `docs/ads/creative/meta-retargeting-v1-video-20s.md` has the line-by-line audit and the full recut spec. The video comes back as a v2 ad only after Reiss signs the lines below, or a recut fixes them, and the claims and policy auditors pass the recut.

### The 14 claim blockers (from the claims audit)

| # | Time (s) | On screen | Problem | Recut fix |
|---|---|---|---|---|
| 1 | 15.75–16.17 | "No lock-in." | NEEDS REISS; no site line says it | Cut it. Keep "No account managers. / No hourly billing." (C14, C13) |
| 2 | 0.00–0.94 | "THEY QUOTED YOU" / "QUARTERS?" | NEEDS REISS | Reiss signs, or cut |
| 3 | 0.94–1.88 | "BUILT IN DAYS." | NEEDS REISS | Reiss signs, or cut |
| 4 | 16.41–16.75 | "TWO FOUNDERS · NOBODY IN BETWEEN" | NEEDS REISS | "WORK WITH THE FOUNDERS" (C06) |
| 5 | 0.12–0.94 | "A DISCOVERY PHASE. A RANGE. AN HOURLY RATE." | Not in claims (only "hourly" has a source, C13) | "OFTEN BILLED BY THE HOUR." (C13), or drop it |
| 6 | 1.88–2.81 | "A live dashboard." | Not in claims; next to "14 DAYS" it reads as a promise | "Focused dashboard build." (C08) |
| 7 | 2.81–3.75 | "A new website." | Not in claims | "Focused site build." (C09) |
| 8 | 5.39–7.27 | "One dashboard. Every location." | Not in claims | "Location & team performance views" (C21) |
| 9 | 6.56–7.50 | "LIVE." stamp | Not in claims; implies a delivered system on SAMPLE data | Drop it, or use "SAMPLE" |
| 10 | 7.97–8.20 | "MVPs." | Not in claims | Drop it ("First versions." only if Reiss signs it) |
| 11 | 8.75–9.38 | "Whatever's next." | Not in claims | "Your next big thing." (C01) |
| 12 | 9.38–11.25 | "Every system in." / "One number out." | Not in claims | "Connected data from your existing tools" / "One clear view of your business" (C21, C22) |
| 13 | 9.38–11.25 | Chip "Anything with an API" | Not in claims; suggests SKOX can connect anything | "Your other tools" |
| 14 | 0.94–3.75 | "BUILT IN DAYS." + "14 DAYS" + "07 DAYS" | C08/C09 condition never on screen. The ad description doesn't reliably show in Stories/Reels, so this plays as an unconditional day promise. | On screen under each: "Data and access agreed first" / "Content and access agreed first" (C08/C09 conditions) |

### Reels safe-zone problem (policy audit blocker 3)

The 9:16 file was laid out for YouTube Shorts. Meta's Stories/Reels UI covers the **top 14% (0–269 px)**, the **bottom 35% (1248–1920 px)** and about **65 px on each side**. These sit under it: the "14-DAY FOCUSED DASHBOARD BUILD" / "7-DAY FOCUSED SITE BUILD" qualifier (y≈1380), "One number out." (y≈1440), the lower written-scope rows and the "AGREED IN WRITING" stamp (y≈1260–1470), and the caption chip (y≈205). **Recut: every key text inside x 65–1015, y 269–1248.**

### Also in the recut

- The end card's pill-shaped "Get my price & timeline ↗" button is a fake-button risk under Meta's non-existent functionality rule (policy N1). Make it plain text, or drop it; Meta adds its own Get quote button.
- The strike-through runs across all three "No …" lines, so crossing out "No account managers." can read as the opposite claim. Strike only the noun, or don't strike.
- Render as `output/SKOX-ad-20s-meta-1x1.mp4` and `output/SKOX-ad-20s-meta-9x16.mp4`, so the Google kit stays as it is.

### Ad A copy, kept for when it's unblocked (already checked, 0 blockers in the claims audit)

Destination `https://www.skoxsoftware.com/?utm_source=meta&utm_medium=paid_social&utm_campaign=retargeting-v1&utm_content=video-20s` [118]

- **A-1 speed** [169; condition ends at character 115]: A 14-day focused dashboard build. [33] C08 / A 7-day focused site build. [27] C09 / Both once scope, content, data and access are agreed. [53] C08, C09 / Free 30-minute scope call. No deposit. No obligation. [53] C04
- **A-2 certainty** [174]: A fixed price and a delivery date, agreed in writing before you pay. [68] C03 / The date is set at kickoff, not re-estimated later. [51] C18 / Free 30-minute scope call. No deposit. No obligation. [53] C04
- **A-3 people** [133]: Talk to the builders. Work with the founders. [45] C06 / No account managers. No hourly billing. [39] C14, C13 / You own the code and the accounts from day one. [47] C07
- **Headlines:** 14-day focused dashboard build [30] C08 · Fixed price. Fixed date. Before you pay. [40] C03, C05 · Talk to the builders, not a manager [35] C06, C14
- **Description:** Scope and access agreed first [29] · **CTA:** Get quote [9]

---

## Record of what was set (Josh fills in at launch)

| Field | Value |
|---|---|
| Launch date | |
| Optimisation goal chosen (Lead, or landing page views until 15 Leads) | |
| 90-day audience estimate at launch | |
| 30-day audience estimate at launch | |
| Ads live | |
| `/ads-prelaunch` audit file | |
