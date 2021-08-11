module.exports = {
  env: {
    'jest/globals': true,
    browser: true,
  },
  extends: ['airbnb', 'airbnb/hooks'],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: false,
    },
  },
  plugins: ['jest'],
  rules: {
    eqeqeq: 1,
    camelcase: 1,
    'import/no-unresolved': [1, { caseSensitive: false }],
    'arrow-body-style': 0,
    'no-nested-ternary': 0,
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    'comma-dangle': 1,
    'jsx-a11y/click-events-have-key-events': 1,
    'jsx-a11y/no-static-element-interactions': 1,
    'no-unused-vars': 1,
    'no-void': 0,
  },
  settings: {},
};
