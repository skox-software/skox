"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureAttribution, recordPage } from "@/lib/attribution";

/** Records campaign parameters once per visit, and every page viewed. */
export function CaptureAttribution() {
  const pathname = usePathname();
  useEffect(() => {
    captureAttribution();
  }, []);
  useEffect(() => {
    recordPage(pathname);
  }, [pathname]);
  return null;
}
