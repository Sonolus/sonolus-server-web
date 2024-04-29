<script lang="ts">
type Normalized = {
    name: string
    author: string
    title: string
    subtitle: string
}

const normalizes: {
    [K in ItemType]: (item: ItemTypeMap[K]) => Normalized
} = {
    rooms: (item) => ({ ...item, author: item.master }),
    posts: (item) => ({ ...item, subtitle: new Date(item.time).toLocaleString() }),
    playlists: (item) => item,
    levels: (item) => ({ ...item, subtitle: item.artists }),
    replays: (item) => item,
    skins: (item) => item,
    backgrounds: (item) => item,
    effects: (item) => item,
    particles: (item) => item,
    engines: (item) => item,
}
</script>

<script setup lang="ts">
import type { Item, ItemType, ItemTypeMap } from '@/utils/item'
import { computed } from 'vue'

const props = defineProps<{
    type: ItemType
    item: Item
    alignLeft?: boolean
}>()

const normalized = computed(() => normalizes[props.type](props.item as never))
</script>

<template>
    <div class="flex flex-col items-center" :class="{ 'sm:items-start': alignLeft }">
        <div
            class="flex w-full justify-between gap-15 text-15 text-text-soften sm:gap-18 sm:text-18"
            :class="{ 'sm:justify-start': alignLeft }"
        >
            <span class="text-left">{{ normalized.name }}</span>
            <span class="text-right">{{ normalized.author }}</span>
        </div>
        <slot />
        <span class="mt-2.5 text-30 font-bold sm:mt-3 sm:text-36">{{ normalized.title }}</span>
        <span class="mt-2.5 sm:mt-3">{{ normalized.subtitle }}</span>
    </div>
</template>
