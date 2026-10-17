# Creative: meta-retargeting-v1 · fixed-terms

**Ad:** B (`utm_content=fixed-terms`) in `docs/ads/campaigns/meta-retargeting-v1.md`
**Status:** brief ready, asset not made.

## The one message

You get a fixed price and a fixed date before you pay.

## Format and sizes

Static PNG, type only. No photo and no UI.

| Size | Use |
|---|---|
| 1:1, 1080×1080 | Facebook/Instagram Feed (required) |
| 4:5, 1080×1350 | Feed, if time allows (takes more of the screen on mobile) |
| 9:16, 1080×1920 | Stories and Reels (required) |

## Exact on-image text (character counts checked with Python `len()`)

| Role | Text | Chars | Claim |
|---|---|---|---|
| Headline, line 1 | Fixed price. | 12 | C03, C05 |
| Headline, line 2 | Fixed date. | 11 | C03 |
| Headline, line 3 | Before you pay. | 15 | C03 (`landing.ts:154`, `:191`) |
| Support line | Custom web apps, dashboards and websites | 40 | C02 |
| Footnote | Free 30-minute scope call. No deposit. | 38 | C04 (exact copy of `landing.ts:177`) |
| Call line (plain text, **not** a button) | Get my price & timeline | 23 | C11 |
| Brand | SKOX wordmark | — | — |

Nothing else goes on the image. No URL is needed; Meta shows the display link.

## Layout (the live site's light style)

- **Background:** paper `#faf9f6`. **Type:** ink `#121619`. **Accent:** amber `#E4A907`. Darker amber for type on light backgrounds: `#7a5a05`.
- **Fonts:** the same as the 20s video and the site, so it reads as one brand: Geist 800 for the three headline lines (tight tracking, about −4% of the size), Instrument Serif italic in amber-ink for "Before you pay.", and Geist Mono 600 uppercase with wide tracking for the footnote. Confirm the fonts against the live site before export.
- **Hierarchy:** the three headline lines fill about 60% of the frame width and sit stacked, left-aligned. Put a 10 px amber underline under "Before you pay.", the same move as the video's offer scene (`ad.html:573–574`). The support line sits under it in Geist 500 at about a third of the headline size. "Get my price & timeline" is a **plain text line** in Geist 600 ink with a 4 px amber underline. Don't draw it as a pill, box, rounded rectangle or anything else that looks clickable, and don't add an arrow or cursor. Meta's non-existent functionality rule flags fake buttons in images, and Meta already adds its own **Get quote** button under the image. The footnote sits under the call line in muted grey `#5c6157`. The wordmark goes top-left, small, with ink SK and an amber O and X.
- **1:1:** headline block in the top 55%, call line and footnote in the bottom 30%, at least 80 px margins.
- **4:5:** same as 1:1, with more air between the headline and the call line.
- **9:16:** keep **all text inside x = 65–1015 and y = 269–1248**. The top 14%, the bottom 35% and about 65 px on each side are covered by the Stories/Reels UI. Use 80 px side margins to be safe. The wordmark sits just below 269 px. Leave the bottom 35% as plain paper, with at most a thin amber rule.
- Optional and quiet: a faint written-scope card (white, light shadow) behind the right edge with four rows, "What gets built / The fixed price / The delivery date / You own the code" (C03, C07). It must not compete with the headline. Leave it out if the frame feels busy.

## Avoid

- Anything drawn to look clickable: pill or boxed buttons, arrows, cursors, play icons, checkboxes, notification badges.

- Any price or number other than "30-minute". No "$", "from", "affordable", "cheap".
- "Guaranteed", "risk-free", "or it's free", "money-back".
- "No deposit" on its own. It always stays inside "Free 30-minute scope call. No deposit."
- Location, AI, named firms or platforms, testimonials, stars, logos of clients.
- Stock photos of people, handshakes or "happy clients". Before/after imagery.
- ALL CAPS headlines (the mono footnote may be caps, as on the site), exclamation marks, emoji.
- Any timing ("7-day", "14-day") on this image. Timing lives in the primary text with its conditions.
