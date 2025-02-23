import { configuration } from '@/configuration'
import type { I18n } from '@/i18n/generated-en'
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
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
export const i18nText = (name: string): string => i18n.value.texts[name as never] ?? name

watchEffect(() => (document.documentElement.lang = i18n.value.lang))

export type { I18n }
