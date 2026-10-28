# gounbusy.com SEO audit — 28 October 2026

Scope: full site audit of the six live pages (/, /surveying, /property-management, /review, /review/booked, /privacy), crawled live on 28 Oct 2026, plus a Lighthouse mobile run on the homepage. No SEO tool (Ahrefs, Semrush) is connected, so search volumes are relative signals from web search, not measured numbers. Connecting Ahrefs via /mcp would fill in real volume, difficulty and ranking data.

## Executive summary

The technical foundation is sound. Lighthouse SEO scores 100, every page has one H1, a canonical and a unique title, all images have alt text, HTTPS and HSTS are on, and robots.txt, sitemap.xml and llms.txt are in place. The site is two days old on a new domain, so it ranks for nothing yet, including its own name: a search for "gounbusy.com UnBusy" returns The Minimalists, a book and a podcast called Unbusy.

Top three priorities:
1. **Fix the hero's paint timing.** Mobile LCP is 10.8 s because the lead paragraph is held invisible until the desk animation finishes. Google reads that as a slow page. Performance scores 67.
2. **Build one page per trade.** Eight of the ten industry tiles link to the form, not to a page. Each trade page is where search traffic would land, and the two that exist are the site's best-structured content.
3. **Claim the brand name.** Search Console change of address, an Organization entity with sameAs links, and a few listings so "UnBusy" resolves to this site and not to the minimalism essay.

Overall: strong foundation, needs work on speed and on content breadth.

## Keyword opportunities

Brand rule applies: the site never calls itself "AI automation" or an agency. The owner's own question ("Can AI…?") is the allowed form, and the existing pages already use it. So the targets below are question and job phrases, not category terms.

| Keyword | Est. difficulty | Opportunity | Current ranking | Intent | Recommended content type |
|---|---|---|---|---|---|
| can AI do survey quotes / survey quote software | Easy | High | Not ranking | Commercial | Existing /surveying, retitle |
| land surveying quote automation county records | Easy | High | Not ranking | Commercial | /surveying + supporting article |
| AI maintenance request triage property management | Moderate | High | Not ranking | Commercial | Existing /property-management |
| maintenance work order automation small property manager | Moderate | High | Not ranking | Commercial | /property-management |
| automate 1099 preparation CPA firm / W-9 collection | Moderate | High | Not ranking | Commercial | New /accounting page |
| title agency order entry automation / title file processing AI | Moderate | High | Not ranking | Commercial | New /title-and-escrow page |
| certificate of insurance requests automation agency | Easy | High | Not ranking | Commercial | New /insurance-agencies page |
| law firm client intake automation small firm | Hard | Medium | Not ranking | Commercial | New /law-offices page |
| permit paperwork automation contractor | Easy | Medium | Not ranking | Commercial | New /contractors page |
| patient intake paperwork automation dental office | Hard | Medium | Not ranking | Commercial | New /medical-and-dental page |
| freight broker paperwork automation / carrier packet | Moderate | Medium | Not ranking | Commercial | New /freight page |
| HVAC dispatch paperwork / service quote automation | Hard | Medium | Not ranking | Commercial | New /hvac-and-plumbing page |
| how much does a part-time admin cost small business | Moderate | Medium | Not ranking | Informational | Guide using the cost ledger maths |
| hire an assistant vs software small business | Moderate | Medium | Not ranking | Commercial | Comparison page ("Hire vs. build") |
| where to start with AI small business | Hard | Medium | Not ranking | Informational | Guide built from the evidence file |
| what office work can AI do small business | Hard | Medium | Not ranking | Informational | Guide + checklist |
| busywork in small business statistics | Easy | Medium | Not ranking | Informational | Stats page from docs/research |
| operations review small business free | Easy | Medium | Not ranking | Transactional | Existing /review |
| custom software for small business monthly fee | Moderate | Low | Not ranking | Commercial | Homepage "What we do" |
| UnBusy / gounbusy | Easy once indexed | High | Not ranking | Navigational | Brand entity work, see action plan |

Why the trade pages win: competitors in each trade are single-vertical software vendors (Qualia and Alanna for title, Qount and Morado for 1099s, Vantric and MagicDoor for maintenance). Their pages sell a product. None of them describe a custom desk built on the firm's own rules, so "can AI do [this job] for a small [trade] firm" is open ground. General "AI automation for small business" results are crowded with agencies and templates, and the brand rules keep UnBusy out of that category anyway.

## On-page issues

| Page | Issue | Severity | Recommended fix |
|---|---|---|---|
| / | Lead paragraph is the LCP element and paints at 10.8 s on mobile | Critical | Render the H1 and lead visible on first paint. Let only the desk mockup animate. |
| / | Meta description is 216 characters; Google cuts it near 155 | Medium | e.g. "UnBusy builds the desk that does one part of your office's paperwork and stops at your decision. Start with a free operations review." (135) |
| /surveying | Title is a question with no trade word Google can match ("survey" appears but not "surveyor" or "quote") | Medium | "Can AI draft every survey quote from county records? — UnBusy" |
| /surveying, /property-management | No og:image, so shared links show no picture | Medium | Add the trade still as the openGraph image in generateMetadata |
| /surveying, /property-management | Meta descriptions are 196 and 207 characters | Low | Trim to ~155 |
| /surveying, /property-management | No link between the two trade pages, and no link back to the homepage's other trades | Medium | Add an "Other trades" row above the footer |
| /review, /privacy, /review/booked | og:title, og:description and og:url inherit the homepage (og:url points to /) | Medium | Set openGraph per page, or at least url |
| /privacy | No canonical tag | Low | Add alternates.canonical |
| 404 page | Title is the homepage title | Low | Give not-found its own title ("Page not found — UnBusy") |
| / | Eight industry tiles link to /review?industry=…, so the trades have no indexable page | High | Point each tile at its trade page as the pages ship |
| Organization JSON-LD | Email is founder@skoxsoftware.com, on the old domain | Medium | Change to a gounbusy.com address once Resend is verified |

Headings, alt text and URLs pass. Each page has one H1 and a clean H2 sequence. Every image has descriptive alt text. URLs are short and readable.

## Content gaps

- **Eight missing trade pages.** Title and escrow, accounting, insurance agencies, law offices, contractors, medical and dental, freight, HVAC and plumbing. Each gets the /surveying template: the owner's question as H1, one sample job, where it stops, hire vs. build. Priority high. Effort moderate each (half a day), since copy and the facts ledger are the work, not code. Start with title, accounting and insurance, where the job is narrow and search competition is vendor pages.
- **Thin trade pages.** /surveying and /property-management carry about 900 words each, mostly the sample job. A short "Questions owners ask" block per page (cost, what it connects to, what if it's wrong, who owns the data) adds depth and qualifies for FAQ markup. Priority high. Quick win per page.
- **No informational content at all.** The evidence file in docs/research already holds sourced figures that nobody else has collected in one place. A "Busywork in small firms: what the data says" page would be link-worthy and match "where to start with AI" searches. Priority medium. Moderate effort.
- **No comparison page.** "Hire vs. build" is a section on every page but not a page of its own. Owners search "assistant vs software". Priority medium. Moderate effort.
- **Decision-stage gap.** Nothing answers "what happens after the review": proposal, setup timeline, what the monthly fee covers. One "How an engagement runs" page closes that. Priority medium. Quick win.

## Technical checklist

| Check | Status | Details |
|---|---|---|
| HTTPS and HSTS | Pass | HSTS max-age two years; http redirects 308 to https |
| robots.txt | Pass | Allows all; blocks /review/booked and /concepts/; points to sitemap |
| XML sitemap | Pass | Five URLs, correct. lastmod is the build time on every URL, so it says nothing useful; fine for now |
| Canonical tags | Warning | Present on all indexable pages except /privacy |
| noindex use | Pass | Only /review/booked, correctly |
| Structured data | Warning | Organization and WebSite only. No Service, FAQPage or BreadcrumbList; Organization has no sameAs |
| Mobile viewport and layout | Pass | Lighthouse accessibility 97; one colour-contrast failure to find and fix |
| Largest Contentful Paint (mobile) | Fail | 10.8 s. Target under 2.5 s. Cause: hero text held invisible for the animation |
| First Contentful Paint | Warning | 3.0 s on throttled mobile |
| Cumulative Layout Shift | Pass | 0.001 |
| Total Blocking Time | Pass | 90 ms |
| Fonts | Warning | Six font files preloaded on every page; Geist, Geist Mono and Instrument Serif come from the old layout and the UnBusy pages don't use them |
| Images | Warning | surveying.jpg in the hero tiles is a raw JPEG background (not next/image); Lighthouse estimates 776 KiB deferrable and 479 KiB saved by WebP/AVIF |
| Console errors | Warning | One request returns 400 on load; worth tracing |
| Redirects from skoxsoftware.com | Warning | Apex old URLs take three hops (apex → www → gounbusy → final). Old /for/surveying lands on / instead of /surveying |
| 404 handling | Pass | Returns a real 404 |
| Brand indexation | Fail | Not indexed yet for its own name |

## Competitor comparison

No SEO tool is connected, so this is observed, not measured. The real competition differs by trade, so the two columns are the strongest vendor in each of the two live trades.

| Dimension | gounbusy.com | Qualia (title) | VerticalRent / MagicDoor (property mgmt) | Winner |
|---|---|---|---|---|
| Keyword coverage | Two trade pages | Hundreds of product and learn pages | Dozens of blog posts on AI triage | Competitors |
| Content depth | ~900 words per trade page | Deep product docs and guides | 1,500+ word guides | Competitors |
| Publishing frequency | None yet | Regular blog and releases | Regular 2026 guides | Competitors |
| Backlink signals | New domain, none | Trade press (HousingWire, Inman) | Directory listings (AlternativeTo) | Competitors |
| Technical score | SEO 100, perf 67 | Not measured | Not measured | Unknown |
| SERP features | None | Brand knowledge panel likely | Some PAA presence on triage queries | Competitors |
| Positioning | Custom desk on the firm's rules, priced against a hire | Software product | Software product | UnBusy, if the pages exist |

The opening is positioning, not authority. Every competitor sells a product the owner has to run. UnBusy is the only result that would say "we build it on your rules and run it". That only helps once a page exists for the search.

## Prioritized action plan

**Quick wins (this week)**

1. **Paint the hero text immediately.** Keep the H1 and lead at full opacity from first paint and let only the mockup run its sequence. Impact high. Effort 1 hour. No dependency.
2. **Drop the three unused fonts from app/layout.tsx** if no concept page still needs them from the root layout; otherwise load them in the concepts layout only. Impact medium. Effort 1 hour. Check concepts first, per the house rule.
3. **Serve the hero still as WebP/AVIF** (pre-convert surveying.jpg and maintenance.jpg, or route them through next/image). Impact medium. Effort 1 hour.
4. **Fix the metadata set:** trim the three long descriptions, retitle /surveying, add og:image to trade pages, per-page openGraph on /review and /privacy, canonical on /privacy, a 404 title. Impact medium. Effort 1–2 hours.
5. **Redirect /for/surveying to /surveying** and send the skoxsoftware.com apex straight to gounbusy.com in one hop. Impact medium (keeps any old link equity). Effort 30 minutes.
6. **Search Console:** add the gounbusy.com property, submit the sitemap, and file the change of address from skoxsoftware.com. Impact high. Effort 30 minutes. Josh's account.
7. **Organization schema:** add sameAs (LinkedIn page and any listings) and a gounbusy.com email. Impact medium. Effort 30 minutes. Depends on the Resend domain.

**Strategic investments (this quarter)**

1. **Ship the eight trade pages**, three first (title and escrow, accounting, insurance). Each needs a sample job built from public facts only. Impact high. Effort half a day each. Depends on the facts ledger rule in the preview playbook.
2. **Add a "Questions owners ask" block with FAQPage markup** to every trade page. Impact medium. Effort 1 hour per page.
3. **Publish the evidence page** from docs/research, citing every source. It is the one asset people would link to. Impact medium-high. Effort 1 day.
4. **Earn the first links:** state surveying society and property-management association member directories, local chamber listings, and one guest piece in a trade outlet using the evidence page. Impact high over months. Effort ongoing.
5. **Re-run this audit with Ahrefs connected** once Search Console has four weeks of data, and swap the relative signals above for measured volumes. Impact medium. Effort 1 hour.

## Sources used for the competitor and keyword read

- [Qualia Clear 2.0 announcement](https://blog.qualia.com/introducing-qualia-clear-2-0-a-giant-step-toward-fully-automated-title/)
- [Alanna.ai on HousingWire](https://www.housingwire.com/company-profile/alanna-ai/)
- [Qount 1099 workflow, CPA Practice Advisor](https://www.cpapracticeadvisor.com/2025/09/25/qount-launches-ai-powered-1099-workflow-for-accounting-firms/169673/)
- [VerticalRent on AI maintenance triage](https://www.verticalrent.com/blog/how-ai-maintenance-triage-is-changing-property-management)
- [MagicDoor maintenance requests](https://magicdoor.com/features/maintenance/maintenance-requests)
- [Vantric on AlternativeTo](https://alternativeto.net/software/vantric/about)
- [Land Surveyors United on AI in surveying](https://landsurveyorsunited.com/xn/detail/6622436:ArticleEntry:2330040)
- [The Minimalists, "Unbusy"](https://www.theminimalists.com/unbusy) (brand-name competitor in search)
