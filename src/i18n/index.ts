import type { I18n } from '@/i18n/generated-en'
import { useLocalStorage } from '@/i18n/localStorage'
import { computed, watchEffect } from 'vue'

const modules: Record<string, { i18n: I18n }> = import.meta.glob('./generated-*.ts', {
    eager: true,
})
const locales = Object.values(modules).map(({ i18n }) => i18n.meta)

const locale = useLocalStorage('locale', () => {
    const [main, ...rest] = navigator.language.toLowerCase().split('-')

    // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
    switch (main) {
        case 'el':
        case 'es':
        case 'fr':
        case 'id':
        case 'ja':
        case 'ko':
            return main
        case 'in':
            return 'id'
        case 'zh':
            return ['hant', 'hk', 'tw'].some((tag) => rest.includes(tag)) ? 'zht' : 'zhs'
        default:
            return 'en'
    }
})

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const i18n = computed(() => modules[`./generated-${locale.value}.ts`]!.i18n)
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
const i18nText = (name: string): string => i18n.value.texts[name as never] ?? name

watchEffect(() => (document.documentElement.lang = i18n.value.lang))

export type { I18n }

export const useI18n = () => {
    return { i18n, i18nText, locale, locales }
}
