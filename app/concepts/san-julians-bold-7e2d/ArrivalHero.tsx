"use client";

import { ArrowUpRight } from "../san-julians-4c9f2a71/icons";

/**
 * The arrival sequence.
 *
 * An earlier version floated a cut-out cup on a colour field. That reads as a
 * product page — the way a canned drink is sold — and a café is not a SKU, it
 * is a room you walk into. Cutting the cup out of its photograph removed the
 * wooden ledge, the wall and the light, which were the things that made it feel
 * like somewhere.
 *
 * So the photographs are whole and full-bleed here, and scrolling walks you in:
 * the street, the room, the drink in front of you. Driven by a named
 * view-timeline so it is pure CSS — no scroll library, no pinning that fights
 * a phone's native scrolling.
 */
const frames = [
  {
    img: "/concepts/san-julians/ig/ig-01.jpg",
    chapter: "Orlando Ave · Winter Park",
    line: ["Good morning,", "Winter Park"],
    body: "Open daily from 7:30. Breakfast all day, and the dog is welcome.",
  },
  {
    img: "/concepts/san-julians/interior.jpg",
    chapter: "Inside",
    line: ["A room worth", "sitting in"],
    body: "Wi-Fi, a seat by the window, live music some evenings.",
  },
  {
    img: "/concepts/san-julians/coffee.jpeg",
    chapter: "The coffee",
    line: ["Grown in", "San Julián"],
    body: "Colombian beans from the hills of Caldas. The name over the door is the farm.",
  },
];

export default function ArrivalHero() {
  return (
    <section className="arrival" aria-labelledby="arrival-title">
      <div className="arrival-view">
        {frames.map((f, i) => (
          <div className={`arrival-frame frame-${i}`} key={f.chapter}>
            <img src={f.img} alt="" aria-hidden="true" />
            <div className="arrival-scrim" />
          </div>
        ))}

        <div className="arrival-copy shell">
          {frames.map((f, i) => (
            <div className={`arrival-text text-${i}`} key={f.chapter}>
              <p className="chapter">{f.chapter}</p>
              {i === 0 ? (
                <h1 id="arrival-title">
                  {f.line[0]}
                  <br />
                  {f.line[1]}
                </h1>
              ) : (
                <p className="arrival-line" aria-hidden="true">
                  {f.line[0]}
                  <br />
                  {f.line[1]}
                </p>
              )}
              <p className="arrival-body">{f.body}</p>
            </div>
          ))}

          <div className="arrival-actions">
            <a className="btn arrival-cta" href="#menu">
              Order pickup <ArrowUpRight size={16} />
            </a>
            <a className="btn btn-ghost arrival-ghost" href="#visit">
              Find us
            </a>
          </div>
        </div>

        <div className="arrival-hint" aria-hidden="true">
          <span>Scroll</span>
          <i />
        </div>
      </div>
    </section>
  );
}
