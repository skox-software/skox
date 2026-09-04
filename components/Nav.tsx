"use client";

import { useEffect, useState } from "react";
import { Animate } from "@/components/Animate";
import { SkoxLogo } from "@/components/SkoxLogo";
import { MenuIcon, XIcon } from "@/components/icons";
import { hero, nav } from "@/content/site";

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <nav className="w-full max-w-[1800px] mx-auto px-5 sm:px-8 md:px-[82px] pt-[20px] sm:pt-[30px] flex items-center justify-between relative z-50">
        <Animate delay={0} direction="down">
          <a href="#top" className="flex items-center" aria-label="SKOX — home">
            <SkoxLogo variant="dark" className="h-[22px] sm:h-[26px] w-auto" />
          </a>
        </Animate>

        <Animate delay={100} direction="down" className="hidden lg:block">
          <div className="h-[52px] px-6 flex items-center gap-[30px] bg-[rgba(10,7,7,0.35)] rounded-[11px] backdrop-blur-[17px] ring-1 ring-white/[0.07]">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-[5px] text-white/80 text-[14px] font-[450] leading-[14px] hover:text-white transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </div>
        </Animate>

        <Animate delay={200} direction="down" className="hidden lg:block">
          <div className="h-[52px] p-[3px] bg-[rgba(0,0,0,0.35)] rounded-[13px] backdrop-blur-[17px] ring-1 ring-white/[0.07] flex items-center gap-[5px]">
            <a
              href="#faq"
              className="h-[46px] px-6 flex items-center rounded-[11px] text-white text-[14px] font-[450] leading-[14px] hover:bg-white/5 transition-colors whitespace-nowrap"
            >
              Questions
            </a>
            <a
              href="#scope"
              className="h-[46px] px-6 flex items-center bg-[#E9E9E9] rounded-[11px] text-[#0A0707] text-[14px] font-[450] leading-[14px] hover:bg-white transition-colors whitespace-nowrap"
            >
              {hero.primaryCta}
            </a>
          </div>
        </Animate>

        <Animate delay={100} direction="down" className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className="w-[44px] h-[44px] flex items-center justify-center rounded-[11px] bg-[rgba(10,7,7,0.35)] backdrop-blur-[17px] ring-1 ring-white/[0.07] transition-colors hover:bg-white/10"
          >
            <span className="relative w-5 h-5 block">
              <MenuIcon
                className={`w-5 h-5 text-white absolute inset-0 transition-all duration-300 ease-out ${isOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"}`}
              />
              <XIcon
                className={`w-5 h-5 text-white absolute inset-0 transition-all duration-300 ease-out ${isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"}`}
              />
            </span>
          </button>
        </Animate>
      </nav>

      {/* Visibility-toggled, never unmounted, so the close transition plays. */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? "visible" : "invisible"}`}
      >
        <div
          onClick={() => setIsOpen(false)}
          className={`absolute inset-0 bg-[var(--color-pitch)]/90 backdrop-blur-[24px] transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`}
        />
        <div
          className={`absolute top-[76px] sm:top-[86px] left-4 right-4 sm:left-6 sm:right-6 bg-[rgba(17,16,15,0.6)] backdrop-blur-[30px] rounded-[20px] border border-white/[0.06] p-6 sm:p-8 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] origin-top ${isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-4 scale-[0.97]"}`}
        >
          <div className="flex flex-col gap-1">
            {nav.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                style={{ transitionDelay: isOpen ? `${100 + i * 50}ms` : "0ms" }}
                className={`flex items-center justify-between px-4 py-4 rounded-[12px] text-white/90 text-[18px] font-[450] hover:bg-white/[0.06] transition-all duration-300 ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"}`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="h-px bg-white/10 my-5" />

          <div
            className={`flex flex-col gap-3 transition-all duration-300 ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
            style={{ transitionDelay: isOpen ? "350ms" : "0ms" }}
          >
            <a
              href="#scope"
              onClick={() => setIsOpen(false)}
              className="w-full h-[50px] flex items-center justify-center bg-[#E9E9E9] rounded-[12px] text-[#0A0707] text-[15px] font-[450] transition-colors hover:bg-white"
            >
              {hero.primaryCta}
            </a>
            <a
              href="#faq"
              onClick={() => setIsOpen(false)}
              className="w-full h-[50px] flex items-center justify-center rounded-[12px] border border-white/30 text-white text-[15px] font-[450] transition-colors hover:bg-white/5"
            >
              Questions
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
