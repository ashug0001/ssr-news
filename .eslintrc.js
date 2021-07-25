const { eslintDirAlias } = require('./dirAlias');

module.exports = {
  extends: [
    'airbnb',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/recomended',
  ],
  env: {
    es6: true,
    broswer: true,
    jest: true,
    node: true,
  },
  parder: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    exmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['prettier', 'json', 'jsx-a11y', 'react-hooks'],
  rules: {
    'react/forbid-foreign-prop-types': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'jsx-a11y/no-redundant-roles': 'off',
  },
  settings: {
    'import/resolver': {
      alias: eslintDirAlias,
    },
  },
};
