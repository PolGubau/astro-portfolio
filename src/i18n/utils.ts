import { ca } from "./ca";
import { type UiKey, en } from "./en";
import { es } from "./es";

export const defaultLocale = "en" as const;
export const locales = ["en", "es", "ca"] as const;
export type Locale = (typeof locales)[number];

const dictionaries: Record<Locale, Record<UiKey, string>> = { en, es, ca };

/** Locale BCP-47 tags used for date/number formatting and SEO. */
export const localeTags: Record<Locale, string> = {
	en: "en-US",
	es: "es-ES",
	ca: "ca-ES",
};

export const ogLocales: Record<Locale, string> = {
	en: "en_US",
	es: "es_ES",
	ca: "ca_ES",
};

/** Narrow Astro.currentLocale to a supported Locale, defaulting to `en`. */
export function getLocale(current: string | undefined): Locale {
	return (locales as readonly string[]).includes(current ?? "")
		? (current as Locale)
		: defaultLocale;
}

/** Returns a typed `t(key)` translator for the given locale, falling back to English. */
export function useTranslations(locale: Locale) {
	const dict = dictionaries[locale] ?? en;
	return function t(key: UiKey): string {
		return dict[key] ?? en[key];
	};
}

/**
 * Prefix a root-relative path with the locale segment when it is not the
 * default locale. `/about` -> `/es/about`, `/` -> `/es`.
 */
export function localizePath(path: string, locale: Locale): string {
	const clean = path.startsWith("/") ? path : `/${path}`;
	if (locale === defaultLocale) return clean;
	if (clean === "/") return `/${locale}`;
	return `/${locale}${clean}`;
}

/**
 * Static paths for every non-default locale. Powers the `[locale]` dynamic
 * routes so adding a language only requires a new entry in `locales` plus its
 * dictionary - no new page files. `[{ params: { locale: "es" } }, ...]`.
 */
export function getLocalePaths() {
	return locales
		.filter((locale) => locale !== defaultLocale)
		.map((locale) => ({ params: { locale } }));
}

/**
 * Strip a leading locale segment from a pathname, returning the locale-agnostic
 * base path. `/es/about` -> `/about`, `/es` -> `/`.
 */
export function stripLocale(pathname: string): string {
	for (const locale of locales) {
		if (locale === defaultLocale) continue;
		if (pathname === `/${locale}`) return "/";
		if (pathname.startsWith(`/${locale}/`)) {
			return pathname.slice(`/${locale}`.length);
		}
	}
	return pathname || "/";
}
