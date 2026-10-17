# Landing auditor — google-search-v1 — 2026-10-05

**Verdict:** PASS WITH FIXES. Mobile speed is **unverified**: the PageSpeed Insights API returned HTTP 429 (Too Many Requests) on all four attempts. "Mobile LCP above 4s" is a blocker condition this audit could not rule out, so run PSI by hand before launch (see "Inputs I could not check").

Every route, H1, ad claim, day-promise condition and form preselect checked out against the live site and the code. No blockers found. Two small fixes and some keyword-echo gaps are listed below.

## Per ad group

| Ad group | Final URL | H1 seen (live) | Message match | Claims on page | Form preselect | Mobile perf | Verdict |
|---|---|---|---|---|---|---|---|
| Web apps – v1 | `https://www.skoxsoftware.com/web-apps` (live, 200, title "Custom web apps, built at speed — SKOX") | "Your next web app. Built at speed." | Good. Pinned H1 "Web Apps, Built at Speed" matches the H1. The intro covers portals, internal tools and fixed scope, price and date | All 15 headlines and 4 descriptions are on the page (see claims check) | `web-apps` chip pre-selected (`LandingPage.tsx:287` passes `variant` into `ConversionForm.tsx:31`) | Not measured (PSI 429) | PASS, pending PSI |
| Dashboards – v1 | `https://www.skoxsoftware.com/dashboards` (live, 200, title "Custom dashboards, built at speed — SKOX") | "Your next dashboard. Built at speed." | Good. H1 matches the pinned headline. The intro has "one clear view of your business" (D2, H3) | All present. C08 "14-day focused dashboard build" and its condition "Timing depends on agreed data sources and access" are both on the route | `dashboards` pre-selected | Not measured (PSI 429) | PASS, pending PSI |
| Websites – v1 | `https://www.skoxsoftware.com/websites` (live, 200, title "Custom websites, built at speed — SKOX") | "Your next website. Built at speed." | Good. H1 matches the pinned headline. The intro has "custom design, mobile layouts and lead capture" (H2, H4, H5) | All present. C09 "7-day focused site build" and "Scope, content and access agreed before kickoff" are both on the route. "No Hourly Billing" is only implied (see N3) | `websites` pre-selected | Not measured (PSI 429) | PASS, pending PSI |

Other routes fetched: `/` 200, H1 "Your next big thing. Built at speed.", title "SKOX — Custom web apps, dashboards & websites. Built at speed." · `/scope-received` 200, H1 "Got it.", title "Request received — SKOX", not a 404 · `/privacy` 200, H1 "Privacy", title "Privacy — SKOX". It has a contact email and covers GA4, cookies and the Meta/Google/LinkedIn ad tags.

### Claims check (promise continuity)

The three routes share the whole page except the hero, the build focus and the form preselect (`app/[service]/page.tsx:41`, `components/LandingPage.tsx`). Every ad line maps to visible page text:

| Ad text | Where it shows on the route |
|---|---|
| Built at Speed (C01) | H1 |
| Custom … Development / Custom Website Design (C02) | Page title; H1; "Custom design, built for mobile" |
| Fixed Price, Agreed Upfront (C05) | Trust strip, item 01 |
| A Delivery Date Before You Pay (C03) | Compare table, Timeline row |
| Date Set at Kickoff (C18) | Build assurance: "A delivery date set at kickoff, not re-estimated later" |
| No Hourly Billing (C13) | Compare table only, by contrast ("High, often billed by the hour" vs SKOX "Fixed upfront"). See N3 |
| You Own the Code (C07) | Trust strip, build assurance, FAQ |
| Two Founders / No Account Managers (C14) | Compare table, Who row |
| Direct Access to the Builders (C06) | Trust strip, item 02 |
| Between Expensive and Risky (C16) | "Why SKOX" section title |
| Free Scope Call, No Deposit (C04) | Under the hero CTA: "Free 30-minute scope call. No deposit. No obligation." |
| Keep the Plan Either Way (C19) | Process step 02 "Keep the scope either way"; form benefit "The plan is yours…" |
| Get My Price & Timeline (C11) | Hero CTA, process CTA, mobile sticky CTA, form submit |
| Portals / internal tools / accounts, payments & integrations (C21) | Web apps build card |
| Data from existing tools / location & team performance (C21) | Dashboards build card |
| Stop Rebuilding Reports / Your Business in One View (C22) | Dashboards card description; dashboards intro |
| Built for Mobile / Lead Capture & Booking (C21) | Websites build card and intro |
| Reply within one business day (C10, sitelink) | Form intro and the line under the submit button |
| Working review halfway (C17, callout) | Compare table, Change row; process step 03 |

### Keyword echo (message match)

| Ad group | Theme | On page? |
|---|---|---|
| Web apps | custom web app(s) | Yes: title and build label |
| | web application / development | Close only. "web app" and "working software"; the word "development" isn't in the copy |
| | customer / client portal | Yes: "Customer portals & internal tools". "client portal" is in the form placeholder and composer examples |
| | internal tool(s) | Yes |
| | custom business software | Close: "working software", "Independent software studio" |
| | small business | No |
| | MVP | Close: "your first product", "A focused first version you can use" |
| | company / agency / developer / hire | Close: "software studio", "the builders" |
| Dashboards | custom dashboard(s) | Yes: title |
| | business dashboard | Close: "one clear view of your business" |
| | reporting dashboard | Yes: "Reporting built around your decisions" |
| | KPI | No |
| | analytics | No |
| | multi location | Close: "compare locations", "Location & team performance views" |
| Websites | custom website design / development | Yes: title, "Custom design" |
| | website redesign | Close: "Turn a dated site into…". The word "redesign" isn't on the page |
| | business / small business website | Partial: "business" yes, "small business" no |
| | professional website design services | Close: "clear, credible" |

None of these gaps blocks launch. The H1, title and intro carry the core term on every route. KPI, analytics, redesign and small business are the weakest echoes. If those ad groups get clicks but no form starts, they're the first place to add a supporting line in `content/landing.ts`. Any new line must also go into `claims.md`.

### Tracking parameters
- The final URLs have no query string, so the Final URL suffix gets a single `?`. There's no double `?` risk. `/[service]` is statically generated (`app/[service]/page.tsx:6–9`) and ignores the query string, so the route won't break.
- `utm_source=google` and `utm_medium=cpc` are lower-case and consistent. `utm_campaign={campaignid}` and `utm_content={adgroupid}` are numeric IDs, and `utm_term={keyword}` echoes the keyword as entered (all lower-case in the file). That's consistent with section 9's match-by-ID plan.
- The CTAs are same-page `#scope` anchors, so UTMs and `gclid` stay in the URL until submit.

### Quality Score landing-page factors

| Factor | Score | Reason |
|---|---|---|
| Relevance | Good | Route H1, page title and intro match each ad group. Minor gaps are in the keyword echo table |
| Original content | Good | Bespoke copy, named founders with bios and photos, own products (Tender, FocusTap). No templated filler |
| Transparency | Good | Founders named, email in the footer, Privacy page live with GA4 and ad-tag disclosure, and the unfinished-enquiry notice sits next to the email field. No phone or address, which is deliberate ("Working everywhere") |
| Mobile | Good (code only) | Mobile sticky CTA "Get my price & timeline" in markup (`LandingPage.tsx:310–319`). The CSS breakpoint and how it looks were not checked |
| Speed | **Unknown** | PSI API returned HTTP 429 every time. No numbers |

## Blockers
| # | Where | Problem | Rule or source | Fix |
|---|---|---|---|---|
| — | — | None found | — | — |

## Non-blockers
| # | Where | Problem | Suggestion |
|---|---|---|---|
| N1 | `components/LandingPage.tsx:62–68` | The header CTA reads "Let’s talk", while the ad, hero, sticky CTA and submit all say "Get my price & timeline". It's the only CTA that doesn't match | Use `landing.cta` in the header, or a short form like "Get my price" if space is tight on mobile |
| N2 | `components/LandingPage.tsx:54–61`, `:306` | "Client login" in the header and "Client portal" in the footer pull ad visitors to `/portal`. Searches for "client portal" and "custom client portal" are the most likely to click "Client login" by mistake | Hide the header login on the `/[service]` variants (keep it on `/` and in the footer), or move it to the footer only |
| N3 | Websites and Web apps ads, H "No Hourly Billing" (C13) | The page never says "no hourly billing" in SKOX's own voice. It only contrasts "Fixed upfront" with a big shop "often billed by the hour" (`content/landing.ts:158–162`). `claims.md` allows the restatement, so this is continuity, not a claims issue | Fine to launch. If you want a literal echo, change the SKOX price cell to "Fixed upfront, never hourly" (`content/landing.ts:160`) and update C13 |
| N4 | `components/LandingPage.tsx:75`, `:93` | Hero fragments (sample dashboard tiles) and the hero composer sit above the fold, before the CTA. They're tagged "Sample", and the CTA is still in the hero, so they're not a blocker. On a narrow phone they may push the CTA down | Check one mobile screenshot per route. If the hero CTA is below the first screen, the sticky CTA covers it |
| N5 | Sitelink "Get My Price & Timeline" → `/` | It lands on the homepage, with a generic H1 and no form preselect, from all three campaigns | Acceptable: the homepage is right for mixed intent, and the visitor already picked a route-specific ad. Leave as is for v1 |

## Inputs I could not check
- **PageSpeed Insights, mobile, for `/web-apps`, `/dashboards` and `/websites`:** the API returned `HTTP 429 Too Many Requests` on every call (3 parallel, then 1 retry), so there's no score, no field data and no lab data. Before launch, run https://pagespeed.web.dev/ on each route (mobile) and check LCP ≤ 2.5s (blocker above 4s), INP ≤ 200ms and CLS ≤ 0.1. Or call the API again with an API key.
- The mobile sticky CTA's CSS breakpoint and how the page looks on a phone. The markup was confirmed; layout wasn't, because this agent has no browser and no Bash or Grep in this run.
- `components/BuildSection.tsx` wasn't opened. The day-promise conditions were confirmed on the live pages instead.

## Sources read
- `docs/ads/campaigns/google-search-v1.md`
- `docs/ads/offer.md`, `docs/ads/claims.md`, `docs/ads/README.md`
- `content/landing.ts`, `app/[service]/page.tsx`, `components/LandingPage.tsx`, `components/ConversionForm.tsx`
- Live: `https://www.skoxsoftware.com/`, `/web-apps`, `/dashboards`, `/websites`, `/scope-received`, `/privacy` (all returned content, none redirected or 404ed)
- `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=…%2Fweb-apps|dashboards|websites&strategy=mobile&category=performance`: HTTP 429 every time
