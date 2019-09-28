module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ['airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'arrow-parens': [2, 'as-needed'],
    'comma-dangle': [2, 'always-multiline']
  }
};
