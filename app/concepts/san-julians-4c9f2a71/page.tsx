import type { Metadata } from "next";
import CafeMenu from "./CafeMenu";
import { ArrowDown, ArrowUpRight, Coffee, MapPin } from "./icons";
import "./concept.css";

/**
 * A private sales concept for San Julián's Coffee Bar in Winter Park.
 *
 * The café has NOT approved this and is not a client. It lives on an
 * unguessable path, is excluded from the sitemap and robots.txt, and carries a
 * standing "unofficial concept" bar so it can never be mistaken for their real
 * site. An unguessable URL is obscurity, not access control — treat the link as
 * shareable-to-anyone and do not publish it.
 *
 * Three of the four photographs are sourced from third-party marketplace and
 * review listings; provenance and the open licensing question are documented in
 * prototypes/san-julians/BRAND-SOURCES.md. Replace them with owner-supplied
 * originals before anything here goes public.
 */
export const metadata: Metadata = {
  title: "San Julián’s Coffee Bar — private concept",
  description:
    "An unofficial website concept for San Julián’s Coffee Bar in Winter Park.",
  robots: { index: false, follow: false, nocache: true },
};

const maps =
  "https://www.google.com/maps/search/?api=1&query=San+Julians+Coffee+Bar+110+S+Orlando+Ave+Winter+Park+FL";

export default function SanJuliansConcept() {
  return (
    <div className="sj-concept">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="concept-bar">
        <span>SKOX × SAN JULIÁN’S</span>
        <span>Private concept · No live orders</span>
      </div>

      <header className="site-header shell">
        <a
          href="#"
          className="wordmark"
          aria-label="San Julián’s Coffee Bar home"
        >
          <img
            src="/concepts/san-julians/leaf.jpg"
            alt=""
            width="48"
            height="48"
          />
          <span>
            San Julián’s<small>COFFEE BAR · WINTER PARK</small>
          </span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#menu">The menu</a>
          <a href="#our-place">Our place</a>
          <a href="#visit">Find us</a>
        </nav>
        <a className="pill header-order" href="#menu">
          Order pickup <ArrowUpRight size={17} />
        </a>
      </header>

      <main id="main">
        <section className="hero shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="small-line" /> A LITTLE COLOMBIA IN WINTER PARK
            </p>
            <h1 id="hero-title">
              Good coffee.
              <br />
              Better <em>mornings.</em>
            </h1>
            <p className="hero-description">
              Colombian coffee, warm pastries and breakfast worth slowing down
              for. Your next little ritual starts here.
            </p>
            <div className="hero-actions">
              <a className="pill" href="#menu">
                Find your usual <ArrowUpRight size={19} />
              </a>
              <a className="plain-link" href="#our-place">
                Stay a little <ArrowDown size={17} />
              </a>
            </div>
            <a
              className="hero-address"
              href={maps}
              target="_blank"
              rel="noreferrer"
            >
              <MapPin size={17} />
              <span>110 S Orlando Ave · Winter Park, FL</span>
              <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="hero-visual">
            <div className="photo-caption">
              <span>MADE FOR YOUR COFFEE MOMENT</span>
              <Coffee size={17} />
            </div>
            <img
              className="hero-photo"
              src="/concepts/san-julians/coffee.jpeg"
              alt="A San Julián’s blended coffee topped with whipped cream and caramel, in the café’s branded cup"
              width="550"
              height="664"
              fetchPriority="high"
            />
            <div className="hero-photo-note">
              <span>
                Take a sip.
                <br />
                <em>Make yourself at home.</em>
              </span>
              <span className="note-arrow" aria-hidden="true">
                ↗
              </span>
            </div>
            <span className="vertical-note" aria-hidden="true">
              COFFEE WITH A COLOMBIAN SOUL
            </span>
          </div>
        </section>

        <div className="ritual-strip">
          <div className="shell">
            <span>Colombian coffee</span>
            <span aria-hidden="true">✳</span>
            <span>Breakfast &amp; arepas</span>
            <span aria-hidden="true">✳</span>
            <span>Something sweet</span>
            <span aria-hidden="true">✳</span>
            <span>Your neighborhood stop</span>
          </div>
        </div>

        <CafeMenu />

        <section
          className="story-section shell"
          id="our-place"
          aria-labelledby="story-title"
        >
          <div className="story-image">
            <img
              src="/concepts/san-julians/interior.jpg"
              alt="Warm pendant lights, wooden tables and the café’s green coffee chalkboard"
              width="750"
              height="1000"
              loading="lazy"
            />
            <span className="image-footnote">
              A seat. A sip. A little time for yourself.
            </span>
          </div>
          <div className="story-copy">
            <p className="eyebrow">MORE THAN THE MORNING COFFEE</p>
            <h2 id="story-title">
              Rooted in Colombia.
              <br />
              <em>At home here.</em>
            </h2>
            <p>
              A café for the first coffee of the day, a catch-up over something
              sweet, or a breakfast that becomes your usual.
            </p>
            <p>
              Explore a menu of Colombian coffee, arepas, empanadas and little
              reasons to stay a while. We’re right here on Orlando Avenue in
              Winter Park.
            </p>
            <a className="plain-link" href="#visit">
              Come find your corner <ArrowUpRight size={18} />
            </a>
            <div className="story-signoff">
              Nos vemos pronto.<span>See you soon.</span>
            </div>
          </div>
        </section>

        <section
          className="visit-section"
          id="visit"
          aria-labelledby="visit-title"
        >
          <div className="shell visit-grid">
            <div className="visit-copy">
              <p className="eyebrow">YOUR NEXT COFFEE STOP</p>
              <h2 id="visit-title">
                We’ll save you
                <br />
                <em>a little moment.</em>
              </h2>
              <address>
                110 S Orlando Ave, Suite 4
                <br />
                Winter Park, FL 32789
              </address>
              <a
                className="pill light-pill"
                href={maps}
                target="_blank"
                rel="noreferrer"
              >
                Get directions <ArrowUpRight size={18} />
              </a>
              <a
                className="hours-link"
                href={maps}
                target="_blank"
                rel="noreferrer"
              >
                Check today’s opening hours <ArrowUpRight size={15} />
              </a>
              <a
                className="instagram-link"
                href="https://instagram.com/sanjulianscoffeebar"
                target="_blank"
                rel="noreferrer"
              >
                @sanjulianscoffeebar <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="visit-photo">
              <img
                src="/concepts/san-julians/storefront.jpg"
                alt="San Julián’s Coffee storefront at Suite 4, with its wooden sign and gold leaf window emblems"
                width="900"
                height="1200"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="shell site-footer">
        <div className="wordmark footer-brand">
          <img
            src="/concepts/san-julians/leaf.jpg"
            width="40"
            height="40"
            alt="San Julián’s gold leaf emblem"
          />
          <span>
            San Julián’s<small>COFFEE BAR</small>
          </span>
        </div>
        <div>
          <p>Colombian coffee. Winter Park mornings.</p>
          <a
            href="https://linktr.ee/sanjulianscoffeebar"
            target="_blank"
            rel="noreferrer"
          >
            Current café links <ArrowUpRight size={14} />
          </a>
        </div>
        <p className="concept-credit">
          An unofficial concept by{" "}
          <a href="https://skoxsoftware.com" target="_blank" rel="noreferrer">
            SKOX
          </a>
          .<br />
          Menu prices and availability need café confirmation.
        </p>
      </footer>
    </div>
  );
}
