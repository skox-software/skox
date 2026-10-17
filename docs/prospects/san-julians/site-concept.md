# San Julián’s private website concept

Published September 9, 2026 (America/New_York).

**Private URL:** https://san-julians-skox-concept.jfox0.chatgpt.site

Owner-only Sites deployment. Josh must sign in to view and can present it on his own device. The café has not approved the concept and cannot view it merely by receiving this owner-only link. Access has not been broadened.

## Delivered

- Actual gold leaf emblem and three sourced photographs showing the branded coffee, café interior and storefront.
- A proposed cream/charcoal/gold design with green drawn from the café interior, responsive layouts, serif headings and prominent menu/pickup actions.
- All 54 published menu listings grouped into categories; six editorial starter selections, not a verified best-seller list.
- Local demo basket with integer-cent prices, quantity controls, removal and an explicitly simulated checkout preview. No real orders, payment collection or personal-data form.
- Address, map directions, opening-hours lookup, Instagram and the existing café link collection. No guessed hours or phone number.
- Noindex metadata and explicit unofficial-concept labeling.

Full logo, image and design provenance: [BRAND-SOURCES.md](../../../..//prototypes/san-julians/BRAND-SOURCES.md). No formal public brand guide was found; the palette and typography are a proposed extension, not claimed official design tokens.

## Verification and boundaries

Production build and site TypeScript checks passed. The first local route returned HTTP 200. Sites reported the private deployment succeeded. Source and deployment archive refer to the same committed prototype state.

No browser screenshots, DOM inspection or interaction QA were performed: the Sites skill limits those checks to explicitly requested browser testing. The optional WebMCP enhancements have no supported validation context in this session and were not browser-verified. Do not represent the mock as a tested live ordering integration.

The prototype lives in its own repository under `prototypes/san-julians`. The main SKOX TypeScript and lint configurations exclude that separate project to prevent it affecting SKOX’s build. SKOX’s TypeScript check passed after this isolation change. Existing SKOX application pages were not replaced or deployed.

Menu source, image reuse, official wording, direct prices, provider configuration, availability and store contact details still need owner confirmation before a real client launch. The prospect proposal and financial scenarios are kept outside the café-facing site.
