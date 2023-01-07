const package = require('./package');

module.exports = {
  displayName: package.name,
  name: package.name,
  testEnvironment: '<rootDir>/test/environment/mongodb',
  testPathIgnorePatterns: ['/node_modules/', './dist'],
  coverageReporters: ['lcov', 'html'],
  resetModules: false,
  transform: { '^.+\\.(js|ts|tsx)?$': '<rootDir>/test/babel-transformer' },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts|tsx)?$',
  moduleFileExtensions: ['ts', 'js', 'tsx', 'json'],
  setupFiles: ['<rootDir>/test/jest.setup.js'],
};
