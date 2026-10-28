# UnBusy site: SITE-PLAN.md

Status: **approved by Josh, 2026-10-27.** Nothing is built yet; building starts only when Josh says so, and merging to `main` is production. Design rules live in `DESIGN.md`; the homepage mockup is `index.html`. The business plan (Claude Doc "SKOX Business Plan") is the source for positioning and pricing.

## 0. Decisions (Josh, 2026-10-27)

| # | Decision | Decided | Why |
| --- | --- | --- | --- |
| 1 | Which pages launch on day one | Home, Surveying, Property management, The review, Privacy. Title and CPAs follow when a sample desk exists for each. | A question page without a desk running on it is a promise, and the site's whole credibility is "we show, we don't describe". The Quote Desk and the Maintenance Desk demo already exist. |
| 2 | The SKOX pages (services, trades, examples, scorecard) | Retire them all at cutover with 308 redirects to the nearest UnBusy page. Keep `/portal`, `/concepts/*`, `/mccaughey`, `/irelandsurveying` and `previews.skoxsoftware.com`. | They sell "web apps, dashboards, websites", which the plan says is an upsell only. Leaving them live splits the site into two companies. |
| 3 | The Google Search campaign (live, ~$298/mo, landing on `/for/*`) | Pause it on cutover day. Search ads come back only on the question pages, for question keywords, as a separate job. | The redirects would send paid clicks to a page that doesn't echo the ad. |
| 4 | Canonical host | `gounbusy.com` bare; `www.gounbusy.com` redirects to it. | The name is the URL. (Today's canonical is `www.skoxsoftware.com`; that only matters for the redirect map.) |
| 5 | Names and photos | **None.** No founder names, photos or bios anywhere on the site. The thanks page and the form notice say "we", not "Josh or Reiss". | Josh's call. The site stays anonymous; the review is where people meet. |
| 6 | Phone number | **None on the site.** The form is the only contact. | Josh's call. One action per page. |
| 7 | The sample job sheet | Real counties, a sample address, status line "Waiting on the owner" until Pat says yes to being named. | Ireland is named only with Pat's OK. |
| 8 | `makemeunbusy.com` | Not part of launch. If bought later, 308 everything to `gounbusy.com`. | A fun redirect, nothing more. |

## 1. What the site is for

One job: get an owner of a 5–50 person firm to book a free operations review. Every page ends in that button. No pricing calculator, no scorecard, no "get my price", no portfolio.

Rules carried over from the plan and `DESIGN.md`:

- Sell the solution, never the category. No "AI agency", "automation", "software company", "custom software" in a headline or a `<title>`.
- "UnBusy" describes people and work, never the firm. "Get the busywork off your team." Never "an UnBusy office".
- No invented proof. Every sample says "sample" in words. Named clients appear only with permission.
- One filled button per screen. Rules, numbers and sentences; no cards, pills, icons, gradients, dark sections.

## 2. Pages

| Route | Page | Title tag | Launch |
| --- | --- | --- | --- |
| `/` | Home | UnBusy: Get the busywork off your team | Day one |
| `/surveying` | Can AI pull the county records for every survey job? | Day one |
| `/property-management` | Can AI triage every maintenance request? | Day one |
| `/title` | Can AI order the records for a title file? | When a sample desk runs |
| `/cpas` | Can AI run my 1099 season? | When the 1099 Desk runs (Tembo) |
| `/review` | The free operations review (the form) | Day one |
| `/review/booked` | Thanks page after the form | Day one |
| `/privacy` | Privacy, with the "Your privacy choices" switch | Day one (rename only) |

Navigation (header, left to right): logo lockup → "How a desk works" (`/#how`), "Industries" (`/#industries`), "Hire vs. build" (`/#math`), "Book a free review ●" (`/review`). Under 600px: logo and the action only.

Footer: logo; "Your data and your rules are yours. The system is ours to keep improving."; Privacy, Your privacy choices, Sign in (`/portal`).

### 2.1 Home (`/`)

The mockup in `index.html`, with these changes:

- "Survey Desk" becomes **Quote Desk** everywhere (the product name).
- Status row 5 reads "Waiting on the owner" (decision 7).
- The industry rows link to the real routes above; Title and CPAs rows are omitted until their pages exist (no dead links, no "coming soon").
- Both "Book a free review" buttons go to `/review`.

Copy, section by section:

**Hero.** H1: "Can AI run this part of your office? Let's look at how it runs today." Aside: "UnBusy builds and runs the system that does your office legwork, up to your decision." Small: "One monthly fee, priced against the hire you'd otherwise make. Your data and your rules stay yours." Buttons: "Book a free review ●" (filled), "See one run, below" (link).

**The sheet.** Caption: "Quote Desk, one job, as it ran". Small: "Sample job. Real counties, sample address. Times are the desk's own log." Five rows (property appraiser record, plat and deed, flood zone, zoning and setbacks, quote) as in the mockup. Foot: "4 min 12 s from address to quote. Staff hours: 0." and the outline button "Approve quote ●" (decorative, links to `/surveying`).

**01 A desk does the legwork. Your people make the calls.** Intro: "Every desk has the same four parts, built around how your office actually works." Rows Collect / Read / Prepare / Hand off, copy as in the mockup.

**02 Start with the question you're already asking.** Intro: "Each page shows a desk running in that trade, on sample data, labelled as a sample." Rows: Surveying, Property management (day one); Accounting, Title and escrow (when live).

**03 Hire vs. build.** As in the mockup: "$47,540 a year, before benefits" (BLS OEWS May 2025, cited in small text) against "$1,500 a month, to start". Bullets as in the mockup. Add one line of small text under the desk figure: "The monthly fee is about a quarter of what the work costs you now, fixed for the term. The setup fee covers configuring the desk to your office."

**04 The review.** Steps 1–3 as in the mockup (60–90 minutes; proposal in your own numbers; decide, proposal good for 14 days). "Proof, the honest version" paragraph as in the mockup. No names (decision 5). Filled button to `/review`.

### 2.2 Industry question pages (`/surveying`, `/property-management`, `/title`, `/cpas`)

One template, one content file per industry. Same header and footer. Structure, top to bottom:

1. **Hero.** H1 is the question. Lead: one sentence on what the desk does in that trade. Aside: the three-line summary (what goes in, what comes out, where it stops). Filled button "Book a free review ●".
2. **The sheet.** One job as it ran, on sample data, in that trade's own documents. The same table component as the homepage. Caption names the desk ("Quote Desk", "Maintenance Desk", "Title Desk", "1099 Desk").
3. **01 What the desk takes off your team.** Rows: the four or five jobs it runs, each one sentence, written as the owner would say them ("Pull the appraiser record and the plat for every new address").
4. **02 Where it stops.** Two or three rows: the decisions that stay with a person in that trade (the quote amount, the vendor to send, the filing to sign).
5. **03 Hire vs. build**, with the trade's own hire named (survey tech, maintenance coordinator, title processor, seasonal 1099 preparer) and the same cited wage line or the trade's own BLS figure.
6. **04 The review.** Same three steps. Filled button. Recording of the desk running goes here when one exists (the plan calls for a 3-minute recording per page; none exists yet, so the slot is omitted, not faked).

Industry copy to write once Josh confirms the page list; the surveying page draws on the Ireland Quote Desk, the property-management page on the maintenance desk demo already in the repo (`/for/property-management`), rewritten to the new rules.

### 2.3 The review (`/review`)

H1: "Book a free operations review." Lead: "60 to 90 minutes, in your office or on a screen share. We watch how one part of your office runs today and come back with a proposal in your own numbers. Free. No pitch deck." Three steps repeated in short. The form is on this page, left column; the right column holds the "what to have ready" list (the systems you use, who does the work, roughly how many jobs a month). No phone number (decision 6).

**Form fields** (replacing the SKOX scope form):

| Field | Type | Required |
| --- | --- | --- |
| Your name | text | yes |
| Email | email | yes |
| Firm | text | yes |
| Phone | tel | no |
| What your firm does | text (free; no industry list, any firm can book) | yes |
| The busywork you think your team could get rid of | textarea, placeholder "Describe it the way you'd describe it to a new hire: what comes in, who handles it, what they open and retype, how many a week." | yes |
| People in the office | select: 1–4, 5–15, 16–50, more than 50 | no |
| On site or screen share | radio | no |
| (honeypot `website`, attribution, journey context) | hidden | — |

Button: "Book the review ●". Notice under the form, truthful as today: saves as you type, used to measure ads, link to privacy choices. After submit: `/review/booked`: "Got it. We'll reply within one business day to set a time." Email subject becomes "Operations review: {firm}". The lead lands in the portal pipeline as today, with the free-text `industry` in place of `projectType` and the busywork description as the message.

### 2.4 Privacy (`/privacy`)

Same page, "SKOX" → "UnBusy", legal name line as Josh wants it, the opt-out switch unchanged.

## 3. What happens to the current SKOX pages

| Today | At cutover |
| --- | --- |
| `/` (SKOX homepage) | Replaced |
| `/web-apps`, `/dashboards`, `/websites`, `/customer-portals`, `/internal-tools`, `/integrations`, `/mvp-development` | 308 → `/` |
| `/for/property-management` | 308 → `/property-management` |
| `/for/hvac`, `/for/pool-service`, `/for/pest-control`, `/for/landscaping`, `/for/roofing`, `/for/plumbing`, `/for/garage-doors`, `/for/electrical` | 308 → `/` |
| `/examples`, `/dashboard-examples`, `/internal-tool-examples` | 308 → `/` |
| `/scorecard`, `/scorecard/thanks`, `/api/scorecard` | 308 → `/review`; API removed |
| `/scope-received` | 308 → `/review/booked` |
| `/api/partial` (unfinished-form capture) | Kept, pointed at the new form |
| `/portal`, `/portal/*` | Kept (rewrite to the portal) |
| `/concepts/*`, `/mccaughey`, `/irelandsurveying` | Kept as they are; prospects hold those links |
| `/privacy`, `/llms.txt`, `/sitemap.xml`, `/robots.txt` | Kept, rewritten for UnBusy |

Code removed with them: `components/LandingPage.tsx`, `HomeServices`, `AutomationSection`, `CompareSection`, `BuildSection`, `TopicSection`, `HeroComposer`, `HeroFragments`, `SkoxLogo`, `content/landing.ts`, `content/topics.ts`, `content/trades.ts`, `content/automation.ts`, `app/landing.css`. `content/site.ts` is rewritten, not deleted. Anything the concept pages import stays.

## 4. Build approach

- **Same Next.js 16 app, same Vercel project `skox`, same repo.** No second app. Ship through a PR and the Vercel preview; merging to `main` is production, so nothing merges until Josh says.
- **Routes:** `app/page.tsx` (home), `app/[industry]/page.tsx` driven by `content/industries.ts` (`generateStaticParams`, 404 for unknown slugs), `app/review/page.tsx`, `app/review/booked/page.tsx`. All static; the only client component is the form.
- **Components:** a fresh `components/site/` set (Header, Footer, Sheet, Rows, Figures, Steps, ReviewForm). The old SKOX components are deleted, not restyled; restyling them is how the last redesign drifted.
- **Styles:** `app/site.css` written from `DESIGN.md` (tokens, type scale, buttons, rows, table, grid). Tailwind stays installed for the concept pages but the new pages don't use its utilities. Fonts via `next/font/google`: Inter Tight 500/600 and Inter 400/500/600, replacing Geist and Instrument Serif in the root layout (concept pages that need their own fonts load them locally).
- **Copy:** every word in `content/site.ts` (brand, nav, footer, home), `content/industries.ts`, `content/review.ts`. Components stay structural, as today.
- **Logo:** `03-lockup-horizontal-light.png` in the header and footer via `next/image` (height 34px / 28px), from `public/brand/`. Favicon and apple-touch-icon exported from `08-app-icon-dark.png`; OG image regenerated with the stacked lockup on paper. Swap to SVG once the vector is traced.
- **Lead delivery:** `app/api/contact/route.ts` keeps Resend → portal → Meta CAPI. `lib/leads.ts` gets the new fields (`firm`, `phone`, `industry` as free text, `people`, `format`); `projectType` validation goes. The portal payload sends `industry` where `projectType` went, so the pipeline keeps working without a portal change.
- **Tracking:** `app/layout.tsx` keeps GA4, Clarity, Apollo, ad pixels, `CaptureAttribution`, all still gated by `lib/consent.ts`. The `scope_request` conversion event is renamed `review_request` in `lib/track.ts` and in the Google Ads / GA4 conversion definitions (a settings change Josh makes after merge). JSON-LD becomes `Organization` "UnBusy" with no founder block (decision 5); the service catalog block goes.
- **Metadata:** `site.url` = `https://gounbusy.com`, sitemap lists the live pages only, `robots` unchanged, `llms.txt` rewritten.
- **Checks before merge:** `npm run lint && npm run build`; a test submission through the preview form reaching founders@ and the portal pipeline; every redirect in section 3 curl-tested on the preview; no horizontal overflow at 360px; Lighthouse accessibility pass on the four pages.

## 5. Domain cutover (gounbusy.com)

In order. Steps marked (Josh) need his accounts.

1. (Josh) Turn **auto-renew on** for gounbusy.com in Vercel. It was left off at purchase.
2. (Josh) Vercel project `skox` → Domains: add `gounbusy.com` and `www.gounbusy.com`; set `gounbusy.com` as the redirect target for www. Vercel sets the DNS itself since it registered the domain.
3. (Josh) Resend: add and verify `gounbusy.com` (DKIM/SPF records in Vercel DNS). Until verified, leads keep sending from `leads@skoxsoftware.com`; then `LEAD_FROM_EMAIL` = "UnBusy <leads@gounbusy.com>". Google Workspace mail stays on skoxsoftware.com for now; `founders@` keeps receiving leads.
4. PR: `site.url` → `https://gounbusy.com`; host-based 308 in `next.config.ts` for every request whose host is `skoxsoftware.com` or `www.skoxsoftware.com` to the same path on `gounbusy.com`, **except** `/portal` and `/portal/*` (those stay served on skoxsoftware.com so prospects' portal links keep working; the portal itself lives on portal.skoxsoftware.com). Path redirects from section 3 run on both hosts. `previews.skoxsoftware.com` is a separate host and is untouched.
5. Merge (Josh says when). Production builds from `main`.
6. Verify: `curl -I https://www.skoxsoftware.com/for/hvac` → 308 → `https://gounbusy.com/`; `https://skoxsoftware.com/portal` → 200; `https://previews.skoxsoftware.com/<slug>` → 200; the form on gounbusy.com delivers.
7. (Josh) Google Search Console: add `gounbusy.com` as a Domain property, run Change of Address from `skoxsoftware.com`. GA4: update the web stream URL. Clarity: no change needed. Google Ads: campaign paused (decision 3); final URLs changed when it comes back.
8. (Josh) Portal and email signatures still say SKOX. Separate job; not part of this cutover.
9. skoxsoftware.com stays registered with auto-renew on, forever. The 308s are permanent.

## 6. Order of work once approved

1. Content files and `site.css` from `DESIGN.md`; home page; preview.
2. Review page and form; lead route and portal payload; test submission.
3. Surveying and property-management pages.
4. Redirects, metadata, sitemap, llms.txt, JSON-LD, favicon/OG.
5. Delete the SKOX pages and components; build passes; curl the redirects.
6. PR with the preview link for Josh. Merge and domain steps only on his word.
