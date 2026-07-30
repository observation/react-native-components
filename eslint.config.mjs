import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import eslintConfigPrettier from 'eslint-config-prettier'
import _import from 'eslint-plugin-import'
import observation from 'eslint-plugin-observation'
import prettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactNative from 'eslint-plugin-react-native'
import reactNativeA11Y from 'eslint-plugin-react-native-a11y'
import globals from 'globals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  ...compat.extends('plugin:@typescript-eslint/recommended'),
  // Apply prettier config here (to disable conflicting rules); our own rules below override where needed.
  eslintConfigPrettier,
  {
    plugins: {
      'react-native': reactNative,
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': reactNativeA11Y,
      import: _import,
      prettier,
      observation,
    },

    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.browser,
      },

      parser: tsParser,
    },

    settings: {
      'import/resolver': {
        node: {
          paths: ['.'],
          extensions: ['.js', '.jsx', '.android.js', '.ios.js', '.native.js', '.ts', '.tsx'],
        },
      },
    },

    rules: {
      'observation/no-function-without-logging': [
        'error',
        {
          ignoreList: ['createStyles'],
        },
      ],

      'react-native/no-unused-styles': 'error',
      'react-native/no-inline-styles': 'off',

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      'prettier/prettier': 'error',

      'no-shadow': 'off',
      semi: ['error', 'never'],
      'no-console': 'warn',
      curly: ['error', 'multi-line'],
      'prefer-destructuring': ['error'],
      'no-duplicate-imports': 'error',

      'sort-imports': [
        'error',
        {
          ignoreDeclarationSort: true,
        },
      ],

      '@typescript-eslint/no-shadow': ['error'],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

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
  },
  {
    files: ['**/*.ts', '**/*.tsx'],

    rules: {
      'no-undef': 'off',
    },
  },
  {
    files: ['**/*test.ts', '**/*test.tsx'],

    rules: {
      'observation/no-function-without-logging': 'off',
    },
  },
]
