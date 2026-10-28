import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { industries } from "@/content/industries";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...industries.map((industry) => ({
      url: `${site.url}/${industry.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: `${site.url}/review`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
