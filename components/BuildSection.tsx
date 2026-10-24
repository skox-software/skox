"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { track } from "@/lib/track";
import { BuildPreview } from "@/components/BuildPreview";
import { builds, landing, type BuildType } from "@/content/landing";

/** Where each build's working examples live. Websites have none yet. */
const EXAMPLE_PAGES: Partial<Record<BuildType, string>> = {
  dashboards: "/dashboard-examples",
  "web-apps": "/internal-tool-examples",
};

/**
 * "What we build" — the demo and the three build cards, sharing one selection.
 *
 * They used to be two unrelated widgets stacked on top of each other, both
 * describing the same three builds: you picked a tab, then scrolled past three
 * cards covering all three anyway. Now the tab strip and the cards are the same
 * control, so choosing a build in either place moves the other.
 */
export function BuildSection({ variant }: { variant?: BuildType }) {
  const chosen = builds.find((build) => build.id === variant);
  const [selected, setSelected] = useState<BuildType>(variant || "websites");
  const preview = useRef<HTMLDivElement>(null);
  const cards = useRef<HTMLDivElement>(null);

  const orderedBuilds = chosen
    ? [chosen, ...builds.filter((build) => build.id !== variant)]
    : builds;

  /** Selecting from a card has to bring the thing it changed into view. */
  function chooseFromCard(id: BuildType) {
    setSelected(id);
    track("build_card_selected", { type: id });
    preview.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }

  /** Selecting from the tabs has to do the same for the matching card. */
  function chooseFromTabs(id: BuildType) {
    setSelected(id);
    cards.current
      ?.querySelector<HTMLElement>(`[data-build="${id}"]`)
      ?.scrollIntoView({ block: "nearest", inline: "center" });
  }

  return (
    <section className="section shell" id="build" aria-labelledby="build-title">
      <div className="section-heading rise">
        <div>
          <p className="eyebrow">{landing.offerEyebrow}</p>
          <h2 id="build-title">{landing.offerTitle}</h2>
        </div>
        <p>{landing.offerSub}</p>
      </div>

      <div className="rise" ref={preview}>
        <BuildPreview selected={selected} onSelect={chooseFromTabs} />
      </div>

      <div className="build-grid rise-stagger" ref={cards}>
        {orderedBuilds.map((build) => (
          <article
            key={build.id}
            data-build={build.id}
            className={`build-card ${selected === build.id ? "build-card-selected" : ""}`}
          >
            {/* The card's top row is the selector. The CTA at the bottom stays a
                link, so a card never nests one control inside another. */}
            <button
              type="button"
              className="build-card-top"
              aria-pressed={selected === build.id}
              onClick={() => chooseFromCard(build.id)}
            >
              <span className="micro">
                {build.number} / {build.label}
              </span>
              <span className="build-card-demo">
                {selected === build.id ? "Showing above" : "See it working"}
                <span aria-hidden>↑</span>
              </span>
            </button>
            <h3>{build.title}</h3>
            <p>{build.description}</p>
            <ul>
              {build.includes.map((item) => (
                <li key={item}>
                  <span aria-hidden>↳</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="build-timing">
              <strong>{build.timeline}</strong>
              <span>{build.note}</span>
            </div>
            {EXAMPLE_PAGES[build.id] && (
              <Link className="build-examples" href={EXAMPLE_PAGES[build.id]!} data-cta={`examples-${build.id}`}>
                Try four working examples <span aria-hidden="true">→</span>
              </Link>
            )}
            <a
              className="build-link"
              href={variant === build.id ? "#scope" : `/${build.id}#scope`}
              data-cta={`build-${build.id}`}
            >
              {build.cta}
              <span aria-hidden="true">↗</span>
            </a>
          </article>
        ))}
      </div>

      {/* The objection at this exact moment is "what is this going to cost me,
          and what happens if it goes wrong". Answering it beside the choice,
          rather than three sections away, is worth more than another feature. */}
      <ul className="build-assurance">
        {landing.buildAssurance.map((item) => (
          <li key={item}>
            <span aria-hidden>✓</span>
            {item}
          </li>
        ))}
      </ul>

      <p className="integration-note">
        <span aria-hidden>＋</span>
        {landing.integrations}
      </p>
    </section>
  );
}
