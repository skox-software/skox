import type { Metadata } from "next";
import Link from "next/link";
import { SkoxLogo } from "@/components/SkoxLogo";
import { SCORECARD_FILE } from "@/lib/scorecard";

/**
 * A real URL for a completed download, for the same reason /scope-received
 * exists. The conversion fires as an event before navigation; never count this
 * page's URL as a conversion in an ad platform.
 */
export const metadata: Metadata = {
  title: "Your scorecard",
  robots: { index: false, follow: false },
};

export default function ScorecardThanks() {
  return (
    <div className="landing-page">
      <main className="page-narrow page-centred">
        <div>
          <SkoxLogo className="brand-logo" />
          <p className="eyebrow">On its way</p>
          <h1>Check your inbox.</h1>
          <p>The link is in your email too. Or grab it now.</p>

          <div className="page-actions">
            <a href={SCORECARD_FILE} download className="button button-primary">
              Download the scorecard <span aria-hidden="true">↓</span>
            </a>
            <Link href="/dashboards" className="button button-ghost">
              Have it built as a live dashboard
            </Link>
          </div>

          <p className="page-meta">
            Opens in Excel, Google Sheets (File &gt; Import) or Numbers. Start on the &ldquo;Start here&rdquo; tab.
          </p>
        </div>
      </main>
    </div>
  );
}
