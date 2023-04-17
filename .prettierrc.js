module.exports = {
  trailingComma: 'all',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  printWidth: 120,
  jsxBracketSameLine: false,
  jsxSingleQuote: false,
  arrowParens: 'avoid',
  htmlWhitespaceSensitivity: 'ignore',
  plugins: [require('prettier-plugin-tailwindcss')],
};
