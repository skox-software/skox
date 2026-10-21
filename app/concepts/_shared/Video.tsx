"use client";

import { useState } from "react";

/**
 * Click-to-play YouTube facade. Nothing from YouTube loads until the viewer
 * presses play; then the privacy-enhanced (nocookie) embed is used.
 */
export default function Video({
  id,
  poster,
  title,
  playLabel,
  caption,
}: {
  /** YouTube video id. */
  id: string;
  poster: string;
  /** iframe title, e.g. "<Business> promo video". */
  title: string;
  /** Accessible name of the play button. */
  playLabel: string;
  /** Shown on the poster, e.g. "Watch 1:22 · filmed September 2026". */
  caption: string;
}) {
  const [play, setPlay] = useState(false);
  return (
    <div className="video">
      {play ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" className="video-poster" onClick={() => setPlay(true)} aria-label={playLabel}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={poster} alt="" width={1280} height={720} />
          <span className="video-play" aria-hidden="true">
            ▶
          </span>
          <span className="video-caption">{caption}</span>
        </button>
      )}
    </div>
  );
}
