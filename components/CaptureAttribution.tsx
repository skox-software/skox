"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

/** Records campaign parameters once per visit, on first load. */
export function CaptureAttribution() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
