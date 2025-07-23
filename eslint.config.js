import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import pluginVue from 'eslint-plugin-vue'
import tsEslint from 'typescript-eslint'

export default tsEslint.config(
    {
        ignores: ['**/*.*', '!src/**/*.*', 'src/i18n/generate.mjs', 'src/i18n/generated-*'],
    },

    eslint.configs.recommended,

    ...tsEslint.configs.strictTypeChecked,
    ...tsEslint.configs.stylisticTypeChecked,

    ...pluginVue.configs['flat/recommended'],

    {
        languageOptions: {
            parserOptions: {
                parser: tsEslint.parser,
                extraFileExtensions: ['vue'],
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            'vue/block-lang': [
                'error',
                {
                    script: {
                        lang: 'ts',
                    },
                },
            ],
            'no-undef': 'off',
            '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
            '@typescript-eslint/switch-exhaustiveness-check': 'error',
            '@typescript-eslint/restrict-template-expressions': [
                'error',
                {
                    allowAny: false,
                    allowBoolean: false,
                    allowNever: false,
                    allowNullish: false,
                    allowNumber: true,
                    allowRegExp: false,
                },
            ],
        },
    },

    eslintConfigPrettier,
)
