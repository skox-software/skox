import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { DeskMockup } from "@/components/site/DeskMockup";
import Link from "next/link";
import { Figures, ReviewSection, SectionHead, Steps } from "@/components/site/Bits";
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

  return (
    <div className="ub">
      <Header />
      <main id="top" tabIndex={-1}>
        <div className="mock-hero">
          <span className="hero-stroke" aria-hidden />
          <div className="wrap grid">
            <div className="c1-5">
              <div className="inner">
                <p className="q">
                  {industry.trade}: {industry.desk}
                </p>
                <h1>{industry.question}</h1>
                <p className="lead">{industry.lead}</p>
                <div className="actions">
                  <Link className="btn paper" href="/review" data-cta="hero">
                    Book a free review <span className="dot" />
                  </Link>
                  <Link className="link" href="#job">
                    See the whole job
                  </Link>
                </div>
              </div>
            </div>
            <div className="c6-12">
              <DeskMockup mock={industry.mock} />
            </div>
          </div>
        </div>

        <section id="job">
          <div className="wrap">
            <SectionHead title={industry.job.title} gap={40} />
            <Steps steps={industry.job.steps} />
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
            <SectionHead title={home.math.title} gap={40} />
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
