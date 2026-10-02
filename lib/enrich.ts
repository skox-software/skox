/**
 * Company behind a lead's email domain, from Apollo.
 *
 * Off until APOLLO_API_KEY is set. Personal addresses (gmail and the like) are
 * skipped: they name no company, and an enrichment call would only spend a
 * credit to learn that. Never blocks a lead — any failure returns undefined.
 */
export type Company = {
  name?: string;
  domain: string;
  industry?: string;
  employees?: number;
  revenue?: string;
  founded?: number;
  location?: string;
  linkedin?: string;
  description?: string;
  keywords?: string[];
};

const PERSONAL = new Set([
  "gmail.com", "googlemail.com", "yahoo.com", "hotmail.com", "outlook.com", "live.com",
  "msn.com", "icloud.com", "me.com", "mac.com", "aol.com", "proton.me", "protonmail.com",
  "gmx.com", "ymail.com", "comcast.net", "att.net", "verizon.net", "sbcglobal.net",
  "bellsouth.net", "cox.net", "charter.net", "mail.com", "zoho.com", "hey.com",
]);

export function companyDomain(email: string): string | undefined {
  const domain = email.split("@")[1]?.trim().toLowerCase();
  if (!domain || PERSONAL.has(domain)) return undefined;
  return domain;
}

export async function enrichCompany(email: string): Promise<Company | undefined> {
  const key = process.env.APOLLO_API_KEY;
  const domain = companyDomain(email);
  if (!key || !domain) return undefined;
  try {
    const res = await fetch(
      `https://api.apollo.io/api/v1/organizations/enrich?domain=${encodeURIComponent(domain)}`,
      {
        headers: { "x-api-key": key, Accept: "application/json" },
        signal: AbortSignal.timeout(4000),
      },
    );
    if (!res.ok) return undefined;
    const o = (await res.json())?.organization;
    if (!o) return undefined;
    return {
      domain,
      name: o.name ?? undefined,
      industry: o.industry ?? undefined,
      employees: o.estimated_num_employees ?? undefined,
      revenue: o.annual_revenue_printed ?? undefined,
      founded: o.founded_year ?? undefined,
      location: [o.city, o.state, o.country].filter(Boolean).join(", ") || undefined,
      linkedin: o.linkedin_url ?? undefined,
      description: o.short_description ? String(o.short_description).slice(0, 400) : undefined,
      keywords: Array.isArray(o.keywords) ? o.keywords.slice(0, 8) : undefined,
    };
  } catch {
    return undefined;
  }
}

export function formatCompany(c: Company | undefined, email: string): string {
  if (!c) {
    const domain = companyDomain(email);
    return domain ? "" : "\n\nCompany:\n  personal email address, no company to look up";
  }
  const lines = [
    `  ${c.name ?? c.domain} (${c.domain})`,
    c.industry && `  industry: ${c.industry}`,
    c.employees && `  employees: ~${c.employees}`,
    c.revenue && `  revenue: ${c.revenue}`,
    c.location && `  based in: ${c.location}`,
    c.founded && `  founded: ${c.founded}`,
    c.linkedin && `  linkedin: ${c.linkedin}`,
    c.description && `  about: ${c.description}`,
  ].filter(Boolean);
  return `\n\nCompany (Apollo):\n${lines.join("\n")}`;
}
