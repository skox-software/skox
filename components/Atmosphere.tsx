/**
 * Cinematic ground, rendered in CSS rather than video: layered warm glows,
 * vignette and grain. Costs nothing against the performance budget.
 *
 * To use a real clip instead, drop a licensed file at public/hero.mp4 and set
 * HERO_VIDEO below — the atmosphere stays behind it as the load-in state.
 */
export const HERO_VIDEO: string | null = null;

export function Atmosphere() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[var(--color-pitch)]" aria-hidden="true">
      {HERO_VIDEO && (
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          src={HERO_VIDEO}
          autoPlay
          loop
          muted
          playsInline
        />
      )}

      {/* Warm tungsten key, off-centre so the composition isn't symmetrical. */}
      <div
        className="absolute -top-[30%] -left-[10%] w-[85vw] h-[85vw] max-w-[1100px] max-h-[1100px] rounded-full opacity-[0.30] blur-[90px] motion-safe:animate-[drift_26s_ease-in-out_infinite_alternate]"
        style={{ background: "radial-gradient(circle, #e4a907 0%, rgba(228,169,7,0.22) 42%, transparent 68%)" }}
      />
      {/* Cool fill, keeps the amber from reading as sepia. */}
      <div
        className="absolute top-[28%] -right-[16%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full opacity-[0.20] blur-[100px] motion-safe:animate-[drift2_31s_ease-in-out_infinite_alternate]"
        style={{ background: "radial-gradient(circle, #2b4f6b 0%, rgba(43,79,107,0.3) 45%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-[-25%] left-[35%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full opacity-[0.16] blur-[110px]"
        style={{ background: "radial-gradient(circle, #e4a907 0%, transparent 66%)" }}
      />

      {/* Structural grid — the precision-instrument read. */}
      <div
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "82px 82px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, #000 30%, transparent 78%)",
        }}
      />

      {/* Vignette. */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 110% 85% at 50% 45%, transparent 35%, rgba(6,8,10,0.78) 100%)" }}
      />

      <div className="grain absolute inset-0" />
    </div>
  );
}
