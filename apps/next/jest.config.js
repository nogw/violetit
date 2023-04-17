const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);

// module.exports = {
//   testEnvironment: 'jsdom',
//   testRegex: '(/__tests__/.*|(\\.|/)(test))\\.(j|t)sx?$',
//   testPathIgnorePatterns: ['/node_modules/', './dist', '__generated__'],
//   setupFilesAfterEnv: ['<rootDir>/test/jest.setup.js'],
//   moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
//   moduleDirectories: ['node_modules', 'src'],
//   moduleNameMapper: {
//     '^@/tests$': '<rootDir>/test/test-utils.tsx',
//     '^@/(.*)': '<rootDir>/src/$1',
//   },
// };
