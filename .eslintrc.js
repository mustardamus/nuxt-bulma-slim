module.exports = {
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },

  env: {
    commonjs: true,
    es6: true,
    node: true,
    jest: true
  },

  plugins: ['prettier', 'jest', 'import', 'promise'],

  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:promise/recommended'
  ],

  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false
      }
    ]
  }
}
