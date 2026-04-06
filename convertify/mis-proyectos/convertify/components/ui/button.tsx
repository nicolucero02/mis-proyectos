import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-medium transition duration-200 disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" &&
          "border-sky-300/30 bg-sky-400 text-slate-950 shadow-[0_0_40px_rgba(56,189,248,0.35)] hover:bg-sky-300",
        variant === "secondary" &&
          "border-white/10 bg-white/6 text-white hover:border-white/20 hover:bg-white/10",
        variant === "ghost" &&
          "border-transparent bg-transparent text-slate-300 hover:bg-white/6 hover:text-white",
        className
      )}
      {...props}
    />
  );
}
