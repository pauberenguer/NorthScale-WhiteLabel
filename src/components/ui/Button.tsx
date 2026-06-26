"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "blue" | "secondary" | "ghost" | "outline" | "white";
type Size = "sm" | "md" | "lg" | "xl";

const base =
  "group relative inline-flex items-center justify-between gap-3 rounded-full font-medium tracking-tight transition-[transform,background,color,border-color] duration-300 ease-out will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-60 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-white hover:bg-ink-soft active:scale-[0.98]",
  blue:
    "bg-[#0071e3] text-white hover:bg-[#0086fc] active:scale-[0.98] shadow-[0_8px_24px_-8px_rgba(0,113,227,0.6)]",
  secondary:
    "bg-bg text-ink border border-line-strong hover:bg-surface active:scale-[0.98]",
  ghost:
    "text-ink hover:bg-surface-2 active:scale-[0.98]",
  outline:
    "bg-transparent text-ink border border-line-strong hover:border-ink active:scale-[0.98]",
  white:
    "bg-white text-ink hover:bg-bg/95 active:scale-[0.98] shadow-[0_8px_24px_-12px_rgba(0,0,0,0.25)]",
};

const sizes: Record<Size, string> = {
  sm: "h-10 pl-4 pr-1 [font-size:13px]",
  md: "h-12 pl-5 pr-1.5 [font-size:14px]",
  lg: "h-14 pl-6 pr-2 [font-size:15px]",
  xl: "h-16 pl-8 pr-2 [font-size:16px]",
};

const iconSizes: Record<Size, string> = {
  sm: "h-8 w-8",
  md: "h-9 w-9",
  lg: "h-10 w-10",
  xl: "h-12 w-12",
};

const variantTextColor: Record<Variant, string | undefined> = {
  primary: "#ffffff",
  blue: "#ffffff",
  secondary: undefined,
  ghost: undefined,
  outline: undefined,
  white: undefined,
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  type = "button",
  iconRight = true,
  ariaLabel,
  disabled,
  newTab,
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  iconRight?: boolean;
  ariaLabel?: string;
  disabled?: boolean;
  newTab?: boolean;
}) {
  const iconBg =
    variant === "blue"
      ? "bg-white text-[#0071e3]"
      : variant === "primary"
        ? "bg-white text-ink"
        : variant === "white"
          ? "bg-ink text-white"
          : "bg-ink text-white";

  const content = (
    <>
      <span className="relative z-10 pl-1">{children}</span>
      {iconRight && (
        <span
          className={cn(
            "relative z-10 inline-flex shrink-0 items-center justify-center rounded-full",
            iconSizes[size],
            iconBg,
          )}
        >
          <Arrow className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      )}
    </>
  );

  const cls = cn(
    base,
    variants[variant],
    sizes[size],
    !iconRight && "justify-center pr-6 gap-0",
    className,
  );

  const inlineColor = variantTextColor[variant];
  const style = inlineColor ? { color: inlineColor } : undefined;

  if (href) {
    const isExternal = href.startsWith("http");
    const isAnchor = href.startsWith("#");
    const opensNewTab = isExternal || newTab;

    if (isExternal || isAnchor || opensNewTab) {
      return (
        <a
          href={href}
          className={cls}
          style={style}
          aria-label={ariaLabel}
          {...(opensNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={cls}
        style={style}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={cls}
      style={style}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {content}
    </button>
  );
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 14" className={className} aria-hidden="true">
      <path
        d="M2 12 L12 2 M12 2 H4 M12 2 V10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
