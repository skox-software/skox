import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { CaptureAttribution } from "@/components/CaptureAttribution";
import { SiteTracking } from "@/components/SiteTracking";
import { AdPixels } from "@/components/AdPixels";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { site } from "@/content/site";
import "./globals.css";
import "./landing.css";

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});
const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});
/* Display face for h1/h2 only. It ships a single weight, which is the point:
   the system's serif never goes bold, and there is no heavier cut to reach for. */
const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#faf9f6",
};

/* Google Analytics 4 measurement ID (G-…). Unset means no Google tag at all. */
const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      name: site.name,
      description: site.description,
      url: site.url,
      email: site.email,
      areaServed: "US",
      serviceType: [
        "Custom software development",
        "Business intelligence dashboards",
        "Website design and development",
      ],
      founder: [
        { "@type": "Person", name: "Joshua Fox" },
        { "@type": "Person", name: "Reiss Skeen" },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${serif.variable}`}
    >
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
            Disclosed on /privacy; keep that page in step if this changes. */}
        {process.env.VERCEL_ENV === "production" && <AdPixels />}
        {process.env.VERCEL_ENV === "production" && (
          <Script id="apollo-tracker" strategy="afterInteractive">
            {`function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");
  o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
  o.onload=function(){window.trackingFunctions.onLoad({appId:"6aa5b0de804ad70018bc61f9"})},
  document.head.appendChild(o)}initApollo();`}
          </Script>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
      {/* Google Analytics 4 via the Google tag. Production only, like the
          Apollo tracker above, so local and preview traffic stays out of the
          reports. Disclosed on /privacy; keep that page in step if this
          changes. */}
      {process.env.VERCEL_ENV === "production" && gaId && (
        <GoogleAnalytics gaId={gaId} />
      )}
    </html>
  );
}
