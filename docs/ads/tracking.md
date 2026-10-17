# Tracking: how a click becomes a counted lead

Verified against the code on 2026-10-05. Re-verify the line numbers before trusting them; they drift.

## The chain

1. **Ad click lands on a route** with `gclid` (Google auto-tagging) or `fbclid` (Meta) and any `utm_*` tags.
2. **`components/CaptureAttribution.tsx`** runs on every page and calls `lib/attribution.ts`:
   - `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `gclid`, `fbclid`, referrer, landing page → sessionStorage `skox:attribution` (`attribution.ts:13–14`). A newly tagged link replaces the visit's tags.
   - First touch kept 90 days in localStorage `skox:first-touch` (`:72`).
   - Visit count, pages this visit, seconds on site, and an `eventId` per visit (`leadEventId()`, `:106`).
3. **Tags load in production only** (`app/layout.tsx:111`, `:129`):
   - GA4 via `<GoogleAnalytics gaId>` from `@next/third-parties` (`layout.tsx:129–130`). **This is also what loads `gtag.js` for Google Ads.**
   - `components/AdPixels.tsx`: Meta Pixel (`:9`), Google Ads config with `allow_enhanced_conversions:true` (`:10`, `:31`), LinkedIn (`:11`). All three skip browsers sending Global Privacy Control (`:13`). Meta fires `PageView` on first load only, not on client-side page changes.
4. **Form submit** (`components/ConversionForm.tsx`) posts to `/api/contact` with the journey JSON.
5. **`app/api/contact/route.ts`**: honeypot `website` (`:44`) → validation → in-memory rate limit → Resend email to `CONTACT_EMAIL` (`:67–68`). No `RESEND_API_KEY` → 503 (`:85`); provider failure → 502 (`:110`, `:119`). On success it calls `sendMetaLead()` (`:124`), the server-side Meta Conversions API event (`lib/meta-capi.ts`), with `event_id` = the visit's eventId (`meta-capi.ts:53`), skipped when the request has `sec-gpc: 1` (`:21`) or when either `NEXT_PUBLIC_META_PIXEL_ID` or `META_CAPI_TOKEN` is unset (`:17–19`). The Apollo company lookup also runs here (`route.ts:65`). Meta's response is never checked, so a bad token or a retired Graph API version fails silently.
6. **Only after the server says `delivered: "email"`** (`ConversionForm.tsx:210`), the browser runs `identify(email)` (sets gtag `user_data` for enhanced conversions, `track.ts:51`) and `track("scope_request")` (`ConversionForm.tsx:214`), which fans out in `lib/track.ts`:
   - GA4 event renamed to `generate_lead` (`track.ts:10`).
   - Meta `fbq('track','Lead',{content_category},{eventID})` (`:33`). Same eventID as the server event, so Meta counts one lead.
   - Google Ads `conversion` with `send_to: NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL` and `transaction_id: eventID` (`:34–35`).
   - LinkedIn conversion (`:37`).
7. **Then** the browser goes to `/scope-received` (`ConversionForm.tsx:218`). Because the conversion already fired, a refresh of this page never re-counts it.

Other events that are **not** conversions: `scope_form_started` (Meta custom `LeadFormStarted`, `track.ts:41`), `email_click` / `phone_click` (Meta `Contact`, `:39`), `scope_partial_captured` (an "Unfinished enquiry" email from `/api/partial`), `scope_cta_clicked`, `scope_form_invalid`, `scope_type_chosen`, `scope_request_failed`, `scope_email_fallback`, `hero_composer_*`, `hero_scope_pinned`, `build_card_selected`, `build_preview_selected`, `app_demo_used`. Never make any of these a primary conversion.

`scope_request` is also called in `components/HeroContactForm.tsx` and `components/ScopeForm.tsx`, but no live page renders either. If one is ever re-used, re-run the tracking auditor.

Ignore the comment in `app/scope-received/page.tsx` calling it "the destination conversion". Never use the page URL as a conversion.

## Environment variables (Vercel project `skox`, Production)

Nobody has confirmed which are set. The CLI link in `.vercel/` is stale and the local token can't read the SKOX team. Josh checks: Vercel dashboard → skox → Settings → Environment Variables → Production.

| Variable | Needed for | Format | Set? |
|---|---|---|---|
| `RESEND_API_KEY` | Any lead delivery at all | `re_…` | Set 2026-09-13 per memory; **confirm** |
| `LEAD_FROM_EMAIL` | Sender | `SKOX Leads <leads@skoxsoftware.com>` | Set 2026-09-13 per memory; **confirm** |
| `CONTACT_EMAIL` | Where leads go | an inbox someone reads daily | UNKNOWN (code default `founder@skoxsoftware.com`; `.env.example` says `founders@`) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 **and** loading gtag.js for Google Ads | `G-7KNPZ9T693` | Live since 2026-10-01 per memory |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | Google Ads tag | `AW-XXXXXXXXXX` | UNKNOWN |
| `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL` | Google Ads lead conversion | full `send_to`: `AW-XXXXXXXXXX/AbCdEfGhIj` | UNKNOWN |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel + CAPI | digits | UNKNOWN |
| `META_CAPI_TOKEN` | Meta server-side Lead | long token from Events Manager | UNKNOWN |
| `APOLLO_API_KEY` | Company lookup in the lead email | | UNKNOWN (nice to have) |
| `NEXT_PUBLIC_LINKEDIN_PARTNER_ID` / `_LEAD_CONVERSION_ID` | LinkedIn | | Not needed for v1 |

`NEXT_PUBLIC_*` values are baked in at build time. **Changing one needs a redeploy** to take effect.

## Google Ads conversion setup rules

1. Create one conversion action: Goals → Conversions → New → Website → **"Set up manually using code"** (not "URL", not "from GA4"). Category: Submit lead form. Value: "Don't use a value" for v1. Count: **One**. Click-through window: 90 days. Enhanced conversions: on, via the Google tag.
2. Copy the `send_to` string (`AW-…/…`) into `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL` and the `AW-…` part into `NEXT_PUBLIC_GOOGLE_ADS_ID`.
3. **Never create a URL-based conversion on `/scope-received`.** It would double-count with the event and count refreshes.
4. If GA4 is linked to Google Ads, import `generate_lead` as **secondary** (observation only), never primary. Otherwise every lead counts twice in bidding.
5. In GA4, mark `generate_lead` as a key event. Do **not** mark `scope_partial_captured`, `scope_form_started` or `scope_cta_clicked`.

## Meta setup rules

1. Business Manager → verify the domain `skoxsoftware.com` (DNS TXT on Vercel).
2. Events Manager → the pixel → put **`Lead`** first in Aggregated Event Measurement priority.
3. Generate a Conversions API access token → `META_CAPI_TOKEN`.
4. Check deduplication in Events Manager: one `Lead` should show both "Browser" and "Server" with the same event ID.

## Test-lead procedure

Do this after the env vars are set and the site redeployed, and before any ad spends.

1. In a normal browser (no ad blocker, Global Privacy Control off), open `https://www.skoxsoftware.com/dashboards?utm_source=test&utm_medium=test&utm_campaign=tracking-check&gclid=TEST123`.
2. Open Google Tag Assistant (tagassistant.google.com) on that URL, or the Meta Pixel Helper extension.
3. Submit the form with name "TEST – ignore", a real inbox you control, and "Tracking test".
4. Check:
   - [ ] The lead email arrives at `CONTACT_EMAIL` and shows `utm_campaign=tracking-check` and `gclid=TEST123`.
   - [ ] You land on `/scope-received`.
   - [ ] GA4 → Reports → Realtime shows `generate_lead`.
   - [ ] Tag Assistant shows the Google Ads conversion firing with the right `send_to`.
   - [ ] Meta Events Manager → Test events shows the Browser `Lead`. The server event can't appear there (no test code is sent). 20–60 minutes later, Events Manager → Overview → `Lead` shows Browser and Server, deduplicated.
   - [ ] Refreshing `/scope-received` fires no new conversion (`generate_lead`, Google Ads conversion or Meta `Lead`). Page views firing again is expected.
5. Within 48 hours the Google Ads conversion action changes from "Unverified" to "Recording conversions" (or "No recent conversions", which also means the tag is seen).
6. Write the result into `audits/YYYY-MM-DD-tracking-test.md`.

## Known gaps (accepted for v1)

| Gap | Effect | When to fix |
|---|---|---|
| `eventId` is per visit, not per lead | Two leads in one visit would count as one in Google Ads and Meta | Only if it ever happens; 10-line fix in `ConversionForm` submit |
| Global Privacy Control only stops the tag loaders. `adConversion()` and `identify()` in `lib/track.ts` still push the Google Ads conversion and the lead's email into gtag, which GA4 loads for everyone | `/privacy` promises these tags don't load for GPC visitors; the code doesn't fully keep that promise | **Recommended before launch:** return early from `adConversion()` and `identify()` when `navigator.globalPrivacyControl` is true. Needs Josh's go-ahead and a deploy |
| Browser gives up after 15s; server worst case is about 18s (Apollo 4s, Resend 10s, Meta 4s) | The email can arrive while the visitor sees a failure, so the conversion is lost | If failures show up in `scope_request_failed` |
| First-touch `gclid` is stored but not printed in the lead email (`lib/visitor.ts`) | A returning visitor's original click ID is lost for offline upload | Before the qualified-lead upload in `lead-loop.md` |
| Hidden honeypot field could be browser-autofilled | A real lead silently isn't emailed | If a known enquiry ever goes missing |
| No Consent Mode / cookie banner | Fine for US-only targeting; required for EEA/UK | Before targeting outside the US |
| Meta `PageView` fires only on first load | Retargeting audiences built on specific URLs (e.g. `/dashboards`) miss in-site navigation | Before building page-specific Meta audiences |
| Rate limit is in memory and resets each deploy; no CAPTCHA | Spam could get through | If spam appears |
| No lead database; leads exist only as email | Qualification lives in the portal only if Josh imports it (`lead-loop.md`) | When volume makes the manual step painful |
| No offline conversion upload | Google optimises for form fills, not qualified leads | After ~30 qualified leads exist to upload |

## Deploying a tracking change

Not `git push`. Commit, then deploy a `git archive HEAD` copy with `.vercel/` copied in, via `npx vercel deploy --prod`. The working folder has uncommitted mockups (`app/concepts/`) that must never ship. Josh must ask for the deploy explicitly.

## Scorecard downloads (added 2026-10-05)

`/scorecard` is the lead-magnet page. Its form posts to `/api/scorecard`, which emails the visitor the download link first and then emails the founders. Only after the visitor's email is accepted (`delivered: true`) does the browser fire `scorecard_download` and go to `/scorecard/thanks`.

| Platform | What fires | Notes |
|---|---|---|
| GA4 | `scorecard_download` with `locations` | Mark as a key event if Meta prospecting runs on it |
| Meta | `CompleteRegistration` (`content_name: scorecard`), browser only | Deliberately **not** `Lead`, so scope-call retargeting can still reach downloaders. No Conversions API event yet |
| Google Ads | Conversion via `NEXT_PUBLIC_GOOGLE_ADS_SCORECARD_LABEL`, off until set | Make it a **secondary** conversion. The primary stays `scope_request` |
| Portal pipeline | Nothing | Downloads are not enquiries. Import them by hand if one turns into a conversation |

Never use `/scorecard/thanks` as a URL-based conversion.
