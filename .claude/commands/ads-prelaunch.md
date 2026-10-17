---
description: Run all five SKOX ad auditors on one campaign file and write a go/no-go checklist
argument-hint: <campaign file name, e.g. google-search-v1>
---

Run the SKOX pre-launch audit on `docs/ads/campaigns/$ARGUMENTS.md`.

1. Confirm the file exists. If it doesn't, list `docs/ads/campaigns/` and stop.
2. Launch these five subagents **in parallel, in a single message**, each on that file:
   - `claims-auditor`
   - `policy-auditor`
   - `landing-auditor`
   - `economics-auditor`
   - `tracking-auditor` (it audits the site, not the file; tell it which campaign it's for)
3. When all five return, read each report they wrote in `docs/ads/audits/`.
4. Write `docs/ads/audits/YYYY-MM-DD-go-no-go-$ARGUMENTS.md` (today's date):

```markdown
# Go / no-go — $ARGUMENTS — YYYY-MM-DD

**Decision:** NO-GO | GO WHEN CHECKED | GO

## Auditor verdicts
| Auditor | Verdict | Blockers | Report |

## Blockers to fix (merged, deduplicated, most serious first)
| # | From | Problem | Fix |

## Josh checks before spending (tick each)
- [ ] Reiss has signed the allowlist in docs/ads/claims.md
- [ ] Vercel Production env vars confirmed (list from the tracking report)
- [ ] Site redeployed after env changes (git archive HEAD copy, not git push)
- [ ] Test lead done; Google Ads conversion shows "Recording"; Meta shows one deduplicated Lead (if Meta)
- [ ] GA4 key event: generate_lead on; scope_partial_captured off
- [ ] No URL-based conversion on /scope-received in Google Ads
- [ ] Google Ads advertiser verification / Meta domain verification done
- [ ] Prices and margins entered in docs/ads/economics.md
- [ ] Daily budget entered matches the campaign file
- [ ] `npm test` passes

## Non-blockers worth doing
```

5. Decision rules: any blocker → **NO-GO**. No blockers but unconfirmed checklist items → **GO WHEN CHECKED**. Everything confirmed → **GO**.
6. Reply with the decision, the blocker list, and the path to the report. Don't edit the campaign file; offer to have the builder agent fix the blockers.

No money is spent from here. GO means Josh may upload and enable the campaign himself.
