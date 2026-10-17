# Google Search v2: Google Ads Editor import

Bulk-upload files for `docs/ads/campaigns/google-search-v2.md`. The campaign file is the source of truth; if the two ever disagree, the campaign file wins and these CSVs need regenerating.

| File | What it holds | Rows |
|---|---|---|
| `campaigns.csv` | 2 campaigns (status **Paused**), 2 location rows, 13 ad groups | 17 |
| `keywords.csv` | 94 positive keywords (66 Trades phrase/exact, 28 Services exact), 120 ad-group negatives, 164 campaign negatives (82 per campaign) | 378 |
| `ads.csv` | 13 responsive search ads, 15 headlines and 4 descriptions each, paths, final URLs, pins | 13 |
| `check_lengths.py` | Re-checks every headline, description and path length, duplicates and pins | — |

Use this folder **or** `../google-search-v2-web-upload/` (web bulk upload), never both. Both create the same campaigns.

Assets (sitelinks, callouts, structured snippet) are **not** in CSV form. Add them in the web UI (campaign file section 7, steps 17–20). Editor can import assets, but I couldn't confirm the current asset column names in Google's help pages, and a wrong header there fails silently. The web UI is safer for 5 sitelinks, 6 callouts and 1 snippet.

## Before you import

1. Run the length check: `python3 docs/ads/campaigns/google-search-v2-editor/check_lengths.py`. It should end with `0 problem(s).` (In the session that wrote these files, lengths were verified with regex matches. Python wasn't available, so run this once.)
2. Pause the current live campaign in the web UI (campaign file, step 2). Do this first, so v2 never runs alongside it.
3. Install or update Google Ads Editor (ads.google.com/home/tools/ads-editor), sign in, and open the SKOX account.

## Import steps

From Google's help ([Import a CSV file in Google Ads Editor](https://support.google.com/google-ads/editor/answer/30564)):

1. Click **Get recent account changes** (top left) so Editor matches the live account. Editor won't import while you have unposted changes.
2. **Account → Import → From file…** → choose `campaigns.csv`.
3. Editor shows the column headers it detected. **Check each one maps to the right field.** If a header shows as unrecognised, pick the right field from the drop-down (see "Columns I'm not sure of" below), or set it to not import and do that setting by hand later.
4. Click **Import**. Editor lists errors and warnings, if any. Read them.
5. Click **Review imported changes** → check the new campaigns and ad groups → **Keep proposed changes**.
6. Repeat steps 2–5 with `keywords.csv`, then `ads.csv`. **Order matters:** keywords and ads need their campaigns and ad groups to exist first.
7. In the left tree, click each campaign and compare with the campaign file, section 3: status Paused, budget $6.50 / $3.30 a day ($197.60 + $100.32 = $297.92 a month, under Josh's $300 total cap), ad-group max CPC $3.00 on the four Services groups, $2.50 on the two generic Web apps keywords, networks Google Search only, bid strategy, language, location.
8. Click **Check changes**. Fix anything listed.
9. Click **Post** → **Post** (all campaigns). Wait for "Posted".
10. Go to the web UI and do the steps Editor can't do reliably (campaign file, section 7, parts C and D): **Maximize clicks bid limit $4.00 on Trades (manual, not in any CSV)**, **Presence** location option, AI Max off, broad match off, auto-created assets off, final URL suffix check, goals, then assets.

If an en dash in the campaign names comes through garbled (`Search â€“ Trades`), use **Account → Import → Paste text** instead: open the CSV in a text editor, copy everything, paste. Or rename the campaign in Editor before posting. The names must be exactly `Search – Trades – US` and `Search – Services – US`.

## Column names used

Header names are matched case- and space-insensitively ([Prepare a CSV file](https://support.google.com/google-ads/editor/answer/56368)). Each row describes one thing (a campaign, a location, an ad group, a keyword, an ad).

| Column | Source / confidence |
|---|---|
| `Campaign`, `Campaign Type`, `Campaign Status`, `Networks`, `Budget`, `Bid Strategy Type`, `Language`, `Location`, `Location ID`, `Final URL suffix`, `Ad Group`, `Ad Group Status`, `Max CPC`, `Keyword`, `Criterion Type`, `Headline 1`–`Headline 15`, `Path 1`, `Path 2`, `Final URL` | Listed in Google's CSV column help ([answer 57747](https://support.google.com/google-ads/editor/answer/57747), fetched 2026-10-06) |
| `Networks` = `Google Search` | Help page: enter "Google Search; Search Partners; Search; Display" values separated by semicolons. `Google Search` alone means no Search Partners and no Display |
| `Campaign Status` = `Paused` | Help page: Enabled, Paused or Removed |
| `Criterion Type` = `Phrase`, `Exact`, `Negative Broad`, `Campaign Negative Broad`, `Campaign Negative Phrase` | Help page says "enter a keyword match type", "Negative" for a negative, "Campaign negative" for a campaign-level negative. The combined values used here are the ones Editor itself writes when it exports keywords. Keyword text has no quotes or brackets; the match type is in this column |
| `Ad type` = `Responsive search ad` | Editor's export value for RSAs |

### Columns I'm not sure of

Rev 2 (policy audit, 2026-10-06): the unrecognised columns `Maximum CPC bid limit` and `Budget type` are **removed** from `campaigns.csv`. Budget is daily by default. `Final URL suffix` **is** on Google's column list (the policy auditor confirmed it), so it stays.

| Column | Why unsure | If Editor doesn't map it |
|---|---|---|
| `Bid Strategy Type` values `Maximize clicks` / `Manual CPC` | The help lists the column, not every value | Pick from Editor's drop-down after import, or set it in the web UI |
| `Location ID` = 2840 (United States) | Help says locations go one per row, with a link to a separate locations page | If both `Location` and `Location ID` are mapped and Editor complains, drop `Location ID`. "United States" alone resolves |
| `Description 1`–`4`, `Headline 1 position`, `Description 1 position` | The help summary showed "Description line 1" and "Headline [#] position" / "Description [#] position" | Map them on the header screen. After posting, check the pins (see "After posting") |
| `Ad type`, `Status` (ads.csv) | Editor export names, not shown on the help page | Map `Ad type` to the ad type field. If `Status` doesn't map, skip it; new ads are enabled and their campaigns are Paused |
| `Criterion Type` = `Negative Broad`, `Campaign Negative Broad`, `Campaign Negative Phrase` | The help page shows only `Negative` / `Campaign negative` plus a match type (policy audit B3) | Read the preview before keeping anything. The Negative keywords tab must show 120 ad-group rows and 82 per campaign with the right match types. If not, reject, and use `Negative` / `Campaign negative` with the match type Editor offers |

### Manual step: the Trades CPC cap (not in any CSV)

Editor's CSV has no confirmed header for the Maximize clicks bid limit. After posting, in the web UI: **Search – Trades – US → Settings → Bidding → Maximize clicks → tick "Set a maximum cost per click bid limit" → $4.00 → Save.** Until this is done, Trades has no CPC cap, so leave it Paused.

Budget (Josh, 2026-10-06): **$300 a month total across Google and Meta**. Meta is $0 for now. No budget or CPC increase without Josh's written OK.

**Settings no CSV here sets. Do them in the web UI after posting:** location option **Presence** (not "Presence or interest"), **AI Max for Search off**, **Broad match keywords off**, **Automatically created assets off**, final URL expansion off, campaign-specific conversion goal, and all assets.

## After posting

- In the web UI, open each RSA and confirm: headline 1 has a pin icon (position 1); in **Multi-location dashboards** and **Services → Dashboards**, description 1 is pinned to position 1. That pin keeps the 14-day line with its condition (C08).
- Keywords tab: no keyword shows as broad. Negative keywords tab: 82 campaign negatives on each campaign; ad-group negatives on the 9 Trades groups.
- Both campaigns stay **Paused** until every item in the campaign file's section 2 is ticked and `/ads-prelaunch google-search-v2` passes.
