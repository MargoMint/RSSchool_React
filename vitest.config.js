import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: 'src/setupTests.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
    include: ['src/tests/*.test.ts', 'src/tests/*.test.tsx'],
  },
});
