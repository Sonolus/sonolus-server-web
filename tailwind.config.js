import forms from '@tailwindcss/forms'
import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],

    theme: {
        fontSize: {
            15: ['10px', '15px'],
            20: ['14px', '20px'],
            30: ['20px', '30px'],

            18: ['12px', '18px'],
            24: ['16px', '24px'],
            36: ['24px', '36px'],
        },
        spacing: {
            0: '0px',

            2.5: '2.5px',
            5: '5px',
            7.5: '7.5px',
            10: '10px',
            15: '15px',
            20: '20px',
            30: '30px',
            50: '50px',
            60: '60px',
            100: '100px',
            120: '120px',
            150: '150px',

            3: '3px',
            6: '6px',
            9: '9px',
            12: '12px',
            18: '18px',
            24: '24px',
            36: '36px',
            // 60: '60px',
            72: '72px',
            // 120: '120px',
            144: '144px',
            180: '180px',
        },
        colors: {
            main: 'rgba(0, 0, 32, 1)',
            'alternative-0': 'rgba(13, 0, 31, 1)',
            'alternative-1': 'rgba(0, 17, 29, 1)',
            glow: 'rgba(255, 255, 255, 1)',
            surface: 'rgba(0, 0, 0, 1)',

            'overlay-main': 'rgba(0, 0, 32, 0.9)',
            'overlay-surface': 'rgba(0, 0, 0, 0.9)',
            'slider-background': 'rgba(0, 0, 32, 0.25)',

            'text-normal': 'rgba(255, 255, 255, 1)',
            'text-soften': 'rgba(255, 255, 255, 0.75)',
            'text-disabled': 'rgba(255, 255, 255, 0.25)',

            'button-normal': 'rgba(255, 255, 255, 0.125)',
            'button-soften': 'rgba(255, 255, 255, 0.0625)',
            'button-highlighted': 'rgba(255, 255, 255, 0.25)',
            'button-pressed': 'rgba(255, 255, 255, 0.0625)',
            'button-disabled': 'rgba(255, 255, 255, 0.03125)',

            success: 'rgba(72, 199, 142, 1)',
            warning: 'rgba(241, 70, 104, 1)',

            current: 'currentColor',
        },
        outlineColor: {
            DEFAULT: 'rgba(255, 255, 255, 1)',
        },
        outlineWidth: {
            DEFAULT: '2px',
        },
        transitionDuration: {
            DEFAULT: '250ms',
        },
    },

    plugins: [
        forms,

        plugin(({ addVariant }) => {
            addVariant('v-transition', '.v-transition &')
        }),
    ],
}
