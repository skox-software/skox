#!/bin/bash
# Scan harvested chamber files in chunks; after each chunk, verify and push the
# qualified leads to Reiss's pipeline, so leads arrive in batches.
#   bash scripts/lead-scan/run_batches.sh 8
# Chambers already scanned are listed in data/chambers-scanned.txt and skipped.
set -u
cd "$(dirname "$0")"
size="${1:-8}"
OUT=../../docs/prospects/leads-old-sites-nationwide.csv
touch data/chambers-scanned.txt
mkdir -p data/chunks
while :; do
  chunk=$(ls data/chambers/*.json | grep -vxFf data/chambers-scanned.txt | head -n "$size")
  if [ -z "$chunk" ]; then
    pgrep -f chamber_harvest.py >/dev/null && { sleep 60; continue; }  # wait for the harvest to catch up
    echo "all harvested chambers scanned"; break
  fi
  n=$(date +%H%M%S)
  python3 - "$n" $chunk <<'EOF'
import json, os, sys, time
rows, used = [], []
for f in sys.argv[2:]:
    if time.time() - os.path.getmtime(f) < 30:
        continue  # the harvester may still be writing it
    try:
        rows += json.load(open(f)); used.append(f)
    except ValueError:
        pass
json.dump(rows, open(f"data/chunks/chunk-{sys.argv[1]}.json", "w"))
open(f"data/chunks/chunk-{sys.argv[1]}.files", "w").write("\n".join(used) + "\n")
print(f"chunk {sys.argv[1]}: {len(used)} chambers, {len(rows)} members")
EOF
  python3 scan.py "data/chunks/chunk-$n.json" --out "data/chunks/scan-$n" --workers 32 2>&1 | tail -1
  python3 verify_ancient.py "data/chunks/scan-$n-ranked.csv" "$OUT"
  (cd ../.. && node scripts/lead-scan/push_to_pipeline.mjs docs/prospects/leads-old-sites-nationwide.csv --apply | tail -1)
  cat "data/chunks/chunk-$n.files" >> data/chambers-scanned.txt
done
