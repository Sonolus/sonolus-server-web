<script setup lang="ts">
import type { LevelItem } from '@sonolus/core'

defineProps<{
    level: LevelItem
    fullSize?: boolean
}>()
</script>

<template>
    <div
        class="absolute left-0 top-0 flex items-center justify-center bg-overlay-surface"
        :class="[fullSize ? 'size-30 sm:size-36' : 'size-20 text-15 sm:size-24 sm:text-18']"
    >
        <span>{{ level.rating }}</span>
    </div>
    <div class="absolute left-0 top-0 flex h-full w-full items-end justify-center">
        <span
            class="bg-overlay-surface"
            :class="[
                fullSize
                    ? 'px-7.5 py-5 sm:px-9 sm:py-6'
                    : 'px-5 py-2.5 text-15 sm:px-6 sm:py-3 sm:text-18',
            ]"
        >
            {{ level.engine.title }}
        </span>
    </div>
</template>
