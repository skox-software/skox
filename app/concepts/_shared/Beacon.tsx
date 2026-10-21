"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

/** Fires preview_open once per browser session when the preview is opened. */
export default function Beacon({ slug }: { slug: string }) {
  useEffect(() => {
    try {
      const key = `preview_open:${slug}`;
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      /* private mode: still send */
    }
    track("preview_open", {
      slug,
      device: window.innerWidth < 768 ? "phone" : "desktop",
    });
  }, [slug]);
  return null;
}
