import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { metadata } from '../lib/constants';
 
export async function GET(context) {
	const posts = await getCollection('blog');
	const project = await getCollection('projects');

	const projectsItems = project.map((proj) => ({
		...proj.data,
		link: `/project/${proj.id}/`,
	}));
	const postsItems = posts.map((post) => ({
		...post.data,
		link: `/blog/${post.id}/`,
	}));
	const allItems = [...postsItems, ...projectsItems];

	return rss({
		title: metadata.title,
		description: metadata.description,
		site: context.site,
		items: allItems
	});
}
