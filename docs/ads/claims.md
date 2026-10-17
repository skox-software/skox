# Claims allowlist

Every line of ad text (headline, description, sitelink, callout, snippet, on-image text, video caption, primary text) must map to a claim ID below. If it doesn't, it isn't approved.

**Source of truth:** `content/landing.ts` at the line cited. Never use `content/site.ts` as evidence; most of it is legacy copy that no page renders (refusals, the "date is the product" section, the price band, the 10-day automation sprint).

Paraphrase is allowed when the meaning is identical and no stronger. "Fixed price before you pay" restates C03. "Guaranteed price" does not; it adds a guarantee.

**Sign-off:** Reiss signed off this allowlist and the trade-page wording (T01–T06). Confirmed by Josh in chat, 2026-10-14.

## Allowed

| ID | Claim (as on the site) | Source | Status | Notes |
|---|---|---|---|---|
| C01 | "Your next big thing. Built at speed." | `landing.ts:103–104` | ALLOWED | Route variants: "Your next web app / dashboard / website." (`:20`, `:42`, `:64`) |
| C02 | "Custom web apps, dashboards and websites" | `landing.ts:106` | ALLOWED | Keep this order except on `/websites` ads |
| C03 | "a fixed price and a delivery date agreed upfront" | `landing.ts:106` | ALLOWED | Also `:154` "A delivery date in writing, before you pay" and `:191` "A fixed price, agreed in writing before you pay anything" |
| C04 | "Free 30-minute scope call. No deposit. No obligation." | `landing.ts:109` | CONDITIONAL | **"No deposit" refers to the scope call only.** Builds do take a deposit (Lorenzen: 50%). Never write "No deposit" alone as a callout or headline; write "Free scope call, no deposit" or "No deposit for the call". |
| C05 | "Fixed price, agreed upfront" | `landing.ts:132` | ALLOWED | |
| C06 | "Direct access to the builders" | `landing.ts:133` | ALLOWED | Also "Talk to the builders. Work with the founders." (`:220`) |
| C07 | "You own the code" | `landing.ts:134` | ALLOWED | Also `:193` "You own the code and the accounts from day one", FAQ `:324` "code, repositories and accounts" |
| C08 | "14-day focused dashboard build" | `landing.ts:39` | CONDITIONAL | Only in dashboard ads landing on `/dashboards` or `/`. The ad must not drop "focused" in a way that implies any dashboard ships in 14 days; at least one description in the same ad says scope/data/access is agreed first. Never "two weeks". |
| C09 | "7-day focused site build" | `landing.ts:61` | CONDITIONAL | Only in website ads landing on `/websites` or `/`. Same rules as C08 with "content and access". Never "one week". |
| C10 | "a reply within one business day" | `landing.ts:267`, `:292` | ALLOWED | |
| C11 | "Get my price & timeline" | `landing.ts:107`, `:295` | ALLOWED | CTA |
| C12 | Timeline row: "A delivery date in writing, before you pay" vs big shop "Months" vs freelancer "Unpredictable" | `landing.ts:152–157` | CONDITIONAL | Alternatives described generically. Never name a firm, never put a number on their price or timeline beyond the site's own words. |
| C13 | Price row: "Fixed upfront, with no agency overhead" vs "High, often billed by the hour" vs "Low, but a gamble" | `landing.ts:158–163` | CONDITIONAL | Same as C12. "No hourly billing" is a fair restatement. |
| C14 | Who row: "The two founders building it" vs "An account manager" vs "One person, if they reply" | `landing.ts:164–169` | CONDITIONAL | "No account managers" is a fair restatement. |
| C15 | Change row: "Agreed in writing, with a working review halfway" vs "Change orders" vs "Start over" | `landing.ts:170–175` | CONDITIONAL | Same as C12. |
| C16 | "Between expensive and risky." | `landing.ts:143` | ALLOWED | |
| C17 | "Review working software at the halfway mark" | `landing.ts:215` | ALLOWED | |
| C18 | "A delivery date set at kickoff, not re-estimated later" | `landing.ts:192` | ALLOWED | |
| C19 | "The plan is yours, whether you hire us or not" / "Keep the scope either way" | `landing.ts:271`, `:209` | ALLOWED | |
| C20 | "A 30-minute conversation with a founder" | `landing.ts:269` | ALLOWED | |
| C21 | Service details: customer portals, internal tools, accounts, payments & integrations, connected data from your existing tools, location & team performance views, custom design built for mobile, lead capture & booking integrations | `landing.ts:12–15`, `:34–37`, `:56–59` | ALLOWED | |
| C22 | "Stop rebuilding the same report" / "one clear view of your business" | `landing.ts:33`, `:45` | ALLOWED | |
| C23 | "Need your tools connected, or a workflow automated? We build that in, too." | `landing.ts:183` | ALLOWED | Supporting line only, never the headline offer |
| C24 | "Independent software studio" | `landing.ts:102` | ALLOWED | |
| C25 | "Good ideas deserve to be built." | `landing.ts:302` | ALLOWED | |
| C26 | "Help me figure it out" / "Do I need to know exactly what I want? No." | `landing.ts:280`, FAQ | ALLOWED | |
| C27 | Our own products: Tender (a second-opinion marketplace for CFOs) and FocusTap | `landing.ts:246–255` | CONDITIONAL | Always "our own products", never client work. No links exist yet. |

## Needs Reiss (borderline; not usable until signed)

| Line | Where it came from | Why it's borderline |
|---|---|---|
| "No lock-in" | `output/skox-hype/AD-UPLOAD.md` and the 20s video | No site line says it. C07 (you own the code) implies it. Either add it to the site or drop it from the video's next cut. The current video already says it, so **the video needs this signed before it runs as an ad.** |
| "Built in days" | 20s video copy | Only true for the two focused builds. Fine next to "7-day" / "14-day" on screen; not alone. |
| "They quoted you quarters?" | 20s video hook | A question, not a claim about a named firm. Probably fine; confirm. |
| "Two founders · Nobody in between" | 20s video | Restates C14. Probably fine; confirm. |
| Any "7 business days" wording | San Julián's proposal | Waiting on calendar vs business days. |

## Forbidden

Any of these fails the whole ad, no matter how it's phrased.

| Family | Examples | Why |
|---|---|---|
| Refunds or guarantees | "money-back guarantee", "guaranteed delivery", "or it's free", "risk-free", "100% satisfaction" | No refund promise exists. Contracts say the deposit isn't refunded (`docs/agreements/lorenzen-motors-website-agreement.md`). Google and Meta also treat unbacked guarantees as misrepresentation. |
| Invented proof | testimonials, star ratings, "trusted by", client logos, "100+ projects", any client result or metric | None exist (`components/Proof.tsx` is empty on purpose). Josh's rule: no invented proof. |
| AI as the method | "AI-powered development", "built with AI so it's faster", "AI-assisted" | AI is a product, never the method. Clients re-price work when they know the method. |
| AI front desk / phone agent | "AI receptionist", "never miss a call" | Not this offer, not yet delivered. |
| Any price | "$1,250 websites", "from $X", "under $5k", "affordable", "cheap", "budget" | No price is on the site. "Cheaper" is only ever "no agency overhead / no hourly billing". |
| Location | "Orlando", "Winter Park", "Florida", "local", "near you" | Removed from the site on purpose. Targeting can be geographic; copy can't. |
| Named competitors or platforms | Toptal, Upwork, Fiverr, any agency name; Wix, Squarespace, WordPress, Power BI, Tableau in copy | Never name a firm (`landing.ts:137–140`). Trademarks are a policy risk. Platform names may appear only as negative keywords. |
| Legacy offers | "10-day automation", "Command Center", "Operator Retainer", "$6,500–$75,000" | `content/site.ts` only; not on the live page. |
| Superlatives without proof | "fastest", "best", "#1", "top-rated", "guaranteed fastest" | Unverifiable; policy risk. "Built at speed" is the ceiling. |
| Scarcity or urgency not on the site | "only 2 spots left", "book this week", countdowns | Scarcity is switched off (`content/site.ts` `concurrentBuilds: null`). |
| Profanity | any | Josh removed all of it so Google doesn't ding the landing pages. |
| Services SKOX doesn't sell | native iOS/Android, 24/7 support, staff augmentation, rescuing someone else's codebase, ads management | Not offered. |
| Homepage pipeline count and client list (live 2026-10-06) | "4 builds in the pipeline", "Lorenzen Motors", "client work" | Not in ads until Josh confirms the count stays accurate and Lorenzen agrees to be named in ads. `landing.ts:256–261`, `:239–245`. |
| Unconditional day promises | "Live in 7 days", "a dashboard in two weeks, guaranteed" | C08/C09 are conditional on scope, content, data and access. |

## Added 2026-10-14 (Josh's answers)

| ID | Claim | Source | Status | Notes |
|---|---|---|---|---|
| T07 | "Works alongside the software you already use when it allows a connection, or replaces it." | Josh, 2026-10-14; rendered as the trade-page FAQ "Do we have to replace the software we already use?" | ALLOWED | Never "integrates with everything" and never name the software. The connection is confirmed on the scope call (matches CONNECT_FAQ). |
| T08 | "Built for your company, connected to the tools you already use. You own the code." | T06 + C07, trade-page hero line | ALLOWED | |
| T09 | "Custom doesn't mean a six-figure project anymore." / "Isn't custom software expensive? Not the way it used to be…" | Josh, 2026-10-14 ("whatever converts best"); `/for/` own-vs-rent section and FAQ | ALLOWED | True of every SKOX build to date. Reason given is no overhead (two founders, no account managers, no hourly billing), never AI. |
| T10 | "Subscription apps charge you every month, per user, for features built for someone else." | Josh, 2026-10-14; `/for/` own-vs-rent section | ALLOWED | Describes the category generically. Never name a vendor or quote their prices. Always pair "priced once" with "Care plans are optional". |
| T11 | "Focused builds start at $5,000." | Josh, 2026-10-14; `/for/` own-vs-rent section, FAQ and calculator (`STARTING_PRICE` in `app/for/[trade]/page.tsx`) | ALLOWED on `/for/` pages and their ads only | First public price. The homepage and service routes still show no price. Never "$5,000 builds" or "only $5,000"; it's a floor ("start at", "from"). Websites are separate and never priced on trade pages. Founding-client discounts are private, never advertised. |
| — | Monthly fees | Josh, 2026-10-14 | **FORBIDDEN: "no monthly fees", "no subscription"** | Hosting and care plans are offered after launch (`landing.ts` FAQ "Can you help after launch?"). "You own the code" (C07) is fine. "No per-seat fees" stays NEEDS JOSH. |

## Trade pages (live since 2026-10-06)

Source: `content/trades.ts`, rendered at `/for/[slug]`. Each trade's `keyword`, `intro`, `pains` and `builds` are site copy and may be used in ads **only in the ad group that lands on that trade's page**. Pains are descriptions of the trade's problems, not claims about SKOX. Builds describe what we would build, never what we have built.

| ID | Claim | Source | Status | Notes |
|---|---|---|---|---|
| T01 | "{Trade keyword}. Built at speed." e.g. "Plumbing dispatch software" | `trades.ts` `keyword` per trade | CONDITIONAL | Only in that trade's ad group, landing on `/for/{slug}` |
| T02 | Trade pains, paraphrased as a question or statement ("One burst pipe rewrites the whole day") | `trades.ts` `pains` | CONDITIONAL | Same ad group only. A pain is not a promise. |
| T03 | Trade builds ("A dispatch board", "A quote builder", "Truck stock tracker") | `trades.ts` `builds` | CONDITIONAL | Say "we build" or name the tool. Never "we built for plumbers" or any past-work claim. |
| T04 | "Try a working example" / "See it working" | trade page example section | ALLOWED | The example is a labelled concept. Never call it a client's system. |
| T05 | "Free Monday scorecard" / "Free locations scorecard" | `/scorecard` | ALLOWED | Lead magnet, live |
| T06 | "Connected to the tools you already use" | `trades.ts` `connects`, C21 | ALLOWED | Never name the tools |

Needs Reiss: the trade-page wording itself (all eight `/for/` pages), and the extra trust line "The two founders who build it, on every call" (restates C06/C14).
