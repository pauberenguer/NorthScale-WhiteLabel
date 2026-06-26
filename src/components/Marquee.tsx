"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Marquee({
  children,
  duration = 40,
  reverse = false,
  pauseOnHover = true,
  className,
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        pauseOnHover && "marquee-pause-on-hover",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-max items-center",
          reverse ? "marquee-track-reverse" : "marquee-track",
        )}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

export function Sparkle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("inline-block", className)}
      aria-hidden="true"
    >
      <path
        d="M12 2 L13.5 9.5 L21 11 L13.5 12.5 L12 20 L10.5 12.5 L3 11 L10.5 9.5 Z"
        fill="currentColor"
      />
    </svg>
  );
}
