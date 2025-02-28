import type { I18n } from '@/i18n'

type NoData<T> = Omit<T, 'data'>

type MaybeData<T> = Omit<T, 'data'> & Partial<Pick<T, 'data' & keyof T>>

export const viewOptions = <T>(options: {
    inheritAttrs?: boolean

    url?: (props: NoData<T>) => string | undefined
    loading?: (context: { i18n: I18n; props: NoData<T> }) => string
    error?: (context: { i18n: I18n; props: NoData<T> }) => string

    title?: (context: { i18n: I18n; props: MaybeData<T> }) => string
    banner?: (props: MaybeData<T>) => string | undefined
}) => ({
    inheritAttrs: false,
    ...options,
})
