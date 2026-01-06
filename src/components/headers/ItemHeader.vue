<script lang="ts">
type Normalized = {
    name: string
    author: string
    title: string
    subtitle: string
}

const normalizes: {
    [K in ItemType]: (item: ItemMap[K]) => Normalized
} = {
    room: (item) => ({ ...item, author: item.master }),
    post: (item) => ({ ...item, subtitle: new Date(item.time).toLocaleString() }),
    playlist: (item) => item,
    level: (item) => ({ ...item, subtitle: item.artists }),
    replay: (item) => item,
    skin: (item) => item,
    background: (item) => item,
    effect: (item) => item,
    particle: (item) => item,
    engine: (item) => item,
}
</script>

<script setup lang="ts">
import type { Item, ItemMap } from '@/utils/item'
import type { ItemType } from '@sonolus/core'
import { computed } from 'vue'

const props = defineProps<{
    type: ItemType
    item: Item
    alignLeft?: boolean
}>()

const normalized = computed(() => normalizes[props.type](props.item as never))
</script>

<template>
    <div
        class="flex flex-col items-center gap-2.5 sm:gap-3"
        :class="{ 'sm:items-start': alignLeft }"
    >
        <div
            class="flex w-full justify-between gap-15 text-15 text-text-soften sm:gap-18 sm:text-18"
            :class="{ 'sm:justify-start': alignLeft }"
        >
            <span class="text-left">{{ normalized.name }}</span>
            <span class="text-right">{{ normalized.author }}</span>
        </div>
        <slot />
        <span class="wrap-anywhere text-center text-30 font-bold sm:text-36">{{
            normalized.title
        }}</span>
        <span class="text-center">{{ normalized.subtitle }}</span>
    </div>
</template>
