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

  return (
    <article
      className={`group bg-card-surface border-subtle overflow-hidden rounded-[2.15rem] border shadow-[0_28px_90px_rgba(20,16,13,0.08)] transition hover:-translate-y-1 hover:shadow-[0_34px_110px_rgba(20,16,13,0.12)] ${
        large ? "lg:grid lg:grid-cols-[0.9fr_1.1fr]" : ""
      }`}
    >
      <div
        className={`relative min-h-[240px] overflow-hidden bg-gradient-to-br ${coverClass(post.cover)} ${
          large ? "lg:min-h-full" : ""
        }`}
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
          sizes={large ? "(min-width: 1024px) 45vw, 100vw" : "(min-width: 1024px) 25vw, 100vw"}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,8,7,0.1),rgba(9,8,7,0.52)),radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_30%)] transition duration-500 group-hover:bg-[linear-gradient(180deg,rgba(9,8,7,0.04),rgba(9,8,7,0.6)),radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_30%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        <div className="media-badge absolute left-5 top-5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] backdrop-blur-sm">
          {category ? pickText(category.name, locale) : post.category}
        </div>
        <div className="absolute inset-x-5 bottom-5">
          <p className="media-meta text-[11px] font-medium tracking-[0.02em]">
            {post.author} · {formatReadingTime(post.readingMinutes, locale)}
          </p>
        </div>
      </div>
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
