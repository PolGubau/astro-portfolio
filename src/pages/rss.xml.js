import rss from '@astrojs/rss';
import { metadata } from '../lib/constants';
import { getBlogs, getProjects, parseProjectId } from '../lib/utils';

export async function GET(context) {
  // `getProjects()` already returns the canonical English, published entries.
  // Their ids are "{lang}/{slug}", so the public URL needs the parsed slug.
  const posts = getBlogs();
  const projects = getProjects();

  const projectItems = projects.map((proj) => ({
    title: proj.data.title,
    description: proj.data.summary,
    link: `/projects/${parseProjectId(proj.id).slug}`,
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
