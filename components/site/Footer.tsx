import Image from "next/image";
import Link from "next/link";
import lockup from "@/public/brand/lockup-dark.png";
import { footer } from "@/content/site";

export function Footer() {
  return (
    <footer>
      <div className="wrap grid">
        <div className="c1-4">
          <Image src={lockup} alt="UnBusy" height={36} />
        </div>
        <div className="c5-12 foot-right">
          <p className="line">{footer.line}</p>
          <p className="formerly">{footer.formerly}</p>
          <div className="links">
            {footer.links.map((link) =>
              link.href.startsWith("/portal") ? (
                // The portal is another app behind a rewrite; a plain anchor
                // keeps Next from trying to prefetch it.
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
