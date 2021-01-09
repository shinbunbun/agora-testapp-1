module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    quotes: [
      2,
      'single'
    ],
    'linebreak-style': [
      2,
      'unix'
    ],
    'no-console': 0,
    'space-before-function-paren': 0,
    'no-new': 0,
    'no-undef': 'error',
    'indent': [
      'error',
      2,
      {
        'SwitchCase': 1
      }]
  }
};
