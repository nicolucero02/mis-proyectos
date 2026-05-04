import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getCategoryBySlug, type PostMeta } from "@/lib/posts";
import { CoverVisual, getCategoryGlow } from "./cover-visual";

export function PostCard({ post, locale }: { post: PostMeta; locale: Locale }) {
  const category = getCategoryBySlug(post.categorySlug);
  const glowColor = getCategoryGlow(post.categorySlug, post.slug);

  return (
    <article 
      className="group bg-card-surface border-subtle overflow-hidden rounded-[2rem] border shadow-[0_18px_70px_rgba(20,16,13,0.07)] transition hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(20,16,13,0.12)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.26)]"
      style={{ 
        boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 18px 70px rgba(20,16,13,0.07), 0 0 40px -16px ${glowColor}` 
      }}
    >
      <CoverVisual
        categorySlug={post.categorySlug}
        seed={post.slug}
        className="relative h-56 transition duration-700 ease-out group-hover:scale-[1.02]"
      />
      <div className="space-y-4 p-6">
        <div className="text-soft flex items-center justify-between gap-4 text-xs uppercase tracking-[0.2em]">
          <p className="font-medium">{post.date}</p>
          <span className="border-subtle text-soft rounded-full border px-3 py-1 normal-case tracking-normal">
            {post.author}
          </span>
        </div>
        <h3 className="text-main font-[family-name:var(--font-heading)] text-[1.9rem] font-semibold leading-tight tracking-tight">
          <Link href={`/blog/${post.slug}`} className="transition group-hover:text-copper">
            {post.title}
          </Link>
        </h3>
        <p className="text-muted text-base leading-8">{post.excerpt}</p>
        <div className="border-subtle flex items-center justify-between gap-3 border-t pt-4">
          <p className="text-soft text-sm font-medium">
            {locale === "es" ? "Abrir artículo" : "Open article"}
          </p>
          <Link
            href={`/blog/${post.slug}`}
            className="border-subtle text-main inline-flex rounded-full border px-4 py-2 text-sm font-semibold transition hover:bg-charcoal hover:text-ivory dark:hover:bg-ivory dark:hover:text-charcoal"
          >
            {locale === "es" ? "Leer" : "Read"}
          </Link>
        </div>
      </div>
    </article>
  );
}
