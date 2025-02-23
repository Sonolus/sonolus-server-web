<script setup lang="ts">
import { i18n } from '@/i18n'
import IconMore from '@/icons/IconMore.vue'
</script>

<template>
    <button
        class="flex min-w-120 items-center gap-5 bg-button-normal p-5 transition-colors hover:bg-button-highlighted focus-visible:outline active:bg-button-pressed sm:min-w-144 sm:gap-6 sm:p-6"
    >
        <IconMore class="size-20 flex-shrink-0 fill-current sm:size-24" />
        <span class="flex-grow px-2.5 text-center sm:px-3">
            {{ i18n.common.more }}
        </span>
    </button>
</template>
