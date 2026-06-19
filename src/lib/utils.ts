import { type CollectionEntry, getCollection } from "astro:content";
import type { Locale } from "../i18n/utils";

export const blogs = (await getCollection("blog"))
	.filter((post) => !post.data.draft)
	.sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());
export type BlogMetadata = (typeof blogs)[number];

export const getBlogs = (limit = Number.MAX_SAFE_INTEGER): BlogMetadata[] =>
	blogs.slice(0, limit);

// ── Projects (official Astro i18n collections pattern) ──────────────────────
// Entry IDs are "{lang}/{slug}" e.g. "en/animated", "es/animated", "ca/animated".
// English entries are the canonical source of truth for sorting / filtering.

const allProjectEntries = await getCollection("projects");

/** Parse "{lang}/{slug}" → { lang, slug } */
export function parseProjectId(id: string): { lang: string; slug: string } {
	const slash = id.indexOf("/");
	return { lang: id.slice(0, slash), slug: id.slice(slash + 1) };
}

// Map: slug → Map<lang, entry>
const bySlug = new Map<string, Map<string, CollectionEntry<"projects">>>();
for (const entry of allProjectEntries) {
	const { lang, slug } = parseProjectId(entry.id);
	if (!bySlug.has(slug)) bySlug.set(slug, new Map());
	bySlug.get(slug)?.set(lang, entry);
}

function sortProjects(
	entries: CollectionEntry<"projects">[],
): CollectionEntry<"projects">[] {
	return entries.sort((a, b) => {
		const aEnded = a.data.endedAt;
		const bEnded = b.data.endedAt;
		if (!aEnded && !bEnded)
			return b.data.startedAt.valueOf() - a.data.startedAt.valueOf();
		if (aEnded && bEnded) return bEnded.valueOf() - aEnded.valueOf();
		return aEnded ? 1 : -1;
	});
}

// English entries sorted and filtered — canonical list
export const projects = sortProjects(
	allProjectEntries.filter(
		(e) => e.id.startsWith("en/") && e.data.available === true,
	),
);

export type ProjectMetadata = (typeof projects)[number];

export const getProjects = (
	limit = Number.MAX_SAFE_INTEGER,
): ProjectMetadata[] => projects.slice(0, limit);

/** Returns localized entry for slug+locale; falls back to English. */
export const getLocalizedProject = (
	slug: string,
	locale: Locale,
): CollectionEntry<"projects"> | undefined => {
	const locales = bySlug.get(slug);
	return locales?.get(locale) ?? locales?.get("en");
};

/** Returns all projects localized for `locale`, English fallback per entry. */
export const getLocalizedProjects = (
	locale: Locale,
	limit = Number.MAX_SAFE_INTEGER,
): CollectionEntry<"projects">[] =>
	projects
		.slice(0, limit)
		.map((en) => getLocalizedProject(parseProjectId(en.id).slug, locale) ?? en);

export function formatDate(
	d: Date,
	style: "short" | "long" = "short",
	locale = "en-US",
): string {
	return d.toLocaleString(locale, {
		month: style,
		day: "numeric",
		year: "numeric",
	});
}

const WORDS_PER_MINUTE = 200;

export function getReadingTime(content: string): number | undefined {
	if (!content) return;
	const clean = content.replace(/<\/?[^>]+(>|$)/g, "");
	const numberOfWords = clean.split(/\s/g).length;
	return Math.ceil(numberOfWords / WORDS_PER_MINUTE);
}
