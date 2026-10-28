import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Sheet } from "@/components/site/Sheet";
import { Figures, ReviewSection, SectionHead, Steps, Strip } from "@/components/site/Bits";
import { home, site } from "@/content/site";
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

  return (
    <div className="ub">
      <Header />
      <main id="top" tabIndex={-1}>
        <div className="hero inner on-blue">
          <div className="wrap grid tight">
            <div className="c1-5 pad">
              <p className="t enter">
                {industry.trade} · {industry.desk}
              </p>
              <h1 className="enter">{industry.question}</h1>
              <p className="lead enter d1">{industry.lead}</p>
              <div className="actions enter d2">
                <Link className="btn paper" href="/review" data-cta="hero">
                  Book a free review <span className="dot" />
                </Link>
                <Link className="link" href="#job">
                  Watch one job run
                </Link>
              </div>
            </div>
            <div className="c6-12 stack enter d2">
              <div className="behind two" />
              <div className="behind" />
              <Sheet {...industry.sheet} approveHref="/review" />
            </div>
          </div>
        </div>

        <Strip items={industry.strip} />

        <section id="job">
          <div className="wrap">
            <SectionHead n="01" title={industry.job.title} intro={industry.job.intro} />
            <Steps steps={industry.job.steps} />
          </div>
        </section>

        <section id="stops" className="dark">
          <div className="wrap">
            <SectionHead n="02" title={industry.stops.title} intro={industry.stops.intro} gap={48} />
            <div className="qs">
              {industry.stops.items.map((item, i) => (
                <div className="q-row" key={item}>
                  <span className="t">{String(i + 1).padStart(2, "0")}</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="math">
          <div className="wrap">
            <SectionHead n="03" title={home.math.title} intro={industry.math.intro} />
            <Figures hire={industry.math.hire} desk={industry.math.desk} source={industry.math.source} />
          </div>
        </section>

        <ReviewSection
          n="04"
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
