"use client";

import { useRef, useState } from "react";
import Image from "next/image";

/**
 * Drag to compare two phone screenshots: the site today and this concept.
 * Pointer drag on the screen, plus a range input for keyboard users.
 */
export default function Compare({
  before,
  after,
  beforeAlt,
  afterAlt = "This concept on a phone",
  width = 554,
  height = 1200,
  labels = ["Today", "Concept"],
  rangeLabel = "Compare the current site with this concept",
  caption = "Drag the line. Left is today, right is this concept.",
}: {
  before: string;
  after: string;
  /** Describe what is broken in the current site's screenshot. */
  beforeAlt: string;
  afterAlt?: string;
  width?: number;
  height?: number;
  labels?: [string, string];
  rangeLabel?: string;
  caption?: string;
}) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const down = useRef(false);

  function setFromX(clientX: number) {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    const pct = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  }

  return (
    <figure className="cmp">
      <div
        ref={box}
        className="phone-screen cmp-screen"
        style={{ ["--pos" as string]: `${pos}%` }}
        onPointerDown={(e) => {
          down.current = true;
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          setFromX(e.clientX);
        }}
        onPointerMove={(e) => down.current && setFromX(e.clientX)}
        onPointerUp={() => (down.current = false)}
        onPointerCancel={() => (down.current = false)}
      >
        <Image src={after} alt={afterAlt} width={width} height={height} className="cmp-after" draggable={false} />
        <Image src={before} alt={beforeAlt} width={width} height={height} className="cmp-before" draggable={false} />
        <div className="cmp-handle" aria-hidden="true">
          <span>{labels[0]}</span>
          <span>{labels[1]}</span>
        </div>
        <input
          className="cmp-range"
          type="range"
          min={0}
          max={100}
          value={Math.round(pos)}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={rangeLabel}
        />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
