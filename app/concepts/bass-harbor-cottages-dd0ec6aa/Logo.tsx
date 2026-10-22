/**
 * Their farmhouse-in-a-wreath mark (images/slideshow-logo-overlay.png on the
 * current site), redrawn as a crisp vector. Colours follow currentColor.
 */
export default function Logo({ size = 64, title }: { size?: number; title?: string }) {
  const leaves = Array.from({ length: 30 }, (_, i) => {
    const a = (i / 30) * Math.PI * 2;
    const x = 60 + Math.cos(a) * 50;
    const y = 60 + Math.sin(a) * 50;
    const deg = (a * 180) / Math.PI + 90;
    return { x, y, deg, berry: i % 3 === 0 };
  });
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      className="logo"
    >
      <g className="logo-wreath">
        {leaves.map((l, i) => (
          <g key={i} transform={`translate(${l.x.toFixed(2)} ${l.y.toFixed(2)}) rotate(${l.deg.toFixed(1)})`}>
            <ellipse cx="-3" cy="0" rx="3.4" ry="1.7" transform="rotate(-35)" />
            <ellipse cx="3" cy="0" rx="3.4" ry="1.7" transform="rotate(35)" />
            {l.berry && <circle cx="0" cy="-3.6" r="1.4" />}
          </g>
        ))}
      </g>
      <g className="logo-house">
        <rect x="67" y="22" width="6" height="14" />
        <path d="M34 47 L60 23 L86 47 Z" />
        <rect x="40" y="45" width="40" height="49" />
        <g className="logo-win">
          <rect x="52" y="32" width="6" height="8" />
          <rect x="62" y="32" width="6" height="8" />
          <rect x="45" y="52" width="7" height="11" />
          <rect x="56.5" y="52" width="7" height="11" />
          <rect x="68" y="52" width="7" height="11" />
          <rect x="45" y="70" width="7" height="11" />
          <rect x="56.5" y="70" width="7" height="11" />
          <rect x="68" y="70" width="8" height="24" />
        </g>
      </g>
    </svg>
  );
}
