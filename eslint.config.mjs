import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const ignoresConfig = {
  ignores: [
    'dist',
    'node_modules',
    'build',
    '.next',
    'coverage',
    '*.min.js',
    '*.d.ts',
    '.history',
    '**/.git/**',
  ],
};

const customRulesConfig = {
  files: ['**/*.{ts,tsx,js,jsx}'],

  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    globals: {
      ...globals.browser,
      ...globals.node,
    },
    parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: __dirname,
    },
  },

  settings: {
    react: {
      version: 'detect',
    },
  },

  plugins: {
    prettier: prettierPlugin,
  },

  rules: {
    // TypeScript
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],

    // React
    'react/jsx-key': ['error', { checkFragmentShorthand: true }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // Import
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],

    // General
    'no-unused-vars': 'off',
    'prefer-const': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-restricted-syntax': [
      'error',
      {
        selector: 'TSEnumDeclaration',
        message: 'Use const assertions or union types instead of enums.',
      },
    ],

    // Prettier
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
  },
};

const config = [
  ignoresConfig,
  js.configs.recommended,
  ...fixupConfigRules(compat.extends('next/core-web-vitals', 'next/typescript')),
  customRulesConfig,
  eslintConfigPrettier,
];

export default config;
