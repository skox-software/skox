import { Fragment, type CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { SkoxLogo } from "@/components/SkoxLogo";
import { BuildSection } from "@/components/BuildSection";
import { CompareSection } from "@/components/CompareSection";
import { ConversionForm } from "@/components/ConversionForm";
import { HeroComposer } from "@/components/HeroComposer";
import { HeroFragments } from "@/components/HeroFragments";
import { SiteNavigation } from "@/components/SiteNavigation";
import { HomeServices } from "@/components/HomeServices";
import { AutomationSection } from "@/components/AutomationSection";
import { LandingTracking } from "@/components/LandingTracking";
import { TopicSection } from "@/components/TopicSection";
import { builds, landing, landingFaq, type BuildType } from "@/content/landing";
import { site } from "@/content/site";
import { topics, type Topic } from "@/content/topics";
import { trades } from "@/content/trades";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

/**
 * Splits a line into per-word boxes so the headline can rise word by word.
 * Purely presentational — the words stay in reading order in the DOM, so the
 * heading is announced as one phrase.
 */
function Words({ text, offset = 0 }: { text: string; offset?: number }) {
  const words = text.split(" ");
  return words.map((word, index) => (
    <Fragment key={`${word}-${index}`}>
      <span
        className="word"
        style={{ "--i": index + offset } as CSSProperties}
      >
        <span>{word}</span>
      </span>
      {index < words.length - 1 ? " " : null}
    </Fragment>
  ));
}

/** The search phrase that opens the homepage's H1. */
const HOME_KEYWORD = "Website design, development & local SEO";

export function LandingPage({ topic }: { topic?: Topic }) {
  const variant: BuildType | undefined = topic?.build;
  const chosen = builds.find((build) => build.id === topic?.slug);
  const headline = topic?.headline || chosen?.headline || landing.headline;
  const accent = topic?.accent || chosen?.accent || landing.accent;
  const intro = topic?.intro || chosen?.intro || landing.intro;
  // A page's own questions first; the general ones still apply everywhere.
  const faq = [...(topic?.faq ?? []), ...landingFaq];
  return (
    <div className={`landing-page${topic ? "" : " homepage-warm"}`}>
      <header className="site-header">
        <div className="shell header-inner">
          <Link href="/" aria-label="SKOX home">
            <SkoxLogo className="brand-logo" />
          </Link>
          <SiteNavigation />
          <div className="header-actions">
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- The portal is a separate Next.js app and needs a full navigation. */}
            <a
              className="header-login"
              href="/portal"
              data-cta="client-login"
            >
              <span className="header-login-long">Client login</span>
              <span className="header-login-short">Log in</span>
            </a>
            <a
              className="button button-dark header-cta"
              href="#scope"
              data-cta="header"
            >
              Let’s talk <Arrow />
            </a>
          </div>
        </div>
      </header>
      <main id="top" tabIndex={-1}>
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="shell hero-stage">
            {topic && <HeroFragments />}
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="status-dot" />
                {landing.eyebrow}
              </p>
              <h1 id="hero-title">
                {/* What people search for, said plainly, ahead of the slogan. */}
                <span className="h1-keyword">{topic?.keyword ?? HOME_KEYWORD}</span>
                <Words text={headline} />
                <span className="accent">
                  <span className="accent-ink">
                    <Words text={accent} offset={headline.split(" ").length} />
                  </span>
                </span>
              </h1>
              <p className="hero-intro">{intro}</p>
              {topic && <HeroComposer />}
              <div className="hero-actions">
                <a
                  href="#scope"
                  className="button button-primary"
                  data-cta="hero"
                >
                  {topic ? landing.cta : "Get a free discovery session"}
                  <Arrow />
                </a>
                <a href={topic ? "#build" : "#home-services"} className="button button-ghost">
                  {topic ? landing.secondaryCta : "Explore our services"}
                  <span aria-hidden>↓</span>
                </a>
              </div>
              <p className="hero-reassurance">{landing.reassurance}</p>
              {topic && <div className="hero-founders">
                <div className="founder-avatars">
                  {landing.founders.map((person) => (
                    <Image
                      key={person.name}
                      src={person.photo}
                      width={40}
                      height={40}
                      alt=""
                    />
                  ))}
                </div>
                <p>
                  <strong>You work with the builders</strong>, from day one.
                </p>
              </div>}
            </div>
          </div>
        </section>
        <div className="trust-strip">
          <div className="shell trust-inner">
            {landing.trust.map((item, i) => (
              <p key={item}>
                <span className="trust-number">0{i + 1}</span>
                {item}
                <span className="trust-check" aria-hidden>
                  ✓
                </span>
              </p>
            ))}
          </div>
        </div>
        {topic && <TopicSection topic={topic} />}
        {!topic && <HomeServices />}
        {topic && <CompareSection />}
        <BuildSection variant={variant} />
        <section
          className="process-section"
          id="process"
          aria-labelledby="process-title"
        >
          <div className="shell section">
            <div className="section-heading rise">
              <div>
                <p className="eyebrow">{landing.processEyebrow}</p>
                <h2 id="process-title">{landing.processTitle}</h2>
              </div>
              <p>{landing.processSub}</p>
            </div>
            <div className="process-grid rise-stagger">
              {landing.steps.map((step) => (
                <article key={step.number}>
                  <span className="step-number">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                  <span className="step-output">
                    <span aria-hidden>↳</span>
                    {step.output}
                  </span>
                </article>
              ))}
            </div>
            <div className="process-cta rise">
              <p>A clear scope. A real date. Let’s get yours on paper.</p>
              <a href="#scope" className="text-link" data-cta="process">
                {landing.cta}
                <Arrow />
              </a>
            </div>
          </div>
        </section>
        <section
          className="about-section"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="shell section">
            <div className="section-heading rise">
              <div>
                <p className="eyebrow">{landing.teamEyebrow}</p>
                <h2 id="about-title">{landing.teamTitle}</h2>
              </div>
              <p>{landing.teamSub}</p>
            </div>
            <div className="founder-grid rise-stagger">
              {landing.founders.map((person) => (
                <article className="founder-card" key={person.name}>
                  <Image
                    src={person.photo}
                    width={280}
                    height={320}
                    sizes="(max-width: 600px) 110px, 180px"
                    alt={person.name}
                  />
                  <div>
                    <span className="micro">{person.role}</span>
                    <h3>{person.name}</h3>
                    <p>{person.bio}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="products-row rise-stagger">
              <div>
                <p className="micro">{landing.workEyebrow}</p>
                <p>{landing.workSub}</p>
              </div>
              {landing.projects.map((project) => (
                <article key={project.name}>
                  <h3>
                    {project.name}
                    <span>{project.type}</span>
                  </h3>
                  <p>{project.body}</p>
                  {project.url && (
                    <a
                      className="text-link project-link"
                      href={project.url}
                      target="_blank"
                      rel="noopener"
                      data-cta="project-link"
                    >
                      {project.url.replace(/^https?:\/\//, "")} <Arrow />
                    </a>
                  )}
                </article>
              ))}
              <a
                className="pipeline-strip"
                href="#scope"
                data-cta="pipeline"
              >
                <span className="pipeline-dot" aria-hidden="true" />
                <span>
                  <strong>{landing.pipeline.count}</strong>{" "}
                  {landing.pipeline.label}
                </span>
                <span className="pipeline-cta">
                  {landing.pipeline.cta} <Arrow />
                </span>
              </a>
            </div>
          </div>
        </section>
        <section
          className="section shell faq-section"
          id="faq"
          aria-labelledby="faq-title"
        >
          <div>
            <p className="eyebrow">{landing.faqEyebrow}</p>
            <h2 id="faq-title">{landing.faqTitle}</h2>
            <p className="faq-contact">
              Something else on your mind?
              <br />
              <a className="text-link" href="#scope" data-cta="faq">
                Ask us directly
                <Arrow />
              </a>
            </p>
          </div>
          <div className="faq-list rise">
            {faq.map((item, i) => (
              <details key={item.q}>
                <summary>
                  <span className="faq-number">{String(i + 1).padStart(2, "0")}</span>
                  {item.q}
                  <span className="faq-plus" aria-hidden>
                    +
                  </span>
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>
        <section
          id="scope"
          className="scope-section"
          aria-labelledby="scope-title"
        >
          <div className="shell scope-grid">
            <div className="scope-copy">
              <p className="eyebrow">{landing.formEyebrow}</p>
              <h2 id="scope-title">{topic ? landing.formTitle : "Get a free discovery session"}</h2>
              <p>{topic ? landing.formSub : "Tell us a little about your business. We’ll reply within one business day to arrange a free meeting with us."}</p>
              <ul>
                {landing.formBenefits.map((benefit) => (
                  <li key={benefit}>
                    <span aria-hidden>✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
              <div className="scope-signoff">
                <span className="handwritten-arrow" aria-hidden>
                  ↳
                </span>
                <p>
                  One conversation.
                  <br />
                  <strong>A concrete next step.</strong>
                </p>
              </div>
            </div>
            <ConversionForm initial={variant} submitLabel={topic ? undefined : "Request my free discovery session"} />
          </div>
        </section>
        {!topic && <AutomationSection />}
      </main>
      <footer className="landing-footer">
        <div className="shell">
          <div className="footer-top">
            <Link href="/" aria-label="SKOX home">
              <SkoxLogo className="brand-logo" />
            </Link>
            <p>{landing.footerLine}</p>
            <a href={`mailto:${site.email}`}>
              Email us <Arrow />
            </a>
          </div>
          <nav className="footer-services" aria-label="What we build">
            {topics.map((t) => (
              <Link key={t.slug} href={`/${t.slug}`}>
                {t.keyword}
              </Link>
            ))}
            <Link href="/examples">Examples you can try</Link>
            <Link href="/scorecard">Free Monday scorecard</Link>
          </nav>
          <nav className="footer-services footer-trades" aria-label="Built for">
            <span className="footer-label">Built for</span>
            {trades.map((t) => (
              <Link key={t.slug} href={`/for/${t.slug}`}>
                {t.name}
              </Link>
            ))}
          </nav>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} SKOX</span>
            <span>Working with clients everywhere</span>
            <Link href="/privacy">Privacy</Link>
            <Link href="/privacy#choices">Your Privacy Choices</Link>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- Cross-app navigation. */}
            <a href="/portal">Client portal</a>
          </div>
        </div>
      </footer>
      <div className="mobile-cta">
        <a
          href="#scope"
          className="button button-primary"
          data-cta="mobile-sticky"
        >
          {topic ? landing.cta : "Get a free discovery session"}
          <Arrow />
        </a>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />
      <LandingTracking />
    </div>
  );
}
