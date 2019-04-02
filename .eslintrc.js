module.exports = {
  root: true,
  env: {
    node: true,
    mocha: true
  },
  extends: [
    'eslint:recommended',
    'plugin:compat/recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  }
};
