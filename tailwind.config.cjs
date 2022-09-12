/* eslint-env node */
/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./index.html', './src/**/*.vue'],
    theme: {
        extend: {
            fontSize: {
                '2xs': '.65rem',
            },
            colors: {
                'sonolus-main': 'rgb(0 0 32 / <alpha-value>)',
                'sonolus-alternative-0': 'rgb(13 0 31 / <alpha-value>)',
                'sonolus-alternative-1': 'rgb(0 17 29 / <alpha-value>)',
                'sonolus-glow': 'rgb(255 255 255 / <alpha-value>)',
                'sonolus-ui-surface': 'rgb(0 0 0 / <alpha-value>)',
                'sonolus-ui-text-normal': 'rgba(255, 255, 255, 1)',
                'sonolus-ui-text-soften': 'rgba(255, 255, 255, 0.75)',
                'sonolus-ui-text-disabled': 'rgba(255, 255, 255, 0.25)',
                'sonolus-ui-button-normal': 'rgba(255, 255, 255, 0.125)',
                'sonolus-ui-button-highlighted': 'rgba(255, 255, 255, 0.25)',
                'sonolus-ui-button-pressed': 'rgba(255, 255, 255, 0.0625)',
                'sonolus-ui-button-disabled': 'rgba(255, 255, 255, 0.03125)',
                'sonolus-success': 'rgb(72 199 142 / <alpha-value>)',
                'sonolus-warning': 'rgb(241 70 104 / <alpha-value>)',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('tailwindcss/plugin')(({ addVariant }) => {
            addVariant('v-transition', '.v-transition &')
        }),
    ],
}
