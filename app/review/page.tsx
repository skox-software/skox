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

export default function ReviewPage() {
  return (
    <div className="ub">
      <Header />
      <main id="top" tabIndex={-1}>
        <div className="hero paper">
          <div className="wrap grid">
            <div className="c1-6">
              <p className="q enter">{review.eyebrow}</p>
              <h1 className="enter">
                {review.headlineBefore} <Strike>{review.struck}</Strike>
                {review.headlineAfter}
              </h1>
              <p className="lead enter d1">{review.lead}</p>
            </div>
          </div>
        </div>
        <div className="wrap grid review-body">
          <div className="c1-6">
            <ReviewForm />
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
