/** Inline strokes only — the mockup pulls in no icon dependency. */
type P = { size?: number };
const base = (size = 20) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export const Home = ({ size }: P) => (
  <svg {...base(size)}><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></svg>
);
export const Target = ({ size }: P) => (
  <svg {...base(size)}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" /></svg>
);
export const List = ({ size }: P) => (
  <svg {...base(size)}><path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01" /></svg>
);
export const Gauge = ({ size }: P) => (
  <svg {...base(size)}><path d="M4 18a8 8 0 1 1 16 0" /><path d="M12 18l4.5-5" /></svg>
);
export const Layers = ({ size }: P) => (
  <svg {...base(size)}><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /></svg>
);
export const Play = ({ size }: P) => (
  <svg {...base(size)}><circle cx="12" cy="12" r="9" /><path d="m10 8.5 6 3.5-6 3.5Z" /></svg>
);
export const Trend = ({ size }: P) => (
  <svg {...base(size)}><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></svg>
);
export const Check = ({ size }: P) => (
  <svg {...base(size)}><path d="m4.5 12.5 5 5 10-11" /></svg>
);
export const Lock = ({ size }: P) => (
  <svg {...base(size)}><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>
);
export const Alert = ({ size }: P) => (
  <svg {...base(size)}><path d="M12 3 2.5 20h19L12 3Z" /><path d="M12 10v4M12 17.2h.01" /></svg>
);
export const Users = ({ size }: P) => (
  <svg {...base(size)}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><path d="M16.5 5.2a3.5 3.5 0 0 1 0 5.6M18 20a6.4 6.4 0 0 0-1.6-4.3" /></svg>
);
export const Arrow = ({ size }: P) => (
  <svg {...base(size)}><path d="M5 12h13" /><path d="m13 6 6 6-6 6" /></svg>
);
export const Spark = ({ size }: P) => (
  <svg {...base(size)}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" /></svg>
);
export const Shield = ({ size }: P) => (
  <svg {...base(size)}><path d="M12 3 4.5 6v6c0 4.5 3 7.7 7.5 9 4.5-1.3 7.5-4.5 7.5-9V6L12 3Z" /></svg>
);
export const Flag = ({ size }: P) => (
  <svg {...base(size)}><path d="M5 21V4" /><path d="M5 5h12l-2 3.5L17 12H5" /></svg>
);
