"use client";

import { useEffect, useRef, useState } from "react";
import pins from "./pins.json";

/**
 * The flight over the isthmus.
 *
 * 121 photoreal frames rendered in Google Earth Studio, scrubbed on a canvas as
 * you scroll. The camera starts over Lake Monona, passes the Capitol, drops
 * into Schenk-Atwood at 309 Elmside, crosses to 833 Erin by Monona Bay, then
 * pulls back to show both. The path was first blocked out in Blender
 * (scripts/concepts/mccaughey-isthmus.py) and re-keyed in Earth Studio.
 *
 * At each stop the scroll holds the camera still and the pin opens: a circle
 * grows out of it into the homes' own listing photos while the aerial zooms in
 * behind, then closes again and the flight carries on.
 *
 * pins.json says where each pin lands on screen in every frame (normalised 0–1
 * across the 16:9 render), computed by replaying Earth Studio's own camera
 * keyframes (scripts/concepts/mccaughey-earth-pins.py).
 *
 * Google requires an on-screen Google Earth credit on all Earth Studio
 * imagery. It is burned into each frame bottom-right, but a phone's cover-crop
 * can cut that corner off, so the stage carries its own credit as well.
 *
 * Performance: everything per-scroll is written straight to the DOM in one
 * requestAnimationFrame (no React re-render per frame), frames are decoded
 * before first use, the canvas is drawn at the frames' own resolution rather
 * than the screen's, and nothing over the moving canvas uses backdrop-filter.
 * React state changes only when the chapter changes.
 */
const FRAMES = 121;
const src = (i: number) =>
  `/concepts/mccaughey/frames/${String(i + 1).padStart(4, "0")}.webp`;

type PinKey = "capitol" | "elmside" | "erin";
type Track = Record<PinKey, [number, number, number]>[];
const track = pins as Track;

/**
 * Scroll timeline, in arbitrary units. The camera holds still at each stop
 * while the photos open.
 */
const UNITS = 220;
const frameKeys: [number, number][] = [
  [0, 0],
  [57, 57],
  [107, 57],
  [145, 95],
  [195, 95],
  [220, 120],
];

type Stop = {
  key: "elmside" | "erin";
  pin: PinKey;
  from: number;
  to: number;
  frame: number;
  photos: { src: string; caption: string }[];
};
const stops: Stop[] = [
  {
    key: "elmside",
    pin: "elmside",
    from: 57,
    to: 107,
    frame: 57,
    photos: [
      { src: "309-front", caption: "309 Elmside Blvd" },
      { src: "309-kitchen", caption: "309 Elmside Blvd · Kitchen" },
      { src: "317-front", caption: "317 Elmside Blvd" },
      { src: "317-living", caption: "317 Elmside Blvd · Living room" },
    ],
  },
  {
    key: "erin",
    pin: "erin",
    from: 145,
    to: 195,
    frame: 95,
    photos: [
      { src: "833-front", caption: "833 Erin St" },
      { src: "833-kitchen", caption: "833 Erin St · Kitchen" },
      { src: "833-dining", caption: "833 Erin St · Dining room" },
      { src: "829-front", caption: "829 Erin St" },
    ],
  },
];
const OPEN = 10; // units to open or close the circle

const chapters = [
  { from: 0, to: 22, id: "intro" },
  { from: 22, to: 40, id: "capitol" },
  { from: 46, to: 109, id: "elmside" },
  { from: 132, to: 197, id: "erin" },
  { from: 205, to: 221, id: "outro" },
] as const;
type ChapterId = (typeof chapters)[number]["id"];

/** Pin labels show only while their chapter is up and the photos are shut. */
const pinChapters: Record<PinKey, string[]> = {
  capitol: ["capitol"],
  elmside: ["elmside", "outro"],
  erin: ["erin", "outro"],
};

const pinLabel: Record<PinKey, { name: string; sub: string; status?: string }> = {
  capitol: { name: "State Capitol", sub: "Downtown" },
  elmside: { name: "309 Elmside Blvd", sub: "Schenk-Atwood", status: "Available now" },
  erin: { name: "833 Erin St", sub: "Campus/Central" },
};

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => t * t * (3 - 2 * t);

function frameAt(u: number) {
  for (let i = 0; i < frameKeys.length - 1; i++) {
    const [u0, f0] = frameKeys[i];
    const [u1, f1] = frameKeys[i + 1];
    if (u <= u1) return f0 + (f1 - f0) * ((u - u0) / (u1 - u0 || 1));
  }
  return FRAMES - 1;
}

export default function IsthmusFlight() {
  const section = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const pinEls = useRef<Record<string, HTMLDivElement | null>>({});
  const stopEls = useRef<Record<string, HTMLDivElement | null>>({});
  const progress = useRef<HTMLSpanElement>(null);
  const images = useRef<(HTMLImageElement | null)[]>([]);
  const [chapter, setChapter] = useState<ChapterId | undefined>("intro");

  useEffect(() => {
    const c = canvas.current;
    const el = section.current;
    const st = stage.current;
    if (!c || !el || !st) return;
    const ctx = c.getContext("2d", { alpha: false });
    if (!ctx) return;

    let raf = 0;
    let drawn = -1;
    let lastChapter: string | undefined = "intro";
    let size = { w: st.clientWidth, h: st.clientHeight };

    const nearest = (i: number) => {
      for (let d = 0; d < FRAMES; d++) {
        if (images.current[i - d]) return images.current[i - d]!;
        if (images.current[i + d]) return images.current[i + d]!;
      }
      return null;
    };

    const draw = (i: number) => {
      const img = nearest(i);
      if (!img) return;
      // object-fit: cover, at the canvas's own (frame-sized) resolution
      const s = Math.max(c.width / img.naturalWidth, c.height / img.naturalHeight);
      const w = img.naturalWidth * s;
      const h = img.naturalHeight * s;
      ctx.drawImage(img, (c.width - w) / 2, (c.height - h) / 2, w, h);
      drawn = images.current[i] ? i : -1;
    };

    // Map a normalised 16:9 render coordinate into the cover-cropped stage.
    const place = (x: number, y: number) => {
      const s = Math.max(size.w / 16, size.h / 9);
      return { x: (size.w - 16 * s) / 2 + x * 16 * s, y: (size.h - 9 * s) / 2 + y * 9 * s };
    };

    const tick = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const u = clamp(-r.top / Math.max(1, total)) * UNITS;
      const f = frameAt(u);
      const fi = Math.round(f);
      if (fi !== drawn) draw(fi);

      // Stops: circle grows out of the pin, aerial zooms in behind it.
      let zoom = 1;
      let origin = "50% 50%";
      let anyOpen = false;
      for (const s of stops) {
        const box = stopEls.current[s.key];
        if (!box) continue;
        const open =
          u < s.from || u > s.to
            ? 0
            : ease(clamp((u - s.from) / OPEN)) * ease(clamp((s.to - u) / OPEN));
        const [px, py] = track[s.frame][s.pin];
        const p = place(px, py);
        if (open > 0.001) {
          anyOpen = true;
          zoom = 1 + 0.7 * open;
          origin = `${p.x}px ${p.y}px`;
          const R = Math.hypot(size.w, size.h) * open;
          box.style.visibility = "visible";
          box.style.clipPath = `circle(${R}px at ${p.x}px ${p.y}px)`;
          // Which photo: spread across the fully-open stretch.
          const inner = clamp((u - s.from - OPEN) / (s.to - s.from - 2 * OPEN));
          const pos = inner * (s.photos.length - 1);
          const kids = box.children;
          for (let k = 0; k < s.photos.length; k++) {
            const node = kids[k] as HTMLElement;
            const vis = clamp(1 - Math.abs(pos - k) * 1.6);
            node.style.opacity = String(k === 0 && pos < 0 ? 1 : vis);
            const img = node.firstElementChild as HTMLElement;
            // Zoom in as it opens, then a slow push while it is up.
            const kb = 1 + 0.06 * clamp(pos - k + 0.5);
            img.style.transform = `scale(${(1.35 - 0.35 * open) * kb})`;
          }
        } else {
          box.style.visibility = "hidden";
        }
      }
      c.style.transformOrigin = origin;
      c.style.transform = zoom === 1 ? "" : `scale(${zoom})`;

      const ch = chapters.find((x) => u >= x.from && u < x.to)?.id;
      for (const k of Object.keys(pinLabel) as PinKey[]) {
        const pe = pinEls.current[k];
        if (!pe) continue;
        const [x, y, front] = track[fi][k];
        const on = !!ch && pinChapters[k].includes(ch) && !!front && !anyOpen;
        const p = place(x, y);
        pe.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
        pe.classList.toggle("is-on", on);
        pe.classList.toggle("pin-flip", p.x + 220 > size.w);
      }
      if (progress.current)
        progress.current.style.transform = `scaleX(${u / UNITS})`;
      if (ch !== lastChapter) {
        lastChapter = ch;
        setChapter(ch);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const resize = () => {
      size = { w: st.clientWidth, h: st.clientHeight };
      // Frames are 1280 wide; a canvas much bigger than that only costs fill
      // rate on every scroll tick, and the browser scales it up smoothly.
      const k = Math.min(1, 1440 / Math.max(size.w, 1));
      c.width = Math.round(size.w * k);
      c.height = Math.round(size.h * k);
      drawn = -1;
      tick();
    };

    // Load a coarse pass first (every 8th frame) so scrubbing works almost at
    // once, then fill in. Each frame is decoded before it can be drawn, so a
    // draw never stalls on decoding.
    const order: number[] = [];
    for (const step of [8, 4, 2, 1])
      for (let i = 0; i < FRAMES; i += step) if (!order.includes(i)) order.push(i);
    let next = 0;
    let cancelled = false;
    const loadOne = () => {
      if (cancelled || next >= order.length) return;
      const i = order[next++];
      const img = new Image();
      img.src = src(i);
      img
        .decode()
        .then(() => {
          if (cancelled) return;
          images.current[i] = img;
          if (drawn < 0) onScroll();
        })
        .catch(() => {})
        .finally(loadOne);
    };
    for (let k = 0; k < 4; k++) loadOne();

    resize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      cancelled = true;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="flight" ref={section} aria-label="Fly over the isthmus">
      <div className="flight-stage" ref={stage} data-chapter={chapter ?? "between"}>
        <canvas ref={canvas} className="flight-canvas" aria-hidden="true" />

        {stops.map((s) => (
          <div
            key={s.key}
            className="stop-photos"
            ref={(n) => {
              stopEls.current[s.key] = n;
            }}
            aria-hidden="true"
          >
            {s.photos.map((p) => (
              <figure key={p.src} className="stop-photo">
                <img src={`/concepts/mccaughey/homes/${p.src}.webp`} alt="" loading="lazy" decoding="async" />
                <figcaption>{p.caption}</figcaption>
              </figure>
            ))}
          </div>
        ))}

        <div className="flight-vignette" aria-hidden="true" />

        <div className="flight-pins" aria-hidden="true">
          {(Object.keys(pinLabel) as PinKey[]).map((k) => {
            const label = pinLabel[k];
            return (
              <div
                key={k}
                className={`pin pin-${k}`}
                ref={(n) => {
                  pinEls.current[k] = n;
                }}
              >
                <span className="pin-dot" />
                <span className="pin-card">
                  <strong>{label.name}</strong>
                  <span>
                    {label.sub}
                    {label.status && <em>{label.status}</em>}
                  </span>
                </span>
              </div>
            );
          })}
        </div>

        <div className="flight-copy shell">
          <div className={`chap ${chapter === "intro" ? "is-on" : ""}`}>
            <p className="eyebrow">McCaughey Properties · Madison, WI</p>
            <h1>
              Home, between
              <br />
              the lakes.
            </h1>
            <p className="lede">
              Campus-area efficiencies, apartments and flats, and houses on the
              near east side. Locally owned in Madison since 1995.
            </p>
            <p className="scroll-hint">Scroll to fly in</p>
          </div>

          <div className={`chap ${chapter === "capitol" ? "is-on" : ""}`}>
            <p className="eyebrow">Mendota to the north · Monona to the south</p>
            <h2>A narrow strip of land, two lakes, one Capitol.</h2>
            <p className="lede">
              Every McCaughey home sits on or near the isthmus, close to UW,
              downtown, the lakes and the bike paths.
            </p>
          </div>

          <div className={`chap chap-card ${chapter === "elmside" ? "is-on" : ""}`}>
            <p className="eyebrow">Schenk-Atwood · near east side</p>
            <h2>309 Elmside Blvd</h2>
            <ul className="facts">
              <li><b>3</b> bed</li>
              <li><b>2</b> bath</li>
              <li><b>1</b> garage</li>
              <li className="is-live">Available now</li>
            </ul>
            <p className="lede">
              Newer total remodel, close to Lake Monona and the bike trails.
              Neighbours with 313 and 317 Elmside, 310–314 Maple and 2901 Atwood.
            </p>
            <a className="btn" href="#showing">
              Request a showing
            </a>
          </div>

          <div className={`chap chap-card ${chapter === "erin" ? "is-on" : ""}`}>
            <p className="eyebrow">Campus/Central · Monona Bay</p>
            <h2>829–833 Erin St</h2>
            <ul className="facts">
              <li>Three homes</li>
              <li>One block</li>
            </ul>
            <p className="lede">
              Off South Park Street, across from St. Mary’s Hospital and on the
              city bus line.
            </p>
            <a className="btn btn-ghost" href="#listings">
              Get told when one opens up
            </a>
          </div>

          <div className={`chap chap-right ${chapter === "outro" ? "is-on" : ""}`}>
            <p className="eyebrow">Two neighbourhoods · one landlord</p>
            <h2>Find your place on the isthmus.</h2>
            <div className="chap-actions">
              <a className="btn" href="#listings">
                See every rental
              </a>
              <a className="btn btn-ghost" href="tel:+16085169497">
                Call or text 608-516-9497
              </a>
            </div>
          </div>
        </div>

        <p className="flight-credit">Imagery © Google Earth · Photos McCaughey Properties</p>

        <div className="flight-progress" aria-hidden="true">
          <span ref={progress} />
        </div>
      </div>
    </section>
  );
}
