"use client";

import { useState } from "react";

/**
 * Lead demo: the same custom web app, re-skinned per client.
 * Demonstrates the thing SKOX has actually shipped — built to fit, not a theme.
 */
type Brand = {
  id: string;
  client: string;
  domain: string;
  kind: string;
  bg: string;
  panel: string;
  text: string;
  dim: string;
  accent: string;
  onAccent: string;
  radius: string;
  headline: string;
  cta: string;
  stats: [string, string][];
};

const BRANDS: Brand[] = [
  {
    id: "spa",
    client: "Aurelia",
    domain: "aurelia.co/portal",
    kind: "Client portal",
    bg: "#141013",
    panel: "#1e181c",
    text: "#f6efea",
    dim: "#a08e97",
    accent: "#d9a2a8",
    onAccent: "#2a1c20",
    radius: "999px",
    headline: "Your treatment plan",
    cta: "Book next visit",
    stats: [["Visits", "14"], ["Next", "Mar 3"], ["Plan", "62%"]],
  },
  {
    id: "fitness",
    client: "Ridgeline",
    domain: "ridgeline.fit/app",
    kind: "Member app",
    bg: "#0c1210",
    panel: "#131c19",
    text: "#eefaf4",
    dim: "#7f9a90",
    accent: "#4ade9a",
    onAccent: "#06251a",
    radius: "6px",
    headline: "This week's block",
    cta: "Reserve a spot",
    stats: [["Classes", "9"], ["Streak", "23d"], ["Cap", "78%"]],
  },
  {
    id: "trades",
    client: "Delta Pool",
    domain: "deltapool.co/ops",
    kind: "Ops dashboard",
    bg: "#0b1017",
    panel: "#111823",
    text: "#eaf2fb",
    dim: "#7d8ea3",
    accent: "#3f9df5",
    onAccent: "#04101f",
    radius: "3px",
    headline: "Today's routes",
    cta: "Dispatch crew",
    stats: [["Stops", "31"], ["Crews", "4"], ["On time", "96%"]],
  },
];

export function WebAppPanel() {
  const [i, setI] = useState(0);
  const b = BRANDS[i];

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
        <p className="text-white text-[14px] font-[450] leading-tight">Built to fit</p>
        <p className="text-white/45 text-[11px] font-mono">{b.kind}</p>
      </div>

      {/* Browser chrome */}
      <div className="rounded-[10px] overflow-hidden ring-1 ring-white/10 flex-1 min-h-0 flex flex-col">
        <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.07] shrink-0">
          <span className="flex gap-1.5">
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <span key={c} className="h-[7px] w-[7px] rounded-full" style={{ background: c }} />
            ))}
          </span>
          <span className="ml-1 flex-1 truncate font-mono text-[10px] text-white/45">{b.domain}</span>
        </div>

        {/* The app itself, restyled per brand */}
        <div
          className="flex-1 min-h-0 p-4 transition-colors duration-500"
          style={{ background: b.bg, color: b.text }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-[450] tracking-tight transition-colors duration-500">{b.client}</span>
            <span className="flex gap-1.5">
              {[0, 1, 2].map((k) => (
                <span key={k} className="h-[3px] w-[3px] rounded-full transition-colors duration-500" style={{ background: b.dim }} />
              ))}
            </span>
          </div>

          <p className="mt-4 text-[17px] leading-tight font-[450] transition-colors duration-500">{b.headline}</p>

          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {b.stats.map(([k, v]) => (
              <div
                key={k}
                className="p-2 transition-all duration-500"
                style={{ background: b.panel, borderRadius: b.radius === "999px" ? "12px" : b.radius }}
              >
                <p className="text-[8.5px] font-mono uppercase tracking-[0.08em] transition-colors duration-500" style={{ color: b.dim }}>
                  {k}
                </p>
                <p className="mt-0.5 text-[14px] font-[450] transition-colors duration-500">{v}</p>
              </div>
            ))}
          </div>

          <button
            className="mt-3 w-full py-2 text-[12px] font-[450] transition-all duration-500"
            style={{ background: b.accent, color: b.onAccent, borderRadius: b.radius }}
            tabIndex={-1}
            aria-hidden="true"
          >
            {b.cta}
          </button>
        </div>
      </div>

      <div className="flex gap-1.5 pt-3 shrink-0" role="group" aria-label="Switch client">
        {BRANDS.map((brand, k) => (
          <button
            key={brand.id}
            onClick={() => setI(k)}
            aria-pressed={i === k}
            className={`flex-1 py-1.5 text-[11px] font-[450] rounded-[8px] transition-colors ${
              i === k ? "bg-white/[0.16] text-white" : "bg-white/[0.05] text-white/50 hover:text-white/80"
            }`}
          >
            {brand.client}
          </button>
        ))}
      </div>
    </div>
  );
}
