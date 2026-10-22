# Policy audit — google-search-property-management — 2026-10-21

**Verdict:** PASS WITH FIXES

No line of ad text, no keyword and no destination is likely to be disapproved. The two blockers are launch gates (advertiser verification not confirmed, and the new page wording not yet signed by Reiss). The housing question is the only genuine grey area. Google's published pages do not say whether property-management software counts as a housing ad, but even if it does, the restrictions only touch targeting that this campaign does not use.

Scope: Google Search only. Meta checks were not run. Fetched with a summarising tool, so "page doesn't say X" means the summary didn't show it, not proof the page lacks it. Nothing was checked inside the Google Ads account.

## Blockers

| # | Where | Problem | Rule or source | Fix |
|---|---|---|---|---|
| B1 | Campaign file, Settings; no mention of verification anywhere | Google advertiser verification and the account business name/logo are UNKNOWN. The file doesn't say Josh confirmed either. If the account is selected, "some of your ads may be restricted" and Google may pause the whole account until it completes (up to 5 business days to update). Google Search has run since 2026-10-07, so this may already be done, but the file can't show it. | Advertiser verification, https://support.google.com/adspolicy/answer/9703665 (fetched 2026-10-21) | Josh opens Billing > Advertiser verification, confirms status is Complete, and notes it in the campaign file before enabling. |
| B2 | "Needs Reiss" section; `claims.md` T01–T03 rows | The `/for/property-management` wording (pains, builds, intro in `content/trades.ts` lines 307–334) isn't signed off. Policy-wise the ad lines are fine; under `claims.md` rules lines that depend on unsigned wording aren't approved. | `claims.md` "Needs Reiss" (last paragraph) | Reiss signs the wording, as he did for the eight existing trade pages. |

## Housing question (the one that needs a decision)

**Short answer: low risk, not a blocker. Google does not say either way for software, and nothing in this campaign's targeting is restricted under the housing policy.**

What the live policy says:
- Google's FAQ lists housing as "Promotion of housing for sale or rental" and says it "includes apartments, mobile homes, and houseboats." It also covers "Businesses and services whose purpose is to enable sale or rental of homes." The FAQ's list of items that "may not have targeting restricted" includes "Property management services." Source: https://support.google.com/adspolicy/answer/9997418 (fetched 2026-10-21).
- The FAQ doesn't mention property management software or B2B tools. Whether this ad group counts as housing is therefore **not verified against live policy**. For a definitive answer Google points to Ads Support.
- The original policy notice (https://support.google.com/adspolicy/answer/9917652, fetched) names "housing listing sites, individual houses for sale or rental, real estate services" and applies in the US and Canada only. That is the reason the rules would apply to a US campaign if we were classed as housing.
- The Personalized advertising page (https://support.google.com/adspolicy/answer/143465, fetched) puts Housing under "Access to opportunities categories (US and Canada only)", not under sensitive interest categories. For that group: predefined Google audiences are allowed; targeting by gender, age, parental status or marital status isn't; ZIP code targeting isn't; city, state, country and radius targeting are.

Where this campaign could be pulled in: H6 "Online Rental Applications", the keyword "online rental application software" and the page's third build ("Online rental applications") are the closest to "enable rental of homes". The rest (maintenance desk, owner portal, work orders) is clearly back-office software.

What would be restricted if Google did classify it as housing, against what this campaign does:

| Restricted under housing | This campaign | Result |
|---|---|---|
| Gender / age / parental status / marital status targeting or bid adjustments | None set. Campaign file lists United States, Presence, English and no audience segments | No conflict, provided no demographic exclusion exists (see check below) |
| ZIP code targeting | None. Country level only | No conflict |
| Customer-curated audiences | None | No conflict |

Action for Josh (2 minutes, before enabling): in the campaign's Audiences > Demographics view, confirm Age, Gender and Parental status are all enabled (nothing excluded). A new Search campaign defaults to this, but the file says "Same as Trades", so I couldn't confirm. Do not add ZIP, age or gender targeting later. If Google ever shows a "Housing" or limited-targeting label on the ad group, no copy change is needed.

Local Services Ads and the Local services verification program are a different product (Google-guaranteed home-service listings). This campaign is a plain Search campaign, so they don't apply. I did not fetch those pages.

## Check 1: misrepresentation and unreliable claims

Policy: https://support.google.com/adspolicy/answer/6020955 (fetched 2026-10-21). Categories fetched: unclear relevance, unavailable offers, dishonest pricing, business information, unreliable claims. The page says nothing specific about "starting at" prices or "you own the code".

| Line | Finding | Outcome | Compliant alternative |
|---|---|---|---|
| H9 "Focused Builds From $5,000" and D2 "Focused builds start at $5,000." | T11, allowed on `/for/` pages and their ads. The page repeats "Focused builds start at $5,000", says price is agreed in writing before payment, and lists hosting, third-party services and support separately. That meets the "disclose the payment model and full expense" test. It is a floor, not an outcome. `copy-rules.md` line "never a price" and `offer.md` "Not a price" are stale against `claims.md` T11 (see N1). | Fine | none needed |
| H10 "Fixed Price, Agreed Upfront" | C05. | Fine | none needed |
| H11 "You Own the Code" | C07. | Fine | none needed |
| H12 "Free 30-Minute Scope Call" and D2 "...no deposit for the call." | C04, scoped to the call. | Fine | none needed |
| H4 "Maintenance Request Desk", H6 "Online Rental Applications" | Read like a ready-made product. The page H1 says "Custom property management software" and the example is labelled "Concept · sample data. ... not a client's system." This is the same low risk logged as N1 on the 2026-10-06 audit. H1 omits "Custom" but H3 has it. | Fine, low risk of an "unavailable offer" flag | If limited: "Custom Maintenance Request Desk" is 31 characters, too long. Use "We Build Request Desks" (22), which matches T03 "we build". |
| H14 "Connects to Your Tools" | Shortens T06 "Connected to the tools you already use". T07 adds "when it allows a connection, or replaces it". The headline drops that condition. The page's own FAQ carries it, so the page doesn't contradict the ad. | Fine, low risk | "Connected to Your Tools" (23), exact T06 wording |
| D3 "Repairs over an owner's limit wait for their OK. Try the working example on our site." | Matches the build text and the labelled example. Present-tense phrasing could read as a live product feature. The second sentence points to the labelled concept. | Fine | "We build it so repairs over an owner's limit wait for approval. Try the working example." (87) would be safer. Check length before use. |
| H7 "Repair Requests by Text?", H8 "Owners Calling for Updates?" | Pains from `trades.ts` lines 321–322, and not claims about SKOX or viewer attributes. | Fine | none needed |
| Landing page calculator ("$320 a month for 5 years", total $19,200 vs owning from $5,000) | Labelled "Example numbers", names no vendor. Not in the ad text. | Fine | none needed |

No guarantees, "risk-free", superlatives, testimonials, locations, AI-as-method or named platforms appear in the copy. Agrees with the file's own statement and the `claims.md` forbidden list.

## Check 2: editorial

Policy: https://support.google.com/adspolicy/answer/6021546 (fetched 2026-10-21). The page covers punctuation and symbols "not used correctly or for their intended purpose", capitalisation, phone numbers in ad text, repetition (including "across other assets in the same ad group, campaign, or account") and unclear text. **It does not address question marks, exclamation marks, numbers, dollar amounts or prices.** Those fall under the general "intended use" rule.

| Check | Finding | Outcome |
|---|---|---|
| "?" in H7 and H8 | One question mark each, used as a question. Not repeated or gimmicky. Policy page is silent on question marks. | Fine |
| "$5,000" in H9 and D2 | Standard currency format. Policy page is silent on dollar amounts. | Fine |
| ALL CAPS | "OK" in D3. A two-letter standard word; low risk, but it is the only all-caps token. | Fine, see N2 |
| Exclamation marks, emoji | None | Fine |
| "Mgmt" in H3 | Common abbreviation, not gimmicky. H1/H2 carry the full words. | Fine |
| Phone number in text | None in headlines or descriptions. The call asset (904) 792-0720 is an asset, not ad text. | Fine |
| "click here", generic text | None | Fine |
| Repetition | "Property Management" appears in H1 and keywords; "Free 30-minute scope call" in H12 and D2; "$5,000" in H9 and D2; "owner" in H5, H8, D1, D3. This is the normal RSA pattern and each phrase carries a different point. It could lower ad strength. | Fine |
| Character counts | I recounted H1 (28), H3 (26), H5 (30, at the limit), H9 (26), H10 (27), H12 (25) and D2 (83); all match the file. Display path "property-mgmt" (13) and "software" (8) are within 15 each. | Fine |

## Check 3: trademarks

Policy: https://support.google.com/adspolicy/answer/6118 (fetched 2026-10-21). The page restricts a trademark appearing in the ad itself when used by a direct competitor, or in a confusing or misleading way. It says Google Ads "will not restrict using trademarks as keywords." **It doesn't mention negative keywords**, so I can't cite the policy for them. The use is harmless in practice: a negative keyword never appears in an ad and cannot trigger an ad.

| Where | Finding | Outcome |
|---|---|---|
| Ad text, display path, callouts | No third-party brand. Platform names appear only as negatives, as the file says. | Fine |
| Positive keywords (11) | No brand names. | Fine |
| Ad-group negatives: appfolio, buildium, yardi, rent manager, doorloop, propertyware, rentec, tenantcloud, turbotenant, rentredi, entrata, realpage, rentvine, hemlane, innago, avail | Brands used only as negatives, which is the allowed use. Confirmed fine to keep. | Fine |
| Landing page | The page's "connects" line says "Property management and accounting software" with no brand. | Fine |

## Check 4: destination

Policy: https://support.google.com/adspolicy/answer/6368661 (fetched 2026-10-21). Covers working page across browsers and devices, display-URL domain match, crawlability by AdsBot, site functionality and original content.

| URL | Loads | Matches the ad's promise |
|---|---|---|
| https://www.skoxsoftware.com/for/property-management | Yes (fetched 2026-10-21), no login wall | Yes. H1 "Custom property management software. Built at speed." Maintenance request desk, owner portal and online rental applications are all on the page. "Focused builds start at $5,000." is on the page. Example labelled "Concept · sample data." Free scope call and fixed-price wording present. |

- Display URL domain: path `/property-mgmt/software` sits under `skoxsoftware.com`, same as the final URL. No mismatch.
- Crawlability: https://www.skoxsoftware.com/robots.txt disallows only `/scope-received` and `/concepts/`. The destination is not blocked.
- Final URL suffix with `{keyword}` and `{campaignid}`: a tracking suffix, not shown in the display URL. Not a policy issue.
- Not verified: mobile rendering on a real phone and page speed (the fetch tool can't render pages).

## Check 7: account prerequisites

| Item | Status |
|---|---|
| Google advertiser verification | UNKNOWN (B1) |
| Business name "SKOX" and logo approved | UNKNOWN |
| Demographics not excluded (housing safeguard) | UNKNOWN, Josh to check |
| Search Partners off, Display off, AI Max off, automatically created assets off, auto-apply recommendations off | UNKNOWN. These are settings Josh clicks; the file states them but doesn't say they were verified. |
| Call asset (904) 792-0720 verified | UNKNOWN. Phone number now appears on the page, which matches the asset. |
| Meta domain verification / Business Manager | Out of scope |

## Check 8: landing page policy signals

- https://www.skoxsoftware.com/privacy loads (last updated 5 October 2026). It says "We advertise on Meta (Facebook and Instagram), Google and LinkedIn, and use their tags on this site." It links from the page footer.
- Business contact info is visible: SKOX, "an independent software studio", founder@skoxsoftware.com and (904) 792-0720. No postal address. That isn't a Google Search failure, but advertiser verification may ask for one.
- Minor: the privacy policy sentence "we tell Meta and Google that an enquiry happened" names two platforms, while the intro names three. Consistent with the site's tags, so not a policy problem.

## Non-blockers

| # | Where | Problem | Suggestion |
|---|---|---|---|
| N1 | `copy-rules.md` ("Never a price") and `offer.md` ("Not a price") | Both contradict `claims.md` T11, which allows "Focused builds start at $5,000." on `/for/` pages. The auditor and the next ad builder may flag a correct ad. | Update both files to say the price is allowed on `/for/` pages and their ads only. |
| N2 | D3 "OK" | The only all-caps token. Google doesn't list "OK" as an issue, but it's the sole thing a reviewer could call capitalisation. | Use "approval" (see check 1 alternative). |
| N3 | Ad-group negative "apartments" | It blocks queries containing exactly "apartments". Property managers searching "apartments management software" would be lost; "apartment management software" passes since negatives don't match plural variants. | Watch the search terms report at day 3. Remove it if relevant terms are blocked. |
| N4 | H4, H6, H3 product-style wording | Same as the 2026-10-06 audit N1. | If a limited status appears, use the "We build ..." alternative above. |
| N5 | Keyword "online rental application software" and H6 | The closest copy to a housing classification (see housing section). | Keep. If a housing label appears, targeting is already compliant. |

## Inputs I could not check

- Whether Josh completed advertiser verification, or whether demographics are unrestricted in the account.
- Whether Google classes B2B property-management software as housing (no published statement found).
- Mobile rendering and speed of the landing page.
- Local services policy pages (not fetched, judged not applicable to a Search campaign).
- Meta policy (out of scope).

## Sources read

- Files: `/Users/josh/SKOX/docs/ads/campaigns/google-search-property-management.md`, `/Users/josh/SKOX/docs/ads/claims.md`, `/Users/josh/SKOX/docs/ads/offer.md`, `/Users/josh/SKOX/docs/ads/copy-rules.md`, `/Users/josh/SKOX/docs/ads/README.md`, `/Users/josh/SKOX/docs/ads/audits/2026-10-06-policy-google-search-v2.md`, `/Users/josh/SKOX/content/trades.ts` (lines 300–340)
- Policy URLs fetched 2026-10-21: https://support.google.com/adspolicy/answer/6021546, /6020955, /6118, /6368661, /9703665, /143465, /9997418, /9917652
- Site URLs fetched 2026-10-21: https://www.skoxsoftware.com/for/property-management, /privacy, /robots.txt
- One web search for the housing policy background (results pointed to the Google pages above)
