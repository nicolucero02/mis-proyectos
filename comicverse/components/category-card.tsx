import Link from "next/link";
import type { Locale } from "@/lib/i18n";

type CategoryCardProps = {
  name: string;
  slug: string;
  eyebrow: string;
  description: string;
  count?: number;
  locale: Locale;
};

export function CategoryCard({
  name,
  slug,
  eyebrow,
  description,
  count,
  locale
}: CategoryCardProps) {
  return (
    <Link
      href={`/categorias/${slug}`}
      className="group bg-card-surface border-subtle relative overflow-hidden rounded-[2rem] border p-6 shadow-[0_16px_60px_rgba(20,16,13,0.06)] transition hover:-translate-y-1"
    >
      <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-copper/8 blur-2xl transition group-hover:bg-copper/14" />
      <p className="text-soft text-xs font-semibold uppercase tracking-[0.3em]">{eyebrow}</p>
      <h3 className="text-main mt-4 font-[family-name:var(--font-heading)] text-2xl font-semibold tracking-tight transition group-hover:text-copper">
        {name}
      </h3>
      <p className="text-muted mt-3 text-base leading-8">{description}</p>
      <div className="text-soft mt-5 flex items-center justify-between text-sm font-medium">
        <span>{count ?? 0} {locale === "es" ? "artículos" : "stories"}</span>
        <span className="text-main">{locale === "es" ? "Explorar" : "Explore"}</span>
      </div>
    </Link>
  );
}
