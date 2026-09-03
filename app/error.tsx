"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center bg-[var(--color-pitch)]">
      <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-[var(--color-amber)]">Error</p>
      <h1 className="text-[32px] sm:text-[42px] font-normal tracking-[-0.025em] text-white">Something broke on our end.</h1>
      <button onClick={reset} className="chamfer h-[51px] px-[27px] inline-flex items-center bg-[#E9E9E9] text-[#0A0707] text-[15.5px] font-[450]">
        Try again
      </button>
    </main>
  );
}
