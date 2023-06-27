module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: '@react-native-community',
  plugins: ['react', 'jsx-a11y', 'import', 'react-native', 'observation'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['.'],
        extensions: ['.js', '.jsx', '.android.js', '.ios.js', '.native.js', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'observation/no-function-without-logging': 'error',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    semi: ['error', 'never'],
    'react-native/no-unused-styles': 'error',
    'react-native/no-inline-styles': 'off',
    'no-console': 'warn',
    curly: ['error', 'multi-line'],
    'prefer-destructuring': ['error'],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling']],
        pathGroups: [
          {
            pattern: 'react+(|-native)',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react+(|-native)'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
  env: {
    jest: true,
    browser: true,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-undef': 'off',
      },
    },
    {
      files: ['*test.ts', '*test.tsx'],
      rules: {
        'observation/no-function-without-logging': 'off',
      },
    },
  ],
}
