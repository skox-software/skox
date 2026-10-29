import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ParticleHero } from "@/components/site/ParticleHero";
import { Chapters } from "@/components/site/Chapters";
import { HowDesk } from "@/components/site/HowDesk";
import { Figures, ReviewSection, SectionHead, Strike } from "@/components/site/Bits";
import { home, stills, wall } from "@/content/site";

const CHAPTERS = [
  { id: "start", label: "Start" },
  { id: "now", label: "Why now" },
  { id: "offer", label: "What we do" },
  { id: "how", label: "How it works" },
  { id: "work", label: "Our work" },
  { id: "industries", label: "Trades" },
  { id: "math", label: "Hire vs. desk" },
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
                <p className="q">{hero.eyebrow}</p>
                <h1>
                  {hero.headlineBefore} <Strike>{hero.struck}</Strike> {hero.headlineAfter}
                </h1>
                <p className="lead">{hero.lead}</p>
                <div className="actions">
                  <Link className="btn paper" href="/review" data-cta="hero">
                    {hero.primary} <span className="dot" />
                  </Link>
                  <Link className="link" href="#offer" data-cta="hero-secondary">
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

        <section id="now">
          <div className="wrap">
            <SectionHead title={home.now.title} gap={40} />
            <div className="facts three">
              {home.now.facts.map((fact) => (
                <div className="fact" key={fact.n + fact.src}>
                  <b className="num">{fact.n}</b>
                  <p>{fact.line}</p>
                  <span className="src">{fact.src}</span>
                </div>
              ))}
            </div>
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
            <ul className="desk-chips">
              {home.offer.desks.map((d) => (
                <li key={d.desk}>
                  <b>{d.desk}</b>
                  <span>{d.trade}</span>
                </li>
              ))}
            </ul>
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
            <ul className="work-list">
              {home.work.items.map((item) => (
                <li key={item.who}>
                  <span className={item.status === "In testing" ? "w-status testing" : "w-status"}>
                    <span className="w-dot" aria-hidden /> {item.status}
                  </span>
                  <h3>{item.who}</h3>
                  <p>{item.what}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="industries">
          <div className="wrap">
            <SectionHead title={home.industries.title} gap={40} />
            <div className="wall">
              {wall.map((tile) => (
                <Link
                  href={tile.live ? `/${tile.slug}` : `/review?industry=${encodeURIComponent(tile.trade)}`}
                  key={tile.slug}
                  className={tile.live ? "live" : undefined}
                  data-cta={tile.live ? "wall-page" : "wall-review"}
                >
                  <span className="pic">
                    <Image src={tile.src} alt={`${tile.trade}: the paperwork, on a blue surface.`} fill sizes="(max-width: 600px) 100vw, (max-width: 980px) 50vw, 33vw" />
                  </span>
                  <span className="trade">{tile.trade}</span>
                  <span className="qq">{tile.question}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <div className="break" aria-hidden>
          <Image src={stills.surveying.src} alt="" fill sizes="100vw" style={{ objectPosition: "80% 100%" }} />
        </div>

        <section id="math">
          <div className="wrap">
            <SectionHead title={math.title} intro={math.intro} gap={40} />
            <Figures hire={math.hire} desk={math.desk} source={math.source} />
          </div>
        </section>

        <ReviewSection title={home.review.title} intro={home.review.intro} steps={home.review.steps} cta={home.review.cta} proofTitle={home.review.proofTitle} proof={home.review.proof} />
      </main>
      <Footer />
    </div>
  );
}
