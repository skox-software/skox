/**
 * Credibility strip. Every item traces to a ledger row (P1–P7, C1–C4). No
 * awards were found for this business, so none are shown. Third-party marks
 * are simple inline glyphs in their own brand colours, used only to label a
 * rating from that platform.
 */
const G = "https://www.google.com/maps/place/Artisans+Kitchen/@35.2121152,-111.5770749,17z/data=!4m8!3m7!1s0x872d8ea6a6160d65:0xc33347b8630865df!8m2!3d35.2121152!4d-111.5770749!9m1!1b1!16s%2Fg%2F11by_fcv4h";

function GoogleG() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5c-.3 1.5-1.1 2.8-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.7z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1C3.3 21.3 7.3 24 12 24z" />
      <path fill="#FBBC05" d="M5.3 14.3c-.3-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3V6.6H1.3C.5 8.2 0 10 0 12s.5 3.8 1.3 5.4l4-3.1z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4C18 1.2 15.2 0 12 0 7.3 0 3.3 2.7 1.3 6.6l4 3.1c.9-2.9 3.6-4.9 6.7-4.9z" />
    </svg>
  );
}
function FacebookF() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path fill="#fff" d="M13.5 19.5v-6h2l.3-2.4h-2.3V9.6c0-.7.2-1.2 1.2-1.2h1.3V6.3c-.2 0-1-.1-1.9-.1-1.9 0-3.1 1.1-3.1 3.2v1.7H9v2.4h2v6h2.5z" />
    </svg>
  );
}
function Owl() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#34E0A1" />
      <circle cx="8" cy="12.5" r="3.2" fill="#fff" />
      <circle cx="16" cy="12.5" r="3.2" fill="#fff" />
      <circle cx="8" cy="12.5" r="1.4" fill="#000" />
      <circle cx="16" cy="12.5" r="1.4" fill="#000" />
    </svg>
  );
}

export default function Credentials({ chamberLogo }: { chamberLogo?: string }) {
  return (
    <section className="cred shell" aria-label="Ratings and credentials">
      <ul className="cred-list">
        <li>
          <a href={G}>
            <GoogleG />
            <span>
              <strong>4.3</strong> on Google <small>27 reviews</small>
            </span>
          </a>
        </li>
        <li>
          <a href="https://www.facebook.com/ArtisansKitchen/reviews">
            <FacebookF />
            <span>
              <strong>100%</strong> recommend on Facebook <small>5 reviews</small>
            </span>
          </a>
        </li>
        <li>
          <a href="https://www.tripadvisor.com/Restaurant_Review-g60971-d9598626-Reviews-ARTISAN_S_KITCHEN-Flagstaff_Arizona.html">
            <Owl />
            <span>
              <strong>4.4</strong> on Tripadvisor <small>7 reviews</small>
            </span>
          </a>
        </li>
        <li>
          <a href="https://business.flagstaffchamber.com/members/member/artisan-s-kitchen-11293">
            {chamberLogo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={chamberLogo} alt="" width="44" height="44" />
            ) : (
              <span className="cred-mark" aria-hidden="true">
                C
              </span>
            )}
            <span>
              <strong>Member</strong> Greater Flagstaff Chamber of Commerce
            </span>
          </a>
        </li>
        <li>
          <a href="https://podcasts.apple.com/us/podcast/artisans-kitchen/id1630235450?i=1000681456204">
            <span className="cred-mark" aria-hidden="true">
              CB
            </span>
            <span>
              <strong>Cordon Bleu</strong> certified, Scottsdale Culinary Institute
            </span>
          </a>
        </li>
        <li>
          <span className="cred-static">
            <span className="cred-mark" aria-hidden="true">
              07
            </span>
            <span>
              <strong>Incorporated 2007</strong> Artisan&rsquo;s Kitchen, Inc.
            </span>
          </span>
        </li>
      </ul>
      <p className="cred-clients">
        Cooked for the Americana Motor Hotel&rsquo;s Christmas party, the Museum of Northern Arizona, a
        60-person community picnic and weddings of 20 to 100 guests, according to their customers&rsquo;
        reviews and photos.
      </p>
    </section>
  );
}
