# StoryBrand message — SKOX offer review (2026-10-14)
Framework: *Building a StoryBrand*, Donald Miller, 2017 (the SB7 framework). Elements used: Character and want, Problem (external, internal, philosophical, plus the villain), Guide (empathy and authority), Plan (process and agreement), Call to action (direct and transitional), Failure (stakes), Success, and the grunt test.

Focus: the trade landing pages (template `app/for/[trade]/page.tsx`, landscaping entry in `content/trades.ts`) and the Google Search offer that sends traffic to them (`docs/ads/campaigns/google-search-v2.md`, `docs/ads/campaigns/google-search-v2-web-upload/5-responsive-search-ads.csv`). The homepage (`content/landing.ts`, `components/LandingPage.tsx`) is covered more briefly.

This report applies the framework as it is published. It does not speak for the author.

## Verdict in one paragraph

The landscaping page is better than most at two parts of the story. It names the customer's **external problem** in the customer's own words ("The day lives in five apps and a whiteboard", `content/trades.ts:169`). It also gives a **direct CTA** with no ambiguity ("Get my price & timeline", `app/for/[trade]/page.tsx:79-81`, `:93-95`). It is missing the two elements that turn a list of features into a story: **stakes** (what doing nothing costs) and **success** (what Monday looks like afterwards). Neither appears anywhere on the page. Most of the hero is also about SKOX rather than the customer. The accent is "Built at speed" (`page.tsx:89`). The trust strip is SKOX's three commitments plus "The two founders who build it" (`page.tsx:105-110`). The intro ends on SKOX's terms (`content/trades.ts:163`). The customer's want, a company where every crew is working and every property pays, is never stated. The Clarity data fits this reading, though it is far too thin to prove anything. In seven paid sessions there were zero taps (`docs/ads/reviews/2026-10-11-google.md:113`). A desktop visitor read the hero and the pains for a minute and then left (`:115`). An iPhone visitor spent about five active minutes, came back the next morning and still took no step (`:116`). The visitors recognized the problem but were never shown the outcome or the cost of waiting. The ad has the same gap. Its shared tail is nine lines of guide credentials (`google-search-v2.md:152-162`). Its display path still says `fleet` after the page was rewritten for "landscaping software" (`5-responsive-search-ads.csv:5`). The fix is copy, not a rebuild. Add a stakes-and-success band, restate the hero intro around the customer's want, and pull the 3-step plan up to the hero. All of it can be built from claims that already exist (T02, T03, C03, C04, C07, C17). It still needs Reiss's sign-off on the trade-page wording (`docs/ads/claims.md:87`).

## One-liner (problem → solution → success), landscaping

> When crews, routes, equipment and job costs live in five apps and a whiteboard, crews wait on calls and underpriced properties hide until year end. We build custom software around how your company already runs, with a fixed price and delivery date in writing before you pay. You see every crew and route in one place, and you know which properties actually make money.

Sources: problem T02 (`content/trades.ts:169-171`). Solution T01/T03 and C03 (`content/trades.ts:161-163`, `content/landing.ts:106`). Success is a paraphrase of T03 builds (`content/trades.ts:175-176`). **NEEDS JOSH:** this is new trade-page wording and needs Reiss's sign-off under `claims.md:87`.

## BrandScript: /for/landscaping

| SB7 element | What the page says now (file:line) | What it should say (allowed claims only) | Claim IDs |
|---|---|---|---|
| Character and want | Eyebrow "For lawn & landscaping companies" (`page.tsx:87`). The want is never stated. | Want: "every crew working, every property paying." Say it as an outcome in the intro (Top 5 #1). | T03 paraphrase |
| External problem | Three good pains (`content/trades.ts:169-171`) | Keep as written | T02 |
| Internal problem | Only implied: "the office spends the morning on the phone" (`content/trades.ts:169`) | Name the feeling with the page's own facts: the owner finds out too late (a crew calls in, at year end) | T02 paraphrase |
| Philosophical problem | Absent | "You shouldn't have to bend your company around software." This restates "built around how you already work" (`content/trades.ts:161`) without making a new claim. | T01 description |
| Villain | Implied: "five apps and a whiteboard" (`content/trades.ts:169`). For "landscaping software" searchers the real comparison is a subscription that doesn't fit (`docs/ads/research/competitors-2026-10-14.md:23`), and the page never addresses it. | Name the villain generically as scattered tools and software that doesn't fit how you run. Never name a vendor. | T02, C07 |
| Guide: empathy | "Sound familiar?" (`page.tsx:114`) and owner-voice pains | Keep | T02 |
| Guide: authority | Trust strip (`page.tsx:105-110`, `content/landing.ts:131-135`). A working concept honestly labelled as one (`page.tsx:141-143`). Founder bios exist on the homepage only (`content/landing.ts:223-235`). | Authority available now: the live example (T04), the founders' real bios, and "You own the code" (C07). There are **no** testimonials or results, so add none. | T04, C06, C07, C24 |
| Plan: process | Three steps exist but sit 6th on the page (`page.tsx:180-192`, copy `content/landing.ts:199-218`). Desktop scroll map: 0% of visitors got past 80% (`reviews/2026-10-11-google.md:114`). | Repeat the plan as one line under the hero CTA (Top 5 #4) | C04, C03, C17 |
| Plan: agreement | Trust strip only. `buildAssurance` (`content/landing.ts:190-194`) isn't on trade pages. | Add an "own it" agreement block (Top 5 #3) | C03, C07, C18, T06 |
| Direct CTA | "Get my price & timeline" in the header, hero, under the example and in the sticky bar (`page.tsx:79`, `:93`, `:151`; `components/TradeStickyBar.tsx:40-46`) | Keep | C11 |
| Transitional CTA | "Try the example" (`page.tsx:96`), the scorecard (`page.tsx:194-203`), phone (`page.tsx:101-103`). The scorecard is pitched at locations and crews (`app/scorecard/page.tsx:53-55`), which fits multi-crew landscapers only loosely. | Keep "Try the example". Whether there's a lighter step that fits landscaping is UNKNOWN. Ask Josh. | T04, T05 |
| Failure (stakes) | **Absent** | Stakes band built from the pains (Top 5 #2) | T02 |
| Success | **Absent.** The nearest line is "Yours is built around your numbers" (`page.tsx:142`). | Success band built from the builds (Top 5 #2) | T03 |

## Grunt test

| Question | /for/landscaping | Homepage |
|---|---|---|
| What do you offer? | **Pass.** H1 "Custom landscaping software. Built at speed." (`page.tsx:89`, `content/trades.ts:158`) | **Pass.** The H1 keyword reads "Custom software development" (`components/LandingPage.tsx:42`, `:96`), above "Your next big thing." (`content/landing.ts:103`) |
| How does it make my life better? | **Weak.** The intro lists nouns ("crews, routes, equipment and what each property really costs you", `content/trades.ts:163`) and stops at SKOX's terms. No outcome is stated. | **Weak.** "We take what your business needs and turn it into working software" (`content/landing.ts:106`) makes SKOX the subject of the sentence. |
| What do I do next? | **Pass.** "Get my price & timeline" plus "Free 30-minute scope call. No deposit. No obligation." (`page.tsx:93-100`) | **Pass.** Same CTA and reassurance (`components/LandingPage.tsx:107-120`) |

## Where SKOX is the hero instead of the customer

- `page.tsx:89`: the "Built at speed." accent describes SKOX's pace, not the customer's result. It is pinned in the ads and is C01/T01, so keep it, but the line under it has to carry the customer's outcome.
- `page.tsx:105-110`: the hero sidebar is all SKOX credentials. These are guide signals, which is fine, but they take the hero slot that should hold the customer's after-state.
- `page.tsx:163`: "What we'd build for a landscaping company". The heading under it, "Start with the one that hurts most." (`:164`), is customer-centric and is the stronger line.
- `content/landing.ts:102` "Independent software studio · Working everywhere", `:142` "01 / Why SKOX", `:195` "03 / How we move fast" and `:257-261` pipeline count: on the homepage, three of the five section eyebrows are about SKOX.
- Ad shared tail (`google-search-v2.md:152-167`): 9 of 15 headlines and 2 of 4 descriptions are guide credentials or CTAs. The customer's want appears only in D1 ("Crews, routes, equipment and job costs in one place, built around how you work.", `5-responsive-search-ads.csv:5`).

## Scorecard

| Framework element | Score 1–5 | Evidence (file:line) | Why |
|---|---|---|---|
| Character and want | 2 | `page.tsx:87`; `content/trades.ts:163` | The customer is identified (trade eyebrow, "For Landscaping Companies" pinned in ad position 2, `reviews/2026-10-11-google.md:71`), but what they want is never said. |
| Problem: external | 5 | `content/trades.ts:169-171` | Specific, in the owner's words, three distinct pains |
| Problem: internal | 2 | `content/trades.ts:169` | Only implied |
| Problem: philosophical | 1 | none | Absent |
| Villain | 2 | `content/trades.ts:169`; `reviews/2026-10-11-google.md:91` | "Five apps and a whiteboard" works. The page doesn't answer "why custom instead of a subscription?", which is the question this traffic is asking. |
| Guide: empathy | 4 | `page.tsx:114` | "Sound familiar?" plus owner-voice pains |
| Guide: authority | 3 | `page.tsx:105-110`, `:126-144`; `content/landing.ts:223-235` | An honest working example is the strongest signal available. Founder bios aren't on trade pages. There is no proof, correctly (`claims.md:60`). |
| Plan: process | 3 | `page.tsx:180-192`; `content/landing.ts:199-218` | A good three-step plan, but placed where nobody scrolled to |
| Plan: agreement | 3 | `page.tsx:105-110`; `content/trades.ts:62-65` | The commitments are there but scattered. Ownership is only in the FAQ. |
| CTA: direct | 5 | `page.tsx:79`, `:93`, `:151`; `components/TradeStickyBar.tsx:40-46` | Clear, repeated, the same wording everywhere |
| CTA: transitional | 3 | `page.tsx:96`, `:194-203` | Exists, but the scorecard is a loose fit for landscaping. Paid visitors used none of them (`reviews/2026-10-11-google.md:113`). |
| Failure (stakes) | 1 | none | Absent on the page and in the ad |
| Success | 1 | `page.tsx:142` | Absent; no after-state is described |
| Grunt test | 3 | see table above | Passes on offer and next step, weak on "life better" |
| Ad ↔ page story match | 3 | `5-responsive-search-ads.csv:5`; `google-search-v2.md:249` | The H1 matches the pinned headline 1. The display path is still `landscaping/fleet` and D2 is still about fleet alerts, after the page moved to running the whole company. |

## Top 5 changes (ranked by expected impact on qualified leads)

At 10 clicks and 0 leads (`reviews/2026-10-11-google.md:78-87`), none of this is proven by data. The ranking is by framework gap × where visitors actually stopped (hero and pains, `:114-115`).

| # | Change | Framework element | Exact copy or spec | Needs Josh? | Effort (S/M/L) |
|---|---|---|---|---|---|
| 1 | Rewrite the landscaping `intro` so it opens with the customer's want and the outcome, then the terms | Character and want; Success; grunt test "life better" | `content/trades.ts:163` → "See every crew and route in one place, catch equipment problems before a crew stands still, and know which properties actually make money. Built around how your company runs. Start with the part that hurts most. Fixed price and delivery date agreed in writing before you pay." (Paraphrases T02/T03 at `:170-176`; C03.) | **NEEDS JOSH**: new trade-page wording, Reiss sign-off (`claims.md:87`). Check that "catch equipment problems before a crew stands still" isn't read as a prediction promise; the campaign file dropped similar wording for that reason (`google-search-v2.md:269`). A safer alternative: "see which mower is due for service". | S |
| 2 | Add a stakes / success band directly under "Sound familiar?" (`page.tsx:113-124`), before the example. It needs two new optional fields on `Trade` (`stakes`, `success`), so all eight pages can get one. | Failure; Success | Left, "If nothing changes": "The office keeps spending mornings on the phone. Equipment problems keep surfacing when a crew calls in. Underpriced properties keep hiding until year end." Right, "Once it's built": "The crew lead sees today's route on their phone. Service-due alerts go out before a check is missed. Every property's hours, fuel and materials sit next to what you charge." (Stakes = T02 `:169-171`; success = T03 `:174-176`.) No numbers, no results, no "guaranteed". | **NEEDS JOSH**: same sign-off as #1 | M |
| 3 | Add an "own it" agreement-plan block for searchers comparing against subscriptions, as the villain contrast | Villain; Plan: agreement; Problem: philosophical | Heading: "Software that fits how you run, and that you own." Three lines, all existing claims: "Built around how your company already works" (`content/trades.ts:161`), "You own the code, the repositories and the accounts" (C07, `content/trades.ts:64`), "Connected to the tools you already use" (T06). **Do not** write "no subscription", "no monthly fees" or "no per-seat fees": hosting and support are billed separately (`content/landing.ts:312`, `:328`; private hosting fee in `docs/ads/offer.md:60`). Never name a vendor. | **NEEDS JOSH**: the heading is new wording. Any "no per-seat fees" line needs a separate decision (`reviews/2026-10-11-google.md:96`). | S |
| 4 | Repeat the 3-step plan as one line under the hero CTA, so the plan sits where visitors stop | Plan: process | Under `page.tsx:100`: "1. Free 30-minute call · 2. Price and date in writing · 3. Review working software halfway". Restates `content/landing.ts:200-217`. | No (restates C04, C03, C17). Trade-page wording is still covered by the pending sign-off. | S |
| 5 | Make the landscaping ad tell the same story as the page: identify the customer, state the want and the stakes | Character and want; Failure; ad ↔ page match | Display path 2: `fleet` → `software` (8). Replace D2 "Alerts go to the crew lead, with service reminders before each check is due." with "Know which properties make money: hours, fuel and materials against what you charge." (84) [T02, T03]. Replace H4 "Job Costing Per Property" with "Know Which Properties Pay" (25) [T02]. Keep H1 pinned and the "For Landscaping Companies" qualifier pinned in position 2. Note: `google-search-v2.md:255-266` still lists the old fleet headlines, while the CSV is current. | **NEEDS JOSH**: every account change does. Run `claims-auditor` first. | S |

## What not to change, and why

- **Pains (`content/trades.ts:169-171`).** This is the strongest SB7 element on the page: an external problem in the customer's language. Visitors read it (`reviews/2026-10-11-google.md:115`).
- **H1 "Custom landscaping software. Built at speed."** It matches the pinned headline 1 and the search term (`reviews/2026-10-11-google.md:134-135`). Add the customer's outcome below it rather than replacing it.
- **The single CTA wording "Get my price & timeline" everywhere.** One direct CTA repeated is what the framework asks for. Don't split it into "Book a demo", "Contact us" and so on.
- **The concept label (`page.tsx:141-143`).** It is the honest authority signal. Removing it would turn the example into invented proof (`claims.md:60`, T04).
- **No testimonials, results or "trusted by".** The guide's authority has to come from the working example, the founders' real bios and the written commitments until real evidence exists. To get proof, ask the first trade client for a quote and permission in the agreement, and log a before/after on a metric the client tracks themselves.
- **Homepage H1 "Your next big thing."** This line does make the customer the hero ("your"). The homepage fixes are the "Why SKOX" and "How we move fast" eyebrows, which are lower priority than the trade pages that currently get all the paid traffic.

## Open questions for Josh (only facts the repo can't answer)

1. Has Reiss signed the trade-page wording (`claims.md:87`) and the extra trust line (`page.tsx:109`)? Changes #1–#4 add to that same review.
2. For a landscaping build, is there any recurring fee (hosting, support) by default? This decides whether any "own it vs rent it" line can go further than "you own the code".
3. Is there a lighter transitional step that fits a single-crew landscaper, such as a 15-minute call booking link? The review proposed one (`reviews/2026-10-11-google.md:127`), but no calendar link exists in the repo: UNKNOWN.
4. Should the founder bios (`content/landing.ts:223-235`) appear on trade pages? Joshua's bio is multi-location healthcare operations, not landscaping, so it can only be used as written, never stretched into trade experience.
