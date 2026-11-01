import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Strike } from "@/components/site/Bits";
import { ReviewForm } from "@/components/site/ReviewForm";
import { review } from "@/content/site";

export const metadata: Metadata = {
  title: review.title,
  description: review.description,
  alternates: { canonical: "/review" },
  openGraph: { title: `${review.title} — UnBusy`, description: review.description, url: "/review", images: ["/opengraph-image"] },
};

function List({ title, items }: { title: string; items: readonly { title: string; body: string }[] }) {
  return (
    <div className="ready">
      <h3>{title}</h3>
      <ol>
        {items.map((item) => (
          <li key={item.title}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default async function ReviewPage({ searchParams }: { searchParams: Promise<{ industry?: string; software?: string }> }) {
  const { industry, software } = await searchParams;
  /** From the homepage software picker: the owner already told us what they run. */
  const busywork = typeof software === "string" && software.trim() ? `We use ${software.trim().slice(0, 60)}. What I'd hand off: ` : "";
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
            <ReviewForm initialIndustry={typeof industry === "string" ? industry.slice(0, 120) : ""} initialBusywork={busywork} />
          </div>
          <div className="side" style={{ gridColumn: "8 / 13" }}>
            <List {...review.ready} />
            <List {...review.get} />
            <List {...review.data} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
