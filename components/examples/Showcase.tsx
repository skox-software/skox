import type { ComponentType } from "react";

/** One concept in an examples page: what it's for, then the live build. */
export type ShowcaseItem = {
  id: string;
  industry: string;
  title: string;
  for: string;
  connects: string;
  style: string;
  try: string;
  Component: ComponentType;
};

export function ShowcaseSection({ item, index }: { item: ShowcaseItem; index: number }) {
  const { Component } = item;
  return (
    <section id={item.id} className="ex-section shell" aria-labelledby={`${item.id}-title`}>
      <div className="ex-meta">
        <p className="ex-number">
          {String(index + 1).padStart(2, "0")} · {item.industry}
        </p>
        <h2 id={`${item.id}-title`}>{item.title}</h2>
        <p className="ex-for">{item.for}</p>
        <dl>
          <div>
            <dt>Connects to</dt>
            <dd>{item.connects}</dd>
          </div>
          <div>
            <dt>Style</dt>
            <dd>{item.style}</dd>
          </div>
          <div>
            <dt>Try it</dt>
            <dd>{item.try}</dd>
          </div>
        </dl>
      </div>
      <ShowcaseFrame label={`${item.industry} concept`}>
        <Component />
      </ShowcaseFrame>
    </section>
  );
}

/** The framed, scrollable stage every concept sits in, tagged as sample data. */
export function ShowcaseFrame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="ex-frame">
      <span className="ex-tag">Concept · sample data</span>
      <div className="ex-scroll" tabIndex={0} aria-label={`${label}, scrollable`}>
        {children}
      </div>
      <p className="ex-scroll-hint" aria-hidden>
        Scroll sideways to see all of it →
      </p>
    </div>
  );
}
