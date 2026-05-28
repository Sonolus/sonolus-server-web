import { configuration } from '@/configuration'
import type { I18n } from '@/i18n/generated-en'
import { Text, TextFunction } from '@sonolus/core'
import { computed, watchEffect } from 'vue'

export const locale = computed({
    get: () => configuration.value.localization,
    set: (locale) => (configuration.value = { ...configuration.value, localization: locale }),
})

const modules: Record<string, { i18n: I18n }> = import.meta.glob('./generated-*.ts', {
    eager: true,
})
export const locales = Object.values(modules).map(({ i18n }) => i18n.meta)

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const i18n = computed(() => modules[`./generated-${locale.value}.ts`]!.i18n)

export const i18nText = (key: string): string => {
    const index = key.indexOf(':')
    if (index < 0) return i18n.value.texts[key] ?? key

    const head = key.slice(0, index)

    const format = i18n.value.texts[head]
    if (format === undefined) {
        switch (head) {
            case TextFunction.Escape:
                return escapeFormatter(key.slice(index + 1))
            case TextFunction.TimeFull:
                return timeFullFormatter(key.slice(index + 1))
            case TextFunction.TimeRelative:
                return timeRelativeFormatter(key.slice(index + 1))
            default:
                return key
        }
    }

    const value = i18nText(key.slice(index + 1))
    return format.includes('{0}') ? format.replace('{0}', value) : `${format}${value}`
}

const escapeFormatter = (value: string) => value

const timeFullFormatter = (value: string) => {
    const time = +value
    if (!time) return value

    return new Date(time).toLocaleString()
}

const timeRelativeFormatter = (value: string) => {
    const time = +value
    if (!time) return value

    let ms = time - Date.now()

    const isFuture = ms > 0
    ms = Math.abs(ms)

    const format = (futureKey: string, pastKey: string, value: number) =>
        i18nText(isFuture ? futureKey : pastKey).replace('{0}', `${Math.floor(value)}`)

    const s = ms / 1000
    if (s < 60) return format(Text.SecondFuture, Text.SecondPast, s)

    const m = s / 60
    if (m < 60) return format(Text.MinuteFuture, Text.MinutePast, m)

    const h = m / 60
    if (h < 24) return format(Text.HourFuture, Text.HourPast, h)

    const d = h / 24
    if (d < 30) return format(Text.DayFuture, Text.DayPast, d)

    if (d < 365) return format(Text.MonthFuture, Text.MonthPast, d / 30)

    return format(Text.YearFuture, Text.YearPast, d / 365)
}

watchEffect(() => (document.documentElement.lang = i18n.value.lang))

export type { I18n }
