import { cn } from "@/lib/utils";
import { site } from "@/lib/content";

type Props = {
  className?: string;
  wordmarkClassName?: string;
  variant?: "dark" | "light";
};

export function Logo({
  className,
  wordmarkClassName,
  variant = "dark",
}: Props) {
  const isLight = variant === "light";
  return (
    <span className={cn("inline-flex items-center", className)}>
      <span
        className={cn(
          "text-[19px] font-semibold tracking-[-0.02em] leading-none",
          wordmarkClassName,
        )}
        style={{ color: isLight ? "#ffffff" : "var(--color-ink)" }}
      >
        {site.name}
      </span>
    </span>
  );
}
