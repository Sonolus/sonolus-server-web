<script setup lang="ts">
import type { LevelItem } from 'sonolus-core'
import LevelIcon from '../../assets/level.svg?component'
import ItemThumbnail from './ItemThumbnail.vue'

defineProps<{
    item: LevelItem
    fullSize?: boolean
}>()
</script>

<template>
    <ItemThumbnail :thumbnail="item.cover" :fallback="LevelIcon" />
    <div
        class="absolute left-0 top-0 flex items-center justify-center bg-sonolus-ui-surface bg-opacity-90"
        :class="fullSize ? 'h-8 w-8' : 'h-6 w-6'"
    >
        <div :class="fullSize ? 'text-base' : 'text-sm'">
            {{ item.rating }}
        </div>
    </div>
    <div
        class="absolute left-0 top-0 flex h-full w-full items-end justify-center"
    >
        <div
            class="overflow-hidden text-ellipsis whitespace-nowrap bg-sonolus-ui-surface bg-opacity-90"
            :class="fullSize ? 'px-2 py-1 text-base' : 'px-1 py-0.5 text-sm'"
        >
            {{ item.engine.title }}
        </div>
    </div>
</template>
