import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "scale";

const CLASS: Record<Direction, string> = {
  up: "animate-fade-up",
  down: "animate-fade-down",
  left: "animate-fade-left",
  right: "animate-fade-right",
  scale: "animate-fade-scale",
};

/**
 * Entrance wrapper. The element ships at opacity-0 and is revealed only by the
 * CSS animation's `forwards` fill — no JS state, no IntersectionObserver.
 */
export function Animate({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: Direction;
}) {
  return (
    <div
      className={`opacity-0 ${CLASS[direction]} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
