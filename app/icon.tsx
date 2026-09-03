import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/* The amber X — the one glyph from the wordmark that survives 32px. */
export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#0d0f12", alignItems: "center", justifyContent: "center" }}>
        <svg width="24" height="24" viewBox="1478 0 481 309" xmlns="http://www.w3.org/2000/svg">
          <path d="M1480 0L1579 1L1936 308L1835 308L1525 43L1478 1Z" fill="#e4a907" />
          <path d="M1647 169L1694 211L1573 308L1478 308Z" fill="#e4a907" />
          <path d="M1861 0L1958 1L1776 147L1730 106Z" fill="#e4a907" />
        </svg>
      </div>
    ),
    size,
  );
}
