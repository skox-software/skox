# QA: bass-harbor-cottages-dd0ec6aa

Run 2026-10-21 on localhost (dev and production build). The checks on the Vercel preview are at the bottom.

## 1. Claims audit (every factual statement → ledger row)

| On the page | Row |
|---|---|
| Name, address, phone, email, phone hours | L1–L5 |
| "five minutes from Acadia's Bass Harbor Head Lighthouse" | L11 |
| "Follow the staircase to the shore, launch your kayak with the tide, and watch for eagles" | L12, L13 |
| "quietside of Mount Desert Island" | L10 |
| 4.79 / 371 reviews, Superhost (Airbnb) | L57 |
| 4.96 / 26 reviews, Pine Cottage (Airbnb) | L58 |
| "Since 1986, hosts living on site, licensed by the State of Maine" | L60, L6 |
| Bar Harbor Chamber member | L7, L61 |
| Country Inn built 1890; rooms named for islands and Dr. Thomas Tapley | L29 |
| Each place: features, sleeps, minimums | L20–L34 |
| Every "from" rate (Accommodations overview page figures) | L22, L25, L28, L31, L32, L34 |
| Kayak storage, tidal launching | L35 |
| House rules, bring list, deposit, cancellation, prepaid daily, tax and cleaning, cameras | L39–L47 |
| Wifi supports Roku streaming | L64 |
| Around-here distances | L11, L15–L17 |
| "A scenic fishing village on the working waterfront… We live here on-site and can help you throughout your stay" | L14, L6 (the-details) |
| Finding us: white farmhouse, boardwalk | L18 |
| Before/after list: no phone layout, Happy Spring, availabilityonline, two August prices, deposit by check, Island Explorer 2022 | L49, L51, L54, L53, L55, L52 |
| Reviews R1–R6, verbatim excerpts with "…" where trimmed | reviews.md |
| Logo redraw | assets/manifest.json note (original: images/slideshow-logo-overlay.png) |

**Result: 0 FAIL.** Copy removed during the audit because it had no ledger row: "We read every request ourselves", "weekly rates apply", "We'll do the rest", "free wifi" for every unit (the Boat House is "basic wifi"), "shrunk to a third". The hero alt text said "goldenrod" but the plant is forsythia; it now reads "yellow flowering shrubs".

Not a ledger fact, and labelled as the upgrade: the planner's behaviour (enforcing minimums and occupancy, showing a rate per month) and the "In the build" cards.

## 2. Compliance (lodging pack)

- Rates are always "from" with the month and the tax/cleaning line. The planner never totals a stay; months without a published rate say "confirmed when we reply".
- It's called a request everywhere ("A request, not a booking. Nothing is charged."). No live availability is implied.
- No "best"/"#1"/award claims. TripAdvisor's "#1 of 1 hotels in Bass Harbor" was deliberately left out.
- The camera disclosure is kept in Before you book.

## 3. Function

- **Planner:** tested in the browser pane at 375px with `fetch` intercepted, so nothing reached the business or Reiss.
  - Choosing the Carriage House while on 4 nights moves to 5, with the explanation "The Carriage House has a five-night minimum, so we moved you to 5 nights."
  - An empty submit shows five specific errors.
  - An August arrival shows "From $2,800 a week in August, as published."
  - The guest stepper caps at the place's occupancy. A stale-state bug on rapid taps was fixed.
  - The payload goes to `/api/contact` with `timeline: "preview:bass-harbor-cottages-dd0ec6aa"` and the full summary, then the success screen restates their deposit and cancellation terms.
- **Ask a question:** the shared `AskForm` posts tagged with the same slug.
- **Links:** tap-to-call `tel:+12072443460`, map link, mailto, and the review sources (Airbnb x2, Tripadvisor) go to the pages recorded in reviews.md. All "Plan a stay here" links anchor to `#plan`.
- **Live submit:** not sent from localhost on purpose. The first real submission should be Josh's own test on the preview URL (it will reach Reiss tagged `preview:`).

## 4. Devices

- **375px (browser pane):** `scrollWidth` equals the viewport, so there's no horizontal overflow. The planner overflowed on phones in the first pass (fixed with `minmax(0,1fr)`).
- **390px and 1440px:** full-page captures reviewed.
- **Text under 16px on mobile:** only eyebrows (12px caps), field labels and fine print (13–15px). Reading text is 16–17px. This deviates from the playbook's 16px rule for labels; it was a deliberate choice for hierarchy.
- **Dark mode:** not supported. The page is light only, like their brand.

## 5. Performance

- `next build` passes, and the route is prerendered static (○). ESLint and `tsc --noEmit` are clean.
- Images go through `next/image` with sizes; the hero is `priority`. The total public folder is about 2.7 MB of originals, served resized.
- Lighthouse: see the preview section below.

## 6. Privacy label

The concept bar ("Concept built by SKOX for Bass Harbor Cottages. Not live. Nothing here is public.") is sticky and visible without scrolling at 390px (see after-mobile-1.png). The footer repeats it. `previewMetadata` sets noindex/nofollow/nocache, and `robots.ts` disallows `/concepts/`.

## 7. Sales screenshot

`send/before-after.png`: the current homepage on a phone beside the concept's hero.

## On the Vercel preview

(filled after deploy)
