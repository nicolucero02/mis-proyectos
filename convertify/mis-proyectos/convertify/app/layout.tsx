import type { Metadata } from "next";
import "@/app/globals.css";
import { LanguageProvider } from "@/components/convertify/language-provider";

export const metadata: Metadata = {
  title: "Convertify",
  description:
    "Convertify analyzes landing pages and product ideas with sharp UX, conversion, and design feedback."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
