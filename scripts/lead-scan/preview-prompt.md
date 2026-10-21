# SKOX preview build: master prompt

Paste everything below the line into a fresh Claude Code session in `/Users/josh/SKOX`, filling in the INPUT block. Companion doc: `docs/prospects/preview-playbook.md`.

---

You are building a private preview website for a local business that told Reiss, SKOX's closer, "send me a preview" on a cold call. SKOX (skoxsoftware.com) is a two-founder studio that builds custom websites and web apps (quote builders, booking and deposit payments, ordering portals, customer portals, intake forms, dashboards) for local businesses at a fixed price and delivery date. The preview is a sales asset. Its job is to make the owner feel seen in 10 seconds and make a 15-minute scope call with Reiss feel inevitable.

## INPUT

```
business:        <exact name>
current_site:    <url or NONE>
phone:           <from the lead row>
city_state:      <city, ST>
industry:        <from the lead row>
upgrade_brief:   <path under docs/prospects/upgrades/ or NONE>
call_notes:      <what the owner said on the call, verbatim where possible>
owner_name:      <if known, else blank>
mode:            research-only | full
```

`research-only` stops after Stage 1 and waits for Josh's approval of the brief. `full` runs every stage.

## NON-NEGOTIABLE RULES

1. **Nothing on the page that is not in the facts ledger.** No invented reviews, awards, years, licence numbers, team members, prices, client names or statistics. If you cannot source it, leave it out or write a clearly labelled placeholder ("[your licence number]"). This is the rule that protects Reiss on the follow-up call.
2. **Their assets first.** Logo, photos and copy come from their own properties. Licensed stock (Unsplash, Pexels) only for backgrounds. AI-generated images only when nothing exists, captioned "placeholder, we'll shoot your real work".
3. **One upgrade actually works.** Pick one web-app upgrade and build it as a functioning interaction using their real published data. Mock the rest as labelled "in the build" cards. Never fake interactivity.
4. **It must never be mistaken for their live site.** Route under `app/concepts/<slug>-<8 hex>/`, `robots: { index: false, follow: false, nocache: true }`, a visible "Concept built by SKOX for <Business>. Not live." label, no live payments, no third-party trackers except SKOX's own.
5. **No SKOX price anywhere.** "Fixed price and date on the scope call."
6. **Do not contact the business.** Do not submit their forms, call, email, DM or leave reviews.
7. **Every form on the preview posts to SKOX's existing contact API** with `source: "preview:<slug>"`, so a test submission reaches Reiss, not the void.
8. **No AI slop.** The owner has seen a hundred template sites. Banned: three identical icon cards in a row, gradient blobs, emoji as icons, purple-to-blue gradients, generic stock of handshakes or smiling teams, "Welcome to our website", "We pride ourselves", "Look no further", "Elevate your", "Unlock", "Seamless", "Experience the difference", "Our team of experts", exclamation marks, headline + subhead + button repeated in every section, rounded-everything cards floating on a white void, fake "Trusted by 500+ clients" counters, placeholder testimonials, and lorem anything. Every section must earn its place with their real content. Headlines are their customers' words or their own, never marketing-speak. If a section would read the same for any business in the vertical, cut it or make it specific. Load `anthropic-skills:distinctive-frontend` before writing UI.
9. **It is their site, not SKOX's.** Never inherit SKOX's fonts (Instrument Serif, Geist), colours or layout patterns. Load this concept's own type pairing with `next/font/google` inside the route and scope every token under the concept's root class. Choose the pairing from their industry, their existing brand cues and the pack, and say in the brief why. SKOX appears only in the concept bar and the footer.
10. **Follow the repo's own conventions.** Read AGENTS.md and the Next.js docs it points to before writing code. Reuse components, fonts and the contact API already in the repo. Model the page structure on `app/concepts/san-julians-4c9f2a71/` and `app/concepts/mccaughey/`.

## STAGE 1: RESEARCH (write everything to `docs/prospects/previews/<slug>/`)

Budget: 15 minutes of wall time. Work in parallel where you can.

### 1a. Facts ledger (`ledger.md`)

A table: `claim | exact wording seen | source URL | date seen`. Collect, from their own site and public profiles only:

- Legal/trading name, tagline, founding year or "since", owner/principal/chef names and titles as they state them
- Services or products, with any published prices, minimums, deposits, terms
- Hours, address, service area (towns named), phone (confirm it matches INPUT), email
- Licences, insurance, certifications, affiliations (chamber, BBB, trade bodies), awards, press
- How a customer buys or books today (phone only, PDF form, contact form, email link)
- Everything broken on the current site: dead pages, missing mobile layout, Flash, typos, HTTP only, bad certificate, slow load. Record each with a URL.

Sources, in order: current site (homepage plus up to 8 internal pages, via `curl -sL -m 20 -A "Mozilla/5.0 Chrome/124" --compressed`), Google Business Profile, Facebook page, Instagram, Yelp, chamber listing, BBB. Use the Apify Google Maps reviews actor (already connected) for reviews; use web search sparingly and only to find those profiles.

### 1b. Reviews (`reviews.md`)

- Pull up to 50 Google reviews and any Yelp/Facebook reviews. Store only: first name and last initial, stars, date, text, source URL. Do not store reviewer profile links or photos.
- Compute: average rating, count, and the **ten most repeated phrases** across reviews (these become headline language).
- Shortlist 3 to 6 reviews for the page, chosen for specificity and story, not for stars. Mark which.

### 1c. Asset pack (`assets/`)

- Logo: largest available from site, favicon, Facebook/Google profile. Record source. If raster and low quality, produce a clean SVG trace and keep the original beside it; the page shows "we cleaned up your logo" as a before/after.
- Photos: every usable image from their own properties, deduplicated, with source URL in `assets/manifest.json`. Flag which are of their actual work, team, premises.
- Brand colours: sample from logo and site. Fonts they use, if any.
- **Screenshot of the current site** at 390px (phone) and 1440px (desktop) with Playwright, saved as `before-mobile.png` and `before-desktop.png`. If `current_site` is NONE, screenshot their Google Business Profile card instead.

### 1d. Industry pack

Load `docs/prospects/previews/_packs/<industry>.md` if it exists. If not, write it now before continuing, in this shape, and reuse it for every future business in that vertical:

- Section order for the vertical (what a buyer in this industry needs to see first)
- The default working upgrade and the default "in the build" upgrades
- Trust signals that matter here (licence, financing, insurance, certifications, compliance language)
- Compliance notes: no outcome claims for medical, legal or financial; no "best in" superlatives without a source; required disclaimers
- Three reference sites in the vertical that set the bar, with one line each on why

### 1e. The brief (`brief.md`), under one page

- **The owner in one paragraph.** What they sell, to whom, how buying works today, what the reviews say they are loved for. Facts only.
- **The one working upgrade** and exactly what data it uses from the ledger. If the upgrade brief exists, use it; otherwise derive it.
- **The headline and sub-headline** for the hero, built from review language and the service area.
- **Section plan** (from the pack, adjusted).
- **Risks:** anything thin, anything we cannot source, anything the pack flags for compliance.
- **Go / no-go.** If the ledger has fewer than 8 solid rows and under 5 usable photos, recommend NO-GO and propose a one-page "what we found" PDF instead. A thin preview is worse than none.

If `mode` is `research-only`, stop here and report: slug, ledger row count, review count and average, photo count, the proposed working upgrade, and the go/no-go.

## STAGE 2: GATE A

Josh reads `brief.md` and replies `go`, `go with changes: ...` or `no-go`. Apply changes to the brief before building.

## STAGE 3: BUILD

Budget: 45 minutes. Route: `app/concepts/<slug>-<8 random hex>/page.tsx` plus a scoped CSS file and any components. Load the `anthropic-skills:distinctive-frontend` skill before writing UI.

Design standard: this must look like a site a $15k agency shipped, not a template. Deliberate type pairing, a real colour system derived from their brand, generous spacing, one strong hero, photography treated well (consistent crop, grading if the pack calls for it), restrained motion. No stock-photo clichés, no gradient blobs, no emoji icons, no three-identical-cards-with-icons unless the pack justifies it.

Required sections, in this order unless the pack says otherwise:

1. **Concept bar** (sticky, top): "Concept built by SKOX for <Business>. Not live." plus "Book 15 min with Reiss" (link to Reiss's booking) and "Ask a question" (one-field form).
2. **Hero:** their cleaned logo, the headline from the brief, service area, phone as a tap-to-call, the primary CTA that opens the working upgrade. Their best real photo.
3. **Trust strip:** rating and count from the ledger, years, licence/insurance/affiliations. Only ledger rows.
4. **The working upgrade.** Fully functional, mobile-first, computes or books from their real data, submits to the SKOX contact API tagged `preview:<slug>`. Show the result on screen and confirm "Reiss will text you back; this is what your customers would see".
5. **Services/products** from the ledger with their prices where published.
6. **Reviews:** the shortlisted 3 to 6, with name, initial, stars, date, source. Link to the source profile.
7. **Gallery** of their real work (only if 5+ photos of actual work exist).
8. **About / team** using only named people from the ledger.
9. **"Before and after":** `before-mobile.png` in a phone frame beside the live new page in a phone frame (an iframe of this route at 390px, or a screenshot you take after build). Caption what was broken, from the ledger.
10. **"In the build" cards:** the other upgrades from the brief, each one line, labelled.
11. **"What happens next":** scope call → fixed price and date → you keep your domain, email and Google ranking (we redirect every old URL). No price.
12. **Footer:** their address, hours, phone, with the concept label repeated.

Technical requirements:

- `generateMetadata` with their name as title, `robots: { index: false, follow: false, nocache: true }`, no OpenGraph image of their brand (use SKOX's).
- Confirm `app/robots.ts` and `app/sitemap.ts` still exclude `/concepts/`.
- Lighthouse mobile: Performance 90+, Accessibility 95+. Images via Next's image pipeline, sized, with alt text from the manifest.
- Tap-to-call and tap-to-map links. Form fields with labels, error states, and a success state.
- Add a tiny view beacon that posts `{ slug, first_open, device }` to the existing analytics path so Reiss gets a first-open alert. Do not add any third-party tracker.
- No `console.log`, no lorem ipsum, no `TODO` left in the page.

## STAGE 4: QA (write `qa.md`)

1. **Claims audit.** List every factual statement rendered on the page and the ledger row it comes from. Any statement without a row is a FAIL; remove it and re-run. (The `claims-auditor` agent checks SKOX ad copy against the ads allowlist, not this; the ledger is the allowlist here.)
2. **Compliance.** Check against the industry pack's compliance notes.
3. **Function.** Submit the working upgrade and the question form with test data; confirm both arrive tagged `preview:<slug>`. Confirm the 404 page, tap-to-call, and every link.
4. **Devices.** Screenshot at 390, 768 and 1440 in light and dark (if the page supports dark). Check nothing overflows, no text under 16px on mobile.
5. **Performance.** Lighthouse mobile scores in the report.
6. **Privacy label.** Confirm the concept label is visible without scrolling on mobile.
7. **Make the sales screenshot:** a single PNG, `send/before-after.png`, phone frame of the old site beside phone frame of the new hero. This goes inline in Reiss's email.

## STAGE 5: HANDOFF (write `send/email.md`)

Draft Reiss's email. Subject: the business name only. Body, at most five lines:

- One "I noticed" line taken from the ledger's broken-site section, in plain words.
- One line on the one thing that works ("your quote form now prices a job from your own rates, try it on your phone").
- The link.
- One ask: 15 minutes, with Reiss's booking link.
- Reiss's signature (in the repo).

Also draft the three follow-ups for days 2, 5 and 10 (the last one says the concept is archived Friday). Then update the lead's row with `preview_url`, `preview_sent_at` (blank until Reiss sends) and push to the pipeline with `scripts/lead-scan/push_to_pipeline.mjs`.

## FINAL REPORT

Reply with: the route, ledger rows, review count and average, photos used, the working upgrade, Lighthouse scores, claims audit result (must be zero FAIL), anything left as a labelled placeholder, and the path to `send/email.md`. Do not deploy; Josh deploys through the normal flow.
