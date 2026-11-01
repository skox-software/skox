import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ParticleHero } from "@/components/site/ParticleHero";
import { Chapters } from "@/components/site/Chapters";
import { HowDesk } from "@/components/site/HowDesk";
import { WorkCards } from "@/components/site/WorkCards";
import { SoftwarePicker } from "@/components/site/SoftwarePicker";
import { Figures, ReviewSection, SectionHead, Strike } from "@/components/site/Bits";
import { home } from "@/content/site";

const CHAPTERS = [
  { id: "start", label: "Start" },
  { id: "software", label: "Your software" },
  { id: "offer", label: "What we do" },
  { id: "how", label: "How it works" },
  { id: "work", label: "Our work" },
  { id: "math", label: "You win, we win" },
  { id: "faq", label: "Questions" },
  { id: "live", label: "Review" },
] as const;

export const metadata = { alternates: { canonical: "/" } };

export default function Home() {
  const { hero, how, math } = home;
  return (
    <div className="ub">
      <Header />
      <Chapters items={CHAPTERS} />
      <main id="top" tabIndex={-1} className="chaptered">
        <div className="stage-hero" id="start">
          <div className="stage">
            <div className="wrap grid">
              <div className="stage-copy">
                <h1>
                  {hero.headlineBefore} <Strike>{hero.struck}</Strike>
                  {hero.headlineAfter}
                </h1>
                <p className="lead">{hero.lead}</p>
                <div className="actions">
                  <Link className="btn paper" href="/review" data-cta="hero">
                    {hero.primary} <span className="dot" />
                  </Link>
                  <Link className="link" href="#software" data-cta="hero-secondary">
                    {hero.secondary}
                  </Link>
                </div>
              </div>
              <div className="stage-art">
                <ParticleHero label="A sample job: a pile of paperwork pulled apart, read, and settled into one drafted quote waiting for the owner's approval." />
              </div>
            </div>
          </div>
        </div>

        <section id="software">
          <div className="wrap">
            <SectionHead title={home.software.title} intro={home.software.intro} gap={40} />
            <SoftwarePicker items={home.software.items} cta={home.software.cta} />
          </div>
        </section>

        <section id="offer">
          <div className="wrap">
            <SectionHead title={home.offer.title} />
            <ol className="offers">
              {home.offer.steps.map((step, i) => (
                <li key={step.name}>
                  <span className="i num">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{step.name}</h3>
                  <p>{step.what}</p>
                  <span className="price">{step.price}</span>
                </li>
              ))}
            </ol>
            <h3 className="desks-title">{home.offer.desksTitle}</h3>
            <ul className="desk-lines">
              {home.offer.desks.map((d) => (
                <li key={d.desk}>
                  <Link href={`/${d.slug}`} data-cta="desk-line">
                    <b>{d.desk}:</b> {d.output}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="small desks-note">{home.offer.desksNote}</p>
          </div>
        </section>

        <section id="how">
          <div className="wrap">
            <SectionHead title={how.title} gap={40} />
            <HowDesk parts={how.parts} />
          </div>
        </section>

        <section id="work">
          <div className="wrap">
            <SectionHead title={home.work.title} intro={home.work.intro} gap={40} />
            <WorkCards items={home.work.items} />
          </div>
        </section>

        <section id="invite" className="invite">
          <div className="wrap">
            <div className="invite-band">
              <p>{home.invite.line}</p>
              <Link className="btn paper" href="/review" data-cta="invite">
                {home.invite.cta} <span className="dot" />
              </Link>
            </div>
          </div>
        </section>

        <section id="math">
          <div className="wrap">
            <SectionHead title={math.title} intro={math.intro} gap={40} />
            <Figures hire={math.hire} desk={math.desk} source={math.source} />
          </div>
        </section>

        <section id="faq">
          <div className="wrap">
            <SectionHead title={home.faq.title} gap={40} />
            <dl className="faq">
              {home.faq.items.map((item) => (
                <div key={item.q}>
                  <dt>{item.q}</dt>
                  <dd>
                    <p className="a">{item.a}</p>
                    <p className="more">{item.more}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: home.faq.items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: `${item.a} ${item.more}` } })),
              }),
            }}
          />
        </section>

        <ReviewSection title={home.review.title} intro={home.review.intro} steps={home.review.steps} cta={home.review.cta} proofTitle={home.review.proofTitle} proof={home.review.proof} />
      </main>
      <Footer />
    </div>
  );
}
