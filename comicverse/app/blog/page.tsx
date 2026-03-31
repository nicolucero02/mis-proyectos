import type { Metadata } from "next";
import { PostCard } from "@/components/post-card";
import { SectionHeader } from "@/components/section-header";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { getAllPosts, getCategoriesWithCounts } from "@/lib/posts";
import { pickText } from "@/lib/i18n";

type BlogPageProps = {
  searchParams?: {
    q?: string;
    categoria?: string;
  };
};

export const metadata: Metadata = {
  title: "Blog",
  description: "Archivo editorial de ComicVerse con articulos, ensayos y notas sobre comics."
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const query = searchParams?.q?.toLowerCase().trim() ?? "";
  const selectedCategory = searchParams?.categoria ?? "";
  const posts = await getAllPosts(locale);
  const categories = await getCategoriesWithCounts(locale);

  const filteredPosts = posts.filter((post) => {
    const matchesQuery =
      query.length === 0 ||
      [post.title, post.excerpt, post.category, post.author].some((value) =>
        value.toLowerCase().includes(query)
      );
    const matchesCategory =
      selectedCategory.length === 0 || post.categorySlug === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="space-y-8">
      <section className="surface px-6 py-8 dark:border-white/10 sm:px-8 sm:py-10">
        <p className="text-label mb-4 text-sm">
          {dict.common.breadcrumbsHome} / {dict.common.breadcrumbsBlog}
        </p>
        <SectionHeader
          eyebrow={dict.blog.eyebrow}
          title={dict.blog.title}
          description={dict.blog.description}
        />
        <form className="mt-8 grid gap-4 lg:grid-cols-[1fr_auto]">
          <label className="block">
            <span className="text-soft mb-2 block text-sm font-medium">{dict.blog.searchLabel}</span>
            <input
              type="search"
              name="q"
              defaultValue={searchParams?.q ?? ""}
              placeholder={dict.blog.searchPlaceholder}
              className="border-subtle bg-elevated text-main h-12 w-full rounded-full border px-5 text-sm outline-none transition focus:border-copper"
            />
          </label>
          <div className="flex items-end gap-3">
            <button className="h-12 rounded-full bg-charcoal px-6 text-sm font-semibold text-ivory transition hover:bg-copper dark:bg-ivory dark:text-charcoal">
              {dict.blog.filter}
            </button>
          </div>
        </form>
        <div className="mt-6 flex flex-wrap gap-2">
          <a
            href="/blog"
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              selectedCategory.length === 0
                ? "bg-charcoal text-ivory dark:bg-ivory dark:text-charcoal"
                : "border-subtle bg-elevated text-main border hover:border-copper"
            }`}
          >
            {dict.common.all}
          </a>
          {categories.map((category) => (
            <a
              key={category.slug}
              href={`/blog?categoria=${category.slug}`}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                selectedCategory === category.slug
                  ? "bg-charcoal text-ivory dark:bg-ivory dark:text-charcoal"
                  : "border-subtle bg-elevated text-main border hover:border-copper"
              }`}
            >
              {pickText(category.name, locale)}
            </a>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredPosts.map((post) => (
          <PostCard key={post.slug} post={post} locale={locale} />
        ))}
      </section>
    </div>
  );
}
