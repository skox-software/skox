import type { Metadata } from "next";
import Link from "next/link";
import { BookingLink } from "@/components/BookingLink";
import { SkoxLogo } from "@/components/SkoxLogo";
import { form as copy, site } from "@/content/site";

/**
 * A real URL for a completed scope request.
 *
 * Ad platforms cannot see an in-place React state change, so a form that only
 * flips to a "done" view gives Google and Meta nothing to optimise toward — and
 * they fall back to optimising for clicks, which buys the cheapest traffic in
 * the auction. This page is the destination conversion.
 */
export const metadata: Metadata = {
  title: "Request received",
  robots: { index: false, follow: false },
};

export default function ScopeReceived() {
  return (
    <div className="landing-page">
      <main className="page-narrow page-centred">
        <div>
          <SkoxLogo className="brand-logo" />

          <p className="eyebrow">Request received</p>
          <h1>{copy.successTitle}</h1>
          <p>{site.bookingUrl ? copy.successBooking : copy.successBody}</p>

          <div className="page-actions">
            {site.bookingUrl && (
              <BookingLink
                href={site.bookingUrl}
                surface="scope-received"
                className="button button-primary"
              >
                Book my call with Reiss
                <span aria-hidden="true">↗</span>
              </BookingLink>
            )}
            <Link href="/" className="button button-ghost">
              Back to the site
            </Link>
          </div>

          <p className="page-meta">
            Your project details were sent to Reiss. If it is urgent, email{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
      </main>
    </div>
  );
}
