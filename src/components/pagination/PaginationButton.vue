<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
    icon: Component
    disabled?: boolean
}>()
</script>

<template>
    <button
        class="p-5 transition-colors focus-visible:outline sm:p-6"
        :class="
            disabled
                ? 'bg-button-disabled text-text-disabled'
                : 'bg-button-normal hover:bg-button-highlighted active:bg-button-pressed'
        "
        :inert="disabled"
    >
        <component :is="icon" class="size-20 fill-current sm:size-24" />
    </button>
</template>
