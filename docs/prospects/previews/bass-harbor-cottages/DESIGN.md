# DESIGN.md: Bass Harbor Cottages concept

Scope: `app/concepts/bass-harbor-cottages-dd0ec6aa/`. Every token lives under `.bh` in `concept.css`. Nothing from SKOX's own design system is used, except in the concept bar and footer label.

## 1. Visual theme and atmosphere

**One line:** a coastal-Maine guidebook printed on good paper, in the spruce green they already use.

- **Keywords:** working waterfront, spruce and slate, tide, porch light, quiet.
- **Direction:** editorial. Asymmetric grid, large serif headlines, their photographs carry the colour, generous paper space between sections.
- **What it must not feel like:** a resort chain, an Airbnb clone, or a SaaS landing page.
- **Brand continuity:** their current site's dark green, sage panels and the farmhouse-in-a-wreath logo, cleaned up rather than replaced.

## 2. Colour palette and roles

```css
.bh {
  --paper: #f5f2e9;        --paper-rgb: 245, 242, 233;   /* page */
  --paper-deep: #ebe6d6;   --paper-deep-rgb: 235, 230, 214; /* bands */
  --ink: #18211c;          --ink-rgb: 24, 33, 28;        /* text */
  --ink-soft: #4b574f;     --ink-soft-rgb: 75, 87, 79;   /* secondary text, 7.0:1 on paper */
  --rule: #cfcab5;         --rule-rgb: 207, 202, 181;    /* hairlines */
  --spruce: #1f3b2d;       --spruce-rgb: 31, 59, 45;     /* brand, buttons, dark bands */
  --spruce-deep: #132619;  --spruce-deep-rgb: 19, 38, 25;
  --sage: #a9ab8b;         --sage-rgb: 169, 171, 139;    /* their sidebar colour, accents on dark */
  --sage-soft: #dcdcc8;    --sage-soft-rgb: 220, 220, 200;
  --slate: #34505e;        --slate-rgb: 52, 80, 94;      /* harbor water, links */
  --buoy: #b0482a;         --buoy-rgb: 176, 72, 42;      /* one accent: focus, slider, active chip. 5.0:1 on paper */
}
```

Roles:
- Body text is ink on paper.
- Dark bands are paper text on spruce (12:1).
- Buoy is used only for focus rings, the compare handle, the selected night and "min" marks. Never for body text.

## 3. Typography

- **Display:** Cormorant Garamond, weights 500, 600, and 500 italic. Fallbacks: Georgia, serif.
- **Text:** Libre Franklin, weights 400, 500, 600. Fallbacks: system-ui, sans-serif.
- **Loading:** both through `next/font/google` inside the route (no @import), as CSS variables `--bh-display` and `--bh-text`.
- **Banned:** Instrument Serif and Geist (SKOX's), Inter, Roboto, Arial.

| role | font | size (mobile → desktop) | line-height | tracking |
|---|---|---|---|---|
| H1 | display 500 | 44 → 84px | 0.98 | -0.01em |
| H2 | display 500 | 34 → 54px | 1.05 | -0.005em |
| H3 | display 600 | 26 → 30px | 1.1 | 0 |
| Eyebrow | text 600 caps | 12px | 1.3 | 0.16em |
| Body | text 400 | 17 → 18px | 1.55 | 0 |
| Small | text 400 | 14px | 1.45 | 0 |

The scale ratio is roughly 1.333. Mobile body text is never under 16px.

Text decoration: no gradients and no text shadows, except the hero H1 over the photograph, which gets a soft spruce scrim (a background gradient on the image, not on the text).

## 4. Component styles

Every interactive element has default, hover, active, focus-visible and disabled states.

- **Button primary:**
  - Default: spruce background, paper text, 2px radius, 48px min-height, text 600 15px, 0.02em tracking.
  - Hover: spruce-deep. Active: translateY(1px). Focus: 3px buoy outline, 2px offset.
  - Disabled: 0.5 opacity, `cursor: not-allowed`.
- **Button ghost:** transparent background, 1.5px ink border. Hover: ink background, paper text. Focus and disabled as primary.
- **Button on dark:** paper background, spruce text. Hover: sage-soft.
- **Chip (nights, guests, place):** 44px min, 1px rule border, paper background.
  - Hover: border ink. Pressed (`aria-pressed=true`): spruce background, paper text.
  - "Below minimum": dashed border, ink-soft, with a "min" mark in buoy. It stays clickable but snaps to the minimum.
  - Focus: buoy ring.
- **Fields:** 16px, 48px min-height, 1px rule border, white background, 2px radius. Focus: buoy outline. Error: buoy border plus a message (`role=alert`).
- **Links:** slate, underline offset 3px. Hover: buoy. Focus: buoy ring.
- **Place block:** no card chrome. Photo, then name (H3), line, features as a hairline list, and a rate table with dotted leaders.
- **Review:** a large display-italic quote, a hairline above, then name · place · date · source.
- **Concept bar:** ink background, paper text, sticky. This is the only SKOX chrome.

## 5. Layout

- **Container:** `min(1180px, 100% - 32px)`. Gutters are 16px on mobile and 32px from 900px up.
- **Spacing scale:** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Sections are 72px apart on mobile and 128px on desktop.
- **Grid:** 12 columns from 900px.
  - The hero photo spans full width with a copy block that overhangs the bottom-left.
  - The places alternate 7/5 and 5/7 columns.
  - The planner is 7/5: form, then a sticky "your stay" ticket.

## 6. Depth and elevation

Flat by default.
- **e1:** `0 1px 0 rgba(var(--ink-rgb), .08)`, for hairline lift.
- **e2:** `0 18px 40px -18px rgba(var(--spruce-deep-rgb), .35)`, for the stay ticket and the phone frame only.

No glassmorphism and no blur.

## 7. Animation and interaction (L2)

Durations 150–600ms, easing `cubic-bezier(.2,.7,.2,1)`. Everything sits behind `prefers-reduced-motion: no-preference`.

Signature moments:
1. **Hero H1** (text, hero): a line-by-line mask reveal on load, using `clip-path` on each line span, staggered 120ms.
2. **Section H2** (text, section): as each section enters, the H2 fades up 14px (Reveal adds `.is-in`) and its hairline draws from 0 to 100% width.
3. **Eyebrow and labels** (text, body): the eyebrow letter-spacing settles from 0.3em to 0.16em on reveal.
4. **Places photos** (element): hover or focus zooms the photo 1.03 inside its frame and slides the caption up.
5. **Nights tide ruler** (component): picking nights fills a "tide" bar under the ruler in slate, with a 300ms width transition. Picking 7 or more labels it "a full week".
6. **Background:** paper grain from an inline SVG turbulence data-URI at 4% opacity, plus a tide-line SVG contour across the hero foot and the footer. Both are static.

The before/after compare slider is the shared Compare component.

**Detail to reward attention:** the footer's quiet-hours line ("Quiet hours 9 pm to 9 am") shows a small moon or sun glyph depending on the current time in Maine (America/New_York).

**Performance:** no WebGL, no scroll-jacking, no blur filters, no pointermove listeners. Only `transform` and `opacity` animate (plus `width` on the tide bar).

## 8. Do's and don'ts

Do:
- Let their photographs carry the colour.
- Keep every claim traceable to the ledger.
- Use their own words for headlines.
- Write as "we": it's their site.
- Show "from" rates with the month.

Don't:
1. No SKOX fonts, colours or layouts outside the concept bar and footer label.
2. No three identical icon cards, no emoji icons, no gradient blobs, no purple.
3. No invented amenities, totals, availability or names. The planner never totals a stay.
4. No stock photography. Every image on the page is theirs.
5. No "Welcome to", "nestled", "escape the ordinary", "unforgettable", exclamation marks or marketing superlatives.
6. No centred-everything stacks. Keep the left-aligned editorial grid.
7. No hard-coded hex outside the `.bh` token block.
8. No motion that runs when reduced motion is requested, and no autoplaying media.
9. Don't make the planner look like live availability. Call it a request everywhere.

## 9. Responsive behaviour

- **Breakpoints:** 0–599 (phone), 600–899 (tablet), 900+ (desktop).
- **Phone:**
  - Single column, with the hero photo cropped to 4:5 and the copy below it.
  - The places stack with the photo first.
  - The planner's stay ticket follows the form instead of sticking.
  - The nights ruler scrolls horizontally with scroll-snap.
  - The concept bar wraps to two lines.
- **Touch targets:** at least 44×44 everywhere. No horizontal page overflow at 360px.
- **Images:** next/image with sizes set per layout. The hero is `priority`.
