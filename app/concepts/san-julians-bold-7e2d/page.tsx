import type { Metadata } from "next";
import { Instrument_Serif, Oswald } from "next/font/google";
import CafeMenu from "../san-julians-4c9f2a71/CafeMenu";
import CleanHero from "./CleanHero";
import { LangProvider, LangToggle } from "../lang";
import { ArrowUpRight } from "../san-julians-4c9f2a71/icons";
import "./bold.css";

/**
 * San Julián's, direction B — the bold editorial treatment.
 *
 * Same café, same shared CafeMenu component and menu data as the other
 * concept; only the skin differs, so the two can be shown side by side.
 *
 * Palette is taken from the café's own logo — the green of the hills, the red
 * of the coffee cherry — rather than the teal of the reference design.
 *
 * PRIVATE AND UNAPPROVED. The café is not a client. Photographs are still
 * sourced from third-party listings (see prototypes/san-julians/BRAND-SOURCES.md)
 * and must be replaced with owner-supplied originals before this is public.
 * This layout is far less forgiving of mixed-quality photography than the
 * other direction, so that swap matters more here.
 */
/* One family across the whole page. Their wordmark is a heavy, tightly-set
   sans, so a serif headline pulled against the mark rather than with it. */
/* Their wordmark is a condensed bold grotesque with a tall x-height, flat
   terminal cuts and narrow widths, set upper-and-lowercase. Oswald is the
   closest free match that keeps lowercase — Bebas Neue is caps-only and Impact
   is not licensable for web. Kept under the original variable name so every
   existing rule picks it up. */
const display = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-anton",
});
/* bold.css still reads --font-instrument, which the root layout used to
   provide for the SKOX site. The site moved to its own type system, so the
   concept loads the face itself. */
const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument",
});
export const metadata: Metadata = {
  title: "San Julián’s Coffee Bar — private concept (bold)",
  description:
    "An unofficial website concept for San Julián’s Coffee Bar in Winter Park.",
  robots: { index: false, follow: false, nocache: true },
};

const toast =
  "https://www.toasttab.com/local/order/san-julians-coffee-bar-110-s-orlando-ave-suite-4";

const maps =
  "https://www.google.com/maps/search/?api=1&query=San+Julians+Coffee+Bar+110+S+Orlando+Ave+Winter+Park+FL";

/**
 * Verbatim Google reviews, chosen from the 40 most relevant. Real words from
 * real customers — nothing written for them. Attribution is the reviewer's
 * public display name only.
 */
const reviews = [
  {
    quote:
      "The greatest lil’ coffee shop in Winter Park! Every detail of this place is cozy and inviting and the coffee and food is amazing.",
    name: "Alyssa Smith-Yount",
    meta: "Google review",
  },
  {
    quote:
      "If you love to eat tasty food and excellent coffee, this is definitely your place to go. You can see clearly this is a homemade food place but perfectly served.",
    name: "Sofia Bock",
    meta: "Google review",
  },
  {
    quote:
      "San Julián has the best coffee in Winter Park. Everyone is so friendly and helpful — and they are very puppy friendly.",
    name: "Jennifer Pride",
    meta: "Google review",
  },
];

const marquee = [
  "Colombian beans from Caldas",
  "Breakfast all day",
  "Empanadas",
  "Arepas",
  "Live music",
  "Pan de bono",
  "Free Wi-Fi",
  "Pet friendly",
  "Tequeños",
];

export default function SanJuliansBold() {
  return (
    <LangProvider>
      <div className={`sjb ${display.variable} ${serif.variable}`}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div className="concept-bar">
          <span>SKOX × San Julián’s</span>
          <span>Private concept · No live orders</span>
        </div>

        <section className="hero">
          <div className="shell">
            <nav className="nav" aria-label="Main">
              <div className="nav-links">
                <a href="#menu">Menu</a>
                <a href="#place">Our place</a>
                <a href="#visit">Visit</a>
              </div>
              <a
                className="nav-mark"
                href="#"
                aria-label="San Julián’s Coffee Bar home"
              >
                <img
                  src="/concepts/san-julians/logo-ig.jpg"
                  alt="San Julián’s Coffee Bar"
                  width="320"
                  height="320"
                />
              </a>
              <div className="nav-right">
                <LangToggle />
                <a
                  className="btn"
                  href={toast}
                  target="_blank"
                  rel="noreferrer"
                >
                  Order pickup
                </a>
              </div>
            </nav>
          </div>
        </section>

        <CleanHero />

        <main id="main">
          <section className="band shell centered" id="place">
            <p className="chapter">01 — Why San Julián’s</p>
            <h2>
              Coffee with
              <br />
              somewhere to be from
            </h2>
            <p className="lede">
              Our beans are grown in the hills of San Julián, in Caldas,
              Colombia. That is not a marketing story — it is the name over the
              door.
            </p>
            <div className="collage">
              <img
                src="/concepts/san-julians/ig/ig-05.jpg"
                alt="A spiced latte topped with whipped cream and cinnamon"
                loading="lazy"
              />
              <img
                src="/concepts/san-julians/ig/ig-02.jpg"
                alt="From the café's own feed"
                loading="lazy"
              />
              <img
                src="/concepts/san-julians/ig/ig-03.jpg"
                alt="From the café's own feed"
                loading="lazy"
              />
              <img
                src="/concepts/san-julians/ig/ig-04.jpg"
                alt="From the café's own feed"
                loading="lazy"
              />
            </div>
          </section>

          <div className="marquee">
            <div className="marquee-track">
              {[...marquee, ...marquee].map((item, i) => (
                <span key={i}>{item}</span>
              ))}
            </div>
          </div>

          <CafeMenu />

          <section className="feature" id="place-feature">
            <img
              src="/concepts/san-julians/ig/ig-01.jpg"
              alt=""
              aria-hidden="true"
              loading="lazy"
            />
            <div className="shell">
              <div className="feature-copy">
                <p className="chapter">03 — Inside</p>
                <h2>
                  Stay a
                  <br />
                  while
                </h2>
                <p className="lede">
                  Breakfast served all day, Wi-Fi, and live music some evenings.
                  Pet friendly, so the dog comes too.
                </p>
                <a className="btn" href="#visit">
                  Plan a visit <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </section>

          <section className="band shell centered">
            <p className="chapter">04 — What people say</p>
            <h2>Why people come back</h2>
            <div className="reviews">
              {reviews.map((r) => (
                <figure className="review" key={r.name}>
                  <div className="stars" aria-label="Five out of five stars">
                    ★★★★★
                  </div>
                  <blockquote>{r.quote}</blockquote>
                  <figcaption>
                    {r.name}
                    <span>{r.meta}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="review-note">
              4.6 stars across 348 Google reviews · 285 of them five-star
            </p>
          </section>

          <section className="closer" id="visit">
            <div className="shell">
              <p className="chapter">05 — Come in</p>
              <h2>
                Nos vemos
                <br />
                pronto
              </h2>
              <p className="lede">
                110 S Orlando Ave, Suite 4 · Winter Park, across from the new
                Winter Park Library. Open Monday to Saturday 7:30–3:30, Sunday
                from 8:30.
              </p>
              <div className="closer-actions">
                <a className="btn" href={maps} target="_blank" rel="noreferrer">
                  Get directions <ArrowUpRight size={16} />
                </a>
                <a
                  className="btn btn-ghost"
                  href={toast}
                  target="_blank"
                  rel="noreferrer"
                >
                  Order pickup
                </a>
              </div>
            </div>
          </section>
        </main>

        <footer className="site-foot">
          <div className="shell">
            <div className="foot-mark">
              <img
                src="/concepts/san-julians/logo-ig.jpg"
                alt="San Julián’s Coffee Bar"
                width="320"
                height="320"
              />
            </div>
            <div className="foot-grid">
              <div>
                <h4>Menu</h4>
                <a href="#menu">Coffee</a>
                <a href="#menu">Breakfast</a>
                <a href="#menu">Empanadas &amp; arepas</a>
              </div>
              <div>
                <h4>Find us</h4>
                <a href={maps} target="_blank" rel="noreferrer">
                  110 S Orlando Ave
                </a>
                <a
                  href="https://instagram.com/sanjulianscoffeebar"
                  target="_blank"
                  rel="noreferrer"
                >
                  @sanjulianscoffeebar
                </a>
                <a
                  href="https://linktr.ee/sanjulianscoffeebar"
                  target="_blank"
                  rel="noreferrer"
                >
                  All café links
                </a>
              </div>
              <div>
                <h4>Order</h4>
                <a href="#menu">Pickup</a>
                <a
                  href="https://www.ubereats.com/store/san-julians-coffee-bar/DWgSDzGPX5yh5H5sigTAWw"
                  target="_blank"
                  rel="noreferrer"
                >
                  Published menu
                </a>
              </div>
            </div>
            <p className="foot-note">
              An unofficial concept by SKOX. Not affiliated with or approved by
              San Julián’s Coffee Bar. Menu prices are from published
              marketplace listings and need confirmation. Review quotes are
              verbatim from public Google reviews.
            </p>
          </div>
        </footer>
      </div>
    </LangProvider>
  );
}
