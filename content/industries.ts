import { quoteDeskJob, quoteDeskMock, type SheetRow, type TicketHead } from "@/content/site";
import type { DeskMock } from "@/components/site/DeskMockup";

/**
 * One question page per industry. A page ships only when a sample desk runs
 * for it (SITE-PLAN decision 1), so the list below is the live list: nothing
 * here is "coming soon".
 */
export type Industry = {
  slug: string;
  /** The trade, as the industries list and the hero eyebrow show it. */
  trade: string;
  desk: string;
  /** The owner's question. The H1, and the <title> unless seoTitle is set. */
  question: string;
  /** A <title> with the words owners search for, when the question lacks them. */
  seoTitle?: string;
  description: string;
  lead: string;
  mock: DeskMock;
  sheet?: {
    caption: string;
    sample: string;
    head: TicketHead;
    rows: SheetRow[];
    total: string;
    totalNote: string;
    approve: string;
  };
  strip?: { n: string; label: string }[];
  job: { title: string; intro: string; steps: { title: string; body?: string }[] };
  stops: { title: string; intro: string; items: string[] };
  math: {
    intro: string;
    hire: { amount: string; unit: string; title: string; points: string[] };
    desk: { amount: string; unit: string; title: string; points: string[] };
    source: string;
  };
  review: { intro: string; steps: { title: string; body?: string }[]; proof: string };
};

const WAGE =
  "Wage: US median for secretaries and administrative assistants, Bureau of Labor Statistics, Occupational Employment and Wage Statistics, May 2025.";

export const industries: Industry[] = [
  {
    slug: "surveying",
    trade: "Surveying",
    desk: "the Quote Desk",
    question: "Can AI pull the county records for every survey job?",
    seoTitle: "Can AI draft every survey quote from the county records?",
    description:
      "A new address comes in; the Quote Desk pulls the appraiser record, plat, flood zone and zoning and drafts the quote from your rates. You approve it.",
    lead: "Usually, yes. A new address comes in and the desk drafts the quote from the county records. The surveyor approves it.",
    mock: quoteDeskMock,
    sheet: {
      caption: quoteDeskJob.caption,
      sample: quoteDeskJob.sample,
      head: quoteDeskJob.head,
      rows: [
        quoteDeskJob.rows[0],
        quoteDeskJob.rows[1],
        quoteDeskJob.rows[2],
        quoteDeskJob.rows[3],
        { doc: "Prior jobs nearby", note: "Two within 0.3 miles, 2024 and 2025", source: "The firm's own job folders", status: "Read", time: "0:08" },
        { doc: "Quote", note: "Platted lot, boundary survey", source: "From the firm's rate sheet", status: "Waiting on the owner", waiting: true, time: "1:45" },
      ],
      total: "4 min 12 s",
      totalNote: "address to quote. Staff hours: 0.",
      approve: "Approve quote",
    },
    strip: [
      { n: "6", label: "records collected and read, from four county sources" },
      { n: "2", label: "prior jobs found within 0.3 miles" },
      { n: "1", label: "quote drafted from the firm's rate sheet" },
      { n: "0", label: "staff hours. One decision left for the surveyor." },
    ],
    job: {
      title: "One address, start to finish.",
      intro: "",
      steps: [
        { title: "Pulls the appraiser record, plat and deed." },
        { title: "Checks flood zone, zoning and setbacks." },
        { title: "Finds your prior jobs nearby." },
        { title: "Drafts the quote from your rate sheet." },
        { title: "Files it all. The surveyor approves." },
      ],
    },
    stops: {
      title: "Where it stops.",
      intro: "These stay with a person, every time.",
      items: ["The quote amount.", "Anything a county won't give. It says so, never guesses.", "The client."],
    },
    math: {
      intro: "",
      hire: { amount: "$47,540", unit: "a year, before benefits", title: "The next office hire", points: ["Every year they stay", "Weeks to learn the county sites", "Out sick in busy season"] },
      desk: { amount: "$1,500", unit: "a month, to start", title: "The Quote Desk", points: ["Plus a one-time setup", "Runs nights and weekends", "Your data, exportable any day"] },
      source: WAGE,
    },
    review: {
      intro: "60 to 90 minutes, in your office or on a screen share.",
      steps: [{ title: "Show us how a job comes in." }, { title: "Get a proposal in your numbers." }, { title: "Decide. It's good for 14 days." }],
      proof: "The job above is a sample. The desk runs at a Florida survey firm today; its name and hours go here when the owner says yes.",
    },
  },
  {
    slug: "property-management",
    trade: "Property management",
    desk: "the Maintenance Desk",
    question: "Can AI triage every maintenance request?",
    description:
      "A tenant's request comes in; the Maintenance Desk checks the lease and unit history, picks your vendor and drafts the work order. You send it.",
    lead: "Usually, yes. A request comes in and the desk drafts the work order. Your coordinator approves and sends it.",
    mock: {
      desk: "Maintenance Desk",
      inbox: [
        { kind: "Tenant portal", label: "\"Water under the kitchen sink since last night\", unit 2B" },
        { kind: "Photo", label: "IMG_4471.jpg, the cabinet floor" },
        { kind: "Lease file", label: "2B lease, maintenance clause" },
        { kind: "Vendor list", label: "Plumbers you use for this building" },
      ],
      work: [
        { label: "Read the request and the photo", time: "0:04" },
        { label: "Checked the lease: landlord's repair", time: "0:06" },
        { label: "Found two prior plumbing calls on 2B", time: "0:05" },
        { label: "Set urgency from your rules: same day", time: "0:03" },
        { label: "Picked the plumber from your list", time: "0:06" },
        { label: "Drafted the work order with access notes", time: "0:38" },
      ],
      out: {
        title: "Work order: 2B, active leak, same day",
        lines: ["Vendor: your plumber for this building", "Not-to-exceed from your rulebook", "Photos and access notes attached"],
        stamp: "Waiting on the coordinator",
        action: "Send",
      },
      meter: [
        { n: "120", label: "requests triaged" },
        { n: "40", label: "office hours back" },
        { n: "$1,234", label: "of payroll not spent" },
      ],
      meterNote: "Sample firm: 120 requests a month at 20 minutes each, at the BLS median admin wage loaded for benefits. Your numbers go in on the call.",
      total: "1:02",
      before: { src: "/brand/stills/maintenance.jpg", alt: "", title: "Today: the same request, by hand.", line: "The portal, the lease file, the vendor list, the phone. 120 times a month.", hand: "20:00" },
    },
    sheet: {
      caption: "The Maintenance Desk, one request, as it ran",
      sample: "Sample request. Sample building, sample tenant.",
      head: [
        { label: "Request", value: "MR-1187, plumbing" },
        { label: "Unit", value: "2B, sample building, Orlando, FL" },
        { label: "Received", value: "Today, 9:02 pm, tenant portal" },
      ],
      rows: [
        { doc: "Tenant's message", note: "\"Water under the kitchen sink since last night\"", source: "Tenant portal, unit 2B", status: "Read", time: "0:04" },
        { doc: "Lease and unit history", source: "The firm's own records: two prior plumbing calls", status: "Read", time: "0:11" },
        { doc: "Urgency and category", source: "The firm's rulebook: active leak, same day", status: "Read", time: "0:03" },
        { doc: "Vendor", source: "Your vendor list: the plumber you use for this building", status: "Collected", time: "0:06" },
        { doc: "Work order", note: "Drafted with photos, access notes and the not-to-exceed amount", source: "Your work order template", status: "Waiting on the coordinator", waiting: true, time: "0:38" },
      ],
      total: "1 min 02 s",
      totalNote: "message to work order. Staff hours: 0.",
      approve: "Send work order",
    },
    strip: [
      { n: "1", label: "request read, in the tenant's own words" },
      { n: "2", label: "prior calls on the unit found and attached" },
      { n: "1", label: "work order drafted from the firm's template" },
      { n: "0", label: "staff hours. One decision left for the coordinator." },
    ],
    job: {
      title: "One request, start to finish.",
      intro: "",
      steps: [
        { title: "Reads the request, however it arrived." },
        { title: "Checks the lease and the unit's history." },
        { title: "Sets the urgency from your rules." },
        { title: "Drafts the work order with your vendor." },
        { title: "Your coordinator approves and sends." },
      ],
    },
    stops: {
      title: "Where it stops.",
      intro: "These stay with a person, every time.",
      items: ["Sending the vendor.", "Anything outside your rules. It says so, never guesses.", "The tenant and the owner."],
    },
    math: {
      intro: "",
      hire: { amount: "$47,540", unit: "a year, before benefits", title: "The next maintenance coordinator", points: ["Every year they stay", "Weeks to learn the buildings", "Out sick when the pipes freeze"] },
      desk: { amount: "$1,500", unit: "a month, to start", title: "The Maintenance Desk", points: ["Plus a one-time setup", "Runs nights and weekends", "Your data, exportable any day"] },
      source: WAGE,
    },
    review: {
      intro: "60 to 90 minutes, in your office or on a screen share.",
      steps: [{ title: "Show us how a request comes in." }, { title: "Get a proposal in your numbers." }, { title: "Decide. It's good for 14 days." }],
      proof: "The request above is a sample. Client names and hours go here when owners say yes.",
    },
  },
  {
    slug: "title-and-escrow",
    trade: "Title and escrow",
    desk: "the Title Desk",
    question: "Can AI order the records for a title file?",
    seoTitle: "Can AI pull the records for every title file?",
    description:
      "A new order comes in; the Title Desk pulls the vesting deed, mortgages, liens and tax status and lists what needs clearing. Your examiner decides.",
    lead: "Usually, yes. A new order comes in and the desk pulls the records and lists what needs clearing. Your examiner makes the call.",
    mock: {
      desk: "Title Desk",
      inbox: [
        { kind: "Email", label: "New order: purchase, a single-family home" },
        { kind: "Attachment", label: "Executed contract.pdf" },
        { kind: "County records", label: "Recorder's official records" },
        { kind: "Spreadsheet", label: "Fee schedule 2026.xlsx" },
      ],
      work: [
        { label: "Opened the file from the contract", time: "0:22" },
        { label: "Pulled the vesting deed and open mortgages", time: "1:10" },
        { label: "Searched liens, judgments and HOA", time: "0:54" },
        { label: "Read the property tax status", time: "0:18" },
        { label: "Listed what needs clearing", time: "0:31" },
        { label: "Drafted the requirements checklist", time: "1:05" },
      ],
      out: {
        title: "Title file: ready for exam",
        lines: ["Vesting deed and two open mortgages attached", "Requirements listed for the examiner", "Filed in the order folder"],
        stamp: "Waiting on the examiner",
        action: "Review",
      },
      meter: [
        { n: "60", label: "files opened" },
        { n: "40", label: "office hours back" },
        { n: "$1,234", label: "of payroll not spent" },
      ],
      meterNote: "Sample agency: 60 files a month at 40 minutes each of searching and ordering, at the BLS median admin wage loaded for benefits. Your numbers go in on the call.",
      total: "4:20",
      before: { src: "/brand/stills/title.jpg", alt: "", title: "Today: the same file, by hand.", line: "The recorder's site, the tax collector, the HOA, the lender. 60 times a month.", hand: "40:00" },
    },
    job: {
      title: "One file, start to finish.",
      intro: "",
      steps: [
        { title: "Opens the file from the contract or the lender's order." },
        { title: "Pulls the vesting deed and open mortgages." },
        { title: "Searches liens, judgments and HOA records." },
        { title: "Lists the requirements to clear." },
        { title: "Files it all. Your examiner reviews." },
      ],
    },
    stops: {
      title: "Where it stops.",
      intro: "These stay with a person, every time.",
      items: ["The exam and the commitment.", "Anything the records don't settle. It says so, never guesses.", "Buyers, sellers, lenders and agents."],
    },
    math: {
      intro: "",
      hire: { amount: "$47,540", unit: "a year, before benefits", title: "The next office hire", points: ["Every year they stay", "Weeks to learn the county records", "Out sick at month-end closings"] },
      desk: { amount: "$1,500", unit: "a month, to start", title: "The Title Desk", points: ["Plus a one-time setup", "Runs nights and weekends", "Your data, exportable any day"] },
      source: WAGE,
    },
    review: {
      intro: "60 to 90 minutes, in your office or on a screen share.",
      steps: [{ title: "Show us how an order comes in." }, { title: "Get a proposal in your numbers." }, { title: "Decide. It's good for 14 days." }],
      proof: "The file above is a sample. Client names and hours go here when owners say yes.",
    },
  },
  {
    slug: "accounting",
    trade: "Accounting",
    desk: "the 1099 Desk",
    question: "Can AI run my 1099 season?",
    seoTitle: "Can AI prepare 1099s from the W-9s and the books?",
    description:
      "The 1099 Desk reads the W-9s, matches payees to the client's books, chases missing W-9s and prepares the 1099 batch. Your preparer reviews and files.",
    lead: "Usually, yes. The vendor list and W-9s come in and the desk prepares the 1099s. Your preparer reviews and files them.",
    mock: {
      desk: "1099 Desk",
      inbox: [
        { kind: "Email", label: "Client's vendor list for 2026, 212 payees" },
        { kind: "Attachment", label: "W-9s, 61 PDFs.zip" },
        { kind: "QuickBooks", label: "Client's QuickBooks Online" },
        { kind: "Spreadsheet", label: "Payments by vendor, 2026.xlsx" },
      ],
      work: [
        { label: "Read 61 W-9s: names, TINs, addresses", time: "2:10" },
        { label: "Matched payees to QuickBooks vendors", time: "0:48" },
        { label: "Flagged 9 vendors with no W-9", time: "0:06" },
        { label: "Drafted the W-9 request emails", time: "0:35" },
        { label: "Left card payments out of the totals", time: "0:27" },
        { label: "Prepared the 1099-NEC and 1099-MISC batch", time: "1:14" },
      ],
      out: {
        title: "1099 batch: 203 forms",
        lines: ["9 vendors still owe a W-9, requests sent", "Card payments left out of the totals", "Ready for your review and e-file"],
        stamp: "Waiting on the preparer",
        action: "Review",
      },
      meter: [
        { n: "300", label: "1099s prepared" },
        { n: "30", label: "staff hours back" },
        { n: "$926", label: "of payroll not spent" },
      ],
      meterNote: "Sample firm: 300 1099s in January at 6 minutes each, at the BLS median admin wage loaded for benefits. Your numbers go in on the call.",
      total: "5:20",
      before: { src: "/brand/stills/cpa.jpg", alt: "", title: "Today: the same season, by hand.", line: "The W-9 folder, the client's books, the vendor list, the follow-up emails. 300 times in January.", hand: "6:00" },
    },
    job: {
      title: "One client, start to finish.",
      intro: "",
      steps: [
        { title: "Reads every W-9: name, TIN, address." },
        { title: "Matches payees to the client's books." },
        { title: "Chases the missing W-9s." },
        { title: "Leaves card payments out of the totals." },
        { title: "Prepares the batch. Your preparer reviews and files." },
      ],
    },
    stops: {
      title: "Where it stops.",
      intro: "These stay with a person, every time.",
      items: ["Signing and filing.", "A payee it can't match. It says so, never guesses.", "The client conversation."],
    },
    math: {
      intro: "",
      hire: { amount: "$47,540", unit: "a year, before benefits", title: "The next office hire", points: ["Every year they stay", "Hired for one season, gone by spring", "Out sick in January"] },
      desk: { amount: "$1,500", unit: "a month, to start", title: "The 1099 Desk", points: ["Plus a one-time setup", "Runs nights and weekends", "Your data, exportable any day"] },
      source: WAGE,
    },
    review: {
      intro: "60 to 90 minutes, in your office or on a screen share.",
      steps: [{ title: "Show us last season's 1099 folder." }, { title: "Get a proposal in your numbers." }, { title: "Decide. It's good for 14 days." }],
      proof: "The batch above is a sample. Client names and hours go here when owners say yes.",
    },
  },
  {
    slug: "law-offices",
    trade: "Law offices",
    desk: "the New Matter Desk",
    question: "Can AI open the file and chase the intake?",
    seoTitle: "Can AI handle new client intake for a small law firm?",
    description:
      "An inquiry comes in; the New Matter Desk checks your conflict list, opens the matter, sends the intake forms and drafts the engagement letter. You decide.",
    lead: "Usually, yes. An inquiry comes in and the desk runs the conflict check, opens the matter and drafts the letter. Your attorney decides.",
    mock: {
      desk: "New Matter Desk",
      inbox: [
        { kind: "Web form", label: "New inquiry: car accident, three weeks ago" },
        { kind: "Attachment", label: "Police report.pdf" },
        { kind: "Practice system", label: "Your practice management system" },
        { kind: "Spreadsheet", label: "Conflict list" },
      ],
      work: [
        { label: "Read the inquiry and the report", time: "0:20" },
        { label: "Ran the names against your conflict list", time: "0:09" },
        { label: "Opened the matter in your practice system", time: "0:31" },
        { label: "Sent the intake questionnaire", time: "0:12" },
        { label: "Chased the missing records release", time: "0:08" },
        { label: "Drafted the engagement letter from your template", time: "1:02" },
      ],
      out: {
        title: "New matter: auto accident",
        lines: ["No conflicts found in your list", "Intake questionnaire sent and logged", "Engagement letter drafted, not sent"],
        stamp: "Waiting on the attorney",
        action: "Review",
      },
      meter: [
        { n: "30", label: "matters opened" },
        { n: "25", label: "staff hours back" },
        { n: "$772", label: "of payroll not spent" },
      ],
      meterNote: "Sample firm: 30 new matters a month at 50 minutes each of intake, at the BLS median admin wage loaded for benefits. Your numbers go in on the call.",
      total: "2:22",
      before: { src: "/brand/stills/law.jpg", alt: "", title: "Today: the same intake, by hand.", line: "The web form, the conflict list, the practice system, the follow-up calls. 30 times a month.", hand: "50:00" },
    },
    job: {
      title: "One inquiry, start to finish.",
      intro: "",
      steps: [
        { title: "Reads the inquiry and what came with it." },
        { title: "Checks the names against your conflict list." },
        { title: "Opens the matter in your practice system." },
        { title: "Sends the intake forms and chases what's missing." },
        { title: "Drafts the engagement letter. Your attorney decides." },
      ],
    },
    stops: {
      title: "Where it stops.",
      intro: "These stay with a person, every time.",
      items: ["Taking the case.", "A possible conflict. It flags it, never clears it.", "Legal advice and the client relationship."],
    },
    math: {
      intro: "",
      hire: { amount: "$47,540", unit: "a year, before benefits", title: "The next office hire", points: ["Every year they stay", "Weeks to learn your intake rules", "Out sick when the phones ring"] },
      desk: { amount: "$1,500", unit: "a month, to start", title: "The New Matter Desk", points: ["Plus a one-time setup", "Runs nights and weekends", "Your data, exportable any day"] },
      source: WAGE,
    },
    review: {
      intro: "60 to 90 minutes, in your office or on a screen share.",
      steps: [{ title: "Show us how an inquiry comes in." }, { title: "Get a proposal in your numbers." }, { title: "Decide. It's good for 14 days." }],
      proof: "The matter above is a sample. Client names and hours go here when owners say yes.",
    },
  },
  {
    slug: "insurance-agencies",
    trade: "Insurance agencies",
    desk: "the Certificate Desk",
    question: "Can AI issue the certificates and chase the renewals?",
    seoTitle: "Can AI handle certificate of insurance requests for an agency?",
    description:
      "A certificate request comes in; the Certificate Desk checks the contract against the policies on file and drafts the certificate. Your team issues it.",
    lead: "Usually, yes. A request comes in and the desk drafts the certificate from the policies on file. Your account manager issues it.",
    mock: {
      desk: "Certificate Desk",
      inbox: [
        { kind: "Email", label: "COI request: the GC needs us as additional insured" },
        { kind: "Attachment", label: "Contract excerpt, insurance clause.pdf" },
        { kind: "Agency system", label: "Your agency management system" },
        { kind: "Spreadsheet", label: "Certificate holders.xlsx" },
      ],
      work: [
        { label: "Read the request and the contract clause", time: "0:16" },
        { label: "Found the client's policies in your system", time: "0:11" },
        { label: "Checked the clause against the coverage", time: "0:24" },
        { label: "Matched the wording to your approved endorsements", time: "0:19" },
        { label: "Drafted the certificate on ACORD 25", time: "0:37" },
        { label: "Logged the holder for renewal reminders", time: "0:06" },
      ],
      out: {
        title: "Certificate: additional insured",
        lines: ["Coverage matched to the policies on file", "Wording from your approved list", "Holder logged for renewal"],
        stamp: "Waiting on the account manager",
        action: "Issue",
      },
      meter: [
        { n: "240", label: "certificates drafted" },
        { n: "40", label: "staff hours back" },
        { n: "$1,234", label: "of payroll not spent" },
      ],
      meterNote: "Sample agency: 240 certificate requests a month at 10 minutes each, at the BLS median admin wage loaded for benefits. Your numbers go in on the call.",
      total: "1:53",
      before: { src: "/brand/stills/insurance.jpg", alt: "", title: "Today: the same request, by hand.", line: "The email, the contract, the agency system, the ACORD form. 240 times a month.", hand: "10:00" },
    },
    job: {
      title: "One request, start to finish.",
      intro: "",
      steps: [
        { title: "Reads the request and the contract clause." },
        { title: "Finds the client's policies in your system." },
        { title: "Checks the clause against the coverage." },
        { title: "Drafts the certificate in your approved wording." },
        { title: "Logs the holder. Your account manager issues it." },
      ],
    },
    stops: {
      title: "Where it stops.",
      intro: "These stay with a person, every time.",
      items: ["Issuing the certificate.", "Coverage that doesn't match. It flags it, never bends it.", "Binding, quoting and the client."],
    },
    math: {
      intro: "",
      hire: { amount: "$47,540", unit: "a year, before benefits", title: "The next office hire", points: ["Every year they stay", "Weeks to learn your carriers", "Out sick at renewal season"] },
      desk: { amount: "$1,500", unit: "a month, to start", title: "The Certificate Desk", points: ["Plus a one-time setup", "Runs nights and weekends", "Your data, exportable any day"] },
      source: WAGE,
    },
    review: {
      intro: "60 to 90 minutes, in your office or on a screen share.",
      steps: [{ title: "Show us how a request comes in." }, { title: "Get a proposal in your numbers." }, { title: "Decide. It's good for 14 days." }],
      proof: "The certificate above is a sample. Client names and hours go here when owners say yes.",
    },
  },
  {
    slug: "contractors",
    trade: "Contractors",
    desk: "the Permit Desk",
    question: "Can AI pull the permits and collect the lien waivers?",
    seoTitle: "Can AI handle permits and lien waivers for a contractor?",
    description:
      "A signed job comes in; the Permit Desk fills the permit application, gathers your license and insurance and chases the lien waivers. You submit.",
    lead: "Usually, yes. A signed job comes in and the desk builds the permit packet and chases the lien waivers. You submit and sign.",
    mock: {
      desk: "Permit Desk",
      inbox: [
        { kind: "Email", label: "Signed job: re-roof, single-family home" },
        { kind: "Attachment", label: "Signed contract.pdf" },
        { kind: "County portal", label: "Building permit portal" },
        { kind: "Spreadsheet", label: "Subs and suppliers.xlsx" },
      ],
      work: [
        { label: "Read the scope from the contract", time: "0:18" },
        { label: "Filled the permit application from the job", time: "0:52" },
        { label: "Attached the license and insurance", time: "0:14" },
        { label: "Listed the inspections to schedule", time: "0:09" },
        { label: "Requested lien waivers from three suppliers", time: "0:21" },
        { label: "Tracked which waivers came back", time: "0:04" },
      ],
      out: {
        title: "Permit packet: re-roof",
        lines: ["Application filled from the contract", "License and insurance attached", "Lien waivers requested from three suppliers"],
        stamp: "Waiting on the owner",
        action: "Submit",
      },
      meter: [
        { n: "30", label: "jobs permitted" },
        { n: "30", label: "office hours back" },
        { n: "$926", label: "of payroll not spent" },
      ],
      meterNote: "Sample contractor: 30 jobs a month at an hour each of permits and lien waivers, at the BLS median admin wage loaded for benefits. Your numbers go in on the call.",
      total: "1:58",
      before: { src: "/brand/stills/contractor.jpg", alt: "", title: "Today: the same job, by hand.", line: "The permit portal, the contract, the supplier emails, the waiver folder. 30 times a month.", hand: "60:00" },
    },
    job: {
      title: "One job, start to finish.",
      intro: "",
      steps: [
        { title: "Reads the scope from the signed contract." },
        { title: "Fills the permit application." },
        { title: "Attaches your license and insurance." },
        { title: "Requests the lien waivers and tracks them." },
        { title: "Hands you the packet. You submit and sign." },
      ],
    },
    stops: {
      title: "Where it stops.",
      intro: "These stay with a person, every time.",
      items: ["Signing and submitting.", "A requirement it can't confirm. It says so, never guesses.", "The customer, the inspector and the crew."],
    },
    math: {
      intro: "",
      hire: { amount: "$47,540", unit: "a year, before benefits", title: "The next office hire", points: ["Every year they stay", "Weeks to learn each county's portal", "Out sick in the busy season"] },
      desk: { amount: "$1,500", unit: "a month, to start", title: "The Permit Desk", points: ["Plus a one-time setup", "Runs nights and weekends", "Your data, exportable any day"] },
      source: WAGE,
    },
    review: {
      intro: "60 to 90 minutes, in your office or on a screen share.",
      steps: [{ title: "Show us how a signed job turns into a permit." }, { title: "Get a proposal in your numbers." }, { title: "Decide. It's good for 14 days." }],
      proof: "The packet above is a sample. Client names and hours go here when owners say yes.",
    },
  },
  {
    slug: "medical-and-dental",
    trade: "Medical and dental offices",
    desk: "the Intake Desk",
    question: "Can AI do the intake and the insurance paperwork?",
    seoTitle: "Can AI handle new patient intake and insurance checks?",
    description:
      "A new patient's forms come in; the Intake Desk sets them up in your system, checks eligibility and prepares the visit's paperwork. Your front desk confirms.",
    lead: "Usually, yes. A new patient's forms come in and the desk sets them up and checks their coverage. Your front desk confirms.",
    mock: {
      desk: "Intake Desk",
      inbox: [
        { kind: "Web form", label: "New patient: cleaning and exam, Tuesday" },
        { kind: "Photo", label: "Insurance card, front and back" },
        { kind: "Attachment", label: "Intake forms, completed online" },
        { kind: "Practice system", label: "Your practice management system" },
      ],
      work: [
        { label: "Read the forms and the insurance card", time: "0:14" },
        { label: "Created the patient in your system", time: "0:22" },
        { label: "Checked eligibility with the payer", time: "0:36" },
        { label: "Noted coverage for cleanings and X-rays", time: "0:10" },
        { label: "Flagged a missing history answer", time: "0:03" },
        { label: "Prepared the visit's paperwork", time: "0:41" },
      ],
      out: {
        title: "New patient: ready for Tuesday",
        lines: ["Patient created from the intake forms", "Eligibility checked, coverage noted", "One history question flagged for the front desk"],
        stamp: "Waiting on the front desk",
        action: "Confirm",
      },
      meter: [
        { n: "200", label: "new patients set up" },
        { n: "40", label: "staff hours back" },
        { n: "$1,234", label: "of payroll not spent" },
      ],
      meterNote: "Sample practice: 200 new patients a month at 12 minutes each of intake and insurance, at the BLS median admin wage loaded for benefits. Your numbers go in on the call.",
      total: "2:06",
      before: { src: "/brand/stills/medical.jpg", alt: "", title: "Today: the same patient, by hand.", line: "The forms, the insurance card, the payer portal, the practice system. 200 times a month.", hand: "12:00" },
    },
    job: {
      title: "One patient, start to finish.",
      intro: "",
      steps: [
        { title: "Reads the intake forms and the insurance card." },
        { title: "Creates the patient in your system." },
        { title: "Checks eligibility and notes the coverage." },
        { title: "Flags anything missing." },
        { title: "Prepares the visit. Your front desk confirms." },
      ],
    },
    stops: {
      title: "Where it stops.",
      intro: "These stay with a person, every time.",
      items: ["Anything clinical.", "A coverage answer it can't confirm. It says so, never guesses.", "The patient conversation."],
    },
    math: {
      intro: "",
      hire: { amount: "$47,540", unit: "a year, before benefits", title: "The next office hire", points: ["Every year they stay", "Weeks to learn your payers", "Out sick on a full schedule"] },
      desk: { amount: "$1,500", unit: "a month, to start", title: "The Intake Desk", points: ["Plus a one-time setup", "Runs nights and weekends", "Your data, exportable any day"] },
      source: WAGE,
    },
    review: {
      intro: "60 to 90 minutes, in your office or on a screen share.",
      steps: [{ title: "Show us how a new patient gets set up." }, { title: "Get a proposal in your numbers." }, { title: "Decide. It's good for 14 days." }],
      proof: "The patient above is a sample, with no real person's details. Client names and hours go here when owners say yes.",
    },
  },
  {
    slug: "freight",
    trade: "Freight and trucking",
    desk: "the Billing Desk",
    question: "Can AI match the bills of lading to the rate confirmations?",
    seoTitle: "Can AI match BOLs to rate confirmations and draft the invoice?",
    description:
      "Signed BOLs and PODs come in; the Billing Desk matches them to the rate confirmation, adds accessorials and drafts the invoice and carrier pay. You send.",
    lead: "Usually, yes. The signed paperwork comes in and the desk matches it to the rate confirmation and drafts the invoice. You send it.",
    mock: {
      desk: "Billing Desk",
      inbox: [
        { kind: "Email", label: "Signed BOL and POD, load 48213" },
        { kind: "Attachment", label: "Rate confirmation, load 48213.pdf" },
        { kind: "Photo", label: "Lumper receipt.jpg" },
        { kind: "TMS", label: "Your transportation management system" },
      ],
      work: [
        { label: "Read the BOL and the proof of delivery", time: "0:11" },
        { label: "Matched them to the rate confirmation", time: "0:07" },
        { label: "Checked pieces, weight and delivery date", time: "0:06" },
        { label: "Added the lumper receipt as an accessorial", time: "0:05" },
        { label: "Drafted the shipper's invoice", time: "0:19" },
        { label: "Prepared the carrier's pay with the documents", time: "0:15" },
      ],
      out: {
        title: "Load 48213: ready to bill",
        lines: ["BOL and POD match the rate confirmation", "Lumper receipt added as an accessorial", "Documents attached for the shipper"],
        stamp: "Waiting on billing",
        action: "Send",
      },
      meter: [
        { n: "300", label: "loads billed" },
        { n: "40", label: "office hours back" },
        { n: "$1,234", label: "of payroll not spent" },
      ],
      meterNote: "Sample brokerage: 300 loads a month at 8 minutes each of paperwork, at the BLS median admin wage loaded for benefits. Your numbers go in on the call.",
      total: "1:03",
      before: { src: "/brand/stills/freight.jpg", alt: "", title: "Today: the same load, by hand.", line: "The BOL, the POD, the rate confirmation, the TMS. 300 times a month.", hand: "8:00" },
    },
    job: {
      title: "One load, start to finish.",
      intro: "",
      steps: [
        { title: "Reads the BOL and the proof of delivery." },
        { title: "Matches them to the rate confirmation." },
        { title: "Checks pieces, weight and dates." },
        { title: "Adds the accessorials with their receipts." },
        { title: "Drafts the invoice and carrier pay. You send." },
      ],
    },
    stops: {
      title: "Where it stops.",
      intro: "These stay with a person, every time.",
      items: ["Sending the invoice and paying the carrier.", "A mismatch. It flags it, never pays it.", "Shippers, carriers and disputes."],
    },
    math: {
      intro: "",
      hire: { amount: "$47,540", unit: "a year, before benefits", title: "The next office hire", points: ["Every year they stay", "Weeks to learn your TMS", "Out sick at month-end"] },
      desk: { amount: "$1,500", unit: "a month, to start", title: "The Billing Desk", points: ["Plus a one-time setup", "Runs nights and weekends", "Your data, exportable any day"] },
      source: WAGE,
    },
    review: {
      intro: "60 to 90 minutes, in your office or on a screen share.",
      steps: [{ title: "Show us how a load gets billed." }, { title: "Get a proposal in your numbers." }, { title: "Decide. It's good for 14 days." }],
      proof: "The load above is a sample. Client names and hours go here when owners say yes.",
    },
  },
  {
    slug: "hvac-and-plumbing",
    trade: "HVAC and plumbing",
    desk: "the Invoice Desk",
    question: "Can AI turn the service tickets into invoices?",
    seoTitle: "Can AI turn HVAC and plumbing service tickets into invoices?",
    description:
      "A tech closes a ticket; the Invoice Desk prices labor and parts from your price book, applies agreements and drafts the invoice. Your office sends it.",
    lead: "Usually, yes. A tech closes a ticket and the desk prices it from your price book and drafts the invoice. Your office sends it.",
    mock: {
      desk: "Invoice Desk",
      inbox: [
        { kind: "Field app", label: "Tech's ticket: no cooling, capacitor replaced" },
        { kind: "Photo", label: "Nameplate and the old part" },
        { kind: "Spreadsheet", label: "Price book 2026.xlsx" },
        { kind: "QuickBooks", label: "Your QuickBooks" },
      ],
      work: [
        { label: "Read the ticket, notes and photos", time: "0:09" },
        { label: "Priced labor and parts from your price book", time: "0:14" },
        { label: "Checked the customer's service agreement", time: "0:06" },
        { label: "Applied the member discount", time: "0:03" },
        { label: "Drafted the invoice in QuickBooks", time: "0:17" },
        { label: "Logged the part for warranty", time: "0:04" },
      ],
      out: {
        title: "Invoice: no-cooling call",
        lines: ["Labor and parts from your price book", "Service agreement discount applied", "Part logged for warranty"],
        stamp: "Waiting on the office",
        action: "Send",
      },
      meter: [
        { n: "360", label: "tickets invoiced" },
        { n: "30", label: "office hours back" },
        { n: "$926", label: "of payroll not spent" },
      ],
      meterNote: "Sample shop: 360 tickets a month at 5 minutes each, at the BLS median admin wage loaded for benefits. Your numbers go in on the call.",
      total: "0:53",
      before: { src: "/brand/stills/hvac.jpg", alt: "", title: "Today: the same ticket, by hand.", line: "The tech's notes, the price book, the agreement, QuickBooks. 360 times a month.", hand: "5:00" },
    },
    job: {
      title: "One ticket, start to finish.",
      intro: "",
      steps: [
        { title: "Reads the ticket, notes and photos." },
        { title: "Prices labor and parts from your price book." },
        { title: "Applies the customer's service agreement." },
        { title: "Drafts the invoice in QuickBooks." },
        { title: "Logs warranty parts. Your office sends it." },
      ],
    },
    stops: {
      title: "Where it stops.",
      intro: "These stay with a person, every time.",
      items: ["Sending the invoice.", "A price it can't find. It says so, never guesses.", "The customer and the tech."],
    },
    math: {
      intro: "",
      hire: { amount: "$47,540", unit: "a year, before benefits", title: "The next office hire", points: ["Every year they stay", "Weeks to learn your price book", "Out sick in the first heat wave"] },
      desk: { amount: "$1,500", unit: "a month, to start", title: "The Invoice Desk", points: ["Plus a one-time setup", "Runs nights and weekends", "Your data, exportable any day"] },
      source: WAGE,
    },
    review: {
      intro: "60 to 90 minutes, in your office or on a screen share.",
      steps: [{ title: "Show us how a ticket becomes an invoice." }, { title: "Get a proposal in your numbers." }, { title: "Decide. It's good for 14 days." }],
      proof: "The ticket above is a sample. Client names and hours go here when owners say yes.",
    },
  },
];

export function industryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
