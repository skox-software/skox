# HVAC offer: "Book Now that actually books"

For direct outreach to Central Florida HVAC companies (roughly 10–40 people). Built from a live search run on 2026-10-14 (see "What the search showed"). Follows `docs/ads/claims.md`: no refund promise, no invented proof, no past-work claims, and no software names in copy.

## The problem, in their words

A homeowner's AC dies at 4pm. They ask Google or ChatGPT who can come today. The answer lists a few companies and then says, in effect, "call them to check availability and pricing." Every HVAC site we checked has a "Book Now" button that is really a form, followed by a callback. The homeowner fills out three forms, and whoever calls back first wins the job.

The companies that get named first are the ones with specific facts online: an arrival promise, a diagnostic fee, a license number, a review count. One company showed up with **zero reviews** because its listing promised a 90-minute arrival.

## The research: how many people now use AI to find services

Verified at the source on 2026-10-14. Use only these numbers, worded exactly this strongly. Re-check before printing them on anything.

| Stat | Source | Notes |
|---|---|---|
| **45%** of US consumers say they use ChatGPT and other AI tools for local business recommendations, **up from 6%** the year before. | BrightLocal, *Local Consumer Review Survey 2026* (published Feb 11, 2026; 1,002 US adults) | AI is now the **3rd most-used source** for local recommendations, behind Facebook and Google. |
| **40%** trust AI platforms to recommend businesses (32% don't). **42%** trust AI recommendations as much as traditional reviews. | Same BrightLocal survey | |
| **82%** read AI-written review summaries, and **23%** would decide on the summary alone. | Same BrightLocal survey | The summary is written from their reviews. Few reviews means a thin summary. |
| **29%** of homeowners use AI tools like ChatGPT to research or find recommendations for local services. | Scorpion, *2026 State of Pest Control Marketing Report* | Homeowners specifically. It's a pest-control report, so say "homeowners" and not "HVAC customers." |
| ChatGPT has **more than 900 million weekly users** (OpenAI, Feb 2026). | CNET/Yahoo Finance, Feb 27, 2026, reporting OpenAI's figure | "1 billion" is widely reported but not confirmed by OpenAI. Don't use it. |

**Don't use:**
- "22% of homeowners ask ChatGPT *before* Google." It's secondhand, and the "before Google" part is a blogger's reading, not the report's.
- Any Claude user count. There's no verified public figure.
- "AI will send you customers." The surveys measure usage, not results for any one business.

**The honest reading for an owner:** somewhere between 3 in 10 and nearly half of your customers now ask an AI tool for a recommendation at least some of the time. The AI answers from your listings, your reviews and the facts on your site, and it can't book anyone.

### Paste-ready block (for the report or the follow-up)
> **How your customers find you is changing.**
> - 45% of US consumers now use ChatGPT and other AI tools for local recommendations, up from 6% a year ago. *(BrightLocal, Local Consumer Review Survey 2026)*
> - 29% of homeowners use AI tools like ChatGPT to find local service recommendations. *(Scorpion, 2026 State of Pest Control Marketing Report)*
> - 82% read AI-written review summaries, and 23% would decide on the summary alone. *(BrightLocal 2026)*
>
> When we asked an AI for "emergency AC repair in {city}, book online same day," it named a handful of companies, then said it couldn't confirm their availability or prices and told the person to call around.

Sources:
- https://www.brightlocal.com/research/local-consumer-review-survey/
- https://www.scorpion.co/pest-control/insights/blog/verticals/pest-control/homeowners-arent-just-googling-anymore-is-your-p/
- https://finance.yahoo.com/news/chatgpt-almost-1-billion-weekly-212157499.html

## The offer

**One sentence:** Your "Book Now" button actually books: real open time windows, the diagnostic fee shown up front, and a confirmed appointment without a phone call. Plus the pages and reviews that get you named in the first place. Fixed price and delivery date in writing before you pay.

### Three parts (sell the middle one)

| | 1. Get Named | 2. Book Now *(core)* | 3. Know Your Numbers |
|---|---|---|---|
| What they get | One page per service and city, built on specific facts (arrival window, diagnostic fee, license, warranty). Their Google, Bing and Apple listings filled in completely. A review request sent by text after every finished job. | A booking page with live time windows, pulled from their dispatch software when it allows a connection. The diagnostic fee shown before they book. Instant confirmation by text and email. Simple enough for a person on a phone, or an AI assistant, to finish in under a minute. | An owner dashboard showing web leads this week, time to first call, quotes that never closed, and maintenance members due for a tune-up. Optional: ask ChatGPT or Claude these questions directly, using the subscription they already pay for. |
| Build type | Website (separate pricing, never quoted on trade pages) | Focused build, **starts at $5,000** (claim T11) | Dashboard (focused build, 14-day; claim C08 conditions apply) |
| Ongoing | Care plan (optional) | Care plan (optional): hosting, keeping the connection to their software working | Care plan (optional) |

**Bundle:** all three as one scoped project with one fixed price and one delivery date. Josh sets the bundle price after the first scope call. Don't quote one in a cold message.

### Booking inside ChatGPT (the add-on to Book Now)
One booking engine with two ways in: build the availability, price and booking logic once, then put both a web page and a ChatGPT app on top of it.
- **The ChatGPT app** is an MCP server built with OpenAI's Apps SDK, with a small in-chat time picker. It has four narrow tools: `check_service_area(zip)`, `get_open_windows(service, zip)`, `get_diagnostic_fee(service)` and `book_window(name, phone, address, window)`. ChatGPT asks the user to confirm before the booking tool runs. Submit it to the ChatGPT app directory (open since Dec 2025: production MCP endpoint, domain verification, review).
- **Be honest about reach:** people find a single company's app by searching its name or by having connected it before. Don't promise that ChatGPT will offer it to strangers. The strongest use is **maintenance members rebooking tune-ups** inside ChatGPT.
- **What works today without approval:** ChatGPT's agent mode can finish a simple, fast web booking page itself. That's another reason the Book Now page comes first.
- **The alternative they may already use:** Angi and Thumbtack have ChatGPT apps, but those are shared, pay-per-lead pools. Pitch the add-on as "your own way in, and the booking is yours, not a lead you pay a marketplace for."
- Live windows depend on their dispatch software allowing a connection (T07). If it doesn't, fall back to requesting a window, with instant confirmation of the request and a dispatcher confirming the exact time.

### Risk reversal (only what's true)
- Free 30-minute scope call with a founder. No deposit for the call.
- They get a written scope, fixed price and delivery date, and the plan is theirs whether they hire us or not.
- They see it working at the halfway mark, while there's still time to change direction.
- They own the code and the accounts.
- **Do not** offer a refund or a guarantee. None exists (claims.md, Forbidden).

### Founding-client terms (private, direct outreach only)
The first HVAC company gets founding pricing in exchange for:
1. permission to show the before and after (with their name) once it's live, and
2. read-only access to booking numbers for 60 days, so the results are real.

That's how the first honest case study gets made. Never advertise the discount.

### Lead-in: the free "Who gets named" check
Before pitching, offer this for free:
> "I'll ask Google and ChatGPT five things your customers ask, like 'AC repair today in Winter Park', and send you a one-page screenshot report of who shows up, whether you do, and why."

It costs about 15 minutes, it's honest, and it shows them the problem in their own market. It plays the role the `/scorecard` lead magnet plays for dashboards.

## What not to say
- "Guaranteed to rank" or "ChatGPT will recommend you." Nobody controls that. Say "the facts AI and search pull from."
- "AI receptionist" or "never miss a call." Not this offer.
- "We built this for another HVAC company." We haven't, yet.
- Names of their software. Say "the scheduling software you already use," and confirm the connection on the scope call (T07).
- "No monthly fees." Care plans exist.

## Outreach

The biz-stack rule says don't say "AI" in cold outreach. Version A names ChatGPT as the place customers search, which is a fact about their customers, not about how we build. Version B leaves it out. Test both.

### Version A (email)
**Subject:** Your Book Now button

Hi {first name},

45% of consumers now ask ChatGPT and other AI tools for local recommendations, up from 6% a year ago (BrightLocal, 2026). So I searched "AC repair today in {city}" on Google and ChatGPT this week. {Company} {did / didn't} come up. Either way, every company that did come up had the same thing: a Book Now button that's really a form, then a phone call.

We build booking pages that actually book: real open time windows, your diagnostic fee shown up front, confirmed by text with no callback. Fixed price and delivery date in writing before you pay anything.

I put together a one-page report of who gets named in {city} and why. Want me to send it over?

Josh
SKOX · skoxsoftware.com/for/hvac

### Version B (no AI mention)
**Subject:** Book Now → callback

Hi {first name},

When a homeowner's AC dies, they fill out three "Book Now" forms and hire whoever calls back first. Every HVAC site I checked in {city} works this way.

We build a booking page that shows your real open windows and your diagnostic fee, and confirms the appointment on the spot. Fixed price and date, agreed in writing before you pay. You own it.

Worth a 30-minute call? You keep the written plan either way.

Josh

### Follow-up (day 4)
Hi {first name}, here's the one-page report of who shows up for "AC repair today in {city}": {link}. The short version: the companies named first all list a specific arrival promise and fee. Happy to walk you through it in 15 minutes.

### Breakup (day 10)
Last note from me. If booking ever becomes the bottleneck in the heat, the offer stands: a written scope and fixed price, free, and yours to keep. —Josh

## Personalized openers (facts verified 2026-10-14)

Facts here come from their public pages. Re-check before sending.

| Company | Fit | Opener |
|---|---|---|
| Smart Home Air and Heat (Orange/Seminole) | **Weaker fit than first thought.** It has its own site (150 Google reviews shown, prices shown, a quick-schedule form), so the gap is only the callback step. The HomeGuide listing showed no reviews. | "Your 90-minute arrival promise got you named in an AI search with zero reviews, and almost nobody else in Winter Park makes one that specific. Imagine it with reviews behind it, and a button that books the 90 minutes." Lead with Get Named and Book Now. |
| Air Flow Designs (Orlando, Tampa, Jacksonville, Haines City) | Larger, 60+ years. Online scheduling goes to a request form; flat-rate diagnostic; no chat. | "You already do flat-rate diagnostics and quote before work. That's exactly what people want to see before booking, but right now it's behind a request form." Lead with Book Now plus the dashboard (four regions). |
| Filterbuy HVAC Solutions | Big, statewide, 750 reviews, city pages already. Book Now leads to "we'll call within 5 minutes." Probably too big; skip unless there's a warm intro. | If contacted: lead with Know Your Numbers ("how often is it really 5 minutes?"). |
| Cool Today | Since 1963, multi-region, published price ranges. **Too big.** Skip. | — |

Next: build a list of 20–30 independent HVAC shops (10–40 staff) in Orange and Seminole with `prospect-hunt`, and run the free check on the top 10.

## Booking walkthrough: the top 5 (2026-10-14, about 4:20pm)

Each flow walked as a homeowner with a broken AC in Winter Park (ZIP 32789), **stopped before entering contact details or submitting**. No fake bookings were sent.

| Company | Where booking starts | Steps before a time | Earliest time offered | Price shown? | Confirmed, or a request? |
|---|---|---|---|---|---|
| **Cool Today** | "Schedule Now" pop-up (ServiceTitan scheduler) + Birdeye chat | 6 answers (service, Repair, issue, member?, system age, ZIP) | **Today, 4–8pm** (same day) | No | Books a slot; then contact details plus one more step |
| **Air Flow Designs** | "Schedule Online" page, 3-step widget | 2 (location, service) | Repair: **tomorrow**, 8am–1pm or 1–6pm. Maintenance: Friday. | No | **"Submit Request."** The page says to call for anything within 48 hours |
| **Filterbuy HVAC** | /book form | **0. Name and phone first**, then a 5-minute callback promise | Not shown until they call | Elsewhere on the site ($99 tune-up), not in the flow | Lead form, so a callback |
| **Smart Home Air and Heat** | **Correction:** it does have a site (smarthomeairheat.com), found later by the lead search. "Quick Schedule" form, then "we'll call you shortly to confirm" | Not walked | Yes (on site) | A request, then a callback |
| **TIDY** (marketplace) | "Book HVAC Repair" | **Create an account first** | n/a | Says "full price before you book" | Matches you to a pro from its network |

### What this means for the pitch
1. **Only the biggest company could book same day online,** and it already pays for ServiceTitan's scheduler. Small and mid-size shops can't match that today. That's the gap.
2. **Nobody showed a price in the booking flow.** "Diagnostic fee: $X, credited to the repair" in step one would stand out against every competitor here.
3. **The urgent case gets pushed to the phone.** Air Flow Designs turns away online bookings within 48 hours. Filterbuy asks for name and phone before anything else. The homeowner whose AC just died is the one who can't book online.
4. **Heavy qualifying.** Cool Today asks six questions before showing a time. Good for dispatch, slow for the customer. An AI assistant can answer these in one sentence, which is the case for the ChatGPT app.
5. **Smart Home Air and Heat has no website at all.** Every job comes through directories or Thumbtack. It's the clearest prospect: a site, a booking page and review requests, so the leads are its own.

### Walkthrough opener (use with Air Flow Designs, adapting for each)
> "I tried booking an AC repair on your site this afternoon as a homeowner in Winter Park. The calendar's good, but the earliest I could get was tomorrow, it ended in 'Submit Request,' and I never saw a price. Cool Today gave me 4–8pm today. Want me to send the side-by-side?"

Only send this after re-walking their flow that week. Availability changes daily.

## What the search showed (2026-10-14)

Queries: "best HVAC company Winter Park FL AC repair", "emergency AC repair near Winter Park Florida book online same day".
- Directories and lead sites took most of the results (HomeAdvisor, HomeGuide, TIDY, Lennox's dealer finder).
- Named companies: Filterbuy HVAC Solutions, Air Flow Designs, MekTek Mechanical, Smart Home Air and Heat, Cool Today.
- Booking: Filterbuy = multi-step form, then a call within 5 minutes. Air Flow Designs = request form. Cool Today = phone or "Schedule Now". None could be finished inside the chat.
- The AI's own words: it could not confirm live availability or pricing and pointed people to the companies' websites.
- Results vary by person, location and day. Re-run before quoting specifics to a prospect.
