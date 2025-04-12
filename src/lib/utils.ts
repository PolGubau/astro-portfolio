import { getCollection } from "astro:content";

export const blogs = (await getCollection("blog")).sort(
	(a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf(),
);
export type BlogMetadata = (typeof blogs)[number];

export const getBlogs = (limit = Number.MAX_SAFE_INTEGER): BlogMetadata[] => {
	const limitedBlogs = blogs.slice(0, limit);

	return limitedBlogs;
};




// ----
export const projects = (await getCollection("projects")).sort(
	(a, b) =>
		(b.data.endedAt ?? new Date()).valueOf() -
		(a.data.endedAt ?? new Date()).valueOf(),
);
export type ProjectMetadata = (typeof projects)[number];

export const getProjects = (
	limit = Number.MAX_SAFE_INTEGER,
): ProjectMetadata[] => {
	const limitedProjects = projects.slice(0, limit);

	return limitedProjects;
};
