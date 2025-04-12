import { getCollection } from "astro:content";

export const posts = (await getCollection("blog")).sort(
	(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
);

export const projects = (await getCollection("projects")).sort(
	(a, b) =>
		(b.data.endedAt ?? new Date()).valueOf() -
		(a.data.endedAt ?? new Date()).valueOf(),
);
export type ProjectMetadata = typeof projects[number]

export const getProjects = (
	limit = Number.MAX_SAFE_INTEGER,
): ProjectMetadata[] => {
	const limitedProjects = projects.slice(0, limit);

	return limitedProjects;
};
