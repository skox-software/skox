import Link from "next/link";

export default function NotFound() {
  return (
    <div className="landing-page">
      <main className="page-narrow page-centred">
        <div>
          <p className="eyebrow">404</p>
          <h1>That page doesn&apos;t exist.</h1>
          <div className="page-actions">
            <Link href="/" className="button button-primary">
              Back to the start
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
