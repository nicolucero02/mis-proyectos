"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import {
  translations,
  type Language,
  type TranslationMessages
} from "@/content/translations";

const STORAGE_KEY = "convertify-language";

function detectBrowserLanguage(): Language {
  const browserLanguage = navigator.language.toLowerCase();

  return browserLanguage.startsWith("es") ? "es" : "en";
}

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: TranslationMessages;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem(STORAGE_KEY);

    if (storedLanguage === "en" || storedLanguage === "es") {
      setLanguage(storedLanguage);
      return;
    }

    setLanguage(detectBrowserLanguage());
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: translations[language]
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}
