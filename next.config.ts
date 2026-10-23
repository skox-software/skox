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

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: { root: __dirname },
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
