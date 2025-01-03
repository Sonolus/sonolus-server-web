<script setup lang="ts">
import TextInput from '@/components/TextInput.vue'
import BaseField from '@/components/fields/BaseField.vue'
import UndoButton from '@/components/fields/UndoButton.vue'
import { useQuery } from '@/components/fields/query'
import { useI18n } from '@/i18n'
import IconSearch from '@/icons/IconSearch.vue'
import type { ServerTextOption } from '@sonolus/core'

const props = defineProps<{
    option: ServerTextOption
}>()

const query = defineModel<Record<string, string>>({ required: true })

const { i18nText } = useI18n()

const { value, isModified } = useQuery(
    query,
    props.option,
    () => props.option.def,
    (value) => value,
    (value) => value,
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
