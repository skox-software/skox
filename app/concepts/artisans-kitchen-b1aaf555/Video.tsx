"use client";

import { useState } from "react";

/**
 * Click-to-play facade for the September 2026 promo video (ledger C4). Nothing
 * from YouTube loads until the viewer presses play; then the privacy-enhanced
 * embed is used.
 */
export default function Video({ id, poster }: { id: string; poster: string }) {
  const [play, setPlay] = useState(false);
  return (
    <div className="video">
      {play ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title="Artisan's Kitchen promo video"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" className="video-poster" onClick={() => setPlay(true)} aria-label="Play the Artisan's Kitchen video">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={poster} alt="" width={1280} height={720} />
          <span className="video-play" aria-hidden="true">
            ▶
          </span>
          <span className="video-caption">Watch 1:22 · filmed September 2026</span>
        </button>
      )}
    </div>
  );
}
