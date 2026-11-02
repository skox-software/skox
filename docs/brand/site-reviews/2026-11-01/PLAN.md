# gounbusy.com design review: one plan from seven skills (2026-11-01)

Seven design skills reviewed the live site (main @ 1bcbac4). Nothing was changed. PR #33 (booking, Approve demo, hero pause, accessibility) is excluded from everything below.

| Report | Focus |
|---|---|
| [design-critique.md](design-critique.md) | Usability, IA, conversion path (16 findings) |
| [frontend-design.md](frontend-design.md) | What reads generic; a revised plan and one signature move |
| [design-consultation.md](design-consultation.md) + [preview.html](design-consultation/preview.html) | Competitor landscape and a full proposed system |
| [design-guide.md](design-guide.md) | Colour, type, spacing, hierarchy (12 findings) |
| [design-shotgun.md](design-shotgun.md) + [board](design-shotgun/index.html) | Three homepage directions as clickable mockups |
| [design-elevation.md](design-elevation.md) | Token audit of app/site.css (16 fixes) |
| [design-review.md](design-review.md) | QA at 1440 and 390 (23 issues; design B−, slop B+) |

## 1. Where they agree (five or more reports)

1. **Sections are too tall.** Every homepage section is forced to full-screen height, leaving 250–600px of empty paper; the page is about 8,000px for nine short ideas. Five reports say remove `min-height:100svh`, and four say remove the dot nav and progress bar with it. *This undoes the "one statement per screen" chapters Josh approved, so it's his call.*
2. **One headline style.** Home headings are condensed and tight (letters touch in "office's busywork"); trade, review and privacy pages use a different width and size. All seven want one setting site-wide plus `text-wrap: balance` (no "Questions owners / ask.").
3. **The hero should show the work, not dots.** Frontend-design, consultation and shotgun all say the particle cloud is the most generic thing on the site and shows nothing an owner can judge. The live trade-page mockup is the site's real point of view. Proposed replacements, in order of agreement:
   - an **approval slip**: a finished sample quote ending in "Waiting on you" with the one real **Approve** button (consultation; shotgun A is close);
   - a **struck checklist**: the job's steps struck through in blue as each is done, only "Approve the quote" left (frontend-design);
   - **two clocks**: by hand 45:00 vs desk 4:12, then the month (shotgun B).
4. **Fewer devices.** Drop the work-card tilt and glow, the hero's radial glow, and the "SaaS card kit" (pills and 01/04 counters on rounded cards); use rows. Limit green to "Running daily" and "Live".
5. **Tokens.** 37 font sizes, 7 H1 sizes, 11 radii, 12 shadows, 9 pill styles, about 70 dead classes. Cut to three radii, one shadow scale, one pill with variants, three button sizes.
6. **Trade pages should match home.** Same rounded blue frame for their hero.

## 2. Bugs and honesty issues (fix regardless of direction)

| # | Issue | Source |
|---|---|---|
| 1 | Trade pages on phones hide "Sample firm, sample job" (`.mock-sample { display:none }`), so "$926 of payroll not spent" shows for two screens unlabelled. Breaks the samples rule. | review |
| 2 | The survey firm is "In testing" on the home card but "runs at a Florida survey firm today" on /surveying. One true status, one source. | critique |
| 3 | "Preview opens alert us" (Our own office card) tells prospects their link opens are tracked. Reword. | critique |
| 4 | /privacy describes the partial-save notice "beside the email field" and lists phone, office size and meeting format, which the form no longer has. | critique |
| 5 | /freight H1 runs into the desk mockup at 1440 (/surveying and /property-management within 30px). | guide |
| 6 | Picker CTA dot is white on paper (should be blue; use `btn paper`). | review |
| 7 | Hero strike is a paper line through paper letters, so it barely shows. | guide |
| 8 | Trade-page counters render "0 / $0" before they animate, and finish before a phone user scrolls to them. | critique, guide, review |
| 9 | Apollo tracker returns 400 on every page (probably recording nothing). | review |
| 10 | Phone footer links are 26px tall; /review/booked and 404 sit off the left edge with paper under the footer; step numerals sit about 7px below their text; "What we do" price rules at different heights. | review, elevation, guide |
| 11 | Trade pages say nothing about data; /medical-and-dental has no privacy line (only claim what's true today). | critique |

## 3. Positioning questions the reviews raised (Josh's call)

- **Breakaway Ops overlap.** Breakaway (Tampa) uses Bricolage Grotesque, calls its products "desks", and asks "What software do you use?". Consultation suggests Schibsted Grotesk 800 for headlines to separate the look; the pitch overlap remains.
- **Trade discovery.** A dentist or freight broker meets survey examples first and has no quick way to their trade. Critique: a "Desks" header item plus a trade row under the hero buttons.
- **Work we've done.** Five of seven cards aren't desks (point of sale, dashboards, dealership website, two apps); critique says it reads like a web agency. Josh asked for these, so keep or trim is his choice.
- **The $47,540 anchor** frames a desk as a person replaced and implies about $12k a year; "There's a minimum" is unexplained.

## 4. Recommended order

1. **PR A, now:** the bugs and honesty issues in §2. Small, no direction change.
2. **PR B, after Josh picks:** hero direction (slip, checklist or two clocks) + section heights + one headline style + fewer devices + token cleanup, built as a preview first.
3. **Decide separately:** the font change, trade discovery in the header, and the Work section's scope.
