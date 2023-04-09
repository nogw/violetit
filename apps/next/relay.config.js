module.exports = {
  src: './src',
  language: 'typescript',
  schema: '../server/graphql/schema.graphql',
  artifactDirectory: './__generated__',
  exclude: ['**/node_modules/**', '**/__mocks__/**', '**/__generated__/**'],
};
