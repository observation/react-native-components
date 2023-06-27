module.exports = {
  // React Native 0.64.2 settings:
  // bracketSpacing: false,
  // jsxBracketSameLine: true,
  // singleQuote: true,
  // trailingComma: 'all',
  // arrowParens: 'avoid',
  printWidth: 120,
  bracketSpacing: true,
  bracketSameLine: false,
  semi: false,
  singleQuote: true,
  trailingComma: 'all',

  overrides: [
    {
      files: '*.xml',
      options: {
        printWidth: 80,
        tabWidth: 4,
        bracketSameLine: true,
        xmlWhitespaceSensitivity: 'ignore',
      },
    },
  ],
}
