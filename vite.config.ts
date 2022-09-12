import { defineConfig, loadEnv } from 'vite'

import vue from '@vitejs/plugin-vue'
import htmlEnv from 'vite-plugin-html-env'
import svgLoader from 'vite-svg-loader'

const env = loadEnv('', process.cwd())

// https://vitejs.dev/config/
export default defineConfig({
    base: env.VITE_BASE_URL,
    plugins: [vue(), svgLoader(), htmlEnv()],
    server: {
        proxy: {
            [`${env.VITE_BASE_URL}sonolus`]: {
                target: env.VITE_DEV_API,
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.substring(env.VITE_BASE_URL.length - 1),
            },
        },
    },
})
