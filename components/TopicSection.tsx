import Link from "next/link";
import { topicBySlug, type Topic } from "@/content/topics";

/**
 * The part of a service page that belongs to it alone: what we build under
 * that name, the signs you need it, what's included and how timing works.
 */
export function TopicSection({ topic }: { topic: Topic }) {
  const related = topic.related.map(topicBySlug).filter((t): t is Topic => Boolean(t));
  return (
    <section className="section shell topic-section" id="detail" aria-labelledby="detail-title">
      <div className="section-heading rise">
        <div>
          <p className="eyebrow">{topic.name} / In detail</p>
          <h2 id="detail-title">{topic.sectionTitle}</h2>
        </div>
        <p>{topic.sectionSub}</p>
      </div>

      <div className="topic-examples rise-stagger">
        {topic.examples.map((item) => (
          <article key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>

      <div className="topic-columns rise">
        <div>
          <h3>You probably need this if</h3>
          <ul>
            {topic.signs.map((sign) => (
              <li key={sign}>
                <span aria-hidden>→</span>
                {sign}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>What’s included</h3>
          <ul>
            {topic.includes.map((item) => (
              <li key={item}>
                <span aria-hidden>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>How long it takes</h3>
          <p>{topic.timing}</p>
          <a className="text-link" href="#scope" data-cta="topic">
            Get my price &amp; timeline <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      {related.length > 0 && (
        <nav className="topic-related rise" aria-label="Related builds">
          <p className="micro">Related</p>
          {topic.build === "dashboards" && (
            <Link href="/dashboard-examples">
              Dashboard examples <span aria-hidden="true">→</span>
            </Link>
          )}
          {(topic.slug === "internal-tools" || topic.slug === "customer-portals" || topic.slug === "web-apps") && (
            <Link href="/internal-tool-examples">
              Internal tool examples <span aria-hidden="true">→</span>
            </Link>
          )}
          {related.map((t) => (
            <Link key={t.slug} href={`/${t.slug}`}>
              {t.keyword} <span aria-hidden="true">→</span>
            </Link>
          ))}
        </nav>
      )}
    </section>
  );
}
