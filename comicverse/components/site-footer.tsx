import Link from "next/link";
import { pickText, type Locale } from "@/lib/i18n";
import { categories, siteNavigation } from "@/lib/site-data";

type SiteFooterProps = {
  locale: Locale;
  labels: {
    eyebrow: string;
    description: string;
    note: string;
    navigation: string;
    categories: string;
    legalLeft: string;
    legalRight: string;
  };
};

export function SiteFooter({ locale, labels }: SiteFooterProps) {
  const navLabels = siteNavigation.map((item) => {
    if (item.href === "/") return { href: item.href, label: locale === "es" ? "Inicio" : "Home" };
    if (item.href === "/blog") return { href: item.href, label: "Blog" };
    if (item.href === "/categorias") {
      return { href: item.href, label: locale === "es" ? "Categorías" : "Categories" };
    }
    if (item.href === "/rankings") return { href: item.href, label: "Rankings" };
    if (item.href === "/guias") return { href: item.href, label: locale === "es" ? "Guías" : "Guides" };
    return { href: item.href, label: locale === "es" ? "Acerca" : "About" };
  });

  return (
    <footer className="surface-border surface-fill mt-28 overflow-hidden rounded-[2.5rem] border px-6 py-8 shadow-[0_30px_90px_rgba(20,16,13,0.08)] transition-colors duration-300 dark:shadow-[0_30px_90px_rgba(0,0,0,0.3)] sm:px-8">
      <div className="border-subtle grid gap-10 border-b pb-12 md:grid-cols-[1.3fr_0.7fr_0.7fr]">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-charcoal text-sm font-bold text-ivory dark:bg-ivory dark:text-charcoal">
              CV
            </span>
            <div>
              <p className="text-label text-[10px] font-semibold uppercase tracking-[0.32em]">
                {labels.eyebrow}
              </p>
              <p className="text-main font-[family-name:var(--font-heading)] text-3xl font-semibold tracking-tight">
                ComicVerse
              </p>
            </div>
          </div>
          <p className="text-muted max-w-lg text-sm leading-7">{labels.description}</p>
          <p className="text-soft max-w-md text-sm leading-7">{labels.note}</p>
        </div>
        <div>
          <p className="text-label text-sm font-semibold uppercase tracking-[0.24em]">{labels.navigation}</p>
          <div className="mt-5 grid gap-3 text-sm">
            {navLabels.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted transition hover:translate-x-1 hover:text-copper"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-label text-sm font-semibold uppercase tracking-[0.24em]">{labels.categories}</p>
          <div className="mt-5 grid gap-3 text-sm">
            {categories.slice(0, 5).map((category) => (
              <Link
                key={category.slug}
                href={`/categorias/${category.slug}`}
                className="text-muted transition hover:translate-x-1 hover:text-copper"
              >
                {pickText(category.name, locale)}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="text-label flex flex-col gap-3 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>{labels.legalLeft}</p>
        <p>{labels.legalRight}</p>
      </div>
    </footer>
  );
}
