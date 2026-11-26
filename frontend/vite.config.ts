import solid from '@solidjs/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, lazyPlugins } from 'vite-plus';

export default defineConfig({
  publicDir: 'static',
  fmt: {
    ignorePatterns: ['dist/**', 'node_modules/**'],
    printWidth: 100,
    tabWidth: 2,
    useTabs: false,
    semi: true,
    singleQuote: true,
    trailingComma: 'all',
  },
  lint: {
    ignorePatterns: ['dist/**', 'node_modules/**'],
    jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
    rules: {
      'vite-plus/prefer-vite-plus-imports': 'error',
    },
    options: {
      typeAware: false,
      typeCheck: false,
    },
  },
  plugins: lazyPlugins(() => [solid(), tailwindcss()]),
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
});
