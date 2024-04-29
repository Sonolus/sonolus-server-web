import { ref, watch } from 'vue'

export const useLocalStorage = (key: string, getDefault: () => string) => {
    const defaultValue = getDefault()
    const value = ref(localStorage.getItem(key) ?? defaultValue)

    watch(value, () => {
        if (value.value !== defaultValue) {
            localStorage.setItem(key, value.value)
        } else {
            localStorage.removeItem(key)
        }
    })

    addEventListener('storage', (event) => {
        if (event.storageArea !== localStorage) return

        if (event.key !== key) return

        value.value = event.newValue ?? defaultValue
    })

    return value
}
