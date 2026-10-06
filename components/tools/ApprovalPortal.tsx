"use client";
import { useEffect, useRef, useState } from "react";
import s from "./ApprovalPortal.module.css";

/* Tool 03 · Garage doors. The customer's side of a quote: choose, sign, pay a
   deposit, all from a text link. The owner's feed updates beside it. Invented data. */

const OPTIONS = [
  { id: "good", tier: "Good", name: "Spring replacement", price: 389, points: ["Two torsion springs", "Safety check", "1-year parts"] },
  { id: "better", tier: "Better", name: "Springs + full tune-up", price: 649, points: ["Everything in Good", "New nylon rollers", "Opener tune-up", "3-year parts"], tag: "Most chosen" },
  { id: "best", tier: "Best", name: "New insulated door", price: 2890, points: ["Insulated steel door", "New springs & track", "Removal of old door", "10-year parts"] },
] as const;
const SLOTS = ["Thu Oct 8 · 8–10 am", "Thu Oct 8 · 1–3 pm", "Fri Oct 9 · 10–12 pm"];
type Step = "quote" | "sign" | "pay" | "done";
type Event = { t: string; text: string; tone?: "good" | "money" };

const stamp = (n: number) => `9:${String(41 + n).padStart(2, "0")} am`;

export function ApprovalPortal() {
  const [step, setStep] = useState<Step>("quote");
  const [choice, setChoice] = useState<string>("better");
  const [slot, setSlot] = useState(0);
  const [signed, setSigned] = useState(false);
  const [agree, setAgree] = useState(false);
  const [paying, setPaying] = useState(false);
  const [feed, setFeed] = useState<Event[]>([{ t: stamp(0), text: "Sam Ortiz opened the quote link" }]);
  const canvas = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);

  const opt = OPTIONS.find((o) => o.id === choice)!;
  const deposit = Math.round(opt.price * 0.25);
  const log = (text: string, tone?: Event["tone"]) => setFeed((f) => [...f, { t: stamp(f.length), text, tone }]);

  /* Signature pad: pointer events cover mouse, pen and touch. */
  useEffect(() => {
    const c = canvas.current;
    if (!c || step !== "sign") return;
    const ctx = c.getContext("2d")!;
    const ratio = window.devicePixelRatio || 1;
    c.width = c.offsetWidth * ratio;
    c.height = c.offsetHeight * ratio;
    ctx.scale(ratio, ratio);
    ctx.lineWidth = 2.2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#1f3a2e";
  }, [step]);

  function point(e: React.PointerEvent<HTMLCanvasElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top] as const;
  }
  function down(e: React.PointerEvent<HTMLCanvasElement>) {
    const ctx = e.currentTarget.getContext("2d")!;
    e.currentTarget.setPointerCapture(e.pointerId);
    drawing.current = true;
    const [x, y] = point(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  }
  function move(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return;
    const ctx = e.currentTarget.getContext("2d")!;
    const [x, y] = point(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    if (!signed) setSigned(true);
  }
  function clear() {
    const c = canvas.current!;
    c.getContext("2d")!.clearRect(0, 0, c.width, c.height);
    setSigned(false);
  }

  function restart() {
    setStep("quote");
    setChoice("better");
    setSlot(0);
    setSigned(false);
    setAgree(false);
    setFeed([{ t: stamp(0), text: "Sam Ortiz opened the quote link" }]);
  }

  return (
    <div className={s.root}>
      <div className={s.phone}>
        <div className={s.notch} aria-hidden />
        <div className={s.screen}>
          <div className={s.appbar}>
            <span className={s.logo}>Liftright</span>
            <span className={s.dots} aria-label={`Step ${["quote", "sign", "pay", "done"].indexOf(step) + 1} of 4`}>
              {(["quote", "sign", "pay", "done"] as Step[]).map((k) => (
                <i key={k} className={k === step ? s.on : ""} />
              ))}
            </span>
          </div>

          {step === "quote" && (
            <div className={s.pane}>
              <p className={s.hello}>Hi Sam,</p>
              <h5>Here are your options for the garage door at 22 Birch Lane.</h5>
              <p className={s.tech}>Recommended by your tech, Marco, after today&apos;s visit: broken spring, worn rollers.</p>
              <div className={s.options}>
                {OPTIONS.map((o) => (
                  <button key={o.id} className={s.option} aria-pressed={o.id === choice} onClick={() => setChoice(o.id)}>
                    <span className={s.optTop}>
                      <b>{o.tier}</b>
                      {"tag" in o && <em>{o.tag}</em>}
                      <strong>${o.price.toLocaleString("en-US")}</strong>
                    </span>
                    <span className={s.optName}>{o.name}</span>
                    {o.id === choice && (
                      <ul>
                        {o.points.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    )}
                  </button>
                ))}
              </div>
              <button
                className={s.cta}
                onClick={() => {
                  log(`Chose ${opt.tier}: ${opt.name} ($${opt.price.toLocaleString("en-US")})`);
                  setStep("sign");
                }}
              >
                Continue with {opt.tier}
              </button>
            </div>
          )}

          {step === "sign" && (
            <div className={s.pane}>
              <h5>Pick a time and sign</h5>
              <div className={s.slots} role="radiogroup" aria-label="Appointment time">
                {SLOTS.map((t, i) => (
                  <button key={t} role="radio" aria-checked={i === slot} onClick={() => setSlot(i)}>
                    {t}
                  </button>
                ))}
              </div>
              <div className={s.sigWrap}>
                <canvas
                  ref={canvas}
                  className={s.sig}
                  onPointerDown={down}
                  onPointerMove={move}
                  onPointerUp={() => (drawing.current = false)}
                  onPointerLeave={() => (drawing.current = false)}
                  aria-label="Signature pad: draw your signature"
                />
                {!signed && <span className={s.sigHint}>Sign here with your finger or mouse</span>}
                <button className={s.clear} onClick={clear}>
                  Clear
                </button>
              </div>
              <label className={s.agree}>
                <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                <span>I approve the {opt.tier} option for ${opt.price.toLocaleString("en-US")}.</span>
              </label>
              <button
                className={s.cta}
                disabled={!signed || !agree}
                onClick={() => {
                  log(`Signed and booked ${SLOTS[slot]}`, "good");
                  setStep("pay");
                }}
              >
                {signed && agree ? "Approve & continue" : "Sign and tick the box"}
              </button>
              <button className={s.back} onClick={() => setStep("quote")}>
                ← Change option
              </button>
            </div>
          )}

          {step === "pay" && (
            <div className={s.pane}>
              <h5>Secure your appointment</h5>
              <div className={s.summary}>
                <span>
                  {opt.name}
                  <b>${opt.price.toLocaleString("en-US")}</b>
                </span>
                <span>
                  {SLOTS[slot]}
                  <b>Booked</b>
                </span>
                <span className={s.dep}>
                  Deposit today (25%)
                  <b>${deposit.toLocaleString("en-US")}</b>
                </span>
              </div>
              <div className={s.cardField} aria-hidden>
                <span>Card</span>
                <b>•••• •••• •••• 4242</b>
                <small>Demo only. No payment is taken.</small>
              </div>
              <button
                className={s.cta}
                disabled={paying}
                onClick={() => {
                  setPaying(true);
                  setTimeout(() => {
                    setPaying(false);
                    log(`Deposit paid: $${deposit.toLocaleString("en-US")}`, "money");
                    log("Job added to Thursday's dispatch board");
                    setStep("done");
                  }, 1100);
                }}
              >
                {paying ? <span className={s.spin} aria-label="Processing" /> : `Pay $${deposit.toLocaleString("en-US")} deposit`}
              </button>
            </div>
          )}

          {step === "done" && (
            <div className={`${s.pane} ${s.done}`}>
              <svg viewBox="0 0 80 80" className={s.check} aria-hidden>
                <circle cx="40" cy="40" r="36" />
                <path d="M24 41 l11 11 l22 -24" />
              </svg>
              <h5>You&apos;re booked, Sam.</h5>
              <p>
                Marco will arrive {SLOTS[slot].replace(" · ", ", ")}. We&apos;ll text you when he&apos;s on the way.
              </p>
              <button className={s.back} onClick={restart}>
                ↺ Try it again
              </button>
            </div>
          )}
        </div>
      </div>

      <aside className={s.feed} aria-label="What the owner sees" aria-live="polite">
        <p className={s.feedLabel}>What the owner sees, live</p>
        <h4>Quote #G-1187 · Sam Ortiz</h4>
        <ol>
          {feed.map((e, i) => (
            <li key={i} className={e.tone ? s[e.tone] : ""}>
              <time>{e.t}</time>
              {e.text}
            </li>
          ))}
        </ol>
        <div className={s.feedFoot}>
          <span>
            Status
            <b>{step === "done" ? "Won · deposit in" : step === "pay" ? "Signed" : step === "sign" ? "Option chosen" : "Viewed"}</b>
          </span>
          <span>
            Value
            <b>${opt.price.toLocaleString("en-US")}</b>
          </span>
        </div>
      </aside>
    </div>
  );
}
