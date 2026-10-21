import Image from "next/image";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import {
  Beacon,
  Compare,
  ConceptBar,
  Credentials,
  Estimate,
  OrderBuilder,
  Reveal,
  Video,
  previewMetadata,
} from "../_shared";
import MenuTabs from "./MenuTabs";
import {
  BAG_MENU,
  BAG_SIZES,
  BUSINESS,
  CREDENTIALS,
  EVENT_TYPES,
  PHONE_DISPLAY,
  PHONE_TEL,
  RATING,
  REVIEWS,
  SERVICE_AREA,
  SLUG,
  TAG_LABEL,
} from "./data";
import "./concept.css";

/**
 * Private preview for Artisan's Kitchen Catering, Flagstaff AZ.
 * Built by SKOX after a cold call; the business has not approved it and is not
 * a client. Unguessable path, noindex, excluded from robots and sitemap, and a
 * standing concept bar. Every fact traces to
 * docs/prospects/previews/artisans-kitchen-flagstaff/ledger.md.
 */
export const metadata = previewMetadata(SLUG, BUSINESS, { place: "Flagstaff" });

/* This concept's own type, not SKOX's. Fraunces for the printed-menu display
   voice, Source Sans 3 for everything else. */
const display = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: "variable",
  axes: ["opsz", "SOFT"],
  variable: "--ak-display",
  display: "swap",
});
const text = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--ak-text",
  display: "swap",
});

const IMG = "/concepts/artisans-kitchen";
const BOOK = "https://www.skoxsoftware.com/#scope";

export default function ArtisansKitchenConcept() {
  return (
    <div className={`ak ${display.variable} ${text.variable}`}>
      <Beacon slug={SLUG} />
      <Reveal selector=".ak section" />
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <ConceptBar
        slug={SLUG}
        business={BUSINESS}
        shortName="Artisan’s Kitchen"
        bookUrl={BOOK}
        askPlaceholder="Can we keep our phone number on every page?"
      />

      <header className="masthead shell">
        <a href="#main" className="wordmark">
          <span className="wordmark-name">Artisan&rsquo;s Kitchen</span>
          <span className="wordmark-sub">Catering · Flagstaff · est. 2007</span>
        </a>
        <nav aria-label="Sections">
          <a href="#order">Boil bags</a>
          <a href="#events">Events</a>
          <a href="#menus">Menus</a>
          <a href="#chef">Chef Sean</a>
        </nav>
        <a className="masthead-phone" href={`tel:${PHONE_TEL}`}>
          {PHONE_DISPLAY}
        </a>
      </header>

      <main id="main">
        {/* 1 · HERO */}
        <section className="hero shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="kicker">Full-service catering, Flagstaff and northern Arizona</p>
            <h1 id="hero-title">
              Old-world cuisine
              <br />
              for a modern-world <em>palate.</em>
            </h1>
            <p className="lede">
              Weddings, rehearsal dinners and business meetings from a small table to a buffet for
              three hundred. Hot apple cider when the day turns cold, leftovers packed before you ask.
              And a sous-vide boil-bag line that river and glamping outfitters can order by the trip.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#order">
                Order boil bags for a trip
              </a>
              <a className="btn btn-ghost" href="#events">
                Price a wedding
              </a>
            </div>
            <dl className="hero-facts">
              <div>
                <dt>Since</dt>
                <dd>2007</dd>
              </div>
              <div>
                <dt>Serving</dt>
                <dd>{SERVICE_AREA.slice(0, 4).join(", ")} and beyond</dd>
              </div>
              {RATING && (
                <div>
                  <dt>{RATING.source}</dt>
                  <dd>
                    {RATING.value.toFixed(1)} from {RATING.count} reviews
                  </dd>
                </div>
              )}
            </dl>
          </div>
          <div className="hero-mosaic" aria-hidden="true">
            <Image src={`${IMG}/banner-left.jpg`} alt="" width={298} height={215} className="m1" priority />
            <Image src={`${IMG}/fruit-platter.jpg`} alt="" width={470} height={353} className="m2" priority />
            <Image src={`${IMG}/banner-tarts.jpg`} alt="" width={140} height={180} className="m3" />
            <Image src={`${IMG}/banner-mid.jpg`} alt="" width={320} height={180} className="m4" />
          </div>
        </section>

        <Credentials
          items={CREDENTIALS}
          footnote={
            <>
              Cooked for the Americana Motor Hotel&rsquo;s Christmas party, the Museum of Northern Arizona, a
              60-person community picnic and weddings of 20 to 100 guests, according to their customers&rsquo;
              reviews and photos.
            </>
          }
        />

        {/* 2 · THE WORKING UPGRADE */}
        <section id="order" className="order shell" aria-labelledby="order-title">
          <div className="section-head">
            <span className="num">01</span>
            <div>
              <h2 id="order-title">Boil bags, ordered by the trip.</h2>
              <p>
                Tell us the group, the days and which meals. We show the bag plan on the spot and the
                kitchen confirms. Made in a certified kitchen, vacuum sealed, 30 days in a cooler.
              </p>
            </div>
          </div>
          <OrderBuilder
            slug={SLUG}
            items={BAG_MENU}
            tagLabels={TAG_LABEL}
            packSizes={BAG_SIZES}
            packNoun="bag"
            meals={["Breakfast", "Lunch", "Dinner"]}
            copy={{
              requestTitle: "Boil-bag order request",
              companyFallback: "Artisan's Kitchen preview",
              companyLabel: "Outfitter or group",
              failed: `That didn’t send. Call ${PHONE_DISPLAY} and we’ll take it by phone.`,
              note:
                "Pricing is confirmed by the kitchen. Boil bags keep 30 days in a cooler and 3+ years frozen; most are ready in 45 minutes of boiling or 10 in a microwave.",
              doneBody:
                "On the live site this goes straight to the kitchen with a confirmation text to you. On this concept it went to Reiss at SKOX, who will text you back so you can see how fast it lands.",
            }}
          />
          <p className="works-note">
            <strong>This form works.</strong> On the live site it goes to the kitchen. Here it goes to
            Reiss at SKOX, so you can see how a web order arrives.
          </p>
        </section>

        {/* 3 · EVENTS */}
        <section id="events" className="events shell" aria-labelledby="events-title">
          <div className="section-head">
            <span className="num">02</span>
            <div>
              <h2 id="events-title">Events we cater.</h2>
              <p>
                Full-course sit-down, family style, buffet and bar service. Small home dinners up to
                buffets for 300+.
              </p>
            </div>
          </div>
          <div className="events-grid">
            <ul className="events-list">
              {EVENT_TYPES.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
            <div className="pricing-card">
              {/* Ledger L11, L13, L14. Bar and rentals are flagged, not priced: the
                  site publishes no numbers for them. */}
              <Estimate
                title="Weddings, in plain numbers"
                low={35}
                high={65}
                depositPct={20}
                tasting={{ label: "Tasting for two, by appointment", price: 50 }}
                flags={[
                  { label: "Bar service", short: "Bar" },
                  { label: "Rentals", short: "Rentals" },
                ]}
                disclaimer="A range, not a quote. The final number depends on guest count, venue, rentals, bar and menu."
                cta={{ href: `tel:${PHONE_TEL}`, label: `Call ${PHONE_DISPLAY} to book a tasting` }}
              />
            </div>
          </div>
        </section>

        {/* 4 · MENUS */}
        <section id="menus" className="menus shell" aria-labelledby="menus-title">
          <div className="section-head">
            <span className="num">03</span>
            <div>
              <h2 id="menus-title">Dinner menus, by cuisine.</h2>
              <p>
                Pick a menu Chef Sean has prepared, or build a custom one. These are from the current
                site&rsquo;s dinner lists, including the page that no longer loads.
              </p>
            </div>
          </div>
          <MenuTabs />
        </section>

        {/* 5 · REVIEWS */}
        {REVIEWS.length > 0 && (
          <section className="reviews shell" aria-labelledby="reviews-title">
            <div className="section-head">
              <span className="num">04</span>
              <div>
                <h2 id="reviews-title">&ldquo;The best wedding food they had ever had.&rdquo;</h2>
                {RATING && (
                  <p>
                    A guest at Katie H.&rsquo;s wedding, in her Google review. {RATING.value.toFixed(1)} stars from{" "}
                    {RATING.count} {RATING.source} reviews as of October 2026. <a href={RATING.url}>Read them all</a>.
                  </p>
                )}
              </div>
            </div>
            <ul className="review-list">
              {REVIEWS.map((r) => (
                <li key={r.name + r.date}>
                  <blockquote>
                    <p>&ldquo;{r.text}&rdquo;</p>
                    <footer>
                      <span aria-label={`${r.stars} stars`}>{"★".repeat(r.stars)}</span>
                      <cite>{r.name}</cite> · {r.date} ·{" "}
                      <a href={r.url}>{r.source}</a>
                    </footer>
                  </blockquote>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 6 · GALLERY + CHEF */}
        <section id="chef" className="chef shell" aria-labelledby="chef-title">
          <div className="chef-grid">
            <figure className="chef-photo">
              <Image src={`${IMG}/chef-sean.jpg`} alt="Chef Sean Mannina in a black chef's jacket, pines and a lake behind him" width={372} height={479} />
              <figcaption>Chef Sean Mannina</figcaption>
            </figure>
            <div className="chef-copy">
              <span className="num">05</span>
              <h2 id="chef-title">Cooked by the person who answers the phone.</h2>
              <p>
                Artisan&rsquo;s Kitchen has been Chef Sean Mannina&rsquo;s since 2007. Cordon Bleu
                certified, trained at the Scottsdale Culinary Institute, as he told the Flagstaff
                Chamber&rsquo;s podcast. Flagstaff, the Grand Canyon, Cottonwood, Camp Verde, Winslow,
                Williams and the Hopi Reservation: if it&rsquo;s a drive, it&rsquo;s a drive he&rsquo;s made.
              </p>
              <div className="gallery">
                <Image src={`${IMG}/buffet-line.jpg`} alt="A chafing-dish buffet line on brown linen with flower stems" width={499} height={374} />
                <Image src={`${IMG}/pastries.jpg`} alt="Heart-shaped jam cookies, muffins and scones on a tray" width={334} height={203} />
              </div>
              <p className="gallery-note">
                Photos are from the current site. On the scope call we&rsquo;ll ask for the originals and
                the 42 on your Google profile; a half-day shoot is in the build.
              </p>
              {/* Ledger C4: the September 2026 promo video. */}
              <Video
                id="iS7bGkMFPow"
                poster={`${IMG}/video-poster.jpg`}
                title="Artisan's Kitchen promo video"
                playLabel="Play the Artisan's Kitchen video"
                caption="Watch 1:22 · filmed September 2026"
              />
            </div>
          </div>
        </section>

        {/* 7 · BEFORE / AFTER */}
        <section className="before shell" aria-labelledby="before-title">
          <div className="section-head">
            <span className="num">06</span>
            <div>
              <h2 id="before-title">The site today, on a phone.</h2>
              <p>This is where couples and trip planners look you up. Most of them are on a phone.</p>
            </div>
          </div>
          <div className="before-grid">
            <Compare
              before={`${IMG}/before-mobile.png`}
              after={`${IMG}/after-mobile-3.png`}
              beforeAlt="The current artisanskitchenflagstaff.com homepage on a phone: fixed-width layout, tiny navigation, text too small to read"
            />
            <ul className="before-list">
              <li>The Dinner menu page returns &ldquo;resource has been removed&rdquo;.</li>
              <li>No form, booking or payment anywhere. Every page ends in &ldquo;call us&rdquo;.</li>
              <li>The boil-bag menu is one block of text with no way to order.</li>
              <li>Served over plain HTTP; browsers mark it &ldquo;not secure&rdquo;.</li>
              <li>&ldquo;Website Designed at Homestead&rdquo; in the footer of every page.</li>
            </ul>
          </div>
        </section>

        {/* 8 · IN THE BUILD */}
        <section className="build shell" aria-labelledby="build-title">
          <div className="section-head">
            <span className="num">07</span>
            <div>
              <h2 id="build-title">In the build, not in this concept.</h2>
            </div>
          </div>
          <ol className="build-list">
            <li>
              <strong>Event estimate builder.</strong> Guests, town, service style, bar and rentals, priced
              from your $35 to $65 per person. Captures the lead with every detail you need.
            </li>
            <li>
              <strong>Tasting booking and deposit.</strong> The $25 tasting and the 20% deposit paid online,
              so the date locks without an invoice chase.
            </li>
            <li>
              <strong>Outfitter accounts.</strong> River and glamping companies log in, see last season&rsquo;s
              order and reorder in one tap.
            </li>
            <li>
              <strong>Wedding date calendar.</strong> Couples see open dates before they call.
            </li>
            <li>
              <strong>Service-area pages.</strong> Grand Canyon, Sedona and Cottonwood, Williams: so &ldquo;Grand
              Canyon wedding catering&rdquo; finds you.
            </li>
          </ol>
        </section>

        {/* 9 · WHAT HAPPENS NEXT */}
        <section className="next shell" aria-labelledby="next-title">
          <h2 id="next-title">What happens next</h2>
          <ol className="next-steps">
            <li>
              <span>1</span>A 15-minute scope call with Reiss. We confirm what you sell and how you want
              orders to arrive.
            </li>
            <li>
              <span>2</span>A fixed price and a delivery date, in writing, before anything starts.
            </li>
            <li>
              <span>3</span>You keep your domain, your email and your Google ranking. Every old URL
              redirects to the new page.
            </li>
          </ol>
          <a className="btn btn-primary btn-large" href={BOOK}>
            Book the 15 minutes
          </a>
        </section>
      </main>

      <footer className="foot shell">
        <div>
          <p className="wordmark-name">Artisan&rsquo;s Kitchen Catering</p>
          <p>
            Flagstaff, AZ 86001 · <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
          </p>
          <p className="foot-area">Serving {SERVICE_AREA.join(", ")}.</p>
        </div>
        <p className="foot-concept">
          Concept built by SKOX Software for Artisan&rsquo;s Kitchen Catering. Not the live site. Not
          approved by the business. Photos and menu text are theirs, shown here only for their review.
        </p>
      </footer>
    </div>
  );
}
