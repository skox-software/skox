import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ReadyList, Strike } from "@/components/site/Bits";
import { ReviewForm } from "@/components/site/ReviewForm";
import { review } from "@/content/site";

export const metadata: Metadata = {
  title: review.title,
  description: review.description,
  alternates: { canonical: "/review" },
  openGraph: { title: `${review.title} — UnBusy`, description: review.description, url: "/review", images: ["/opengraph-image"] },
};


export default async function ReviewPage({ searchParams }: { searchParams: Promise<{ industry?: string; software?: string }> }) {
  const { industry, software } = await searchParams;
  /** From the homepage software picker: the owner already told us what they run. */
  const picked = typeof software === "string" ? software.trim().slice(0, 60) : "";
  return (
    <div className="ub">
      <Header />
      <main id="top" tabIndex={-1}>
        <div className="hero paper">
          <div className="wrap grid">
            <div className="c1-6">
              <p className="q">{review.eyebrow}</p>
              <h1>
                {review.headlineBefore} <Strike>{review.struck}</Strike>
                {review.headlineAfter}
              </h1>
              <p className="lead">{review.lead}</p>
            </div>
          </div>
        </div>
        <div className="wrap grid review-body">
          <div className="c1-6">
            <ReviewForm initialIndustry={typeof industry === "string" ? industry.slice(0, 120) : ""} software={picked} />
          </div>
          <div className="side" style={{ gridColumn: "8 / 13" }}>
            <ReadyList {...review.ready} />
            <ReadyList {...review.get} />
            <ReadyList {...review.data} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
