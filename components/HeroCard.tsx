"use client";

import { useState } from "react";
import { WebAppPanel } from "@/components/WebAppPanel";

/* Bar heights for the Command Center chart. Last four read as projected. */
const BAR_HEIGHTS = [
  23, 40, 53, 40, 33, 14, 7, 17, 75, 65, 88, 75, 65, 47, 33, 88, 4, 7, 9, 14,
  95, 65, 79, 37, 7, 40, 17, 20, 62, 47, 92, 72,
];
const MAX_BAR = Math.max(...BAR_HEIGHTS);
const PROJECTED_FROM = 28;

type Tab = "webapp" | "command";

export function HeroCard() {
  const [tab, setTab] = useState<Tab>("webapp");

  return (
    <div className="w-full max-w-[405px] mx-auto lg:mx-0">
      <div className="w-full rounded-[24px] sm:rounded-[33px] bg-[rgba(17,16,15,0.42)] backdrop-blur-[20px] ring-1 ring-white/10 p-5 sm:p-8 pb-5 sm:pb-6">
        {/* Tabs — the card demos two product lines, not one. */}
        <div
          role="tablist"
          aria-label="Live demos"
          className="flex items-center gap-[3px] p-[3px] mb-5 sm:mb-6 bg-black/30 rounded-[13px]"
        >
          {(
            [
              ["webapp", "Web app"],
              ["command", "Command Center"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              role="tab"
              aria-selected={tab === id}
              aria-controls={`panel-${id}`}
              id={`tab-${id}`}
              onClick={() => setTab(id)}
              className={`flex-1 h-[38px] rounded-[11px] text-[13px] font-[450] leading-none transition-colors ${
                tab === id
                  ? "bg-[#E9E9E9] text-[#0A0707]"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/*
          Both panels stay mounted and are toggled by opacity, not unmounting.
          The chart's 1100ms stagger is a page-load beat — if the panel remounted
          on click, a visitor switching tabs later would watch an empty chart for
          over a second. Fixed height means switching never shifts layout either.
        */}
        <div className="relative h-[352px] sm:h-[366px]">
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${tab === "webapp" ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            inert={tab !== "webapp"}
          >
            <WebAppPanel />
          </div>
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${tab === "command" ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            inert={tab !== "command"}
          >
            <CommandPanel />
          </div>
        </div>
      </div>
      <p className="mt-3 text-center lg:text-left text-[11px] font-mono uppercase tracking-[0.14em] text-white/35">
        Live demo · sample data
      </p>
    </div>
  );
}

/* ------------------------------------------------------------ command center */

function CommandPanel() {
  return (
    <div id="panel-command" role="tabpanel" aria-labelledby="tab-command" className="flex h-full flex-col">
      <p className="text-white text-[16px] sm:text-[20px] font-[450] leading-[20px] mb-3 sm:mb-4">Revenue · all locations</p>

      <p className="mb-2 sm:mb-3">
        <span className="text-white text-[28px] sm:text-[46px] font-[450] leading-[1] font-mono tracking-tight">$1,420,589</span>
        <span className="text-white/20 text-[28px] sm:text-[46px] font-[450] leading-[1] font-mono tracking-tight">.00</span>
      </p>

      <div className="flex items-center gap-[10px] mb-6 sm:mb-8">
        <span className="px-[6px] py-[7px] bg-[var(--color-amber)]/20 text-[var(--color-amber)] rounded-[6px] text-[12px] sm:text-[14px] font-[450] leading-[14px] font-mono">
          +32.4%
        </span>
        <span className="text-white/80 text-[12px] sm:text-[14px] font-[450] leading-[14px] opacity-70">
          vs. previous period
        </span>
      </div>

      <div className="relative">
        <div className="flex items-end gap-[1.5px] h-[80px] sm:h-[100px]">
          {BAR_HEIGHTS.map((h, i) => {
            const projected = i >= PROJECTED_FROM;
            return (
              <div
                key={i}
                className="flex-1 rounded-[0.5px] animate-bar-grow origin-bottom"
                style={{
                  height: `${(h / MAX_BAR) * 100}%`,
                  backgroundColor: projected ? "rgba(255,255,255,0.1)" : "var(--color-amber)",
                  animationDelay: `${1100 + i * 30}ms`,
                }}
              />
            );
          })}
        </div>

        <div className="absolute inset-0 pointer-events-none">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 w-px bg-white/10"
              style={{ left: `${((i + 1) / 5) * 100}%` }}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-3">
        {["10:00", "12:00", "14:00", "16:00", "18:00"].map((t, i) => (
          <span
            key={t}
            className="text-[9px] sm:text-[10px] font-[450] leading-[10px] text-white/80 font-mono"
            style={{ opacity: i >= 3 ? 0.4 : 1 }}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-5 grid grid-cols-3 gap-2 border-t border-white/10">
        {[
          ["Locations", "6"],
          ["Sources", "6"],
          ["Refresh", "Live"],
        ].map(([k, v]) => (
          <div key={k}>
            <p className="text-white/45 text-[10px] font-mono uppercase tracking-[0.1em]">{k}</p>
            <p className="text-white text-[15px] font-[450] font-mono mt-0.5">{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
