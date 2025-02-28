<script setup lang="ts">
import BaseField from '@/components/fields/BaseField.vue'
import UndoButton from '@/components/fields/UndoButton.vue'
import { useValue, type OptionValues } from '@/components/fields/value'
import { i18nText } from '@/i18n'
import type { ServerTextAreaOption } from '@sonolus/core'

const props = defineProps<{
    option: ServerTextAreaOption
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
    <BaseField :option :display-value="value" :is-modified>
        <div class="flex justify-end">
            <UndoButton class="flex-shrink-0" :is-modified @click="value = ''" />
        </div>
        <textarea
            v-model="value"
            class="mt-10 h-120 w-full border-none bg-button-normal p-5 transition-colors placeholder:text-20 placeholder:italic placeholder:text-text-disabled hover:bg-button-highlighted focus-visible:outline focus-visible:outline-offset-0 focus-visible:ring-0 active:bg-button-pressed sm:h-144 sm:p-6 sm:placeholder:text-24"
            :placeholder="i18nText(option.placeholder)"
            :maxlength="option.limit || undefined"
        />
    </BaseField>
</template>
