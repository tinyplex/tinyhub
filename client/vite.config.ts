import {ViteMinifyPlugin} from 'vite-plugin-minify';
import {defineConfig} from 'vite';
import {join} from 'path';
import license from 'rollup-plugin-license';
import react from '@vitejs/plugin-react';
import {vanillaExtractPlugin} from '@vanilla-extract/vite-plugin';

export default defineConfig({
  optimizeDeps: {exclude: ['tinywidgets'], include: ['tinywidgets > prismjs']},
  build: {
    outDir: '../docs',
    emptyOutDir: true,
    rollupOptions: {
      input: ['index.html', 'auth.html'],
      output: {
        manualChunks: (id) =>
          id.includes('node_modules/react')
            ? 'react'
            : id.includes('node_modules/tinybase')
              ? 'tinybase'
              : id.includes('node_modules/octokit')
                ? 'octokit'
                : id.includes('node_modules/tinywidgets')
                  ? 'tinywidgets'
                  : null,
      },
    },
  },
  esbuild: {legalComments: 'none'},

  plugins: [
    react(),
    vanillaExtractPlugin(),
    license({
      thirdParty: {output: join(__dirname, '../docs', 'dependencies.txt')},
    }),
    ViteMinifyPlugin({minifyJS: {toplevel: true}}),
  ],
});
