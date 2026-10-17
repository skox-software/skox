#!/usr/bin/env python3
"""Re-read each 'ancient' candidate's live homepage and keep only the ones that
qualify like the original top-10 call sheet: a clearly old site AND an active
business with a phone we can trust.

    python3 scripts/lead-scan/verify_ancient.py data/scan-chamber-batch1-ranked.csv docs/prospects/leads-old-sites-nationwide.csv

Qualifies when ALL of these hold on the live page:
  - it loads (HTTP 200) with real content (not a parked or placeholder page);
  - no mobile viewport meta tag (it doesn't fit a phone);
  - plus at least one more age signal: a visible footer year of 2015 or earlier,
    3+ layout tables, 3+ <font> tags, frames, Flash, or an old site builder;
  - the business is a current chamber member (or a Maps place with 10+ reviews);
  - there is a phone. The chamber's phone is checked against the numbers shown on
    the business's own site; if the site shows different numbers, the site's own
    number is used and both are recorded.
Output rows use the columns push_to_pipeline.mjs expects. Appends to the output
file, skipping companies already in it.
"""
import csv
import os
import re
import sys
from concurrent.futures import ThreadPoolExecutor
from datetime import date
from urllib.parse import urlparse

sys.path.insert(0, os.path.dirname(__file__))
import scan  # noqa: E402

TODAY = date.today().isoformat()
OLD_BUILDER = re.compile(r"(?i)frontpage|dreamweaver|iweb|homestead|netobjects|sitebuilder|website tonight|"
                         r"cutesite|go daddy website builder|starfield|web\.com|intuit|bcentral|yahoo|turbify")
PHONE = re.compile(r"\(?\b(\d{3})\)?[ .-]?(\d{3})[ .-](\d{4})\b")
# Not owner-run businesses Reiss would sell a site to.
SKIP = re.compile(r"(?i)non[- ]?profit|wastewater|water authority|sewer|utility|social services|service coordination|american legion|vfw|lodge no|post [0-9]|credit union|federal|economic development|\bregion\b|chamber|track|cross count|"
                  r"\bteam\b|league|club\b|booster|association|foundation|society|church|ministr|school|"
                  r"school district|county of|county commission|township of|city of|village of|library|museum|hospital|united way|ymca|"
                  r"dairy queen|subway|mcdonald|state farm|allstate|edward jones|h&r block|re/max|keller williams|"
                  r"coldwell|century 21|servpro|sherwin|napa auto|ace hardware|true value|culver|wendy|arby")
HDR = ["site_status", "industry", "company", "website", "city", "state", "site_evidence",
       "business_evidence", "site_check", "decision_maker", "decision_maker_source", "phone",
       "email", "contact_source", "maps_url", "lead_source"]


def digits(p):
    m = PHONE.search(p or "")
    return "".join(m.groups()) if m else ""


def fmt(d):
    return f"({d[:3]}) {d[3:6]}-{d[6:]}" if len(d) == 10 else d


def visible_text(html):
    t = re.sub(r"<[^>]+>", " ", scan.strip_code(html))
    t = re.sub(r"&nbsp;|&#160;", " ", t)
    t = re.sub(r"&copy;|&#169;", "©", t)
    t = re.sub(r"&amp;", "&", t)
    return " ".join(t.split())


PERSONAL = re.compile(r"(?i)@(gmail|yahoo|aol|hotmail|outlook|msn|live|icloud|me|bellsouth|verizon|comcast|att|sbcglobal|"
                      r"charter|frontier|windstream|earthlink|cox|centurylink|embarqmail|roadrunner|rr|ptd|tds)\.")


def good_email(email, host):
    """Keep an email only if it's on the business's own domain or a personal mailbox."""
    if not email:
        return ""
    dom = email.split("@")[-1].lower()
    site = host.lower().removeprefix("www.")
    return email if dom == site or site.endswith("." + dom) or dom.endswith("." + site) or PERSONAL.search(email) else ""


PLATFORM = re.compile(r"(?i)(zenfolio|smugmug|pixieset|wixsite|weebly|square\.site|godaddysites|"
                      r"yolasite|webs\.com|jimdo|blogspot|wordpress\.com|yourwebsitespace|hibuwebsites)\.")


def strong_enough(signals):
    """One strong age sign, or two weaker ones (no-viewport is already required)."""
    strong = 0
    weak = 0
    for sg in signals:
        n = re.search(r"(\d+) (layout tables|<font> tags)", sg)
        if sg.startswith(("visible footer", "built with", "HACKED")) or sg in ("Flash", "frames"):
            strong += 1
        elif n and ((n.group(2) == "layout tables" and int(n.group(1)) >= 5) or int(n.group(1)) >= 10):
            strong += 1
        else:
            weak += 1
    return strong >= 1 or weak >= 2


def verify(r):
    site = r.get("final_url") or r.get("website")
    if not site or SKIP.search(f"{r.get('title')} {r.get('categoryName')}"):
        return None
    u = urlparse(site if "//" in site else "http://" + site)
    if PLATFORM.search(u.netloc + "."):
        return None  # a hosted gallery or builder subdomain, not the business's own site
    html = ""
    for t in (site, f"{u.scheme}://{u.netloc}/", f"http://{u.netloc}/"):
        st, fin, html, err = scan.attempt(t)
        if html and st == 200:
            break
        html = ""
    if not html:
        return None
    a = scan.analyse(html)
    text = visible_text(html)
    if len(text) < 300 or a["dead_phrase"] or a["viewport"]:
        return None

    # Visible footer year: look for a copyright line in the page's visible text.
    years = []
    for m in re.finditer(r"(?i)(?:©|copyright)[^A-Za-z]{0,6}((?:19|20)\d\d)(?:\s*[-–]\s*((?:19|20)\d\d))?", text):
        years.append(int(m.group(2) or m.group(1)))
    year = max(years) if years else None
    if year and year > 2015:
        return None  # someone updates the footer; not the bar

    signals = []
    if year:
        signals.append(f"visible footer © {year}")
    if a["tables"] >= 3:
        signals.append(f"{a['tables']} layout tables")
    if a["font_tags"] >= 3:
        signals.append(f"{a['font_tags']} <font> tags")
    if a["frames"]:
        signals.append("frames")
    if a["flash"]:
        signals.append("Flash")
    if a["generator"] and OLD_BUILDER.search(a["generator"]):
        signals.append(f"built with {a['generator']}")
    spam = re.search(r"(?i)\b(casino|slot machines?|online slots|viagra|cialis|payday loans?|porn|escort|crypto casino|betting site)\b", text)
    if spam:
        i = spam.start()
        signals.insert(0, f'HACKED: spam text on the homepage ("{text[max(0, i - 30):i + 50].strip()}")')
    if not signals or not strong_enough(signals):
        return None

    # Phone: trust the business's own site first.
    site_phones = []
    for m in PHONE.finditer(text):
        d = "".join(m.groups())
        if d not in site_phones:
            site_phones.append(d)
    listed = digits(r.get("phone"))
    if listed and listed in site_phones:
        phone, phone_src = fmt(listed), "chamber listing and own site"
    elif site_phones:
        phone = fmt(site_phones[0])
        phone_src = "own site" + (f" (chamber listing shows {fmt(listed)})" if listed else "")
    elif listed:
        phone, phone_src = fmt(listed), "chamber listing only"
    else:
        return None

    chamber = r.get("url") or ""
    host = re.sub(r"^https?://", "", chamber.split("/list/")[0]) if "/list/" in chamber else ""
    if r.get("from_directory") in ("True", True) or host:
        active = f"Current member of the {host} chamber directory (listing checked {TODAY})"
    elif int(r.get("reviewsCount") or 0) >= 10:
        active = f"{r['reviewsCount']} Google reviews, {r.get('totalScore')} stars"
    else:
        return None
    if r.get("categoryName"):
        active += f"; listed as {r['categoryName']}"

    contact = (r.get("contact_name") or "").strip()
    contact = re.sub(r"^(Mr|Mrs|Ms|Miss|Dr)\.?\s+", lambda m: "Dr. " if m.group(1) == "Dr" else "", contact)
    if contact and r.get("contact_title"):
        contact += f" ({r['contact_title'].strip()})"

    email = good_email(r.get("email") or "", u.netloc)
    ev = "No mobile viewport (doesn't fit a phone); " + "; ".join(signals)
    ev += f". Verified on the live page {TODAY}."
    return {
        "site_status": "ancient",
        "industry": (r.get("categoryName") or "").split(";")[0].strip(),
        "company": scan.re.sub(r"\s+", " ", r.get("title") or "").strip(),
        "website": f"{u.scheme}://{u.netloc}/",
        "city": r.get("city") or "",
        "state": r.get("state") or "",
        "site_evidence": ev,
        "business_evidence": active,
        "site_check": "",
        "decision_maker": contact,
        "decision_maker_source": chamber if contact else "",
        "phone": phone,
        "email": email,
        "contact_source": phone_src + (f"; email from own site" if email else ""),
        "maps_url": r.get("url") if "google.com/maps" in (r.get("url") or "") else "",
        "lead_source": "Chamber directory + scanner" if host else "Google Maps + scanner",
    }


def main():
    src, out = sys.argv[1], sys.argv[2]
    rows = [r for r in csv.DictReader(open(src)) if r["site_status"] == "ancient"]
    have = set()
    if os.path.exists(out):
        for r in csv.DictReader(open(out)):
            have |= {r["company"].lower(), digits(r["phone"]), urlparse(r["website"]).netloc.lower()}
    with ThreadPoolExecutor(12) as ex:
        found = [g for g in ex.map(verify, rows) if g]
    good = []
    for g in found:  # one lead per business: same name, phone or website counts as a repeat
        keys = {g["company"].lower(), digits(g["phone"]), urlparse(g["website"]).netloc.lower()}
        if keys & have:
            continue
        have |= keys
        good.append(g)
    new_file = not os.path.exists(out)
    with open(out, "a", newline="") as f:
        w = csv.DictWriter(f, fieldnames=HDR)
        if new_file:
            w.writeheader()
        for g in good:
            w.writerow(g)
    print(f"{len(rows)} ancient candidates -> {len(good)} qualified, appended to {out}")


if __name__ == "__main__":
    main()
