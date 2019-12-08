'use strict';

module.exports = {
  plugins: ['jest', 'jest-formatting'],
  extends: ['plugin:jest/recommended', 'plugin:jest/style' ,'plugin:jest-formatting/strict'],
  env: {
    jest: true,
  },
  rules: {
    'jest/no-if': 2,
    'jest/no-test-callback': 2,
    'jest/consistent-test-it': [2, { 'fn': 'test' }],
    'jest/expect-expect': 2,
    'jest/no-duplicate-hooks': 2,
    'jest/no-standalone-expect': 2,
    'jest/no-truthy-falsy': 2,
    'jest/no-try-expect': 2,
    'jest/valid-expect-in-promise': 2,
  },
};
