# Economics: what a lead is worth and when to stop

> **Budget cap (Josh, 2026-10-06): $300 a month total across all platforms.** Google Search $9.80/day ($297.92/mo: Trades $6.50/day, Services $3.30/day). Meta $0 for now. No increase without Josh's written OK. This overrides the $500–1,000 test range below.

Every number marked **ASSUMPTION** is a placeholder until real data replaces it. Every blank marked **JOSH** is something no agent may fill in.

## Observed deal sizes (private)

| Build | Real example | Price |
|---|---|---|
| Website | Lorenzen Motors (signed) | $1,250 |
| Website | San Julián's (proposal, not sent) | $2,500 |
| Product / web app | Credit Snitch (proposal) | $4,500 discovery, $75,000 Phase One |
| Dashboard | none yet | — |

## Josh's pricing decisions (2026-10-14)

- **Focused build (one tool or dashboard): from $5,000.** Public on `/for/` pages (claim T11). Josh confirmed that he and Reiss can deliver a genuinely useful focused build at that price.
- **Connected system (2–3 tools): typically $10,000–20,000.** Quoted in the written scope only, never on the site.
- **Care plan: about $250/month, optional.** Quoted in the scope.
- **Websites: separate,** never priced on trade pages.
- **Founding-client pricing for the first 3 clients:** private, in exchange for a case study and a care plan.

With a $5,000 floor and the illustrative 60% margin with half the first-job profit spent, max CAC is $1,500. At 1 in 5 qualified leads closing, that's $300 per qualified lead. That covers the $300/month budget.

## Inputs Josh fills in

| Route | Minimum price you'd accept from an ad lead | Typical price | Gross margin % (after your time is costed) | Share of first-job profit you'll spend to win the client |
|---|---|---|---|---|
| `/web-apps` | JOSH | JOSH | JOSH | JOSH |
| `/dashboards` | JOSH | JOSH | JOSH | JOSH |
| `/websites` | JOSH | JOSH | JOSH | JOSH |

| Account-wide input | Value |
|---|---|
| Share of form leads you expect to qualify | JOSH (ASSUMPTION until then: 50%) |
| Who gets the headroom under $1,000/mo: Google scaling, Meta retargeting, or Meta prospecting | JOSH |

Until these exist, the economics auditor returns **NO VERDICT** on cost-per-lead ceilings and says so.

## The formula

- **Max cost to acquire a client (CAC)** = typical price × gross margin × the share of first-job profit you're willing to spend to win it.
- **Max cost per qualified lead** = max CAC × qualified-lead-to-client rate.
- **Max cost per form lead** = max cost per qualified lead × share of form leads that qualify.

### Illustration only (ASSUMPTION, not a target)

Say a dashboard sells for $6,000 at 60% margin, and you'll spend half of that first-job profit to win it: max CAC = $1,800. If 1 in 5 qualified leads closes, max cost per qualified lead = $360. If half of form leads qualify, max cost per form lead = $180. At 1 in 10 closing it's $90.

Same math for a $1,250 website at 60% margin and half the profit: max CAC = $375; at 1 in 5 that's $75 per qualified lead and about $38 per form lead. **Google Search for "custom website development" rarely delivers leads that cheaply. A $1,250 website can't carry paid search on its own unless the minimum rises or the client becomes a hosting/retainer relationship.** That's why the websites ad group gets the smallest share.

## Budget math for the test

ASSUMPTION: US cost per click for custom-software terms of roughly $8–25, and 3–8% of clicks submitting the form. Validate both in Google Keyword Planner before launch and replace them here.

| Monthly spend | Clicks at $8–25 | Form leads at 3–8% |
|---|---|---|
| $500 | 20–62 | about 1–5 |
| $600 (v1 plan) | 24–75 | about 1–6 |
| $1,000 | 40–125 | about 1–10 |

At this budget **a confident verdict on cost per lead takes 6–10 weeks**, and a verdict on cost per client takes longer. The first month is for checking that the search terms are the right people and tracking works, not for judging the offer.

## Kill and scale criteria

From the ad-manager skill's `reference/diagnostics.md`, adapted to this budget.

| Rule | Trigger | Action |
|---|---|---|
| Learning period | First 7 days of any campaign or after a big change | No verdict. Only fix broken tracking or obviously wrong search terms. |
| Search terms check | Weekly | Add negatives for anything that isn't a buyer (jobs, tutorials, templates, DIY, a platform's own name). |
| Dead ad group | 30 days **or** $300 spent with zero form starts | Pause it. Write down why before restarting. |
| Weak ad group | 30 days, clicks but form starts under 2% of clicks | Check the landing page match (landing-auditor) before touching bids. |
| Dead campaign | 60 days with zero qualified leads | Pause. Rethink the offer or the keywords, not the bids. |
| Bidding switch | 15+ conversions in 30 days | Move from Maximize Clicks (with a CPC cap) to Maximize Conversions. |
| Scale | Cost per qualified lead under the ceiling for 4+ weeks **and** search impression share lost to budget > 20% | Raise budget by at most $5/day per week **across the whole account**, stated in dollars, and only while Google + Meta stay under $1,000/month combined. |
| Never scale | Cost per lead rising while spend rises | That's saturation. Hold or cut. |

## What "qualified" means (Josh to confirm)

ASSUMPTION until Josh edits it: a real business, a real project in one of the three build types, a budget conversation that doesn't end below the route's minimum price, and they book the scope call.
