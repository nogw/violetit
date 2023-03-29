module.exports = {
  src: './src',
  language: 'typescript',
  // schema: './data/schema.graphql',
  schema: '../server/graphql/schema.graphql',
  eagerEsModules: true,
  exclude: ['**/node_modules/**', '**/__mocks__/**', '**/__generated__/**'],
};
