# SKOX

Next.js 16, React 19, TypeScript and Tailwind v4. Existing Vercel deployment; canonical domain: https://skoxsoftware.com.

## Develop and verify

```sh
npm install
npm run dev      # http://localhost:3100 (or PORT)
npm run lint
npm test         # contact delivery regression tests; no real emails
npm run build
```

All three verification commands must pass before merging. CI runs lint, tests and build. Next.js may generate AGENTS.md and CLAUDE.md during development; follow the linked local framework documentation.

## Landing page

| File | Purpose |
| --- | --- |
| `content/landing.ts` | Primary marketing copy, build offers, founders and visible FAQ. |
| `content/site.ts` | Shared brand, domain, contact address and optional booking URL. Also retains legacy page copy. |
| `components/LandingPage.tsx` | Shared page structure for home and each service. |
| `components/BuildPreview.tsx` | Interactive website, app and dashboard concepts. Demo content is illustrative. |
| `components/ConversionForm.tsx` | Accessible enquiry form, failure fallback and successful-delivery navigation. |
| `components/LandingTracking.tsx` | CTA-click measurement without form contents. |
| `app/landing.css` | Responsive landing-page design and scoped brand colors. |
| `app/[service]/page.tsx` | Static `/websites`, `/web-apps` and `/dashboards` entry pages with relevant metadata and defaults. |
| `app/api/contact/route.ts` | Validation, rate limit, honeypot and Resend delivery. |
| `lib/attribution.ts` | Session attribution: UTMs, gclid/fbclid, referrer and entry path. |
| `docs/conversion-strategy.md` | Site audit, cited market research, positioning and paid-acquisition plan. |

The original page components remain available for reference but are not rendered by the new homepage. The existing CSS base reset stays in `@layer base`; moving it outside the layer overrides Tailwind utility spacing.

## Claims and proof

- AI may be described as a customer-facing capability, never as the private method of building the work.
- Never invent testimonials, results, logos, dates, scarcity or product links.
- The 7-day website and 14-day dashboard offers apply to focused scopes with content and access ready at kickoff. Confirm calendar/business-day terminology before advertising.
- The interactive previews are concepts with sample data. Tender and FocusTap are described as SKOX's own products based on existing company copy, not client case studies.
- No new pricing was invented. Confirm a commercially useful minimum before setting ad budgets.

## Lead delivery and measurement

See `.env.example`.

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Required for email delivery. |
| `CONTACT_EMAIL` | Receiving inbox; defaults to `founder@skoxsoftware.com`. |
| `LEAD_FROM_EMAIL` | Sender on a domain verified in Resend; configure for production. |
| `NEXT_PUBLIC_BOOKING_URL` | HTTPS scheduling page owned by `founder@skoxsoftware.com`. Enables the post-submit booking step. |

Without a mail provider the API returns 503, logs the enquiry for recovery and the form displays an email fallback. Provider failures/timeouts return 502. No success conversion is fired on these failures. Provider acceptance is distinct from verified inbox arrival: production email must be tested separately with authorization.

Vercel events: `scope_cta_clicked`, `scope_form_started`, `scope_form_invalid`, `scope_request`, `scope_request_failed`, `scope_email_fallback`, `booking_started`, `build_preview_selected`, `app_demo_used`. Successful form delivery navigates to `/scope-received`, where `booking_started` records the handoff to the scheduling provider. These events do not automatically configure Google Ads or Meta. Avoid treating direct visits to the confirmation URL as verified new leads. Record downstream qualification, booked calls, attended calls and won business separately.

Set `NEXT_PUBLIC_BOOKING_URL` only after the public booking page has been tested against the `founder@skoxsoftware.com` calendar. Without it, the confirmation page honestly falls back to a one-business-day reply instead of exposing a broken booking action.

## Release

Use the existing branch → pull request → Vercel preview → main deployment workflow. Review mobile and desktop, confirm production mail delivery and commercial claims, and configure the selected ad conversion before spending. Do not infer a conversion improvement from a local functional test.
