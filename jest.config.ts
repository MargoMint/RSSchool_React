import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: './tsconfig.test.json' }],
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'src/main.tsx',
    'src/constants/api.ts',
  ],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 50,
      functions: 50,
      lines: 50,
    },
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.ts',
  },
};

export default config;
