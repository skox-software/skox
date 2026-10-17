# Lead loop: from lead email to a qualified deal

Ads platforms only see form fills. They can't tell a real buyer from a student. This loop is how SKOX finds out which campaigns produce clients, and later how Google learns it too.

Today every lead arrives as an email from Resend with the subject **"Scope request — {company or name}"**. It includes the attribution block (utm tags, gclid/fbclid, landing page, first touch, pages viewed, location, device, company lookup).

**"Unfinished enquiry — {email}"** emails are partial form fills. They are never imported as deals and never counted as leads.

## Weekly (10 minutes, Monday)

1. Search the inbox for `subject:"Scope request"` from the last 7 days.
2. Add one row per lead to a CSV with these headers (they match the portal importer, `skox-portal/lib/pipeline-import.ts`):

   ```
   company,contact,email,website,type,value,notes
   ```

   - `type`: web-apps, dashboards, websites or other.
   - `value`: leave blank until you've scoped it.
   - `notes`: paste `gclid=… | fbclid=… | utm_source=… | utm_campaign=… | utm_term=… | landing=… | first_touch=… | received=YYYY-MM-DD HH:MM`. The importer keeps unknown columns in notes, so extra columns are safe too.
3. Paste the CSV into **www.skoxsoftware.com/portal/admin/pipeline** → Import. It skips duplicates of existing deals and clients.
4. After each scope call, move the deal's stage and set its value. Mark it qualified or not using the definition in `economics.md`.

## Weekly review input

When you ask `google-ads` or `meta-ads` for a weekly review, give it two things:
- The platform's CSV export (see the review section of each campaign file).
- Your lead tally for the same dates: form leads, qualified leads, calls held, proposals sent, won, per campaign. A short table in chat is enough.

The agent shows the platform's number and your number side by side and steers by yours.

## Later: tell Google which leads were good (not built in v1)

Once about 30 qualified leads with a `gclid` exist:
1. Export the qualified deals with `gclid` and the time they became qualified.
2. Google Ads → Goals → Conversions → Uploads → upload a CSV with columns `Google Click ID, Conversion Name, Conversion Time, Conversion Value, Conversion Currency`, using a new conversion action called "Qualified lead".
3. Then switch bidding to optimise for "Qualified lead" instead of form fills.

That's when paid search stops paying for students and job-seekers. It needs the gclid captured on every lead, which `lib/attribution.ts` already does.
