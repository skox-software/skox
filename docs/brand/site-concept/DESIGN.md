# UnBusy site: DESIGN.md

Scope: the public site (homepage, industry question pages, the review page, privacy). Rewritten 2026-10-27 after Josh rejected the first "Swiss ledger" direction as a tax form with no character, and reviewed giga.ai, legora.com, zaro.ai, beside.com and ramp.com. The mockups beside this file (`index.html`, `surveying.html`, `review.html`, sharing `site.css`) are the reference; `app/site.css` in the repo is the same sheet scoped under `.ub`.

## 1. Visual theme

**The paperwork, photographed.** Each page opens on a still-life photograph of that trade's actual busywork, shot flat on the brand blue: a plat and a field book for surveyors, a work order on a clipboard for property managers, the folder stack and the ledger for everyone else. The headline sits on the clear left third. On load the page's one moment plays: the strike draws through "busywork", then the photograph is swept left to right into a second photograph of the same desk cleared, only the stamp, the ink pad and one approved sheet left. The pictures live in `docs/brand/stills` (PNG masters, Higgsfield gpt_image_2_5, 2K) and `public/brand/stills` (JPEG). Underneath the photographs the system is still blue paper: The brand's three colours (ink, paper, the logo blue) used with nerve: blue is a surface, not a dot. The product is shown as a sheet of paper, running. One signature device, the strike, carries the name: busywork is a word with a blue line through it.

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

## 12. Fourth pass: the photographs (2026-10-28)

Josh: the third pass still read as AI slop. Diagnosis: the page was all typography and panels, where every reference he liked (giga.ai, legora.com, zaro.ai, ramp.com) has art-directed imagery. Decision: photographed paperwork on the brand blue as the visual world, a series across industries so any owner recognises their own pile.

- Heroes: `pile` (home), `surveying`, `maintenance`; each with an `-after` plate for the sweep. Prompt recipe: straight-down flat lay, seamless matte #0B5CFF, the trade's real documents with real English words, hard daylight top-left, medium format f/8, Portra, faint grain; left third empty; no people, hands, screens, logos. The after plate is an edit of the hero with `image_references`: everything removed but the stamp and ink pad, one sheet with a blue stamp (APPROVED / SENT / DONE).
- The wall: eight more trades at 4:3 (title, CPA, law, insurance, contractor, medical, freight, HVAC) under "Start with the question you're already asking"; the two with live pages are twice the width and link to them, the rest open the review with the trade filled in.
- The hero frame's background is the photograph's own blue (sampled at its left edge, per still in `content/site.ts`), the image starts 20% in with a 90px mask so the surface reads as one; under 980px the photograph is a 16:9 block above the copy.
- Removed with this pass: the blue hero surface as a layout, the sky panels, the dark Industries band (the wall replaced it), the photo-less section rhythm. A 280px photographic break (the stamp corner of the hero) separates the wall from Hire vs. build.
- The static mockups in this folder predate the photographs and are kept as the record of the earlier passes; the site itself is now the reference.

## 13. The film and the cost ledger (2026-10-28)

Josh: the work doesn't vanish, it gets done by a desk instead of a paid person; show that, and the money. Two additions:

- **The hero film** (`public/brand/stills/pile-filed.mp4|webm`, MiniMax H3 Max, 5 s, 768p, start = the pile hero, end = `pile-filed.jpg`): sheets slide out of the folders, each is stamped and glides into one squared stack, the ledger closes into it, the emptied folders leave, a till receipt prints ("THIS WEEK · 5 documents collected · 4 read · 1 quote drafted · Time 4 min 12 s · Staff hours 0"), and the stamp presses APPROVED on the top sheet. Plays once, 1.2 s after load, desktop only; phones and reduced-motion get the still-to-still wipe. The end plate is also the "after" still. A first version that made the paperwork disappear was rejected: it said the work goes away.
- **"What this work costs you now"**, directly under the hero: two ledger columns, Today and With a desk, in hours and dollars for a labelled sample firm (12 people, 40 quotes a month, 45 minutes each = 30 hours; BLS median $47,540 + 30% = $29.70/h = about $890 a month, $10,700 a year; the desk: 0 office hours, $1,500 a month, the hours back). Every figure is the BLS wage, our price or a stated assumption. No counters, no percentages, no client numbers.

## 14. The desk, as a picture (2026-10-28, evening)

Josh: the paperwork isn't paper, it's on computers; he doesn't want the real tool shown; he wants an UnBusy-branded mockup that pulls an owner in. So the hero is now **the desk itself, drawn in the brand**: a white window with the Un● mark, three columns. *What came in*: the owner's busywork as it arrives (an email, an attachment, a county portal, a spreadsheet). *What the desk did*: the steps writing themselves with the desk's own times and a running clock. *What came back to you*: the finished job on a sheet of paper with the stamp ("Waiting on the owner") and the one button, and under it the month for a labelled sample firm (40 quotes drafted · 30 office hours back · $890 of payroll not spent), counting up. Plays once after the strike; "Play again" replays; reduced-motion shows it finished. Component: `components/site/DeskMockup.tsx`; content: `quoteDeskMock` and each industry's `mock`.

Removed with this pass: the photographic hero, the film and the after plates (masters stay in `docs/brand/stills` in the main checkout). The photographs survive as the industry wall tiles and the one section break. The cost ledger under the hero stays: the mockup's month numbers are its arithmetic.

## 15. The pile turns into the desk (2026-10-28, night)

Josh: show the paper turning into the efficient system. The mockup window now opens on the photograph of the pile with a caption ("Today: the same job, by hand. Four county sites, a PDF, a spreadsheet, an email. About 45 minutes of someone's time, 40 times a month."); 0.9 s in, the photograph wipes away left to right and the desk underneath is already running; the clock, the stamp and the month's numbers follow. One moment, three beats: the strike, the wipe, the run. "Play again" replays all three. The photographs' job on the site is now exactly this: the before.

## 16. The motion pass (2026-10-28, night)

Josh: it has to hit hard for owners who have been debating AI and don't know where to start. The hero's one moment is now four beats, each with a reason:

1. **One stroke.** The blue line that crosses out *busywork* keeps going: a paper-coloured stroke travels from the end of the word across the gap to the window (`.hero-stroke`, measured at play time) and becomes the edge that sweeps the pile out of the window. The brand's gesture clears the desk.
2. **Real pace.** The clock runs at the desk's own pace compressed to 4.8 s, and each step is *typed in* (a left-to-right reveal) at the moment the clock reaches its time; the tick fills with a small pop. 0:41 feels like 0:41.
3. **Weight.** The quote card arrives and the stamp lands: scale 2.2 → 0.92 → 1 with a slight rotation in 220 ms, and the paper gives a 2px thud.
4. **A finish.** The month counts up, the window lifts 4px and deepens its shadow, and the hero button's dot pulses once. The only thing on the page that ever asks for attention, and it asks once.

Reduced-motion shows the finished desk with no stroke, no sweep. Still to come when credits allow: the documents in the photograph cut out as layers and flying into "What came in".
