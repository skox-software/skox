# skoxsoftware.com → gounbusy.com: email and portal audit (29 Oct 2026)

Goal: nobody we contacted as SKOX Software ever sees something that looks like a stranger's domain. Old links and old addresses keep working; new mail and new links come from gounbusy.com and say "formerly SKOX Software".

## What the check found

| Area | State today | Risk |
|---|---|---|
| Mail for @gounbusy.com | **No MX, SPF, DKIM or DMARC records.** Mail to any @gounbusy.com address bounces. Nothing can be sent as gounbusy.com without failing authentication. | Blocks every email switch below |
| Mail for @skoxsoftware.com | Google Workspace MX, SPF, Google DKIM, Resend DKIM, DMARC `p=none` | Fine. Must stay forever: replies to old threads land here |
| Cold outreach sender | `reiss@outreach.skoxsoftware.com`, signed "Co-founder, SKOX Software", footer "Advertisement from SKOX Software", logo and site link to www.skoxsoftware.com (hard-coded in the portal's `lib/lead-email.ts` and `lib/email-draft.ts`) | Prospect gets SKOX email, clicks, lands on UnBusy with no explanation |
| Portal emails (sign-in, invites, reminders) | No `EMAIL_FROM` set, so they send as `portal@skoxsoftware.com`; links built from `PORTAL_URL` (old host) | Clients see the old name |
| Site lead emails | `LEAD_FROM_EMAIL="SKOX Leads <leads@skoxsoftware.com>"`; `site.email` is `founder@skoxsoftware.com` (shown in schema, privacy page, mailto fallback) | Internal mostly; the public address is mismatched |
| Portal address | Works on both gounbusy.com/portal and www.skoxsoftware.com/portal; old host does not redirect | Two addresses for one portal |
| Portal sign-in on gounbusy.com | **Fixed 29 Oct:** https://gounbusy.com added to Neon Auth trusted domains (production branch), alongside the two skoxsoftware.com hosts | Done; confirm with one real sign-in |
| Prospect previews | previews.skoxsoftware.com/<slug> loaded but then bounced the visitor to gounbusy.com/concepts/… | **Fixed in skox PR #24**: previews now stay on the link we sent |
| Email logo in already-sent mail | www.skoxsoftware.com/email/skox-logo.png 308s to gounbusy.com and loads | Fine |
| Unsubscribe links in already-sent mail | www.skoxsoftware.com/portal/u/… | Must keep working on the old host (legal). Never redirect `/portal/u/*` or `/portal/api/*` |

## The cutover, in order

### 1. Accounts and DNS (Josh)
1. **Google Workspace: make gounbusy.com the primary domain of the same subscription** (super admin, Admin console → Account → Domains → Manage domains). Add gounbusy.com as a *secondary* domain (not an alias domain, which can't be made primary), verify it with the TXT record Google gives, then Change primary domain. Rename each user to name@gounbusy.com; keep skoxsoftware.com on the account so name@skoxsoftware.com keeps receiving. Same billing, mailboxes, Drive and Calendar. Before renaming founders@: check which services sign in with that address by password (Vercel, Neon, Stripe, Resend, GitHub) and that portal staff memberships still match the sign-in address.
2. **DNS for gounbusy.com** (Vercel DNS; Claude can add these with the values in hand):
   - MX `smtp.google.com` priority 1
   - SPF `v=spf1 include:_spf.google.com ~all`
   - Google DKIM `google._domainkey` (generate in Admin console → Apps → Gmail → Authenticate email)
   - DMARC `_dmarc` `v=DMARC1; p=none; rua=mailto:founders@gounbusy.com`
3. **Resend: add `gounbusy.com` (portal and site mail) and `outreach.gounbusy.com` (cold outreach)** and add the records Resend lists (DKIM `resend._domainkey`, `send` MX and SPF). Wait for both to show Verified.
4. ~~Neon Auth: add `https://gounbusy.com` to trusted domains.~~ Done 29 Oct.
5. Turn on auto-renew for both gounbusy.com and skoxsoftware.com. Never let skoxsoftware.com lapse: old links, old unsubscribe links and replies to old threads depend on it.

### 2. Settings and code (Claude, after step 1 verifies)
- Site env: `LEAD_FROM_EMAIL="UnBusy <leads@gounbusy.com>"`, `CONTACT_EMAIL` to a gounbusy address; `site.email` to the gounbusy address.
- Portal env: `EMAIL_FROM="UnBusy <portal@gounbusy.com>"`, `PUBLIC_SITE_URL=https://gounbusy.com`, `PORTAL_URL=https://gounbusy.com/portal`, `NEXT_PUBLIC_SUPPORT_EMAIL`.
- Portal code: outreach domain to `outreach.gounbusy.com`; titles "Co-founder, UnBusy"; signature line `gounbusy.com`; UnBusy logo; footer "Advertisement from UnBusy (formerly SKOX Software)"; accept preview links on either host.
- Redirect www.skoxsoftware.com/portal pages to gounbusy.com/portal, except `/portal/u/*` and `/portal/api/*` (unsubscribe, Stripe and Resend webhooks stay where they were registered).
- New previews on `previews.gounbusy.com` (add the domain to the prospect-previews project; update the house rule in AGENTS.md). Every previews.skoxsoftware.com link already sent keeps working.

### 3. Outreach, without looking fishy or landing in spam
- **Anyone already emailed as SKOX gets the rename said plainly in the next message**, first line: "Quick note: SKOX Software is now UnBusy (gounbusy.com). Same team, same conversation." Reply-To stays the address they already know until they've seen that line once.
- **Warm the new outreach domain.** A brand-new sending domain has no reputation. Start at 10 to 20 cold emails a day from outreach.gounbusy.com for two to three weeks, then raise it. Keep follow-ups to existing threads on outreach.skoxsoftware.com until then.
- After a month of clean DMARC reports, raise DMARC to `p=quarantine` on both domains.
