import { glob } from "astro/loaders";
import { defineCollection, z, type InferEntrySchema } from "astro:content";

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		publishedAt: z.string().transform((str) => new Date(str)),
		cover: z.string(),
		tags: z.array(z.string()).optional(),
	}),
});

const projects = defineCollection({
	loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		startedAt: z.string().transform((str) => new Date(str)),
		endedAt: z
			.string()
			.transform((str) => new Date(str))
			.optional(),
		color: z.string(),
		link: z.string().optional(),
		githubLink: z.string().optional(),
		npmCommand: z.string().optional(),
		npmLink: z.string().optional(),
		cover: z.string(),
		category: z.string(),
		tech: z.array(z.string()).optional(),
	}),
});

export type Project = InferEntrySchema<"projects">;
export type Blog = InferEntrySchema<"blog">;

export const collections = { blog, projects };
