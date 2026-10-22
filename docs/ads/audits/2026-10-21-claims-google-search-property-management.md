# Claims auditor — google-search-property-management — 2026-10-21

**Verdict:** FAIL (1 blocker: the `/for/property-management` wording is not signed by Reiss). Every line is otherwise clean. Once Reiss signs, this is a PASS WITH FIXES (5 non-blockers, none required).

Scope: display path, H1-H15, D1-D4 and the six callouts in `docs/ads/campaigns/google-search-property-management.md`. T01-T03 were applied to this ad group as instructed. The `claims.md` rule is that they are usable only in the ad group that lands on that trade's page, and this ad group lands on `/for/property-management`.

Note on the campaign status: the file says "built PAUSED; enable after the claims and policy audits pass". I treated it as ready to launch, so the missing sign-off is a blocker. If Josh treats it as a draft, the blocker becomes a non-blocker.

## Blockers

| # | Where | Problem | Rule or source | Fix |
|---|---|---|---|---|
| B1 | H1, H3, H4, H5, H6, H7, H8, D1, D3 (every line that rests on T01-T03 for this page); campaign line 89 | Reiss has not signed the `property-management` wording (keyword, intro, pains, builds in `content/trades.ts:307-334`). The `claims.md:9` sign-off covers the allowlist and T01-T06 only. `claims.md:98` lists "all eight `/for/` pages" as Needs Reiss, and property management is the ninth. These lines are class NEEDS REISS until he signs. | `claims.md:9`, `claims.md:87`, `claims.md:98` | Get Reiss's sign-off on the property-management page wording. Then update `claims.md` (page count and sign-off date). Do not enable the campaign before then. |

Lines that do not depend on the unsigned page (H2, H9-H12, H15, D2, D4, the callouts) are unaffected by B1. H13 and H14 are not affected either.

## Line table

Source lines checked: `content/landing.ts` for C-claims, `content/trades.ts:307-334` for T01-T03, `app/for/[trade]/page.tsx:51` for `STARTING_PRICE`.

| # | Line (verbatim) | Where | Class | Claim ID / rule | Evidence |
|---|---|---|---|---|---|
| 1 | /property-mgmt/software | Display path | ALLOWED (path, not a claim) | T01 | `trades.ts:310`. No location, price or forbidden term. |
| 2 | Property Management Software | H1 | NEEDS REISS (T01 condition met, wording unsigned) | T01 | `trades.ts:310` keyword "Custom property management software". Dropping "Custom" is weaker, not stronger. Correct ID. |
| 3 | For Property Managers | H2 | ALLOWED | T01 qualifier | `trades.ts:308-309`. Same construction as the other trade ads. The line makes no claim. |
| 4 | Custom Property Mgmt Tools | H3 | NEEDS REISS | T01 | `trades.ts:310`, `:311`. |
| 5 | Maintenance Request Desk | H4 | NEEDS REISS | T03 | `trades.ts:326` "A maintenance request desk". Names the tool; no past-work claim. |
| 6 | An Owner Portal, Built for You | H5 | NEEDS REISS | T03 + T08 | `trades.ts:327` "An owner portal"; T08 "Built for your company". Fine. |
| 7 | Online Rental Applications | H6 | NEEDS REISS | T03 | `trades.ts:328`. |
| 8 | Repair Requests by Text? | H7 | NEEDS REISS | T02 | `trades.ts:321` pain, phrased as a question. A pain is not a promise. |
| 9 | Owners Calling for Updates? | H8 | NEEDS REISS | T02 | `trades.ts:322`. |
| 10 | Focused Builds From $5,000 | H9 | ALLOWED | T11 | `claims.md:82`; `app/for/[trade]/page.tsx:51` `STARTING_PRICE = "$5,000"`, shown at `:137`, `:204`. It is a floor ("From") and the ad lands on a `/for/` page. Not "only" and not "$5,000 builds". Websites are not priced here. |
| 11 | Fixed Price, Agreed Upfront | H10 | ALLOWED | C05 | `landing.ts:132`. |
| 12 | You Own the Code | H11 | ALLOWED | C07 | `landing.ts:134`. |
| 13 | Free 30-Minute Scope Call | H12 | CONDITIONAL-MET | C04 | `landing.ts:109`. No "No deposit" in the headline, so the C04 condition is met. |
| 14 | Try a Working Example | H13 | ALLOWED | T04 | `claims.md:94`. The page renders the `maintenance-desk` example (`trades.ts:317`, `page.tsx:37`). The ad does not call it a client system. |
| 15 | Connects to Your Tools | H14 | ALLOWED (see N1) | T06 | `trades.ts:330` `connects`; `claims.md:96`. No tool is named. |
| 16 | Built at Speed | H15 | ALLOWED | C01 | `landing.ts:104`. No day promise attached. |
| 17 | Maintenance requests, owner updates and rental applications in one place, built for you. | D1 | NEEDS REISS | intro, T03, T08 | `trades.ts:315`, near-verbatim of the intro. |
| 18 | Focused builds start at $5,000. Free 30-minute scope call, no deposit for the call. | D2 | CONDITIONAL-MET | T11 + C04 | T11 as H9. "No deposit" is tied to the call, as `claims.md:18` requires. Does not read as "no deposit on builds". |
| 19 | Repairs over an owner's limit wait for their OK. Try the working example on our site. | D3 | NEEDS REISS (see N2) | T03 + T04 | `trades.ts:326` "repairs over an owner's limit wait for their OK"; T04 as H13. |
| 20 | Fixed price and delivery date agreed in writing before you pay. You own the code. | D4 | ALLOWED | C03 + C07 | `landing.ts:154`, `:191`, `:134`. |
| 21 | Working examples to try | Callout | ALLOWED | T04 | See N4. |
| 22 | Free scope call | Callout | CONDITIONAL-MET | C04 | `landing.ts:109`. Does not say "No deposit" alone. |
| 23 | Working review halfway | Callout | ALLOWED | C15 / C17 | `landing.ts:172`, `:215`. |
| 24 | Keep the scope either way | Callout | ALLOWED | C19 | `landing.ts:209`. |
| 25 | Reply in 1 business day | Callout | ALLOWED | C10 | `landing.ts:267`, `:292`. |
| 26 | Delivery date in writing | Callout | ALLOWED | C03 / C12 | `landing.ts:154`. |

The campaign says the callouts were "already approved" on Trades. I did not accept that as evidence. Each callout is mapped to `claims.md` above.

## Whole-ad checks

- Price + fixed price + delivery date: "From $5,000" (floor), "Fixed Price" and "delivery date in writing" do not read as a guarantee. No day count appears anywhere, so no C08/C09 condition applies.
- "Built at Speed" next to "delivery date agreed in writing": this is the site's own pairing and promises no timeline.
- "No deposit" appears only with "for the call" (D2). Builds take a deposit, and nothing in the ad contradicts that.
- None of the forbidden families appear: no refund or guarantee wording, invented proof, AI-as-method, location, named platform (platform names appear only as negatives), superlative, urgency or unsold service. No "no monthly fees".
- The ad-group keywords are not ad text, so I did not class them. The negatives list includes "near me", which is a negative and not copy.

## Non-blockers

| # | Where | Problem | Suggestion |
|---|---|---|---|
| N1 | H14 "Connects to Your Tools" | T06 and T07 say "tools you already use", and "when it allows a connection". The short form could read as "connects to everything". It is still within T06. | "Connects to Tools You Use", or add a T07 line elsewhere. |
| N2 | D3 | T03 asks for "we build" or a named tool. D3 states the feature without naming the maintenance desk. It is not a past-work claim. | "Our maintenance desk example holds repairs over an owner's limit for their OK. Try it." |
| N3 | `claims.md:98` and `:9` | Stale: they say "all eight `/for/` pages" and sign-off T01-T06. The ninth page (property management) is now live. | Update when Reiss signs. |
| N4 | Callout "Working examples to try" | Plural, while this page has one example. T04 allows "Try a working example". | "Working example to try". |
| N5 | H1 | Drops "Custom" from the T01 keyword. This is allowed, but H3 carries the "Custom" word. | None needed. |

## Inputs I could not check

- Whether Reiss has signed the page. I took your word that he has not.
- Character counts and ad policy (policy-auditor).
- The landing match, the example rendering and the form (landing-auditor, tracking-auditor).

## Sources read

- `/Users/josh/SKOX/docs/ads/campaigns/google-search-property-management.md`
- `/Users/josh/SKOX/docs/ads/claims.md`
- `/Users/josh/SKOX/docs/ads/README.md`
- `/Users/josh/SKOX/content/landing.ts` (grep of the cited lines)
- `/Users/josh/SKOX/content/trades.ts:307-334`
- `/Users/josh/SKOX/app/for/[trade]/page.tsx` (grep: `STARTING_PRICE`, example map)
