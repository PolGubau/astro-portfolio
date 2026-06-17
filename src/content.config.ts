import { type InferEntrySchema, defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
	// Type-check frontmatter using a schema
	schema: z.object({
		draft: z.boolean().optional().default(false),
		available: z.boolean().optional(),
		title: z.string(),
		summary: z.string(),
		publishedAt: z.string().transform((str) => new Date(str)),
		tags: z.array(z.string()).optional(),
	}),
});

const projects = defineCollection({
	loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
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
