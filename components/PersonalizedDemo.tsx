"use client";

import { useMemo, useState } from "react";
import { track } from "@vercel/analytics";
import {
  COMPANY_KEY,
  PRESETS,
  cleanName,
  domainFor,
  initials,
  type Preset,
} from "@/lib/personalize";

const BAR_HEIGHTS = [
  23, 40, 53, 40, 33, 14, 7, 17, 75, 65, 88, 75, 65, 47, 33, 88, 4, 7, 9, 14,
  95, 65, 79, 37, 7, 40, 17, 20, 62, 47, 92, 72,
];
const MAX_BAR = Math.max(...BAR_HEIGHTS);
const PROJECTED_FROM = 28;

type View = "app" | "command";

/**
 * The hero's "make it yours" demo. A visitor types their business name and picks
 * their industry; the mock restyles and repopulates as their company.
 *
 * Everything shown is illustrative and labelled as sample data — it is never
 * presented as the visitor's own figures.
 */
export function PersonalizedDemo() {
  const [raw, setRaw] = useState("");
  const [presetId, setPresetId] = useState(PRESETS[0].id);
  const [view, setView] = useState<View>("app");
  const [touched, setTouched] = useState(false);

  const preset = useMemo(
    () => PRESETS.find((p) => p.id === presetId) ?? PRESETS[0],
    [presetId],
  );
  const name = cleanName(raw);
  const display = name || "Your business";

  function rename(next: string) {
    setRaw(next);
    const clean = cleanName(next);
    try {
      // Rides along with the lead so a submission arrives already qualified.
      if (clean) sessionStorage.setItem(COMPANY_KEY, clean);
      else sessionStorage.removeItem(COMPANY_KEY);
    } catch {
      /* private mode — the demo still works, the lead just arrives without it */
    }
    if (!touched && clean) {
      setTouched(true);
      track("hero_personalised");
    }
  }

  return (
    <div className="w-full max-w-[440px] mx-auto lg:mx-0">
      <div className="rounded-[24px] bg-[rgba(17,16,15,0.42)] p-5 ring-1 ring-white/10 backdrop-blur-[20px] sm:rounded-[30px] sm:p-7">
        <label htmlFor="demo-name" className="block text-[13px] font-[450] text-white/70">
          See it as your business
        </label>
        <input
          id="demo-name"
          value={raw}
          onChange={(e) => rename(e.target.value)}
          placeholder="Type your business name"
          autoComplete="organization"
          className="mt-2 h-[44px] w-full rounded-[11px] bg-white/[0.07] px-3.5 text-[15px] text-white outline-none transition-colors placeholder:text-white/35 focus:bg-white/[0.13]"
        />

        <div className="mt-2.5 flex flex-wrap gap-1.5" role="group" aria-label="Choose your industry">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPresetId(p.id)}
              aria-pressed={p.id === presetId}
              className={`rounded-[9px] px-2.5 py-1.5 text-[12px] font-[450] transition-colors ${
                p.id === presetId
                  ? "bg-white/[0.16] text-white"
                  : "bg-white/[0.05] text-white/50 hover:text-white/85"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div
          role="tablist"
          aria-label="Demo view"
          className="mt-4 flex items-center gap-[3px] rounded-[13px] bg-black/30 p-[3px]"
        >
          {(
            [
              ["app", "Your web app"],
              ["command", "Your Command Center"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              role="tab"
              type="button"
              id={`tab-${id}`}
              aria-selected={view === id}
              aria-controls={`panel-${id}`}
              onClick={() => setView(id)}
              className={`h-[36px] flex-1 rounded-[11px] text-[12.5px] font-[450] leading-none transition-colors ${
                view === id ? "bg-[#E9E9E9] text-[#0A0707]" : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Fixed height so switching view never shifts the page. */}
        <div className="relative mt-4 h-[320px] sm:h-[336px]">
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${view === "app" ? "opacity-100" : "pointer-events-none opacity-0"}`}
            inert={view !== "app"}
          >
            <AppView preset={preset} name={display} />
          </div>
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${view === "command" ? "opacity-100" : "pointer-events-none opacity-0"}`}
            inert={view !== "command"}
          >
            <CommandView preset={preset} name={display} />
          </div>
        </div>
      </div>

      <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-white/35 lg:text-left">
        Sample data · built to fit your brand
      </p>
    </div>
  );
}

function AppView({ preset, name }: { preset: Preset; name: string }) {
  return (
    <div id="panel-app" role="tabpanel" aria-labelledby="tab-app" className="flex h-full flex-col">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[12px] ring-1 ring-white/10">
        <div className="flex shrink-0 items-center gap-2 bg-white/[0.07] px-3 py-2">
          <span className="flex gap-1.5">
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <span key={c} className="h-[7px] w-[7px] rounded-full" style={{ background: c }} />
            ))}
          </span>
          <span className="ml-1 flex-1 truncate font-mono text-[10.5px] text-white/45">
            {domainFor(name)}/portal
          </span>
        </div>

        <div
          className="flex min-h-0 flex-1 flex-col p-4 transition-colors duration-500"
          style={{ background: preset.bg, color: preset.text }}
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span
                className="grid h-6 w-6 shrink-0 place-items-center text-[10px] font-semibold transition-colors duration-500"
                style={{ background: preset.accent, color: preset.onAccent, borderRadius: preset.radius }}
              >
                {initials(name)}
              </span>
              <span className="truncate text-[13.5px] font-[450] tracking-tight">{name}</span>
            </span>
            <span className="font-mono text-[9.5px] uppercase tracking-[0.1em]" style={{ color: preset.dim }}>
              {preset.appKind}
            </span>
          </div>

          <p className="mt-4 text-[17px] font-[450] leading-tight">{preset.appHeadline}</p>

          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {preset.appStats.map(([k, v]) => (
              <div
                key={k}
                className="p-2 transition-all duration-500"
                style={{ background: preset.panel, borderRadius: preset.radius }}
              >
                <p
                  className="font-mono text-[8.5px] uppercase tracking-[0.08em] transition-colors duration-500"
                  style={{ color: preset.dim }}
                >
                  {k}
                </p>
                <p className="mt-0.5 text-[14px] font-[450]">{v}</p>
              </div>
            ))}
          </div>

          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            className="mt-auto w-full py-2 text-[12.5px] font-[450] transition-all duration-500"
            style={{ background: preset.accent, color: preset.onAccent, borderRadius: preset.radius }}
          >
            {preset.appCta}
          </button>
        </div>
      </div>
    </div>
  );
}

function CommandView({ preset, name }: { preset: Preset; name: string }) {
  return (
    <div id="panel-command" role="tabpanel" aria-labelledby="tab-command" className="flex h-full flex-col">
      <p className="truncate text-[15px] font-[450] text-white sm:text-[17px]">{name} · all locations</p>

      <p className="mt-1.5">
        <span className="font-mono text-[26px] font-[450] leading-none tracking-tight text-white sm:text-[34px]">
          {preset.revenue}
        </span>
      </p>

      <div className="mt-3 flex items-center gap-[10px]">
        <span
          className="rounded-[6px] px-[6px] py-[6px] font-mono text-[12px] font-[450] leading-[13px] transition-colors duration-500"
          style={{ background: `${preset.accent}33`, color: preset.accent }}
        >
          {preset.delta}
        </span>
        <span className="text-[12px] font-[450] leading-[13px] text-white/60">vs. previous period</span>
      </div>

      <div className="relative mt-5">
        <div className="flex h-[72px] items-end gap-[1.5px] sm:h-[84px]">
          {BAR_HEIGHTS.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-[0.5px] transition-colors duration-500"
              style={{
                height: `${(h / MAX_BAR) * 100}%`,
                backgroundColor: i >= PROJECTED_FROM ? "rgba(255,255,255,0.1)" : preset.accent,
              }}
            />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-0">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="absolute bottom-0 top-0 w-px bg-white/10"
              style={{ left: `${((i + 1) / 5) * 100}%` }}
            />
          ))}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 border-t border-white/10 pt-3">
        {preset.kpis.map(([k, v]) => (
          <div key={k}>
            <p className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-white/45">{k}</p>
            <p className="mt-0.5 font-mono text-[14px] font-[450] text-white">{v}</p>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-3">
        <p className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-white/40">Feeding this screen</p>
        <div className="mt-1.5 flex flex-wrap gap-1">
          {preset.sources.map((s) => (
            <span key={s} className="rounded-[6px] bg-white/[0.07] px-2 py-1 text-[10.5px] text-white/65">
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
