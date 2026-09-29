const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  {
    ignores: ['dist/**', 'node_modules/**']
  },
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.jasmine
      }
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-console': 'warn'
    }
  },
  {
    files: ['webpack/**/*.js', 'eslint.config.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: globals.node
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-console': 'warn'
    }
  }
];
