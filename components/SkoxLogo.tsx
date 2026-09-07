type Variant = "light" | "dark";

/**
 * SKOX wordmark, rebuilt as vector from the supplied raster original.
 * `SK` and `OX` are separate groups so the ground variants are prop-driven
 * rather than separate assets. Geometry is identical across variants.
 */
export function SkoxLogo({
  variant = "light",
  className,
  title = "SKOX",
}: {
  variant?: Variant;
  className?: string;
  title?: string;
}) {
  const sk = variant === "dark" ? "var(--color-paper)" : "var(--color-ink)";
  return (
    <svg
      viewBox="0 0 1959 309"
      className={className}
      role="img"
      aria-label={title}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M134 2L471 3L414 59L132 59L106 67L92 87L95 113L103 121L115 125L391 125L413 129L430 137L454 161L466 196L465 234L458 255L448 271L431 287L411 298L371 307L0 307L59 250L364 250L381 245L394 229L394 200L384 188L372 184L99 184L66 176L46 164L33 149L21 114L22 80L32 52L49 31L71 16L101 6ZM540 2L610 2L612 132L695 132L862 2L972 3L771 151L957 308L848 308L696 184L612 184L610 308L536 308L536 3Z"
        fill={sk}
      />
      <path
        d="M1091 6H1363A80 66 0 0 1 1443 72V242A80 66 0 0 1 1363 308H1091A80 66 0 0 1 1011 242V72A80 66 0 0 1 1091 6ZM1105 62H1349A28 28 0 0 1 1377 90V224A28 28 0 0 1 1349 252H1105A28 28 0 0 1 1077 224V90A28 28 0 0 1 1105 62Z"
        fill="var(--color-amber)"
        fillRule="evenodd"
      />
      <path
        d="M1480 0L1579 1L1936 308L1835 308L1525 43L1478 1ZM1647 169L1694 211L1573 308L1478 308ZM1861 0L1958 1L1776 147L1730 106Z"
        fill="var(--color-amber)"
      />
    </svg>
  );
}

/** Standalone `X` glyph — the favicon / compact mark. */
export function SkoxMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="1478 0 481 309"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1480 0L1579 1L1936 308L1835 308L1525 43L1478 1ZM1647 169L1694 211L1573 308L1478 308ZM1861 0L1958 1L1776 147L1730 106Z"
        fill="var(--color-amber)"
      />
    </svg>
  );
}
