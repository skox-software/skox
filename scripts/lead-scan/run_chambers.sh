#!/bin/bash
# Harvest every chamber directory listed in a file, then scan all members' sites.
#   bash scripts/lead-scan/run_chambers.sh scripts/lead-scan/data/chambers.txt 2026-10-17
# chambers.txt: one "<base URL><TAB><city, ST>..." per line.
set -u
cd "$(dirname "$0")"
list="$1"; tag="${2:-$(date +%F)}"
mkdir -p data/chambers
while IFS=$'\t' read -r base place _; do
  [ -z "$base" ] && continue
  slug=$(echo "$base" | sed -E 's#https?://##; s#[^A-Za-z0-9]+#-#g')
  out="data/chambers/$slug.json"
  [ -s "$out" ] && { echo "skip $base (have it)"; continue; }
  python3 chamber_harvest.py "$base" "$out" || echo "FAILED $base"
done < "$list"
python3 - "$tag" <<'EOF'
import glob, json, sys
rows = []
for f in sorted(glob.glob("data/chambers/*.json")):
    rows += json.load(open(f))
json.dump(rows, open(f"data/chamber-members-{sys.argv[1]}.json", "w"))
print(len(rows), "members total")
EOF
python3 scan.py "data/chamber-members-$tag.json" --out "data/scan-chambers-$tag" --workers 16
