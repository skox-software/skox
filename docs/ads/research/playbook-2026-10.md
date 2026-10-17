# What's winning in our space, and what SKOX copies

Synthesis of three research passes on 2026-10-05:
- `meta-ad-library-2026-10.md`: Meta Ad Library, US, active ads, "winner" = live 60+ days
- `google-ads-2026-10.md`: live search ads for 8 queries, plus Google Ads Transparency Center for 7 advertisers
- `landing-offers-2026-10.md`: 10 competitor landing pages and offers

**Limits.** Apify was over its monthly limit, so all three passes used the browser and public endpoints instead. There is no spend, reach or click data. "Days running" only suggests an ad is profitable; it doesn't prove it. The search snapshots came from one location on one day. Quotes are short and should be re-checked on the live page before reuse.

## The five findings that matter

1. **Most of our Google searches are uncontested.** No ads showed for "field service KPI dashboard", "HVAC KPI dashboard", "custom quoting software for contractors", "custom dashboard development" or "custom software for service business". The organic results are Excel templates and listicles. Low competition usually means cheap clicks, but also low volume; Keyword Planner has to confirm volume.
2. **"Franchise reporting dashboard" is crowded, and it's the wrong buyer.** The advertisers there sell to franchisors (head office), not to the owner of several units. Skip that query at first.
3. **The field-service software giants are now selling our pitch.** Jobber launched a "did we have a good month shouldn't need a spreadsheet" style ad on 2026-09-21, running 12 versions. The buyer responds to the visibility pain. But those tools only combine locations when every location uses their software, and often only on an enterprise or head-office tier. **SKOX's gap is one view across different systems, per location, owned by the client and not rented.**
4. **The longest-running ads in this market give something away.** Free quote templates and price-list templates have run for 1–4 years. That's the strongest signal in the whole set, and it needs no client proof.
5. **Nobody advertises multi-location dashboards to unit owners on Meta.** The space is open, but there's no proven hook for that exact buyer yet, so the first ads are tests.

## Winning patterns, and how SKOX uses them

| Pattern seen | Who runs it, roughly how long | SKOX version | Allowed now? |
|---|---|---|---|
| A free template as the offer | Jobber quote templates (about 4 years); ServiceTitan trade templates (439 days) | A free **"Monday locations scorecard"**: a spreadsheet that puts every location's revenue, jobs, labour and ad spend side by side. Gated by email. It's the manual version of the dashboard, so the people who download it are exactly the buyers. | Needs building. New claims for the template's page. |
| A separate headline and URL per trade | ServiceTitan "Estimating App For HVAC" (938 days) | Ad groups per trade (HVAC, plumbing, pest, pool, cleaning), each landing on the same page with the trade in the H1 | Needs trade variants on the landing page. Reiss to sign the audience labels. |
| Kill-the-spreadsheet, one view | AgencyAnalytics "Stop The Spreadsheets!" (1,399 days); FranConnect "single view" (789 days) | "Stop rebuilding the same report", "One clear view of your business" | **Yes** (C22) |
| A pain-moment opener | ServiceTitan "nights and weekends on paperwork"; Jobber "opening five tabs" | "Running three locations? Monday shouldn't mean five logins." | Needs Reiss's sign-off |
| Works with your tools, doesn't replace them | JITAI Systems (80 days) | "Connected data from your existing tools", no platform names | **Yes** (C21, C23) |
| Booked jobs, not impressions | A contractor marketing agency's long-running ad | Ad spend against booked jobs, per location | **No.** It's not on the site yet. Add it to the dashboards page, then to the claims list. |
| A named output for the call | Oryx Horn "Free Data Diagnostic" | Scope call framed as "leave with a written plan, price and date. Keep it either way." | **Yes** (C19, C03). Avoid "audit" unless it has a defined deliverable. |
| Clickable sample dashboards | Dashboard Doctor | A live multi-location dashboard with invented data, labelled SAMPLE, on the landing page | Needs building. Fits the existing SAMPLE convention. |
| Three priced packages with week counts | Shipkit | "From $X" for the 14-day locations build | Needs Josh's starting price |
| Founder on camera | Small agencies on Meta | Josh and Reiss, 30 seconds: who we are, what one view of every location looks like | **Yes** (C06, C14). Needs filming. |

## Don't copy

- Big-number proof ("#1", "200k+ pros", "grow 44% faster"), ratings, customer revenue stories. We have none.
- Free trials, "no card required", demos of a product we don't sell, gift cards for calls, struck-through prices.
- "Leads or you don't pay" and any other guarantee.
- AI call answering and AI follow-up angles. That's not this offer.
- Naming ServiceTitan, Jobber or Housecall Pro in ad copy. Using their names as keywords is a separate question for the policy auditor.

## The plan this points to

**Phase 1: build the assets (about 2 weeks, no ad spend)**
1. A landing page for service businesses with several locations or crews, trade-variable H1, and a live SAMPLE dashboard. Add the "ad spend against booked jobs" line and a "my data is messy" FAQ answer. Add a location-count field to the form.
2. The Monday locations scorecard template, plus a short page to download it.
3. A 30-second founders video.
4. A starting price for the 14-day build.
5. New lines added to `claims.md` and signed by Reiss.

**Phase 2: Google Search (about $15/day)**
- One campaign: a locations dashboard, with trade-split ad groups on the uncontested queries (field service KPI dashboard, HVAC/plumbing/pest KPI dashboard, dashboard for multiple locations, custom dashboard development). About $10/day.
- A small quoting-tool campaign on "custom quoting software for contractors". About $5/day.
- No "franchise reporting dashboard" at first.

**Phase 3: Meta (about $7/day, after the template exists)**
- Prospecting to service business owners with the scorecard template as the offer. That's the long-running-winner mechanic, at a low price per lead.
- Three bets: visibility hook, certainty (fixed price and date), founders video.
- Retarget template downloaders and site visitors with the scope call.

**Phase 4: follow-up**
- Everyone who downloads the template gets one personal email from a founder a few days later. No sequence; the site promises no newsletter.

## Open decisions for Josh
1. Build the scorecard template as the lead magnet? It's the single highest-value move this research found.
2. Starting price for the 14-day locations build.
3. Approve adding "ad spend against booked jobs" to the dashboards page.
4. Approve trade-specific landing variants and the pain-moment openers (Reiss's sign-off).
5. Top up Apify if you want ad formats, landing URLs and Transparency data for the advertisers we couldn't pull.
