import { ImageResponse } from "next/og";
import { home, site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name}: ${site.tagline}`;

/* The hero, as a card: blue paper, the question, the word struck through. */
export default function OG() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#0B5CFF",
        color: "#FAFAF8",
        padding: 72,
        fontFamily: "Inter, Helvetica, Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>
        <div style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: "#FAFAF8" }} />
        {site.name}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexWrap: "wrap", fontSize: 92, fontWeight: 700, lineHeight: 1, letterSpacing: -4, maxWidth: 1000 }}>
          <span style={{ marginRight: 24 }}>{home.hero.headlineBefore}</span>
          <span style={{ display: "flex", position: "relative", marginRight: /^[.,!?]/.test(home.hero.headlineAfter) ? 0 : 24 }}>
            {home.hero.struck}
            <div style={{ position: "absolute", left: -4, right: -4, top: "52%", height: 9, backgroundColor: "#FAFAF8" }} />
          </span>
          <span>{home.hero.headlineAfter}</span>
        </div>
        <div style={{ display: "flex", marginTop: 36, fontSize: 30, opacity: 0.88 }}>{site.tagline}</div>
      </div>
    </div>,
    size,
  );
}
