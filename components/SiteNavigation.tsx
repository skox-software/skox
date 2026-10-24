"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const groups = [
  { label: "Services", links: [["/websites", "Website design & development"], ["/#local-seo", "Local SEO"], ["/#automation", "Custom Automation Tools"]] },
  { label: "About SKOX", links: [["/#home-services", "How we help"], ["/#process", "How it works"], ["/#about", "Meet the founders"], ["/#faq", "Questions & answers"]] },
];

export function SiteNavigation() {
  const nav = useRef<HTMLElement>(null);
  useEffect(() => {
    function outside(event: PointerEvent) {
      if (event.target instanceof Node && !nav.current?.contains(event.target)) {
        nav.current?.querySelectorAll("details[open]").forEach(item => item.removeAttribute("open"));
      }
    }
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, []);
  return <nav ref={nav} className="site-navigation" aria-label="Main navigation" onKeyDown={event => {
    if (event.key === "Escape") {
      const opened = nav.current?.querySelector<HTMLDetailsElement>("details[open]");
      opened?.removeAttribute("open");
      opened?.querySelector("summary")?.focus();
    }
  }}>
    {groups.map(group => <details key={group.label} onToggle={event => {
      if (event.currentTarget.open) nav.current?.querySelectorAll("details[open]").forEach(item => { if (item !== event.currentTarget) item.removeAttribute("open"); });
    }}>
      <summary>{group.label} <span aria-hidden="true">⌄</span></summary>
      <div className="site-nav-menu">{group.links.map(([href, label]) => <Link key={href} href={href} onClick={event => event.currentTarget.closest("details")?.removeAttribute("open")}>{label}</Link>)}</div>
    </details>)}
    <Link href="/examples">Examples</Link>
  </nav>;
}
