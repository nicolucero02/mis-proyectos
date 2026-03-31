import Link from "next/link";
import { HeroSection } from "@/components/hero-section";
import { FeaturedPostCard } from "@/components/featured-post-card";
import { PostCard } from "@/components/post-card";
import { CategoryCard } from "@/components/category-card";
import { SectionHeader } from "@/components/section-header";
import { NewsletterCTA } from "@/components/newsletter-cta";
import { GuideCard } from "@/components/guide-card";
import { RankingCard } from "@/components/ranking-card";
import { getDictionary, pickText } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { getAllPosts, getCategoriesWithCounts, getFeaturedPosts } from "@/lib/posts";
import { guides, rankings } from "@/lib/site-data";

export default async function HomePage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const posts = await getAllPosts(locale);
  const featuredPosts = await getFeaturedPosts(locale);
  const categories = await getCategoriesWithCounts(locale);

  return (
    <div className="space-y-24 pb-6">
      <HeroSection
        featuredPost={featuredPosts[0]}
        locale={locale}
        stats={{
          archiveValue: String(posts.length),
          sectionsValue: String(categories.length),
          formatValue: "MDX"
        }}
        labels={{
          eyebrow: dict.home.heroEyebrow,
          subtitle: dict.home.heroSubtitle,
          primary: dict.home.heroPrimary,
          secondary: dict.home.heroSecondary,
          statsArchive: dict.home.heroStatsArchive,
          statsArchiveText: dict.home.heroStatsArchiveText,
          statsSections: dict.home.heroStatsSections,
          statsSectionsText: dict.home.heroStatsSectionsText,
          statsFormat: dict.home.heroStatsFormat,
          statsFormatText: dict.home.heroStatsFormatText,
          spotlight: dict.home.spotlight,
          spotlightTitle: dict.home.spotlightTitle
        }}
      />

      <section className="space-y-10">
        <SectionHeader
          eyebrow={dict.home.featuredEyebrow}
          title={dict.home.featuredTitle}
          description={dict.home.featuredDescription}
        />
        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <FeaturedPostCard post={featuredPosts[0]} large locale={locale} />
          <div className="grid gap-6">
            {featuredPosts.slice(1, 3).map((post) => (
              <FeaturedPostCard key={post.slug} post={post} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-10">
        <SectionHeader
          eyebrow={dict.home.categoriesEyebrow}
          title={dict.home.categoriesTitle}
          description={dict.home.categoriesDescription}
          href="/categorias"
          linkLabel={locale === "es" ? "Ver todas" : "View all"}
        />
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.slug}
              slug={category.slug}
              name={pickText(category.name, locale)}
              eyebrow={pickText(category.eyebrow, locale)}
              description={pickText(category.description, locale)}
              count={category.count}
              locale={locale}
            />
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="surface p-6 sm:p-8">
          <SectionHeader
            eyebrow={dict.home.rankingsEyebrow}
            title={dict.home.rankingsTitle}
            description={dict.home.rankingsDescription}
            href="/rankings"
            linkLabel={dict.home.rankingsLink}
          />
          <div className="mt-8">
            <RankingCard ranking={rankings[0]} locale={locale} />
          </div>
        </div>
        <div className="surface p-6 sm:p-8">
          <SectionHeader
            eyebrow={dict.home.guidesEyebrow}
            title={dict.home.guidesTitle}
            description={dict.home.guidesDescription}
            href="/guias"
            linkLabel={dict.home.guidesLink}
          />
          <div className="mt-8">
            <GuideCard guide={guides[0]} locale={locale} />
          </div>
        </div>
      </section>

      <section className="space-y-10">
        <SectionHeader
          eyebrow={dict.home.latestEyebrow}
          title={dict.home.latestTitle}
          description={dict.home.latestDescription}
          href="/blog"
          linkLabel={dict.home.latestLink}
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} locale={locale} />
          ))}
        </div>
      </section>

      <NewsletterCTA
        labels={{
          eyebrow: dict.home.newsletterEyebrow,
          title: dict.home.newsletterTitle,
          description: dict.home.newsletterDescription,
          placeholder: dict.home.newsletterPlaceholder,
          button: dict.home.newsletterButton
        }}
      />

      <section className="surface grid gap-10 p-6 dark:border-white/10 sm:p-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-label text-xs font-semibold uppercase tracking-[0.35em]">
            {dict.home.closingEyebrow}
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-heading)] text-4xl font-semibold tracking-tight text-charcoal dark:text-ivory sm:text-5xl">
            {dict.home.closingTitle}
          </h2>
        </div>
        <div className="text-muted grid gap-5 text-lg leading-8">
          <p>{dict.home.closingBodyOne}</p>
          <p>{dict.home.closingBodyTwo}</p>
          <Link href="/about" className="inline-flex text-sm font-semibold text-copper underline underline-offset-4">
            {dict.home.closingLink}
          </Link>
        </div>
      </section>
    </div>
  );
}
