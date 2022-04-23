module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    'eslint:recommended', // eslint base rules
    'plugin:vue/recommended', // vue rules
    'plugin:prettier/recommended', // disabled eslint format rules and turn on prettier check
  ],
  parser: 'vue-eslint-parser', // be able to resolve <template> in .vue
  plugins: ['vue', 'prettier'], // .vue and prettier support
  parserOptions: {
    parser: '@babel/eslint-parser', // use babel's rules to deal <script> tag in .vue
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
