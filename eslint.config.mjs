import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import globals from 'globals';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Path resolution for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create compatibility layer for Next.js ESLint config
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Global ignores
const ignoresConfig = {
  ignores: [
    'node_modules/**',
    '.next/**',
    'dist/**',
    '**/.git/**',
    '**/*.css', // Ignore CSS files for ESLint
    '**/*.scss', // Ignore SCSS files for ESLint
  ],
};

// Language options shared across configurations
const languageOptions = {
  globals: {
    ...globals.browser,
    ...globals.es2022,
    ...globals.node,
  },
  ecmaVersion: 'latest',
  sourceType: 'module',
  parserOptions: {
    project: './tsconfig.json',
  },
};

// Next.js config (using compatibility mode since Next.js hasn't fully migrated to flat config)
const nextConfig = fixupConfigRules([...compat.extends('next/core-web-vitals', 'next/typescript')]);

// Import and path rules configuration
const importRulesConfig = {
  files: ['**/*.{js,jsx,ts,tsx}'],
  rules: {
    // Enforce import order
    'import/order': [
      'error',
      {
        groups: [
          'builtin', // Node.js built-in modules
          'external', // External packages
          'internal', // Absolute imports
          'parent', // Imports from parent directories
          'sibling', // Imports from sibling directories
          'index', // Index imports
          'object', // Object imports
          'type', // Type imports
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        pathGroups: [
          {
            pattern: '@/**', // All imports starting with @ (absolute paths)
            group: 'internal',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
    // Enforce absolute imports
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['../*'],
            message: 'Use absolute imports instead of relative imports',
          },
        ],
      },
    ],
  },
};

// Prettier configuration - must come last to override any conflicting rules
const prettierConfig = {
  files: ['**/*.{js,jsx,ts,tsx}'], // Removed CSS and SCSS from Prettier via ESLint
  plugins: {
    prettier: eslintPluginPrettier,
  },
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    // Disable eslint rules that conflict with prettier
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
  },
};

// Custom rules configuration
const customRulesConfig = {
  files: ['**/*.{js,jsx,ts,tsx}'],
  languageOptions,
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/consistent-type-imports': 'error',
  },
};

export default [
  // Order matters! Configs at the bottom override earlier configs
  ignoresConfig,
  js.configs.recommended,
  ...nextConfig,
  importRulesConfig, // Import rules to enforce absolute paths and import order
  customRulesConfig,
  prettierConfig, // Prettier must be last to override conflicting rules
];
