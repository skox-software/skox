"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The homepage hero visual: the busywork pile as a cloud of dots that the
 * desk pulls apart, reads, and settles into one finished quote with the
 * owner's stamp. Canvas 2D, no library. It starts after first paint so the
 * headline is never waiting on it, pauses off screen, and shows the finished
 * quote, still, under reduced motion.
 */

type Shape = "pile" | "swirl" | "sheet" | "stamp";

const STAGES: { shape: Shape; tag: string; hold: number }[] = [
  { shape: "pile", tag: "The pile: plats, deeds, emails, a spreadsheet", hold: 2800 },
  { shape: "swirl", tag: "Collected, and read against your rules", hold: 2300 },
  { shape: "sheet", tag: "Quote drafted from your rates", hold: 1900 },
  { shape: "stamp", tag: "Waiting on you", hold: 3200 },
];

/** Fixed layout for the pile, so it looks the same on every load. */
const PAPERS = [
  { x: -0.2, y: 0.08, r: -0.34, s: 0.95 },
  { x: 0.19, y: 0.1, r: 0.26, s: 0.9 },
  { x: 0.02, y: -0.12, r: 0.06, s: 1 },
  { x: -0.16, y: -0.2, r: 0.42, s: 0.72 },
];

function paper(ctx: CanvasRenderingContext2D, cx: number, cy: number, w: number, rot: number, lines: number) {
  const h = w * 1.29;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rot);
  ctx.lineWidth = Math.max(2, w * 0.012);
  ctx.strokeRect(-w / 2, -h / 2, w, h);
  ctx.lineWidth = Math.max(2, w * 0.018);
  for (let i = 0; i < lines; i++) {
    const y = -h / 2 + h * 0.2 + i * h * 0.11;
    const len = i === 0 ? 0.42 : 0.62 + ((i * 37) % 20) / 100;
    ctx.beginPath();
    ctx.moveTo(-w / 2 + w * 0.12, y);
    ctx.lineTo(-w / 2 + w * (0.12 + len * 0.76), y);
    ctx.stroke();
  }
  ctx.restore();
}

/** Draw a shape on an offscreen canvas and return n points sampled from its ink. */
function sample(w: number, h: number, n: number, draw: (ctx: CanvasRenderingContext2D) => void): Float32Array {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d", { willReadFrequently: true })!;
  ctx.strokeStyle = "#000";
  ctx.fillStyle = "#000";
  draw(ctx);
  const data = ctx.getImageData(0, 0, w, h).data;
  const hits: number[] = [];
  for (let y = 0; y < h; y += 2) for (let x = 0; x < w; x += 2) if (data[(y * w + x) * 4 + 3] > 120) hits.push(x, y);
  const out = new Float32Array(n * 2);
  const count = hits.length / 2 || 1;
  for (let i = 0; i < n; i++) {
    const k = Math.floor(Math.random() * count) * 2;
    out[i * 2] = (hits[k] ?? w / 2) + (Math.random() - 0.5) * 0.8;
    out[i * 2 + 1] = (hits[k + 1] ?? h / 2) + (Math.random() - 0.5) * 0.8;
  }
  return out;
}

function targets(w: number, h: number, n: number) {
  const unit = Math.min(w, h * 0.92);
  const cx = w / 2;
  const cy = h * 0.45;
  const pile = sample(w, h, n, (ctx) => {
    for (const p of PAPERS) paper(ctx, cx + p.x * unit, cy + p.y * unit, unit * 0.4 * p.s, p.r, 4);
  });
  const sw = unit * 0.56;
  const sheet = sample(w, h, n, (ctx) => paper(ctx, cx, cy, sw, 0, 6));
  // The stamp: the same sheet, with one in eight dots moved into a ring at its foot.
  const stamp = new Float32Array(sheet);
  const sx = cx + sw * 0.24;
  const sy = cy + sw * 1.29 * 0.34;
  const rad = sw * 0.17;
  for (let i = 0; i < n; i += 8) {
    const a = Math.random() * Math.PI * 2;
    const r = rad * (Math.random() < 0.7 ? 1 : 0.72);
    stamp[i * 2] = sx + Math.cos(a) * r;
    stamp[i * 2 + 1] = sy + Math.sin(a) * r;
  }
  // The swirl: rings, computed per frame from an angle and a radius.
  const ang = new Float32Array(n);
  const rr = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    ang[i] = Math.random() * Math.PI * 2;
    const ring = i % 3;
    rr[i] = unit * (0.16 + ring * 0.09) + (Math.random() - 0.5) * unit * 0.05;
  }
  return { pile, sheet, stamp, ang, rr, cx, cy };
}

export function ParticleHero({ label }: { label: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [stage, setStage] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const box = wrap.current;
    const cv = canvas.current;
    if (!box || !cv) return;
    const ctx = cv.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, dpr = 1, n = 0;
    let t = targets(1, 1, 1);
    let x = new Float32Array(0), y = new Float32Array(0), vx = new Float32Array(0), vy = new Float32Array(0);
    let current = 0;
    let stageStart = 0;
    let raf = 0;
    let visible = true;
    const mouse = { x: -9999, y: -9999 };

    const setup = () => {
      const r = box.getBoundingClientRect();
      w = Math.max(1, Math.round(r.width));
      h = Math.max(1, Math.round(r.height));
      dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = w * dpr;
      cv.height = h * dpr;
      cv.style.width = `${w}px`;
      cv.style.height = `${h}px`;
      const nextN = w < 420 ? 1500 : 3200;
      t = targets(w, h, nextN);
      if (nextN !== n) {
        n = nextN;
        x = new Float32Array(n);
        y = new Float32Array(n);
        vx = new Float32Array(n);
        vy = new Float32Array(n);
        // Start where the pile is, scattered a little, so the first frame is already the pile.
        for (let i = 0; i < n; i++) {
          x[i] = t.pile[i * 2] + (Math.random() - 0.5) * 30;
          y[i] = t.pile[i * 2 + 1] + (Math.random() - 0.5) * 30;
        }
      }
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(250,250,248,0.9)";
      const s = w < 420 ? 1.8 : 2;
      for (let i = 0; i < n; i++) ctx.fillRect(x[i], y[i], s, s);
    };

    const step = (now: number) => {
      const st = STAGES[current];
      if (now - stageStart > st.hold) {
        current = (current + 1) % STAGES.length;
        stageStart = now;
        setStage(current);
        // Leaving the stamp, the quote bursts back into a pile.
        if (current === 0) for (let i = 0; i < n; i++) { vx[i] += (Math.random() - 0.5) * 9; vy[i] += (Math.random() - 0.5) * 9; }
      }
      const shape = STAGES[current].shape;
      const k = shape === "swirl" ? 0.02 : 0.034;
      const damp = 0.86;
      const spin = (now - stageStart) / 1000;
      for (let i = 0; i < n; i++) {
        let tx: number, ty: number;
        if (shape === "swirl") {
          const a = t.ang[i] + spin * (0.9 + (i % 3) * 0.35) * (i % 2 ? 1 : -1);
          tx = t.cx + Math.cos(a) * t.rr[i];
          ty = t.cy + Math.sin(a) * t.rr[i] * 0.82;
        } else {
          const src = shape === "pile" ? t.pile : shape === "sheet" ? t.sheet : t.stamp;
          tx = src[i * 2];
          ty = src[i * 2 + 1];
        }
        vx[i] = (vx[i] + (tx - x[i]) * k) * damp;
        vy[i] = (vy[i] + (ty - y[i]) * k) * damp;
        // The cursor pushes dots aside, gently.
        const dx = x[i] - mouse.x, dy = y[i] - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 3600) {
          const f = (3600 - d2) / 3600;
          vx[i] += dx * f * 0.06;
          vy[i] += dy * f * 0.06;
        }
        x[i] += vx[i];
        y[i] += vy[i];
      }
      draw();
      if (visible && !document.hidden) raf = requestAnimationFrame(step);
    };

    setup();


    if (reduced) {
      for (let i = 0; i < n; i++) { x[i] = t.stamp[i * 2]; y[i] = t.stamp[i * 2 + 1]; }
      current = 3;
      draw();
      const shown = requestAnimationFrame(() => { setStage(3); setReady(true); });
      const ro = new ResizeObserver(() => {
        setup();
        for (let i = 0; i < n; i++) { x[i] = t.stamp[i * 2]; y[i] = t.stamp[i * 2 + 1]; }
        draw();
      });
      ro.observe(box);
      return () => { cancelAnimationFrame(shown); ro.disconnect(); };
    }

    const resume = () => {
      cancelAnimationFrame(raf);
      if (visible && !document.hidden) raf = requestAnimationFrame(step);
    };
    // Start after the page has painted: the headline never waits on the dots.
    const start = window.setTimeout(() => {
      stageStart = performance.now();
      setReady(true);
      resume();
    }, 250);

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; resume(); });
    io.observe(box);
    const ro = new ResizeObserver(() => setup());
    ro.observe(box);
    const onVis = () => resume();
    document.addEventListener("visibilitychange", onVis);
    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    cv.addEventListener("pointermove", onMove);
    cv.addEventListener("pointerleave", onLeave);

    return () => {
      clearTimeout(start);
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      cv.removeEventListener("pointermove", onMove);
      cv.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className={ready ? "particles is-live" : "particles"} ref={wrap} role="img" aria-label={label}>
      <canvas ref={canvas} aria-hidden />
      <div className="p-tag" aria-hidden key={stage}>
        <span className="p-dot" />
        <span>{STAGES[stage].tag}</span>
        <span className="p-n">{stage + 1}/4</span>
      </div>
      <span className="p-sample" aria-hidden>
        Sample job
      </span>
    </div>
  );
}
