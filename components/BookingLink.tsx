"use client";

import type { ReactNode } from "react";
import { track } from "@vercel/analytics";

export function BookingLink({
  href,
  surface,
  className,
  children,
}: {
  href: string;
  surface: "scope-received" | "legacy-form";
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => track("booking_started", { surface })}
    >
      {children}
    </a>
  );
}
