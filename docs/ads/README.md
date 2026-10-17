# SKOX ads: how this folder works

Everything SKOX needs to run paid ads lives here. The agents in `.claude/agents/` read these files and write their output back into this folder.

**What we're advertising:** the live site offer. Custom web apps, dashboards and websites, with a fixed price and delivery date agreed in writing. Not the AI front desk (that's the biz-stack outreach offer, and it has no delivered client yet).

**Order of play:** Google Search first. Meta retargeting second. Meta prospecting only after retargeting has run 30 days with clean tracking.

**Budget:** $500–1,000 a month while testing.

## The agents

| Agent | What it does | Ask it like |
|---|---|---|
| `google-ads` | Builds and reviews Google Search campaigns | "Use google-ads to build google-search-v1" |
| `meta-ads` | Builds and reviews Meta retargeting and prospecting | "Use meta-ads to build meta-retargeting-v1" |
| `claims-auditor` | Checks every ad line against `claims.md` | "Use claims-auditor on campaigns/google-search-v1.md" |
| `policy-auditor` | Checks Google Ads and Meta ad policy | "Use policy-auditor on …" |
| `tracking-auditor` | Walks the conversion chain in the code | "Use tracking-auditor" |
| `landing-auditor` | Checks each ad matches the page it lands on | "Use landing-auditor on …" |
| `economics-auditor` | Checks budget, cost per lead ceilings and kill rules | "Use economics-auditor on …" |

Run all five auditors at once with `/ads-prelaunch <campaign-file-name>`.

## Reference files

| File | Holds |
|---|---|
| `offer.md` | The three landing routes, CTAs and day promises with their conditions |
| `claims.md` | Every claim an ad may make, with its source line; everything it may not |
| `copy-rules.md` | Voice, positioning rules and character limits |
| `tracking.md` | How a click becomes a counted lead, the env vars, and the test-lead procedure |
| `economics.md` | Deal sizes, cost-per-lead ceilings, budget math and kill criteria |
| `lead-loop.md` | How a lead email becomes a qualified deal in the portal pipeline |

## File naming

- Campaigns: `campaigns/<platform>-<type>-vN.md` (e.g. `google-search-v1.md`, `meta-retargeting-v1.md`)
- Audits: `audits/YYYY-MM-DD-<auditor>-<campaign>.md`, and the combined `audits/YYYY-MM-DD-go-no-go-<campaign>.md`
- Weekly reviews: `reviews/YYYY-MM-DD-<platform>.md`
- Creative briefs: `creative/<campaign>-<concept>.md`

A new version of a campaign is a new file (`-v2`). Never edit a campaign that's already live in the ad account without bumping the version; the file must match what's running.

## Audit report template

Every auditor writes its report in this shape:

```markdown
# <Auditor> — <campaign> — YYYY-MM-DD

**Verdict:** PASS | PASS WITH FIXES | FAIL | NO VERDICT (missing input)

## Blockers
| # | Where (campaign line / file:line) | Problem | Rule or source | Fix |

## Non-blockers
| # | Where | Problem | Suggestion |

## Inputs I could not check
- …

## Sources read
- file paths and URLs actually opened
```

A FAIL needs at least one blocker. A PASS has zero blockers. "NO VERDICT" is a real answer when an input (an env var, a price, an account) isn't known; never guess past it.

## Shared rules borrowed from the ad-manager skill

The `small-business:ad-manager` plugin skill has a good rulebook. The agents cite it rather than copy it:
`/Users/josh/.claude/plugins/synced/952e6b41-8da7-4419-b95c-d5efe950b3f1_642b0eb8-fc79-4cd2-a00e-4f3eba31eaaf/small-business/skills/ad-manager/reference/` (`diagnostics.md`, `change_playbook.md`, `ad_copy.md`, `gotchas.md`, `data_sources.md`).

The ones that matter most here:
1. Budget changes are stated in dollars per month, before and after. Never a percentage alone.
2. One approval per change. No bundles.
3. Show the platform's conversion count and the real lead count side by side. Steer by real leads.
4. A campaign without working conversion tracking gets "no verdict", not a judgement on clicks.
5. Respect minimum volumes before calling a winner (see `economics.md`).
6. No Google or Meta API is connected. The agents work from CSV exports Josh downloads, and they write instructions Josh clicks through. They never claim to have changed anything in an ad account.

## First run

Claude Code loads `.claude/agents/` and `.claude/commands/` when a session starts. If an agent or `/ads-prelaunch` isn't recognised, start a new session in `~/SKOX`.
