/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

interface ImportMetaEnv {
    readonly VITE_TITLE: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
