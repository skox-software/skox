import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Sheet } from "@/components/site/Sheet";
import { DeskMockup } from "@/components/site/DeskMockup";
import { Figures, ReviewSection, SectionHead, Strike, Strip } from "@/components/site/Bits";
import { home, quoteDeskJob, quoteDeskMock, stills, wall } from "@/content/site";

export const metadata = { alternates: { canonical: "/" } };

export default function Home() {
  const { hero, how, math } = home;
  return (
    <div className="ub">
      <Header />
      <main id="top" tabIndex={-1}>
        <div className="mock-hero">
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
                  <Link className="link" href="/review" data-cta="hero-secondary">
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

        <section id="cost">
          <div className="wrap">
            <SectionHead title={home.cost.title} intro={home.cost.intro} />
            <p className="sample-line">{home.cost.sample}</p>
            <div className="cost-ledger">
              {[home.cost.before, home.cost.after].map((col, i) => (
                <div className={i ? "col desk" : "col"} key={col.label}>
                  <h3>{col.label}</h3>
                  {col.lines.map((line) => (
                    <div className="line" key={line.k}>
                      <span className="k">{line.k}</span>
                      <span className="v">{line.v}</span>
                      {"note" in line && line.note && <span className="note">{line.note}</span>}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <p className="small source">{home.cost.foot}</p>
            <div style={{ marginTop: 28 }}>
              <Link className="btn blue" href="/review" data-cta="cost">
                {home.cost.cta} <span className="dot" />
              </Link>
            </div>
          </div>
        </section>

        <section id="proof" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <SectionHead title={home.proof.title} intro={home.proof.intro} />
            <div className="proof-grid">
              <div className="ticket-col">
                <Sheet {...quoteDeskJob} />
              </div>
              <Strip items={home.strip} stack />
            </div>
          </div>
        </section>

        <section id="how" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <SectionHead title={how.title} intro={how.intro} gap={64} />
            <div className="parts-split">
              <div className="ledger-parts">
                {how.parts.filter((part) => !("yours" in part && part.yours)).map((part, i) => (
                  <div className="row" key={part.title}>
                    <div className="i">{String(i + 1).padStart(2, "0")}</div>
                    <div>
                      <h3>{part.title}</h3>
                      <p>{part.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              {how.parts.filter((part) => "yours" in part && part.yours).map((part) => (
                <div className="yours-panel" key={part.title}>
                  <div className="k">{part.who}</div>
                  <h3>{part.title}</h3>
                  <p>{part.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="industries" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <SectionHead title={home.industries.title} intro={home.industries.intro} gap={48} />
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
                  {!tile.live && <span className="soon">Starts with the review.</span>}
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
            <SectionHead title={math.title} intro={math.intro} />
            <div className="ladder">
              {math.ladder.map((rung, i) => (
                <div className={rung.struck ? "r" : "r desk"} key={rung.title}>
                  <div className="i">{String(i + 1).padStart(2, "0")}</div>
                  <div>
                    <h3>{rung.struck ? <Strike now>{rung.title}</Strike> : rung.title}</h3>
                    <p>{rung.body}</p>
                  </div>
                  <div className="tag">{rung.tag}</div>
                </div>
              ))}
            </div>
            <Figures hire={math.hire} desk={math.desk} source={math.source} />
          </div>
        </section>

        <ReviewSection title={home.review.title} intro={home.review.intro} steps={home.review.steps} cta={home.review.cta} proofTitle={home.review.proofTitle} proof={home.review.proof} />
      </main>
      <Footer />
    </div>
  );
}
