#!/usr/bin/env python3
"""Re-check every RSA line in ads.csv against Google's limits.

Run from anywhere:  python3 docs/ads/campaigns/google-search-v2-editor/check_lengths.py
Exits non-zero if anything is over the limit, missing, or duplicated within an ad.
"""
import csv
import pathlib
import sys

HERE = pathlib.Path(__file__).resolve().parent
LIMITS = {"Headline": 30, "Description": 90, "Path": 15}
problems = 0

with open(HERE / "ads.csv", newline="", encoding="utf-8") as f:
    for row in csv.DictReader(f):
        name = f'{row["Campaign"]} / {row["Ad Group"]}'
        heads = [row[f"Headline {i}"] for i in range(1, 16)]
        descs = [row[f"Description {i}"] for i in range(1, 5)]
        paths = [row["Path 1"], row["Path 2"]]
        print(f"\n{name}")
        for kind, items in (("Headline", heads), ("Description", descs), ("Path", paths)):
            for i, text in enumerate(items, 1):
                n = len(text)
                flag = "" if 0 < n <= LIMITS[kind] else "  <-- PROBLEM"
                problems += bool(flag)
                print(f"  {kind[0]}{i:<2} ({n:>2}) {text}{flag}")
        if len(set(heads)) != 15 or len(set(descs)) != 4:
            print("  <-- PROBLEM: duplicate headline or description in this ad")
            problems += 1
        if row["Headline 1 position"] != "1":
            print("  <-- PROBLEM: headline 1 not pinned to position 1")
            problems += 1
        if any("14-day" in t.lower() for t in heads + descs) and row["Description 1 position"] != "1":
            print("  <-- PROBLEM: 14-day promise without its condition pinned to description 1")
            problems += 1

print(f"\n{problems} problem(s).")
sys.exit(1 if problems else 0)
