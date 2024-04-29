/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    root: true,
    extends: [
        'plugin:vue/vue3-recommended',
        'eslint:recommended',
        '@vue/eslint-config-typescript',
        '@vue/eslint-config-prettier/skip-formatting',
        'plugin:@typescript-eslint/strict',
        'plugin:@typescript-eslint/stylistic',
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 'latest',
    },
    rules: {
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    },
}
