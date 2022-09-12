import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'
import type { I18n } from './generated-en'

const modules = import.meta.glob('./generated-*.ts', { eager: true }) as Record<
    string,
    { i18n: I18n }
>
const locales = Object.keys(modules).map((key) => modules[key].i18n.meta)

const locale = useLocalStorage('locale', getDefaultLocale())
const i18n = computed(() => modules[`./generated-${locale.value}.ts`].i18n)

export const useI18n = () => {
    return { i18n, locale, locales }
}

function getDefaultLocale() {
    const [main, ...rest] = navigator.language.toLowerCase().split('-')

    switch (main) {
        case 'es':
        case 'fr':
        case 'id':
        case 'ja':
        case 'ko':
            return main
        case 'in':
            return 'id'
        case 'zh':
            return ['hant', 'hk', 'tw'].some((tag) => rest.includes(tag))
                ? 'zht'
                : 'zhs'
        default:
            return 'en'
    }
}
