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
export const projects = (await getCollection("projects"))
  .filter((project) => project.data.available === true)
  .sort((a, b) => {
    const aEnded = a.data.endedAt;
    const bEnded = b.data.endedAt;

    // ambos en curso → ordenar por startedAt desc
    if (!aEnded && !bEnded) {
      return b.data.startedAt.valueOf() - a.data.startedAt.valueOf();
    }

    // ambos terminados → ordenar por endedAt desc
    if (aEnded && bEnded) {
      return bEnded.valueOf() - aEnded.valueOf();
    }

    // uno en curso, otro terminado → en curso primero
    return aEnded ? 1 : -1;
  });



export type ProjectMetadata = (typeof projects)[number];

export const getProjects = (
	limit = Number.MAX_SAFE_INTEGER,
): ProjectMetadata[] => {
	const limitedProjects = projects.slice(0, limit);
	return limitedProjects;
};

const WORDS_PER_MINUTE = 200;

export function getReadingTime(content: string): number | undefined {
	if (!content) return;
	const clean = content.replace(/<\/?[^>]+(>|$)/g, "");
	const numberOfWords = clean.split(/\s/g).length;
	return Math.ceil(numberOfWords / WORDS_PER_MINUTE);
}
