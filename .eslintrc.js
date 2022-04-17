module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    'eslint:recommended',
    // https://eslint.vuejs.org/user-guide/#usage
    'plugin:vue/vue3-recommended',
    // https://github.com/prettier/eslint-plugin-prettier#recommended-configuration
    'plugin:prettier/recommended',
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    
    // Make `eslint` error on `prettier` errors.
    'prettier/prettier': 'error'
  },
  plugins: [
    // https://github.com/prettier/eslint-plugin-prettier#installation
    'prettier'
  ]
}

