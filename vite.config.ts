import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import { fileURLToPath, URL } from 'node:url'
import tailwind from 'tailwindcss'
import { defineConfig, loadEnv } from 'vite'

const env = loadEnv('', process.cwd())

// https://vitejs.dev/config/
export default defineConfig({
    base: env.VITE_BASE_URL,
    css: {
        postcss: {
            plugins: [tailwind(), autoprefixer()],
        },
    },
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        proxy: {
            [`${env.VITE_BASE_URL}sonolus`]: {
                target: env.VITE_DEV_API,
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.slice(env.VITE_BASE_URL.length),
            },
        },
    },
})
