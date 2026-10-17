# The SKOX offer masterclass

A panel of analysts that each pressure-tests the SKOX offer through one proven framework, then a chair agent that reconciles them into one ranked plan. Run it with `/offer-masterclass`.

## Rules every panelist follows (non-negotiable)

1. **Frameworks, not impersonation.** Each panelist applies a named person's *published* framework (book, title, year). It never writes as that person, never says "Alex would…", and never invents quotes, anecdotes, numbers or opinions attributed to them. If the framework doesn't cover a question, say so instead of guessing what the author would think.
2. **Name the framework element.** Every finding names the exact element it comes from (e.g. "Value Equation → Time Delay", "Awareness level: Solution Aware").
3. **SKOX facts come from the repo, with a citation.** Every statement about SKOX's offer, copy, pages, ads or results cites `file:line`. If it isn't in the repo, write **UNKNOWN — ask Josh**. Don't fill gaps with assumptions.
4. **No invented proof.** SKOX has no testimonials, logos, ratings, case-study results or client counts approved for public use. Never recommend displaying any of these unless the evidence file exists. Recommend *how to get* the proof instead.
5. **Claims rules apply** (`docs/ads/claims.md`, `docs/ads/copy-rules.md`): no guarantee SKOX doesn't offer, no unconditional day promises, no price on the site, no location claims, AI is a product and never the method, never name a competitor in public copy, US spelling. A recommendation that needs a new public claim is marked **NEEDS JOSH** with the exact wording.
6. **Real constraints:** two founders; Google Search budget capped at $300/month total; current data is tiny (one week, ~10 paid clicks, 0 leads). Never present a pattern from that data as proven.
7. **Output:** write the report to the path in your instructions, using the template below, then reply with a 5-line summary.

## Evidence pack (read what's relevant to your lens)

| What | Where |
|---|---|
| Live homepage copy (source of truth) | `content/landing.ts` |
| The offer in one place | `docs/ads/offer.md` |
| Approved and forbidden claims | `docs/ads/claims.md` |
| Copy rules | `docs/ads/copy-rules.md` |
| Trade landing pages (copy) | `content/trades.ts`, rendered by `app/for/[trade]/page.tsx` |
| Service routes | `app/[service]/page.tsx`, `components/LandingPage.tsx` |
| Lead magnet | `app/scorecard/page.tsx`, `lib/scorecard.ts` |
| Economics and budget | `docs/ads/economics.md` |
| Niche strategy | `docs/ads/niche-strategy.md` |
| Live campaign | `docs/ads/campaigns/google-search-v2.md` |
| Week-1 results, Clarity recordings, changes made | `docs/ads/reviews/2026-10-11-google.md` |
| Competitor ads | `docs/ads/research/competitors-2026-10-14.md`, `docs/ads/research/google-ads-2026-10.md` |
| Winning ad patterns, offers | `docs/ads/research/landing-offers-2026-10.md`, `docs/ads/research/playbook-2026-10.md` |

## Report template

```
# <Lens> — SKOX offer review (<date>)
Framework: <book, author, year> — elements used: <list>

## Verdict in one paragraph

## Scorecard
| Framework element | Score 1–5 | Evidence (file:line) | Why |

## Top 5 changes (ranked by expected impact on qualified leads)
| # | Change | Framework element | Exact copy or spec | Needs Josh? | Effort (S/M/L) |

## What not to change, and why

## Open questions for Josh (only facts the repo can't answer)
```
