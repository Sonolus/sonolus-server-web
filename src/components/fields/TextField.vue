<script setup lang="ts">
import TextInput from '@/components/TextInput.vue'
import BaseField from '@/components/fields/BaseField.vue'
import UndoButton from '@/components/fields/UndoButton.vue'
import { useValue, type OptionValues } from '@/components/fields/value'
import { i18nText } from '@/i18n'
import IconSearch from '@/icons/IconSearch.vue'
import type { ServerTextOption } from '@sonolus/core'

const props = defineProps<{
    option: ServerTextOption
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
        <div class="flex gap-10 sm:gap-12">
            <TextInput
                v-model="value"
                class="flex-grow"
                :icon="IconSearch"
                :placeholder="i18nText(option.placeholder)"
                :limit="option.limit || undefined"
            />
            <UndoButton class="flex-shrink-0" :is-modified @click="value = ''" />
        </div>
    </BaseField>
</template>
