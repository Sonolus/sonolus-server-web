import type { ServerOption } from '@sonolus/core'
import { computed, type Ref } from 'vue'

export const useQuery = <T>(
    query: Ref<Record<string, string>>,
    option: ServerOption,
    getDefault: () => T,
    deserialize: (value: string) => T,
    serialize: (value: T) => string,
    comparer: (a: T, b: T) => boolean = (a, b) => a === b,
) => {
    const value = computed({
        get: () => {
            const value = query.value[option.query]
            return value !== undefined ? deserialize(value) : getDefault()
        },

        set: (value) =>
            (query.value = {
                ...query.value,
                [option.query]: !comparer(value, getDefault())
                    ? serialize(value)
                    : (undefined as never),
            }),
    })

    const isModified = computed(() => !comparer(value.value, getDefault()))

    return { value, isModified }
}
