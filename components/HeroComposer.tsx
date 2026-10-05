"use client";
import { useEffect, useState } from "react";
import { track } from "@/lib/track";
import { landing, builds, type BuildType } from "@/content/landing";
import { sendBrief } from "@/lib/brief";
import { readBrief, type ScopeReading } from "@/lib/scope";

const REDUCED = "(prefers-reduced-motion: reduce)";
/** Long enough that the readout waits for a thought, short enough to feel live. */
const SETTLE_MS = 420;

/**
 * The hero's single input, and the thing the fold is built around.
 *
 * Whatever is typed is carried straight into the enquiry form below, so the
 * control does what it appears to do. On top of that it reads the brief as it
 * is written and unfolds the matching scope — closest build, our published
 * timeline, what that build includes. Every figure shown is one already
 * published on this page; nothing is generated, estimated or implied.
 */
export function HeroComposer() {
  const [value, setValue] = useState("");
  /** Set when the visitor overrides the guess, so typing stops fighting them. */
  const [pinned, setPinned] = useState<BuildType | null>(null);
  /**
   * The reading that has actually landed. Derived state stays derived; only
   * the settle delay — the beat that makes the readout feel considered rather
   * than twitchy — needs to live in an effect.
   */
  const [settled, setSettled] = useState<ScopeReading | null>(null);

  const target = pinned
    ? { build: builds.find((item) => item.id === pinned)!, matched: [] }
    : readBrief(value);
  const targetId = target?.build.id ?? null;

  useEffect(() => {
    if (!target) return;
    const delay = window.matchMedia(REDUCED).matches ? 0 : SETTLE_MS;
    const id = window.setTimeout(() => setSettled(target), delay);
    return () => window.clearTimeout(id);
    // The brief only matters here through the build it resolves to.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetId]);

  // Nothing to show the moment the brief stops resolving to a build; while a
  // new one settles the previous card stays up rather than blinking out.
  const reading = target ? settled : null;
  const thinking = Boolean(target) && settled?.build.id !== targetId;

  // Once a brief is on screen the generic intro is the least useful line in
  // the fold, and the space it holds is what pushes the CTA under it. Folding
  // it away is what keeps the readout from costing the primary action.
  useEffect(() => {
    const intro = document.querySelector<HTMLElement>(".hero-copy .hero-intro");
    intro?.classList.toggle("is-folded", Boolean(reading));
  }, [reading]);

  const summary = reading
    ? `Closest fit: ${reading.build.label}. ${reading.build.timeline}.`
    : "";

  // Ghost text, typed and rubbed out while the field sits empty and unfocused.
  // Plenty of visitors know something is wrong without knowing what to ask
  // for; watching the box fill itself in is the cheapest way to show them.
  const [ghost, setGhost] = useState("");
  const [focused, setFocused] = useState(false);
  const idle = !value && !focused;

  useEffect(() => {
    if (!idle || window.matchMedia(REDUCED).matches) return;
    const phrases = landing.composerTypewriter;
    let timer = 0;
    let phrase = 0;
    let cut = 0;
    let erasing = false;

    const step = () => {
      const full = phrases[phrase];
      cut += erasing ? -1 : 1;
      setGhost(full.slice(0, cut));

      let delay = erasing ? 26 : 58;
      if (!erasing && cut === full.length) {
        // Long enough to read the whole line before it starts coming apart.
        erasing = true;
        delay = 1900;
      } else if (erasing && cut === 0) {
        erasing = false;
        phrase = (phrase + 1) % phrases.length;
        delay = 340;
      }
      timer = window.setTimeout(step, delay);
    };

    timer = window.setTimeout(step, 900);
    return () => window.clearTimeout(timer);
  }, [idle]);

  const ghosting = idle && ghost.length > 0;

  function fillExample(text: string) {
    setValue(text);
    setPinned(null);
    track("hero_composer_example", { text });
    document.getElementById("hero-brief")?.focus();
  }

  function pin(id: BuildType) {
    setPinned(id);
    track("hero_scope_pinned", { type: id });
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const brief = value.trim();
    track("hero_composer_submitted", {
      filled: brief.length > 0,
      read: reading?.build.id ?? "none",
    });
    // The reading travels with the text, so the form opens already answered.
    sendBrief({ text: brief, build: reading?.build.id });
    document.getElementById("scope")?.scrollIntoView({ block: "start" });
    // Land on the first field still needing an answer, without letting focus
    // fight the scroll that just ran.
    document
      .getElementById(brief ? "project-name" : "project-broken")
      ?.focus({ preventScroll: true });
  }

  const open = Boolean(reading);
  const others = builds.filter((build) => build.id !== reading?.build.id);

  return (
    <div className="hero-console" data-open={open ? "true" : "false"}>
      <form data-clarity-mask="true" className="hero-composer" onSubmit={submit}>
        <label className="sr-only" htmlFor="hero-brief">
          {landing.composerLabel}
        </label>
        <span className="composer-field">
          <input
            id="hero-brief"
            name="brief"
            type="text"
            autoComplete="off"
            maxLength={4000}
            /* The ghost stands in for the placeholder while it is running, so
               the two never print on top of each other. */
            placeholder={ghosting ? "" : landing.composerPlaceholder}
            value={value}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(event) => {
              setValue(event.target.value);
              setPinned(null);
            }}
          />
          {ghosting && (
            <span className="composer-ghost" aria-hidden>
              {ghost}
              <i />
            </span>
          )}
        </span>
        <span className={`composer-pulse${thinking ? " is-thinking" : ""}`} aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <button type="submit" aria-label={landing.composerSubmit}>
          <span aria-hidden="true">↗</span>
        </button>
      </form>

      {/* The slot below the input holds one of two things: the starting points,
          or the scope those starting points unfold into. */}
      <div className="console-slot">
        <div className={`examples-clip${open ? " is-closed" : ""}`}>
          <ul className="composer-examples" aria-hidden={open}>
            {landing.composerExamples.map((example) => (
              <li key={example}>
                <button
                  type="button"
                  tabIndex={open ? -1 : 0}
                  onClick={() => fillExample(example)}
                >
                  {example}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`scope-readout${open ? " is-open" : ""}`}
          inert={!open ? true : undefined}
        >
          <div className="readout-clip">
            {reading && (
              <div className="readout-inner" key={reading.build.id}>
                <header>
                  <span className="micro">Closest fit</span>
                  <strong>{reading.build.label}</strong>
                  <span className="readout-timeline">
                    {reading.build.timeline}
                  </span>
                </header>
                <ul>
                  {reading.build.includes.map((item) => (
                    <li key={item}>
                      <span aria-hidden>↳</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <footer>
                  <span>{reading.build.note}</span>
                  <span className="readout-switch">
                    Not it?
                    {others.map((build) => (
                      <button
                        key={build.id}
                        type="button"
                        onClick={() => pin(build.id)}
                      >
                        {build.label}
                      </button>
                    ))}
                  </span>
                </footer>
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {summary}
      </p>
    </div>
  );
}
