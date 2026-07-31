import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      'server-only': path.resolve(__dirname, './src/__mocks__/empty.ts'),
    },
  },
  plugins: [
    tsconfigPaths(),
    svgr({
      svgrOptions: { icon: true, typescript: false },
      include: '**/*.svg',
    }),
    react(),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
  },
});
