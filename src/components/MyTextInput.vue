<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import type { Component } from 'vue'
import XMarkIcon from '../assets/x-mark.svg?component'
import MyButton from './MyButton.vue'

const props = defineProps<{
    icon: Component
    modelValue: string
    placeholder: string
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

const value = useVModel(props, 'modelValue', emit)
</script>

<template>
    <div class="flex">
        <div class="relative flex-grow">
            <input
                type="text"
                class="w-full border-none bg-sonolus-ui-button-normal p-2 pl-9 text-center text-sm placeholder:text-sm hover:bg-sonolus-ui-button-highlighted active:bg-sonolus-ui-button-pressed sm:p-3 sm:pl-12 sm:text-base sm:placeholder:text-base"
                :placeholder="placeholder"
                v-model="value"
            />
            <component
                :is="icon"
                class="absolute top-2 left-2 h-5 w-5 fill-current sm:top-3 sm:left-3 sm:h-6 sm:w-6"
            />
        </div>
        <MyButton :icon="XMarkIcon" @click="$emit('update:modelValue', '')" />
    </div>
</template>
