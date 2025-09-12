"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "@/context/theme-context";

export function AnimatedGradientText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { theme, mode } = useTheme();

  return (
    <span
      className={cn(
        "animate-gradient bg-gradient-to-r from-primary via-[hsl(var(--off-white))] to-primary bg-[length:200%_auto] bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </span>
  );
}
