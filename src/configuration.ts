import { useLocalStorage } from '@/localStorage'
import { computed } from 'vue'
import { defaultLocale } from './i18n/locale'

const defaultConfiguration: { localization: string } & Record<string, string> = {
    localization: defaultLocale,
}

const rawConfiguration = useLocalStorage('configuration', defaultConfiguration)

export const configuration = computed({
    get: () => rawConfiguration.value,
    set: (configuration) =>
        (rawConfiguration.value = { ...defaultConfiguration, ...configuration }),
})
