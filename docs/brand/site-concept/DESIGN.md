# UnBusy site: DESIGN.md

Scope: the public site (homepage, industry question pages, the review page, privacy). Rewritten 2026-10-27 after Josh rejected the first "Swiss ledger" direction as a tax form with no character, and reviewed giga.ai, legora.com, zaro.ai, beside.com and ramp.com. The mockups beside this file (`index.html`, `surveying.html`, `review.html`, sharing `site.css`) are the reference; `app/site.css` in the repo is the same sheet scoped under `.ub`.

## 1. Visual theme

Blue paper. The brand's three colours (ink, paper, the logo blue) used with nerve: blue is a surface, not a dot. The product is shown as a sheet of paper, running. One signature device, the strike, carries the name: busywork is a word with a blue line through it.

One line: **the busywork, struck off.**

Atmosphere words: confident, plain, quick, operator, blue.

## 2. Colour

```css
--ink:#15181D;  --ink-2:#5B6168;         /* text on paper; secondary text */
--paper:#FAFAF8; --paper-2:#F1F1EE;     /* page; quiet bands */
--blue:#0B5CFF;  --blue-deep:#0845C2;    /* hero surface, buttons, numerals, the strike, the price card; hover */
--sky:#E9F0FF;   --sky-2:#D6E3FF;        /* the "a desk" row, the proof panel, focus rings */
--rule:rgba(21,24,29,.14); --rule-paper:rgba(250,250,248,.28);
```

Roles. Blue: the homepage and industry heroes, every primary button, the step numerals, the strike, the desk's price card. Text on blue or ink is paper at 85% or more (AA at 15px). Ink: text, the one dark band per page (Industries on the home page, Where it stops on industry pages), the footer. Paper: everything else. Sky: the one highlighted row or panel per section. No fourth colour. Status is a word with a dot before it: ink dot done, blue dot (with a sky halo) waiting on a person.

## 3. Type

Bricolage Grotesque (variable, optical size and width axes) at 700 for display; IBM Plex Sans 400/500/600 for text; via `next/font/google` (`--font-display`, `--font-body`). Chosen 2026-10-27 after the distinctive-frontend review flagged Inter as the one thing that still let the page read as generic: Bricolage's large optical size gives the headline its own cut, Plex reads like a document and has true tabular figures.

| Level | Size | Weight | Tracking | Use |
| --- | --- | --- | --- | --- |
| H1 | clamp(46px, 6.2vw, 96px) | 700 | -0.025em, line-height .96 | Hero. Inner pages clamp(40px, 5vw, 76px) |
| Step numeral | 28px | 700 | -0.02em, blue | Numbered lists only |
| H2 | clamp(34px, 4.4vw, 60px) | 700 | -0.03em | Section titles |
| H3 | 22px | 600 (Plex) | -0.015em | Row and list titles |
| Lead | 21–22px | 400 | 0 | Hero paragraph |
| Body | 17px | 400 | 0 | Everything else |
| Small | 14–15px | 400/500 | 0 | Eyebrows, sources, notices |
| Strip | 34px | 700 | -0.03em | The four numbers on the ink band |

Tabular figures (`tnum`) on anything numeric. No monospace, no uppercase tracking, no serif.

## 4. Components

- **Buttons.** Pills, 56px (44px in the nav, 48px in the sheet). `blue` (primary), `paper` (on blue), `ink` (inside the sheet). Each ends with a 10px dot: white on blue and ink, blue on paper. Hover lifts 1px; nothing else.
- **The strike.** `<span class="strike">busywork</span>`: an `::after` line at 54% height, .09em thick, blue on paper and paper on blue, scaling in from the left over 500ms, once, 700ms after load (`.now` runs on a 400ms delay for rows further down). Used in the hero H1, the review H1, and through the first three rungs of Hire vs. build. Never elsewhere.
- **The job ticket (`.sheet`).** A white document (3px radius, one deep soft shadow, a sky margin rule down the left) with two translucent sheets stacked behind it. Caption; a header block (Job / Address / Received, or Request / Unit / Received); the four-column table (Document, Source, Status, Time); a foot with the total, a signature line ("Approved by") and an ink button. The row that waits on a person carries its status as a blue rubber stamp, slightly rotated; done rows an ink dot. On load each row is written left to right (a clip-path wipe, 450ms, 600ms apart), the foot last; reduced-motion shows it finished. On the blue hero it sits in columns 6–12.
- **The strip.** Four numbers with one-line labels on paper under the hero, hairline-separated. Only the sample job's own figures; never a counter. The page's one dark band is the Industries (or Where it stops) section.
- **Section head.** H2 in columns 1–6, intro bottom-aligned in 7–12. No section numerals: numbers appear only where the content is a sequence (the desk's three parts, the review's steps, the job walkthrough, the ladder).
- **How a desk works.** The desk's three parts as a numbered ledger in columns 1–7 (blue 01–03, 30px titles); "Decide" alone in columns 8–12 on a sticky sky panel with a 34–48px title. The layout says what the copy says: three are the desk's, one is yours.
- **Question rows (`.qs`).** On the dark band: trade in small text, the question at 24–36px; the row shifts right 12px on hover. No arrows.
- **The ladder.** Numbered rows with a right-hand status word; the first three struck; the fourth, "A desk.", on a sky row with blue numeral and tag.
- **Hire vs. build.** Two ledger lines, not cards: title and bullets left, the amount right at up to 64px in the display face, the desk's amount in blue. Source line under.
- **Steps.** Numbered list, blue numerals, hairlines.
- **Proof panel.** Sky, 8px radius, one paragraph.
- **Form.** 52px fields, 1.5px hairline borders, 8px radius, blue border and sky ring on focus; a two-option segmented control for on site / screen share; blue pill submit. Labels above fields in small 500.
- **Header.** Sticky, paper at 90% with blur, logo left, three links, the blue pill. Under 600px: logo and pill only.
- **Footer.** Ink, dark lockup, one line, three links.

## 5. Layout

Container 1240px, 28px gutters (18px under 600px). 12 columns, 28px gap. Heroes: copy 1–5, sheet 6–12, bottom-aligned. Sections 120px tall (72px under 980px). Rounded corners exist only on pills, the ticket (3px), the stamp and the sky panels (8px). Depth exists only on the ticket (one shadow) and the stacked pages behind it.

## 6. Motion

- Load: one orchestrated moment, the strike drawing, then the ticket being written row by row (a wipe, never a fade). Nothing else enters.
- Hover: buttons lift 1px; question rows slide 12px.
- Nothing scroll-triggered, nothing looping, nothing that counts. `prefers-reduced-motion` turns all of it off.

## 7. Copy rules on the page

- "AI" appears once per page, in the owner's question (the eyebrow or the H1). Never as a feature.
- "UnBusy" names the company only in the logo, the title tag and legal lines; the word for people and work is "busywork", struck.
- Every sample says "sample" in its caption. Named clients only with their permission.
- No founder names, photos or phone numbers anywhere.
- No category words in headlines: not "AI agency", "automation", "software", "operating system".

## 8. Don't

Gradients, glows, grain; logo bars; stats or quotes that aren't ours; counters that invent activity; uppercase tracked eyebrows; monospace; email-gated demos; a dark page (one dark band per page is the limit); a second accent colour.

## 9. Responsive

Breakpoints 980px and 600px. Under 980px: one column, the sheet below the hero copy with its stacked pages hidden, parts two-up, question rows stack their label above the question, figures stack. Under 600px: nav shows logo and pill, the sheet hides its Time column and the Source column (source moves under the document name on the live site), parts one-up. No horizontal overflow at 360px.

## 10. Second review (frontend-design skill, 2026-10-27)

Removed as generic tells: section numerals 01–04, repeated small labels above headings, arrows on link rows, middle-dot captions, per-element fade-up entrances. Kept because they carry information: numbers on real sequences, the trade label on question rows, the one load moment (strike, then sheet).

## 11. Third pass (2026-10-28)

Grounded the chrome in the buyer's own vernacular instead of SaaS: the sheet is a job ticket (header block, margin rule, stamp, signature line, rows that print rather than fade); Hire vs. build is two ledger lines instead of two price cards; the stats strip moved onto paper so each page has one dark band. Liquid Glass and other native-app motion systems don't apply to the site; the one idea borrowed from them is that an element should materialize in its own material (here: be written) rather than fade.
