# Old-site leads: call sheet for Reiss (2026-10-16)

The full list is in [leads-old-sites-2026-10-16.csv](leads-old-sites-2026-10-16.csv): 39 Florida businesses whose website is ancient, dead, or missing. Every site in the "ancient" and "dead" groups was opened and read by hand on 2026-10-16. Phones and emails are exactly as published on the business's site, its Google Maps listing, a chamber listing or BBB. Nothing was guessed and no one has been contacted.

- **ancient (15):** loads, but clearly 10–20 years old: no mobile layout, table or frame layout, footer © 2007–2015.
- **dead (13):** hosting suspended, domain expired or parked, site crashed, or "not published".
- **none (11):** no website found on Google Maps or in a web search. Five are individual realtors or a team at a big brokerage (RE/MAX, Keller Williams), which already gives them a profile page, so they're weak leads. The strongest are Pickard & Pickard, B P Davis and The Property Management Company of Jacksonville.

The `sunbiz_status` column shows whether each company is registered Active with the state (checked 2026-10-16). Skip anything marked INACTIVE.

Before you dial, open the site on your phone. Seeing it yourself is the opener.

## Call these 10 first

| # | Business | Who | Phone | What you'll see |
|---|---|---|---|---|
| 1 | Pineloch Management (commercial leasing, Orlando) | Caruso family (Jim, Jimmy, Bill) | 407-859-3550 | Footer says ©2007; not mobile |
| 2 | Charles Wayne Properties (commercial RE, Daytona) | Ted Lightman, CEO | (386) 238-3600 | Footer says © 2012; not mobile |
| 3 | Roof Top Services of Central Florida (roofing, Orlando) | ask for the owner | (407) 476-0260 | Site says "Account Suspended" |
| 4 | Direct Home Solutions (roofing, Kissimmee) | ask for the owner | (407) 515-6716 | Site says "This website is currently not published"; 61 Google reviews |
| 5 | Brinkerhoff Property Management (Daytona) | Eric Brinkerhoff, President | (386) 258-3802 | Built with an old site builder, table layout, not mobile; typo in its own email address |
| 6 | King Real Estate Services (Bartow) | Judy King Barnett, Broker/Owner | (863) 533-4119 | Table-layout site, not mobile; firm since 1958 |
| 7 | Daytona Realty and Property Management | Maryke Guild, Broker | 386-310-7893 | Footer says ©2012; not mobile |
| 8 | University Eye Care (Winter Park) | ask for the doctor or office manager | 321-422-2695 | Homepage shows "There has been a critical error on this website" |
| 9 | Pickard & Pickard Inc. REALTORS (Lakeland) | Donald M. Pickard | (863) 688-7623 | No website at all; downtown office, Lakeland Chamber member since 1921 |
| 10 | Oswick Kashlak DMD (dentist, Orlando) | Dr. Anthony Oswick or Dr. Maria Kashlak | (407) 876-0290 | Footer says © 2007; not mobile |

## One-line openers

1. **Pineloch:** "I was looking at your leasing page on my phone. The footer still says 2007 and it doesn't fit the screen. For a family that's been leasing in south Orlando this long, the site undersells you. Can I show you what a modern one with your available spaces would look like?"
2. **Charles Wayne:** "Your site still shows copyright 2012 and doesn't work on a phone, which is where most tenants and brokers will first look at a listing. We build commercial real estate sites at a fixed price and date. Worth 15 minutes?"
3. **Roof Top Services:** "Heads up: anyone who taps your website from Google right now sees 'Account Suspended.' You've got good reviews pointing people there. We can have a new site live fast, at a fixed price agreed up front."
4. **Direct Home Solutions:** "Your Google listing has 61 reviews, but the website link says 'not published.' Those are people ready to call, landing on a dead page. Want me to send you a mockup of what they'd see instead?"
5. **Brinkerhoff:** "Your site was built with an old site builder and it shows: it doesn't fit a phone, and the email address on it has a comma instead of a dot. Renters look on their phones first. Can I show you a modern version with your available rentals?"
6. **King Real Estate:** "Sixty-plus years in Polk County is a real story, and the website doesn't tell it. It's an old table layout that doesn't work on a phone. We'd build you a new one at a fixed price with a set launch date."
7. **Daytona Realty and PM:** "Your site still says 2012 and doesn't fit a phone, for a firm that manages shopping centers and HOAs. Board members and tenants judge that fast. Can I send a quick idea of what we'd build?"
8. **University Eye Care:** "I wanted to flag something. Your homepage is showing a WordPress 'critical error' right now, so patients who look you up can't see anything. We can fix that properly with a new site, fixed price, quick turnaround."
9. **Pickard & Pickard:** "I went looking for your listings online and couldn't find a website for the firm, just the chamber listing. For a brokerage that's been downtown this long, buyers should be able to find you. We build sites at a fixed price with a set launch date. Can I show you an example?"
10. **Oswick Kashlak DMD:** "Your site still says copyright 2007 and doesn't fit a phone screen, and that's where new patients look first. We build practice websites at a fixed price with a set launch date. Would 15 minutes this week work?"

Keep openers to what's on the page. Don't promise results or quote a price beyond "fixed price, agreed up front". The pricing call happens on the scope call.

## How this list was made

1. **Google Maps pull (Apify, about $5.07):** property management, real estate brokerage, commercial real estate and roofing searches in Orlando, Winter Park, Kissimmee and Jacksonville, 1,141 places. Sanford was cut off and St. Augustine never ran, because the Apify free plan hit its monthly cap.
2. **Footer-year web search:** 704 local business sites across all six cities, any industry.
3. **Chamber and BBB directory research:** property managers and real estate firms in Central and Northeast Florida.

Everything went through [scripts/lead-scan/scan.py](../../scripts/lead-scan/scan.py). It checks each site for a mobile viewport, the copyright year, table, frame and font tags, Flash, the site builder, old jQuery, and dead or parked pages. The hits were then checked by hand. The raw scan output is in `scripts/lead-scan/data/`, so the scan can be rerun for other cities.

**Not done:** St. Augustine and Sanford Maps pulls, and the broad any-industry Maps categories (auto, legal, dental, salons and so on). Both need the Apify plan upgraded or next month's credit.

**Different kind of lead, kept on the side:** Frank's AC (St. Cloud) has a modern site, but it's hiring a Dispatcher/CSR and an admin manager. That makes it a fit for an operations build, not a website.
