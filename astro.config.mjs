// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import metaTags from 'astro-meta-tags';

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
      ],
      serialize(item) {
        // Prioritize home and main sections
        if (item.url === 'https://polgubau.com/') {
          item.priority = 1.0;
        }
        // Projects and blog posts get high priority
        if (item.url.includes('/projects/') || item.url.includes('/blog/')) {
          item.priority = 0.8;
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