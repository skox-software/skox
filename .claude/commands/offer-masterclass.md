---
description: Run the SKOX offer masterclass — eight framework panelists in parallel, then the chair's ranked plan
---

Run the SKOX offer masterclass. Rules and the evidence pack are in `docs/ads/masterclass/README.md`.

1. In one message, launch these eight subagents in parallel. Give each the same short brief: "Run your review of the SKOX offer today. Follow docs/ads/masterclass/README.md. Focus: $ARGUMENTS". If `$ARGUMENTS` is empty, use "the trade landing pages and the Google Search offer".
   - mc-hormozi-offer
   - mc-dunford-positioning
   - mc-storybrand-message
   - mc-schwartz-awareness
   - mc-enns-studio-sales
   - mc-psychology
   - mc-paid-search
   - mc-buyer-red-team
   If a named agent type isn't available in this session, launch a general-purpose subagent and tell it to read `.claude/agents/<name>.md` and act exactly as that file says.
2. When all eight have written their reports, run `mc-chair` (same fallback).
3. Reply to Josh with the chair's ranked plan and the path to `docs/ads/masterclass/<date>-summary.md`. Don't change the site or the ad account as part of this command. Changes happen only after Josh picks from the plan.
