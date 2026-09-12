import { SkoxLogo } from "@/components/SkoxLogo";
import { landing } from "@/content/landing";

function Yes() {
  return (
    <span className="compare-icon compare-icon-yes" aria-hidden="true">
      <svg viewBox="0 0 12 12" fill="none">
        <path
          d="M2.5 6.2 5 8.5l4.5-5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function No() {
  return (
    <span className="compare-icon compare-icon-no" aria-hidden="true">
      <svg viewBox="0 0 12 12" fill="none">
        <path
          d="m3.5 3.5 5 5m0-5-5 5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

/**
 * "Why SKOX": SKOX against a big dev shop and a freelancer.
 *
 * One real table, so every row reads straight across and screen readers get
 * row and column headers. The SKOX column comes first and is the only lit
 * surface: white, amber-edged, ticks against muted crosses. It ends in the
 * primary action, so the moment the choice is made the button is right there.
 *
 * Below 900px the table reflows into one card per row, with the SKOX answer
 * boxed first and the alternatives listed underneath. The `.compare-who`
 * labels only show in that layout, where the column headers are hidden.
 */
export function CompareSection() {
  const { us, shop, freelancer } = landing.compareColumns;
  return (
    <section
      className="section shell compare-section"
      id="why"
      aria-labelledby="compare-title"
    >
      <div className="section-heading rise">
        <div>
          <p className="eyebrow">{landing.compareEyebrow}</p>
          <h2 id="compare-title">{landing.compareTitle}</h2>
        </div>
        <p>{landing.compareSub}</p>
      </div>

      <div className="compare rise">
        <table className="compare-table">
          <caption className="sr-only">
            How SKOX compares with a big dev shop and a freelancer
          </caption>
          <colgroup>
            <col className="compare-col-label" />
            <col className="compare-col-us" />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <td />
              <th scope="col" className="compare-us">
                <SkoxLogo className="compare-logo" title={us} />
              </th>
              <th scope="col">{shop}</th>
              <th scope="col">{freelancer}</th>
            </tr>
          </thead>
          <tbody>
            {landing.compareRows.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                <td className="compare-us">
                  <span className="compare-cell">
                    <Yes />
                    <span>
                      <span className="compare-who">{us}</span>
                      {row.us}
                    </span>
                  </span>
                </td>
                <td>
                  <span className="compare-cell">
                    <No />
                    <span>
                      <span className="compare-who">{shop}</span>
                      {row.shop}
                    </span>
                  </span>
                </td>
                <td>
                  <span className="compare-cell">
                    <No />
                    <span>
                      <span className="compare-who">{freelancer}</span>
                      {row.freelancer}
                    </span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td />
              <td className="compare-us">
                <a
                  href="#scope"
                  className="button button-primary compare-cta"
                  data-cta="compare"
                >
                  {landing.cta}
                  <span aria-hidden="true">↗</span>
                </a>
                <p className="compare-note">{landing.compareNote}</p>
              </td>
              <td />
              <td />
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}
