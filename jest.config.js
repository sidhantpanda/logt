module.exports = {
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!**/node_modules/**', '!src/examples.ts', '!src/web.ts'],
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'html'],
};
