import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { review } from "@/content/site";

/**
 * A real URL for a booked review. Ad platforms cannot see an in-place state
 * change, so this page is the destination conversion.
 */
export const metadata: Metadata = {
  title: "Review booked",
  robots: { index: false, follow: false },
};

export default function Booked() {
  return (
    <div className="ub">
      <Header />
      <main id="top" tabIndex={-1} className="page">
        <p className="meta">Received</p>
        <h1>{review.booked.title}</h1>
        <p className="lead" style={{ color: "var(--ink-2)", maxWidth: "44ch" }}>
          {review.booked.body}
        </p>
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
