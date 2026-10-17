# lead-scan

Finds local businesses with ancient, dead or missing websites, for the old-site lead list in `docs/prospects/`.

1. **Get places.** Run the Apify actor `compass/crawler-google-places`: one location per run, several search terms, about $0.004 a place. When the run finishes, its status message links to a signed `results-map` page. Pass that link to:

   ```bash
   python3 scripts/lead-scan/fetch_apify.py "<results-map URL>" scripts/lead-scan/data/places-<city>.json
   ```

   You can also feed the scanner a plain `.txt` file with one URL per line (an optional tab and then a note). The scanner then reads each business's name and phone from its own page.

2. **Scan.** Merge the place files into one JSON array, then run:

   ```bash
   python3 scripts/lead-scan/scan.py scripts/lead-scan/data/places-all.json --out scripts/lead-scan/data/scan
   ```

   This writes two files:
   - `scan.jsonl`: every place, with the raw evidence.
   - `scan-ranked.csv`: only the places with a dead, ancient, missing or bot-blocked site and at least 10 reviews. Chains are dropped. Dead sites come first, then the most ancient, then the most reviews.

3. **Hand-check before calling.** The score is only a filter. Some sites send a copyright year from inside their scripts, some are bot-blocked (status `check`), and a 404 can be a deep link. Open each one before it goes on the call sheet.

Statuses:
- `ancient`: score 5 or more. Points come from no mobile viewport, a footer year of 2015 or earlier, table/frame/font layout, Flash, old builders, and jQuery older than 1.9.
- `dead`: DNS failure, 404 or 5xx on the homepage, or a parked, suspended or expired page.
- `none`: no website on Maps.
- `check`: bot-blocked or timed out.
- `modern`: everything else.

4. **Add verified leads to the pipeline (always).** Every lead whose bad site and contact details are both verified goes into the portal pipeline, owned by Reiss. Pipeline deals also show on the portal's Clients list. Run a dry run first, then `--apply`:

   ```bash
   node scripts/lead-scan/push_to_pipeline.mjs docs/prospects/<leads>.csv
   node scripts/lead-scan/push_to_pipeline.mjs docs/prospects/<leads>.csv --apply
   ```

   The script only takes rows that are verified: `site_status` ancient/dead/none with `site_evidence`; for `none`, a `site_check` noting that a web search found no site (a Maps listing with no link isn't proof); and a `phone` with `contact_source` saying where it was confirmed (own site, Google Maps, BBB or a chamber listing). WEAK rows and duplicates are skipped.

## Nationwide chamber runs (no Apify needed)

`data/chambers.txt` (82) and `data/chambers-all-found.tsv` (about 1,160) list US chamber directories on GrowthZone/ChamberMaster. Their members are paying, active local businesses.

1. Harvest: `python3 chamber_harvest.py <base URL> data/chambers/<slug>.json` gets each member's site, phone, address, categories and named contact.
2. Then run `bash run_batches.sh 8`. It scans 8 chambers at a time with `verify_ancient.py` and pushes the qualified leads to the pipeline after each chunk. Chambers already done are listed in `data/chambers-scanned.txt`.

`verify_ancient.py` keeps a lead only if all of these are true on the live page:
- no mobile viewport;
- one strong sign of age (visible footer © 2015 or earlier, an old site builder, Flash, frames, 5+ layout tables, 10+ `<font>` tags, or spam injected by a hack) or two weaker signs;
- not a hosted gallery page and not a nonprofit, government or chain;
- a phone, cross-checked against the business's own site (the site's number wins);
- an email only if it's on the business's own domain or a personal mailbox.
