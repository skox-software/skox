/** Tiny SVG helpers for the dashboard concepts. No chart library needed. */

export type Pt = [number, number];

/** Scale values into an SVG box. Top-left origin; higher values sit higher. */
export function toPoints(values: number[], w: number, h: number, min: number, max: number, pad = 0): Pt[] {
  const span = max - min || 1;
  const step = values.length > 1 ? (w - pad * 2) / (values.length - 1) : 0;
  return values.map((v, i) => [pad + i * step, h - ((v - min) / span) * h]);
}

/** A smooth line through the points (Catmull-Rom converted to cubic Béziers). */
export function smoothPath(pts: Pt[], tension = 0.5): string {
  if (pts.length < 2) return "";
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1: Pt = [p1[0] + ((p2[0] - p0[0]) / 6) * tension * 2, p1[1] + ((p2[1] - p0[1]) / 6) * tension * 2];
    const c2: Pt = [p2[0] - ((p3[0] - p1[0]) / 6) * tension * 2, p2[1] - ((p3[1] - p1[1]) / 6) * tension * 2];
    d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d;
}

/** The same smooth line, closed down to the baseline for an area fill. */
export function areaPath(pts: Pt[], h: number): string {
  if (pts.length < 2) return "";
  return `${smoothPath(pts)} L${pts[pts.length - 1][0].toFixed(1)},${h} L${pts[0][0].toFixed(1)},${h} Z`;
}

/** An SVG arc for ring gauges and donuts, angles in degrees from 12 o'clock. */
export function arc(cx: number, cy: number, r: number, start: number, end: number): string {
  const rad = (a: number) => ((a - 90) * Math.PI) / 180;
  const sx = cx + r * Math.cos(rad(start));
  const sy = cy + r * Math.sin(rad(start));
  const ex = cx + r * Math.cos(rad(end));
  const ey = cy + r * Math.sin(rad(end));
  const large = end - start > 180 ? 1 : 0;
  return `M${sx.toFixed(2)},${sy.toFixed(2)} A${r},${r} 0 ${large} 1 ${ex.toFixed(2)},${ey.toFixed(2)}`;
}

export const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
