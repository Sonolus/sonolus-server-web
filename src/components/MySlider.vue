<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { ref } from 'vue'
import AngleLeftIcon from '../assets/angle-left.svg?component'
import AngleRightIcon from '../assets/angle-right.svg?component'
import MyButton from './MyButton.vue'

const props = defineProps<{
    modelValue: number
    min: number
    max: number
    step: number
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void
}>()

const el = ref<HTMLDivElement>()

const value = useVModel(props, 'modelValue', emit)

const normalize = (value: number) =>
    Math.max(
        props.min,
        Math.min(
            props.max,
            props.min +
                Math.round((value - props.min) / props.step) * props.step
        )
    )

const increase = () => {
    value.value = normalize(value.value + props.step)
}

const decrease = () => {
    value.value = normalize(value.value - props.step)
}

const onDown = (e: MouseEvent) => {
    if (e.buttons !== 1 && e.buttons !== 0) return

    set(e)
}

const onMove = (e: MouseEvent) => {
    if (e.buttons !== 1) return

    set(e)
}

const set = (e: MouseEvent) => {
    if (!el.value) return

    const rect = el.value.getBoundingClientRect()
    const v = (e.clientX - rect.left) / rect.width
    value.value = normalize(v * (props.max - props.min) + props.min)
}
</script>

<template>
    <div class="relative flex items-center">
        <MyButton :icon="AngleLeftIcon" @click="decrease" />
        <button
            class="h-full w-full flex-grow bg-sonolus-ui-button-normal p-2 hover:bg-sonolus-ui-button-highlighted active:bg-sonolus-ui-button-pressed sm:p-3"
            @mousedown="onDown"
            @mousemove="onMove"
        >
            <div
                class="h-full w-full bg-sonolus-ui-surface bg-opacity-25 p-1.5 sm:p-2"
            >
                <div ref="el" class="h-full w-full">
                    <div
                        class="h-2 w-full origin-left transform bg-sonolus-ui-text-normal transition-transform"
                        :style="`--tw-scale-x: ${(value - min) / (max - min)}`"
                    />
                </div>
            </div>
        </button>
        <MyButton :icon="AngleRightIcon" @click="increase" />
    </div>
</template>
