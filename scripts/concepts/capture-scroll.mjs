// Record a concept page's scroll story as a frame sequence, for an MP4 to share.
//
//   node scripts/concepts/capture-scroll.mjs <url> <out-dir> [seconds=24] [selector=.flight]
//   ffmpeg -framerate 30 -i <out-dir>/%04d.jpg -c:v libx264 -crf 20 -pix_fmt yuv420p out.mp4
//
// Drives headless Chrome over the DevTools protocol (no dependencies): scrolls
// the sticky section from top to bottom at a steady pace, giving CSS
// transitions real time between captures, and screenshots each step.
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const [url, out, secs = "24", selector = ".flight"] = process.argv.slice(2);
const FPS = 30;
const W = 1600;
const H = 900;
mkdirSync(out, { recursive: true });

const chrome = spawn(
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  [
    "--headless=new",
    "--remote-debugging-port=9333",
    `--user-data-dir=${mkdtempSync(join(tmpdir(), "cap-"))}`,
    `--window-size=${W},${H}`,
    "--hide-scrollbars",
    "--no-first-run",
    "about:blank",
  ],
  { stdio: "ignore" },
);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let target;
for (let i = 0; i < 50 && !target; i++) {
  await sleep(200);
  try {
    const list = await (await fetch("http://127.0.0.1:9333/json")).json();
    target = list.find((t) => t.type === "page");
  } catch {}
}
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));
let id = 0;
const pending = new Map();
ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m);
    pending.delete(m.id);
  }
});
const send = (method, params = {}) =>
  new Promise((r) => {
    const n = ++id;
    pending.set(n, r);
    ws.send(JSON.stringify({ id: n, method, params }));
  });
const evaluate = async (expression) =>
  (await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true })).result
    ?.result?.value;

await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 1, mobile: false });
await send("Page.navigate", { url });
await sleep(9000); // let every frame and photo load and decode
// Hide the Next.js dev badge if this is a dev server.
await evaluate(`(() => { const s = document.createElement('style'); s.textContent = 'nextjs-portal{display:none!important}'; document.head.appendChild(s); })()`);

const range = await evaluate(`(() => { const el = document.querySelector(${JSON.stringify(selector)}); return [el.offsetTop, el.offsetHeight - innerHeight]; })()`);
const total = Number(secs) * FPS;
const hold = FPS; // a second on the opening shot
for (let i = 0; i < total + hold; i++) {
  const p = Math.max(0, i - hold) / total;
  const y = range[0] + p * range[1];
  await evaluate(`new Promise(r => { window.scrollTo(0, ${y}); requestAnimationFrame(() => requestAnimationFrame(r)); })`);
  await sleep(20);
  const shot = await send("Page.captureScreenshot", { format: "jpeg", quality: 90 });
  writeFileSync(join(out, `${String(i + 1).padStart(4, "0")}.jpg`), Buffer.from(shot.result.data, "base64"));
}
ws.close();
chrome.kill();
console.log("captured", total + hold, "frames");
