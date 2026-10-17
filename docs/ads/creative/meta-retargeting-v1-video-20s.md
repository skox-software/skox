# Creative: meta-retargeting-v1 · video-20s

**Status: BLOCKED.** It can't run as a Meta ad until (a) Reiss signs every "Needs Reiss" line below in `claims.md`, or a recut drops them, **and** (b) every NOT IN CLAIMS line is either signed in as a new claim or cut. The 9:16 file also needs a Meta Reels recut (see "Safe zones").

**Files:** `output/SKOX-ad-20s-1x1.mp4` (Feeds), `output/SKOX-ad-20s-9x16.mp4` (Stories/Reels). The source is `output/skox-hype/ad.html`. Timecodes below come from its scene grid (128 BPM, 20.625s).

**The one message:** you get a fixed price and a date in writing before you pay, from the two people who build it.

**Audio:** music only, no voiceover. Meta autoplays muted, and every message is already on screen, so nothing is lost.

---

## Every on-screen line, checked against `claims.md`

| Time (s) | On screen | Source (`ad.html`) | Verdict | Claim / note |
|---|---|---|---|---|
| 0.00–0.94 | "THEY QUOTED YOU" / "QUARTERS?" (struck through) | `:150–161` | **NEEDS REISS** | On the Needs Reiss list ("They quoted you quarters?") |
| 0.12–0.94 | "A DISCOVERY PHASE. A RANGE. AN HOURLY RATE." | `:162` | **NOT IN CLAIMS** | It describes the alternative. Only "hourly" has a source (C13, "often billed by the hour"). "A discovery phase" and "a range" have no site line. |
| 0.94–1.88 | "BUILT IN DAYS." | `:175–185` | **NEEDS REISS** | On the Needs Reiss list. It's only true for the two focused builds; the 14 and 7 that follow are what make it fair. |
| 1.88–2.81 | "14" "DAYS" "A live dashboard." "14-DAY FOCUSED DASHBOARD BUILD" | `:223–239` | C08, with a gap | C08 is fine. "A live dashboard." is **NOT IN CLAIMS**: next to a huge "14 DAYS", it reads like an unconditional promise. The C08 condition (data and access agreed) appears nowhere on screen, so the ad's description has to carry it. |
| 2.81–3.75 | "07" "DAYS" "A new website." "7-DAY FOCUSED SITE BUILD" | same | C09, with a gap | Same issue: "A new website." is **NOT IN CLAIMS**, and no condition is shown. |
| 3.75–7.50 | Dashboard UI: "Your business. In focus.", SAMPLE tag, "Bookings this week 142 ↑ 18% vs last week", "Revenue · all locations $24,680 / 3 locations", "Data sources 5 / Synced · just now", "Revenue trend", "Revenue by location" Downtown/Northside/Riverside | `:310–407` | OK as SAMPLE UI | It carries the SAMPLE pill, the way the site does (`landing.ts:75–99`). "Your business. In focus." is the site's own preview title (`landing.ts:46`). |
| 5.39–7.27 | Caption chip "One dashboard. Every location." | `:286` | **NOT IN CLAIMS** | The nearest claim is C21, "Location & team performance views". It isn't on the allowlist as written. |
| 6.56–7.50 | "LIVE." stamp | `:302` | **NOT IN CLAIMS** | It's stamped on a SAMPLE dashboard, so it implies a delivered, running system. Low risk, but it has no source. |
| 7.50–9.38 | "Web apps." "Portals." "DASHBOARDS" "Internal tools." "Integrations." "Websites." | `:414–421` | OK | C02, C21 |
| 7.97–8.20 | "MVPs." | `:418` | **NOT IN CLAIMS** | The nearest is "A focused first version you can use" (`landing.ts:15`). |
| 8.75–9.38 | "Whatever's next." | `:421` | **NOT IN CLAIMS** | The nearest is C01, "Your next big thing." |
| 7.50–9.38 | "0X / 08", "WHAT WE BUILD" (1:1 only) | `:485–486` | OK | Section label (`landing.ts:178`) |
| 9.38–11.25 | "Every system in." / "One number out." | `:551–552` | **NOT IN CLAIMS** | The nearest is C22, "one clear view of your business". |
| 9.38–11.25 | Source chips: "Bookings", "Payments", "Social", "Spreadsheets", "Your CRM" | `:495` | OK | C21 (connected data from your existing tools) |
| 9.38–11.25 | Source chip "Anything with an API" | `:495` | **NOT IN CLAIMS** | It suggests SKOX can connect to anything. The nearest claims are C21 and C23. |
| 10.3–10.9 | "$24,680" + SAMPLE | `:544–546` | OK | SAMPLE-tagged |
| 11.25–15.00 | "Fixed price." "Fixed date." "In writing." "Before you pay." | `:569–573` | OK | C03, C05 |
| 11.25–15.00 | Card: "WRITTEN SCOPE", "Your project", "What gets built", "The fixed price", "The delivery date", "You own the code" | `:582–586` | OK | C03, C07; "written scope" is `landing.ts:259` |
| 14.06–15.00 | Stamp "AGREED IN WRITING" | `:602` | OK | C03, C15 |
| 15.00–16.17 | "No account managers." | `:618` | OK | C14 restatement (`claims.md` allows it) |
| 15.38–16.17 | "No hourly billing." | `:618` | OK | C13 restatement (`claims.md` allows it) |
| **15.75–16.17** | **"No lock-in."** | **`:618`** | **NEEDS REISS (BLOCKER)** | On the Needs Reiss list. No site line says it. C07 (you own the code) implies it but doesn't say it. |
| 16.41–16.75 | "Talk to the builders." | `:640` | OK | C06 |
| 16.41–16.75 | "TWO FOUNDERS · NOBODY IN BETWEEN" | `:643` | **NEEDS REISS** | On the Needs Reiss list (it restates C14) |
| 16.88–20.63 | "Your next big thing. Built at speed." | `:686` | OK | C01 |
| 16.88–20.63 | "FREE 30-MINUTE SCOPE CALL · NO DEPOSIT" | `:698` | OK | C04. "No deposit" is attached to the call, which is the wording `claims.md` requires. |
| 16.88–20.63 | Button "Get my price & timeline ↗", "skoxsoftware.com" | `:701`, `:720` | OK | C11 |

**Totals (matching the claims audit):** 14 blockers.
- 4 Needs Reiss lines (one is the "No lock-in" blocker).
- 9 lines NOT IN CLAIMS ("Anything with an API" included).
- The C08/C09 condition is never shown on screen. The ad description can't fix that, because Stories/Reels don't reliably show descriptions. So "BUILT IN DAYS." → "14 DAYS" → "07 DAYS" plays as an unconditional day promise.

**Not in v1:** the campaign file moves this ad to section 10.

A side note on the struck-through "No …" lines (`ad.html:627`): striking through "No account managers." can read as negating it. That's a style question, not a claims one, but a cleaner read is to strike only the noun or not strike at all.

---

## Safe zones (Meta)

Meta's Stories/Reels UI covers the **top 14% (0–269 px)** and the **bottom 35% (1248–1920 px)** of a 1080×1920 frame. The current 9:16 was built for YouTube Shorts and breaks this:

| Element (9:16) | y position | Problem |
|---|---|---|
| Logo bug | about 120 | Top band (minor) |
| Caption chip "One dashboard. Every location." | about 205 | Top band |
| "14-DAY FOCUSED DASHBOARD BUILD" / "7-DAY FOCUSED SITE BUILD" | about 1380 | **Bottom band.** The "focused" qualifier is what keeps C08/C09 honest, and it's the part the UI covers. |
| "One number out." | about 1440 | Bottom band |
| Written-scope card, lower rows and the "AGREED IN WRITING" stamp | about 1260–1470 | Bottom band |

The 1:1 file has no such problem in Feeds.

---

## Recut spec (the route to UNBLOCKED, if Reiss doesn't sign everything)

1. Cut "No lock-in." from the struck-line scene so it holds two lines: "No account managers." / "No hourly billing." (C14, C13). Rebalance the timing over the same beats.
2. Replace "A DISCOVERY PHASE. A RANGE. AN HOURLY RATE." with "OFTEN BILLED BY THE HOUR." (C13), or remove the subline.
3. Replace "A live dashboard." / "A new website." with "Focused dashboard build." / "Focused site build." and add a small line under each: "Data and access agreed first" / "Content and access agreed first" (C08/C09 conditions).
4. Replace "One dashboard. Every location." with "Location & team performance views" (C21, exact wording).
5. Drop the "LIVE." stamp, or swap it for "SAMPLE".
6. Swap "MVPs." for "First versions." only if Reiss accepts it as a C21 paraphrase; otherwise drop the slot. Drop "Whatever's next.", or use "Your next big thing." (C01).
7. Replace "Every system in. / One number out." with "Connected data from your existing tools" / "One clear view of your business" (C21, C22).
8. Replace the "Anything with an API" chip with "Your other tools".
9. Re-lay the 9:16 for Meta: all key text inside x = 65–1015 and y = 269–1248.
9b. End card: make "Get my price & timeline ↗" a plain text line, not a pill button (Meta's non-existent functionality rule).
10. Keep the hook ("They quoted you QUARTERS?"), "BUILT IN DAYS." and "TWO FOUNDERS · NOBODY IN BETWEEN" only if Reiss signs them. Otherwise use "Talk to the builders." / "WORK WITH THE FOUNDERS" (C06) for the last one.
11. Render as `output/SKOX-ad-20s-meta-1x1.mp4` and `output/SKOX-ad-20s-meta-9x16.mp4`, so the Google kit stays as it is.

## Avoid (for any recut)

Price, location, AI, named firms or platforms, guarantees, testimonials or results, any dashboard figures without SAMPLE, "two weeks" or "one week", and profanity.
