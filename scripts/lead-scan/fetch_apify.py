#!/usr/bin/env python3
"""Download a Google Maps Scraper run's places without an Apify API token.

When the compass/crawler-google-places run finishes, its status message links
to a signed "results-map" page. That page embeds a signed URL for the run's
dataset, so the full place list can be fetched with no token.

    python3 scripts/lead-scan/fetch_apify.py "<results-map URL>" data/places-orlando.json
"""
import json
import re
import sys
import urllib.request


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": "lead-scan"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read().decode("utf-8")


def main():
    map_url, out = sys.argv[1], sys.argv[2]
    page = get(map_url)
    m = re.search(r"https://api\.apify\.com/v2/datasets/[^\"'\s]+/items\?signature=[A-Za-z0-9_-]+", page)
    if not m:
        sys.exit("no signed dataset URL on the results-map page")
    places = json.loads(get(m.group(0) + "&format=json&clean=1"))
    json.dump(places, open(out, "w"))
    print(f"{len(places)} places -> {out}")


if __name__ == "__main__":
    main()
