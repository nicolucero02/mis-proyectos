import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, pickText } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { guideArticles } from "@/lib/site-data";

type PageProps = {
  params: {
    slug: string;
  };
};

function coverClass(cover: string) {
  const covers: Record<string, string> = {
    amber: "from-[#d06a3a] via-[#a23f31] to-[#2d1d1f]",
    midnight: "from-[#1e3259] via-[#10213e] to-[#0b1220]",
    moss: "from-[#5b6f5c] via-[#2f4638] to-[#161d18]",
    rose: "from-[#d37e7e] via-[#843b4e] to-[#24141b]",
    slate: "from-[#8590a3] via-[#3c4658] to-[#111826]",
    gold: "from-[#f0c777] via-[#b88235] to-[#352216]"
  };

  return covers[cover] ?? covers.amber;
}

export async function generateStaticParams() {
  return guideArticles.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await getLocale();
  const guide = guideArticles.find((entry) => entry.slug === params.slug);

  if (!guide) {
    return {
      title: locale === "es" ? "Guía" : "Guide"
    };
  }

  return {
    title: pickText(guide.title, locale),
    description: pickText(guide.description, locale)
  };
}

export default async function GuideDetailPage({ params }: PageProps) {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const guide = guideArticles.find((entry) => entry.slug === params.slug);

  if (!guide) {
    notFound();
  }

  return (
    <div className="space-y-10">
      <article className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-8">
          <header className="surface overflow-hidden dark:border-white/10">
            <div className={`bg-gradient-to-br ${coverClass(guide.cover)}`}>
              <div className="flex min-h-[23rem] flex-col justify-end bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_28%),linear-gradient(180deg,transparent,rgba(0,0,0,0.22))] px-6 py-8 sm:min-h-[26rem] sm:px-8 sm:py-10">
                <div>
                  <span className="media-badge mb-6 inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em]">
                    {pickText(guide.focus, locale)}
                  </span>
                  <p className="media-meta-soft mb-6 text-[11px] font-medium uppercase tracking-[0.16em]">
                    {dict.common.breadcrumbsHome} / {dict.nav.guides}
                  </p>
                  <p className="media-meta text-sm font-medium uppercase tracking-[0.2em]">
                    {pickText(guide.level, locale)} · {guide.readingMinutes}{" "}
                    {locale === "es" ? "min de lectura" : "min read"}
                  </p>
                  <h1 className="media-meta mt-4 max-w-[20ch] font-[family-name:var(--font-heading)] text-4xl font-semibold leading-[0.94] tracking-tight sm:mt-5 sm:text-6xl">
                    {pickText(guide.title, locale)}
                  </h1>
                </div>
              </div>
            </div>
            <div className="px-6 py-8 sm:px-8">
              <div className="text-soft flex flex-wrap gap-4 text-sm">
                <span>{dict.common.category}: {pickText(guide.focus, locale)}</span>
                <span>{pickText(guide.level, locale)}</span>
              </div>
              <p className="text-muted mt-4 max-w-3xl text-lg leading-8">
                {pickText(guide.excerpt, locale)}
              </p>
            </div>
          </header>

          <div className="surface px-6 py-8 dark:border-white/10 sm:px-10">
            <div className="grid gap-8">
              {guide.sections.map((section) => (
                <section key={pickText(section.heading, locale)} id={pickText(section.heading, locale).toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")}>
                  <h2 className="text-main font-[family-name:var(--font-heading)] text-3xl font-semibold tracking-tight">
                    {pickText(section.heading, locale)}
                  </h2>
                  <div className="mt-4 grid gap-5">
                    {section.paragraphs.map((paragraph) => (
                      <p key={pickText(paragraph, locale)} className="text-muted text-lg leading-8">
                        {pickText(paragraph, locale)}
                      </p>
                    ))}
                  </div>
                  {section.bullets ? (
                    <ul className="mt-5 grid gap-3">
                      {section.bullets.map((bullet) => (
                        <li key={pickText(bullet, locale)} className="text-muted border-subtle rounded-2xl border px-4 py-4 text-base leading-7">
                          {pickText(bullet, locale)}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="surface p-6 dark:border-white/10">
            <p className="text-label text-xs font-semibold uppercase tracking-[0.32em]">
              {locale === "es" ? "En esta guía" : "In this guide"}
            </p>
            <div className="mt-5 grid gap-3">
              {guide.sections.map((section) => {
                const id = pickText(section.heading, locale)
                  .toLowerCase()
                  .replace(/[^\w\s-]/g, "")
                  .replace(/\s+/g, "-");

                return (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="text-muted text-sm leading-6 transition hover:text-copper"
                  >
                    {pickText(section.heading, locale)}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="surface p-6 dark:border-white/10">
            <p className="text-label text-xs font-semibold uppercase tracking-[0.32em]">
              {dict.common.navigation}
            </p>
            <div className="mt-5 grid gap-4">
              <Link
                href="/guias"
                className="bg-elevated border-subtle rounded-2xl border px-4 py-4 transition hover:border-copper"
              >
                <span className="text-label block text-xs uppercase tracking-[0.2em]">
                  {locale === "es" ? "Volver a guías" : "Back to guides"}
                </span>
                <span className="text-main mt-2 block font-[family-name:var(--font-heading)] text-2xl font-semibold tracking-tight">
                  {dict.guides.title}
                </span>
              </Link>
            </div>
          </div>
        </aside>
      </article>
    </div>
  );
}
