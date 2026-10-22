"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

const TEAM_KEY = "skox_team";

/** True for the SKOX team: anyone who has opened a preview with ?team once on this browser. */
function isTeam() {
  try {
    if (new URLSearchParams(window.location.search).has("team")) {
      localStorage.setItem(TEAM_KEY, "1");
      return true;
    }
    return localStorage.getItem(TEAM_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * Fires once per browser session when the preview is opened: preview_open
 * via lib/track, and, given the portal deal, a view the portal records (the
 * first one after the link was sent emails the team). The team's own views,
 * marked with ?team, are never reported.
 */
export default function Beacon({ slug, dealId }: { slug: string; dealId?: string }) {
  useEffect(() => {
    if (isTeam()) return;
    try {
      const key = `preview_open:${slug}`;
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      /* private mode: still send */
    }
    const device = window.innerWidth < 768 ? "phone" : "desktop";
    track("preview_open", { slug, device });
    if (dealId) {
      fetch("/portal/api/lead-previews/open", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dealId, device }),
        keepalive: true,
      }).catch(() => {});
    }
  }, [slug, dealId]);
  return null;
}
