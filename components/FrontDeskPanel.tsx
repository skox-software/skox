"use client";

import { useEffect, useRef, useState } from "react";
import { chips, confirmation, greeting, persona, respond, slots, type Msg } from "@/lib/frontdesk";

export function FrontDeskPanel() {
  const [msgs, setMsgs] = useState<Msg[]>([{ id: 0, from: "them", text: greeting }]);
  const [value, setValue] = useState("");
  const [typing, setTyping] = useState(false);
  const [offer, setOffer] = useState(false);
  const [booked, setBooked] = useState(false);
  const idRef = useRef(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, typing, offer]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const push = (from: Msg["from"], text: string, kind?: Msg["kind"]) =>
    setMsgs((m) => [...m, { id: idRef.current++, from, text, kind }]);

  function send(text: string) {
    if (!text.trim() || typing) return;
    push("us", text);
    setValue("");
    setOffer(false);

    const { lines, offersBooking } = respond(text);
    setTyping(true);

    let elapsed = 0;
    lines.forEach((line, i) => {
      elapsed += 620 + Math.min(line.length * 11, 900);
      timers.current.push(
        setTimeout(() => {
          if (i === lines.length - 1) setTyping(false);
          push("them", line);
          if (i === lines.length - 1 && offersBooking && !booked) {
            timers.current.push(setTimeout(() => setOffer(true), 380));
          }
        }, elapsed),
      );
    });
  }

  function book(slot: string) {
    setOffer(false);
    push("us", slot);
    setTyping(true);
    timers.current.push(
      setTimeout(() => {
        setTyping(false);
        setBooked(true);
        push("them", confirmation(slot), "confirm");
      }, 1100),
    );
  }

  return (
    <div id="panel-frontdesk" role="tabpanel" aria-labelledby="tab-frontdesk" className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 pb-3 mb-3 border-b border-white/10">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-amber)] opacity-60 motion-safe:animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-amber)]" />
        </span>
        <div className="min-w-0">
          <p className="text-white text-[14px] font-[450] leading-tight truncate">{persona.business}</p>
          <p className="text-white/50 text-[11px] font-mono leading-tight">{persona.status}</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto space-y-2 pr-1 scroll-smooth" aria-live="polite">
        {msgs.map((m) => (
          <div key={m.id} className={m.from === "us" ? "flex justify-end" : "flex justify-start"}>
            <p
              className={`max-w-[86%] px-3 py-2 text-[13px] leading-[1.45] rounded-[14px] ${
                m.from === "us"
                  ? "bg-[#E9E9E9] text-[#0A0707] rounded-br-[4px]"
                  : m.kind === "confirm"
                    ? "bg-[var(--color-amber)]/15 text-white ring-1 ring-[var(--color-amber)]/40 rounded-bl-[4px]"
                    : "bg-white/10 text-white/90 rounded-bl-[4px]"
              }`}
            >
              {m.text}
            </p>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <span className="flex gap-1 px-3 py-3 bg-white/10 rounded-[14px] rounded-bl-[4px]">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-white/60 motion-safe:animate-bounce"
                  style={{ animationDelay: `${i * 140}ms` }}
                />
              ))}
            </span>
          </div>
        )}

        {offer && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {slots.map((s) => (
              <button
                key={s}
                onClick={() => book(s)}
                className="px-2.5 py-1.5 text-[12px] font-[450] rounded-[9px] bg-[var(--color-amber)]/15 text-[var(--color-amber)] ring-1 ring-[var(--color-amber)]/40 hover:bg-[var(--color-amber)]/25 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {!booked && msgs.length < 3 && (
        <div className="flex flex-wrap gap-1.5 pt-2.5">
          {chips.slice(0, 3).map((c) => (
            <button
              key={c}
              onClick={() => send(c)}
              className="px-2.5 py-1.5 text-[11.5px] rounded-[9px] bg-white/[0.07] text-white/70 hover:bg-white/[0.13] hover:text-white transition-colors"
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(value);
        }}
        className="flex gap-2 pt-2.5"
      >
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask it something…"
          aria-label="Message the front desk"
          className="flex-1 min-w-0 h-[38px] px-3 rounded-[11px] bg-white/[0.07] text-white text-[13px] placeholder:text-white/35 outline-none focus:bg-white/[0.12] transition-colors"
        />
        <button
          type="submit"
          disabled={!value.trim() || typing}
          className="h-[38px] px-3.5 rounded-[11px] bg-[#E9E9E9] text-[#0A0707] text-[13px] font-[450] disabled:opacity-35 transition-opacity"
        >
          Send
        </button>
      </form>
    </div>
  );
}
