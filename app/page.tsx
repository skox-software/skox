import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Sheet } from "@/components/site/Sheet";
import { Figures, ReviewSection, SectionHead, Strike, Strip } from "@/components/site/Bits";
import { home, quoteDeskJob } from "@/content/site";
import { industries } from "@/content/industries";

export const metadata = { alternates: { canonical: "/" } };

export default function Home() {
  const { hero, how, math } = home;
  return (
    <div className="ub">
      <Header />
      <main id="top" tabIndex={-1}>
        <div className="hero on-blue">
          <div className="wrap grid">
            <div className="c1-5">
              <p className="q enter">{hero.eyebrow}</p>
              <h1 className="enter">
                {hero.headlineBefore} <Strike>{hero.struck}</Strike> {hero.headlineAfter}
              </h1>
              <p className="lead enter d1">{hero.lead}</p>
              <div className="actions enter d2">
                <Link className="btn paper" href="/review" data-cta="hero">
                  {hero.primary} <span className="dot" />
                </Link>
                <Link className="link" href="/review" data-cta="hero-secondary">
                  {hero.secondary}
                </Link>
              </div>
            </div>
            <div className="c6-12 stack enter d2">
              <div className="behind two" />
              <div className="behind" />
              <Sheet {...quoteDeskJob} />
            </div>
          </div>
        </div>

        <Strip items={home.strip} />

        <section id="how">
          <div className="wrap">
            <SectionHead n={how.n} title={how.title} intro={how.intro} gap={64} />
            <div className="parts">
              {how.parts.map((part) => (
                <div className={"yours" in part && part.yours ? "part yours" : "part"} key={part.title}>
                  <div className="k">{part.who}</div>
                  <h3>{part.title}</h3>
                  <p>{part.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="industries" className="dark">
          <div className="wrap">
            <SectionHead n={home.industries.n} title={home.industries.title} intro={home.industries.intro} gap={48} />
            <div className="qs">
              {industries.map((industry) => (
                <Link href={`/${industry.slug}`} key={industry.slug}>
                  <span className="t">{industry.trade}</span>
                  <span>{industry.question}</span>
                  <span className="arrow" aria-hidden>
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="math">
          <div className="wrap">
            <SectionHead n={math.n} title={math.title} intro={math.intro} />
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

        <ReviewSection {...home.review} />
      </main>
      <Footer />
    </div>
  );
}
