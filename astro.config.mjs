// @ts-check
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import metaTags from 'astro-meta-tags';
import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

// `lastmod` must reflect the content's own dates, not the file's mtime: CI/CD
// checkouts (Vercel, GitHub Actions) reset every file's mtime to checkout
// time, which would make every page appear "updated today". We read the real
// dates straight out of each MDX frontmatter block instead.
const FRONTMATTER_DATE_KEYS = ['updatedAt', 'endedAt', 'startedAt', 'publishedAt'];

function readFrontmatterLastmod(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return undefined;
  const frontmatter = match[1];
  for (const key of FRONTMATTER_DATE_KEYS) {
    const keyMatch = frontmatter.match(new RegExp(`^${key}:\\s*["']?([^"'\\n]+)["']?\\s*$`, 'm'));
    if (keyMatch) return keyMatch[1].trim();
  }
  return undefined;
}

// Blog posts are unlocalized ("/blog/{slug}"); slugs are the lowercased
// filename, matching the glob loader's default slugification.
const blogDir = path.join(rootDir, 'src/content/blog');
const blogLastmod = new Map(
  fs
    .readdirSync(blogDir)
    .filter((f) => /\.(md|mdx)$/.test(f))
    .map((f) => [
      path.basename(f, path.extname(f)).toLowerCase(),
      readFrontmatterLastmod(path.join(blogDir, f)),
    ]),
);

// Projects live under src/content/projects/{lang}/{slug}.mdx and are served
// at "/projects/{slug}" (en) and "/{lang}/projects/{slug}" (es, ca).
const projectsDir = path.join(rootDir, 'src/content/projects');
const projectLastmod = new Map();
for (const lang of ['en', 'es', 'ca']) {
  const langDir = path.join(projectsDir, lang);
  if (!fs.existsSync(langDir)) continue;
  for (const f of fs.readdirSync(langDir)) {
    if (!/\.(md|mdx)$/.test(f)) continue;
    const slug = path.basename(f, path.extname(f)).toLowerCase();
    projectLastmod.set(`${lang}/${slug}`, readFrontmatterLastmod(path.join(langDir, f)));
  }
}

function getLastmodForUrl(url) {
  const { pathname } = new URL(url);
  const blogMatch = pathname.match(/^\/blog\/([^/]+)\/?$/);
  if (blogMatch) return blogLastmod.get(blogMatch[1].toLowerCase());

  const projectMatch = pathname.match(/^(?:\/(es|ca))?\/projects\/([^/]+)\/?$/);
  if (projectMatch) {
    const lang = projectMatch[1] ?? 'en';
    return projectLastmod.get(`${lang}/${projectMatch[2].toLowerCase()}`);
  }
  return undefined;
}

// https://astro.build/config
export default defineConfig({
  site: 'https://polgubau.com',
  trailingSlash: 'never',
  i18n: {
    locales: ['en', 'es', 'ca'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
    },
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  experimental: {
    headingIdCompat: true,
    contentIntellisense: true,
    clientPrerender: true,

  },
  integrations: [
    icon(),
    mdx(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      // Error pages are noindex; they must never be advertised in the sitemap.
      filter: (page) => !/\/404\/?$/.test(page),
      customPages: [
        'https://polgubau.com/projects',
        'https://polgubau.com/blog',
        'https://polgubau.com/ui',
      ],
      serialize(item) {
        const lastmod = getLastmodForUrl(item.url);
        if (lastmod) item.lastmod = lastmod;

        // Homepage - Maximum priority
        if (item.url === 'https://polgubau.com/') {
          item.priority = 1.0;
          item.changefreq = 'daily';
        }
        // Blog posts - High priority, updated frequently
        else if (item.url.includes('/blog/')) {
          item.priority = 0.8;
          item.changefreq = 'weekly';
        }
        // Projects - High priority
        else if (item.url.includes('/projects/')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        }
        // Experiments page - High priority for showcasing skills
        else if (item.url === 'https://polgubau.com/ui') {
          item.priority = 0.85;
          item.changefreq = 'monthly';
        }
        // Index pages
        else if (item.url.endsWith('/blog') || item.url.endsWith('/projects') || item.url.endsWith('/ui')) {
          item.priority = 0.9;
          item.changefreq = 'weekly';
        }
        return item;
      }
    }),
    metaTags(),
    react()
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
