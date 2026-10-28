"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="ub">
      <main className="page">
        <p className="meta">Error</p>
        <h1>Something broke on our end.</h1>
        <div className="page-actions">
          <button onClick={reset} className="btn blue" type="button">
            Try again <span className="dot" />
          </button>
        </div>
      </main>
    </div>
  );
}
