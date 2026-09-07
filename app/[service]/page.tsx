import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/components/LandingPage";
import { builds } from "@/content/landing";

export const dynamicParams = false;
export function generateStaticParams() {
  return builds.map((build) => ({ service: build.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service } = await params;
  const build = builds.find((item) => item.id === service);
  if (!build) return {};
  return {
    title: `Custom ${build.label.toLowerCase()}, built at speed`,
    description: build.intro,
    alternates: { canonical: `/${service}` },
    openGraph: {
      title: `SKOX — ${build.headline} ${build.accent}`,
      description: build.intro,
      url: `/${service}`,
    },
    twitter: {
      title: `SKOX — ${build.headline} ${build.accent}`,
      description: build.intro,
    },
  };
}
export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const build = builds.find((item) => item.id === service);
  if (!build) notFound();
  return <LandingPage variant={build.id} />;
}
