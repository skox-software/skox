"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { track } from "@/lib/track";

/**
 * The scheduling step: the booking page Josh controls (Calendly or a Google
 * Calendar appointment schedule), embedded. Calendly tells the parent page
 * when a time is booked; we then move to the confirmation, unless Calendly's
 * own redirect (set to /review/booked/confirmed with event details) got there
 * first. Google's page sends nothing, so its visitors finish on the invite
 * email, which the copy under the frame says.
 */
export function BookingEmbed({ url, title }: { url: string; title: string }) {
  const router = useRouter();
  const calendly = /(^|\.)calendly\.com$/i.test(safeHost(url));
  const src = calendly ? withParams(url, { embed_type: "Inline", hide_gdpr_banner: "1" }) : url;

  useEffect(() => {
    if (!calendly) return;
    const onMessage = (e: MessageEvent) => {
      if (!/calendly\.com$/i.test(safeHost(e.origin))) return;
      const event = (e.data as { event?: string } | null)?.event;
      if (event === "calendly.event_scheduled") {
        track("review_booked", { tool: "calendly" });
        // Give Calendly's own redirect (with the time) a moment to win.
        window.setTimeout(() => router.push("/review/booked/confirmed"), 1500);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [calendly, router]);

  return (
    <div className="booking">
      <iframe src={src} title={title} loading="eager" />
      <p className="small booking-note">
        {calendly ? "Pick a time and you'll land on your confirmation." : "Pick a time and the invite arrives by email."}{" "}
        <a className="link" href={url} target="_blank" rel="noopener">
          Open the booking page in a new tab
        </a>
      </p>
    </div>
  );
}

function safeHost(u: string) {
  try {
    return new URL(u).host;
  } catch {
    return "";
  }
}

function withParams(u: string, params: Record<string, string>) {
  try {
    const url = new URL(u);
    for (const [k, v] of Object.entries(params)) if (v) url.searchParams.set(k, v);
    return url.toString();
  } catch {
    return u;
  }
}
