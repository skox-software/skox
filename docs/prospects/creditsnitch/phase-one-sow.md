# Phase One Build Agreement — Credit Snitch

Between **SKOX Software** ("we") and **Credit Snitch** ("you"), represented by
Angelique Soto.
Date: _____________

---

**What we're building.** The working version of the product you saw as a
concept: the consumer app, the partner portal and the Command Center, running on
real credit data, with real accounts, real payments and your material behind
Snitchy. Phase one is a launchable product, not a pilot.

**Price: $75,000.** Fixed. Confirmed against the discovery findings before
either of us signs.

**Ongoing: $3,500 per month**, starting 30 days after launch. Covered below.

---

## What phase one includes

### The consumer application

Sign-up and onboarding as designed: goal, timeline, one teaching moment, the
thresholds for that goal, account, verification, then connect. Passwordless
sign-in, no password field anywhere in the product.

Credit connection through the provider selected at discovery, including the
identity verification step. The report is read, translated and discarded.

The dashboard: three bureau scores, the six measured figures, Readiness with the
forecast for each action. The report, split into what needs fixing and what is
already working, with a plain-language explanation on every line. The plan,
ordered, with the projected stage for each item. Progress, with the utilization
chart, milestones and share cards. Your programs as the curriculum, recommended
by what is actually on the report.

English and Spanish throughout the interface.

### The partner portal

Referral links and QR codes that attribute correctly end to end. The pipeline, a
referral ledger showing stage and movement only, and the monthly update that
currently goes out by hand.

**Partner management**, which the concept does not have: you invite a partner,
set their role, and remove them, without calling us. Partners never see a score,
a balance or an account.

The Readiness Letter is generated and sent **by the consumer**, not pushed by
the system to a lender. This is deliberate and is explained in the compliance
section below.

### The Command Center

Business overview, stage distribution, the opportunity queue with assignment and
status, the White Glove roster, and the consumer detail view your team works
from.

The Rulebook: the thresholds from discovery, editable by you, with a live count
of who changes stage before you save.

Teach Snitchy: the source list, an upload path, and the log of questions Snitchy
could not answer.

### Snitchy

Ingestion of the sources identified at discovery, chunking, embedding and
retrieval, so answers come from your material and cite which piece they came
from. Consumer answers are grounded in that person's own file. Your team gets
the drafting and call-prep tools. Every unanswered question is logged.

Guardrails are built in and tested: it never states or implies approval, never
gives legal or tax advice, never quotes a price that is not in your material,
never discusses another client, and says so plainly when something is not in
the playbook.

### The platform underneath

- Hosted authentication with passkeys and email sign-in. No passwords stored.
- A database where every read and write is scoped to the right account on the
  server, not hidden in the interface.
- Stripe for subscriptions and payments. No card details reach us.
- GoHighLevel sync: contacts, tags and stage changes write to the records you
  already have.
- Consent records carrying scope, version and timestamp, and a working
  revocation path.
- An audit trail of who saw what and when.
- Logging, error alerting and the ability to reconstruct one person's session
  when they report a problem.
- A written runbook and a rollback procedure.

### How data is handled

This is a feature of the product, not an implementation detail.

Social Security numbers, identity documents and verification answers go to the
credit data provider and never touch our systems. The credit report is read for
the length of a session and discarded. Card details stay with Stripe. Passwords
do not exist.

We store a name, an email, a phone number, a goal, a Readiness stage, the kinds
of problems on the file, the plan and its progress, and consent records. That is
the whole list, and there is a screen that shows a consumer exactly that list and
lets them delete it.

Logging is built to an allowlist and request bodies are never captured, so credit
data cannot reach an error report or a log file.

---

## Payments

| | Amount | When |
|---|---|---|
| Start | $26,250 (35%) | On signature, before work begins |
| Consumer app in staging | $18,750 (25%) | On your acceptance |
| Partner portal and Command Center in staging | $18,750 (25%) | On your acceptance |
| Launch | $11,250 (15%) | On launch |

You have **5 business days** to review each milestone. If we do not hear back
with changes in that time, it counts as accepted. If an invoice goes unpaid past
30 days, we can pause and hold the work until it is settled.

**Timeline** is set in the Phase One schedule agreed at discovery, and starts
from the day we have the provider contract and the access listed below. If those
come late, the dates move by the same number of days.

---

## What we need from you

- A signed contract with the credit data provider selected at discovery, and
  working credentials.
- Administrative access to GoHighLevel and your payment account.
- Your Rulebook thresholds, which discovery produces.
- The Snitchy source material identified at discovery.
- Your logo, photographs, and any copy you want used verbatim.
- One decision-maker available for review within 5 business days per milestone.
- Your attorney's written sign-off on the compliance items below, before launch.

Everything you send us needs to be yours to use. If material turns out to belong
to someone else and they raise it, resolving that sits with you.

**Revisions.** Two rounds of changes per milestone are included. A round is one
batch of changes sent together. Beyond that, or new features, we quote before we
start.

---

## Compliance, and where the line sits

The product handles credit information, so three bodies of law are in play: the
Fair Credit Reporting Act, the Credit Repair Organizations Act, and state
licensing rules that apply to credit services and to anything that pays a real
estate agent on a transaction.

**We are software developers. We do not warrant compliance with any of these and
we do not give legal advice.** What we do is build to a design your attorney has
reviewed, and flag the places where the design and the law meet.

Three of those places, so they are on the record:

1. **The partner portal.** Sharing a credit-derived readiness stage with a third
   party is the pattern the FCRA regulates. We have designed against it: explicit
   consent recorded with version and timestamp, revocable at any time, stage only,
   never a score or a balance, and partner terms stating the stage is not a credit
   eligibility determination. Your attorney should review this specifically.

2. **The Readiness Letter.** It is generated and sent by the consumer, never
   pushed by the system to a lender, so the consumer is disclosing their own
   information rather than us furnishing a report about them. Changing that
   direction later is a legal decision, not a product decision.

3. **Disputes.** Phase one hands off to your existing dispute portal. We do not
   build dispute letter automation, because paid dispute services carry CROA
   obligations your counsel needs to scope first.

If your attorney's review requires design changes, we will implement what they
approve and quote anything outside this scope before starting.

---

## What phase one does not include

- Legal, compliance or licensing review of any kind.
- Credit data provider fees, payment processing fees, hosting, GoHighLevel, or
  any third-party subscription. Those are billed to you directly by those
  companies. We will tell you what each one costs before it is turned on.
- Dispute letter automation.
- Any partner compensation, rewards or revenue share mechanism.
- Native iPhone or Android apps. The product runs in a browser and installs to a
  phone's home screen.
- Migrating existing client records out of Credit Repair Cloud.
- Translation of your course or video content into Spanish. The interface is
  bilingual; your material is delivered in the languages you supply it in.
- Video production, photography, or copywriting beyond the interface itself.
- SOC 2 or any formal security certification.

Any of these can be quoted as separate work.

---

## The rest of it

**If the provider cannot deliver.** Phase one assumes the credit data provider
selected at discovery supplies structured account data on the terms discovery
established. If that changes after signature through no fault of ours, we will
stop, show you the options, and adjust scope and price by written agreement
before continuing.

**Ownership.** On final payment the product is yours: design, code and content.
Until then it stays ours. Third-party services remain under their own licences
and in your accounts. We may describe the work in our portfolio without
publishing your thresholds, materials or client information.

**After launch.** We fix anything broken in what we built, free, for 30 days.
After that it is covered by the monthly plan below, or quoted.

**Monthly care: $3,500 per month.** Infrastructure management and monitoring,
security and dependency updates, backups, uptime alerting, provider and
integration monitoring, Snitchy source updates as you add material, email support
with a one business day response target, and **eight hours of changes each
month**. Unused hours do not roll over. Provider fees remain billed to you
directly. Larger work is quoted before it starts. First invoice 30 days after
launch, then monthly in advance. No minimum term; cancel by email before the
next renewal.

This plan is how the product stays running. A credit data integration is not
software that can be left alone, and we would rather say that now than after
launch.

**If either of us calls it off.** Either of us can stop in writing. Fees for
work already done and milestones already invoiced are not refunded. You keep
everything paid for. Nothing further is owed.

**Where our responsibility ends.** We build what is described here and stand
behind that work. What we can be held responsible for is capped at the fees you
have paid us under this agreement. Lost business, lost data, regulatory
penalties, or anything caused by a credit data provider, payment processor or
other outside service is not something we can take on.

This agreement is governed by the laws of the State of Florida. Signing
electronically counts the same as signing on paper.

---

**SKOX Software**

Name: Reiss Skeen  ·  Title: Founder  ·  Date: __________

Signature: _____________________________


**Credit Snitch**

Name: Angelique Soto  ·  Title: Founder & CEO  ·  Date: __________

Signature: _____________________________
