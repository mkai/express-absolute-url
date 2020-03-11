module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
    'plugin:jest-formatting/recommended',
  ],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
  },
};
