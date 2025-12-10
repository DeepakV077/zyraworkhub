// Flat ESLint config that composes recommended configs programmatically.
// This avoids string "extends" and works as a flat config file which eslint
// will prefer when present.
const js = require('@eslint/js');
const globals = require('globals');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const reactPlugin = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const reactRefresh = require('eslint-plugin-react-refresh');
const jsxA11y = require('eslint-plugin-jsx-a11y');

module.exports = [
  // Base JS recommended
  js.configs.recommended,

  // Global settings (React version detection, a11y available globally)
  {
    // applies to all files
    ignores: ['dist'],
    plugins: {
      'jsx-a11y': jsxA11y,
      react: reactPlugin,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...(jsxA11y.configs && jsxA11y.configs.recommended && jsxA11y.configs.recommended.rules
        ? jsxA11y.configs.recommended.rules
        : {}),
    },
  },

  // TypeScript files
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['dist'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: globals.browser,
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // Include recommended rules from @typescript-eslint and react
      ...(tsPlugin.configs && tsPlugin.configs.recommended && tsPlugin.configs.recommended.rules
        ? tsPlugin.configs.recommended.rules
        : {}),
      ...(reactPlugin.configs && reactPlugin.configs.recommended && reactPlugin.configs.recommended.rules
        ? reactPlugin.configs.recommended.rules
        : {}),
      // Project-specific overrides for modern React (new JSX transform)
      'react/react-in-jsx-scope': 'off',
      'react/react-in-js': 'off',
      // When using the new JSX transform, React is not required in scope
      'no-undef': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
    settings: {
      react: { version: 'detect' },
    },
  },

  // JS files
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.browser,
    },
    plugins: {
      react: reactPlugin,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...(reactPlugin.configs && reactPlugin.configs.recommended && reactPlugin.configs.recommended.rules
        ? reactPlugin.configs.recommended.rules
        : {}),
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
];
