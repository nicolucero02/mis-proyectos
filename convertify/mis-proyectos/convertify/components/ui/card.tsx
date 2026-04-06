import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/10 bg-[rgba(10,14,30,0.76)] shadow-[0_24px_80px_rgba(2,6,23,0.45)] backdrop-blur-xl",
        className
      )}
      {...props}
    />
  );
}
