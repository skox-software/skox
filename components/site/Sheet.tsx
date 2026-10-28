"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { SheetRow } from "@/content/site";

type Props = {
  caption: string;
  sample: string;
  rows: readonly SheetRow[];
  total: string;
  totalNote: string;
  approve: string;
  approveHref: string;
};

/**
 * The job sheet: the product, shown as a sheet of paper. It fills in row by
 * row once on load (about four seconds for "4 min 12 s"), the foot line last.
 * Reduced-motion shows it finished. The one motion in the design beyond the
 * strike (DESIGN.md §7).
 */
export function Sheet({ caption, sample, rows, total, totalNote, approve, approveHref }: Props) {
  const sheet = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sheet.current;
    if (!node || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    node.classList.add("run");
    const timers: ReturnType<typeof setTimeout>[] = [];
    const lines = Array.from(node.querySelectorAll<HTMLElement>("tbody tr"));
    lines.forEach((row, i) => timers.push(setTimeout(() => row.classList.add("on"), 700 + i * 600)));
    const foot = node.querySelector<HTMLElement>(".foot");
    timers.push(setTimeout(() => foot?.classList.add("on"), 700 + lines.length * 600 + 200));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="paper-doc sheet" ref={sheet}>
      <div className="cap">
        <h3>{caption}</h3>
        <span className="small">{sample}</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>Document</th>
            <th className="src-col">Source</th>
            <th>Status</th>
            <th className="right time">Time</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.doc}>
              <td>
                {row.doc}
                {row.note && <span className="src">{row.note}</span>}
              </td>
              <td className="src-col">{row.source}</td>
              <td>
                <span className={row.waiting ? "st wait" : "st"}>{row.status}</span>
              </td>
              <td className="right num time">{row.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="foot">
        <span>
          <strong>{total}</strong> <span className="ink2">{totalNote}</span>
        </span>
        <Link className="btn ink" href={approveHref} style={{ minHeight: 48 }}>
          {approve} <span className="dot" />
        </Link>
      </div>
    </div>
  );
}
