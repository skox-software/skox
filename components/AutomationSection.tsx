import { automation, SCOPE_CALL_URL } from "@/content/automation";

export function AutomationSection() {
  return (
    <section className="automation-section" id="automation" aria-labelledby="automation-title">
      <div className="shell section">
        <div className="automation-grid">
          <div className="automation-copy">
            <h2 id="automation-title">{automation.heading}</h2>
            <p>{automation.body}</p>
          </div>
          <article className="automation-example">
            <p className="eyebrow">{automation.exampleLabel}</p>
            <p>{automation.example}</p>
          </article>
        </div>
        <div className="automation-cta">
          <div>
            <h3>{automation.ctaHeading}</h3>
            <p>{automation.ctaBody}</p>
          </div>
          <a className="button button-primary" href={SCOPE_CALL_URL} data-cta="automation-scope">
            {automation.ctaLabel} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
