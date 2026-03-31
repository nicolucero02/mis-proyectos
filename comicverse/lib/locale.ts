import { cookies } from "next/headers";
import { LOCALE_COOKIE, type Locale } from "@/lib/i18n";

export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  const locale = store.get(LOCALE_COOKIE)?.value;
  return locale === "en" ? "en" : "es";
}
