import {ViteMinifyPlugin} from 'vite-plugin-minify';
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    outDir: '../docs',
    emptyOutDir: true,
    rollupOptions: {
      input: ['index.html', 'auth.html'],
    },
  },
  plugins: [react(), ViteMinifyPlugin({minifyJS: {toplevel: true}})],
});
