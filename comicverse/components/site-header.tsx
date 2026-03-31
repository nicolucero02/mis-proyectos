"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { LOCALE_COOKIE } from "@/lib/i18n";
import { siteNavigation } from "@/lib/site-data";

type SiteHeaderProps = {
  locale: Locale;
  labels: {
    home: string;
    blog: string;
    categories: string;
    rankings: string;
    guides: string;
    about: string;
    issue: string;
  };
};

type Theme = "light" | "dark";

const navLabelMap = {
  "/": "home",
  "/blog": "blog",
  "/categorias": "categories",
  "/rankings": "rankings",
  "/guias": "guides",
  "/about": "about"
} as const;

function setLocaleCookie(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

function setTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  localStorage.setItem("comicverse-theme", theme);
}

export function SiteHeader({ locale, labels }: SiteHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setThemeState] = useState<Theme>("light");
  const [, startTransition] = useTransition();

  useEffect(() => {
    const root = document.documentElement;
    setThemeState(root.classList.contains("dark") ? "dark" : "light");
  }, []);

  const changeLocale = (nextLocale: Locale) => {
    setLocaleCookie(nextLocale);
    startTransition(() => router.refresh());
  };

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setThemeState(nextTheme);
    setTheme(nextTheme);
  };

  const navItems = siteNavigation.map((item) => ({
    href: item.href,
    label:
      item.href === "/"
        ? labels.home
        : item.href === "/blog"
          ? labels.blog
          : item.href === "/categorias"
            ? labels.categories
            : item.href === "/rankings"
              ? labels.rankings
              : item.href === "/guias"
                ? labels.guides
                : labels.about
  }));

  return (
    <header className="sticky top-4 z-50 mb-14">
      <div className="border-subtle relative flex items-center justify-between gap-4 rounded-full border bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(250,246,240,0.72))] px-4 py-3 shadow-[0_22px_70px_rgba(20,16,13,0.12)] backdrop-blur-xl transition-colors duration-300 dark:bg-[linear-gradient(180deg,rgba(20,18,17,0.96),rgba(12,11,10,0.92))] dark:shadow-[0_22px_70px_rgba(0,0,0,0.42)] sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#161311,#3f281f)] text-sm font-bold text-ivory shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] dark:border dark:border-white/10 dark:bg-[linear-gradient(135deg,#f6ede2,#c2794f)] dark:text-charcoal">
            CV
          </span>
          <span className="flex flex-col">
            <span className="text-label text-[10px] font-semibold uppercase tracking-[0.34em]">
              {labels.issue}
            </span>
            <span className="text-main font-[family-name:var(--font-heading)] text-xl font-semibold tracking-[0.08em]">
              ComicVerse
            </span>
          </span>
        </Link>

        <nav className="border-subtle bg-elevated hidden items-center gap-1 rounded-full border px-2 py-1 md:flex">
          {navItems.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-charcoal text-ivory dark:bg-ivory dark:text-charcoal"
                    : "text-muted hover:bg-charcoal hover:text-ivory dark:hover:bg-ivory dark:hover:text-charcoal"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <div className="border-subtle bg-elevated flex items-center rounded-full border p-1">
            {(["es", "en"] as Locale[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => changeLocale(option)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                  locale === option
                    ? "bg-charcoal text-ivory dark:bg-ivory dark:text-charcoal"
                    : "text-label"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="border-subtle bg-elevated text-main inline-flex h-11 w-11 items-center justify-center rounded-full border text-sm transition hover:border-copper"
            aria-label={locale === "es" ? "Cambiar tema" : "Toggle theme"}
          >
            {theme === "dark" ? "☼" : "☾"}
          </button>
        </div>

        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className="border-subtle bg-elevated text-main inline-flex h-11 w-11 items-center justify-center rounded-full border text-sm font-semibold shadow-sm transition hover:border-copper"
            aria-expanded={menuOpen}
            aria-label={locale === "es" ? "Abrir navegación" : "Toggle navigation"}
          >
            {menuOpen ? "×" : "≡"}
          </button>
        </div>

        {menuOpen ? (
          <div className="bg-card-surface border-subtle absolute inset-x-0 top-[calc(100%+0.75rem)] rounded-[2rem] border p-4 shadow-2xl backdrop-blur md:hidden">
            <nav className="grid gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-main rounded-2xl px-4 py-3 text-sm font-medium transition hover:bg-charcoal hover:text-ivory dark:hover:bg-ivory dark:hover:text-charcoal"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="border-subtle mt-4 flex items-center justify-between gap-3 border-t pt-4">
              <div className="border-subtle bg-elevated flex items-center rounded-full border p-1">
                {(["es", "en"] as Locale[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => changeLocale(option)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                      locale === option
                        ? "bg-charcoal text-ivory dark:bg-ivory dark:text-charcoal"
                        : "text-label"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={toggleTheme}
                className="border-subtle text-main rounded-full border px-4 py-2 text-sm font-semibold"
              >
                {theme === "dark"
                  ? locale === "es"
                    ? "Claro"
                    : "Light"
                  : locale === "es"
                    ? "Oscuro"
                    : "Dark"}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
