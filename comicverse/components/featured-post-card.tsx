import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getCategoryBySlug, type PostMeta } from "@/lib/posts";
import { CoverVisual, getCategoryGlow } from "./cover-visual";

export function FeaturedPostCard({
  post,
  large = false,
  locale
}: {
  post: PostMeta;
  large?: boolean;
  locale: Locale;
}) {
  const category = getCategoryBySlug(post.categorySlug);
  const glowColor = getCategoryGlow(post.categorySlug, post.slug);

  return (
    <article
      className={`group bg-card-surface border-subtle overflow-hidden rounded-[2.15rem] border transition hover:-translate-y-1 hover:shadow-[0_34px_110px_rgba(20,16,13,0.12)] ${
        large ? "lg:grid lg:grid-cols-[0.9fr_1.1fr]" : ""
      }`}
      style={{ 
        boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 28px 90px rgba(20,16,13,0.08), 0 0 40px -16px ${glowColor}` 
      }}
    >
      <CoverVisual
        categorySlug={post.categorySlug}
        seed={post.slug}
        className={`relative min-h-[200px] transition duration-700 ease-out group-hover:scale-[1.02] ${
          large ? "lg:min-h-full" : ""
        }`}
      />
      <div className="relative p-6 sm:p-8">
        <p className="text-soft text-sm font-medium uppercase tracking-[0.22em]">
          {post.date}
        </p>
        <h3
          className={`text-main mt-4 font-[family-name:var(--font-heading)] font-semibold tracking-tight ${
            large ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl"
          }`}
        >
          <Link href={`/blog/${post.slug}`} className="transition group-hover:text-copper">
            {post.title}
          </Link>
        </h3>
        <p className="text-muted mt-4 max-w-2xl text-base leading-8">{post.excerpt}</p>
        <div className="border-subtle mt-6 flex items-center justify-between gap-4 border-t pt-5">
          <p className="text-soft text-sm font-medium">
            {locale === "es" ? "Por" : "By"} {post.author}
          </p>
          <Link
            href={`/blog/${post.slug}`}
            className="border-subtle text-main inline-flex rounded-full border px-4 py-2 text-sm font-semibold transition hover:bg-charcoal hover:text-ivory dark:hover:bg-ivory dark:hover:text-charcoal"
          >
            {locale === "es" ? "Leer reportaje" : "Read feature"}
          </Link>
        </div>
      </div>
    </article>
  );
}
