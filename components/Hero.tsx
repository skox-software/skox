import { Animate } from "@/components/Animate";
import { Atmosphere } from "@/components/Atmosphere";
import { PersonalizedDemo } from "@/components/PersonalizedDemo";
import { Nav } from "@/components/Nav";
import { heroForm } from "@/content/site";

export function Hero() {
  return (
    <section id="top" className="relative w-full min-h-screen overflow-hidden bg-[var(--color-pitch)]">
      <Atmosphere />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Nav />

        <div className="flex-1 flex items-center py-12 lg:py-8">
          <div className="mx-auto flex w-full max-w-[1800px] flex-col gap-12 px-5 sm:px-8 md:px-[82px] lg:flex-row lg:items-center lg:justify-between lg:gap-16">
            {/* Left — what we provide */}
            <div className="max-w-[560px]">
              <Animate delay={200} direction="up">
                <p className="mb-5 inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-amber)] sm:text-[12px]">
                  <span className="h-px w-7 bg-[var(--color-amber)]/60" />
                  {heroForm.eyebrow}
                </p>
              </Animate>

              <Animate delay={300} direction="up">
                <h1 className="mb-5 text-balance text-[38px] font-normal leading-[1.02] tracking-[-0.025em] text-white sm:text-[52px] lg:text-[60px]">
                  {heroForm.headline}
                </h1>
              </Animate>

              <Animate delay={420} direction="up">
                <p className="mb-8 max-w-[480px] text-[16px] font-[450] leading-[1.5] text-white/70 sm:text-[18px]">
                  {heroForm.sub}
                </p>
              </Animate>

              <Animate delay={560} direction="up">
                <ul className="flex flex-col gap-3">
                  {heroForm.provides.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15px] font-[450] text-white sm:text-[16px]">
                      <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 bg-[var(--color-amber)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Animate>
            </div>

            {/* Right — the visitor sees their own business running before they read a word */}
            <Animate delay={700} direction="scale" className="w-full lg:w-auto lg:shrink-0">
              <PersonalizedDemo />
            </Animate>
          </div>
        </div>
      </div>
    </section>
  );
}
