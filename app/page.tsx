import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { DeskMockup } from "@/components/site/DeskMockup";
import { Figures, ReviewSection, SectionHead, Strike } from "@/components/site/Bits";
import { home, quoteDeskMock, stills, wall } from "@/content/site";

export const metadata = { alternates: { canonical: "/" } };

export default function Home() {
  const { hero, how, math } = home;
  return (
    <div className="ub">
      <Header />
      <main id="top" tabIndex={-1}>
        <div className="mock-hero">
          <span className="hero-stroke" aria-hidden />
          <div className="wrap grid">
            <div className="c1-5">
              <div className="inner">
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
            </div>
            <div className="c6-12">
              <DeskMockup mock={quoteDeskMock} />
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

        <section id="offer" style={{ paddingTop: 0 }}>
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

        <section id="how" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <SectionHead title={how.title} gap={40} />
            <ol className="how-row">
              {how.parts.map((part) => (
                <li key={part.title} className={"yours" in part && part.yours ? "yours" : undefined}>
                  <span className="who">{part.who}</span>
                  <h3>{part.title}</h3>
                  <p>{part.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="industries" style={{ paddingTop: 0 }}>
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
            <SectionHead title={math.title} gap={40} />
            <Figures hire={math.hire} desk={math.desk} source={math.source} />
          </div>
        </section>

        <ReviewSection title={home.review.title} intro={home.review.intro} steps={home.review.steps} cta={home.review.cta} proofTitle={home.review.proofTitle} proof={home.review.proof} />
      </main>
      <Footer />
    </div>
  );
}
