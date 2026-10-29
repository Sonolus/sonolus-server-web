import { useLocalStorage } from '@/localStorage'
import { computed } from 'vue'
import { defaultLocale } from './i18n/locale'

const rawConfiguration = useLocalStorage('configuration', {})

export const configuration = computed({
    get: () => ({
        localization: defaultLocale,
        fallbackLocalization: defaultLocale,
        ...rawConfiguration.value,
    }),
    set: (configuration) => {
        const value: Partial<typeof configuration> = { ...configuration }

        if (value.localization === defaultLocale) delete value.localization
        if (value.fallbackLocalization === defaultLocale) delete value.fallbackLocalization

        rawConfiguration.value = value
    },
})
