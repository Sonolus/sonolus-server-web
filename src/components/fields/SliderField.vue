<script setup lang="ts">
import BaseField from '@/components/fields/BaseField.vue'
import UndoButton from '@/components/fields/UndoButton.vue'
import { useQuery } from '@/components/fields/query'
import type { ServerSliderOption } from '@sonolus/core'

const props = defineProps<{
    option: ServerSliderOption
}>()

const query = defineModel<Record<string, string>>({ required: true })

const { value, isModified } = useQuery(
    query,
    props.option,
    () => props.option.def,
    (value) => (Number.isNaN(+value) ? props.option.def : +value),
    (value) => `${value}`,
)
</script>

<template>
    <BaseField :option :display-value="`${value}`" :is-modified>
        <div class="flex gap-10 sm:gap-12">
            <div
                class="relative flex-grow bg-button-normal transition-colors focus-within:outline hover:bg-button-highlighted active:bg-button-pressed"
            >
                <div class="absolute left-0 top-0 size-full p-5 sm:p-6">
                    <div class="size-full bg-slider-background p-5 sm:p-6">
                        <div
                            class="h-full bg-text-normal transition-[width]"
                            :style="{
                                width: `${(100 * (value - option.min)) / (option.max - option.min)}%`,
                            }"
                        />
                    </div>
                </div>
                <input
                    v-model="value"
                    class="absolute left-0 top-0 size-full px-5 opacity-0 sm:px-6"
                    type="range"
                    :min="option.min"
                    :max="option.max"
                    :step="option.step"
                />
            </div>
            <UndoButton class="flex-shrink-0" :is-modified @click="value = option.def" />
        </div>
    </BaseField>
</template>
