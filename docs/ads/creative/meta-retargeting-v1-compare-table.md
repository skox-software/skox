# Creative: meta-retargeting-v1 · compare-table

**Ad:** C (`utm_content=compare-table`) in `docs/ads/campaigns/meta-retargeting-v1.md`
**Status:** brief ready, asset not made.

## The one message

SKOX sits between the expensive option and the risky one, and the comparison is spelled out in the site's own words.

## Format and sizes

Static PNG: a table built from type, no photos.

| Size | Use |
|---|---|
| 4:5, 1080×1350 | Feed. **The main size for this concept**, because the full table needs the height. |
| 1:1, 1080×1080 | Feed fallback |
| 9:16, 1080×1920 | Stories and Reels |

## Exact on-image text (word for word from `content/landing.ts:143–177`; counts checked with Python `len()`)

**Do not reword, shorten or re-case any cell.** If a cell won't fit, change the layout, not the words. If the layout still can't fit everything, drop a whole row (the last one first), never a word.

| Role | Text | Chars | Claim |
|---|---|---|---|
| Title | Between expensive and risky. | 28 | C16 (`:143`) |
| Column head (highlighted) | SKOX | 4 | `:147` |
| Column head | Big dev shop | 12 | `:148`, generic, C12–C15 |
| Column head | Freelancer or DIY | 17 | `:149`, generic, C12–C15 |
| Row label | Timeline | 8 | C12 |
| SKOX | A delivery date in writing, before you pay | 42 | C12, C03 |
| Big dev shop | Months | 6 | C12 |
| Freelancer or DIY | Unpredictable | 13 | C12 |
| Row label | Price | 5 | C13 |
| SKOX | Fixed upfront, with no agency overhead | 38 | C13 |
| Big dev shop | High, often billed by the hour | 30 | C13 |
| Freelancer or DIY | Low, but a gamble | 17 | C13 |
| Row label | Who you deal with | 17 | C14 |
| SKOX | The two founders building it | 28 | C14 |
| Big dev shop | An account manager | 18 | C14 |
| Freelancer or DIY | One person, if they reply | 25 | C14 |
| Row label | When plans change | 17 | C15 |
| SKOX | Agreed in writing, with a working review halfway | 48 | C15 |
| Big dev shop | Change orders | 13 | C15 |
| Freelancer or DIY | Start over | 10 | C15 |
| Footnote | Free 30-minute scope call. No deposit. | 38 | C04 (`:177`) |
| Brand | SKOX wordmark | — | — |

## Layout (the live site's light style)

- **Background:** paper `#faf9f6`. **Type:** ink `#121619`. **Accent:** amber `#E4A907`, with amber-ink `#7a5a05` for small amber type. Muted grey `#5c6157` for the two alternative columns.
- **Fonts:** Geist 800 for the title, Geist 600 for the SKOX cells, Geist 500 in muted grey for the other two columns, and Geist Mono uppercase for the row labels and the footnote. Match the site's compare section; check it at skoxsoftware.com before export.
- **Emphasis:** only the SKOX column is highlighted, with a soft amber-tinted panel (`rgba(228,169,7,.12)`) and a 3 px amber top rule. The other columns are plain. **No ticks, crosses, red or green**, and nothing that mocks the alternatives. The words do the work.
- **4:5 (main):** title at the top, then a four-column grid (row label | SKOX | Big dev shop | Freelancer or DIY). Make the row-label column narrow and the SKOX column the widest. Cell text at least 28 px. Footnote and wordmark at the bottom, 80 px margins.
- **1:1:** there's no room for a row-label column. Put each row label as a small mono eyebrow above its row, with three columns under it. Cell text at least 26 px. If it doesn't read at phone size, drop the "When plans change" row (all four cells), never individual words.
- **9:16:** keep **all text inside x = 65–1015 and y = 269–1248**. The top 14%, the bottom 35% and about 65 px on each side are covered by the Stories/Reels UI, which leaves a 950 × 979 px box. Stack the four rows as four compact bands (eyebrow label, then three cells side by side), with the title just under y = 269 and the footnote just above y = 1248. **Minimum type size on 9:16: cells 26 px, row-label eyebrows 20 px, title 56 px.** If the four rows don't fit at those sizes, drop the "When plans change" row (all four cells). Never shrink below the minimums or cut words. Nothing in the bottom 35% or the side bands.

## Avoid

- Naming any firm, freelancer platform or marketplace. No logos, no "vs. [brand]".
- Putting a number on anyone else's price or timeline beyond the site's own words ("Months" is the only one).
- Rewording cells, for example "Weeks, not months" or "No hourly rates ever". Only the table's own words go in the table.
- Any price, guarantee, location, AI, testimonials or results.
- Ticks and crosses, red and green, thumbs, emoji.
- Stock photos, people, or before/after imagery.
