module.exports = {
  env: {
    browser: true,
    node: true,
    commonjs: true
  },
  extends: 'airbnb-base',

  rules: {
    'no-param-reassign': 0,
    'func-names': 0,
    'semi-spacing': [0, { before: false, after: true }],
    'no-shadow': 0,
    'no-console': 0
  }
};
