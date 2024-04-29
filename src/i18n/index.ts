import type { I18n } from '@/i18n/generated-en'
import { useLocalStorage } from '@/i18n/localStorage'
import { computed, watchEffect } from 'vue'

const modules = import.meta.glob('./generated-*.ts', { eager: true }) as Record<
    string,
    { i18n: I18n }
>
const locales = Object.keys(modules).map((key) => modules[key].i18n.meta)

const locale = useLocalStorage('locale', () => {
    const [main, ...rest] = navigator.language.toLowerCase().split('-')

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

const i18n = computed(() => modules[`./generated-${locale.value}.ts`].i18n)
const i18nText = (name: string): string => i18n.value.texts[name as never] ?? name

watchEffect(() => (document.documentElement.lang = i18n.value.lang))

export type { I18n }

export const useI18n = () => {
    return { i18n, i18nText, locale, locales }
}
