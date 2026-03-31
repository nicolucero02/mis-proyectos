import type { Metadata } from "next";
import { GuideCard } from "@/components/guide-card";
import { SectionHeader } from "@/components/section-header";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { guides } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Guias",
  description: "Guias de lectura para empezar mejor en distintos rincones del comic."
};

export default function GuidesPage() {
  const localePromise = getLocale();

  return <GuidesContent localePromise={localePromise} />;
}

async function GuidesContent({ localePromise }: { localePromise: Promise<"es" | "en"> }) {
  const locale = await localePromise;
  const dict = getDictionary(locale);

  return (
    <div className="space-y-8">
      <section className="surface px-6 py-8 dark:border-white/10 sm:px-8 sm:py-10">
        <SectionHeader
          eyebrow={dict.guides.eyebrow}
          title={dict.guides.title}
          description={dict.guides.description}
        />
      </section>
      <section className="grid gap-6 xl:grid-cols-3">
        {guides.map((guide) => (
          <GuideCard key={guide.slug} guide={guide} locale={locale} />
        ))}
      </section>
    </div>
  );
}
