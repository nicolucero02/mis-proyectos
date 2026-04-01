import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { pickText } from "@/lib/i18n";
import { formatReadingTime, getCategoryBySlug, type PostMeta } from "@/lib/posts";

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

export function PostCard({ post, locale }: { post: PostMeta; locale: Locale }) {
  const category = getCategoryBySlug(post.categorySlug);
  const hasImage = Boolean(post.image);

  return (
    <article className="group bg-card-surface border-subtle overflow-hidden rounded-[2rem] border shadow-[0_18px_70px_rgba(20,16,13,0.07)] transition hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(20,16,13,0.12)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.26)]">
      <div className={`relative h-56 overflow-hidden bg-gradient-to-br ${coverClass(post.cover)}`}>
        {hasImage ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover brightness-[0.92] transition duration-700 ease-out group-hover:scale-[1.045] group-hover:brightness-[1.02]"
            sizes="(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw"
          />
        ) : null}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,8,7,0.08),rgba(10,8,7,0.5)),radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_28%)] transition duration-500 group-hover:bg-[linear-gradient(180deg,rgba(10,8,7,0.02),rgba(10,8,7,0.58)),radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_28%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <span className="media-badge absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] backdrop-blur-sm">
          {category ? pickText(category.name, locale) : post.category}
        </span>
        <div className="absolute inset-x-5 bottom-5">
          <p className="media-meta text-[11px] font-medium tracking-[0.02em]">
            {post.author} · {formatReadingTime(post.readingMinutes, locale)}
          </p>
        </div>
      </div>
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
