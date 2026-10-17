# Go / no-go — google-search-v1 — 2026-10-05

**Decision: GO WHEN CHECKED.** No auditor blockers remain. Nothing below has been confirmed by Josh yet, so no money should be spent until every box is ticked.

## Auditor verdicts
| Auditor | Verdict | Blockers | Report |
|---|---|---|---|
| Claims | PASS (recheck PASS on changed lines) | 0 | `2026-10-05-claims-google-search-v1.md`, `2026-10-05-economics-recheck.md` |
| Policy | PASS WITH FIXES (fixes applied) | 0 | `2026-10-05-policy-google-search-v1.md` |
| Landing | PASS WITH FIXES; mobile speed not measured | 0 | `2026-10-05-landing-google-search-v1.md` |
| Economics | FAIL → fixed → PASS; ceilings NO VERDICT | 0 | `2026-10-05-economics-google-search-v1.md`, `2026-10-05-economics-recheck.md` |
| Tracking | NO VERDICT (env unconfirmed); code sound | 0 code; doc corrections applied | `2026-10-05-tracking.md` |

## Blockers fixed during the audit
| # | From | Problem | Fix applied |
|---|---|---|---|
| 1 | Economics | Google ceiling assumed the whole $1,000; with Meta it reached $1,216/mo | Ceilings cut to $11.50 / $9.00 / $5.00 per day; combined ceiling $988/mo |
| 2 | Economics | Scale rule could be read per campaign | Now +$5/day per week across the whole account |
| 3 | Tracking | Three wrong lines in `tracking.md` | Corrected |
| 4 | Claims | Three stale line citations in `claims.md` | Corrected |

## Josh checks before spending
- [ ] Reiss has signed the allowlist in `docs/ads/claims.md`
- [ ] Vercel Production env vars confirmed: `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_GOOGLE_ADS_ID`, `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL`, `RESEND_API_KEY`, `LEAD_FROM_EMAIL`, `CONTACT_EMAIL`
- [ ] Site redeployed after env changes (git archive HEAD copy, not git push)
- [ ] Test lead done per `tracking.md`; Google Ads conversion shows "Recording"
- [ ] GA4 key event: `generate_lead` on; `scope_partial_captured` off
- [ ] Conversion action created as manual code, not a URL rule on `/scope-received`
- [ ] Google advertiser verification done; business name and logo approved
- [ ] Mobile speed checked on pagespeed.web.dev for `/web-apps`, `/dashboards`, `/websites` (the API was rate-limited today); each page opened on a phone
- [ ] Keyword Planner volumes and CPCs pasted into the campaign file; CPC caps adjusted if needed
- [ ] Prices, margins and profit share entered in `docs/ads/economics.md`
- [ ] Daily budgets in the account match the file: $9 / $7 / $4
- [x] `npm test` passes (13 of 13, 2026-10-05)

## Non-blockers worth doing
- **GPC privacy gap:** `lib/track.ts` still pushes the Google Ads conversion and the hashed email for visitors with Global Privacy Control on, while `/privacy` says those tags don't load. Recommended small code fix before launch; needs Josh's go-ahead and a deploy.
- **Header CTA:** "Let's talk" is the one CTA that doesn't say "Get my price & timeline".
- **Client login link:** sits in the header on ad routes; a likely mis-click for "client portal" searchers.
- **Excel negative:** may block good "replace our spreadsheet" searches; check the first search-terms report.
- **Websites campaign:** probably can't pay back at about $1,250 a site; first to pause.
