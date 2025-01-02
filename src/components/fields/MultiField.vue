<script setup lang="ts">
import BaseField from '@/components/fields/BaseField.vue'
import UndoButton from '@/components/fields/UndoButton.vue'
import { useQuery } from '@/components/fields/query'
import { useI18n } from '@/i18n'
import IconCheckboxOff from '@/icons/IconCheckboxOff.vue'
import IconCheckboxOn from '@/icons/IconCheckboxOn.vue'
import type { ServerMultiOption } from '@sonolus/core'
import { computed } from 'vue'

const props = defineProps<{
    option: ServerMultiOption
}>()

const query = defineModel<Record<string, string>>({ required: true })

const { i18n, i18nText } = useI18n()

const getDefault = () =>
    new Set(
        props.option.values.filter((_, index) => props.option.def[index]).map(({ name }) => name),
    )

const { value, isModified } = useQuery(
    query,
    props.option,
    getDefault,
    (value) =>
        new Set(
            value
                .split(',')
                .filter((name) => props.option.values.some((value) => value.name === name)),
        ),
    (value) => [...value].join(','),
    (a, b) => a.size === b.size && [...a].every((value) => b.has(value)),
)

const count = computed(() => value.value.size)

const displayValue = computed(() =>
    props.option.def.length && count.value === props.option.values.length
        ? i18n.value.common.multiField.allSelected
        : i18n.value.common.multiField.selected(`${count.value}`),
)

const toggleText = computed(() =>
    props.option.def.length === 0 || count.value < props.option.values.length
        ? i18n.value.common.multiField.selectAll
        : i18n.value.common.multiField.selectNone,
)

const toggleOne = (name: string) => {
    const newValue = new Set(value.value)
    if (value.value.has(name)) {
        newValue.delete(name)
    } else {
        newValue.add(name)
    }
    value.value = newValue
}

const toggleAll = () => {
    if (count.value < props.option.values.length) {
        value.value = new Set(props.option.values.map(({ name }) => name))
    } else {
        value.value = new Set()
    }
}
</script>

<template>
    <BaseField :option :display-value :is-modified>
        <div class="flex justify-end gap-10 sm:gap-12">
            <button
                class="min-w-120 bg-button-normal px-7.5 py-5 transition-colors hover:bg-button-highlighted focus-visible:outline active:bg-button-pressed sm:min-w-144 sm:px-9 sm:py-6"
                type="button"
                @click="toggleAll"
            >
                {{ toggleText }}
            </button>
            <UndoButton class="flex-shrink-0" :is-modified @click="value = getDefault()" />
        </div>
        <div class="mt-10 flex flex-wrap gap-10 sm:mt-12 sm:gap-12">
            <button
                v-for="{ name, title } in option.values"
                :key="name"
                class="flex items-center gap-5 bg-button-normal p-5 transition-colors hover:bg-button-highlighted focus-visible:outline active:bg-button-pressed sm:gap-6 sm:p-6"
                type="button"
                @click="toggleOne(name)"
            >
                <component
                    :is="value.has(name) ? IconCheckboxOn : IconCheckboxOff"
                    class="size-20 fill-current sm:size-24"
                />
                <span class="px-2.5 text-center sm:px-3">
                    {{ i18nText(title) }}
                </span>
            </button>
        </div>
    </BaseField>
</template>
