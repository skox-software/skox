import Image from "next/image";
import Link from "next/link";
import lockup from "@/public/brand/lockup-light.png";
import { nav } from "@/content/site";

/** Logo left, three links, the one action. Under 600px: logo and action only. */
export function Header() {
  return (
    <header>
      <div className="wrap">
        <nav aria-label="Main">
          <Link href="/" aria-label="UnBusy home">
            <Image src={lockup} alt="UnBusy" height={40} priority />
          </Link>
          <div className="links">
            {nav.links.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
            <Link className="btn blue" href={nav.action.href} data-cta="header">
              {nav.action.label} <span className="dot" />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
