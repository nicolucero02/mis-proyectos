import fs from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx-components";
import type { Locale } from "@/lib/i18n";
import { categoryMetaBySlug, type Category } from "@/lib/site-data";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export type PostFrontmatter = {
  title: string;
  description?: string;
  date: string;
  excerpt: string;
  category: string;
  categorySlug?: string;
  author: string;
  cover: string;
  image: string;
  locale?: "es" | "en";
  featured?: boolean;
};

export type PostMeta = Omit<PostFrontmatter, "categorySlug" | "locale"> & {
  categorySlug: string;
  locale: "es" | "en";
  slug: string;
  readingMinutes: number;
};

export type TocHeading = {
  id: string;
  text: string;
  level: number;
};

function slugifyHeading(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function slugifyCategory(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function titleizeSlug(input: string) {
  return input
    .split("-")
    .filter(Boolean)
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(" ");
}

function resolveCategoryDefinition(slug: string, name?: string): Category {
  const preset = categoryMetaBySlug[slug];

  if (preset) {
    return preset;
  }

  const fallbackName = name?.trim() || titleizeSlug(slug);

  return {
    slug,
    name: { es: fallbackName, en: fallbackName },
    eyebrow: { es: "Archivo editorial", en: "Editorial archive" },
    description: {
      es: `Una selección de notas de ComicVerse sobre ${fallbackName.toLowerCase()}.`,
      en: `A curated set of ComicVerse pieces focused on ${fallbackName.toLowerCase()}.`
    }
  };
}

function extractHeadings(content: string): TocHeading[] {
  return content
    .split("\n")
    .filter((line) => line.startsWith("##"))
    .map((line) => {
      const level = line.match(/^#+/)?.[0].length ?? 2;
      const text = line.replace(/^#+\s*/, "").trim();
      return {
        id: slugifyHeading(text),
        text,
        level
      };
    })
    .filter((heading) => heading.level <= 3);
}

function calculateReadingMinutes(content: string) {
  const words = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 150));
}

async function readPostFile(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  return fs.readFile(fullPath, "utf8");
}

function getLocalePostsDirectory(locale: Locale) {
  return path.join(postsDirectory, locale);
}

async function readLocalePostFile(slug: string, locale: Locale) {
  const fullPath = path.join(getLocalePostsDirectory(locale), `${slug}.mdx`);
  return fs.readFile(fullPath, "utf8");
}

async function readMetaFromFile(filename: string, locale: Locale): Promise<PostMeta> {
  const slug = filename.replace(/\.mdx$/, "");
  const source = await readLocalePostFile(slug, locale);
  const { data, content } = matter(source);

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    excerpt: data.excerpt,
    category: data.category,
    categorySlug: data.categorySlug ?? slugifyCategory(data.category),
    author: data.author,
    cover: data.cover,
    image: data.image,
    locale: data.locale ?? locale,
    featured: data.featured ?? false,
    readingMinutes: calculateReadingMinutes(content)
  } as PostMeta;
}

export async function getAllPosts(locale: Locale): Promise<PostMeta[]> {
  const filenames = await fs.readdir(getLocalePostsDirectory(locale));
  const posts = await Promise.all(
    filenames
      .filter((filename) => filename.endsWith(".mdx"))
      .map((filename) => readMetaFromFile(filename, locale))
  );

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getFeaturedPosts(locale: Locale) {
  const posts = await getAllPosts(locale);
  const featured = posts.filter((post) => post.featured);
  return featured.length > 0 ? featured : posts.slice(0, 3);
}

export async function getPostsByCategory(categorySlug: string, locale: Locale) {
  const posts = await getAllPosts(locale);
  return posts.filter((post) => post.categorySlug === categorySlug);
}

export async function getCategoriesWithCounts(locale: Locale) {
  const posts = await getAllPosts(locale);
  const categoryMap = new Map<
    string,
    Category & {
      count: number;
    }
  >();

  for (const post of posts) {
    const current = categoryMap.get(post.categorySlug);

    if (current) {
      current.count += 1;
      continue;
    }

    categoryMap.set(post.categorySlug, {
      ...resolveCategoryDefinition(post.categorySlug, post.category),
      count: 1
    });
  }

  return Array.from(categoryMap.values()).sort((a, b) => b.count - a.count);
}

export function getCategoryBySlug(slug: string) {
  return resolveCategoryDefinition(slug);
}

export async function getPostBySlug(slug: string, locale: Locale) {
  let source: string;

  try {
    source = await readLocalePostFile(slug, locale);
  } catch {
    notFound();
  }

  const { data, content } = matter(source);
  const headings = extractHeadings(content);
  const { content: compiledContent } = await compileMDX<PostFrontmatter>({
    source: content,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm]
      }
    }
  });

  return {
    slug,
    frontmatter: {
      ...(data as PostFrontmatter),
      description: data.description,
      categorySlug: data.categorySlug ?? slugifyCategory(data.category),
      locale: data.locale ?? locale
    },
    readingMinutes: calculateReadingMinutes(content),
    headings,
    content: compiledContent
  };
}

export async function getRelatedPosts(
  slug: string,
  categorySlug: string,
  locale: Locale,
  limit = 3
) {
  const posts = await getAllPosts(locale);
  const sameCategory = posts.filter(
    (post) => post.slug !== slug && post.categorySlug === categorySlug
  );
  const fallback = posts.filter((post) => post.slug !== slug && post.categorySlug !== categorySlug);
  return [...sameCategory, ...fallback].slice(0, limit);
}

export async function getAdjacentPosts(slug: string, locale: Locale) {
  const posts = await getAllPosts(locale);
  const index = posts.findIndex((post) => post.slug === slug);

  return {
    previous: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null
  };
}

export async function getAllPostSlugs() {
  const locales: Locale[] = ["es", "en"];
  const slugSet = new Set<string>();

  for (const locale of locales) {
    const filenames = await fs.readdir(getLocalePostsDirectory(locale));
    for (const filename of filenames) {
      if (filename.endsWith(".mdx")) {
        slugSet.add(filename.replace(/\.mdx$/, ""));
      }
    }
  }

  return Array.from(slugSet).sort();
}

export function formatReadingTime(minutes: number, locale: "es" | "en") {
  return locale === "es" ? `${minutes} min de lectura` : `${minutes} min read`;
}
