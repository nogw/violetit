import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import relay from 'vite-plugin-relay';
import path from 'path';

export default defineConfig({
  plugins: [react(), relay],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
