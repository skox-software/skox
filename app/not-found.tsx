import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center bg-[var(--color-pitch)]">
      <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-[var(--color-amber)]">404</p>
      <h1 className="text-[36px] sm:text-[48px] font-normal tracking-[-0.025em] text-white">That page doesn&apos;t exist.</h1>
      <Link href="/" className="chamfer h-[51px] px-[27px] inline-flex items-center bg-[#E9E9E9] text-[#0A0707] text-[15.5px] font-[450]">
        Back to the start
      </Link>
    </main>
  );
}
