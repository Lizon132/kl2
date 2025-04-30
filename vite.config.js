import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': 'http://localhost:3001',
      '/posts': 'http://localhost:3001',
    },
    fs: {
      strict: false,
    },
  },
  build: {
    outDir: 'dist',
  },
  // ✅ Add this:
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  // ✅ Add this for SPA fallback:
  preview: {
    headers: {
      'Cache-Control': 'no-cache',
    },
    fallback: true,
  }
});
