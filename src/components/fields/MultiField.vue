<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import BaseField from '@/components/fields/BaseField.vue'
import UndoButton from '@/components/fields/UndoButton.vue'
import { useValue, type OptionValues } from '@/components/fields/value'
import { i18n, i18nText } from '@/i18n'
import IconCheckboxOff from '@/icons/IconCheckboxOff.vue'
import IconCheckboxOn from '@/icons/IconCheckboxOn.vue'
import type { ServerMultiOption } from '@sonolus/core'
import { computed } from 'vue'

const props = defineProps<{
    option: ServerMultiOption
}>()

const values = defineModel<OptionValues>({ required: true })

const getDefault = () =>
    new Set(
        props.option.values.filter((_, index) => props.option.def[index]).map(({ name }) => name),
    )

const { value, isModified } = useValue(
    values,
    props.option,
    getDefault,
    ({ value }) =>
        new Set(
            value
                .split(',')
                .filter((name) => props.option.values.some((value) => value.name === name)),
        ),
    (value) => ({ value: [...value].join(','), files: {} }),
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
            <AppButton @click="toggleAll">
                {{ toggleText }}
            </AppButton>
            <UndoButton class="flex-shrink-0" :is-modified @click="value = getDefault()" />
        </div>
        <div class="mt-10 flex flex-wrap gap-10 sm:mt-12 sm:gap-12">
            <AppButton
                v-for="{ name, title } in option.values"
                :key="name"
                :icon="value.has(name) ? IconCheckboxOn : IconCheckboxOff"
                auto-width
                @click="toggleOne(name)"
            >
                {{ i18nText(title) }}
            </AppButton>
        </div>
    </BaseField>
</template>
