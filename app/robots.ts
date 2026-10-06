import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // /concepts holds private, unapproved client mockups. They also carry
    // per-page noindex metadata; this keeps them out of crawls entirely.
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/scope-received", "/concepts/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
