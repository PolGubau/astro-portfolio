import { type InferEntrySchema, defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
	loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		draft: z.boolean().optional().default(false),
		available: z.boolean().optional(),
		title: z.string(),
		summary: z.string(),
		publishedAt: z.string().transform((str) => new Date(str)),
		tags: z.array(z.string()).optional(),
	}),
});

// Single collection for all locales. Entry IDs are "{lang}/{slug}",
// e.g. "en/animated", "es/animated", "ca/animated".
const projects = defineCollection({
	loader: glob({
		base: "./src/content/projects",
		pattern: "**/{en,es,ca}/*.{md,mdx}",
	}),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			seoTitle: z.string().optional(),
			summary: z.string(),
			available: z.boolean(),
			client: z.string().optional(),
			startedAt: z.string().transform((str) => new Date(str)),
			endedAt: z
				.string()
				.transform((str) => new Date(str))
				.optional(),
			color: z.string(),
			link: z.string().optional(),
			githubLink: z.string().optional(),
			playStoreLink: z.string().optional(),
			npmLink: z.string().optional(),
			cover: image(),
			category: z.string(),
			tech: z.array(z.string()).optional(),
		}),
});

export type Project = InferEntrySchema<"projects">;
export type Blog = InferEntrySchema<"blog">;

export const collections = { blog, projects };
