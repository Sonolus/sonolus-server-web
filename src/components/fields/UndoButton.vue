<script setup lang="ts">
import IconUndo from '@/icons/IconUndo.vue'

defineProps<{
    isModified: boolean
}>()
</script>

<template>
    <button
        class="flex-shrink-0 p-5 transition-colors focus-visible:outline sm:p-6"
        :class="
            isModified
                ? 'bg-button-normal hover:bg-button-highlighted active:bg-button-pressed'
                : 'bg-button-disabled text-text-disabled'
        "
        type="button"
        :disabled="!isModified"
    >
        <IconUndo class="size-20 fill-current sm:size-24" />
    </button>
</template>
