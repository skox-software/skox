import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import IsthmusFlight from "./IsthmusFlight";
import "./mccaughey.css";

/**
 * McCaughey Properties — an isthmus concept.
 *
 * Their portfolio is small residential rentals in two Madison neighbourhoods,
 * so the 3D isn't a building flythrough; it's the place itself. Madison's
 * isthmus between Lake Mendota and Lake Monona is the city's identity, and both
 * neighbourhoods sit on it. The hero is a photoreal Google Earth Studio flight
 * over the real isthmus, with each home pinned.
 *
 * Every fact here comes from mccaugheyproperties.com as of 2026-10-16: the two
 * listings, the phone and email, the founding story. Nothing is invented —
 * no reviews, no unit counts, no amenities they don't list.
 *
 * PRIVATE AND UNAPPROVED. McCaughey Properties is not a client. Imagery is
 * Google Earth (Earth Studio), which must carry visible Google Earth credit
 * wherever it appears. The showing form does not submit anywhere.
 */
const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-mcc-display",
});

export const metadata: Metadata = {
  title: { absolute: "McCaughey Properties — private concept" },
  description:
    "An unofficial website concept for McCaughey Properties, Madison, Wisconsin.",
  robots: { index: false, follow: false, nocache: true },
};

const listings = [
  {
    address: "309 Elmside Blvd",
    area: "Schenk-Atwood",
    kind: "House",
    beds: 3,
    baths: 2,
    extra: "1-car garage",
    status: "Available now",
    available: true,
    blurb:
      "Newer total remodel. A 1.5-story house close to Lake Monona, the bike trails and neighbourhood parks, with a new enclosed garage.",
    photo: "309-front",
  },
  {
    address: "833 Erin St",
    area: "Campus/Central",
    kind: "House",
    beds: 3,
    baths: 1,
    extra: "On the city bus line",
    status: "Rented",
    available: false,
    blurb:
      "On the corner of South Park Street and Erin Street, directly across from St. Mary’s Hospital and the St. Mary’s/Dean outpatient center.",
    photo: "833-front",
  },
];

const hoods = [
  {
    name: "Campus/Central",
    body: "Efficiencies, apartments, flats and houses close to the UW campus, downtown nightlife, shopping and grocery stores.",
    photo: "833-kitchen",
  },
  {
    name: "Schenk-Atwood",
    body: "Madison’s near east side: a diverse neighbourhood of established businesses, Lake Monona and great parks, all within walking distance.",
    photo: "317-living",
  },
];

const photoSrc = (name: string) => `/concepts/mccaughey/homes/${name}.webp`;

export default function McCaugheyConcept() {
  return (
    <div className={`mcc ${display.variable}`}>
      <a className="skip-link" href="#listings">
        Skip to rentals
      </a>
      <div className="concept-bar">
        <span>SKOX × McCaughey Properties</span>
        <span>Private concept · Not affiliated</span>
      </div>

      <header className="nav shell">
        <a className="nav-mark" href="#">
          McCaughey <span>Properties</span>
        </a>
        <nav aria-label="Main" className="nav-links">
          <a href="#listings">Rentals</a>
          <a href="#hoods">Neighbourhoods</a>
          <a href="#residents">Residents</a>
          <a href="#showing">Contact</a>
        </nav>
        <a className="btn btn-sm" href="sms:+16085169497">
          Text us
        </a>
      </header>

      <IsthmusFlight />

      <main>
        <section id="listings" className="block shell">
          <p className="eyebrow">Rentals</p>
          <h2 className="block-title">On the market now.</h2>
          <div className="listings">
            {listings.map((l) => (
              <article className="listing" key={l.address}>
                <div className="listing-media">
                  <img
                    src={photoSrc(l.photo)}
                    alt={`${l.address}, ${l.area}`}
                    loading="lazy"
                    width={1440}
                    height={810}
                  />
                  <span className={`badge ${l.available ? "" : "is-rented"}`}>
                    {l.status}
                  </span>
                </div>
                <div className="listing-body">
                  <p className="listing-area">
                    {l.area} · {l.kind}
                  </p>
                  <h3>{l.address}</h3>
                  <ul className="facts">
                    <li><b>{l.beds}</b> bed</li>
                    <li><b>{l.baths}</b> bath</li>
                    <li>{l.extra}</li>
                  </ul>
                  <p>{l.blurb}</p>
                  <a
                    className={`btn ${l.available ? "" : "btn-ghost"}`}
                    href="#showing"
                  >
                    {l.available ? "Request a showing" : "Join the waitlist"}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="hoods" className="block shell">
          <p className="eyebrow">Neighbourhoods</p>
          <h2 className="block-title">Two sides of the isthmus.</h2>
          <div className="hoods">
            {hoods.map((h) => (
              <article className="hood" key={h.name}>
                <img
                  src={photoSrc(h.photo)}
                  alt=""
                  loading="lazy"
                  width={1440}
                  height={810}
                />
                <div className="hood-body">
                  <h3>{h.name}</h3>
                  <p>{h.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="block shell about">
          <p className="eyebrow">About</p>
          <blockquote>
            Patrick M. McCaughey, a third-generation Madison native, bought his
            first rental in the Schenk-Atwood neighbourhood in 1995, on the
            historic near east side of the isthmus.
          </blockquote>
        </section>

        <section id="residents" className="block shell residents">
          <div>
            <p className="eyebrow">For residents</p>
            <h2 className="block-title">Everything for your lease, in one place.</h2>
          </div>
          <div className="res-grid">
            <a className="res res-main" href="#residents">
              <strong>Pay rent online</strong>
              <span>One-time or automatic payments through Zego.</span>
            </a>
            <a className="res" href="#residents">
              <strong>Apply online</strong>
              <span>Replaces the PDF you fill in and email back.</span>
            </a>
            <a className="res" href="#residents">
              <strong>Lease documents</strong>
              <span>Sample lease, addenda, parking and smoke-detector rules.</span>
            </a>
            <a className="res" href="#residents">
              <strong>Request maintenance</strong>
              <span>Tell us what’s wrong, with a photo.</span>
            </a>
          </div>
        </section>

        <section id="showing" className="block shell showing">
          <div>
            <p className="eyebrow">Request a showing</p>
            <h2 className="block-title">Come see it in person.</h2>
            <p className="contact-lines">
              <a href="tel:+16085169497">608-516-9497</a> · call or text
              <br />
              <a href="mailto:info@mccaugheyproperties.com">
                info@mccaugheyproperties.com
              </a>
            </p>
          </div>
          <form className="form" action="#showing">
            <label>
              Which home?
              <select name="home" defaultValue="309 Elmside Blvd">
                <option>309 Elmside Blvd</option>
                <option>833 Erin St (waitlist)</option>
                <option>Not sure yet</option>
              </select>
            </label>
            <label>
              Your name
              <input name="name" autoComplete="name" />
            </label>
            <label>
              Phone or email
              <input name="contact" autoComplete="email" />
            </label>
            <label>
              When works for you?
              <input name="when" placeholder="e.g. weekday evenings" />
            </label>
            <button className="btn" type="button">
              Send request
            </button>
            <p className="form-note">Concept only. This form doesn’t send.</p>
          </form>
        </section>
      </main>

      <footer className="foot shell">
        <span>McCaughey Properties, LLC · PO Box 259446, Madison, WI 53725</span>
        <span>Aerial imagery © Google Earth · Home photos from mccaugheyproperties.com</span>
      </footer>
    </div>
  );
}
