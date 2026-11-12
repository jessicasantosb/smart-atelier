import tailwindcss from '@tailwindcss/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import adapter from '@sveltejs/adapter-auto';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, lazyPlugins } from 'vite-plus';

// https://vite.dev/config/
export default defineConfig({
  fmt: {
    ignorePatterns: ['.svelte-kit/**', 'dist/**', 'node_modules/**'],
    printWidth: 100,
    tabWidth: 2,
    useTabs: false,
    semi: true,
    singleQuote: true,
    trailingComma: 'all',
    svelte: true,
  },
  lint: {
    ignorePatterns: ['.svelte-kit/**', 'dist/**', 'node_modules/**'],
    jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
    rules: {
      'vite-plus/prefer-vite-plus-imports': 'error',
    },
    options: {
      typeAware: false,
      typeCheck: false,
    },
  },
  plugins: lazyPlugins(() => [tailwindcss(), sveltekit({ adapter: adapter() }), svelteTesting()]),
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
});
