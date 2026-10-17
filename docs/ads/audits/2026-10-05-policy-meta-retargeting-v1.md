# Policy auditor — meta-retargeting-v1 — 2026-10-05

**Verdict:** FAIL for v1 as written, because of Ad A (video-20s). **Ads B (`fixed-terms`) and C (`compare-table`) on their own: PASS WITH FIXES on content.** No line in B or C is likely to be disapproved. One fix is recommended before the B image is made (N1). The account prerequisites are all **UNKNOWN**, and they gate launch whatever the creative is (see "Account prerequisites").

Inputs: `docs/ads/campaigns/meta-retargeting-v1.md` and the three `docs/ads/creative/meta-retargeting-v1-*.md` briefs. Focus: Meta. The Google checks (editorial, Google trademarks, advertiser verification) don't apply to this campaign and weren't run.

## Can B and C launch without the video?

Yes, as far as policy goes. Nothing in B or C depends on Ad A. Neither carries a guarantee, a price, a personal-attribute line, a named brand, before/after imagery or an unconditional outcome. Both 9:16 briefs already keep text inside Meta's Reels safe zone. Before Josh clicks Publish, P1–P6 and P9 have to be confirmed. Without a Page, the pixel or a verified `Lead`, the campaign can't run or can't be measured.

## Blockers (all in Ad A)

| # | Where (campaign line / file:line) | Problem | Rule or source | Fix |
|---|---|---|---|---|
| 1 | Video 15.75s "No lock-in." (`ad.html:618`); 1.88–3.75s "A live dashboard." / "A new website."; 6.56s "LIVE." stamp on a SAMPLE dashboard; 9.38s "Anything with an API" | These are claims the landing page doesn't make. Meta prohibits deceptive or misleading claims. A "LIVE." stamp on SAMPLE data implies a delivered, running system. **Likely outcome: probably passes automated review, but it's an unsubstantiated-claim risk** if someone reports it, and the claims audit fails it anyway. | Meta Advertising Standards, Unacceptable Business Practices: https://transparency.meta.com/policies/ad-standards/fraud-scams/unacceptable-business-practices/ ; overview https://transparency.meta.com/policies/ad-standards/ | Recut spec steps 1, 3, 5 and 8 in the video creative file. Allowed wording: "No account managers. No hourly billing." (C14, C13); "Focused dashboard build." / "Focused site build." (C08, C09); "SAMPLE"; "Your other tools". |
| 2 | Video 0.94–3.75s "BUILT IN DAYS." → "14 DAYS" → "07 DAYS" with no condition on screen | It reads as an unconditional delivery promise, which is an unrealistic-outcome risk. In Stories and Reels the ad description ("Scope and access agreed first") often doesn't show, so nothing in view qualifies it. **Likely outcome: may be approved, but misleading as it plays.** | Same Meta page as #1 | Recut step 3: on screen "Data and access agreed first" / "Content and access agreed first" (C08/C09 conditions, `landing.ts:40`, `:62`) |
| 3 | `output/SKOX-ad-20s-9x16.mp4`: "14-DAY FOCUSED DASHBOARD BUILD" (y≈1380), "One number out." (y≈1440), the bottom of the written-scope card (y≈1260–1470), and the caption chip at y≈205 | The text sits under the Reels/Stories UI (top 14% = 269 px, bottom 35% = 672 px, about 6% = 65 px each side). The qualifier that makes C08/C09 honest is the part that gets covered. **Likely outcome: limited.** Ads Manager warns, delivery suffers, and a viewer sees an unqualified "14 DAYS". | Safe-zone figures from Meta-spec summaries found via search (e.g. https://www.biddyco.com/blog-posts/meta-ad-specs, https://adsuploader.com/blog/meta-ads-safe-zones). **Not verified against a live Meta page.** | Recut step 9: all key text inside y 269–1248 and x 65–1015 |

## Non-blockers

| # | Where | Problem | Suggestion |
|---|---|---|---|
| N1 | Ad B image, "Button graphic: Get my price & timeline" (ink pill with ↗), `creative/meta-retargeting-v1-fixed-terms.md:29`, `:38`. Same on the video end card (`ad.html:701`). | Meta's policy against images that portray **non-existent functionality** (fake buttons, play buttons, notification badges, checkboxes). The whole ad does click through to the page the button names, so the risk is low, but a pill-shaped "button" in a static image is exactly what reviewers flag. **Likely outcome: usually fine; occasional disapproval.** | Before making the asset: show "Get my price & timeline" as a plain text line with an amber underline, not a pill, or drop it. Meta already adds its own **Get quote** button. Wording stays C11. |
| N2 | Ad B and C 9:16 layouts (`fixed-terms.md:41`, `compare-table.md:56`) | The briefs cover the top and bottom bands but don't mention the roughly 65 px side margins of the Reels safe zone. Ad C's 9:16 puts three cells side by side in about 950 px and sets no minimum type size for 9:16. | Add "x 65–1015" and a minimum cell size (e.g. ≥ 26 px) to the 9:16 spec. If it doesn't fit, drop the "When plans change" row, as the brief already allows. |
| N3 | Ad C comparison ("Big dev shop", "Freelancer or DIY", "One person, if they reply") | Comparative copy. It names no firm and shows no logo, so there's no trademark or disparagement issue. It's word for word from the landing page, which substantiates it. **Fine.** | Keep the brief's "no ticks/crosses, no red/green" rule. |
| N4 | Personal attributes, all ads ("before you pay", "whether you hire us or not", "They quoted you QUARTERS?") | "You" language that doesn't assert any listed attribute (race, religion, age, health, financial status, and so on). **Fine.** | None. Avoid "Are you struggling with…" lines in v2. |
| N5 | Campaign §3 Ad-level: "Advantage+ creative enhancements → turn all off", including site links | If any enhancement is left on, Meta can add overlays, rewrites or site links that no auditor has seen, including text near the condition lines. | Keep U4.6 as written. Re-check after U5 duplicates Ad B, because duplicating can reset some toggles. |
| N6 | Placements: Advantage+ (campaign §3) | Descriptions don't show in every placement. B carries the day condition inside B-1's first sentence, and C has no day promise, so both are safe in every placement. **Fine for B and C.** | None. |
| N7 | Special Ad Category: None (campaign §3) | Correct. B2B custom software isn't credit, employment, housing or social issues, elections or politics. | None. |
| N8 | Destination `https://www.skoxsoftware.com/?utm_…` | Fetched today. It loads without a login. The H1, intro, "Get my price & timeline", "Free 30-minute scope call. No deposit. No obligation.", both day promises with their conditions, the comparison table and the founders section are all present, so the ads match the page. The "Client login" link in the header isn't a gate. **Fine.** Mobile rendering was **not verified** (the fetch doesn't render a phone layout). | Josh: open each UTM URL once on a phone before publishing. |
| N9 | `/privacy` | Fetched today. It's public, "Last updated 1 October 2026", and discloses the Meta, Google and LinkedIn ad tags, the hashed-email matching, and the GPC/email opt-out. A contact email is shown (also in the homepage footer). **Fine** for Meta's Business Tools terms and the destination expectations. | None. Note that GPC visitors don't load the pixel, so they never join the audience. That's expected, not a policy issue. |
| N10 | Text and editorial on Meta | No exclamation marks, no emoji, no profanity, no phone numbers, no "click here". ALL CAPS appears only in the video and in mono footnotes, which Meta allows. **Fine.** | None. |
| N11 | Trademarks | No third-party brand in any ad text, image or URL. The video chips "Your CRM" and "Spreadsheets" are generic. No keywords on Meta. **Fine.** | None. |

## Account prerequisites

| Item | Status | Note |
|---|---|---|
| Facebook Page + Instagram account connected (Identity) | **UNKNOWN** | A Page is required to run any Meta ad. Campaign §3 marks this UNKNOWN. |
| P1 Business Manager owns the ad account and pixel | **UNKNOWN** | |
| P2 Domain `skoxsoftware.com` verified | **UNKNOWN** | Meta: domain verification proves ownership and controls who can edit link previews and descriptions on ads pointing to the domain (https://developers.facebook.com/docs/sharing/domain-verification/). Not strictly needed to run an ad, but recommended before launch, and needed for some event-configuration screens. |
| P3/P4 Pixel ID and CAPI token in Vercel Production | **UNKNOWN** | Tracking, not policy. Without them the Leads objective can't optimise. |
| P5 Event priority | **UNKNOWN** | |
| P6 Test lead deduplicated | **UNKNOWN** | |
| P9 Audience large enough to deliver | **UNKNOWN** | |

None of these says the campaign file has Josh's confirmation, so each stays UNKNOWN. Launch waits on P1–P6 and P9, whatever the creative.

## Inputs I could not check

- **The live Meta page for non-existent functionality (N1).** `transparency.meta.com/.../prohibited-commercial-practices/` and `facebook.com/business/help/757209948405699` returned only headings or summaries to the fetch. The fake-button rule is confirmed only through search results summarising it (e.g. https://mediagcg.com/what-is-facebooks-nonexistent-functionality-policy-how-does-it-affect-me/). **Not verified against live policy.**
- **Reels safe-zone figures (blocker 3, N2).** Taken from third-party spec summaries. **Not verified against a live Meta page.**
- **Meta domain verification help page.** `https://www.facebook.com/business/help/286768115176155` returned only its title. I used the developers.facebook.com doc instead.
- **The finished B and C PNGs.** They don't exist yet (P8). This audit covers the briefs.
- **Mobile rendering of `/`.**

## Sources read

- `docs/ads/campaigns/meta-retargeting-v1.md`; `docs/ads/creative/meta-retargeting-v1-video-20s.md`, `-fixed-terms.md`, `-compare-table.md`
- `docs/ads/claims.md`, `docs/ads/offer.md`, `docs/ads/copy-rules.md`, `docs/ads/README.md`
- `content/landing.ts`, `components/LandingPage.tsx`, `app/privacy/page.tsx`, `output/skox-hype/ad.html:145–189`, `:612–646`
- https://transparency.meta.com/policies/ad-standards/ (fetched)
- https://transparency.meta.com/policies/ad-standards/fraud-scams/unacceptable-business-practices/ (fetched; summary level only)
- https://transparency.meta.com/policies/ad-standards/deceptive-content/prohibited-commercial-practices/ (fetched; summary level only)
- https://transparency.meta.com/policies/ad-standards/objectionable-content/privacy-violations-personal-attributes/ (fetched)
- https://www.facebook.com/business/help/286768115176155 (fetch returned title only)
- https://www.facebook.com/business/help/757209948405699 (fetch returned title only)
- https://developers.facebook.com/docs/sharing/domain-verification/ (fetched)
- https://www.skoxsoftware.com/ and https://www.skoxsoftware.com/privacy (fetched 2026-10-05)
- Web searches: Meta non-existent functionality policy; Meta Reels safe zones (results cited above)
