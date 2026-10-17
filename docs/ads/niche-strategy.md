# Niche strategy: service businesses with several locations or crews

Status: proposed 2026-10-05, not yet approved by Josh or Reiss. Nothing here is live copy until it's on the site and in `claims.md`.

## The angle

**Who:** owner-operated service businesses running several locations, territories or crews. Two overlapping segments, one buyer type:
- **Home and field services:** HVAC, plumbing, electrical, pest, pool, lawn and landscaping, cleaning, roofing, restoration, garage doors, surveying.
- **Multi-unit franchise owners** of service brands: fitness, kids' education, auto services, home services, and similar. Plenty of home-service businesses are themselves franchisees.

**Excluded:** healthcare, med spas and wellness clinics, because of Josh's day job.

**Not "all service businesses".** Single-truck operators can't afford custom work and are well served by off-the-shelf tools. The fit starts when an owner has enough locations, crews or territories that one login no longer shows the business.

**Their problems, in their words** (each becomes one campaign, never mixed in one ad):
1. **"Which location or crew is slipping?"** Numbers sit in the field-service software, payroll, the ad accounts and the bank. The owner rebuilds the same spreadsheet every Monday.
2. **"Which ads actually turn into booked jobs?"** Marketing spend per location against booked and completed jobs is the number home-service owners care about most and see least.
3. **"Quoting takes me all day."** The owner or one estimator prices every non-standard job by hand. This is the Ireland Surveying problem, and the Quote Desk mockup already exists to show it.

**What we sell:**
- For problems 1 and 2: a dashboard showing every location in one view, built in 14 days at a fixed price.
- For problem 3: a quoting tool web app, with its own scope and delivery date.

**Why this raises the odds:**
- **The site already speaks to it.** The hero text box cycles "One dashboard for all my locations" and "A quoting tool my team will actually use", and the dashboards build lists "Location & team performance views" (`content/landing.ts:35`).
- **Real work exists in this world.** Lorenzen Motors is a service business client. The Quote Desk mockup was built for a surveying firm. Josh has shipped Command Center dashboards wiring booking, payments and social tools together.
- **Josh's multi-location operations background transfers** without touching healthcare.
- **These owners already spend on marketing** and feel the cost-per-booked-job pain directly, so a fixed-price build is an easy budget line.
- **The search terms are narrower and less contested** than "custom software development" (still to be validated in Keyword Planner).
- **They're findable:** state contractor licence lists, Google Maps listings with several locations, franchisee associations, trade groups, LinkedIn titles like "owner" plus a trade, or "multi-unit franchisee".

## The offer

| Element | Proposal | Status |
|---|---|---|
| Name | "Location Command Center" or plain "Multi-location dashboard" | Josh picks |
| Promise | One view of every location, 14-day focused build, fixed price and date before you pay | Uses existing claims C03, C08 |
| Scope | Up to N locations, up to M connected tools, one owner view plus one per-location view | Josh sets N and M |
| Starting price | "From $X" on the page | **Josh must set; needed to filter leads** |
| Ongoing | Optional monthly hosting and updates | Already in the FAQ; price TBD |
| Second offer | Quoting tool web app: the job inputs, the pricing rules and a customer-ready quote. Own scope and date, set at the scope call (no day promise) | Uses C03, C21; Quote Desk mockup as the demo |
| Data | Business numbers only, no customer personal data beyond what the owner already holds | Keeps scope and risk small |

## What has to exist before ads run

1. **Landing pages, one per problem:** e.g. `/service-businesses/locations` (dashboard) and `/service-businesses/quoting` (quoting tool), built on the existing `LandingPage` variant pattern in `app/[service]/page.tsx`. H1s along the lines of "Every location. One view." and "Quotes out the same day." Sample screens labelled SAMPLE, with generic tool categories (field-service software, payroll, ads), no brand names.
2. **One real proof point:** screenshots of a Command Center Josh has built, data blurred, with that client's written permission; or a recorded walkthrough. Without it, expect a weak conversion rate.
3. **The starting price,** and the calendar-vs-business-days answer.
4. **New claims** for the page added to `claims.md` and signed by Reiss.

## Channels, in order

| Channel | Why | Budget / effort |
|---|---|---|
| Direct outreach | A list of multi-unit owners is buildable (brand location pages, state business filings, LinkedIn). Warm, personal, needs no proof. Reuse the `prospect-hunt` and `outreach-draft` skills, re-pointed at service owners with several locations or crews. Home services is already a biz-stack vertical. | 10 tailored messages a week |
| Google Search | Catches owners actively looking. Narrow phrase/exact terms only, one campaign per problem. | Replace the three broad campaigns with two: locations dashboard about $10/day, quoting tool about $5/day |
| LinkedIn or Meta | Reach by job title ("owner" in a trade, "franchise owner", "multi-unit operator") with the sample-dashboard creative. Retarget page visitors. | About $7/day, after Search has traffic |
| Franchisee associations, trade groups and owner forums | One association or brand group endorsing you reaches dozens of owners at once. | A free walkthrough session or talk |

Keyword themes to test (validate volumes and CPCs first):
- **Locations dashboard:** multi location reporting dashboard; franchise reporting dashboard; dashboard for multiple locations; home service business dashboard; HVAC KPI dashboard; plumbing business reporting; field service KPI dashboard; marketing ROI dashboard for contractors; cost per booked job tracking.
- **Quoting tool:** custom quoting software for contractors; estimating tool for service business; quote builder for contractors; automate job quotes.

Negatives on top of the existing list: franchise for sale, buy a franchise, franchise opportunities, franchise cost, franchise disclosure, FDD, franchise lawyer, franchise jobs, technician jobs, apprentice, license exam, near me, repair (homeowners searching for a plumber, not plumbing owners).

Field-service software names (ServiceTitan, Housecall Pro, Jobber) may work as keywords but never in ad copy; have the policy auditor check before use.

## What success looks like (90 days)

| Checkpoint | Target |
|---|---|
| Day 0 | Landing page live, proof attached, price set, test lead recorded |
| Day 30 | 40 owners contacted directly; first scope calls; search terms mostly owners, not homeowners or franchise buyers |
| Day 60 | 3–5 scope calls across all channels; 1–2 proposals |
| Day 90 | One signed build. Its profit covers ads plus the time spent on outreach. That build becomes the case study for the next ten. |

Kill rule: if 90 days bring scope calls but no proposal accepted, the problem is price or proof, not the niche. If they bring no scope calls from 40+ direct contacts, the niche is wrong; try the runner-up.

## Runner-up angle (if service businesses don't land)

**Agencies that report to clients across social platforms:** creator and influencer management, social media agencies. They rebuild client reports from TikTok, Instagram and Spotify every week. Josh has wired exactly those platforms. Strong technical fit, but off-the-shelf reporting tools crowd the space, and budgets vary widely.

## Open decisions for Josh

1. Approve this niche, and which problem leads: the locations dashboard or the quoting tool.
2. Starting price and the location and tool limits in the scope.
3. Which existing Command Center can be shown, with the client's permission.
4. Whether the three broad Google campaigns are replaced by the single niche campaign, or kept running at a minimum.
