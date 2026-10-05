"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";
import { readAttribution } from "@/lib/attribution";

/*
 * Microsoft Clarity session recordings and heatmaps. Off until the project ID
 * is set, and off for browsers sending Global Privacy Control, like the ad
 * tags. Everything typed into a form is masked (data-clarity-mask on each
 * form), so recordings show where people click and scroll, never what they
 * write. Disclosed on /privacy; keep that page in step.
 */
const PROJECT = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

export function ClarityTracker() {
  useEffect(() => {
    if (!PROJECT) return;
    if ((navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl) return;
    try {
      Clarity.init(PROJECT);
      // Filter recordings by campaign, so a Google Ads visit can be replayed.
      const a = readAttribution();
      for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_term"] as const) {
        if (a[key]) Clarity.setTag(key, a[key]);
      }
      if (a.gclid) Clarity.setTag("gclid", a.gclid);
    } catch {
      /* analytics never breaks the page */
    }
  }, []);
  return null;
}
