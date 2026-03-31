import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { pickText } from "@/lib/i18n";
import { formatReadingTime, getCategoryBySlug, type PostMeta } from "@/lib/posts";

type HeroSectionProps = {
  featuredPost: PostMeta;
  locale: Locale;
  stats: {
    archiveValue: string;
    sectionsValue: string;
    formatValue: string;
  };
  labels: {
    eyebrow: string;
    subtitle: string;
    primary: string;
    secondary: string;
    statsArchive: string;
    statsArchiveText: string;
    statsSections: string;
    statsSectionsText: string;
    statsFormat: string;
    statsFormatText: string;
    spotlight: string;
    spotlightTitle: string;
  };
};

export function HeroSection({ featuredPost, locale, stats, labels }: HeroSectionProps) {
  const category = getCategoryBySlug(featuredPost.categorySlug);

  return (
    <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="hero-panel relative overflow-hidden px-6 py-10 sm:px-10 sm:py-14 dark:border-white/10">
        <p className="text-label text-xs font-semibold uppercase tracking-[0.38em]">
          {labels.eyebrow}
        </p>
        <h1 className="mt-5 max-w-4xl font-[family-name:var(--font-heading)] text-6xl font-semibold leading-[0.9] tracking-tight text-charcoal dark:text-ivory sm:text-7xl xl:text-[6.5rem]">
          ComicVerse
        </h1>
        <p className="text-muted mt-6 max-w-2xl text-xl leading-9 sm:text-2xl">
          {labels.subtitle}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/blog"
            className="inline-flex rounded-full bg-charcoal px-6 py-3 text-sm font-semibold text-ivory transition hover:bg-copper dark:bg-ivory dark:text-charcoal dark:hover:bg-copper dark:hover:text-white"
          >
            {labels.primary}
          </Link>
          <Link
            href="/guias"
            className="border-subtle bg-elevated text-main inline-flex rounded-full border px-6 py-3 text-sm font-semibold transition hover:border-copper"
          >
            {labels.secondary}
          </Link>
        </div>
        <div className="surface-border mt-12 grid gap-5 border-t pt-8 sm:grid-cols-3">
          <div>
            <p className="text-label text-[11px] font-semibold uppercase tracking-[0.24em]">
              {labels.statsArchive}
            </p>
            <p className="mt-2 font-[family-name:var(--font-heading)] text-3xl font-semibold text-charcoal dark:text-ivory">
              {stats.archiveValue}
            </p>
            <p className="text-soft mt-1 text-sm">{labels.statsArchiveText}</p>
          </div>
          <div>
            <p className="text-label text-[11px] font-semibold uppercase tracking-[0.24em]">
              {labels.statsSections}
            </p>
            <p className="mt-2 font-[family-name:var(--font-heading)] text-3xl font-semibold text-charcoal dark:text-ivory">
              {stats.sectionsValue}
            </p>
            <p className="text-soft mt-1 text-sm">{labels.statsSectionsText}</p>
          </div>
          <div>
            <p className="text-label text-[11px] font-semibold uppercase tracking-[0.24em]">
              {labels.statsFormat}
            </p>
            <p className="mt-2 font-[family-name:var(--font-heading)] text-3xl font-semibold text-charcoal dark:text-ivory">
              {stats.formatValue}
            </p>
            <p className="text-soft mt-1 text-sm">{labels.statsFormatText}</p>
          </div>
        </div>
      </div>
      <aside className="feature-panel flex min-h-[360px] flex-col overflow-hidden px-6 py-7 sm:px-8 sm:py-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-label text-xs font-semibold uppercase tracking-[0.32em]">
              {labels.spotlight}
            </p>
            <p className="text-main mt-3 max-w-xs font-[family-name:var(--font-heading)] text-3xl font-semibold tracking-tight">
              {labels.spotlightTitle}
            </p>
          </div>
          <span className="border-subtle bg-elevated text-soft rounded-full border px-3 py-1 text-xs font-medium">
            {category ? pickText(category.name, locale) : featuredPost.category}
          </span>
        </div>
        <div className="mt-8 flex flex-1 flex-col">
          <div className="spotlight-media relative h-52 overflow-hidden rounded-[2.2rem] sm:h-60">
            <Image
              src={featuredPost.image}
              alt={featuredPost.title}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,11,9,0.08),rgba(15,11,9,0.38)),radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_32%)] dark:bg-[linear-gradient(180deg,rgba(15,11,9,0.12),rgba(15,11,9,0.52)),radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_32%)]" />
          </div>
          <div className="mt-6">
            <p className="text-label text-[11px] font-semibold uppercase tracking-[0.26em]">
              {featuredPost.date} · {formatReadingTime(featuredPost.readingMinutes, locale)}
            </p>
            <h2 className="text-main mt-3 max-w-[18ch] font-[family-name:var(--font-heading)] text-[2.2rem] font-semibold leading-[1.02] tracking-tight">
              {featuredPost.title}
            </h2>
            <p className="text-muted mt-4 max-w-[34rem] text-[1.02rem] leading-7">{featuredPost.excerpt}</p>
          </div>
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="text-main mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold transition hover:text-copper"
          >
            {locale === "es" ? "Abrir artículo" : "Open feature"}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </aside>
    </section>
  );
}
