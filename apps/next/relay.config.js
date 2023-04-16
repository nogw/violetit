module.exports = {
  src: './src',
  language: 'typescript',
  schema: '../server/graphql/schema.graphql',
  artifactDirectory: './src/__generated__',
  exclude: ['**/node_modules/**', '**/.next/**', '**/__mocks__/**', '**/__generated__/**'],
};
