"use client";

import { useRef, useState } from "react";
import Image from "next/image";

/** Drag to compare: the current site and this concept, both on a phone. */
export default function Compare({ before, after }: { before: string; after: string }) {
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
        <Image src={after} alt="This concept on a phone" width={554} height={1200} className="cmp-after" draggable={false} />
        <Image
          src={before}
          alt="The current artisanskitchenflagstaff.com homepage on a phone: fixed-width layout, tiny navigation, text too small to read"
          width={554}
          height={1200}
          className="cmp-before"
          draggable={false}
        />
        <div className="cmp-handle" aria-hidden="true">
          <span>Today</span>
          <span>Concept</span>
        </div>
        <input
          className="cmp-range"
          type="range"
          min={0}
          max={100}
          value={Math.round(pos)}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Compare the current site with this concept"
        />
      </div>
      <figcaption>Drag the line. Left is today, right is this concept.</figcaption>
    </figure>
  );
}
