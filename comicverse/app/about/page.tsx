import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";

export const metadata: Metadata = {
  title: "About",
  description: "La mision editorial y la razon de existir de ComicVerse."
};

export default function AboutPage() {
  const localePromise = getLocale();

  return <AboutContent localePromise={localePromise} />;
}

async function AboutContent({ localePromise }: { localePromise: Promise<"es" | "en"> }) {
  const locale = await localePromise;
  const dict = getDictionary(locale);

  return (
    <div className="space-y-8">
      <section className="surface px-6 py-10 dark:border-white/10 sm:px-10">
        <p className="text-label text-xs font-semibold uppercase tracking-[0.35em]">
          {dict.about.eyebrow}
        </p>
        <h1 className="mt-4 max-w-4xl font-[family-name:var(--font-heading)] text-4xl font-semibold tracking-tight text-charcoal dark:text-ivory sm:text-6xl">
          {dict.about.title}
        </h1>
        <p className="text-muted mt-6 max-w-3xl text-lg leading-8">
          {dict.about.description}
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <article className="surface p-6 dark:border-white/10">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-semibold tracking-tight text-charcoal dark:text-ivory">
            {dict.about.missionTitle}
          </h2>
          <p className="text-muted mt-4 text-base leading-8">
            {dict.about.missionBody}
          </p>
        </article>
        <article className="surface p-6 dark:border-white/10">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-semibold tracking-tight text-charcoal dark:text-ivory">
            {dict.about.toneTitle}
          </h2>
          <p className="text-muted mt-4 text-base leading-8">
            {dict.about.toneBody}
          </p>
        </article>
        <article className="surface p-6 dark:border-white/10">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-semibold tracking-tight text-charcoal dark:text-ivory">
            {dict.about.whyTitle}
          </h2>
          <p className="text-muted mt-4 text-base leading-8">
            {dict.about.whyBody}
          </p>
        </article>
      </section>
    </div>
  );
}
