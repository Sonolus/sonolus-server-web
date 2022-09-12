<script setup lang="ts">
import { useVModel } from '@vueuse/core'

const props = defineProps<{
    modelValue: boolean
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
}>()

const value = useVModel(props, 'modelValue', emit)
</script>

<template>
    <button
        class="bg-sonolus-ui-button-normal p-2 hover:bg-sonolus-ui-button-highlighted active:bg-sonolus-ui-button-pressed sm:p-3"
        @click="value = !value"
    >
        <div class="h-5 w-14 sm:h-6 sm:w-[4.5rem]">
            <div
                class="h-full w-1/2 transition-all"
                :class="{
                    'translate-x-full bg-sonolus-success ': value,
                    'bg-sonolus-warning': !value,
                }"
            />
        </div>
    </button>
</template>
