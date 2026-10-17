# Google Search v2: web bulk upload (Tools → Bulk actions → Uploads)

This is the alternative to `../google-search-v2-editor/` (Google Ads Editor). **Use one or the other, never both.** Running both creates every campaign twice. The campaign file `../google-search-v2.md` is the source of truth; if a file here disagrees with it, the campaign file wins.

Budget (Josh, 2026-10-06): **$300 a month total across Google and Meta.** Trades $6.50/day ($197.60/month) and Services $3.30/day ($100.32/month) come to $297.92 a month. Meta is $0. No increase without Josh's written OK.

## Files, in upload order

| # | File | What it creates | Rows | Status |
|---|---|---|---|---|
| 1 | `1-campaigns.csv` | 2 Search campaigns with daily budgets ($6.50 / $3.30) and bid strategy (Maximize clicks / Manual CPC) | 2 | **Paused** |
| 2 | `2-ad-groups.csv` | 13 ad groups; Services groups get a $3.00 default max CPC | 13 | **Paused** |
| 3 | `3-keywords.csv` | 94 positive keywords. Match type comes from the text itself: `"…"` is phrase, `[…]` is exact (in the CSV a phrase keyword is written `"""hvac kpi dashboard"""`, which is how CSV escapes quote marks). $2.50 max CPC on the two generic Web apps keywords | 94 | Enabled (they can't serve, because their ad groups and campaigns are Paused) |
| 4 | `4-negative-keyword-list.csv` | 82 rows for the shared negative list `SKOX – Search negatives – v2`. Plain words are negative broad; `"…"` entries are negative phrase | 82 | — |
| 5 | `5-responsive-search-ads.csv` | 13 RSAs: 15 headlines, 4 descriptions, paths, final URL, H1 pinned to position 1, D1 pinned on the two `/dashboards` ads (keeps the 14-day line with its condition, C08) | 13 | Enabled under Paused ad groups |

Each file depends on the one before it: ad groups need their campaign, keywords and ads need their ad group. Upload them one at a time, in order.

**Not in any file. Do these by hand** (campaign file, section 7):
- **Trades CPC cap: Search – Trades – US → Settings → Bidding → Maximize clicks → "Set a maximum cost per click bid limit" → $4.00.** Until it's set, Trades has no cap, so keep it Paused.
- Networks: Google Search only (untick Search partners and Display), Locations: United States with **Presence**, Language: English, Final URL suffix, AI Max off, broad match off, automatically created assets off, campaign-specific conversion goal.
- **Ad-group negatives (120).** I found no confirmed web template for these, so paste them per ad group (block below).
- Attaching the negative list to both campaigns.
- Assets: sitelinks, callouts, the snippet (Services only).

## Steps

0. **Check the headers first.** I couldn't read Google's template files (they're .xlsx and I had no way to open them), so the column names here are my best match to Google's help text, not copied from the templates. Download each template: Tools (wrench) → Bulk actions → **Uploads** → blue **+** → **View templates**, or from [Templates and examples for bulk upload](https://support.google.com/google-ads/answer/10702525). Templates to download: "Create New Campaign(s)", "Create Ad Group(s)", "Add Keyword(s)", "Add Negative Keyword(s) to Negative Keyword List(s)", "Create Responsive Search Ad(s)". Open each one and compare its header row with the matching file here. **If a header differs, rename ours to match the template exactly** (spelling and punctuation, e.g. `Max. CPC` vs `Max CPC`). Keep our data.
1. Pause the old live campaign (campaign file, section 7 step 2).
2. Tools → Shared library → **Negative keyword lists** → **+** → name it exactly `SKOX – Search negatives – v2` → save it empty. File 4 adds keywords to an existing list.
3. Tools → Bulk actions → **Uploads** → **+** → choose `1-campaigns.csv` → **Preview** (not Apply). Read the preview results. Errors are listed per row. Fix and re-preview until clean, then **Apply**.
4. Repeat step 3 for files 2, 3, 4 and 5, in that order.
5. Campaigns → each campaign → **Settings**: do every manual item in the list above, including the **$4.00** Trades bid limit.
6. Negative keywords: Keywords → Negative keywords → **+** → "Use negative keyword list" → `SKOX – Search negatives – v2` → add to both campaigns.
7. Ad-group negatives: Keywords → Negative keywords → **+** → "Add to: Ad group" → pick the ad group → paste its block below (one per line, negative broad) → Save. Do all 9 Trades groups.
8. Assets (campaign file, section 7 part D).
9. Check: 2 campaigns Paused; 13 ad groups Paused; 94 keywords (none broad); 13 ads with H1 pinned; the two `/dashboards` ads have D1 pinned; 82 list negatives on both campaigns; 120 ad-group negatives.
10. Run `python3 docs/ads/campaigns/google-search-v2-editor/check_lengths.py` (it checks the same ad text that's in file 5).
11. Go live only after the campaign file's section 2 is all ticked and `/ads-prelaunch google-search-v2` passes. Then enable the 2 campaigns **and** the 13 ad groups.

## Ad-group negatives (paste blocks)

Trade words: pool, pest, landscaping, landscape, lawn, mower, roofing, roof, roofer, plumbing, plumber, garage, electrical, electrician, hvac. Each group excludes every trade word except its own. HVAC and Plumbing don't exclude each other.

| Ad group | Paste (one per line) |
|---|---|
| HVAC (12) | pool, pest, landscaping, landscape, lawn, mower, roofing, roof, roofer, garage, electrical, electrician |
| Pool service (14) | hvac, pest, landscaping, landscape, lawn, mower, roofing, roof, roofer, plumbing, plumber, garage, electrical, electrician |
| Pest control (14) | hvac, pool, landscaping, landscape, lawn, mower, roofing, roof, roofer, plumbing, plumber, garage, electrical, electrician |
| Landscaping (11) | hvac, pool, pest, roofing, roof, roofer, plumbing, plumber, garage, electrical, electrician |
| Roofing (12) | hvac, pool, pest, landscaping, landscape, lawn, mower, plumbing, plumber, garage, electrical, electrician |
| Plumbing (12) | pool, pest, landscaping, landscape, lawn, mower, roofing, roof, roofer, garage, electrical, electrician |
| Garage doors (15) | hvac, pool, pest, landscaping, landscape, lawn, mower, roofing, roof, roofer, plumbing, plumber, electrical, electrician, opener |
| Electrical (13) | hvac, pool, pest, landscaping, landscape, lawn, mower, roofing, roof, roofer, plumbing, plumber, garage |
| Multi-location dashboards (17) | hvac, pool, pest, landscaping, landscape, lawn, mower, roofing, roof, roofer, plumbing, plumber, garage, electrical, electrician, franchise, franchisor |

Total: 120.

## Column names: confirmed vs not

| Column | Confidence |
|---|---|
| `Campaign`, `Campaign state`, `Bid strategy type`, `Budget` | On Google's bulk-upload help page ([answer 10702623](https://support.google.com/google-ads/answer/10702623)) |
| `Campaign type` | Listed there as a column (not editable on existing campaigns); used in Google's scripts bulk-upload example. Needed to create new ones |
| `Ad group`, `Keyword` (with `[ ]` / `" "` for match type) | On the same help page |
| `Ad group state`, `Default max. CPC` | **Not confirmed.** Named like the Ad groups report columns |
| `Max. CPC` (keywords) | **Not confirmed** |
| `Negative keyword list` (file 4) | **Not confirmed** |
| `Final URL`, `Path 1`, `Path 2`, `Headline 1`–`15`, `Headline 1 position`, `Description 1`–`4`, `Description 1 position` | **Not confirmed** for the web template (they're Editor's names). Check against "Create Responsive Search Ad(s)" |
| Values `Paused`, `Search`, `Maximize clicks`, `Manual CPC` | **Not confirmed.** Check the preview |

Google's rule: a new item with no status column is **enabled** ([answer 10702623](https://support.google.com/google-ads/answer/10702623)). That's why the campaign and ad-group files carry a state column. If the preview shows a campaign or ad group as Enabled, stop: rename the state column to the template's name and preview again.
