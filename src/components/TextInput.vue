<script setup lang="ts">
import IconXMark from '@/icons/IconXMark.vue'
import type { Component } from 'vue'

defineProps<{
    icon: Component
    placeholder: string
}>()

const value = defineModel<string>()
</script>

<template>
    <div class="flex">
        <div class="relative flex-grow">
            <input
                v-model="value"
                class="size-full border-none bg-button-normal p-5 pl-30 text-center transition-colors placeholder:text-20 placeholder:italic placeholder:text-text-disabled hover:bg-button-highlighted focus-visible:outline focus-visible:outline-offset-0 focus-visible:ring-0 active:bg-button-pressed sm:p-6 sm:pl-36 sm:placeholder:text-24"
                type="text"
                :placeholder
            />
            <component
                :is="icon"
                class="absolute left-5 top-5 size-20 fill-current sm:left-6 sm:top-6 sm:size-24"
            />
        </div>
        <button
            class="flex-shrink-0 bg-button-normal p-5 transition-colors hover:bg-button-highlighted focus-visible:outline active:bg-button-pressed sm:p-6"
            type="button"
            @click="value = ''"
        >
            <IconXMark class="size-20 fill-current sm:size-24" />
        </button>
    </div>
</template>
