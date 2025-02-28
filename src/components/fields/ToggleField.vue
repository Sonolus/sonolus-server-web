<script setup lang="ts">
import BaseField from '@/components/fields/BaseField.vue'
import UndoButton from '@/components/fields/UndoButton.vue'
import { useValue, type OptionValues } from '@/components/fields/value'
import { i18n } from '@/i18n'
import type { ServerToggleOption } from '@sonolus/core'

const props = defineProps<{
    option: ServerToggleOption
}>()

const values = defineModel<OptionValues>({ required: true })

const { value, isModified } = useValue(
    values,
    props.option,
    () => !!props.option.def,
    ({ value }) => !!+value,
    (value) => ({ value: `${+value}`, files: {} }),
)
</script>

<template>
    <BaseField :option :display-value="value ? i18n.common.on : i18n.common.off" :is-modified>
        <div class="flex justify-end gap-10 sm:gap-12">
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
            <UndoButton class="flex-shrink-0" :is-modified @click="value = !!option.def" />
        </div>
    </BaseField>
</template>
