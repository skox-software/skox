import { track as vercelTrack } from "@vercel/analytics";

type Props = Record<string, string | number | boolean | null | undefined>;

/**
 * GA4's recommended name for a lead. Marked as a key event in GA Admin, it is
 * the number every traffic source gets judged by.
 */
const GA_RENAMES: Record<string, string> = { scope_request: "generate_lead" };

/* gtag only reads real `arguments` objects off the dataLayer, never arrays.
   The layer exists only when the Google tag loaded (production), so dev and
   preview stay silent. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function gtag(..._args: unknown[]): void {
  const w = window as unknown as { dataLayer?: unknown[] };
  // eslint-disable-next-line prefer-rest-params
  w.dataLayer?.push(arguments);
}

/** One event, sent to both Vercel Analytics and Google Analytics. */
export function track(name: string, props?: Props): void {
  vercelTrack(name, props);
  try {
    gtag("event", GA_RENAMES[name] ?? name, {
      ...props,
      page: props?.page ?? window.location.pathname,
    });
  } catch {
    /* analytics never breaks the page */
  }
}
