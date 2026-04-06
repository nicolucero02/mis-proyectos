"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/convertify/language-provider";
import type { Language } from "@/content/translations";

const LANGUAGES: Language[] = ["en", "es"];

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div
      className="inline-flex rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-xl"
      role="group"
      aria-label={t.language_toggle_label}
    >
      {LANGUAGES.map((option) => {
        const isActive = option === language;

        return (
          <button
            key={option}
            type="button"
            onClick={() => setLanguage(option)}
            className={cn(
              "relative rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] transition-colors",
              isActive ? "text-slate-950" : "text-slate-300 hover:text-white"
            )}
            aria-pressed={isActive}
          >
            {isActive ? (
              <motion.span
                layoutId="active-language-pill"
                className="absolute inset-0 rounded-full bg-sky-300 shadow-[0_0_28px_rgba(125,211,252,0.35)]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            ) : null}
            <span className="relative">{option}</span>
          </button>
        );
      })}
    </div>
  );
}
