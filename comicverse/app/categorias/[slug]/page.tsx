import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/post-card";
import { getDictionary, pickText } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { getCategoriesWithCounts, getPostsByCategory } from "@/lib/posts";

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const categories = await getCategoriesWithCounts("en");
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await getLocale();
  const categories = await getCategoriesWithCounts(locale);
  const category = categories.find((entry) => entry.slug === params.slug);

  if (!category) {
    return {
      title: locale === "es" ? "Categoría" : "Category"
    };
  }

  return {
    title: `${locale === "es" ? "Categoría" : "Category"}: ${pickText(category.name, locale)}`,
    description: pickText(category.description, locale)
  };
}

export default async function CategoryDetailPage({ params }: PageProps) {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const categories = await getCategoriesWithCounts(locale);
  const category = categories.find((entry) => entry.slug === params.slug);

  if (!category) {
    notFound();
  }

  const posts = await getPostsByCategory(params.slug, locale);

  return (
    <div className="space-y-8">
      <section className="surface px-6 py-8 dark:border-white/10 sm:px-8 sm:py-10">
        <p className="text-label mb-4 text-sm">
          {dict.common.breadcrumbsHome} / {dict.categories.title}
        </p>
        <p className="text-label text-xs font-semibold uppercase tracking-[0.35em]">
          {pickText(category.eyebrow, locale)}
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-semibold tracking-tight text-charcoal dark:text-ivory sm:text-5xl">
          {pickText(category.name, locale)}
        </h1>
        <p className="text-muted mt-4 max-w-2xl text-lg leading-8">
          {pickText(category.description, locale)}
        </p>
      </section>
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} locale={locale} />
        ))}
      </section>
    </div>
  );
}
