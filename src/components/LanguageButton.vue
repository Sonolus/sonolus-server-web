<script setup lang="ts">
import IconLanguage from '@/icons/IconLanguage.vue'
</script>

<template>
    <button
        class="flex w-full items-center gap-5 bg-button-normal p-5 transition-colors hover:bg-button-highlighted focus-visible:outline active:bg-button-pressed sm:gap-6 sm:p-6"
        type="button"
    >
        <IconLanguage class="size-20 flex-shrink-0 fill-current sm:size-24" />
        <span class="flex-grow overflow-hidden text-ellipsis px-2.5 sm:px-3">
            <slot />
        </span>
    </button>
</template>
