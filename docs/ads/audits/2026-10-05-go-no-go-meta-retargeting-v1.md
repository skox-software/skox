# Go / no-go — meta-retargeting-v1 — 2026-10-05

**Decision: GO WHEN CHECKED, for Ads B and C only.** Ad A, the 20s video, is **NO-GO** until it is recut. Run this after Google Search is live and the site has visitors to retarget.

## Auditor verdicts
| Auditor | Verdict | Blockers | Report |
|---|---|---|---|
| Claims | FAIL on Ad A only; B and C PASS (recheck PASS) | 14, all in Ad A | `2026-10-05-claims-meta-retargeting-v1.md`, `2026-10-05-economics-recheck.md` |
| Policy | FAIL on Ad A only; B and C PASS WITH FIXES (fixes applied) | 3, all in Ad A | `2026-10-05-policy-meta-retargeting-v1.md` |
| Economics | FAIL → fixed → PASS; ceilings NO VERDICT | 0 | `2026-10-05-economics-meta-retargeting-v1.md`, `2026-10-05-economics-recheck.md` |
| Tracking | NO VERDICT (env unconfirmed); code sound | 0 code | `2026-10-05-tracking.md` |
| Landing | Not run separately: all Meta ads land on `/`, which the policy audit loaded and matched | — | — |

## Why the video can't run yet
- "No lock-in" and three more lines need Reiss's sign-off.
- Nine on-screen lines have no source on the site.
- "14 DAYS" and "07 DAYS" appear on screen without their condition.
- The 9:16 cut puts text under the Reels interface.

The recut spec is in `docs/ads/creative/meta-retargeting-v1-video-20s.md`.

## Josh checks before spending
- [ ] Reiss has signed `docs/ads/claims.md`
- [ ] Business Manager, Facebook Page and Instagram linked; domain `skoxsoftware.com` verified
- [ ] `NEXT_PUBLIC_META_PIXEL_ID` and `META_CAPI_TOKEN` set in Vercel Production; site redeployed
- [ ] Test lead shows one `Lead`, deduplicated across browser and server, in Events Manager
- [ ] Ad B and Ad C images made exactly from their briefs, then claims-checked
- [ ] Advantage+ creative enhancements off on both ads, including after duplicating
- [ ] Ad set uses original audience options, not Advantage+ audience
- [ ] Optimisation goal chosen: Lead, or landing page views until 15 Leads in 30 days
- [ ] Budget $7/day; Google + Meta combined stays at or under $988/month at ceiling
