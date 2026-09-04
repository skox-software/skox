import { HeroContactForm } from "@/components/HeroContactForm";
import { heroForm } from "@/content/site";

/**
 * The capture, immediately under the hero. The demo above does the convincing;
 * this sits two inches below it so a convinced visitor never has to go looking.
 */
export function HeroFormBand() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-pitch)] px-5 pb-20 pt-4 sm:px-8 md:px-[82px] sm:pb-24">
      <div className="grain pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative mx-auto grid w-full max-w-[1800px] items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:gap-16">
        <div>
          <h2 className="text-balance text-[26px] font-normal leading-[1.08] tracking-[-0.02em] text-white sm:text-[34px]">
            Like what you just built? That is roughly the conversation.
          </h2>
          <p className="mt-4 max-w-[480px] text-[15px] leading-[1.55] text-white/60 sm:text-[16px]">
            {heroForm.formSub}
          </p>
        </div>
        <div className="w-full">
          <HeroContactForm />
        </div>
      </div>
    </section>
  );
}
