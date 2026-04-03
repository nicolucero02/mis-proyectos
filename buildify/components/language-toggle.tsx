"use client";

import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/language-context";
import type { Language } from "@/lib/i18n/translations";

const LANGUAGES: Language[] = ["en", "es"];

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1 shadow-glow transition-all duration-300">
      {LANGUAGES.map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => setLanguage(value)}
          className={cn(
            "rounded-full px-3 py-1.5 text-xs font-medium tracking-[0.2em] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0",
            language === value
              ? "bg-white text-black"
              : "text-white/50 hover:text-white/80"
          )}
          aria-pressed={language === value}
        >
          {t.language[value]}
        </button>
      ))}
    </div>
  );
}
