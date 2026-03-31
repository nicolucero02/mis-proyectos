import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ThemeScript } from "@/components/theme-script";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";

export const metadata: Metadata = {
  metadataBase: new URL("https://comicverse.local"),
  title: {
    default: "ComicVerse",
    template: "%s | ComicVerse"
  },
  description:
    "ComicVerse is a premium editorial platform about comics, visual storytelling, reading guides, and curated rankings.",
  openGraph: {
    title: "ComicVerse",
    description:
      "A serious editorial platform about comics, reading guides, and visual storytelling.",
    type: "website"
  }
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="font-[family-name:var(--font-body)] antialiased transition-colors duration-300">
        <ThemeScript />
        <div className="container-shell flex min-h-screen flex-col pb-12 pt-4">
          <SiteHeader locale={locale} labels={dict.nav} />
          <main className="flex-1">{children}</main>
          <SiteFooter locale={locale} labels={dict.footer} />
        </div>
      </body>
    </html>
  );
}
