import { FrontDeskPanel } from "@/components/FrontDeskPanel";
import { Section } from "@/components/Section";

/**
 * The AI automation beat. Sits below the work SKOX leads with, deliberately —
 * it's a demo of the product, not a claim about volume shipped.
 */
export function FrontDeskSection() {
  return (
    <Section id="frontdesk" className="!bg-[var(--color-pitch)] relative overflow-hidden">
      <div className="grain absolute inset-0 opacity-60 pointer-events-none" />
      <div className="relative grid lg:grid-cols-[minmax(0,1fr)_405px] gap-12 lg:gap-20 items-center">
        <div className="reveal">
          <p className="flex items-center gap-2.5 text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.16em] text-[var(--color-amber)]">
            <span className="h-px w-7 bg-[var(--color-amber)]/60" />
            AI automation
          </p>
          <h2 className="mt-5 text-[32px] sm:text-[44px] md:text-[54px] font-normal leading-[1.02] tracking-[-0.025em] text-white text-balance">
            The desk that never goes home.
          </h2>
          <p className="mt-5 text-[16px] sm:text-[18px] leading-[1.5] max-w-[520px] text-white/60">
            Phone and chat agents that answer in seconds, handle the five questions everyone asks, and put the
            booking on your calendar — at eleven at night, on a Sunday, while you are with a customer.
          </p>
          <p className="mt-6 text-[15px] leading-[1.6] max-w-[520px] text-white/45">
            Ask it what a customer would ask. Scripted to one business for this demo — the version we
            build you is trained on your whole book, your prices and your calendar.
          </p>
        </div>

        <div className="reveal w-full max-w-[405px] mx-auto lg:mx-0">
          <div className="rounded-[24px] sm:rounded-[33px] bg-[rgba(17,16,15,0.42)] backdrop-blur-[20px] ring-1 ring-white/10 p-5 sm:p-8 pb-5 sm:pb-6">
            <div className="h-[380px]">
              <FrontDeskPanel />
            </div>
          </div>
          <p className="mt-3 text-center lg:text-left text-[11px] font-mono uppercase tracking-[0.14em] text-white/35">
            Live demo · sample business
          </p>
        </div>
      </div>
    </Section>
  );
}
