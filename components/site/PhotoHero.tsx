"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Strike } from "@/components/site/Bits";

type Still = { src: string; alt: string; bg?: string };

type Props = {
  eyebrow: string;
  headlineBefore: string;
  struck?: string;
  headlineAfter?: string;
  lead: string;
  primary: string;
  secondary?: { label: string; href: string };
  before: Still;
  /** The same desk, cleared. When present the hero sweeps from before to after on load. */
  after?: Still;
  caption?: string;
};

/**
 * The hero: a photograph of the trade's paperwork on the brand blue, the
 * headline on the clear left third. With an "after" plate the page's one
 * load moment plays: the strike draws through the word, then the pile is
 * swept away left to right, leaving the cleared desk. Reduced-motion shows
 * the cleared desk at once.
 */
export function PhotoHero({ eyebrow, headlineBefore, struck, headlineAfter, lead, primary, secondary, before, after, caption }: Props) {
  const hero = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = hero.current;
    if (!node || !after) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.classList.add("swept");
      return;
    }
    const t = setTimeout(() => node.classList.add("swept"), 1600);
    return () => clearTimeout(t);
  }, [after]);

  return (
    <div className="photo-hero" ref={hero} style={before.bg ? { background: before.bg } : undefined}>
      <div className="frame">
        <Image src={before.src} alt={before.alt} fill priority sizes="100vw" />
        {after && <Image className="after" src={after.src} alt={after.alt} fill priority sizes="100vw" />}
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
