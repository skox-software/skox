/*
 * One opt-out for every third-party tracker on the site: Google Analytics,
 * Apollo, Clarity, and the Meta, Google Ads and LinkedIn tags, plus the
 * server-side Meta event. Either signal turns them all off:
 *   - Global Privacy Control, which several US state laws require honouring;
 *   - the "Your Privacy Choices" switch on /privacy, kept in a cookie so the
 *     server sees it too.
 * Vercel Analytics is first-party and cookieless, so it stays on.
 */
export const OPT_OUT_COOKIE = "skox_optout";

/** The same test as `trackingAllowed`, for inline <Script> tags. */
export const TRACKING_ALLOWED_JS = `(navigator.globalPrivacyControl!==true&&document.cookie.indexOf('${OPT_OUT_COOKIE}=1')<0)`;

export function optedOut(): boolean {
  try {
    return document.cookie.split(/;\s*/).includes(`${OPT_OUT_COOKIE}=1`);
  } catch {
    return false;
  }
}

export function gpcOn(): boolean {
  return (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
}

export function trackingAllowed(): boolean {
  return !gpcOn() && !optedOut();
}

export function setOptOut(on: boolean): void {
  document.cookie = on
    ? `${OPT_OUT_COOKIE}=1; Path=/; Max-Age=${60 * 60 * 24 * 400}; SameSite=Lax; Secure`
    : `${OPT_OUT_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax; Secure`;
}

/** Server side: GPC header or the opt-out cookie. */
export function requestOptedOut(req: Request): boolean {
  if (req.headers.get("sec-gpc") === "1") return true;
  return (req.headers.get("cookie") ?? "").split(/;\s*/).includes(`${OPT_OUT_COOKIE}=1`);
}
