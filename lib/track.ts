import { track as vercelTrack } from "@vercel/analytics";
import { leadEventId } from "@/lib/attribution";

type Props = Record<string, string | number | boolean | null | undefined>;

/**
 * GA4's recommended name for a lead. Marked as a key event in GA Admin, it is
 * the number every traffic source gets judged by.
 */
const GA_RENAMES: Record<string, string> = { scope_request: "generate_lead" };

type AdWindow = {
  dataLayer?: unknown[];
  fbq?: (...args: unknown[]) => void;
  lintrk?: (action: string, data: Record<string, unknown>) => void;
};

/* gtag only reads real `arguments` objects off the dataLayer, never arrays.
   The layer exists only when the Google tag loaded (production), so dev and
   preview stay silent. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function gtag(..._args: unknown[]): void {
  const w = window as unknown as AdWindow;
  // eslint-disable-next-line prefer-rest-params
  w.dataLayer?.push(arguments);
}

/** Tell the ad platforms a lead happened. Each is a no-op when its tag is off. */
function adConversion(name: string, props?: Props): void {
  const w = window as unknown as AdWindow;
  if (name === "scope_request") {
    const eventID = leadEventId();
    w.fbq?.("track", "Lead", { content_category: props?.type }, { eventID });
    const ads = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL;
    if (ads) gtag("event", "conversion", { send_to: ads, transaction_id: eventID });
    const li = process.env.NEXT_PUBLIC_LINKEDIN_LEAD_CONVERSION_ID;
    if (li) w.lintrk?.("track", { conversion_id: Number(li) });
  } else if (name === "email_click" || name === "phone_click") {
    w.fbq?.("track", "Contact");
  } else if (name === "scope_form_started") {
    w.fbq?.("trackCustom", "LeadFormStarted");
  }
}

/**
 * Hand the lead's email to Google's tag for enhanced conversions, which hashes
 * it before it leaves the browser. It never goes to GA as an event parameter.
 */
export function identify(email: string): void {
  try {
    gtag("set", "user_data", { email: email.trim().toLowerCase() });
  } catch {
    /* analytics never breaks the page */
  }
}

/** One event, sent to Vercel Analytics, Google Analytics and the ad platforms. */
export function track(name: string, props?: Props): void {
  vercelTrack(name, props);
  try {
    gtag("event", GA_RENAMES[name] ?? name, {
      ...props,
      page: props?.page ?? window.location.pathname,
    });
    adConversion(name, props);
  } catch {
    /* analytics never breaks the page */
  }
}
