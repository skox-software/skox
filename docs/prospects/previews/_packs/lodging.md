# Industry pack: small lodging (cottages, inns, B&Bs, weekly rentals)

Written 2026-10-21 for Bass Harbor Cottages. Reuse for any owner-run lodging with a handful of units.

## Section order

A guest is deciding "which unit, which week, can I get it, what will it cost". Answer in that order.

1. Concept bar
2. Hero: the view, the place name, the one-line "where exactly" (distance to the park, the village), phone
3. Trust strip: ratings with counts, chamber/tourism memberships, years or a building date if published
4. The places to stay: one block per unit with its own photos, sleeps, minimum stay, published "from" rates
5. The working upgrade: plan a stay (unit, dates, party) → checked against their own rules → request sent
6. Reviews, chosen for what they say about the place and the hosts
7. Around here: distances they publish (beach, village, trails, airport)
8. Before you book: their house rules and policies, plainly laid out, so nobody is surprised
9. Before and after
10. In the build
11. What happens next
12. Footer: address, how to find them, phone hours

## Default working upgrade

**Stay planner / reservation request.** Pick a unit, arrival date and nights, party size. The page enforces their published minimum stay and maximum occupancy, shows the published "from" rate for that month only when they publish one for it (never totals a stay, never invents a shoulder-season rate), lists what the stay includes and what to bring, has the guest tick their house rules, and sends the request (tagged `preview:<slug>`). Result screen says what happens next in their words (deposit terms, cancellation window).

Never compute a total: lodging rates depend on party size, tax, cleaning and dates, and owners quote by phone.

## Default "in the build" upgrades

- Live availability calendar synced with their booking system or channel manager
- Deposit online (card) instead of a mailed check, with the policy agreed at checkout
- Linen rental and other add-ons at checkout
- Pre-arrival email: directions, door codes, house rules, what to bring
- One rate table that feeds every page, so prices never disagree

## Trust signals that matter

- Ratings with counts on Google and TripAdvisor (and Booking/VRBO if listed)
- Chamber of commerce, state hospitality association, tourism board membership
- Building age or history, if they publish it
- Owners live on site / named hosts, only as they name themselves
- Clear cancellation and deposit policy (reduces calls)

## Compliance notes

- Rates: show only published figures with "from" and the month they apply to. Always "plus Maine lodging tax / local tax" if their site says so. Never a total.
- No "best", "#1", "award-winning" without a source and date.
- Availability must not look live unless it is. Label the planner a request, not a booking.
- Pet, smoking, accessibility claims only as they state them.
- Security camera disclosures they publish should stay visible in the rules section.

## Reference sites that set the bar

- The Claremont Hotel, Southwest Harbor (theclaremonthotel.com): same island, cottages plus inn, unit-by-unit pages and clear seasonal policy.
- Inn by the Sea, Cape Elizabeth (innbythesea.com): photography of the water treated as the product, restrained type.
- Getaway (getaway.house): the booking flow as the page, minimum-stay and party rules handled inline instead of in fine print.
