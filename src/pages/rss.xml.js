import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { metadata } from '../lib/constants';

export async function GET(context) {
	const posts = (await getCollection('blog')).filter((p) => !p.data.draft);
	const projects = await getCollection('projects');

	const projectItems = projects.map((proj) => ({
		title: proj.data.title,
		description: proj.data.summary,
		link: `/projects/${proj.id}`,
		pubDate: proj.data.startedAt,
		categories: proj.data.tech ?? [],
	}));

	const postItems = posts.map((post) => ({
		title: post.data.title,
		description: post.data.summary,
		link: `/blog/${post.id}`,
		pubDate: post.data.publishedAt,
		categories: post.data.tags ?? [],
	}));

	const allItems = [...postItems, ...projectItems].sort(
		(a, b) => b.pubDate.valueOf() - a.pubDate.valueOf()
	);

	return rss({
		title: metadata.title,
		description: metadata.description,
		site: context.site,
		items: allItems,
		customData: `<language>en-us</language>`,
	});
}
