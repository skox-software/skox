"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The page as chapters: a thin progress bar across the top and a column of
 * dots on the right that names where you are. The dots are links, so they
 * work with a keyboard and without script.
 */
export function Chapters({ items }: { items: readonly { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? window.scrollY / max : 0;
        if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  return (
    <>
      <div className="progress" aria-hidden>
        <div ref={bar} />
      </div>
      <nav className="chapters" aria-label="Sections">
        <ol>
          {items.map((item) => (
            <li key={item.id} className={item.id === active ? "on" : undefined}>
              <a href={`#${item.id}`} aria-current={item.id === active ? "true" : undefined}>
                <span className="lbl">{item.label}</span>
                <span className="pip" aria-hidden />
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
