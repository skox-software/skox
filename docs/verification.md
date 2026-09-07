# Landing-page verification

## September 7, 2026 — scroll behaviour

Local implementation. Adds motion to the collage build below.

- **Everything runs on native scroll-driven timelines** — `animation-timeline: view()` for reveals and `scroll(root)` for drift. No IntersectionObserver, no scroll listener, nothing on the main thread.
- **Section headings, card rows, the accent card, the FAQ list and the tabbed preview rise as they enter.** Card rows stagger column by column via offset `animation-range`, because a scroll timeline ignores `animation-delay`.
- **The three hero fragments drift at different rates** (measured −40 / −66 / −18 px at the same scroll position), which is what reads as floating rather than pinned.
- **The header carries no rule at the top of the page** and settles into a border plus faint shadow over the first 140 px. Verified: `transparent` at scroll 0, `#e4e2d8` at scroll 400.
- **Nothing can get stuck invisible.** Two guards, both confirmed in the compiled CSS, not just the source: the rules sit inside `@supports (animation-timeline: view())` nested in `@media (prefers-reduced-motion: no-preference)`. A browser without scroll timelines, or a visitor who prefers reduced motion, never enters the block and gets the finished state. All 17 animated elements measured at full opacity after scrolling to the bottom.
- **One real bug found and fixed during this pass.** The first ranges ended in `cover`, which let an element sit fully on screen while still part-way through its fade — reproducible by deep-linking straight to `#process`, which landed on the accent card at opacity 0.68. Ranges now finish inside the element's own entry phase, by `entry 90%` at the latest. Re-tested `/`, `#top`, `#build`, `#process`, `#about`, `#faq` and `#scope`: nothing more than 90% visible is below full opacity.
- Build, TypeScript, ESLint passed. Contact regression tests: 7 passed. No horizontal overflow at 320–1920 px. Axe clean on `/`, `/websites`, `/privacy`, `/scope-received` after scrolling the full page. No console errors.

## September 7, 2026 — collage hero, working composer, locations removed

Local implementation. Builds on the restyle below.

- **Locations removed.** "Winter Park", "Orlando", "Lake Mary" and "Florida" are gone from every rendered surface: the hero eyebrow, the footer line, the metadata description, Josh's bio and the dashboard demo's chart labels (now Downtown / Northside / Riverside). `areaServed: "US"` stays in the JSON-LD, since it is a service area rather than a base. The only remaining "Florida" is "MBA from the University of North Florida" in an unrendered legacy bio — an alma mater, not a location claim.
- **Hero rebuilt as the reference's collage.** Centred serif headline with three floating product fragments — a region table top-left, a stat card right, a gestural line chart bottom-left. `BuildPreview` moved down to anchor the "what we build" section, so all three tabs, the period toggle, the approval flow and the website demo stay interactive; re-tested in the new location.
- **The composer is real.** The reference's AI question box is rebuilt as an input whose text is handed to the enquiry form via a window event (`lib/brief.ts`), because `LandingPage` is a server component and lifting the state would make the whole page client-side. Verified: text lands in the textarea, the page scrolls to the form, and focus goes to the first field still needing an answer. Submitting it empty focuses the description field. Text already typed by the visitor is never overwritten.
- **Invented figures are labelled.** Every number in the fragments is made up, so the group is `aria-hidden` and each card carries a SAMPLE tag, matching the DEMO badge convention already used by `BuildPreview`. None of it can be read as our own results.
- Build, TypeScript, ESLint: passed. Contact regression tests: 7 passed.
- No horizontal overflow at 320, 390, 768, 1024, 1150, 1280, 1440, 1512 or 1920 px. Fragments are hidden at 1150 px and below, where the stage is too narrow to hold them beside the copy; confirmed by computed style at each width.
- Axe WCAG 2 A/AA and 2.1 A/AA: zero violations on `/`, `/websites`, `/web-apps`, `/dashboards`, `/privacy` and `/scope-received` at 1440 px, and on `/` at 390 px.
- No console errors.

## September 7, 2026 — editorial restyle

Local implementation; production has not been deployed or changed. Re-ran the full bar below after retokenising `app/landing.css`, adding the display serif and moving the standalone pages onto the landing tokens.

- Production build, TypeScript and ESLint: passed for all 13 routes.
- Contact regression tests: 7 passed (`npm test`). The form still submits `website`, `name`, `email`, `projectType` and `broken`, which is what those tests assert.
- Browser widths 320, 390, 768, 1024 and 1440 px: no horizontal page overflow at any width.
- Axe WCAG 2 A/AA and 2.1 A/AA: zero violations on `/`, `/websites`, `/web-apps`, `/dashboards`, `/privacy` and `/scope-received` at 1440 px, and on `/` and `/privacy` at 390 px. The three service routes each open the preview on a different tab, so all three preview states were covered.
  - One real regression was found and fixed rather than exempted: `--lp-label` had been calibrated against the page canvas at 4.6:1, but the same label text also sits on the darker `--lp-mist` cards, where it measured 4.2:1. The token was darkened to `#676b62`, which clears 4.5:1 on canvas, fog and mist alike.
- Preview tabs, dashboard period toggle, web-app and website demo states, and the native FAQ `<details>`: all still switch correctly.
- Form: required-field validation, first-invalid focus and `aria-invalid` all behave as before.
- No console errors on any route.
- Reduced motion: no live component uses an entrance animation or `.reveal`, so nothing depends on animation to become visible.
- JavaScript disabled: the `<h1>`, both hero CTAs and the form markup are present in the server HTML.
- Dark system preference: the site is now deliberately light-only on every route, `.landing-page` included. `/privacy` previously followed the system theme and no longer does.

Screenshots below were recaptured for this change.

## September 6, 2026 — original landing page

Local implementation; production has not been deployed or changed.

- Production build and TypeScript: passed for home, three service pages and existing supporting routes.
- ESLint: passed.
- Contact regression tests: 7 passed (`npm test`); no real emails sent.
- Browser widths: 320, 390, 768, 1024 and 1440 px; no horizontal page overflow.
- Interactive dashboard period, app approval, website navigation, keyboard tabs and native FAQ: passed.
- Form: required-field validation, error focus, preserved values after failure, complete email fallback and mocked successful-delivery navigation passed.
- Campaign test: service choice, campaign name and Google click identifier were preserved in the submitted payload.
- Reduced-motion and dark system preference: primary content remains visible.
- JavaScript disabled: primary headline and enquiry CTA remain visible; form submission itself requires JavaScript.
- Axe WCAG 2 A/AA and 2.1 AA checks: zero detected violations on desktop in all three preview states and on the mobile homepage. This is an automated check, not a full accessibility certification.
- Unknown service route: correct not-found page.
- No browser page errors observed during the functional checks.

[Desktop first screen](preview-desktop.png) · [Mobile first screen](preview-mobile.png)

## Not verified by these checks

Production environment variables, inbox delivery, real booking availability, ad-platform conversion configuration, field Core Web Vitals, historic conversion rate, client outcomes and future conversion lift. Local mail credentials are absent, so provider outcomes were mocked. Page Duel analytics require reauthentication.

The Browser plugin could not initialize in this environment. Visual and interactive checks used a separate temporary Chrome profile through Playwright. Temporary browser-testing and formatting dependencies were installed under `/tmp/skox-qa`, not in the application.

The local server remains available at http://localhost:3100 for review. Use the existing Vercel release workflow when the production dependencies in the strategy report are resolved.
