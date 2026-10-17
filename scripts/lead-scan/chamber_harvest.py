#!/usr/bin/env python3
"""Pull every member of a GrowthZone/ChamberMaster chamber directory.

Thousands of US chambers host their member directory on GrowthZone
(business.<chamber>.org/list or <chamber>.chambermaster.com/list). The
A-to-Z pages list every member; each member page has the website, phone,
address, categories and the member's named representative. Chamber members
pay dues, so they are real, established local businesses.

    python3 scripts/lead-scan/chamber_harvest.py https://business.winterpark.org data/chamber-winterpark.json

Output is a JSON array in the same shape scan.py reads from Google Maps.
"""
import html as htmlmod
import json
import re
import string
import sys
import urllib.request
from concurrent.futures import ThreadPoolExecutor

UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=25) as r:
            return r.read().decode("utf-8", errors="replace")
    except Exception:
        return ""


def clean(s):
    return htmlmod.unescape(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", s or ""))).strip()


def member_urls(base):
    urls = set()
    letters = list(string.ascii_lowercase) + ["0-9"]
    with ThreadPoolExecutor(4) as ex:
        pages = ex.map(lambda l: get(f"{base}/list/searchalpha/{l}"), letters)
    for page in pages:
        for m in re.findall(r'href="((?:https?://[^"/]+)?/list/member/[^"#?]+)"', page):
            urls.add(m if m.startswith("http") else base + m)
    return sorted(urls)


def member(url):
    p = get(url)
    if not p:
        return None

    def one(pattern):
        m = re.search(pattern, p, re.S)
        return clean(m.group(1)) if m else ""

    web = re.search(r'gz-card-website">\s*<a href="([^"]+)"', p)
    cats = [clean(c) for c in re.findall(r'<span class="gz-cat">(.*?)</span>', p)]
    return {
        "title": one(r'<h1[^>]*gz-pagetitle[^>]*>(.*?)</h1>') or one(r"<title>([^<|]+)"),
        "website": web.group(1).strip() if web else "",
        "phone": one(r'itemprop="telephone">(.*?)</span>'),
        "address": ", ".join(x for x in [one(r'itemprop="streetAddress">(.*?)</span>'),
                                         one(r'itemprop="addressLocality">(.*?)</span>'),
                                         one(r'itemprop="addressRegion">(.*?)</span>'),
                                         one(r'itemprop="postalCode">(.*?)</span>')] if x),
        "city": one(r'itemprop="addressLocality">(.*?)</span>'),
        "state": one(r'itemprop="addressRegion">(.*?)</span>'),
        "categoryName": "; ".join(cats),
        "contact_name": one(r'gz-member-repname">(.*?)</div>'),
        "contact_title": one(r'gz-member-reptitle">(.*?)</div>'),
        "url": url,
        "reviewsCount": None,
        "from_directory": True,
        "searchString": "chamber: " + re.sub(r"^https?://", "", url.split("/list/")[0]),
    }


def main():
    base, out = sys.argv[1].rstrip("/"), sys.argv[2]
    urls = member_urls(base)
    with ThreadPoolExecutor(6) as ex:
        rows = [r for r in ex.map(member, urls) if r]
    json.dump(rows, open(out, "w"))
    with_site = sum(1 for r in rows if r["website"])
    print(f"{base}: {len(urls)} members, {len(rows)} fetched, {with_site} with a website -> {out}")


if __name__ == "__main__":
    main()
