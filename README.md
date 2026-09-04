# SKOX

Marketing site for SKOX. Live at **https://skox.vercel.app**

Next.js 16 · React 19 · Tailwind v4 · TypeScript · deployed on Vercel.

---

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000. No database, no API keys needed to develop — the
contact form falls back to logging leads to the terminal.

```bash
npm run build     # production build + typecheck
npm run lint      # eslint
```

Both must pass before a PR merges.

---

## Where things are

| Path | What it is |
|---|---|
| `content/site.ts` | **Every word on the site.** Headlines, capabilities, engagements, FAQ, refusals. Change copy here, not in components. |
| `app/globals.css` | Design tokens (colour, type, easing), the animation keyframes, and the `chamfer` clip-path. |
| `components/HeroCard.tsx` | The hero's tabbed demo — web app + Command Center. |
| `components/WebAppPanel.tsx` | The per-client restyling demo. Add a client by appending to `BRANDS`. |
| `components/FrontDeskPanel.tsx` | The AI front-desk chat demo. |
| `lib/frontdesk.ts` | The front desk's **scripted** replies. Add an intent to `INTENTS`. |
| `lib/leak.ts` | Cost-of-inaction calculator math. |
| `app/api/contact/route.ts` | Scoping-form handler. |
| `components/SkoxLogo.tsx` | The wordmark, as inline SVG. |

### Conventions worth knowing

- **Server components by default.** Only the interactive pieces carry `"use client"`.
- **The reset lives in `@layer base`.** Do not move `* { padding: 0 }` out of that
  layer — unlayered rules outrank Tailwind's utilities and it silently kills every
  padding class on the site.
- **Colours come from tokens**, not hex literals. `--color-amber-dim` deliberately
  flips between light and dark because several call sites are inline styles that
  can't take a `dark:` variant.
- **Scrollable flex children need `min-h-0`**, or they grow instead of scrolling.

---

## Two rules for anything customer-facing

1. **AI is the product, never the method.** "AI phone agents that answer your
   after-hours calls" — good. "AI makes us fast" — never. Speed is claimed as a
   committed date; how the work gets built stays private.
2. **No invented proof.** No fabricated testimonials, logos, metrics or case
   studies. `components/Proof.tsx` ships an empty testimonial slot that starts
   rendering the moment real quotes are added to `quotes`.

---

## How changes ship

Branch → pull request → Vercel builds a preview URL on the PR → merge to `main`
deploys production.

```bash
git checkout -b your-change
# ...
git push -u origin your-change
gh pr create
```

Open the preview link on a phone before merging. The site is mobile-first in
practice — most people reach it from a DM.

---

## Open items

- [ ] **`RESEND_API_KEY` is not set**, so form leads only reach the Vercel logs
      (search `[SKOX LEAD]`) instead of an inbox. Set it in the Vercel project to
      start receiving email.
- [ ] **The refund percentage is a placeholder.** `riskReversal.refundPercent` in
      `content/site.ts` is `25` and marked `NEEDS_CONFIRMATION` — it is publicly
      live and promises money back on a missed date.
- [ ] **No testimonials yet.** Two real client quotes will move this page more
      than any further design work.
- [ ] The wordmark is a **vector reconstruction** of a supplied raster (0.225%
      geometry error), not the original artwork.

## Environment variables

See `.env.example`. None are required for local development.

| Var | Purpose |
|---|---|
| `CONTACT_EMAIL` | Where scoping-form leads are delivered. |
| `RESEND_API_KEY` | Mail provider. Without it, leads are logged, not emailed. |
| `LEAD_FROM_EMAIL` | Sender address; must be a domain verified in Resend. |
