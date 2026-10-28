# UnBusy site: DESIGN.md

Scope: the public site (homepage, industry question pages, operations review page). Written 2026-10-26 to replace the first mockup, which read as a generic AI-generated SaaS page. Seed: Swiss Grid, set on paper. Interaction tier: L1 (refined static) by decision, not omission: the audience is owners of 5–50 person firms, and the brand sells calm.

## 1. Visual Theme & Atmosphere

A well-set document, not a product page. Think a surveyor's job sheet or a ledger typeset by a Swiss printer: paper, ink, rules, numbers that line up, one blue dot. The page is left-aligned on a strict 12-column grid, uses rules instead of boxes, numbers instead of icons, and sentences instead of slogans. Nothing glows, floats, blurs or pulses.

One line: **the office, in order.**

Atmosphere words: plain, exact, unhurried, operator, printed.

## 2. Color Palette & Roles

```css
:root {
  --ink: #15181D;        --ink-rgb: 21, 24, 29;        /* all text, rules, the one filled button */
  --ink-2: #5B6168;      --ink-2-rgb: 91, 97, 104;     /* secondary text, sources, footnotes */
  --paper: #FAFAF8;      --paper-rgb: 250, 250, 248;   /* page background */
  --paper-2: #F1F1EE;    --paper-2-rgb: 241, 241, 238; /* row hover, table header band */
  --rule: rgba(21, 24, 29, .18);                        /* hairlines */
  --rule-strong: var(--ink);                            /* section and table top rules */
  --blue: #0B5CFF;       --blue-rgb: 11, 92, 255;      /* the dot, link underlines on hover, focus ring. Never text on paper. */
  --blue-ink: #0A3FB0;   --blue-ink-rgb: 10, 63, 176;  /* blue when it must be text (4.5:1 on paper) */
}
```

Roles: ink does everything. Blue is punctuation: the logo dot, the dot after the primary action, the underline on hover, the focus ring. Blue as body text only in `--blue-ink`. There is no third color. Status is written in words, never colored chips.

## 3. Typography Rules

```html
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

- Display: `"Inter Tight", "Helvetica Neue", Helvetica, Arial, sans-serif`, weight 600, letter-spacing -0.035em, line-height 0.98.
- Body: `Inter, "Helvetica Neue", Helvetica, Arial, sans-serif`, weight 400, line-height 1.5. `font-feature-settings: "tnum" 1, "ss01" 1` on figures and tables.
- The wordmark in the header is the logo image, not live text.

| Level | Size | Weight | Tracking | Use |
| --- | --- | --- | --- | --- |
| Display | clamp(44px, 7vw, 104px) | 600 | -0.035em | Hero only |
| H2 | clamp(30px, 3.6vw, 48px) | 600 | -0.03em | Section titles |
| H3 | 24px | 600 | -0.02em | Row titles, question rows |
| Lead | 20px | 400 | 0 | Hero paragraph |
| Body | 17px | 400 | 0 | Everything else |
| Small | 14px | 400/500 | 0 | Sources, footnotes, table meta |
| Number | same as its row | 500 | 0 | Section numbers "01", table figures, tabular |

Forbidden: monospace for labels, uppercase tracked eyebrows, serif display, gradient or shadowed text, weights above 600.

## 4. Component Stylings

### Buttons

Two kinds only. One filled button per screen at most.

```css
.btn { display:inline-flex; align-items:center; gap:12px; min-height:48px; padding:0 20px; border:1px solid var(--ink); border-radius:0; background:var(--paper); color:var(--ink); font:500 17px/1 Inter, sans-serif; cursor:pointer; transition:background .15s, color .15s; }
.btn:hover { background:var(--paper-2); }
.btn:active { background:var(--ink); color:var(--paper); }
.btn:focus-visible { outline:2px solid var(--blue); outline-offset:3px; }
.btn[disabled] { opacity:.4; cursor:not-allowed; }
.btn.fill { background:var(--ink); color:var(--paper); }
.btn.fill:hover { background:#000; }
.btn.fill:active { background:var(--paper); color:var(--ink); }
.btn .dot { width:10px; height:10px; border-radius:50%; background:var(--blue); }
```

### Rows (replace cards)

Content that would be a card is a row between hairlines.

```css
.rows { border-top:1px solid var(--rule-strong); }
.row { display:grid; grid-template-columns:72px 1fr; gap:24px; padding:28px 0; border-bottom:1px solid var(--rule); }
.row:hover { background:var(--paper-2); }           /* only when the whole row is a link */
.row:focus-within { outline:2px solid var(--blue); outline-offset:-2px; }
.row .n { font-weight:500; font-feature-settings:"tnum" 1; color:var(--ink-2); }
```

### Table (the desk sample)

```css
table { width:100%; border-collapse:collapse; border-top:2px solid var(--rule-strong); font-size:16px; }
th { text-align:left; font-weight:500; color:var(--ink-2); padding:12px 0; border-bottom:1px solid var(--rule); font-size:14px; }
td { padding:14px 0; border-bottom:1px solid var(--rule); vertical-align:top; }
td.num { font-feature-settings:"tnum" 1; text-align:right; }
tr:hover td { background:var(--paper-2); }
```

Status is a word ("Collected", "Read", "Waiting on Pat") with a 6px dot before it: ink dot for done, blue dot for the step waiting on a person.

### Navigation

A single hairline under the header. Logo left (image), links right as plain text; the last link is the action with the blue dot. No filled button in the nav.

```css
header { position:sticky; top:0; background:rgba(var(--paper-rgb), .92); border-bottom:1px solid var(--rule); }
nav a { color:var(--ink); padding:8px 0; border-bottom:1px solid transparent; }
nav a:hover, nav a:focus-visible { border-bottom-color:var(--blue); outline:none; }
nav a:active { color:var(--ink-2); }
```

### Links

Body links: ink, underlined 1px with `text-underline-offset: 3px`; hover: underline color blue; focus-visible: 2px blue outline; active: `--ink-2`; visited: same as default.

### Tags / Badges

None. The word "Sample" is set in body text in the table caption, not a chip.

## 5. Layout Principles

- Container: max 1200px, 24px side gutter (16px under 600px).
- Grid: 12 columns, 24px gap. Hero title spans 1–9; hero aside spans 10–12 and sits on the title's baseline. Section number and title span 1–3; content spans 4–12. Asymmetry is the point.
- Vertical rhythm: 8px base. Section padding 112px (64px on phones). Row padding 28px. Rules carry the rhythm; there is no boxed spacing.
- Alignment: everything left. Nothing centered except the footer's single line on phones.
- Negative space: generous; the hero has a full empty column before the aside.

## 6. Depth & Elevation

None. Zero box-shadow, zero blur, zero gradient. Depth is expressed by rules (hairline vs. 2px) and by the paper-2 band. The sample table is flat on the page, not in a window.

## 7. Animation & Interaction

Tier L1. No dependencies.

### Base
`html { scroll-behavior: smooth; }` and `:focus-visible { outline: 2px solid var(--blue); outline-offset: 3px; }`.

### Entrance
Hero elements fade up once on load, 400ms, ease-out, staggered 60ms: title, lead, actions, aside, table. Nothing else animates on entry.

```css
.enter { opacity:0; transform:translateY(8px); animation:enter .4s ease-out forwards; }
.enter:nth-child(2){animation-delay:.06s} .enter:nth-child(3){animation-delay:.12s} .enter:nth-child(4){animation-delay:.18s}
@keyframes enter { to { opacity:1; transform:none; } }
```

### Scroll
No scroll-triggered effects. The sticky header is the only scroll behavior.

### Hover & Focus
Rows and table rows: paper-2 background. Links: blue underline. Buttons as above. All transitions 150ms.

### Special
One: the blue dot after "Book a free review" grows from 10px to 12px on hover (transform: scale(1.2), 150ms). That's the whole budget.

### Reduced motion
```css
@media (prefers-reduced-motion: reduce) { .enter { animation:none; opacity:1; transform:none; } * { transition:none !important; } html { scroll-behavior:auto; } }
```

## 8. Do's and Don'ts

### Do
1. Use rules, numbers and sentences to structure the page.
2. Show the product as a document or a table on the page, flat.
3. Write status as words. Cite every figure in small text under it.
4. Keep blue to punctuation: the dot, hover underlines, focus.
5. Left-align everything and let the grid be uneven.
6. Label every sample as a sample, in words.
7. Keep one filled button per screen.
8. Write like an operator: short sentences, specific nouns, no adjectives doing the work.

### Don't
1. No cards, no card grids, no rounded panels with borders.
2. No pills, chips or badges; no colored status.
3. No uppercase tracked eyebrows, no monospace labels.
4. No gradients, glows, blurs, grain or shadows, on anything.
5. No dark sections or dark cards on the light page.
6. No icons as decoration; numbers or words instead.
7. No centered hero, no three-up feature grid, no logo bar, no testimonials that don't exist.
8. No "AI", "automation" or "software company" in a headline.
9. No animation beyond the load fade and hover states.

## 9. Responsive Behavior

- Breakpoints: 600px (phone), 900px (tablet), 1200px (container max).
- Under 900px: the 12-column grid becomes one column; the hero aside moves under the title; section number sits above its title; the table keeps four columns but drops the Source column under the Document name as small text.
- Under 600px: the table hides the Time column; nav shows the logo and the action only; section padding 64px.
- Touch targets: every link row and button is at least 48px tall.
- No horizontal overflow at 360px; long addresses wrap.
