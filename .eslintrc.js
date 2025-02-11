const prettierConfig = require('./.prettierrc.js');
module.exports = {
  root: true,
  extends: [
    'next/core-web-vitals',
    'plugin:prettier/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:@tanstack/query/recommended',
  ],
  rules: {
    'prettier/prettier': ['warn', prettierConfig],
  },
};
