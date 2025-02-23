declare global {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface ImportMetaEnv {
        readonly VITE_WEB_AUTH?: string
        readonly VITE_TITLE: string
    }
}

export {}
