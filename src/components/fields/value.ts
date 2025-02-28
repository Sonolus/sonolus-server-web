import type { ServerOption } from '@sonolus/core'
import { computed, type Ref } from 'vue'

export type OptionValue = {
    value: string
    files: Record<string, File>
}

export type OptionValues = Record<string, OptionValue>

export const useValue = <T>(
    values: Ref<OptionValues>,
    option: ServerOption,
    getDefault: () => T,
    deserialize: (value: OptionValue) => T,
    serialize: (value: T) => OptionValue,
    comparer: (a: T, b: T) => boolean = (a, b) => a === b,
) => {
    const value = computed({
        get: () => {
            const value = values.value[option.query]
            return value ? deserialize(value) : getDefault()
        },

        set: (value) => {
            const newValues = { ...values.value }
            if (comparer(value, getDefault())) {
                // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                delete newValues[option.query]
            } else {
                newValues[option.query] = serialize(value)
            }

            values.value = newValues
        },
    })

    const isModified = computed(() => !comparer(value.value, getDefault()))

    return { value, isModified }
}
