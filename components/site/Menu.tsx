"use client";

import Link from "next/link";
import { useRef } from "react";

/** Phone-only menu: the section links in a <details>, closed again once one is tapped. */
export function Menu({ links }: { links: readonly { label: string; href: string }[] }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const summary = useRef<HTMLElement>(null);
  const close = () => ref.current?.removeAttribute("open");
  /** Escape closes it and puts focus back on Menu. */
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "Escape" || !ref.current?.open) return;
    e.preventDefault();
    close();
    summary.current?.focus();
  };
  return (
    <details className="menu" ref={ref} onKeyDown={onKey}>
      <summary ref={summary}>Menu</summary>
      <div className="menu-links">
        {links.map((link) => (
          <Link key={link.href} href={link.href} onClick={close}>
            {link.label}
          </Link>
        ))}
      </div>
    </details>
  );
}
