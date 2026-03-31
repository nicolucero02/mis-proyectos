import type { Metadata } from "next";
import { RankingCard } from "@/components/ranking-card";
import { SectionHeader } from "@/components/section-header";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { rankings } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Rankings",
  description: "Selecciones y rankings editoriales sobre runs, autores y obras esenciales."
};

export default function RankingsPage() {
  const localePromise = getLocale();

  return <RankingsContent localePromise={localePromise} />;
}

async function RankingsContent({ localePromise }: { localePromise: Promise<"es" | "en"> }) {
  const locale = await localePromise;
  const dict = getDictionary(locale);

  return (
    <div className="space-y-8">
      <section className="surface px-6 py-8 dark:border-white/10 sm:px-8 sm:py-10">
        <SectionHeader
          eyebrow={dict.rankings.eyebrow}
          title={dict.rankings.title}
          description={dict.rankings.description}
        />
      </section>
      <section className="grid gap-6 xl:grid-cols-3">
        {rankings.map((ranking) => (
          <RankingCard key={ranking.slug} ranking={ranking} locale={locale} />
        ))}
      </section>
    </div>
  );
}
