"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Strike } from "@/components/site/Bits";

type Still = { src: string; alt: string; bg?: string };
type Film = { mp4: string; webm?: string };

type Props = {
  eyebrow: string;
  headlineBefore: string;
  struck?: string;
  headlineAfter?: string;
  lead: string;
  primary: string;
  secondary?: { label: string; href: string };
  before: Still;
  /** The same desk after the desk has done the work. When present the hero moves from before to after on load. */
  after?: Still;
  /** A short film from before to after. Plays once on desktop; phones and reduced-motion get the wipe or the still. */
  film?: Film;
  caption?: string;
};

/**
 * The hero: a photograph of the trade's paperwork on the brand blue, the
 * headline on the clear left third. The page's one load moment: the strike
 * draws through the word, then the work gets done. With a film, the sheets
 * stamp and file themselves and the tally prints; without one, the "after"
 * plate is swept in left to right. Reduced-motion shows the finished desk.
 */
export function PhotoHero({ eyebrow, headlineBefore, struck, headlineAfter, lead, primary, secondary, before, after, film, caption }: Props) {
  const hero = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const node = hero.current;
    if (!node || !after) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.classList.add("swept", "still");
      return;
    }
    const clip = video.current;
    const canFilm = clip && film && matchMedia("(min-width: 981px)").matches;
    if (canFilm) {
      const onEnded = () => node.classList.add("swept", "still");
      clip.addEventListener("ended", onEnded);
      const t = setTimeout(() => {
        node.classList.add("filming");
        clip.play().catch(() => node.classList.add("swept"));
      }, 1200);
      return () => {
        clearTimeout(t);
        clip.removeEventListener("ended", onEnded);
      };
    }
    const t = setTimeout(() => node.classList.add("swept"), 1600);
    return () => clearTimeout(t);
  }, [after, film]);

  return (
    <div className="photo-hero" ref={hero} style={before.bg ? { background: before.bg } : undefined}>
      <div className="frame">
        <Image src={before.src} alt={before.alt} fill priority sizes="100vw" />
        {after && <Image className="after" src={after.src} alt={after.alt} fill priority sizes="100vw" />}
        {after && film && (
          <video ref={video} className="film" muted playsInline preload="auto" poster={before.src} aria-hidden>
            {film.webm && <source src={film.webm} type="video/webm" />}
            <source src={film.mp4} type="video/mp4" />
          </video>
        )}
        <div className="copy">
          <div className="wrap">
            <div className="inner">
              <p className="q">{eyebrow}</p>
              <h1>
                {headlineBefore} {struck && <Strike>{struck}</Strike>}
                {headlineAfter && <> {headlineAfter}</>}
              </h1>
              <p className="lead">{lead}</p>
              <div className="actions">
                <Link className="btn paper" href="/review" data-cta="hero">
                  {primary} <span className="dot" />
                </Link>
                {secondary && (
                  <Link className="link" href={secondary.href} data-cta="hero-secondary">
                    {secondary.label}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        {caption && <span className="caption">{caption}</span>}
      </div>
    </div>
  );
}
