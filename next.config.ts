import type { NextConfig } from "next";

/**
 * The client portal is a separate Next app, served inside this site at
 * /portal so clients never leave skoxsoftware.com. It builds and deploys on
 * its own; only these rewrites tie the two together.
 *
 * Rewrites run before dynamic routes, so /portal reaches the portal rather
 * than app/[service].
 */
const PORTAL_ORIGIN = process.env.PORTAL_ORIGIN ?? "https://portal.skoxsoftware.com";
/** Office Chief, the Ireland & Associates Surveying demo: its own Next app, built with basePath /irelandsurveying. */
const IRELAND_ORIGIN = process.env.IRELAND_ORIGIN ?? "https://quote-desk-pi.vercel.app";

/** The host the site lives on since the UnBusy cutover. skoxsoftware.com 308s here forever. */
const HOST = "https://gounbusy.com";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: { root: __dirname },
  async redirects() {
    const oldHost = [{ type: "host" as const, value: "(www\\.)?skoxsoftware\\.com" }];
    return [
      /*
       * Domain cutover (SITE-PLAN §5). Everything on skoxsoftware.com moves to
       * gounbusy.com except the portal and the Ireland demo, which prospects
       * and clients reach through links on the old host and which are served
       * by the rewrites below on either host.
       */
      { source: "/", has: oldHost, destination: `${HOST}/`, permanent: true },
      {
        source: "/:path((?!portal(?:/|$)|irelandsurveying(?:/|$)|api/|_next/).*)",
        has: oldHost,
        destination: `${HOST}/:path`,
        permanent: true,
      },
      { source: "/:path*", has: [{ type: "host", value: "www.gounbusy.com" }], destination: `${HOST}/:path*`, permanent: true },

      /* The SKOX pages, retired at cutover (SITE-PLAN §3). */
      { source: "/for/property-management", destination: "/property-management", permanent: true },
      { source: "/for/:trade", destination: "/", permanent: true },
      {
        source: "/:slug(web-apps|dashboards|websites|customer-portals|internal-tools|integrations|mvp-development|examples|dashboard-examples|internal-tool-examples)",
        destination: "/",
        permanent: true,
      },
      { source: "/scorecard", destination: "/review", permanent: true },
      { source: "/scorecard/:path*", destination: "/review", permanent: true },
      { source: "/scope-received", destination: "/review/booked", permanent: true },
    ];
  },
  async rewrites() {
    return [
      { source: "/portal", destination: `${PORTAL_ORIGIN}/portal` },
      { source: "/portal/:path*", destination: `${PORTAL_ORIGIN}/portal/:path*` },
      { source: "/irelandsurveying", destination: `${IRELAND_ORIGIN}/irelandsurveying` },
      { source: "/irelandsurveying/:path*", destination: `${IRELAND_ORIGIN}/irelandsurveying/:path*` },
    ];
  },
};

export default nextConfig;
