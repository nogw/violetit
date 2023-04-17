const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: process.cwd() });

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
};

module.exports = createJestConfig(customJestConfig);
