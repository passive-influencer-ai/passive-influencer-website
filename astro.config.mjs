// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://passive-influencer-ai.github.io',
  base: '/passive-influencer-website/',
  vite: {
    plugins: [tailwindcss()],
  },
});
