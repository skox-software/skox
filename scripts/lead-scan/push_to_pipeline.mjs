// Adds verified old-site leads to the SKOX portal pipeline, owned by Reiss.
// Deals there also show on the portal's Clients list, so this one step puts
// a lead in both places.
//
//   node scripts/lead-scan/push_to_pipeline.mjs docs/prospects/<file>.csv           # dry run
//   node scripts/lead-scan/push_to_pipeline.mjs docs/prospects/<file>.csv --apply   # write
//   node scripts/lead-scan/push_to_pipeline.mjs docs/prospects/<file>.csv --refresh-notes   # rewrite notes on deals already added
//
// A row goes in only when it is verified:
//   - site_status is ancient, dead or none, and site_evidence says why;
//   - "none" rows also need site_check, recording that a web search found no
//     site (a Maps listing without a link is not proof: see The Alcime Group);
//   - phone is set and contact_source says where it was confirmed
//     (the business's own site, Google Maps, BBB or a chamber listing).
// Rows already in the pipeline or on the client list (same company or email)
// are skipped. Uses DATABASE_URL from ~/skox-portal/.env.local.

import { createRequire } from "node:module";
import { readFileSync } from "node:fs";

const PORTAL = "/Users/josh/skox-portal";
const WORKSPACE = "bdefd952-a3bc-45d2-a0a1-65374fd9dc72";
const CREATED_BY = "00349f27-fbc2-47d1-8993-c1f65080e12a"; // founders@skoxsoftware.com
const OWNER = "reiss@skoxsoftware.com";

const [file, flag] = process.argv.slice(2);
if (!file) {
  console.error("Usage: node scripts/lead-scan/push_to_pipeline.mjs <leads.csv> [--apply]");
  process.exit(1);
}
const apply = flag === "--apply";
const refresh = flag === "--refresh-notes";

/** CSV with quoted fields and newlines inside quotes. */
function parseCsv(text) {
  const rows = [];
  let row = [], cell = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") { row.push(cell); cell = ""; }
    else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cell); cell = "";
      if (row.some((c) => c.trim())) rows.push(row);
      row = [];
    } else cell += ch;
  }
  row.push(cell);
  if (row.some((c) => c.trim())) rows.push(row);
  const [head, ...body] = rows;
  return body.map((r) => Object.fromEntries(head.map((h, i) => [h.trim(), (r[i] ?? "").trim()])));
}

const companyKey = (name) =>
  name.toLowerCase().replace(/&/g, "and").replace(/\b(llc|inc|co|corp|ltd|pllc|pa)\b\.?/g, "").replace(/[^a-z0-9]/g, "");
const cleanEmail = (v) => {
  const m = (v || "").toLowerCase().match(/[^\s@(),;]+@[^\s@(),;]+\.[a-z]{2,}/);
  return m ? m[0] : null;
};

function problems(r) {
  const out = [];
  if (!r.company) out.push("no company");
  if (!["ancient", "dead", "none"].includes(r.site_status)) out.push(`site_status "${r.site_status}"`);
  if (!r.site_evidence) out.push("no site_evidence");
  if (r.site_status === "none" && !r.site_check) out.push("no site_check (web search for a site)");
  if (!r.phone) out.push("no phone");
  if (!r.contact_source) out.push("no contact_source");
  if (/^WEAK/i.test(r.site_check || "")) out.push("marked WEAK");
  return out;
}

/** One short line Reiss can say, built from what the site check found. */
function shortOpener(r) {
  const ev = r.site_evidence || "";
  if (r.site_status === "none") return "You don't have a website, just a Google listing.";
  if (r.site_status === "dead") {
    if (/domain suspended/i.test(ev)) return "Your website domain is suspended, so the site doesn't load.";
    if (/suspend/i.test(ev)) return "Your website is down. The hosting account is suspended.";
    if (/website expired|squarespace|subscription/i.test(ev)) return "Your website plan has expired, so the site doesn't load.";
    if (/expired|parked|parking|for sale|sedo|lander|lapse/i.test(ev)) return "Your website domain has lapsed, so the site doesn't load.";
    if (/setup your menus/i.test(ev)) return "Your website looks unfinished. The menu still says \"Please Setup your Menus\".";
    if (/critical error|500/i.test(ev)) return "Your website is showing an error page instead of your site.";
    if (/not published|offline|under construction|placeholder|setup your menus|not found/i.test(ev)) return "Your website isn't live right now.";
    return "Your website doesn't load.";
  }
  if (/HACKED/.test(ev)) return "Your website has been hacked. It's showing casino spam on the homepage.";
  const noMobile = /no mobile|not mobile|doesn.t fit/i.test(ev);
  const yr = ev.match(/(?:©|copyright)[^0-9]{0,20}((?:19|20)\d\d)(?:\s*[-–]\s*((?:19|20)\d\d))?/i);
  const year = yr ? yr[2] || yr[1] : null;
  if (noMobile && year) return `Your website doesn't work on phones and still says ${year} at the bottom.`;
  if (year) return `Your website looks like it hasn't been updated since ${year}.`;
  if (noMobile) return "Your website doesn't work on phones and looks years old.";
  return "Your website is old and looks it.";
}

/** "Ted Lightman (CEO); Charles L. (Founder)" -> "Ted Lightman, CEO, or Charles L., Founder". Drops research notes. */
function askFor(dm) {
  const people = (dm || "").split(";").map((p) => p.trim()).filter(Boolean).map((p) =>
    p.replace(/\s*\(([^)]*)\)/g, (_, t) => (/not given|contact|per |via /i.test(t) ? "" : `, ${t.replace(/ per .*/i, "")}`)).trim());
  if (!people.length) return "the owner";
  // A chamber rep with a junior title isn't who decides on a website.
  const junior = /hostess|host\b|marketing|assistant|receptionist|coordinator|admin|clerk|associate|representative|specialist|office/i;
  if (people.every((p) => junior.test(p.split(",").slice(1).join(",")))) return `the owner (the chamber lists ${people.join("; ")})`;
  return people.join(", or ");
}

/** The site evidence in words Reiss can repeat on the call. */
function plainWhy(r) {
  const ev = r.site_evidence || "";
  if (r.site_status !== "ancient") return ev.replace(/\s*hand-checked.*$/i, "").replace(/\.?\s*$/, ".");
  const out = [];
  const hacked = ev.match(/HACKED: ([^;]*\))/);
  if (hacked) out.push(`the site has been hacked: ${hacked[1]}`);
  if (/no mobile|not mobile|doesn.t fit/i.test(ev)) out.push("the site doesn't fit a phone screen (no mobile layout)");
  const yr = ev.match(/(?:©|copyright)[^0-9]{0,20}((?:19|20)\d\d)(?:\s*[-–]\s*((?:19|20)\d\d))?/i);
  if (yr) out.push(`the footer still says © ${yr[2] || yr[1]}`);
  const b = ev.match(/built with ([^;.]+)/i);
  if (b) out.push(`it was made with ${b[1].replace(/Starfield Technologies;\s*/i, "").trim()}, an old site builder`);
  if (/layout tables|table layout|tables/i.test(ev)) out.push("the page is laid out with old-style tables");
  if (/<font>|font tags/i.test(ev)) out.push("the text is styled with old <font> tags");
  if (/frames/i.test(ev)) out.push("it uses frames, a 1990s technique");
  if (/flash/i.test(ev)) out.push("it still uses Flash, which browsers no longer run");
  if (/pdf/i.test(ev)) out.push("listings are PDFs");
  const s = out.length ? out.join("; ") : ev;
  return s.charAt(0).toUpperCase() + s.slice(1) + ".";
}

const titleCase = (t) => (t === t.toUpperCase() ? t.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()) : t);

function about(r) {
  const parts = [];
  if (r.industry) parts.push(titleCase(r.industry));
  const loc = [r.city, r.state].filter(Boolean).join(", ");
  if (loc) parts.push(loc);
  let s = parts.join(" in ");
  const be = (r.business_evidence || "").replace(/\s*\(listing checked [^)]*\)/, "")
    .replace(/;?\s*listed as [^;]*/i, "").replace(/;?\s*Hot Deals? Participant/gi, "")
    .replace(/Current member of the (\S+) chamber directory/, "Current member of the local chamber of commerce ($1)");
  if (be) s += `${s ? ". " : ""}${be}`;
  return s.replace(/\.?\s*$/, ".");
}

function toDeal(r) {
  const contact = (r.decision_maker || "").split(";")[0].replace(/\s*\(.*\)\s*$/, "").trim();
  // Everything Reiss needs on one screen: who, what to say, why, who they are, how to reach them.
  const email = cleanEmail(r.email);
  const lines = [
    `ASK FOR: ${askFor(r.decision_maker)}`,
    `OPENER: ${r.opener || shortOpener(r)}`,
    `WHY WE'RE CALLING: ${plainWhy(r)}`,
    `ABOUT THEM: ${about(r)}`,
    `CALL: ${r.phone}${r.contact_source ? ` (number confirmed on ${r.contact_source.split(";")[0].replace(/\s*\(match\)/, "")})` : ""}` +
      `${email ? ` · EMAIL: ${email}` : ""}${r.website ? ` · SITE: ${r.website}` : ""}`,
  ];
  return {
    company: r.company.slice(0, 120),
    contactName: contact && !/^(ask|owner|unknown|n\/?a|-)/i.test(contact) ? contact.slice(0, 120) : null,
    contactEmail: cleanEmail(r.email),
    phone: r.phone.slice(0, 40),
    website: r.website || null,
    industry: r.industry || null,
    location: [r.city, r.state].filter(Boolean).join(", ") || null,
    notes: lines.join("\n").slice(0, 4000),
  };
}

const require = createRequire(`${PORTAL}/package.json`);
const { neon } = require("@neondatabase/serverless");
const url = readFileSync(`${PORTAL}/.env.local`, "utf8").match(/^DATABASE_URL=(.*)$/m)[1].replace(/^["']|["']$/g, "");
const sql = neon(url);

const rows = parseCsv(readFileSync(file, "utf8"));
const existing = [
  ...(await sql`select company, contact_email as email from deals where workspace_id = ${WORKSPACE}`),
  ...(await sql`select name as company, null as email from clients where workspace_id = ${WORKSPACE}`),
];
const seen = new Set(existing.map((e) => companyKey(e.company)));
const emails = new Set(existing.map((e) => e.email).filter(Boolean));
const phoneKey = (p) => (p || "").replace(/\D/g, "").slice(-10);
const phones = new Set((await sql`select phone from deals where workspace_id = ${WORKSPACE}`).map((d) => phoneKey(d.phone)).filter(Boolean));

if (refresh) {
  // Rewrite the notes (and fill a missing contact) on deals already imported from this CSV.
  const deals = await sql`select id, company from deals where workspace_id = ${WORKSPACE} and owner_email = ${OWNER}`;
  const byKey = new Map(deals.map((d) => [companyKey(d.company), d.id]));
  let n = 0;
  for (const r of rows) {
    const id = byKey.get(companyKey(r.company || ""));
    if (!id || problems(r).length) continue;
    const d = toDeal(r);
    await sql`update deals set notes = ${d.notes}, phone = ${d.phone},
      contact_name = coalesce(contact_name, ${d.contactName}) where id = ${id}`;
    console.log(`  notes  ${d.company}: ${d.notes.replace(/\n/g, " | ")}`);
    n++;
  }
  console.log(`\nRefreshed notes on ${n} deals.`);
  process.exit(0);
}

const fresh = [], skipped = [];
for (const r of rows) {
  const why = problems(r);
  if (why.length) { skipped.push(`${r.company || "(no name)"}: ${why.join(", ")}`); continue; }
  const deal = toDeal(r);
  if (seen.has(companyKey(deal.company)) || (deal.contactEmail && emails.has(deal.contactEmail)) ||
      (phoneKey(deal.phone) && phones.has(phoneKey(deal.phone)))) {
    skipped.push(`${deal.company}: already in the pipeline or a client`);
    continue;
  }
  seen.add(companyKey(deal.company));
  phones.add(phoneKey(deal.phone));
  fresh.push(deal);
}

console.log(`${fresh.length} to add, ${skipped.length} skipped.`);
for (const s of skipped) console.log(`  skip  ${s}`);
for (const d of fresh) console.log(`  add   ${d.company} · ${d.phone}`);

if (!apply) {
  console.log("\nDry run. Add --apply to write these to the pipeline.");
} else if (fresh.length) {
  await sql.transaction([
    ...fresh.map((d) => sql`insert into deals (workspace_id, company, contact_name, contact_email, phone, website, kind, stage,
        owner_email, source, notes, industry, location, lead_source, created_by)
      values (${WORKSPACE}, ${d.company}, ${d.contactName}, ${d.contactEmail}, ${d.phone}, ${d.website}, 'website', 'lead',
        ${OWNER}, 'import', ${d.notes}, ${d.industry}, ${d.location}, 'Cold outbound', ${CREATED_BY})`),
    sql`insert into events (workspace_id, actor_id, verb, subject_type, payload)
      values (${WORKSPACE}, ${CREATED_BY}, 'deal.imported', 'deal',
        ${JSON.stringify({ added: fresh.length, duplicates: 0, skipped: skipped.length, stage: "lead" })}::jsonb)`,
  ]);
  console.log(`\nAdded ${fresh.length} to the pipeline (owner ${OWNER}). They also show on Clients.`);
}
