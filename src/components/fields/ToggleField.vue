<script setup lang="ts">
import BaseField from '@/components/fields/BaseField.vue'
import UndoButton from '@/components/fields/UndoButton.vue'
import { useQuery } from '@/components/fields/query'
import { useI18n } from '@/i18n'
import type { ServerToggleOption } from '@sonolus/core'

const props = defineProps<{
    option: ServerToggleOption
}>()

const query = defineModel<Record<string, string>>({ required: true })

const { i18n } = useI18n()

const { value, isModified } = useQuery(
    query,
    props.option,
    () => !!props.option.def,
    (value) => !!+value,
    (value) => `${+value}`,
)
</script>

<template>
    <BaseField :option :display-value="value ? i18n.common.on : i18n.common.off" :is-modified>
        <div class="flex justify-end">
            <button
                class="w-60 bg-button-normal p-5 transition-colors hover:bg-button-highlighted focus-visible:outline active:bg-button-pressed sm:w-72 sm:p-6"
                type="button"
                @click="value = !value"
            >
                <div
                    class="h-full w-1/2 transition-all"
                    :class="value ? 'translate-x-full bg-success' : 'bg-warning'"
                />
            </button>
            <UndoButton
                class="ml-10 flex-shrink-0 sm:ml-12"
                :is-modified
                @click="value = !!option.def"
            />
        </div>
    </BaseField>
</template>
