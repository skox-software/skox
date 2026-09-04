import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "SKOX — custom software, shipped in days";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0d0f12",
          padding: 72,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -220,
            left: -140,
            width: 760,
            height: 760,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(228,169,7,0.30) 0%, rgba(228,169,7,0) 68%)",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="230" height="36" viewBox="0 0 1959 309" xmlns="http://www.w3.org/2000/svg">
            <path d="M134 2L471 3L414 59L132 59L106 67L92 87L95 113L103 121L115 125L391 125L413 129L430 137L454 161L466 196L465 234L458 255L448 271L431 287L411 298L371 307L0 307L59 250L364 250L381 245L394 229L394 200L384 188L372 184L99 184L66 176L46 164L33 149L21 114L22 80L32 52L49 31L71 16L101 6ZM540 2L610 2L612 132L695 132L862 2L972 3L771 151L957 308L848 308L696 184L612 184L610 308L536 308L536 3Z" fill="#fafaf8" />
            <path d="M1091 6H1359A80 66 0 0 1 1439 72V241A80 66 0 0 1 1359 307H1091A80 66 0 0 1 1011 241V72A80 66 0 0 1 1091 6ZM1105 90H1348A28 28 0 0 1 1376 118V189A28 28 0 0 1 1348 217H1105A28 28 0 0 1 1077 189V118A28 28 0 0 1 1105 90Z" fill="#e4a907" fillRule="evenodd" />
            <path d="M1480 0L1579 1L1936 308L1835 308L1525 43L1478 1ZM1647 169L1694 211L1573 308L1478 308ZM1861 0L1958 1L1776 147L1730 106Z" fill="#e4a907" />
          </svg>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 62, color: "#fafaf8", lineHeight: 1.06, letterSpacing: -2, maxWidth: 960 }}>
            A site in 7 days. A live dashboard in 14. One workflow automated in 10.
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 26, color: "rgba(250,250,248,0.55)" }}>
            Websites · custom web apps · Command Centers · internal tools
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, color: "#e4a907" }}>
          <div style={{ display: "flex", width: 40, height: 2, background: "#e4a907" }} />
          Fixed price and a date, agreed in writing before you pay
        </div>
      </div>
    ),
    size,
  );
}
