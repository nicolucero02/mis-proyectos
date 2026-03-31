import type { Metadata } from "next";
import Link from "next/link";
import { PostCard } from "@/components/post-card";
import {
  formatReadingTime,
  getAdjacentPosts,
  getAllPostSlugs,
  getCategoryBySlug,
  getPostBySlug,
  getRelatedPosts
} from "@/lib/posts";
import { getDictionary, pickText } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";

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
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await getLocale();
  const post = await getPostBySlug(params.slug, locale);

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const post = await getPostBySlug(params.slug, locale);
  const relatedPosts = await getRelatedPosts(params.slug, post.frontmatter.categorySlug, locale);
  const adjacent = await getAdjacentPosts(params.slug, locale);
  const category = getCategoryBySlug(post.frontmatter.categorySlug);

  return (
    <div className="space-y-10">
      <article className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-8">
          <header className="surface overflow-hidden dark:border-white/10">
            <div className={`bg-gradient-to-br ${coverClass(post.frontmatter.cover)}`}>
              <div className="flex min-h-[23rem] flex-col justify-end bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_28%),linear-gradient(180deg,transparent,rgba(0,0,0,0.22))] px-6 py-8 sm:min-h-[26rem] sm:px-8 sm:py-10">
                <div>
                  <span className="media-badge mb-6 inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em]">
                    {category ? pickText(category.name, locale) : post.frontmatter.category}
                  </span>
                  <p className="media-meta-soft mb-6 text-[11px] font-medium uppercase tracking-[0.16em]">
                    {dict.common.breadcrumbsHome} / {dict.common.breadcrumbsBlog}
                  </p>
                  <p className="media-meta text-sm font-medium uppercase tracking-[0.2em]">
                    {post.frontmatter.date} · {formatReadingTime(post.readingMinutes, locale)}
                  </p>
                  <h1 className="media-meta mt-4 max-w-[20ch] font-[family-name:var(--font-heading)] text-4xl font-semibold leading-[0.94] tracking-tight sm:mt-5 sm:text-6xl">
                    {post.frontmatter.title}
                  </h1>
                </div>
              </div>
            </div>
            <div className="px-6 py-8 sm:px-8">
              <div className="text-soft flex flex-wrap gap-4 text-sm">
                <span>{dict.common.authorBy} {post.frontmatter.author}</span>
                <span>
                  {dict.common.category}: {category ? pickText(category.name, locale) : post.frontmatter.category}
                </span>
              </div>
              <p className="text-muted mt-4 max-w-3xl text-lg leading-8">
                {post.frontmatter.excerpt}
              </p>
            </div>
          </header>

          <div className="surface px-6 py-8 dark:border-white/10 sm:px-10">
            <div className="prose prose-lg max-w-none prose-headings:font-[family-name:var(--font-heading)] prose-a:text-copper prose-code:before:content-none prose-code:after:content-none">
              {post.content}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="surface p-6 dark:border-white/10">
            <p className="text-label text-xs font-semibold uppercase tracking-[0.32em]">
              {dict.common.inThisArticle}
            </p>
            <div className="mt-5 grid gap-3">
              {post.headings.length > 0 ? (
                post.headings.map((heading) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    className={`text-muted text-sm leading-6 transition hover:text-copper ${
                      heading.level === 3 ? "pl-4" : ""
                    }`}
                  >
                    {heading.text}
                  </a>
                ))
              ) : (
                <p className="text-soft text-sm leading-6">{dict.common.noIndex}</p>
              )}
            </div>
          </div>

          <div className="surface p-6 dark:border-white/10">
            <p className="text-label text-xs font-semibold uppercase tracking-[0.32em]">
              {dict.common.navigation}
            </p>
            <div className="mt-5 grid gap-4">
              {adjacent.previous ? (
                <Link href={`/blog/${adjacent.previous.slug}`} className="bg-elevated border-subtle rounded-2xl border px-4 py-4 transition hover:border-copper">
                  <span className="text-label block text-xs uppercase tracking-[0.2em]">
                    {dict.common.previousArticle}
                  </span>
                  <span className="text-main mt-2 block font-[family-name:var(--font-heading)] text-2xl font-semibold tracking-tight">
                    {adjacent.previous.title}
                  </span>
                </Link>
              ) : null}
              {adjacent.next ? (
                <Link href={`/blog/${adjacent.next.slug}`} className="bg-elevated border-subtle rounded-2xl border px-4 py-4 transition hover:border-copper">
                  <span className="text-label block text-xs uppercase tracking-[0.2em]">
                    {dict.common.nextArticle}
                  </span>
                  <span className="text-main mt-2 block font-[family-name:var(--font-heading)] text-2xl font-semibold tracking-tight">
                    {adjacent.next.title}
                  </span>
                </Link>
              ) : null}
            </div>
          </div>
        </aside>
      </article>

      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-label text-xs font-semibold uppercase tracking-[0.35em]">
              {dict.common.related}
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-semibold tracking-tight text-charcoal dark:text-ivory">
              {dict.common.continueReading}
            </h2>
          </div>
          <Link href="/blog" className="text-sm font-semibold text-copper underline underline-offset-4">
            {dict.common.backToArchive}
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {relatedPosts.map((relatedPost) => (
            <PostCard key={relatedPost.slug} post={relatedPost} locale={locale} />
          ))}
        </div>
      </section>
    </div>
  );
}
