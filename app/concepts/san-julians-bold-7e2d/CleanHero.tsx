"use client";

import { ArrowUpRight } from "../san-julians-4c9f2a71/icons";
import { useLang } from "../lang";

/**
 * A calm, split hero: the case for the café on the left, one good photograph
 * holding the right.
 *
 * Two earlier attempts missed. The first floated a cut-out cup on a colour
 * field, which is how a canned drink is sold, not a café. The second shouted
 * over a full-bleed scrim in condensed poster caps — dramatic, but it read as a
 * design exercise rather than a business's website.
 *
 * This one leads with the serif and leaves room around it, keeps the two things
 * a visitor actually came for — order, and where/when — permanently in view,
 * and lets the photography do the appetite work without competing with type.
 */
export default function CleanHero() {
  const { t } = useLang();
  // The whole point of the site: hand the order to the ordering system they
  // already pay for, instead of losing it to a marketplace that takes a cut.
  const toast =
    "https://www.toasttab.com/local/order/san-julians-coffee-bar-110-s-orlando-ave-suite-4";
  return (
    <section className="chero" aria-labelledby="chero-title">
      <div className="chero-inner shell">
        <div className="chero-copy">
          <p className="chero-eyebrow">{t("eyebrow")}</p>
          <h1 id="chero-title">
            {t("h1a")}
            <br />
            <em>{t("h1b")}</em>
          </h1>
          <p className="chero-lede">{t("lede")}</p>
          <div className="chero-actions">
            <a
              className="btn chero-primary"
              href={toast}
              target="_blank"
              rel="noreferrer"
            >
              {t("orderPickup")} <ArrowUpRight size={16} />
            </a>
            <a className="btn btn-ghost" href="#visit">
              {t("findUs")}
            </a>
          </div>
          <dl className="chero-facts">
            <div>
              <dt>{t("open")}</dt>
              <dd>{t("hours")}</dd>
            </div>
            <div>
              <dt>{t("where")}</dt>
              <dd>{t("address")}</dd>
            </div>
            <div>
              <dt>{t("rated")}</dt>
              <dd>{t("ratedValue")}</dd>
            </div>
          </dl>
        </div>

        <figure className="chero-photo">
          <img
            src="/concepts/san-julians/coffee.jpeg"
            alt="A San Julián's blended coffee with whipped cream and caramel, in the café's branded cup"
            width="550"
            height="664"
            fetchPriority="high"
          />
        </figure>
      </div>
    </section>
  );
}
