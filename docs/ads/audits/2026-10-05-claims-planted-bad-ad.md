# Claims auditor — planted-bad-ad (fixture) — 2026-10-05

**Verdict:** FAIL

Input: `docs/ads/audits/fixtures/planted-bad-ad.md` (Search – Fixture – US, ad group Dashboards, final URL `/dashboards`).
Each line was judged on its text only. The ✓/✗ markers in the fixture were ignored as evidence.

**Totals:** 17 ad lines. 13 blocked lines (11 FORBIDDEN, 1 CONDITIONAL-BROKEN, 1 FORBIDDEN + CONDITIONAL-BROKEN), 4 clean. There are also 2 stale-citation blockers against `claims.md`. Both are explained under Blockers.

## Line table

| # | Line (verbatim) | Where | Class | Claim ID / rule | Evidence |
|---|---|---|---|---|---|
| H1 | Money-Back Guarantee | Headline 1 | FORBIDDEN | Refunds or guarantees | `claims.md:59`. No refund exists anywhere in `landing.ts` |
| H2 | AI-Powered Speed Builds | Headline 2 | FORBIDDEN | AI as the method | `claims.md:61`. `landing.ts` never mentions AI. "Built at speed" (C01, `:104`) is the ceiling |
| H3 | Orlando's Fastest Dev Team | Headline 3 | FORBIDDEN | Location + unproven superlative | `claims.md:64`, `:67`. Site says "Working everywhere" (`landing.ts:102`) |
| H4 | $1,250 Websites | Headline 4 | FORBIDDEN | Any price | `claims.md:63`. No price on the site. FAQ `landing.ts:300` says price comes from the scope call. It is also a websites line in a dashboards ad group (see Non-blockers) |
| H5 | 5-Star Rated By Clients | Headline 5 | FORBIDDEN | Invented proof (rating) | `claims.md:60`. No ratings or testimonials on the site |
| H6 | 10-Day Automation Sprint | Headline 6 | FORBIDDEN | Legacy offer + unconditional day promise | `claims.md:66`, `:71`. Only in `content/site.ts`, not `landing.ts` |
| H7 | Better Than Toptal | Headline 7 | FORBIDDEN | Named competitor (+ unproven superlative) | `claims.md:65`, `:67`. `landing.ts:137–140` says never name a firm |
| H8 | Cheap Custom Software | Headline 8 | FORBIDDEN | Price adjective | `claims.md:63`. The only allowed cost framing is "no agency overhead" (C13, `landing.ts:160`) |
| H9 | Live In 14 Days. Guaranteed! | Headline 9 | FORBIDDEN + CONDITIONAL-BROKEN | Guarantee + unconditional day promise. C08 condition broken | `claims.md:22`, `:59`, `:71`. Site says "14-day focused dashboard build" (`landing.ts:39`) and "Timing depends on agreed data sources and access" (`:40`). This line drops "focused", turns the build into "live", and adds a guarantee |
| H10 | FREE Power BI Dashboards | Headline 10 | FORBIDDEN | Named platform (+ unsourced "free" build) | `claims.md:65`. The only free thing on the site is the scope call (`landing.ts:109`). Builds have a fixed price (`:300`) |
| H11 | Fixed Price, Agreed Upfront | Headline 11 | ALLOWED | C05 | `landing.ts:132` verbatim |
| H12 | Talk To The Builders | Headline 12 | ALLOWED | C06 | `landing.ts:220` "Talk to the builders." (C06 notes list the team title) |
| D1 | Trusted by 100+ businesses. Only 2 build slots left this month, book now!!! | Description 1 | FORBIDDEN | Invented proof ("trusted by", count) + fake scarcity/urgency | `claims.md:60`, `:68`. No client count on the site. Scarcity is switched off (`concurrentBuilds: null`) |
| D2 | No deposit, no risk. If we miss the date it's free. | Description 2 | FORBIDDEN + CONDITIONAL-BROKEN | Refunds or guarantees ("or it's free", "no risk"). C04 "No deposit" not tied to the scope call | `claims.md:18`, `:59`. Builds take a deposit (C04 note). The site only says "No deposit" next to "Free 30-minute scope call" (`landing.ts:109`, `:177`) |
| D3 | Free 30-minute scope call. A fixed price and delivery date before you pay. | Description 3 | CONDITIONAL-MET (C04) + ALLOWED (C03) | C04 (scope-call clause, no "No deposit"), C03 | `landing.ts:109` "Free 30-minute scope call"; `:106`, `:154`, `:191`, `:259`. Paraphrase is no stronger |
| CO1 | No Deposit | Callout | CONDITIONAL-BROKEN | C04 | `claims.md:18` says, word for word, never use "No deposit" alone as a callout. Use "No deposit for the call" or "Free scope call, no deposit" |
| CO2 | 24/7 Support | Callout | FORBIDDEN | Services SKOX doesn't sell | `claims.md:70`. FAQ `landing.ts:316`: "We do not provide 24/7 on-call coverage." |
| CO3 | You Own The Code | Callout | ALLOWED | C07 | `landing.ts:134` verbatim |

## Blockers

| # | Where | Problem | Rule or source | Fix |
|---|---|---|---|---|
| 1 | H1 | Money-back guarantee | Forbidden: refunds/guarantees (`claims.md:59`) | Delete |
| 2 | H2 | AI as the build method | Forbidden: AI as the method (`claims.md:61`) | Delete. Use C01 "Built At Speed" |
| 3 | H3 | Location + "Fastest" | Forbidden: location, superlatives (`claims.md:64`, `:67`) | Delete |
| 4 | H4 | Price in copy | Forbidden: any price (`claims.md:63`) | Delete |
| 5 | H5 | Star rating claim | Forbidden: invented proof (`claims.md:60`) | Delete |
| 6 | H6 | Legacy 10-day automation offer | Forbidden: legacy offers, unconditional day promise (`claims.md:66`, `:71`) | Delete |
| 7 | H7 | Names Toptal | Forbidden: named competitors (`claims.md:65`) | Delete. C12–C15 describe alternatives generically |
| 8 | H8 | "Cheap" | Forbidden: price adjective (`claims.md:63`) | Delete. Use C13 "No Agency Overhead" |
| 9 | H9 | Guaranteed 14-day go-live | Forbidden: guarantee + unconditional day promise. C08 broken (`claims.md:22`, `:71`) | Replace with "14-Day Focused Dashboard Build" and add a description saying scope, data and access are agreed first |
| 10 | H10 | Names Power BI. Implies a free build | Forbidden: named platform (`claims.md:65`). Unsourced "free" | Delete |
| 11 | D1 | "Trusted by 100+", "2 slots left", "book now!!!" | Forbidden: invented proof, fake scarcity/urgency (`claims.md:60`, `:68`) | Delete |
| 12 | D2 | "No risk… if we miss the date it's free". "No deposit" not tied to the call | Forbidden: refunds/guarantees. C04 broken (`claims.md:18`, `:59`) | Delete |
| 13 | CO1 | "No Deposit" on its own | C04 condition broken (`claims.md:18`) | "No Deposit For The Call" |
| 14 | CO2 | 24/7 support | Forbidden: services not sold (`claims.md:70`). Contradicts `landing.ts:316` | Delete |
| 15 | Whole ad | Combinations go further than any single line. H9 + D2 + H11 read as a guaranteed date with a refund. CO1 + D2 read as "no deposit on builds". D1 + H5 + H3 stack invented proof and a location. | Method step 3 | Fixed by removing the lines above |
| 16 | `claims.md:39` (C25) | Stale citation. C25 cites `landing.ts:286`, which is `formPrivacy`. "Good ideas deserve to be built." is at `landing.ts:290`. | Method: stale `claims.md` is a blocker | Josh/Reiss update `claims.md`. The auditor doesn't edit it. Not used by any line in this ad |
| 17 | `claims.md:33`, `:40` (C19, C26) | Off-by-one citations. "Keep the scope either way" is at `landing.ts:209` (cited `:208`). "Help me figure it out" is at `:269` (cited `:270`). | Method: stale `claims.md` is a blocker | Update the line numbers in `claims.md`. Not used by any line in this ad |

## Non-blockers

| # | Where | Problem | Suggestion |
|---|---|---|---|
| 1 | All lines | No claim IDs were written next to the lines, so step 4 (ID check) had nothing to check | Put the claim ID next to each line in real campaign files |
| 2 | `claims.md:9` | The Reiss sign-off is blank. That is a non-blocker here because the fixture is marked "do not upload", not ready to launch | Must be signed before any real campaign launches |
| 3 | H4 | A websites line in an ad group that lands on `/dashboards` | Message-match issue. Hand to landing-auditor |
| 4 | H10, D1 | All-caps "FREE" and "!!!" are likely Google editorial disapprovals | Hand to policy-auditor |
| 5 | Clean set | H11, H12, D3 and CO3 are the only approvable lines. With H9 removed, the dashboards ad has no line using C08, so it doesn't need a scope/data/access description. If C08 is added back, D3 is not enough: it mentions price and date, not scope/data/access | Add a description such as "Scope, data and access agreed first" if C08 is used |

## Inputs I could not check
- None that affect the verdict. `/dashboards` exists as a live route: `app/[service]/page.tsx` builds it from `builds` in `content/landing.ts`. Grep was not available in this session, so wording was checked by reading `content/landing.ts` in full.

## Sources read
- `.claude/agents/claims-auditor.md`
- `docs/ads/audits/fixtures/planted-bad-ad.md`
- `docs/ads/claims.md`
- `docs/ads/README.md`
- `content/landing.ts`
- `app/[service]/page.tsx`
