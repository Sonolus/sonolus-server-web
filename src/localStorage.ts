import { ref, watch } from 'vue'

export const useLocalStorage = <T>(key: string, defaultValue: T) => {
    const defaultValueJson = JSON.stringify(defaultValue)

    const value = ref(parseJson(localStorage.getItem(key), defaultValue))

    watch(value, () => {
        const valueJson = JSON.stringify(value.value)

        if (valueJson !== defaultValueJson) {
            localStorage.setItem(key, valueJson)
        } else {
            localStorage.removeItem(key)
        }
    })

    addEventListener('storage', (event) => {
        if (event.storageArea !== localStorage) return

        if (event.key !== key) return

        value.value = parseJson(event.newValue, defaultValue)
    })

    return value
}

const parseJson = <T>(json: string | null, defaultValue: T) => {
    if (!json) return defaultValue

    try {
        return JSON.parse(json) as T
    } catch {
        return defaultValue
    }
}
