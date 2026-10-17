#!/usr/bin/env python3
"""Score how dated each business's website is, for the old-site lead list.

Input: a JSON array of Google Maps places (the compass/crawler-google-places
dataset export). Output: one JSONL row per place with the raw evidence, and a
ranked CSV of the places worth a look.

    python3 scripts/lead-scan/scan.py data/places.json --out data/scan

Stdlib only, so it reruns anywhere. Fetches about 5 homepages at a time.
"""
import argparse
import csv
import gzip
import zlib
import json
import re
import ssl
import socket
import sys
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from datetime import date
from urllib.parse import urlparse

UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")
TIMEOUT = 15
THIS_YEAR = date.today().year

# Phrases that mean the domain or hosting is gone, not the business's site.
DEAD_PHRASES = [
    "domain is for sale", "buy this domain", "this domain may be for sale",
    "domain has expired", "domain expired", "hosting account has been suspended",
    "account has been suspended", "account suspended", "lapse in hosting",
    "temporarily offline", "this site is no longer available", "parked free",
    "parkingcrew", "sedoparking", "hugedomains", "dan.com", "afternic",
    "website coming soon", "future home of", "under construction",
    "please setup your menus", "just another wordpress site",
]

# Names that mean a national brand or franchise, not an owner-run firm.
CHAINS = [
    "keller williams", "re/max", "remax", "coldwell banker", "century 21",
    "berkshire hathaway", "compass", "exp realty", "sotheby", "era ",
    "realty one", "weichert", "howard hanna", "watson realty", "cbre", "jll",
    "cushman", "colliers", "marcus & millichap", "nai ", "svn", "avison young",
    "real property management", "mynd", "invitation homes", "progress residential",
    "greystar", "firstservice", "associa", "castle group", "pmi ", "evernest",
    "renters warehouse", "home partners", "maymont", "tricon", "belong",
    "first american", "fidelity", "state farm", "allstate", "farmers insurance", "edward jones",
    "nationwide", "northwestern mutual", "new york life", "wells fargo", "chase", "truist",
    "regions", "pnc", "hilton", "marriott", "hyatt", "holiday inn", "chick-fil-a", "mcdonald",
    "walmart", "publix", "kroger", "comcast", "spectrum", "at&t", "verizon", "duke energy",
    "servpro", "rotary", "kiwanis", "ymca", "habitat for humanity", "goodwill", "united way", "lennar", "pulte", "d.r. horton", "toll brothers",
    "la rosa realty", "redfin", "zillow", "opendoor", "offerpad", "united real estate",
    "fathom realty", "lpt realty", "real broker", "epique", "charles rutenberg",
    "corcoran", "douglas elliman", "christie's", "engel & völkers", "engel & volkers",
    "better homes and gardens", "bhhs", "premier sotheby", "baird & warner",
    "roofing by ", "roof maxx", "mighty dog", "storm guard", "bone dry",
    "power home remodeling", "leafguard", "erie home", "pinnacle", "sentry",
]


# Directory categories that aren't owner-run businesses we'd sell a site to.
NOT_BUSINESS = re.compile(r"(?i)non[- ]?profit|government|church|religio|ministr|school|education|universit|"
                          r"college|bank|credit union|hospital|health system|utilit|civic|association|"
                          r"foundation|museum|library|chamber|elected|municipal|public")


def fetch(url, verify=True):
    ctx = ssl.create_default_context()
    if not verify:
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "text/html,*/*",
                                              "Accept-Encoding": "gzip, deflate"})
    with urllib.request.urlopen(req, timeout=TIMEOUT, context=ctx) as r:
        body = unzip(r.read(1_500_000), r.headers.get("Content-Encoding", ""))
        charset = r.headers.get_content_charset() or "utf-8"
        return r.status, r.geturl(), body.decode(charset, errors="replace")


def unzip(body, encoding):
    # Some old servers gzip the page even when the request doesn't ask for it.
    if body[:2] == b"\x1f\x8b" or "gzip" in encoding:
        try:
            return gzip.decompress(body)
        except Exception:
            return body
    if "deflate" in encoding:
        try:
            return zlib.decompress(body)
        except Exception:
            return zlib.decompress(body, -zlib.MAX_WBITS)
    return body


def strip_code(html):
    html = re.sub(r"(?is)<script\b.*?</script>", " ", html)
    html = re.sub(r"(?is)<style\b.*?</style>", " ", html)
    return re.sub(r"(?s)<!--.*?-->", " ", html)


def copyright_year(text):
    """Highest year after a copyright marker; a range counts as its end year."""
    years = []
    for m in re.finditer(r"(?i)(?:©|&copy;|&#169;|copyright)\s*(?:&nbsp;|\s|\(c\))*([^<]{0,60})", text):
        chunk = m.group(1)
        found = re.findall(r"\b(19[89]\d|20[0-3]\d)\b", chunk)
        years += [int(y) for y in found if int(y) <= THIS_YEAR]
    return max(years) if years else None


SOFT_PHRASES = {"website coming soon", "future home of", "under construction",
                "please setup your menus", "just another wordpress site"}


def dead_phrase(low, code_free):
    visible = len(" ".join(re.sub(r"<[^>]+>", " ", code_free).split()))
    for p in DEAD_PHRASES:
        if p in low and (p not in SOFT_PHRASES or visible < 1500):
            return p
    return ""


def analyse(html):
    code_free = strip_code(html)
    low = html.lower()
    gen = re.search(r'(?i)<meta[^>]+name=["\']generator["\'][^>]*content=["\']([^"\']+)', html)
    jq = re.search(r"jquery[.-]?(\d)\.(\d+)(?:\.(\d+))?(?:\.min)?\.js", low)
    return {
        "viewport": bool(re.search(r'(?i)<meta[^>]+name=["\']?viewport', html)),
        "copyright_year": copyright_year(code_free),
        "tables": len(re.findall(r"(?i)<table\b", code_free)),
        "font_tags": len(re.findall(r"(?i)<font\b", code_free)),
        "frames": bool(re.search(r"(?i)<frameset\b|<frame\s", code_free)),
        "flash": bool(re.search(r"(?i)\.swf\b|shockwave-flash|x-shockwave", html)),
        "generator": gen.group(1).strip() if gen else "",
        "jquery": f"{jq.group(1)}.{jq.group(2)}" if jq else "",
        "best_viewed": bool(re.search(r"(?i)best viewed (?:in|with|at)", code_free)),
        "hit_counter": bool(re.search(r"(?i)hit counter|visitors since|you are visitor", code_free)),
        "dead_phrase": dead_phrase(low, code_free),
        "bytes": len(html),
    }


def score(a, https):
    """Higher means more obviously dated. Each point maps to visible evidence."""
    s, why = 0, []
    if not a["viewport"]:
        s += 3; why.append("no mobile viewport")
    y = a["copyright_year"]
    if y:
        if y <= 2010: s += 4; why.append(f"footer © {y}")
        elif y <= 2015: s += 3; why.append(f"footer © {y}")
        elif y <= 2018: s += 1; why.append(f"footer © {y}")
    if a["tables"] >= 3: s += 2; why.append(f"{a['tables']} layout tables")
    if a["font_tags"] >= 3: s += 2; why.append(f"{a['font_tags']} <font> tags")
    if a["frames"]: s += 3; why.append("frames")
    if a["flash"]: s += 2; why.append("Flash")
    g = a["generator"].lower()
    if re.search(r"frontpage|dreamweaver|iweb|homestead|netobjects|publisher|word \d|sitebuilder|website tonight", g):
        s += 3; why.append(f"built with {a['generator']}")
    if a["jquery"]:
        major, minor = (int(x) for x in a["jquery"].split("."))
        if (major, minor) < (1, 9): s += 2; why.append(f"jQuery {a['jquery']}")
    if a["best_viewed"]: s += 2; why.append('"best viewed in"')
    if a["hit_counter"]: s += 2; why.append("hit counter")
    if not https: s += 1; why.append("no HTTPS")
    return s, why


def attempt(site):
    status, final, html, err = None, site, "", ""
    for verify in (True, False):
        try:
            status, final, html = fetch(site, verify)
            err = "" if verify else "bad SSL certificate"
            break
        except urllib.error.HTTPError as e:
            status, err = e.code, f"HTTP {e.code}"
            try:
                html = unzip(e.read(400_000), e.headers.get("Content-Encoding", "")).decode("utf-8", errors="replace")
            except Exception:
                pass
            break
        except (ssl.SSLError, ssl.CertificateError) as e:
            err = f"SSL: {e}"
            continue
        except urllib.error.URLError as e:
            reason = e.reason
            if isinstance(reason, (ssl.SSLError, ssl.CertificateError)):
                err = f"SSL: {reason}"
                continue
            err = "DNS failure" if isinstance(reason, socket.gaierror) else f"unreachable: {reason}"
            break
        except (ConnectionResetError, ConnectionAbortedError) as e:
            err = f"connection dropped: {type(e).__name__}"
            break
        except Exception as e:  # timeouts, server hung up
            name = type(e).__name__
            err = ("connection dropped: " if name == "RemoteDisconnected" else "unreachable: ") + name
            break
    return status, final, html, err


def check(place):
    site = (place.get("website") or "").strip()
    row = {k: place.get(k) for k in ("title", "categoryName", "phone", "address", "city", "state",
                                      "reviewsCount", "totalScore", "url", "searchString",
                                      "contact_name", "contact_title", "from_directory")}
    row["website"] = site
    if not row.get("url") and place.get("placeId"):
        row["url"] = "https://www.google.com/maps/place/?q=place_id:" + place["placeId"]
    if not site:
        row.update(site_status="none", score=0, evidence="no website on Google Maps")
        return row
    if not site.startswith("http"):
        site = "http://" + site
    # Maps often links a deep page, and old sites often break on HTTPS, so fall
    # back to the homepage and then to plain HTTP before calling a site dead.
    u = urlparse(site)
    tries = [site, f"{u.scheme}://{u.netloc}/", f"http://{u.netloc}/"]
    tried, errors = [], []
    for t in tries:
        if t in tried:
            continue
        tried.append(t)
        status, final, html, err = attempt(t)
        if html and status and status < 400:
            break
        errors.append(err or f"HTTP {status}")
    else:
        err = "; ".join(dict.fromkeys(errors))
    row.update(final_url=final, http_status=status, fetch_error=err)
    a = analyse(html) if html else {}
    row.update(a)
    if html:
        mails = [m for m in re.findall(r'(?i)mailto:([\w.+-]+@[\w-]+(?:\.[\w-]+)+)', html)
                 if not re.search(r"(?i)example|sentry|wix|domain|yourname|email\.com", m)]
        row["email"] = mails[0] if mails else ""
    if place.get("from_url_list") and html:
        t = re.search(r"(?is)<title[^>]*>(.*?)</title>", html)
        row["title"] = re.sub(r"\s+", " ", t.group(1)).strip()[:120] if t else urlparse(final).netloc
        tel = re.search(r"\(?\b\d{3}\)?[ .-]\d{3}[ .-]\d{4}\b", strip_code(html))
        row["phone"] = tel.group(0) if tel else ""
        row["from_url_list"] = True
    blocked = (status in (401, 403, 429) or (status == 503 and "cloudflare" in html.lower())
               or "connection dropped" in err or ("Timeout" in err or "timed out" in err) and not html)
    if blocked:
        row.update(site_status="check", score=0, evidence=f"bot-blocked ({err or 'HTTP %s' % status}); check by hand")
    elif not html or err.startswith(("DNS", "unreachable")) or (status and status >= 500 and not blocked) or status == 404:
        row.update(site_status="dead", score=10, evidence=err or f"HTTP {status}")
    elif a.get("dead_phrase"):
        row.update(site_status="dead", score=10, evidence=f'page says "{a["dead_phrase"]}"')
    else:
        s, why = score(a, urlparse(final).scheme == "https")
        if "bad SSL" in err:
            s += 1; why.append("bad SSL certificate")
        row.update(site_status="ancient" if s >= 5 else "modern", score=s, evidence="; ".join(why))
    return row


def is_chain(title, domain_counts, website):
    t = (title or "").lower()
    if any(c in t for c in CHAINS):
        return True
    d = urlparse(website if "//" in website else "http://" + website).netloc.lower().removeprefix("www.")
    return bool(d) and domain_counts.get(d, 0) >= 3


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("places", help="JSON array of Google Maps places")
    ap.add_argument("--out", default="scan", help="output path prefix")
    ap.add_argument("--min-reviews", type=int, default=10)
    ap.add_argument("--workers", type=int, default=5)
    args = ap.parse_args()

    if args.places.endswith(".json"):
        places = json.load(open(args.places))
    else:
        places = []
        for line in open(args.places):
            parts = line.strip().split("\t")
            if parts and parts[0].startswith("http"):
                places.append({"website": parts[0], "searchString": parts[1] if len(parts) > 1 else "",
                               "reviewsCount": None, "from_url_list": True})
    # One row per place: the same business shows up under several searches.
    seen, uniq = set(), []
    for p in places:
        key = p.get("placeId") or p.get("website") or (p.get("title"), p.get("phone"))
        if key in seen or p.get("permanentlyClosed"):
            continue
        seen.add(key); uniq.append(p)

    domain_counts = {}
    for p in uniq:
        w = (p.get("website") or "").strip()
        if w:
            d = urlparse(w if "//" in w else "http://" + w).netloc.lower().removeprefix("www.")
            domain_counts[d] = domain_counts.get(d, 0) + 1

    with ThreadPoolExecutor(args.workers) as ex:
        rows = list(ex.map(check, uniq))

    with open(args.out + ".jsonl", "w") as f:
        for r in rows:
            f.write(json.dumps(r, default=str) + "\n")

    keep = [r for r in rows
            if (r.get("from_url_list") or r.get("from_directory") or (r.get("reviewsCount") or 0) >= args.min_reviews)
            and not NOT_BUSINESS.search(r.get("categoryName") or "")
            and not is_chain(r.get("title"), domain_counts, r.get("website") or "")
            and r["site_status"] in ("none", "dead", "ancient", "check")
            and not (r.get("from_directory") and r["site_status"] in ("none", "check"))]
    order = {"dead": 0, "ancient": 0, "none": 1, "check": 2}
    keep.sort(key=lambda r: (order[r["site_status"]], -(r.get("score") or 0), -(r.get("reviewsCount") or 0)))

    cols = ["site_status", "score", "evidence", "title", "categoryName", "website", "final_url",
            "http_status", "copyright_year", "viewport", "tables", "font_tags", "frames", "flash",
            "generator", "jquery", "phone", "email", "contact_name", "contact_title", "address",
            "city", "state", "reviewsCount", "totalScore", "url", "searchString"]
    with open(args.out + "-ranked.csv", "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=cols, extrasaction="ignore")
        w.writeheader()
        w.writerows(keep)

    counts = {}
    for r in rows:
        counts[r["site_status"]] = counts.get(r["site_status"], 0) + 1
    print(f"{len(places)} places in, {len(uniq)} unique, status counts {counts}; "
          f"{len(keep)} kept after the {args.min_reviews}-review and chain filters", file=sys.stderr)


if __name__ == "__main__":
    main()
