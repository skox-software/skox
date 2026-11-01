import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ReadyList } from "@/components/site/Bits";
import { BookingEmbed } from "@/components/site/BookingEmbed";
import { booking, review } from "@/content/site";

/**
 * Where a sent review form lands, and the URL the ad platforms count as the
 * conversion. With a booking link (NEXT_PUBLIC_REVIEW_BOOKING_URL) it's the
 * scheduling step; without one it says honestly that the request is in.
 */
const copy = booking.enabled ? review.booked.pick : review.booked.requested;

export const metadata: Metadata = {
  title: booking.enabled ? "Pick a time" : "Review requested",
  robots: { index: false, follow: false },
};

export default function Booked() {
  return (
    <div className="ub">
      <Header />
      <main id="top" tabIndex={-1} className="page">
        <p className="meta">{copy.meta}</p>
        <h1>{copy.title}</h1>
        <p className="lead" style={{ color: "var(--ink-2)", maxWidth: "44ch" }}>
          {copy.body}
        </p>
        {booking.enabled && <BookingEmbed url={booking.url} title="Pick a time for your operations review" />}
        <div className="booked-ready">
          <ReadyList {...review.ready} />
        </div>
        <div className="page-actions">
          <Link href="/" className="btn blue">
            {review.booked.back} <span className="dot" />
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
