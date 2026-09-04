import type { Metadata } from "next";
import Link from "next/link";
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
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[var(--color-pitch)] px-6 py-20 text-center">
      <div className="grain pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative max-w-[560px]">
        <SkoxLogo variant="dark" className="mx-auto h-[26px] w-auto" />

        <p className="mt-12 font-mono text-[12px] uppercase tracking-[0.16em] text-[var(--color-amber)]">
          Received
        </p>
        <h1 className="mt-5 text-balance text-[38px] font-normal leading-[1.04] tracking-[-0.025em] text-white sm:text-[48px]">
          {copy.successTitle}
        </h1>
        <p className="mt-5 text-[17px] leading-[1.55] text-white/60">
          {site.bookingUrl ? copy.successBooking : copy.successBody}
        </p>

        {site.bookingUrl && (
          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noopener"
            className="chamfer mt-8 inline-flex h-[51px] items-center bg-[#E9E9E9] px-[27px] text-[15.5px] font-[450] text-[#0A0707] transition-opacity hover:opacity-90"
          >
            Pick my 30 minutes
          </a>
        )}

        <p className="mt-10 text-[14px] text-white/40">
          Nothing else to do. If it is urgent, reply straight to{" "}
          <a href={`mailto:${site.email}`} className="text-[var(--color-amber)] hover:underline">
            {site.email}
          </a>
          .
        </p>

        <Link
          href="/"
          className="mt-8 inline-block text-[14px] text-white/50 underline underline-offset-4 hover:text-white"
        >
          Back to the site
        </Link>
      </div>
    </main>
  );
}
