import { Animate } from "@/components/Animate";
import { Atmosphere } from "@/components/Atmosphere";
import { HeroCard } from "@/components/HeroCard";
import { Nav } from "@/components/Nav";
import { hero } from "@/content/site";

export function Hero() {
  return (
    <section id="top" className="relative w-full min-h-screen lg:h-screen overflow-hidden bg-[var(--color-pitch)]">
      <Atmosphere />

      <div className="relative z-10 min-h-screen lg:h-full flex flex-col">
        <Nav />

        <div className="flex-1 flex items-center py-8">
          <div className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-12">
            <div className="max-w-[593px]">
              <Animate delay={200} direction="up">
                <p className="mb-5 sm:mb-7 inline-flex items-center gap-2.5 text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.16em] text-[var(--color-amber)]">
                  <span className="h-px w-7 bg-[var(--color-amber)]/60" />
                  {hero.eyebrow}
                </p>
              </Animate>

              <Animate delay={300} direction="up">
                <h1 className="text-white text-[36px] sm:text-[52px] md:text-[64px] lg:text-[72px] font-normal leading-[0.95] tracking-[-0.025em] mb-5 sm:mb-8 text-balance">
                  {hero.headline}
                </h1>
              </Animate>

              <Animate delay={500} direction="up">
                <p className="text-white/80 text-[16px] sm:text-[18px] md:text-[20px] font-[450] leading-[1.3] max-w-[370px] mb-7 sm:mb-10">
                  {hero.sub}
                </p>
              </Animate>

              <Animate delay={700} direction="up">
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <a
                    href="#scope"
                    className="h-[46px] sm:h-[51px] px-5 sm:px-[27px] inline-flex items-center bg-[#E9E9E9] rounded-[12px] text-[#0A0707] text-[14px] sm:text-[15.5px] font-[450] leading-[15.5px] transition-opacity hover:opacity-90"
                  >
                    {hero.primaryCta}
                  </a>
                  <a
                    href="#build"
                    className="h-[46px] sm:h-[51px] px-5 sm:px-[27px] inline-flex items-center rounded-[12px] border border-white text-white text-[14px] sm:text-[15.5px] font-[450] leading-[15.5px] transition-opacity hover:opacity-80"
                  >
                    {hero.secondaryCta}
                  </a>
                </div>
              </Animate>

              <Animate delay={850} direction="up">
                <p className="mt-6 sm:mt-8 text-white/45 text-[12px] sm:text-[13px] font-mono">{hero.guarantee}</p>
              </Animate>
            </div>

            <Animate delay={900} direction="scale" className="w-full lg:w-[405px] lg:shrink-0">
              <HeroCard />
            </Animate>
          </div>
        </div>
      </div>
    </section>
  );
}
