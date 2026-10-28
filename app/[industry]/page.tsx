import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Sheet } from "@/components/site/Sheet";
import { PhotoHero } from "@/components/site/PhotoHero";
import { Figures, ReviewSection, SectionHead, Steps, Strip } from "@/components/site/Bits";
import { home, site, stills } from "@/content/site";
import { industries, industryBySlug } from "@/content/industries";

/** One question page per industry, from content/industries.ts. */
export const dynamicParams = false;
export function generateStaticParams() {
  return industries.map((industry) => ({ industry: industry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ industry: string }> }): Promise<Metadata> {
  const { industry: slug } = await params;
  const industry = industryBySlug(slug);
  if (!industry) return {};
  return {
    title: industry.question,
    description: industry.description,
    alternates: { canonical: `/${industry.slug}` },
    openGraph: { title: `${industry.question} — ${site.name}`, description: industry.description, url: `/${industry.slug}` },
    twitter: { title: `${industry.question} — ${site.name}`, description: industry.description },
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ industry: string }> }) {
  const { industry: slug } = await params;
  const industry = industryBySlug(slug);
  if (!industry) notFound();
  const still = stills[industry.slug as keyof typeof stills] ?? stills.home;
  const after = stills[`${industry.slug}After` as keyof typeof stills];

  return (
    <div className="ub">
      <Header />
      <main id="top" tabIndex={-1}>
        <PhotoHero
          eyebrow={`${industry.trade}: ${industry.desk}`}
          headlineBefore={industry.question}
          lead={industry.lead}
          primary="Book a free review"
          secondary={{ label: "Watch one job run", href: "#job" }}
          before={still}
          after={after}
          caption="Photograph: sample paperwork. Nothing here is a client's."
        />

        <section id="job">
          <div className="wrap">
            <SectionHead title={industry.job.title} intro={industry.job.intro} />
            <div className="proof-grid">
              <div className="ticket-col">
                <Sheet {...industry.sheet} approveHref="/review" />
              </div>
              <Strip items={industry.strip} stack />
            </div>
            <div style={{ marginTop: 56 }}>
              <Steps steps={industry.job.steps} />
            </div>
          </div>
        </section>

        <section id="stops" className="dark">
          <div className="wrap">
            <SectionHead title={industry.stops.title} intro={industry.stops.intro} gap={48} />
            <div className="qs">
              {industry.stops.items.map((item) => (
                <div className="q-row" key={item}>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="break" aria-hidden>
          <Image src={still.src} alt="" fill sizes="100vw" style={{ objectPosition: "80% 100%" }} />
        </div>

        <section id="math">
          <div className="wrap">
            <SectionHead title={home.math.title} intro={industry.math.intro} />
            <Figures hire={industry.math.hire} desk={industry.math.desk} source={industry.math.source} />
          </div>
        </section>

        <ReviewSection
          title={home.review.title}
          intro={industry.review.intro}
          steps={industry.review.steps}
          cta={home.review.cta}
          proofTitle={home.review.proofTitle}
          proof={industry.review.proof}
        />
      </main>
      <Footer />
    </div>
  );
}
