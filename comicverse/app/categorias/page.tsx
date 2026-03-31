import type { Metadata } from "next";
import { CategoryCard } from "@/components/category-card";
import { SectionHeader } from "@/components/section-header";
import { getDictionary, pickText } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { getCategoriesWithCounts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Categorias",
  description: "Todas las categorias editoriales de ComicVerse."
};

export default async function CategoriesPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const categories = await getCategoriesWithCounts(locale);

  return (
    <div className="space-y-8">
      <section className="surface px-6 py-8 dark:border-white/10 sm:px-8 sm:py-10">
        <SectionHeader
          eyebrow={dict.categories.eyebrow}
          title={dict.categories.title}
          description={dict.categories.description}
        />
      </section>
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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
      </section>
    </div>
  );
}
