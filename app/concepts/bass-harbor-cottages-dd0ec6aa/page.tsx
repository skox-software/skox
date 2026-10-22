import Image from "next/image";
import { Cormorant_Garamond, Libre_Franklin } from "next/font/google";
import { Beacon, Compare, ConceptBar, Credentials, Reveal, money, previewMetadata } from "../_shared";
import BookBar from "./BookBar";
import Logo from "./Logo";
import Planner from "./Planner";
import QuietHours from "./QuietHours";
import {
  ADDRESS,
  BRING,
  BUSINESS,
  CREDENTIALS,
  EMAIL,
  INN,
  MAP_URL,
  NEARBY,
  PHONE_DISPLAY,
  PHONE_TEL,
  PLACES,
  POLICY,
  REVIEWS,
  RULES,
  SLUG,
  type Place,
} from "./data";
import "./concept.css";

/**
 * Private preview for Bass Harbor Cottages and Country Inn, Bass Harbor ME.
 * Built by SKOX after a cold call; the business has not approved it and is not
 * a client. Unguessable path, noindex, excluded from robots and sitemap, and a
 * standing concept bar. Every fact traces to
 * docs/prospects/previews/bass-harbor-cottages/ledger.md and reviews.md.
 * Design spec: docs/prospects/previews/bass-harbor-cottages/DESIGN.md.
 */
export const metadata = previewMetadata(SLUG, BUSINESS, { place: "Bass Harbor, Maine" });

/* This concept's own type, not SKOX's: Cormorant Garamond for the printed
   guidebook voice, Libre Franklin for everything you read at length. */
const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--bh-display",
  display: "swap",
});
const text = Libre_Franklin({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--bh-text",
  display: "swap",
});

const IMG = "/concepts/bass-harbor-cottages";
const BOOK = "https://www.skoxsoftware.com/#scope";

function Rates({ p }: { p: Place }) {
  const rows = [p.may, p.august, p.daily].filter((r) => r !== undefined);
  return (
    <ul className="leaders">
      {rows.map((r) => (
        <li key={r.label}>
          <span>{r.label}</span>
          <span>
            from {money(r.amount)} a {r.per}
          </span>
        </li>
      ))}
    </ul>
  );
}

function PlaceBlock({ p, n, flip }: { p: Place; n: string; flip?: boolean }) {
  return (
    <article className={`place${flip ? " is-flip" : ""}`} aria-labelledby={`place-${p.id}`}>
      <div className="place-photos">
        <Image
          src={p.img.src}
          alt={p.img.alt}
          width={p.img.w}
          height={p.img.h}
          className="place-main"
          sizes="(min-width: 900px) 640px, 100vw"
        />
        {p.img2 && (
          <Image
            src={p.img2.src}
            alt={p.img2.alt}
            width={p.img2.w}
            height={p.img2.h}
            className="place-second"
            sizes="(min-width: 900px) 260px, 45vw"
          />
        )}
      </div>
      <div className="place-copy">
        <p className="eyebrow">{n}</p>
        <h3 id={`place-${p.id}`}>{p.name}</h3>
        <p className="place-line">{p.line}</p>
        <ul className="place-features">
          {p.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <p className="place-sleeps">
          {p.sleepsText}. {p.minNights}-night minimum.
        </p>
        <Rates p={p} />
        <a className="text-link" href="#plan">
          Plan a stay here
        </a>
      </div>
    </article>
  );
}

export default function BassHarborConcept() {
  const [pine, carriage, boathouse, johns, tapley] = PLACES;
  return (
    <div className={`bh ${display.variable} ${text.variable}`}>
      <Beacon slug={SLUG} />
      <Reveal selector=".bh section" />
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <ConceptBar
        slug={SLUG}
        business={BUSINESS}
        shortName="Bass Harbor Cottages"
        bookUrl={BOOK}
        askPlaceholder="Can guests pay the deposit by card?"
      />

      <header className="masthead shell">
        <a href="#main" className="wordmark">
          <Logo size={52} />
          <span>
            <span className="wordmark-name">Bass Harbor Cottages</span>
            <span className="wordmark-sub">&amp; Country Inn · on the water</span>
          </span>
        </a>
        <nav aria-label="Sections">
          <a href="#places">Places to stay</a>
          <a href="#plan">Plan your stay</a>
          <a href="#details">Before you book</a>
          <a href="#find">Find us</a>
        </nav>
        <div className="masthead-actions">
          <a className="masthead-phone" href={`tel:${PHONE_TEL}`}>
            {PHONE_DISPLAY}
          </a>
          <a className="btn btn-primary btn-book" href="#plan">
            Book now
          </a>
        </div>
      </header>
      <BookBar />

      <main id="main">
        {/* HERO */}
        <div className="hero">
          <div className="hero-photo">
            <Image
              src={`${IMG}/hero-harbor.jpg`}
              alt="Bass Harbor from the Country Inn's meadow: yellow flowering shrubs in the foreground, tall spruce, the water and moorings beyond"
              width={1302}
              height={1080}
              priority
              sizes="100vw"
            />
          </div>
          <div className="hero-copy shell">
            <p className="eyebrow">Bass Harbor, Maine · the quietside of Mount Desert Island</p>
            <h1>
              <span className="l1">At water&rsquo;s edge,</span>
              <span className="l2">on the quiet side</span>
              <span className="l3">
                of <em>Mount Desert Island.</em>
              </span>
            </h1>
            <p className="lede">
              Cottages and Country Inn rooms on Bass Harbor, five minutes from Acadia&rsquo;s Bass Harbor Head
              Lighthouse. Follow the staircase to the shore, launch your kayak with the tide, and watch for eagles.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary btn-large" href="#plan">
                Book now
              </a>
              <a className="btn btn-ghost" href={`tel:${PHONE_TEL}`}>
                Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>
          <svg className="tideline" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 34 C 120 18, 240 48, 360 32 S 600 14, 720 30 S 960 50, 1080 30 S 1320 16, 1440 30" />
            <path d="M0 46 C 160 32, 280 58, 420 44 S 660 30, 800 44 S 1040 58, 1180 42 S 1360 34, 1440 44" />
          </svg>
        </div>

        <Credentials
          items={CREDENTIALS}
          footnote={
            <>
              Ratings as shown on Airbnb, October 2026. Our Country Inn was built in 1890. Member of the Bar Harbor Chamber
              of Commerce.
            </>
          }
        />

        {/* PLACES */}
        <section id="places" className="places shell" aria-labelledby="places-title">
          <div className="section-head">
            <p className="eyebrow">Four places to stay</p>
            <h2 id="places-title">
              Each one on the water, <em>each one different.</em>
            </h2>
            <p>
              Our cottages and rooms share quiet wooded meadows on Bass Harbor. Rates are &ldquo;from&rdquo;, as published,
              and depend on your dates and party.
            </p>
          </div>
          <PlaceBlock p={pine} n="01 · Cottage" />
          <PlaceBlock p={carriage} n="02 · Cottage" flip />
          <PlaceBlock p={boathouse} n="03 · Suites" />
          <article className="place is-flip inn" aria-labelledby="place-inn">
            <div className="place-photos">
              <Image
                src={johns.img.src}
                alt={johns.img.alt}
                width={johns.img.w}
                height={johns.img.h}
                className="place-main"
                sizes="(min-width: 900px) 640px, 100vw"
              />
              <Image
                src={`${IMG}/inn-porch.jpg`}
                alt="The inn's porch looking over the meadow to Bass Harbor"
                width={1400}
                height={1026}
                className="place-second"
                sizes="(min-width: 900px) 260px, 45vw"
              />
            </div>
            <div className="place-copy">
              <p className="eyebrow">04 · Rooms</p>
              <h3 id="place-inn">{INN.name}</h3>
              <p className="place-line">{INN.line}</p>
              <p className="place-body">{INN.body}</p>
              <p className="place-sleeps">{INN.rates}</p>
              <div className="inn-rooms">
                {[johns, tapley].map((r) => (
                  <div key={r.id}>
                    <h4>{r.name.replace(", at the Country Inn", "")}</h4>
                    <p>{r.line}</p>
                    <Rates p={r} />
                  </div>
                ))}
              </div>
              <a className="text-link" href="#plan">
                Plan a stay here
              </a>
            </div>
          </article>
        </section>

        {/* THE WORKING UPGRADE */}
        <section id="plan" className="plan" aria-labelledby="plan-title">
          <div className="shell">
            <div className="section-head on-dark">
              <p className="eyebrow">Plan your stay</p>
              <h2 id="plan-title">
                Pick a place, a week, your party. <em>Send it in one go.</em>
              </h2>
              <p>
                Minimum stays and occupancy are checked as you go, the published rate for your month shows up, and our house
                rules are agreed before you send. No more phoning between 8 and 7 to find out it&rsquo;s a five-night minimum.
              </p>
            </div>
            <Planner />
          </div>
        </section>

        {/* REVIEWS */}
        <section className="reviews shell" aria-labelledby="reviews-title">
          <div className="section-head">
            <p className="eyebrow">From our guests</p>
            <h2 id="reviews-title">
              &ldquo;Quiet, <em>right on the water.</em>&rdquo;
            </h2>
            <p>
              Elaine, Pine Cottage, July 2025. 4.79 from 371 reviews across our listings on{" "}
              <a href="https://www.airbnb.com/users/profile/1462834791379625112">Airbnb</a>.
            </p>
          </div>
          <ul className="review-list">
            {REVIEWS.map((r) => (
              <li key={r.name + r.date}>
                <blockquote>
                  <p>&ldquo;{r.text}&rdquo;</p>
                  <footer>
                    <span className="stars" aria-label={`${r.stars} stars`}>
                      {"★".repeat(r.stars)}
                    </span>
                    <cite>{r.name}</cite> · {r.place} · {r.date} · <a href={r.url}>{r.source}</a>
                  </footer>
                </blockquote>
              </li>
            ))}
          </ul>
        </section>

        {/* AROUND HERE */}
        <section className="around" aria-labelledby="around-title">
          <div className="around-photo">
            <Image
              src={`${IMG}/aerial.jpg`}
              alt="Bass Harbor from the air: moorings, the working waterfront and the mountains of Acadia behind"
              width={923}
              height={338}
              sizes="100vw"
            />
          </div>
          <div className="shell around-grid">
            <div className="section-head">
              <p className="eyebrow">Around here</p>
              <h2 id="around-title">
                Away from it all, <em>close to the essentials.</em>
              </h2>
              <p>
                A scenic fishing village on the working waterfront, close to Bar Harbor and Acadia. We live here on-site and
                can help you throughout your stay.
              </p>
            </div>
            <ol className="nearby">
              {NEARBY.map((x) => (
                <li key={x.place}>
                  <span>{x.place}</span>
                  <span>{x.dist}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* BEFORE YOU BOOK */}
        <section id="details" className="details shell" aria-labelledby="details-title">
          <div className="section-head">
            <p className="eyebrow">Before you book</p>
            <h2 id="details-title">
              What you need to know, <em>said plainly.</em>
            </h2>
          </div>
          <div className="details-grid">
            <div>
              <h3>House rules</h3>
              <ul className="ticks">
                {RULES.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Bring with you</h3>
              <ul className="ticks">
                {BRING.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              <h3>Wifi</h3>
              <p>Our high-speed wifi supports Roku streaming television.</p>
            </div>
            <div>
              <h3>Deposit and cancellation</h3>
              <p>{POLICY.deposit}</p>
              <p>{POLICY.cancel}</p>
              <p>{POLICY.daily}</p>
              <p className="muted">{POLICY.tax}</p>
              <p className="muted">{POLICY.cameras}</p>
            </div>
          </div>
        </section>

        {/* BEFORE / AFTER */}
        <section className="before shell" aria-labelledby="before-title">
          <div className="section-head">
            <p className="eyebrow">For you, not your guests</p>
            <h2 id="before-title">
              Your site today, <em>on a phone.</em>
            </h2>
            <p>Most guests look you up on a phone. Drag the line to see the same page both ways.</p>
          </div>
          <div className="before-grid">
            <Compare
              before={`${IMG}/before-mobile.png`}
              after={`${IMG}/after-mobile-1.png`}
              width={780}
              height={1689}
              beforeAlt="The current bassharborcottages.com homepage on a phone: the desktop layout shrunk to fit, text too small to read, date pickers too small to tap"
            />
            <div>
              <ul className="before-list">
                <li>The page has no phone layout, so phones show the desktop page shrunk to fit.</li>
                <li>The sidebar still says &ldquo;The Inn is open. Happy Spring!!!&rdquo; in October.</li>
                <li>Checking dates sends guests to a different-looking availabilityonline.com page.</li>
                <li>
                  The same cottage has two August prices: the Pine Cottage is $2,500 on one page and $2,350 on another.
                </li>
                <li>Deposits by personal check or money order only.</li>
                <li>Directions say the Island Explorer &ldquo;should be back in 2022.&rdquo;</li>
              </ul>
              <figure className="logo-redo">
                <div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${IMG}/logo-old.png`} alt="The current logo: a cropped, low-resolution image of the farmhouse in a wreath" width={243} height={173} />
                  <figcaption>Your logo today</figcaption>
                </div>
                <div>
                  <Logo size={150} title="The farmhouse-in-a-wreath logo, redrawn as a sharp vector" />
                  <figcaption>Redrawn, sharp at any size</figcaption>
                </div>
              </figure>
            </div>
          </div>
        </section>

        {/* IN THE BUILD */}
        <section className="build shell" aria-labelledby="build-title">
          <div className="section-head">
            <p className="eyebrow">In the build, not in this concept</p>
            <h2 id="build-title">What the full site adds.</h2>
          </div>
          <ol className="build-list">
            <li>
              <strong>Deposit by card at checkout.</strong> Your refund and 30-day cancellation terms agreed as they pay, instead of
              waiting for a check in the mail.
            </li>
            <li>
              <strong>Live availability.</strong> Open weeks for each cottage and room, synced with the calendar you already keep.
            </li>
            <li>
              <strong>Linen rental as an add-on.</strong> Chosen and paid with the stay, so you know before they arrive.
            </li>
            <li>
              <strong>A pre-arrival guide, sent for you.</strong> Directions to the white farmhouse, the boardwalk to the office, what
              to bring, quiet hours.
            </li>
            <li>
              <strong>One rate table.</strong> Change a price once and every page agrees.
            </li>
          </ol>
        </section>

        {/* WHAT HAPPENS NEXT */}
        <section className="next" aria-labelledby="next-title">
          <div className="shell">
            <h2 id="next-title">What happens next</h2>
            <ol className="next-steps">
              <li>
                <span>1</span>A 15-minute call with Reiss. We confirm your places, your rules and how you want requests to reach
                you.
              </li>
              <li>
                <span>2</span>A fixed price and a delivery date, in writing, before anything starts.
              </li>
              <li>
                <span>3</span>You keep your domain, your email and your Google ranking. Every old page redirects to its new one.
              </li>
            </ol>
            <a className="btn btn-light btn-large" href={BOOK}>
              Book the 15 minutes
            </a>
          </div>
        </section>
      </main>

      <footer id="find" className="foot">
        <div className="shell foot-grid">
          <div>
            <Logo size={72} />
            <p className="wordmark-name">Bass Harbor Cottages &amp; Country Inn</p>
            <p>
              <a href={MAP_URL}>
                {ADDRESS[0]}
                <br />
                {ADDRESS[1]}
              </a>
            </p>
          </div>
          <div>
            <h3>Reservations</h3>
            <p>
              <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>, 8 am to 7 pm Eastern
              <br />
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </p>
            <QuietHours />
          </div>
          <div>
            <h3>Finding us</h3>
            <p>
              Look for a white farmhouse with a porch and black shutters, surrounded by a small forest of large maple trees. The
              office is at the first door on the left: just follow the boardwalk.
            </p>
          </div>
        </div>
        <svg className="tideline foot-tide" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 34 C 120 18, 240 48, 360 32 S 600 14, 720 30 S 960 50, 1080 30 S 1320 16, 1440 30" />
        </svg>
        <p className="foot-concept shell">
          Concept built by SKOX Software for Bass Harbor Cottages and Country Inn. Not the live site. Not approved by the business.
          Photos, rates and policies are theirs, shown here only for their review.
        </p>
      </footer>
    </div>
  );
}
