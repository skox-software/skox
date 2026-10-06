import { landing, landingFaq } from "@/content/landing";
import { site } from "@/content/site";
import { topics } from "@/content/topics";

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
    "SKOX is an independent software studio run by its two founders, " +
      landing.founders.map((f) => `${f.name} (${f.role.replace(/^Co-founder · /, "")})`).join(" and ") +
      ". Every build has a written scope, a fixed price and a delivery date agreed before the client pays. Clients own the code and accounts.",
    "",
    "## What we build",
    "",
    ...topics.map((t) => `- [${t.keyword}](${site.url}/${t.slug}): ${t.description}`),
    "",
    "## Questions",
    "",
    ...landingFaq.map((f) => `- **${f.q}** ${f.a}`),
    "",
    "## Contact",
    "",
    `- Free 30-minute scope call: ${site.url}/#scope`,
    `- Email: ${site.email}`,
    `- Privacy: ${site.url}/privacy`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
