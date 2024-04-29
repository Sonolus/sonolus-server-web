import type { ServerOption } from '@sonolus/core'
import { computed, type Ref } from 'vue'

export const useQuery = <T>(
    query: Ref<Record<string, string>>,
    option: ServerOption,
    getDefault: () => T,
    deserialize: (value: string) => T,
    serialize: (value: T) => string,
) => {
    const value = computed({
        get: () =>
            query.value[option.query] !== undefined
                ? deserialize(query.value[option.query])
                : getDefault(),

        set: (value) =>
            (query.value = {
                ...query.value,
                [option.query]: value !== getDefault() ? serialize(value) : (undefined as never),
            }),
    })

    const isModified = computed(() => value.value !== getDefault())

    return { value, isModified }
}
