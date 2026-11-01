import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ReadyList } from "@/components/site/Bits";
import { BookedTime } from "@/components/site/BookedTime";
import { review } from "@/content/site";

/**
 * The end of the booking: the booking tool redirects here after a time is
 * picked. Calendly can pass the time (event_start_time, event_end_time);
 * without it the page says the invite is in the inbox.
 */
export const metadata: Metadata = {
  title: "Review booked",
  robots: { index: false, follow: false },
};

type Params = { event_start_time?: string; event_end_time?: string; start?: string; end?: string };

export default async function Confirmed({ searchParams }: { searchParams: Promise<Params> }) {
  const p = await searchParams;
  const start = typeof p.event_start_time === "string" ? p.event_start_time : typeof p.start === "string" ? p.start : "";
  const end = typeof p.event_end_time === "string" ? p.event_end_time : typeof p.end === "string" ? p.end : "";
  return (
    <div className="ub">
      <Header />
      <main id="top" tabIndex={-1} className="page">
        <p className="meta">{review.booked.confirmed.meta}</p>
        <BookedTime start={start} end={end} copy={review.booked.confirmed} />
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
