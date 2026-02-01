// @ts-check
import { defineConfig } from 'astro/config';
import astroMermaid from 'astro-mermaid';

// https://astro.build/config
export default defineConfig({
  site: "https://blog.aniketh.dev",
  integrations: [astroMermaid()],
  markdown: {
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://shiki.style/themes
      theme: 'tokyo-night',
      // Add custom transformers: https://shiki.style/guide/transformers
      // Find common transformers: https://shiki.style/packages/transformers
      transformers: [],
    }
  }
});
