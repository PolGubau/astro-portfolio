// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
 
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
  integrations: [mdx(), sitemap(), metaTags()], 
  vite: {
    plugins: [tailwindcss()],
  },
});