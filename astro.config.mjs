// @ts-check
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import metaTags from 'astro-meta-tags';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://polgubau.com',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  experimental: {
    headingIdCompat: true,
    contentIntellisense: true,
    clientPrerender: true,

  },
  integrations: [
    mdx(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      customPages: [
        'https://polgubau.com/projects',
        'https://polgubau.com/blog',
        'https://polgubau.com/ui',
      ],
      serialize(item) {
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