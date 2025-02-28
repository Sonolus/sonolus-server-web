<script setup lang="ts">
import BaseField from '@/components/fields/BaseField.vue'
import UndoButton from '@/components/fields/UndoButton.vue'
import { useQuery } from '@/components/fields/query'
import { i18nText } from '@/i18n'
import IconRadioOff from '@/icons/IconRadioOff.vue'
import IconRadioOn from '@/icons/IconRadioOn.vue'
import type { ServerSelectOption } from '@sonolus/core'

const props = defineProps<{
    option: ServerSelectOption
}>()

const query = defineModel<Record<string, string>>({ required: true })

const { value, isModified } = useQuery(
    query,
    props.option,
    () => props.option.def,
    (value) => value,
    (value) => value,
)
</script>

<template>
    <BaseField
        :option
        :display-value="i18nText(option.values.find(({ name }) => name === value)?.title ?? '')"
        :is-modified
    >
        <div class="flex justify-end">
            <UndoButton class="flex-shrink-0" :is-modified @click="value = option.def" />
        </div>
        <div class="mt-10 flex flex-wrap gap-10 sm:mt-12 sm:gap-12">
            <button
                v-for="{ name, title } in option.values"
                :key="name"
                class="flex items-center gap-5 bg-button-normal p-5 transition-colors hover:bg-button-highlighted focus-visible:outline active:bg-button-pressed sm:gap-6 sm:p-6"
                type="button"
                @click="value = name"
            >
                <component
                    :is="value === name ? IconRadioOn : IconRadioOff"
                    class="size-20 fill-current sm:size-24"
                />
                <span class="px-2.5 text-center sm:px-3">
                    {{ i18nText(title) }}
                </span>
            </button>
        </div>
    </BaseField>
</template>
