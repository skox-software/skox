import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/components/LandingPage";
import { site } from "@/content/site";
import { topicBySlug, topics } from "@/content/topics";

export const dynamicParams = false;
export function generateStaticParams() {
  return topics.map((topic) => ({ service: topic.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service } = await params;
  const topic = topicBySlug(service);
  if (!topic) return {};
  return {
    title: topic.title,
    description: topic.description,
    alternates: { canonical: `/${topic.slug}` },
    openGraph: {
      title: `${topic.keyword} — SKOX`,
      description: topic.description,
      url: `/${topic.slug}`,
    },
    twitter: {
      title: `${topic.keyword} — SKOX`,
      description: topic.description,
    },
  };
}
export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const topic = topicBySlug(service);
  if (!topic) notFound();
  const url = `${site.url}/${topic.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: topic.keyword,
        serviceType: topic.serviceType,
        description: topic.description,
        url,
        provider: { "@id": `${site.url}/#organization` },
        areaServed: { "@type": "Country", name: "United States" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: site.name, item: site.url },
          { "@type": "ListItem", position: 2, name: topic.name, item: url },
        ],
      },
    ],
  };
  return (
    <>
      <LandingPage topic={topic} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
