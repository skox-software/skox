import { builds, type BuildType } from "@/content/landing";

/**
 * Reads a free-text brief and picks the build it most resembles.
 *
 * Deliberately a keyword count and nothing cleverer: the hero readout it feeds
 * shows only figures already published in `content/landing.ts`, so a wrong
 * guess costs the visitor a glance, never a false promise. Anything below the
 * confidence floor returns null and the readout stays shut.
 */

const SIGNALS: Record<BuildType, string[]> = {
  websites: [
    "website", "web site", "site", "landing", "landing page", "homepage",
    "home page", "brochure", "marketing", "rebrand", "redesign", "wordpress",
    "squarespace", "wix", "seo", "blog", "portfolio", "clinic", "salon",
    "restaurant", "gym", "studio", "shop front", "storefront",
  ],
  "web-apps": [
    "app", "web app", "webapp", "portal", "customer portal", "client portal",
    "internal tool", "tool", "platform", "product", "saas", "marketplace",
    "booking system", "scheduling", "crm", "login", "accounts", "sign up",
    "payments", "stripe", "checkout", "subscription", "workflow", "automate",
    "automation", "integration", "api", "mvp", "prototype",
  ],
  dashboards: [
    "dashboard", "report", "reporting", "reports", "metrics", "analytics",
    "kpi", "kpis", "data", "numbers", "spreadsheet", "spreadsheets", "excel",
    "google sheet", "sheets", "chart", "charts", "insight", "insights",
    "command center", "command centre", "locations", "branches", "stores",
    "revenue", "performance", "visibility", "track", "tracking",
  ],
};

export type ScopeReading = {
  build: (typeof builds)[number];
  /** Matched terms, most specific first — shown back so the read is legible. */
  matched: string[];
};

export function readBrief(input: string): ScopeReading | null {
  const brief = input.toLowerCase();
  if (brief.trim().length < 4) return null;

  let best: { id: BuildType; score: number; matched: string[] } | null = null;

  for (const id of Object.keys(SIGNALS) as BuildType[]) {
    const matched: string[] = [];
    let score = 0;
    for (const term of SIGNALS[id]) {
      if (!brief.includes(term)) continue;
      matched.push(term);
      // Multi-word phrases are far less likely to be coincidence than a bare
      // noun, so they carry the decision.
      score += term.includes(" ") ? 3 : 1;
    }
    if (!best || score > best.score) {
      best = { id, score, matched: matched.sort((a, b) => b.length - a.length) };
    }
  }

  if (!best || best.score === 0) return null;

  const build = builds.find((item) => item.id === best!.id)!;
  return { build, matched: best.matched.slice(0, 2) };
}
