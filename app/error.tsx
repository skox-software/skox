"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="landing-page">
      <main className="page-narrow page-centred">
        <div>
          <p className="eyebrow">Error</p>
          <h1>Something broke on our end.</h1>
          <div className="page-actions">
            <button
              onClick={reset}
              className="button button-primary"
              type="button"
            >
              Try again
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
