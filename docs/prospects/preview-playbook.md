# The preview system

How a "yes, send me a preview" on a cold call becomes a scope call. The site is the bait. The system around it is what sells.

## The one idea

A preview site is not a website. It is a **sales asset that happens to be a website**. Its only job is to make the owner feel seen in the first 10 seconds and make the scope call feel inevitable. Judge every decision below by that, not by "is it a good site".

Three things make an owner forward the link to their spouse or partner:

1. **Their own stuff, better.** Their logo cleaned up, their real photos, their real Google reviews, their real prices, their real team names. Not a template with their name typed in.
2. **One thing that works.** Not a mockup of a quote form. A quote form that computes a price from their published rates, on their phone, right now. One interactive upgrade from the upgrade brief, built for real.
3. **The before.** A screenshot of their current site next to the new one, on a phone frame. They have never seen their site on a phone next to a good one. This is the slide that closes.

## The pipeline (six stages, two human gates)

```
CALL says yes
  → 1 RESEARCH   (automated, ~10 min)      facts ledger + asset pack + brief
  → 2 GATE A     (Josh, 3 min)             approve brief, pick the one working upgrade
  → 3 BUILD      (automated, ~30 min)      /concepts/<slug>-<hash>
  → 4 QA         (automated + Josh, 5 min) claims check, Lighthouse, mobile, forms
  → 5 SEND       (Reiss, same day)         email with phone-frame screenshot + link
  → 6 TRACK      (automated)               open alert → Reiss calls within 10 min
```

Target: link in the owner's inbox **within 24 hours of the call**. Momentum beats polish. A 90% site today beats a 100% site Thursday.

The master prompt in `scripts/lead-scan/preview-prompt.md` runs stages 1, 3 and 4. It stops after stage 1 and waits for Gate A unless told to run straight through.

## What you weren't thinking about

### Proof and truth

- **A facts ledger, not a vibe.** Every claim on the preview (years in business, "licensed and insured", a review quote, a price) gets a row: claim, source URL, date seen. The build may only use ledger rows. This is the same rule as the ads claims auditor, and it is why the preview will never embarrass Reiss on the follow-up call. Positioning rule: never invent proof.
- **Reviews are the hero copy.** Real Google and Yelp reviews, first name and initial, star count, date. Three to six, picked for specificity ("fixed our AC at 9pm on a Sunday"), not for stars. Pull the recurring phrases across all reviews and use them as the headline language. Owners recognise their customers' words instantly.
- **Photos: theirs first, licensed second, generated last and labelled.** Order of sourcing: their current site, Google Business Profile photos, public Facebook and Instagram, Yelp. Only then licensed stock (Unsplash, Pexels) and only for backgrounds. AI-generated imagery only when there is nothing and it must be captioned "placeholder, we'll shoot your real work". Never lift photos from a competitor or a manufacturer without licence.
- **Logo.** Pull the largest version from their site, favicon, Facebook profile. If it is a blurry JPEG, trace a clean SVG and show both: "we cleaned up your logo" is a free wow.

### The web-app upgrade is the product, the site is the wrapper

- Pick **one** upgrade from the upgrade brief and build it so it actually works with their real data: estimate from their $/sq ft, book a tasting at their $25, filter their menu by dietary tag. A working thing is a demo of SKOX's actual product (web apps), which is what we sell. A pretty brochure sells a brochure.
- Mock the other upgrades as labelled "coming in the build" cards. Do not fake interactivity.

### Forms route to Reiss, not to the void

- Every form on the preview submits to the SKOX contact API with a `preview:<slug>` tag. When the owner tests their own quote form, Reiss gets it and texts back in minutes. That is a live demonstration of speed-to-lead, which is half the pitch.

### Tracking the link is the whole follow-up strategy

- First open fires an alert to Reiss (the existing conversion fan-out can post it). He calls within 10 minutes while the owner is looking at it. This single mechanic will outperform every email sequence.
- Log `preview_sent_at`, `preview_first_open`, `preview_views`, device. Feed "preview sent" and "preview opened" into the lead brain as outcomes, so it learns which industries convert from preview to meeting.

### The page itself has a close

- A persistent bar: "This is a concept SKOX built for [Business]. Book 15 minutes with Reiss to make it live." One button, Reiss's calendar. A second, quieter one: "Ask a question", a one-field form.
- A "what happens next" strip: scope call → fixed price and date → you keep your domain, email and Google ranking (redirect plan). Those three answer the objections that stall every deal: who hosts it, can I edit it, will I lose my SEO.
- No price on the page. Fixed price and date come on the scope call (existing rule).

### Industry packs, so each preview is 80% reusable

- Build a pack per vertical: section order, the default working upgrade, trust signals that matter (HVAC: licence number, financing, service map; restaurants: menu, hours, order; contractors: gallery, estimate, insurance; medical and legal: compliance language, no outcome claims). The prompt loads the pack, then spends its effort on the 20% that is specific to this business.
- Start with the verticals the brain shows highest interest in. The report prints them.

### Legal and safety

- **It must not be mistakable for their live site.** Noindex, excluded from robots and sitemap, unguessable slug, a visible "concept by SKOX" label, no live payments. This is why `/concepts/` already does what it does.
- Their logo and photos are their property, shown privately to them, for them. That is fine. Third-party brand marks (Google, Yelp stars) follow those brands' usage rules.
- Expiry: previews come down 30 days after a "no" or 90 days of silence. A stale preview with their reviews on it is a liability, and takedown is a polite follow-up touch ("we're archiving your concept Friday").

### Economics and ops

- Time-box the build: 90 minutes of machine time, 10 minutes of Josh's. If the facts ledger is too thin to build honestly, stop and send a one-page "what we found" PDF instead. A thin preview is worse than none.
- Only build on a real "send me a preview", never speculatively. The brain scores who deserves one; the call earns it.
- **A yes means the preview becomes the base of the real build.** Say so on the scope call: "we've already started". It shortens delivery and makes the fixed date credible.
- Naming: `/concepts/<business-slug>-<8 hex>`. Research pack lives in `docs/prospects/previews/<slug>/` (ledger, assets, brief, QA report). Never commit raw scraped review dumps, only the ledger.
- Gate A is not optional while there are fewer than 20 previews shipped. After that, let it run straight through for packs that have proven clean.

### What the email needs (Reiss)

- Subject: their business name only.
- Three lines: one "I noticed" line from the ledger, one line on the one working thing, the link. One phone-frame screenshot inline (before and after). One ask: 15 minutes. Signature.
- Follow-up: day 2 (did it open on your phone?), day 5 (one new fact from the ledger), day 10 (archiving Friday). Stop. Log each as a call outcome.

## Lessons from the first run (Artisan's Kitchen, 2026-10-20)

- **Fonts and tokens are theirs, never SKOX's.** The first draft inherited Instrument Serif and Geist from the layout and read as a SKOX page. Load a pairing per concept.
- **No AI slop** is now a numbered rule in the prompt, with a banned list.
- **Screenshots of the new page need unique filenames.** Next's image optimizer caches by URL, so an overwritten `after.png` keeps serving the old frame.
- **Interactive beats static.** The compare slider, the live estimate and the order builder are what make the page feel built rather than mocked. Keep them honest: compute from published numbers, never total an unpublished price.
- **The "no awards found" case is normal.** Credibility then comes from ratings across platforms, the Chamber listing, a credential with a source, incorporation date, named clients from reviews, and any third-party video. Say nothing you can't link.
- **Apify may be out of quota.** The research agent fell back to reading Google's review dialog in the browser. Budget for that.
- Time: about 2.5 hours of machine time end to end, including the research agent's 17 minutes. Target is 90; the reusable pieces (compare, estimate, order builder, credentials, video facade) should be lifted into shared concept components next.

## Automating it from the portal (designed 2026-10-21)

The portal's deals move through lead → initial_outreach → proposal_sent → negotiation → won/lost, and Reiss logs calls in the call desk. Today "preview requested" only exists as words in a call note, which is what the lead brain greps for. Automation needs it to be a real state.

### The state machine on the deal

`preview_status`: none → requested → researching → awaiting_approval → building → ready → sent → opened → archived, with `preview_requested_at`, `preview_url`, `preview_sent_at`, `preview_first_open_at`. Reiss sets "requested" with one tap when he logs the call (or picks the "preview requested" call outcome). Everything after that is machine-driven except one tap from Josh.

### Trigger

Two options, pick the first to start:

1. **Pull.** A scheduled Claude Code routine (cloud, every 15 minutes, working hours) queries the portal for deals with `preview_status = requested`, takes the oldest, sets `researching`, and runs Stage 1 of the master prompt. Simple, uses the `schedule` skill and the Neon connection, nothing new in the portal beyond the columns and a tiny internal API.
2. **Push.** The portal's status change calls a webhook that starts a session at once. Faster, needs a trigger endpoint and a secret. Do this once pull is proven.

### Gate A without a chat

Stage 1 writes the brief and posts it to the deal as a note with three buttons: Go, Go with changes (a text box), No-go. The routine stops at `awaiting_approval`. Josh taps in the portal; the next tick picks it up and runs Stages 3 to 5.

### Where the page lives

The build commits the route on a branch and opens a PR. **Vercel's preview deployment of that PR is the preview link**: a URL per branch, private, noindex, no merge needed, and forms work because the preview environment has the same env vars. Merge only when the deal is won, at which point the concept becomes the base of the real build. Lost deals: close the PR, the URL dies, takedown is automatic.

### Writing back

The routine saves `preview_url` on the deal, sets `ready`, and posts to Reiss (Slack or SMS) with the email draft and the phone-frame composite attached. He sends it himself; the preview beacon's first `preview_open` event sets `opened` and pings him again.

### What has to be built, in order

1. Portal: the columns above, the call-desk tap, a `GET /api/previews/queue` and `PATCH /api/previews/:dealId` guarded by a service secret, and the approve buttons on the deal note.
2. Repo: lift the reusable concept components (concept bar, compare slider, estimate, order builder, credentials, video facade) into `app/concepts/_shared/` so a build is mostly data plus a few new sections.
3. The routine: a scheduled Claude Code job that reads the queue and runs the master prompt with the deal's row as INPUT, in `research-only` then `full` mode depending on `preview_status`.
4. The `preview_open` listener and the Reiss notification.

### Honest limits

- The research stage is scriptable; the build stage is model judgment and will vary. Gate A stays human until 20 previews have shipped clean.
- One preview at a time. A queue, not parallel builds, so two never fight over the repo.
- Thin businesses get a no-go and a one-page "what we found" instead. The routine must be allowed to say no.
- Measure cost on the first five before promising a per-preview number.

## Measuring whether this works

| Question | Number |
|---|---|
| Are we fast | hours from call to send (target under 24) |
| Does it land | preview open rate within 48h |
| Does it sell | preview → scope call booked |
| Is it honest | claims failures caught in QA (should trend to zero) |

The lead brain report should print these next to the industry table once 10 previews are out.
