import { pickText, type Locale } from "@/lib/i18n";
import type { RankingEntry } from "@/lib/site-data";

const RANKING_GLOW = "rgba(180,120,80,0.2)";

export function RankingCard({ ranking, locale }: { ranking: RankingEntry; locale: Locale }) {
  return (
    <article 
      className="bg-card-surface border-subtle rounded-[1.75rem] border p-6"
      style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 18px 60px rgba(20,16,13,0.06), 0 0 40px -16px ${RANKING_GLOW}` }}
    >
      <p className="text-label text-xs font-semibold uppercase tracking-[0.3em]">
        Ranking · {pickText(ranking.category, locale)}
      </p>
      <h3 className="text-main mt-4 font-[family-name:var(--font-heading)] text-3xl font-semibold tracking-tight">
        {pickText(ranking.title, locale)}
      </h3>
      <p className="text-muted mt-3 text-base leading-7">{pickText(ranking.summary, locale)}</p>
      <ol className="mt-6 grid gap-3">
        {ranking.items.map((item, index) => (
          <li
            key={pickText(item, locale)}
            className="bg-elevated border-subtle flex items-center gap-4 rounded-2xl border px-4 py-3"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-charcoal text-sm font-semibold text-ivory dark:bg-ivory dark:text-charcoal">
              {index + 1}
            </span>
            <span className="text-main font-medium">{pickText(item, locale)}</span>
          </li>
        ))}
      </ol>
    </article>
  );
}
