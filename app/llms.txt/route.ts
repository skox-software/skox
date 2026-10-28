import { home, site } from "@/content/site";
import { industries } from "@/content/industries";

/*
 * /llms.txt: a plain-text summary for AI assistants and answer engines
 * (llmstxt.org), built from the same content as the pages so it can't drift.
 */
export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "UnBusy builds and runs desks for owner-run firms of 5 to 50 people. A desk collects documents and data from the systems the office already uses, reads them against the firm's own rules, prepares the quote, filing, packet or work order as a finished draft, and stops at a person's decision. It is priced as a fixed monthly fee against the hire it replaces, with a one-time setup fee. The client's data and rulebook are theirs and exportable at any time. Every engagement starts with a free operations review.",
    "",
    "## Question pages",
    "",
    ...industries.map((i) => `- [${i.question}](${site.url}/${i.slug}): ${i.description}`),
    "",
    "## How a desk works",
    "",
    ...home.how.parts.map((p) => `- **${p.title}** (${p.who}): ${p.body}`),
    "",
    "## Contact",
    "",
    `- Free operations review: ${site.url}/review`,
    `- Email: ${site.email}`,
    `- Privacy: ${site.url}/privacy`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
