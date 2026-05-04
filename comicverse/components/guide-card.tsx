import Link from "next/link";
import { pickText, type Locale } from "@/lib/i18n";
import type { GuideEntry } from "@/lib/site-data";

const GUIDE_GLOW = "rgba(180,120,80,0.2)";

export function GuideCard({ guide, locale }: { guide: GuideEntry; locale: Locale }) {
  return (
    <article 
      className="bg-card-surface border-subtle rounded-[1.75rem] border p-6"
      style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 16px 50px rgba(20,16,13,0.06), 0 0 40px -16px ${GUIDE_GLOW}` }}
    >
      <div className="text-label flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.22em]">
        <span>{pickText(guide.level, locale)}</span>
        <span>·</span>
        <span>{pickText(guide.focus, locale)}</span>
      </div>
      <h3 className="text-main mt-4 font-[family-name:var(--font-heading)] text-3xl font-semibold tracking-tight">
        {pickText(guide.title, locale)}
      </h3>
      <p className="text-muted mt-3 text-base leading-7">{pickText(guide.summary, locale)}</p>
      <Link
        href={`/guias/${guide.slug}`}
        className="border-subtle text-main mt-6 inline-flex rounded-full border px-4 py-2 text-sm font-semibold transition hover:border-copper"
      >
        {locale === "es" ? "Ruta recomendada" : "Recommended path"}
      </Link>
    </article>
  );
}
