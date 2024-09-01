import {ViteMinifyPlugin} from 'vite-plugin-minify';
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {vanillaExtractPlugin} from '@vanilla-extract/vite-plugin';

export default defineConfig({
  build: {
    outDir: '../docs',
    emptyOutDir: true,
    rollupOptions: {
      input: ['index.html', 'auth.html'],
    },
  },
  plugins: [
    react({jsxRuntime: 'classic'}),
    vanillaExtractPlugin(),
    ViteMinifyPlugin({minifyJS: {toplevel: true}}),
  ],
});
