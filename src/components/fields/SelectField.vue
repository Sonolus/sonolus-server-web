<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import BaseField from '@/components/fields/BaseField.vue'
import UndoButton from '@/components/fields/UndoButton.vue'
import { useValue, type OptionValues } from '@/components/fields/value'
import { i18nText } from '@/i18n'
import IconRadioOff from '@/icons/IconRadioOff.vue'
import IconRadioOn from '@/icons/IconRadioOn.vue'
import type { ServerSelectOption } from '@sonolus/core'

const props = defineProps<{
    option: ServerSelectOption
}>()

const values = defineModel<OptionValues>({ required: true })

const { value, isModified } = useValue(
    values,
    props.option,
    () => props.option.def,
    ({ value }) => value,
    (value) => ({ value, files: {} }),
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
            <AppButton
                v-for="{ name, title } in option.values"
                :key="name"
                :icon="value === name ? IconRadioOn : IconRadioOff"
                auto-width
                @click="value = name"
            >
                {{ i18nText(title) }}
            </AppButton>
        </div>
    </BaseField>
</template>
