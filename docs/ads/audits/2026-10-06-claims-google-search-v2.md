# Claims auditor — google-search-v2 — 2026-10-06

**Verdict:** FAIL (2 blockers)

Inputs: `docs/ads/campaigns/google-search-v2.md` and `docs/ads/campaigns/google-search-v2-editor/ads.csv`. The CSV carries headlines, descriptions and paths for 13 ad groups. Sitelinks, callouts and the snippet exist only in the `.md` (the Editor README says they are added in the web UI), so those were audited from the `.md`. I diffed every CSV row against its `.md` ad group: no text differs, and all 13 final URLs match.

Status: draft. The blank sign-off line in `claims.md:9` is a non-blocker, as instructed. I did **not** extend that carve-out to the separate "Needs Reiss" item for trade-page wording (blocker 1). That item is a different rule, and the campaign's own checklist item 17 treats it as a launch gate. If you want the draft carve-out to cover it too, the verdict becomes PASS WITH FIXES. That is your call.

New live homepage content ("4 builds in the pipeline right now", Lorenzen Motors as client work; `landing.ts:239-261`) is not in `claims.md`. I searched the `.md` and the CSV: **no ad line uses either.** The only near-miss is the sitelink description "Sample data, not client work", which negates client work and is T04. Nothing UNSOURCED on this account.

## Blockers

| # | Where (campaign line / file:line) | Problem | Rule or source | Fix |
|---|---|---|---|---|
| 1 | Trades campaign, the 8 trade ad groups (HVAC, Pool service, Pest control, Landscaping, Roofing, Plumbing, Garage doors, Electrical). CSV rows 2-9: Headlines 1-6 and Description 1-2 (64 lines), plus Path 2 (`dashboards`, `fleet`, `quotes`, `dispatch`, `truck-stock`). `.md` 4.1.1-4.1.8. | Every T01/T02/T03 line is trade-page wording. `claims.md:86` says "Needs Reiss: the trade-page wording itself (all eight `/for/` pages)". It is unsigned (sign-off line blank; the campaign's checklist item 17 is UNKNOWN). Each line otherwise meets its T-condition: own trade's ad group only, URL `/for/{slug}`, "we build" or tool-naming, no past-work claim. | NEEDS REISS (`claims.md:86`). Blocker until signed. | Reiss signs off the eight `/for/` page wordings, then records it in `claims.md`. After that all 64 lines are CONDITIONAL-MET with no edit needed. |
| 2 | `docs/ads/claims.md` rows C07 (FAQ cite), C10, C11, C19, C20, C25, C26, C27 | `claims.md` is stale. `landing.ts` gained the `projects`/`pipeline` block, and the line cites shifted. The wording is **intact**; only the line numbers are wrong. C07 FAQ `:312` is now `:324`. C10 `:256`/`:281` are now `:267`/`:292`. C11 `:284` is now `:295`. C19 `:260` is now `:271` (`:209` still right). C20 `:258` is now `:269`. C25 `:290` is now `:302`. C26 `:269` is now `:280`. C27 `:239-248` is now `:246-255`. | Method rule: a cited line that no longer says that is a blocker. | Update the cites. I may not edit `claims.md`. The same pass should add the pipeline strip and Lorenzen to the allowlist, or mark them Forbidden. They are currently on the live page with no ID. |

## Non-blockers

| # | Where | Problem | Suggestion |
|---|---|---|---|
| 1 | `claims.md:9` | Sign-off line blank. | Reiss initials before upload. Blocker once any campaign is marked ready. |
| 2 | **Landing mismatch.** All 8 trade groups, H12 "Work With the Two Founders", H13 "No Account Managers", D4 "...Work with the two founders", D3 context | Both lines are sourced to the "Who you deal with" row (`landing.ts:164-169`, C14). That row is rendered by `CompareSection`, which `LandingPage.tsx:154` includes and `app/for/[trade]/page.tsx` does **not**. On `/for/*` the only founders text is the trust line "The two founders who build it, on every call" (`page.tsx:103`), which is itself Needs Reiss. "No account managers" appears nowhere on `/for/*`. The claim is true on the site, just not on this page. | Drop H13 from the trade tail, or have Reiss sign the trust line and add an "account managers" restatement to the `/for/` pages. Hand to `landing-auditor`. |
| 3 | **Landing mismatch.** Structured snippet values "Customer portals", "Internal tools", "Custom web apps" on the 8 trade groups | Those services are on the homepage and service routes, not on `/for/*` (which sells one dashboard or tool each). Snippet is campaign-level, so it serves under every trade ad. | Accept (allowed claims), or attach a trade-neutral snippet to the trade groups. |
| 4 | **Landing mismatch.** Internal tools D1 "Internal tools with accounts, payments and integrations..." | `/internal-tools` own section (`topics.ts:227-233`) lists roles, workflow, imports and connections. "Payments" appears only in the web-apps build card that the route also renders (`landing.ts:14`). True on the page, but not in its own section. | Fine as is. Could swap "payments" for "imports from your spreadsheets" for closer match. |
| 5 | Roofing and Garage doors H15 / D4 "Free Scope Call, No Deposit" | The ad is correct (C04 attaches "no deposit" to the call). But `/for/roofing` and `/for/garage-doors` say the customer "pays a deposit" (`trades.ts:201,245,256`) within the page that also says "No deposit" (`landing.reassurance`). A reader could mix them up. | Keep. Flag for `landing-auditor`. The campaign already avoids mentioning the customer deposit in ad text. |
| 6 | Pest control D2 "We put them in one view." | Present-tense habitual reads like past work. T03 asks for "we build" or naming the tool. HVAC/Roofing/Electrical D2 use "We build". | Reword to "We'd build the one view" or "We build one view". |
| 7 | Plumbing D2 "A dispatch board that flags overtime early." and Garage doors D1 "...signs before the tech is back in the van." | Both are on the site (`trades.ts:217`, `:245`) and pass T03. But they are outcome timing, close to the prediction-promise the author removed from the Landscaping intro ("before a unit fails on a job"). | Optional. Make consistent with the Landscaping decision. |
| 8 | Whole-ad: Multi-location and Services/Dashboards, H "14-Day Focused Dashboard Build" + "Fixed Price, Agreed Upfront" + "A Delivery Date Before You Pay" | Together this reads close to a delivery guarantee. Mitigated: "focused" is kept, D1 carrying the condition is pinned to description position 1 so it always serves, no "two weeks", lands on `/dashboards`. | Keep the D1 pin. Do not unpin. |
| 9 | Whole-ad, trade groups: "Try a Working Example" next to a trade-named H1 | Could imply SKOX has built this for that trade. The page labels it "A concept with invented sample data, not a client's system" (`page.tsx:133-134`). | Acceptable under T04. Never add "for HVAC companies we've worked with" style lines. |
| 10 | Trade tail H8 "Connects to Your Tools" | T06 text is "Connected to the tools you already use". The site's FAQ qualifies it: "If your software has an API or an export, usually yes" (`trades.ts:60`). The ad drops "you already use". | Optional: "Connects to Tools You Use" (24). |
| 11 | Claim IDs written next to lines | No wrong IDs. Two imprecise ones: "Internal Tools, Built at Speed" / "Your Portal, Built at Speed" [C01]. `claims.md` lists route variants only for web app, dashboard, website; the internal-tools and portal variants are in `topics.ts:209-210`, `:166-167`. "Pool Service Dashboards" and "Pest Control Dashboards" shorten the T01 keyword (campaign judgement call 3). Meaning is unchanged. | Add the two route variants to C01 when `claims.md` is next edited. |

## Combination check

- **Trades (all 8):** no day promise, price, guarantee or location. "Fixed Price" + "Delivery Date Before You Pay" + "Free Scope Call" reads as the site's own offer, no stronger.
- **Multi-location and Services/Dashboards:** see non-blocker 8. Passes.
- **Services (IT / Portals / Web apps):** "Date Set at Kickoff" + "Working Review at Halfway" + "Delivery Date Before You Pay" restate three separate site lines. No guarantee implied.
- "Multi-Location" is a business-structure word, not the forbidden Location family (no geography).

## Line table

Verbatim lines are listed once. Where a line repeats, the "Where" column names every place. Abbreviations: T/ = Trades campaign, S/ = Services campaign. `H` = headline, `D` = description, `P` = display path. `lt` = `content/landing.ts`, `tr` = `content/trades.ts`, `tp` = `content/topics.ts` (what the routes render through `app/[service]/page.tsx` and `LandingPage.tsx`).

### A. Shared tail, all eight trade groups

| # | Line (verbatim) | Where | Class | Claim ID / rule | Evidence |
|---|---|---|---|---|---|
| 1 | Try a Working Example | T/{8 trades} H7 | ALLOWED | T04 | `app/for/[trade]/page.tsx:120-137` ("A working example"; labelled concept) |
| 2 | Connects to Your Tools | T/{8 trades} H8 | ALLOWED | T06 (see NB 10) | `page.tsx:144` "Connected to the tools you already use" |
| 3 | Fixed Price, Agreed Upfront | T/{8} H9; T/Multi H8; S/Dash H8; S/IT H7; S/CP H7; S/WA H7 | ALLOWED | C05 | `lt:132`; rendered on `/for/*` via `page.tsx:99-102` |
| 4 | A Delivery Date Before You Pay | T/{8} H10; T/Multi H9; S/Dash H9; S/IT H8; S/CP H8; S/WA H8 | ALLOWED | C03 | `lt:154`; each trade intro (`tr:77,105,133,161,189,217,245,273`) |
| 5 | You Own the Code | T/{8} H11; T/Multi H10; S/Dash H10; S/IT H10; S/CP H10; S/WA H10 | ALLOWED | C07 | `lt:134`; `tr:62-65` |
| 6 | Work With the Two Founders | T/{8} H12; T/Multi H11; S/Dash H11; S/IT H11; S/CP H11; S/WA H11 | CONDITIONAL-MET | C14 | `lt:166`; generic alternatives, none named. Mismatch on `/for/*`: NB 2 |
| 7 | No Account Managers | T/{8} H13; T/Multi H12; S/Dash H12 | CONDITIONAL-MET | C14 ("fair restatement") | `lt:164-169`. Mismatch on `/for/*`: NB 2 |
| 8 | Get My Price & Timeline | T/{8} H14; T/Multi H13; S/Dash, IT, CP, WA H13 / H12 | ALLOWED | C11 | `lt:107`, `:295` (claims.md cites `:284`, stale) |
| 9 | Free Scope Call, No Deposit | T/{8} H15; T/Multi H14; S/all four H14 / H13 | CONDITIONAL-MET | C04 | `lt:109`. "No deposit" is attached to the scope call. NB 5 |
| 10 | A fixed price and a delivery date agreed in writing before you pay. You own the code. | T/{8} D3; T/Multi D3; S/Dash D3; S/IT D3 (= S1) | ALLOWED | C03, C07 | `lt:154,191,134` |
| 11 | Free 30-minute scope call, no deposit, no obligation. Work with the two founders. | T/{8} D4; T/Multi D4; S/Dash D4; S/IT D4 (= S2) | CONDITIONAL-MET | C04, C14 | `lt:109`, `:166` |

### B. Trade-specific lines (T01-T03), own ad group only

All are class **NEEDS REISS** (blocker 1). Each otherwise meets its T-condition. The evidence column gives the `trades.ts` source. P1 is the first display path, which is the trade's own slug.

| # | Line (verbatim) | Where | Class | Claim ID / rule | Evidence |
|---|---|---|---|---|---|
| 12 | hvac / dashboards | T/HVAC P1/P2 | NEEDS REISS | T01 | `tr:72` |
| 13 | HVAC Business Dashboards | T/HVAC H1 (pin 1) | NEEDS REISS | T01 | `tr:72` |
| 14 | Monday Starts in Five Logins | T/HVAC H2 | NEEDS REISS | T02 | `tr:83` |
| 15 | Every Crew in One View | T/HVAC H3 | NEEDS REISS | T03 | `tr:77` |
| 16 | Crew and Branch Dashboard | T/HVAC H4 | NEEDS REISS | T03 | `tr:88` |
| 17 | Onboarding Tracker for Techs | T/HVAC H5 | NEEDS REISS | T03 | `tr:89` |
| 18 | Overtime Shows Up Weeks Late | T/HVAC H6 | NEEDS REISS | T02 | `tr:84` |
| 19 | One view of every crew and tech: jobs done, hours, callbacks and onboarding. | T/HVAC D1 | NEEDS REISS | T03 | `tr:77` |
| 20 | Dispatch, time clock, payroll and the bank each hold a piece. We build the one view. | T/HVAC D2 | NEEDS REISS | T02, T03 | `tr:83` |
| 21 | pool-service / dashboards | T/Pool P1/P2 | NEEDS REISS | T01 | `tr:100` |
| 22 | Pool Service Dashboards | T/Pool H1 (pin 1) | NEEDS REISS | T01 (shortened keyword) | `tr:100` |
| 23 | Revenue and Booked Jobs | T/Pool H2 | NEEDS REISS | T03 | `tr:116` |
| 24 | Every Route Is a Guess | T/Pool H3 | NEEDS REISS | T02 | `tr:112` |
| 25 | Recurring Revenue Hides Leaks | T/Pool H4 | NEEDS REISS | T02 | `tr:111` |
| 26 | A Service-Area Map | T/Pool H5 | NEEDS REISS | T03 | `tr:117` |
| 27 | Which Channel Booked the Job | T/Pool H6 | NEEDS REISS | T03 | `tr:118` |
| 28 | Revenue against booked jobs by week, month and quarter, for every location. | T/Pool D1 | NEEDS REISS | T03 | `tr:116` |
| 29 | Routes drift and drive time eats the margin. See where the work actually is. | T/Pool D2 | NEEDS REISS | T02, T03 | `tr:112,117` |
| 30 | pest-control / dashboards | T/Pest P1/P2 | NEEDS REISS | T01 | `tr:128` |
| 31 | Pest Control Dashboards | T/Pest H1 (pin 1) | NEEDS REISS | T01 (shortened) | `tr:128` |
| 32 | Sales Against Expenses | T/Pest H2 | NEEDS REISS | T03 | `tr:133` |
| 33 | Owner's Profit Dashboard | T/Pest H3 | NEEDS REISS | T03 | `tr:144` |
| 34 | Cost Per Booked Job by Channel | T/Pest H4 | NEEDS REISS | T03 | `tr:145` |
| 35 | Every Ad Channel Says It Works | T/Pest H5 | NEEDS REISS | T02 | `tr:140` |
| 36 | Last Year Beside This Year | T/Pest H6 | NEEDS REISS | T03 | `tr:144` |
| 37 | Sales against expenses, and what each booked job really costs by marketing channel. | T/Pest D1 | NEEDS REISS | T03 | `tr:133` |
| 38 | Labor, products, fleet and marketing sit in different systems. We put them in one view. | T/Pest D2 | NEEDS REISS | T02, T03 (NB 6) | `tr:139,144` |
| 39 | landscaping / fleet | T/Landscaping P1/P2 | NEEDS REISS | T01 | `tr:156` |
| 40 | Landscaping Fleet Dashboards | T/Landscaping H1 (pin 1) | NEEDS REISS | T01 | `tr:156` |
| 41 | Engine Health Per Mower | T/Landscaping H2 | NEEDS REISS | T03 | `tr:172` |
| 42 | Alerts to the Crew Lead | T/Landscaping H3 | NEEDS REISS | T03 | `tr:172` |
| 43 | A Service Log That Nags | T/Landscaping H4 | NEEDS REISS | T03 | `tr:173` |
| 44 | Fuel Spend Per Truck and Mower | T/Landscaping H5 | NEEDS REISS | T03 | `tr:174` |
| 45 | Mower Dies, Crew Stands Still | T/Landscaping H6 | NEEDS REISS | T02 | `tr:167` |
| 46 | Fuel, battery and engine health for every truck, mower and trailer, in one dashboard. | T/Landscaping D1 | NEEDS REISS | T03 | `tr:161` (drops "before a unit fails") |
| 47 | Alerts go to the crew lead, with service reminders before each check is due. | T/Landscaping D2 | NEEDS REISS | T03 | `tr:172-173` |
| 48 | roofing / quotes | T/Roofing P1/P2 | NEEDS REISS | T01 | `tr:184` |
| 49 | Roofing Quote Software | T/Roofing H1 (pin 1) | NEEDS REISS | T01 | `tr:184` |
| 50 | Roofing Estimate Software | T/Roofing H2 | NEEDS REISS | T01 | `tr:184` |
| 51 | Good, Better, Best Quotes | T/Roofing H3 | NEEDS REISS | T03 | `tr:189` |
| 52 | Quote Builder With Your Prices | T/Roofing H4 | NEEDS REISS | T03 | `tr:200` |
| 53 | Margins Drift Job by Job | T/Roofing H5 | NEEDS REISS | T02 | `tr:196` |
| 54 | Approve and Sign From a Text | T/Roofing H6 | NEEDS REISS | T03 | `tr:201` |
| 55 | Measurements in, a good, better and best quote out, with your prices and margin floor. | T/Roofing D1 | NEEDS REISS | T03 | `tr:189,200` |
| 56 | Is every quote a spreadsheet only one person understands? We build the quote builder. | T/Roofing D2 | NEEDS REISS | T02, T03 | `tr:195,200` |
| 57 | plumbing / dispatch | T/Plumbing P1/P2 | NEEDS REISS | T01 | `tr:212` |
| 58 | Plumbing Dispatch Software | T/Plumbing H1 (pin 1) | NEEDS REISS | T01 | `tr:212` |
| 59 | Plumbing Dispatch Board | T/Plumbing H2 | NEEDS REISS | T03 | `tr:228` |
| 60 | Emergencies Jump the Line | T/Plumbing H3 | NEEDS REISS | T03 | `tr:228` |
| 61 | Drive Time Is Invisible | T/Plumbing H4 | NEEDS REISS | T02 | `tr:224` |
| 62 | Skills, Zones and Drive Time | T/Plumbing H5 | NEEDS REISS | T03 | `tr:228` |
| 63 | On-the-Way Texts to Customers | T/Plumbing H6 | NEEDS REISS | T03 | `tr:229` |
| 64 | Drag a job onto a tech and the day re-plans: emergencies first, drive time included. | T/Plumbing D1 | NEEDS REISS | T03 | `tr:217` |
| 65 | One burst pipe rewrites the whole day. A dispatch board that flags overtime early. | T/Plumbing D2 | NEEDS REISS | T02, T03 (NB 7) | `tr:223,217` |
| 66 | garage-doors / quotes | T/Garage P1/P2 | NEEDS REISS | T01 | `tr:240` |
| 67 | Garage Door Quote Approval | T/Garage H1 (pin 1) | NEEDS REISS | T01 | `tr:240` |
| 68 | Garage Door Quote Software | T/Garage H2 | NEEDS REISS | T01 (drops "approval") | `tr:240`, title `:241` |
| 69 | Customer Approval Portal | T/Garage H3 | NEEDS REISS | T03 | `tr:256` |
| 70 | Pick, Sign and Book by Text | T/Garage H4 | NEEDS REISS | T03 | `tr:256` |
| 71 | See Where Quotes Stall | T/Garage H5 | NEEDS REISS | T02, T03 | `tr:253,257` |
| 72 | A Live Quote Feed | T/Garage H6 | NEEDS REISS | T03 | `tr:257` |
| 73 | The customer gets a text, picks an option and signs before the tech is back in the van. | T/Garage D1 | NEEDS REISS | T03 (NB 7) | `tr:245` |
| 74 | Quotes go out as a PDF and a phone call. See every quote opened, chosen and signed. | T/Garage D2 | NEEDS REISS | T02, T03 | `tr:251,257` |
| 75 | electrical / truck-stock | T/Electrical P1/P2 | NEEDS REISS | T01 | `tr:268` |
| 76 | Truck Stock for Electricians | T/Electrical H1 (pin 1) | NEEDS REISS | T01 | `tr:268,269` |
| 77 | Truck Stock Software | T/Electrical H2 | NEEDS REISS | T01 | `tr:268` |
| 78 | Every Van's Parts Against Par | T/Electrical H3 | NEEDS REISS | T03 | `tr:284` |
| 79 | A Pick List That Writes Itself | T/Electrical H4 | NEEDS REISS | T03 | `tr:276,285` |
| 80 | Low-Stock Flags Per Van | T/Electrical H5 | NEEDS REISS | T03 | `tr:284` |
| 81 | Parts Matched to Invoices | T/Electrical H6 | NEEDS REISS | T03 | `tr:286` |
| 82 | Every van's parts against par, low-stock flags and tomorrow's pick list, written for you. | T/Electrical D1 | NEEDS REISS | T03 | `tr:273` |
| 83 | A tech drives back to the shop for one breaker. We build the truck stock tracker. | T/Electrical D2 | NEEDS REISS | T02, T03 | `tr:279,284` |

### C. Multi-location dashboards (Trades campaign, lands `/dashboards`) and Services/Dashboards (lands `/dashboards`)

| # | Line (verbatim) | Where | Class | Claim ID / rule | Evidence |
|---|---|---|---|---|---|
| 84 | dashboards / locations | T/Multi P1/P2 | ALLOWED | C21 | `tp:92` |
| 85 | dashboards / fixed-price | S/Dash P1/P2 | ALLOWED | C05 | `lt:132` |
| 86 | Multi-Location Dashboards | T/Multi H1 (pin 1) | ALLOWED | C21 | `lt:36`, `tp:92` |
| 87 | Every Location Side by Side | T/Multi H2 | ALLOWED | C21, C22 | `lt:33,36`; `tp:92` |
| 88 | Location & Team Performance | T/Multi H3; S/Dash H6 | ALLOWED | C21 | `lt:36` |
| 89 | 14-Day Focused Dashboard Build | T/Multi H4; S/Dash H3 | CONDITIONAL-MET | C08 | `lt:39`. Lands `/dashboards`; "focused" kept; D1 below carries the data/access condition and is pinned to description position 1; no "two weeks". NB 8 |
| 90 | Your Business in One View | T/Multi H5; S/Dash H4 | ALLOWED | C22 | `lt:45` |
| 91 | Stop Rebuilding Reports | T/Multi H6; S/Dash H5 | ALLOWED | C22 | `lt:33` |
| 92 | Data From Your Existing Tools | T/Multi H7; S/Dash H7 | ALLOWED | C21 | `lt:35` |
| 93 | Keep the Plan Either Way | T/Multi H15; S/Dash H15; S/IT H15; S/CP H14; S/WA H14 | ALLOWED | C19 | `lt:209,271` |
| 94 | 14-day focused dashboard build. Timing depends on agreed data sources and access. | T/Multi D1 (pin); S/Dash D1 (pin) | CONDITIONAL-MET | C08 with condition | `lt:39-40`, verbatim. Dashboard ad, `/dashboards`. |
| 95 | Compare every location in one clear view, with data from the tools you already use. | T/Multi D2 | ALLOWED | C22, C21 | `lt:33,35,45` |
| 96 | Custom Dashboard Development | S/Dash H1 (pin 1) | ALLOWED | C02 (route keyword is "Business dashboard development", `tp:82`) | `lt:106` |
| 97 | Dashboards, Built at Speed | S/Dash H2 | ALLOWED | C01 | `lt:42-43` |
| 98 | One clear view of your business, with connected data from your existing tools. | S/Dash D2 | ALLOWED | C22, C21 | `lt:35,45` |

### D. Services: Internal tools, Customer portals, Web apps

| # | Line (verbatim) | Where | Class | Claim ID / rule | Evidence |
|---|---|---|---|---|---|
| 99 | internal-tools / fixed-price | S/IT P1/P2 | ALLOWED | C21, C05 | `tp:203`, `lt:132` |
| 100 | portals / fixed-price | S/CP P1/P2 | ALLOWED | C21, C05 | `tp:160` |
| 101 | web-apps / fixed-price | S/WA P1/P2 | ALLOWED | C02, C05 | `lt:106,132` |
| 102 | Internal Tool Development | S/IT H1 (pin 1) | ALLOWED | C21 | `lt:13`; `tp:203` |
| 103 | Internal Tools, Built at Speed | S/IT H2 | ALLOWED | C01 (route variant is in `tp:209-210`; NB 11) | `lt:104` |
| 104 | Custom Internal Tools | S/IT H3 | ALLOWED | C21 | `lt:13` |
| 105 | Working Review at Halfway | S/IT H4; S/CP H5; S/WA H6 | ALLOWED | C17 | `lt:172,215` |
| 106 | Date Set at Kickoff | S/IT H5; S/CP H6; S/WA H5 | ALLOWED | C18 | `lt:192`; rendered by `BuildSection.tsx:119` |
| 107 | Between Expensive and Risky | S/IT H6; S/WA H4 | ALLOWED | C16 | `lt:143` |
| 108 | No Hourly Billing | S/IT H9; S/CP H9; S/WA H9 | CONDITIONAL-MET | C13 ("fair restatement") | `lt:159-161`. Generic, no firm named. `/internal-tools`, `/customer-portals`, `/web-apps` all render `CompareSection` |
| 109 | Direct Access to the Builders | S/IT H12; S/CP H12; S/WA H12 | ALLOWED | C06 | `lt:133` |
| 110 | Internal tools with accounts, payments and integrations, from idea to working software. | S/IT D1 | ALLOWED | C21 | `lt:13-14,23` (NB 4) |
| 111 | Need your tools connected, or a workflow automated? We build that in, too. | S/IT D2 | ALLOWED | C23 (supporting line, not the headline offer) | `lt:183`; rendered by `BuildSection.tsx:129` |
| 112 | Customer Portal Development | S/CP H1 (pin 1) | ALLOWED | C21 | `lt:13`; `tp:160` |
| 113 | Your Portal, Built at Speed | S/CP H2 | ALLOWED | C01 (NB 11) | `lt:104`; `tp:166-167` |
| 114 | Custom Client Portals | S/CP H3 | ALLOWED | C21 | `lt:13`; `tp:164` |
| 115 | Payments & Integrations | S/CP H4 | ALLOWED | C21 | `lt:14`; `tp:188` |
| 116 | Client portals with accounts, payments and integrations, from idea to working software. | S/CP D1 | ALLOWED | C21 | `lt:13-14,23` |
| 117 | Work directly with the two founders building it. No account managers. You own the code. | S/CP D2; S/WA D2 (S3) | CONDITIONAL-MET | C06, C14, C07 | `lt:133,166,134` |
| 118 | A fixed price and a delivery date agreed in writing, before you pay anything. | S/CP D3; S/WA D3 (S4) | ALLOWED | C03 | `lt:154,191` |
| 119 | Free 30-minute scope call, no deposit, no obligation. The plan is yours either way. | S/CP D4; S/WA D4 (S5) | CONDITIONAL-MET | C04, C19 | `lt:109,271` |
| 120 | Custom Web App Development | S/WA H1 (pin 1) | ALLOWED | C02 | `tp:43`; `lt:106` |
| 121 | Web Apps, Built at Speed | S/WA H2 | ALLOWED | C01 | `lt:20-21` |
| 122 | Portals & Internal Tools | S/WA H3 | ALLOWED | C21 | `lt:13` |
| 123 | Customer portals, internal tools, accounts, payments and integrations. | S/WA D1 | ALLOWED | C21 | `lt:13-14` |

### E. Assets

| # | Line (verbatim) | Where | Class | Claim ID / rule | Evidence |
|---|---|---|---|---|---|
| 124 | See Working Examples | Sitelink, S/ campaign and 9 trade groups | ALLOWED | T04 | `/examples` exists (`app/examples/page.tsx`) |
| 125 | Try a working example / Concepts with sample data | Sitelink descs | ALLOWED | T04 | `examples/page.tsx:11,15` |
| 126 | Free Monday Scorecard | Sitelink | ALLOWED | T05 | `app/scorecard/page.tsx:8,53`; footer `LandingPage.tsx:347` |
| 127 | Every location side by side / Revenue, jobs, labor, ad spend | Sitelink descs | ALLOWED | T05 | `scorecard/page.tsx:53-56` |
| 128 | How We Work | Sitelink, URL `/#process` | ALLOWED | C03, C17 | Anchor exists: `LandingPage.tsx:158`; `lt:195,206-217` |
| 129 | Plan and price in writing / Working review at halfway | Sitelink descs | ALLOWED | C03, C17 | `lt:208-209,215` |
| 130 | Dashboard Examples | Sitelink | ALLOWED | T04 | `app/dashboard-examples/page.tsx:13,87` |
| 131 | Four dashboards to try / Sample data, not client work | Sitelink descs | ALLOWED | T04 | `dashboard-examples/page.tsx:17,89-90` ("invented sample data") |
| 132 | Internal Tool Examples | Sitelink | ALLOWED | T04 | `internal-tool-examples/page.tsx:14,88` |
| 133 | Four tools to try / Sample data, not client work | Sitelink descs | ALLOWED | T04 | `internal-tool-examples/page.tsx:18,91` |
| 134 | Delivery date in writing | Callout | ALLOWED | C03 | `lt:154` |
| 135 | Free scope call | Callout | ALLOWED | C04 (no "no deposit" alone) | `lt:109` |
| 136 | Reply in 1 business day | Callout | ALLOWED | C10 | `lt:267,292` (claims.md cites stale lines) |
| 137 | Work with the founders | Callout | ALLOWED | C06 | `lt:220` |
| 138 | Working review halfway | Callout | ALLOWED | C17 | `lt:215` |
| 139 | Working examples to try | Callout | ALLOWED | T04 | Present on trade pages and on service routes (`BuildSection.tsx:100`) |
| 140 | Service catalog (header); Custom web apps; Customer portals; Internal tools; Custom dashboards | Structured snippet | ALLOWED | C02, C21 | `lt:106`, `:13`. NB 3 |
| 141 | SKOX | Business name | ALLOWED | brand name | n/a |

## Inputs I could not check

- Rendered pages. No web access; evidence is the code that renders each route. `CompareSection.tsx` was not opened; I relied on `landing.compareRows` (`lt:151-176`) and the import at `LandingPage.tsx:154`.
- Character limits and policy: left to `policy-auditor` and `check_lengths.py`.
- `campaigns.csv` and `keywords.csv`: keywords are not ad-facing text, so I did not read them for claims.
- Whether "Working Examples" sitelinks and the callout stay true once Google shows only some of them (cannot be tested without the account).

## Sources read

- `/Users/josh/SKOX/docs/ads/campaigns/google-search-v2.md`
- `/Users/josh/SKOX/docs/ads/campaigns/google-search-v2-editor/ads.csv`
- `/Users/josh/SKOX/docs/ads/campaigns/google-search-v2-editor/README.md` (grep only)
- `/Users/josh/SKOX/docs/ads/claims.md`
- `/Users/josh/SKOX/docs/ads/README.md`
- `/Users/josh/SKOX/content/landing.ts`
- `/Users/josh/SKOX/content/trades.ts`
- `/Users/josh/SKOX/content/topics.ts`
- `/Users/josh/SKOX/app/[service]/page.tsx`
- `/Users/josh/SKOX/app/for/[trade]/page.tsx`
- `/Users/josh/SKOX/components/LandingPage.tsx`
- `/Users/josh/SKOX/components/BuildSection.tsx` (lines 60-133)
- `/Users/josh/SKOX/app/scorecard/page.tsx`, `app/examples/page.tsx`, `app/dashboard-examples/page.tsx`, `app/internal-tool-examples/page.tsx` (grep only)

Not accepted as evidence: `content/site.ts`, `README.md`, anything in `output/`.
