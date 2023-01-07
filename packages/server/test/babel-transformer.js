const config = require('@violetit/babel');

const { createTransformer } = require('babel-jest').default;

module.exports = createTransformer({
  ...config,
});
