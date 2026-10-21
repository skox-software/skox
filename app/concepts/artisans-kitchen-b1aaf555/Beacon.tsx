"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";
import { SLUG } from "./data";

/** Fires once per browser session when the preview is opened. */
export default function Beacon() {
  useEffect(() => {
    try {
      const key = `preview_open:${SLUG}`;
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      /* private mode: still send */
    }
    track("preview_open", {
      slug: SLUG,
      device: window.innerWidth < 768 ? "phone" : "desktop",
    });
  }, []);
  return null;
}
