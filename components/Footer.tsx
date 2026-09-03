import { SkoxLogo } from "@/components/SkoxLogo";
import { nav, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-[var(--color-pitch)] px-5 sm:px-8 md:px-[82px] py-14 relative overflow-hidden">
      <div className="grain absolute inset-0 opacity-50 pointer-events-none" />
      <div className="relative w-full max-w-[1800px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div>
          <SkoxLogo variant="dark" className="h-[24px] w-auto" />
          <p className="mt-5 text-[15px] text-white/55 max-w-[300px] leading-[1.5]">{site.tagline}</p>
          <a
            href={`mailto:${site.email}`}
            className="mt-4 inline-block font-mono text-[14px] text-[var(--color-amber)] hover:underline"
          >
            {site.email}
          </a>
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-[14px] text-white/60 hover:text-white transition-colors">
              {n.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="relative w-full max-w-[1800px] mx-auto mt-12 pt-6 border-t border-white/10">
        <p className="font-mono text-[12px] text-white/35">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
