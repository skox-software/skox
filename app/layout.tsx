import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono, IBM_Plex_Sans, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { CaptureAttribution } from "@/components/CaptureAttribution";
import { SiteTracking } from "@/components/SiteTracking";
import { AdPixels } from "@/components/AdPixels";
import { ClarityTracker } from "@/components/ClarityTracker";
import { TRACKING_ALLOWED_JS } from "@/lib/consent";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { home, site } from "@/content/site";
import "./globals.css";
import "./site.css";

/* The site's two faces. */
/* Bricolage's optical-size axis gives the 96px headline its own cut while
   the small sizes stay plain; Plex Sans reads like a document and has true
   tabular figures for the sheet. */
const display = Bricolage_Grotesque({ subsets: ["latin"], weight: "variable", axes: ["opsz", "wdth"], variable: "--font-display", display: "swap" });
const body = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body", display: "swap" });

/* The concept pages under app/concepts still set type in these. */
const sans = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const serif = Instrument_Serif({ weight: "400", style: ["normal", "italic"], subsets: ["latin"], variable: "--font-instrument", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: home.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: home.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: home.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: "#0B5CFF",
};

/* Google Analytics 4 measurement ID (G-…). Unset means no Google tag at all. */
const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/* Who UnBusy is, for search engines and AI answers. No founders, no address:
   the site names nobody (SITE-PLAN decision 5). */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      description: site.description,
      url: site.url,
      email: site.email,
      logo: `${site.url}/icon.png`,
      image: `${site.url}/opengraph-image`,
      slogan: site.tagline,
      areaServed: { "@type": "Country", name: "United States" },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: site.name,
      url: site.url,
      publisher: { "@id": `${site.url}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${sans.variable} ${mono.variable} ${serif.variable}`}>
      <body>
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-white focus:text-black"
        >
          Skip to content
        </a>
        {children}
        <CaptureAttribution />
        <SiteTracking />
        <Analytics />
        <SpeedInsights />
        {/* Apollo.io website visitor tracker. Production only, so local
            development and Vercel preview links never count as visits.
            Disclosed on /privacy; keep that page in step if this changes.
            Every third-party tag honours the opt-out in lib/consent.ts. */}
        {process.env.VERCEL_ENV === "production" && <AdPixels />}
        {process.env.VERCEL_ENV === "production" && <ClarityTracker />}
        {process.env.VERCEL_ENV === "production" && (
          <Script id="apollo-tracker" strategy="afterInteractive">
            {`if(${TRACKING_ALLOWED_JS}){function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");
  o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
  o.onload=function(){window.trackingFunctions.onLoad({appId:"6aa5b0de804ad70018bc61f9"})},
  document.head.appendChild(o)}initApollo();}`}
          </Script>
        )}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
      {/* Google Analytics 4 via the Google tag. Production only, like the
          Apollo tracker above. Disclosed on /privacy. */}
      {process.env.VERCEL_ENV === "production" && gaId && (
        <>
          <Script id="ga-opt-out" strategy="beforeInteractive">
            {`if(!${TRACKING_ALLOWED_JS})window['ga-disable-${gaId}']=true;`}
          </Script>
          <GoogleAnalytics gaId={gaId} />
        </>
      )}
    </html>
  );
}
