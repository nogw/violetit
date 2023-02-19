// eslint-disable-next-line @typescript-eslint/no-var-requires
const package = require('./package');

module.exports = {
  displayName: package.name,
  preset: 'ts-jest',
  testEnvironment: './test/environment/mongodb.ts',
  testPathIgnorePatterns: ['/node_modules/', './dist'],
  coverageReporters: ['lcov', 'html'],
  resetModules: false,
  transform: { '^.+\\.(js|ts|tsx)?$': '<rootDir>/test/babel-transformer' },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts|tsx)?$',
  moduleFileExtensions: ['ts', 'js', 'tsx', 'json'],
  setupFiles: ['<rootDir>/test/jest.setup.js'],
};
