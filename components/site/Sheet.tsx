"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { SheetRow, TicketHead } from "@/content/site";

type Props = {
  caption: string;
  sample: string;
  head: TicketHead;
  rows: readonly SheetRow[];
  total: string;
  totalNote: string;
  approve: string;
  approveHref: string;
};

/**
 * The job ticket: the product, shown as the sheet an office actually handles.
 * A header block (job, address, received), ruled rows, the status that waits
 * on a person as a stamp, and a signature line at the foot. On load each row
 * is written left to right, one after another, the foot last; reduced-motion
 * shows it finished. With the strike, the only load motion on the site
 * (DESIGN.md §6).
 */
export function Sheet({ caption, sample, head, rows, total, totalNote, approve, approveHref }: Props) {
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
      <dl className="ticket-head">
        {head.map((cell) => (
          <div key={cell.label}>
            <dt>{cell.label}</dt>
            <dd>{cell.value}</dd>
          </div>
        ))}
      </dl>
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
                <span className={row.waiting ? "stamp" : "st"}>{row.status}</span>
              </td>
              <td className="right num time">{row.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="foot">
        <span className="total">
          <strong>{total}</strong> <span className="ink2">{totalNote}</span>
        </span>
        <span className="sign" aria-hidden>
          <span>Approved by</span>
        </span>
        <Link className="btn ink" href={approveHref} style={{ minHeight: 44 }}>
          {approve} <span className="dot" />
        </Link>
      </div>
    </div>
  );
}
